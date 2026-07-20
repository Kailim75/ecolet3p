import { Sun, Moon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SessionFormat = {
  label: string;
  Icon: LucideIcon;
  className: string;
};

/**
 * Déduit le format d'une session à partir de son heure de début.
 *
 * Les sessions du soir commencent à 18h, celles de journée à 9h30 : le seuil de 17h
 * les sépare sans ambiguïté. On dérive plutôt que d'ajouter un champ en base, pour
 * qu'une session créée depuis l'administration soit automatiquement bien étiquetée.
 *
 * Les classes réutilisent les jetons existants (accent = orange, primary = vert) :
 * ne pas introduire de nouvelle couleur.
 */
export const getSessionFormat = (startTime?: string | null): SessionFormat => {
  const hour = Number.parseInt((startTime ?? "").slice(0, 2), 10);
  const isEvening = Number.isFinite(hour) && hour >= 17;

  return isEvening
    ? { label: "Soir", Icon: Moon, className: "bg-primary/10 text-primary" }
    : { label: "Journée", Icon: Sun, className: "bg-accent/10 text-accent" };
};
