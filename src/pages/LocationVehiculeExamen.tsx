import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Car, Bike, Clock, Euro, CheckCircle, Phone, 
  FileCheck, Home, Info, HelpCircle, ListChecks, ShieldCheck, CalendarCheck
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const vehicleServices = [
  {
    id: "vtc",
    title: "Examen VTC",
    price: 189,
    icon: Car,
    features: [
      "2h de conduite préparatoire",
      "Véhicule conforme aux exigences réglementaires",
      "Mise à disposition le jour de l'examen",
      "Accompagnement par un professionnel"
    ],
  },
  {
    id: "taxi",
    title: "Examen TAXI",
    subtitle: "Paris 75 & banlieue",
    price: 249,
    icon: Car,
    features: [
      "2h de conduite préparatoire",
      "Véhicule taxi équipé (lumineux, taximètre)",
      "Mise à disposition le jour de l'examen",
      "Accompagnement par un professionnel"
    ],
  },
  {
    id: "vmdtr",
    title: "Examen VMDTR",
    price: 299,
    icon: Bike,
    features: [
      "2h de conduite préparatoire",
      "Moto conforme aux exigences VMDTR",
      "Mise à disposition le jour de l'examen",
      "Accompagnement par un professionnel"
    ],
  },
];

const faqItems = [
  {
    question: "Quels documents dois-je apporter le jour de l'examen pratique ?",
    answer: "Vous devez présenter une pièce d'identité en cours de validité, votre convocation officielle de la CMA (Chambre des Métiers et de l'Artisanat), votre permis de conduire (catégorie B pour VTC/Taxi, catégorie A pour VMDTR), ainsi qu'une attestation de formation délivrée par votre centre de formation agréé."
  },
  {
    question: "Le véhicule est-il assuré pour l'examen ?",
    answer: "Oui, tous nos véhicules sont couverts par une assurance professionnelle complète. L'assurance couvre le candidat pendant les 2 heures de conduite préparatoire ainsi que pendant toute la durée de l'examen pratique. Vous n'avez aucune démarche supplémentaire à effectuer."
  },
  {
    question: "Comment se déroulent les 2 heures de conduite préparatoire ?",
    answer: "Les 2 heures de conduite préparatoire se déroulent avant votre examen, généralement le matin même ou la veille selon votre convocation. Un moniteur professionnel vous accompagne pour vous familiariser avec le véhicule, revoir les points clés de l'épreuve pratique et vous mettre en confiance avant le passage devant l'examinateur."
  },
  {
    question: "Puis-je réserver un véhicule si je n'ai pas suivi ma formation chez ECOLE T3P ?",
    answer: "Absolument. Notre service de location de véhicule pour examen est ouvert à tous les candidats, qu'ils aient suivi leur formation chez nous ou dans un autre centre agréé. Il vous suffit de nous contacter avec votre date d'examen et le type de véhicule souhaité."
  },
  {
    question: "Que se passe-t-il en cas d'échec à l'examen pratique ?",
    answer: "En cas d'échec, vous pouvez repasser l'examen lors d'une session ultérieure. Nous proposons à nouveau la location du véhicule pour votre prochaine tentative. Un tarif préférentiel peut être appliqué pour les candidats ayant déjà utilisé notre service."
  },
  {
    question: "Quel est le délai de réservation minimum ?",
    answer: "Nous recommandons de réserver votre véhicule au moins 7 jours avant la date de votre examen pour garantir la disponibilité. En période de forte demande (mai à septembre), un délai de 2 semaines est conseillé. Contactez-nous dès réception de votre convocation."
  },
];

