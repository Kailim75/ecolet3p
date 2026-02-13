// Catalogue complet des formations ÉCOLE T3P
// Données statiques pour les formations, packs et parrainage

export interface FormationOffer {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  priceAlt?: number; // For group/individual pricing
  duration: string;
  durationHours: number;
  alma4x: string;
  features?: string[];
  accroche?: string;
  link: string;
  category: "initiale" | "continue" | "passerelle" | "mobilite" | "recup-points" | "complementaire";
  format?: "journee" | "soiree";
  badge?: string;
  amountCents: number;
  emoji?: string;
}

export interface PackOffer {
  id: string;
  title: string;
  emoji: string;
  description: string;
  journee: PackVariant;
  soiree: PackVariant;
}

export interface PackVariant {
  composition: string;
  prixSepares: number;
  prixPack: number;
  economie: number;
  alma4x: string;
  amountCents: number;
}

// ============ 1. FORMATIONS INITIALES ============
export const formationsInitiales: FormationOffer[] = [
  {
    id: "initiale-taxi-journee",
    title: "Formation Taxi",
    subtitle: "Formation Complète — Journée",
    price: 1190,
    duration: "63 heures",
    durationHours: 63,
    alma4x: "297,50€/mois",
    format: "journee",
    features: ["Examen CMA inclus (241€)", "Support pédagogique complet", "Accès quiz en ligne", "Accompagnement personnalisé"],
    link: "/formations/taxi",
    category: "initiale",
    badge: "Examen inclus",
    amountCents: 119000,
    emoji: "🚕",
  },
  {
    id: "initiale-taxi-soiree",
    title: "Formation Taxi",
    subtitle: "Formation Flexible — Soirée",
    price: 990,
    duration: "33 heures",
    durationHours: 33,
    alma4x: "247,50€/mois",
    format: "soiree",
    features: ["Examen CMA inclus (241€)", "Compatible avec emploi actuel", "Accès quiz en ligne", "Accompagnement personnalisé"],
    link: "/formations/taxi",
    category: "initiale",
    badge: "Examen inclus",
    amountCents: 99000,
    emoji: "🚕",
  },
  {
    id: "initiale-vtc-journee",
    title: "Formation VTC",
    subtitle: "Formation Complète — Journée",
    price: 1190,
    duration: "63 heures",
    durationHours: 63,
    alma4x: "297,50€/mois",
    format: "journee",
    features: ["Examen CMA inclus (241€)", "Support pédagogique complet", "Accès quiz en ligne", "Accompagnement personnalisé"],
    link: "/formations/vtc",
    category: "initiale",
    badge: "Examen inclus",
    amountCents: 119000,
    emoji: "🚘",
  },
  {
    id: "initiale-vtc-soiree",
    title: "Formation VTC",
    subtitle: "Formation Flexible — Soirée",
    price: 990,
    duration: "33 heures",
    durationHours: 33,
    alma4x: "247,50€/mois",
    format: "soiree",
    features: ["Examen CMA inclus (241€)", "Compatible avec emploi actuel", "Accès quiz en ligne", "Accompagnement personnalisé"],
    link: "/formations/vtc",
    category: "initiale",
    badge: "Examen inclus",
    amountCents: 99000,
    emoji: "🚘",
  },
  {
    id: "initiale-vmdtr-journee",
    title: "Formation VMDTR",
    subtitle: "Formation Complète — Journée",
    price: 1190,
    duration: "63 heures",
    durationHours: 63,
    alma4x: "297,50€/mois",
    format: "journee",
    features: ["Examen CMA inclus (241€)", "Support pédagogique complet", "Accès quiz en ligne", "Accompagnement personnalisé"],
    link: "/formations/vmdtr",
    category: "initiale",
    badge: "Examen inclus",
    amountCents: 119000,
    emoji: "🏍️",
  },
  {
    id: "initiale-vmdtr-soiree",
    title: "Formation VMDTR",
    subtitle: "Formation Flexible — Soirée",
    price: 990,
    duration: "33 heures",
    durationHours: 33,
    alma4x: "247,50€/mois",
    format: "soiree",
    features: ["Examen CMA inclus (241€)", "Compatible avec emploi actuel", "Accès quiz en ligne", "Accompagnement personnalisé"],
    link: "/formations/vmdtr",
    category: "initiale",
    badge: "Examen inclus",
    amountCents: 99000,
    emoji: "🏍️",
  },
];

