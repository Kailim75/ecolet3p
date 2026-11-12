CREATE OR REPLACE FUNCTION private.crm_is_test(VARIADIC p_values text[])
RETURNS boolean LANGUAGE sql IMMUTABLE SET search_path = '' AS $$
  SELECT EXISTS (
    SELECT 1 FROM unnest(p_values) v
    WHERE v IS NOT NULL AND (
      v ~* 'test\s+technique' OR v ~* 'ne\s+pas\s+traiter' OR v ~* 'testads12112026'
    )
  );
$$;

CREATE OR REPLACE FUNCTION private.crm_enqueue_lead()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE
  v_skip boolean := false;
BEGIN
  -- Test markers are checked on names/email only, never on free-text messages.
  IF TG_TABLE_NAME = 'pre_registrations' THEN
    v_skip := private.crm_is_cancelled(NEW.status)
      OR private.crm_is_test(NEW.first_name, NEW.last_name, NEW.email);
  ELSIF TG_TABLE_NAME = 'contact_requests' THEN
    v_skip := private.crm_is_cancelled(NEW.status)
      OR private.crm_is_test(NEW.full_name, NEW.email);
  ELSIF TG_TABLE_NAME = 'appointments' THEN
    v_skip := private.crm_is_cancelled(NEW.status)
      OR private.crm_is_test(NEW.first_name, NEW.last_name, NEW.email);
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