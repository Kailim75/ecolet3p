import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home, ChevronRight, ClipboardList, Check, ArrowRight,
  Phone, Clock, Euro, Star, Users, Calendar, GraduationCap,
  Shield, Zap, HeartHandshake, FileCheck, Headphones, Ban
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StepPreRegistrationForm from "@/components/formations/StepPreRegistrationForm";
import AlmaLogo from "@/components/logo/AlmaLogo";
import BeforeAfterBlock from "@/components/formations/BeforeAfterBlock";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const whyChooseUs = [
  { icon: HeartHandshake, title: "On fait tout pour vous", desc: "Pas de paperasse : nous réalisons l'intégralité des démarches à votre place." },
  { icon: Zap, title: "Résultat en 1 journée", desc: "Toutes les démarches sont lancées en une seule journée — pas de rendez-vous multiples." },
  { icon: Shield, title: "+10 ans d'expertise administrative", desc: "Nous connaissons chaque processus sur le bout des doigts : préfecture, URSSAF, plateformes." },
  { icon: Headphones, title: "Suivi post-accompagnement", desc: "Un doute après la journée ? Nos conseillers restent disponibles par téléphone." },
];

const results = [
  { value: "+2 000", label: "chauffeurs accompagnés depuis 2014" },
  { value: "100%", label: "de dossiers acceptés en préfecture" },
  { value: "5.0/5", label: "sur 359 avis Google vérifiés" },
  { value: "1 jour", label: "pour lancer toutes vos démarches" },
];

const services = [
  { title: "Carte professionnelle", items: ["Création du dossier complet", "Vérification de tous les documents", "Suivi jusqu'à l'obtention"] },
  { title: "Registre T3P & préfecture", items: ["Inscription au registre obligatoire", "Dépôt du dossier en préfecture", "Suivi et relance si nécessaire"] },
  { title: "Plateformes & URSSAF", items: ["Inscription Uber, Bolt, Marcel, etc.", "Déclaration d'activité URSSAF", "Création micro-entreprise si besoin"] },
  { title: "Véhicule & assurances", items: ["Aide à l'immatriculation professionnelle", "Comparatif assurances RC Pro", "Ouverture compte bancaire pro"] },
];

const faqs = [
  { question: "En quoi consiste exactement l'accompagnement ?", answer: "Nous réalisons toutes les démarches administratives à votre place en une journée : inscription registre T3P, dossier préfecture, plateformes VTC, URSSAF, assurances. Vous n'avez qu'à fournir les documents nécessaires et on s'occupe du reste." },
  { question: "Quelle est la différence entre groupe et individuel ?", answer: "En groupe (190€), vous êtes accompagné avec d'autres stagiaires sur une journée partagée. En individuel (290€), un conseiller dédié s'occupe exclusivement de votre dossier avec un suivi personnalisé et prioritaire." },
  { question: "Puis-je prendre ce service sans avoir suivi de formation chez vous ?", answer: "Oui, ce service est ouvert à tous les chauffeurs, même ceux formés ailleurs. Il est particulièrement adapté aux personnes ayant obtenu leur carte mais bloquées par la complexité administrative." },
  { question: "Combien de temps durent les démarches après la journée ?", answer: "La journée d'accompagnement permet de lancer toutes les démarches simultanément. Les délais dépendent ensuite des organismes : préfecture 2-4 semaines, URSSAF quelques jours, plateformes variable. Nous assurons le suivi." },
  { question: "Quels documents dois-je préparer ?", answer: "Pièce d'identité, justificatif de domicile, photo d'identité, résultats d'examen T3P et permis de conduire. Nous vous envoyons une checklist complète avant votre rendez-vous." },
];