// ============ 2. FORMATIONS CONTINUES ============
export const formationsContinues: FormationOffer[] = [
  {
    id: "continue-vtc",
    title: "Formation Continue VTC",
    subtitle: "Renouvellement obligatoire",
    price: 170,
    duration: "14 heures",
    durationHours: 14,
    alma4x: "42,50€/mois",
    link: "/formations/continue-vtc",
    category: "continue",
    amountCents: 17000,
    emoji: "🔄",
  },
  {
    id: "continue-taxi",
    title: "Formation Continue Taxi",
    subtitle: "Renouvellement obligatoire",
    price: 250,
    duration: "14 heures",
    durationHours: 14,
    alma4x: "62,50€/mois",
    link: "/formations/continue-taxi",
    category: "continue",
    amountCents: 25000,
    emoji: "🔄",
  },
  {
    id: "continue-vmdtr",
    title: "Formation Continue VMDTR",
    subtitle: "Renouvellement obligatoire",
    price: 250,
    duration: "14 heures",
    durationHours: 14,
    alma4x: "62,50€/mois",
    link: "/formations/continue-vmdtr",
    category: "continue",
    amountCents: 25000,
    emoji: "🔄",
  },
];

// ============ 3. PASSERELLES ============
export const formationsPasserelles: FormationOffer[] = [
  {
    id: "passerelle-taxi",
    title: "Passerelle Taxi",
    subtitle: "Pour les VTC/VMDTR voulant devenir Taxi",
    price: 665,
    duration: "18 heures",
    durationHours: 18,
    alma4x: "166,25€/mois",
    link: "/formations/taxi",
    category: "passerelle",
    amountCents: 66500,
    emoji: "🚕",
  },
  {
    id: "passerelle-vtc",
    title: "Passerelle VTC",
    subtitle: "Pour les Taxi/VMDTR voulant devenir VTC",
    price: 665,
    duration: "7 heures",
    durationHours: 7,
    alma4x: "166,25€/mois",
    link: "/formations/vtc",
    category: "passerelle",
    amountCents: 66500,
    emoji: "🚘",
  },
  {
    id: "passerelle-vmdtr",
    title: "Passerelle VMDTR",
    subtitle: "Pour les Taxi/VTC voulant devenir VMDTR",
    price: 665,
    duration: "7 heures",
    durationHours: 7,
    alma4x: "166,25€/mois",
    link: "/formations/vmdtr",
    category: "passerelle",
    amountCents: 66500,
    emoji: "🏍️",
  },
];

// ============ 4. RENOUVELLEMENT & MOBILITÉ ============
export const formationsMobilite: FormationOffer[] = [
  {
    id: "renouvellement-carte-pro",
    title: "Renouvellement Carte Pro Taxi",
    subtitle: "Formation obligatoire",
    price: 250,
    duration: "14 heures",
    durationHours: 14,
    alma4x: "62,50€/mois",
    link: "/formations/continue-taxi",
    category: "mobilite",
    amountCents: 25000,
    emoji: "📋",
  },
  {
    id: "mobilite-92",
    title: "Mobilité Géographique — Hauts-de-Seine (92)",
    price: 440,
    duration: "14 heures",
    durationHours: 14,
    alma4x: "110€/mois",
    link: "/formations/mobilite",
    category: "mobilite",
    amountCents: 44000,
    emoji: "📍",
  },
  {
    id: "mobilite-75",
    title: "Mobilité Géographique — Paris (75)",
    price: 440,
    duration: "35 heures",
    durationHours: 35,
    alma4x: "110€/mois",
    link: "/formations/mobilite",
    category: "mobilite",
    amountCents: 44000,
    emoji: "📍",
  },
];

// ============ 5. RÉCUPÉRATION DE POINTS ============
export const formationRecupPoints: FormationOffer = {
  id: "recup-points",
  title: "Stage de Récupération de Points",
  subtitle: "Stage agréé 2 jours",
  price: 250,
  duration: "2 jours (14 heures)",
  durationHours: 14,
  alma4x: "62,50€/mois",
  accroche: "Récupérez jusqu'à 4 points sur votre permis en 2 jours",
  features: ["Jusqu'à 4 points récupérés", "Attestation immédiate", "Animateurs agréés"],
  link: "/formations/recuperation-points",
  category: "recup-points",
  amountCents: 25000,
  emoji: "🛡️",
};

