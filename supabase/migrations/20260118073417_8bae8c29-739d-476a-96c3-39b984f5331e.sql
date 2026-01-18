-- Create formation_sessions table
CREATE TABLE public.formation_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  formation_id UUID NOT NULL REFERENCES public.formations(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE,
  start_time TIME NOT NULL DEFAULT '09:00',
  end_time TIME NOT NULL DEFAULT '17:00',
  location TEXT DEFAULT 'Campus T3P - Paris',
  max_participants INTEGER NOT NULL DEFAULT 12,
  current_participants INTEGER NOT NULL DEFAULT 0,
  price_override DECIMAL(10,2),
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.formation_sessions ENABLE ROW LEVEL SECURITY;

-- Public can view upcoming/ongoing sessions
CREATE POLICY "Anyone can view active sessions"
ON public.formation_sessions FOR SELECT
USING (status IN ('upcoming', 'ongoing'));

-- Admins can view all sessions
CREATE POLICY "Admins can view all sessions"
ON public.formation_sessions FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can insert sessions
CREATE POLICY "Admins can insert sessions"
ON public.formation_sessions FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can update sessions
CREATE POLICY "Admins can update sessions"
ON public.formation_sessions FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete sessions
CREATE POLICY "Admins can delete sessions"
ON public.formation_sessions FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_formation_sessions_updated_at
BEFORE UPDATE ON public.formation_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_formation_sessions_formation_id ON public.formation_sessions(formation_id);
CREATE INDEX idx_formation_sessions_start_date ON public.formation_sessions(start_date);
CREATE INDEX idx_formation_sessions_status ON public.formation_sessions(status);