// Static SEO data for each key page — used by the SEO dashboard audit
export interface SEOPageInfo {
  url: string;
  title: string;
  description: string;
  h1: string;
  hasSchema: string[]; // types of JSON-LD present
  internalLinks: string[]; // key internal links on the page
  wordCount?: number;
}

export const seoPages: SEOPageInfo[] = [
  {
    url: "/",
    title: "ECOLE T3P — Formation Taxi VTC VMDTR Montrouge | 990€",
    description: "Centre de formation agréé Taxi, VTC et VMDTR à Montrouge (92). 94% de réussite, +2000 formés, paiement en 4x sans frais. Inscription ouverte.",
    h1: "Devenez chauffeur professionnel Taxi, VTC ou VMDTR",
    hasSchema: ["FAQPage", "LocalBusiness", "EducationalOrganization"],
    internalLinks: ["/formations/taxi", "/formations/vtc", "/formations/vmdtr", "/contact"],
  },
  {
    url: "/formations/taxi",
    title: "Formation Taxi Montrouge — Carte Pro T3P | 990€",
    description: "Formation initiale Taxi agréée Préfecture à Montrouge. 94% de réussite, 3 formats (jour/soir/e-learning). À partir de 990€, paiement en 4x.",
    h1: "Formation Taxi — Obtenez votre carte professionnelle",
    hasSchema: ["FAQPage", "Course", "BreadcrumbList"],
    internalLinks: ["/formations/vtc", "/formations/vmdtr", "/passerelle-vtc-taxi", "/contact"],
    wordCount: 1200,
  },
  {
    url: "/formations/vtc",
    title: "Formation VTC Montrouge — Carte Pro T3P | 990€",
    description: "Formation initiale VTC agréée Préfecture à Montrouge. 94% de réussite, 3 formats (jour/soir/e-learning). À partir de 990€, paiement en 4x.",
    h1: "Formation VTC — Obtenez votre carte professionnelle",
    hasSchema: ["FAQPage", "Course", "BreadcrumbList"],
    internalLinks: ["/formations/taxi", "/formations/vmdtr", "/passerelle-vtc-taxi", "/contact"],
    wordCount: 1200,
  },
  {
    url: "/formations/vmdtr",
    title: "Formation VMDTR Moto-Taxi Montrouge | 990€",
    description: "Formation VMDTR (moto-taxi) agréée Préfecture à Montrouge. 94% de réussite, 3 formats. À partir de 990€, paiement en 4x sans frais.",
    h1: "Formation VMDTR — Devenez conducteur moto-taxi",
    hasSchema: ["FAQPage", "Course", "BreadcrumbList"],
    internalLinks: ["/formations/taxi", "/formations/vtc", "/contact"],
    wordCount: 1100,
  },
  {
    url: "/passerelle-vtc-taxi",
    title: "Passerelle VTC ↔ Taxi — Formation Mobilité | 665€",
    description: "Formation passerelle VTC vers Taxi ou Taxi vers VTC. 14h, 665€ tout compris. Ajoutez une mention complémentaire à votre carte pro.",
    h1: "Passerelle VTC ↔ Taxi — Élargissez vos compétences",
    hasSchema: ["Course", "BreadcrumbList"],
    internalLinks: ["/formations/taxi", "/formations/vtc", "/contact"],
    wordCount: 900,
  },
  {
    url: "/formations/continue-taxi",
    title: "Formation Continue Taxi — Renouvellement Carte Pro",
    description: "Formation continue obligatoire pour le renouvellement de la carte professionnelle Taxi. 14h tous les 5 ans. 350€.",
    h1: "Formation Continue Taxi",
    hasSchema: ["FAQPage", "Course", "BreadcrumbList"],
    internalLinks: ["/formations/taxi", "/formations/continue-vtc", "/contact"],
  },
  {
    url: "/formations/continue-vtc",
    title: "Formation Continue VTC — Renouvellement Carte Pro",
    description: "Formation continue obligatoire pour le renouvellement de la carte professionnelle VTC. 14h tous les 5 ans. 350€.",
    h1: "Formation Continue VTC",
    hasSchema: ["FAQPage", "Course", "BreadcrumbList"],
    internalLinks: ["/formations/vtc", "/formations/continue-taxi", "/contact"],
  },
  {
    url: "/formations/continue-vmdtr",
    title: "Formation Continue VMDTR — Renouvellement Carte Pro",
    description: "Formation continue obligatoire VMDTR. 7h tous les 5 ans pour le renouvellement de votre carte professionnelle moto-taxi.",
    h1: "Formation Continue VMDTR",
    hasSchema: ["FAQPage", "Course", "BreadcrumbList"],
    internalLinks: ["/formations/vmdtr", "/contact"],
  },
  {
    url: "/stage-recuperation-points",
    title: "Stage Récupération de Points Montrouge | 2 jours",
    description: "Stage de récupération de points à Montrouge. 2 jours (14h), récupérez jusqu'à 4 points sur votre permis de conduire.",
    h1: "Stage de Récupération de Points",
    hasSchema: ["BreadcrumbList"],
    internalLinks: ["/formations/taxi", "/formations/vtc", "/contact"],
  },
  {
    url: "/blog",
    title: "Blog — Actualités Formation Taxi VTC VMDTR",
    description: "Articles et guides pour les futurs chauffeurs Taxi, VTC et VMDTR. Réglementation, conseils, comparatifs métiers.",
    h1: "Blog & Actualités",
    hasSchema: ["BreadcrumbList"],
    internalLinks: ["/formations/taxi", "/formations/vtc", "/formations/vmdtr"],
  },
  {
    url: "/contact",
    title: "Contact — ECOLE T3P Montrouge",
    description: "Contactez ECOLE T3P à Montrouge. Téléphone : 01 88 75 05 55. Rendez-vous en ligne, WhatsApp disponible.",
    h1: "Contactez-nous",
    hasSchema: ["BreadcrumbList"],
    internalLinks: ["/formations/taxi", "/formations/vtc", "/formations/vmdtr"],
  },
  {
    url: "/a-propos",
    title: "À propos — ECOLE T3P Centre de Formation",
    description: "Découvrez ECOLE T3P, centre de formation agréé Taxi VTC VMDTR à Montrouge depuis 2014. 94% de réussite, +2000 chauffeurs formés.",
    h1: "À propos d'ECOLE T3P",
    hasSchema: ["BreadcrumbList"],
    internalLinks: ["/formations/taxi", "/formations/vtc", "/contact"],
  },
];
