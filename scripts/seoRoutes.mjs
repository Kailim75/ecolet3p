/**
 * Routes prérendues et leurs balises SEO.
 *
 * Module séparé de prerender.mjs pour que les tests (src/test/seoPages.test.ts)
 * contrôlent exactement ce que le prérendu livrera, sans lancer de build.
 */

import { readFileSync } from 'fs';
import { join } from 'path';

// Source unique partagée avec l'application (src/lib/seoPages.ts) : accueil, pages
// statiques, villes et articles. Ne jamais recopier un titre ou une description ici.
export const seoPages = JSON.parse(
  readFileSync(join(process.cwd(), 'src/data/seoPages.json'), 'utf-8')
);

// Image de couverture de chaque article (nom de fichier sans extension de l'import
// dans src/data/blogArticlesMeta.ts). Vite hache ces assets ; prerender.mjs retrouve
// le nom haché et échoue si un article n'a pas d'image.
export const blogImageBases = {
  'qu-est-ce-que-le-t3p': 'formation-whiteboard',
  'prix-formation-taxi-2026': 'salle-formation-equipee',
  'quel-statut-juridique-chauffeur-vtc-taxi-2026': 'statuts-juridiques-t3p',
  'maitrise-numerique-ia-chauffeur-vtc-taxi': 'technologie-ia-transport',
  'anglais-chauffeur-vtc-taxi-clientele-internationale': 'anglais-chauffeur-t3p',
  'vtc-taxi-vmdtr-2026-quel-metier-choisir': 'vtc-taxi-vmdtr-comparison-2026',
  'formation-vmdtr-2026-devenir-conducteur-moto-taxi': 'vmdtr-driver-2026',
  'comment-devenir-chauffeur-taxi-2026': 'taxi-driver-2026',
  'comment-devenir-chauffeur-vtc-2026': 'vtc-driver-2026',
  'devenir-chauffeur-vtc-guide-complet-2025': 'vtc-driver-2025',
  'formation-taxi-carte-professionnelle-t3p': 'taxi-driver-formation',
  'vtc-ou-taxi-quelle-formation-choisir': 'vtc-vs-taxi-comparison',
  'etapes-obtenir-carte-professionnelle-vtc': 'carte-professionnelle-vtc',
  'facilites-paiement-formation-taxi-vtc': 'financement-formation',
  'formation-vmdtr-moto-taxi-scooter': 'moto-taxi-vmdtr',
  'formation-continue-renouvellement-carte-professionnelle': 'formation-continue',
  'renouvellement-carte-professionnelle-vtc-taxi-2026': 'renouvellement-carte-pro',
};

// Pages départementales : formule partagée avec src/pages/FormationDepartement.tsx
// (titre, description) et src/data/departementsIdfData.ts (locatif « dans »).
// Le test seoPages.test.ts vérifie que ces valeurs restent identiques.
export const departements = [
  { code: '75', nom: 'Paris', dans: 'à Paris' },
  { code: '77', nom: 'Seine-et-Marne', dans: 'en Seine-et-Marne' },
  { code: '78', nom: 'Yvelines', dans: 'dans les Yvelines' },
  { code: '91', nom: 'Essonne', dans: 'en Essonne' },
  { code: '92', nom: 'Hauts-de-Seine', dans: 'dans les Hauts-de-Seine' },
  { code: '93', nom: 'Seine-Saint-Denis', dans: 'en Seine-Saint-Denis' },
  { code: '94', nom: 'Val-de-Marne', dans: 'dans le Val-de-Marne' },
  { code: '95', nom: "Val-d'Oise", dans: "dans le Val-d'Oise" },
];
const metiersTitre = { vtc: 'VTC', taxi: 'Taxi', vmdtr: 'VMDTR' };
const metiersH1 = { vtc: 'VTC', taxi: 'Taxi', vmdtr: 'VMDTR (taxi moto)' };

export function buildRoutes() {
  const routes = Object.entries(seoPages).map(([path, seo]) => {
    const route = { path, title: seo.title, description: seo.description, h1: seo.h1 };
    if (path.startsWith('/blog/')) {
      const imageBase = blogImageBases[path.slice('/blog/'.length)];
      if (!imageBase) throw new Error(`Aucune image de couverture déclarée pour ${path}`);
      route.imageBase = imageBase;
    }
    return route;
  });

  for (const metier of ['vtc', 'taxi', 'vmdtr']) {
    const mt = metiersTitre[metier];
    for (const d of departements) {
      routes.push({
        path: `/formations/${metier}/${d.code}`,
        title: `Formation ${mt} ${d.nom} (${d.code}) — Préfecture & Examen`,
        description: `Formation ${mt} — ${d.nom} (${d.code}) : démarches préfecture, médecins agréés et examen T3P. Centre agréé à Montrouge, 94 % de réussite, dès 990 €.`,
        h1: `Formation ${metiersH1[metier]} ${d.dans} (${d.code})`,
      });
    }
  }
  return routes;
}
