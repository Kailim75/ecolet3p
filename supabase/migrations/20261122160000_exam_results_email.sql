-- E-mail de l'élève (saisi par l'école) : reçoit la confirmation de sa séance
-- de conduite. Lisible par les admins seulement (RLS existante d'exam_results) ;
-- jamais renvoyé par les fonctions publiques.
alter table public.exam_results add column email text;
