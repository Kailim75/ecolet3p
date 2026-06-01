/**
 * Données vérifiées des 8 départements d'Île-de-France.
 *
 * SOURCES OFFICIELLES (toutes en *.gouv.fr) :
 * - Coordonnées des Préfectures : sites officiels de chaque préfecture
 * - Listes médecins agréés : publiées par chaque préfecture (PDF mis à jour
 *   périodiquement) — on pointe vers la page parente, plus stable que le PDF direct
 * - Démarches administratives : service-public.fr (fiches F2225 VTC / F22463 Taxi)
 *
 * Dernière vérification : juin 2026
 * SSOT — toute modification doit être justifiée par une source .gouv.fr récente.
 */

export type Metier = "vtc" | "taxi" | "vmdtr";

export interface DepartementInfo {
  /** Code département (75, 77, 78, 91, 92, 93, 94, 95) */
  code: string;
  /** Nom officiel du département */
  nom: string;
  /** Slug pour l'URL (paris, seine-et-marne, yvelines, essonne, hauts-de-seine, seine-saint-denis, val-de-marne, val-d-oise) */
  slug: string;
  /** Préfecture de rattachement */
  prefecture: {
    nom: string;
    adresse: string;
    codePostal: string;
    ville: string;
    /** URL officielle de la page T3P/VTC */
    urlVtc: string;
    /** URL officielle de la page Taxi */
    urlTaxi: string;
    /** Email du service T3P/VTC (si publié) */
    email?: string;
    /** Téléphone standard préfecture */
    telephone?: string;
    /** Notes spécifiques (sous-préfectures, démarche dématérialisée…) */
    notes?: string;
  };
  /** Lien vers la liste officielle des médecins agréés permis de conduire */
  medecinsAgreesUrl: string;
  /** Distance / accessibilité depuis Montrouge */
  accessibiliteDepuisMontrouge: string;
  /** Principales communes desservies */
  communesPrincipales: string[];
}

