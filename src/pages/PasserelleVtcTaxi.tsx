import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home, ChevronRight, ArrowLeftRight, Check, ArrowRight,
  Phone, Clock, Euro, Star, Users, Calendar, GraduationCap,
  Shield, Award, TrendingUp, Zap, Target, BookOpen
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StepPreRegistrationForm from "@/components/formations/StepPreRegistrationForm";
import PricingCard from "@/components/formations/PricingCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const passerelleDirections = [
  "TAXI → VTC", "VTC → TAXI", "VTC → VMDTR",
  "TAXI → VMDTR", "VMDTR → VTC", "VMDTR → TAXI",
];

const whyChooseUs = [
  { icon: Shield, title: "Centre agréé Préfecture 92", desc: "Agrément n° 23/007 — formation reconnue par les autorités compétentes." },
  { icon: Award, title: "94% de réussite à l'examen", desc: "Un taux parmi les plus élevés d'Île-de-France, grâce à une préparation ciblée." },
  { icon: Euro, title: "665€ tout compris, sans surprise", desc: "Frais d'examen de 165€ inclus. Paiement en 4× 167€ sans frais via Alma." },
  { icon: Zap, title: "Formation accélérée", desc: "Obtenez votre seconde carte professionnelle rapidement avec une préparation intensive." },
];

const results = [
  { value: "+2 000", label: "chauffeurs déjà formés depuis 2014" },
  { value: "94%", label: "de réussite dès la 1re présentation" },
  { value: "5.0/5", label: "sur 359 avis Google vérifiés" },
  { value: "100%", label: "accompagnement jusqu'à l'obtention de la carte" },
];

const programSteps = [
  { step: "1", title: "Analyse de votre situation", desc: "Vérification de vos résultats T3P et orientation vers les modules adaptés." },
  { step: "2", title: "Préparation modules spécifiques", desc: "Formation intensive aux 2 modules propres à la profession visée (VTC, Taxi ou VMDTR)." },
  { step: "3", title: "Conduite pratique incluse", desc: "2 heures de conduite avec véhicule fourni pour la présentation à l'examen pratique." },
  { step: "4", title: "Passage de l'examen CMA", desc: "Frais d'examen inclus, accompagnement le jour J et suivi jusqu'à l'obtention de la carte." },
];

const faqs = [
  { question: "Quelle est la différence entre passerelle et formation initiale ?", answer: "La passerelle est réservée aux titulaires d'un résultat d'examen T3P de moins de 3 ans. Elle permet de passer d'une profession à une autre (VTC, Taxi ou VMDTR) à 665€ tout compris, contre 990€ pour une formation initiale complète." },
  { question: "Que comprend le tarif de 665€ ?", answer: "Le tarif inclut la préparation aux 2 modules spécifiques de la profession visée, 2 heures de conduite pour la présentation à l'examen pratique, les frais d'examen de 165€ et la mise à disposition du véhicule le jour de l'examen. Paiement en 4× 167€ sans frais via Alma." },
  { question: "Quelles passerelles sont possibles ?", answer: "Toutes les directions sont possibles : Taxi vers VTC, VTC vers Taxi, VTC vers VMDTR, Taxi vers VMDTR, VMDTR vers VTC, VMDTR vers Taxi. La seule condition est d'avoir obtenu vos résultats d'examen T3P depuis moins de 3 ans." },
  { question: "Quels documents dois-je fournir ?", answer: "Vos résultats d'examen T3P datant de moins de 3 ans, une pièce d'identité en cours de validité, un justificatif de domicile de moins de 3 mois et une photo d'identité. Notre équipe vous accompagne pour le reste des démarches." },
  { question: "Combien de temps faut-il pour obtenir la seconde carte ?", answer: "La formation est accélérée. Après l'examen, les délais dépendent de la préfecture (généralement 2 à 4 semaines). Nous vous accompagnons dans toutes les démarches administratives." },
];

