import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Easing } from "framer-motion";
import { ArrowRight, Car, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import PrefetchLink from "@/components/ui/PrefetchLink";
import { useQuoteModal } from "@/components/quote/QuoteRequestModal";

const smoothEase: Easing = [0.22, 1, 0.36, 1];

// T3P sub-paths (Taxi, VTC, VMDTR) with duration and price info
const t3pPaths = [
  {
    id: "taxi",
    title: "Parcours TAXI",
    priceDay: "1 190€",
    priceEvening: "990€",
    link: "/formations/taxi",
  },
  {
    id: "vtc",
    title: "Parcours VTC",
    priceDay: "1 190€",
    priceEvening: "990€",
    link: "/formations/vtc",
  },
  {
    id: "vmdtr",
    title: "Parcours VMDTR",
    priceDay: "1 190€",
    priceEvening: "990€",
    link: "/formations/vmdtr",
  },
];

// Additional T3P info
const t3pExtras = [
  { label: "Formation Continue", duration: "14h", note: "Taxi, VTC, VMDTR" },
  { label: "Mobilité Taxi 75", duration: "35h" },
  { label: "Mobilité Taxi 92", duration: "14h" },
];

const offers = [
  {
    id: "t3p",
    icon: Car,
    title: "Formation T3P",
    subtitle: "Transport de Personnes à Titre Onéreux",
    description: "La formation T3P regroupe les 3 parcours professionnels : TAXI, VTC et VMDTR. Obtenez votre carte professionnelle avec 94% de taux de réussite.",
    features: ["3 parcours au choix", "94% de réussite", "Paiement 4x sans frais"],
    link: "/formations",
    formationValue: "t3p",
    popular: true,
    hasPaths: true,
  },
  {
    id: "recup-points",
    icon: Shield,
    title: "Récupération de Points",
    subtitle: "Stage agréé 2 jours",
    description: "Récupérez jusqu'à 4 points sur votre permis en seulement 2 jours. Attestation délivrée immédiatement.",
    features: ["Jusqu'à 4 points récupérés", "14h sur 2 jours", "Attestation immédiate"],
    link: "/formations/recuperation-points",
    formationValue: "recup-points",
    price: "250€",
    new: true,
  },
];

const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: smoothEase } }
};

const OffersSection = () => {
  const containerRef = useRef(null);
  const { openQuoteModal } = useQuoteModal();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <section ref={containerRef} className="section-padding gradient-warm overflow-hidden relative">
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute -top-32 left-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-1/3 -right-20 w-64 h-64 bg-forest/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">Nos Offres de Formation</h2>
          <p className="section-subtitle mx-auto">
            Choisissez la formation adaptée à votre projet professionnel
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {offers.map((offer) => {
            const IconComponent = offer.icon;
            const isT3P = offer.id === "t3p";
            
            return (
              <motion.div
                key={offer.id}
                variants={staggerItemVariants}
                whileHover={{ 
                  y: -12, 
                  boxShadow: isT3P 
                    ? "0 30px 60px rgba(212, 168, 83, 0.25)" 
                    : "0 30px 60px rgba(27, 77, 62, 0.18)",
                }}
                className={`relative bg-card rounded-2xl p-8 border transition-all duration-300 ${
                  isT3P 
                    ? 'border-gold/40 ring-2 ring-gold/20 bg-gradient-to-br from-cream to-gold/5' 
                    : 'border-border/50 hover:border-gold/30'
                }`}
              >
                {/* Badges */}
                {offer.popular && (
                  <div className="absolute -top-3 left-6 bg-forest text-cream px-4 py-1 rounded-full text-xs font-bold uppercase">
                    Populaire
                  </div>
                )}
                {offer.new && (
                  <div className="absolute -top-3 right-6 bg-destructive text-cream px-4 py-1 rounded-full text-xs font-bold uppercase">
                    Nouveau
                  </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  isT3P ? 'bg-gold/20' : 'bg-forest/10'
                }`}>
                  <IconComponent className={`w-8 h-8 ${isT3P ? 'text-gold' : 'text-forest'}`} />
                </div>

                {/* Content */}
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {offer.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold text-forest mt-1 mb-3">{offer.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{offer.description}</p>
                </div>

                {/* T3P Sub-paths */}
                {isT3P && (
                  <div className="mb-6 space-y-4">
                    {/* Main paths */}
                    <div className="p-4 bg-forest/5 rounded-xl">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                        Parcours T3P – Formation Initiale (63h jour / 33h soir)
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {t3pPaths.map((path) => (
                          <PrefetchLink 
                            key={path.id}
                            to={path.link}
                            className="relative flex flex-col items-center p-3 bg-white rounded-lg border border-border/50 hover:border-gold/50 hover:shadow-md transition-all group"
                          >
                            <span className="text-sm font-semibold text-forest group-hover:text-gold transition-colors text-center">
                              {path.title}
                            </span>
                            <div className="flex flex-col items-center mt-1">
                              <span className="text-xs font-bold text-gold">{path.priceDay} <span className="font-normal text-muted-foreground">jour</span></span>
                              <span className="text-xs font-bold text-forest/70">{path.priceEvening} <span className="font-normal text-muted-foreground">soir</span></span>
                            </div>
                          </PrefetchLink>
                        ))}
                      </div>
                    </div>
                    
                    {/* Additional T3P offerings */}
                    <div className="p-3 bg-gold/5 rounded-lg border border-gold/20">
                      <p className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                        Autres formations T3P
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {t3pExtras.map((extra, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-full border border-border/50">
                            <span className="font-medium text-forest">{extra.label}</span>
                            <span className="text-muted-foreground">({extra.duration})</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Features (for non-T3P cards) */}
                {!isT3P && (
                  <ul className="space-y-2 mb-8">
                    {offer.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-forest">
                        <span className="w-5 h-5 rounded-full bg-forest/10 flex items-center justify-center text-xs">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTAs */}
                <div className="space-y-3">
                  <Button 
                    onClick={() => openQuoteModal(offer.formationValue)}
                    className={`w-full ${isT3P ? 'btn-accent' : 'btn-primary'}`}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Demander un devis
                  </Button>
                  <PrefetchLink 
                    to={offer.link}
                    className="flex items-center justify-center gap-2 text-forest font-semibold hover:text-gold text-sm uppercase link-underline py-2"
                  >
                    {isT3P ? "Découvrir les parcours" : "En savoir plus"} <ArrowRight className="w-4 h-4" />
                  </PrefetchLink>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Secondary link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <PrefetchLink to="/formations" className="inline-flex items-center gap-2 text-forest font-semibold hover:text-gold text-sm uppercase link-underline">
            Voir toutes nos formations <ArrowRight className="w-4 h-4" />
          </PrefetchLink>
        </motion.div>
      </div>
    </section>
  );
};

export default OffersSection;
