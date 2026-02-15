import { Accessibility } from "lucide-react";
import ServicePageTemplate from "@/components/formations/ServicePageTemplate";

const FormationPMR = () => (
  <ServicePageTemplate
    title="Formation Accessibilité PMR 14h — 290€ | ECOLE T3P"
    description="Formation transport PMR 14h (2 jours) à 290€. Maîtrisez le transport de personnes à mobilité réduite. Paiement 4× sans frais."
    canonical="https://www.ecolet3p.fr/formation-accessibilite-pmr"
    badge="Formation PMR"
    badgeIcon={Accessibility}
    heading="Formation Accessibilité & Transport PMR"
    subheading="Élargissez votre clientèle et maîtrisez le transport de personnes à mobilité réduite. Formation pratique de 14 heures."
    duration="14h (2 jours)"
    price={290}
    formationTitle="Formation Accessibilité / Transport PMR"
    features={[
      "Réglementation PMR applicable au transport",
      "Manipulation de fauteuils roulants et aides techniques",
      "Communication adaptée avec les personnes en situation de handicap",
      "Gestes et postures pour la manutention",
      "Sécurité lors de l'embarquement et du débarquement",
      "Connaissance des différents types de handicap",
    ]}
    relatedLinks={[
      { title: "Formation VTC", desc: "Formation initiale VTC", path: "/formations/vtc" },
      { title: "Formation Taxi", desc: "Formation initiale Taxi", path: "/formations/taxi" },
      { title: "Gestion d'entreprise", desc: "Lancez votre activité sur des bases solides", path: "/accompagnement-gestion-activite" },
      { title: "Contact", desc: "Contactez-nous pour vous inscrire", path: "/contact" },
    ]}
  />
);

export default FormationPMR;
