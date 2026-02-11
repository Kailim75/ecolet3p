import React, { useState, useEffect } from "react";
import TrustBar from "@/components/home/TrustBar";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Car, Clock, Euro, Users, CheckCircle, Calendar, 
  MapPin, Phone, Star, GraduationCap, FileText,
  Award, Target, BookOpen, Smartphone, Home
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
import PricingCard from "@/components/formations/PricingCard";
import ExamProgramSection from "@/components/formations/ExamProgramSection";
import { supabase } from "@/integrations/supabase/client";
import { getAvailableSpots, isSessionFull } from "@/hooks/useFormationSessions";
import heroImageVTC from "@/assets/formations/hero-vtc.jpg";

const programModules = [
  {
    title: "Réglementation VTC",
    duration: "12h",
    topics: ["Loi Grandguillaume", "Statut VTC", "Droits et obligations", "LOTI et capacité"]
  },
  {
    title: "Gestion d'entreprise",
    duration: "10h",
    topics: ["Micro-entreprise vs SASU", "Comptabilité simplifiée", "TVA et fiscalité", "Protection sociale"]
  },
  {
    title: "Sécurité routière",
    duration: "8h",
    topics: ["Conduite préventive", "Gestion du stress", "Premiers secours", "Éco-conduite"]
  },
  {
    title: "Relation client premium",
    duration: "8h",
    topics: ["Accueil haut de gamme", "Gestion des réclamations", "Discrétion professionnelle", "Fidélisation"]
  },
  {
    title: "Applications et plateformes",
    duration: "6h",
    topics: ["Uber, Bolt, Heetch", "Optimisation des courses", "Gestion multi-apps", "Notation et avis"]
  },
  {
    title: "Anglais professionnel",
    duration: "6h",
    topics: ["Vocabulaire transport", "Accueil clients étrangers", "Communication basique", "Expressions courantes"]
  }
];

const testimonials = [
  {
    name: "Alexandre M.",
    role: "Chauffeur VTC Premium",
    content: "Formation au top ! J'ai particulièrement apprécié les cours sur la relation client haut de gamme. Aujourd'hui je travaille avec une clientèle fidèle et satisfaite.",
    rating: 5
  },
  {
    name: "Fatima R.",
    role: "Auto-entrepreneuse VTC",
    content: "L'accompagnement pour créer mon entreprise a été précieux. Les formateurs m'ont guidée pas à pas. Je suis aujourd'hui à mon compte avec une activité florissante.",
    rating: 5
  },
  {
    name: "Thomas G.",
    role: "Chauffeur VTC indépendant",
    content: "Excellente formation, très complète sur les aspects juridiques et commerciaux. Le module sur les applications m'a permis d'optimiser mes revenus dès le départ.",
    rating: 5
  }
];

const faqs = [
  {
    question: "Quelle est la différence entre taxi et VTC ?",
    answer: "Le taxi peut prendre des clients dans la rue (maraude) et a accès aux bornes taxi. Le VTC travaille uniquement sur réservation préalable via des applications ou contrats. Le VTC offre plus de flexibilité horaire mais nécessite de développer sa clientèle."
  },
  {
    question: "Combien peut gagner un chauffeur VTC ?",
    answer: "Les revenus varient selon l'activité et les heures travaillées. En moyenne, un chauffeur VTC à temps plein peut générer entre 3000€ et 5000€ de chiffre d'affaires mensuel avant charges. L'optimisation des courses et la fidélisation client sont clés."
  },
  {
    question: "Faut-il avoir son propre véhicule ?",
    answer: "Non, vous pouvez louer un véhicule VTC auprès de sociétés spécialisées (LOA, LLD) ou travailler comme salarié d'une société VTC. Nous vous conseillons sur les meilleures options selon votre situation."
  },
  {
    question: "La formation VTC est-elle plus courte que celle du taxi ?",
    answer: "Oui, la formation initiale VTC dure 50 heures contre 63 heures pour le taxi. Le programme est adapté aux spécificités du métier de VTC (applications, relation client premium, etc.)."
  },
  {
    question: "Puis-je travailler pour Uber après la formation ?",
    answer: "Oui, une fois votre carte professionnelle VTC obtenue, vous pouvez vous inscrire sur toutes les plateformes : Uber, Bolt, Heetch, etc. Nous vous formons à l'utilisation optimale de ces applications."
  },
  {
    question: "Comment se passe l'examen VTC ?",
    answer: "L'examen se compose de 7 épreuves : réglementation des transports, gestion, sécurité routière, français, anglais, développement commercial et réglementation locale. Nos formateurs vous préparent spécifiquement à chaque épreuve."
  }
];

