-- Sessions de janvier 2027 (3 formations x soir/journée, 12 places).
insert into public.formation_sessions
  (formation_id, start_date, end_date, start_time, end_time, max_participants, current_participants, status, notes, location)
select f.id, '2027-01-11'::date, '2027-01-22'::date, '18:00'::time, '21:30'::time,
  12, 0, 'upcoming', 'Examen prévu à partir du mercredi 27 janvier 2027.', '3 rue Corneille, 92120 Montrouge'
from public.formations f
where f.category in ('taxi', 'vtc', 'vmdtr') and f.is_active = true
union all
select f.id, '2027-01-18'::date, '2027-01-22'::date, '09:30'::time, '16:30'::time,
  12, 0, 'upcoming', 'Examen prévu à partir du mercredi 27 janvier 2027.', '3 rue Corneille, 92120 Montrouge'
from public.formations f
where f.category in ('taxi', 'vtc', 'vmdtr') and f.is_active = true;
