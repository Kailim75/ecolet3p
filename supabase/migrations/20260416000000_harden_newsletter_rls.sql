-- ============================================================================
-- Durcissement RLS — newsletter_subscribers
-- ============================================================================
-- Contexte : la policy "Anyone can unsubscribe via token" autorisait UPDATE
-- sur TOUTES les lignes (USING true), avec uniquement WITH CHECK sur le statut.
-- Cela permettait théoriquement à un attaquant d'énumérer l'UPDATE et de
-- potentiellement désinscrire d'autres comptes, voire de tester les clés.
--
-- Le flux de désinscription passe en réalité par l'Edge Function
-- `unsubscribe-newsletter` qui utilise SERVICE_ROLE_KEY (bypass RLS).
-- La policy publique est donc inutile : on la supprime.
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can unsubscribe via token"
  ON public.newsletter_subscribers;

-- Vérification : RLS reste activé, seules les policies serveur/admin subsistent.
-- Les désinscriptions continuent de fonctionner via l'Edge Function
-- (service_role) qui bypass RLS de toute façon.

COMMENT ON TABLE public.newsletter_subscribers IS
  'Newsletter. Écritures (INSERT/UPDATE) uniquement via Edge Functions (service_role). Pas d''accès anonyme direct.';
