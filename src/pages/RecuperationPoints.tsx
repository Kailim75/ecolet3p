import { Helmet } from "react-helmet-async";
import TrustBar from "@/components/home/TrustBar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Clock, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Calendar,
  MapPin,
  CreditCard,
  Star,
  FileText,
  AlertTriangle,
  Award
} from "lucide-react";
import { useQuoteModal } from "@/components/quote/QuoteRequestModal";
import UpcomingSessionsCard from "@/components/formations/UpcomingSessionsCard";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const benefits = [
  {
    icon: Shield,
    title: "Récupérez jusqu'à 4 points",
    description: "Un stage de 2 jours vous permet de récupérer jusqu'à 4 points sur votre permis."
  },
  {
    icon: Clock,
    title: "Stage en 2 jours",
    description: "Formation intensive de 14 heures réparties sur 2 jours consécutifs."
  },
  {
    icon: Award,
    title: "Attestation immédiate",
    description: "Recevez votre attestation dès la fin du stage pour vos démarches."
  },
  {
    icon: CreditCard,
    title: "Paiement flexible",
    description: "Possibilité de paiement en plusieurs fois sans frais."
  }
];

const process = [
  {
    step: "1",
    title: "Inscrivez-vous en ligne",
    description: "Choisissez votre date de stage et complétez votre inscription en quelques clics."
  },
  {
    step: "2",
    title: "Participez au stage",
    description: "2 jours de formation avec des formateurs agréés et expérimentés."
  },
  {
    step: "3",
    title: "Récupérez vos points",
    description: "Vos points sont crédités dans les jours suivant le stage."
  }
];

const faqItems = [
  {
    question: "Combien de points puis-je récupérer ?",
    answer: "Le stage permet de récupérer jusqu'à 4 points, dans la limite du plafond de 12 points (ou 6 pour les permis probatoires)."
  },
  {
    question: "Combien de temps dure le stage ?",
    answer: "Le stage dure 2 jours consécutifs (14 heures au total), généralement de 8h30 à 17h30 avec une pause déjeuner."
  },
  {
    question: "Puis-je faire un stage si j'ai reçu un courrier 48SI ?",
    answer: "Non, le stage volontaire n'est plus possible après réception d'une lettre 48SI (invalidation du permis). Consultez-nous pour connaître vos options."
  },
  {
    question: "Quand mes points seront-ils crédités ?",
    answer: "Les points sont crédités le lendemain du dernier jour de stage, après transmission de l'attestation à la préfecture."
  },
  {
    question: "Combien de stages puis-je faire par an ?",
    answer: "Vous pouvez effectuer un stage de récupération de points tous les ans (délai d'un an entre deux stages)."
  }
];

