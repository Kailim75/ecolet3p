
-- Drop the restrictive INSERT policy and recreate as permissive
DROP POLICY IF EXISTS "Anyone can submit contact requests" ON public.contact_requests;
CREATE POLICY "Anyone can submit contact requests"
ON public.contact_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'new'::text);
