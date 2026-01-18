-- Create formations table
CREATE TABLE public.formations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  duration TEXT NOT NULL,
  price DECIMAL(10,2),
  category TEXT NOT NULL DEFAULT 'general',
  icon TEXT DEFAULT 'Car',
  features TEXT[] DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.formations ENABLE ROW LEVEL SECURITY;

-- Public can view active formations
CREATE POLICY "Anyone can view active formations"
ON public.formations FOR SELECT
USING (is_active = true);

-- Admins can view all formations
CREATE POLICY "Admins can view all formations"
ON public.formations FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can insert formations
CREATE POLICY "Admins can insert formations"
ON public.formations FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can update formations
CREATE POLICY "Admins can update formations"
ON public.formations FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete formations
CREATE POLICY "Admins can delete formations"
ON public.formations FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_formations_updated_at
BEFORE UPDATE ON public.formations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default formations based on existing catalog
INSERT INTO public.formations (title, description, duration, category, icon, features, display_order) VALUES
('Formation TAXI Initial', 'Devenez chauffeur de taxi professionnel avec notre formation complète', '63h (Journée)', 'taxi', 'Car', ARRAY['Réglementation taxi', 'Gestion clientèle', 'Orientation géographique', 'Sécurité routière'], 1),
('Formation TAXI Soirée', 'Formation taxi adaptée à votre emploi du temps', '33h (Soirée)', 'taxi', 'Car', ARRAY['Cours en soirée', 'Flexibilité horaire', 'Même programme complet'], 2),
('Formation VTC Initial', 'Lancez votre carrière de chauffeur VTC', '63h (Journée)', 'vtc', 'Car', ARRAY['Réglementation VTC', 'Service premium', 'Applications chauffeur', 'Relation client'], 3),
('Formation VTC Soirée', 'Formation VTC en cours du soir', '33h (Soirée)', 'vtc', 'Car', ARRAY['Cours en soirée', 'Compatible activité pro', 'Formation complète'], 4),
('Formation VMDTR (Moto-Taxi)', 'Devenez conducteur de moto-taxi professionnel', '63h (Journée)', 'vmdtr', 'Bike', ARRAY['Conduite moto', 'Sécurité passager', 'Réglementation spécifique'], 5),
('Formation TPMR', 'Transport de Personnes à Mobilité Réduite', '14h', 'tpmr', 'Accessibility', ARRAY['Accompagnement PMR', 'Équipements adaptés', 'Sensibilisation handicap'], 6),
('Formation Continue TAXI', 'Recyclage obligatoire pour chauffeurs taxi', '14h', 'continue', 'RefreshCw', ARRAY['Mise à jour réglementation', 'Nouvelles pratiques', 'Attestation officielle'], 7),
('Formation Continue VTC', 'Recyclage obligatoire pour chauffeurs VTC', '14h', 'continue', 'RefreshCw', ARRAY['Actualisation connaissances', 'Évolutions du métier', 'Certification'], 8),
('Mobilité Département 92', 'Formation spécifique Hauts-de-Seine', '14h', 'mobilite', 'MapPin', ARRAY['Connaissance locale', 'Zones spécifiques', 'Réseau routier 92'], 9),
('Mobilité Département 75', 'Formation spécifique Paris', '35h', 'mobilite', 'MapPin', ARRAY['Connaissance Paris', 'Monuments et lieux', 'Circulation parisienne'], 10);