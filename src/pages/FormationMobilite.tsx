import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeftRight, Clock, Euro, Check, ArrowRight, Phone,
  Home, ChevronRight, GraduationCap, Star, TrendingUp, Zap
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StepPreRegistrationForm from "@/components/formations/StepPreRegistrationForm";
import heroImageMobilite from "@/assets/formations/hero-mobilite.jpg";

const programModules = [
  { title: "Réglementation spécifique", duration: "4h", topics: ["Différences Taxi/VTC", "Obligations réglementaires", "Zones d'exercice", "Sanctions"] },
  { title: "Adaptation au nouveau métier", duration: "4h", topics: ["Spécificités clientèle", "Tarification", "Applications", "Bonnes pratiques"] },
  { title: "Mise en situation", duration: "4h", topics: ["Exercices pratiques", "Cas concrets", "Questions/Réponses", "Préparation examen"] },
  { title: "Examen blanc", duration: "2h", topics: ["QCM complet", "Correction détaillée", "Points d'amélioration", "Conseils finaux"] },
];

const testimonials = [
  { name: "Jean-Pierre L.", role: "Ex-Taxi, maintenant VTC", content: "Après 10 ans en taxi, j'ai voulu diversifier. La formation mobilité m'a permis de basculer en VTC en seulement 2 jours.", rating: 5 },
  { name: "Nadia K.", role: "Ex-VTC, maintenant Taxi", content: "Je voulais accéder aux bornes taxi. La passerelle a été rapide et les formateurs m'ont bien préparée aux spécificités.", rating: 5 },
  { name: "Stéphane M.", role: "Double carte Taxi + VTC", content: "Grâce à la formation mobilité, je peux maintenant exercer les deux métiers. Plus de flexibilité et plus de revenus !", rating: 5 },
];

const faqs = [
  { question: "Qu'est-ce que la formation Mobilité ?", answer: "La formation Mobilité est une passerelle qui permet aux chauffeurs de taxi de devenir VTC (et inversement) sans repasser l'intégralité de la formation initiale. Elle dure 14 heures et se concentre sur les spécificités du nouveau métier visé." },
  { question: "Qui peut suivre la formation Mobilité ?", answer: "La formation Mobilité est réservée aux titulaires d'une carte professionnelle Taxi ou VTC en cours de validité." },
  { question: "Combien de temps dure la formation Mobilité ?", answer: "La formation Mobilité dure 14 heures, généralement réparties sur 2 jours." },
  { question: "Pourquoi faire la passerelle Taxi vers VTC ?", answer: "La passerelle vers VTC vous permet de diversifier votre activité, d'accéder aux plateformes comme Uber ou Bolt, et d'avoir plus de flexibilité dans vos horaires." },
  { question: "Pourquoi faire la passerelle VTC vers Taxi ?", answer: "La passerelle vers Taxi vous donne accès aux bornes taxi, à la maraude (prise en charge dans la rue), et à une clientèle différente." },
  { question: "Quel est l'examen à passer ?", answer: "L'examen de mobilité est un QCM portant sur les spécificités de la nouvelle profession visée. Il est moins complet que l'examen initial." },
];

