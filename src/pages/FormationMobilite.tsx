import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeftRight, Clock, Euro, Users, CheckCircle, Calendar, 
  Phone, Star, GraduationCap, FileText,
  Award, Target, Zap, TrendingUp, Home
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
import heroImageMobilite from "@/assets/formations/hero-mobilite.jpg";

const programModules = [
  {
    title: "Réglementation spécifique",
    duration: "4h",
    topics: ["Différences Taxi/VTC", "Obligations réglementaires", "Zones d'exercice", "Sanctions"]
  },
  {
    title: "Adaptation au nouveau métier",
    duration: "4h",
    topics: ["Spécificités clientèle", "Tarification", "Applications", "Bonnes pratiques"]
  },
  {
    title: "Mise en situation",
    duration: "4h",
    topics: ["Exercices pratiques", "Cas concrets", "Questions/Réponses", "Préparation examen"]
  },
  {
    title: "Examen blanc",
    duration: "2h",
    topics: ["QCM complet", "Correction détaillée", "Points d'amélioration", "Conseils finaux"]
  }
];

const testimonials = [
  {
    name: "Jean-Pierre L.",
    role: "Ex-Taxi, maintenant VTC",
    content: "Après 10 ans en taxi, j'ai voulu diversifier. La formation mobilité m'a permis de basculer en VTC en seulement 2 jours. Très efficace !",
    rating: 5
  },
  {
    name: "Nadia K.",
    role: "Ex-VTC, maintenant Taxi",
    content: "Je voulais accéder aux bornes taxi. La passerelle a été rapide et les formateurs m'ont bien préparée aux spécificités du taxi.",
    rating: 5
  },
  {
    name: "Stéphane M.",
    role: "Double carte Taxi + VTC",
    content: "Grâce à la formation mobilité, je peux maintenant exercer les deux métiers. Plus de flexibilité et plus de revenus !",
    rating: 5
  }
];

const faqs = [
  {
    question: "Qu'est-ce que la formation Mobilité ?",
    answer: "La formation Mobilité est une passerelle qui permet aux chauffeurs de taxi de devenir VTC (et inversement) sans repasser l'intégralité de la formation initiale. Elle dure 14 heures et se concentre sur les spécificités du nouveau métier visé."
  },
  {
    question: "Qui peut suivre la formation Mobilité ?",
    answer: "La formation Mobilité est réservée aux titulaires d'une carte professionnelle Taxi ou VTC en cours de validité. Elle permet d'obtenir la carte complémentaire pour exercer l'autre profession."
  },
  {
    question: "Combien de temps dure la formation Mobilité ?",
    answer: "La formation Mobilité dure 14 heures, généralement réparties sur 2 jours. C'est une formation intensive mais accessible car vous maîtrisez déjà les bases du métier."
  },
  {
    question: "Pourquoi faire la passerelle Taxi vers VTC ?",
    answer: "La passerelle vers VTC vous permet de diversifier votre activité, d'accéder aux plateformes comme Uber ou Bolt, et d'avoir plus de flexibilité dans vos horaires de travail."
  },
  {
    question: "Pourquoi faire la passerelle VTC vers Taxi ?",
    answer: "La passerelle vers Taxi vous donne accès aux bornes taxi, à la maraude (prise en charge dans la rue), et à une clientèle différente. C'est une excellente façon de compléter vos revenus."
  },
  {
    question: "Quel est l'examen à passer ?",
    answer: "L'examen de mobilité est un QCM portant sur les spécificités de la nouvelle profession visée. Il est moins complet que l'examen initial car vous êtes déjà professionnel du transport."
  }
];

