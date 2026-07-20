-- Restrict admin policies on seo_redirects to authenticated role only.
-- Anonymous visitors were failing SELECT because Postgres evaluated the admin
-- policy's has_role() call under the anon role, which lacks EXECUTE on that
-- function. The public-read policy (is_active = true) already exists.
ALTER POLICY "Admins can view all redirects" ON public.seo_redirects TO authenticated;
ALTER POLICY "Admins can insert redirects" ON public.seo_redirects TO authenticated;
ALTER POLICY "Admins can update redirects" ON public.seo_redirects TO authenticated;
ALTER POLICY "Admins can delete redirects" ON public.seo_redirects TO authenticated;
ALTER TABLE public.seo_redirects ENABLE ROW LEVEL SECURITY;