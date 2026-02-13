// CMA Exam Calendar data extracted from official PDFs (updated Dec 2025)

export interface ExamSession {
  session: string;
  inscriptionDeadline: string;
  convocations: string;
  places: string;
}

export interface AdmissionSession {
  session: string;
  dates: string; // shared date range for practical exams
  inscriptionDeadline: string;
}

// Départements affichés pour l'admission (pratique)
export const admissionDepartements = ["75", "92", "93", "94"] as const;

// Calendrier Régional T3P — Épreuves d'admissibilité (théorique)
export const admissibiliteSessions: ExamSession[] = [
  { session: "Janvier", inscriptionDeadline: "19 décembre 2025 à 12h", convocations: "13–20 janvier 2026", places: "3 000 à 5 000" },
  { session: "Février", inscriptionDeadline: "23 janvier 2026 à 12h", convocations: "10–17 février 2026", places: "3 000 à 5 000" },
  { session: "Mars", inscriptionDeadline: "27 février 2026 à 12h", convocations: "17–24 mars 2026", places: "3 000 à 5 000" },
  { session: "Avril", inscriptionDeadline: "27 mars 2026 à 12h", convocations: "14–21 avril 2026", places: "3 000 à 5 000" },
  { session: "Mai", inscriptionDeadline: "24 avril 2026 à 12h", convocations: "12–19 mai 2026", places: "3 000 à 5 000" },
  { session: "Juin", inscriptionDeadline: "29 mai 2026 à 12h", convocations: "16–23 juin 2026", places: "3 000 à 5 000" },
  { session: "Septembre", inscriptionDeadline: "28 août 2026 à 12h", convocations: "15–22 septembre 2026", places: "3 000 à 5 000" },
  { session: "Octobre", inscriptionDeadline: "25 septembre 2026 à 12h", convocations: "13–20 octobre 2026", places: "3 000 à 5 000" },
  { session: "Novembre", inscriptionDeadline: "16 octobre 2026 à 12h", convocations: "3–10 novembre 2026", places: "3 000 à 5 000" },
];

// Calendrier Admission — Épreuves pratiques (depts 75, 92, 93, 94)
export const admissionSessions: AdmissionSession[] = [
  { session: "Janvier", dates: "30/03 – 17/04/2026", inscriptionDeadline: "19 décembre 2025 à 12h" },
  { session: "Février", dates: "27/04 – 22/05/2026", inscriptionDeadline: "23 janvier 2026 à 12h" },
  { session: "Mars", dates: "26/05 – 12/06/2026", inscriptionDeadline: "27 février 2026 à 12h" },
  { session: "Avril", dates: "29/06 – 17/07/2026", inscriptionDeadline: "27 mars 2026 à 12h" },
  { session: "Mai", dates: "27/07 – 14/08/2026", inscriptionDeadline: "24 avril 2026 à 12h" },
  { session: "Juin", dates: "07/09 – 25/09/2026", inscriptionDeadline: "29 mai 2026 à 12h" },
  { session: "Septembre", dates: "30/11 – 18/12/2026", inscriptionDeadline: "28 août 2026 à 12h" },
  { session: "Octobre", dates: "04/01 – 22/01/2027", inscriptionDeadline: "25 septembre 2026 à 12h" },
  { session: "Novembre", dates: "25/01 – 12/02/2027", inscriptionDeadline: "16 octobre 2026 à 12h" },
];

// Helper to determine if a session deadline has passed
export const isDeadlinePassed = (deadline: string): boolean => {
  // Extract date from format like "23 janvier 2026 à 12h"
  const months: Record<string, number> = {
    janvier: 0, février: 1, mars: 2, avril: 3, mai: 4, juin: 5,
    juillet: 6, août: 7, septembre: 8, octobre: 9, novembre: 10, décembre: 11,
  };
  const match = deadline.match(/(\d+)\s+([\wéûàô]+)\s+(\d{4})/);
  if (!match) return false;
  const [, day, month, year] = match;
  const monthIndex = months[month.toLowerCase()];
  if (monthIndex === undefined) return false;
  const deadlineDate = new Date(Number(year), monthIndex, Number(day), 12, 0);
  return new Date() > deadlineDate;
};

// Find next upcoming session
export const getNextSession = (sessions: ExamSession[]): ExamSession | null => {
  return sessions.find((s) => !isDeadlinePassed(s.inscriptionDeadline)) ?? null;
};
