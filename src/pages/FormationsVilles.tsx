import DynamicSEOHead, { useDynamicH1 } from "@/components/seo/DynamicSEOHead";
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
  const dynamicH1 = useDynamicH1("/formations/villes", "Formations Taxi VTC VMDTR près de chez vous en Île-de-France");
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
      <DynamicSEOHead
        pageUrl="/formations/villes"
        defaultTitle="Formations Taxi VTC près de chez vous | ECOLE T3P"
        defaultDescription="ECOLE T3P à Montrouge forme des chauffeurs Taxi, VTC et VMDTR de toute l'Île-de-France. Trouvez votre ville : 92, 94, 93, 91, 78 et Paris."
        canonicalUrl="https://ecolet3p.fr/formations/villes"
        ogImage="https://ecolet3p.fr/og-image.jpg"
      >
        <meta name="keywords" content="formation taxi Paris, formation VTC Hauts-de-Seine, formation taxi 92, formation VTC 94, centre formation Île-de-France, ECOLE T3P villes" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </DynamicSEOHead>

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
              {dynamicH1}
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
              Un centre de formation accessible depuis toute l'Île-de-France
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              ECOLE T3P est un centre de formation agréé par la Préfecture des Hauts-de-Seine, situé au 3 rue Corneille, 
              92120 Montrouge, en plein cœur de l'Île-de-France. Notre emplacement stratégique, à seulement deux minutes 
              à pied de la station de métro Mairie de Montrouge (ligne 4), nous permet d'accueillir des stagiaires venus 
              de l'ensemble de la région parisienne : Paris intra-muros, Hauts-de-Seine (92), Val-de-Marne (94), 
              Seine-Saint-Denis (93), Essonne (91) et Yvelines (78).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Situé au sud de Paris, notre centre est particulièrement rapide d'accès depuis les arrondissements du sud 
              parisien (13e, 14e, 15e) ainsi que depuis les communes limitrophes comme Boulogne-Billancourt, Issy-les-Moulineaux, 
              Malakoff, Châtillon ou Villejuif. Que vous envisagiez une formation Taxi, une formation VTC ou un parcours VMDTR 
              moto-taxi, vous trouverez ci-dessus toutes les villes desservies avec le temps de trajet estimé et les transports 
              en commun à emprunter pour rejoindre notre centre.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Avec un taux de réussite de 94 % et plus de 359 avis 5 étoiles sur Google, ECOLE T3P forme chaque année 
              des dizaines de chauffeurs professionnels. Nos sessions de formation sont proposées en journée et en soirée, 
              pour s'adapter à toutes les contraintes. Consultez la page de votre ville pour connaître les détails d'accès 
              et inscrivez-vous à notre prochaine session.
            </p>
          </div>
        </div>
      </section>

      {/* Liens internes */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-forest mb-6 text-center">Nos formations disponibles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/formations/taxi" className="p-4 bg-card rounded-lg border hover:border-gold transition-colors">
                <h3 className="font-semibold text-forest mb-1">Formation Taxi</h3>
                <p className="text-sm text-muted-foreground">Formation initiale pour carte professionnelle Taxi</p>
              </Link>
              <Link to="/formations/vtc" className="p-4 bg-card rounded-lg border hover:border-gold transition-colors">
                <h3 className="font-semibold text-forest mb-1">Formation VTC</h3>
                <p className="text-sm text-muted-foreground">Devenez chauffeur VTC professionnel</p>
              </Link>
              <Link to="/formations/vmdtr" className="p-4 bg-card rounded-lg border hover:border-gold transition-colors">
                <h3 className="font-semibold text-forest mb-1">Formation VMDTR</h3>
                <p className="text-sm text-muted-foreground">Formation moto-taxi professionnelle</p>
              </Link>
              <Link to="/formations" className="p-4 bg-card rounded-lg border hover:border-gold transition-colors">
                <h3 className="font-semibold text-forest mb-1">Toutes nos formations</h3>
                <p className="text-sm text-muted-foreground">Découvrez l'ensemble de notre catalogue</p>
              </Link>
              <Link to="/contact" className="p-4 bg-card rounded-lg border hover:border-gold transition-colors">
                <h3 className="font-semibold text-forest mb-1">Contact</h3>
                <p className="text-sm text-muted-foreground">Prenez rendez-vous avec notre équipe</p>
              </Link>
              <Link to="/" className="p-4 bg-card rounded-lg border hover:border-gold transition-colors">
                <h3 className="font-semibold text-forest mb-1">Accueil ECOLE T3P</h3>
                <p className="text-sm text-muted-foreground">Retour à la page d'accueil</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FormationsVilles;
