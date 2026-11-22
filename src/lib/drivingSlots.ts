// Planning de conduite : helpers partagés par l'admin.

/** « 9h, 10:30, 14h15 » → ["09:00", "10:30", "14:15"] */
export const parseTimes = (value: string) =>
  [...new Set(value.split(/[,;\s]+/).filter(Boolean).map((t) => {
    const m = t.match(/^(\d{1,2})(?:[h:](\d{2})?)?$/i);
    if (!m) return null;
    const h = Number(m[1]);
    const min = Number(m[2] ?? 0);
    return h < 24 && min < 60 ? `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}` : null;
  }))].filter((t): t is string => !!t).sort();

/** Créneaux de 2 h par défaut selon le jour : samedi 16h-18h, 18h-20h ; dimanche 9h-11h, 11h-13h, 14h-16h, 16h-18h */
export const presetTimesFor = (isoDate: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return null;
  const day = new Date(`${isoDate}T12:00:00Z`).getUTCDay();
  if (day === 6) return "16:00, 18:00";
  if (day === 0) return "09:00, 11:00, 14:00, 16:00";
  return null;
};
