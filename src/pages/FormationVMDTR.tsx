import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Bike, Clock, Euro, Users, CheckCircle, Calendar, 
  Phone, Star, GraduationCap, FileText,
  Award, Target, BookOpen, Home, Shield, Zap
} from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PreRegistrationForm from "@/components/formations/PreRegistrationForm";
import { supabase } from "@/integrations/supabase/client";
import { getAvailableSpots, isSessionFull } from "@/hooks/useFormationSessions";
import heroImageVMDTR from "@/assets/center/salle-formation-equipee.jpg";

const programModules = [
  {
    title: "Réglementation VMDTR",
    duration: "10h",
    topics: ["Statut moto-taxi", "Code des transports", "Obligations professionnelles", "Assurances spécifiques"]
  },
  {
    title: "Sécurité deux-roues",
    duration: "12h",
    topics: ["Conduite défensive", "Gestion des risques", "Équipements de sécurité", "Premiers secours"]
  },
  {
    title: "Conduite en milieu urbain",
    duration: "8h",
    topics: ["Circulation inter-files", "Gestion du trafic dense", "Stationnement", "Itinéraires optimisés"]
  },
  {
    title: "Relation client",
    duration: "6h",
    topics: ["Accueil passager", "Gestion du stress", "Communication", "Équipement passager"]
  },
  {
    title: "Gestion d'entreprise",
    duration: "8h",
    topics: ["Création d'entreprise", "Comptabilité", "Fiscalité", "Applications de réservation"]
  },
  {
    title: "Examen et mise en situation",
    duration: "4h",
    topics: ["QCM réglementaire", "Mise en situation pratique", "Correction", "Conseils finaux"]
  }
];

const testimonials = [
  {
    name: "Julien M.",
    role: "Moto-taxi Paris depuis 2024",
    content: "Formation top ! J'étais motard depuis 10 ans mais la formation m'a appris toutes les spécificités du transport de passagers. Les formateurs sont passionnés.",
    rating: 5
  },
  {
    name: "Sarah K.",
    role: "VMDTR indépendante",
    content: "Excellente formation, très axée sur la sécurité. J'ai beaucoup appris sur la réglementation et la gestion de mon activité. Je recommande à 100% !",
    rating: 5
  },
  {
    name: "Antoine R.",
    role: "Chauffeur VMDTR premium",
    content: "Reconversion réussie grâce à T3P Campus. L'équipe est au top et le paiement en 4x m'a permis de me lancer sereinement dans cette nouvelle aventure.",
    rating: 5
  }
];

const faqs = [
  {
    question: "Qu'est-ce que le VMDTR ?",
    answer: "VMDTR signifie Véhicule Motorisé à Deux ou Trois Roues. C'est le statut officiel des moto-taxis en France. Cette activité permet de transporter des passagers à titre onéreux sur un deux-roues motorisé."
  },
  {
    question: "Quels sont les prérequis pour devenir moto-taxi ?",
    answer: "Pour devenir VMDTR, vous devez avoir au minimum 21 ans, être titulaire du permis A depuis au moins 3 ans (ou 5 ans pour le permis A2), avoir un casier judiciaire vierge et passer une visite médicale. Une expérience significative de la conduite moto est fortement recommandée."
  },
  {
    question: "Combien de temps dure la formation VMDTR ?",
    answer: "La formation VMDTR initiale dure 48 heures, réparties sur environ 2 semaines. Elle comprend des modules théoriques et des mises en situation pratiques."
  },
  {
    question: "Quel type de moto puis-je utiliser ?",
    answer: "Vous pouvez utiliser une moto, un scooter ou un trois-roues d'une cylindrée minimale de 125cc. Le véhicule doit être homologué pour le transport de passagers et équipé d'un siège passager confortable, de repose-pieds et de poignées de maintien."
  },
  {
    question: "Quels équipements sont obligatoires ?",
    answer: "Vous devez fournir à votre passager un casque homologué à sa taille, des gants, un gilet réfléchissant et une protection dorsale. Vous-même devez porter l'ensemble de ces équipements."
  },
  {
    question: "Comment financer ma formation VMDTR ?",
    answer: "Nous proposons le paiement en 4x sans frais pour faciliter votre accès à la formation. D'autres solutions de financement peuvent être étudiées selon votre situation."
  }
];

