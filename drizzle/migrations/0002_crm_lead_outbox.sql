-- Free message for quote requests (nullable, additive)
ALTER TABLE public.pre_registrations ADD COLUMN IF NOT EXISTS message text;

CREATE TABLE public.crm_lead_outbox (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_table text NOT NULL CHECK (source_table IN ('pre_registrations','contact_requests','appointments','simulations')),
  source_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','processing','sent','needs_review','ignored','failed')),
  crm_result text,
  attempts integer NOT NULL DEFAULT 0,
  next_attempt_at timestamptz NOT NULL DEFAULT now(),
  locked_until timestamptz,
  lock_token uuid,
  last_attempt_at timestamptz,
  last_error text,
  sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT crm_lead_outbox_source_unique UNIQUE (source_table, source_id)
);
CREATE INDEX crm_lead_outbox_due_idx ON public.crm_lead_outbox (status, next_attempt_at);

GRANT SELECT ON public.crm_lead_outbox TO authenticated;
GRANT UPDATE (status, next_attempt_at, attempts, last_error, locked_until, lock_token) ON public.crm_lead_outbox TO authenticated;
GRANT ALL ON public.crm_lead_outbox TO service_role;
ALTER TABLE public.crm_lead_outbox ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read CRM outbox" ON public.crm_lead_outbox FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins requeue CRM outbox" ON public.crm_lead_outbox FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_crm_lead_outbox_updated_at BEFORE UPDATE ON public.crm_lead_outbox
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Test / do-not-process markers
CREATE OR REPLACE FUNCTION private.crm_is_test(VARIADIC p_values text[])
RETURNS boolean LANGUAGE sql IMMUTABLE SET search_path = '' AS $$
  SELECT EXISTS (
    SELECT 1 FROM unnest(p_values) v
    WHERE v IS NOT NULL AND (v ~* '(^|[^[:alpha:]])test([^[:alpha:]]|$)' OR v ~* 'ne\s+pas\s+traiter')
  );
$$;

CREATE OR REPLACE FUNCTION private.crm_is_cancelled(p_status text)
RETURNS boolean LANGUAGE sql IMMUTABLE SET search_path = '' AS $$
  SELECT lower(coalesce(p_status, '')) IN ('cancelled','canceled','annulé','annule','annulée','annulee');
$$;

-- Records only a reference; never the lead payload or the financial scenario
CREATE OR REPLACE FUNCTION private.crm_enqueue_lead()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE
  v_skip boolean := false;
BEGIN
  IF TG_TABLE_NAME = 'pre_registrations' THEN
    v_skip := private.crm_is_cancelled(NEW.status)
      OR private.crm_is_test(NEW.first_name, NEW.last_name, NEW.email, NEW.message);
  ELSIF TG_TABLE_NAME = 'contact_requests' THEN
    v_skip := private.crm_is_cancelled(NEW.status)
      OR private.crm_is_test(NEW.full_name, NEW.email, NEW.message);
  ELSIF TG_TABLE_NAME = 'appointments' THEN
    v_skip := private.crm_is_cancelled(NEW.status)
      OR private.crm_is_test(NEW.first_name, NEW.last_name, NEW.email, NEW.notes);
  ELSIF TG_TABLE_NAME = 'simulations' THEN
    v_skip := (nullif(trim(coalesce(NEW.email, '')), '') IS NULL AND nullif(trim(coalesce(NEW.phone, '')), '') IS NULL)
      OR private.crm_is_test(NEW.first_name, NEW.last_name, NEW.email);
  ELSE
    RETURN NEW;
  END IF;
  IF NOT v_skip THEN
    INSERT INTO public.crm_lead_outbox (source_table, source_id)
    VALUES (TG_TABLE_NAME, NEW.id)
    ON CONFLICT (source_table, source_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION private.crm_enqueue_lead() FROM PUBLIC;

CREATE TRIGGER crm_enqueue_pre_registrations AFTER INSERT ON public.pre_registrations
  FOR EACH ROW EXECUTE FUNCTION private.crm_enqueue_lead();
CREATE TRIGGER crm_enqueue_contact_requests AFTER INSERT ON public.contact_requests
  FOR EACH ROW EXECUTE FUNCTION private.crm_enqueue_lead();
CREATE TRIGGER crm_enqueue_appointments AFTER INSERT ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION private.crm_enqueue_lead();
CREATE TRIGGER crm_enqueue_simulations AFTER INSERT ON public.simulations
  FOR EACH ROW EXECUTE FUNCTION private.crm_enqueue_lead();

-- Atomic lease: due pending rows plus processing rows whose lease expired (crash recovery)
CREATE OR REPLACE FUNCTION public.crm_claim_leads(p_limit integer DEFAULT 10, p_lease_seconds integer DEFAULT 300)
RETURNS SETOF public.crm_lead_outbox LANGUAGE sql SECURITY INVOKER SET search_path = public AS $$
  WITH due AS (
    SELECT id FROM public.crm_lead_outbox
    WHERE (status = 'pending' AND next_attempt_at <= now())
       OR (status = 'processing' AND locked_until < now())
    ORDER BY next_attempt_at
    LIMIT least(greatest(p_limit, 1), 50)
    FOR UPDATE SKIP LOCKED
  )
  UPDATE public.crm_lead_outbox o
  SET status = 'processing', lock_token = gen_random_uuid(),
      locked_until = now() + make_interval(secs => least(greatest(p_lease_seconds, 30), 900)),
      attempts = o.attempts + 1, last_attempt_at = now()
  FROM due WHERE o.id = due.id
  RETURNING o.*;
$$;

-- Completion only applies while the caller still holds the lease
CREATE OR REPLACE FUNCTION public.crm_complete_lead(p_id uuid, p_lock_token uuid, p_outcome text, p_crm_result text DEFAULT NULL, p_error text DEFAULT NULL, p_max_attempts integer DEFAULT 8)
RETURNS text LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
DECLARE
  v_row public.crm_lead_outbox%rowtype;
BEGIN
  SELECT * INTO v_row FROM public.crm_lead_outbox
  WHERE id = p_id AND lock_token = p_lock_token AND status = 'processing' FOR UPDATE;
  IF NOT FOUND THEN RETURN 'lease_lost'; END IF;

  IF p_outcome IN ('sent','needs_review','ignored') THEN
    UPDATE public.crm_lead_outbox SET status = p_outcome, crm_result = left(p_crm_result, 40),
      last_error = left(p_error, 80), lock_token = NULL, locked_until = NULL,
      sent_at = CASE WHEN p_outcome IN ('sent','needs_review') THEN now() ELSE sent_at END
    WHERE id = p_id;
  ELSIF p_outcome = 'retry' THEN
    UPDATE public.crm_lead_outbox SET
      status = CASE WHEN v_row.attempts >= p_max_attempts THEN 'failed' ELSE 'pending' END,
      next_attempt_at = now() + make_interval(secs => least(60 * power(2, greatest(v_row.attempts - 1, 0))::int, 21600)),
      last_error = left(p_error, 80), lock_token = NULL, locked_until = NULL
    WHERE id = p_id;
  ELSE
    RAISE EXCEPTION 'invalid outcome';
  END IF;
  RETURN 'ok';
END;
$$;

REVOKE ALL ON FUNCTION public.crm_claim_leads(integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.crm_complete_lead(uuid, uuid, text, text, text, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.crm_claim_leads(integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.crm_complete_lead(uuid, uuid, text, text, text, integer) TO service_role;