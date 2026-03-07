import { RefreshCw, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ContinueFormationTemplate from "@/components/formations/ContinueFormationTemplate";
import carteVmdtr from "@/assets/carte-professionnelle-vmdtr.jpg";

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
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Préparation complète à l'examen CMA</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Frais d'examen de 241€ inclus</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Taux de réussite 94%</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Paiement en 4x sans frais avec Alma</li>
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
    heroBackground={carteVmdtr}
    title="Formation Continue VMDTR 14h Montrouge — 239€ | ECOLE T3P"
    description="Formation continue obligatoire VMDTR (moto-taxi) 14h pour renouveler votre carte professionnelle. Centre agréé Préfecture à Montrouge (92). Attestation immédiate."
    canonical="https://ecolet3p.fr/formations/continue-vmdtr"
    ogTitle="Formation Continue VMDTR 14h — ECOLE T3P Montrouge"
    ogDescription="Renouvelez votre carte VMDTR moto-taxi. Formation continue 14h à 239€. Centre agréé Préfecture 92. Attestation le jour même."
    badge="Formation Continue VMDTR"
    badgeIcon={RefreshCw}
    heading="Formation Continue VMDTR — 14h"
    subheading="Formation obligatoire de 14 heures pour le renouvellement de votre carte professionnelle VMDTR (taxi moto). Attestation délivrée le jour même, sessions chaque semaine à Montrouge (92)."
    duration="14h"
    price={239}
    format="2 jours"
    category="continue-vmdtr"
    regulatoryText="La formation continue est requise tous les 5 ans pour le renouvellement de la carte professionnelle de conducteur VMDTR, conformément au décret n°2017-483 du 6 avril 2017. Les conducteurs VMDTR sont soumis aux mêmes obligations que les conducteurs VTC et Taxi en matière de formation continue. Les contrôles renforcés de 2026 ciblent particulièrement les équipements de sécurité et la validité des cartes professionnelles deux-roues."
    objectives={[
      "Actualiser vos connaissances réglementaires VMDTR 2026",
      "Maîtriser les nouvelles normes d'équipement de sécurité",
      "Renforcer la conduite préventive spécifique deux-roues",
      "Comprendre les évolutions des plateformes de réservation moto",
      "Optimiser la rentabilité et la gestion fiscale de votre activité",
      "Valider le renouvellement de votre carte professionnelle",
    ]}
    programModules={[
      {
        title: "Actualisation réglementaire VMDTR 2026",
        duration: "4h",
        topics: [
          "Évolutions du code des transports pour les deux-roues motorisés",
          "Nouvelles normes d'équipement : casque intercom, gilet airbag",
          "Contrôle technique annuel obligatoire pour les VMDTR",
          "Barème des sanctions et motifs de suspension de carte",
        ],
      },
      {
        title: "Sécurité routière deux-roues",
        duration: "4h",
        topics: [
          "Conduite préventive et anticipation des dangers spécifiques",
          "Remontée de files et inter-files : cadre légal 2026",
          "Gestion des conditions météorologiques dégradées",
          "Premiers secours adaptés aux accidents deux-roues",
        ],
      },
      {
        title: "Qualité de service et confort passager",
        duration: "3h",
        topics: [
          "Accueil passager et consignes de sécurité pré-trajet",
          "Communication et gestion des appréhensions",
          "Avis clients et e-réputation sur les plateformes moto",
          "Fidélisation et développement de la clientèle directe",
        ],
      },
      {
        title: "Gestion et optimisation de l'activité VMDTR",
        duration: "3h",
        topics: [
          "Régime auto-entrepreneur 2026 : cotisations (21,2%) et TVA",
          "Rentabilité par course : analyse des coûts spécifiques moto",
          "Plateformes de réservation moto et tarification dynamique",
          "Entretien du véhicule et optimisation des coûts d'exploitation",
        ],
      },
    ]}
    testimonial={{
      name: "Karim T.",
      role: "Conducteur VMDTR depuis 2020",
      content: "En tant que conducteur moto-taxi, la formation continue m'a permis de me mettre à jour sur les nouvelles normes d'équipement et les évolutions réglementaires. Le module sur la sécurité deux-roues était particulièrement utile avec les nouvelles règles d'inter-files. Les formateurs connaissent vraiment notre métier.",
    }}
    extraSection={<CrossSellSection />}
    seoContent={[
      {
        title: "Nouvelles normes d'équipement VMDTR en 2026",
        text: "Le métier de conducteur VMDTR connaît une évolution significative en 2026. Les nouvelles normes d'équipement imposent des standards renforcés : casque homologué avec intercom intégré pour la communication avec le passager, gilet airbag obligatoire pour le conducteur, et système de géolocalisation en temps réel. Le contrôle technique périodique devient obligatoire avec une visite annuelle imposée pour tous les véhicules deux-roues utilisés dans le cadre du transport professionnel de personnes. Le non-respect de ces normes peut entraîner une suspension immédiate de la carte professionnelle."
      },
      {
        title: "Marché du transport moto en Île-de-France : opportunités 2026",
        text: "Le marché du VMDTR connaît une croissance soutenue, portée par la congestion urbaine croissante et les restrictions de circulation automobile dans Paris intra-muros. Un conducteur VMDTR actif en Île-de-France peut générer entre 3 000€ et 5 000€ de chiffre d'affaires mensuel brut. L'avantage concurrentiel du VMDTR réside dans des temps de trajet 2 à 3 fois plus courts que les VTC en zones congestionnées, ce qui attire une clientèle premium (hommes d'affaires, transferts aéroport). Les plateformes dédiées au transport moto se développent rapidement avec des algorithmes de tarification dynamique spécifiques."
      },
      {
        title: "Sécurité routière : les chiffres qui comptent",
        text: "Les statistiques 2025 montrent une réduction de 18% des accidents impliquant des VMDTR professionnels formés régulièrement par rapport aux conducteurs non formés. La conduite préventive, l'anticipation des comportements des automobilistes et la maîtrise des inter-files sont les trois compétences clés qui font la différence. Notre formation intègre des mises en situation réalistes et des analyses de cas concrets pour renforcer ces réflexes vitaux."
      },
      {
        title: "Renouvellement carte VMDTR : pièces et délais",
        text: "Le dossier de renouvellement de carte professionnelle VMDTR comprend : l'attestation de formation continue de 14h, le permis moto (catégorie A) en cours de validité, un justificatif de domicile récent, un extrait de casier judiciaire (bulletin n°2), une visite médicale de moins de 2 ans, et le certificat de contrôle technique annuel du véhicule. ECOLE T3P vous délivre l'attestation le jour même et vous accompagne dans les démarches administratives auprès de la préfecture des Hauts-de-Seine."
      },
    ]}
    faqs={[
      { question: "La formation continue VMDTR est-elle obligatoire ?", answer: "Oui, la formation continue de 14 heures est obligatoire tous les 5 ans pour le renouvellement de votre carte professionnelle VMDTR. C'est une obligation légale identique à celle des conducteurs VTC et Taxi. Sans attestation, votre demande de renouvellement sera refusée." },
      { question: "Combien coûte la formation continue VMDTR ?", answer: "La formation continue VMDTR est à 239€ TTC tout compris chez ECOLE T3P. Ce tarif inclut les 14 heures de formation sur 2 jours, les supports pédagogiques et l'attestation de stage délivrée le jour même." },
      { question: "Les nouvelles normes d'équipement sont-elles abordées ?", answer: "Oui, un module complet traite des nouvelles obligations d'équipement 2026 : casque avec intercom intégré, gilet airbag, géolocalisation et contrôle technique annuel. Vous repartez avec une check-list complète de conformité." },
      { question: "Quand dois-je planifier ma formation continue VMDTR ?", answer: "Nous recommandons de planifier votre formation 3 à 6 mois avant l'expiration de votre carte professionnelle pour anticiper les délais de traitement de la préfecture (2 à 4 semaines)." },
      { question: "La formation aborde-t-elle la conduite inter-files ?", answer: "Oui, le module sécurité routière de 4 heures couvre en détail le cadre légal 2026 de l'inter-files, les bonnes pratiques de remontée de files et l'anticipation des dangers spécifiques aux deux-roues motorisés." },
      { question: "Faut-il un permis moto spécifique pour le VMDTR ?", answer: "Oui, l'exercice de l'activité VMDTR nécessite un permis moto de catégorie A (toutes cylindrées) de plus de 3 ans, ou de 2 ans si vous avez suivi la formation passerelle A2→A." },
      { question: "Quels documents apporter le jour de la formation ?", answer: "Carte professionnelle VMDTR en cours de validité, permis moto (catégorie A), pièce d'identité et justificatif de domicile de moins de 3 mois." },
      { question: "Comment se déroule la formation VMDTR sur 2 jours ?", answer: "La formation se déroule sur 2 jours consécutifs dans notre centre de Montrouge. Les modules alternent théorie (réglementation, gestion) et ateliers pratiques (sécurité, relation client). L'attestation est remise en fin de deuxième journée." },
    ]}
    blogLinks={[
      { title: "Moto-taxi VMDTR : le guide complet", description: "Tout savoir sur le métier de conducteur VMDTR.", path: "/blog/moto-taxi-vmdtr-guide-complet" },
      { title: "Formation continue : ce qui change", description: "Les évolutions réglementaires 2026 pour les chauffeurs T3P.", path: "/blog/formation-continue-chauffeur-t3p" },
      { title: "Financer sa formation de chauffeur", description: "Toutes les options de financement disponibles.", path: "/blog/financer-formation-chauffeur" },
    ]}
    relatedLinks={[
      { title: "Formation VMDTR Initiale", desc: "Obtenez votre carte professionnelle VMDTR — 990€ tout compris", path: "/formations/vmdtr" },
      { title: "Formation Continue Taxi", desc: "Renouvelez votre carte Taxi — 239€", path: "/formations/continue-taxi" },
      { title: "Formation Continue VTC", desc: "Renouvelez votre carte VTC — 170€", path: "/formations/continue-vtc" },
      { title: "Renouvellement carte pro", desc: "Tout savoir sur le renouvellement de carte", path: "/renouvellement-carte-professionnelle" },
    ]}
  />
);

export default FormationContinueVMDTR;
