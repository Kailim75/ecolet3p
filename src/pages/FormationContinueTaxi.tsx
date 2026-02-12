import React, { useState } from "react";
import TrustBar from "@/components/home/TrustBar";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  CarTaxiFront, Clock, Euro, CheckCircle, Calendar, 
  MapPin, Phone, FileCheck, Home, RefreshCw, AlertTriangle, Star, Quote
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
    topics: ["Évolution du code des transports", "Nouvelles obligations", "Contrôles et sanctions"]
  },
  {
    title: "Sécurité routière et éco-conduite",
    duration: "4h",
    topics: ["Prévention des risques", "Conduite économique", "Gestion du stress"]
  },
  {
    title: "Qualité de service et relation client",
    duration: "3h",
    topics: ["Accueil des personnes à mobilité réduite", "Gestion des conflits", "Communication"]
  },
  {
    title: "Gestion de l'activité professionnelle",
    duration: "3h",
    topics: ["Évolutions fiscales", "Outils numériques", "Optimisation de l'activité"]
  }
];

const faqs = [
  {
    question: "La formation continue est-elle obligatoire ?",
    answer: "Oui, la formation continue est obligatoire tous les 5 ans pour le renouvellement de votre carte professionnelle de conducteur de taxi, conformément à la réglementation en vigueur."
  },
  {
    question: "Quelle est la durée de la formation continue ?",
    answer: "La formation continue dure 14 heures, réparties généralement sur 2 jours consécutifs."
  },
  {
    question: "Que se passe-t-il si je ne fais pas ma formation continue ?",
    answer: "Sans formation continue validée, vous ne pourrez pas renouveler votre carte professionnelle et ne serez plus autorisé à exercer l'activité de taxi."
  },
  {
    question: "Comment justifier ma formation continue ?",
    answer: "À l'issue de la formation, une attestation de stage vous est délivrée. Ce document est nécessaire pour le renouvellement de votre carte professionnelle auprès de la préfecture."
  }
];

