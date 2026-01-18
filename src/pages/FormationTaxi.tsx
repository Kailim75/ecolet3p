import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  CarTaxiFront, Clock, Euro, Users, CheckCircle, Calendar, 
  MapPin, Phone, Star, GraduationCap, FileText,
  Award, Target, BookOpen, Home
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
import { useFormations } from "@/hooks/useFormations";
import { useFormationSessions, getAvailableSpots, isSessionFull } from "@/hooks/useFormationSessions";
import { supabase } from "@/integrations/supabase/client";
import heroImageTaxi from "@/assets/formations/hero-taxi.jpg";

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
    answer: "Notre taux de réussite est de 85% dès la première présentation. Nous proposons un accompagnement personnalisé et des sessions de révision pour maximiser vos chances de réussite."
  },
  {
    question: "Comment financer ma formation taxi ?",
    answer: "Nous proposons un paiement en 4x sans frais. Vous pouvez également vous renseigner auprès de Pôle Emploi ou de votre OPCO pour d'éventuelles aides au financement."
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
  const [taxiFormation, setTaxiFormation] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    // Fetch taxi formation
    const fetchFormation = async () => {
      const { data } = await supabase
        .from("formations")
        .select("*")
        .eq("category", "taxi")
        .eq("is_active", true)
        .order("display_order")
        .limit(1)
        .single();
      
      if (data) {
        setTaxiFormation(data);
        
        // Fetch sessions for this formation
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
    "name": "Formation Taxi - Carte Professionnelle T3P",
    "description": "Formation complète de 63 heures pour obtenir votre carte professionnelle de chauffeur de taxi. Taux de réussite 85%, formateurs experts, paiement en 4x sans frais.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "T3P Campus",
      "sameAs": "https://t3pcampus.fr"
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
        "name": session.location || "T3P Campus Nice",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nice",
          "addressCountry": "FR"
        }
      }
    })),
    "educationalCredentialAwarded": "Carte Professionnelle Taxi",
    "timeRequired": "PT63H",
    "occupationalCategory": "Chauffeur de Taxi"
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
        <title>Formation Taxi Nice - Carte Professionnelle | T3P Campus</title>
        <meta name="description" content="Formation taxi complète à Nice. 63h de formation, taux de réussite 85%, paiement en 4x sans frais. Obtenez votre carte professionnelle de chauffeur de taxi." />
        <meta name="keywords" content="formation taxi nice, carte professionnelle taxi, devenir chauffeur taxi, examen taxi, formation T3P" />
        <link rel="canonical" href="https://t3pcampus.fr/formations/taxi" />
        
        {/* Preload critical hero image */}
        <link 
          rel="preload" 
          as="image" 
          href={heroImageTaxi}
          type="image/jpeg"
        />
        
        <meta property="og:title" content="Formation Taxi Nice - Carte Professionnelle | T3P Campus" />
        <meta property="og:description" content="Formation taxi complète à Nice. 63h de formation, taux de réussite 85%. Devenez chauffeur de taxi professionnel." />
        <meta property="og:url" content="https://t3pcampus.fr/formations/taxi" />
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
              "name": "Formation Taxi",
              "item": "https://t3pcampus.fr/formations/taxi"
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
                <BreadcrumbPage>Formation Taxi</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
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
                Formation Certifiante RS5635
              </Badge>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Formation <span className="text-primary">Taxi</span>
                <br />Carte Professionnelle
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                Devenez chauffeur de taxi professionnel avec notre formation complète de 63 heures. 
                Taux de réussite de 85% et accompagnement personnalisé jusqu'à l'obtention de votre carte.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-4 py-2 rounded-lg border">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium">63 heures</span>
                </div>
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-4 py-2 rounded-lg border">
                  <Euro className="h-5 w-5 text-primary" />
                  <span className="font-medium">{taxiFormation?.price || 1890}€</span>
                </div>
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-4 py-2 rounded-lg border">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="font-medium">85% réussite</span>
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
                  src={heroImageTaxi} 
                  alt="Formation Taxi en session - T3P Campus" 
                  className="w-full h-64 object-cover"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-medium">Salle de formation équipée</p>
                  <p className="text-white/80 text-sm">Centre T3P Campus - Montrouge</p>
                </div>
              </div>

              <Card className="bg-background/80 backdrop-blur border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Prochaines sessions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sessions.length > 0 ? (
                    sessions.map((session, index) => (
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
                  <Button className="w-full" onClick={() => setShowPreRegistration(true)}>
                    Réserver ma place
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
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
            <Badge className="mb-4">Programme complet</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
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
              <p className="text-muted-foreground mb-8">
                Avant de vous inscrire à la formation taxi, assurez-vous de remplir les conditions suivantes :
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: Users, text: "Avoir 21 ans minimum" },
                  { icon: FileText, text: "Permis B depuis 3 ans minimum" },
                  { icon: Award, text: "Casier judiciaire vierge (bulletin n°2)" },
                  { icon: Target, text: "Être apte médicalement (visite préfectorale)" },
                  { icon: BookOpen, text: "Maîtriser le français (lu, écrit, parlé)" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-background rounded-lg border">
                    <div className="p-2 bg-primary/10 rounded-lg">
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
              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Euro className="h-5 w-5 text-primary" />
                    Tarif et financement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-6 bg-background rounded-lg">
                    <p className="text-4xl font-bold text-primary">{taxiFormation?.price || 1890}€</p>
                    <p className="text-muted-foreground">Formation complète</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Paiement en 4x sans frais</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Supports de cours inclus</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Accès plateforme e-learning</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Préparation examen incluse</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" size="lg" onClick={() => setShowPreRegistration(true)}>
                    Demander un devis personnalisé
                  </Button>
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
            <Badge className="mb-4">Témoignages</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ils ont réussi leur formation
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
                    <p className="text-muted-foreground mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="font-bold text-primary">{testimonial.name[0]}</span>
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
                <AccordionItem key={index} value={`faq-${index}`} className="bg-background rounded-lg border px-6">
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
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Prêt à devenir chauffeur de taxi ?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Inscrivez-vous dès maintenant et rejoignez notre prochaine session de formation
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" onClick={() => setShowPreRegistration(true)}>
              <GraduationCap className="mr-2 h-5 w-5" />
              S'inscrire maintenant
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <a href="tel:+33XXXXXXXXX">
                <Phone className="mr-2 h-5 w-5" />
                04 XX XX XX XX
              </a>
            </Button>
          </div>
        </div>
      </section>

      <PreRegistrationForm
        isOpen={showPreRegistration}
        onClose={() => setShowPreRegistration(false)}
        formationTitle={taxiFormation?.title || "Formation Taxi"}
        formationDuration={taxiFormation?.duration || "63h"}
      />
    </Layout>
  );
};

export default FormationTaxi;