const FormationMobilite = () => {
  const [showPreRegistration, setShowPreRegistration] = useState(false);
  const [mobiliteFormation, setMobiliteFormation] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    const fetchFormation = async () => {
      const { data } = await supabase
        .from("formations")
        .select("*")
        .eq("category", "mobilite")
        .eq("is_active", true)
        .order("display_order")
        .limit(1)
        .single();
      
      if (data) {
        setMobiliteFormation(data);
        
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
    "name": "Formation Mobilité - Passerelle Taxi ↔ VTC",
    "description": "Formation passerelle de 14 heures pour passer de Taxi à VTC ou inversement. Obtenez votre double carte professionnelle en 2 jours.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "ECOLE T3P",
      "sameAs": "https://ecolet3p.fr"
    },
    "offers": {
      "@type": "Offer",
      "price": mobiliteFormation?.price || "390",
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
        "name": session.location || "ECOLE T3P Montrouge"
      }
    })),
    "educationalCredentialAwarded": "Carte Professionnelle complémentaire",
    "timeRequired": "PT14H",
    "occupationalCategory": "Chauffeur Taxi/VTC"
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
        <title>Formation Mobilité - Passerelle Taxi VTC | ECOLE T3P Montrouge</title>
        <meta name="description" content="Formation Mobilité 14h pour passer de Taxi à VTC ou inversement. Obtenez votre double carte professionnelle en 2 jours. Formation rapide et efficace." />
        <meta name="keywords" content="formation mobilité, passerelle taxi vtc, double carte professionnelle, formation ECOLE T3P montrouge" />
        <link rel="canonical" href="https://ecolet3p.fr/formations/mobilite" />
        
        {/* Preload critical hero image */}
        <link 
          rel="preload" 
          as="image" 
          href={heroImageMobilite}
          type="image/jpeg"
        />
        
        <meta property="og:title" content="Formation Mobilité - Passerelle Taxi VTC | ECOLE T3P" />
        <meta property="og:description" content="Passez de Taxi à VTC ou inversement en seulement 2 jours avec notre formation Mobilité." />
        <meta property="og:url" content="https://ecolet3p.fr/formations/mobilite" />
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
              "item": "https://ecolet3p.fr/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Formations",
              "item": "https://ecolet3p.fr/formations"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Formation Mobilité",
              "item": "https://ecolet3p.fr/formations/mobilite"
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
                <BreadcrumbPage>Formation Mobilité</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-amber-500/10 via-background to-orange-500/5 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-amber-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-amber-500/10 text-amber-600 border-amber-500/20">
                <ArrowLeftRight className="h-4 w-4 mr-2" />
                Formation Passerelle
              </Badge>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Formation <span className="text-amber-600">Mobilité</span>
                <br />Taxi ↔ VTC
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                Vous êtes déjà chauffeur Taxi ou VTC ? Obtenez votre double carte professionnelle 
                en seulement 2 jours grâce à notre formation passerelle.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-4 py-2 rounded-lg border">
                  <Clock className="h-5 w-5 text-amber-600" />
                  <span className="font-medium">14 heures</span>
                </div>
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-4 py-2 rounded-lg border">
                  <Euro className="h-5 w-5 text-amber-600" />
                  <span className="font-medium">{mobiliteFormation?.price || 390}€</span>
                </div>
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-4 py-2 rounded-lg border">
                  <Zap className="h-5 w-5 text-amber-600" />
                  <span className="font-medium">2 jours</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700" onClick={() => setShowPreRegistration(true)}>
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
                  src={heroImageMobilite} 
                  alt="Promotion formation Mobilité - T3P Campus" 
                  className="w-full h-64 object-cover"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-medium">Nos promotions réussies</p>
                  <p className="text-white/80 text-sm">Centre ECOLE T3P - Montrouge</p>
                </div>
              </div>

              <Card className="bg-background/80 backdrop-blur border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-amber-600" />
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
                  <Button className="w-full bg-amber-600 hover:bg-amber-700" onClick={() => setShowPreRegistration(true)}>
                    Réserver ma place
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Deux parcours */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">Deux parcours possibles</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Choisissez votre passerelle
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Taxi → VTC</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-center">
                    Vous êtes chauffeur de taxi et souhaitez accéder au marché VTC
                  </p>
                  <div className="space-y-3">
                    {[
                      "Accès aux plateformes Uber, Bolt, Heetch",
                      "Flexibilité des horaires",
                      "Clientèle différente",
                      "Diversification des revenus"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-secondary/20 hover:border-secondary/40 transition-colors">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="h-8 w-8 text-secondary rotate-180" />
                  </div>
                  <CardTitle className="text-2xl">VTC → Taxi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-center">
                    Vous êtes chauffeur VTC et souhaitez devenir taxi
                  </p>
                  <div className="space-y-3">
                    {[
                      "Accès aux bornes taxi",
                      "Maraude autorisée",
                      "Clientèle garantie",
                      "Tarifs réglementés"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programme */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">Programme condensé</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              14 heures intensives
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une formation courte et efficace adaptée aux professionnels du transport
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
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
                      <Badge variant="outline" className="text-amber-600 border-amber-600">
                        Jour {Math.ceil((index + 1) / 2)}
                      </Badge>
                      <span className="text-sm font-medium text-muted-foreground">{module.duration}</span>
                    </div>
                    <CardTitle className="text-lg mt-2">{module.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {module.topics.map((topic, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
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

      {/* Prérequis et Tarif */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4">Conditions d'accès</Badge>
              <h2 className="text-3xl font-bold mb-6">
                Prérequis pour la formation
              </h2>
              
              <div className="space-y-4">
                {[
                  { icon: FileText, text: "Carte professionnelle Taxi OU VTC en cours de validité" },
                  { icon: Award, text: "3 mois minimum d'exercice professionnel" },
                  { icon: Target, text: "Attestation de l'exploitant ou déclaration sur l'honneur" },
                  { icon: Users, text: "Être à jour de ses obligations professionnelles" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg border">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                      <item.icon className="h-5 w-5 text-amber-600" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Euro className="h-5 w-5 text-amber-600" />
                    Tarif formation Mobilité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-6 bg-background rounded-lg">
                    <p className="text-4xl font-bold text-amber-600">{mobiliteFormation?.price || 390}€</p>
                    <p className="text-muted-foreground">Formation 2 jours</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>14 heures de formation</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Supports de cours inclus</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Examen blanc inclus</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Paiement en 2x possible</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-amber-600 hover:bg-amber-700" size="lg" onClick={() => setShowPreRegistration(true)}>
                    Réserver ma place
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">Témoignages</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ils ont fait la passerelle
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
                    <p className="text-muted-foreground mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center">
                        <span className="font-bold text-amber-600">{testimonial.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">FAQ</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Questions fréquentes
            </h2>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-muted/30 rounded-lg border px-6">
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

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Prêt à élargir vos horizons ?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Obtenez votre double carte professionnelle et doublez vos opportunités
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" onClick={() => setShowPreRegistration(true)}>
              <GraduationCap className="mr-2 h-5 w-5" />
              S'inscrire maintenant
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-amber-600" asChild>
              <a href="tel:0188750555">
                <Phone className="mr-2 h-5 w-5" />
                01 88 75 05 55
              </a>
            </Button>
          </div>
        </div>
      </section>

      <PreRegistrationForm
        isOpen={showPreRegistration}
        onClose={() => setShowPreRegistration(false)}
        formationTitle={mobiliteFormation?.title || "Formation Mobilité"}
        formationDuration={mobiliteFormation?.duration || "14h"}
      />
    </Layout>
  );
};

export default FormationMobilite;
