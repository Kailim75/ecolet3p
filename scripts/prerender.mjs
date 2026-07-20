/**
 * Post-build prerendering script for ecolet3p.fr
 * 
 * Generates per-route HTML files from the built index.html template,
 * replacing SEO metadata (title, description, canonical, OG, Twitter)
 * so crawlers and social scrapers see correct metadata without JS.
 * 
 * Usage: node scripts/prerender.mjs
 * Runs automatically after `vite build` via package.json postbuild script.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';

// Source unique des titres de villes, partagée avec l'application (FormationVille.tsx).
// Ne jamais recopier ces titres ici : toute divergence se traduit par un titre différent
// dans le HTML livré et dans le rendu, donc par un titre imprévisible dans Google.
const cityTitles = JSON.parse(
  readFileSync(join(process.cwd(), 'src/data/citySeoTitles.json'), 'utf-8')
);

const DIST = join(process.cwd(), 'dist');
const SITE_URL = 'https://ecolet3p.fr';
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

// ─── Route SEO data ───────────────────────────────────────────────────────────
// Each route needs: path, title, description. Optional: ogTitle, ogDescription.
// Homepage (/) is already correct in index.html — included for completeness.

const routes = [
  // ── Pillar pages ──
  {
    path: '/',
    title: 'Formation Taxi VTC VMDTR Montrouge | 94% Réussite, 990€',
    description: 'Centre de formation agréé Taxi, VTC et VMDTR à Montrouge (92). 94% de réussite, +2000 chauffeurs formés. À partir de 990€ en 4x sans frais. Inscription ouverte toute l\'année.',
    h1: 'Devenez chauffeur professionnel à partir de 990€.',
  },
  {
    path: '/formations',
    title: 'Formations Taxi VTC VMDTR | ECOLE T3P',
    description: 'Catalogue complet : formations initiales Taxi VTC VMDTR dès 990€, continues, passerelles, packs économiques et programme parrainage. Paiement 4× sans frais.',
    h1: 'Formations TAXI · VTC · VMDTR',
  },
  {
    path: '/formations/taxi',
    title: 'Formation Taxi Montrouge 92 | 94% Réussite, dès 990€ en 4x',
    description: 'Formation Taxi agréée Préfecture à Montrouge (92). 94% de réussite, à partir de 990€ en 4x sans frais. Carte professionnelle Taxi.',
    ogTitle: 'Formation Taxi Initiale à Montrouge — ECOLE T3P',
    ogDescription: 'Formation initiale Taxi à Montrouge. Centre agréé Préfecture, 94% de réussite.',
    h1: 'Formation Taxi à Montrouge — Carte Professionnelle',
  },
  {
    path: '/formations/vtc',
    title: 'Formation VTC Paris 92 - Uber Bolt Heetch | dès 990€ en 4x',
    description: 'Formation VTC agréée Préfecture à Montrouge (92). 94% de réussite, à partir de 990€ en 4x sans frais. Uber, Bolt, Heetch.',
    ogTitle: 'Formation VTC Initiale à Montrouge — ECOLE T3P',
    ogDescription: 'Formation initiale VTC à Montrouge. 94% de réussite, 990€ en 4x sans frais.',
    h1: 'Formation VTC Initiale à Montrouge — à partir de 990€',
  },
  {
    path: '/formations/vmdtr',
    title: 'Formation Moto-Taxi VMDTR Paris 92 - Carte Pro | dès 990€',
    description: 'Formation VMDTR moto-taxi agréée à Montrouge (92). 94% de réussite, 990€ en 4x sans frais. Permis A requis.',
    ogTitle: 'Formation VMDTR Moto-Taxi à Montrouge — ECOLE T3P',
    ogDescription: 'Formation VMDTR à Montrouge. Centre agréé Préfecture, 94% de réussite.',
    h1: 'Formation VMDTR Moto-Taxi à Montrouge',
  },

  // ── Formations continues ──
  {
    path: '/formations/continue-taxi',
    title: 'Formation Continue Taxi 14h Montrouge — 239€ | ECOLE T3P',
    description: 'Formation continue obligatoire Taxi 14h à Montrouge (92). Renouvelez votre carte professionnelle tous les 5 ans. Centre agréé Préfecture. Attestation immédiate.',
    h1: 'Formation Continue Taxi',
  },
  {
    path: '/formations/continue-vtc',
    title: 'Formation Continue VTC 14h Montrouge — 170€ | ECOLE T3P',
    description: 'Formation continue obligatoire VTC de 14h pour renouveler votre carte professionnelle. Centre agréé Préfecture à Montrouge (92). Attestation délivrée le jour même.',
    h1: 'Formation Continue VTC',
  },
  {
    path: '/formations/continue-vmdtr',
    title: 'Formation Continue VMDTR 14h Montrouge — 239€ | ECOLE T3P',
    description: 'Formation continue obligatoire VMDTR (moto-taxi) 14h pour renouveler votre carte professionnelle. Centre agréé Préfecture à Montrouge (92). Attestation immédiate.',
    h1: 'Formation Continue VMDTR',
  },
  {
    path: '/formations/renouvellement',
    title: 'Renouvellement Carte Pro VTC Taxi VMDTR | T3P',
    description: 'Renouvelez votre carte pro VTC, Taxi ou VMDTR à Montrouge (92). Formation continue agréée préfecture. Attestation le jour même. Dès 170€.',
    h1: 'Renouvellement de Carte Professionnelle',
  },

  // ── Services ──
  {
    path: '/passerelle-vtc-taxi',
    title: 'Passerelle VTC Taxi VMDTR — 665€ | ECOLE T3P',
    description: 'Formation passerelle VTC ↔ Taxi ↔ VMDTR à Montrouge (92). 665€ tout compris, frais d\'examen inclus. 94% de réussite.',
    h1: 'Passerelle VTC ↔ Taxi ↔ VMDTR',
  },
  {
    path: '/stage-recuperation-points',
    title: 'Stage Récupération de Points Montrouge 92 | ECOLE T3P',
    description: 'Stage de récupération de points en 2 jours (14h) à Montrouge (92). Récupérez jusqu\'à 4 points. 250€. Attestation immédiate. Sessions mensuelles.',
    h1: 'Stage de Récupération de Points',
  },
  {
    path: '/renouvellement-carte-professionnelle',
    title: 'Renouvellement Carte Professionnelle Taxi VTC | T3P',
    description: 'Tout savoir sur le renouvellement de votre carte professionnelle Taxi, VTC ou VMDTR. Formation continue 14h obligatoire. ECOLE T3P Montrouge.',
    h1: 'Renouvellement de Carte Professionnelle',
  },
  {
    path: '/services/location-vehicule-examen',
    title: 'Location Véhicule Examen Taxi VTC | ECOLE T3P',
    description: 'Location de véhicule pour passer l\'examen pratique Taxi ou VTC. Véhicule conforme aux exigences de la CMA. Réservation facile chez ECOLE T3P Montrouge.',
    h1: 'Location de Véhicule pour l\'Examen',
  },
  {
    path: '/formation-accessibilite-pmr',
    title: 'Formation PMR 14h Montrouge (92) — 290€ | ECOLE T3P',
    description: 'Formation transport de personnes à mobilité réduite (PMR) 14h à Montrouge (92). Attestation officielle. 290€ payable en 4× sans frais.',
    h1: 'Formation Accessibilité PMR',
  },
  {
    path: '/accompagnement-gestion-activite',
    title: 'Accompagnement Gestion Activité Chauffeur | ECOLE T3P',
    description: 'Accompagnement pour optimiser la gestion de votre activité de chauffeur VTC, Taxi ou VMDTR. Comptabilité, fiscalité, stratégie.',
    h1: 'Accompagnement Gestion d\'Activité',
  },
  {
    path: '/aide-administrative-creation-entreprise',
    title: 'Aide Administrative Création Entreprise VTC Taxi | T3P',
    description: 'Accompagnement administratif pour créer votre entreprise de transport VTC, Taxi ou VMDTR. De l\'immatriculation à la première course.',
    h1: 'Aide Administrative — Création d\'Entreprise',
  },
  {
    path: '/formations/anglais-professionnel',
    title: 'Formation Anglais Chauffeur VTC Taxi | ECOLE T3P',
    description: 'Formation anglais professionnel pour chauffeurs VTC et Taxi. Vocabulaire transport, accueil clientèle internationale.',
    h1: 'Formation Anglais Professionnel',
  },
  {
    path: '/formations/formule-soiree',
    title: 'Formation Soirée Taxi VTC 990€ | ECOLE T3P',
    description: 'Formez-vous le soir au métier de Taxi, VTC ou VMDTR. Sessions 18h-21h30 à Montrouge. 990€ tout compris, 4× sans frais.',
    h1: 'Formation Soirée — Taxi VTC VMDTR',
  },
  {
    path: '/formations/montrouge',
    title: 'Formation Taxi VTC Montrouge (92) | ECOLE T3P',
    description: 'Centre de formation Taxi VTC VMDTR à Montrouge (92120). Agrément Préfecture, 94% de réussite, à partir de 990€. Métro ligne 4.',
    h1: 'Formation Taxi VTC VMDTR à Montrouge',
  },
  {
    path: '/paiement',
    title: 'Paiement en 4× sans Frais — Alma | ECOLE T3P',
    description: 'Payez votre formation Taxi, VTC ou VMDTR en 2, 3 ou 4 fois sans frais avec Alma. Réponse immédiate, sans justificatif.',
    h1: 'Paiement en 4× sans frais',
  },
  {
    path: '/calendrier-examens',
    title: 'Calendrier Examens CMA 2026 | ECOLE T3P',
    description: 'Dates des examens CMA 2026 en Île-de-France : admissibilité et admission pour les cartes Taxi, VTC et VMDTR. Calendrier officiel.',
    h1: 'Calendrier des Examens CMA 2026',
  },
  {
    path: '/audit-rentabilite',
    title: 'Audit Rentabilité Chauffeur VTC Taxi VMDTR | ECOLE T3P',
    description: 'Audit stratégique gratuit : évaluez votre rentabilité en VTC, Taxi ou VMDTR. Pré-audit instantané + rapport détaillé 12 mois.',
    h1: 'Audit de Rentabilité Chauffeur',
  },
  {
    path: '/audit-rentabilite-chauffeur',
    title: 'Audit Rentabilité Chauffeur Professionnel | ECOLE T3P',
    description: 'Évaluez votre potentiel de revenus en tant que chauffeur VTC, Taxi ou VMDTR. Simulation gratuite et plan d\'action personnalisé.',
    h1: 'Audit Rentabilité Chauffeur',
  },
  {
    path: '/guide-formation',
    title: 'Guide Formation Taxi VTC VMDTR | ECOLE T3P',
    description: 'Programme détaillé de nos formations Taxi, VTC et VMDTR : modules, durée, examen CMA et accompagnement vers la carte professionnelle.',
    h1: 'Guide des Formations',
  },

  // ── Institutionnel ──
  {
    path: '/blog',
    title: 'Blog Formation Taxi VTC VMDTR | ECOLE T3P',
    description: 'Articles, guides et conseils pour réussir votre examen Taxi, VTC ou VMDTR. Reconversion, réglementation 2026, astuces et retours d\'expérience.',
    h1: 'Blog & Actualités',
  },
  {
    path: '/contact',
    title: 'Contact ECOLE T3P Montrouge - 01 88 75 05 55 | WhatsApp',
    description: 'Contactez ECOLE T3P pour votre formation Taxi, VTC ou VMDTR. Réponse sous 24h. 3 rue Corneille, 92120 Montrouge. Appelez le 01 88 75 05 55.',
    h1: 'Contactez-nous',
  },
  {
    path: '/a-propos',
    title: 'À Propos d\'ECOLE T3P — Formation Taxi VTC',
    description: 'Découvrez ECOLE T3P, centre de formation Taxi VTC VMDTR à Montrouge depuis 2014. Taux de réussite 94%, 359 avis 5 étoiles. Formateurs experts du transport.',
    h1: 'À Propos d\'ECOLE T3P',
  },
  {
    path: '/formations/villes',
    title: 'Formations Taxi VTC près de chez vous | ECOLE T3P',
    description: 'ECOLE T3P à Montrouge forme des chauffeurs Taxi, VTC et VMDTR de toute l\'Île-de-France. Trouvez votre ville : 92, 94, 93, 91, 78 et Paris.',
    h1: 'Formations par ville en Île-de-France',
  },
  {
    path: '/mentions-legales',
    title: 'Mentions Légales — ECOLE T3P',
    description: 'Mentions légales du site ecolet3p.fr. ECOLE T3P, centre de formation transport de personnes, Montrouge (92).',
    h1: 'Mentions Légales',
  },
  {
    path: '/politique-de-confidentialite',
    title: 'Politique de Confidentialité — ECOLE T3P',
    description: 'Politique de confidentialité et protection des données personnelles du site ecolet3p.fr. ECOLE T3P, Montrouge.',
    h1: 'Politique de Confidentialité',
  },
];

// ── Blog articles ─────────────────────────────────────────────────────────────
const blogArticles = [
  { slug: 'quel-statut-juridique-chauffeur-vtc-taxi-2026', title: 'Quel statut juridique choisir pour devenir chauffeur VTC ou Taxi en 2026 ?', description: 'Comparatif complet des statuts juridiques pour chauffeurs VTC et Taxi : auto-entrepreneur, SASU, EURL, SARL. Avantages, inconvénients et fiscalité 2026.' },
  { slug: 'maitrise-numerique-ia-chauffeur-vtc-taxi', title: 'Maîtrise du numérique et de l\'IA : un atout indispensable pour les chauffeurs VTC et Taxi', description: 'L\'importance de maîtriser les outils numériques et l\'intelligence artificielle pour les chauffeurs VTC et Taxi en 2026.' },
  { slug: 'anglais-chauffeur-vtc-taxi-clientele-internationale', title: 'L\'anglais pour les chauffeurs VTC et Taxi : un atout pour la clientèle internationale', description: 'Pourquoi l\'anglais est essentiel pour les chauffeurs VTC et Taxi en 2026. Vocabulaire, phrases clés et conseils.' },
  { slug: 'vtc-taxi-vmdtr-2026-quel-metier-choisir', title: 'VTC vs Taxi vs VMDTR en 2026 : Quel métier choisir ?', description: 'Comparatif complet VTC, Taxi et VMDTR en 2026 : formation, revenus, investissement, avantages et inconvénients.' },
  { slug: 'formation-vmdtr-2026-devenir-conducteur-moto-taxi', title: 'Formation VMDTR 2026 : Devenir conducteur moto-taxi', description: 'Guide complet 2026 pour devenir conducteur moto-taxi VMDTR : formation 14h, examen, carte professionnelle et réglementation.' },
  { slug: 'comment-devenir-chauffeur-taxi-2026', title: 'Comment devenir chauffeur Taxi en 2026 : Le guide complet', description: 'Guide ultime 2026 pour devenir chauffeur Taxi : licence ADS, formation, examen, réglementation ZFE et revenus.' },
  { slug: 'comment-devenir-chauffeur-vtc-2026', title: 'Comment devenir chauffeur VTC en 2026 : Le guide ultime', description: 'Guide complet 2026 pour devenir chauffeur VTC : nouvelles réglementations, ZFE, véhicules électriques, formation et revenus.' },
  { slug: 'devenir-chauffeur-vtc-guide-complet-2025', title: 'Devenir chauffeur VTC en 2025 : démarches et conseils pratiques', description: 'Les étapes concrètes pour obtenir votre carte VTC en 2025 : prérequis, inscription à l\'examen, choix du véhicule.' },
  { slug: 'formation-taxi-carte-professionnelle-t3p', title: 'Carte professionnelle Taxi : formation, examen et obtention', description: 'Comment obtenir la carte professionnelle Taxi T3P : prérequis, programme de formation, épreuves de l\'examen CMA.' },
  { slug: 'vtc-ou-taxi-quelle-formation-choisir', title: 'VTC ou Taxi : quelle formation choisir selon votre profil ?', description: 'VTC ou Taxi ? Comparez revenus, flexibilité, investissement initial et formation pour choisir le métier adapté.' },
  { slug: 'etapes-obtenir-carte-professionnelle-vtc', title: 'Les 5 étapes pour obtenir sa carte professionnelle VTC', description: 'Découvrez les 5 étapes clés pour obtenir votre carte professionnelle VTC : formation, examen, dossier préfecture.' },
  { slug: 'facilites-paiement-formation-taxi-vtc', title: 'Payer sa formation Taxi VTC en 4× sans frais avec Alma', description: 'Financez votre formation Taxi ou VTC à 990€ en 2, 3 ou 4 mensualités sans frais via Alma. ECOLE T3P Montrouge.' },
  { slug: 'formation-vmdtr-moto-taxi-scooter', title: 'VMDTR : scooter ou moto pour le transport de passagers ?', description: 'Moto ou maxi-scooter pour exercer en VMDTR ? Comparatif des véhicules, équipements obligatoires et conseils.' },
  { slug: 'formation-continue-renouvellement-carte-professionnelle', title: 'Renouvellement carte pro : formation continue obligatoire', description: 'Votre carte VTC, Taxi ou VMDTR expire bientôt ? Durée, programme et tarifs de la formation continue obligatoire.' },
  { slug: 'renouvellement-carte-professionnelle-vtc-taxi-2026', title: 'Renouvellement carte professionnelle VTC Taxi 2026', description: 'Comment renouveler votre carte professionnelle VTC, Taxi ou VMDTR en 2026 ? Démarches, délais et formation continue obligatoire.' },
  { slug: 'financement-formation-taxi-vtc', title: 'Financement formation Taxi et VTC sans CPF', description: 'Solutions de paiement et aides disponibles pour financer votre formation Taxi ou VTC. Alma 4× sans frais.' },
  { slug: 'carte-professionnelle-vtc', title: 'Carte professionnelle VTC : obtention et renouvellement', description: 'Tout savoir sur la carte professionnelle VTC : obtention, examen, renouvellement et démarches administratives.' },
  { slug: 'formation-continue-taxi-vtc', title: 'Formation continue Taxi VTC : tout savoir', description: 'Tout savoir sur la formation continue obligatoire pour le renouvellement de votre carte professionnelle Taxi ou VTC.' },
  { slug: 'moto-taxi-vmdtr', title: 'Moto-taxi VMDTR : tout savoir sur le métier', description: 'Réglementation, équipements, revenus et perspectives du métier de moto-taxi VMDTR en Île-de-France.' },
  { slug: 'devenir-chauffeur-vtc-2025', title: 'Devenir chauffeur VTC en 2025 : guide complet', description: 'Guide complet pour devenir chauffeur VTC en 2025 : formation, examen, carte professionnelle et création d\'entreprise.' },
];

for (const article of blogArticles) {
  routes.push({
    path: `/blog/${article.slug}`,
    title: `${article.title} | ECOLE T3P`,
    description: article.description,
    h1: article.title,
  });
}

// ── City pages ────────────────────────────────────────────────────────────────
const citySlugs = [
  'bagneux', 'vanves', 'malakoff', 'chatillon', 'clamart', 'issy-les-moulineaux',
  'paris-14', 'paris-15', 'paris-13', 'fontenay-aux-roses', 'sceaux', 'antony',
  'bourg-la-reine', 'le-plessis-robinson', 'boulogne-billancourt', 'meudon',
  'nanterre', 'colombes', 'ivry-sur-seine', 'vitry-sur-seine', 'le-kremlin-bicetre',
  'gentilly', 'arcueil', 'cachan', 'villejuif', 'vincennes', 'creteil',
  'la-courneuve', 'longjumeau', 'conflans-sainte-honorine', 'l-hay-les-roses',
  'chevilly-larue',
];

function slugToName(slug) {
  return slug
    .split('-')
    .map(w => {
      if (['sur', 'les', 'aux', 'sous', 'en', 'la', 'le', 'de', 'du', 'l'].includes(w)) return w;
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ')
    .replace(/^l /, "L'")
    .replace(/ l /, " l'");
}

for (const slug of citySlugs) {
  const name = slugToName(slug);
  routes.push({
    path: `/formations/${slug}`,
    title: cityTitles[slug],
    description: `Formation Taxi, VTC et VMDTR près de ${name}. ECOLE T3P à Montrouge (92), 94% de réussite, à partir de 990€.`,
    h1: `Formation Taxi VTC VMDTR ${name}`,
  });
}

// ── Pages départementales ─────────────────────────────────────────────────────
// Ces 24 routes existent dans App.tsx et dans le sitemap depuis juin 2026 mais
// n'étaient pas prérendues : les crawlers sans JS recevaient le repli index.html.
// Les formules de titre et de description doivent rester IDENTIQUES à celles de
// src/pages/FormationDepartement.tsx, sinon le HTML livré et le rendu divergent.
const departements = [
  { code: '75', nom: 'Paris' },
  { code: '77', nom: 'Seine-et-Marne' },
  { code: '78', nom: 'Yvelines' },
  { code: '91', nom: 'Essonne' },
  { code: '92', nom: 'Hauts-de-Seine' },
  { code: '93', nom: 'Seine-Saint-Denis' },
  { code: '94', nom: 'Val-de-Marne' },
  { code: '95', nom: "Val-d'Oise" },
];
const metiersTitre = { vtc: 'VTC', taxi: 'Taxi', vmdtr: 'VMDTR' };
for (const metier of ['vtc', 'taxi', 'vmdtr']) {
  const mt = metiersTitre[metier];
  for (const d of departements) {
    routes.push({
      path: `/formations/${metier}/${d.code}`,
      title: `Formation ${mt} ${d.nom} (${d.code}) — Préfecture & Examen`,
      description: `Formation ${mt} — ${d.nom} (${d.code}) : démarches préfecture, médecins agréés et examen T3P. Centre agréé à Montrouge, 94 % de réussite, dès 990 €.`,
      h1: `Formation ${mt} — ${d.nom} (${d.code})`,
    });
  }
}


// ─── HTML transformation ──────────────────────────────────────────────────────

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function getCanonical(path) {
  if (path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}

function transformHtml(template, route) {
  let html = template;
  const canonical = getCanonical(route.path);
  const ogTitle = route.ogTitle || route.title;
  const ogDesc = route.ogDescription || route.description;
  const h1 = route.h1 || route.title.split('|')[0].trim();

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(route.title)}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeHtml(route.description)}"`
  );

  // Remove meta keywords (useless for SEO)
  html = html.replace(/<meta name="keywords" content="[^"]*"\s*\/?>\s*\n?/, '');

  // Add canonical link (inject before </head> since helmet manages it client-side)
  // We add it as a static tag; helmet will override on hydration
  if (!html.includes('rel="canonical"')) {
    html = html.replace('</head>', `    <link rel="canonical" href="${canonical}" />\n  </head>`);
  } else {
    // There might not be a canonical in the template, but if there were:
    html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonical}"`);
  }

  // Replace OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${escapeHtml(ogTitle)}"`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escapeHtml(ogDesc)}"`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${canonical}"`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${escapeHtml(ogTitle)}"`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${escapeHtml(ogDesc)}"`
  );

  // Remplace TOUT le bloc de repli par un contenu propre à la route.
  //
  // Ce bloc était auparavant recopié à l'identique sur les 105 pages (1441 mots, même
  // empreinte md5), et seul le H1 changeait. Conséquence mesurée dans Search Console
  // le 20/07/2026 : Google choisissait « https://ecolet3p.fr/ » comme canonique pour
  // des pages qui déclaraient pourtant la leur, et refusait de les indexer — 13 pages
  // indexées sur 105. Le contenu réel des pages vient du rendu React ; ce repli ne doit
  // donc être qu'une courte carte d'identité, UNIQUE par route.
  const fallback = `<div class="seo-fallback" role="complementary" aria-label="Contenu pour moteurs de recherche">
      <header>
        <h1>${escapeHtml(h1)}</h1>
        <p>${escapeHtml(route.description)}</p>
      </header>
      <p>ECOLE T3P — centre de formation Taxi, VTC et VMDTR agréé Préfecture (agrément n° 23/007), 3 rue Corneille, 92120 Montrouge. Téléphone : <a href="tel:0188750555">01 88 75 05 55</a>.</p>
      <nav aria-label="Formations principales">
        <ul>
          <li><a href="/formations/taxi">Formation Taxi</a></li>
          <li><a href="/formations/vtc">Formation VTC</a></li>
          <li><a href="/formations/vmdtr">Formation VMDTR</a></li>
          <li><a href="/formations">Toutes les formations</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </body>`;
  html = html.replace(/<div class="seo-fallback"[\s\S]*?<\/div>\s*<\/body>/, fallback);

  return html;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const indexPath = join(DIST, 'index.html');
  if (!existsSync(indexPath)) {
    console.error('❌ dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const template = readFileSync(indexPath, 'utf-8');
  let generated = 0;
  let skipped = 0;

  for (const route of routes) {
    // Skip homepage — already correct
    if (route.path === '/') {
      skipped++;
      continue;
    }

    const html = transformHtml(template, route);

    // Determine output path
    const outDir = join(DIST, route.path);
    const outFile = join(outDir, 'index.html');

    mkdirSync(outDir, { recursive: true });
    writeFileSync(outFile, html, 'utf-8');
    generated++;
  }

  console.log(`✅ Prerender complete: ${generated} pages generated, ${skipped} skipped (homepage).`);
  console.log(`   Total routes: ${routes.length}`);
}

main();
