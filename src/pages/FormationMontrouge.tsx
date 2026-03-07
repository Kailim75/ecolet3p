import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  MapPin, Clock, Train, Bus, CheckCircle2, ArrowRight,
  GraduationCap, Phone, Calendar, Star, Users, Trophy,
  Building2, CreditCard, Home, ChevronRight, Car
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import salleFormation from "@/assets/center/salle-formation-equipee.jpg";
import accueilReception from "@/assets/center/accueil-reception.jpg";
import groupePromotion from "@/assets/center/groupe-promotion-1.jpg";

const formations = [
  {
    title: "Formation TAXI Initiale",
    duration: "Journée, Soir ou E-learning",
    price: "990€",
    description: "Formation complète pour obtenir la carte professionnelle Taxi. Programme conforme à l'arrêté préfectoral, incluant la réglementation, la gestion et la sécurité routière.",
    link: "/formations/taxi",
  },
  {
    title: "Formation VTC",
    duration: "Journée, Soir ou E-learning",
    price: "990€",
    description: "Devenez chauffeur VTC professionnel. Formation intensive couvrant tous les modules de l'examen CMA, avec accompagnement à l'inscription sur les plateformes Uber et Bolt.",
    link: "/formations/vtc",
  },
  {
    title: "Formation VMDTR (Moto-taxi)",
    duration: "14 heures",
    price: "490€",
    description: "Obtenez la carte professionnelle VMDTR pour exercer en tant que moto-taxi. Formation pratique et théorique sur 2 jours.",
    link: "/formations/vmdtr",
  },
  {
    title: "Formation Mobilité",
    duration: "14 heures",
    price: "490€",
    description: "Passerelle Taxi ↔ VTC pour les chauffeurs souhaitant diversifier leur activité. Formation rapide de 14h.",
    link: "/formations/mobilite",
  },
];

const stats = [
  { icon: Calendar, value: "Depuis 2014", label: "Centre historique" },
  { icon: Users, value: "+2 000", label: "Chauffeurs formés" },
  { icon: Trophy, value: "94%", label: "Taux de réussite" },
  { icon: Star, value: "5.0/5", label: "359 avis Google" },
];

const advantages = [
  {
    icon: MapPin,
    title: "Emplacement idéal",
    text: "3 rue Corneille, Montrouge (92120) — à 200m du métro Mairie de Montrouge (ligne 4), en plein cœur de ville.",
  },
  {
    icon: Building2,
    title: "Locaux modernes",
    text: "Salles de formation climatisées, équipées de vidéoprojecteurs HD, Wi-Fi haut débit et espace détente pour les pauses.",
  },
  {
    icon: GraduationCap,
    title: "Formateurs experts",
    text: "Équipe pédagogique composée d'anciens chauffeurs professionnels et de formateurs agréés par la Préfecture des Hauts-de-Seine.",
  },
  {
    icon: CreditCard,
    title: "Paiement en 4× sans frais",
    text: "À partir de 990€ avec frais d'examen CMA inclus. Paiement facilité en 4× sans frais via Alma.",
  },
  {
    icon: Clock,
    title: "3 formats flexibles",
    text: "Formation en journée (1 semaine), en soirée (2 semaines) ou en e-learning illimité — même tarif, même qualité.",
  },
  {
    icon: Car,
    title: "Location véhicule examen",
    text: "Service exclusif de location de véhicule pour le jour de l'examen pratique. Vous vous concentrez sur l'épreuve, on s'occupe du reste.",
  },
];

