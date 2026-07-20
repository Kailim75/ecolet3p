ALTER TABLE public.pre_registrations
  ADD COLUMN IF NOT EXISTS session_id uuid REFERENCES public.formation_sessions(id) ON DELETE SET NULL;