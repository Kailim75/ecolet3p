import React, { useState, useEffect } from "react";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import TrustBar from "@/components/home/TrustBar";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  CarTaxiFront, Clock, Euro, Users, CheckCircle, Calendar, 
  MapPin, Phone, Star, GraduationCap, FileText,
  Award, Target, BookOpen, Home, Car, Smartphone
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
import StepPreRegistrationForm from "@/components/formations/StepPreRegistrationForm";
import UpcomingSessionsCard from "@/components/formations/UpcomingSessionsCard";
import PricingPaymentBlock from "@/components/formations/PricingPaymentBlock";
import ExamProgramSection from "@/components/formations/ExamProgramSection";
import { useFormations } from "@/hooks/useFormations";
import { useFormationSessions, getAvailableSpots, isSessionFull } from "@/hooks/useFormationSessions";
import { supabase } from "@/integrations/supabase/client";
import heroImageTaxi from "@/assets/formations/hero-taxi.jpg";
import PlacesProgressBar from "@/components/home/PlacesProgressBar";

const programModules = [
  {
    title: "Réglementation du transport public",
    duration: "14h",
    topics: ["Code des transports", "Statut du taxi", "Obligations professionnelles", "Sanctions et contrôles"]
  },
  {
    title: "Gestion d'entreprise",
    duration: "10h",
    topics: ["Création d'entreprise", "Comptabilité", "Fiscalité", "Charges sociales"]
  },
  {
    title: "Sécurité routière",
    duration: "8h",
    topics: ["Conduite préventive", "Gestion des risques", "Premiers secours", "Éco-conduite"]
  },
  {
    title: "Relation client",
    duration: "6h",
    topics: ["Accueil client", "Gestion des conflits", "Communication", "Qualité de service"]
  },
  {
    title: "Développement commercial",
    duration: "4h",
    topics: ["Fidélisation", "Applications", "Partenariats", "Stratégie tarifaire"]
  },
  {
    title: "Connaissance du territoire",
    duration: "21h",
    topics: ["Géographie locale", "Points d'intérêt", "Itinéraires optimisés", "Réglementation locale"]
  }
];

const testimonials = [
  {
    name: "Marc D.",
    role: "Chauffeur Taxi depuis 2024",
    content: "Formation très complète. Les formateurs connaissent parfaitement le métier et transmettent leur passion. J'ai obtenu ma carte professionnelle du premier coup !",
    rating: 5
  },
  {
    name: "Sophie L.",
    role: "Reconversion réussie",
    content: "Après 15 ans dans la grande distribution, j'ai trouvé ma voie. L'équipe m'a accompagnée du début à la fin. Le paiement en 4x m'a permis de financer ma formation sereinement.",
    rating: 5
  },
  {
    name: "Karim B.",
    role: "Chauffeur Taxi indépendant",
    content: "Excellente préparation à l'examen. Les cours sur la réglementation et la gestion d'entreprise m'ont été très utiles pour lancer mon activité.",
    rating: 5
  }
];

const faqs = [
  {
    question: "Quels sont les prérequis pour devenir chauffeur de taxi ?",
    answer: "Pour suivre la formation taxi, vous devez avoir au minimum 21 ans, être titulaire du permis B depuis au moins 3 ans, avoir un casier judiciaire vierge (bulletin n°2), et être apte médicalement (visite médicale obligatoire)."
  },
  {
    question: "Combien de temps dure la formation taxi ?",
    answer: "La formation taxi initiale dure 63 heures en formation journée ou 33 heures en formation accélérée soirée. Elle se déroule sur 2 à 4 semaines selon le format choisi."
  },
  {
    question: "Quel est le taux de réussite à l'examen taxi ?",
    answer: "Notre taux de réussite est de 94% dès la première présentation. Nous proposons un accompagnement personnalisé et des sessions de révision pour maximiser vos chances de réussite."
  },
  {
    question: "Comment financer ma formation taxi ?",
    answer: "Nous proposons un paiement en 4x sans frais pour faciliter votre accès à la formation. Notre équipe vous accompagne pour trouver la solution adaptée à votre budget."
  },
  {
    question: "L'examen taxi est-il difficile ?",
    answer: "L'examen comporte plusieurs épreuves : QCM sur la réglementation, gestion, sécurité routière et une épreuve de conduite. Avec une bonne préparation, il est tout à fait accessible. Nos formateurs vous préparent spécifiquement à chaque épreuve."
  },
  {
    question: "Puis-je travailler pendant la formation ?",
    answer: "Nous proposons des formations en journée (9h-17h) ou en soirée (18h-22h) pour s'adapter à votre emploi du temps. La formation soirée permet de continuer à travailler en parallèle."
  }
];

