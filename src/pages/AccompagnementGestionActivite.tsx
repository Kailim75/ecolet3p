import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home, ChevronRight, Briefcase, Check, ArrowRight,
  Phone, Clock, Euro, Star, Users, Calendar, GraduationCap,
  Shield, TrendingUp, PiggyBank, Scale, FileText, Building
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StepPreRegistrationForm from "@/components/formations/StepPreRegistrationForm";
import AlmaLogo from "@/components/logo/AlmaLogo";
import BeforeAfterBlock from "@/components/formations/BeforeAfterBlock";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const whyChooseUs = [
  { icon: Shield, title: "Formateurs entrepreneurs eux-mêmes", desc: "Nos formateurs sont des professionnels du transport qui ont créé et géré leur propre activité." },
  { icon: Scale, title: "Approche personnalisée par statut", desc: "Micro-entreprise, SASU, EURL — nous analysons votre situation pour trouver le statut optimal." },
  { icon: TrendingUp, title: "Optimisation fiscale légale", desc: "Maximisez vos revenus nets grâce aux bonnes pratiques comptables et fiscales." },
  { icon: PiggyBank, title: "ROI immédiat", desc: "Les économies réalisées grâce à nos conseils remboursent la formation dès le premier mois." },
];

const results = [
  { value: "+2 000", label: "chauffeurs accompagnés depuis 2014" },
  { value: "100%", label: "des participants lancent leur activité" },
  { value: "5.0/5", label: "sur 359 avis Google vérifiés" },
  { value: "3 jours", label: "pour maîtriser votre gestion" },
];

const programModules = [
  { title: "Choix du statut juridique", items: ["Analyse comparative micro-entreprise vs SASU vs EURL", "Simulation de revenus nets selon chaque statut", "Aide à la décision personnalisée"] },
  { title: "Comptabilité & fiscalité", items: ["Obligations comptables par statut", "TVA, impôts et charges sociales", "Optimisation fiscale légale"] },
  { title: "Gestion au quotidien", items: ["Trésorerie et gestion de flotte", "Assurances professionnelles obligatoires", "Outils de gestion recommandés"] },
  { title: "Développement commercial", items: ["Inscription et optimisation plateformes (Uber, Bolt…)", "Stratégies de fidélisation clientèle directe", "Business plan simplifié et prévisionnel"] },
];

const faqs = [
  { question: "Faut-il avoir déjà sa carte professionnelle ?", answer: "Non, cette formation est ouverte à tous : futurs chauffeurs en cours de formation initiale, nouveaux titulaires de carte ou chauffeurs expérimentés souhaitant optimiser leur activité. L'idéal est de la suivre avant de démarrer." },
  { question: "Quel statut juridique est recommandé pour un chauffeur ?", answer: "Cela dépend de votre situation personnelle, de vos revenus prévisionnels et de votre stratégie. En formation, nous analysons ensemble les avantages et inconvénients de chaque statut (micro-entreprise, SASU, EURL) pour trouver le plus adapté." },
  { question: "La formation couvre-t-elle les plateformes VTC ?", answer: "Oui, nous abordons l'inscription et l'optimisation de votre présence sur les principales plateformes (Uber, Bolt, Marcel, etc.) ainsi que la stratégie de développement d'une clientèle directe pour maximiser vos marges." },
  { question: "Un suivi post-formation est-il inclus ?", answer: "Nos formateurs restent disponibles par téléphone pour répondre à vos questions après la formation. Pour un accompagnement plus poussé, découvrez notre service d'aide administrative dédié." },
  { question: "Comment financer cette formation ?", answer: "390€ payable en 4× 98€ sans frais via Alma. Pas de paperasse, inscription immédiate. L'investissement est rentabilisé dès le premier mois grâce aux optimisations apprises." },
];

