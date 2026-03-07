import { useState } from "react";
import DynamicSEOHead from "@/components/seo/DynamicSEOHead";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home, ChevronRight, Shield, Clock, Users, CheckCircle,
  ArrowRight, Calendar, MapPin, CreditCard, Star,
  FileText, AlertTriangle, Award, Phone, Euro,
  FileCheck, HeartHandshake, Zap
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StepPreRegistrationForm from "@/components/formations/StepPreRegistrationForm";
import BeforeAfterBlock from "@/components/formations/BeforeAfterBlock";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const whyChooseUs = [
  { icon: Shield, title: "Centre agréé Préfecture 92", desc: "Agrément officiel — votre attestation est reconnue par toutes les préfectures d'Île-de-France." },
  { icon: Calendar, title: "Sessions chaque mois", desc: "Pas d'attente : choisissez la date qui vous convient parmi nos sessions mensuelles." },
  { icon: FileCheck, title: "Attestation remise le jour même", desc: "Dès la fin du stage, recevez votre attestation officielle pour la préfecture." },
  { icon: HeartHandshake, title: "Formateurs agréés", desc: "Animateurs spécialisés en sécurité routière et psychologie du conducteur." },
];

const results = [
  { value: "4 pts", label: "récupérables en un seul stage" },
  { value: "14h", label: "sur 2 jours consécutifs" },
  { value: "5.0/5", label: "sur 359 avis Google vérifiés" },
  { value: "250€", label: "tarif tout compris" },
];

const programSteps = [
  { step: "1", title: "Inscrivez-vous en ligne", desc: "Choisissez votre date et complétez votre inscription en quelques minutes." },
  { step: "2", title: "Jour 1 : Facteurs d'accidents", desc: "Analyse des comportements à risque, impact de la vitesse, de l'alcool et des distractions." },
  { step: "3", title: "Jour 2 : Perception du risque", desc: "Aspects psychologiques de la conduite et stratégies pour une conduite plus sûre." },
  { step: "4", title: "Attestation & récupération", desc: "Attestation remise le jour même, points crédités dès le lendemain." },
];

const faqs = [
  { question: "Combien de points puis-je récupérer avec un stage ?", answer: "Le stage de sensibilisation à la sécurité routière permet de récupérer jusqu'à 4 points, dans la limite du plafond de 12 points pour un permis classique (ou 6 points pour un permis probatoire). Les points sont crédités le lendemain du dernier jour de stage." },
  { question: "Combien de temps dure le stage de récupération de points ?", answer: "Le stage dure 2 jours consécutifs, soit 14 heures au total. Les horaires sont généralement de 8h30 à 17h30, avec une pause déjeuner d'une heure. La présence est obligatoire pendant toute la durée du stage." },
  { question: "Puis-je faire un stage si j'ai reçu un courrier 48SI ?", answer: "Non, le courrier 48SI signifie que votre permis est invalidé pour solde de points nul. Le stage volontaire n'est plus possible après réception de ce courrier. Vous devez repasser le permis de conduire. Consultez-nous pour connaître vos options." },
  { question: "Quand mes points seront-ils crédités après le stage ?", answer: "Les points sont crédités dès le lendemain du dernier jour de stage, après transmission de l'attestation par notre centre à la préfecture. Vous pouvez vérifier votre solde de points sur le site Télépoints du gouvernement." },
  { question: "Combien de stages puis-je effectuer par an ?", answer: "La loi impose un délai minimum d'un an et un jour entre deux stages de récupération de points. Si vous avez effectué un stage il y a moins d'un an, vous devrez attendre avant de pouvoir vous réinscrire." },
  { question: "Quels documents apporter le jour du stage ?", answer: "Vous devez présenter votre permis de conduire en cours de validité, une pièce d'identité (carte nationale d'identité ou passeport), ainsi que le relevé d'information intégral de votre permis obtenu sur Télépoints." },
  { question: "Le stage est-il obligatoire pour les permis probatoires ?", answer: "Oui, le stage est obligatoire pour les titulaires d'un permis probatoire ayant commis une infraction entraînant un retrait d'au moins 3 points. Dans ce cas, le stage doit être effectué dans les 4 mois suivant la réception du courrier 48N." },
  { question: "Comment savoir combien de points il me reste ?", answer: "Vous pouvez consulter votre solde de points gratuitement sur le site Télépoints (telepoints.info) en vous identifiant avec votre numéro de dossier et votre code confidentiel, tous deux inscrits sur votre permis de conduire." },
];

