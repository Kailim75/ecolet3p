
-- 1. Drop overly permissive INSERT policies (service_role bypasses RLS, so no replacement needed)
DROP POLICY IF EXISTS "Service role can insert email logs" ON public.email_logs;
DROP POLICY IF EXISTS "Service role can insert seo audits" ON public.seo_audits;
DROP POLICY IF EXISTS "Service role can insert seo fixes" ON public.seo_fixes;

-- 2. Drop the mass-unsubscribe-vulnerable policy. Unsubscribe is handled by the
--    'unsubscribe-newsletter' edge function using the service role key.
DROP POLICY IF EXISTS "Anyone can unsubscribe via token" ON public.newsletter_subscribers;

-- 3. Revoke EXECUTE on SECURITY DEFINER functions from public/anon/authenticated.
--    These are called server-side only (edge functions / triggers) and should not be exposed via PostgREST.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_simulation_count() FROM PUBLIC, anon, authenticated;