const PasserelleVtcTaxi = () => {
  const [showForm, setShowForm] = useState(false);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Formation Passerelle VTC ↔ Taxi & VMDTR",
    description: "Formation passerelle pour chauffeurs VTC, Taxi et VMDTR. Obtenez une double carte professionnelle à Montrouge (92). 665€ tout compris.",
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
        <meta name="description" content="Formation passerelle VTC ↔ Taxi ↔ VMDTR à Montrouge (92). 665€ tout compris incluant frais d'examen. 94% de réussite. Paiement 4× sans frais." />
        <link rel="canonical" href="https://www.ecolet3p.fr/passerelle-vtc-taxi" />
        <meta property="og:title" content="Passerelle VTC Taxi VMDTR — 665€ tout compris | ECOLE T3P" />
        <meta property="og:description" content="Doublez vos opportunités : obtenez une seconde carte professionnelle. 665€ tout compris, 94% de réussite." />
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

      {/* 1. HERO — Promesse claire + résultat précis */}
      <section className="py-12 lg:py-20 bg-primary">
        <div className="container-custom">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-white/15 text-white border border-white/20 mb-6"
            >
              <ArrowLeftRight className="w-4 h-4" />
              Formation passerelle — Centre agréé Préfecture 92
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[24px] md:text-[34px] lg:text-[44px] font-bold text-white leading-tight mb-4"
            >
              Doublez vos revenus avec une<br />
              <span className="text-accent">seconde carte professionnelle</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-base md:text-lg mb-8 max-w-2xl"
            >
              Vous êtes déjà chauffeur VTC, Taxi ou VMDTR ? Obtenez une double carte professionnelle 
              grâce à notre formation passerelle. <strong className="text-white">665€ tout compris</strong>, frais d'examen inclus, 
              paiement en 4× sans frais.
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
                <Award className="w-4 h-4" /> 94% de réussite
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
                <GraduationCap className="w-5 h-5" /> Je m'inscris maintenant
              </button>
              <a
                href="tel:0188750555"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white hover:text-primary transition-all"
              >
                <Phone className="w-5 h-5" /> 01 88 75 05 55
              </a>
            </motion.div>

            {/* Directions badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-2 mt-8"
            >
              {passerelleDirections.map((d) => (
                <span key={d} className="text-xs font-medium bg-white/10 px-3 py-1.5 rounded-full text-white/70">{d}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reassurance bar */}
      <section className="bg-muted py-6 border-b border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Calendar, value: "Depuis 2014", label: "+10 ans d'expérience" },
              { icon: Users, value: "+2 000", label: "Chauffeurs formés" },
              { icon: Award, value: "94%", label: "Taux de réussite" },
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
            <h2 className="section-title">Pourquoi choisir ECOLE T3P pour votre passerelle ?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Le seul centre à Montrouge qui combine expertise, résultats prouvés et accompagnement complet 
              pour votre double carte professionnelle.
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
            <h2 className="section-title">Des résultats concrets, pas des promesses</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Depuis 2014, nous accompagnons les chauffeurs d'Île-de-France vers la réussite. 
              Nos chiffres parlent d'eux-mêmes.
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

      {/* 4. PROGRAMME STRUCTURÉ */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Votre parcours passerelle en 4 étapes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Un programme clair et structuré pour obtenir votre seconde carte professionnelle 
              dans les meilleures conditions.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {programSteps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {s.step}
                </div>
                <h3 className="font-bold text-foreground mb-2 text-center text-sm">{s.title}</h3>
                <p className="text-xs text-muted-foreground text-center">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Pricing card */}
          <div className="max-w-lg mx-auto mt-16">
            <PricingCard
              title="Passerelle VTC ↔ TAXI ↔ VMDTR"
              price={665}
              duration="Formation accélérée"
              features={[
                "Préparation aux 2 modules spécifiques (Taxi, VTC ou VMDTR)",
                "Présentation à la conduite avec 2h de conduite incluses",
                "Frais d'examen de 165€ inclus",
                "Mise à disposition du véhicule le jour de l'examen",
                "Condition : résultats d'examen T3P de moins de 3 ans",
              ]}
              examFees="Frais d'examen de 165€ inclus"
              onRegister={() => setShowForm(true)}
            />
          </div>
        </div>
      </section>

      {/* 5. FAQ STRATÉGIQUE */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Questions fréquentes sur la passerelle</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Tout ce que vous devez savoir avant de vous lancer.
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
              { title: "Renouvellement carte pro", desc: "Formation continue obligatoire tous les 5 ans — 350€.", path: "/renouvellement-carte-professionnelle" },
              { title: "Formation Accessibilité PMR", desc: "Élargissez votre clientèle au transport PMR — 290€.", path: "/formation-accessibilite-pmr" },
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

      {/* 6. CTA FINAL FORT */}
      <section className="py-16 lg:py-20 bg-primary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Doublez vos opportunités dès maintenant
            </h2>
            <p className="text-white/80 mb-4 max-w-2xl mx-auto text-lg">
              Rejoignez les +2 000 chauffeurs formés par ECOLE T3P. 
              Formation passerelle à 665€ tout compris — résultats garantis.
            </p>
            <p className="text-accent font-semibold mb-8">
              Paiement en 4× 167€ sans frais via Alma
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setShowForm(true)}
                className="btn-cta-orange px-10 py-4 text-lg font-bold rounded-lg inline-flex items-center gap-2"
              >
                Je m'inscris maintenant <ArrowRight className="w-5 h-5" />
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
