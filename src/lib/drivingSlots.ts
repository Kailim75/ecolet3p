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
