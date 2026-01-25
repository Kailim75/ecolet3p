import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Target, Heart, Users, Trophy, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Import center images
import accueilReception from "@/assets/center/accueil-reception.jpg";
import entreeCentre from "@/assets/center/entree-centre.jpg";
import formationSession from "@/assets/center/formation-session.jpg";
import formationWhiteboard from "@/assets/center/formation-whiteboard.jpg";
import groupePromotion1 from "@/assets/center/groupe-promotion-1.jpg";
import groupePromotion2 from "@/assets/center/groupe-promotion-2.jpg";
import salleFormationEquipee from "@/assets/center/salle-formation-equipee.jpg";
import salleModerne from "@/assets/center/salle-moderne.jpg";
import salleProjecteur from "@/assets/center/salle-projecteur.jpg";

const galleryImages = [
  { src: entreeCentre, alt: "Entrée du centre T3P Campus", caption: "Entrée du centre" },
  { src: accueilReception, alt: "Accueil et réception", caption: "Accueil et réception" },
  { src: salleModerne, alt: "Salle de formation moderne", caption: "Salle moderne" },
  { src: salleFormationEquipee, alt: "Salle de formation équipée", caption: "Salle équipée" },
  { src: salleProjecteur, alt: "Salle avec projecteur", caption: "Espace projection" },
  { src: formationSession, alt: "Session de formation en cours", caption: "Session en cours" },
  { src: formationWhiteboard, alt: "Formation au tableau", caption: "Cours théorique" },
  { src: groupePromotion1, alt: "Groupe de promotion", caption: "Nos promotions" },
  { src: groupePromotion2, alt: "Groupe de stagiaires", caption: "Nos stagiaires" },
];

const values = [
  {
    icon: Trophy,
    title: "Excellence",
    description: "Nous visons l'excellence avec un taux de réussite de 94% à l'examen professionnel.",
  },
  {
    icon: Heart,
    title: "Accompagnement",
    description: "Un suivi personnalisé pour chaque stagiaire, de l'inscription jusqu'à l'obtention de la carte.",
  },
  {
    icon: Target,
    title: "Réussite",
    description: "Notre objectif : votre réussite à l'examen et votre insertion professionnelle rapide.",
  },
  {
    icon: Users,
    title: "Flexibilité",
    description: "Des formats adaptés à votre situation : présentiel, à distance ou cours du soir.",
  },
];

const stats = [
  { value: "94%", label: "Taux de réussite" },
  { value: "10 ans", label: "D'expérience" },
  { value: "2 000+", label: "Apprenants formés" },
  { value: "4", label: "Formations proposées" },
];

