import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  RefreshCw, Check, ArrowRight, Phone, Star, Home, ChevronRight,
  GraduationCap, Car, Bike, Clock, Euro, Shield, HelpCircle, AlertCircle
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import carteProfessionnelle from "@/assets/carte-professionnelle-taxi.png";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StepPreRegistrationForm from "@/components/formations/StepPreRegistrationForm";

const formations = [
  {
    id: "vtc",
    label: "Renouvellement VTC",
    icon: Car,
    color: "#1B4332",
    bgColor: "rgba(27,67,50,0.08)",
    price: 170,
    duration: "14h",
    format: "2 jours",
    path: "/formations/continue-vtc",
    badge: "Formation Continue VTC",
    highlights: [
      "Réglementation VTC 2026",
      "ZFE Grand Paris & Crit'Air",
      "Optimisation revenus Uber/Bolt",
      "Gestion fiscale auto-entrepreneur",
      "Attestation le jour même",
    ],
    description: "Obligatoire tous les 5 ans. Maintien de la carte professionnelle VTC.",
    cta: "Réserver ma place VTC",
  },
  {
    id: "taxi",
    label: "Renouvellement Taxi",
    icon: Car,
    color: "#E8793A",
    bgColor: "rgba(232,121,58,0.08)",
    price: 239,
    duration: "14h",
    format: "2 jours",
    path: "/formations/continue-taxi",
    badge: "Formation Continue Taxi",
    highlights: [
      "Réglementation taxi 2026",
      "Tarification & zones tarifaires",
      "Calculateur renouvellement intégré",
      "Sécurité routière & conduite",
      "Attestation le jour même",
    ],
    description: "Obligatoire tous les 5 ans. Maintien de la carte professionnelle Taxi.",
    cta: "Réserver ma place Taxi",
  },
  {
    id: "vmdtr",
    label: "Renouvellement VMDTR",
    icon: Bike,
    color: "#1B4332",
    bgColor: "rgba(27,67,50,0.08)",
    price: 239,
    duration: "7h",
    format: "1 jour",
    path: "/formations/continue-vmdtr",
    badge: "Formation Continue VMDTR",
    highlights: [
      "Réglementation moto-taxi 2026",
      "Sécurité & équipements obligatoires",
      "Zone de circulation légale",
      "Législation spécifique VMDTR",
      "Attestation le jour même",
    ],
    description: "Obligatoire tous les 5 ans. Maintien de la carte professionnelle VMDTR.",
    cta: "Réserver ma place VMDTR",
  },
];

const comparisonRows = [
  { label: "Durée", vtc: "14h (2 jours)", taxi: "14h (2 jours)", vmdtr: "7h (1 jour)" },
  { label: "Prix TTC", vtc: "170€", taxi: "239€", vmdtr: "239€" },
  { label: "Fréquence obligatoire", vtc: "Tous les 5 ans", taxi: "Tous les 5 ans", vmdtr: "Tous les 5 ans" },
  { label: "Attestation", vtc: "Le jour même", taxi: "Le jour même", vmdtr: "Le jour même" },
  { label: "Format", vtc: "Présentiel Montrouge", taxi: "Présentiel Montrouge", vmdtr: "Présentiel Montrouge" },
  { label: "Agrément préfecture", vtc: "✓ Hauts-de-Seine", taxi: "✓ Hauts-de-Seine", vmdtr: "✓ Hauts-de-Seine" },
];

