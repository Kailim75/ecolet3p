// Résultats d'admissibilité T3P : lecture des attestations CMA (texte extrait
// du PDF page par page) et helpers partagés entre l'admin et la page /resultats.

export type ExamResultStatus = "admis" | "non_admis";

export interface ExamSubject {
  code: string;
  label: string;
  coefficient: number;
  eliminatory_below: number;
  score: number;
}

export interface ParsedAttestation {
  civility: string;
  full_name: string;
  birth_date: string; // AAAA-MM-JJ
  dossier_number: string;
  department: string | null;
  exam_type: string;
  exam_date: string | null; // AAAA-MM-JJ
  global_score: number | null;
  result: ExamResultStatus;
  subjects: ExamSubject[];
  comment: string | null;
}

/** JJ/MM/AAAA → AAAA-MM-JJ (null si invalide) */
export const frDateToIso = (value: string): string | null => {
  const m = value.trim().match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (!m) return null;
  const [, d, mo, y] = m;
  const iso = `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
  const date = new Date(`${iso}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(iso) ? iso : null;
};

/** AAAA-MM-JJ → JJ/MM/AAAA */
export const isoDateToFr = (iso: string | null | undefined) =>
  iso ? iso.split("-").reverse().join("/") : "";

const toNumber = (value: string) => Number(value.replace(",", "."));

export const formatScore = (score: number | null | undefined) =>
  score == null ? "—" : score.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

/** Libellé de session à partir de la 1re date d'épreuve : « Septembre 2026 » */
export const sessionLabelFromDates = (isoDates: (string | null)[]) => {
  const first = isoDates.filter(Boolean).sort()[0];
  if (!first) return "";
  const [y, m] = first.split("-");
  return `${MONTHS[Number(m) - 1]} ${y}`;
};

/** Matières sous la note éliminatoire */
export const eliminatorySubjects = (subjects: ExamSubject[]) =>
  subjects.filter((s) => s.score < s.eliminatory_below);

/**
 * Lit le texte d'une page d'attestation CMA. Renvoie null si la page n'en est
 * pas une (identité, dossier ou date de naissance introuvables).
 */
export const parseAttestationText = (rawText: string): ParsedAttestation | null => {
  const text = rawText.replace(/\u00a0/g, " ").replace(/[’`]/g, "'");

  const identity = text.match(/(Monsieur|Madame)\s+([^,\n]+?),?\s*\n\s*Née?\s+le\s+(\d{1,2}\/\d{1,2}\/\d{4})/);
  const dossier = text.match(/Num[ée]ro de dossier\s*:\s*(\d+)(?:\s*-\s*D[ée]partement d'exercice\s*:\s*(\w+))?/);
  if (!identity || !dossier) return null;

  const birthDate = frDateToIso(identity[3]);
  if (!birthDate) return null;

  const subjects: ExamSubject[] = [];
  const subjectRe = /^\s*([A-Z]{1,2})\s+-\s+(.+?)\s+(\d+)\s+(\d+(?:[.,]\d+)?)\/20\s+(\d+(?:[.,]\d+)?)\/20\s*$/gm;
  for (const m of text.matchAll(subjectRe)) {
    subjects.push({
      code: m[1],
      label: m[2].trim(),
      coefficient: Number(m[3]),
      eliminatory_below: toNumber(m[4]),
      score: toNumber(m[5]),
    });
  }

  // Ligne « Note globale à l'admissibilité du JJ/MM/AAAA à <centre> 12,41/20 »
  // (le préambule « note globale supérieure ou égale à 10/20 » est en minuscules)
  const globalLine = text.match(/^\s*Note globale[^\n]*?(\d+(?:[.,]\d+)?)\/20\s*$/m);
  const globalScore = globalLine ? toNumber(globalLine[1]) : null;
  const examDate = globalLine?.[0].match(/du\s+(\d{1,2}\/\d{1,2}\/\d{4})/)?.[1];

  const notAdmissible = /\b(NON\s+ADMISSIBLE|N'EST\s+PAS\s+ADMISSIBLE|NON\s+ADMIS)\b/i.test(text);
  const admissible = !notAdmissible && /consid[ée]r[ée]e?\s+ADMISSIBLE/i.test(text);

  const examType =
    text.match(/[ée]preuve pratique\s+([^\n]+)/)?.[1].trim() ??
    text.match(/\b((?:VTC|TAXI|VMDTR)\s+(?:Compl[èe]te|Mobilit[ée]|Passerelle))\b/i)?.[1] ??
    text.match(/conducteur de (VTC|taxi|VMDTR)/i)?.[1].toUpperCase() ??
    "";

  const eliminated = eliminatorySubjects(subjects);
  const result: ExamResultStatus = admissible ? "admis" : "non_admis";
  let comment: string | null = null;
  if (result === "non_admis") {
    if (eliminated.length) {
      comment = `Note éliminatoire : ${eliminated.map((s) => `${s.label} (${formatScore(s.score)}/20)`).join(", ")}`;
    } else if (globalScore != null && globalScore < 10) {
      comment = "Note globale inférieure à 10/20";
    }
  }

  return {
    civility: identity[1],
    full_name: identity[2].trim().replace(/\s+/g, " "),
    birth_date: birthDate,
    dossier_number: dossier[1].padStart(8, "0"),
    department: dossier[2] ?? null,
    exam_type: examType,
    exam_date: examDate ? frDateToIso(examDate) : null,
    global_score: globalScore,
    result,
    subjects,
    comment,
  };
};
