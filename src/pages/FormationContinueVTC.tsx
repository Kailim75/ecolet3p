import React from "react";
import TrustBar from "@/components/home/TrustBar";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Car, Clock, Euro, CheckCircle, Calendar, 
  MapPin, Phone, FileCheck, Home, RefreshCw, Star, Quote, Smartphone
} from "lucide-react";
import UpcomingSessionsCard from "@/components/formations/UpcomingSessionsCard";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const programModules = [
  {
    title: "Actualisation des connaissances réglementaires",
    duration: "4h",
    topics: ["Évolution du code des transports", "Nouvelles obligations VTC", "Contrôles et sanctions"]
  },
  {
    title: "Sécurité routière et éco-conduite",
    duration: "4h",
    topics: ["Prévention des risques", "Conduite économique", "Gestion du stress"]
  },
  {
    title: "Qualité de service et relation client",
    duration: "3h",
    topics: ["Accueil des personnes à mobilité réduite", "Gestion des conflits", "Communication premium"]
  },
  {
    title: "Gestion de l'activité professionnelle",
    duration: "3h",
    topics: ["Évolutions fiscales", "Applications de réservation", "Optimisation de l'activité"]
  }
];

const faqs = [
  {
    question: "La formation continue VTC est-elle obligatoire ?",
    answer: "Oui, la formation continue est obligatoire tous les 5 ans pour le renouvellement de votre carte professionnelle VTC, conformément à la réglementation en vigueur."
  },
  {
    question: "Quelle est la durée de la formation continue VTC ?",
    answer: "La formation continue VTC dure 14 heures, réparties généralement sur 2 jours consécutifs."
  },
  {
    question: "Que se passe-t-il si je ne fais pas ma formation continue ?",
    answer: "Sans formation continue validée, vous ne pourrez pas renouveler votre carte professionnelle et ne serez plus autorisé à exercer l'activité de VTC."
  },
  {
    question: "Comment justifier ma formation continue ?",
    answer: "À l'issue de la formation, une attestation de stage vous est délivrée. Ce document est nécessaire pour le renouvellement de votre carte professionnelle auprès de la préfecture."
  }
];

