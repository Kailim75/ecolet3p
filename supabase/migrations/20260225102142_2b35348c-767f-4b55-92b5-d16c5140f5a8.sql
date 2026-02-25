
-- Table to store AI-proposed SEO fixes with approval workflow
CREATE TABLE public.seo_fixes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  audit_id UUID REFERENCES public.seo_audits(id) ON DELETE CASCADE,
  page_url TEXT NOT NULL,
  fix_type TEXT NOT NULL CHECK (fix_type IN ('metadata', 'jsonld', 'content')),
  category TEXT NOT NULL,
  current_value TEXT,
  proposed_value TEXT NOT NULL,
  impact TEXT NOT NULL DEFAULT 'medium' CHECK (impact IN ('high', 'medium', 'low')),
  ai_explanation TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'applied')),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.seo_fixes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view seo fixes" ON public.seo_fixes FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update seo fixes" ON public.seo_fixes FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete seo fixes" ON public.seo_fixes FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Service role can insert seo fixes" ON public.seo_fixes FOR INSERT WITH CHECK (true);

CREATE INDEX idx_seo_fixes_audit ON public.seo_fixes(audit_id);
CREATE INDEX idx_seo_fixes_status ON public.seo_fixes(status);
