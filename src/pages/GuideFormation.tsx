import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen, Target, Layers, GraduationCap, ShieldCheck, FileDown,
  Car, Users, FileCheck, Briefcase, TrendingUp,
  Phone, ArrowRight, CheckCircle, Home, Star,
  Scale, Globe, MessageCircle, Route, HeartHandshake,
  ClipboardList, Building, Bike, MonitorSmartphone,
  Lightbulb, CircleDollarSign, MapPin, Clock
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AnimatedSection, AnimatedContainer, AnimatedItem } from "@/components/ui/AnimatedSection";

/* ─────────── Data ─────────── */

const modulesCommuns = [
  { title: "Réglementation T3P", coef: 3, icon: Scale, desc: "Les règles du transport de personnes, vos droits et obligations professionnelles." },
  { title: "Gestion & entreprise", coef: 2, icon: Briefcase, desc: "Comptabilité simplifiée, statuts juridiques et gestion au quotidien." },
  { title: "Sécurité routière", coef: 3, icon: ShieldCheck, desc: "Prévention des risques, conduite préventive et premiers réflexes." },
  { title: "Français & communication", coef: 2, icon: MessageCircle, desc: "Accueil client, communication claire et relation de confiance." },
  { title: "Anglais professionnel", coef: 1, icon: Globe, desc: "Vocabulaire essentiel pour accueillir une clientèle internationale." },
];

const modulesSpecifiques = [
  {
    title: "Spécifique TAXI",
    coef: 3,
    icon: Car,
    color: "gold",
    competences: [
      "Maîtrise de la tarification horodatée",
      "Connaissance de la zone géographique (départementale)",
      "Prise en charge en station et maraude",
      "Réglementation propre au taxi",
    ],
    lien: "Vous serez prêt à exercer en tant que taxi, en indépendant ou salarié, avec une parfaite connaissance de votre zone."
  },
  {
    title: "Spécifique VTC / VMDTR",
    coef: 3,
    icon: Route,
    color: "forest",
    competences: [
      "Service premium et relation client haut de gamme",
      "Réservation préalable et gestion des plateformes",
      "Navigation GPS et optimisation d'itinéraire",
      "Réglementation propre au VTC et au VMDTR",
    ],
    lien: "Vous serez préparé à offrir un service de qualité sur réservation, en véhicule ou en moto."
  },
];

const conditionsAcces = [
  { icon: Car, label: "Permis B en cours de validité" },
  { icon: HeartHandshake, label: "Aptitude médicale (visite médicale préfectorale)" },
  { icon: FileCheck, label: "Casier judiciaire compatible (bulletin n°2)" },
  { icon: ShieldCheck, label: "Attestation de premiers secours (PSC1 recommandé)" },
];

const epreuvesPratiques = [
  { icon: Car, label: "Conduite en conditions réelles" },
  { icon: Users, label: "Relation client et accueil passager" },
  { icon: ShieldCheck, label: "Sécurité et vérifications du véhicule" },
  { icon: MapPin, label: "Choix d'itinéraire et gestion du trajet" },
];

const etapesCarte = [
  { step: 1, title: "Réussite de l'examen", desc: "Obtention de l'attestation de réussite délivrée par la CMA." },
  { step: 2, title: "Constitution du dossier", desc: "Rassemblement des pièces justificatives nécessaires." },
  { step: 3, title: "Dépôt en préfecture", desc: "Transmission de votre dossier complet à la préfecture compétente." },
  { step: 4, title: "Réception de la carte", desc: "Vous recevez votre carte professionnelle et pouvez exercer." },
];

const opportunites = [
  { icon: Building, label: "Indépendant", desc: "Créez votre propre activité et gérez votre emploi du temps." },
  { icon: Users, label: "Salarié", desc: "Rejoignez une société de transport en tant que chauffeur." },
  { icon: MonitorSmartphone, label: "Plateformes", desc: "Travaillez via des applications de réservation (Uber, Bolt…)." },
  { icon: Car, label: "Taxi traditionnel", desc: "Exercez en station ou en maraude dans votre département." },
  { icon: Bike, label: "VMDTR (moto-taxi)", desc: "Transportez des passagers à moto dans les grandes agglomérations." },
];

/* ─────────── Component ─────────── */

