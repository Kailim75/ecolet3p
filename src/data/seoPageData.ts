// Static SEO data for each key page — used by the SEO dashboard audit
import { blogArticles } from "./blogArticles";
import { cities } from "./localSeoData";

export interface SEOPageInfo {
  url: string;
  title: string;
  description: string;
  h1: string;
  hasSchema: string[]; // types of JSON-LD present
  internalLinks: string[]; // key internal links on the page
  wordCount?: number;
}

// ── Core pages ────────────────────────────────────────────
const corePages: SEOPageInfo[] = [
  {
    url: "/",
    title: "Formation Taxi VTC VMDTR Montrouge - 94% Réussite, dès 990€",
    description: "Centre agréé Préfecture à Montrouge (92). Carte Pro Taxi, VTC ou VMDTR en 1 semaine. 94% de réussite, +2000 chauffeurs formés, paiement 4x sans frais.",
    h1: "Devenez chauffeur professionnel Taxi, VTC ou VMDTR",
    hasSchema: ["FAQPage", "LocalBusiness", "EducationalOrganization"],
    internalLinks: ["/formations/taxi", "/formations/vtc", "/formations/vmdtr", "/contact"],
  },
  {
    url: "/formations/taxi",
    title: "Formation Taxi Paris 92 - Carte Pro en 1 semaine | dès 990€",
    description: "Formation Taxi agréée Préfecture à Montrouge (92), accessible Paris sud, Hauts-de-Seine et Val-de-Marne. 94% de réussite, carte pro en 1 semaine, 990€ en 4x sans frais.",
    h1: "Formation Taxi — Obtenez votre carte professionnelle",
    hasSchema: ["FAQPage", "Course", "BreadcrumbList"],
    internalLinks: ["/formations/vtc", "/formations/vmdtr", "/passerelle-vtc-taxi", "/contact"],
    wordCount: 1200,
  },
  {
    url: "/formations/vtc",
    title: "Formation VTC Paris 92 - Uber Bolt Heetch | dès 990€ en 4x",
    description: "Formation VTC agréée Préfecture à Montrouge (92). 94% de réussite, carte pro en 1 semaine pour Uber, Bolt, Heetch. À partir de 990€ en 4x sans frais.",
    h1: "Formation VTC — Obtenez votre carte professionnelle",
    hasSchema: ["FAQPage", "Course", "BreadcrumbList"],
    internalLinks: ["/formations/taxi", "/formations/vmdtr", "/passerelle-vtc-taxi", "/contact"],
    wordCount: 1200,
  },
  {
    url: "/formations/vmdtr",
    title: "Formation Moto-Taxi VMDTR Paris 92 - Carte Pro | dès 990€",
    description: "Formation VMDTR (taxi moto) agréée Préfecture à Montrouge (92). 94% de réussite, carte pro moto-taxi en 1 semaine. À partir de 990€, paiement 4x sans frais.",
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
    title: "Renouvellement Carte Taxi : Formation Continue 14h Montrouge | 250€",
    description: "Formation continue Taxi 14h (FCO) pour renouvellement de carte professionnelle. Centre agréé Préfecture à Montrouge (92). 250€, attestation remise le jour même.",
    h1: "Renouvellement Carte Taxi — Formation Continue 14h",
    hasSchema: ["FAQPage", "Course", "BreadcrumbList"],
    internalLinks: ["/formations/taxi", "/formations/continue-vtc", "/contact"],
  },
  {
    url: "/formations/continue-vtc",
    title: "Renouvellement Carte VTC : Formation Continue 14h Montrouge | 170€",
    description: "Renouvelez votre carte professionnelle VTC avec la formation continue obligatoire 14h (FCO). Centre agréé à Montrouge (92). 170€, attestation le jour même.",
    h1: "Renouvellement Carte VTC — Formation Continue 14h",
    hasSchema: ["FAQPage", "Course", "BreadcrumbList"],
    internalLinks: ["/formations/vtc", "/formations/continue-taxi", "/contact"],
  },
  {
    url: "/formations/continue-vmdtr",
    title: "Renouvellement Carte VMDTR (Taxi Moto) : Formation Continue 14h | 250€",
    description: "Formation continue obligatoire VMDTR taxi moto 14h pour renouvellement de carte professionnelle. Centre agréé Préfecture à Montrouge (92). 250€, attestation le jour même.",
    h1: "Renouvellement Carte VMDTR (Taxi Moto) — Formation Continue 14h",
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
    title: "Contact ECOLE T3P Montrouge - 01 88 75 05 55 | WhatsApp",
    description: "Contactez ECOLE T3P pour votre formation Taxi, VTC ou VMDTR à Montrouge (92). Téléphone 01 88 75 05 55, WhatsApp 07 83 78 76 63, RDV en ligne. Réponse sous 24h.",
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

// ── Blog articles (auto-generated from blogArticles data) ──
const blogPages: SEOPageInfo[] = blogArticles.map((a) => ({
  url: `/blog/${a.slug}`,
  title: a.title,
  description: a.metaDescription,
  h1: a.title,
  hasSchema: ["Article", "BreadcrumbList"],
  internalLinks: ["/blog", "/formations/taxi", "/formations/vtc", "/contact"],
  wordCount: Math.round(a.content.split(/\s+/).length),
}));

// ── City pages (auto-generated from localSeoData) ──────────
const cityPages: SEOPageInfo[] = [
  {
    url: "/formations/villes",
    title: "Formations Taxi VTC VMDTR — Toutes les villes",
    description: "Trouvez votre formation Taxi, VTC ou VMDTR près de chez vous. ECOLE T3P à Montrouge, accessible depuis toute l'Île-de-France.",
    h1: "Formations par ville en Île-de-France",
    hasSchema: ["BreadcrumbList"],
    internalLinks: ["/formations/taxi", "/formations/vtc", "/formations/vmdtr"],
  },
  ...cities.map((c) => ({
    url: `/formations/${c.slug}`,
    title: c.seoTitle,
    description: c.seoDescription,
    h1: `Formation Taxi VTC VMDTR ${c.name}`,
    hasSchema: ["FAQPage", "LocalBusiness", "BreadcrumbList"],
    internalLinks: ["/formations/taxi", "/formations/vtc", "/formations/vmdtr", "/contact"],
    wordCount: 900,
  })),
];

// ── Merged export ─────────────────────────────────────────
export const seoPages: SEOPageInfo[] = [...corePages, ...blogPages, ...cityPages];
