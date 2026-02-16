import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home, ChevronRight, Accessibility, Check, ArrowRight,
  Phone, Clock, Euro, Star, Users, Calendar, GraduationCap,
  Shield, Award, TrendingUp, Heart, UserPlus, BookOpen
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StepPreRegistrationForm from "@/components/formations/StepPreRegistrationForm";
import AlmaLogo from "@/components/logo/AlmaLogo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const whyChooseUs = [
  { icon: Shield, title: "Centre agréé Préfecture 92", desc: "Formation reconnue — attestation officielle délivrée en fin de stage." },
  { icon: TrendingUp, title: "Marché en forte croissance", desc: "Le transport PMR représente un segment premium en pleine expansion en Île-de-France." },
  { icon: Heart, title: "Formation 100% pratique", desc: "Mises en situation réelles avec fauteuils roulants, aides techniques et cas concrets." },
  { icon: UserPlus, title: "Clientèle fidèle et récurrente", desc: "Les clients PMR recherchent un chauffeur de confiance — fidélisation naturelle." },
];

const results = [
  { value: "+2 000", label: "chauffeurs formés depuis 2014" },
  { value: "100%", label: "attestations délivrées le jour même" },
  { value: "5.0/5", label: "sur 359 avis Google vérifiés" },
  { value: "+30%", label: "de revenus potentiels supplémentaires" },
];

const programModules = [
  { title: "Les différents types de handicap", items: ["Handicap moteur, sensoriel, cognitif et psychique", "Comprendre les besoins spécifiques de chaque situation"] },
  { title: "Réglementation PMR", items: ["Obligations légales du transporteur", "Droits des personnes en situation de handicap"] },
  { title: "Communication adaptée", items: ["Techniques d'accueil et de communication", "Gestion des situations délicates avec empathie"] },
  { title: "Manipulation & sécurité", items: ["Fauteuils roulants et aides techniques", "Gestes et postures, embarquement/débarquement"] },
];

const faqs = [
  { question: "Cette formation est-elle obligatoire ?", answer: "Elle n'est pas obligatoire pour tous les chauffeurs, mais elle est fortement recommandée et peut être exigée par certaines plateformes ou donneurs d'ordres spécialisés dans le transport PMR. C'est surtout un avantage concurrentiel majeur." },
  { question: "Faut-il un véhicule spécifique pour le transport PMR ?", answer: "Non, la formation vous apprend à accueillir des personnes à mobilité réduite dans tout type de véhicule. Les techniques de manutention et d'assistance sont universelles et adaptables." },
  { question: "Qui peut s'inscrire à cette formation ?", answer: "Tout chauffeur VTC, Taxi ou VMDTR souhaitant élargir sa clientèle au transport de personnes à mobilité réduite. Aucun prérequis spécifique n'est nécessaire au-delà de votre carte professionnelle." },
  { question: "Y a-t-il une attestation en fin de formation ?", answer: "Oui, une attestation de formation officielle est délivrée immédiatement à la fin du stage. Elle peut être présentée aux plateformes et donneurs d'ordres comme preuve de votre qualification." },
  { question: "Comment financer cette formation ?", answer: "Le tarif est de 290€, payable en 4× 73€ sans frais via Alma. Aucune paperasse, inscription immédiate." },
];

