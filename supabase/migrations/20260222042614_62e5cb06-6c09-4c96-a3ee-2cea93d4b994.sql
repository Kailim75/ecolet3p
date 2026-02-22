CREATE OR REPLACE FUNCTION public.get_simulation_count()
RETURNS bigint
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT count(*) FROM public.simulations;
$$;