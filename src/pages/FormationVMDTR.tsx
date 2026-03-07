import { Bike, Users, FileText, CheckCircle, Target, Shield } from "lucide-react";
import FormationPageTemplate from "@/components/formations/FormationPageTemplate";
import heroImageVMDTR from "@/assets/formations/hero-vmdtr.jpg";
import heroImageVMDTRWebp from "@/assets/formations/hero-vmdtr.jpg?w=640;1024;1920&format=webp&as=srcset";

const FormationVMDTR = () => (
  <FormationPageTemplate
    title="Formation VMDTR Moto-Taxi Montrouge 92 — 990€ en 4x"
    description="Formation moto-taxi VMDTR à Montrouge (92). Préparation examen T3P CMA, 94% de réussite. À partir de 990€ payable en 4x sans frais. Permis A obligatoire."
    canonical="https://ecolet3p.fr/formations/vmdtr"
    ogTitle="Formation VMDTR Moto-Taxi à Montrouge — ECOLE T3P"
    ogDescription="Formation VMDTR à Montrouge. Centre agréé Préfecture, 94% de réussite."
    heroImage={heroImageVMDTR}
    heroImageWebp={heroImageVMDTRWebp}
    badge="Formation VMDTR"
    badgeIcon={Bike}
    heading="Formation VMDTR Moto-Taxi à Montrouge"
    subheading="Devenez moto-taxi professionnel avec notre formation complète. Maîtrisez la sécurité, la réglementation et lancez votre activité de transport deux-roues."
    duration="Journée, Soir ou E-learning"
    price={990}
    thirdTag={{ icon: Shield, label: "Sécurité renforcée" }}
    category="vmdtr"
    profession="vmdtr"
    includes={[
      "Frais d'examen T3P (241€) inclus",
      "2 heures de conduite incluses",
      "Accompagnement personnalisé",
      "Accès aux ressources pédagogiques",
      "Équipement passager fourni pour l'examen",
      "Aide à la création d'entreprise",
    ]}
    ctaTitle="Prêt à devenir moto-taxi ? Réserver ma place"
    crossSellLinks={[
      { title: "Location moto pour l'examen VMDTR", desc: "Moto conforme + équipement passager + 2h de conduite dès 299€", path: "/services/location-vehicule-examen" },
      { title: "Accompagnement gestion d'activité moto-taxi", desc: "Apprenez à gérer et développer votre activité VMDTR", path: "/accompagnement-gestion-activite" },
      { title: "Formation VTC", desc: "Obtenez aussi votre carte VTC pour diversifier", path: "/formations/vtc" },
    ]}
    blogLinks={[
      { title: "Formation VMDTR 2026 : devenir conducteur moto-taxi", desc: "Guide complet du métier de moto-taxi en France", path: "/blog/formation-vmdtr-2026-devenir-conducteur-moto-taxi" },
      { title: "Moto-taxi VMDTR : tout savoir sur le métier", desc: "Réglementation, équipements, revenus et perspectives", path: "/blog/moto-taxi-vmdtr" },
      { title: "VTC, Taxi ou VMDTR : quel métier choisir en 2026 ?", desc: "Comparaison complète des 3 professions T3P", path: "/blog/vtc-taxi-vmdtr-2026-quel-metier-choisir" },
    ]}
    premiumPrice={1190}
    premiumLabel="PREMIUM"
    premiumFeatures={[
      "Tout le pack Essentiel",
      "Aide à la création d'entreprise",
      "Coaching individuel personnalisé",
      "Suivi post-formation 3 mois",
    ]}
    essentielFeatures={[
      "Formation complète VMDTR",
      "Préparation intensive examen CMA",
      "Support pédagogique",
      "Accès aux quiz en ligne",
    ]}
    programModules={[
      { title: "Réglementation VMDTR", duration: "7h", topics: ["Statut moto-taxi", "Code des transports", "Obligations professionnelles", "Assurances spécifiques"] },
      { title: "Sécurité deux-roues", duration: "8h", topics: ["Conduite défensive", "Gestion des risques", "Équipements de sécurité", "Premiers secours"] },
      { title: "Conduite en milieu urbain", duration: "5h", topics: ["Circulation inter-files", "Gestion du trafic dense", "Stationnement", "Itinéraires optimisés"] },
      { title: "Relation client", duration: "4h", topics: ["Accueil passager", "Gestion du stress", "Communication", "Équipement passager"] },
      { title: "Gestion d'entreprise", duration: "6h", topics: ["Création d'entreprise", "Comptabilité", "Fiscalité", "Applications de réservation"] },
      { title: "Examen et mise en situation", duration: "3h", topics: ["QCM réglementaire", "Mise en situation pratique", "Correction", "Conseils finaux"] },
    ]}
    prerequisites={[
      { icon: Users, text: "Avoir 21 ans minimum" },
      { icon: FileText, text: "Permis A depuis au moins 3 ans" },
      { icon: CheckCircle, text: "Casier judiciaire vierge (bulletin n°2)" },
      { icon: Target, text: "Aptitude médicale (visite médicale préfectorale)" },
    ]}
    testimonials={[
      { name: "Julien M.", role: "Moto-taxi Paris depuis 2024", content: "Formation top ! J'étais motard depuis 10 ans mais la formation m'a appris toutes les spécificités du transport de passagers.", rating: 5 },
      { name: "Sarah K.", role: "VMDTR indépendante", content: "Excellente formation, très axée sur la sécurité. J'ai beaucoup appris sur la réglementation et la gestion de mon activité.", rating: 5 },
      { name: "Antoine R.", role: "Chauffeur VMDTR premium", content: "Reconversion réussie grâce à ECOLE T3P. L'équipe est au top et le paiement en 4x m'a permis de me lancer sereinement.", rating: 5 },
    ]}
    faqs={[
      { question: "Qu'est-ce que le VMDTR exactement ?", answer: "VMDTR signifie Véhicule Motorisé à Deux ou Trois Roues. C'est le statut officiel des moto-taxis en France, réglementé par le Code des transports (articles L3123-1 et suivants). Le conducteur VMDTR transporte un passager à l'arrière de sa moto, scooter ou trike, exclusivement sur réservation préalable." },
      { question: "Quels sont les prérequis pour devenir moto-taxi VMDTR ?", answer: "Vous devez avoir 21 ans minimum, être titulaire du permis A (moto) depuis au moins 3 ans, présenter un casier judiciaire vierge (bulletin n°2) et obtenir un certificat d'aptitude médicale délivré par un médecin agréé par la Préfecture. Une expérience significative de la conduite moto en milieu urbain est fortement recommandée." },
      { question: "Combien de temps dure la formation VMDTR ?", answer: "La formation VMDTR initiale totalise 33 heures de formation théorique et pratique. Elle est disponible en 3 formats au tarif unique de 990€ : journée (1 semaine), soirée (2 semaines, 18h-21h30) ou e-learning (accès illimité). Les 3 formats préparent au même examen T3P à la CMA." },
      { question: "Quel type de moto ou scooter puis-je utiliser ?", answer: "Le véhicule doit être un deux-roues ou trois-roues motorisé d'une cylindrée minimale de 125cc, homologué pour le transport de passagers (place passager et poignées de maintien). Les modèles les plus utilisés sont les maxi-scooters (Yamaha TMAX, Honda Forza 750) et les motos touring. Le véhicule doit être équipé d'un système de communication pilote-passager." },
      { question: "Quels équipements sont obligatoires pour le moto-taxi ?", answer: "Le conducteur VMDTR doit fournir à chaque passager : un casque homologué à sa taille, des gants certifiés CE, un gilet réfléchissant et une protection dorsale. Le véhicule doit disposer de poignées de maintien, de repose-pieds passager et d'un top-case ou d'un espace pour un bagage. L'investissement initial en équipement représente environ 1 500€ à 2 500€." },
      { question: "Combien gagne un moto-taxi VMDTR en Île-de-France ?", answer: "Un conducteur VMDTR à temps plein en Île-de-France peut générer entre 3 000€ et 5 500€ de chiffre d'affaires mensuel. Le tarif moyen d'une course moto-taxi est supérieur à celui d'un VTC classique (environ 2€/km contre 1,5€/km) grâce au positionnement premium et à la rapidité du service. Les trajets aéroport sont particulièrement lucratifs." },
      { question: "Comment se déroule l'examen VMDTR à la CMA ?", answer: "L'examen T3P VMDTR comporte les mêmes 5 épreuves de tronc commun que le VTC et le taxi (réglementation T3P, gestion, sécurité routière, français, anglais) plus 2 épreuves spécifiques VMDTR axées sur la sécurité deux-roues et la réglementation VMDTR. Format QCM, moyenne de 10/20 requise sans note éliminatoire sous 6/20." },
      { question: "Puis-je obtenir aussi la carte VTC en plus du VMDTR ?", answer: "Oui. Grâce à la Passerelle T3P, si vous avez réussi l'examen T3P depuis moins de 3 ans, vous pouvez obtenir votre carte VTC en seulement 14 heures de formation complémentaire pour 665€. Cela vous permet de diversifier votre activité en combinant moto-taxi et VTC." },
    ]}
    seoContent={[
      { title: "Devenir moto-taxi VMDTR en 2026 : un métier premium en plein essor", text: "Le métier de conducteur VMDTR (Véhicule Motorisé à Deux ou Trois Roues) s'impose comme l'alternative premium du transport de personnes en milieu urbain. En Île-de-France, où le trafic routier est une contrainte quotidienne, le moto-taxi offre un service rapide et fiable, particulièrement prisé des cadres, hommes d'affaires et voyageurs pressés vers les aéroports. ECOLE T3P, centre de formation VMDTR agréé par la Préfecture des Hauts-de-Seine, forme les futurs conducteurs moto-taxi depuis 2014 avec un taux de réussite de 94% à l'examen T3P. Notre formation VMDTR en Île-de-France est la plus complète du marché." },
      { title: "Le cadre réglementaire du VMDTR en France", text: "L'activité de moto-taxi est strictement réglementée par le Code des transports (articles L3123-1 à L3123-3). Le conducteur VMDTR doit détenir un certificat VMDTR et une carte professionnelle délivrée par la Préfecture après réussite à l'examen T3P organisé par la Chambre de Métiers et de l'Artisanat (CMA). Comme le VTC, le moto-taxi ne peut exercer que sur réservation préalable — la maraude est interdite. Le véhicule doit être assuré spécifiquement pour le transport de personnes à titre onéreux. La carte professionnelle VMDTR est valable 5 ans et son renouvellement nécessite une formation continue de 14 heures." },
      { title: "Sécurité : la priorité absolue de la formation moto-taxi", text: "La sécurité est au cœur de la formation VMDTR chez ECOLE T3P. Notre programme consacre 8 heures à la sécurité deux-roues spécifique au transport de passagers : conduite défensive, anticipation des dangers, gestion du passager (communication, positionnement, répartition du poids), premiers secours et procédures d'urgence. Nos formateurs, tous anciens professionnels du transport moto, insistent sur les spécificités de la conduite avec passager : changement du centre de gravité, distances de freinage allongées, communication pilote-passager." },
      { title: "Revenus et modèle économique du moto-taxi", text: "Le moto-taxi bénéficie d'un positionnement tarifaire premium par rapport au VTC classique. Le tarif moyen d'une course est d'environ 2€ à 2,50€/km, contre 1,50€/km pour un VTC. Les transferts aéroport (Paris → Roissy CDG en 35 minutes vs 1h30 en voiture) constituent une source de revenus majeure, avec des courses à 80€-120€. Un conducteur VMDTR à temps plein peut réaliser 4 à 8 courses par jour, pour un CA mensuel de 3 000€ à 5 500€. Les charges sont inférieures à celles d'un VTC : pas de location de véhicule coûteuse, carburant réduit, stationnement facilité." },
      { title: "Centre de formation VMDTR agréé Préfecture à Montrouge (92)", text: "ECOLE T3P propose la formation VMDTR à partir de 990€ (formule Essentiel) ou 1 190€ (formule Premium) dans les Hauts-de-Seine : frais d'examen CMA (241€) inclus, 2 heures de conduite avec moniteur, équipement passager fourni pour l'examen et accompagnement administratif pour la création d'entreprise. Notre centre de formation moto-taxi au 3 rue Corneille, Montrouge (92120) est agréé par la Préfecture (agrément n° 23/007) et accessible par le métro ligne 4 (Mairie de Montrouge). Avec 359 avis Google 5 étoiles et plus de 2 000 chauffeurs T3P formés, nous sommes la référence en formation transport de personnes en Île-de-France." },
      { title: "Les étapes pour devenir conducteur VMDTR professionnel", text: "Le parcours pour devenir moto-taxi suit 6 étapes : 1) Vérifier les prérequis (21 ans, permis A 3 ans, casier vierge, visite médicale). 2) S'inscrire à la formation VMDTR chez ECOLE T3P (990€, 3 formats). 3) Suivre les 33 heures de formation théorique et pratique. 4) Réussir l'examen T3P à la CMA. 5) Obtenir la carte professionnelle VMDTR à la Préfecture (2 à 4 semaines). 6) Créer votre entreprise, acquérir votre véhicule et vos équipements, et lancer votre activité. Notre équipe vous guide à chaque étape." },
      { title: "Formation VMDTR accessible depuis Paris sud, le 92 et le 94", text: "Notre centre de formation VMDTR à Montrouge est idéalement situé pour les motards d'Île-de-France. Facilement accessible depuis Paris sud (porte d'Orléans), le 92 (Bagneux, Malakoff, Châtillon, Vanves, Boulogne-Billancourt, Nanterre) et le 94 (Créteil, Ivry-sur-Seine, Vitry-sur-Seine). Métro ligne 4 (Mairie de Montrouge), parking moto gratuit à proximité. Le centre est à 15 minutes de moto depuis le périphérique parisien. Que vous cherchiez une formation moto-taxi en Île-de-France ou un centre de formation transport de personnes dans le sud de Paris, ECOLE T3P est votre référence." },
    ]}
    relatedLinks={[
      { title: "Formation VTC initiale à Montrouge", desc: "Obtenez votre carte professionnelle VTC — à partir de 990€", path: "/formations/vtc" },
      { title: "Formation Taxi initiale", desc: "Devenez chauffeur de taxi professionnel", path: "/formations/taxi" },
      { title: "Passerelle VMDTR → VTC", desc: "Double carte professionnelle en 14h — 665€", path: "/passerelle-vtc-taxi" },
      { title: "Renouvellement carte professionnelle VMDTR", desc: "Formation continue obligatoire tous les 5 ans", path: "/renouvellement-carte-professionnelle" },
    ]}
  />
);

export default FormationVMDTR;
