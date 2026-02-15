import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home, ChevronRight, RefreshCw, Check, ArrowRight,
  Phone, Calendar, Clock, Euro, Shield, FileText,
  Star, AlertTriangle, Users
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StepPreRegistrationForm from "@/components/formations/StepPreRegistrationForm";

const formations = [
  {
    title: "Formation Continue VTC",
    duration: "14h sur 2 jours",
    price: "350€",
    validity: "Tous les 5 ans",
    description: "Obligatoire pour renouveler votre carte professionnelle VTC.",
  },
  {
    title: "Formation Continue TAXI",
    duration: "14h sur 2 jours",
    price: "350€",
    validity: "Tous les 5 ans",
    description: "Obligatoire pour renouveler votre carte professionnelle Taxi.",
  },
  {
    title: "Formation Continue VMDTR",
    duration: "14h sur 2 jours",
    price: "350€",
    validity: "Tous les 5 ans",
    description: "Obligatoire pour renouveler votre carte professionnelle VMDTR.",
  },
];

const obligations = [
  "La formation continue est obligatoire tous les 5 ans (article R3120-9 du Code des transports)",
  "Sans attestation de formation continue, votre carte professionnelle ne peut pas être renouvelée",
  "Le non-renouvellement entraîne l'interdiction d'exercer votre activité de transport",
  "La demande de renouvellement doit être faite avant la date d'expiration de votre carte",
];

const steps = [
  { step: "1", title: "Vérifiez la date d'expiration", description: "Consultez votre carte professionnelle pour connaître la date limite de validité." },
  { step: "2", title: "Suivez la formation continue", description: "14h de formation sur 2 jours dans notre centre agréé à Montrouge." },
  { step: "3", title: "Recevez votre attestation", description: "Attestation de formation délivrée immédiatement à la fin du stage." },
  { step: "4", title: "Déposez votre dossier", description: "Nous vous accompagnons dans les démarches auprès de la préfecture." },
];

const faqs = [
  { question: "Quand dois-je renouveler ma carte professionnelle ?", answer: "Votre carte professionnelle doit être renouvelée tous les 5 ans. La demande de renouvellement doit être effectuée dans les 3 mois précédant la date d'expiration." },
  { question: "Que se passe-t-il si ma carte est expirée ?", answer: "Si votre carte est expirée, vous ne pouvez plus exercer légalement. Vous devrez suivre la formation continue et effectuer une nouvelle demande de carte auprès de la préfecture." },
  { question: "La formation continue est-elle la même pour VTC et Taxi ?", answer: "Non, le contenu est adapté à chaque profession. Les modules réglementaires et pratiques sont spécifiques à votre activité (VTC, Taxi ou VMDTR)." },
  { question: "Quels documents sont nécessaires pour le renouvellement ?", answer: "Vous aurez besoin de : votre carte professionnelle en cours, une attestation de formation continue, un justificatif de domicile, une photo d'identité et un extrait de casier judiciaire de moins de 3 mois." },
  { question: "Combien de temps dure la procédure de renouvellement ?", answer: "Une fois votre dossier complet déposé, le délai de traitement est généralement de 2 à 4 semaines selon la préfecture." },
];

