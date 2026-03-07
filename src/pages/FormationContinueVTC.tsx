import { RefreshCw } from "lucide-react";
import ContinueFormationTemplate from "@/components/formations/ContinueFormationTemplate";
import carteVtc from "@/assets/carte-professionnelle-vtc.jpg";

const FormationContinueVTC = () => (
  <ContinueFormationTemplate
    heroBackground={carteVtc}
    title="Formation Continue VTC 14h Montrouge — 170€ | ECOLE T3P"
    description="Formation continue obligatoire VTC de 14h pour renouveler votre carte professionnelle. Centre agréé Préfecture à Montrouge (92). Attestation délivrée le jour même. Sessions chaque semaine."
    canonical="https://ecolet3p.fr/formations/continue-vtc"
    ogTitle="Formation Continue VTC 14h — ECOLE T3P Montrouge"
    ogDescription="Renouvelez votre carte VTC. Formation continue 14h à 170€. Centre agréé Préfecture 92. Attestation immédiate."
    badge="Formation Continue VTC"
    badgeIcon={RefreshCw}
    heading="Formation Continue VTC — 14h"
    subheading="Formation obligatoire de 14 heures pour le renouvellement de votre carte professionnelle VTC. Attestation délivrée le jour même, sessions chaque semaine à Montrouge (92)."
    duration="14h"
    price={170}
    format="2 jours"
    category="continue-vtc"
    regulatoryText="La formation continue est requise tous les 5 ans pour le renouvellement de la carte professionnelle de conducteur VTC, conformément au décret n°2017-483 du 6 avril 2017. Sans cette formation validée, votre carte ne peut être renouvelée et vous ne pouvez plus exercer légalement. Le délai de traitement par la préfecture des Hauts-de-Seine est généralement de 2 à 4 semaines après dépôt du dossier complet."
    objectives={[
      "Actualiser vos connaissances réglementaires 2026",
      "Maîtriser les obligations ZFE Grand Paris",
      "Optimiser vos revenus sur les plateformes (Uber, Bolt, Heetch)",
      "Améliorer la qualité de service premium",
      "Comprendre les évolutions fiscales auto-entrepreneur",
      "Valider le renouvellement de votre carte professionnelle",
    ]}
    programModules={[
      {
        title: "Actualisation réglementaire VTC 2026",
        duration: "4h",
        topics: [
          "Évolution du code des transports et obligations VTC",
          "Digital Markets Act (DMA) et transparence des plateformes",
          "Nouvelles contraintes ZFE : véhicules Crit'Air 1 et électriques",
          "Contrôles renforcés et barème des sanctions",
        ],
      },
      {
        title: "Sécurité routière et éco-conduite",
        duration: "4h",
        topics: [
          "Prévention des risques et conduite préventive",
          "Éco-conduite : réduire la consommation de 15 à 20%",
          "Gestion du stress et de la fatigue au volant",
          "Premiers secours et comportement en cas d'accident",
        ],
      },
      {
        title: "Qualité de service et relation client",
        duration: "3h",
        topics: [
          "Accueil des personnes à mobilité réduite (PMR)",
          "Communication premium et gestion des conflits",
          "Avis Google et e-réputation : stratégies pour 5 étoiles",
          "Fidélisation client et courses directes (hors plateforme)",
        ],
      },
      {
        title: "Gestion et optimisation de l'activité",
        duration: "3h",
        topics: [
          "Régime auto-entrepreneur 2026 : taux de cotisations (21,2%)",
          "Seuil de franchise TVA (37 500€) et obligations comptables",
          "Outils IA de gestion : estimation de la demande par zone horaire",
          "Stratégies multi-plateformes pour maximiser le chiffre d'affaires",
        ],
      },
    ]}
    testimonial={{
      name: "Mamadou D.",
      role: "Chauffeur VTC depuis 3 ans",
      content: "La formation continue chez ECOLE T3P m'a permis de comprendre les nouvelles obligations ZFE et surtout d'optimiser ma gestion fiscale. Grâce aux conseils des formateurs, j'économise maintenant plus de 200€ par mois sur mes charges. La mise à jour sur les outils IA de gestion des courses a aussi été un vrai plus pour mon activité.",
    }}
    seoContent={[
      {
        title: "Pourquoi la formation continue VTC est-elle indispensable en 2026 ?",
        text: "Le secteur VTC connaît une transformation accélérée en 2026. Les plateformes de mise en relation comme Uber, Bolt et Heetch font face à de nouvelles obligations réglementaires européennes. Le Digital Markets Act (DMA) impose plus de transparence sur les algorithmes de tarification, ce qui modifie directement la visibilité des chauffeurs dans les applications. La réglementation des Zones à Faibles Émissions (ZFE) impacte directement les VTC : seuls les véhicules Crit'Air 1 et électriques sont autorisés dans le Grand Paris pour l'exercice professionnel. Comprendre ces évolutions est essentiel pour anticiper vos investissements véhicule et rester compétitif."
      },
      {
        title: "Optimisez votre activité VTC : revenus et gestion",
        text: "Un chauffeur VTC en Île-de-France génère en moyenne entre 3 500€ et 6 000€ de chiffre d'affaires mensuel brut, selon le nombre d'heures travaillées et la stratégie de positionnement. Après déduction des charges (cotisations sociales à 21,2%, assurance RC Pro, carburant, entretien), le revenu net se situe entre 2 000€ et 3 500€. Les nouvelles applications de gestion permettent d'optimiser vos courses grâce à l'intelligence artificielle : estimation précise de la demande par zone horaire, calcul automatique de la rentabilité nette par course, et gestion comptable intégrée pour les auto-entrepreneurs. Notre formation continue intègre une prise en main concrète de ces outils pour maximiser vos revenus."
      },
      {
        title: "La transition électrique : enjeu majeur pour les VTC",
        text: "D'ici 2030, la majorité des métropoles françaises interdiront les véhicules thermiques dans leurs centres-villes. Pour les chauffeurs VTC, le passage à l'électrique n'est plus une option mais une nécessité. Le coût d'utilisation d'un véhicule électrique est en moyenne 60% inférieur à celui d'un thermique (2€/100km contre 10€/100km). Les aides à l'achat (bonus écologique, prime à la conversion) et les solutions de leasing longue durée rendent cette transition financièrement accessible. La formation continue vous prépare à cette échéance avec des simulations financières personnalisées."
      },
      {
        title: "Renouvellement de carte VTC : démarches simplifiées",
        text: "Pour renouveler votre carte professionnelle VTC, vous devez fournir à la préfecture : l'attestation de formation continue de 14h, un justificatif de domicile de moins de 3 mois, un extrait de casier judiciaire (bulletin n°2), votre carte professionnelle en cours de validité, et une visite médicale datant de moins de 2 ans. ECOLE T3P vous accompagne dans la constitution de votre dossier et vous délivre l'attestation de stage le jour même de la fin de formation, vous permettant d'engager immédiatement vos démarches auprès de la préfecture des Hauts-de-Seine."
      },
    ]}
    faqs={[
      { question: "La formation continue VTC est-elle obligatoire ?", answer: "Oui, la formation continue de 14 heures est obligatoire tous les 5 ans pour le renouvellement de votre carte professionnelle VTC. Sans cette formation validée, la préfecture refusera votre demande de renouvellement et vous ne pourrez plus exercer légalement." },
      { question: "Combien coûte la formation continue VTC chez ECOLE T3P ?", answer: "La formation continue VTC est à 170€ TTC tout compris chez ECOLE T3P. Ce tarif inclut les 14 heures de formation, les supports pédagogiques et l'attestation de stage délivrée le jour même." },
      { question: "Quand dois-je faire ma formation continue VTC ?", answer: "Vous devez effectuer votre formation continue avant l'expiration de votre carte professionnelle (tous les 5 ans). Nous recommandons de la planifier 3 à 6 mois avant la date d'expiration pour anticiper les délais de traitement de la préfecture." },
      { question: "Puis-je continuer à travailler pendant le renouvellement ?", answer: "Tant que votre carte n'est pas expirée et que vous avez engagé les démarches de renouvellement dans les délais, vous pouvez continuer à exercer. Exercer avec une carte expirée est strictement interdit et passible de sanctions." },
      { question: "La formation aborde-t-elle les évolutions des plateformes (Uber, Bolt) ?", answer: "Oui, un module de 3 heures est consacré à la gestion de l'activité professionnelle, incluant les stratégies multi-plateformes, l'optimisation des courses via les outils IA, et les nouvelles obligations liées au Digital Markets Act." },
      { question: "Comment se passe la formation continue VTC ?", answer: "La formation se déroule sur 2 jours consécutifs (14 heures) dans notre centre de Montrouge. Elle alterne cours théoriques et ateliers pratiques. L'attestation est remise en fin de deuxième journée." },
      { question: "La formation continue VTC est-elle finançable ?", answer: "La formation continue à 170€ n'est pas éligible au CPF. Cependant, son tarif accessible permet un financement personnel simple. Pour les auto-entrepreneurs, cette charge est déductible de votre chiffre d'affaires." },
      { question: "Quels documents apporter le jour de la formation ?", answer: "Vous devez présenter votre carte professionnelle VTC en cours de validité, une pièce d'identité (carte nationale d'identité ou passeport) et un justificatif de domicile de moins de 3 mois." },
    ]}
    blogLinks={[
      { title: "Devenir chauffeur VTC en 2026", description: "Le guide complet pour obtenir votre carte professionnelle VTC.", path: "/blog/devenir-chauffeur-vtc-2026" },
      { title: "Formation continue : ce qui change", description: "Les évolutions réglementaires 2026 pour les chauffeurs T3P.", path: "/blog/formation-continue-chauffeur-t3p" },
      { title: "Financer sa formation de chauffeur", description: "Toutes les options de financement disponibles.", path: "/blog/financer-formation-chauffeur" },
    ]}
    relatedLinks={[
      { title: "Formation VTC Initiale", desc: "Obtenez votre carte professionnelle VTC — à partir de 990€", path: "/formations/vtc" },
      { title: "Formation Continue Taxi", desc: "Renouvelez votre carte Taxi — 239€", path: "/formations/continue-taxi" },
      { title: "Passerelle VTC ↔ Taxi", desc: "Doublez vos revenus avec une seconde carte", path: "/passerelle-vtc-taxi" },
      { title: "Renouvellement carte pro", desc: "Tout savoir sur le renouvellement de carte", path: "/renouvellement-carte-professionnelle" },
    ]}
  />
);

export default FormationContinueVTC;