const RenewalCalculator = () => {
  const [date, setDate] = useState("");
  const renewalDate = date
    ? new Date(new Date(date).setFullYear(new Date(date).getFullYear() + 5)).toLocaleDateString("fr-FR", {
        day: "numeric", month: "long", year: "numeric",
      })
    : null;
  const isExpired = date ? new Date(new Date(date).setFullYear(new Date(date).getFullYear() + 5)) < new Date() : false;

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-foreground">
        Date d'obtention de votre carte professionnelle
      </label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm"
      />
      {renewalDate && (
        <div className={`rounded-lg p-4 ${isExpired ? "bg-destructive/10 border border-destructive/30" : "bg-green-50 border border-green-200"}`}>
          <p className="font-semibold text-sm">
            {isExpired ? "⚠️ Votre carte a expiré !" : "📅 Date limite de renouvellement :"}
          </p>
          <p className={`text-lg font-bold ${isExpired ? "text-destructive" : "text-forest"}`}>
            {renewalDate}
          </p>
          {isExpired && (
            <p className="text-sm text-destructive mt-1">
              Inscrivez-vous d'urgence à notre prochaine session pour régulariser votre situation.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const FormationContinueTaxi = () => {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Formation Continue Taxi - 14h",
    "description": "Formation continue obligatoire de 14h pour le renouvellement de la carte professionnelle Taxi. Conforme à la réglementation en vigueur.",
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
        <title>Formation Continue Taxi 14h | ECOLE T3P Montrouge</title>
        <meta name="description" content="Formation continue obligatoire Taxi 14h à Montrouge. Renouvelez votre carte professionnelle tous les 5 ans. Centre agréé Préfecture des Hauts-de-Seine." />
        <link rel="canonical" href="https://www.ecolet3p.fr/formations/continue-taxi" />
        <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.ecolet3p.fr/" },
            { "@type": "ListItem", "position": 2, "name": "Formations", "item": "https://www.ecolet3p.fr/formations" },
            { "@type": "ListItem", "position": 3, "name": "Formation Continue Taxi", "item": "https://www.ecolet3p.fr/formations/continue-taxi" }
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
                <BreadcrumbPage>Formation Continue Taxi</BreadcrumbPage>
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
                Formation Continue Taxi — Renouvellement Carte Professionnelle
              </h1>
              
              <p className="text-base lg:text-lg text-muted-foreground mb-6 lg:mb-8 max-w-2xl">
                Formation obligatoire de 14 heures pour le renouvellement de votre carte professionnelle 
                de conducteur de taxi, conformément à la réglementation en vigueur.
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
                  professionnelle de conducteur de taxi, conformément au décret n°2017-483 du 6 avril 2017 
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
                "Renforcer la sécurité routière",
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

      {/* Évolutions 2026 pour les taxis */}
      <section className="py-10 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-forest mb-6">Évolutions réglementaires 2026 : ce qui change pour les taxis</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                L'année 2026 marque un tournant majeur pour la profession de conducteur de taxi en Île-de-France. 
                L'extension progressive des <strong>Zones à Faibles Émissions (ZFE)</strong> impose désormais des contraintes 
                strictes sur les véhicules autorisés à circuler dans le Grand Paris. Les taxis équipés de véhicules classés 
                Crit'Air 3 et plus ne pourront plus exercer dans la zone métropolitaine à compter du 1er janvier 2026, 
                rendant indispensable une transition vers des véhicules hybrides ou électriques.
              </p>
              <p>
                La <strong>réforme tarifaire</strong> entrée en vigueur début 2026 modifie également les modalités de calcul 
                des courses. Le nouveau barème intègre une revalorisation du tarif de prise en charge et une actualisation 
                des prix kilométriques pour tenir compte de l'inflation des coûts d'exploitation. Les conducteurs doivent 
                maîtriser ces nouveaux paramètres pour configurer correctement leur taximètre et éviter tout litige avec 
                les clients ou lors des contrôles.
              </p>
              <p>
                Les <strong>obligations de formation numérique</strong> se renforcent : chaque conducteur doit désormais 
                être capable d'utiliser les outils de réservation en ligne, les terminaux de paiement sans contact nouvelle 
                génération, et les applications de gestion de flotte. La formation continue ECOLE T3P intègre ces 
                évolutions pour vous préparer concrètement aux nouvelles exigences du métier.
              </p>
              <p>
                Enfin, les <strong>contrôles routiers</strong> se durcissent avec un programme d'inspections renforcées 
                ciblant spécifiquement les conducteurs T3P. Le non-respect des nouvelles normes peut entraîner une 
                suspension temporaire de votre carte professionnelle. Notre formation vous aide à anticiper ces 
                évolutions et à rester en conformité totale avec la réglementation 2026.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculateur renouvellement */}
      <section className="py-10 lg:py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <Card className="border-2 border-forest/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-forest">
                  <AlertTriangle className="h-5 w-5 text-gold" />
                  Votre carte expire bientôt ?
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Entrez la date d'obtention de votre carte professionnelle pour connaître votre date limite de renouvellement.
                </p>
              </CardHeader>
              <CardContent>
                <RenewalCalculator />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Témoignage taxi */}
      <section className="py-16 bg-forest/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-xl border p-8">
              <Quote className="h-8 w-8 text-gold mb-4" />
              <blockquote className="text-lg text-foreground italic mb-4">
                « J'ai suivi la formation continue chez ECOLE T3P pour renouveler ma carte taxi. 
                En 2 jours, j'ai pu mettre à jour mes connaissances sur les nouvelles réglementations ZFE 
                et le nouveau barème tarifaire. Les formateurs connaissent vraiment le terrain. 
                Je recommande à tous les collègues artisans taxis. »
              </blockquote>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold text-forest">Rachid M.</p>
                  <p className="text-sm text-muted-foreground">Chauffeur taxi depuis 2018 — Hauts-de-Seine</p>
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
                { id: "ct1", label: "18 mars 2026", time: "9h00 – 17h00", spots: 10 },
                { id: "ct2", label: "15 avril 2026", time: "9h00 – 17h00", spots: 7 },
                { id: "ct3", label: "13 mai 2026", time: "9h00 – 17h00", spots: 0 },
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

      {/* Contenu unique */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-2xl font-bold text-forest mb-6">Pourquoi la formation continue Taxi est obligatoire</h2>
            <p className="text-muted-foreground mb-4">
              La formation continue est une obligation légale pour tous les conducteurs de taxi, imposée par le décret 
              n°2017-483 du 6 avril 2017. Elle doit être suivie tous les 5 ans pour pouvoir renouveler votre carte 
              professionnelle auprès de la préfecture. Sans cette formation validée, vous ne serez plus autorisé à 
              exercer votre activité de conducteur de taxi. ECOLE T3P, centre agréé par la Préfecture des Hauts-de-Seine, 
              dispense cette formation dans ses locaux de Montrouge, accessibles en métro ligne 4.
            </p>

            <h2 className="text-2xl font-bold text-forest mb-6 mt-12">Documents nécessaires pour la formation continue</h2>
            <p className="text-muted-foreground mb-4">
              Pour vous inscrire à la formation continue Taxi, vous devez fournir : une copie de votre carte professionnelle 
              en cours de validité, une pièce d'identité valide, et une photo d'identité récente. L'attestation de stage 
              délivrée à l'issue de la formation sera indispensable pour constituer votre dossier de renouvellement 
              de carte professionnelle auprès de la préfecture.
            </p>

            <div className="max-w-lg mx-auto mt-12">
              <UpcomingSessionsCard
                sessions={[]}
                onRegister={() => window.location.href = "/contact"}
                fallbackSessions={[
                  { id: "ct1", label: "18 mars 2026", time: "9h00 – 17h00", spots: 10 },
                  { id: "ct2", label: "15 avril 2026", time: "9h00 – 17h00", spots: 7 },
                  { id: "ct3", label: "13 mai 2026", time: "9h00 – 17h00", spots: 0 },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Liens internes */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-forest mb-8 text-center">À découvrir également</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/formations/taxi" className="p-4 bg-card rounded-lg border hover:border-forest transition-colors">
                <h3 className="font-semibold text-forest mb-1">Formation Taxi Initiale</h3>
                <p className="text-sm text-muted-foreground">Obtenez votre carte professionnelle Taxi</p>
              </Link>
              <Link to="/formations/vtc" className="p-4 bg-card rounded-lg border hover:border-forest transition-colors">
                <h3 className="font-semibold text-forest mb-1">Formation VTC</h3>
                <p className="text-sm text-muted-foreground">Devenez chauffeur VTC professionnel</p>
              </Link>
              <Link to="/formations/mobilite" className="p-4 bg-card rounded-lg border hover:border-forest transition-colors">
                <h3 className="font-semibold text-forest mb-1">Passerelle Mobilité</h3>
                <p className="text-sm text-muted-foreground">Changez de métier avec la passerelle T3P</p>
              </Link>
              <Link to="/blog/formation-continue-taxi-vtc" className="p-4 bg-card rounded-lg border hover:border-forest transition-colors">
                <h3 className="font-semibold text-forest mb-1">Guide formation continue</h3>
                <p className="text-sm text-muted-foreground">Tout savoir sur la formation continue</p>
              </Link>
              <Link to="/contact" className="p-4 bg-card rounded-lg border hover:border-forest transition-colors">
                <h3 className="font-semibold text-forest mb-1">Contact</h3>
                <p className="text-sm text-muted-foreground">Réservez votre session maintenant</p>
              </Link>
              <Link to="/" className="p-4 bg-card rounded-lg border hover:border-forest transition-colors">
                <h3 className="font-semibold text-forest mb-1">Accueil</h3>
                <p className="text-sm text-muted-foreground">Retour à la page d'accueil ECOLE T3P</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FormationContinueTaxi;
