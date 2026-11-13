DROP POLICY IF EXISTS "Anyone can create simulations" ON public.simulations;
CREATE POLICY "Anyone can create valid simulations" ON public.simulations
FOR INSERT TO anon, authenticated
WITH CHECK (
  appointment_id IS NULL
  AND char_length(profession) BETWEEN 1 AND 50
  AND hours_per_day > 0 AND hours_per_day <= 24
  AND days_per_week BETWEEN 1 AND 7
  AND avg_fare >= 0 AND avg_fare <= 10000
  AND rides_per_hour >= 0 AND rides_per_hour <= 100
  AND simulation_level BETWEEN 1 AND 10
  AND (email IS NULL OR char_length(email) <= 255)
  AND (phone IS NULL OR char_length(phone) <= 30)
  AND (first_name IS NULL OR char_length(first_name) <= 100)
  AND (last_name IS NULL OR char_length(last_name) <= 100)
  AND (source IS NULL OR char_length(source) <= 100)
);