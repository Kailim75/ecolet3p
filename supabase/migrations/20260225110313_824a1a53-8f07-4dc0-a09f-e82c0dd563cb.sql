
-- Table to store dynamically applied SEO overrides (from approved AI fixes)
CREATE TABLE public.seo_overrides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_url TEXT NOT NULL,
  field TEXT NOT NULL, -- title, description, h1, og_title, og_description
  value TEXT NOT NULL,
  source_fix_id UUID REFERENCES public.seo_fixes(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(page_url, field)
);

-- Enable RLS
ALTER TABLE public.seo_overrides ENABLE ROW LEVEL SECURITY;

-- Anyone can read overrides (needed for frontend SEO rendering)
CREATE POLICY "Anyone can read seo overrides"
  ON public.seo_overrides FOR SELECT
  USING (true);

-- Only admins can insert/update/delete
CREATE POLICY "Admins can insert seo overrides"
  ON public.seo_overrides FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update seo overrides"
  ON public.seo_overrides FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete seo overrides"
  ON public.seo_overrides FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_seo_overrides_updated_at
  BEFORE UPDATE ON public.seo_overrides
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