export const DEPARTEMENTS_IDF: DepartementInfo[] = [
  {
    code: "75",
    nom: "Paris",
    slug: "paris",
    prefecture: {
      nom: "Préfecture de Police de Paris (Bureau des Taxis et Transports Publics)",
      adresse: "36 rue des Morillons",
      codePostal: "75015",
      ville: "Paris",
      urlVtc: "https://www.prefecturedepolice.interieur.gouv.fr/demarches/professionnel/transports/vtc-voiture-de-transport-avec-chauffeur",
      urlTaxi: "https://www.prefecturedepolice.interieur.gouv.fr/demarches/professionnel/transports/taxi-parisien",
      notes:
        "À Paris, le T3P (Taxi, VTC, VMDTR) est géré par la Préfecture de Police, pas par la Préfecture de Paris. Démarches dématérialisées via demarches-simplifiees.fr.",
    },
    medecinsAgreesUrl:
      "https://www.prefecturedepolice.interieur.gouv.fr/demarches/particulier/permis-de-conduire/controle-medical-du-permis-de-conduire",
    accessibiliteDepuisMontrouge:
      "Métro ligne 4 directe depuis Mairie de Montrouge (15 min jusqu'à Châtelet)",
    communesPrincipales: ["Paris 1er au 20e arrondissement"],
  },
  {
    code: "77",
    nom: "Seine-et-Marne",
    slug: "seine-et-marne",
    prefecture: {
      nom: "Préfecture de Seine-et-Marne — Direction de la citoyenneté et de la réglementation, Bureau de la circulation",
      adresse: "12 rue des Saints-Pères",
      codePostal: "77010",
      ville: "Melun Cedex",
      urlVtc:
        "https://www.seine-et-marne.gouv.fr/Demarches/Toutes-les-demarches/Professionnels-de-l-automobile/Voitures-de-transport-avec-chauffeur-VTC/Etre-VTC-en-Seine-et-Marne",
      urlTaxi:
        "https://www.seine-et-marne.gouv.fr/Demarches/Toutes-les-demarches/Professionnels-de-l-automobile/Voitures-de-transport-avec-chauffeur-VTC-Vehicules-motorises-a-deux-ou-trois-roues-VMDTR/Etre-VMDTR-en-Seine-et-Marne",
      email: "pref-vtc@seine-et-marne.gouv.fr",
    },
    medecinsAgreesUrl:
      "https://www.seine-et-marne.gouv.fr/Demarches/Toutes-les-demarches/Permis-de-conduire/Controle-medical-de-l-aptitude-a-la-conduite",
    accessibiliteDepuisMontrouge:
      "RER A jusqu'à Marne-la-Vallée ou Transilien P depuis Gare de l'Est (≈ 1h)",
    communesPrincipales: [
      "Melun",
      "Meaux",
      "Chelles",
      "Pontault-Combault",
      "Savigny-le-Temple",
      "Champs-sur-Marne",
    ],
  },
  {
    code: "78",
    nom: "Yvelines",
    slug: "yvelines",
    prefecture: {
      nom: "Préfecture des Yvelines — DRE, Bureau de la réglementation générale, Taxis et VTC",
      adresse: "1 rue Jean Houdon",
      codePostal: "78010",
      ville: "Versailles Cedex",
      urlVtc:
        "https://www.yvelines.gouv.fr/Demarches/Professions-reglementees/Voiture-de-Transport-avec-Chauffeur-VTC",
      urlTaxi:
        "https://www.yvelines.gouv.fr/Demarches/Professions-reglementees/Examen-TAXI-VTC-VMDTR-et-centre-de-formation",
      email: "pref-taxis@yvelines.gouv.fr",
      notes:
        "Demandes à adresser exclusivement par courrier. Tout dossier incomplet est retourné.",
    },
    medecinsAgreesUrl:
      "https://www.yvelines.gouv.fr/Demarches/Permis-de-conduire/Controle-medical-du-permis-de-conduire",
    accessibiliteDepuisMontrouge:
      "RER C depuis Issy-les-Moulineaux jusqu'à Versailles Château (≈ 45 min)",
    communesPrincipales: [
      "Versailles",
      "Saint-Germain-en-Laye",
      "Mantes-la-Jolie",
      "Sartrouville",
      "Poissy",
      "Trappes",
    ],
  },
  {
    code: "91",
    nom: "Essonne",
    slug: "essonne",
    prefecture: {
      nom: "Préfecture de l'Essonne — Direction de la Réglementation et de la Sécurité Routière, Pôle de gestion des personnels de la route",
      adresse: "Boulevard de France",
      codePostal: "91010",
      ville: "Évry-Courcouronnes Cedex",
      urlVtc:
        "https://www.essonne.gouv.fr/Demarches/Circulation-et-vehicules/Professionnels-de-la-route/Voitures-de-Transport-avec-Chauffeur-VTC",
      urlTaxi:
        "https://www.essonne.gouv.fr/Demarches/Circulation-et-vehicules/Professionnels-de-la-route/TAXIS",
      email: "pref-pro-route@essonne.gouv.fr",
      notes:
        "Tout dossier doit être déposé sur le site 'démarches-simplifiees.fr' (lien sur la page officielle).",
    },
    medecinsAgreesUrl:
      "https://www.essonne.gouv.fr/Demarches/Permis-de-conduire/Controle-medical",
    accessibiliteDepuisMontrouge:
      "RER B depuis Cité Universitaire jusqu'à Évry-Courcouronnes (≈ 45 min)",
    communesPrincipales: [
      "Évry-Courcouronnes",
      "Corbeil-Essonnes",
      "Massy",
      "Savigny-sur-Orge",
      "Yerres",
      "Athis-Mons",
    ],
  },
  {
    code: "92",
    nom: "Hauts-de-Seine",
    slug: "hauts-de-seine",
    prefecture: {
      nom: "Préfecture des Hauts-de-Seine — Direction de la Réglementation et de l'Environnement",
      adresse: "167-177 avenue Joliot-Curie",
      codePostal: "92013",
      ville: "Nanterre Cedex",
      urlVtc:
        "https://www.hauts-de-seine.gouv.fr/Demarches/Activites-reglementees-police-administrative-et-manifestations/Cartes-professionnelles-et-attestations/Conducteur-de-voiture-de-transport-avec-chauffeur",
      urlTaxi:
        "https://www.hauts-de-seine.gouv.fr/Demarches/Activites-reglementees-police-administrative-et-manifestations/Cartes-professionnelles-et-attestations",
      notes:
        "Depuis décembre 2021, demandes de cartes T3P entièrement dématérialisées via démarches-simplifiees.fr.",
    },
    medecinsAgreesUrl:
      "https://www.hauts-de-seine.gouv.fr/Demarches/Permis-de-conduire/Controle-medical",
    accessibiliteDepuisMontrouge:
      "Métro ligne 4 + RER A jusqu'à Nanterre-Préfecture (≈ 30 min). ECOLE T3P est située dans le département.",
    communesPrincipales: [
      "Nanterre",
      "Boulogne-Billancourt",
      "Montrouge",
      "Issy-les-Moulineaux",
      "Asnières-sur-Seine",
      "Clichy",
      "Levallois-Perret",
    ],
  },
  {
    code: "93",
    nom: "Seine-Saint-Denis",
    slug: "seine-saint-denis",
    prefecture: {
      nom: "Préfecture de la Seine-Saint-Denis",
      adresse: "1 esplanade Jean Moulin",
      codePostal: "93007",
      ville: "Bobigny Cedex",
      urlVtc:
        "https://www.seine-saint-denis.gouv.fr/Demarches/Professions-et-activites-reglementees/Professionnels-du-T3P-chauffeurs-VTC-et-VMDTR",
      urlTaxi:
        "https://www.seine-saint-denis.gouv.fr/Services-de-l-Etat/Prefecture-et-sous-prefectures/Sous-prefecture-du-Raincy-Informations-pratiques/Coordonnees-et-horaires-du-bureau-de-la-Performance-des-Moyens-et-de-la-Logistique",
      notes:
        "Délai moyen d'instruction des dossiers VTC et VMDTR : environ 4 mois. Inutile de déposer plusieurs dossiers. Cartes Taxi communales gérées par la sous-préfecture du Raincy.",
    },
    medecinsAgreesUrl:
      "https://www.seine-saint-denis.gouv.fr/Demarches/Permis-de-conduire/Controle-medical-du-permis-de-conduire",
    accessibiliteDepuisMontrouge:
      "Métro ligne 4 jusqu'à Châtelet puis ligne 5 jusqu'à Bobigny-Préfecture (≈ 50 min)",
    communesPrincipales: [
      "Bobigny",
      "Saint-Denis",
      "Aubervilliers",
      "Montreuil",
      "Pantin",
      "Drancy",
      "Aulnay-sous-Bois",
    ],
  },
  {
    code: "94",
    nom: "Val-de-Marne",
    slug: "val-de-marne",
    prefecture: {
      nom: "Préfecture du Val-de-Marne",
      adresse: "21-29 avenue du Général de Gaulle",
      codePostal: "94038",
      ville: "Créteil Cedex",
      urlVtc: "https://www.val-de-marne.gouv.fr/Vos-demarches/Professions-et-activites-reglementees/VTC",
      urlTaxi:
        "https://www.val-de-marne.gouv.fr/Vos-demarches/Professions-et-activites-reglementees/Taxis-transport-motorise-a-2-ou-3-roues/Taxis-et-vehicules-Motorises-deux-et-trois-roues",
      telephone: "01 49 56 60 00",
    },
    medecinsAgreesUrl:
      "https://www.val-de-marne.gouv.fr/Vos-demarches/Permis-de-conduire/Liste-des-medecins-agrees",
    accessibiliteDepuisMontrouge:
      "Métro ligne 4 + ligne 8 jusqu'à Créteil-Préfecture (≈ 35 min). Département voisin direct de Montrouge.",
    communesPrincipales: [
      "Créteil",
      "Vitry-sur-Seine",
      "Champigny-sur-Marne",
      "Saint-Maur-des-Fossés",
      "Ivry-sur-Seine",
      "Villejuif",
      "Cachan",
      "Arcueil",
    ],
  },
  {
    code: "95",
    nom: "Val-d'Oise",
    slug: "val-d-oise",
    prefecture: {
      nom: "Préfecture du Val-d'Oise — Direction des Sécurités, Bureau de la sécurité intérieure",
      adresse: "5 avenue Bernard Hirsch",
      codePostal: "95010",
      ville: "Cergy-Pontoise Cedex",
      urlVtc:
        "https://www.val-doise.gouv.fr/Demarches/Professions-reglementees/V.T.C-Voiture-de-Transport-avec-Chauffeur",
      urlTaxi: "https://www.val-doise.gouv.fr/Demarches/Professions-reglementees",
      notes: "Possibilité de transmettre les dossiers par courriel à la Préfecture.",
    },
    medecinsAgreesUrl:
      "https://www.val-doise.gouv.fr/Demarches/Permis-de-conduire/Controle-medical",
    accessibiliteDepuisMontrouge:
      "RER A jusqu'à Cergy-Préfecture depuis Châtelet (≈ 1h)",
    communesPrincipales: [
      "Cergy",
      "Argenteuil",
      "Sarcelles",
      "Garges-lès-Gonesse",
      "Goussainville",
      "Pontoise",
    ],
  },
];

