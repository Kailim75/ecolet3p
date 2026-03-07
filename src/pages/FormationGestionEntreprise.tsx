import { Briefcase } from "lucide-react";
import ServicePageTemplate from "@/components/formations/ServicePageTemplate";

const FormationGestionEntreprise = () => (
  <ServicePageTemplate
    title="Formation Gestion & Création d'Entreprise 21h — 390€ | ECOLE T3P"
    description="Formation gestion d'entreprise 21h (3 jours) à 390€. Lancez votre activité de chauffeur sur des bases solides. Paiement 4× sans frais."
    canonical="https://ecolet3p.fr/accompagnement-gestion-activite"
    badge="Gestion d'Entreprise"
    badgeIcon={Briefcase}
    heading="Gestion & Création d'Entreprise"
    subheading="Lancez votre activité de chauffeur sur des bases solides. Statut juridique, comptabilité, fiscalité — tout ce qu'il faut savoir."
    duration="21h (3 jours)"
    price={390}
    formationTitle="Formation Gestion & Création d'Entreprise"
    features={[
      "Choix du statut juridique (micro-entreprise, SASU, etc.)",
      "Obligations comptables et fiscales",
      "Élaboration d'un business plan simplifié",
      "Gestion de trésorerie au quotidien",
      "Assurances professionnelles obligatoires",
      "Démarches URSSAF et obligations sociales",
    ]}
    relatedLinks={[
      { title: "Formation VTC", desc: "Formation initiale VTC", path: "/formations/vtc" },
      { title: "Formation Taxi", desc: "Formation initiale Taxi", path: "/formations/taxi" },
      { title: "Accompagnement Administratif", desc: "On s'occupe de la paperasse", path: "/aide-administrative-creation-entreprise" },
      { title: "Contact", desc: "Contactez-nous pour vous inscrire", path: "/contact" },
    ]}
  />
);

export default FormationGestionEntreprise;
