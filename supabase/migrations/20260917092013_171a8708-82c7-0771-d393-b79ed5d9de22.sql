-- Sessions de janvier 2027 (3 formations x soir/journée, 12 places).
-- Idempotente : ces lignes ont déjà été insérées à la main en production le 17/09/2026 ;
-- une réexécution de la migration ne doit pas créer de doublons.
insert into public.formation_sessions
  (formation_id, start_date, end_date, start_time, end_time, max_participants, current_participants, status, notes, location)
select s.formation_id, s.start_date, s.end_date, s.start_time, s.end_time,
  12, 0, 'upcoming', 'Examen prévu à partir du mercredi 27 janvier 2027.', '3 rue Corneille, 92120 Montrouge'
from (
  select f.id as formation_id, '2027-01-11'::date as start_date, '2027-01-22'::date as end_date,
    '18:00'::time as start_time, '21:30'::time as end_time
  from public.formations f
  where f.category in ('taxi', 'vtc', 'vmdtr') and f.is_active = true
  union all
  select f.id, '2027-01-18'::date, '2027-01-22'::date, '09:30'::time, '16:30'::time
  from public.formations f
  where f.category in ('taxi', 'vtc', 'vmdtr') and f.is_active = true
) s
where not exists (
  select 1 from public.formation_sessions fs
  where fs.formation_id = s.formation_id
    and fs.start_date = s.start_date
    and fs.start_time = s.start_time
);
