import { useState, useEffect } from "react";
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
import PreRegistrationForm from "@/components/formations/PreRegistrationForm";
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
  const [vtcFormation, setVtcFormation] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    const fetchFormation = async () => {
      const { data } = await supabase
        .from("formations")
        .select("*")
        .eq("category", "vtc")
        .eq("is_active", true)
        .order("display_order")
        .limit(1)
        .single();
      
      if (data) {
        setVtcFormation(data);
        
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
    "name": "Formation VTC - Carte Professionnelle T3P",
    "description": "Formation complète pour obtenir votre carte professionnelle VTC. Apprenez le métier de chauffeur privé, les applications et la gestion d'entreprise.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "T3P Campus",
      "sameAs": "https://t3pcampus.fr"
    },
    "offers": {
      "@type": "Offer",
      "price": vtcFormation?.price || "1690",
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
        "name": session.location || "T3P Campus Nice"
      }
    })),
    "educationalCredentialAwarded": "Carte Professionnelle VTC",
    "timeRequired": "PT50H",
    "occupationalCategory": "Chauffeur VTC"
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
        <title>Formation VTC Nice - Carte Professionnelle | T3P Campus</title>
        <meta name="description" content="Formation VTC complète à Nice. Obtenez votre carte professionnelle VTC, travaillez avec Uber, Bolt. Paiement en 4x sans frais, taux de réussite élevé." />
        <meta name="keywords" content="formation vtc nice, carte professionnelle vtc, devenir chauffeur vtc, uber, formation T3P" />
        <link rel="canonical" href="https://t3pcampus.fr/formations/vtc" />
        
        {/* Preload critical hero image */}
        <link 
          rel="preload" 
          as="image" 
          href={heroImageVTC}
          type="image/jpeg"
        />
        
        <meta property="og:title" content="Formation VTC Nice - Carte Professionnelle | T3P Campus" />
        <meta property="og:description" content="Formation VTC complète à Nice. Devenez chauffeur VTC professionnel et travaillez avec les grandes plateformes." />
        <meta property="og:url" content="https://t3pcampus.fr/formations/vtc" />
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
              "name": "Formation VTC",
              "item": "https://t3pcampus.fr/formations/vtc"
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
                <BreadcrumbPage>Formation VTC</BreadcrumbPage>
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
                Formation Certifiante RS5637
              </Badge>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Formation <span className="text-secondary">VTC</span>
                <br />Carte Professionnelle
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                Devenez chauffeur VTC et travaillez avec Uber, Bolt, Heetch et plus encore. 
                Formation complète incluant gestion d'entreprise et relation client premium.
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
                  alt="Formation VTC en session - T3P Campus" 
                  className="w-full h-64 object-cover"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-medium">Environnement moderne</p>
                  <p className="text-white/80 text-sm">Centre T3P Campus - Montrouge</p>
                </div>
              </div>

              <Card className="bg-background/80 backdrop-blur border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-secondary" />
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
              Le programme de formation VTC
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une formation complète pour maîtriser tous les aspects du métier de chauffeur VTC
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

      {/* Avantages VTC */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4">Pourquoi le VTC ?</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Les avantages du métier VTC
              </h2>
              
              <div className="space-y-4">
                {[
                  { icon: Clock, title: "Flexibilité horaire", text: "Choisissez vos heures de travail selon votre vie personnelle" },
                  { icon: Euro, title: "Revenus attractifs", text: "Potentiel de 3000€ à 5000€ CA mensuel" },
                  { icon: Smartphone, title: "Multi-plateformes", text: "Travaillez avec Uber, Bolt, Heetch et autres" },
                  { icon: Users, title: "Indépendance", text: "Soyez votre propre patron, gérez votre activité" },
                  { icon: Car, title: "Véhicule au choix", text: "Location ou achat, neuf ou occasion" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-background rounded-lg border">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <item.icon className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-secondary/5 to-primary/5 border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Euro className="h-5 w-5 text-secondary" />
                    Tarif et financement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-6 bg-background rounded-lg">
                    <p className="text-4xl font-bold text-secondary">{vtcFormation?.price || 1690}€</p>
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
                      <span>Module anglais inclus</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Accompagnement création entreprise</span>
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
              Ils sont devenus chauffeurs VTC
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
                      <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                        <span className="font-bold text-secondary">{testimonial.name[0]}</span>
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
              Questions fréquentes VTC
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
      <section className="py-16 lg:py-24 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Prêt à devenir chauffeur VTC ?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Rejoignez les milliers de chauffeurs VTC qui ont démarré leur activité grâce à notre formation
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="outline" className="bg-background text-secondary hover:bg-background/90" onClick={() => setShowPreRegistration(true)}>
              <GraduationCap className="mr-2 h-5 w-5" />
              S'inscrire maintenant
            </Button>
            <Button size="lg" variant="outline" className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary" asChild>
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
        formationTitle={vtcFormation?.title || "Formation VTC"}
        formationDuration={vtcFormation?.duration || "63h"}
      />
    </Layout>
  );
};

export default FormationVTC;
