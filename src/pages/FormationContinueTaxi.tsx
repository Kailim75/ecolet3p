import { RefreshCw } from "lucide-react";
import ContinueFormationTemplate from "@/components/formations/ContinueFormationTemplate";

const FormationContinueTaxi = () => (
  <ContinueFormationTemplate
    title="Formation Continue Taxi 14h Montrouge — 239€ | ECOLE T3P"
    description="Formation continue obligatoire Taxi 14h à Montrouge (92). Renouvelez votre carte professionnelle tous les 5 ans. Centre agréé Préfecture. Attestation immédiate."
    canonical="https://www.ecolet3p.fr/formations/continue-taxi"
    ogTitle="Formation Continue Taxi 14h — ECOLE T3P Montrouge"
    ogDescription="Renouvelez votre carte Taxi. Formation continue 14h à 239€. Centre agréé Préfecture 92. Attestation le jour même."
    badge="Formation Continue Taxi"
    badgeIcon={RefreshCw}
    heading="Formation Continue Taxi — 14h"
    subheading="Formation obligatoire de 14 heures pour le renouvellement de votre carte professionnelle Taxi. Attestation délivrée le jour même. Sessions chaque semaine à Montrouge (92)."
    duration="14h"
    price={239}
    format="2 jours"
    category="continue-taxi"
    regulatoryText="La formation continue est requise tous les 5 ans pour le renouvellement de la carte professionnelle de conducteur de taxi, conformément au décret n°2017-483 du 6 avril 2017. Le non-respect de cette obligation entraîne le refus de renouvellement par la préfecture et l'interdiction d'exercer. Les contrôles routiers renforcés en 2026 ciblent spécifiquement la validité des cartes professionnelles."
    objectives={[
      "Actualiser vos connaissances sur la réforme tarifaire 2026",
      "Maîtriser les obligations ZFE Grand Paris",
      "Comprendre les nouveaux outils numériques de gestion",
      "Améliorer la sécurité routière et l'éco-conduite",
      "Optimiser la rentabilité de votre activité Taxi",
      "Valider le renouvellement de votre carte professionnelle",
    ]}
    programModules={[
      {
        title: "Actualisation réglementaire Taxi 2026",
        duration: "4h",
        topics: [
          "Réforme tarifaire 2026 : revalorisation prise en charge et prix kilométriques",
          "Zones à Faibles Émissions (ZFE) et véhicules autorisés",
          "Contrôles renforcés : barème des sanctions et suspensions",
          "Évolutions du code des transports et obligations Taxi",
        ],
      },
      {
        title: "Sécurité routière et éco-conduite",
        duration: "4h",
        topics: [
          "Prévention des risques routiers et conduite préventive",
          "Éco-conduite : économiser 15 à 20% de carburant",
          "Gestion du stress et de la fatigue en service continu",
          "Premiers secours et comportement en cas d'accident",
        ],
      },
      {
        title: "Qualité de service et relation client",
        duration: "3h",
        topics: [
          "Accueil des personnes à mobilité réduite (PMR)",
          "Gestion des conflits et situations difficiles",
          "Paiements dématérialisés et terminaux modernes",
          "Fidélisation et avis clients positifs",
        ],
      },
      {
        title: "Gestion financière de l'activité Taxi",
        duration: "3h",
        topics: [
          "Régime fiscal Taxi 2026 : cotisations et obligations",
          "Rentabilité par shift : analyse et optimisation",
          "Applications de réservation et courses directes",
          "Anticipation de la transition électrique",
        ],
      },
    ]}
    testimonial={{
      name: "Ahmed B.",
      role: "Chauffeur Taxi depuis 12 ans",
      content: "La formation continue m'a permis de me mettre à jour sur les nouvelles réglementations ZFE et la réforme tarifaire 2026. Les formateurs sont très compétents et donnent des conseils concrets pour optimiser notre activité au quotidien. J'ai particulièrement apprécié le module sur la rentabilité par shift.",
    }}
    seoContent={[
      {
        title: "Réforme tarifaire Taxi 2026 : ce qui change concrètement",
        text: "L'année 2026 marque un tournant majeur pour la profession de conducteur de taxi en Île-de-France. La réforme tarifaire modifie les modalités de calcul des courses avec une revalorisation du tarif de prise en charge et une actualisation des prix kilométriques alignés sur l'inflation. Les tarifs de nuit, dimanche et jours fériés sont également révisés. Pour les taxis artisans, ces modifications impactent directement la rentabilité par course et nécessitent une adaptation de la stratégie de travail (choix des créneaux horaires, zones de stationnement)."
      },
      {
        title: "ZFE et transition véhicule : anticiper les contraintes",
        text: "L'extension progressive des Zones à Faibles Émissions (ZFE) dans le Grand Paris impose des contraintes strictes sur les véhicules autorisés. En 2026, seuls les véhicules Crit'Air 1, hybrides et électriques peuvent circuler dans les zones les plus restrictives. Pour un chauffeur Taxi, l'anticipation est clé : le coût moyen d'un véhicule électrique adapté à l'activité Taxi se situe entre 35 000€ et 50 000€, mais les économies sur le carburant atteignent 3 000 à 5 000€ par an. Des aides spécifiques existent pour les professionnels du transport."
      },
      {
        title: "Calculer la rentabilité de votre activité Taxi",
        text: "Un chauffeur Taxi en Île-de-France génère en moyenne entre 4 000€ et 7 000€ de chiffre d'affaires mensuel brut. Après déduction des charges (cotisations sociales, assurance, carburant, entretien, redevance ADS le cas échéant), le revenu net se situe entre 2 500€ et 4 000€. La formation continue vous apprend à analyser la rentabilité de chaque shift, à optimiser vos heures de travail et à réduire vos charges grâce à l'éco-conduite et une meilleure gestion comptable."
      },
      {
        title: "Renouvellement carte Taxi : démarches et pièces justificatives",
        text: "Le dossier de renouvellement de carte professionnelle Taxi comprend : l'attestation de formation continue de 14h (délivrée le jour même chez ECOLE T3P), un justificatif de domicile récent, un extrait de casier judiciaire (bulletin n°2), la carte professionnelle en cours de validité, une visite médicale de moins de 2 ans et, pour les artisans, une attestation d'inscription au registre des métiers. La préfecture des Hauts-de-Seine traite les dossiers en 2 à 4 semaines."
      },
    ]}
    faqs={[
      { question: "La formation continue Taxi est-elle obligatoire ?", answer: "Oui, la formation continue de 14 heures est obligatoire tous les 5 ans pour le renouvellement de votre carte professionnelle Taxi. C'est une obligation légale inscrite dans le décret n°2017-483. Sans attestation de stage, la préfecture refusera votre demande de renouvellement." },
      { question: "Combien coûte la formation continue Taxi chez ECOLE T3P ?", answer: "La formation continue Taxi est à 239€ TTC tout compris. Ce tarif inclut les 14 heures de formation réparties sur 2 jours, les supports pédagogiques et l'attestation de stage délivrée le jour même." },
      { question: "La réforme tarifaire 2026 est-elle abordée ?", answer: "Oui, un module complet de 4 heures est consacré aux évolutions réglementaires 2026, incluant la réforme tarifaire (revalorisation des tarifs de prise en charge et kilométriques), les obligations ZFE et les contrôles renforcés." },
      { question: "Quand dois-je faire ma formation continue Taxi ?", answer: "Votre formation continue doit être effectuée avant l'expiration de votre carte professionnelle (tous les 5 ans). Nous recommandons de la planifier 3 à 6 mois avant la date d'expiration pour anticiper les délais de traitement de la préfecture." },
      { question: "Puis-je continuer à conduire pendant le renouvellement ?", answer: "Tant que votre carte n'est pas expirée et que vous avez engagé les démarches dans les délais, vous pouvez continuer à exercer. Attention : exercer avec une carte expirée expose à une amende de 1 500€ et à la mise en fourrière du véhicule." },
      { question: "La formation aborde-t-elle la transition électrique ?", answer: "Oui, le module de gestion de l'activité inclut une analyse financière de la transition électrique : coût d'acquisition, économies de carburant, aides disponibles et impact sur la rentabilité par shift." },
      { question: "Quels documents apporter le jour de la formation ?", answer: "Vous devez présenter votre carte professionnelle Taxi en cours de validité, une pièce d'identité et un justificatif de domicile de moins de 3 mois." },
      { question: "Comment se déroule la formation sur 2 jours ?", answer: "La formation se déroule sur 2 jours consécutifs (7h par jour) dans notre centre de Montrouge (3 rue Corneille, 92120). Elle alterne cours théoriques interactifs et ateliers pratiques. L'attestation est remise en fin de deuxième journée." },
    ]}
    blogLinks={[
      { title: "Devenir chauffeur Taxi en 2026", description: "Toutes les étapes pour lancer votre activité Taxi.", path: "/blog/devenir-chauffeur-taxi-2026" },
      { title: "Formation continue : ce qui change", description: "Les évolutions réglementaires 2026 pour les chauffeurs T3P.", path: "/blog/formation-continue-chauffeur-t3p" },
      { title: "Statuts juridiques du chauffeur T3P", description: "Micro-entreprise, SASU, EURL : quel statut choisir ?", path: "/blog/statuts-juridiques-chauffeur-t3p" },
    ]}
    relatedLinks={[
      { title: "Formation Taxi Initiale", desc: "Obtenez votre carte professionnelle Taxi — à partir de 990€", path: "/formations/taxi" },
      { title: "Formation Continue VTC", desc: "Renouvelez votre carte VTC — 170€", path: "/formations/continue-vtc" },
      { title: "Passerelle Taxi ↔ VTC", desc: "Doublez vos revenus avec une seconde carte", path: "/passerelle-vtc-taxi" },
      { title: "Renouvellement carte pro", desc: "Tout savoir sur le renouvellement de carte", path: "/renouvellement-carte-professionnelle" },
    ]}
  />
);

export default FormationContinueTaxi;
