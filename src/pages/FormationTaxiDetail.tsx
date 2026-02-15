import FormationDetailTemplate from "@/components/formations/FormationDetailTemplate";

const FormationTaxiDetail = () => (
  <FormationDetailTemplate
    title="Formation Taxi à Montrouge (92) — 990€ tout compris | ECOLE T3P"
    description="Obtenez votre carte professionnelle Taxi avec 94% de taux de réussite. Formation 990€ tout compris, examen inclus, paiement en 4x sans frais."
    canonical="https://www.ecolet3p.fr/formation-taxi"
    profession="taxi"
    heroTitle="Formation Taxi à Montrouge (92) — 990€ tout compris"
    heroSubtitle="Obtenez votre carte professionnelle Taxi avec 94% de taux de réussite"
    formationTitle="Formation Taxi"
    includes={[
      "Frais d'examen T3P (241€) inclus",
      "2 heures de conduite incluses",
      "Véhicule mis à disposition le jour de l'examen",
      "Accompagnement personnalisé",
      "Accès aux ressources pédagogiques",
      "Aide à la création d'entreprise",
    ]}
    programModules={[
      { title: "Réglementation du transport public", duration: "14h", topics: ["Code des transports", "Statut du taxi", "Obligations professionnelles", "Sanctions et contrôles"] },
      { title: "Gestion d'entreprise", duration: "10h", topics: ["Création d'entreprise", "Comptabilité", "Fiscalité", "Charges sociales"] },
      { title: "Sécurité routière", duration: "8h", topics: ["Conduite préventive", "Gestion des risques", "Premiers secours", "Éco-conduite"] },
      { title: "Relation client", duration: "6h", topics: ["Accueil client", "Gestion des conflits", "Communication", "Qualité de service"] },
      { title: "Développement commercial", duration: "4h", topics: ["Fidélisation", "Applications", "Partenariats", "Stratégie tarifaire"] },
      { title: "Connaissance du territoire", duration: "21h", topics: ["Géographie locale", "Points d'intérêt", "Itinéraires optimisés", "Réglementation locale"] },
    ]}
    testimonials={[
      { name: "Marc D.", role: "Chauffeur Taxi depuis 2024", content: "Formation très complète. Les formateurs connaissent parfaitement le métier et transmettent leur passion. Carte obtenue du premier coup !", rating: 5 },
      { name: "Sophie L.", role: "Reconversion réussie", content: "Après 15 ans dans la grande distribution, j'ai trouvé ma voie. L'équipe m'a accompagnée du début à la fin.", rating: 5 },
      { name: "Karim B.", role: "Chauffeur Taxi indépendant", content: "Excellente préparation à l'examen. Les cours sur la réglementation et la gestion m'ont été très utiles.", rating: 5 },
    ]}
    faqs={[
      { question: "Quelles sont les conditions pour s'inscrire ?", answer: "Avoir 21 ans minimum, permis B depuis 3 ans, casier judiciaire vierge et aptitude médicale (visite médicale préfectorale)." },
      { question: "Combien de temps dure la formation ?", answer: "La formation Taxi dure 63h en journée (1 semaine), 33h en soirée (2 semaines) ou en e-learning (illimité jusqu'à l'examen)." },
      { question: "Le e-learning est-il aussi efficace ?", answer: "Oui, notre plateforme e-learning couvre l'intégralité du programme avec des quiz et un suivi personnalisé. Le taux de réussite est identique." },
      { question: "Que se passe-t-il si j'échoue à l'examen ?", answer: "Vous pouvez repasser l'examen sans frais supplémentaires de formation. Nous vous accompagnons jusqu'à l'obtention de votre carte." },
      { question: "Comment se déroule l'examen ?", answer: "L'examen se compose de 7 épreuves QCM à la CMA : réglementation, gestion, sécurité routière, français, anglais, développement commercial et réglementation locale." },
    ]}
    crossSellLinks={[
      { title: "Gestion d'activité chauffeur", desc: "Apprenez à gérer votre entreprise de transport", path: "/formations/gestion-entreprise" },
      { title: "Aide administrative", desc: "On s'occupe de la paperasse pour vous", path: "/formations/accompagnement-administratif" },
      { title: "Passerelle Taxi ↔ VTC", desc: "Obtenez votre double carte en 14h", path: "/formations/mobilite" },
    ]}
    ctaTitle="Prêt à devenir chauffeur Taxi ? Je m'inscris maintenant"
  />
);

export default FormationTaxiDetail;
