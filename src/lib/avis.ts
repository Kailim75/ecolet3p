import avisGoogle from "@/data/avisGoogle.json";

/**
 * Source unique des avis Google.
 * Le nombre d'avis et la note évoluent : ils ne doivent JAMAIS être écrits en dur
 * dans une page ou un composant. Pour les mettre à jour, un seul fichier à éditer :
 * src/data/avisGoogle.json (relevé sur la fiche Google du centre).
 */
export { avisGoogle };

/** Nombre d'avis Google, ex. 367 */
export const nbAvisGoogle = avisGoogle.nombre;

/** Note affichée en français, ex. "5,0" */
export const noteGoogle = avisGoogle.noteAffichee;

/** Note numérique pour les données structurées (JSON-LD), ex. 5 */
export const noteGoogleNumerique = avisGoogle.note;

/** Lien vers la fiche Google du centre (onglet avis) */
export const urlAvisGoogle = avisGoogle.url;

/** Libellé court : le nombre d'avis, suivi de « avis Google » */
export const libelleAvisGoogle = `${avisGoogle.nombre} avis Google`;

/** Libellé complet : la note affichée sur 5, un tiret cadratin, puis le libellé court */
export const libelleNoteAvisGoogle = `${avisGoogle.noteAffichee}/5 — ${avisGoogle.nombre} avis Google`;