// ============ 6. FORMATIONS COMPLÉMENTAIRES ============
export const formationsComplementaires: FormationOffer[] = [
  {
    id: "formation-pmr",
    title: "Formation Accessibilité / Transport PMR",
    price: 290,
    duration: "14 heures (2 jours)",
    durationHours: 14,
    alma4x: "72,50€/mois",
    accroche: "Élargissez votre clientèle et maîtrisez le transport de personnes à mobilité réduite",
    features: [
      "Réglementation PMR",
      "Manipulation fauteuils roulants",
      "Communication adaptée",
      "Gestes et postures",
      "Sécurité embarquement/débarquement",
    ],
    link: "/formations/accessibilite-pmr",
    category: "complementaire",
    amountCents: 29000,
    emoji: "♿",
  },
  {
    id: "formation-gestion",
    title: "Formation Gestion & Création d'Entreprise",
    price: 390,
    duration: "21 heures (3 jours)",
    durationHours: 21,
    alma4x: "97,50€/mois",
    accroche: "Lancez votre activité de chauffeur sur des bases solides",
    features: [
      "Choix du statut juridique",
      "Obligations comptables et fiscales",
      "Business plan simplifié",
      "Gestion de trésorerie",
      "Assurances professionnelles & URSSAF",
    ],
    link: "/formations/gestion-entreprise",
    category: "complementaire",
    amountCents: 39000,
    emoji: "💼",
  },
  {
    id: "formation-anglais",
    title: "Renforcement en Anglais Professionnel",
    price: 350,
    duration: "20 heures (5 demi-journées)",
    durationHours: 20,
    alma4x: "87,50€/mois",
    accroche: "Accueillez vos clients internationaux avec professionnalisme",
    features: [
      "Vocabulaire transport et itinéraire",
      "Accueil client en anglais",
      "Conversation courante",
      "Gestion de situations (retards, réclamations)",
      "Vocabulaire touristique Paris/IDF",
    ],
    link: "/formations/anglais-professionnel",
    category: "complementaire",
    amountCents: 35000,
    emoji: "🇬🇧",
  },
  {
    id: "formation-admin",
    title: "Accompagnement Administratif",
    price: 190,
    priceAlt: 290,
    duration: "7 heures (1 journée)",
    durationHours: 7,
    alma4x: "à partir de 47,50€/mois",
    accroche: "On s'occupe de la paperasse pour vous — concentrez-vous sur votre réussite",
    features: [
      "Création dossier carte professionnelle",
      "Inscription registre T3P",
      "Démarches préfecture",
      "Inscription plateformes VTC",
      "Aide immatriculation et assurances",
    ],
    link: "/formations/accompagnement-administratif",
    category: "complementaire",
    amountCents: 19000,
    emoji: "📋",
  },
];