const FormationMobilite = () => {
  const [showPreRegistration, setShowPreRegistration] = useState(false);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Formation Mobilité - Passerelle Taxi ↔ VTC",
    "description": "Formation passerelle de 14 heures pour passer de Taxi à VTC ou inversement.",
    "provider": { "@type": "EducationalOrganization", "name": "ECOLE T3P", "url": "https://www.ecolet3p.fr" },
    "offers": { "@type": "Offer", "price": "390", "priceCurrency": "EUR" },
    "timeRequired": "PT14H",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "359" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question", "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  };

  return (
    <Layout>
      <Helmet>
        <title>Passerelle Taxi ↔ VTC 14h — 390€ | ECOLE T3P</title>
        <meta name="description" content="Formation mobilité passerelle Taxi ↔ VTC à Montrouge (92). 14h en 2 jours à 390€. Ajoutez une mention à votre carte pro. Paiement 4× sans frais." />
        <link rel="canonical" href="https://www.ecolet3p.fr/formations/mobilite" />
        <meta property="og:title" content="Formation Mobilité Passerelle Taxi ↔ VTC — ECOLE T3P" />
        <meta property="og:description" content="Formation passerelle 14h pour passer de Taxi à VTC ou inversement. 390€, 2 jours." />
        <meta property="og:url" content="https://www.ecolet3p.fr/formations/mobilite" />
        <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
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
            <span className="text-foreground font-medium">Formation Mobilité</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 lg:py-24 bg-primary overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImageMobilite})`, filter: "blur(2px) brightness(0.35)" }}
        />
        <div className="absolute inset-0 bg-primary/65" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/15 text-white mb-5">
              <ArrowLeftRight className="w-4 h-4" /> Formation Passerelle
            </span>
            <h1 className="text-[26px] md:text-[36px] lg:text-[46px] font-bold text-white leading-tight mb-5">
              Formation Mobilité — Taxi ↔ VTC
            </h1>
            <p className="text-white/80 text-base md:text-lg mb-6 max-w-2xl">
              Vous êtes déjà chauffeur Taxi ou VTC ? Obtenez votre double carte professionnelle en seulement 2 jours.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Clock className="w-4 h-4" /> 14h
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Euro className="w-4 h-4" /> 390€
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Zap className="w-4 h-4" /> 2 jours
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowPreRegistration(true)}
                className="btn-cta-orange px-8 py-4 text-base font-bold rounded-lg inline-flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-5 h-5" /> S'inscrire
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white hover:text-primary transition-all"
              >
                <Phone className="w-5 h-5" /> Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Deux parcours */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="section-title mb-3">Choisissez votre passerelle</h2>
            <p className="section-subtitle mx-auto">Deux parcours possibles selon votre situation</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Taxi → VTC */}
            <div className="card-t3p border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="text-center mb-4">
                <div className="mx-auto w-14 h-14 bg-secondary rounded-full flex items-center justify-center mb-3">
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary">Taxi → VTC</h3>
              </div>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Vous êtes chauffeur de taxi et souhaitez accéder au marché VTC
              </p>
              <ul className="space-y-2">
                {["Accès aux plateformes Uber, Bolt, Heetch", "Flexibilité des horaires", "Clientèle différente", "Diversification des revenus"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* VTC → Taxi */}
            <div className="card-t3p border-2 border-accent/20 hover:border-accent/40 transition-colors">
              <div className="text-center mb-4">
                <div className="mx-auto w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                  <TrendingUp className="w-7 h-7 text-accent rotate-180" />
                </div>
                <h3 className="text-xl font-bold text-accent">VTC → Taxi</h3>
              </div>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Vous êtes VTC et voulez accéder aux bornes et à la maraude
              </p>
              <ul className="space-y-2">
                {["Accès aux bornes taxi", "Maraude (prise en charge dans la rue)", "Clientèle professionnelle", "Revenus complémentaires stables"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-accent shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Programme */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="section-title mb-3">Programme de la formation</h2>
            <p className="section-subtitle mx-auto">14 heures intensives sur 2 jours</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {programModules.map((mod, i) => (
              <div key={i} className="card-t3p">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-primary">{mod.title}</h3>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-secondary text-primary">{mod.duration}</span>
                </div>
                <ul className="space-y-2">
                  {mod.topics.map((topic, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="mt-14 max-w-md mx-auto card-t3p text-center border-2 border-primary/20">
            <h3 className="text-lg font-bold text-foreground mb-2">Tarif formation Mobilité</h3>
            <p className="text-4xl font-bold text-primary mb-1">390€</p>
            <p className="text-sm text-muted-foreground mb-6">TTC — Frais d'examen inclus</p>
            <button
              onClick={() => setShowPreRegistration(true)}
              className="btn-cta-orange w-full px-6 py-3.5 font-bold rounded-lg inline-flex items-center justify-center gap-2"
            >
              S'inscrire <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">Ils ont réussi la passerelle</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card-t3p">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-sm text-foreground italic mb-4">"{t.content}"</p>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">Questions fréquentes</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-5">
                  <AccordionTrigger className="text-left text-sm font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="section-title text-center mb-8">Découvrez aussi</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { title: "Formation VTC", desc: "Formation initiale VTC 63h", path: "/formations/vtc" },
              { title: "Formation Taxi", desc: "Formation initiale Taxi 63h", path: "/formations/taxi" },
              { title: "Formation Continue VTC", desc: "Renouvelez votre carte VTC", path: "/formations/continue-vtc" },
              { title: "Contact", desc: "Contactez-nous pour vous inscrire", path: "/contact" },
            ].map((link, i) => (
              <Link key={i} to={link.path} className="card-t3p group">
                <h3 className="text-sm font-semibold text-primary mb-1 group-hover:text-accent transition-colors">{link.title}</h3>
                <p className="text-xs text-muted-foreground">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Doublez vos opportunités</h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            Obtenez votre double carte professionnelle en seulement 2 jours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowPreRegistration(true)}
              className="btn-cta-orange px-8 py-4 font-bold rounded-lg inline-flex items-center gap-2"
            >
              Je m'inscris <ArrowRight className="w-5 h-5" />
            </button>
            <a href="tel:0188750555" className="text-white/80 hover:text-white font-semibold inline-flex items-center gap-2">
              <Phone className="w-5 h-5" /> 01 88 75 05 55
            </a>
          </div>
        </div>
      </section>

      {/* Pre-Registration Dialog */}
      <Dialog open={showPreRegistration} onOpenChange={setShowPreRegistration}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Pré-inscription - Formation Mobilité</DialogTitle>
          </DialogHeader>
          <StepPreRegistrationForm
            isOpen={showPreRegistration}
            onClose={() => setShowPreRegistration(false)}
            defaultFormation="Formation Mobilité"
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default FormationMobilite;
