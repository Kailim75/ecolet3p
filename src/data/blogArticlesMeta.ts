import vtcDriver2025 from "@/assets/blog/vtc-driver-2025.jpg";
import vtcDriver2026 from "@/assets/blog/vtc-driver-2026.jpg";
import taxiDriver2026 from "@/assets/blog/taxi-driver-2026.jpg";
import vmdtrDriver2026 from "@/assets/blog/vmdtr-driver-2026.jpg";
import vtcTaxiVmdtrComparison2026 from "@/assets/blog/vtc-taxi-vmdtr-comparison-2026.jpg";
import statutsJuridiquesT3p from "@/assets/blog/statuts-juridiques-t3p.jpg";
import technologieIaTransport from "@/assets/blog/technologie-ia-transport.jpg";
import anglaisChauffeurT3p from "@/assets/blog/anglais-chauffeur-t3p.jpg";
import taxiDriverFormation from "@/assets/blog/taxi-driver-formation.jpg";
import vtcVsTaxiComparison from "@/assets/blog/vtc-vs-taxi-comparison.jpg";
import carteProfessionnelleVtc from "@/assets/blog/carte-professionnelle-vtc.jpg";
import financementFormation from "@/assets/blog/financement-formation.jpg";
import motoTaxiVmdtr from "@/assets/blog/moto-taxi-vmdtr.jpg";
import formationContinue from "@/assets/blog/formation-continue.jpg";
import renouvellementCartePro from "@/assets/blog/renouvellement-carte-pro.jpg";

export interface BlogArticleMeta {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: string;
  image: string;
}

