import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { MapPin, Train, Clock, ArrowRight, Building2 } from "lucide-react";
import { cities } from "@/data/localSeoData";

// Group cities by department
const getCitiesByDepartment = () => {
  const grouped: Record<string, typeof cities> = {};
  
  cities.forEach(city => {
    const key = `${city.departmentCode} - ${city.department}`;
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(city);
  });

  // Sort cities within each department alphabetically
  Object.keys(grouped).forEach(key => {
    grouped[key].sort((a, b) => a.name.localeCompare(b.name));
  });

  return grouped;
};

const departmentOrder = ["75 - Paris", "92 - Hauts-de-Seine", "93 - Seine-Saint-Denis", "94 - Val-de-Marne", "91 - Essonne", "78 - Yvelines"];

const FormationsVilles = () => {
  const citiesByDepartment = getCitiesByDepartment();
  const totalCities = cities.length;

  const breadcrumbSchema = {
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
        "name": "Villes desservies",
        "item": "https://ecolet3p.fr/formations/villes"
      }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://ecolet3p.fr/formations/villes#localbusiness",
    "name": "ECOLE T3P - Formation Taxi VTC Île-de-France",
    "image": "https://ecolet3p.fr/og-image.jpg",
    "telephone": "+33188750555",
    "email": "montrouge@ecolet3p.fr",
    "url": "https://ecolet3p.fr/formations/villes",
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
    "areaServed": cities.map(city => ({
      "@type": "City",
      "name": city.name,
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": city.department
      }
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "359"
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Formation Taxi VTC par ville | Paris, 92, 94 | ECOLE T3P</title>
        <meta 
          name="description" 
          content={`Centre de formation Taxi VTC accessible depuis ${totalCities} villes d'Île-de-France : Paris, Hauts-de-Seine (92), Val-de-Marne (94). Trouvez votre formation près de chez vous.`} 
        />
        <meta 
          name="keywords" 
          content="formation taxi Paris, formation VTC Hauts-de-Seine, formation taxi 92, formation VTC 94, centre formation Île-de-France, ECOLE T3P villes" 
        />
        <link rel="canonical" href="https://ecolet3p.fr/formations/villes" />
        
        <meta property="og:title" content="Formation Taxi VTC par ville | Paris, 92, 94 | ECOLE T3P" />
        <meta property="og:description" content={`Formations accessibles depuis ${totalCities} villes d'Île-de-France. Trouvez le trajet depuis votre ville.`} />
        <meta property="og:url" content="https://ecolet3p.fr/formations/villes" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://ecolet3p.fr/og-image.jpg" />
        
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
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
              {totalCities} villes desservies
            </span>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-cream uppercase tracking-tight mb-6">
              Formation <span className="text-gold">TAXI & VTC</span><br />
              près de chez vous
            </h1>
            
            <p className="text-lg md:text-xl text-cream/80 max-w-3xl mx-auto mb-8">
              Notre centre de formation à Montrouge est accessible depuis toute l'Île-de-France. 
              Trouvez les informations de trajet depuis votre ville.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-cream border-b border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4"
            >
              <div className="text-3xl md:text-4xl font-black text-forest mb-2">{totalCities}</div>
              <div className="text-sm text-muted-foreground">Villes desservies</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-4"
            >
              <div className="text-3xl md:text-4xl font-black text-forest mb-2">6</div>
              <div className="text-sm text-muted-foreground">Départements</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-4"
            >
              <div className="text-3xl md:text-4xl font-black text-forest mb-2">94%</div>
              <div className="text-sm text-muted-foreground">Taux de réussite</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-4"
            >
              <div className="text-3xl md:text-4xl font-black text-forest mb-2">5★</div>
              <div className="text-sm text-muted-foreground">Avis Google</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cities by Department */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {departmentOrder.map((deptKey, deptIndex) => {
            const deptCities = citiesByDepartment[deptKey];
            if (!deptCities) return null;

            const [code, name] = deptKey.split(" - ");

            return (
              <motion.div
                key={deptKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: deptIndex * 0.1 }}
                className="mb-16 last:mb-0"
              >
                {/* Department Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-forest text-cream font-black text-xl">
                    {code}
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-forest uppercase tracking-tight">
                      {name}
                    </h2>
                    <p className="text-muted-foreground">
                      {deptCities.length} ville{deptCities.length > 1 ? 's' : ''} desservie{deptCities.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Cities Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {deptCities.map((city, cityIndex) => (
                    <motion.div
                      key={city.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: cityIndex * 0.03 }}
                    >
                      <Link
                        to={`/formations/${city.slug}`}
                        className="group block p-5 bg-card rounded-xl border border-border hover:border-gold/50 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-forest" />
                            <h3 className="font-bold text-forest group-hover:text-gold transition-colors">
                              {city.name}
                            </h3>
                          </div>
                          <span className="text-xs font-medium px-2 py-1 bg-forest/10 text-forest rounded">
                            {city.postalCodes[0]}
                          </span>
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-gold" />
                            <span>{city.travelTime}</span>
                          </div>
                          {(city.metroAccess || city.trainAccess || city.tramAccess) && (
                            <div className="flex items-center gap-2">
                              <Train className="w-3.5 h-3.5 text-gold" />
                              <span className="truncate">
                                {city.metroAccess?.split(" - ")[0] || 
                                 city.trainAccess?.split(" - ")[0] || 
                                 city.tramAccess?.split(" - ")[0]}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center text-sm font-medium text-forest group-hover:text-gold transition-colors">
                          Voir les détails
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
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
              Votre ville n'est pas listée ?<br />
              <span className="text-gold">Contactez-nous quand même !</span>
            </h2>
            <p className="text-cream/80 max-w-2xl mx-auto mb-8">
              Notre centre est accessible depuis toute l'Île-de-France. 
              Nous pouvons vous aider à trouver le meilleur itinéraire depuis votre localisation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="btn-accent inline-flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Nous contacter
              </Link>
              <a
                href="tel:0188750555"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cream/10 border border-cream/30 text-cream hover:bg-cream/20 transition-colors font-semibold"
              >
                01 88 75 05 55
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO Text Section */}
      <section className="py-12 bg-cream">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-forest">
            <h2 className="text-xl font-bold text-forest mb-4">
              Formation Taxi VTC accessible depuis toute l'Île-de-France
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              ECOLE T3P est un centre de formation agréé par la Préfecture, situé à Montrouge (92120), 
              au cœur de l'Île-de-France. Notre emplacement stratégique, à quelques minutes du métro 
              Mairie de Montrouge (ligne 4), nous permet d'accueillir des stagiaires de Paris, 
              des Hauts-de-Seine (92) et du Val-de-Marne (94).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Que vous habitiez à Boulogne-Billancourt, Villejuif, Nanterre, ou dans les arrondissements 
              sud de Paris (13e, 14e, 15e), vous trouverez sur cette page toutes les informations 
              pour rejoindre facilement notre centre et débuter votre formation de chauffeur 
              professionnel TAXI, VTC ou VMDTR.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FormationsVilles;