const faqs = [
  {
    question: "Qui est concerné par la formation continue obligatoire ?",
    answer: "Tout titulaire d'une carte professionnelle de conducteur VTC, Taxi ou VMDTR (moto-taxi) doit effectuer une formation continue de maintien et de perfectionnement tous les 5 ans pour pouvoir renouveler sa carte. Cette obligation s'applique à tous les chauffeurs en activité ou en période d'inactivité, dès lors qu'ils souhaitent conserver leur carte professionnelle.",
  },
  {
    question: "Quelle est la différence entre formation initiale et formation continue ?",
    answer: "La formation initiale est celle que vous suivez pour obtenir votre première carte professionnelle (à partir de 990€, plusieurs semaines). La formation continue est un stage de remise à niveau (7h à 14h selon le métier) obligatoire tous les 5 ans pour renouveler votre carte. Les deux sont distinctes et non interchangeables.",
  },
  {
    question: "Que se passe-t-il si je ne fais pas ma formation continue à temps ?",
    answer: "Si votre carte professionnelle expire sans que vous ayez effectué votre formation continue, vous ne pouvez plus exercer légalement votre activité. Vous risquez une amende et la confiscation de votre véhicule si vous continuez à exercer. La préfecture refusera le renouvellement de votre carte sans l'attestation de formation continue.",
  },
  {
    question: "Puis-je faire ma formation continue si ma carte est déjà expirée ?",
    answer: "Oui, vous pouvez suivre la formation continue même si votre carte est expirée. Cependant, vous ne pourrez pas exercer votre activité pendant la période d'expiration. Nous vous conseillons de planifier votre formation 3 à 6 mois avant la date d'expiration de votre carte pour éviter toute interruption d'activité.",
  },
  {
    question: "Combien de temps à l'avance dois-je m'inscrire ?",
    answer: "Nous vous recommandons de vous inscrire au moins 1 mois à l'avance pour garantir une place dans la session de votre choix. Les inscriptions sont possibles jusqu'à la veille de la session sous réserve de disponibilité. Pour les cas urgents (carte expirant dans moins d'un mois), contactez-nous directement par téléphone.",
  },
  {
    question: "L'attestation de formation continue est-elle délivrée le jour même ?",
    answer: "Oui, ECOLE T3P vous remet votre attestation de formation continue en fin de stage, le jour même. Ce document officiel vous permet d'engager immédiatement vos démarches de renouvellement auprès de la préfecture. Le délai de traitement par la préfecture est ensuite de 2 à 4 semaines environ.",
  },
  {
    question: "Peut-on financer la formation continue ?",
    answer: "La formation continue (170€ à 239€) n'est pas éligible au CPF en raison de son tarif inférieur aux seuils CPF. Son prix accessible permet un financement personnel direct. Pour les auto-entrepreneurs, cette dépense est déductible du chiffre d'affaires comme frais professionnel. Les salariés peuvent se tourner vers leur OPCO via une convention de formation.",
  },
  {
    question: "ECOLE T3P est-il agréé pour la formation continue ?",
    answer: "Oui, ECOLE T3P est un centre agréé par la préfecture des Hauts-de-Seine (numéro d'agrément 23/007) pour dispenser les formations continues VTC, Taxi et VMDTR. Nos attestations sont reconnues par toutes les préfectures d'Île-de-France. Nous sommes également certifiés Qualiopi.",
  },
  {
    question: "Faut-il être en région Île-de-France pour s'inscrire ?",
    answer: "Non, notre centre de Montrouge accepte des chauffeurs de toute la France. La préfecture de délivrance de votre carte n'a pas d'importance : notre attestation de formation continue est valable sur tout le territoire national. Montrouge est facilement accessible depuis Paris (métro ligne 13, bus, RER).",
  },
];

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(f => ({
    "@type": "Question",
    "name": f.question,
    "acceptedAnswer": { "@type": "Answer", "text": f.answer },
  })),
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "ECOLE T3P",
  "url": "https://www.ecolet3p.fr",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3 rue Corneille",
    "addressLocality": "Montrouge",
    "postalCode": "92120",
    "addressCountry": "FR",
  },
  "telephone": "+33188750555",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Formations continues T3P",
    "itemListElement": formations.map(f => ({
      "@type": "Course",
      "name": f.label,
      "offers": { "@type": "Offer", "price": f.price, "priceCurrency": "EUR" },
    })),
  },
};

