import FormationDetailTemplate from "@/components/formations/FormationDetailTemplate";

const FormationVMDTRDetail = () => (
  <FormationDetailTemplate
    title="Formation VMDTR Moto-Taxi à Montrouge (92) — 990€ tout compris | ECOLE T3P"
    description="Obtenez votre carte professionnelle VMDTR moto-taxi avec 94% de taux de réussite. Formation 990€ tout compris, examen inclus, paiement en 4x sans frais."
    canonical="https://www.ecolet3p.fr/formation-vmdtr"
    profession="vmdtr"
    heroTitle="Formation VMDTR Moto-Taxi à Montrouge (92) — 990€ tout compris"
    heroSubtitle="Obtenez votre carte professionnelle VMDTR avec 94% de taux de réussite"
    formationTitle="Formation VMDTR"
    includes={[
      "Frais d'examen T3P (241€) inclus",
      "2 heures de conduite incluses",
      "Accompagnement personnalisé",
      "Accès aux ressources pédagogiques",
      "Équipement passager fourni pour l'examen",
      "Aide à la création d'entreprise",
    ]}
    programModules={[
      { title: "Réglementation VMDTR", duration: "7h", topics: ["Statut moto-taxi", "Code des transports", "Obligations professionnelles", "Assurances spécifiques"] },
      { title: "Sécurité deux-roues", duration: "8h", topics: ["Conduite défensive", "Gestion des risques", "Équipements de sécurité", "Premiers secours"] },
      { title: "Conduite en milieu urbain", duration: "5h", topics: ["Circulation inter-files", "Gestion du trafic dense", "Stationnement", "Itinéraires optimisés"] },
      { title: "Relation client", duration: "4h", topics: ["Accueil passager", "Gestion du stress", "Communication", "Équipement passager"] },
      { title: "Gestion d'entreprise", duration: "6h", topics: ["Création d'entreprise", "Comptabilité", "Fiscalité", "Applications de réservation"] },
      { title: "Examen et mise en situation", duration: "3h", topics: ["QCM réglementaire", "Mise en situation pratique", "Correction", "Conseils finaux"] },
    ]}
    testimonials={[
      { name: "Julien M.", role: "Moto-taxi Paris depuis 2024", content: "Formation top ! J'étais motard depuis 10 ans mais la formation m'a appris toutes les spécificités du transport de passagers.", rating: 5 },
      { name: "Sarah K.", role: "VMDTR indépendante", content: "Excellente formation, très axée sur la sécurité. J'ai beaucoup appris sur la réglementation et la gestion de mon activité.", rating: 5 },
      { name: "Antoine R.", role: "Chauffeur VMDTR premium", content: "Reconversion réussie grâce à ECOLE T3P. L'équipe est au top et le paiement en 4x m'a permis de me lancer sereinement.", rating: 5 },
    ]}
    faqs={[
      { question: "Quelles sont les conditions pour s'inscrire ?", answer: "Avoir 21 ans minimum, permis A depuis 3 ans, casier judiciaire vierge et aptitude médicale (visite médicale préfectorale)." },
      { question: "Combien de temps dure la formation ?", answer: "La formation VMDTR dure 33 heures avec des modules théoriques et des mises en situation pratiques." },
      { question: "Le e-learning est-il aussi efficace ?", answer: "Oui, notre plateforme e-learning couvre l'intégralité du programme avec des quiz et un suivi personnalisé." },
      { question: "Que se passe-t-il si j'échoue à l'examen ?", answer: "Vous pouvez repasser l'examen sans frais supplémentaires de formation. Nous vous accompagnons jusqu'à l'obtention de votre carte." },
      { question: "Comment se déroule l'examen ?", answer: "L'examen se compose d'épreuves QCM à la CMA couvrant la réglementation, la sécurité et la gestion d'entreprise." },
    ]}
    crossSellLinks={[
      { title: "Gestion d'activité chauffeur", desc: "Apprenez à gérer votre entreprise de transport", path: "/formations/gestion-entreprise" },
      { title: "Aide administrative", desc: "On s'occupe de la paperasse pour vous", path: "/formations/accompagnement-administratif" },
      { title: "Formation VTC", desc: "Obtenez aussi votre carte VTC", path: "/formation-vtc" },
    ]}
    ctaTitle="Prêt à devenir moto-taxi ? Je m'inscris maintenant"
  />
);

export default FormationVMDTRDetail;
