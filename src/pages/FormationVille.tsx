import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  MapPin, Clock, Train, Bus, CheckCircle2, ArrowRight, 
  GraduationCap, Phone, Calendar, Star
} from "lucide-react";
import { getCityBySlug, cities, getLocalFaqs } from "@/data/localSeoData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FormationVille = () => {
  const { ville } = useParams<{ ville: string }>();
  const city = ville ? getCityBySlug(ville) : undefined;

  if (!city) {
    return <Navigate to="/formations" replace />;
  }

  const formations = [
    {
      title: "Formation TAXI Initiale",
      duration: "63h",
      description: "Formation complète pour obtenir la carte professionnelle TAXI",
      link: "/formations/taxi"
    },
    {
      title: "Formation VTC",
      duration: "63h", 
      description: "Formation pour devenir chauffeur VTC professionnel",
      link: "/formations/vtc"
    },
    {
      title: "Formation VMDTR",
      duration: "14h",
      description: "Formation moto-taxi pour obtenir la certification VMDTR",
      link: "/formations/vmdtr"
    },
    {
      title: "Formation Mobilité",
      duration: "14h",
      description: "Formation passerelle TAXI ↔ VTC",
      link: "/formations/mobilite"
    }
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://www.ecolet3p.fr/formations/${city.slug}#localbusiness`,
    "name": `ECOLE T3P - Formation Taxi VTC ${city.name}`,
    "image": "https://www.ecolet3p.fr/og-image.jpg",
    "telephone": "+33188750555",
    "email": "montrouge@ecolet3p.fr",
    "url": `https://www.ecolet3p.fr/formations/${city.slug}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3 rue Corneille",
      "addressLocality": "Montrouge",
      "postalCode": "92120",
      "addressRegion": "Hauts-de-Seine",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.8155,
      "longitude": 2.3137
    },
    "areaServed": {
      "@type": "City",
      "name": city.name,
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": city.department
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "359"
    },
    "priceRange": "€€"
  };

  const breadcrumbSchema = {
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
        "name": `Formation ${city.name}`,
        "item": `https://www.ecolet3p.fr/formations/${city.slug}`
      }
    ]
  };

  const localFaqs = getLocalFaqs(city);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": localFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Get nearby cities for internal linking
  const nearbyCities = cities
    .filter(c => c.slug !== city.slug)
    .slice(0, 6);

  return (
    <Layout>
      <Helmet>
        <title>{city.seoTitle}</title>
        <meta name="description" content={city.seoDescription} />
        <meta name="keywords" content={city.seoKeywords.join(", ")} />
        <link rel="canonical" href={`https://www.ecolet3p.fr/formations/${city.slug}`} />
        
        <meta property="og:title" content={city.seoTitle} />
        <meta property="og:description" content={city.seoDescription} />
        <meta property="og:url" content={`https://www.ecolet3p.fr/formations/${city.slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.ecolet3p.fr/og-image.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={city.seoTitle} />
        <meta name="twitter:description" content={city.seoDescription} />
        
        <meta name="geo.region" content={`FR-${city.departmentCode}`} />
        <meta name="geo.placename" content={city.name} />
        <meta name="geo.position" content={`${city.latitude};${city.longitude}`} />
        <meta name="ICBM" content={`${city.latitude}, ${city.longitude}`} />
        
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="gradient-hero py-20 md:py-28 relative overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-40 h-40 rounded-full opacity-10"
          style={{ backgroundColor: "#D4A853" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 right-20 w-60 h-60 rounded-full opacity-10"
          style={{ backgroundColor: "#F5EBD7" }}
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-gold/20 text-cream mb-6">
              <MapPin className="w-4 h-4" />
              {city.name} ({city.postalCodes[0]})
            </span>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-cream uppercase tracking-tight mb-6">
              Formation <span className="text-gold">TAXI & VTC</span><br />
              {city.name}
            </h1>
            
            <p className="text-lg md:text-xl text-cream/80 max-w-3xl mx-auto mb-8">
              Centre de formation ECOLE T3P à <strong>{city.travelTime}</strong> de {city.name}. 
              Formation agréée Préfecture, 94% de réussite aux examens.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="btn-accent">
                <Link to="/contact">
                  <Phone className="w-4 h-4 mr-2" />
                  Nous contacter
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-cream/10 border-cream/30 text-cream hover:bg-cream/20">
                <Link to="/formations">
                  Voir toutes les formations
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Access Info */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-black text-forest uppercase tracking-tight mb-4">
              Comment venir depuis <span className="text-gold">{city.name}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Notre centre de formation est situé au 3 rue Corneille à Montrouge, 
              facilement accessible depuis {city.name}.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card-livementor text-center"
            >
              <div className="icon-container mx-auto mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-forest mb-2">Temps de trajet</h3>
              <p className="text-2xl font-black text-gold">{city.travelTime}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card-livementor text-center"
            >
              <div className="icon-container mx-auto mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-forest mb-2">Distance</h3>
              <p className="text-2xl font-black text-gold">{city.distanceFromCenter}</p>
            </motion.div>

            {city.metroAccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="card-livementor text-center"
              >
                <div className="icon-container mx-auto mb-4">
                  <Train className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-forest mb-2">Métro</h3>
                <p className="text-sm text-muted-foreground">{city.metroAccess}</p>
              </motion.div>
            )}

            {city.busAccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="card-livementor text-center"
              >
                <div className="icon-container mx-auto mb-4">
                  <Bus className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-forest mb-2">Bus</h3>
                <p className="text-sm text-muted-foreground">{city.busAccess}</p>
              </motion.div>
            )}
          </div>

          {/* Local Context */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-livementor bg-forest text-cream"
          >
            <p className="text-lg leading-relaxed">{city.localContext}</p>
          </motion.div>
        </div>
      </section>

      {/* Formations */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-livementor mb-4 inline-block">
              <GraduationCap className="w-4 h-4 inline mr-2" />
              Nos formations
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-forest uppercase tracking-tight mb-4">
              Formations disponibles pour les habitants de {city.name}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {formations.map((formation, index) => (
              <motion.div
                key={formation.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-livementor group hover:border-gold/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-forest">{formation.title}</h3>
                  <span className="px-3 py-1 bg-gold/20 text-forest text-sm font-bold rounded-full">
                    {formation.duration}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">{formation.description}</p>
                <Button asChild variant="outline" className="w-full group-hover:bg-forest group-hover:text-cream transition-all">
                  <Link to={formation.link}>
                    En savoir plus
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-black text-forest uppercase tracking-tight mb-4">
              Pourquoi choisir ECOLE T3P depuis {city.name} ?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Star,
                title: "94% de réussite",
                description: "Un taux de réussite exceptionnel grâce à notre méthode pédagogique éprouvée."
              },
              {
                icon: MapPin,
                title: `À ${city.travelTime} de ${city.name}`,
                description: "Un centre facilement accessible en transports en commun depuis votre ville."
              },
              {
                icon: GraduationCap,
                title: "Formateurs experts",
                description: "Des formateurs expérimentés, anciens professionnels du transport."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-livementor text-center"
              >
                <div className="icon-container mx-auto mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-forest text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-hero">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-black text-cream uppercase tracking-tight mb-6">
              Vous habitez {city.name} ?<br />
              <span className="text-gold">Commencez votre formation dès maintenant</span>
            </h2>
            <p className="text-cream/80 max-w-2xl mx-auto mb-8">
              Prenez rendez-vous pour visiter notre centre et rencontrer nos formateurs. 
              Nous vous accompagnons dans toutes les démarches.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="btn-accent">
                <Link to="/contact">
                  <Calendar className="w-4 h-4 mr-2" />
                  Prendre rendez-vous
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-cream/10 border-cream/30 text-cream hover:bg-cream/20">
                <a href="tel:0188750555">
                  <Phone className="w-4 h-4 mr-2" />
                  01 88 75 05 55
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ locale */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-black text-forest uppercase tracking-tight mb-4">
              Questions fréquentes — <span className="text-gold">{city.name}</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {localFaqs.map((faq, index) => (
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

      {/* Nearby Cities - Internal Linking */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-xl md:text-2xl font-bold text-forest mb-4">
              Formations également accessibles depuis
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {nearbyCities.map((nearbyCity) => (
              <Link
                key={nearbyCity.slug}
                to={`/formations/${nearbyCity.slug}`}
                className="px-4 py-2 bg-cream border border-border rounded-lg text-forest hover:bg-forest hover:text-cream transition-all text-sm font-medium"
              >
                {nearbyCity.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FormationVille;
