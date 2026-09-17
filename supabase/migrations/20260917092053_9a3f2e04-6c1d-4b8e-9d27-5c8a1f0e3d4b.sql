-- La migration 20260526222034 a révoqué has_role pour anon ET authenticated.
-- Le panneau admin (isAdmin) l'appelle après connexion : le redonner à authenticated.
grant execute on function public.has_role(uuid, app_role) to authenticated;
