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

const passerelleDirections = [
  "TAXI → VTC",
  "VTC → TAXI",
  "VTC → VMDTR",
  "TAXI → VMDTR",
  "VMDTR → VTC",
  "VMDTR → TAXI",
  "VMDTR → VMDTR",
];

const advantages = [
  "Condition : moins de 3 ans depuis l'obtention de vos résultats d'examen T3P",
  "Préparation aux 2 modules spécifiques de la profession visée",
  "Présentation à l'examen de conduite avec 2h de conduite incluses",
  "Frais d'examen de 165€ inclus dans le tarif",
  "Attestation délivrée immédiatement en fin de formation",
  "Paiement en 4× sans frais via Alma",
];

const faqs = [
  { question: "Quelle est la différence entre passerelle et formation initiale ?", answer: "La passerelle est une formation réservée aux titulaires d'un résultat d'examen T3P de moins de 3 ans. Elle permet de passer d'une profession à une autre (VTC, Taxi ou VMDTR) à 665€ tout compris, contre 990€ pour une formation initiale." },
  { question: "Que comprend le tarif de 665€ ?", answer: "Le tarif inclut la préparation aux 2 modules spécifiques de la profession visée, 2 heures de conduite pour la présentation à l'examen pratique, et les frais d'examen de 165€. Paiement en 4× 167€ sans frais via Alma." },
  { question: "Quelles passerelles sont possibles ?", answer: "Toutes les directions sont possibles : Taxi vers VTC, VTC vers Taxi, VTC vers VMDTR, Taxi vers VMDTR, VMDTR vers VTC, VMDTR vers Taxi. La condition est d'avoir obtenu vos résultats d'examen T3P depuis moins de 3 ans." },
  { question: "Quels documents dois-je fournir ?", answer: "Vos résultats d'examen T3P datant de moins de 3 ans, une pièce d'identité, un justificatif de domicile et une photo d'identité. Nous vous accompagnons pour le reste." },
];

const PasserelleVtcTaxi = () => {
  const [showForm, setShowForm] = useState(false);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Formation Passerelle VTC ↔ Taxi & VMDTR",
    description: "Formation passerelle pour chauffeurs VTC, Taxi et VMDTR. Obtenez une double carte professionnelle à Montrouge (92).",
    provider: { "@type": "EducationalOrganization", name: "ECOLE T3P", url: "https://www.ecolet3p.fr" },
    offers: { "@type": "Offer", price: 665, priceCurrency: "EUR" },
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
        <title>Passerelle VTC Taxi VMDTR — 665€ tout compris | ECOLE T3P Montrouge</title>
        <meta name="description" content="Formation passerelle VTC ↔ Taxi ↔ VMDTR à Montrouge (92). 665€ tout compris incluant frais d'examen. Paiement 4× sans frais." />
        <link rel="canonical" href="https://www.ecolet3p.fr/passerelle-vtc-taxi" />
        <meta property="og:title" content="Passerelle VTC Taxi VMDTR — 665€ tout compris | ECOLE T3P" />
        <meta property="og:description" content="Formation passerelle pour obtenir une double carte professionnelle VTC, Taxi ou VMDTR. 665€ tout compris." />
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
              Vous êtes déjà chauffeur ? Obtenez une seconde carte professionnelle grâce à notre formation passerelle. 665€ tout compris, paiement en 4× sans frais.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Euro className="w-4 h-4" /> 665€ tout compris
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Clock className="w-4 h-4" /> Frais d'examen inclus
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

      {/* Tarif passerelle unique */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="section-title text-center mb-4">La Passerelle T3P</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Une seule formation pour passer d'une profession T3P à une autre. Condition : moins de 3 ans depuis l'obtention de vos résultats d'examen.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-t3p max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-secondary text-primary mb-4">
              <ArrowLeftRight className="w-3.5 h-3.5" />
              Toutes directions
            </div>

            <h3 className="text-lg font-bold text-primary mb-2">Passerelle VTC ↔ TAXI ↔ VMDTR</h3>

            <div className="flex flex-wrap justify-center gap-2 mb-5">
              {passerelleDirections.map((d) => (
                <span key={d} className="text-xs font-medium bg-muted px-3 py-1 rounded-full text-foreground">{d}</span>
              ))}
            </div>

            <p className="text-4xl font-bold text-accent mb-1">665€</p>
            <p className="text-sm font-semibold text-accent mb-1">tout compris</p>
            <div className="flex items-center justify-center gap-1.5 mb-5">
              <span className="text-sm font-semibold text-accent">ou 4× 167€/mois</span>
              <AlmaLogo className="h-4" />
            </div>

            <div className="text-left max-w-md mx-auto space-y-2 mb-6">
              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                Préparation aux 2 modules spécifiques (Taxi, VTC ou VMDTR)
              </p>
              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                Présentation à la conduite avec 2h de conduite incluses
              </p>
              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                Frais d'examen de 165€ inclus
              </p>
              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                Condition : résultats d'examen T3P de moins de 3 ans
              </p>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="btn-cta-orange w-full px-6 py-4 text-base font-bold rounded-lg inline-flex items-center justify-center gap-2"
            >
              Je m'inscris <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
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
            Obtenez une seconde carte professionnelle grâce à la formation passerelle. 665€ tout compris, paiement en 4× sans frais.
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