const About = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  
  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };
  
  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "À propos de T3P Campus",
    "description": "Centre de formation professionnelle pour chauffeurs Taxi, VTC et VMDTR à Montrouge depuis 2014",
    "url": "https://t3pcampus.fr/a-propos",
    "mainEntity": {
      "@type": "EducationalOrganization",
      "name": "T3P Campus",
      "foundingDate": "2014",
      "description": "Centre de formation leader pour chauffeurs professionnels à Montrouge",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3 rue Corneille",
        "addressLocality": "Montrouge",
        "postalCode": "92120",
        "addressCountry": "FR"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "359"
      }
    }
  };

  const breadcrumbSchema = {
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
        "name": "À propos",
        "item": "https://t3pcampus.fr/a-propos"
      }
    ]
  };

  return (
    <Layout>
      <Helmet>
        <title>À propos de T3P Campus - Centre de Formation Taxi VTC | Montrouge</title>
        <meta name="description" content="Découvrez T3P Campus, centre de formation à Montrouge depuis 2014. 94% de taux de réussite, formateurs experts, 2 000+ apprenants formés. Formations Taxi, VTC et VMDTR." />
        <meta name="keywords" content="T3P Campus, centre formation taxi, formation VTC Montrouge, école chauffeur professionnel, formation transport" />
        <link rel="canonical" href="https://t3pcampus.fr/a-propos" />
        
        <meta property="og:title" content="À propos de T3P Campus - Centre de Formation Taxi VTC" />
        <meta property="og:description" content="Centre de formation depuis 2014. 94% de réussite, formateurs experts issus du métier. Découvrez nos locaux et notre équipe." />
        <meta property="og:url" content="https://t3pcampus.fr/a-propos" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://t3pcampus.fr/og-image.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="À propos de T3P Campus - Centre de Formation Taxi VTC" />
        <meta name="twitter:description" content="Centre de formation leader depuis 2014. 94% de réussite, formateurs experts issus du métier." />
        <meta name="twitter:image" content="https://t3pcampus.fr/og-image.jpg" />
        
        <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      {/* Hero - LiveMentor style */}
      <section className="gradient-hero py-20 md:py-28">
        <div className="container-custom text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-black text-cream uppercase tracking-tight mb-4"
          >
            À propos de <span className="text-gold">T3P Campus</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-cream/80 max-w-2xl mx-auto"
          >
            Votre centre de formation de référence pour devenir chauffeur professionnel TAXI, VTC ou VMDTR.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title mb-6">
                QUI SOMMES-NOUS ?
              </h2>
              <div className="space-y-4 text-warm-gray-600 leading-relaxed">
                <p>
                  Fondé en 2014, <strong className="text-forest">T3P Campus</strong> est un centre de formation 
                  professionnel situé à Montrouge, aux portes de Paris. Nous sommes spécialisés dans la formation 
                  des chauffeurs professionnels : TAXI, VTC et VMDTR (moto-taxi).
                </p>
                <p>
                  Notre équipe de formateurs expérimentés, tous issus du métier, accompagne chaque année 
                  des centaines de personnes dans leur reconversion professionnelle ou le développement 
                  de leurs compétences.
                </p>
                <p>
                  Avec un taux de réussite de <strong className="text-gold">94%</strong> à l'examen professionnel, nous sommes reconnus comme 
                  l'un des meilleurs centres de formation de la région parisienne.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src={formationSession}
                alt="Formation chauffeur professionnel - T3P Campus"
                className="rounded-xl shadow-warm-lg w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title mb-4">NOS LOCAUX</h2>
            <p className="section-subtitle mx-auto">
              Découvrez notre centre de formation moderne et équipé
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="relative group cursor-pointer overflow-hidden rounded-xl"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-medium text-sm">{image.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-5xl p-0 bg-black/95 border-none">
          <AnimatePresence mode="wait">
            {selectedImage !== null && (
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <img
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-lg font-medium">{galleryImages[selectedImage].caption}</p>
                  <p className="text-white/70 text-sm">{selectedImage + 1} / {galleryImages.length}</p>
                </div>

                {/* Navigation */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white h-12 w-12 rounded-full"
                  onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white h-12 w-12 rounded-full"
                  onClick={(e) => { e.stopPropagation(); goToNext(); }}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      {/* Stats */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="stat-number mb-2">
                  {stat.value}
                </div>
                <div className="text-warm-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="section-title mb-6">
              NOTRE MISSION
            </h2>
            <p className="text-lg text-warm-gray-600 leading-relaxed">
              Former des chauffeurs professionnels compétents, responsables et prêts à exercer leur métier 
              dans les meilleures conditions. Nous croyons que chaque personne mérite une formation de qualité 
              pour réussir sa reconversion professionnelle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">NOS VALEURS</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-livementor text-center group"
              >
                <div className="w-14 h-14 bg-forest/10 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/20 transition-colors">
                  <value.icon className="w-7 h-7 text-forest group-hover:text-gold transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-forest mb-3">
                  {value.title}
                </h3>
                <p className="text-warm-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Qualité */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="section-title mb-6">
              NOTRE ENGAGEMENT QUALITÉ
            </h2>
            <p className="text-warm-gray-600 mb-8">
              T3P Campus s'engage à vous offrir une formation de qualité avec un accompagnement personnalisé.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-forest/10 text-forest px-6 py-3 rounded-lg font-bold">
                Depuis 2014
              </div>
              <div className="bg-forest/10 text-forest px-6 py-3 rounded-lg font-bold">
                94% de réussite
              </div>
              <div className="bg-gold/20 text-forest px-6 py-3 rounded-lg font-bold">
                Formateurs experts
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
