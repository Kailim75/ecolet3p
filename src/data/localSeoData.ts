// Local SEO data for city-specific landing pages

export interface CityData {
  slug: string;
  name: string;
  department: string;
  departmentCode: string;
  postalCodes: string[];
  metroAccess?: string;
  busAccess?: string;
  trainAccess?: string;
  tramAccess?: string;
  distanceFromCenter: string;
  travelTime: string;
  nearbyLandmarks?: string[];
  localContext: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  latitude: number;
  longitude: number;
}

export const cities: CityData[] = [
  {
    slug: "bagneux",
    name: "Bagneux",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCodes: ["92220"],
    metroAccess: "Ligne 4 - Barbara (5 min) ou Bagneux-Lucie Aubrac",
    busAccess: "Lignes 128, 188, 323, 391",
    distanceFromCenter: "2 km",
    travelTime: "8 minutes en métro",
    nearbyLandmarks: ["Cimetière parisien de Bagneux", "Parc François Mitterrand"],
    localContext: "Bagneux, ville dynamique du sud des Hauts-de-Seine, bénéficie désormais d'un accès direct à notre centre grâce au prolongement de la ligne 4. De nombreux habitants de Bagneux choisissent ECOLE T3P pour leur formation TAXI ou VTC grâce à sa proximité.",
    seoTitle: "Formation Taxi VTC Bagneux (92220) | ECOLE T3P - Centre Agréé à 8 min",
    seoDescription: "Formation TAXI et VTC à Bagneux (92220). Centre ECOLE T3P à 8 min en métro ligne 4. Formation agréée Préfecture, 94% de réussite. Accessible depuis Barbara ou Bagneux-Lucie Aubrac.",
    seoKeywords: ["formation taxi Bagneux", "formation VTC Bagneux", "centre formation 92220", "carte professionnelle taxi Bagneux", "formation chauffeur Bagneux", "ECOLE T3P Bagneux"],
    latitude: 48.7964,
    longitude: 2.3167
  },
  {
    slug: "vanves",
    name: "Vanves",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCodes: ["92170"],
    metroAccess: "Ligne 13 - Malakoff-Plateau de Vanves",
    busAccess: "Lignes 58, 89, 126, 189",
    trainAccess: "Transilien N - Gare de Vanves-Malakoff",
    distanceFromCenter: "1.5 km",
    travelTime: "10 minutes en bus",
    nearbyLandmarks: ["Parc Frédéric Pic", "Lycée Michelet"],
    localContext: "Vanves, charmante commune limitrophe de Paris 15e, offre un cadre de vie agréable à ses habitants. Notre centre de formation à Montrouge est facilement accessible depuis Vanves, permettant aux futurs chauffeurs TAXI et VTC de se former à proximité de chez eux.",
    seoTitle: "Formation Taxi VTC Vanves (92170) | ECOLE T3P - Centre à 10 min",
    seoDescription: "Formation TAXI et VTC à Vanves (92170). Centre ECOLE T3P à 10 min en bus ou Transilien. Formation agréée Préfecture, 94% de réussite. Proche Malakoff-Plateau de Vanves.",
    seoKeywords: ["formation taxi Vanves", "formation VTC Vanves", "centre formation 92170", "carte professionnelle taxi Vanves", "formation chauffeur Vanves", "ECOLE T3P Vanves"],
    latitude: 48.8203,
    longitude: 2.2892
  },
  {
    slug: "malakoff",
    name: "Malakoff",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCodes: ["92240"],
    metroAccess: "Ligne 13 - Malakoff-Plateau de Vanves ou Malakoff-Rue Étienne Dolet",
    busAccess: "Lignes 126, 191, 194, 388",
    distanceFromCenter: "0.8 km",
    travelTime: "5 minutes à pied",
    nearbyLandmarks: ["Théâtre 71", "Parc Léon Salagnac"],
    localContext: "Malakoff est la ville la plus proche de notre centre de formation. À seulement 5 minutes à pied, les habitants de Malakoff peuvent facilement suivre leur formation TAXI ou VTC sans perdre de temps dans les transports.",
    seoTitle: "Formation Taxi VTC Malakoff (92240) | ECOLE T3P - Centre à 5 min à pied",
    seoDescription: "Formation TAXI et VTC à Malakoff (92240). Centre ECOLE T3P à 5 min à pied ! Formation agréée Préfecture, 94% de réussite. Le centre de formation le plus proche de Malakoff.",
    seoKeywords: ["formation taxi Malakoff", "formation VTC Malakoff", "centre formation 92240", "carte professionnelle taxi Malakoff", "formation chauffeur Malakoff", "ECOLE T3P Malakoff"],
    latitude: 48.8189,
    longitude: 2.2978
  },
  {
    slug: "chatillon",
    name: "Châtillon",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCodes: ["92320"],
    metroAccess: "Ligne 13 - Châtillon-Montrouge",
    busAccess: "Lignes 68, 126, 194, 388",
    tramAccess: "T6 - Châtillon-Montrouge",
    distanceFromCenter: "1.2 km",
    travelTime: "6 minutes en métro",
    nearbyLandmarks: ["Centre commercial Châtillon-Montrouge", "Parc Henri Barbusse"],
    localContext: "Châtillon bénéficie d'une excellente desserte avec le terminus de la ligne 13 et le tramway T6. Les habitants de Châtillon rejoignent notre centre ECOLE T3P en quelques minutes pour leur formation de chauffeur professionnel.",
    seoTitle: "Formation Taxi VTC Châtillon (92320) | ECOLE T3P - Centre à 6 min en métro",
    seoDescription: "Formation TAXI et VTC à Châtillon (92320). Centre ECOLE T3P à 6 min en métro ligne 13. Formation agréée Préfecture, 94% de réussite. Terminus Châtillon-Montrouge.",
    seoKeywords: ["formation taxi Châtillon", "formation VTC Châtillon", "centre formation 92320", "carte professionnelle taxi Châtillon", "formation chauffeur Châtillon", "ECOLE T3P Châtillon"],
    latitude: 48.8106,
    longitude: 2.2892
  },
  {
    slug: "clamart",
    name: "Clamart",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCodes: ["92140"],
    busAccess: "Lignes 169, 190, 290, 379",
    tramAccess: "T6 - plusieurs arrêts à Clamart",
    distanceFromCenter: "3 km",
    travelTime: "15 minutes en tramway",
    nearbyLandmarks: ["Forêt de Meudon", "Étang de Trivaux"],
    localContext: "Clamart, ville verte aux portes de Paris, est bien desservie par le tramway T6. Les Clamartois souhaitant devenir chauffeur TAXI ou VTC peuvent rejoindre notre centre de formation en 15 minutes via le T6.",
    seoTitle: "Formation Taxi VTC Clamart (92140) | ECOLE T3P - Centre à 15 min en T6",
    seoDescription: "Formation TAXI et VTC à Clamart (92140). Centre ECOLE T3P à 15 min en tramway T6. Formation agréée Préfecture, 94% de réussite. Accessible depuis tous les quartiers de Clamart.",
    seoKeywords: ["formation taxi Clamart", "formation VTC Clamart", "centre formation 92140", "carte professionnelle taxi Clamart", "formation chauffeur Clamart", "ECOLE T3P Clamart"],
    latitude: 48.8028,
    longitude: 2.2658
  },
  {
    slug: "issy-les-moulineaux",
    name: "Issy-les-Moulineaux",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCodes: ["92130"],
    metroAccess: "Ligne 12 - Mairie d'Issy ou Corentin Celton",
    tramAccess: "T2 - Issy-Val de Seine",
    busAccess: "Lignes 123, 169, 189, 190",
    distanceFromCenter: "2.5 km",
    travelTime: "12 minutes en métro/bus",
    nearbyLandmarks: ["Île Saint-Germain", "Parc de l'Île Saint-Germain"],
    localContext: "Issy-les-Moulineaux, ville moderne et dynamique, est facilement accessible depuis notre centre via plusieurs lignes de transport. De nombreux Isséens choisissent ECOLE T3P pour se former aux métiers de TAXI et VTC.",
    seoTitle: "Formation Taxi VTC Issy-les-Moulineaux (92130) | ECOLE T3P - Centre à 12 min",
    seoDescription: "Formation TAXI et VTC à Issy-les-Moulineaux (92130). Centre ECOLE T3P à 12 min en transport. Formation agréée Préfecture, 94% de réussite. Métro 12, Tram T2.",
    seoKeywords: ["formation taxi Issy-les-Moulineaux", "formation VTC Issy", "centre formation 92130", "carte professionnelle taxi Issy", "formation chauffeur Issy-les-Moulineaux", "ECOLE T3P Issy"],
    latitude: 48.8239,
    longitude: 2.2700
  },
  {
    slug: "paris-14",
    name: "Paris 14e arrondissement",
    department: "Paris",
    departmentCode: "75",
    postalCodes: ["75014"],
    metroAccess: "Ligne 4 - Alésia, Mouton-Duvernet, Denfert-Rochereau",
    busAccess: "Lignes 28, 38, 58, 62, 68",
    distanceFromCenter: "0.5 km",
    travelTime: "3 minutes en métro depuis Alésia",
    nearbyLandmarks: ["Catacombes de Paris", "Parc Montsouris", "Cité Universitaire"],
    localContext: "Le 14e arrondissement de Paris est notre voisin immédiat. Les habitants du 14e peuvent rejoindre notre centre de formation en quelques minutes depuis Alésia. C'est le choix idéal pour une formation TAXI ou VTC à proximité de chez soi.",
    seoTitle: "Formation Taxi VTC Paris 14e (75014) | ECOLE T3P - Centre à 3 min d'Alésia",
    seoDescription: "Formation TAXI et VTC Paris 14e arrondissement (75014). Centre ECOLE T3P à 3 min d'Alésia (métro 4). Formation agréée Préfecture, 94% de réussite. Le plus proche du 14e.",
    seoKeywords: ["formation taxi Paris 14", "formation VTC Paris 14e", "centre formation 75014", "carte professionnelle taxi Paris 14", "formation chauffeur Paris 14e", "ECOLE T3P Paris 14"],
    latitude: 48.8331,
    longitude: 2.3264
  },
  {
    slug: "paris-15",
    name: "Paris 15e arrondissement",
    department: "Paris",
    departmentCode: "75",
    postalCodes: ["75015"],
    metroAccess: "Ligne 12, 13 - Porte de Versailles, Convention, Vaugirard",
    busAccess: "Lignes 39, 49, 80, 89",
    tramAccess: "T3a - Porte de Versailles",
    distanceFromCenter: "2 km",
    travelTime: "10 minutes en transport",
    nearbyLandmarks: ["Parc des Expositions", "Parc André Citroën", "Tour Montparnasse"],
    localContext: "Le 15e arrondissement, le plus peuplé de Paris, compte de nombreux futurs chauffeurs TAXI et VTC. Notre centre à Montrouge est facilement accessible depuis Porte de Versailles ou Convention.",
    seoTitle: "Formation Taxi VTC Paris 15e (75015) | ECOLE T3P - Centre à 10 min",
    seoDescription: "Formation TAXI et VTC Paris 15e arrondissement (75015). Centre ECOLE T3P à 10 min en transport. Formation agréée Préfecture, 94% de réussite. Proche Porte de Versailles.",
    seoKeywords: ["formation taxi Paris 15", "formation VTC Paris 15e", "centre formation 75015", "carte professionnelle taxi Paris 15", "formation chauffeur Paris 15e", "ECOLE T3P Paris 15"],
    latitude: 48.8400,
    longitude: 2.2900
  },
  {
    slug: "paris-13",
    name: "Paris 13e arrondissement",
    department: "Paris",
    departmentCode: "75",
    postalCodes: ["75013"],
    metroAccess: "Ligne 7, 14 - Bibliothèque François Mitterrand, Olympiades",
    busAccess: "Lignes 27, 47, 62, 83",
    tramAccess: "T3a - Porte d'Italie, Porte de Choisy",
    distanceFromCenter: "3 km",
    travelTime: "15 minutes en métro",
    nearbyLandmarks: ["Bibliothèque nationale de France", "Butte-aux-Cailles", "Place d'Italie"],
    localContext: "Le 13e arrondissement de Paris, en pleine transformation avec le quartier Paris Rive Gauche, attire de nombreux futurs chauffeurs professionnels. Notre centre à Montrouge est accessible via le métro ligne 4.",
    seoTitle: "Formation Taxi VTC Paris 13e (75013) | ECOLE T3P - Centre à 15 min",
    seoDescription: "Formation TAXI et VTC Paris 13e arrondissement (75013). Centre ECOLE T3P à 15 min en métro. Formation agréée Préfecture, 94% de réussite. Proche Place d'Italie.",
    seoKeywords: ["formation taxi Paris 13", "formation VTC Paris 13e", "centre formation 75013", "carte professionnelle taxi Paris 13", "formation chauffeur Paris 13e", "ECOLE T3P Paris 13"],
    latitude: 48.8322,
    longitude: 2.3561
  },
  {
    slug: "fontenay-aux-roses",
    name: "Fontenay-aux-Roses",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCodes: ["92260"],
    trainAccess: "RER B - Fontenay-aux-Roses",
    busAccess: "Lignes 128, 194, 394",
    distanceFromCenter: "3 km",
    travelTime: "12 minutes en RER + bus",
    nearbyLandmarks: ["Coulée verte du Sud parisien", "Parc de Sceaux à proximité"],
    localContext: "Fontenay-aux-Roses, ville résidentielle prisée, est bien desservie par le RER B. Les Fontenaisiens souhaitant se reconvertir dans le transport de personnes choisissent notre centre pour sa proximité et son expertise.",
    seoTitle: "Formation Taxi VTC Fontenay-aux-Roses (92260) | ECOLE T3P - Centre à 12 min",
    seoDescription: "Formation TAXI et VTC à Fontenay-aux-Roses (92260). Centre ECOLE T3P à 12 min en RER B. Formation agréée Préfecture, 94% de réussite. Accessible depuis la gare RER.",
    seoKeywords: ["formation taxi Fontenay-aux-Roses", "formation VTC Fontenay-aux-Roses", "centre formation 92260", "carte professionnelle taxi Fontenay", "formation chauffeur Fontenay-aux-Roses", "ECOLE T3P Fontenay"],
    latitude: 48.7900,
    longitude: 2.2903
  },
  {
    slug: "sceaux",
    name: "Sceaux",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCodes: ["92330"],
    trainAccess: "RER B - Sceaux ou Bourg-la-Reine",
    busAccess: "Lignes 128, 197, 395",
    distanceFromCenter: "4 km",
    travelTime: "15 minutes en RER + bus",
    nearbyLandmarks: ["Parc de Sceaux", "Château de Sceaux"],
    localContext: "Sceaux, ville historique connue pour son magnifique parc, attire des candidats soucieux de qualité. Notre centre de formation est accessible en 15 minutes pour les Scéens souhaitant obtenir leur carte professionnelle TAXI ou VTC.",
    seoTitle: "Formation Taxi VTC Sceaux (92330) | ECOLE T3P - Centre à 15 min",
    seoDescription: "Formation TAXI et VTC à Sceaux (92330). Centre ECOLE T3P à 15 min en RER B. Formation agréée Préfecture, 94% de réussite. Proche du Parc de Sceaux.",
    seoKeywords: ["formation taxi Sceaux", "formation VTC Sceaux", "centre formation 92330", "carte professionnelle taxi Sceaux", "formation chauffeur Sceaux", "ECOLE T3P Sceaux"],
    latitude: 48.7767,
    longitude: 2.2928
  },
  {
    slug: "antony",
    name: "Antony",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCodes: ["92160"],
    trainAccess: "RER B - Antony (correspondance Orlyval)",
    busAccess: "Lignes 286, 379, 395, 396",
    distanceFromCenter: "5 km",
    travelTime: "18 minutes en RER",
    nearbyLandmarks: ["Maison de Chateaubriand", "Parc Heller"],
    localContext: "Antony, porte d'entrée vers l'aéroport d'Orly via l'Orlyval, est une ville stratégique pour les futurs chauffeurs. Nombreux sont les Antoniens qui choisissent notre centre pour leur formation TAXI ou VTC.",
    seoTitle: "Formation Taxi VTC Antony (92160) | ECOLE T3P - Centre à 18 min en RER",
    seoDescription: "Formation TAXI et VTC à Antony (92160). Centre ECOLE T3P à 18 min en RER B. Formation agréée Préfecture, 94% de réussite. Connexion Orlyval.",
    seoKeywords: ["formation taxi Antony", "formation VTC Antony", "centre formation 92160", "carte professionnelle taxi Antony", "formation chauffeur Antony", "ECOLE T3P Antony"],
    latitude: 48.7539,
    longitude: 2.2975
  },
  {
    slug: "boulogne-billancourt",
    name: "Boulogne-Billancourt",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCodes: ["92100"],
    metroAccess: "Ligne 9, 10 - Boulogne-Jean Jaurès, Marcel Sembat, Pont de Sèvres",
    busAccess: "Lignes 52, 72, 126, 175",
    distanceFromCenter: "4 km",
    travelTime: "20 minutes en transport",
    nearbyLandmarks: ["Île Seguin", "Musée Albert Kahn", "Parc de Billancourt"],
    localContext: "Boulogne-Billancourt, ville la plus peuplée des Hauts-de-Seine, compte de nombreux candidats aux formations TAXI et VTC. Notre centre à Montrouge est accessible via le métro 9 ou 10 puis correspondance.",
    seoTitle: "Formation Taxi VTC Boulogne-Billancourt (92100) | ECOLE T3P - Centre Agréé",
    seoDescription: "Formation TAXI et VTC à Boulogne-Billancourt (92100). Centre ECOLE T3P à 20 min en transport. Formation agréée Préfecture, 94% de réussite. Métro 9 ou 10.",
    seoKeywords: ["formation taxi Boulogne-Billancourt", "formation VTC Boulogne", "centre formation 92100", "carte professionnelle taxi Boulogne", "formation chauffeur Boulogne-Billancourt", "ECOLE T3P Boulogne"],
    latitude: 48.8339,
    longitude: 2.2400
  },
  {
    slug: "meudon",
    name: "Meudon",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCodes: ["92190", "92360"],
    trainAccess: "Transilien N - Meudon, Bellevue",
    tramAccess: "T6 - plusieurs arrêts",
    busAccess: "Lignes 169, 289, 379, 389",
    distanceFromCenter: "4 km",
    travelTime: "18 minutes en tramway",
    nearbyLandmarks: ["Forêt de Meudon", "Observatoire de Meudon", "Terrasse de Meudon"],
    localContext: "Meudon, ville verdoyante avec sa forêt et son observatoire, offre un cadre de vie privilégié. Les Meudonnais souhaitant devenir chauffeur professionnel rejoignent notre centre via le tramway T6.",
    seoTitle: "Formation Taxi VTC Meudon (92190) | ECOLE T3P - Centre à 18 min en T6",
    seoDescription: "Formation TAXI et VTC à Meudon (92190). Centre ECOLE T3P à 18 min en tramway T6. Formation agréée Préfecture, 94% de réussite. Accessible depuis Meudon-la-Forêt.",
    seoKeywords: ["formation taxi Meudon", "formation VTC Meudon", "centre formation 92190", "carte professionnelle taxi Meudon", "formation chauffeur Meudon", "ECOLE T3P Meudon"],
    latitude: 48.8128,
    longitude: 2.2356
  }
];

export const getCityBySlug = (slug: string): CityData | undefined => {
  return cities.find(city => city.slug === slug);
};
