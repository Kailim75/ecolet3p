import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home, ChevronRight, Accessibility, Check, ArrowRight,
  Phone, Clock, Euro, Star, Users, Calendar, GraduationCap
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StepPreRegistrationForm from "@/components/formations/StepPreRegistrationForm";
import AlmaLogo from "@/components/logo/AlmaLogo";

const modules = [
  "Réglementation PMR applicable au transport de personnes",
  "Les différents types de handicap (moteur, sensoriel, cognitif)",
  "Communication adaptée avec les personnes en situation de handicap",
  "Manipulation de fauteuils roulants et aides techniques",
  "Gestes et postures pour la manutention en sécurité",
  "Sécurité lors de l'embarquement et du débarquement",
  "Aménagement du véhicule et équipements adaptés",
  "Mise en situation pratique et cas concrets",
];

const faqs = [
  { question: "Cette formation est-elle obligatoire ?", answer: "Elle n'est pas obligatoire pour tous les chauffeurs, mais elle est fortement recommandée et peut être exigée par certaines plateformes ou donneurs d'ordres spécialisés dans le transport PMR." },
  { question: "Faut-il un véhicule spécifique ?", answer: "Non, la formation vous apprend à accueillir des personnes à mobilité réduite dans tout type de véhicule. Les techniques de manutention et d'assistance sont universelles." },
  { question: "Qui peut s'inscrire ?", answer: "Tout chauffeur VTC, Taxi ou VMDTR souhaitant élargir sa clientèle au transport de personnes à mobilité réduite. Aucun prérequis spécifique n'est nécessaire." },
  { question: "Y a-t-il une attestation en fin de formation ?", answer: "Oui, une attestation de formation est délivrée immédiatement à la fin du stage. Elle peut être présentée aux plateformes et donneurs d'ordres." },
];

const FormationAccessibilitePMR = () => {
  const [showForm, setShowForm] = useState(false);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Formation Accessibilité & Transport PMR",
    description: "Formation transport de personnes à mobilité réduite (PMR) 14h à Montrouge (92). Maîtrisez l'accueil et la manutention PMR.",
    provider: { "@type": "EducationalOrganization", name: "ECOLE T3P", url: "https://www.ecolet3p.fr" },
    offers: { "@type": "Offer", price: 290, priceCurrency: "EUR" },
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
        <title>Formation Accessibilité PMR 14h — 290€ | ECOLE T3P Montrouge</title>
        <meta name="description" content="Formation transport PMR 14h (2 jours) à 290€ à Montrouge (92). Maîtrisez le transport de personnes à mobilité réduite. Paiement 4× sans frais." />
        <link rel="canonical" href="https://www.ecolet3p.fr/formation-accessibilite-pmr" />
        <meta property="og:title" content="Formation Accessibilité PMR 14h — 290€ | ECOLE T3P" />
        <meta property="og:description" content="Maîtrisez le transport de personnes à mobilité réduite. Formation pratique de 14h." />
        <meta property="og:url" content="https://www.ecolet3p.fr/formation-accessibilite-pmr" />
        <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
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

      {/* Hero */}
      <section className="py-12 lg:py-20 bg-primary">
        <div className="container-custom">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-white/15 text-white border border-white/20 mb-6">
              <Accessibility className="w-4 h-4" /> Formation complémentaire
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[24px] md:text-[34px] lg:text-[44px] font-bold text-white leading-tight mb-4">
              Formation Accessibilité &<br />
              <span className="text-accent">Transport PMR — Montrouge (92)</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/80 text-base md:text-lg mb-8 max-w-2xl">
              Élargissez votre clientèle et maîtrisez le transport de personnes à mobilité réduite. Formation pratique de 14 heures sur 2 jours.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-3 mb-8">
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Clock className="w-4 h-4" /> 14h (2 jours)
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Euro className="w-4 h-4" /> 290€
              </span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setShowForm(true)} className="btn-cta-orange px-8 py-4 text-base font-bold rounded-lg inline-flex items-center justify-center gap-2">
                <GraduationCap className="w-5 h-5" /> S'inscrire
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
              { icon: Calendar, value: "Depuis 2014", label: "+10 ans" },
              { icon: Users, value: "+2 000", label: "Chauffeurs formés" },
              { icon: Clock, value: "14h", label: "2 jours" },
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

      {/* Programme */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <h2 className="section-title text-center mb-10">Programme de la formation</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {modules.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="flex items-start gap-3 p-4 bg-muted rounded-xl">
                <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-foreground">{m}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tarif */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-md mx-auto card-t3p text-center border-2 border-primary/20">
            <h3 className="text-lg font-bold mb-2">Tarif</h3>
            <p className="text-4xl font-bold text-primary mb-1">290€</p>
            <div className="flex items-center justify-center gap-1.5 mb-6">
              <span className="text-sm font-semibold text-accent">ou 4× 73€/mois</span>
              <AlmaLogo className="h-4" />
            </div>
            <button onClick={() => setShowForm(true)} className="btn-cta-orange w-full px-6 py-3.5 font-bold rounded-lg inline-flex items-center justify-center gap-2">
              S'inscrire <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">Questions fréquentes</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-xl p-6 border border-border">
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
              { title: "Passerelle VTC ↔ Taxi", desc: "Obtenez une double carte professionnelle.", path: "/passerelle-vtc-taxi" },
              { title: "Gestion d'activité", desc: "Lancez votre activité sur des bases solides.", path: "/accompagnement-gestion-activite" },
              { title: "Formations initiales", desc: "VTC, Taxi ou VMDTR — dès 990€.", path: "/formations" },
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

      {/* CTA final */}
      <section className="py-16 bg-primary">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Élargissez votre clientèle</h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            Maîtrisez le transport PMR et accédez à de nouvelles opportunités. 14h — 290€, paiement en 4× sans frais.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setShowForm(true)} className="btn-cta-orange px-8 py-4 font-bold rounded-lg inline-flex items-center gap-2">
              S'inscrire <ArrowRight className="w-5 h-5" />
            </button>
            <a href="tel:0188750555" className="text-white/80 hover:text-white font-semibold inline-flex items-center gap-2">
              <Phone className="w-5 h-5" /> 01 88 75 05 55
            </a>
          </div>
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