const FormationAccessibilitePMR = () => {
  const [showForm, setShowForm] = useState(false);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Formation Accessibilité & Transport PMR",
    description: "Formation transport de personnes à mobilité réduite (PMR) 14h à Montrouge (92). Attestation officielle. 290€ payable en 4× sans frais.",
    provider: { "@type": "EducationalOrganization", name: "ECOLE T3P", url: "https://www.ecolet3p.fr" },
    offers: { "@type": "Offer", price: 290, priceCurrency: "EUR" },
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
      { "@type": "ListItem", position: 3, name: "Formation PMR", item: "https://www.ecolet3p.fr/formation-accessibilite-pmr" },
    ],
  };

  return (
    <Layout>
      <Helmet>
        <title>Formation PMR 14h Montrouge (92) — 290€ | ECOLE T3P</title>
        <meta name="description" content="Formation transport PMR 14h à 290€ à Montrouge (92). Élargissez votre clientèle au transport de personnes à mobilité réduite. Attestation immédiate." />
        <link rel="canonical" href="https://www.ecolet3p.fr/formation-accessibilite-pmr" />
        <meta property="og:title" content="Formation Accessibilité PMR 14h — 290€ | ECOLE T3P" />
        <meta property="og:description" content="Élargissez votre clientèle et boostez vos revenus. Transport PMR, attestation officielle." />
        <meta property="og:url" content="https://www.ecolet3p.fr/formation-accessibilite-pmr" />
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
            <span className="text-foreground font-medium">Formation PMR</span>
          </nav>
        </div>
      </div>

      {/* 1. HERO */}
      <section className="py-12 lg:py-20 bg-primary">
        <div className="container-custom">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-white/15 text-white border border-white/20 mb-6">
              <Accessibility className="w-4 h-4" /> Formation complémentaire — +30% de revenus potentiels
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[24px] md:text-[34px] lg:text-[44px] font-bold text-white leading-tight mb-4">
              Boostez vos revenus avec le<br />
              <span className="text-accent">transport PMR — Montrouge (92)</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/80 text-base md:text-lg mb-8 max-w-2xl">
              Accédez à un marché premium en forte croissance. Formation pratique de 14h sur 2 jours — 
              <strong className="text-white"> attestation officielle immédiate</strong>. Clientèle fidèle et récurrente.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-3 mb-8">
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Clock className="w-4 h-4" /> 14h (2 jours)
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Euro className="w-4 h-4" /> 290€
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <TrendingUp className="w-4 h-4" /> Marché en croissance
              </span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setShowForm(true)} className="btn-cta-orange px-8 py-4 text-base font-bold rounded-lg inline-flex items-center justify-center gap-2">
                <GraduationCap className="w-5 h-5" /> S'inscrire maintenant
              </button>
              <a href="tel:0188750555" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white hover:text-primary transition-all">
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
              { icon: Users, value: "+2 000", label: "Chauffeurs formés" },
              { icon: Clock, value: "14h", label: "2 jours pratiques" },
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
            <h2 className="section-title">Pourquoi vous former au transport PMR ?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Un avantage concurrentiel majeur qui ouvre l'accès à une clientèle premium et fidèle.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyChooseUs.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/20 transition-colors">
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
            <h2 className="section-title">L'impact concret de la formation PMR</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Nos chiffres parlent d'eux-mêmes. Cette formation est un investissement à fort retour.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {results.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-card rounded-xl border border-border">
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
            <h2 className="section-title">Programme de la formation — 14h sur 2 jours</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Une formation 100% pratique avec mises en situation réelles.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {programModules.map((mod, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 bg-card rounded-xl border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">{i + 1}</div>
                  <h3 className="font-bold text-foreground">{mod.title}</h3>
                </div>
                <ul className="space-y-2">
                  {mod.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Tarif */}
          <div className="max-w-md mx-auto mt-16 card-t3p text-center border-2 border-primary/20">
            <h3 className="text-lg font-bold mb-2">Tarif — Formation PMR</h3>
            <p className="text-4xl font-bold text-primary mb-1">290€</p>
            <div className="flex items-center justify-center gap-1.5 mb-6">
              <span className="text-sm font-semibold text-accent">ou 4× 73€/mois</span>
              <AlmaLogo className="h-4" />
            </div>
            <button onClick={() => setShowForm(true)} className="btn-cta-orange w-full px-6 py-3.5 font-bold rounded-lg inline-flex items-center justify-center gap-2">
              S'inscrire maintenant <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. FAQ STRATÉGIQUE */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Questions fréquentes sur la formation PMR</h2>
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
              { title: "Gestion d'activité", desc: "Lancez votre activité sur des bases solides — 390€.", path: "/accompagnement-gestion-activite" },
              { title: "Formations initiales", desc: "VTC, Taxi ou VMDTR — dès 990€ tout compris.", path: "/formations" },
            ].map((link, i) => (
              <Link key={i} to={link.path} className="card-t3p group">
                <h3 className="text-sm font-semibold text-primary mb-1 group-hover:text-accent transition-colors">{link.title}</h3>
                <p className="text-xs text-muted-foreground">{link.desc}</p>
                <span className="text-xs font-semibold text-accent mt-2 inline-flex items-center gap-1">Découvrir <ArrowRight className="w-3 h-3" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA FINAL FORT */}
      <section className="py-16 lg:py-20 bg-primary">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Élargissez votre clientèle dès maintenant
            </h2>
            <p className="text-white/80 mb-4 max-w-2xl mx-auto text-lg">
              Le transport PMR est un marché premium en pleine croissance. 
              Formez-vous en 2 jours et accédez à une clientèle fidèle et récurrente.
            </p>
            <p className="text-accent font-semibold mb-8">
              290€ — Paiement en 4× 73€ sans frais via Alma
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => setShowForm(true)} className="btn-cta-orange px-10 py-4 text-lg font-bold rounded-lg inline-flex items-center gap-2">
                S'inscrire maintenant <ArrowRight className="w-5 h-5" />
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
            <DialogTitle>Inscription — Formation Accessibilité PMR</DialogTitle>
          </DialogHeader>
          <StepPreRegistrationForm isOpen={showForm} onClose={() => setShowForm(false)} defaultFormation="Formation Accessibilité / Transport PMR" />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default FormationAccessibilitePMR;