const FormationRenouvellement = () => {
  const [activeFormation, setActiveFormation] = useState<string | null>(null);

  return (
    <Layout>
      <Helmet>
        <title>Renouvellement Carte Professionnelle VTC Taxi VMDTR — ECOLE T3P Montrouge</title>
        <meta
          name="description"
          content="Renouvelez votre carte professionnelle VTC, Taxi ou VMDTR avec ECOLE T3P Montrouge (92). Formation continue agréée préfecture. Attestation le jour même. Dès 170€."
        />
        <link rel="canonical" href="https://www.ecolet3p.fr/formations/renouvellement" />
        <meta property="og:title" content="Renouvellement Carte Pro VTC Taxi VMDTR — ECOLE T3P" />
        <meta property="og:description" content="Formation continue obligatoire pour renouveler votre carte professionnelle de chauffeur. Agréé préfecture 92. Attestation immédiate. Dès 170€." />
        <meta property="og:url" content="https://www.ecolet3p.fr/formations/renouvellement" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.ecolet3p.fr/og-image.jpg" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="ECOLE T3P" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-muted py-3 border-b border-border mt-16">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Fil d'Ariane">
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" /> Accueil
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/formations" className="hover:text-primary transition-colors">Formations</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Renouvellement carte professionnelle</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 lg:py-24 bg-primary relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${carteProfessionnelle})` }}
        />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 0%, transparent 60%)" }} />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/15 text-white mb-5">
              <RefreshCw className="w-4 h-4" /> Formation continue obligatoire
            </span>
            <h1 className="text-[28px] md:text-[40px] lg:text-[52px] font-bold text-white leading-tight mb-5">
              Renouvelez votre carte professionnelle<br />
              <span className="text-accent">VTC, Taxi ou VMDTR</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg mb-8 max-w-2xl">
              Formation continue obligatoire tous les 5 ans. Centre agréé préfecture des Hauts-de-Seine.
              Attestation délivrée le jour même à Montrouge (92). Dès 170€.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, text: "Agréé préfecture 92" },
                { icon: Star, text: "Note 5/5 — 359 avis" },
                { icon: Clock, text: "Attestation le jour même" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                  <Icon className="w-4 h-4" /> {text}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:0188750555"
                className="btn-cta-orange px-8 py-4 text-base font-bold rounded-lg inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" /> 01 88 75 05 55
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white hover:text-primary transition-all"
              >
                Nous écrire <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Alert réglementaire */}
      <section className="py-6 bg-accent/10 border-b border-accent/20">
        <div className="container-custom">
          <div className="flex items-start gap-3 max-w-3xl mx-auto">
            <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">
              <strong>Obligation légale :</strong> Sans formation continue validée, votre carte professionnelle ne peut être renouvelée par la préfecture.
              Toute activité avec une carte expirée est passible de sanctions. Anticipez 3 à 6 mois avant la date d'expiration.
            </p>
          </div>
        </div>
      </section>

      {/* Cards formations */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="section-title mb-3">Choisissez votre formation continue</h2>
            <p className="section-subtitle mx-auto">3 formations adaptées à chaque métier du transport de personnes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {formations.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="card-t3p flex flex-col border-2 hover:shadow-lg transition-all duration-300"
                  style={{ borderColor: activeFormation === f.id ? f.color : "transparent" }}
                  onMouseEnter={() => setActiveFormation(f.id)}
                  onMouseLeave={() => setActiveFormation(null)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: f.bgColor }}>
                      <Icon className="w-5 h-5" style={{ color: f.color }} />
                    </div>
                    <h3 className="font-bold text-foreground">{f.label}</h3>
                  </div>

                  <p className="text-xs text-muted-foreground mb-4">{f.description}</p>

                  <div className="flex gap-2 mb-4">
                    <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-foreground">
                      <Clock className="w-3 h-3" /> {f.duration}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-foreground">
                      <Euro className="w-3 h-3" /> {f.price}€
                    </span>
                  </div>

                  <ul className="space-y-2 mb-6 flex-1">
                    {f.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary shrink-0" /> {h}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={f.path}
                    className="w-full py-3 rounded-lg font-bold text-sm text-center inline-flex items-center justify-center gap-2 transition-colors"
                    style={{ backgroundColor: f.color, color: "white" }}
                  >
                    {f.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tableau comparatif */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="section-title mb-3">Tableau comparatif</h2>
            <p className="section-subtitle mx-auto">VTC vs Taxi vs VMDTR — les différences en un coup d'œil</p>
          </div>

          <div className="max-w-4xl mx-auto overflow-x-auto rounded-xl border border-border shadow-sm">
            <table className="w-full bg-card text-sm">
              <thead>
                <tr className="bg-primary">
                  <th className="text-left px-5 py-4 text-white font-semibold">Critère</th>
                  <th className="text-center px-5 py-4 text-white font-semibold">VTC</th>
                  <th className="text-center px-5 py-4 text-white font-semibold">Taxi</th>
                  <th className="text-center px-5 py-4 text-white font-semibold">VMDTR</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-card" : "bg-muted/50"}>
                    <td className="px-5 py-3.5 font-medium text-foreground">{row.label}</td>
                    <td className="px-5 py-3.5 text-center text-muted-foreground">{row.vtc}</td>
                    <td className="px-5 py-3.5 text-center text-muted-foreground">{row.taxi}</td>
                    <td className="px-5 py-3.5 text-center text-muted-foreground">{row.vmdtr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Processus renouvellement */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="section-title mb-3">Comment renouveler votre carte professionnelle ?</h2>
            <p className="section-subtitle mx-auto">4 étapes simples pour renouveler votre carte en toute sérénité</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Vérifiez la date", desc: "Consultez la date d'expiration de votre carte professionnelle. Planifiez la formation 3 à 6 mois avant." },
              { step: "02", title: "Choisissez votre formation", desc: "Sélectionnez la formation continue adaptée à votre carte (VTC, Taxi ou VMDTR) et inscrivez-vous." },
              { step: "03", title: "Suivez le stage", desc: "Participez à votre stage de 7h à 14h dans notre centre de Montrouge. Attestation remise le jour même." },
              { step: "04", title: "Déposez votre dossier", desc: "Déposez votre dossier complet à la préfecture. Délai de traitement : 2 à 4 semaines environ." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="card-t3p text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {step}
                </div>
                <h3 className="font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignage */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto card-t3p">
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <p className="text-base text-foreground italic mb-5">
              "J'avais oublié de faire ma formation continue VTC et ma carte expirait dans 3 semaines. J'ai appelé ECOLE T3P un lundi,
              j'étais en formation le mercredi et j'ai déposé mon dossier à la préfecture le vendredi avec mon attestation. Le centre est
              très professionnel, les formateurs connaissent parfaitement les exigences de la préfecture. Je recommande vivement."
            </p>
            <p className="font-semibold text-foreground">Karim B.</p>
            <p className="text-sm text-muted-foreground">Chauffeur VTC — Renouvellement en urgence, mars 2026</p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <div className="space-y-10">
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">Qu'est-ce que la formation continue obligatoire pour les T3P ?</h2>
              <p className="text-muted-foreground leading-relaxed">
                La formation continue de maintien et de perfectionnement (FCMP) est une obligation légale pour tous les conducteurs de voiture de transport avec chauffeur (VTC), taxis et véhicules motorisés à deux ou trois roues (VMDTR). Instaurée par la loi Grandguillaume de 2016 et ses décrets d'application, elle impose à chaque chauffeur professionnel de suivre un stage de remise à niveau tous les 5 ans pour conserver leur carte professionnelle.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                ECOLE T3P est l'un des rares centres en Île-de-France à proposer les 3 formations continues dans un seul et même lieu, avec des sessions chaque semaine. Notre agrément préfectoral n° 23/007 garantit la conformité de nos attestations pour toutes les démarches auprès des préfectures françaises.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">Pourquoi choisir ECOLE T3P pour votre renouvellement ?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "+2 000 chauffeurs formés", desc: "Depuis 2019, nous avons accompagné plus de 2 000 chauffeurs dans le renouvellement de leur carte professionnelle." },
                  { title: "Attestation le jour même", desc: "Vous repartez avec votre attestation officielle en fin de stage. Pas de délai d'attente pour engager vos démarches." },
                  { title: "Sessions chaque semaine", desc: "Nos sessions de formation continue se tiennent chaque semaine, y compris certains samedis pour les chauffeurs en activité." },
                  { title: "Accompagnement dossier", desc: "Nos équipes vous guident dans la constitution de votre dossier de renouvellement pour maximiser vos chances d'acceptation." },
                ].map(({ title, desc }) => (
                  <div key={title} className="card-t3p">
                    <h3 className="font-bold text-primary mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">Documents nécessaires pour le renouvellement de carte professionnelle</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Pour constituer votre dossier de renouvellement auprès de la préfecture, vous aurez besoin des documents suivants :
              </p>
              <ul className="space-y-3">
                {[
                  "Attestation de formation continue (délivrée par ECOLE T3P)",
                  "Carte professionnelle en cours de validité ou récépissé de demande",
                  "Pièce d'identité en cours de validité (carte nationale d'identité ou passeport)",
                  "Justificatif de domicile de moins de 3 mois",
                  "Extrait de casier judiciaire n°2 (fourni automatiquement via internet)",
                  "Certificat médical d'aptitude à la conduite de moins de 2 ans",
                  "Formulaire Cerfa de demande de renouvellement",
                ].map((doc) => (
                  <li key={doc} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border bg-background text-primary border-primary/20">
              <HelpCircle className="w-4 h-4" /> Questions fréquentes
            </span>
            <h2 className="section-title mb-3">Tout savoir sur le renouvellement</h2>
            <p className="section-subtitle mx-auto">Les réponses aux questions les plus posées par les chauffeurs</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-5">
                  <AccordionTrigger className="text-left text-sm font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent forceMount className="text-sm text-muted-foreground data-[state=closed]:hidden">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Maillage interne — formations associées */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="section-title text-center mb-8">Formations associées</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { title: "Formation initiale VTC", desc: "Obtenez votre première carte professionnelle VTC — à partir de 990€", path: "/formations/vtc" },
              { title: "Formation initiale Taxi", desc: "Obtenez votre première carte professionnelle Taxi — à partir de 990€", path: "/formations/taxi" },
              { title: "Formation initiale VMDTR", desc: "Obtenez votre première carte professionnelle VMDTR — à partir de 990€", path: "/formations/vmdtr" },
              { title: "Passerelle VTC ↔ Taxi", desc: "Doublez vos revenus avec une seconde carte professionnelle — 665€", path: "/passerelle-vtc-taxi" },
              { title: "Stage récupération de points", desc: "Récupérez jusqu'à 4 points sur votre permis de conduire", path: "/stage-recuperation-points" },
              { title: "Formation accessibilité PMR", desc: "Obligatoire pour transporter des personnes à mobilité réduite", path: "/formation-accessibilite-pmr" },
            ].map((link) => (
              <Link key={link.path} to={link.path} className="card-t3p group hover:shadow-md transition-all">
                <h3 className="text-sm font-semibold text-primary mb-1 group-hover:text-accent transition-colors">{link.title}</h3>
                <p className="text-xs text-muted-foreground">{link.desc}</p>
                <span className="text-xs font-semibold text-accent mt-2 inline-flex items-center gap-1">
                  En savoir plus <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-primary">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Besoin de renouveler votre carte professionnelle ?
          </h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            Appelez-nous ou écrivez-nous. Nous vous trouverons la prochaine session disponible et vous accompagnerons dans toutes vos démarches.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:0188750555"
              className="btn-cta-orange px-8 py-4 font-bold rounded-lg inline-flex items-center gap-2"
            >
              <Phone className="w-5 h-5" /> 01 88 75 05 55
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white hover:text-primary transition-all"
            >
              Nous écrire <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FormationRenouvellement;