// ============ 7. PACKS ============
export const packs: PackOffer[] = [
  {
    id: "pack-double-activite",
    title: "Pack Double Activité",
    emoji: "🔥",
    description: "Pour les chauffeurs qui veulent cumuler deux cartes professionnelles.",
    journee: {
      composition: "Initiale journée (63h) + Passerelle au choix",
      prixSepares: 1855,
      prixPack: 1690,
      economie: 165,
      alma4x: "422,50€/mois",
      amountCents: 169000,
    },
    soiree: {
      composition: "Initiale soirée (33h) + Passerelle au choix",
      prixSepares: 1655,
      prixPack: 1490,
      economie: 165,
      alma4x: "372,50€/mois",
      amountCents: 149000,
    },
  },
  {
    id: "pack-reconversion",
    title: "Pack Reconversion Complète",
    emoji: "🚀",
    description: "Pour ceux qui repartent de zéro avec un permis fragilisé.",
    journee: {
      composition: "Initiale journée (63h) + Stage récupération de points (14h)",
      prixSepares: 1440,
      prixPack: 1290,
      economie: 150,
      alma4x: "322,50€/mois",
      amountCents: 129000,
    },
    soiree: {
      composition: "Initiale soirée (33h) + Stage récupération de points (14h)",
      prixSepares: 1240,
      prixPack: 1090,
      economie: 150,
      alma4x: "272,50€/mois",
      amountCents: 109000,
    },
  },
  {
    id: "pack-entrepreneur",
    title: "Pack Entrepreneur",
    emoji: "💼",
    description: "Pour les primo-accédants qui veulent se lancer avec toutes les clés en main.",
    journee: {
      composition: "Initiale journée (63h) + Gestion & Création d'entreprise (21h)",
      prixSepares: 1580,
      prixPack: 1390,
      economie: 190,
      alma4x: "347,50€/mois",
      amountCents: 139000,
    },
    soiree: {
      composition: "Initiale soirée (33h) + Gestion & Création d'entreprise (21h)",
      prixSepares: 1380,
      prixPack: 1190,
      economie: 190,
      alma4x: "297,50€/mois",
      amountCents: 119000,
    },
  },
  {
    id: "pack-serenite",
    title: "Pack Sérénité Administrative",
    emoji: "📋",
    description: "Pour ne pas s'embêter avec les démarches après la formation.",
    journee: {
      composition: "Initiale journée (63h) + Accompagnement administratif (7h groupe)",
      prixSepares: 1380,
      prixPack: 1290,
      economie: 90,
      alma4x: "322,50€/mois",
      amountCents: 129000,
    },
    soiree: {
      composition: "Initiale soirée (33h) + Accompagnement administratif (7h groupe)",
      prixSepares: 1180,
      prixPack: 1090,
      economie: 90,
      alma4x: "272,50€/mois",
      amountCents: 109000,
    },
  },
  {
    id: "pack-international",
    title: "Pack International",
    emoji: "🇬🇧",
    description: "Pour les chauffeurs visant une clientèle internationale (aéroports, gares, zones touristiques).",
    journee: {
      composition: "Initiale journée (63h) + Anglais professionnel (20h)",
      prixSepares: 1540,
      prixPack: 1390,
      economie: 150,
      alma4x: "347,50€/mois",
      amountCents: 139000,
    },
    soiree: {
      composition: "Initiale soirée (33h) + Anglais professionnel (20h)",
      prixSepares: 1340,
      prixPack: 1190,
      economie: 150,
      alma4x: "297,50€/mois",
      amountCents: 119000,
    },
  },
  {
    id: "pack-accessibilite",
    title: "Pack Accessibilité",
    emoji: "♿",
    description: "Pour élargir sa clientèle aux personnes à mobilité réduite.",
    journee: {
      composition: "Initiale journée (63h) + Formation PMR (14h)",
      prixSepares: 1480,
      prixPack: 1350,
      economie: 130,
      alma4x: "337,50€/mois",
      amountCents: 135000,
    },
    soiree: {
      composition: "Initiale soirée (33h) + Formation PMR (14h)",
      prixSepares: 1280,
      prixPack: 1150,
      economie: 130,
      alma4x: "287,50€/mois",
      amountCents: 115000,
    },
  },
];

// ============ 8. PROGRAMME PARRAINAGE ============
export const parrainage = {
  title: "Parrainez, Économisez",
  subtitle: "Gagnez jusqu'à 100€ par filleul",
  avantages: {
    parrain: "100€ de réduction sur sa prochaine formation",
    filleul: "50€ de réduction sur sa première formation",
    illimite: "Parrainage illimité : cumulez les réductions",
  },
  etapes: [
    "L'ancien élève recommande ÉCOLE T3P à un proche",
    "Le filleul s'inscrit en mentionnant le nom de son parrain",
    "Les deux reçoivent automatiquement leur réduction",
  ],
  whatsappUrl: "https://wa.me/33188750555?text=Bonjour%2C%20je%20souhaite%20parrainer%20un%20proche%20pour%20une%20formation.",
};

// ============ BADGES DE CONFIANCE ============
export const trustBadges = [
  { label: "Taux de réussite : 94%", emoji: "✅" },
  { label: "+2 000 conducteurs formés", emoji: "✅" },
  { label: "Petits groupes personnalisés", emoji: "✅" },
  { label: "Paiement 4× sans frais Alma", emoji: "✅" },
];