const FormationVMDTR = () => {
  const [showPreRegistration, setShowPreRegistration] = useState(false);
  const [vmdtrFormation, setVmdtrFormation] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    const fetchFormation = async () => {
      const { data } = await supabase
        .from("formations")
        .select("*")
        .eq("category", "vmdtr")
        .eq("is_active", true)
        .order("display_order")
        .limit(1)
        .maybeSingle();
      
      if (data) {
        setVmdtrFormation(data);
        
        const { data: sessionsData } = await supabase
          .from("formation_sessions")
          .select("*")
          .eq("formation_id", data.id)
          .in("status", ["upcoming", "ongoing"])
          .order("start_date")
          .limit(3);
        
        setSessions(sessionsData || []);
      }
    };
    
    fetchFormation();
  }, []);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Formation VMDTR - Moto-Taxi Professionnel",
    "description": "Formation complète pour obtenir votre carte professionnelle VMDTR (moto-taxi). Apprenez la sécurité, la réglementation et la gestion d'entreprise.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "T3P Campus",
      "sameAs": "https://t3pcampus.fr"
    },
    "offers": {
      "@type": "Offer",
      "price": vmdtrFormation?.price || "1490",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    },
    "hasCourseInstance": sessions.map((session) => ({
      "@type": "CourseInstance",
      "courseMode": "onsite",
      "startDate": session.start_date,
      "endDate": session.end_date,
      "location": {
        "@type": "Place",
        "name": session.location || "T3P Campus Montrouge"
      }
    })),
    "educationalCredentialAwarded": "Carte Professionnelle VMDTR",
    "timeRequired": "PT48H",
    "occupationalCategory": "Moto-Taxi VMDTR"
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>Formation VMDTR Moto-Taxi - Carte Professionnelle | T3P Campus</title>
        <meta name="description" content="Formation VMDTR moto-taxi complète à Montrouge. 48h de formation, équipements de sécurité, paiement en 4x sans frais. Obtenez votre carte professionnelle moto-taxi." />
        <meta name="keywords" content="formation VMDTR, formation moto-taxi, carte professionnelle moto-taxi, devenir moto-taxi, formation T3P" />
        <link rel="canonical" href="https://t3pcampus.fr/formations/vmdtr" />
        
        <meta property="og:title" content="Formation VMDTR Moto-Taxi - Carte Professionnelle | T3P Campus" />
        <meta property="og:description" content="Formation VMDTR moto-taxi complète. 48h de formation professionnelle. Devenez moto-taxi professionnel." />
        <meta property="og:url" content="https://t3pcampus.fr/formations/vmdtr" />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Accueil",
              "item": "https://t3pcampus.fr/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Formations",
              "item": "https://t3pcampus.fr/formations"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Formation VMDTR",
              "item": "https://t3pcampus.fr/formations/vmdtr"
            }
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
                <BreadcrumbPage>Formation VMDTR</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-orange-500/10 via-background to-red-500/5 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-red-500 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-orange-500/10 text-orange-600 border-orange-500/20">
                <Bike className="h-4 w-4 mr-2" />
                Formation Moto-Taxi
              </Badge>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Formation <span className="text-orange-600">VMDTR</span>
                <br />Moto-Taxi Professionnel
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                Devenez moto-taxi professionnel avec notre formation complète de 48 heures. 
                Maîtrisez la sécurité, la réglementation et lancez votre activité.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-4 py-2 rounded-lg border">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <span className="font-medium">48 heures</span>
                </div>
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-4 py-2 rounded-lg border">
                  <Euro className="h-5 w-5 text-orange-600" />
                  <span className="font-medium">{vmdtrFormation?.price || 1490}€</span>
                </div>
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-4 py-2 rounded-lg border">
                  <Shield className="h-5 w-5 text-orange-600" />
                  <span className="font-medium">Sécurité renforcée</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700" onClick={() => setShowPreRegistration(true)}>
                  <GraduationCap className="mr-2 h-5 w-5" />
                  S'inscrire à la formation
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">
                    <Phone className="mr-2 h-5 w-5" />
                    Nous contacter
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block space-y-6"
            >
              {/* Hero Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImageVMDTR} 
                  alt="Formation VMDTR moto-taxi - T3P Campus" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-medium">Formation spécialisée moto-taxi</p>
                  <p className="text-white/80 text-sm">Centre T3P Campus - Montrouge</p>
                </div>
              </div>

              <Card className="bg-background/80 backdrop-blur border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    Prochaines sessions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sessions.length > 0 ? (
                    sessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">{formatDate(session.start_date)}</p>
                          <p className="text-sm text-muted-foreground">
                            {session.start_time} - {session.end_time}
                          </p>
                        </div>
                        <div className="text-right">
                          {isSessionFull({ ...session, max_participants: session.max_participants, current_participants: session.current_participants }) ? (
                            <Badge variant="secondary">Complet</Badge>
                          ) : (
                            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                              {getAvailableSpots({ ...session, max_participants: session.max_participants, current_participants: session.current_participants })} places
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      Contactez-nous pour connaître les prochaines dates
                    </p>
                  )}
                  <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={() => setShowPreRegistration(true)}>
                    Réserver ma place
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Avantages VMDTR */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Pourquoi devenir Moto-Taxi ?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Le métier de moto-taxi offre de nombreux avantages pour les passionnés de deux-roues
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Rapidité", desc: "Traversez Paris en un temps record" },
              { icon: Euro, title: "Revenus attractifs", desc: "Tarifs premium pour un service exclusif" },
              { icon: Shield, title: "Indépendance", desc: "Gérez votre activité en toute liberté" },
              { icon: Bike, title: "Passion", desc: "Faites de votre passion votre métier" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-xl p-6 text-center shadow-sm"
              >
                <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Programme de la Formation</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              48 heures de formation complète pour maîtriser tous les aspects du métier de moto-taxi
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programModules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        {module.duration}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {module.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prérequis */}
      <section className="py-16 lg:py-24 bg-orange-500/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Prérequis pour la Formation</h2>
              <ul className="space-y-4">
                {[
                  "Avoir au minimum 21 ans",
                  "Permis A depuis au moins 3 ans (ou A2 depuis 5 ans)",
                  "Casier judiciaire vierge (bulletin n°2)",
                  "Aptitude médicale (visite médicale obligatoire)",
                  "Expérience significative de conduite moto recommandée"
                ].map((prereq, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{prereq}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-background">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-orange-600" />
                    Ce qui est inclus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "48 heures de formation complète",
                      "Supports pédagogiques numériques",
                      "Préparation à l'examen théorique",
                      "Mises en situation pratiques",
                      "Accompagnement post-formation",
                      "Paiement en 4x sans frais"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Ils sont devenus Moto-Taxi</h2>
            <p className="text-muted-foreground">Découvrez les témoignages de nos anciens stagiaires</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Questions Fréquentes</h2>
            <p className="text-muted-foreground">Tout ce que vous devez savoir sur la formation VMDTR</p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
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

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Prêt à devenir Moto-Taxi ?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Inscrivez-vous dès maintenant et transformez votre passion pour la moto en carrière professionnelle.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" onClick={() => setShowPreRegistration(true)}>
                <GraduationCap className="mr-2 h-5 w-5" />
                S'inscrire à la formation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Nous contacter
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pre-registration Dialog */}
      <Dialog open={showPreRegistration} onOpenChange={setShowPreRegistration}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Pré-inscription Formation VMDTR</DialogTitle>
          </DialogHeader>
          <PreRegistrationForm
            formationTitle={vmdtrFormation?.title || "Formation VMDTR"}
            formationDuration={vmdtrFormation?.duration || "48h"}
            isOpen={showPreRegistration}
            onClose={() => setShowPreRegistration(false)}
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default FormationVMDTR;