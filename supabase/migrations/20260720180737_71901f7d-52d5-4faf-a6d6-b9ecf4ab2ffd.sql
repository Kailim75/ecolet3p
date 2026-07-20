
-- Rescope admin SELECT policies to authenticated only so anon SELECT does not evaluate has_role()
DROP POLICY IF EXISTS "Admins can view all formations" ON public.formations;
CREATE POLICY "Admins can view all formations" ON public.formations
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can view all sessions" ON public.formation_sessions;
CREATE POLICY "Admins can view all sessions" ON public.formation_sessions
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can view all appointments" ON public.appointments;
CREATE POLICY "Admins can view all appointments" ON public.appointments
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can view contact requests" ON public.contact_requests;
CREATE POLICY "Admins can view contact requests" ON public.contact_requests
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can view all email logs" ON public.email_logs;
CREATE POLICY "Admins can view all email logs" ON public.email_logs
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can view seo audits" ON public.seo_audits;
CREATE POLICY "Admins can view seo audits" ON public.seo_audits
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can view seo fixes" ON public.seo_fixes;
CREATE POLICY "Admins can view seo fixes" ON public.seo_fixes
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can view all simulations" ON public.simulations;
CREATE POLICY "Admins can view all simulations" ON public.simulations
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- Also rescope admin write policies on the two tables in scope (formations, formation_sessions)
-- so admin RLS never runs under anon at all.
DROP POLICY IF EXISTS "Admins can insert formations" ON public.formations;
CREATE POLICY "Admins can insert formations" ON public.formations
  FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
DROP POLICY IF EXISTS "Admins can update formations" ON public.formations;
CREATE POLICY "Admins can update formations" ON public.formations
  FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
DROP POLICY IF EXISTS "Admins can delete formations" ON public.formations;
CREATE POLICY "Admins can delete formations" ON public.formations
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can insert sessions" ON public.formation_sessions;
CREATE POLICY "Admins can insert sessions" ON public.formation_sessions
  FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
DROP POLICY IF EXISTS "Admins can update sessions" ON public.formation_sessions;
CREATE POLICY "Admins can update sessions" ON public.formation_sessions
  FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
DROP POLICY IF EXISTS "Admins can delete sessions" ON public.formation_sessions;
CREATE POLICY "Admins can delete sessions" ON public.formation_sessions
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- Ensure RLS is enabled
ALTER TABLE public.formations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formation_sessions ENABLE ROW LEVEL SECURITY;
