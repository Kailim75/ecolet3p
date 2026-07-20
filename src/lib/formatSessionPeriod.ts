import { format, isSameMonth, isSameYear } from "date-fns";
import { fr } from "date-fns/locale";

/**
 * Formate la période d'une session en français.
 *
 * Une session s'étale souvent sur plusieurs jours (ex. les soirées du 14 au 25 septembre) :
 * n'afficher que la date de début laisse croire à une session d'une seule journée.
 * Les mois restent en minuscules, conformément à l'usage français — ne pas appliquer
 * de classe CSS `capitalize` sur le résultat, elle mettrait une majuscule à chaque mot.
 */
export const formatSessionPeriod = (startDate: string, endDate?: string | null): string => {
  const start = new Date(startDate);

  if (!endDate || endDate === startDate) {
    return format(start, "d MMMM yyyy", { locale: fr });
  }

  const end = new Date(endDate);

  if (isSameYear(start, end) && isSameMonth(start, end)) {
    return `du ${format(start, "d", { locale: fr })} au ${format(end, "d MMMM yyyy", { locale: fr })}`;
  }
  if (isSameYear(start, end)) {
    return `du ${format(start, "d MMMM", { locale: fr })} au ${format(end, "d MMMM yyyy", { locale: fr })}`;
  }
  return `du ${format(start, "d MMMM yyyy", { locale: fr })} au ${format(end, "d MMMM yyyy", { locale: fr })}`;
};