const AideAdministrativeCreationEntreprise = () => {
  const [showForm, setShowForm] = useState(false);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Aide Administrative & Création d'Entreprise pour Chauffeurs",
    description: "Accompagnement administratif complet pour chauffeurs VTC, Taxi et VMDTR à Montrouge (92). Carte pro, registre T3P, préfecture, plateformes. Dès 190€.",
    provider: { "@type": "EducationalOrganization", name: "ECOLE T3P", url: "https://ecolet3p.fr" },
    offers: [
      { "@type": "Offer", name: "En groupe", price: 190, priceCurrency: "EUR" },
      { "@type": "Offer", name: "Individuel", price: 290, priceCurrency: "EUR" },
    ],
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
      { "@type": "ListItem", position: 2, name: "Services", item: "https://www.ecolet3p.fr/formations" },
      { "@type": "ListItem", position: 3, name: "Aide administrative", item: "https://www.ecolet3p.fr/aide-administrative-creation-entreprise" },
    ],
  };

  return (
    <Layout>
      <Helmet>
        <title>Aide Administrative Chauffeur Montrouge — Dès 190€ | ECOLE T3P</title>
        <meta name="description" content="Accompagnement administratif complet pour chauffeurs VTC, Taxi, VMDTR à Montrouge (92). Carte pro, registre T3P, préfecture, plateformes. Dès 190€." />
        <link rel="canonical" href="https://www.ecolet3p.fr/aide-administrative-creation-entreprise" />
        <meta property="og:title" content="Aide Administrative Chauffeur — Dès 190€ | ECOLE T3P" />
        <meta property="og:description" content="On s'occupe de toute la paperasse. Carte pro, registre T3P, préfecture, plateformes VTC. Résultat en 1 journée." />
        <meta property="og:url" content="https://www.ecolet3p.fr/aide-administrative-creation-entreprise" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
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
            <Link to="/formations" className="hover:text-primary transition-colors">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Aide administrative</span>
          </nav>
        </div>
      </div>

      {/* 1. HERO */}
      <section className="py-12 lg:py-20 bg-primary">
        <div className="container-custom">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-white/15 text-white border border-white/20 mb-6">
              <ClipboardList className="w-4 h-4" /> Service exclusif — 100% de dossiers acceptés
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[24px] md:text-[34px] lg:text-[44px] font-bold text-white leading-tight mb-4">
              Concentrez-vous sur la route,<br />
              <span className="text-accent">on s'occupe de la paperasse</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/80 text-base md:text-lg mb-8 max-w-2xl">
              Carte professionnelle, registre T3P, préfecture, URSSAF, plateformes — 
              <strong className="text-white"> toutes vos démarches réalisées en 1 journée</strong>. 
              Zéro stress, zéro erreur, résultat garanti.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-3 mb-8">
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Clock className="w-4 h-4" /> 1 journée
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Euro className="w-4 h-4" /> Dès 190€
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <FileCheck className="w-4 h-4" /> 100% dossiers acceptés
              </span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setShowForm(true)} className="btn-cta-orange px-8 py-4 text-base font-bold rounded-lg inline-flex items-center justify-center gap-2">
                <GraduationCap className="w-5 h-5" /> Je réserve maintenant
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
              { icon: FileCheck, value: "100%", label: "Dossiers acceptés" },
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
            <h2 className="section-title">Pourquoi nous confier vos démarches ?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              L'administratif est le premier frein au lancement d'activité. 
              Nous éliminons ce frein en une journée.
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
            <h2 className="section-title">Un track record irréprochable</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              10 ans d'accompagnement administratif sans un seul dossier refusé.
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
        title="De la paperasse au premier client"
        subtitle="Nos stagiaires témoignent du gain de temps et de sérénité apporté par notre accompagnement."
        transformations={[
          {
            name: "Rachid A.", initials: "RA", formation: "Aide administrative",
            before: [
              { label: "Démarches", value: "Bloqué depuis 3 semaines" },
              { label: "Dossier préfecture", value: "Incomplet, refusé 2 fois" },
              { label: "Stress", value: "Prêt à abandonner" },
            ],
            after: [
              { label: "Démarches", value: "Tout lancé en 1 journée" },
              { label: "Dossier préfecture", value: "Accepté du premier coup" },
              { label: "Activité", value: "Première course 3 semaines après" },
            ],
            quote: "J'avais perdu 3 semaines à tourner en rond. En une journée chez ECOLE T3P, tout était réglé. Je roulais 3 semaines plus tard.",
          },
          {
            name: "Linda M.", initials: "LM", formation: "Aide administrative",
            before: [
              { label: "URSSAF", value: "Ne savait pas par où commencer" },
              { label: "Plateformes", value: "Inscription jamais finalisée" },
              { label: "Temps perdu", value: "+2 mois sans rouler" },
            ],
            after: [
              { label: "URSSAF", value: "Déclaration d'activité faite" },
              { label: "Plateformes", value: "Inscrite sur Uber, Bolt, Marcel" },
              { label: "Délai", value: "Active en 10 jours" },
            ],
            quote: "Sans leur aide, j'aurais encore perdu des mois. Ils ont tout fait en une journée, même l'inscription sur les plateformes.",
          },
          {
            name: "Jean-Pierre V.", initials: "JV", formation: "Aide administrative",
            before: [
              { label: "Assurance", value: "RC Pro non souscrite" },
              { label: "Compte pro", value: "Pas encore ouvert" },
              { label: "Situation", value: "Carte pro obtenue mais inactif" },
            ],
            after: [
              { label: "Assurance", value: "RC Pro au meilleur tarif" },
              { label: "Compte pro", value: "Ouvert et opérationnel" },
              { label: "Situation", value: "En activité, 100% en règle" },
            ],
            quote: "J'avais ma carte pro depuis 2 mois mais je ne savais pas quoi faire ensuite. Ils ont débloqué la situation en un jour.",
          },
        ]}
      />

      {/* 4. PROGRAMME STRUCTURÉ — Ce que nous faisons */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Ce que nous faisons pour vous — en détail</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Un accompagnement complet couvrant chaque étape de votre lancement administratif.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.map((svc, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 bg-card rounded-xl border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">{i + 1}</div>
                  <h3 className="font-bold text-foreground">{svc.title}</h3>
                </div>
                <ul className="space-y-2">
                  {svc.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Tarifs */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-16">
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
              { title: "Gestion d'activité", desc: "Statut juridique, comptabilité, fiscalité — 390€.", path: "/accompagnement-gestion-activite" },
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
              Arrêtez de perdre du temps en paperasse
            </h2>
            <p className="text-white/80 mb-4 max-w-2xl mx-auto text-lg">
              100% de dossiers acceptés en préfecture. 
              Toutes vos démarches lancées en 1 journée. Résultat garanti.
            </p>
            <p className="text-accent font-semibold mb-8">
              À partir de 190€ — Paiement en 4× sans frais via Alma
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => setShowForm(true)} className="btn-cta-orange px-10 py-4 text-lg font-bold rounded-lg inline-flex items-center gap-2">
                Je réserve maintenant <ArrowRight className="w-5 h-5" />
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
            <DialogTitle>Inscription — Aide administrative</DialogTitle>
          </DialogHeader>
          <StepPreRegistrationForm isOpen={showForm} onClose={() => setShowForm(false)} defaultFormation="Accompagnement Administratif" />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AideAdministrativeCreationEntreprise;
