-- Create table for SEO redirects (301/302)
CREATE TABLE public.seo_redirects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  from_path TEXT NOT NULL,
  to_path TEXT NOT NULL,
  redirect_type INTEGER NOT NULL DEFAULT 301,
  is_active BOOLEAN NOT NULL DEFAULT true,
  source TEXT NOT NULL DEFAULT 'manual',
  cannibalization_keyword TEXT,
  notes TEXT,
  hit_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT unique_from_path UNIQUE (from_path)
);

-- Enable RLS
ALTER TABLE public.seo_redirects ENABLE ROW LEVEL SECURITY;

-- Anyone can read active redirects (needed for client-side redirect handler)
CREATE POLICY "Anyone can read active redirects"
  ON public.seo_redirects
  FOR SELECT
  USING (is_active = true);

-- Admins can view all redirects
CREATE POLICY "Admins can view all redirects"
  ON public.seo_redirects
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can insert redirects
CREATE POLICY "Admins can insert redirects"
  ON public.seo_redirects
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update redirects
CREATE POLICY "Admins can update redirects"
  ON public.seo_redirects
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete redirects
CREATE POLICY "Admins can delete redirects"
  ON public.seo_redirects
  FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_seo_redirects_updated_at
  BEFORE UPDATE ON public.seo_redirects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Index for fast lookup by path
CREATE INDEX idx_seo_redirects_from_path ON public.seo_redirects (from_path) WHERE is_active = true;