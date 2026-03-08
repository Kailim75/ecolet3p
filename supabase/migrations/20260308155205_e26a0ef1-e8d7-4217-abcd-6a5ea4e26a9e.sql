
-- Table contact_requests for the contact form
CREATE TABLE public.contact_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  formation TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public form)
CREATE POLICY "Anyone can submit contact requests"
  ON public.contact_requests
  FOR INSERT
  WITH CHECK (status = 'new');

-- Only admins can read
CREATE POLICY "Admins can view contact requests"
  ON public.contact_requests
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update
CREATE POLICY "Admins can update contact requests"
  ON public.contact_requests
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete
CREATE POLICY "Admins can delete contact requests"
  ON public.contact_requests
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));
