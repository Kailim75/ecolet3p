import { CarTaxiFront, Users, FileText, CheckCircle, Target, Award } from "lucide-react";
import FormationPageTemplate from "@/components/formations/FormationPageTemplate";
import heroImageTaxi from "@/assets/formations/hero-taxi.jpg";

const FormationTaxi = () => (
  <FormationPageTemplate
    title="Formation Taxi Montrouge 92 — 94% Réussite | 990€"
    description="Devenez chauffeur de taxi avec ECOLE T3P à Montrouge. 94% de réussite, accompagnement jusqu'à la carte pro. 990€ en 4x sans frais."
    canonical="https://www.ecolet3p.fr/formations/taxi"
    ogTitle="Formation Taxi Initiale à Montrouge — ECOLE T3P"
    ogDescription="Formation initiale Taxi à Montrouge. Centre agréé Préfecture, 94% de réussite."
    heroImage={heroImageTaxi}
    badge="Formation Taxi"
    badgeIcon={CarTaxiFront}
    heading="Formation Taxi à Montrouge — Carte Professionnelle"
    subheading="Devenez chauffeur de taxi professionnel avec notre formation complète. Taux de réussite de 94% et accompagnement personnalisé."
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
      { title: "Gestion d'activité chauffeur", desc: "Apprenez à gérer votre entreprise de transport", path: "/accompagnement-gestion-activite" },
      { title: "Aide administrative", desc: "On s'occupe de la paperasse pour vous", path: "/aide-administrative-creation-entreprise" },
      { title: "Passerelle Taxi ↔ VTC", desc: "Obtenez votre double carte en 14h", path: "/passerelle-vtc-taxi" },
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
      { question: "Quels sont les prérequis pour devenir chauffeur de taxi ?", answer: "Avoir 21 ans minimum, permis B depuis 3 ans, casier judiciaire vierge et aptitude médicale." },
      { question: "Combien de temps dure la formation taxi ?", answer: "La formation Taxi est disponible en journée (1 semaine), en soirée (2 semaines) ou en e-learning (illimité jusqu'à l'examen)." },
      { question: "Quel est le taux de réussite à l'examen taxi ?", answer: "Notre taux de réussite est de 94% dès la première présentation." },
      { question: "Comment financer ma formation taxi ?", answer: "Nous proposons un paiement en 4x sans frais via Alma pour faciliter l'accès à la formation." },
      { question: "L'examen taxi est-il difficile ?", answer: "Avec une bonne préparation, l'examen est tout à fait accessible. Nos formateurs vous préparent spécifiquement à chaque épreuve." },
      { question: "Puis-je travailler pendant la formation ?", answer: "Oui, nous proposons des formations en soirée (18h-22h) pour ceux qui travaillent en parallèle." },
    ]}
    seoContent={[
      { title: "Présentation de la formation Taxi", text: "La formation Taxi initiale dispensée par ECOLE T3P à Montrouge est un parcours complet pour obtenir la carte professionnelle de chauffeur de taxi. Disponible en journée, soirée ou e-learning. Notre centre agréé par la Préfecture des Hauts-de-Seine affiche un taux de réussite de 94%." },
      { title: "Le métier de chauffeur de taxi", text: "Le chauffeur de taxi peut prendre des clients dans la rue, stationner aux bornes taxi et bénéficie d'un statut réglementé. C'est un métier stable avec une demande constante, particulièrement en Île-de-France." },
      { title: "Financement de la formation", text: "ECOLE T3P facilite l'accès à la formation avec le paiement en 4 fois sans frais via Alma. Notre équipe vous accompagne dans toutes vos démarches administratives." },
    ]}
    relatedLinks={[
      { title: "Formation VTC", desc: "Découvrez notre formation VTC initiale", path: "/formations/vtc" },
      { title: "Formation VMDTR", desc: "Formation VMDTR moto-taxi professionnelle", path: "/formations/vmdtr" },
      { title: "Passerelle Mobilité", desc: "Passerelle VTC vers Taxi ou Taxi vers VTC", path: "/formations/mobilite" },
      { title: "Contact", desc: "Contactez-nous pour vous inscrire", path: "/contact" },
    ]}
  />
);

export default FormationTaxi;
