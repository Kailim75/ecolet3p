-- Parcours de conduite : l'école publie ses créneaux de conduite, chaque
-- admissible réserve depuis /resultats (vérifié par n° de dossier + date de
-- naissance dans l'Edge Function driving-booking, service_role uniquement).
-- Documents élèves : PDF servis par exam-result-lookup selon le résultat.

create table public.driving_slots (
  id uuid primary key default gen_random_uuid(),
  starts_at timestamptz not null,
  duration_minutes integer not null default 60 check (duration_minutes between 15 and 600),
  exam_categories text[] not null default array['VTC', 'TAXI'],
  capacity integer not null default 1 check (capacity between 1 and 20),
  location text not null default 'ECOLE T3P, 3 rue Corneille, 92120 Montrouge',
  notes text,
  is_open boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (cardinality(exam_categories) > 0 and exam_categories <@ array['TAXI', 'VTC', 'VMDTR'])
);

create index driving_slots_starts_at_idx on public.driving_slots (starts_at);

create table public.driving_bookings (
  id uuid primary key default gen_random_uuid(),
  slot_id uuid not null references public.driving_slots (id) on delete cascade,
  exam_result_id uuid not null references public.exam_results (id) on delete cascade,
  phone text not null,
  status text not null default 'booked' check (status in ('booked', 'cancelled')),
  created_at timestamptz not null default now(),
  cancelled_at timestamptz
);

create unique index driving_bookings_active_uniq
  on public.driving_bookings (slot_id, exam_result_id) where status = 'booked';
create index driving_bookings_result_idx on public.driving_bookings (exam_result_id);

create table public.student_documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  file_path text not null,                    -- objet du bucket exam-attestations (dossier documents/)
  audience text not null default 'admis' check (audience in ('admis', 'non_admis', 'all')),
  exam_categories text[] not null default '{}', -- vide = toutes les catégories
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  check (exam_categories <@ array['TAXI', 'VTC', 'VMDTR'])
);

grant select, insert, update, delete on public.driving_slots to authenticated;
grant select, insert, update, delete on public.driving_bookings to authenticated;
grant select, insert, update, delete on public.student_documents to authenticated;
grant all on public.driving_slots to service_role;
grant all on public.driving_bookings to service_role;
grant all on public.student_documents to service_role;

alter table public.driving_slots enable row level security;
alter table public.driving_bookings enable row level security;
alter table public.student_documents enable row level security;

create policy "Admins manage driving slots" on public.driving_slots
  for all to authenticated
  using (private.has_role(auth.uid(), 'admin'::app_role))
  with check (private.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins manage driving bookings" on public.driving_bookings
  for all to authenticated
  using (private.has_role(auth.uid(), 'admin'::app_role))
  with check (private.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins manage student documents" on public.student_documents
  for all to authenticated
  using (private.has_role(auth.uid(), 'admin'::app_role))
  with check (private.has_role(auth.uid(), 'admin'::app_role));

create trigger update_driving_slots_updated_at
  before update on public.driving_slots
  for each row execute function public.update_updated_at_column();

-- Réservation atomique : verrouille le créneau pour ne jamais dépasser sa capacité.
-- Codes renvoyés : ok, slot_not_found, slot_closed, too_late, wrong_category,
-- full, already_booked, max_bookings, not_admis
create or replace function public.book_driving_slot(
  p_slot_id uuid,
  p_exam_result_id uuid,
  p_phone text,
  p_max_active integer default 3,
  p_min_notice interval default interval '12 hours'
) returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_slot public.driving_slots%rowtype;
  v_result public.exam_results%rowtype;
  v_category text;
  v_taken integer;
begin
  select * into v_result from public.exam_results where id = p_exam_result_id;
  if not found or v_result.result <> 'admis' then
    return 'not_admis';
  end if;
  v_category := upper(split_part(v_result.exam_type, ' ', 1));

  select * into v_slot from public.driving_slots where id = p_slot_id for update;
  if not found then
    return 'slot_not_found';
  end if;
  if not v_slot.is_open then
    return 'slot_closed';
  end if;
  if v_slot.starts_at < now() + p_min_notice then
    return 'too_late';
  end if;
  if not (v_category = any (v_slot.exam_categories)) then
    return 'wrong_category';
  end if;

  if exists (select 1 from public.driving_bookings
             where slot_id = p_slot_id and exam_result_id = p_exam_result_id and status = 'booked') then
    return 'already_booked';
  end if;

  select count(*) into v_taken from public.driving_bookings
    where slot_id = p_slot_id and status = 'booked';
  if v_taken >= v_slot.capacity then
    return 'full';
  end if;

  if (select count(*) from public.driving_bookings b
        join public.driving_slots s on s.id = b.slot_id
      where b.exam_result_id = p_exam_result_id and b.status = 'booked' and s.starts_at > now()) >= p_max_active then
    return 'max_bookings';
  end if;

  insert into public.driving_bookings (slot_id, exam_result_id, phone)
  values (p_slot_id, p_exam_result_id, left(trim(p_phone), 30));
  return 'ok';
end;
$$;

revoke execute on function public.book_driving_slot(uuid, uuid, text, integer, interval) from public, anon, authenticated;
grant execute on function public.book_driving_slot(uuid, uuid, text, integer, interval) to service_role;
