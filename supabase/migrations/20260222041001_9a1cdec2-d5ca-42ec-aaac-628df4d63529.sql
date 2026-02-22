
-- Table pour stocker les simulations de revenus et les leads
CREATE TABLE public.simulations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Lead info (Niveau 2)
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  -- Simulation inputs
  profession TEXT NOT NULL DEFAULT 'vtc', -- vtc, taxi, vmdtr
  hours_per_day NUMERIC NOT NULL DEFAULT 8,
  days_per_week INTEGER NOT NULL DEFAULT 5,
  avg_fare NUMERIC NOT NULL DEFAULT 25,
  rides_per_hour NUMERIC NOT NULL DEFAULT 2,
  vehicle_type TEXT DEFAULT 'standard', -- standard, premium, eco
  -- Simulation results
  monthly_revenue NUMERIC,
  monthly_charges NUMERIC,
  monthly_net NUMERIC,
  -- Advanced results (Niveau 2)
  projection_12m JSONB, -- 12-month projection data
  scenario_standard JSONB, -- standard scenario
  scenario_optimized JSONB, -- optimized with T3P
  formation_roi_months NUMERIC, -- months to ROI on 990€
  -- Metadata
  simulation_level INTEGER NOT NULL DEFAULT 1, -- 1 = rapide, 2 = avancée
  appointment_id UUID REFERENCES public.appointments(id),
  source TEXT DEFAULT 'simulateur',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.simulations ENABLE ROW LEVEL SECURITY;

-- Anyone can create a simulation (public tool)
CREATE POLICY "Anyone can create simulations"
ON public.simulations
FOR INSERT
WITH CHECK (true);

-- Admins can view all simulations
CREATE POLICY "Admins can view all simulations"
ON public.simulations
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Simulations are not publicly readable
CREATE POLICY "Simulations are not publicly readable"
ON public.simulations
FOR SELECT
USING (false);

-- Admins can update simulations
CREATE POLICY "Admins can update simulations"
ON public.simulations
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete simulations
CREATE POLICY "Admins can delete simulations"
ON public.simulations
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_simulations_updated_at
BEFORE UPDATE ON public.simulations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
