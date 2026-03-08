import React, { useState } from "react";
import TrustBar from "@/components/home/TrustBar";
import DynamicSEOHead from "@/components/seo/DynamicSEOHead";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { 
  Award, Users, FileCheck, MapPin, Phone, 
  ChevronLeft, ChevronRight, Star, Home, CheckCircle,
  Target, Handshake, Lightbulb, Building
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
  // People first
  { src: groupePromotion1, alt: "Promotion de stagiaires ECOLE T3P", caption: "Une de nos promotions — futurs chauffeurs professionnels" },
  { src: groupePromotion2, alt: "Groupe de stagiaires en formation", caption: "Nos stagiaires lors de la remise des attestations" },
  { src: formationSession, alt: "Session de formation en cours", caption: "Cours en petit groupe — maximum 15 participants" },
  { src: formationWhiteboard, alt: "Formateur au tableau blanc", caption: "Formation théorique avec nos formateurs experts" },
  // Then facilities
  { src: entreeCentre, alt: "Entrée du centre ECOLE T3P à Montrouge", caption: "Notre centre au 3 rue Corneille, Montrouge" },
  { src: accueilReception, alt: "Accueil et réception ECOLE T3P", caption: "Accueil chaleureux dès votre arrivée" },
  { src: salleModerne, alt: "Salle de formation moderne", caption: "Salle de formation moderne et climatisée" },
  { src: salleFormationEquipee, alt: "Salle de formation équipée", caption: "Équipement pédagogique complet" },
  { src: salleProjecteur, alt: "Salle avec vidéoprojecteur", caption: "Vidéoprojecteur et supports numériques" },
];

const keyPoints = [
  {
    icon: FileCheck,
    title: "Centre agréé",
    description: "Agrément préfectoral pour les formations T3P conformes à la réglementation.",
  },
  {
    icon: Users,
    title: "Formateurs expérimentés",
    description: "Équipe pédagogique composée de professionnels du secteur.",
  },
  {
    icon: Award,
    title: "Conformité réglementaire",
    description: "Programmes conformes aux exigences du décret n°2017-483.",
  },
  {
    icon: MapPin,
    title: "Sessions régulières",
    description: "Formations organisées tout au long de l'année à Montrouge.",
  },
];

const stats = [
  { value: "94%", label: "Taux de réussite" },
  { value: "10 ans", label: "D'expérience" },
  { value: "2 000+", label: "Apprenants formés" },
  { value: "359", label: "Avis Google" },
];

