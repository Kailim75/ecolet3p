import React from "react";
import TrustBar from "@/components/home/TrustBar";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Bike, Clock, Euro, CheckCircle, Calendar, 
  MapPin, Phone, FileCheck, Home, RefreshCw, Star, Quote, ArrowRight
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
    topics: ["Évolution du code des transports", "Nouvelles obligations VMDTR", "Contrôles et sanctions"]
  },
  {
    title: "Sécurité routière deux-roues",
    duration: "4h",
    topics: ["Prévention des risques spécifiques", "Conduite préventive moto", "Équipements de sécurité"]
  },
  {
    title: "Qualité de service et relation client",
    duration: "3h",
    topics: ["Accueil et confort passager", "Gestion des situations particulières", "Communication"]
  },
  {
    title: "Gestion de l'activité professionnelle",
    duration: "3h",
    topics: ["Évolutions fiscales", "Plateformes de réservation", "Optimisation de l'activité"]
  }
];

const faqs = [
  {
    question: "La formation continue VMDTR est-elle obligatoire ?",
    answer: "Oui, la formation continue est obligatoire tous les 5 ans pour le renouvellement de votre carte professionnelle VMDTR (taxi moto), conformément à la réglementation en vigueur."
  },
  {
    question: "Quelle est la durée de la formation continue VMDTR ?",
    answer: "La formation continue VMDTR dure 14 heures, réparties généralement sur 2 jours consécutifs."
  },
  {
    question: "Que se passe-t-il si je ne fais pas ma formation continue ?",
    answer: "Sans formation continue validée, vous ne pourrez pas renouveler votre carte professionnelle et ne serez plus autorisé à exercer l'activité de VMDTR."
  },
  {
    question: "Comment justifier ma formation continue ?",
    answer: "À l'issue de la formation, une attestation de stage vous est délivrée. Ce document est nécessaire pour le renouvellement de votre carte professionnelle auprès de la préfecture."
  }
];

