import seoPages from "@/data/seoPages.json";

/**
 * Source unique des balises SEO (title, description, H1) des pages indexables.
 *
 * Le même fichier JSON est lu par scripts/prerender.mjs (HTML livré aux robots) et par
 * l'application (DynamicSEOHead, useDynamicH1) : le texte vu sans JavaScript et celui vu
 * après rendu ne peuvent plus diverger. Les pages départementales gardent leur formule,
 * partagée entre FormationDepartement.tsx et le prérendu.
 *
 * La table seo_overrides n'est plus lue : ses textes générés par IA ont remplacé
 * pendant des mois les balises de 67 pages sans relecture (constat du 15/09/2026).
 */
export interface PageSeo {
  title: string;
  description: string;
  h1: string;
}

const pages = seoPages as Record<string, PageSeo>;

export const getPageSeo = (path: string): PageSeo | undefined => pages[path];
