import { Car, Users, FileText, CheckCircle, Target, Smartphone } from "lucide-react";
import FormationPageTemplate from "@/components/formations/FormationPageTemplate";
import heroImageVTC from "@/assets/formations/hero-vtc.jpg";

const FormationVTC = () => (
  <FormationPageTemplate
    title="Formation VTC Montrouge 92 — 94% Réussite | 990€"
    description="Devenez chauffeur VTC avec ECOLE T3P à Montrouge. Formation agréée, 94% de réussite. 990€ payable en 4x sans frais via Alma."
    canonical="https://www.ecolet3p.fr/formations/vtc"
    ogTitle="Formation VTC Initiale à Montrouge — ECOLE T3P"
    ogDescription="Formation initiale VTC à Montrouge. 94% de réussite, 990€ en 4x sans frais."
    heroImage={heroImageVTC}
    badge="Formation VTC"
    badgeIcon={Car}
    heading="Formation VTC Initiale à Montrouge — 990€ tout compris"
    subheading="Devenez chauffeur VTC et travaillez avec Uber, Bolt, Heetch. Formation complète incluant gestion d'entreprise et relation client premium."
    duration="Journée, Soir ou E-learning"
    price={990}
    thirdTag={{ icon: Smartphone, label: "Multi-apps" }}
    category="vtc"
    profession="vtc"
    premiumPrice={1190}
    premiumLabel="PREMIUM"
    premiumFeatures={[
      "Tout le pack Essentiel",
      "Aide à la création d'entreprise",
      "Coaching individuel personnalisé",
      "Suivi post-formation 3 mois",
    ]}
    essentielFeatures={[
      "Formation complète 33h",
      "Préparation intensive examen CMA",
      "Support pédagogique",
      "Accès aux quiz en ligne",
    ]}
    programModules={[
      { title: "Réglementation VTC", duration: "12h", topics: ["Loi Grandguillaume", "Statut VTC", "Droits et obligations", "LOTI et capacité"] },
      { title: "Gestion d'entreprise", duration: "10h", topics: ["Micro-entreprise vs SASU", "Comptabilité simplifiée", "TVA et fiscalité", "Protection sociale"] },
      { title: "Sécurité routière", duration: "8h", topics: ["Conduite préventive", "Gestion du stress", "Premiers secours", "Éco-conduite"] },
      { title: "Relation client premium", duration: "8h", topics: ["Accueil haut de gamme", "Gestion des réclamations", "Discrétion professionnelle", "Fidélisation"] },
      { title: "Applications et plateformes", duration: "6h", topics: ["Uber, Bolt, Heetch", "Optimisation des courses", "Gestion multi-apps", "Notation et avis"] },
      { title: "Anglais professionnel", duration: "6h", topics: ["Vocabulaire transport", "Accueil clients étrangers", "Communication basique", "Expressions courantes"] },
    ]}
    prerequisites={[
      { icon: Users, text: "Avoir 21 ans minimum" },
      { icon: FileText, text: "Permis B valide depuis au moins 3 ans" },
      { icon: CheckCircle, text: "Casier judiciaire vierge (bulletin n°2)" },
      { icon: Target, text: "Aptitude médicale (visite médicale préfectorale)" },
    ]}
    testimonials={[
      { name: "Alexandre M.", role: "Chauffeur VTC Premium", content: "Formation au top ! J'ai particulièrement apprécié les cours sur la relation client haut de gamme. Aujourd'hui je travaille avec une clientèle fidèle.", rating: 5 },
      { name: "Fatima R.", role: "Auto-entrepreneuse VTC", content: "L'accompagnement pour créer mon entreprise a été précieux. Les formateurs m'ont guidée pas à pas.", rating: 5 },
      { name: "Thomas G.", role: "Chauffeur VTC indépendant", content: "Excellente formation, très complète sur les aspects juridiques et commerciaux. Le module sur les applications m'a permis d'optimiser mes revenus.", rating: 5 },
    ]}
    faqs={[
      { question: "Quelle est la différence entre taxi et VTC ?", answer: "Le taxi peut prendre des clients dans la rue (maraude) et a accès aux bornes taxi. Le VTC travaille uniquement sur réservation préalable via des applications ou contrats." },
      { question: "Combien peut gagner un chauffeur VTC ?", answer: "En moyenne, un chauffeur VTC à temps plein peut générer entre 3000€ et 5000€ de chiffre d'affaires mensuel avant charges." },
      { question: "Faut-il avoir son propre véhicule ?", answer: "Non, vous pouvez louer un véhicule VTC auprès de sociétés spécialisées (LOA, LLD) ou travailler comme salarié d'une société VTC." },
      { question: "Combien de temps dure la formation VTC ?", answer: "La formation VTC est disponible en journée (1 semaine), en soirée (2 semaines) ou en e-learning (illimité jusqu'à l'examen)." },
      { question: "Puis-je travailler pour Uber après la formation ?", answer: "Oui, une fois votre carte professionnelle VTC obtenue, vous pouvez vous inscrire sur toutes les plateformes : Uber, Bolt, Heetch, etc." },
      { question: "Comment se passe l'examen VTC ?", answer: "L'examen se compose de 7 épreuves : réglementation des transports, gestion, sécurité routière, français, anglais, développement commercial et réglementation locale." },
    ]}
    seoContent={[
      { title: "Présentation de la formation VTC", text: "La formation VTC initiale dispensée par ECOLE T3P à Montrouge est un parcours complet destiné aux candidats souhaitant obtenir leur carte professionnelle de conducteur de voiture de transport avec chauffeur. Disponible en journée, soirée ou e-learning. Notre centre, agréé par la Préfecture des Hauts-de-Seine, affiche un taux de réussite de 94% avec plus de 359 avis 5 étoiles sur Google." },
      { title: "Débouchés après la formation VTC", text: "Une fois votre carte professionnelle VTC en poche, plusieurs options s'offrent à vous : exercer en tant que chauffeur VTC indépendant sous le statut de micro-entrepreneur ou SASU, devenir salarié d'une société de VTC, ou travailler via les plateformes de réservation telles qu'Uber, Bolt ou Heetch." },
      { title: "Financement de la formation", text: "ECOLE T3P facilite l'accès à la formation avec le paiement en 4 fois sans frais via Alma et un échelonnement personnalisé. Notre équipe administrative vous accompagne dans toutes vos démarches." },
    ]}
    relatedLinks={[
      { title: "Formation Taxi", desc: "Découvrez notre formation Taxi initiale", path: "/formations/taxi" },
      { title: "Formation VMDTR", desc: "Formation VMDTR moto-taxi professionnelle", path: "/formations/vmdtr" },
      { title: "Passerelle Mobilité", desc: "Passerelle VTC vers Taxi ou Taxi vers VTC", path: "/formations/mobilite" },
      { title: "Contact", desc: "Contactez-nous pour vous inscrire", path: "/contact" },
    ]}
  />
);

export default FormationVTC;