const RecuperationPoints = () => {
  const { openQuoteModal } = useQuoteModal();

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Stage de Récupération de Points",
    "description": "Stage de sensibilisation à la sécurité routière pour récupérer jusqu'à 4 points sur votre permis de conduire. Formation agréée de 2 jours.",
    "provider": {
      "@type": "Organization",
      "name": "ECOLE T3P",
      "sameAs": "https://www.ecolet3p.fr"
    },
    "coursePrerequisites": "Permis de conduire en cours de validité",
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "onsite",
      "duration": "P2D",
      "location": {
        "@type": "Place",
        "name": "ECOLE T3P Montrouge",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "3 rue Corneille",
          "addressLocality": "Montrouge",
          "postalCode": "92120",
          "addressCountry": "FR"
        }
      }
    },
    "offers": {
      "@type": "Offer",
      "category": "Stage de récupération de points",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(f => ({
      "@type": "Question", name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <Layout>
      <Helmet>
        <title>Stage Récupération de Points 2 jours | ECOLE T3P</title>
        <meta 
          name="description" 
          content="Stage de récupération de points en 2 jours (14h) à Montrouge. Récupérez jusqu'à 4 points sur votre permis. Sessions régulières. Inscription rapide." 
        />
        <meta 
          name="keywords" 
          content="stage récupération points, récupérer points permis, stage sensibilisation sécurité routière, stage permis Montrouge, stage points 92" 
        />
        <link rel="canonical" href="https://www.ecolet3p.fr/stage-recuperation-points" />
        
        <meta property="og:title" content="Stage Récupération de Points — 2 jours | ECOLE T3P Montrouge" />
        <meta property="og:description" content="Stage de récupération de points en 2 jours à Montrouge. Récupérez jusqu'à 4 points. Sessions régulières, inscription rapide." />
        <meta property="og:url" content="https://www.ecolet3p.fr/stage-recuperation-points" />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.ecolet3p.fr/" },
            { "@type": "ListItem", "position": 2, "name": "Formations", "item": "https://www.ecolet3p.fr/formations" },
            { "@type": "ListItem", "position": 3, "name": "Récupération de Points", "item": "https://www.ecolet3p.fr/stage-recuperation-points" }
          ]
        })}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center hero-bg overflow-hidden pt-24 pb-16">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <a href="/" className="hover:text-forest transition-colors">Accueil</a>
              <span>/</span>
              <a href="/formations" className="hover:text-forest transition-colors">Formations</a>
              <span>/</span>
              <span className="text-forest font-medium">Récupération de Points</span>
            </nav>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-destructive/10 text-destructive border border-destructive/20">
                <AlertTriangle className="w-4 h-4" />
                Récupérez vos points rapidement
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-forest leading-tight mb-6"
            >
              Stage de Récupération de Points<br />
              <span className="text-gold">de Permis à Montrouge</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground mb-8 max-w-2xl"
            >
              Récupérez jusqu'à 4 points sur votre permis en seulement 2 jours. 
              Stage agréé par la préfecture, attestation délivrée immédiatement.
            </motion.p>

            {/* Key info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6 mb-8"
            >
              {[
                { icon: Clock, text: "2 jours (14h)" },
                { icon: MapPin, text: "Montrouge (92)" },
                { icon: CreditCard, text: "250 €" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-forest">
                  <item.icon className="w-5 h-5 text-gold" />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                onClick={() => openQuoteModal("recup-points")}
                className="btn-accent"
              >
                <FileText className="w-5 h-5 mr-2" />
                Je réserve mon stage
              </Button>
              <Button asChild className="btn-secondary">
                <a href="tel:0188750555">
                  <Calendar className="w-5 h-5 mr-2" />
                  Appeler maintenant
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Benefits Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title mb-4">Pourquoi choisir notre stage ?</h2>
            <p className="section-subtitle mx-auto">
              Un stage efficace pour préserver votre permis de conduire
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-livementor text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-forest/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-forest" />
                </div>
                <h3 className="text-lg font-bold text-forest mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding gradient-warm">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title mb-4">Comment ça marche ?</h2>
            <p className="section-subtitle mx-auto">
              Un processus simple en 3 étapes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="step-number mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold text-forest mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-0.5 bg-forest/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Public cible */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title mb-6">Ce stage est fait pour vous si...</h2>
              <ul className="space-y-4">
                {[
                  "Vous avez perdu des points suite à une infraction",
                  "Vous souhaitez anticiper avant d'atteindre zéro point",
                  "Vous êtes en permis probatoire et avez commis une infraction",
                  "Vous voulez sécuriser votre permis pour votre activité professionnelle"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <UpcomingSessionsCard
              sessions={[]}
              onRegister={() => openQuoteModal("recup-points")}
              fallbackSessions={[
                { id: "rp1", label: "14 mars 2026", time: "9h00 – 17h00", spots: 15 },
                { id: "rp2", label: "11 avril 2026", time: "9h00 – 17h00", spots: 10 },
                { id: "rp3", label: "9 mai 2026", time: "9h00 – 17h00", spots: 0 },
              ]}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding gradient-warm">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title mb-4">Questions fréquentes</h2>
            <p className="section-subtitle mx-auto">
              Tout ce que vous devez savoir sur le stage
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 border border-border"
              >
                <h3 className="font-bold text-forest mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contenu unique */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="section-title mb-6">Comment fonctionne le stage de récupération de points</h2>
            <p className="text-muted-foreground mb-4">
              Le stage de sensibilisation à la sécurité routière, communément appelé « stage de récupération de points », 
              est une formation de 14 heures réparties sur 2 jours consécutifs. Il permet de récupérer jusqu'à 4 points 
              sur votre permis de conduire, dans la limite du plafond de 12 points (ou 6 pour les permis probatoires). 
              Les points sont crédités dès le lendemain du dernier jour de stage, après transmission de l'attestation 
              à la préfecture par notre centre.
            </p>

            <h2 className="section-title mb-6 mt-12">Déroulement du stage</h2>
            <p className="text-muted-foreground mb-4">
              Le premier jour est consacré à l'analyse des comportements à risque, à la compréhension des facteurs 
              d'accidents et à l'impact de la vitesse, de l'alcool et des distractions sur la conduite. Le second jour 
              aborde les aspects psychologiques de la conduite, la perception des risques et les stratégies pour adopter 
              une conduite plus sûre. Les intervenants sont des formateurs agréés, spécialistes de la sécurité routière 
              et de la psychologie du conducteur.
            </p>

            <h2 className="section-title mb-6 mt-12">Qui peut participer au stage</h2>
            <p className="text-muted-foreground mb-4">
              Pour participer à un stage volontaire de récupération de points, vous devez remplir trois conditions : 
              disposer d'au moins 1 point restant sur votre permis, ne pas avoir effectué de stage dans les 12 derniers 
              mois, et ne pas avoir reçu de courrier 48SI (invalidation du permis). Si votre solde est à zéro ou si 
              vous avez reçu une lettre d'invalidation, le stage volontaire n'est plus possible et d'autres démarches 
              s'appliquent.
            </p>
          </div>
        </div>
      </section>

      {/* Liens internes */}
      <section className="py-12 bg-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-forest mb-6 text-center">Découvrez nos formations initiales</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/formations/vtc" className="p-4 bg-card rounded-lg border hover:border-gold transition-colors">
                <h3 className="font-semibold text-forest mb-1">Formation VTC</h3>
                <p className="text-sm text-muted-foreground">Devenez chauffeur VTC — dès 990€ tout compris</p>
              </Link>
              <Link to="/formations/taxi" className="p-4 bg-card rounded-lg border hover:border-gold transition-colors">
                <h3 className="font-semibold text-forest mb-1">Formation Taxi</h3>
                <p className="text-sm text-muted-foreground">Obtenez votre carte professionnelle Taxi — dès 990€</p>
              </Link>
              <Link to="/formations/vmdtr" className="p-4 bg-card rounded-lg border hover:border-gold transition-colors">
                <h3 className="font-semibold text-forest mb-1">Formation VMDTR</h3>
                <p className="text-sm text-muted-foreground">Devenez chauffeur moto — dès 990€</p>
              </Link>
              <Link to="/renouvellement-carte-professionnelle" className="p-4 bg-card rounded-lg border hover:border-gold transition-colors">
                <h3 className="font-semibold text-forest mb-1">Renouvellement carte pro</h3>
                <p className="text-sm text-muted-foreground">Formation continue obligatoire — 350€</p>
              </Link>
              <Link to="/contact" className="p-4 bg-card rounded-lg border hover:border-gold transition-colors">
                <h3 className="font-semibold text-forest mb-1">Contact</h3>
                <p className="text-sm text-muted-foreground">Réservez votre place au prochain stage</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-forest">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-cream mb-4">
              Préservez votre permis dès maintenant
            </h2>
            <p className="text-cream/80 text-lg mb-8 max-w-2xl mx-auto">
              N'attendez pas de perdre votre permis. Inscrivez-vous à notre prochain stage 
              et récupérez jusqu'à 4 points rapidement.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => openQuoteModal("recup-points")}
                className="btn-accent"
              >
                <FileText className="w-5 h-5 mr-2" />
                Je réserve mon stage
              </Button>
              <Button asChild variant="outline" className="border-cream text-cream hover:bg-cream hover:text-forest">
                <a href="tel:0188750555">
                  01 88 75 05 55
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default RecuperationPoints;