const RenouvellementCarteProfessionnelle = () => {
  const [showForm, setShowForm] = useState(false);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Renouvellement de carte professionnelle VTC, Taxi & VMDTR",
    description: "Formation continue obligatoire pour le renouvellement de carte professionnelle VTC, Taxi et VMDTR à Montrouge (92).",
    provider: { "@type": "EducationalOrganization", name: "ECOLE T3P", url: "https://www.ecolet3p.fr" },
    offers: { "@type": "Offer", price: 350, priceCurrency: "EUR" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question", name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.ecolet3p.fr/" },
      { "@type": "ListItem", position: 2, name: "Renouvellement carte professionnelle", item: "https://www.ecolet3p.fr/renouvellement-carte-professionnelle" },
    ],
  };

  return (
    <Layout>
      <Helmet>
        <title>Renouvellement Carte Pro VTC Taxi VMDTR | ECOLE T3P</title>
        <meta name="description" content="Renouvellement de carte professionnelle VTC, Taxi et VMDTR à Montrouge (92). Formation continue obligatoire 14h. Attestation immédiate. 350€." />
        <link rel="canonical" href="https://www.ecolet3p.fr/renouvellement-carte-professionnelle" />
        <meta property="og:title" content="Renouvellement Carte Pro VTC Taxi VMDTR | ECOLE T3P" />
        <meta property="og:description" content="Formation continue obligatoire pour renouveler votre carte professionnelle. 14h sur 2 jours à Montrouge." />
        <meta property="og:url" content="https://www.ecolet3p.fr/renouvellement-carte-professionnelle" />
        <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-muted py-3 border-b border-border mt-16">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" /> Accueil
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Renouvellement carte professionnelle</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 lg:py-20 bg-primary">
        <div className="container-custom">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-white/15 text-white border border-white/20 mb-6"
            >
              <AlertTriangle className="w-4 h-4" />
              Obligation légale tous les 5 ans
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[24px] md:text-[34px] lg:text-[44px] font-bold text-white leading-tight mb-4"
            >
              Renouvellement de carte professionnelle<br />
              <span className="text-accent">VTC, TAXI & VMDTR — Montrouge (92)</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-base md:text-lg mb-8 max-w-2xl"
            >
              Formation continue obligatoire de 14h pour renouveler votre carte professionnelle. 
              Attestation délivrée immédiatement. Sessions toutes les semaines.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={() => setShowForm(true)}
                className="btn-cta-orange px-8 py-4 text-base font-bold rounded-lg inline-flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" /> Je renouvelle ma carte
              </button>
              <a
                href="tel:0188750555"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white hover:text-primary transition-all"
              >
                <Phone className="w-5 h-5" /> 01 88 75 05 55
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reassurance */}
      <section className="bg-muted py-6 border-b border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Calendar, value: "Depuis 2014", label: "+10 ans" },
              { icon: Users, value: "+2 000", label: "Chauffeurs" },
              { icon: Clock, value: "14h", label: "sur 2 jours" },
              { icon: Star, value: "5.0/5", label: "359 avis" },
            ].map((s) => (
              <div key={s.value} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="stat-number text-lg leading-tight">{s.value}</span>
                  <span className="block text-xs text-muted-foreground">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Obligation légale */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-center mb-4">Pourquoi renouveler votre carte ?</h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              La loi impose aux chauffeurs VTC, Taxi et VMDTR de suivre une formation continue 
              tous les 5 ans pour maintenir leur carte professionnelle en vigueur.
            </p>
            <div className="space-y-4">
              {obligations.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border"
                >
                  <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4 text-destructive" />
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs & durées */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">Tarifs et durées par formation</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {formations.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-t3p text-center"
              >
                <h3 className="text-lg font-bold text-primary mb-3">{f.title}</h3>
                <p className="text-3xl font-bold text-accent mb-2">{f.price}</p>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p className="flex items-center justify-center gap-2"><Clock className="w-4 h-4" /> {f.duration}</p>
                  <p className="flex items-center justify-center gap-2"><Calendar className="w-4 h-4" /> {f.validity}</p>
                </div>
                <p className="text-xs text-muted-foreground">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Étapes */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">Comment renouveler votre carte</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {s.step}
                </div>
                <h3 className="font-bold text-foreground mb-2 text-sm">{s.title}</h3>
                <p className="text-xs text-muted-foreground">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">Questions fréquentes</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 border border-border"
              >
                <h3 className="font-bold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="section-title text-center mb-8">Complétez votre parcours</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { title: "Passerelle VTC ↔ Taxi", desc: "Obtenez une double carte professionnelle.", path: "/passerelle-vtc-taxi" },
              { title: "Formation Accessibilité PMR", desc: "Maîtrisez l'accueil des personnes à mobilité réduite.", path: "/formation-accessibilite-pmr" },
              { title: "Formations initiales", desc: "Taxi, VTC ou VMDTR — dès 990€ tout compris.", path: "/formations" },
            ].map((link, i) => (
              <Link key={i} to={link.path} className="card-t3p group">
                <h3 className="text-sm font-semibold text-primary mb-1 group-hover:text-accent transition-colors">{link.title}</h3>
                <p className="text-xs text-muted-foreground">{link.desc}</p>
                <span className="text-xs font-semibold text-accent mt-2 inline-flex items-center gap-1">
                  Découvrir <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-primary">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ne risquez pas l'interdiction d'exercer
          </h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            Renouvelez votre carte professionnelle dès maintenant. Formation continue de 14h sur 2 jours — 350€.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowForm(true)}
              className="btn-cta-orange px-8 py-4 font-bold rounded-lg inline-flex items-center gap-2"
            >
              Je renouvelle ma carte <ArrowRight className="w-5 h-5" />
            </button>
            <a href="tel:0188750555" className="text-white/80 hover:text-white font-semibold inline-flex items-center gap-2">
              <Phone className="w-5 h-5" /> 01 88 75 05 55
            </a>
          </div>
        </div>
      </section>

      {/* Pre-Registration Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Inscription — Renouvellement carte professionnelle</DialogTitle>
          </DialogHeader>
          <StepPreRegistrationForm
            isOpen={showForm}
            onClose={() => setShowForm(false)}
            defaultFormation="Formation Continue"
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default RenouvellementCarteProfessionnelle;
