// Convocations CMA à l'épreuve d'admission (examen pratique) : lecture du texte
// de chaque page et regroupement des pages d'une même convocation.
import { frDateToIso, normalizeDossier } from "@/lib/examResults";

export interface ParsedConvocation {
  full_name: string;
  email: string | null;
  dossier_number: string; // 8 chiffres, sans suffixe de convocation
  exam_type: string; // ex. « VTC Complète »
  department: string | null;
  exam_date: string; // AAAA-MM-JJ
  exam_time: string; // HH:MM
  arrival_time: string | null; // HH:MM
  location: string;
  notes: string;
}

export interface ConvocationGroup {
  pageIndexes: number[]; // 0-based, dans l'ordre du PDF
  parsed: ParsedConvocation | null;
}

const HEADER = /CONVOCATION\s+À\s+L.EXAMEN\s+D.ADMISSION/i;

const hourLabel = (hhmm: string) => hhmm.replace(":", " h ");

export const parseConvocationText = (rawText: string): ParsedConvocation | null => {
  const text = rawText.replace(/\u00a0/g, " ");
  if (!HEADER.test(text)) return null;
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

  const headerIndex = lines.findIndex((l) => HEADER.test(l));
  const fullName = lines[headerIndex + 1] ?? "";
  const email = lines.slice(headerIndex + 1, headerIndex + 8).find((l) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(l)) ?? null;

  const dossierRaw = text.match(/N°\s*de\s*dossier\s*:\s*(\S+)/i)?.[1] ?? "";
  const dossier = normalizeDossier(dossierRaw);

  const object = text.match(/Objet\s*:\s*Convocation à l.épreuve d.admission\s+(.+?)\s+(\d{2,3})\s+-\s+/i);
  const when = text.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{1,2}:\d{2})/);
  const examDate = when ? frDateToIso(when[1]) : null;
  if (!fullName || dossier.length < 5 || !object || !when || !examDate) return null;

  // Adresse du centre : les trois lignes qui suivent « A l'adresse suivante : »
  const addressIndex = lines.findIndex((l) => /adresse suivante/i.test(l));
  const location = lines
    .slice(addressIndex + 1, addressIndex + 4)
    .map((l) => l.replace(/^(\d{5}),\s*/, "$1 "))
    .join(", ");

  const arrival = text.match(/présenter devant le centre d.examen à (\d{1,2}:\d{2})/i)?.[1] ?? null;

  // Consignes propres au centre : entre « Aucun retard ne sera toléré. » et « Consignes de l'épreuve »
  const start = lines.findIndex((l) => /Aucun retard ne sera toléré/i.test(l));
  const end = lines.findIndex((l, i) => i > start && /^Consignes de l.épreuve/i.test(l));
  const extra = start >= 0 ? lines.slice(start + 1, end > start ? end : start + 1) : [];
  const notes = [
    `Arrivée à ${hourLabel(arrival ?? when[2])} avec la convocation, une pièce d'identité originale et le permis de conduire.`,
    ...extra.map((l) => l.replace(/\s+/g, " ")),
  ].join(" ");

  return {
    full_name: fullName,
    email: email ? email.toLowerCase() : null,
    dossier_number: dossier.padStart(8, "0"),
    exam_type: object[1].trim(),
    department: object[2],
    exam_date: examDate,
    exam_time: when[2].padStart(5, "0"),
    arrival_time: arrival ? arrival.padStart(5, "0") : null,
    location,
    notes,
  };
};

/** Regroupe les pages : une page sans en-tête de convocation prolonge la précédente. */
export const groupConvocationPages = (pageTexts: string[]): ConvocationGroup[] => {
  const groups: ConvocationGroup[] = [];
  pageTexts.forEach((text, index) => {
    if (HEADER.test(text) || groups.length === 0) {
      groups.push({ pageIndexes: [index], parsed: parseConvocationText(text) });
    } else {
      groups[groups.length - 1].pageIndexes.push(index);
    }
  });
  return groups;
};
