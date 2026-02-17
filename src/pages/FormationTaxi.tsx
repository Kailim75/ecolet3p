import { CarTaxiFront, Users, FileText, CheckCircle, Target, Award } from "lucide-react";
import FormationPageTemplate from "@/components/formations/FormationPageTemplate";
import heroImageTaxi from "@/assets/formations/hero-taxi.jpg";

const FormationTaxi = () => (
  <FormationPageTemplate
    title="Formation Taxi Montrouge 92 — 94% Réussite | 990€"
    description="Devenez chauffeur de taxi avec ECOLE T3P à Montrouge (92). Centre agréé Préfecture, 94% de réussite. 990€ tout compris en 4x sans frais. Carte professionnelle taxi."
    canonical="https://www.ecolet3p.fr/formations/taxi"
    ogTitle="Formation Taxi Initiale à Montrouge — ECOLE T3P"
    ogDescription="Formation initiale Taxi à Montrouge. Centre agréé Préfecture, 94% de réussite."
    heroImage={heroImageTaxi}
    badge="Formation Taxi"
    badgeIcon={CarTaxiFront}
    heading="Formation Taxi à Montrouge — Carte Professionnelle"
    subheading="Devenez chauffeur de taxi professionnel avec notre formation complète. Taux de réussite de 94% et accompagnement personnalisé jusqu'à l'obtention de votre carte pro."
    duration="Journée, Soir ou E-learning"
    price={990}
    thirdTag={{ icon: Award, label: "94% réussite" }}
    category="taxi"
    profession="taxi"
    includes={[
      "Frais d'examen T3P (241€) inclus",
      "2 heures de conduite incluses",
      "Véhicule mis à disposition le jour de l'examen",
      "Accompagnement personnalisé",
      "Accès aux ressources pédagogiques",
      "Aide à la création d'entreprise",
    ]}
    ctaTitle="Prêt à devenir chauffeur Taxi ? Je m'inscris maintenant"
    crossSellLinks={[
      { title: "Location véhicule examen Taxi", desc: "Taxi équipé lumineux + taximètre + 2h de conduite dès 249€", path: "/services/location-vehicule-examen" },
      { title: "Accompagnement gestion d'activité Taxi", desc: "Apprenez à gérer et optimiser votre entreprise de taxi", path: "/accompagnement-gestion-activite" },
      { title: "Passerelle Taxi → VTC", desc: "Obtenez aussi votre carte VTC en 14h — 665€", path: "/passerelle-vtc-taxi" },
    ]}
    blogLinks={[
      { title: "Comment devenir chauffeur de taxi en 2026 : guide complet", desc: "Prérequis, formation, examen et démarches administratives", path: "/blog/comment-devenir-chauffeur-taxi-2026" },
      { title: "VTC, Taxi ou VMDTR : quel métier choisir en 2026 ?", desc: "Comparaison complète des 3 professions T3P", path: "/blog/vtc-taxi-vmdtr-2026-quel-metier-choisir" },
      { title: "Financement formation Taxi et VTC sans CPF", desc: "Solutions de paiement et aides disponibles", path: "/blog/financement-formation-taxi-vtc" },
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
      "Formation complète Taxi",
      "Préparation intensive examen CMA",
      "Support pédagogique",
      "Accès aux quiz en ligne",
    ]}
    programModules={[
      { title: "Réglementation du transport public", duration: "14h", topics: ["Code des transports", "Statut du taxi", "Obligations professionnelles", "Sanctions et contrôles"] },
      { title: "Gestion d'entreprise", duration: "10h", topics: ["Création d'entreprise", "Comptabilité", "Fiscalité", "Charges sociales"] },
      { title: "Sécurité routière", duration: "8h", topics: ["Conduite préventive", "Gestion des risques", "Premiers secours", "Éco-conduite"] },
      { title: "Relation client", duration: "6h", topics: ["Accueil client", "Gestion des conflits", "Communication", "Qualité de service"] },
      { title: "Développement commercial", duration: "4h", topics: ["Fidélisation", "Applications", "Partenariats", "Stratégie tarifaire"] },
      { title: "Connaissance du territoire", duration: "21h", topics: ["Géographie locale", "Points d'intérêt", "Itinéraires optimisés", "Réglementation locale"] },
    ]}
    prerequisites={[
      { icon: Users, text: "Avoir 21 ans minimum" },
      { icon: FileText, text: "Permis B valide depuis au moins 3 ans" },
      { icon: CheckCircle, text: "Casier judiciaire vierge (bulletin n°2)" },
      { icon: Target, text: "Aptitude médicale (visite médicale préfectorale)" },
    ]}
    testimonials={[
      { name: "Marc D.", role: "Chauffeur Taxi depuis 2024", content: "Formation très complète. Les formateurs connaissent parfaitement le métier et transmettent leur passion. Carte obtenue du premier coup !", rating: 5 },
      { name: "Sophie L.", role: "Reconversion réussie", content: "Après 15 ans dans la grande distribution, j'ai trouvé ma voie. L'équipe m'a accompagnée du début à la fin.", rating: 5 },
      { name: "Karim B.", role: "Chauffeur Taxi indépendant", content: "Excellente préparation à l'examen. Les cours sur la réglementation et la gestion m'ont été très utiles pour lancer mon activité.", rating: 5 },
    ]}
    faqs={[
      { question: "Quels sont les prérequis pour devenir chauffeur de taxi en 2026 ?", answer: "Pour devenir chauffeur de taxi, vous devez avoir au moins 21 ans, être titulaire du permis B depuis 3 ans minimum, disposer d'un casier judiciaire vierge (bulletin n°2) et obtenir un certificat d'aptitude médicale délivré par un médecin agréé par la Préfecture. Ces conditions sont fixées par le Code des transports (article L3121-1)." },
      { question: "Combien de temps dure la formation taxi à ECOLE T3P ?", answer: "La formation Taxi est disponible en 3 formats au même tarif de 990€ : en journée (1 semaine intensive, du lundi au vendredi 9h30-16h30), en soirée (2 semaines, du lundi au vendredi 18h-21h30) pour ceux qui travaillent en parallèle, ou en e-learning (accès illimité à la plateforme jusqu'à l'examen avec suivi personnalisé)." },
      { question: "Quel est le taux de réussite à l'examen taxi chez ECOLE T3P ?", answer: "Notre taux de réussite à l'examen T3P est de 94% dès la première présentation, contre une moyenne nationale d'environ 60%. Ce résultat s'explique par notre pédagogie intensive, nos QCM d'entraînement régulièrement mis à jour et l'accompagnement individuel de nos formateurs issus du métier." },
      { question: "Comment financer ma formation taxi sans CPF ?", answer: "La formation taxi n'est pas éligible au CPF. ECOLE T3P propose le paiement en 4 fois sans frais via Alma (247,50€/mois) et des facilités de paiement personnalisées. Le tarif de 990€ est tout compris : frais d'examen CMA (241€), 2 heures de conduite et véhicule pour l'examen. Certaines aides Pôle Emploi (AIF) peuvent être mobilisées selon votre situation." },
      { question: "Comment se déroule l'examen taxi à la CMA ?", answer: "L'examen T3P Taxi se compose de 7 épreuves QCM : réglementation T3P (coefficient 3), gestion d'entreprise (coefficient 2), sécurité routière (coefficient 3), français (coefficient 2), anglais (coefficient 1), développement commercial (coefficient 2), et réglementation locale + connaissance du territoire (coefficient 3). Il faut obtenir 10/20 de moyenne générale sans note éliminatoire inférieure à 6/20." },
      { question: "Combien gagne un chauffeur de taxi en Île-de-France ?", answer: "Un chauffeur de taxi en Île-de-France peut générer entre 3 500€ et 6 500€ de chiffre d'affaires mensuel. En tant qu'artisan taxi (le statut le plus courant), le revenu net mensuel moyen est d'environ 2 500€ à 3 500€ après charges. Les revenus varient selon les horaires pratiqués, la zone d'activité et la gestion du véhicule." },
      { question: "Quelle est la différence entre artisan taxi et locataire de licence ?", answer: "L'artisan taxi est propriétaire de sa licence (ADS - Autorisation de Stationnement) et exerce en indépendant. Le locataire loue une licence à un propriétaire moyennant un loyer mensuel (1 200€-1 800€). Depuis la loi Grandguillaume, les nouvelles ADS sont gratuites et incessibles, attribuées par les communes sur liste d'attente." },
      { question: "Puis-je exercer comme taxi et VTC en même temps ?", answer: "Non, un chauffeur ne peut pas exercer simultanément les deux activités. En revanche, grâce à la Passerelle T3P, vous pouvez obtenir votre deuxième carte professionnelle en seulement 14h de formation complémentaire (665€ chez ECOLE T3P) si vous avez réussi l'examen T3P depuis moins de 3 ans." },
      { question: "Quels sont les avantages du taxi par rapport au VTC ?", answer: "Le taxi bénéficie de la maraude (prise de clients dans la rue), de l'accès aux bornes taxi (aéroports, gares, hôpitaux), de tarifs réglementés par le préfet, et d'un statut protégé. Contrairement au VTC, le taxi n'est pas dépendant des plateformes numériques et bénéficie d'une clientèle diversifiée incluant les courses conventionnées (CPAM, mutuelles)." },
    ]}
    seoContent={[
      { title: "Devenir chauffeur de taxi en 2026 : un métier stable et réglementé", text: "Le métier de chauffeur de taxi reste l'un des plus stables du secteur du transport de personnes en France. Contrairement aux idées reçues, la profession de taxi n'a pas été affaiblie par l'essor des VTC : la demande reste forte, particulièrement en Île-de-France où les taxis bénéficient d'avantages exclusifs comme la maraude, l'accès aux couloirs de bus et aux bornes taxi dans les gares et aéroports. ECOLE T3P, centre de formation taxi agréé par la Préfecture des Hauts-de-Seine, prépare les futurs chauffeurs de taxi depuis 2014 avec un taux de réussite de 94% à l'examen T3P. Notre formation taxi est accessible depuis le 92 (Hauts-de-Seine) et le 94 (Val-de-Marne), ce qui en fait le centre de formation taxi de référence pour tout le sud de Paris." },
      { title: "Le cadre réglementaire du taxi en France", text: "L'activité de chauffeur de taxi est encadrée par le Code des transports (articles L3121-1 et suivants), la loi Thévenoud de 2014 et la loi Grandguillaume de 2016. Pour exercer, le chauffeur doit détenir une carte professionnelle taxi délivrée par la Préfecture après réussite à l'examen T3P, ainsi qu'une Autorisation de Stationnement (ADS, anciennement appelée « licence »). Depuis 2014, les nouvelles ADS sont délivrées gratuitement par les communes et sont incessibles, mettant fin au marché secondaire des licences. La carte professionnelle taxi est valable 5 ans et son renouvellement nécessite une formation continue obligatoire de 14 heures." },
      { title: "L'examen T3P Taxi : préparation intensive en Île-de-France", text: "L'examen T3P (Transport Public Particulier de Personnes) est organisé par la Chambre de Métiers et de l'Artisanat (CMA). Il comporte un tronc commun de 5 épreuves (réglementation T3P, gestion, sécurité routière, français, anglais) et 2 épreuves spécifiques au taxi (développement commercial et connaissance du territoire). Notre préparation examen taxi est la plus complète d'Île-de-France : des centaines de QCM d'entraînement actualisés, des examens blancs dans les conditions réelles et un suivi personnalisé. C'est cette méthode rigoureuse qui explique notre taux de réussite de 94% à l'examen taxi." },
      { title: "Revenus et statuts du chauffeur de taxi", text: "Le chauffeur de taxi peut exercer sous plusieurs statuts : artisan taxi (indépendant propriétaire de l'ADS), locataire (location de l'ADS à un propriétaire), ou salarié d'une société de taxi. En Île-de-France, le chiffre d'affaires mensuel moyen d'un artisan taxi se situe entre 4 000€ et 6 500€. Les taxis bénéficient également des courses conventionnées (CPAM, mutuelles, hôpitaux) qui représentent un complément de revenu régulier. Le tarif est fixé par arrêté préfectoral et comprend une prise en charge, un tarif kilométrique et un tarif horaire." },
      { title: "Formation taxi pas cher à Montrouge : 990€ tout compris", text: "ECOLE T3P propose la formation taxi la plus compétitive des Hauts-de-Seine (92) et du Val-de-Marne (94) à un tarif tout compris de 990€. Ce prix inclut l'ensemble de la formation théorique, les frais d'inscription à l'examen CMA (241€), 2 heures de conduite avec un moniteur diplômé d'État et la mise à disposition d'un véhicule taxi équipé (lumineux, taximètre) le jour de l'examen. Avec le paiement en 4 fois sans frais via Alma (247,50€/mois), notre formation taxi agréée préfecture est accessible à tous les budgets. Aucun coût caché, aucun supplément." },
      { title: "Centre de formation taxi agréé Préfecture à Montrouge", text: "ECOLE T3P est un centre de formation taxi agréé par la Préfecture des Hauts-de-Seine sous le numéro 23/007. Cet agrément garantit la conformité de notre programme avec les exigences réglementaires et la validité de notre attestation de formation pour le dépôt de dossier de carte professionnelle taxi. Situé au 3 rue Corneille à Montrouge (92120), à 2 minutes à pied du métro Mairie de Montrouge (ligne 4), notre centre accueille des candidats du 92 et du 94, ainsi que de tout le sud de Paris." },
      { title: "Les étapes pour obtenir votre carte professionnelle Taxi", text: "Le parcours pour devenir chauffeur de taxi se déroule en 6 étapes : 1) Vérifier les prérequis légaux (21 ans, permis B 3 ans, casier vierge, visite médicale préfectorale). 2) S'inscrire à la formation Taxi chez ECOLE T3P. 3) Suivre la formation (journée, soir ou e-learning). 4) Réussir l'examen T3P à la CMA. 5) Déposer le dossier de carte professionnelle à la Préfecture (délai : 2 à 4 semaines). 6) Demander une ADS auprès de votre commune et créer votre entreprise. Notre équipe administrative vous accompagne dans toutes ces démarches." },
      { title: "Formation Taxi accessible depuis Paris sud, le 92 et le 94", text: "Notre centre de formation taxi à Montrouge est idéalement situé à la frontière de Paris sud (porte d'Orléans) et des Hauts-de-Seine. Il est facilement accessible depuis le 92 (Bagneux, Malakoff, Châtillon, Vanves, Issy-les-Moulineaux, Clamart, Boulogne-Billancourt, Nanterre) et le 94 (Créteil, Ivry-sur-Seine, Vitry-sur-Seine, Villejuif, Arcueil, Cachan). Métro ligne 4 (Mairie de Montrouge), bus 68, 128 et N21. Que vous cherchiez une formation taxi dans le 92 ou une formation taxi dans le 94, ECOLE T3P est votre centre de formation chauffeur professionnel de référence en Île-de-France." },
    ]}
    relatedLinks={[
      { title: "Formation VTC initiale à Montrouge", desc: "Obtenez votre carte professionnelle VTC — 990€ tout compris", path: "/formations/vtc" },
      { title: "Formation VMDTR moto-taxi", desc: "Devenez conducteur moto-taxi professionnel", path: "/formations/vmdtr" },
      { title: "Passerelle Taxi ↔ VTC", desc: "Double carte professionnelle en 14h — 665€", path: "/passerelle-vtc-taxi" },
      { title: "Renouvellement carte professionnelle Taxi", desc: "Formation continue obligatoire tous les 5 ans", path: "/renouvellement-carte-professionnelle" },
    ]}
  />
);

export default FormationTaxi;
