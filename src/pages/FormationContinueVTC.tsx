import { Car, RefreshCw } from "lucide-react";
import ContinueFormationTemplate from "@/components/formations/ContinueFormationTemplate";

const FormationContinueVTC = () => (
  <ContinueFormationTemplate
    title="Formation Continue VTC 14h Montrouge — 170€ | ECOLE T3P"
    description="Formation continue obligatoire VTC de 14h pour renouveler votre carte professionnelle. Centre agréé Préfecture à Montrouge. Attestation de stage délivrée."
    canonical="https://www.ecolet3p.fr/formations/continue-vtc"
    ogTitle="Formation Continue VTC 14h — ECOLE T3P Montrouge"
    ogDescription="Renouvelez votre carte VTC. Formation continue 14h à 170€. Centre agréé Préfecture 92."
    badge="Formation Continue VTC"
    badgeIcon={RefreshCw}
    heading="Formation Continue VTC — 14h"
    subheading="Formation obligatoire de 14 heures pour le renouvellement de votre carte professionnelle de conducteur VTC, conformément à la réglementation en vigueur."
    duration="14h"
    price={170}
    format="2 jours"
    category="continue-vtc"
    regulatoryText="La formation continue est requise tous les 5 ans pour le renouvellement de la carte professionnelle de conducteur VTC, conformément au décret n°2017-483 du 6 avril 2017 relatif aux activités de transport public particulier de personnes."
    objectives={[
      "Actualiser vos connaissances réglementaires",
      "Renforcer la sécurité routière",
      "Améliorer la qualité de service premium",
      "Valider le renouvellement de votre carte",
    ]}
    programModules={[
      { title: "Actualisation réglementaire", duration: "4h", topics: ["Évolution du code des transports", "Nouvelles obligations VTC", "Contrôles et sanctions"] },
      { title: "Sécurité routière et éco-conduite", duration: "4h", topics: ["Prévention des risques", "Conduite économique", "Gestion du stress"] },
      { title: "Qualité de service et relation client", duration: "3h", topics: ["Accueil des personnes à mobilité réduite", "Gestion des conflits", "Communication premium"] },
      { title: "Gestion de l'activité professionnelle", duration: "3h", topics: ["Évolutions fiscales", "Applications de réservation", "Optimisation de l'activité"] },
    ]}
    testimonial={{
      name: "Mamadou D.",
      role: "Chauffeur VTC depuis 3 ans",
      content: "La formation continue chez ECOLE T3P m'a permis de comprendre les nouvelles obligations ZFE et surtout d'optimiser ma gestion fiscale. Grâce aux conseils des formateurs, j'économise maintenant plus de 200€ par mois sur mes charges.",
    }}
    seoContent={[
      { title: "Évolutions 2026 : ce qui change pour les chauffeurs VTC", text: "Le secteur VTC connaît une transformation accélérée en 2026. Les plateformes de mise en relation comme Uber, Bolt et Heetch font face à de nouvelles obligations réglementaires européennes. Le Digital Markets Act (DMA) impose plus de transparence sur les algorithmes de tarification. La réglementation des Zones à Faibles Émissions (ZFE) impacte directement les VTC : seuls les véhicules Crit'Air 1 et électriques sont autorisés dans le Grand Paris pour l'exercice professionnel." },
      { title: "Optimisez votre activité VTC", text: "Les nouvelles applications de gestion permettent d'optimiser vos courses grâce à l'intelligence artificielle : estimation précise de la demande par zone horaire, calcul automatique de la rentabilité nette par course après déduction des charges, et gestion comptable intégrée pour les auto-entrepreneurs. Notre formation continue intègre une prise en main concrète de ces outils pour maximiser vos revenus." },
    ]}
    faqs={[
      { question: "La formation continue VTC est-elle obligatoire ?", answer: "Oui, la formation continue est obligatoire tous les 5 ans pour le renouvellement de votre carte professionnelle VTC, conformément à la réglementation en vigueur." },
      { question: "Quelle est la durée de la formation continue VTC ?", answer: "La formation continue VTC dure 14 heures, réparties généralement sur 2 jours consécutifs." },
      { question: "Que se passe-t-il si je ne fais pas ma formation continue ?", answer: "Sans formation continue validée, vous ne pourrez pas renouveler votre carte professionnelle et ne serez plus autorisé à exercer l'activité de VTC." },
      { question: "Comment justifier ma formation continue ?", answer: "À l'issue de la formation, une attestation de stage vous est délivrée. Ce document est nécessaire pour le renouvellement de votre carte professionnelle auprès de la préfecture." },
    ]}
    relatedLinks={[
      { title: "Formation VTC Initiale", desc: "Obtenez votre carte professionnelle VTC", path: "/formations/vtc" },
      { title: "Formation Continue Taxi", desc: "Renouvelez votre carte Taxi", path: "/formations/continue-taxi" },
      { title: "Passerelle Mobilité", desc: "Passerelle VTC vers Taxi ou inversement", path: "/formations/mobilite" },
      { title: "Contact", desc: "Contactez-nous pour vous inscrire", path: "/contact" },
    ]}
  />
);

export default FormationContinueVTC;
