import { Bike, RefreshCw, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ContinueFormationTemplate from "@/components/formations/ContinueFormationTemplate";

const CrossSellSection = () => (
  <section className="section-padding bg-muted">
    <div className="container-custom">
      <div className="max-w-2xl mx-auto card-t3p border-2 border-primary/20 overflow-hidden">
        <div className="bg-primary p-6 -m-5 mb-4 rounded-t-xl">
          <h3 className="text-lg font-bold text-white mb-1">Vous n'avez pas encore votre carte VMDTR ?</h3>
          <p className="text-white/80 text-sm">Obtenez votre carte professionnelle avec notre formation initiale</p>
        </div>
        <div className="pt-2 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Formation initiale VMDTR</span>
            <span className="font-bold text-primary text-xl">990€</span>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> 33 heures de formation</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Préparation à l'examen CMA</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Frais d'examen inclus</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Taux de réussite 94%</li>
          </ul>
          <Link
            to="/formations/vmdtr"
            className="btn-cta-orange w-full px-6 py-3.5 font-bold rounded-lg inline-flex items-center justify-center gap-2"
          >
            Découvrir la formation initiale VMDTR <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const FormationContinueVMDTR = () => (
  <ContinueFormationTemplate
    title="Formation Continue VMDTR 14h Montrouge — 239€ | ECOLE T3P"
    description="Formation continue obligatoire VMDTR 14h pour renouveler votre carte professionnelle moto-taxi. Centre agréé Préfecture à Montrouge."
    canonical="https://www.ecolet3p.fr/formations/continue-vmdtr"
    ogTitle="Formation Continue VMDTR 14h — ECOLE T3P Montrouge"
    ogDescription="Renouvelez votre carte VMDTR moto-taxi. Formation continue 14h à 239€. Centre agréé Préfecture 92."
    badge="Formation Continue VMDTR"
    badgeIcon={RefreshCw}
    heading="Formation Continue VMDTR — 14h"
    subheading="Formation obligatoire de 14 heures pour le renouvellement de votre carte professionnelle de conducteur VMDTR (taxi moto), conformément à la réglementation en vigueur."
    duration="14h"
    price={239}
    format="2 jours"
    category="continue-vmdtr"
    regulatoryText="La formation continue est requise tous les 5 ans pour le renouvellement de la carte professionnelle de conducteur VMDTR, conformément au décret n°2017-483 du 6 avril 2017 relatif aux activités de transport public particulier de personnes."
    objectives={[
      "Actualiser vos connaissances réglementaires",
      "Renforcer la sécurité deux-roues",
      "Améliorer la qualité de service",
      "Valider le renouvellement de votre carte",
    ]}
    programModules={[
      { title: "Actualisation réglementaire", duration: "4h", topics: ["Évolution du code des transports", "Nouvelles obligations VMDTR", "Contrôles et sanctions"] },
      { title: "Sécurité routière deux-roues", duration: "4h", topics: ["Prévention des risques spécifiques", "Conduite préventive moto", "Équipements de sécurité"] },
      { title: "Qualité de service et relation client", duration: "3h", topics: ["Accueil et confort passager", "Gestion des situations particulières", "Communication"] },
      { title: "Gestion de l'activité professionnelle", duration: "3h", topics: ["Évolutions fiscales", "Plateformes de réservation", "Optimisation de l'activité"] },
    ]}
    testimonial={{
      name: "Karim T.",
      role: "Conducteur VMDTR depuis 2020",
      content: "En tant que conducteur moto-taxi, la formation continue m'a permis de me mettre à jour sur les nouvelles normes d'équipement et les évolutions réglementaires. Très pratique et bien organisée.",
    }}
    extraSection={<CrossSellSection />}
    seoContent={[
      { title: "Évolutions 2026 pour les conducteurs VMDTR", text: "Le métier de conducteur VMDTR connaît une évolution significative en 2026. Les nouvelles normes d'équipement imposent des standards renforcés : casque homologué avec intercom intégré, gilet airbag obligatoire pour le conducteur, et système de géolocalisation en temps réel. Les contrôles techniques périodiques deviennent obligatoires avec une visite annuelle imposée." },
      { title: "Sécurité et plateformes de réservation", text: "Les plateformes dédiées au transport moto se développent rapidement avec des algorithmes de tarification dynamique spécifiques au VMDTR. La sécurité routière reste la priorité absolue : les statistiques 2025 montrent une réduction de 18% des accidents impliquant des VMDTR professionnels formés régulièrement." },
    ]}
    faqs={[
      { question: "La formation continue VMDTR est-elle obligatoire ?", answer: "Oui, la formation continue est obligatoire tous les 5 ans pour le renouvellement de votre carte professionnelle VMDTR, conformément à la réglementation en vigueur." },
      { question: "Quelle est la durée de la formation continue VMDTR ?", answer: "La formation continue VMDTR dure 14 heures, réparties généralement sur 2 jours consécutifs." },
      { question: "Que se passe-t-il si je ne fais pas ma formation continue ?", answer: "Sans formation continue validée, vous ne pourrez pas renouveler votre carte professionnelle et ne serez plus autorisé à exercer l'activité de VMDTR." },
      { question: "Comment justifier ma formation continue ?", answer: "À l'issue de la formation, une attestation de stage vous est délivrée. Ce document est nécessaire pour le renouvellement de votre carte professionnelle auprès de la préfecture." },
    ]}
    relatedLinks={[
      { title: "Formation VMDTR Initiale", desc: "Obtenez votre carte professionnelle VMDTR", path: "/formations/vmdtr" },
      { title: "Formation Continue Taxi", desc: "Renouvelez votre carte Taxi", path: "/formations/continue-taxi" },
      { title: "Formation Continue VTC", desc: "Renouvelez votre carte VTC", path: "/formations/continue-vtc" },
      { title: "Contact", desc: "Contactez-nous pour vous inscrire", path: "/contact" },
    ]}
  />
);

export default FormationContinueVMDTR;
