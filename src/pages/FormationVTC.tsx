import { Car, Users, FileText, CheckCircle, Target, Smartphone } from "lucide-react";
import FormationPageTemplate from "@/components/formations/FormationPageTemplate";
import heroImageVTC from "@/assets/formations/hero-vtc.jpg";
import heroImageVTCWebp from "@/assets/formations/hero-vtc.jpg?w=640;1024;1920&format=webp&as=srcset";

const FormationVTC = () => (
  <FormationPageTemplate
    title="Formation VTC Montrouge (92) — 94% Réussite | 990€"
    description="Formation VTC agréée Préfecture à Montrouge (92). 94% de réussite, à partir de 990€ en 4x sans frais. Uber, Bolt, Heetch."
    canonical="https://ecolet3p.fr/formations/vtc"
    ogTitle="Formation VTC Initiale à Montrouge — ECOLE T3P"
    ogDescription="Formation initiale VTC à Montrouge. 94% de réussite, 990€ en 4x sans frais."
    heroImage={heroImageVTC}
    heroImageWebp={heroImageVTCWebp}
    badge="Formation VTC"
    badgeIcon={Car}
    heading="Formation VTC Initiale à Montrouge — à partir de 990€"
    subheading="Devenez chauffeur VTC et travaillez avec Uber, Bolt, Heetch. Formation complète incluant gestion d'entreprise et relation client premium."
    duration="Journée, Soir ou E-learning"
    price={990}
    thirdTag={{ icon: Smartphone, label: "Multi-apps" }}
    category="vtc"
    profession="vtc"
    includes={[
      "Frais d'examen T3P (241€) inclus",
      "2 heures de conduite incluses",
      "Véhicule mis à disposition le jour de l'examen",
      "Accompagnement personnalisé",
      "Accès aux ressources pédagogiques",
      "Aide à la création d'entreprise",
    ]}
    ctaTitle="Prêt à devenir chauffeur VTC ? Réserver ma place"
    crossSellLinks={[
      { title: "Location véhicule examen VTC", desc: "Véhicule conforme + 2h de conduite dès 189€", path: "/services/location-vehicule-examen" },
      { title: "Accompagnement gestion d'activité VTC", desc: "Apprenez à gérer votre entreprise de transport", path: "/accompagnement-gestion-activite" },
      { title: "Passerelle VTC → Taxi", desc: "Obtenez votre double carte professionnelle en 14h — 665€", path: "/passerelle-vtc-taxi" },
    ]}
    blogLinks={[
      { title: "Comment devenir chauffeur VTC en 2026 : le guide complet", desc: "Étapes, prérequis, financement et conseils pour réussir", path: "/blog/comment-devenir-chauffeur-vtc-2026" },
      { title: "Quel statut juridique choisir : micro-entreprise ou SASU ?", desc: "Comparaison fiscale et sociale pour les chauffeurs T3P", path: "/blog/quel-statut-juridique-chauffeur-vtc-taxi-2026" },
      { title: "Carte professionnelle VTC : obtention et renouvellement", desc: "Tout savoir sur la carte pro VTC et ses démarches", path: "/blog/carte-professionnelle-vtc" },
    ]}
    premiumPrice={1190}
    premiumLabel="PREMIUM"
    premiumFeatures={[
      "Tout le pack Essentiel",
      "Aide à la création d'entreprise",
      "Coaching individuel personnalisé",
      "Suivi post-formation 3 mois",
    ]}
    essentielFeatures={[
      "Formation complète VTC",
      "Préparation intensive examen CMA",
      "Support pédagogique",
      "Accès aux quiz en ligne",
    ]}
    programModules={[
      { title: "Réglementation VTC", duration: "12h", topics: ["Loi Grandguillaume", "Statut VTC", "Droits et obligations", "LOTI et capacité"] },
      { title: "Gestion d'entreprise", duration: "10h", topics: ["Micro-entreprise vs SASU", "Comptabilité simplifiée", "TVA et fiscalité", "Protection sociale"] },
      { title: "Sécurité routière", duration: "8h", topics: ["Conduite préventive", "Gestion du stress", "Premiers secours", "Éco-conduite"] },
      { title: "Relation client premium", duration: "8h", topics: ["Accueil haut de gamme", "Gestion des réclamations", "Discrétion professionnelle", "Fidélisation"] },
      { title: "Applications et plateformes", duration: "6h", topics: ["Uber, Bolt, Heetch", "Optimisation des courses", "Gestion multi-apps", "Notation et avis"] },
      { title: "Anglais professionnel", duration: "6h", topics: ["Vocabulaire transport", "Accueil clients étrangers", "Communication basique", "Expressions courantes"] },
    ]}
    prerequisites={[
      { icon: Users, text: "Avoir 21 ans minimum" },
      { icon: FileText, text: "Permis B valide depuis au moins 3 ans" },
      { icon: CheckCircle, text: "Casier judiciaire vierge (bulletin n°2)" },
      { icon: Target, text: "Aptitude médicale (visite médicale préfectorale)" },
    ]}
    testimonials={[
      { name: "Alexandre M.", role: "Chauffeur VTC Premium", content: "Formation au top ! J'ai particulièrement apprécié les cours sur la relation client haut de gamme. Aujourd'hui je travaille avec une clientèle fidèle.", rating: 5 },
      { name: "Fatima R.", role: "Auto-entrepreneuse VTC", content: "L'accompagnement pour créer mon entreprise a été précieux. Les formateurs m'ont guidée pas à pas.", rating: 5 },
      { name: "Thomas G.", role: "Chauffeur VTC indépendant", content: "Excellente formation, très complète sur les aspects juridiques et commerciaux. Le module sur les applications m'a permis d'optimiser mes revenus.", rating: 5 },
    ]}
    faqs={[
      { question: "Quelle est la différence entre taxi et VTC ?", answer: "Le taxi peut prendre des clients dans la rue (maraude) et a accès aux bornes taxi. Le VTC travaille uniquement sur réservation préalable via des applications comme Uber, Bolt ou Heetch, ou par contrat direct avec des entreprises et hôtels." },
      { question: "Combien peut gagner un chauffeur VTC en 2026 ?", answer: "Un chauffeur VTC à temps plein en Île-de-France peut générer entre 3 000€ et 6 000€ de chiffre d'affaires mensuel brut. Le revenu net dépend du statut juridique choisi (micro-entreprise : environ 70% du CA, SASU : variable selon les charges). Les chauffeurs multi-apps optimisent leurs revenus en combinant Uber, Bolt et Heetch." },
      { question: "Faut-il avoir son propre véhicule pour exercer en VTC ?", answer: "Non. Plusieurs options existent : la location longue durée (LLD) à partir de 800€/mois, la location avec option d'achat (LOA), le travail comme salarié d'une société VTC, ou l'achat d'un véhicule conforme aux normes VTC (moins de 6 ans, 4 portes minimum)." },
      { question: "Combien de temps dure la formation VTC à ECOLE T3P ?", answer: "Trois formats sont proposés au même tarif de 990€ : en journée (1 semaine, 9h30-16h30), en soirée (2 semaines, 18h-21h30) pour ceux qui travaillent, ou en e-learning (accès illimité jusqu'à l'examen). Les trois formats préparent au même examen T3P organisé par la CMA." },
      { question: "Puis-je travailler pour Uber après la formation ?", answer: "Oui, dès l'obtention de votre carte professionnelle VTC délivrée par la Préfecture. Vous pouvez vous inscrire sur toutes les plateformes : Uber, Bolt, Heetch, Marcel, Kapten, etc. Notre module 'Applications et plateformes' vous prépare spécifiquement à optimiser vos revenus sur ces applications." },
      { question: "Comment se déroule l'examen VTC à la CMA ?", answer: "L'examen T3P se compose de 7 épreuves écrites sous forme de QCM : réglementation des transports (T3P), gestion d'entreprise, sécurité routière, français, anglais, développement commercial et réglementation locale. Il faut obtenir une moyenne générale de 10/20 avec aucune note éliminatoire en dessous de 6/20. L'examen a lieu à la Chambre de Métiers et de l'Artisanat (CMA)." },
      { question: "Quels sont les documents nécessaires pour s'inscrire à la formation VTC ?", answer: "Pour vous inscrire, vous aurez besoin de : une pièce d'identité valide, votre permis B (3 ans d'ancienneté minimum), un justificatif de domicile, une photo d'identité et une attestation de visite médicale préfectorale. Notre équipe administrative vous accompagne dans la constitution de votre dossier." },
      { question: "La formation VTC est-elle éligible au CPF ?", answer: "La formation VTC initiale n'est pas éligible au CPF. Cependant, ECOLE T3P propose le paiement en 4 fois sans frais via Alma (247,50€/mois) et des facilités de paiement personnalisées. Le tarif de 990€ inclut déjà les frais d'examen (241€), les 2 heures de conduite et le véhicule pour l'examen." },
      { question: "Quel statut juridique choisir pour exercer en VTC ?", answer: "Les deux principaux statuts sont la micro-entreprise (simple, charges réduites à 22%, plafond CA 77 700€) et la SASU (plus complexe mais récupération TVA, dividendes possibles). En début d'activité, la micro-entreprise est souvent recommandée. Notre module Gestion d'entreprise compare ces deux statuts en détail." },
    ]}
    seoContent={[
      { title: "Devenir chauffeur VTC en 2026 : un métier en pleine croissance", text: "Le métier de chauffeur VTC (Voiture de Transport avec Chauffeur) connaît une croissance soutenue en Île-de-France, portée par la demande des plateformes Uber, Bolt et Heetch. En 2026, la profession compte plus de 50 000 chauffeurs actifs en France, dont plus de 30 000 en région parisienne. ECOLE T3P, centre de formation VTC agréé par la Préfecture des Hauts-de-Seine situé au 3 rue Corneille à Montrouge (92120), forme les futurs chauffeurs VTC depuis 2014 avec un taux de réussite de 94% et plus de 2 000 professionnels accompagnés. Notre centre de formation VTC est la référence dans le 92 (Hauts-de-Seine) et le 94 (Val-de-Marne)." },
      { title: "Le cadre réglementaire de la profession VTC", text: "L'activité de chauffeur VTC est strictement encadrée par la loi Thévenoud de 2014 et la loi Grandguillaume de 2016. Pour exercer légalement, tout chauffeur VTC doit être titulaire d'une carte professionnelle VTC délivrée par la Préfecture après réussite à l'examen VTC (examen T3P) organisé par la Chambre de Métiers et de l'Artisanat (CMA). La carte professionnelle VTC est valable 5 ans et doit être renouvelée par une formation continue de 14 heures. Le chauffeur VTC ne peut prendre de clients qu'en réservation préalable (pas de maraude ni de borne), ce qui le distingue du taxi." },
      { title: "Préparation examen VTC : programme complet ECOLE T3P", text: "Notre préparation examen VTC couvre l'ensemble des 7 matières de l'examen T3P organisé par la CMA en Île-de-France : réglementation du transport public particulier de personnes, gestion d'entreprise, sécurité routière, langue française, langue anglaise, développement commercial et réglementation locale. Le programme inclut également des mises en situation pratiques, 2 heures de conduite avec un moniteur diplômé d'État et la mise à disposition du véhicule le jour de l'examen. Nos formateurs, tous issus du métier, vous transmettent leur expertise terrain en plus des connaissances théoriques." },
      { title: "Revenus et perspectives d'un chauffeur VTC en Île-de-France", text: "Un chauffeur VTC débutant en Île-de-France peut espérer un chiffre d'affaires mensuel de 3 000€ à 4 500€. Avec l'expérience et l'optimisation multi-plateformes (combinaison Uber + Bolt + Heetch), les chauffeurs confirmés atteignent régulièrement 5 000€ à 6 000€ de CA mensuel. Les charges varient selon le statut : en micro-entreprise, comptez environ 22% de cotisations sociales. Les postes de dépenses principaux sont la location du véhicule (800€-1 200€/mois), le carburant ou la recharge électrique, et l'assurance professionnelle." },
      { title: "Formation VTC agréée Préfecture : centre Montrouge (92)", text: "ECOLE T3P est un centre de formation VTC agréé par la Préfecture des Hauts-de-Seine (agrément n° 23/007). Notre formation VTC est disponible en formule Essentiel à 990€ ou Premium à 1 190€ (avec coaching et suivi post-formation). Les deux formules incluent les frais d'examen CMA (241€), 2 heures de conduite, le véhicule mis à disposition pour l'examen et l'accompagnement administratif pour la création de votre entreprise. Avec 359 avis Google à 5 étoiles et un taux de réussite de 94%, nous sommes le centre de formation VTC de référence dans les Hauts-de-Seine (92). Le paiement en 4 fois sans frais via Alma rend notre formation VTC accessible à tous les budgets." },
      { title: "Les étapes pour obtenir votre carte professionnelle VTC", text: "Le parcours pour devenir chauffeur VTC suit 5 étapes clés : 1) Vérifier les prérequis (21 ans, permis B 3 ans, casier vierge, visite médicale). 2) S'inscrire à la formation VTC chez ECOLE T3P (990€, 3 formats disponibles). 3) Réussir l'examen VTC à la CMA (7 épreuves QCM). 4) Déposer le dossier de carte professionnelle VTC à la Préfecture (délai : 2 à 4 semaines). 5) Créer votre entreprise (micro-entreprise ou SASU) et vous inscrire au registre VTC. Notre équipe vous accompagne à chaque étape, de l'inscription jusqu'à votre première course." },
      { title: "Formation VTC e-learning : apprenez à votre rythme", text: "Notre formation VTC est disponible en 3 formats au même tarif de 990€ : en journée (1 semaine intensive), en soirée (2 semaines) ou en e-learning avec accès illimité à la plateforme jusqu'à l'examen. Le format e-learning est particulièrement adapté aux candidats qui travaillent en parallèle ou qui résident loin de notre centre. Vous bénéficiez d'un suivi personnalisé avec vos formateurs et d'un accès à des centaines de QCM d'entraînement actualisés pour maximiser vos chances de réussite à l'examen VTC en Île-de-France." },
      { title: "Formation VTC accessible depuis Paris sud, le 92 et le 94", text: "Situé à Montrouge, au carrefour de Paris sud et des Hauts-de-Seine (92), notre centre de formation VTC est facilement accessible depuis le 92 (Bagneux, Malakoff, Châtillon, Vanves, Boulogne-Billancourt, Nanterre, Colombes) et le 94 (Créteil, Ivry-sur-Seine, Vitry-sur-Seine, Villejuif, Arcueil). Le métro ligne 4 (station Mairie de Montrouge) est à 2 minutes à pied. Que vous cherchiez une formation VTC dans le 92 ou une formation VTC dans le 94, ECOLE T3P est le centre de formation chauffeur professionnel le plus accessible de tout le sud de Paris." },
    ]}
    relatedLinks={[
      { title: "Formation Taxi initiale à Montrouge", desc: "Obtenez votre carte professionnelle Taxi — à partir de 990€", path: "/formations/taxi" },
      { title: "Formation VMDTR moto-taxi", desc: "Devenez conducteur moto-taxi professionnel", path: "/formations/vmdtr" },
      { title: "Passerelle VTC ↔ Taxi", desc: "Double carte professionnelle en 14h — 665€", path: "/passerelle-vtc-taxi" },
      { title: "Renouvellement carte professionnelle VTC", desc: "Formation continue obligatoire tous les 5 ans", path: "/renouvellement-carte-professionnelle" },
    ]}
  />
);

export default FormationVTC;
