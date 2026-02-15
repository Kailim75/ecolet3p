import FormationDetailTemplate from "@/components/formations/FormationDetailTemplate";

const FormationVTCDetail = () => (
  <FormationDetailTemplate
    title="Formation VTC à Montrouge (92) — 990€ tout compris | ECOLE T3P"
    description="Obtenez votre carte professionnelle VTC avec 94% de taux de réussite. Formation 990€ tout compris, examen inclus, paiement en 4x sans frais."
    canonical="https://www.ecolet3p.fr/formation-vtc"
    profession="vtc"
    heroTitle="Formation VTC à Montrouge (92) — 990€ tout compris"
    heroSubtitle="Obtenez votre carte professionnelle VTC avec 94% de taux de réussite"
    formationTitle="Formation VTC"
    includes={[
      "Frais d'examen T3P (241€) inclus",
      "2 heures de conduite incluses",
      "Véhicule mis à disposition le jour de l'examen",
      "Accompagnement personnalisé",
      "Accès aux ressources pédagogiques",
      "Aide à la création d'entreprise",
    ]}
    programModules={[
      { title: "Réglementation VTC", duration: "12h", topics: ["Loi Grandguillaume", "Statut VTC", "Droits et obligations", "LOTI et capacité"] },
      { title: "Gestion d'entreprise", duration: "10h", topics: ["Micro-entreprise vs SASU", "Comptabilité simplifiée", "TVA et fiscalité", "Protection sociale"] },
      { title: "Sécurité routière", duration: "8h", topics: ["Conduite préventive", "Gestion du stress", "Premiers secours", "Éco-conduite"] },
      { title: "Relation client premium", duration: "8h", topics: ["Accueil haut de gamme", "Gestion des réclamations", "Discrétion professionnelle", "Fidélisation"] },
      { title: "Applications et plateformes", duration: "6h", topics: ["Uber, Bolt, Heetch", "Optimisation des courses", "Gestion multi-apps", "Notation et avis"] },
      { title: "Anglais professionnel", duration: "6h", topics: ["Vocabulaire transport", "Accueil clients étrangers", "Communication basique", "Expressions courantes"] },
    ]}
    testimonials={[
      { name: "Alexandre M.", role: "Chauffeur VTC Premium", content: "Formation au top ! J'ai particulièrement apprécié les cours sur la relation client haut de gamme. Aujourd'hui je travaille avec une clientèle fidèle.", rating: 5 },
      { name: "Fatima R.", role: "Auto-entrepreneuse VTC", content: "L'accompagnement pour créer mon entreprise a été précieux. Les formateurs m'ont guidée pas à pas.", rating: 5 },
      { name: "Thomas G.", role: "Chauffeur VTC indépendant", content: "Excellente formation, très complète sur les aspects juridiques et commerciaux. Le module sur les applications m'a permis d'optimiser mes revenus.", rating: 5 },
    ]}
    faqs={[
      { question: "Quelles sont les conditions pour s'inscrire ?", answer: "Avoir 21 ans minimum, permis B depuis 3 ans, casier judiciaire vierge et aptitude médicale (visite médicale préfectorale)." },
      { question: "Combien de temps dure la formation ?", answer: "La formation VTC dure 63h en journée (1 semaine), 33h en soirée (2 semaines) ou en e-learning (illimité jusqu'à l'examen)." },
      { question: "Le e-learning est-il aussi efficace ?", answer: "Oui, notre plateforme e-learning couvre l'intégralité du programme avec des quiz, des mises en situation et un suivi personnalisé. Le taux de réussite est identique." },
      { question: "Que se passe-t-il si j'échoue à l'examen ?", answer: "Vous pouvez repasser l'examen sans frais supplémentaires de formation. Nous vous accompagnons jusqu'à l'obtention de votre carte." },
      { question: "Comment se déroule l'examen ?", answer: "L'examen se compose de 7 épreuves QCM à la CMA : réglementation, gestion, sécurité routière, français, anglais, développement commercial et réglementation locale." },
    ]}
    crossSellLinks={[
      { title: "Gestion d'activité chauffeur", desc: "Apprenez à gérer votre entreprise de transport", path: "/formations/gestion-entreprise" },
      { title: "Aide administrative", desc: "On s'occupe de la paperasse pour vous", path: "/formations/accompagnement-administratif" },
      { title: "Passerelle VTC ↔ Taxi", desc: "Obtenez votre double carte en 14h", path: "/formations/mobilite" },
    ]}
    ctaTitle="Prêt à devenir chauffeur VTC ? Je m'inscris maintenant"
  />
);

export default FormationVTCDetail;