const GuideFormation = () => {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Guide de formation Taxi, VTC, VMDTR — ECOLE T3P",
    description: "Guide pédagogique complet pour comprendre la formation initiale T3P : programme, examen, carte professionnelle et débouchés.",
    provider: { "@type": "EducationalOrganization", name: "ECOLE T3P", sameAs: "https://www.ecolet3p.fr" },
  };

  return (
    <Layout>
      <Helmet>
        <title>Guide de Formation Taxi VTC VMDTR | ECOLE T3P</title>
        <meta name="description" content="Guide pédagogique pas à pas : programme de formation, modules, examen, carte professionnelle et opportunités pour devenir chauffeur Taxi, VTC ou VMDTR." />
        <link rel="canonical" href="https://www.ecolet3p.fr/guide-formation" />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-muted/30 py-3 border-b">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/" className="flex items-center gap-1"><Home className="h-4 w-4" />Accueil</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/formations">Formations</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Guide de formation</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* ───── 1. Hero / Accueil apprenant ───── */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="mb-6 bg-forest/10 text-forest border-forest/20">
                <BookOpen className="h-4 w-4 mr-2" />
                Guide de l'apprenant
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-forest mb-6 leading-tight">
                Vous débutez votre formation ?<br />
                <span className="text-gold">Cette page vous guide pas à pas.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                La formation est accessible, structurée et accompagnée. Quel que soit votre parcours,
                notre équipe pédagogique est là pour vous mener jusqu'à l'obtention de votre carte professionnelle.
              </p>
              <Link to="/guide-formation/pdf" className="inline-flex items-center gap-2 bg-forest text-white px-6 py-3 rounded-lg hover:bg-forest/90 transition-colors font-medium">
                <FileDown className="h-5 w-5" />
                Télécharger le guide en PDF
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── 2. Objectif de la formation ───── */}
      <AnimatedSection className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-forest mb-8 text-center">
              <Target className="inline-block h-7 w-7 mr-2 text-gold -mt-1" />
              Objectif de la formation
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              La formation initiale T3P vous prépare à exercer le métier de chauffeur <strong className="text-forest">Taxi</strong>, <strong className="text-forest">VTC</strong> ou <strong className="text-forest">VMDTR</strong>.
              Ces trois métiers partagent un socle commun de compétences.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: GraduationCap, text: "Réussir l'examen T3P (théorie + pratique)" },
                { icon: FileCheck, text: "Obtenir votre carte professionnelle" },
                { icon: Briefcase, text: "Exercer légalement et sereinement" },
              ].map((item, i) => (
                <Card key={i} className="text-center border-forest/10 hover:shadow-warm transition-shadow">
                  <CardContent className="pt-8 pb-6 flex flex-col items-center gap-3">
                    <div className="icon-container">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <p className="font-semibold text-forest text-sm">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ───── 3. Organisation de la formation ───── */}
      <AnimatedSection className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-forest mb-4 text-center">
              <Layers className="inline-block h-7 w-7 mr-2 text-gold -mt-1" />
              Organisation de la formation
            </h2>
            <p className="text-center text-muted-foreground mb-10">Deux grandes étapes pour devenir professionnel.</p>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  step: "Étape 1",
                  title: "Admissibilité — Théorie",
                  desc: "7 épreuves écrites (QCM + QRC) couvrant les modules communs et spécifiques. Vous êtes accompagné tout au long de la préparation.",
                  icon: BookOpen,
                },
                {
                  step: "Étape 2",
                  title: "Admission — Pratique",
                  desc: "Mise en situation réelle de conduite et de relation client, exactement dans les conditions de l'examen.",
                  icon: Car,
                },
              ].map((block, i) => (
                <Card key={i} className="relative overflow-hidden border-forest/10">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-forest to-gold" />
                  <CardContent className="pt-8 pb-6">
                    <Badge variant="outline" className="mb-3 text-xs">{block.step}</Badge>
                    <div className="flex items-center gap-3 mb-3">
                      <block.icon className="h-6 w-6 text-forest" />
                      <h3 className="text-lg font-bold text-forest">{block.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{block.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Encadré "À retenir" */}
            <div className="mt-8 rounded-xl border-2 border-gold/30 bg-gold/5 p-5 flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
              <p className="text-sm text-forest leading-relaxed">
                <strong>À retenir :</strong> Notre centre vous accompagne sur les deux volets. Les cours sont dispensés en présentiel à Montrouge, avec des supports pédagogiques modernes et des examens blancs réguliers.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ───── 4. Les 5 modules communs ───── */}
      <AnimatedSection className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-forest mb-4 text-center">
              <BookOpen className="inline-block h-7 w-7 mr-2 text-gold -mt-1" />
              Les 5 modules du tronc commun
            </h2>
            <p className="text-center text-muted-foreground mb-10">Ces matières sont communes aux trois métiers (Taxi, VTC, VMDTR).</p>

            <AnimatedContainer className="space-y-4" staggerDelay={0.08}>
              {modulesCommuns.map((m, i) => (
                <AnimatedItem key={i}>
                  <Card className="border-forest/10 hover:shadow-warm transition-shadow">
                    <CardContent className="py-5 px-6 flex items-center gap-5">
                      <div className="icon-container flex-shrink-0">
                        <m.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-bold text-forest text-base">{m.title}</h3>
                          <Badge variant="outline" className="text-[10px] px-2 py-0">Coef. {m.coef}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{m.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedItem>
              ))}
            </AnimatedContainer>
          </div>
        </div>
      </AnimatedSection>

      {/* ───── 5. Les 2 modules spécifiques ───── */}
      <AnimatedSection className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-forest mb-4 text-center">
              <Star className="inline-block h-7 w-7 mr-2 text-gold -mt-1" />
              Les 2 modules spécifiques
            </h2>
            <p className="text-center text-muted-foreground mb-10">En plus du tronc commun, chaque métier a son épreuve spécifique.</p>

            <div className="grid md:grid-cols-2 gap-8">
              {modulesSpecifiques.map((m, i) => (
                <Card key={i} className="relative overflow-hidden border-forest/10">
                  <div className={`absolute top-0 left-0 w-full h-1 ${i === 0 ? "bg-gold" : "bg-forest"}`} />
                  <CardContent className="pt-8 pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <m.icon className={`h-6 w-6 ${i === 0 ? "text-gold" : "text-forest"}`} />
                      <h3 className="text-lg font-bold text-forest">{m.title}</h3>
                      <Badge variant="outline" className="text-[10px] ml-auto">Coef. {m.coef}</Badge>
                    </div>
                    <ul className="space-y-2 my-4">
                      {m.competences.map((c, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="rounded-lg bg-forest/5 p-3">
                      <p className="text-xs text-forest leading-relaxed"><strong>Lien avec le métier :</strong> {m.lien}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ───── 6. Conditions d'accès ───── */}
      <AnimatedSection className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-forest mb-4 text-center">
              <ClipboardList className="inline-block h-7 w-7 mr-2 text-gold -mt-1" />
              Conditions d'accès
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              La formation est ouverte à toute personne remplissant ces critères simples.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {conditionsAcces.map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-card rounded-xl border border-forest/10">
                  <c.icon className="h-5 w-5 text-forest flex-shrink-0" />
                  <span className="text-sm font-medium text-forest">{c.label}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl border-2 border-gold/30 bg-gold/5 p-5 flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
              <p className="text-sm text-forest leading-relaxed">
                <strong>Pas sûr de votre éligibilité ?</strong> Notre équipe vous accompagne pour vérifier chaque condition et vous aider dans vos démarches.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ───── 7. Épreuve pratique ───── */}
      <AnimatedSection className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-forest mb-4 text-center">
              <Car className="inline-block h-7 w-7 mr-2 text-gold -mt-1" />
              L'épreuve pratique
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Une mise en situation réelle qui évalue votre maîtrise globale du métier.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {epreuvesPratiques.map((e, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-card rounded-xl border border-forest/10">
                  <e.icon className="h-5 w-5 text-gold flex-shrink-0" />
                  <span className="text-sm font-medium text-forest">{e.label}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl border-2 border-forest/20 bg-forest/5 p-5 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-forest flex-shrink-0 mt-0.5" />
              <p className="text-sm text-forest leading-relaxed">
                <strong>Vous êtes préparé exactement dans les conditions de l'examen.</strong> Des mises en situation régulières sont organisées tout au long de la formation pour que le jour J ne soit qu'une formalité.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ───── 8. Démarches carte professionnelle ───── */}
      <AnimatedSection className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-forest mb-4 text-center">
              <FileCheck className="inline-block h-7 w-7 mr-2 text-gold -mt-1" />
              Obtenir votre carte professionnelle
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Quatre étapes claires pour aller de la réussite à l'exercice du métier.
            </p>

            <div className="space-y-0">
              {etapesCarte.map((e, i) => (
                <div key={i} className="flex gap-5 pb-8 relative">
                  {/* Line */}
                  {i < etapesCarte.length - 1 && (
                    <div className="absolute left-[27px] top-14 bottom-0 w-0.5 bg-forest/15" />
                  )}
                  <div className="step-number flex-shrink-0 z-10">{e.step}</div>
                  <div className="pt-1">
                    <h3 className="font-bold text-forest text-base mb-1">{e.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border-2 border-gold/30 bg-gold/5 p-5 flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
              <p className="text-sm text-forest leading-relaxed">
                <strong>Le centre vous guide dans vos démarches administratives,</strong> de la constitution du dossier jusqu'au dépôt en préfecture.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ───── 9. Opportunités professionnelles ───── */}
      <AnimatedSection className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-forest mb-4 text-center">
              <Briefcase className="inline-block h-7 w-7 mr-2 text-gold -mt-1" />
              Vos opportunités après la formation
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              La carte professionnelle ouvre la porte à plusieurs modes d'exercice.
            </p>

            <AnimatedContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
              {opportunites.map((o, i) => (
                <AnimatedItem key={i}>
                  <Card className="h-full border-forest/10 hover:shadow-warm transition-shadow text-center">
                    <CardContent className="pt-6 pb-5 flex flex-col items-center gap-3">
                      <div className="icon-container">
                        <o.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-bold text-forest text-sm">{o.label}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{o.desc}</p>
                    </CardContent>
                  </Card>
                </AnimatedItem>
              ))}
            </AnimatedContainer>
          </div>
        </div>
      </AnimatedSection>

      {/* ───── 10. Exemple de rentabilité ───── */}
      <AnimatedSection className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-forest mb-4 text-center">
              <TrendingUp className="inline-block h-7 w-7 mr-2 text-gold -mt-1" />
              Exemple de rentabilité journalière
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Un aperçu pédagogique pour rendre le métier concret.
            </p>

            <Card className="border-forest/10 overflow-hidden">
              <div className="bg-forest text-primary-foreground px-6 py-4">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <CircleDollarSign className="h-5 w-5" />
                  Simulation indicative — Chauffeur VTC
                </h3>
              </div>
              <CardContent className="pt-6 pb-5">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-3">Hypothèses</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><Clock className="h-4 w-4 text-forest flex-shrink-0 mt-0.5" />10 courses par jour</li>
                      <li className="flex items-start gap-2"><CircleDollarSign className="h-4 w-4 text-forest flex-shrink-0 mt-0.5" />Panier moyen : 25 €</li>
                      <li className="flex items-start gap-2"><Car className="h-4 w-4 text-forest flex-shrink-0 mt-0.5" />Charges journalières estimées : 80 €</li>
                    </ul>
                  </div>
                  <div className="flex flex-col justify-center items-center bg-forest/5 rounded-xl p-6">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-2">Revenu net estimé / jour</p>
                    <p className="text-3xl font-black text-forest">~ 170 €</p>
                    <p className="text-xs text-muted-foreground mt-1">soit ~ 3 700 € / mois</p>
                  </div>
                </div>

                <Separator className="my-5" />

                <div className="rounded-lg bg-gold/5 border border-gold/20 p-4 flex items-start gap-3">
                  <Lightbulb className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong className="text-forest">Exemple non contractuel.</strong> Les revenus réels dépendent de nombreux facteurs : zone géographique, nombre d'heures travaillées, charges sociales et fiscales, type de véhicule, etc. Ces chiffres sont donnés à titre purement indicatif et pédagogique.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AnimatedSection>

      {/* ───── 11. CTA final ───── */}
      <section className="py-20 bg-forest text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Vous n'êtes pas seul.
              </h2>
              <p className="text-primary-foreground/80 mb-10 max-w-xl mx-auto">
                Notre centre vous accompagne de l'inscription à l'obtention de votre carte professionnelle. Chaque étape est pensée pour vous mener à la réussite.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="btn-accent">
                  <Link to="/formations">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Découvrir le programme
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/contact">
                    <Phone className="mr-2 h-5 w-5" />
                    Nous contacter
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GuideFormation;
