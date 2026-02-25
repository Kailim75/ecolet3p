
-- Table pour stocker l'historique des audits SEO
CREATE TABLE public.seo_audits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  overall_score INTEGER NOT NULL,
  pages_count INTEGER NOT NULL DEFAULT 0,
  total_errors INTEGER NOT NULL DEFAULT 0,
  total_warnings INTEGER NOT NULL DEFAULT 0,
  audit_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.seo_audits ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit history
CREATE POLICY "Admins can view seo audits"
ON public.seo_audits FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Edge functions (service_role) can insert audits
CREATE POLICY "Service role can insert seo audits"
ON public.seo_audits FOR INSERT
WITH CHECK (true);

-- Admins can delete old audits
CREATE POLICY "Admins can delete seo audits"
ON public.seo_audits FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));
