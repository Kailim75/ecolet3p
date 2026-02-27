import { lazy, Suspense, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home, ChevronRight, MessageCircle, Phone, MapPin, Clock,
  Mail, CheckCircle2, ArrowRight, Shield, Award, Users, Star,
  Briefcase, TrendingUp, GraduationCap, Building2
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import auditBg from "@/assets/audit-rentabilite-bg.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Lazy-load the heavy audit module
const AuditRentabiliteModule = lazy(() => import("@/components/home-v2/AuditRentabiliteModule"));

/* ── Config ── */
const WHATSAPP_PHONE_E164 = "33783787663";
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_PHONE_E164}`;

function buildWhatsAppUrl(message: string) {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

const defaultWhatsAppMessage =
  "Bonjour École T3P, je viens de faire l'Audit Rentabilité Chauffeur. Je souhaite échanger pour finaliser mon projet.";

/* ── Schema.org ── */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.ecolet3p.fr/#organization",
  name: "ECOLE T3P",
  description: "Centre de formation agréé pour chauffeurs Taxi, VTC et VMDTR à Montrouge, Île-de-France.",
  url: "https://www.ecolet3p.fr",
  telephone: "+33188750555",
  email: "montrouge@ecolet3p.fr",
  image: "https://www.ecolet3p.fr/og-image.jpg",
  logo: "https://www.ecolet3p.fr/logo/ecole-t3p-favicon.svg",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3 rue Corneille",
    addressLocality: "Montrouge",
    postalCode: "92120",
    addressRegion: "Île-de-France",
    addressCountry: "FR",
  },
  geo: { "@type": "GeoCoordinates", latitude: 48.8155, longitude: 2.3137 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:30", closes: "18:00" },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", bestRating: "5", worstRating: "1", ratingCount: "359" },
};

const faqItems = [
  { q: "Comment estimer ma rentabilité en tant que chauffeur VTC ou Taxi ?", a: "Notre audit gratuit en ligne calcule votre chiffre d'affaires, déduit les charges (commission plateforme, charges sociales, charges fixes) et affiche votre net mensuel estimé selon votre statut juridique." },
  { q: "Quel statut juridique choisir : micro-entreprise, SASU ou EURL ?", a: "La micro-entreprise est idéale pour démarrer (charges sociales ~22% du CA après commission). La SASU convient aux revenus élevés (IS à 15%). L'EURL (TNS) offre une couverture sociale complète avec des cotisations de ~45%." },
  { q: "Combien gagne un chauffeur VTC en moyenne par mois ?", a: "Avec 22 jours travaillés, 8h/jour et un revenu horaire de 25€, le CA mensuel est d'environ 4 400€. Après déduction des charges (commission, cotisations, frais fixes), le net se situe entre 1 500€ et 2 800€ selon le statut juridique." },
  { q: "Combien coûte la formation Taxi ou VTC à l'École T3P ?", a: "La formation est à partir de 990€ (formule Essentiel) ou 1 190€ (formule Premium), frais d'examen CMA de 241€ inclus. Paiement en 4× sans frais possible avec Alma." },
  { q: "En combien de temps la formation est-elle rentabilisée ?", a: "Selon notre audit, la formation est généralement rentabilisée en 10 à 30 jours d'activité, selon votre rythme de travail et votre statut juridique." },
  { q: "Quels sont les formats de formation disponibles ?", a: "3 formats au même tarif : Journée (1 semaine intensive), Soir (2 semaines en soirée) et E-learning (accès illimité jusqu'à l'examen)." },
  { q: "Quel est le taux de réussite à l'examen ?", a: "Notre taux de réussite est de 94%, très supérieur à la moyenne nationale. Plus de 2 000 chauffeurs ont été formés depuis 2014." },
  { q: "Comment financer ma formation sans le CPF ?", a: "Le CPF n'est pas éligible pour les formations T3P. Le financement se fait en direct avec paiement en 4× sans frais via Alma, soit ~247,50€/mois." },
  { q: "Où se trouve le centre de formation ?", a: "ECOLE T3P est située au 3 rue Corneille, 92120 Montrouge, à 2 minutes à pied du métro Mairie de Montrouge (Ligne 4). Nous sommes facilement accessibles depuis Paris et toute l'Île-de-France." },
  { q: "Comment obtenir un audit personnalisé ?", a: "Utilisez notre simulateur gratuit sur cette page puis envoyez vos résultats directement sur WhatsApp. Un conseiller vous recontactera sous 24h pour un accompagnement personnalisé." },
  { q: "Puis-je exercer comme VTC et Taxi en même temps ?", a: "Oui, grâce à la passerelle VTC-Taxi. Si vous possédez déjà une carte professionnelle VTC, vous pouvez passer l'examen Taxi complémentaire (et inversement) via notre formation passerelle à 665€." },
  { q: "Quelles charges dois-je prévoir en tant que chauffeur indépendant ?", a: "Les principales charges sont : commission plateforme (10-25%), charges sociales (22% en micro, ~45% en TNS), assurance RC Pro, frais de véhicule (location/crédit, entretien, carburant) et frais administratifs (comptable, CFE)." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.ecolet3p.fr/" },
    { "@type": "ListItem", position: 2, name: "Audit Rentabilité Chauffeur", item: "https://www.ecolet3p.fr/audit-rentabilite-chauffeur" },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Audit rentabilité chauffeur (Taxi/VTC/VMDTR) – École T3P Paris",
  description: "Estimez votre net mensuel (charges, statut, véhicule). Envoyez votre audit sur WhatsApp et démarrez votre formation.",
  url: "https://www.ecolet3p.fr/audit-rentabilite-chauffeur",
  provider: { "@type": "EducationalOrganization", name: "ECOLE T3P", url: "https://www.ecolet3p.fr" },
};

/* ── WhatsApp CTA Button ── */
function WhatsAppCTA({ message, className = "" }: { message?: string; className?: string }) {
  const url = buildWhatsAppUrl(message || defaultWhatsAppMessage);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-cta-orange px-8 py-4 font-bold rounded-xl inline-flex items-center gap-3 text-lg transition-transform hover:scale-[1.02] ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      Envoyer mon audit sur WhatsApp
    </a>
  );
}

/* ── Page ── */
export default function AuditRentabiliteChauffeur() {
  return (
    <Layout>
      <Helmet>
        <title>Audit rentabilité chauffeur (Taxi/VTC/VMDTR) – École T3P Paris</title>
        <meta name="description" content="Estimez votre net mensuel (charges, statut, véhicule). Envoyez votre audit sur WhatsApp et démarrez votre formation." />
        <link rel="canonical" href="https://www.ecolet3p.fr/audit-rentabilite-chauffeur" />
        <meta property="og:title" content="Audit rentabilité chauffeur – École T3P Paris" />
        <meta property="og:description" content="Simulez votre rentabilité chauffeur VTC, Taxi ou VMDTR. Résultats instantanés + accompagnement WhatsApp." />
        <meta property="og:url" content="https://www.ecolet3p.fr/audit-rentabilite-chauffeur" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.ecolet3p.fr/og-image.jpg" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-muted py-3 border-b border-border mt-16">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" /> Accueil
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Audit Rentabilité Chauffeur</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-14 lg:py-20 bg-primary relative overflow-hidden">
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/40 z-[1]" />
        {/* Background image — positioned right, above gradient */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] md:w-[50%] h-[130%] bg-contain bg-no-repeat bg-right-center opacity-15 md:opacity-20 z-[2]"
          style={{ backgroundImage: `url(${auditBg})` }}
        />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[22px] md:text-[32px] lg:text-[42px] font-bold text-white leading-tight mb-4"
            >
              Audit rentabilité chauffeur<br />
              <span className="text-[#D4A853]">Taxi / VTC / VMDTR</span> à Paris
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-8"
            >
              Estimez votre <strong className="text-white">net mensuel réel</strong> en 30 secondes.
              Charges, statut juridique, commission plateforme — tout est calculé.
              Envoyez vos résultats sur WhatsApp pour un accompagnement personnalisé.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <WhatsAppCTA />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reassurance */}
      <section className="bg-muted py-4 border-b border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Users, value: "+2 000", label: "chauffeurs formés" },
              { icon: Star, value: "5.0/5", label: "359 avis Google" },
              { icon: Award, value: "94%", label: "taux de réussite" },
              { icon: Shield, value: "990€", label: "à partir de" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <s.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="stat-number text-base leading-tight">{s.value}</span>
                  <span className="block text-xs text-muted-foreground">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro SEO */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-3xl">
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Vous envisagez de devenir <strong>chauffeur VTC</strong>, <strong>chauffeur Taxi</strong> ou <strong>conducteur VMDTR</strong> en Île-de-France ?
            Avant de vous lancer, il est essentiel d'évaluer la <strong>rentabilité réelle</strong> de votre future activité.
            Notre outil d'audit gratuit vous permet de simuler votre revenu net mensuel en tenant compte de toutes les variables :
            commission plateforme, charges sociales, statut juridique et charges fixes.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed">
            Basé à <strong>Montrouge (92)</strong>, à 2 minutes du métro Mairie de Montrouge (Ligne 4),
            ECOLE T3P forme les futurs chauffeurs professionnels de <strong>Paris et Île-de-France</strong> depuis 2014.
            Plus de 2 000 chauffeurs formés avec un taux de réussite de 94%.
          </p>
        </div>
      </section>

      {/* Module Audit */}
      <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Chargement du simulateur...</div>}>
        <AuditRentabiliteModule />
      </Suspense>

      {/* CTA WhatsApp milieu */}
      <section className="py-12 bg-primary">
        <div className="container-custom text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            Discutez de vos résultats avec un conseiller
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Envoyez votre simulation directement sur WhatsApp. Un expert vous rappelle sous 24h.
          </p>
          <WhatsAppCTA />
        </div>
      </section>

      {/* H2 - Calcul rentabilité */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-3xl">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
            Comment calculer la rentabilité d'un chauffeur professionnel ?
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Le calcul de rentabilité repose sur une formule simple :
              <strong className="text-foreground"> Net mensuel = CA − Commission plateforme − Charges sociales − Charges fixes</strong>.
            </p>
            <p>
              Le <strong>chiffre d'affaires mensuel</strong> dépend du nombre de jours travaillés, des heures par jour et du revenu horaire moyen.
              Par exemple, un chauffeur VTC travaillant 22 jours par mois, 8 heures par jour avec un revenu horaire de 25€ génère un CA de <strong>4 400€/mois</strong>.
            </p>
            <p>
              La <strong>commission plateforme</strong> (Uber, Bolt, Heetch…) varie de 10% à 25% selon la plateforme et le type d'activité.
              En taxi, cette commission est souvent réduite voire inexistante si vous travaillez avec votre propre licence.
            </p>
            <p>
              Les <strong>charges sociales</strong> dépendent directement de votre statut juridique.
              En micro-entreprise, elles représentent environ 22% du CA après commission.
              En SASU, l'imposition se fait via l'impôt sur les sociétés (IS à 15%).
              En EURL (TNS), les cotisations sociales s'élèvent à environ 45% du bénéfice.
            </p>
          </div>
        </div>
      </section>

      {/* H2 - Statut juridique */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom max-w-3xl">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
            Quel statut juridique choisir pour votre activité de chauffeur ?
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Micro-entreprise",
                icon: Briefcase,
                points: ["Charges sociales ~22% du CA", "Simplicité administrative", "Idéal pour démarrer", "Plafond CA : 77 700€/an"],
              },
              {
                title: "SASU",
                icon: Building2,
                points: ["IS à 15% sur le bénéfice", "Protection patrimoine personnel", "Dividendes possibles", "Adapté aux revenus élevés"],
              },
              {
                title: "EURL (TNS)",
                icon: Briefcase,
                points: ["Cotisations TNS ~45%", "Couverture sociale complète", "Retraite TNS", "Structure flexible"],
              },
              {
                title: "Société existante",
                icon: Building2,
                points: ["Intégration à votre structure", "Optimisation fiscale possible", "Comptabilité déjà en place", "Idéal pour diversification"],
              },
            ].map((s) => (
              <div key={s.title} className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-center gap-2 mb-3">
                  <s.icon className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-foreground">{s.title}</h3>
                </div>
                <ul className="space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* H2 - Accompagnement T3P */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-3xl">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
            L'accompagnement ECOLE T3P : de l'audit à la réussite
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              ECOLE T3P ne se limite pas à une formation théorique. Notre approche inclut un <strong>accompagnement complet</strong> :
              audit de rentabilité, choix du statut juridique, préparation à l'examen et aide à la création d'entreprise.
            </p>
            <div className="grid gap-4 md:grid-cols-3 my-8">
              {[
                { icon: GraduationCap, title: "À partir de 990€", desc: "Frais d'examen CMA inclus. 3 formats au choix." },
                { icon: TrendingUp, title: "94% de réussite", desc: "Taux très supérieur à la moyenne nationale depuis 2014." },
                { icon: Users, title: "+2 000 formés", desc: "Une communauté active de chauffeurs professionnels en IDF." },
              ].map((item) => (
                <div key={item.title} className="bg-secondary/50 rounded-xl p-5 border border-border text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary mx-auto mb-3 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1 text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
            <p>
              Le paiement en <strong>4× sans frais</strong> via Alma rend la formation accessible immédiatement (soit ~247,50€/mois).
              Pas de CPF, pas de paperasse administrative — vous vous inscrivez et démarrez dès la prochaine session.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom max-w-3xl">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
            Questions fréquentes sur la rentabilité chauffeur
          </h2>
          <Accordion type="multiple" className="space-y-2">
            {faqItems.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-5">
                <AccordionTrigger className="text-left font-semibold text-foreground text-sm py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent forceMount className="data-[state=closed]:hidden text-sm text-muted-foreground pb-4 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact + Local SEO */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-3xl">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
            Contactez ECOLE T3P — Paris & Île-de-France
          </h2>
          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">3 rue Corneille, 92120 Montrouge</p>
                <p className="text-sm text-muted-foreground">Métro Mairie de Montrouge (Ligne 4) — 2 min à pied</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <a href="tel:0188750555" className="font-semibold text-foreground hover:text-primary transition-colors">01 88 75 05 55</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <a href="mailto:montrouge@ecolet3p.fr" className="font-semibold text-foreground hover:text-primary transition-colors">montrouge@ecolet3p.fr</a>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary shrink-0" />
              <p className="text-foreground">Lundi – Vendredi : 09h30 – 18h00</p>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-primary shrink-0" />
              <a
                href={buildWhatsAppUrl(defaultWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                WhatsApp — Réponse rapide
              </a>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            ECOLE T3P accueille les élèves de toute l'<strong>Île-de-France</strong> : Paris (14e, 15e, 13e),
            Bagneux, Vanves, Malakoff, Châtillon, Clamart, Issy-les-Moulineaux, Boulogne-Billancourt,
            Arcueil, Gentilly, Le Kremlin-Bicêtre, Vitry-sur-Seine, Ivry-sur-Seine et bien plus.
          </p>
        </div>
      </section>

      {/* CTA WhatsApp final */}
      <section className="py-16 bg-primary">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Prêt à concrétiser votre projet ?
            </h2>
            <p className="text-white/80 mb-4 max-w-2xl mx-auto">
              Envoyez votre audit de rentabilité sur WhatsApp et recevez un accompagnement personnalisé sous 24h.
            </p>
            <p className="text-accent font-semibold mb-8">
              Formation à partir de 990€ • 94% de réussite • Paiement en 4× sans frais
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <WhatsAppCTA />
              <a href="tel:0188750555" className="text-white/80 hover:text-white font-semibold inline-flex items-center gap-2 text-lg">
                <Phone className="w-5 h-5" /> 01 88 75 05 55
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
