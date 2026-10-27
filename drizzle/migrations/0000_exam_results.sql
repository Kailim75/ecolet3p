create table public.exam_results (
  id uuid primary key default gen_random_uuid(),
  session_label text not null,
  dossier_number text not null,
  birth_date date not null,
  civility text,
  full_name text not null,
  exam_type text not null,
  department text,
  exam_date date,
  global_score numeric(4,2),
  result text not null check (result in ('admis', 'non_admis')),
  subjects jsonb not null default '[]'::jsonb,
  comment text,
  attestation_path text,
  is_published boolean not null default true,
  expires_at date not null default (current_date + interval '1 year'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (session_label, dossier_number)
);
create index exam_results_lookup_idx on public.exam_results (dossier_number, birth_date);
grant select, insert, update, delete on public.exam_results to authenticated;
grant all on public.exam_results to service_role;
alter table public.exam_results enable row level security;
create policy "Admins can view exam results" on public.exam_results
  for select to authenticated using (private.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can insert exam results" on public.exam_results
  for insert to authenticated with check (private.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can update exam results" on public.exam_results
  for update to authenticated using (private.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can delete exam results" on public.exam_results
  for delete to authenticated using (private.has_role(auth.uid(), 'admin'::app_role));
create trigger update_exam_results_updated_at
  before update on public.exam_results
  for each row execute function public.update_updated_at_column();
create table public.exam_result_lookups (
  id bigint generated always as identity primary key,
  ip_hash text not null,
  success boolean not null default false,
  created_at timestamptz not null default now()
);
create index exam_result_lookups_ip_idx on public.exam_result_lookups (ip_hash, created_at);
grant all on public.exam_result_lookups to service_role;
alter table public.exam_result_lookups enable row level security;
create policy "Admins can read exam attestations" on storage.objects
  for select to authenticated
  using (bucket_id = 'exam-attestations' and private.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can upload exam attestations" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'exam-attestations' and private.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can update exam attestations" on storage.objects
  for update to authenticated
  using (bucket_id = 'exam-attestations' and private.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can delete exam attestations" on storage.objects
  for delete to authenticated
  using (bucket_id = 'exam-attestations' and private.has_role(auth.uid(), 'admin'::app_role));