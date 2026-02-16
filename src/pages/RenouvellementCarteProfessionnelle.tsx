import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home, ChevronRight, RefreshCw, Check, ArrowRight,
  Phone, Calendar, Clock, Euro, Shield, Star,
  AlertTriangle, Users, Award, FileCheck, Zap, HeartHandshake
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StepPreRegistrationForm from "@/components/formations/StepPreRegistrationForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const whyChooseUs = [
  { icon: Shield, title: "Centre agréé Préfecture 92", desc: "Agrément officiel — votre attestation est reconnue par toutes les préfectures d'Île-de-France." },
  { icon: Calendar, title: "Sessions chaque semaine", desc: "Pas d'attente : inscrivez-vous aujourd'hui, commencez dès la semaine prochaine." },
  { icon: FileCheck, title: "Attestation immédiate", desc: "Votre attestation de formation continue est délivrée le jour même, en fin de stage." },
  { icon: HeartHandshake, title: "Accompagnement préfecture", desc: "Nous vous guidons dans toutes les démarches de dépôt de dossier de renouvellement." },
];

const results = [
  { value: "+2 000", label: "cartes renouvelées depuis 2014" },
  { value: "100%", label: "attestations délivrées le jour même" },
  { value: "5.0/5", label: "sur 359 avis Google vérifiés" },
  { value: "48h", label: "délai moyen pour obtenir votre session" },
];

const formations = [
  { title: "Formation Continue VTC", price: "350€", validity: "Tous les 5 ans", description: "Obligatoire pour renouveler votre carte professionnelle VTC." },
  { title: "Formation Continue TAXI", price: "350€", validity: "Tous les 5 ans", description: "Obligatoire pour renouveler votre carte professionnelle Taxi." },
  { title: "Formation Continue VMDTR", price: "350€", validity: "Tous les 5 ans", description: "Obligatoire pour renouveler votre carte professionnelle VMDTR." },
];

const programSteps = [
  { step: "1", title: "Vérifiez votre date d'expiration", desc: "Consultez votre carte professionnelle. La demande doit être faite dans les 3 mois précédant l'expiration." },
  { step: "2", title: "Inscrivez-vous à la formation continue", desc: "14h de formation sur 2 jours dans notre centre agréé à Montrouge. Sessions chaque semaine." },
  { step: "3", title: "Recevez votre attestation", desc: "Attestation de formation continue délivrée immédiatement en fin de stage — le jour même." },
  { step: "4", title: "Déposez votre dossier préfecture", desc: "Nous vous accompagnons dans le montage du dossier et les démarches auprès de la préfecture." },
];

const faqs = [
  { question: "Quand dois-je renouveler ma carte professionnelle ?", answer: "Votre carte professionnelle doit être renouvelée tous les 5 ans. La demande de renouvellement doit être effectuée dans les 3 mois précédant la date d'expiration. N'attendez pas le dernier moment — inscrivez-vous dès maintenant." },
  { question: "Que se passe-t-il si ma carte est expirée ?", answer: "Si votre carte est expirée, vous ne pouvez plus exercer légalement. Vous risquez une amende et la saisie de votre véhicule. Contactez-nous immédiatement — nous pouvons vous inscrire à la prochaine session disponible." },
  { question: "La formation continue est-elle la même pour VTC et Taxi ?", answer: "Non, le contenu est adapté à chaque profession. Les modules réglementaires et pratiques sont spécifiques à votre activité (VTC, Taxi ou VMDTR). Le tarif est identique : 350€." },
  { question: "Quels documents sont nécessaires pour le renouvellement ?", answer: "Votre carte professionnelle en cours, l'attestation de formation continue (délivrée par ECOLE T3P), un justificatif de domicile, une photo d'identité et un extrait de casier judiciaire de moins de 3 mois." },
  { question: "Combien de temps dure la procédure de renouvellement ?", answer: "Une fois votre dossier complet déposé en préfecture, le délai de traitement est généralement de 2 à 4 semaines. Nous vous accompagnons pour garantir que votre dossier est complet du premier coup." },
];