const FormationVTC = () => {
  const [showPreRegistration, setShowPreRegistration] = useState(false);
  const [vtcFormations, setVtcFormations] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);

  const vtcFormation = vtcFormations.find(f => f.title?.toLowerCase().includes('initial')) || vtcFormations[0];
  const soireeFormation = vtcFormations.find(f => f.title?.toLowerCase().includes('soirée'));

  useEffect(() => {
    const fetchFormations = async () => {
      const { data } = await supabase
        .from("formations")
        .select("*")
        .eq("category", "vtc")
        .eq("is_active", true)
        .order("display_order");
      
      if (data && data.length > 0) {
        setVtcFormations(data);
        
        const formationIds = data.map(f => f.id);
        const { data: sessionsData } = await supabase
          .from("formation_sessions")
          .select("*, formations(title)")
          .in("formation_id", formationIds)
          .in("status", ["upcoming", "ongoing"])
          .order("start_date")
          .limit(6);
        
        setSessions((sessionsData || []).map(s => ({
          ...s,
          formation_title: (s as any).formations?.title
        })));
      }
    };
    
    fetchFormations();
  }, []);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Formation T3P - Parcours VTC Professionnel",
    "description": "Parcours VTC de la formation T3P pour obtenir votre carte professionnelle. Apprenez le métier de chauffeur privé, les applications et la gestion d'entreprise.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "ECOLE T3P",
      "sameAs": "https://www.ecolet3p.fr",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3 rue Corneille",
        "addressLocality": "Montrouge",
        "postalCode": "92120",
        "addressCountry": "FR"
      }
    },
    "offers": {
      "@type": "Offer",
      "price": vtcFormation?.price || "1690",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString().split('T')[0]
    },
    "hasCourseInstance": sessions.map((session) => ({
      "@type": "CourseInstance",
      "courseMode": "onsite",
      "startDate": session.start_date,
      "endDate": session.end_date,
      "location": {
        "@type": "Place",
        "name": session.location || "ECOLE T3P Montrouge",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "3 rue Corneille",
          "addressLocality": "Montrouge",
          "postalCode": "92120"
        }
      }
    })),
    "educationalCredentialAwarded": "Carte Professionnelle VTC",
    "timeRequired": "PT63H",
    "occupationalCategory": "Chauffeur VTC",
    "coursePrerequisites": "Permis B de plus de 3 ans",
    "inLanguage": "fr",
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
        <title>Formation VTC Initiale 63h à Montrouge | ECOLE T3P</title>
        <meta name="description" content="Formation initiale VTC 63h (journée) ou 33h (soir) à Montrouge. Préparation examen carte professionnelle VTC. Taux de réussite 94%. Centre agréé Préfecture 92." />
        <meta name="keywords" content="formation VTC Paris, carte professionnelle VTC, devenir chauffeur VTC, formation Uber, formation Bolt, centre formation VTC Montrouge, reconversion VTC, ECOLE T3P" />
        <link rel="canonical" href="https://www.ecolet3p.fr/formations/vtc" />
        
        {/* Preload critical hero image */}
        <link 
          rel="preload" 
          as="image" 
          href={heroImageVTC}
          type="image/jpeg"
        />
        
        <meta property="og:title" content="Formation VTC Initiale à Montrouge — 63h | ECOLE T3P" />
        <meta property="og:description" content="Formation initiale VTC 63h à Montrouge. Préparation à l'examen CMA pour devenir chauffeur VTC. Financement possible." />
        <meta property="og:url" content="https://www.ecolet3p.fr/formations/vtc" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.ecolet3p.fr/og-image.jpg" />
        
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
              "name": "Parcours VTC",
              "item": "https://www.ecolet3p.fr/formations/vtc"
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
                <BreadcrumbPage>Parcours VTC</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-secondary/10 via-background to-primary/5 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-72 h-72 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
                <Car className="h-4 w-4 mr-2" />
                Formation T3P – Parcours VTC
              </Badge>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Formation VTC Initiale à Montrouge — <span className="text-secondary">63h</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                Le parcours VTC fait partie de la formation T3P. Devenez chauffeur VTC et travaillez 
                avec Uber, Bolt, Heetch. Formation complète incluant gestion d'entreprise et relation client premium.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-4 py-2 rounded-lg border">
                  <Clock className="h-5 w-5 text-secondary" />
                  <span className="font-medium">{vtcFormation?.duration || "63h"}</span>
                </div>
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-4 py-2 rounded-lg border">
                  <Euro className="h-5 w-5 text-secondary" />
                  <span className="font-medium">{vtcFormation?.price || 1690}€</span>
                </div>
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-4 py-2 rounded-lg border">
                  <Smartphone className="h-5 w-5 text-secondary" />
                  <span className="font-medium">Multi-apps</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
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
                  src={heroImageVTC} 
                  alt="Formation VTC en session - ECOLE T3P" 
                  className="w-full h-64 object-cover"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-medium">Environnement moderne</p>
                  <p className="text-white/80 text-sm">Centre ECOLE T3P - Montrouge</p>
                </div>
              </div>

              <UpcomingSessionsCard 
                sessions={sessions} 
                onRegister={() => setShowPreRegistration(true)} 
              />
            </motion.div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Programme */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">Programme complet</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Le programme de formation VTC
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une formation intensive pour maîtriser tous les aspects du métier de chauffeur VTC
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
                          <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pricing Cards */}
          <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <PricingCard
              title="Formation VTC Journée"
              price={vtcFormation?.price || 1190}
              duration="63h"
              features={[
                "Préparation examen CMA complète",
                "Module applications (Uber, Bolt…)",
                "Du lundi au vendredi 9h30-16h30",
                "Anglais professionnel inclus",
                "Paiement en 4× sans frais",
              ]}
              onRegister={() => setShowPreRegistration(true)}
            />
            <PricingCard
              title="Formation VTC Soirée"
              price={soireeFormation?.price || 990}
              duration="33h"
              features={[
                "Préparation examen CMA complète",
                "Module applications (Uber, Bolt…)",
                "Du lundi au vendredi 18h-21h30",
                "Compatible avec un emploi",
                "Paiement en 4× sans frais",
              ]}
              onRegister={() => setShowPreRegistration(true)}
            />
          </div>
        </div>
      </section>

      <ExamProgramSection profession="vtc" />

      {/* Prérequis */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4">Conditions d'accès</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
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
                    <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-secondary" />
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
              <Card className="p-8 bg-secondary text-secondary-foreground">
                <h3 className="text-2xl font-bold mb-4">Modalités de paiement</h3>
                <p className="text-secondary-foreground/90 mb-6">
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
                  className="w-full mt-6 bg-white text-secondary hover:bg-white/90"
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
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">Témoignages</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ils ont réussi avec nous
            </h2>
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
      <section className="py-16 lg:py-24 bg-muted/30">
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
              className="group p-6 bg-background rounded-xl border hover:border-secondary transition-colors"
            >
              <Car className="h-8 w-8 text-secondary mb-4" />
              <h3 className="font-semibold mb-2 group-hover:text-secondary transition-colors">
                VTC vs Taxi vs VMDTR
              </h3>
              <p className="text-sm text-muted-foreground">
                Comparatif complet des 3 métiers du transport en 2026.
              </p>
            </Link>
            
            <Link 
              to="/blog/quel-statut-juridique-chauffeur-vtc-taxi-2026"
              className="group p-6 bg-background rounded-xl border hover:border-secondary transition-colors"
            >
              <FileText className="h-8 w-8 text-secondary mb-4" />
              <h3 className="font-semibold mb-2 group-hover:text-secondary transition-colors">
                Quel statut juridique choisir ?
              </h3>
              <p className="text-sm text-muted-foreground">
                Auto-entrepreneur, SASU, EURL... Comparez les options.
              </p>
            </Link>
            
            <Link 
              to="/blog/maitrise-numerique-ia-chauffeur-vtc-taxi"
              className="group p-6 bg-background rounded-xl border hover:border-secondary transition-colors"
            >
              <Smartphone className="h-8 w-8 text-secondary mb-4" />
              <h3 className="font-semibold mb-2 group-hover:text-secondary transition-colors">
                Maîtriser le numérique et l'IA
              </h3>
              <p className="text-sm text-muted-foreground">
                Applications, GPS et outils IA pour votre activité.
              </p>
            </Link>
            
            <Link 
              to="/blog/anglais-chauffeur-vtc-taxi-clientele-internationale"
              className="group p-6 bg-background rounded-xl border hover:border-secondary transition-colors"
            >
              <BookOpen className="h-8 w-8 text-secondary mb-4" />
              <h3 className="font-semibold mb-2 group-hover:text-secondary transition-colors">
                L'anglais pour les chauffeurs
              </h3>
              <p className="text-sm text-muted-foreground">
                Développez votre clientèle internationale.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Présentation détaillée */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-2xl font-bold mb-6">Présentation de la formation VTC</h2>
            <p className="text-muted-foreground mb-4">
              La formation VTC initiale dispensée par ECOLE T3P à Montrouge est un parcours complet de 63 heures en journée 
              (ou 33 heures en formule soir) destiné aux candidats souhaitant obtenir leur carte professionnelle de conducteur 
              de voiture de transport avec chauffeur. Notre centre, agréé par la Préfecture des Hauts-de-Seine, affiche un taux 
              de réussite de 94 % sur l'ensemble de ses promotions, avec plus de 359 avis 5 étoiles sur Google.
            </p>
            <p className="text-muted-foreground mb-4">
              Le programme couvre l'intégralité des compétences exigées à l'examen CMA : réglementation T3P, gestion d'entreprise, 
              sécurité routière, relation client premium, développement commercial et langues (français et anglais professionnel). 
              Chaque module est animé par des formateurs expérimentés, eux-mêmes issus du secteur du transport de personnes.
            </p>

            <h2 className="text-2xl font-bold mb-6 mt-12">Débouchés après la formation VTC</h2>
            <p className="text-muted-foreground mb-4">
              Une fois votre carte professionnelle VTC en poche, plusieurs options s'offrent à vous : exercer en tant que chauffeur 
              VTC indépendant sous le statut de micro-entrepreneur ou SASU, devenir salarié d'une société de VTC, ou travailler 
              via les plateformes de réservation telles qu'Uber, Bolt ou Heetch. Notre équipe vous accompagne dans le choix du 
              statut juridique le plus adapté à votre projet.
            </p>

            <h2 className="text-2xl font-bold mb-6 mt-12">Financement de la formation</h2>
            <p className="text-muted-foreground mb-4">
              ECOLE T3P facilite l'accès à la formation avec le paiement en 4 fois sans frais et un échelonnement personnalisé. 
              Notre équipe administrative vous accompagne dans toutes vos démarches pour trouver la solution de financement la 
              plus adaptée à votre situation.
            </p>
          </div>
        </div>
      </section>

      {/* Liens internes */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Découvrez aussi nos autres formations</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/formations/taxi" className="p-4 bg-background rounded-lg border hover:border-secondary transition-colors">
                <h3 className="font-semibold mb-1">Formation Taxi</h3>
                <p className="text-sm text-muted-foreground">Découvrez aussi notre formation Taxi initiale</p>
              </Link>
              <Link to="/formations/vmdtr" className="p-4 bg-background rounded-lg border hover:border-secondary transition-colors">
                <h3 className="font-semibold mb-1">Formation VMDTR</h3>
                <p className="text-sm text-muted-foreground">Formation VMDTR moto-taxi professionnelle</p>
              </Link>
              <Link to="/formations/mobilite" className="p-4 bg-background rounded-lg border hover:border-secondary transition-colors">
                <h3 className="font-semibold mb-1">Passerelle Mobilité</h3>
                <p className="text-sm text-muted-foreground">Passerelle VTC vers Taxi ou Taxi vers VTC</p>
              </Link>
              <Link to="/blog/comment-devenir-chauffeur-vtc-2026" className="p-4 bg-background rounded-lg border hover:border-secondary transition-colors">
                <h3 className="font-semibold mb-1">Guide VTC 2026</h3>
                <p className="text-sm text-muted-foreground">Comment devenir chauffeur VTC en 2026</p>
              </Link>
              <Link to="/blog/quel-statut-juridique-chauffeur-vtc-taxi-2026" className="p-4 bg-background rounded-lg border hover:border-secondary transition-colors">
                <h3 className="font-semibold mb-1">Statut juridique</h3>
                <p className="text-sm text-muted-foreground">Quel statut juridique choisir ?</p>
              </Link>
              <Link to="/contact" className="p-4 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity">
                <h3 className="font-semibold mb-1">Inscrivez-vous</h3>
                <p className="text-sm text-secondary-foreground/80">Contactez-nous pour vous inscrire maintenant</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Prêt à devenir chauffeur VTC ?
            </h2>
            <p className="text-lg text-secondary-foreground/90 mb-8 max-w-2xl mx-auto">
              Rejoignez nos prochaines sessions de formation et obtenez votre carte professionnelle
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                variant="default"
                className="bg-white text-secondary hover:bg-white/90"
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
        defaultFormation="vtc"
      />
    </Layout>
  );
};

export default FormationVTC;
