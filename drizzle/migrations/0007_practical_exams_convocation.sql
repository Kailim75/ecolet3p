-- Convocation CMA à l'épreuve d'admission, téléchargeable par l'élève depuis
-- /resultats (lien signé renvoyé par exam-results-v2). Objet du bucket privé
-- exam-attestations, dossier convocations/.
alter table public.practical_exams add column convocation_path text;