const FormationContinueVMDTR = () => {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Formation Continue VMDTR - 14h",
    "description": "Formation continue obligatoire de 14h pour le renouvellement de la carte professionnelle VMDTR (taxi moto). Conforme à la réglementation en vigueur.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "ECOLE T3P",
      "sameAs": "https://www.ecolet3p.fr"
    },
    "offers": {
      "@type": "Offer",
      "price": "239",
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
        <title>Formation Continue VMDTR 14h Montrouge | ECOLE T3P</title>
        <meta name="description" content="Formation continue obligatoire VMDTR 14h pour renouveler votre carte professionnelle moto-taxi. Centre agréé Préfecture à Montrouge. Attestation délivrée." />
        <link rel="canonical" href="https://www.ecolet3p.fr/formations/continue-vmdtr" />
        <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.ecolet3p.fr/" },
            { "@type": "ListItem", "position": 2, "name": "Formations", "item": "https://www.ecolet3p.fr/formations" },
            { "@type": "ListItem", "position": 3, "name": "Formation Continue VMDTR", "item": "https://www.ecolet3p.fr/formations/continue-vmdtr" }
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
                <BreadcrumbPage>Formation Continue VMDTR</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-10 lg:py-20 bg-cream">
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
              
              <h1 className="text-[28px] lg:text-5xl font-bold text-forest mb-4 lg:mb-6 leading-tight">
                Formation Continue VMDTR
              </h1>
              
              <p className="text-base lg:text-lg text-muted-foreground mb-6 lg:mb-8 max-w-2xl">
                Formation obligatoire de 14 heures pour le renouvellement de votre carte professionnelle 
                de conducteur VMDTR (taxi moto), conformément à la réglementation en vigueur.
              </p>

              {/* Key Info Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
                <Card className="text-center">
                  <CardContent className="pt-4 lg:pt-6 pb-4">
                    <Clock className="h-6 w-6 lg:h-8 lg:w-8 text-forest mx-auto mb-1 lg:mb-2" />
                    <p className="font-bold text-base lg:text-lg">14 heures</p>
                    <p className="text-xs lg:text-sm text-muted-foreground">Durée</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-4 lg:pt-6 pb-4">
                    <Calendar className="h-6 w-6 lg:h-8 lg:w-8 text-forest mx-auto mb-1 lg:mb-2" />
                    <p className="font-bold text-base lg:text-lg">2 jours</p>
                    <p className="text-xs lg:text-sm text-muted-foreground">Format</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-4 lg:pt-6 pb-4">
                    <MapPin className="h-6 w-6 lg:h-8 lg:w-8 text-forest mx-auto mb-1 lg:mb-2" />
                    <p className="font-bold text-base lg:text-lg">Montrouge</p>
                    <p className="text-xs lg:text-sm text-muted-foreground">Lieu</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-4 lg:pt-6 pb-4">
                    <Euro className="h-6 w-6 lg:h-8 lg:w-8 text-gold mx-auto mb-1 lg:mb-2" />
                    <p className="font-bold text-base lg:text-lg">239 €</p>
                    <p className="text-xs lg:text-sm text-muted-foreground">Tarif</p>
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
                  professionnelle de conducteur VMDTR, conformément au décret n°2017-483 du 6 avril 2017 
                  relatif aux activités de transport public particulier de personnes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Objectifs */}
      <section className="py-10 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-forest mb-8 text-center">Objectifs de la formation</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Actualiser vos connaissances réglementaires",
                "Renforcer la sécurité deux-roues",
                "Améliorer la qualité de service",
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
      <section className="py-10 lg:py-16 bg-cream">
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

      {/* Évolutions 2026 pour les VMDTR */}
      <section className="py-10 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-forest mb-6">Évolutions 2026 : ce qui change pour les conducteurs VMDTR</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Le métier de conducteur VMDTR (Véhicule Motorisé à Deux ou Trois Roues) connaît une évolution significative 
                en 2026. Les <strong>nouvelles normes d'équipement</strong> imposent désormais des standards renforcés pour 
                les passagers : casque homologué avec intercom intégré, gilet airbag obligatoire pour le conducteur, et 
                système de géolocalisation en temps réel pour assurer la traçabilité des courses.
              </p>
              <p>
                La <strong>réglementation spécifique aux deux-roues</strong> se renforce dans le Grand Paris. Les voies 
                réservées aux bus et taxis sont désormais accessibles aux VMDTR dans certaines communes des Hauts-de-Seine, 
                facilitant la circulation en heures de pointe. Cependant, les contrôles techniques périodiques deviennent 
                obligatoires pour tous les véhicules VMDTR, avec une visite annuelle imposée à partir de janvier 2026.
              </p>
              <p>
                Les <strong>plateformes de réservation</strong> dédiées au transport moto se développent rapidement. 
                CityBird, Félix et d'autres applications proposent des algorithmes de tarification dynamique spécifiques 
                au VMDTR, tenant compte de la météo, du trafic et de la demande en temps réel. Notre formation continue 
                vous apprend à optimiser votre présence sur ces plateformes et à diversifier vos sources de revenus.
              </p>
              <p>
                Enfin, la <strong>sécurité routière des deux-roues motorisés</strong> reste la priorité absolue. Les 
                statistiques 2025 montrent une réduction de 18% des accidents impliquant des VMDTR professionnels formés 
                régulièrement. Notre formation intègre des mises en situation concrètes : conduite par temps de pluie, 
                gestion du passager anxieux, manœuvres d'évitement et premiers secours adaptés au transport moto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-sell formation initiale */}
      <section className="py-10 lg:py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-forest/20 overflow-hidden">
              <div className="bg-forest p-6 text-cream">
                <h3 className="text-lg font-bold mb-1">
                  Vous n'avez pas encore votre carte VMDTR ?
                </h3>
                <p className="text-cream/80 text-sm">
                  Obtenez votre carte professionnelle avec notre formation initiale
                </p>
              </div>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Formation initiale VMDTR</span>
                  <span className="font-bold text-forest text-xl">990 €</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-gold" /> 14 heures de formation</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-gold" /> Préparation à l'examen préfectoral</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-gold" /> Frais d'examen inclus</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-gold" /> Taux de réussite 94%</li>
                </ul>
                <Button asChild className="w-full bg-forest hover:bg-forest/90">
                  <Link to="/formations/vmdtr">
                    Découvrir la formation initiale VMDTR
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Témoignage VMDTR */}
      <section className="py-16 bg-forest/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-xl border p-8">
              <Quote className="h-8 w-8 text-gold mb-4" />
              <blockquote className="text-lg text-foreground italic mb-4">
                « En tant que conducteur moto-taxi depuis 2020, la formation continue m'a permis de me 
                mettre à jour sur les nouvelles normes d'équipement et surtout sur la conduite préventive. 
                Les formateurs sont des professionnels du deux-roues qui comprennent nos problématiques 
                spécifiques. J'ai aussi appris à utiliser les nouvelles plateformes de réservation pour 
                diversifier mon activité. Formation courte mais très dense et utile. »
              </blockquote>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold text-forest">Karim B.</p>
                  <p className="text-sm text-muted-foreground">Conducteur VMDTR depuis 2020 — Val-de-Marne</p>
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
      <section className="py-10 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-2xl font-bold text-forest mb-4">Tarif de la formation</h2>
            <p className="text-4xl font-black text-forest mb-2">239 €</p>
            <p className="text-sm text-muted-foreground">
              Tarif conforme à la réglementation
            </p>
          </div>
          <div className="max-w-lg mx-auto">
            <UpcomingSessionsCard
              sessions={[]}
              onRegister={() => window.location.href = "/contact"}
              fallbackSessions={[
                { id: "cm1", label: "23 mars 2026", time: "9h00 – 17h00", spots: 8 },
                { id: "cm2", label: "20 avril 2026", time: "9h00 – 17h00", spots: 5 },
                { id: "cm3", label: "18 mai 2026", time: "9h00 – 17h00", spots: 0 },
              ]}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 lg:py-16 bg-cream">
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
              <Link to="/formations/vmdtr" className="group p-6 bg-background rounded-xl border hover:border-forest transition-colors">
                <h3 className="font-bold text-forest group-hover:text-gold transition-colors">Formation initiale VMDTR</h3>
                <p className="text-sm text-muted-foreground mt-2">Formation VMDTR moto-taxi 14h à Montrouge.</p>
              </Link>
              <Link to="/formations/vtc" className="group p-6 bg-background rounded-xl border hover:border-forest transition-colors">
                <h3 className="font-bold text-forest group-hover:text-gold transition-colors">Formation initiale VTC</h3>
                <p className="text-sm text-muted-foreground mt-2">Formation initiale VTC 63h pour obtenir votre carte pro.</p>
              </Link>
              <Link to="/formations/taxi" className="group p-6 bg-background rounded-xl border hover:border-forest transition-colors">
                <h3 className="font-bold text-forest group-hover:text-gold transition-colors">Formation initiale Taxi</h3>
                <p className="text-sm text-muted-foreground mt-2">Formation initiale Taxi 63h à Montrouge.</p>
              </Link>
              <Link to="/formations/continue-taxi" className="group p-6 bg-background rounded-xl border hover:border-forest transition-colors">
                <h3 className="font-bold text-forest group-hover:text-gold transition-colors">Formation continue Taxi</h3>
                <p className="text-sm text-muted-foreground mt-2">Renouvellement carte professionnelle Taxi tous les 5 ans.</p>
              </Link>
              <Link to="/blog/formation-vmdtr-2026-devenir-conducteur-moto-taxi" className="group p-6 bg-background rounded-xl border hover:border-forest transition-colors">
                <h3 className="font-bold text-forest group-hover:text-gold transition-colors">Guide : Devenir moto-taxi</h3>
                <p className="text-sm text-muted-foreground mt-2">Tout savoir sur le métier de conducteur VMDTR en 2026.</p>
              </Link>
              <Link to="/contact" className="group p-6 bg-background rounded-xl border hover:border-forest transition-colors">
                <h3 className="font-bold text-forest group-hover:text-gold transition-colors">Nous contacter</h3>
                <p className="text-sm text-muted-foreground mt-2">Questions ? Inscrivez-vous ou demandez un renseignement.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FormationContinueVMDTR;
