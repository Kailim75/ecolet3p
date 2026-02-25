import React from "react";
import { motion, type Easing } from "framer-motion";
import { MapPin, Users, Monitor, Coffee } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Original imports
import formationSession from "@/assets/center/formation-session.jpg";
import formationWhiteboard from "@/assets/center/formation-whiteboard.jpg";
import salleEquipee from "@/assets/center/salle-formation-equipee.jpg";
import salleModerne from "@/assets/center/salle-moderne.jpg";
import salleProjecteur from "@/assets/center/salle-projecteur.jpg";
import accueilReception from "@/assets/center/accueil-reception.jpg";
import entreeCentre from "@/assets/center/entree-centre.jpg";
import groupePromotion1 from "@/assets/center/groupe-promotion-1.jpg";

// WebP srcset imports (vite-imagetools generates responsive WebP variants)
import formationSessionWebp from "@/assets/center/formation-session.jpg?w=400;800;1200&format=webp&as=srcset";
import formationWhiteboardWebp from "@/assets/center/formation-whiteboard.jpg?w=400;800;1200&format=webp&as=srcset";
import salleEquipeeWebp from "@/assets/center/salle-formation-equipee.jpg?w=400;800;1200&format=webp&as=srcset";
import salleModerneWebp from "@/assets/center/salle-moderne.jpg?w=400;800;1200&format=webp&as=srcset";
import salleProjecteurWebp from "@/assets/center/salle-projecteur.jpg?w=400;800;1200&format=webp&as=srcset";
import accueilReceptionWebp from "@/assets/center/accueil-reception.jpg?w=400;800;1200&format=webp&as=srcset";
import entreeCentreWebp from "@/assets/center/entree-centre.jpg?w=400;800;1200&format=webp&as=srcset";
import groupePromotion1Webp from "@/assets/center/groupe-promotion-1.jpg?w=400;800;1200&format=webp&as=srcset";

const images = [
  { src: salleEquipee, webp: salleEquipeeWebp, alt: "Salle de formation équipée ECOLE T3P", label: "Salle de formation" },
  { src: formationSession, webp: formationSessionWebp, alt: "Session de formation en cours", label: "Cours en session" },
  { src: salleModerne, webp: salleModerneWebp, alt: "Salle moderne avec équipement digital", label: "Équipement moderne" },
  { src: accueilReception, webp: accueilReceptionWebp, alt: "Espace d'accueil ECOLE T3P", label: "Espace accueil" },
  { src: formationWhiteboard, webp: formationWhiteboardWebp, alt: "Formateur au tableau interactif", label: "Formation interactive" },
  { src: entreeCentre, webp: entreeCentreWebp, alt: "Entrée du centre de formation", label: "Entrée du centre" },
  { src: salleProjecteur, webp: salleProjecteurWebp, alt: "Salle avec vidéoprojecteur", label: "Salle de projection" },
  { src: groupePromotion1, webp: groupePromotion1Webp, alt: "Promotion d'élèves diplômés", label: "Nos diplômés" },
];

const features = [
  { icon: MapPin, label: "Montrouge (92)", desc: "Proche métro" },
  { icon: Users, label: "15 places", desc: "Par session" },
  { icon: Monitor, label: "Équipé", desc: "Matériel moderne" },
  { icon: Coffee, label: "Espace détente", desc: "Pause café" },
];

const smoothEase: Easing = [0.22, 1, 0.36, 1];

const LocalsSection = () => {
  return (
    <section className="section-padding bg-cream-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-forest/5 -skew-x-12 transform origin-top-right" />
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-center mb-12"
        >
          <span className="badge-livementor mb-4 inline-flex">
            <MapPin className="w-4 h-4" />
            Notre centre
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-forest uppercase mb-4">
            Nos <span className="text-gold">locaux</span>
          </h2>
          <p className="text-warm-gray-600 text-lg max-w-2xl mx-auto">
            Un espace de formation moderne et convivial au cœur de Montrouge, 
            conçu pour votre réussite.
          </p>
        </motion.div>

        {/* Features bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: smoothEase }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-sm border border-border"
            >
              <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="font-bold text-forest text-sm">{feature.label}</p>
                <p className="text-warm-gray-500 text-xs">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: smoothEase }}
          className="relative"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {images.map((image, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative group cursor-pointer"
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet={image.webp}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <img
                          src={image.src}
                          alt={image.alt}
                          loading="lazy"
                          decoding="async"
                          width={400}
                          height={300}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </picture>
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Label */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="inline-block bg-cream text-forest font-semibold text-sm px-3 py-1.5 rounded-full">
                          {image.label}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 bg-forest text-cream hover:bg-forest-light hover:text-cream border-none shadow-lg" />
            <CarouselNext className="hidden md:flex -right-4 bg-forest text-cream hover:bg-forest-light hover:text-cream border-none shadow-lg" />
          </Carousel>

          {/* Mobile swipe hint */}
          <p className="text-center text-warm-gray-400 text-sm mt-4 md:hidden">
            ← Glissez pour voir plus →
          </p>
        </motion.div>

        {/* Address CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://maps.google.com/?q=3+rue+Corneille+92120+Montrouge"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-forest font-semibold hover:text-gold transition-colors group"
          >
            <MapPin className="w-5 h-5" />
            <span>3 rue Corneille, 92120 Montrouge</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default LocalsSection;