const LocationVehiculeExamen = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Location de véhicule pour examen T3P",
    "description": "Location de véhicule double commande pour l'examen pratique VTC, Taxi ou VMDTR. Véhicule conforme, 2h de conduite incluses.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "ECOLE T3P",
      "sameAs": "https://ecolet3p.fr"
    },
    "areaServed": {
      "@type": "City",
      "name": "Paris"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Offres de location véhicule examen",
      "itemListElement": vehicleServices.map(service => ({
        "@type": "Offer",
        "name": service.title,
        "price": service.price,
        "priceCurrency": "EUR"
      }))
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <Layout>
      <Helmet>
        <title>Location Véhicule Examen Taxi VTC | ECOLE T3P</title>
        <meta name="description" content="Location de véhicule pour passer l'examen pratique Taxi ou VTC. Véhicule conforme aux exigences de la CMA. Réservation facile chez ECOLE T3P Montrouge." />
        <link rel="canonical" href="https://ecolet3p.fr/services/location-vehicule-examen" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://ecolet3p.fr/" },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://ecolet3p.fr/" },
            { "@type": "ListItem", "position": 3, "name": "Location Véhicule Examen", "item": "https://ecolet3p.fr/services/location-vehicule-examen" }
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
                <BreadcrumbPage>Location véhicule examen</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-gold/10 text-gold border-gold/20">
                <Car className="h-4 w-4 mr-2" />
                Service d'accompagnement
              </Badge>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-forest mb-6">
                Location de véhicule double commande pour examen pratique
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Véhicule conforme aux exigences réglementaires de la CMA, mis à disposition le jour de votre examen 
                avec 2 heures de conduite préparatoire incluses. Service disponible pour les examens VTC, Taxi et VMDTR 
                en Île-de-France.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Réassurance */}
      <section className="py-12 bg-forest/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
                <CheckCircle className="h-6 w-6 text-gold flex-shrink-0" />
                <span className="text-forest font-medium">Véhicule conforme aux exigences réglementaires</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
                <CheckCircle className="h-6 w-6 text-gold flex-shrink-0" />
                <span className="text-forest font-medium">2h de conduite préparatoire incluses</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
                <CheckCircle className="h-6 w-6 text-gold flex-shrink-0" />
                <span className="text-forest font-medium">Accompagnement le jour de l'examen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Déroulement de l'examen pratique */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-forest mb-4 text-center">
              Comment se déroule l'examen pratique T3P ?
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              L'examen pratique est organisé par la Chambre des Métiers et de l'Artisanat (CMA). Voici les étapes clés 
              pour bien préparer votre passage et maximiser vos chances de réussite.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  icon: CalendarCheck,
                  title: "Convocation CMA",
                  desc: "Vous recevez votre convocation officielle avec la date, l'heure et le lieu de l'examen pratique."
                },
                {
                  step: "2",
                  icon: Car,
                  title: "Réservation véhicule",
                  desc: "Contactez-nous dès réception pour réserver le véhicule adapté à votre examen (VTC, Taxi ou VMDTR)."
                },
                {
                  step: "3",
                  icon: ListChecks,
                  title: "Conduite préparatoire",
                  desc: "2 heures de mise en situation avec un professionnel pour maîtriser le véhicule et revoir les fondamentaux."
                },
                {
                  step: "4",
                  icon: ShieldCheck,
                  title: "Passage de l'examen",
                  desc: "Le véhicule est mis à votre disposition pour l'épreuve. L'examinateur évalue votre conduite, votre sécurité et votre relation client."
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  <Card className="h-full text-center border hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                        <item.icon className="w-6 h-6 text-gold" />
                      </div>
                      <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-2">Étape {item.step}</p>
                      <h3 className="font-bold text-forest mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Offres */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-forest mb-8 text-center">Nos offres de location</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {vehicleServices.map((service) => {
                const IconComponent = service.icon;
                
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full border-2 hover:border-gold/50 transition-colors">
                      <CardHeader className="text-center pb-4">
                        <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                          <IconComponent className="w-7 h-7 text-gold" />
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        {service.subtitle && (
                          <p className="text-sm text-muted-foreground">{service.subtitle}</p>
                        )}
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-4xl font-black text-forest mb-1">
                          {service.price} <span className="text-base font-normal text-muted-foreground">€ TTC</span>
                        </p>
                        
                        <ul className="space-y-3 mt-6 text-left">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        
                        <Button asChild className="w-full mt-6 btn-accent">
                          <Link to="/contact">Réserver</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Info box */}
            <Card className="border-forest/20 bg-forest/5">
              <CardContent className="flex items-start gap-4 pt-6">
                <Info className="w-6 h-6 text-forest flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-forest mb-1">Information importante</p>
                  <p className="text-sm text-muted-foreground">
                    Ce service est un accompagnement logistique pour le passage de votre examen pratique. 
                    Il ne constitue pas une formation et ne remplace pas la préparation théorique et pratique 
                    nécessaire à l'obtention de votre carte professionnelle.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Conseils pour réussir */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-forest mb-4 text-center">
              Nos conseils pour réussir votre examen pratique
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Avec un taux de réussite de 94 % pour nos stagiaires, voici les bonnes pratiques 
              que nous recommandons pour aborder sereinement l'épreuve.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Arrivez reposé et ponctuel",
                  desc: "Présentez-vous au moins 30 minutes avant l'heure prévue. Une bonne nuit de sommeil et un repas léger vous aideront à rester concentré pendant l'épreuve."
                },
                {
                  title: "Maîtrisez votre itinéraire",
                  desc: "Repérez le lieu d'examen à l'avance. Connaître le trajet réduit le stress et vous permet de vous concentrer uniquement sur votre conduite le jour J."
                },
                {
                  title: "Soignez votre attitude professionnelle",
                  desc: "L'examinateur évalue aussi votre posture de futur professionnel du transport : courtoisie, présentation soignée et communication claire sont des atouts majeurs."
                },
                {
                  title: "Profitez de la conduite préparatoire",
                  desc: "Les 2 heures incluses dans notre offre sont l'occasion idéale de vous familiariser avec le véhicule, de revoir les manœuvres et de poser vos dernières questions au moniteur."
                },
              ].map((conseil, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  <Card className="h-full border hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-forest mb-2">{conseil.title}</h3>
                      <p className="text-sm text-muted-foreground">{conseil.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-gold/10 text-gold border-gold/20">
                <HelpCircle className="h-4 w-4 mr-2" />
                Questions fréquentes
              </Badge>
              <h2 className="text-2xl font-bold text-forest">
                FAQ — Location véhicule examen
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="bg-card border rounded-lg px-6 data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left font-semibold text-forest hover:no-underline py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent forceMount className="data-[state=closed]:hidden pb-5 text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Réserver un véhicule pour l'examen</h2>
            <p className="text-white/80 mb-8">
              Contactez-nous dès réception de votre convocation CMA pour réserver votre véhicule 
              et convenir d'un créneau pour la conduite préparatoire.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-forest font-semibold">
                <Link to="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Nous contacter
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <a href="tel:0188750555">
                  <Phone className="mr-2 h-5 w-5" />
                  01 88 75 05 55
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LocationVehiculeExamen;
