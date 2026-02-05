import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Car, Bike, Clock, Euro, CheckCircle, Phone, 
  FileCheck, Home, Info
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

  return (
    <Layout>
      <Helmet>
        <title>Location Véhicule Examen VTC Taxi VMDTR | ECOLE T3P</title>
        <meta name="description" content="Location de véhicule double commande pour examen pratique VTC, Taxi ou VMDTR. Véhicule conforme, 2h de conduite incluses, accompagnement le jour J." />
        <link rel="canonical" href="https://ecolet3p.fr/services/location-vehicule-examen" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
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
                Véhicule conforme aux exigences réglementaires, mis à disposition le jour de votre examen 
                avec 2 heures de conduite préparatoire incluses.
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

      {/* Offres */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-forest mb-8 text-center">Nos offres</h2>
            
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

      {/* CTA */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-forest mb-4">Réserver un véhicule pour l'examen</h2>
            <p className="text-muted-foreground mb-8">
              Contactez-nous pour réserver votre véhicule et convenir d'une date pour votre examen pratique.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="btn-accent">
                <Link to="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Nous contacter
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
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