/**
 * Liens officiels service-public.fr — démarches T3P
 * (fiches Légifrance maintenues par la DILA)
 */
export const SERVICE_PUBLIC_LINKS = {
  vtc: {
    fiche: "https://www.service-public.fr/professionnels-entreprises/vosdroits/F31027",
    titre: "Carte professionnelle de conducteur de VTC",
  },
  taxi: {
    fiche: "https://www.service-public.fr/professionnels-entreprises/vosdroits/F22463",
    titre: "Carte professionnelle de conducteur de taxi",
  },
  vmdtr: {
    fiche: "https://www.service-public.fr/professionnels-entreprises/vosdroits/F31027",
    titre: "Carte professionnelle VMDTR (taxi moto)",
  },
} as const;

/** Récupère un département par son code (string ou number) */
export const getDepartementByCode = (code: string): DepartementInfo | undefined =>
  DEPARTEMENTS_IDF.find((d) => d.code === String(code));

/** Liste des codes pour itération (sitemap, routes...) */
export const DEPARTEMENT_CODES = DEPARTEMENTS_IDF.map((d) => d.code);

/** Libellés métier (utilisés dans titres, breadcrumbs, JSON-LD) */
export const METIER_LABELS: Record<Metier, { short: string; long: string; article: string }> = {
  vtc: { short: "VTC", long: "Voiture de Transport avec Chauffeur (VTC)", article: "la formation VTC" },
  taxi: { short: "Taxi", long: "Taxi (Transport Public Particulier)", article: "la formation Taxi" },
  vmdtr: { short: "VMDTR (taxi moto)", long: "Véhicule Motorisé à Deux ou Trois Roues (VMDTR / taxi moto)", article: "la formation VMDTR" },
};