const AccompagnementGestionActivite = () => {
  const [showForm, setShowForm] = useState(false);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Formation Gestion & Création d'Entreprise pour Chauffeurs",
    description: "Formation gestion d'entreprise 21h à Montrouge (92). Statut juridique, comptabilité, fiscalité pour chauffeurs VTC, Taxi et VMDTR. 390€.",
    provider: { "@type": "EducationalOrganization", name: "ECOLE T3P", url: "https://ecolet3p.fr" },
    offers: { "@type": "Offer", price: 390, priceCurrency: "EUR" },
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
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://ecolet3p.fr/" },
      { "@type": "ListItem", position: 2, name: "Formations", item: "https://ecolet3p.fr/formations" },
      { "@type": "ListItem", position: 3, name: "Gestion d'activité", item: "https://ecolet3p.fr/accompagnement-gestion-activite" },
    ],
  };

  return (
    <Layout>
      <Helmet>
        <title>Gestion d'Activité Chauffeur 21h — 390€ | ECOLE T3P</title>
        <meta name="description" content="Formation gestion d'entreprise 21h à 390€ à Montrouge (92). Statut juridique, comptabilité, fiscalité pour chauffeurs VTC et Taxi. 4× sans frais." />
        <link rel="canonical" href="https://ecolet3p.fr/accompagnement-gestion-activite" />
        <meta property="og:title" content="Gestion d'Activité Chauffeur — 390€ | ECOLE T3P Montrouge" />
        <meta property="og:description" content="Lancez votre activité sur des bases solides. Statut juridique, comptabilité, fiscalité — ROI immédiat." />
        <meta property="og:url" content="https://www.ecolet3p.fr/accompagnement-gestion-activite" />
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
            <span className="text-foreground font-medium">Gestion d'activité</span>
          </nav>
        </div>
      </div>

      {/* 1. HERO */}
      <section className="py-12 lg:py-20 bg-primary">
        <div className="container-custom">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-white/15 text-white border border-white/20 mb-6">
              <Briefcase className="w-4 h-4" /> Formation essentielle — ROI dès le 1er mois
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[24px] md:text-[34px] lg:text-[44px] font-bold text-white leading-tight mb-4">
              Maximisez vos revenus avec<br />
              <span className="text-gold">une gestion maîtrisée — Montrouge (92)</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/80 text-base md:text-lg mb-8 max-w-2xl">
              Le bon statut, la bonne fiscalité, les bonnes pratiques. En 3 jours, maîtrisez 
              tout ce qu'il faut pour <strong className="text-white">maximiser vos revenus nets</strong> et éviter les pièges.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-3 mb-8">
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Clock className="w-4 h-4" /> 21h (3 jours)
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Euro className="w-4 h-4" /> 390€
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <TrendingUp className="w-4 h-4" /> ROI immédiat
              </span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setShowForm(true)} className="btn-cta-orange px-8 py-4 text-base font-bold rounded-lg inline-flex items-center justify-center gap-2">
                <GraduationCap className="w-5 h-5" /> Réserver ma place
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
              { icon: Users, value: "+2 000", label: "Chauffeurs accompagnés" },
              { icon: Briefcase, value: "21h", label: "3 jours intensifs" },
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
            <h2 className="section-title">Pourquoi cette formation change tout</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              80% des chauffeurs perdent de l'argent par méconnaissance fiscale et juridique. 
              Cette formation vous donne les clés pour l'éviter.
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
            <h2 className="section-title">Des résultats mesurables</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Nos anciens stagiaires témoignent : cette formation est l'investissement le plus rentable de leur carrière.
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

      {/* AVANT / APRÈS */}
      <BeforeAfterBlock
        title="La gestion qui fait la différence"
        subtitle="Découvrez comment nos stagiaires ont optimisé leur activité grâce à une gestion maîtrisée."
        transformations={[
          {
            name: "Moussa T.", initials: "MT", formation: "Gestion d'activité",
            before: [
              { label: "Statut", value: "Micro-entreprise par défaut" },
              { label: "Charges", value: "Aucune optimisation fiscale" },
              { label: "Revenus nets", value: "1 900€/mois" },
            ],
            after: [
              { label: "Statut", value: "SASU optimisée" },
              { label: "Charges", value: "−350€/mois grâce à la bonne structure" },
              { label: "Revenus nets", value: "2 600€/mois" },
            ],
            quote: "Je perdais de l'argent en micro-entreprise sans le savoir. Le passage en SASU m'a fait gagner 350€ nets par mois.",
          },
          {
            name: "Amina B.", initials: "AB", formation: "Gestion d'activité",
            before: [
              { label: "Comptabilité", value: "Aucun suivi des dépenses" },
              { label: "Business plan", value: "Inexistant" },
              { label: "Assurances", value: "Trop chères, mal négociées" },
            ],
            after: [
              { label: "Comptabilité", value: "Suivi mensuel automatisé" },
              { label: "Business plan", value: "Prévisionnel sur 12 mois" },
              { label: "Assurances", value: "Renégociées, −120€/mois" },
            ],
            quote: "J'ai enfin un tableau de bord de mon activité. Je sais exactement combien je gagne et combien je dépense.",
          },
          {
            name: "David R.", initials: "DR", formation: "Gestion d'activité",
            before: [
              { label: "Plateformes", value: "100% Uber" },
              { label: "Clientèle directe", value: "0 client fidèle" },
              { label: "Marge nette", value: "22%" },
            ],
            after: [
              { label: "Plateformes", value: "Multi-plateformes + clients directs" },
              { label: "Clientèle directe", value: "15 clients réguliers" },
              { label: "Marge nette", value: "38%" },
            ],
            quote: "La formation m'a appris à développer ma clientèle directe. Ma marge a presque doublé en 6 mois.",
          },
        ]}
      />

      {/* 4. PROGRAMME STRUCTURÉ */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Programme complet — 21h sur 3 jours</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              4 modules progressifs pour maîtriser chaque aspect de votre activité.
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
            <h3 className="text-lg font-bold mb-2">Tarif — Gestion d'Activité</h3>
            <p className="text-4xl font-bold text-primary mb-1">390€</p>
            <div className="flex items-center justify-center gap-1.5 mb-6">
              <span className="text-sm font-semibold text-accent">ou 4× 98€/mois</span>
              <AlmaLogo className="h-4" />
            </div>
            <button onClick={() => setShowForm(true)} className="btn-cta-orange w-full px-6 py-3.5 font-bold rounded-lg inline-flex items-center justify-center gap-2">
              Réserver ma place <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. FAQ STRATÉGIQUE */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Questions fréquentes</h2>
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
              { title: "Aide administrative", desc: "On s'occupe de la paperasse pour vous — dès 190€.", path: "/aide-administrative-creation-entreprise" },
              { title: "Formation PMR", desc: "Élargissez votre clientèle au transport PMR — 290€.", path: "/formation-accessibilite-pmr" },
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
              Ne laissez plus d'argent sur la table
            </h2>
            <p className="text-white/80 mb-4 max-w-2xl mx-auto text-lg">
              Le bon statut et la bonne gestion peuvent représenter des milliers d'euros de différence par an. 
              Investissez 390€ aujourd'hui pour maximiser vos revenus demain.
            </p>
            <p className="text-accent font-semibold mb-8">
              Paiement en 4× 98€ sans frais via Alma
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => setShowForm(true)} className="btn-cta-orange px-10 py-4 text-lg font-bold rounded-lg inline-flex items-center gap-2">
                Réserver ma place <ArrowRight className="w-5 h-5" />
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
            <DialogTitle>Inscription — Gestion d'activité</DialogTitle>
          </DialogHeader>
          <StepPreRegistrationForm isOpen={showForm} onClose={() => setShowForm(false)} defaultFormation="Formation Gestion & Création d'Entreprise" />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AccompagnementGestionActivite;
