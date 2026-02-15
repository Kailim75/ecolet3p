import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home, ChevronRight, ArrowLeftRight, Check, ArrowRight,
  Phone, Clock, Euro, Star, Users, Calendar, GraduationCap
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StepPreRegistrationForm from "@/components/formations/StepPreRegistrationForm";
import AlmaLogo from "@/components/logo/AlmaLogo";

const passerelles = [
  {
    title: "Passerelle TAXI → VTC",
    duration: "14h (2 jours)",
    price: 490,
    description: "Vous êtes chauffeur Taxi et souhaitez exercer en VTC. Formation accélérée de 14h.",
  },
  {
    title: "Passerelle VTC → TAXI",
    duration: "14h (2 jours)",
    price: 490,
    description: "Vous êtes chauffeur VTC et souhaitez passer Taxi. Formation accélérée de 14h.",
  },
  {
    title: "Passerelle VMDTR → VTC ou TAXI",
    duration: "35h (5 jours)",
    price: 690,
    description: "Vous êtes conducteur VMDTR et souhaitez obtenir la carte VTC ou Taxi.",
  },
];

const advantages = [
  "Durée réduite par rapport à la formation initiale complète",
  "Pas besoin de repasser l'examen CMA si déjà titulaire d'une carte",
  "Attestation délivrée immédiatement en fin de formation",
  "Accompagnement dans les démarches préfecture inclus",
  "Paiement en 4× sans frais via Alma",
  "Sessions toutes les semaines à Montrouge (92)",
];

const faqs = [
  { question: "Quelle est la différence entre passerelle et formation initiale ?", answer: "La passerelle est une formation réduite réservée aux titulaires d'une carte professionnelle active. Elle dure 14h à 35h contre 63h pour une formation initiale, car vos acquis sont reconnus." },
  { question: "Dois-je repasser l'examen CMA ?", answer: "Non, si vous êtes déjà titulaire d'une carte professionnelle valide, vous n'avez pas besoin de repasser l'examen. L'attestation de formation passerelle suffit pour obtenir votre nouvelle carte." },
  { question: "Puis-je exercer les deux activités en même temps ?", answer: "Oui, vous pouvez détenir une carte VTC et une carte Taxi simultanément. Vous devrez cependant respecter les réglementations propres à chaque activité." },
  { question: "Quels documents dois-je fournir ?", answer: "Votre carte professionnelle en cours de validité, une pièce d'identité, un justificatif de domicile et une photo d'identité. Nous vous accompagnons pour le reste." },
];

const PasserelleVtcTaxi = () => {
  const [showForm, setShowForm] = useState(false);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Formation Passerelle VTC ↔ Taxi & VMDTR",
    description: "Formation passerelle pour chauffeurs VTC, Taxi et VMDTR. Obtenez une double carte professionnelle à Montrouge (92).",
    provider: { "@type": "EducationalOrganization", name: "ECOLE T3P", url: "https://www.ecolet3p.fr" },
    offers: { "@type": "Offer", price: 490, priceCurrency: "EUR" },
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
      { "@type": "ListItem", position: 2, name: "Formations", item: "https://www.ecolet3p.fr/formations" },
      { "@type": "ListItem", position: 3, name: "Passerelle VTC ↔ Taxi", item: "https://www.ecolet3p.fr/passerelle-vtc-taxi" },
    ],
  };

  return (
    <Layout>
      <Helmet>
        <title>Passerelle VTC Taxi VMDTR — Dès 490€ | ECOLE T3P Montrouge</title>
        <meta name="description" content="Formation passerelle VTC ↔ Taxi et VMDTR à Montrouge (92). Obtenez votre double carte pro dès 490€. Paiement 4× sans frais." />
        <link rel="canonical" href="https://www.ecolet3p.fr/passerelle-vtc-taxi" />
        <meta property="og:title" content="Passerelle VTC Taxi VMDTR — Dès 490€ | ECOLE T3P" />
        <meta property="og:description" content="Formation passerelle pour obtenir une double carte professionnelle VTC, Taxi ou VMDTR." />
        <meta property="og:url" content="https://www.ecolet3p.fr/passerelle-vtc-taxi" />
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
            <Link to="/formations" className="hover:text-primary transition-colors">Formations</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Passerelle VTC ↔ Taxi</span>
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
              <ArrowLeftRight className="w-4 h-4" />
              Formation passerelle
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[24px] md:text-[34px] lg:text-[44px] font-bold text-white leading-tight mb-4"
            >
              Passerelle VTC ↔ TAXI & VMDTR<br />
              <span className="text-accent">Double carte pro — Montrouge (92)</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-base md:text-lg mb-8 max-w-2xl"
            >
              Vous êtes déjà chauffeur ? Obtenez une seconde carte professionnelle grâce à notre formation passerelle accélérée. Dès 490€, paiement en 4× sans frais.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Clock className="w-4 h-4" /> Dès 14h
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Euro className="w-4 h-4" /> À partir de 490€
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={() => setShowForm(true)}
                className="btn-cta-orange px-8 py-4 text-base font-bold rounded-lg inline-flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-5 h-5" /> Je m'inscris
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
              { icon: Users, value: "+2 000", label: "Chauffeurs formés" },
              { icon: Clock, value: "14h min", label: "Formation accélérée" },
              { icon: Star, value: "5.0/5", label: "359 avis" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
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

      {/* Tarifs passerelles */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">Choisissez votre passerelle</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {passerelles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-t3p text-center"
              >
                <h3 className="text-lg font-bold text-primary mb-3">{p.title}</h3>
                <p className="text-3xl font-bold text-accent mb-1">{p.price}€</p>
                <div className="flex items-center justify-center gap-1.5 mb-4">
                  <span className="text-sm font-semibold text-accent">ou 4× {Math.round(p.price / 4)}€/mois</span>
                  <AlmaLogo className="h-4" />
                </div>
                <div className="space-y-2 text-sm text-muted-foreground mb-5">
                  <p className="flex items-center justify-center gap-2"><Clock className="w-4 h-4" /> {p.duration}</p>
                </div>
                <p className="text-xs text-muted-foreground mb-5">{p.description}</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-cta-orange w-full px-6 py-3 font-bold rounded-lg inline-flex items-center justify-center gap-2"
                >
                  Choisir <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">Pourquoi choisir la passerelle ?</h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {advantages.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border"
              >
                <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-foreground">{a}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
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
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="section-title text-center mb-8">Découvrez aussi</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { title: "Renouvellement carte pro", desc: "Formation continue obligatoire tous les 5 ans.", path: "/renouvellement-carte-professionnelle" },
              { title: "Formation Accessibilité PMR", desc: "Maîtrisez le transport de personnes à mobilité réduite.", path: "/formation-accessibilite-pmr" },
              { title: "Formations initiales", desc: "VTC, Taxi ou VMDTR — dès 990€ tout compris.", path: "/formations" },
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
            Doublez vos opportunités
          </h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            Obtenez une seconde carte professionnelle grâce à la formation passerelle. Dès 490€, paiement en 4× sans frais.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowForm(true)}
              className="btn-cta-orange px-8 py-4 font-bold rounded-lg inline-flex items-center gap-2"
            >
              Je m'inscris <ArrowRight className="w-5 h-5" />
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
            <DialogTitle>Inscription — Passerelle VTC / Taxi / VMDTR</DialogTitle>
          </DialogHeader>
          <StepPreRegistrationForm
            isOpen={showForm}
            onClose={() => setShowForm(false)}
            defaultFormation="Formation Passerelle"
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default PasserelleVtcTaxi;
