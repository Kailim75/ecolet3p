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
import BeforeAfterBlock from "@/components/formations/BeforeAfterBlock";
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
  { question: "Que se passe-t-il si ma carte est expirée ?", answer: "Si votre carte est expirée, vous ne pouvez plus exercer légalement. Vous risquez une amende pouvant aller jusqu'à 1 500€ et la saisie de votre véhicule. Contactez-nous immédiatement — nous pouvons vous inscrire à la prochaine session disponible." },
  { question: "La formation continue est-elle la même pour VTC et Taxi ?", answer: "Non, le contenu est adapté à chaque profession. Les modules réglementaires et pratiques sont spécifiques à votre activité (VTC, Taxi ou VMDTR). Le tarif est identique : 350€." },
  { question: "Quels documents sont nécessaires pour le renouvellement ?", answer: "Votre carte professionnelle en cours, l'attestation de formation continue (délivrée par ECOLE T3P), un justificatif de domicile, une photo d'identité et un extrait de casier judiciaire (bulletin n°3) de moins de 3 mois." },
  { question: "Combien de temps dure la procédure de renouvellement ?", answer: "Une fois votre dossier complet déposé en préfecture, le délai de traitement est généralement de 2 à 4 semaines. Nous vous accompagnons pour garantir que votre dossier est complet du premier coup." },
  { question: "Puis-je exercer pendant le renouvellement ?", answer: "Tant que votre carte n'est pas expirée et que vous avez entamé les démarches de renouvellement dans les délais, vous pouvez continuer à exercer. En revanche, exercer avec une carte expirée est strictement interdit et passible de sanctions." },
  { question: "La formation continue aborde-t-elle les évolutions réglementaires 2026 ?", answer: "Oui, le programme est mis à jour chaque année. En 2026, il intègre les évolutions sur les Zones à Faibles Émissions (ZFE), la réglementation tarifaire, les obligations environnementales et les nouveaux outils numériques pour les chauffeurs." },
  { question: "Quel est le contenu de la formation continue ?", answer: "La formation de 14h couvre la mise à jour réglementaire, la sécurité routière et l'éco-conduite, l'accueil et la relation client, la gestion financière de l'activité, ainsi que les évolutions du marché du transport de personnes." },
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

      {/* 3. RÉSULTATS */}
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

      {/* AVANT / APRÈS */}
      <BeforeAfterBlock
        title="Ce que le renouvellement change concrètement"
        subtitle="Nos stagiaires repartent avec bien plus qu'une attestation — ils repartent avec des outils concrets."
        transformations={[
          {
            name: "Ahmed B.", initials: "AB", formation: "Continue Taxi",
            before: [
              { label: "Conformité", value: "Carte bientôt expirée" },
              { label: "Connaissance", value: "Réglementation ZFE floue" },
              { label: "Risque", value: "Contrôle = sanction possible" },
            ],
            after: [
              { label: "Conformité", value: "Carte renouvelée 5 ans" },
              { label: "Connaissance", value: "ZFE et réforme tarifaire maîtrisées" },
              { label: "Sérénité", value: "100% en règle, zéro stress" },
            ],
            quote: "La formation m'a mis à jour sur les nouvelles ZFE et la réforme tarifaire. Je me sens serein pour les 5 prochaines années.",
          },
          {
            name: "Fatima R.", initials: "FR", formation: "Continue VTC",
            before: [
              { label: "Gestion", value: "Charges mal optimisées" },
              { label: "Outils", value: "Aucun logiciel de suivi" },
              { label: "Revenus nets", value: "1 800€/mois" },
            ],
            after: [
              { label: "Gestion", value: "Charges réduites de 200€/mois" },
              { label: "Outils", value: "Applications de gestion adoptées" },
              { label: "Revenus nets", value: "2 200€/mois" },
            ],
            quote: "Grâce aux conseils fiscaux de la formation continue, j'économise plus de 200€ par mois sur mes charges.",
          },
          {
            name: "Ibrahima D.", initials: "ID", formation: "Continue VMDTR",
            before: [
              { label: "Sécurité", value: "Conduite non évaluée depuis 5 ans" },
              { label: "PMR", value: "Aucune formation PMR" },
              { label: "Clients", value: "Clientèle classique uniquement" },
            ],
            after: [
              { label: "Sécurité", value: "Éco-conduite et prévention à jour" },
              { label: "PMR", value: "Sensibilisé à l'accueil PMR" },
              { label: "Clients", value: "Clientèle élargie au PMR" },
            ],
            quote: "La partie éco-conduite m'a fait prendre conscience de mes mauvaises habitudes. Je conduis mieux et j'économise du carburant.",
          },
        ]}
      />

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
                  Réserver ma place <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RÉGLEMENTATION & CONTENU SEO */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-10">
            <div>
              <h2 className="section-title mb-4">Réglementation du renouvellement de carte professionnelle en 2026</h2>
              <p className="text-muted-foreground mb-4">
                Conformément à l'article R3120-7 du Code des transports, tout chauffeur VTC, Taxi ou VMDTR doit renouveler 
                sa carte professionnelle tous les 5 ans. Le renouvellement est conditionné à la réalisation d'une formation 
                continue de 14 heures auprès d'un centre de formation agréé par la préfecture. ECOLE T3P, agréé sous le 
                numéro 23/007, dispense cette formation continue dans son centre de Montrouge (92).
              </p>
              <p className="text-muted-foreground mb-4">
                La demande de renouvellement doit être effectuée auprès de la préfecture dans les 3 mois précédant la date 
                d'expiration de la carte. Le dossier comprend l'attestation de formation continue, un justificatif de domicile, 
                une photo d'identité et un extrait de casier judiciaire (bulletin n°3) de moins de 3 mois.
              </p>
            </div>

            <div>
              <h2 className="section-title mb-4">Quels sont les risques en cas de carte expirée ?</h2>
              <p className="text-muted-foreground mb-4">
                Exercer avec une carte professionnelle expirée constitue une infraction passible d'une amende de 1 500€ 
                et de l'immobilisation du véhicule. En cas de contrôle, le chauffeur s'expose également à la suspension 
                de son autorisation d'exercer et à des poursuites pénales. Pour les chauffeurs Taxi, cela peut entraîner 
                la perte de l'autorisation de stationnement (ADS).
              </p>
              <p className="text-muted-foreground">
                Au-delà des sanctions, une carte expirée invalide votre couverture d'assurance professionnelle. 
                En cas d'accident, vous ne seriez pas couvert, avec des conséquences financières potentiellement désastreuses. 
                C'est pourquoi nous recommandons d'anticiper et de vous inscrire à la formation continue dès que possible.
              </p>
            </div>

            <div>
              <h2 className="section-title mb-4">Le programme de la formation continue</h2>
              <p className="text-muted-foreground mb-4">
                La formation continue de 14 heures est structurée autour de 5 axes principaux : la mise à jour réglementaire 
                (ZFE, tarification, obligations environnementales), la sécurité routière et l'éco-conduite, 
                l'accueil et la qualité de service, la gestion financière de l'activité (charges sociales à 21,2%, 
                franchise TVA à 37 500€), et les évolutions technologiques du secteur.
              </p>
              <p className="text-muted-foreground">
                Le contenu est adapté à chaque profession (VTC, Taxi ou VMDTR) pour répondre aux spécificités 
                réglementaires et pratiques de chaque métier. Les formateurs sont des professionnels du secteur 
                qui partagent leur expertise terrain en plus des connaissances théoriques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ STRATÉGIQUE */}
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

      {/* Articles utiles */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="section-title text-center mb-8">Articles utiles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { title: "Formation continue VTC, Taxi, VMDTR", desc: "Tout savoir sur l'obligation de formation continue pour les chauffeurs T3P.", path: "/blog/formation-continue-vtc-taxi-vmdtr" },
              { title: "Carte professionnelle VTC : le guide", desc: "Comment obtenir et renouveler votre carte professionnelle VTC.", path: "/blog/carte-professionnelle-vtc-guide-complet" },
              { title: "Financer sa formation de chauffeur", desc: "Les solutions de financement pour votre formation T3P.", path: "/blog/financer-formation-chauffeur" },
            ].map((link, i) => (
              <Link key={i} to={link.path} className="card-t3p group">
                <h3 className="text-sm font-semibold text-primary mb-1 group-hover:text-accent transition-colors">{link.title}</h3>
                <p className="text-xs text-muted-foreground">{link.desc}</p>
                <span className="text-xs font-semibold text-accent mt-2 inline-flex items-center gap-1">
                  Lire l'article <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <h2 className="section-title text-center mb-8">Complétez votre parcours</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { title: "Passerelle VTC ↔ Taxi", desc: "Obtenez une double carte professionnelle — 665€.", path: "/passerelle-vtc-taxi" },
              { title: "Formation Accessibilité PMR", desc: "Élargissez votre clientèle au transport PMR — 290€.", path: "/formation-accessibilite-pmr" },
              { title: "Formation initiale VTC", desc: "Devenez chauffeur VTC — 990€ tout compris.", path: "/formations/vtc" },
              { title: "Formation initiale Taxi", desc: "Obtenez votre carte professionnelle Taxi — 990€.", path: "/formations/taxi" },
              { title: "Gestion d'entreprise", desc: "Lancez votre activité sur des bases solides — 390€.", path: "/accompagnement-gestion-activite" },
              { title: "Stage récupération de points", desc: "Récupérez jusqu'à 4 points — 250€.", path: "/stage-recuperation-points" },
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

      {/* 7. CTA FINAL */}
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
            <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg">
              Sessions disponibles chaque semaine. Attestation délivrée le jour même. 
              350€ payable en 4× sans frais.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
