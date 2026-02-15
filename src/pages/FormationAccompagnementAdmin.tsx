import { ClipboardList } from "lucide-react";
import ServicePageTemplate from "@/components/formations/ServicePageTemplate";

const FormationAccompagnementAdmin = () => (
  <ServicePageTemplate
    title="Accompagnement Administratif 7h — À partir de 190€ | ECOLE T3P"
    description="Accompagnement administratif 7h à partir de 190€. Carte pro, registre T3P, préfecture, plateformes VTC. Paiement 4× sans frais."
    canonical="https://www.ecolet3p.fr/formations/accompagnement-administratif"
    badge="Accompagnement Admin"
    badgeIcon={ClipboardList}
    heading="Accompagnement Administratif"
    subheading="On s'occupe de la paperasse pour vous — concentrez-vous sur votre réussite. Carte professionnelle, registre T3P, préfecture, plateformes."
    duration="7h (1 journée)"
    price={190}
    formationTitle="Accompagnement Administratif"
    features={[
      "Création du dossier carte professionnelle",
      "Inscription au registre T3P",
      "Démarches préfecture complètes",
      "Inscription sur les plateformes VTC (Uber, Bolt, etc.)",
      "Aide à l'immatriculation du véhicule",
      "Assistance assurances professionnelles",
    ]}
    pricing={[
      { label: "En groupe", price: 190 },
      { label: "Individuel", price: 290, recommended: true },
    ]}
    relatedLinks={[
      { title: "Formation VTC", desc: "Formation initiale VTC 63h", path: "/formations/vtc" },
      { title: "Formation Taxi", desc: "Formation initiale Taxi 63h", path: "/formations/taxi" },
      { title: "Gestion d'entreprise", desc: "Lancez votre activité sur des bases solides", path: "/formations/gestion-entreprise" },
      { title: "Contact", desc: "Contactez-nous pour vous inscrire", path: "/contact" },
    ]}
  />
);

export default FormationAccompagnementAdmin;