const RecuperationPoints = () => {
  const [showForm, setShowForm] = useState(false);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Stage de Récupération de Points",
    description: "Stage de sensibilisation à la sécurité routière pour récupérer jusqu'à 4 points sur votre permis de conduire. Formation agréée de 2 jours à Montrouge (92).",
    provider: { "@type": "EducationalOrganization", name: "ECOLE T3P", url: "https://ecolet3p.fr" },
    offers: { "@type": "Offer", price: 250, priceCurrency: "EUR" },
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
      { "@type": "ListItem", position: 3, name: "Récupération de Points", item: "https://www.ecolet3p.fr/stage-recuperation-points" },
    ],
  };

  return (
    <Layout>
      <DynamicSEOHead
        pageUrl="/stage-recuperation-points"
        defaultTitle="Stage Récupération de Points Montrouge 92 | ECOLE T3P"
        defaultDescription="Stage de récupération de points en 2 jours (14h) à Montrouge (92). Récupérez jusqu'à 4 points. 250€. Attestation immédiate. Sessions mensuelles."
        canonicalUrl="https://www.ecolet3p.fr/stage-recuperation-points"
      >
        <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </DynamicSEOHead>

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
            <span className="text-foreground font-medium">Récupération de Points</span>
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
              Récupérez vos points avant qu'il ne soit trop tard
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[24px] md:text-[34px] lg:text-[44px] font-bold text-white leading-tight mb-4"
            >
              Stage de Récupération de Points<br />
              <span className="text-accent">à Montrouge (92) — 250€</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-base md:text-lg mb-8 max-w-2xl"
            >
              Récupérez jusqu'à 4 points sur votre permis en seulement 2 jours. 
              Stage agréé par la préfecture, <strong className="text-white">attestation délivrée immédiatement</strong>. 
              Centre situé à Montrouge, accessible Métro ligne 4.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Euro className="w-4 h-4" /> 250€
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
                <FileText className="w-5 h-5" /> Je réserve mon stage
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

      {/* Reassurance bar */}
      <section className="bg-muted py-6 border-b border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Calendar, value: "Depuis 2014", label: "+10 ans d'expérience" },
              { icon: Shield, value: "Agréé", label: "Préfecture 92" },
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
            <h2 className="section-title">Pourquoi choisir notre stage à Montrouge ?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Un stage efficace, reconnu par la préfecture, pour préserver votre permis de conduire.
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
            <h2 className="section-title">Un stage qui fait la différence</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Depuis plus de 10 ans, nous accompagnons les conducteurs franciliens dans la préservation de leur permis.
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
        title="L'impact concret du stage"
        subtitle="Découvrez comment nos stagiaires ont sécurisé leur permis et leur activité professionnelle."
        transformations={[
          {
            name: "Moussa K.", initials: "MK", formation: "Stage récupération de points",
            before: [
              { label: "Solde", value: "3 points restants" },
              { label: "Risque", value: "Suspension imminente" },
              { label: "Impact pro", value: "Activité VTC menacée" },
            ],
            after: [
              { label: "Solde", value: "7 points récupérés" },
              { label: "Risque", value: "Permis sécurisé" },
              { label: "Impact pro", value: "Activité VTC préservée" },
            ],
            quote: "Sans le stage, j'aurais perdu mon permis et mon activité de chauffeur VTC. En 2 jours, j'ai récupéré 4 points et retrouvé la sérénité.",
          },
          {
            name: "Nadia F.", initials: "NF", formation: "Stage récupération de points",
            before: [
              { label: "Solde", value: "5 points restants" },
              { label: "Risque", value: "Prochaine infraction critique" },
              { label: "Stress", value: "Conduite anxiogène" },
            ],
            after: [
              { label: "Solde", value: "9 points" },
              { label: "Risque", value: "Marge de sécurité retrouvée" },
              { label: "Stress", value: "Conduite sereine" },
            ],
            quote: "J'ai compris mes erreurs de conduite et récupéré mes points. Les formateurs sont très professionnels et pédagogues.",
          },
          {
            name: "Thomas R.", initials: "TR", formation: "Stage récupération de points",
            before: [
              { label: "Solde", value: "2 points restants" },
              { label: "Situation", value: "Chauffeur taxi en danger" },
              { label: "Action", value: "Aucune démarche engagée" },
            ],
            after: [
              { label: "Solde", value: "6 points" },
              { label: "Situation", value: "Permis renforcé" },
              { label: "Action", value: "Stage effectué en 2 jours" },
            ],
            quote: "En tant que chauffeur taxi, mon permis c'est mon gagne-pain. Le stage m'a permis de souffler et de repartir sur de bonnes bases.",
          },
        ]}
      />

      {/* 4. PROGRAMME */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Déroulement du stage en 4 étapes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Un programme structuré de 14 heures pour récupérer vos points efficacement.
            </p>
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

          {/* Pricing */}
          <div className="max-w-md mx-auto card-t3p text-center border-2 border-primary/20">
            <h3 className="text-lg font-bold mb-2">Tarif tout compris</h3>
            <p className="text-4xl font-bold text-primary mb-4">250€</p>
            <ul className="text-sm text-muted-foreground space-y-2 mb-6 text-left">
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" /> 14h de formation sur 2 jours</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Formateurs agréés sécurité routière</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Attestation délivrée le jour même</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Transmission automatique à la préfecture</li>
            </ul>
            <button
              onClick={() => setShowForm(true)}
              className="btn-cta-orange w-full px-6 py-3.5 font-bold rounded-lg inline-flex items-center justify-center gap-2"
            >
              Je réserve mon stage <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. RÉGLEMENTATION & CONTENU SEO */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-10">
            <div>
              <h2 className="section-title mb-4">Stage de récupération de points à Montrouge (92) — Réglementation 2026</h2>
              <p className="text-muted-foreground mb-4">
                Le stage de sensibilisation à la sécurité routière est encadré par les articles R223-5 à R223-13 du Code de la route. 
                Ce stage permis à points permet à tout conducteur ayant perdu des points de récupérer jusqu'à 4 points sur son permis de conduire, 
                dans la limite du plafond légal (12 points pour un permis classique, 6 pour un permis probatoire).
              </p>
              <p className="text-muted-foreground mb-4">
                Le stage de récupération de points se déroule sur 2 jours consécutifs (14 heures au total) dans un centre agréé par la préfecture. 
                À Montrouge, ECOLE T3P dispose de l'agrément préfectoral n° 23/007 pour dispenser ces stages permis à points. 
                L'attestation de stage est transmise automatiquement à la préfecture, et les points sont crédités 
                dès le lendemain du dernier jour de formation. Notre stage est accessible depuis le 92 (Hauts-de-Seine) et le 94 (Val-de-Marne).
              </p>
            </div>

            <div>
              <h2 className="section-title mb-4">Stage permis 92 et 94 : qui peut participer ?</h2>
              <p className="text-muted-foreground mb-4">
                Pour s'inscrire à un stage volontaire de récupération de points à Montrouge, trois conditions doivent être réunies : 
                disposer d'au moins 1 point restant sur le permis, ne pas avoir effectué de stage dans les 12 derniers mois, 
                et ne pas avoir reçu de courrier 48SI signifiant l'invalidation du permis pour solde nul. Notre stage permis à points 
                accueille des conducteurs de tout le 92 et le 94.
              </p>
              <p className="text-muted-foreground mb-4">
                Les titulaires d'un permis probatoire ayant commis une infraction entraînant un retrait de 3 points ou plus 
                sont tenus d'effectuer un stage obligatoire dans les 4 mois suivant la réception du courrier 48N. 
                Dans ce cas, le stage 4 points permis permet de récupérer les points retirés et d'être remboursé de l'amende forfaitaire.
              </p>
            </div>

            <div>
              <h2 className="section-title mb-4">Pourquoi anticiper la perte de points ?</h2>
              <p className="text-muted-foreground mb-4">
                Pour les chauffeurs professionnels (VTC, Taxi, VMDTR), le permis de conduire est un outil de travail indispensable. 
                Une suspension ou une invalidation signifie l'arrêt immédiat de l'activité et donc une perte de revenus importante. 
                Le stage de récupération de points à Montrouge est un investissement préventif qui sécurise votre carrière de chauffeur professionnel.
              </p>
              <p className="text-muted-foreground">
                Accessible en métro ligne 4, notre centre accueille les conducteurs du 92 (Bagneux, Malakoff, Châtillon, Boulogne-Billancourt, Nanterre) 
                et du 94 (Créteil, Ivry-sur-Seine, Vitry-sur-Seine, Villejuif). Le contenu pédagogique du stage vous permet de prendre conscience 
                de vos comportements à risque et d'adopter une conduite plus sûre au quotidien.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ STRATÉGIQUE */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Questions fréquentes sur le stage</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Tout ce que vous devez savoir sur le stage de récupération de points.
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
              { title: "Devenir chauffeur VTC en 2026", desc: "Le guide complet pour obtenir votre carte professionnelle VTC.", path: "/blog/devenir-chauffeur-vtc-2026" },
              { title: "Devenir chauffeur Taxi en 2026", desc: "Toutes les étapes pour lancer votre activité Taxi.", path: "/blog/devenir-chauffeur-taxi-2026" },
              { title: "Statuts juridiques du chauffeur T3P", desc: "Micro-entreprise, SASU, EURL : quel statut choisir ?", path: "/blog/statuts-juridiques-chauffeur-t3p" },
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
              { title: "Formation initiale VTC", desc: "Devenez chauffeur VTC — à partir de 990€.", path: "/formations/vtc" },
              { title: "Formation initiale Taxi", desc: "Obtenez votre carte professionnelle Taxi — à partir de 990€.", path: "/formations/taxi" },
              { title: "Renouvellement carte pro", desc: "Formation continue obligatoire tous les 5 ans — 350€.", path: "/renouvellement-carte-professionnelle" },
              { title: "Passerelle VTC ↔ Taxi", desc: "Doublez vos opportunités — 665€ tout compris.", path: "/passerelle-vtc-taxi" },
              { title: "Formation VMDTR", desc: "Devenez chauffeur moto — à partir de 990€.", path: "/formations/vmdtr" },
              { title: "Contact", desc: "Réservez votre place au prochain stage.", path: "/contact" },
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
              N'attendez pas de perdre votre permis
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Préservez votre permis dès maintenant
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg">
              Inscrivez-vous à notre prochain stage et récupérez jusqu'à 4 points en seulement 2 jours. 
              250€ tout compris, attestation immédiate.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setShowForm(true)}
                className="btn-cta-orange px-10 py-4 text-lg font-bold rounded-lg inline-flex items-center gap-2"
              >
                Je réserve mon stage <ArrowRight className="w-5 h-5" />
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
            <DialogTitle>Inscription — Stage Récupération de Points</DialogTitle>
          </DialogHeader>
          <StepPreRegistrationForm
            isOpen={showForm}
            onClose={() => setShowForm(false)}
            defaultFormation="Stage Récupération de Points"
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default RecuperationPoints;
