-- Examens pratiques (épreuve d'admission) : date, heure et lieu de chaque
-- admissible, saisis par l'école. Affichés sur /resultats (exam-results-v2)
-- et utilisés par driving-booking : la séance de conduite se réserve dans
-- les jours qui précèdent l'examen.

create table public.practical_exams (
  id uuid primary key default gen_random_uuid(),
  exam_result_id uuid not null unique references public.exam_results (id) on delete cascade,
  exam_date date not null,
  exam_time time,
  department text,
  location text,                              -- adresse du centre d'examen
  notes text,                                 -- consignes d'arrivée
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index practical_exams_date_idx on public.practical_exams (exam_date);

grant select, insert, update, delete on public.practical_exams to authenticated;
grant all on public.practical_exams to service_role;

alter table public.practical_exams enable row level security;

create policy "Admins manage practical exams" on public.practical_exams
  for all to authenticated
  using (private.has_role(auth.uid(), 'admin'::app_role))
  with check (private.has_role(auth.uid(), 'admin'::app_role));

create trigger update_practical_exams_updated_at
  before update on public.practical_exams
  for each row execute function public.update_updated_at_column();
