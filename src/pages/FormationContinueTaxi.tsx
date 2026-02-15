import { RefreshCw } from "lucide-react";
import ContinueFormationTemplate from "@/components/formations/ContinueFormationTemplate";

const FormationContinueTaxi = () => (
  <ContinueFormationTemplate
    title="Formation Continue Taxi 14h Montrouge — 239€ | ECOLE T3P"
    description="Formation continue obligatoire Taxi 14h à Montrouge. Renouvelez votre carte professionnelle tous les 5 ans. Centre agréé Préfecture des Hauts-de-Seine."
    canonical="https://www.ecolet3p.fr/formations/continue-taxi"
    ogTitle="Formation Continue Taxi 14h — ECOLE T3P Montrouge"
    ogDescription="Renouvelez votre carte Taxi. Formation continue 14h à 239€. Centre agréé Préfecture 92."
    badge="Formation Continue Taxi"
    badgeIcon={RefreshCw}
    heading="Formation Continue Taxi — 14h"
    subheading="Formation obligatoire de 14 heures pour le renouvellement de votre carte professionnelle de conducteur de taxi, conformément à la réglementation en vigueur."
    duration="14h"
    price={239}
    format="2 jours"
    category="continue-taxi"
    regulatoryText="La formation continue est requise tous les 5 ans pour le renouvellement de la carte professionnelle de conducteur de taxi, conformément au décret n°2017-483 du 6 avril 2017 relatif aux activités de transport public particulier de personnes."
    objectives={[
      "Actualiser vos connaissances réglementaires",
      "Renforcer la sécurité routière",
      "Améliorer la qualité de service",
      "Valider le renouvellement de votre carte",
    ]}
    programModules={[
      { title: "Actualisation réglementaire", duration: "4h", topics: ["Évolution du code des transports", "Nouvelles obligations Taxi", "Contrôles et sanctions"] },
      { title: "Sécurité routière et éco-conduite", duration: "4h", topics: ["Prévention des risques", "Conduite économique", "Gestion du stress"] },
      { title: "Qualité de service et relation client", duration: "3h", topics: ["Accueil des personnes à mobilité réduite", "Gestion des conflits", "Communication"] },
      { title: "Gestion de l'activité professionnelle", duration: "3h", topics: ["Évolutions fiscales", "Outils numériques", "Optimisation de l'activité"] },
    ]}
    testimonial={{
      name: "Ahmed B.",
      role: "Chauffeur Taxi depuis 12 ans",
      content: "La formation continue m'a permis de me mettre à jour sur les nouvelles réglementations ZFE et la réforme tarifaire 2026. Les formateurs sont très compétents et donnent des conseils concrets pour optimiser notre activité au quotidien.",
    }}
    seoContent={[
      { title: "Évolutions réglementaires 2026 pour les taxis", text: "L'année 2026 marque un tournant majeur pour la profession de conducteur de taxi en Île-de-France. L'extension progressive des Zones à Faibles Émissions (ZFE) impose des contraintes strictes sur les véhicules autorisés à circuler dans le Grand Paris. La réforme tarifaire modifie les modalités de calcul des courses avec une revalorisation du tarif de prise en charge et une actualisation des prix kilométriques." },
      { title: "Se préparer aux contrôles renforcés", text: "Les contrôles routiers se durcissent avec un programme d'inspections renforcées ciblant spécifiquement les conducteurs T3P. Le non-respect des nouvelles normes peut entraîner une suspension temporaire de votre carte professionnelle. Notre formation vous aide à anticiper ces évolutions et à rester en conformité totale avec la réglementation 2026." },
    ]}
    faqs={[
      { question: "La formation continue Taxi est-elle obligatoire ?", answer: "Oui, la formation continue est obligatoire tous les 5 ans pour le renouvellement de votre carte professionnelle de conducteur de taxi, conformément à la réglementation en vigueur." },
      { question: "Quelle est la durée de la formation continue Taxi ?", answer: "La formation continue dure 14 heures, réparties généralement sur 2 jours consécutifs." },
      { question: "Que se passe-t-il si je ne fais pas ma formation continue ?", answer: "Sans formation continue validée, vous ne pourrez pas renouveler votre carte professionnelle et ne serez plus autorisé à exercer l'activité de taxi." },
      { question: "Comment justifier ma formation continue ?", answer: "À l'issue de la formation, une attestation de stage vous est délivrée. Ce document est nécessaire pour le renouvellement de votre carte professionnelle auprès de la préfecture." },
    ]}
    relatedLinks={[
      { title: "Formation Taxi Initiale", desc: "Obtenez votre carte professionnelle Taxi", path: "/formations/taxi" },
      { title: "Formation Continue VTC", desc: "Renouvelez votre carte VTC", path: "/formations/continue-vtc" },
      { title: "Passerelle Mobilité", desc: "Passerelle Taxi vers VTC ou inversement", path: "/formations/mobilite" },
      { title: "Contact", desc: "Contactez-nous pour vous inscrire", path: "/contact" },
    ]}
  />
);

export default FormationContinueTaxi;
