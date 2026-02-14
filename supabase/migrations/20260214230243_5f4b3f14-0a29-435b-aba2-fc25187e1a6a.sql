
-- Tighten RLS INSERT policies to prevent status/field manipulation

-- Appointments: ensure status is 'pending' and notes is null on public insert
DROP POLICY IF EXISTS "Anyone can create appointments" ON public.appointments;
CREATE POLICY "Anyone can create appointments"
ON public.appointments
FOR INSERT
WITH CHECK (
  status = 'pending'
  AND notes IS NULL
);

-- Pre-registrations: ensure status is 'pending' on public insert
DROP POLICY IF EXISTS "Anyone can create pre-registrations" ON public.pre_registrations;
CREATE POLICY "Anyone can create pre-registrations"
ON public.pre_registrations
FOR INSERT
WITH CHECK (
  status = 'pending'
);

-- Newsletter: ensure status is 'active' on subscribe
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (
  status = 'active'
);