const FormationTaxi = () => {
  const [showPreRegistration, setShowPreRegistration] = useState(false);
  const isDesktop = useIsDesktop();
  const [taxiFormations, setTaxiFormations] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);

  const taxiFormation = taxiFormations.find(f => f.title?.toLowerCase().includes('initial')) || taxiFormations[0];
  const soireeFormation = taxiFormations.find(f => f.title?.toLowerCase().includes('soirée'));

  useEffect(() => {
    const fetchFormations = async () => {
      const { data } = await supabase
        .from("formations")
        .select("*")
        .eq("category", "taxi")
        .eq("is_active", true)
        .order("display_order");
      
      if (data && data.length > 0) {
        setTaxiFormations(data);
        
        const formationIds = data.map(f => f.id);
        const { data: sessionsData } = await supabase
          .from("formation_sessions")
          .select("*, formations(title)")
          .in("formation_id", formationIds)
          .in("status", ["upcoming", "ongoing"])
          .order("start_date")
          .limit(6);
        
        const mapped = (sessionsData || []).map(s => ({
          ...s,
          formation_title: (s as any).formations?.title
        }));
        // Sort: Soirée sessions first, then by date
        mapped.sort((a, b) => {
          const aIsSoiree = a.formation_title?.toLowerCase().includes('soirée') ? 0 : 1;
          const bIsSoiree = b.formation_title?.toLowerCase().includes('soirée') ? 0 : 1;
          if (aIsSoiree !== bIsSoiree) return aIsSoiree - bIsSoiree;
          return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
        });
        setSessions(mapped);
      }
    };
    
    fetchFormations();
  }, []);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Formation T3P - Parcours Taxi Professionnel",
    "description": "Parcours Taxi de la formation T3P pour obtenir votre carte professionnelle. 63h de formation, taux de réussite 94%, formateurs experts, paiement en 4x sans frais.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "ECOLE T3P",
      "sameAs": "https://www.ecolet3p.fr"
    },
    "offers": {
      "@type": "Offer",
      "price": taxiFormation?.price || "1890",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-01-01"
    },
    "hasCourseInstance": sessions.map((session, index) => ({
      "@type": "CourseInstance",
      "courseMode": "onsite",
      "startDate": session.start_date,
      "endDate": session.end_date,
      "location": {
        "@type": "Place",
        "name": session.location || "ECOLE T3P Montrouge",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Montrouge",
          "addressCountry": "FR"
        }
      }
    })),
    "educationalCredentialAwarded": "Carte Professionnelle Taxi",
    "timeRequired": "PT63H",
    "occupationalCategory": "Chauffeur de Taxi",
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
        <title>Formation Taxi Initiale 63h Montrouge | ECOLE T3P</title>
        <meta name="description" content="Formation initiale Taxi 63h (journée) ou 33h (soir) à Montrouge. Préparation complète examen CMA. Taux de réussite 94%. Centre agréé Préfecture 92." />
        <meta name="keywords" content="formation taxi Paris, carte professionnelle taxi, devenir chauffeur taxi, formation taxi agréée, centre formation taxi Montrouge, reconversion taxi, ECOLE T3P" />
        <link rel="canonical" href="https://www.ecolet3p.fr/formations/taxi" />
        
        {/* Preload hero image only on desktop (hidden on mobile) */}
        <link 
          rel="preload" 
          as="image" 
          href={heroImageTaxi}
          type="image/jpeg"
          media="(min-width: 1024px)"
        />
        
        <meta property="og:title" content="Formation Taxi Initiale à Montrouge — 63h | ECOLE T3P" />
        <meta property="og:description" content="Formation initiale Taxi 63h à Montrouge. Préparation complète à l'examen CMA. Centre agréé Préfecture des Hauts-de-Seine." />
        <meta property="og:url" content="https://www.ecolet3p.fr/formations/taxi" />
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
              "item": "https://www.ecolet3p.fr/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Formations",
              "item": "https://www.ecolet3p.fr/formations"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Parcours Taxi",
              "item": "https://www.ecolet3p.fr/formations/taxi"
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
                <BreadcrumbPage>Parcours Taxi</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-10 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <CarTaxiFront className="h-4 w-4 mr-2" />
                Formation T3P – Parcours Taxi
              </Badge>
              
              <h1 className="text-[28px] lg:text-5xl font-bold mb-4 lg:mb-6 leading-tight">
                Parcours <span className="text-primary">TAXI</span>
                <br />Carte Professionnelle
              </h1>
              
              <p className="text-base lg:text-lg text-muted-foreground mb-6 lg:mb-8">
                Le parcours Taxi fait partie de la formation T3P. Devenez chauffeur de taxi professionnel 
                avec notre formation complète. Taux de réussite de 94% et accompagnement personnalisé.
              </p>
              
              <div className="flex flex-wrap gap-2 lg:gap-4 mb-6 lg:mb-8">
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg border text-sm lg:text-base">
                  <Clock className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                  <span className="font-medium">63 heures</span>
                </div>
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg border text-sm lg:text-base">
                  <Euro className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                  <span className="font-medium">{soireeFormation?.price || 990}€</span>
                </div>
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg border text-sm lg:text-base">
                  <Award className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                  <span className="font-medium">94% réussite</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" onClick={() => setShowPreRegistration(true)}>
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

              <PlacesProgressBar category="taxi" className="max-w-md" />
            </motion.div>
            
            {isDesktop && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Hero Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImageTaxi} 
                  alt="Formation Taxi en session - ECOLE T3P" 
                  width={600}
                  height={256}
                  className="w-full h-64 object-cover"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-medium">Salle de formation équipée</p>
                  <p className="text-white/80 text-sm">Centre ECOLE T3P - Montrouge</p>
                </div>
              </div>

              <UpcomingSessionsCard 
                sessions={sessions} 
                onRegister={() => setShowPreRegistration(true)} 
              />
            </motion.div>
            )}
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Programme */}
      <section className="py-10 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 lg:mb-12"
          >
            <Badge className="mb-4">Programme complet</Badge>
            <h2 className="text-2xl lg:text-4xl font-bold mb-4">
              Le programme de formation
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              63 heures de formation intensive pour maîtriser tous les aspects du métier de chauffeur de taxi
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
                      <Badge variant="outline">{module.duration}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {module.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pricing Blocks */}
          <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <PricingPaymentBlock
              formationTitle="Formation Taxi Soirée"
              price={soireeFormation?.price || 990}
              onRegister={() => setShowPreRegistration(true)}
            />
            <PricingPaymentBlock
              formationTitle="Formation Taxi Journée"
              price={taxiFormation?.price || 1190}
              onRegister={() => setShowPreRegistration(true)}
            />
          </div>
        </div>
      </section>

      <ExamProgramSection profession="taxi" />

      {/* Prérequis */}
      <section className="py-10 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4">Conditions d'accès</Badge>
              <h2 className="text-2xl lg:text-4xl font-bold mb-6">
                Prérequis pour la formation
              </h2>
              <div className="space-y-4">
                {[
                  { icon: Users, text: "Avoir 21 ans minimum" },
                  { icon: FileText, text: "Permis B valide depuis au moins 3 ans" },
                  { icon: CheckCircle, text: "Casier judiciaire vierge (bulletin n°2)" },
                  { icon: Target, text: "Aptitude médicale (visite médicale préfectorale)" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-background rounded-lg border">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
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
              <Card className="p-8 bg-primary text-primary-foreground">
                <h3 className="text-2xl font-bold mb-4">Modalités de paiement</h3>
                <p className="text-primary-foreground/90 mb-6">
                  Nous proposons des solutions adaptées à votre budget pour vous permettre de réaliser votre projet professionnel.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5" />
                    <span>Paiement en 4x sans frais</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5" />
                    <span>Échelonnement personnalisé</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5" />
                    <span>Accompagnement administratif</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-6 bg-white text-primary hover:bg-white/90"
                  onClick={() => setShowPreRegistration(true)}
                >
                  Demander un devis
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-10 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 lg:mb-12"
          >
            <Badge className="mb-4">Témoignages</Badge>
            <h2 className="text-2xl lg:text-4xl font-bold mb-4">
              Ils ont réussi avec nous
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
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
                    <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
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
      <section className="py-10 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 lg:mb-12"
          >
            <Badge className="mb-4">FAQ</Badge>
            <h2 className="text-2xl lg:text-4xl font-bold mb-4">
              Questions fréquentes
            </h2>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg border px-6">
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

      {/* Articles utiles */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge className="mb-4">Ressources</Badge>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Articles utiles pour votre projet
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Préparez votre reconversion avec nos guides pratiques
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Link 
              to="/blog/vtc-taxi-vmdtr-comparatif-2026"
              className="group p-6 bg-background rounded-xl border hover:border-primary transition-colors"
            >
              <Car className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                VTC vs Taxi vs VMDTR
              </h3>
              <p className="text-sm text-muted-foreground">
                Comparatif complet des 3 métiers du transport en 2026.
              </p>
            </Link>
            
            <Link 
              to="/blog/quel-statut-juridique-chauffeur-vtc-taxi-2026"
              className="group p-6 bg-background rounded-xl border hover:border-primary transition-colors"
            >
              <FileText className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                Quel statut juridique choisir ?
              </h3>
              <p className="text-sm text-muted-foreground">
                Auto-entrepreneur, SASU, EURL... Comparez les options.
              </p>
            </Link>
            
            <Link 
              to="/blog/maitrise-numerique-ia-chauffeur-vtc-taxi"
              className="group p-6 bg-background rounded-xl border hover:border-primary transition-colors"
            >
              <Smartphone className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                Maîtriser le numérique et l'IA
              </h3>
              <p className="text-sm text-muted-foreground">
                Applications, GPS et outils IA pour votre activité.
              </p>
            </Link>
            
            <Link 
              to="/blog/anglais-chauffeur-vtc-taxi-clientele-internationale"
              className="group p-6 bg-background rounded-xl border hover:border-primary transition-colors"
            >
              <Target className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                L'anglais pour les chauffeurs
              </h3>
              <p className="text-sm text-muted-foreground">
                Développez votre clientèle internationale.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl lg:text-4xl font-bold mb-4">
              Prêt à devenir chauffeur de taxi ?
            </h2>
            <p className="text-base lg:text-lg text-primary-foreground/90 mb-6 lg:mb-8 max-w-2xl mx-auto">
              Rejoignez nos prochaines sessions de formation et obtenez votre carte professionnelle
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setShowPreRegistration(true)}
              >
                <GraduationCap className="mr-2 h-5 w-5" />
                S'inscrire maintenant
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
                <Link to="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Nous appeler
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <StepPreRegistrationForm
        isOpen={showPreRegistration}
        onClose={() => setShowPreRegistration(false)}
        defaultFormation="taxi"
      />
    </Layout>
  );
};

export default FormationTaxi;
