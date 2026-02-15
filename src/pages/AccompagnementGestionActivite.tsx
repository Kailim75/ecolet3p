import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home, ChevronRight, Briefcase, Check, ArrowRight,
  Phone, Clock, Euro, Star, Users, Calendar, GraduationCap
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StepPreRegistrationForm from "@/components/formations/StepPreRegistrationForm";
import AlmaLogo from "@/components/logo/AlmaLogo";

const modules = [
  "Choix du statut juridique (micro-entreprise, SASU, EURL, etc.)",
  "Obligations comptables et fiscales du chauffeur",
  "Élaboration d'un business plan simplifié",
  "Gestion de trésorerie au quotidien",
  "Assurances professionnelles obligatoires (RC Pro, véhicule)",
  "Démarches URSSAF et obligations sociales",
  "Optimisation fiscale légale pour chauffeurs",
  "Stratégies de développement et fidélisation clientèle",
];

const faqs = [
  { question: "Faut-il avoir déjà sa carte professionnelle ?", answer: "Non, cette formation est ouverte à tous : futurs chauffeurs en cours de formation, nouveaux titulaires de carte ou chauffeurs expérimentés souhaitant optimiser leur activité." },
  { question: "Quel statut juridique est recommandé ?", answer: "Cela dépend de votre situation. En formation, nous analysons ensemble les avantages et inconvénients de chaque statut (micro-entreprise, SASU, EURL) pour trouver le plus adapté à votre profil." },
  { question: "La formation couvre-t-elle les plateformes VTC ?", answer: "Oui, nous abordons l'inscription et l'optimisation de votre présence sur les principales plateformes (Uber, Bolt, Marcel, etc.) ainsi que la gestion de clientèle directe." },
  { question: "Un suivi post-formation est-il inclus ?", answer: "Nos formateurs restent disponibles pour répondre à vos questions après la formation. Pour un accompagnement plus poussé, découvrez notre service d'aide administrative." },
];

const AccompagnementGestionActivite = () => {
  const [showForm, setShowForm] = useState(false);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Formation Gestion & Création d'Entreprise pour Chauffeurs",
    description: "Formation gestion d'entreprise 21h à Montrouge (92). Statut juridique, comptabilité, fiscalité pour chauffeurs VTC, Taxi et VMDTR.",
    provider: { "@type": "EducationalOrganization", name: "ECOLE T3P", url: "https://www.ecolet3p.fr" },
    offers: { "@type": "Offer", price: 390, priceCurrency: "EUR" },
  };

  return (
    <Layout>
      <Helmet>
        <title>Gestion d'Activité Chauffeur 21h — 390€ | ECOLE T3P Montrouge</title>
        <meta name="description" content="Formation gestion d'entreprise 21h (3 jours) à 390€ à Montrouge (92). Statut juridique, comptabilité, fiscalité pour chauffeurs. Paiement 4× sans frais." />
        <link rel="canonical" href="https://www.ecolet3p.fr/accompagnement-gestion-activite" />
        <meta property="og:title" content="Gestion d'Activité Chauffeur 21h — 390€ | ECOLE T3P" />
        <meta property="og:description" content="Lancez votre activité de chauffeur sur des bases solides. Statut juridique, comptabilité, fiscalité." />
        <meta property="og:url" content="https://www.ecolet3p.fr/accompagnement-gestion-activite" />
        <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
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
            <span className="text-foreground font-medium">Gestion d'activité</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 lg:py-20 bg-primary">
        <div className="container-custom">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-white/15 text-white border border-white/20 mb-6">
              <Briefcase className="w-4 h-4" /> Formation complémentaire
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[24px] md:text-[34px] lg:text-[44px] font-bold text-white leading-tight mb-4">
              Gestion & Création d'Activité<br />
              <span className="text-accent">pour Chauffeurs — Montrouge (92)</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/80 text-base md:text-lg mb-8 max-w-2xl">
              Lancez votre activité de chauffeur sur des bases solides. Statut juridique, comptabilité, fiscalité — tout ce qu'il faut savoir en 3 jours.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-3 mb-8">
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Clock className="w-4 h-4" /> 21h (3 jours)
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Euro className="w-4 h-4" /> 390€
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
              { icon: Clock, value: "21h", label: "3 jours" },
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
            <p className="text-4xl font-bold text-primary mb-1">390€</p>
            <div className="flex items-center justify-center gap-1.5 mb-6">
              <span className="text-sm font-semibold text-accent">ou 4× 98€/mois</span>
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
              { title: "Aide administrative", desc: "On s'occupe de la paperasse pour vous.", path: "/aide-administrative-creation-entreprise" },
              { title: "Formation Accessibilité PMR", desc: "Élargissez votre clientèle au transport PMR.", path: "/formation-accessibilite-pmr" },
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
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Lancez votre activité sereinement</h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            Maîtrisez la gestion de votre entreprise de transport. 21h — 390€, paiement en 4× sans frais.
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
            <DialogTitle>Inscription — Gestion d'activité</DialogTitle>
          </DialogHeader>
          <StepPreRegistrationForm isOpen={showForm} onClose={() => setShowForm(false)} defaultFormation="Formation Gestion & Création d'Entreprise" />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AccompagnementGestionActivite;
