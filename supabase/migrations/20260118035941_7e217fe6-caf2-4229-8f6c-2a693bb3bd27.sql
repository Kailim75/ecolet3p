-- Create pre_registrations table to store formation enrollment requests
CREATE TABLE public.pre_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  formation_title TEXT NOT NULL,
  formation_duration TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.pre_registrations ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting (anyone can submit a pre-registration)
CREATE POLICY "Anyone can create pre-registrations"
ON public.pre_registrations
FOR INSERT
WITH CHECK (true);

-- Create policy for reading (only authenticated admins should read, but for now restrict)
CREATE POLICY "Pre-registrations are not publicly readable"
ON public.pre_registrations
FOR SELECT
USING (false);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_pre_registrations_updated_at
BEFORE UPDATE ON public.pre_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for faster queries
CREATE INDEX idx_pre_registrations_email ON public.pre_registrations(email);
CREATE INDEX idx_pre_registrations_status ON public.pre_registrations(status);
CREATE INDEX idx_pre_registrations_created_at ON public.pre_registrations(created_at DESC);