const RenouvellementCarteProfessionnelle = () => {
  const [showForm, setShowForm] = useState(false);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Renouvellement de carte professionnelle VTC, Taxi & VMDTR",
    description: "Formation continue obligatoire 14h pour le renouvellement de carte professionnelle VTC, Taxi et VMDTR à Montrouge (92). 350€, attestation immédiate.",
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
        <title>Renouvellement Carte Pro VTC Taxi Montrouge | ECOLE T3P</title>
        <meta name="description" content="Renouvellement carte pro VTC, Taxi, VMDTR à Montrouge (92). Formation continue 14h, attestation immédiate. 350€. Sessions chaque semaine." />
        <link rel="canonical" href="https://www.ecolet3p.fr/renouvellement-carte-professionnelle" />
        <meta property="og:title" content="Renouvellement Carte Pro VTC Taxi VMDTR | ECOLE T3P" />
        <meta property="og:description" content="Formation continue obligatoire 14h. Attestation immédiate. 350€. Centre agréé Préfecture 92." />
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

      {/* 1. HERO */}
      <section className="py-12 lg:py-20 bg-primary">
        <div className="container-custom">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-destructive/20 text-white border border-destructive/30 mb-6"
            >
              <AlertTriangle className="w-4 h-4" />
              Obligation légale — Ne risquez pas l'interdiction d'exercer
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[24px] md:text-[34px] lg:text-[44px] font-bold text-white leading-tight mb-4"
            >
              Renouvelez votre carte pro en<br />
              <span className="text-accent">2 jours — Attestation immédiate</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-base md:text-lg mb-8 max-w-2xl"
            >
              Formation continue obligatoire de 14h pour chauffeurs VTC, Taxi et VMDTR. 
              <strong className="text-white"> Attestation délivrée le jour même</strong>, sessions chaque semaine à Montrouge (92). 
              350€ payable en 4× sans frais.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Euro className="w-4 h-4" /> 350€
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Clock className="w-4 h-4" /> 14h sur 2 jours
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <FileCheck className="w-4 h-4" /> Attestation immédiate
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
              { icon: Calendar, value: "Depuis 2014", label: "+10 ans d'expérience" },
              { icon: Users, value: "+2 000", label: "Cartes renouvelées" },
              { icon: Clock, value: "14h", label: "Sur 2 jours" },
              { icon: Star, value: "5.0/5", label: "359 avis Google" },
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

      {/* 2. POURQUOI NOUS CHOISIR */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Pourquoi renouveler chez ECOLE T3P ?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Plus de 2 000 chauffeurs nous font confiance pour maintenir leur carte professionnelle en règle.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. RÉSULTATS & ACCOMPAGNEMENT */}
      <section className="section-padding bg-primary/5">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Des résultats concrets, un accompagnement réel</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Nous ne nous contentons pas de délivrer une attestation — nous vous accompagnons 
              jusqu'au renouvellement effectif de votre carte.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-card rounded-xl border border-border"
              >
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{r.value}</p>
                <p className="text-xs text-muted-foreground">{r.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROGRAMME — Tarifs & Étapes */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Comment renouveler votre carte en 4 étapes</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
            {programSteps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {s.step}
                </div>
                <h3 className="font-bold text-foreground mb-2 text-center text-sm">{s.title}</h3>
                <p className="text-xs text-muted-foreground text-center">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Tarifs */}
          <h3 className="section-title text-center mb-8">Tarifs par profession — 350€</h3>
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
                <h4 className="text-lg font-bold text-primary mb-3">{f.title}</h4>
                <p className="text-3xl font-bold text-accent mb-2">{f.price}</p>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p className="flex items-center justify-center gap-2"><Clock className="w-4 h-4" /> 14h sur 2 jours</p>
                  <p className="flex items-center justify-center gap-2"><Calendar className="w-4 h-4" /> {f.validity}</p>
                </div>
                <p className="text-xs text-muted-foreground mb-4">{f.description}</p>
                <button onClick={() => setShowForm(true)} className="btn-cta-orange w-full px-4 py-3 font-bold rounded-lg inline-flex items-center justify-center gap-2 text-sm">
                  Je m'inscris <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ STRATÉGIQUE */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Questions fréquentes sur le renouvellement</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Tout savoir sur la procédure de renouvellement de votre carte professionnelle.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-6">
                  <AccordionTrigger className="text-left font-bold text-foreground hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent forceMount className="data-[state=closed]:hidden">
                    <p className="text-muted-foreground text-sm pb-4">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="section-title text-center mb-8">Complétez votre parcours</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { title: "Passerelle VTC ↔ Taxi", desc: "Obtenez une double carte professionnelle — 665€.", path: "/passerelle-vtc-taxi" },
              { title: "Formation Accessibilité PMR", desc: "Élargissez votre clientèle au transport PMR — 290€.", path: "/formation-accessibilite-pmr" },
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

      {/* 6. CTA FINAL FORT */}
      <section className="py-16 lg:py-20 bg-primary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-destructive/20 text-white border border-destructive/30 mb-6">
              <AlertTriangle className="w-4 h-4" />
              Ne risquez pas l'interdiction d'exercer
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Renouvelez votre carte dès cette semaine
            </h2>
            <p className="text-white/80 mb-4 max-w-2xl mx-auto text-lg">
              Sessions disponibles chaque semaine. Attestation délivrée le jour même. 
              350€ payable en 4× sans frais.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setShowForm(true)}
                className="btn-cta-orange px-10 py-4 text-lg font-bold rounded-lg inline-flex items-center gap-2"
              >
                Je renouvelle ma carte <ArrowRight className="w-5 h-5" />
              </button>
              <a href="tel:0188750555" className="text-white/80 hover:text-white font-semibold inline-flex items-center gap-2 text-lg">
                <Phone className="w-5 h-5" /> 01 88 75 05 55
              </a>
            </div>
          </motion.div>
        </div>
      </section>

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
