-- Espace résultats : chaque candidat consulte SON résultat d'admissibilité
-- (n° de dossier CMA + date de naissance) et télécharge son attestation.
-- Aucune lecture publique : la consultation passe par l'Edge Function
-- exam-result-lookup (service_role), seuls les admins lisent la table.

create table public.exam_results (
  id uuid primary key default gen_random_uuid(),
  session_label text not null,                -- ex. « Septembre 2026 »
  dossier_number text not null,               -- n° de dossier CMA, 8 chiffres
  birth_date date not null,
  civility text,                              -- Monsieur / Madame
  full_name text not null,                    -- tel qu'imprimé sur l'attestation
  exam_type text not null,                    -- ex. « VTC Complète »
  department text,
  exam_date date,
  global_score numeric(4,2),
  result text not null check (result in ('admis', 'non_admis')),
  subjects jsonb not null default '[]'::jsonb, -- [{label, coefficient, eliminatory_below, score}]
  comment text,                               -- ex. motif de non-admissibilité
  attestation_path text,                      -- objet du bucket exam-attestations
  is_published boolean not null default true,
  expires_at date not null default (current_date + interval '1 year'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (session_label, dossier_number)
);

create index exam_results_lookup_idx on public.exam_results (dossier_number, birth_date);

alter table public.exam_results enable row level security;

create policy "Admins can view exam results" on public.exam_results
  for select to authenticated using (has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can insert exam results" on public.exam_results
  for insert to authenticated with check (has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can update exam results" on public.exam_results
  for update to authenticated using (has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can delete exam results" on public.exam_results
  for delete to authenticated using (has_role(auth.uid(), 'admin'::app_role));

create trigger update_exam_results_updated_at
  before update on public.exam_results
  for each row execute function public.update_updated_at_column();

-- Journal des tentatives de consultation (limitation anti-énumération).
-- Écrit uniquement par l'Edge Function ; IP stockée hachée.
create table public.exam_result_lookups (
  id bigint generated always as identity primary key,
  ip_hash text not null,
  success boolean not null default false,
  created_at timestamptz not null default now()
);

create index exam_result_lookups_ip_idx on public.exam_result_lookups (ip_hash, created_at);

alter table public.exam_result_lookups enable row level security;
-- Aucune policy : inaccessible à anon/authenticated, service_role uniquement.

-- Bucket privé des attestations (une par candidat)
insert into storage.buckets (id, name, public)
values ('exam-attestations', 'exam-attestations', false)
on conflict (id) do nothing;

create policy "Admins can read exam attestations" on storage.objects
  for select to authenticated
  using (bucket_id = 'exam-attestations' and has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can upload exam attestations" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'exam-attestations' and has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can update exam attestations" on storage.objects
  for update to authenticated
  using (bucket_id = 'exam-attestations' and has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can delete exam attestations" on storage.objects
  for delete to authenticated
  using (bucket_id = 'exam-attestations' and has_role(auth.uid(), 'admin'::app_role));
