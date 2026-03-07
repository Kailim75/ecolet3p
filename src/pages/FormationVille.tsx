import { useParams, Navigate, Link } from "react-router-dom";
import DynamicSEOHead, { useDynamicH1 } from "@/components/seo/DynamicSEOHead";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import {
  MapPin, Clock, Train, Bus, CheckCircle2, ArrowRight,
  GraduationCap, Phone, Calendar, Star, Trophy, Users,
  Shield, Car, Home, ChevronRight, CreditCard, Building2
} from "lucide-react";
import { getCityBySlug, cities, getLocalFaqs, getTestimonialForCity } from "@/data/localSeoData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import salleFormation from "@/assets/center/salle-formation-equipee.jpg";
import groupePromotion from "@/assets/center/groupe-promotion-1.jpg";

const FormationVille = () => {
  const { ville } = useParams<{ ville: string }>();
  const city = ville ? getCityBySlug(ville) : undefined;
  const dynamicH1 = useDynamicH1(`/formations/${ville || ""}`, city ? `Formation Taxi & VTC près de ${city.name}` : "");

  if (!city) {
    return <Navigate to="/formations" replace />;
  }

  const testimonial = getTestimonialForCity(city);
  const localFaqs = getLocalFaqs(city);

  // Nearby cities (exclude current, max 8)
  const nearbyCities = cities
    .filter(c => c.slug !== city.slug)
    .slice(0, 8);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://ecolet3p.fr/formations/${city.slug}#localbusiness`,
    "name": `ECOLE T3P — Formation Taxi VTC près de ${city.name}`,
    "image": "https://ecolet3p.fr/og-image.jpg",
    "telephone": "+33188750555",
    "email": "montrouge@ecolet3p.fr",
    "url": `https://ecolet3p.fr/formations/${city.slug}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3 rue Corneille",
      "addressLocality": "Montrouge",
      "postalCode": "92120",
      "addressRegion": "Hauts-de-Seine",
      "addressCountry": "FR"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 48.8155, "longitude": 2.3137 },
    "areaServed": {
      "@type": "City",
      "name": city.name,
      "containedInPlace": { "@type": "AdministrativeArea", "name": city.department }
    },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "359" },
    "priceRange": "€€"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://ecolet3p.fr/" },
      { "@type": "ListItem", "position": 2, "name": "Formations", "item": "https://ecolet3p.fr/formations" },
      { "@type": "ListItem", "position": 3, "name": `Formation ${city.name}`, "item": `https://ecolet3p.fr/formations/${city.slug}` }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": localFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  };

  const formations = [
    { title: "Formation Taxi", price: "990€", duration: "Journée, Soir ou E-learning", desc: "Carte professionnelle Taxi — Examen CMA inclus", link: "/formations/taxi" },
    { title: "Formation VTC", price: "990€", duration: "Journée, Soir ou E-learning", desc: "Carte professionnelle VTC — Uber, Bolt, Heetch", link: "/formations/vtc" },
    { title: "Formation VMDTR", price: "990€", duration: "Journée, Soir ou E-learning", desc: "Carte professionnelle moto-taxi", link: "/formations/vmdtr" },
    { title: "Passerelle VTC ↔ Taxi", price: "665€", duration: "14h — 2 jours", desc: "Double carte pour doubler vos revenus", link: "/passerelle-vtc-taxi" },
  ];

  const whyChooseUs = city.whyChoose || [
    { icon: Trophy, title: "94% de réussite", text: `Un taux de réussite exceptionnel pour les stagiaires venant de ${city.name} et des communes voisines.` },
    { icon: MapPin, title: `À ${city.travelTime}`, text: `Notre centre à Montrouge est directement accessible depuis ${city.name}. Trajet simple et rapide.` },
    { icon: Shield, title: "Centre agréé Préfecture", text: "Agrément n° 23/007 délivré par la Préfecture des Hauts-de-Seine. Formation conforme aux exigences réglementaires." },
    { icon: CreditCard, title: "990€ tout compris", text: "Frais d'examen CMA de 241€ inclus. Paiement en 4× sans frais via Alma (247,50€/mois)." },
  ];

  return (
    <Layout>
      <DynamicSEOHead
        pageUrl={`/formations/${city.slug}`}
        defaultTitle={city.seoTitle}
        defaultDescription={city.seoDescription}
        canonicalUrl={`https://www.ecolet3p.fr/formations/${city.slug}`}
        ogImage="https://www.ecolet3p.fr/og-image.jpg"
      >
        <meta name="geo.region" content={`FR-${city.departmentCode}`} />
        <meta name="geo.placename" content={city.name} />
        <meta name="geo.position" content={`${city.latitude};${city.longitude}`} />
        <meta name="ICBM" content={`${city.latitude}, ${city.longitude}`} />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </DynamicSEOHead>

      {/* Breadcrumb */}
      <nav className="bg-muted border-b border-border mt-16" aria-label="Breadcrumb">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary transition-colors flex items-center gap-1"><Home className="w-4 h-4" /> Accueil</Link></li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li><Link to="/formations" className="hover:text-primary transition-colors">Formations</Link></li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li className="font-semibold text-foreground">{city.name}</li>
          </ol>
        </div>
      </nav>

      {/* Hero — Photo centre + overlay vert */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${salleFormation})`, filter: "blur(2px) brightness(0.25)" }}
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-white/15 text-white mb-5">
              <MapPin className="w-4 h-4" /> {city.name} ({city.postalCodes[0]}) — {city.department}
            </span>
            <h1 className="text-[28px] md:text-[42px] lg:text-[52px] font-bold text-white leading-tight mb-5">
              {dynamicH1}
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mb-6">
              Centre ECOLE T3P à <strong className="text-white">{city.travelTime}</strong> de {city.name}.
              Agrément Préfecture n° 23/007 — <strong className="text-white">94% de réussite</strong> — 990€ tout compris.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Clock className="w-4 h-4" /> {city.travelTime}
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <MapPin className="w-4 h-4" /> {city.distanceFromCenter}
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Trophy className="w-4 h-4" /> 94% de réussite
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                className="btn-cta-orange px-8 py-4 text-base font-bold rounded-lg inline-flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-5 h-5" /> Je m'inscris
              </Link>
              <a
                href="tel:0188750555"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white hover:text-primary transition-all"
              >
                <Phone className="w-5 h-5" /> 01 88 75 05 55
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Barre de réassurance */}
      <section className="bg-muted py-5 border-b border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Calendar, value: "Depuis 2014", label: "+10 ans d'expérience" },
              { icon: Users, value: "+2 000", label: "Chauffeurs formés" },
              { icon: Trophy, value: "94%", label: "Taux de réussite" },
              { icon: Star, value: "5.0/5", label: "359 avis Google" },
            ].map((s) => (
              <div key={s.value} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="stat-number text-lg leading-tight">{s.value}</span>
                  <span className="block text-xs text-muted-foreground">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction locale personnalisée */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="section-title mb-4">
                {city.introTitle || `Pourquoi les habitants de ${city.name} choisissent ECOLE T3P`}
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                {city.introText ? (
                  city.introText.map((p, i) => <p key={i}>{p}</p>)
                ) : (
                  <>
                    <p>{city.localContext}</p>
                    <p>
                      Situé au <strong className="text-foreground">3 rue Corneille à Montrouge (92120)</strong>,
                      à seulement 200m du métro <strong className="text-foreground">Mairie de Montrouge (ligne 4)</strong>,
                      notre centre est accessible en <strong className="text-foreground">{city.travelTime}</strong> depuis {city.name}.
                      Nos formations à 990€ tout compris incluent les frais d'examen CMA de 241€ et un accompagnement
                      personnalisé jusqu'à l'obtention de votre carte professionnelle.
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img
                src={salleFormation}
                alt={`Salle de formation ECOLE T3P pour les stagiaires de ${city.name}`}
                className="rounded-xl w-full h-40 object-cover"
                loading="lazy"
              />
              <img
                src={groupePromotion}
                alt={`Promotion de chauffeurs diplômés incluant des stagiaires de ${city.name}`}
                className="rounded-xl w-full h-40 object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">
            Nos atouts pour les stagiaires de {city.name}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyChooseUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="card-t3p text-center"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Formations disponibles */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="section-title mb-3">Formations accessibles depuis {city.name}</h2>
            <p className="section-subtitle mx-auto">
              Toutes nos formations sont dispensées dans notre centre agréé de Montrouge, en journée, soirée ou e-learning.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {formations.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card-t3p group hover:border-primary/30"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-foreground">{f.title}</h3>
                  <span className="text-lg font-bold text-primary">{f.price}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{f.desc}</p>
                <p className="text-xs text-muted-foreground mb-4">{f.duration}</p>
                <Link
                  to={f.link}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
                >
                  En savoir plus <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accès & transport détaillé */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">
            Comment venir depuis {city.name}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="card-t3p text-center">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-3">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-bold text-foreground text-sm mb-1">Temps de trajet</h4>
              <p className="text-lg font-bold text-primary">{city.travelTime}</p>
            </div>
            <div className="card-t3p text-center">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-bold text-foreground text-sm mb-1">Distance</h4>
              <p className="text-lg font-bold text-primary">{city.distanceFromCenter}</p>
            </div>
            {city.metroAccess && (
              <div className="card-t3p text-center">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-3">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-bold text-foreground text-sm mb-1">Métro</h4>
                <p className="text-xs text-muted-foreground">{city.metroAccess}</p>
              </div>
            )}
            {city.trainAccess && (
              <div className="card-t3p text-center">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-3">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-bold text-foreground text-sm mb-1">RER / Train</h4>
                <p className="text-xs text-muted-foreground">{city.trainAccess}</p>
              </div>
            )}
            {city.busAccess && (
              <div className="card-t3p text-center">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-3">
                  <Bus className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-bold text-foreground text-sm mb-1">Bus</h4>
                <p className="text-xs text-muted-foreground">{city.busAccess}</p>
              </div>
            )}
            {city.tramAccess && (
              <div className="card-t3p text-center">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-3">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-bold text-foreground text-sm mb-1">Tramway</h4>
                <p className="text-xs text-muted-foreground">{city.tramAccess}</p>
              </div>
            )}
          </div>

          {/* Detailed access text if available */}
          {city.detailedAccess && (
            <div className="card-t3p border-l-4 border-l-primary max-w-3xl mx-auto">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> Itinéraire détaillé depuis {city.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{city.detailedAccess}</p>
            </div>
          )}
        </div>
      </section>

      {/* Témoignage */}
      {testimonial && (
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto card-t3p border-l-4 border-l-accent">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
                <span className="ml-2 text-xs text-muted-foreground">Avis vérifié Google</span>
              </div>
              <p className="text-sm text-foreground italic mb-4 leading-relaxed">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role} — {testimonial.city}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ locale enrichie */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">
            Questions fréquentes — {city.name}
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {localFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-5">
                  <AccordionTrigger className="text-left text-sm font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent forceMount className="text-sm text-muted-foreground data-[state=closed]:hidden">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "24px 24px"
        }} />
        <div className="container-custom text-center relative z-10">
          <GraduationCap className="w-12 h-12 text-white/30 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Vous habitez {city.name} ?<br />
            <span className="text-gold">Lancez votre carrière de chauffeur</span>
          </h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            990€ tout compris, frais d'examen inclus.
            Paiement en 4× sans frais. Sessions chaque semaine.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="btn-cta-orange px-8 py-4 font-bold rounded-lg inline-flex items-center gap-2"
            >
              Je m'inscris <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:0188750555"
              className="text-white/80 hover:text-white font-semibold inline-flex items-center gap-2"
            >
              <Phone className="w-5 h-5" /> 01 88 75 05 55
            </a>
          </div>
        </div>
      </section>

      {/* Villes proches — maillage interne */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="section-title text-center mb-6 text-lg">
            Formations accessibles depuis les villes voisines
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {nearbyCities.map((c) => (
              <Link
                key={c.slug}
                to={`/formations/${c.slug}`}
                className="px-4 py-2 bg-muted border border-border rounded-lg text-foreground hover:bg-primary hover:text-white transition-all text-sm font-medium"
              >
                {c.name}
              </Link>
            ))}
            <Link
              to="/formations/villes"
              className="px-4 py-2 text-sm font-semibold text-accent hover:underline inline-flex items-center gap-1"
            >
              Voir toutes les villes <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FormationVille;