const faqs = [
  {
    question: "Où se situe exactement le centre ECOLE T3P à Montrouge ?",
    answer: "Notre centre est situé au 3 rue Corneille, 92120 Montrouge, à 200 mètres de la station de métro Mairie de Montrouge (ligne 4). En sortant du métro, prenez la rue Gabriel Péri puis tournez à droite dans la rue Corneille. Le centre est accessible aux personnes à mobilité réduite.",
  },
  {
    question: "Quels sont les horaires d'ouverture du centre de Montrouge ?",
    answer: "Le centre est ouvert du lundi au vendredi de 9h30 à 12h30 et de 13h30 à 18h00. Les formations en soirée se déroulent de 18h à 21h30. L'accueil téléphonique est disponible aux mêmes horaires au 01 88 75 05 55.",
  },
  {
    question: "Comment s'inscrire à une formation au centre de Montrouge ?",
    answer: "Vous pouvez vous pré-inscrire directement en ligne sur notre site, par téléphone au 01 88 75 05 55, ou en vous rendant directement à notre centre au 3 rue Corneille. Un conseiller vous accompagne dans le choix de la formation et les démarches administratives.",
  },
  {
    question: "Le centre de Montrouge est-il agréé par la Préfecture ?",
    answer: "Oui, ECOLE T3P dispose de l'agrément n° 23/007 délivré par la Préfecture des Hauts-de-Seine. Cet agrément est obligatoire pour dispenser les formations préparatoires aux examens Taxi, VTC et VMDTR.",
  },
  {
    question: "Quelles villes sont desservies depuis le centre de Montrouge ?",
    answer: "Grâce à notre emplacement sur la ligne 4 du métro et aux nombreuses lignes de bus, notre centre est facilement accessible depuis Bagneux, Châtillon, Malakoff, Vanves, Clamart, Issy-les-Moulineaux, Fontenay-aux-Roses, ainsi que les 13e, 14e et 15e arrondissements de Paris.",
  },
  {
    question: "Peut-on visiter le centre avant de s'inscrire ?",
    answer: "Absolument ! Nous vous invitons à visiter nos locaux et rencontrer notre équipe pédagogique. Prenez rendez-vous par téléphone au 01 88 75 05 55 ou passez directement pendant nos horaires d'ouverture. La visite est gratuite et sans engagement.",
  },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://ecolet3p.fr/formations/montrouge#localbusiness",
  name: "ECOLE T3P — Centre de Formation Taxi VTC Montrouge",
  image: "https://ecolet3p.fr/og-image.jpg",
  telephone: "+33188750555",
  email: "montrouge@ecolet3p.fr",
  url: "https://ecolet3p.fr/formations/montrouge",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3 rue Corneille",
    addressLocality: "Montrouge",
    postalCode: "92120",
    addressRegion: "Hauts-de-Seine",
    addressCountry: "FR",
  },
  geo: { "@type": "GeoCoordinates", latitude: 48.8155, longitude: 2.3137 },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "359" },
  priceRange: "€€",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:30", closes: "12:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "13:30", closes: "18:00" },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.ecolet3p.fr/" },
    { "@type": "ListItem", position: 2, name: "Formations", item: "https://www.ecolet3p.fr/formations" },
    { "@type": "ListItem", position: 3, name: "Montrouge", item: "https://www.ecolet3p.fr/formations/montrouge" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const FormationMontrouge = () => {
  return (
    <Layout>
      <Helmet>
        <title>Formation Taxi VTC Montrouge (92) — ECOLE T3P</title>
        <meta
          name="description"
          content="Centre de formation Taxi, VTC et VMDTR à Montrouge (92120). Agrément Préfecture n° 23/007, 94% de réussite, à partir de 990€. Métro Mairie de Montrouge ligne 4."
        />
        <link rel="canonical" href="https://www.ecolet3p.fr/formations/montrouge" />
        <meta property="og:title" content="Formation Taxi VTC Montrouge — ECOLE T3P" />
        <meta property="og:description" content="Centre agréé Préfecture à Montrouge. 94% de réussite aux examens Taxi et VTC. À partir de 990€, paiement en 4×." />
        <meta property="og:url" content="https://www.ecolet3p.fr/formations/montrouge" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.ecolet3p.fr/og-image.jpg" />
        <meta name="geo.region" content="FR-92" />
        <meta name="geo.placename" content="Montrouge" />
        <meta name="geo.position" content="48.8155;2.3137" />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <nav className="bg-muted border-b border-border mt-16" aria-label="Breadcrumb">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary transition-colors flex items-center gap-1"><Home className="w-4 h-4" /> Accueil</Link></li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li><Link to="/formations" className="hover:text-primary transition-colors">Formations</Link></li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li className="font-semibold text-foreground">Montrouge</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-primary overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${salleFormation})`, filter: "blur(2px) brightness(0.3)" }}
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-white/15 text-white mb-6">
              <MapPin className="w-4 h-4" /> Montrouge (92120) — Métro ligne 4
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-white leading-tight mb-6">
              Centre de formation <span className="text-gold">Taxi & VTC</span> à Montrouge
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Depuis 2014, ECOLE T3P forme les futurs chauffeurs Taxi, VTC et VMDTR au cœur de Montrouge.
              Agrément Préfecture n° 23/007 — <strong className="text-white">94% de réussite</strong> — à partir de 990€.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="btn-cta-orange px-8 py-4 text-base font-bold">
                <Link to="/contact">
                  <Phone className="w-5 h-5 mr-2" /> Nous contacter
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-base font-bold">
                <Link to="/formations">
                  Voir les formations <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-muted py-6 border-b border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
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

      {/* Le centre */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">Notre centre de Montrouge</h2>
            <p className="section-subtitle mx-auto">
              Un espace de formation moderne et accessible, pensé pour votre réussite
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-foreground mb-4">Un emplacement stratégique dans les Hauts-de-Seine</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Situé au <strong className="text-foreground">3 rue Corneille à Montrouge (92120)</strong>, notre centre de formation
                bénéficie d'un emplacement privilégié dans les Hauts-de-Seine. À seulement 200 mètres de la station
                <strong className="text-foreground"> Mairie de Montrouge</strong> sur la <strong className="text-foreground">ligne 4 du métro</strong>,
                nous sommes directement accessibles depuis Paris et toute la banlieue sud.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Les habitants de Bagneux, Châtillon, Malakoff, Vanves, Clamart, Issy-les-Moulineaux
                et des arrondissements sud de Paris (13e, 14e, 15e) rejoignent notre centre en moins de 20 minutes.
                Plusieurs lignes de bus (68, 128, 323, 126) complètent la desserte du quartier.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Un parking public se trouve à proximité immédiate pour les stagiaires venant en véhicule.
                Le centre est entièrement <strong className="text-foreground">accessible aux personnes à mobilité réduite</strong>.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src={accueilReception}
                alt="Accueil et réception du centre ECOLE T3P à Montrouge"
                className="rounded-xl w-full h-48 object-cover"
                loading="lazy"
              />
              <img
                src={salleFormation}
                alt="Salle de formation équipée ECOLE T3P Montrouge"
                className="rounded-xl w-full h-48 object-cover"
                loading="lazy"
              />
              <img
                src={groupePromotion}
                alt="Promotion de stagiaires diplômés ECOLE T3P"
                className="rounded-xl w-full h-48 object-cover col-span-2"
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* Access cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Train, title: "Métro ligne 4", desc: "Mairie de Montrouge — 200m à pied" },
              { icon: Bus, title: "Bus 68, 128, 323", desc: "Arrêt Mairie de Montrouge" },
              { icon: Car, title: "Parking", desc: "Parking public à proximité" },
              { icon: Clock, title: "Horaires", desc: "Lun–Ven : 9h30–12h30 / 13h30–18h" },
            ].map((item) => (
              <div key={item.title} className="card-t3p text-center">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-bold text-foreground text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">Pourquoi choisir ECOLE T3P Montrouge</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv, i) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card-t3p"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <adv.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{adv.title}</h3>
                <p className="text-sm text-muted-foreground">{adv.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formations */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="section-title mb-3">Formations disponibles à Montrouge</h2>
            <p className="section-subtitle mx-auto">
              Toutes nos formations sont dispensées dans notre centre agréé, en journée, soirée ou e-learning
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {formations.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-t3p group hover:border-accent/30 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-base font-bold text-foreground">{f.title}</h3>
                  <span className="text-sm font-bold text-accent shrink-0">{f.price}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  <Clock className="w-3 h-3 inline mr-1" />{f.duration}
                </p>
                <p className="text-sm text-muted-foreground mb-4">{f.description}</p>
                <Link
                  to={f.link}
                  className="text-sm font-semibold text-accent inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  En savoir plus <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">Questions fréquentes — Montrouge</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-5">
                  <AccordionTrigger className="text-left text-sm font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Villes proches */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="section-title text-center mb-8">Villes proches de notre centre</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {["bagneux","chatillon","malakoff","vanves","clamart","issy-les-moulineaux","fontenay-aux-roses","meudon"].map((slug) => (
              <Link
                key={slug}
                to={`/formations/${slug}`}
                className="card-t3p text-center text-sm font-medium text-primary hover:text-accent transition-colors py-3"
              >
                {slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Visitez notre centre de Montrouge
          </h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            Prenez rendez-vous pour découvrir nos locaux, rencontrer nos formateurs et choisir la formation qui vous correspond.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="btn-cta-orange px-8 py-4 font-bold">
              <Link to="/contact">
                <Calendar className="w-5 h-5 mr-2" /> Prendre rendez-vous
              </Link>
            </Button>
            <a href="tel:0188750555" className="text-white/80 hover:text-white font-semibold inline-flex items-center gap-2">
              <Phone className="w-5 h-5" /> 01 88 75 05 55
            </a>
          </div>
        </div>
      </section>

      {/* SEO content block */}
      <section className="section-padding bg-muted">
        <div className="container-custom max-w-4xl">
          <h2 className="text-xl font-bold text-foreground mb-4">ECOLE T3P : votre centre de formation T3P de référence à Montrouge</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Fondée en 2014, l'ECOLE T3P est le centre de formation de référence pour les métiers du Transport Public Particulier
            de Personnes dans les Hauts-de-Seine. Implanté au cœur de Montrouge, à deux pas du métro Mairie de Montrouge (ligne 4),
            notre centre accueille chaque année des centaines de futurs chauffeurs professionnels venus de toute l'Île-de-France.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Notre agrément préfectoral n° 23/007, délivré par la Préfecture des Hauts-de-Seine, garantit la conformité de nos
            programmes avec les exigences réglementaires. Avec un taux de réussite de 94% aux examens de la Chambre des Métiers
            et de l'Artisanat (CMA), ECOLE T3P s'impose comme l'un des centres les plus performants de la région parisienne.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Que vous souhaitiez devenir chauffeur de taxi, conducteur VTC ou moto-taxi VMDTR, nos formateurs
            vous accompagnent de l'inscription à l'obtention de votre carte professionnelle. Le tarif unique de 990€
            inclut les frais d'examen CMA (241€) et l'accès à notre plateforme e-learning. Le paiement en 4× sans frais
            via Alma rend la formation accessible à tous les budgets.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default FormationMontrouge;
