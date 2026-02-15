import { Bike, Users, FileText, CheckCircle, Target, Shield } from "lucide-react";
import FormationPageTemplate from "@/components/formations/FormationPageTemplate";
import heroImageVMDTR from "@/assets/formations/hero-vmdtr.jpg";

const FormationVMDTR = () => (
  <FormationPageTemplate
    title="Formation VMDTR Moto-Taxi Montrouge 92 — 990€ en 4x"
    description="Formation moto-taxi VMDTR 33h à Montrouge. Préparation examen T3P CMA, 94% de réussite. 990€ payable en 4x sans frais."
    canonical="https://www.ecolet3p.fr/formations/vmdtr"
    ogTitle="Formation VMDTR Moto-Taxi à Montrouge — ECOLE T3P"
    ogDescription="Formation VMDTR 33h à Montrouge. Centre agréé Préfecture, 94% de réussite."
    heroImage={heroImageVMDTR}
    badge="Formation VMDTR"
    badgeIcon={Bike}
    heading="Formation VMDTR Moto-Taxi à Montrouge — 33h"
    subheading="Devenez moto-taxi professionnel avec notre formation complète. Maîtrisez la sécurité, la réglementation et lancez votre activité."
    duration="33h"
    price={990}
    thirdTag={{ icon: Shield, label: "Sécurité renforcée" }}
    category="vmdtr"
    profession="vmdtr"
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
      { title: "Réglementation VMDTR", duration: "7h", topics: ["Statut moto-taxi", "Code des transports", "Obligations professionnelles", "Assurances spécifiques"] },
      { title: "Sécurité deux-roues", duration: "8h", topics: ["Conduite défensive", "Gestion des risques", "Équipements de sécurité", "Premiers secours"] },
      { title: "Conduite en milieu urbain", duration: "5h", topics: ["Circulation inter-files", "Gestion du trafic dense", "Stationnement", "Itinéraires optimisés"] },
      { title: "Relation client", duration: "4h", topics: ["Accueil passager", "Gestion du stress", "Communication", "Équipement passager"] },
      { title: "Gestion d'entreprise", duration: "6h", topics: ["Création d'entreprise", "Comptabilité", "Fiscalité", "Applications de réservation"] },
      { title: "Examen et mise en situation", duration: "3h", topics: ["QCM réglementaire", "Mise en situation pratique", "Correction", "Conseils finaux"] },
    ]}
    prerequisites={[
      { icon: Users, text: "Avoir 21 ans minimum" },
      { icon: FileText, text: "Permis A depuis au moins 3 ans" },
      { icon: CheckCircle, text: "Casier judiciaire vierge (bulletin n°2)" },
      { icon: Target, text: "Aptitude médicale (visite médicale préfectorale)" },
    ]}
    testimonials={[
      { name: "Julien M.", role: "Moto-taxi Paris depuis 2024", content: "Formation top ! J'étais motard depuis 10 ans mais la formation m'a appris toutes les spécificités du transport de passagers.", rating: 5 },
      { name: "Sarah K.", role: "VMDTR indépendante", content: "Excellente formation, très axée sur la sécurité. J'ai beaucoup appris sur la réglementation et la gestion de mon activité.", rating: 5 },
      { name: "Antoine R.", role: "Chauffeur VMDTR premium", content: "Reconversion réussie grâce à ECOLE T3P. L'équipe est au top et le paiement en 4x m'a permis de me lancer sereinement.", rating: 5 },
    ]}
    faqs={[
      { question: "Qu'est-ce que le VMDTR ?", answer: "VMDTR signifie Véhicule Motorisé à Deux ou Trois Roues. C'est le statut officiel des moto-taxis en France." },
      { question: "Quels sont les prérequis pour devenir moto-taxi ?", answer: "Avoir 21 ans minimum, permis A depuis 3 ans, casier vierge et visite médicale. Une expérience moto est recommandée." },
      { question: "Combien de temps dure la formation VMDTR ?", answer: "La formation VMDTR initiale dure 33 heures, avec des modules théoriques et des mises en situation pratiques." },
      { question: "Quel type de moto puis-je utiliser ?", answer: "Moto, scooter ou trois-roues d'une cylindrée minimale de 125cc, homologué pour le transport de passagers." },
      { question: "Quels équipements sont obligatoires ?", answer: "Casque homologué, gants, gilet réfléchissant et protection dorsale pour vous et votre passager." },
      { question: "Comment financer ma formation VMDTR ?", answer: "Paiement en 4x sans frais via Alma. D'autres solutions de financement peuvent être étudiées selon votre situation." },
    ]}
    seoContent={[
      { title: "Présentation de la formation VMDTR", text: "La formation VMDTR (moto-taxi) de 33 heures dispensée par ECOLE T3P à Montrouge prépare les candidats à l'obtention de la carte professionnelle de conducteur de véhicule motorisé à deux ou trois roues. Le programme couvre la réglementation, la sécurité deux-roues, la conduite en milieu urbain et la gestion d'entreprise." },
      { title: "Le métier de moto-taxi", text: "Le moto-taxi offre un service premium de transport rapide en zone urbaine. C'est un métier idéal pour les passionnés de deux-roues souhaitant allier leur passion à une activité professionnelle rentable." },
    ]}
    relatedLinks={[
      { title: "Formation VTC", desc: "Découvrez notre formation VTC initiale", path: "/formations/vtc" },
      { title: "Formation Taxi", desc: "Découvrez notre formation Taxi initiale", path: "/formations/taxi" },
      { title: "Passerelle Mobilité", desc: "Passerelle VTC vers Taxi ou Taxi vers VTC", path: "/formations/mobilite" },
      { title: "Contact", desc: "Contactez-nous pour vous inscrire", path: "/contact" },
    ]}
  />
);

export default FormationVMDTR;
