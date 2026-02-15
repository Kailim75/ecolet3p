import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home, ChevronRight, ClipboardList, Check, ArrowRight,
  Phone, Clock, Euro, Star, Users, Calendar, GraduationCap
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StepPreRegistrationForm from "@/components/formations/StepPreRegistrationForm";
import AlmaLogo from "@/components/logo/AlmaLogo";

const services = [
  "Création du dossier carte professionnelle complet",
  "Inscription au registre T3P obligatoire",
  "Démarches préfecture (dépôt et suivi du dossier)",
  "Inscription sur les plateformes VTC (Uber, Bolt, Marcel, etc.)",
  "Aide à l'immatriculation du véhicule professionnel",
  "Assistance choix et souscription assurances professionnelles",
  "Déclaration d'activité URSSAF / création micro-entreprise",
  "Accompagnement ouverture compte bancaire professionnel",
];

const faqs = [
  { question: "En quoi consiste exactement l'accompagnement ?", answer: "Nous réalisons toutes les démarches administratives à votre place : inscription registre T3P, dossier préfecture, plateformes VTC, URSSAF, assurances. Vous n'avez qu'à fournir les documents nécessaires." },
  { question: "Quelle est la différence entre groupe et individuel ?", answer: "En groupe (190€), vous êtes accompagné avec d'autres stagiaires sur une journée. En individuel (290€), un formateur dédié s'occupe exclusivement de votre dossier avec un suivi personnalisé." },
  { question: "Puis-je prendre ce service sans suivre de formation ?", answer: "Oui, ce service est ouvert à tous les chauffeurs, même ceux qui n'ont pas suivi leur formation chez nous. Il est particulièrement adapté aux personnes ayant obtenu leur carte mais bloquées par l'administratif." },
  { question: "Combien de temps durent les démarches ?", answer: "La journée d'accompagnement permet de lancer toutes les démarches. Les délais de traitement dépendent ensuite des organismes (préfecture : 2-4 semaines, URSSAF : quelques jours, plateformes : variable)." },
];

const AideAdministrativeCreationEntreprise = () => {
  const [showForm, setShowForm] = useState(false);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Aide Administrative & Création d'Entreprise pour Chauffeurs",
    description: "Accompagnement administratif complet pour chauffeurs VTC, Taxi et VMDTR. Carte pro, registre T3P, préfecture, plateformes.",
    provider: { "@type": "EducationalOrganization", name: "ECOLE T3P", url: "https://www.ecolet3p.fr" },
    offers: [
      { "@type": "Offer", name: "En groupe", price: 190, priceCurrency: "EUR" },
      { "@type": "Offer", name: "Individuel", price: 290, priceCurrency: "EUR" },
    ],
  };

  return (
    <Layout>
      <Helmet>
        <title>Aide Administrative Chauffeur — Dès 190€ | ECOLE T3P Montrouge</title>
        <meta name="description" content="Accompagnement administratif complet pour chauffeurs à Montrouge (92). Carte pro, registre T3P, préfecture, plateformes VTC. Dès 190€." />
        <link rel="canonical" href="https://www.ecolet3p.fr/aide-administrative-creation-entreprise" />
        <meta property="og:title" content="Aide Administrative Chauffeur — Dès 190€ | ECOLE T3P" />
        <meta property="og:description" content="On s'occupe de la paperasse — carte pro, registre T3P, préfecture, plateformes VTC." />
        <meta property="og:url" content="https://www.ecolet3p.fr/aide-administrative-creation-entreprise" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-muted py-3 border-b border-border mt-16">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" /> Accueil
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/formations" className="hover:text-primary transition-colors">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Aide administrative</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 lg:py-20 bg-primary">
        <div className="container-custom">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-white/15 text-white border border-white/20 mb-6">
              <ClipboardList className="w-4 h-4" /> Service complémentaire
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[24px] md:text-[34px] lg:text-[44px] font-bold text-white leading-tight mb-4">
              Aide Administrative &<br />
              <span className="text-accent">Création d'Entreprise — Montrouge (92)</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/80 text-base md:text-lg mb-8 max-w-2xl">
              On s'occupe de la paperasse pour vous — carte professionnelle, registre T3P, préfecture, plateformes VTC. Concentrez-vous sur votre réussite.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-3 mb-8">
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Clock className="w-4 h-4" /> 7h (1 journée)
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Euro className="w-4 h-4" /> À partir de 190€
              </span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setShowForm(true)} className="btn-cta-orange px-8 py-4 text-base font-bold rounded-lg inline-flex items-center justify-center gap-2">
                <GraduationCap className="w-5 h-5" /> Je réserve
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
              { icon: Users, value: "+2 000", label: "Chauffeurs accompagnés" },
              { icon: Clock, value: "7h", label: "1 journée" },
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

      {/* Services inclus */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <h2 className="section-title text-center mb-10">Ce que nous faisons pour vous</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {services.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="flex items-start gap-3 p-4 bg-muted rounded-xl">
                <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-foreground">{s}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">Nos formules</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[
              { label: "En groupe", price: 190, recommended: false },
              { label: "Individuel", price: 290, recommended: true },
            ].map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`card-t3p text-center relative ${tier.recommended ? "border-2 border-primary/30" : ""}`}
              >
                {tier.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    RECOMMANDÉ
                  </span>
                )}
                <h3 className="text-lg font-bold mb-2">{tier.label}</h3>
                <p className="text-3xl font-bold text-primary mb-1">{tier.price}€</p>
                <div className="flex items-center justify-center gap-1.5 mb-6">
                  <span className="text-sm font-semibold text-accent">ou 4× {Math.round(tier.price / 4)}€/mois</span>
                  <AlmaLogo className="h-4" />
                </div>
                <button onClick={() => setShowForm(true)} className="btn-cta-orange w-full px-6 py-3 font-bold rounded-lg inline-flex items-center justify-center gap-2">
                  Choisir <ArrowRight className="w-4 h-4" />
                </button>
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
              { title: "Gestion d'activité", desc: "Statut juridique, comptabilité, fiscalité.", path: "/accompagnement-gestion-activite" },
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
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Concentrez-vous sur la route</h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            On s'occupe de toute la paperasse. Accompagnement complet dès 190€, paiement en 4× sans frais.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setShowForm(true)} className="btn-cta-orange px-8 py-4 font-bold rounded-lg inline-flex items-center gap-2">
              Je réserve <ArrowRight className="w-5 h-5" />
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
            <DialogTitle>Inscription — Aide administrative</DialogTitle>
          </DialogHeader>
          <StepPreRegistrationForm isOpen={showForm} onClose={() => setShowForm(false)} defaultFormation="Accompagnement Administratif" />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AideAdministrativeCreationEntreprise;