const testimonials = [
  {
    name: "Marc D.",
    role: "Chauffeur Taxi",
    content: "Formation complète et bien structurée. Les formateurs connaissent parfaitement le métier.",
    rating: 5
  },
  {
    name: "Sophie L.",
    role: "Chauffeur VTC",
    content: "Excellent accompagnement du début à la fin. L'équipe est très professionnelle.",
    rating: 5
  },
  {
    name: "Karim B.",
    role: "Chauffeur Taxi",
    content: "Bonne préparation à l'examen. Les cours sur la réglementation m'ont été très utiles.",
    rating: 5
  }
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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://ecolet3p.fr/#organization",
    "name": "ECOLE T3P",
    "description": "Centre de formation agréé pour chauffeurs Taxi, VTC et VMDTR à Montrouge.",
    "url": "https://ecolet3p.fr",
    "telephone": "+33 1 88 75 05 55",
    "email": "montrouge@ecolet3p.fr",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3 rue Corneille",
      "addressLocality": "Montrouge",
      "postalCode": "92120",
      "addressCountry": "FR"
    }
  };

  return (
    <Layout>
      <DynamicSEOHead
        pageUrl="/a-propos"
        defaultTitle="À Propos d'ECOLE T3P — Formation Taxi VTC"
        defaultDescription="Découvrez ECOLE T3P, centre de formation Taxi VTC VMDTR à Montrouge depuis 2014. Taux de réussite 94%, 359 avis 5 étoiles. Formateurs experts du transport."
        canonicalUrl="https://ecolet3p.fr/a-propos"
      >
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://ecolet3p.fr/" },
            { "@type": "ListItem", "position": 2, "name": "À propos", "item": "https://ecolet3p.fr/a-propos" }
          ]
        })}</script>
      </DynamicSEOHead>

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
                <BreadcrumbPage>Pourquoi ECOLE T3P</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 lg:py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-forest mb-6">
                Pourquoi choisir ECOLE T3P ?
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Centre de formation agréé depuis 2014 pour les métiers du transport de personnes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Key Points */}
      <section className="py-16 bg-forest/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyPoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="h-full text-center">
                      <CardContent className="pt-6">
                        <div className="w-14 h-14 rounded-xl bg-forest/10 flex items-center justify-center mx-auto mb-4">
                          <IconComponent className="w-7 h-7 text-forest" />
                        </div>
                        <h3 className="font-bold text-forest mb-2">{point.title}</h3>
                        <p className="text-sm text-muted-foreground">{point.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-forest mb-6">Notre centre de formation</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Fondé en 2014, <strong className="text-forest">ECOLE T3P</strong> est un centre de formation 
                    agréé situé à Montrouge, aux portes de Paris.
                  </p>
                  <p>
                    Notre équipe de formateurs expérimentés accompagne chaque année des personnes dans leur 
                    projet professionnel : formation initiale, formation continue ou mobilité taxi.
                  </p>
                  <p>
                    Nous proposons des formations conformes à la réglementation en vigueur, dispensées dans 
                    un cadre moderne et équipé.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img
                  src={formationSession}
                  alt="Session de formation ECOLE T3P"
                  width={600}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="rounded-xl shadow-lg w-full"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-forest mb-6">Notre histoire</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Fondé en 2014, <strong className="text-forest">ECOLE T3P</strong> est né d'une conviction : 
                  la formation des chauffeurs professionnels mérite l'excellence. 
                  Le centre a été créé pour combiner rigueur pédagogique et accompagnement humain.
                </p>
                <p>
                  Avec plus de 2 000 élèves formés en 10 ans, ECOLE T3P s'est imposé comme une référence 
                  en Île-de-France pour les formations Taxi, VTC et VMDTR. Notre taux de réussite de 94% 
                  témoigne de la qualité de notre enseignement et de l'engagement de notre équipe.
                </p>
                <p>
                  Aujourd'hui, ECOLE T3P continue d'innover pour préparer les chauffeurs aux défis de demain : 
                  nouvelles réglementations, transition écologique, outils numériques et intelligence artificielle.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-16 bg-forest/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-forest mb-10 text-center">Nos valeurs</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Excellence",
                  description: "Taux de réussite de 94% à l'examen préfectoral. Nos programmes sont actualisés chaque année pour intégrer les dernières évolutions réglementaires et les meilleures pratiques du secteur.",
                  highlight: "94% de réussite",
                },
                {
                  icon: Handshake,
                  title: "Accompagnement",
                  description: "Suivi personnalisé de chaque apprenant, de l'inscription jusqu'à l'obtention de la carte professionnelle. Nous vous aidons dans vos démarches administratives, le choix du statut juridique et la recherche de financement.",
                  highlight: "De A à Z",
                },
                {
                  icon: Lightbulb,
                  title: "Innovation",
                  description: "Intégration des outils numériques, préparation aux nouvelles réglementations ZFE et formation aux applications de réservation. Nos stagiaires sont prêts pour le métier de demain.",
                  highlight: "Tourné vers 2026",
                },
              ].map((value, index) => {
                const IconComp = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.15 }}
                  >
                    <Card className="h-full text-center border-2 hover:border-forest/20 transition-colors">
                      <CardContent className="pt-8 pb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-5">
                          <IconComp className="w-8 h-8 text-gold" />
                        </div>
                        <h3 className="text-xl font-bold text-forest mb-2">{value.title}</h3>
                        <p className="text-xs font-semibold text-gold mb-3">{value.highlight}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-forest mb-8 text-center">Nos chiffres</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl font-black text-gold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-forest mb-2 text-center">Notre centre en images</h2>
            <p className="text-sm text-muted-foreground text-center mb-8">Cliquez sur une photo pour l'agrandir</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer overflow-hidden rounded-xl"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative group">
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={400}
                      height={192}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-40 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 px-1 leading-snug">{image.caption}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-4xl p-0 bg-black/95 border-none">
          <AnimatePresence mode="wait">
            {selectedImage !== null && (
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative"
              >
                <img
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  width={800}
                  height={600}
                  loading="eager"
                  decoding="async"
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-medium">{galleryImages[selectedImage].caption}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white"
                  onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white"
                  onClick={(e) => { e.stopPropagation(); goToNext(); }}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      {/* Testimonials */}
      <section className="py-16 bg-forest/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-forest mb-8 text-center">Avis de nos apprenants</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <div className="flex gap-0.5 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                        ))}
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">"{testimonial.content}"</p>
                      <div>
                        <p className="font-medium text-forest">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Note moyenne : 5.0/5 sur 359 avis Google
            </p>
          </div>
        </div>
      </section>

      {/* Partenaires */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl font-bold text-forest mb-6">Nos partenaires institutionnels</h2>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="flex items-center gap-3 px-6 py-4 bg-card rounded-xl border">
                <Building className="w-8 h-8 text-forest" />
                <div className="text-left">
                  <p className="font-semibold text-forest text-sm">Préfecture des Hauts-de-Seine</p>
                  <p className="text-xs text-muted-foreground">Agrément centre de formation T3P</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-6 py-4 bg-card rounded-xl border">
                <FileCheck className="w-8 h-8 text-forest" />
                <div className="text-left">
                  <p className="font-semibold text-forest text-sm">Agréé Préfecture</p>
                  <p className="text-xs text-muted-foreground">Agrément n° 23/007 — Hauts-de-Seine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-forest mb-4">Prêt à démarrer ?</h2>
            <p className="text-muted-foreground mb-8">
              Contactez-nous pour en savoir plus sur nos formations et discuter de votre projet.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="btn-accent">
                <Link to="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Nous contacter
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/formations">
                  Voir les formations
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