export const blogArticlesMeta: BlogArticleMeta[] = [
  {
    slug: "quel-statut-juridique-chauffeur-vtc-taxi-2026",
    title: "Quel statut juridique choisir pour devenir chauffeur VTC ou Taxi en 2026 ?",
    metaDescription: "Comparatif complet des statuts juridiques pour chauffeurs VTC et Taxi : auto-entrepreneur, SASU, EURL, SARL. Avantages, inconvénients et fiscalité 2026.",
    excerpt: "Auto-entrepreneur, SASU, EURL ou SARL ? Découvrez le meilleur statut juridique pour lancer votre activité de chauffeur VTC ou Taxi en 2026.",
    category: "CRÉATION",
    readTime: "12 min",
    publishDate: "2026-02-03",
    author: "ECOLE T3P",
    image: statutsJuridiquesT3p,
  },
  {
    slug: "maitrise-numerique-ia-chauffeur-vtc-taxi",
    title: "Maîtrise du numérique et de l'IA : un atout indispensable pour les chauffeurs VTC et Taxi",
    metaDescription: "L'importance de maîtriser les outils numériques et l'intelligence artificielle pour les chauffeurs VTC et Taxi en 2026. Applications, GPS, gestion et IA.",
    excerpt: "Applications, GPS, comptabilité en ligne, intelligence artificielle... Découvrez pourquoi la maîtrise du numérique est devenue essentielle pour réussir comme chauffeur.",
    category: "COMPÉTENCES",
    readTime: "10 min",
    publishDate: "2026-02-10",
    author: "ECOLE T3P",
    image: technologieIaTransport,
  },
  {
    slug: "anglais-chauffeur-vtc-taxi-clientele-internationale",
    title: "L'anglais pour les chauffeurs VTC et Taxi : un atout pour la clientèle internationale",
    metaDescription: "Pourquoi l'anglais est essentiel pour les chauffeurs VTC et Taxi en 2026. Vocabulaire, phrases clés et conseils pour accueillir la clientèle internationale.",
    excerpt: "Touristes, hommes d'affaires, expatriés... Découvrez pourquoi maîtriser l'anglais est un atout majeur pour développer votre clientèle et vos revenus et comment progresser rapidement.",
    category: "COMPÉTENCES",
    readTime: "9 min",
    publishDate: "2026-02-17",
    author: "ECOLE T3P",
    image: anglaisChauffeurT3p,
  },
  {
    slug: "vtc-taxi-vmdtr-2026-quel-metier-choisir",
    title: "VTC vs Taxi vs VMDTR en 2026 : Quel métier choisir ?",
    metaDescription: "Comparatif complet VTC, Taxi et VMDTR en 2026 : formation, revenus, investissement, avantages et inconvénients. Guide pour choisir le meilleur métier.",
    excerpt: "VTC, Taxi ou Moto-taxi ? Découvrez notre comparatif détaillé des 3 métiers du transport de personnes en 2026 : formations, revenus, investissement et perspectives.",
    category: "COMPARATIF",
    readTime: "15 min",
    publishDate: "2026-01-27",
    author: "ECOLE T3P",
    image: vtcTaxiVmdtrComparison2026,
  },
  {
    slug: "formation-vmdtr-2026-devenir-conducteur-moto-taxi",
    title: "Formation VMDTR 2026 : Devenir conducteur moto-taxi",
    metaDescription: "Guide complet 2026 pour devenir conducteur moto-taxi VMDTR : formation 14h, examen, carte professionnelle, réglementation et équipement. Toutes les étapes.",
    excerpt: "Découvrez comment devenir conducteur moto-taxi en 2026 : formation VMDTR de 14h, prérequis, examen et création d'activité. Le guide pratique pour se lancer.",
    category: "VMDTR",
    readTime: "11 min",
    publishDate: "2026-01-20",
    author: "ECOLE T3P",
    image: vmdtrDriver2026,
  },
  {
    slug: "comment-devenir-chauffeur-taxi-2026",
    title: "Comment devenir chauffeur Taxi en 2026 : Le guide complet",
    metaDescription: "Guide ultime 2026 pour devenir chauffeur Taxi : licence ADS, formation, examen, réglementation ZFE et revenus. Toutes les étapes pour réussir.",
    excerpt: "Découvrez comment devenir chauffeur Taxi en 2026 : acquisition de licence, formation certifiante, nouvelles règles ZFE et stratégies pour maximiser vos revenus.",
    category: "TAXI",
    readTime: "14 min",
    publishDate: "2026-01-13",
    author: "ECOLE T3P",
    image: taxiDriver2026,
  },
  {
    slug: "comment-devenir-chauffeur-vtc-2026",
    title: "Comment devenir chauffeur VTC en 2026 : Le guide ultime",
    metaDescription: "Guide complet 2026 pour devenir chauffeur VTC : nouvelles réglementations, ZFE, véhicules électriques, formation, examen et revenus. Tout ce qu'il faut savoir.",
    excerpt: "Découvrez les étapes clés pour devenir chauffeur VTC en 2026 : nouvelles règles ZFE, véhicules électriques obligatoires, et stratégies pour maximiser vos revenus.",
    category: "VTC",
    readTime: "12 min",
    publishDate: "2026-01-06",
    author: "ECOLE T3P",
    image: vtcDriver2026,
  },
  {
    slug: "devenir-chauffeur-vtc-guide-complet-2025",
    title: "Devenir chauffeur VTC en 2025 : démarches et conseils pratiques",
    metaDescription: "Les étapes concrètes pour obtenir votre carte VTC en 2025 : prérequis, inscription à l'examen, choix du véhicule et création de votre micro-entreprise.",
    excerpt: "Vous souhaitez devenir chauffeur VTC ? Découvrez notre guide complet avec toutes les étapes, de la formation à l'obtention de votre carte professionnelle.",
    category: "VTC",
    readTime: "8 min",
    publishDate: "2025-01-15",
    author: "ECOLE T3P",
    image: vtcDriver2025,
  },
  {
    slug: "formation-taxi-carte-professionnelle-t3p",
    title: "Carte professionnelle Taxi : formation, examen et obtention",
    metaDescription: "Comment obtenir la carte professionnelle Taxi T3P : prérequis, programme de formation, épreuves de l'examen CMA et délais de délivrance en préfecture.",
    excerpt: "La carte professionnelle T3P est indispensable pour exercer le métier de taxi. Découvrez comment l'obtenir grâce à notre formation certifiante.",
    category: "TAXI",
    readTime: "7 min",
    publishDate: "2025-01-10",
    author: "ECOLE T3P",
    image: taxiDriverFormation,
  },
  {
    slug: "vtc-ou-taxi-quelle-formation-choisir",
    title: "VTC ou Taxi : quelle formation choisir selon votre profil ?",
    metaDescription: "VTC ou Taxi ? Comparez revenus, flexibilité, investissement initial et formation pour choisir le métier de chauffeur adapté à votre situation.",
    excerpt: "Hésitation entre VTC et Taxi ? Découvrez les différences clés entre ces deux métiers pour faire le bon choix de carrière.",
    category: "Guide",
    readTime: "10 min",
    publishDate: "2025-01-08",
    author: "ECOLE T3P",
    image: vtcVsTaxiComparison,
  },
  {
    slug: "etapes-obtenir-carte-professionnelle-vtc",
    title: "Les 5 étapes pour obtenir sa carte professionnelle VTC",
    metaDescription: "Découvrez les 5 étapes clés pour obtenir votre carte professionnelle VTC : formation, examen, dossier préfecture et lancement d'activité.",
    excerpt: "De la formation à la création de votre entreprise, suivez notre guide étape par étape pour devenir chauffeur VTC professionnel.",
    category: "VTC",
    readTime: "6 min",
    publishDate: "2025-01-05",
    author: "ECOLE T3P",
    image: carteProfessionnelleVtc,
  },
  {
    slug: "facilites-paiement-formation-taxi-vtc",
    title: "Payer sa formation Taxi VTC en 4× sans frais avec Alma",
    metaDescription: "Financez votre formation Taxi ou VTC à 990€ en 2, 3 ou 4 mensualités sans frais via Alma. Réponse immédiate, sans justificatif. ECOLE T3P Montrouge.",
    excerpt: "Le paiement ne doit pas être un frein à votre projet. Découvrez nos facilités de paiement pour financer votre formation de chauffeur.",
    category: "Pratique",
    readTime: "3 min",
    publishDate: "2025-01-02",
    author: "ECOLE T3P",
    image: financementFormation,
  },
  {
    slug: "formation-vmdtr-moto-taxi-scooter",
    title: "VMDTR : scooter ou moto pour le transport de passagers ?",
    metaDescription: "Moto ou maxi-scooter pour exercer en VMDTR ? Comparatif des véhicules, équipements obligatoires et conseils pour choisir votre deux-roues professionnel.",
    excerpt: "Découvrez comment devenir conducteur de moto-taxi ou de scooter professionnel grâce à la formation VMDTR et obtenir votre carte professionnelle.",
    category: "VMDTR",
    readTime: "7 min",
    publishDate: "2025-01-18",
    author: "ECOLE T3P",
    image: motoTaxiVmdtr,
  },
  {
    slug: "formation-continue-renouvellement-carte-professionnelle",
    title: "Renouvellement carte pro : formation continue obligatoire",
    metaDescription: "Votre carte VTC, Taxi ou VMDTR expire bientôt ? Durée, programme et tarifs de la formation continue obligatoire pour renouveler votre carte professionnelle.",
    excerpt: "Votre carte professionnelle VTC, Taxi ou VMDTR arrive à expiration ? Découvrez la formation continue obligatoire pour la renouveler et maintenir vos compétences à jour.",
    category: "Formation Continue",
    readTime: "6 min",
    publishDate: "2025-01-16",
    author: "ECOLE T3P",
    image: formationContinue,
  },
  {
    slug: "renouvellement-carte-professionnelle-vtc-taxi-2026",
    title: "Renouvellement carte professionnelle VTC Taxi 2026 : démarches, délais et formation obligatoire",
    metaDescription: "Comment renouveler votre carte professionnelle VTC, Taxi ou VMDTR en 2026 ? Démarches, délais, formation continue obligatoire 14h et pièces à fournir.",
    excerpt: "Votre carte professionnelle VTC, Taxi ou VMDTR arrive à expiration ? Découvrez les démarches complètes, les délais à respecter et la formation continue obligatoire pour renouveler votre titre.",
    category: "RÉGLEMENTATION",
    readTime: "11 min",
    publishDate: "2026-02-17",
    author: "ECOLE T3P",
    image: renouvellementCartePro,
  },
];

export const getArticleMetaBySlug = (slug: string): BlogArticleMeta | undefined => {
  return blogArticlesMeta.find(article => article.slug === slug);
};