const FormationContinueVTC = () => {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Formation Continue VTC - 14h",
    "description": "Formation continue obligatoire de 14h pour le renouvellement de la carte professionnelle VTC. Conforme à la réglementation en vigueur.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "ECOLE T3P",
      "sameAs": "https://www.ecolet3p.fr"
    },
    "offers": {
      "@type": "Offer",
      "price": "170",
      "priceCurrency": "EUR"
    },
    "timeRequired": "PT14H",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "359",
      "bestRating": "5"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Layout>
      <Helmet>
        <title>Formation Continue VTC 14h Montrouge | ECOLE T3P</title>
        <meta name="description" content="Formation continue obligatoire VTC de 14h pour renouveler votre carte professionnelle. Centre agréé Préfecture à Montrouge. Attestation de stage délivrée." />
        <link rel="canonical" href="https://www.ecolet3p.fr/formations/continue-vtc" />
        <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.ecolet3p.fr/" },
            { "@type": "ListItem", "position": 2, "name": "Formations", "item": "https://www.ecolet3p.fr/formations" },
            { "@type": "ListItem", "position": 3, "name": "Formation Continue VTC", "item": "https://www.ecolet3p.fr/formations/continue-vtc" }
          ]
        })}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-muted/30 py-3 border-b">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center gap-1">
                    <Home className="h-4 w-4" />
                    Accueil
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/formations">Formations</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Formation Continue VTC</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-forest/10 text-forest border-forest/20">
                <RefreshCw className="h-4 w-4 mr-2" />
                Formation continue obligatoire
              </Badge>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-forest mb-6">
                Formation Continue VTC
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                Formation obligatoire de 14 heures pour le renouvellement de votre carte professionnelle 
                de conducteur VTC, conformément à la réglementation en vigueur.
              </p>

              {/* Key Info Cards */}
              <div className="grid sm:grid-cols-4 gap-4 mb-8">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Clock className="h-8 w-8 text-forest mx-auto mb-2" />
                    <p className="font-bold text-lg">14 heures</p>
                    <p className="text-sm text-muted-foreground">Durée</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Calendar className="h-8 w-8 text-forest mx-auto mb-2" />
                    <p className="font-bold text-lg">2 jours</p>
                    <p className="text-sm text-muted-foreground">Format</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <MapPin className="h-8 w-8 text-forest mx-auto mb-2" />
                    <p className="font-bold text-lg">Montrouge</p>
                    <p className="text-sm text-muted-foreground">Lieu</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Euro className="h-8 w-8 text-gold mx-auto mb-2" />
                    <p className="font-bold text-lg">170 €</p>
                    <p className="text-sm text-muted-foreground">Tarif</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Cadre réglementaire */}
      <section className="py-12 bg-forest/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-forest/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-forest">
                  <FileCheck className="h-5 w-5" />
                  Cadre réglementaire
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  La formation continue est requise tous les 5 ans pour le renouvellement de la carte 
                  professionnelle de conducteur VTC, conformément au décret n°2017-483 du 6 avril 2017 
                  relatif aux activités de transport public particulier de personnes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Objectifs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-forest mb-8 text-center">Objectifs de la formation</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Actualiser vos connaissances réglementaires",
                "Renforcer la sécurité routière",
                "Améliorer la qualité de service premium",
                "Valider le renouvellement de votre carte"
              ].map((objective, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-card rounded-lg border">
                  <CheckCircle className="h-5 w-5 text-gold flex-shrink-0" />
                  <span className="text-forest font-medium">{objective}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programme */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-forest mb-8 text-center">Programme de formation</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {programModules.map((module, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <Badge variant="outline">{module.duration}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {module.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Évolutions 2026 pour les VTC */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-forest mb-6">Évolutions 2026 : ce qui change pour les chauffeurs VTC</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Le secteur VTC connaît une transformation accélérée en 2026. Les <strong>plateformes de mise en relation</strong> comme 
                Uber, Bolt et Heetch font face à de nouvelles obligations réglementaires européennes. Le Digital Markets Act (DMA) 
                impose plus de transparence sur les algorithmes de tarification et d'attribution des courses, offrant aux chauffeurs 
                une meilleure visibilité sur leurs revenus potentiels par course.
              </p>
              <p>
                La <strong>réglementation des Zones à Faibles Émissions (ZFE)</strong> impacte directement les VTC : à partir de 2026, 
                seuls les véhicules Crit'Air 1 et électriques sont autorisés dans le périmètre de la Métropole du Grand Paris pour 
                l'exercice professionnel. Cette transition vers l'électrique s'accompagne d'aides financières spécifiques pour les 
                chauffeurs VTC — prime à la conversion majorée, bonus écologique professionnel et accès prioritaire aux bornes de 
                recharge rapide.
              </p>
              <p>
                Les <strong>nouvelles applications de gestion</strong> permettent désormais d'optimiser vos courses grâce à 
                l'intelligence artificielle : estimation précise de la demande par zone horaire, calcul automatique de la 
                rentabilité nette par course après déduction des charges, et gestion comptable intégrée pour les auto-entrepreneurs. 
                Notre formation continue intègre une prise en main concrète de ces outils pour maximiser vos revenus.
              </p>
              <p>
                Enfin, la <strong>qualité de service premium</strong> reste le principal facteur de différenciation face à la 
                concurrence des taxis et du covoiturage. Les attentes clients évoluent vers plus de confort, une hygiène 
                irréprochable et une maîtrise des langues étrangères — des compétences que notre formation renforce 
                systématiquement pour fidéliser votre clientèle haut de gamme.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Encart Uber/Bolt */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-gold/30 bg-[#FFFBF0]">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Smartphone className="h-10 w-10 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-forest mb-2">
                      Déjà sur Uber, Bolt ou Heetch ?
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      Profitez de la formation continue pour optimiser votre activité. Nos formateurs, 
                      anciens chauffeurs VTC expérimentés, partagent leurs stratégies concrètes pour 
                      augmenter votre chiffre d'affaires : choix des créneaux horaires rentables, 
                      multi-plateforme, gestion fiscale optimisée et fidélisation de clients directs.
                    </p>
                    <p className="text-sm font-semibold text-gold">
                      + de 200 chauffeurs VTC formés en 2025 ont augmenté leur CA de 15% en moyenne
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Témoignage VTC */}
      <section className="py-16 bg-forest/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-xl border p-8">
              <Quote className="h-8 w-8 text-gold mb-4" />
              <blockquote className="text-lg text-foreground italic mb-4">
                « Je suis chauffeur VTC sur Uber et Bolt depuis 3 ans. La formation continue chez ECOLE T3P 
                m'a permis de comprendre les nouvelles obligations ZFE et surtout d'optimiser ma gestion 
                fiscale. Grâce aux conseils des formateurs, j'ai changé de statut juridique et j'économise 
                maintenant plus de 200€ par mois sur mes charges. Formation indispensable ! »
              </blockquote>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold text-forest">Mamadou D.</p>
                  <p className="text-sm text-muted-foreground">Chauffeur VTC depuis 2023 — Paris 15e</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarif + Sessions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-2xl font-bold text-forest mb-4">Tarif de la formation</h2>
            <p className="text-4xl font-black text-forest mb-2">170 €</p>
            <p className="text-sm text-muted-foreground">
              Tarif conforme à la réglementation
            </p>
          </div>
          <div className="max-w-lg mx-auto">
            <UpcomingSessionsCard
              sessions={[]}
              onRegister={() => window.location.href = "/contact"}
              fallbackSessions={[
                { id: "cv1", label: "20 mars 2026", time: "9h00 – 17h00", spots: 10 },
                { id: "cv2", label: "17 avril 2026", time: "9h00 – 17h00", spots: 6 },
                { id: "cv3", label: "15 mai 2026", time: "9h00 – 17h00", spots: 0 },
              ]}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-forest mb-8 text-center">Questions fréquentes</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-lg border px-6">
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Liens internes */}
      <section className="py-16 bg-forest/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-forest mb-8 text-center">Formations et ressources associées</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/formations/vtc" className="group p-6 bg-background rounded-xl border hover:border-forest transition-colors">
                <h3 className="font-bold text-forest group-hover:text-gold transition-colors">Formation initiale VTC</h3>
                <p className="text-sm text-muted-foreground mt-2">Formation initiale VTC 63h pour obtenir votre carte professionnelle.</p>
              </Link>
              <Link to="/formations/taxi" className="group p-6 bg-background rounded-xl border hover:border-forest transition-colors">
                <h3 className="font-bold text-forest group-hover:text-gold transition-colors">Formation initiale Taxi</h3>
                <p className="text-sm text-muted-foreground mt-2">Formation initiale Taxi 63h à Montrouge.</p>
              </Link>
              <Link to="/formations/mobilite" className="group p-6 bg-background rounded-xl border hover:border-forest transition-colors">
                <h3 className="font-bold text-forest group-hover:text-gold transition-colors">Formation Mobilité</h3>
                <p className="text-sm text-muted-foreground mt-2">Passerelle VTC ↔ Taxi pour ajouter une mention.</p>
              </Link>
              <Link to="/formations/continue-taxi" className="group p-6 bg-background rounded-xl border hover:border-forest transition-colors">
                <h3 className="font-bold text-forest group-hover:text-gold transition-colors">Formation continue Taxi</h3>
                <p className="text-sm text-muted-foreground mt-2">Renouvellement carte professionnelle Taxi tous les 5 ans.</p>
              </Link>
              <Link to="/blog/formation-continue-renouvellement-carte-professionnelle" className="group p-6 bg-background rounded-xl border hover:border-forest transition-colors">
                <h3 className="font-bold text-forest group-hover:text-gold transition-colors">Guide : Renouvellement carte pro</h3>
                <p className="text-sm text-muted-foreground mt-2">Tout savoir sur le renouvellement de votre carte professionnelle.</p>
              </Link>
              <Link to="/blog/vtc-taxi-vmdtr-2026-quel-metier-choisir" className="group p-6 bg-background rounded-xl border hover:border-forest transition-colors">
                <h3 className="font-bold text-forest group-hover:text-gold transition-colors">Comparatif VTC, Taxi, VMDTR</h3>
                <p className="text-sm text-muted-foreground mt-2">Quel métier du transport choisir en 2026 ?</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FormationContinueVTC;
