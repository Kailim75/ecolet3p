// CMA Exam Calendar data extracted from official PDFs (updated Dec 2025)

export interface ExamSession {
  session: string;
  inscriptionDeadline: string;
  convocations: string;
  places: string;
}

export interface AdmissionSession {
  session: string;
  admissionDates: string;
  inscriptionDeadline: string;
}

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

// Calendrier Admission — Épreuves pratiques par département IDF
export const admissionSessions: AdmissionSession[] = [
  { session: "Janvier", admissionDates: "30 mars – 17 avril 2026", inscriptionDeadline: "19 décembre 2025 à 12h" },
  { session: "Février", admissionDates: "27 avril – 22 mai 2026", inscriptionDeadline: "23 janvier 2026 à 12h" },
  { session: "Mars", admissionDates: "26 mai – 12 juin 2026", inscriptionDeadline: "27 février 2026 à 12h" },
  { session: "Avril", admissionDates: "29 juin – 17 juillet 2026", inscriptionDeadline: "27 mars 2026 à 12h" },
  { session: "Mai", admissionDates: "27 juillet – 14 août 2026", inscriptionDeadline: "24 avril 2026 à 12h" },
  { session: "Juin", admissionDates: "7 – 25 septembre 2026", inscriptionDeadline: "29 mai 2026 à 12h" },
  { session: "Septembre", admissionDates: "30 nov. – 18 déc. 2026", inscriptionDeadline: "28 août 2026 à 12h" },
  { session: "Octobre", admissionDates: "4 – 22 janvier 2027", inscriptionDeadline: "25 septembre 2026 à 12h" },
  { session: "Novembre", admissionDates: "25 janv. – 12 fév. 2027", inscriptionDeadline: "16 octobre 2026 à 12h" },
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
