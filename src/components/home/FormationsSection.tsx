import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Easing } from "framer-motion";
import { ArrowRight, Clock, Users, CreditCard, Car, Bike, GraduationCap, Loader2, LucideIcon, Laptop, Sparkles } from "lucide-react";
import { useFormations, getCategoryLabel } from "@/hooks/useFormations";
import PrefetchLink from "@/components/ui/PrefetchLink";

const smoothEase: Easing = [0.22, 1, 0.36, 1];

// Icon mapping from string to component
const ICON_MAP: Record<string, LucideIcon> = {
  Car: Car,
  Bike: Bike,
  Accessibility: GraduationCap,
  RefreshCw: GraduationCap,
  MapPin: GraduationCap,
  BookOpen: GraduationCap,
};

const getIconComponent = (iconName: string | null): LucideIcon => {
  return iconName && ICON_MAP[iconName] ? ICON_MAP[iconName] : Car;
};

// Check if feature is digital (e-learning, quiz, etc.)
const isDigitalFeature = (feature: string): boolean => {
  const lowerFeature = feature.toLowerCase();
  return lowerFeature.includes('e-learning') || 
         lowerFeature.includes('quiz') || 
         lowerFeature.includes('application quiz') ||
         lowerFeature.includes('illimité') ||
         lowerFeature.includes('entraînement illimité');
};

// Check if formation has any digital features
const hasDigitalFeatures = (features: string[] | null): boolean => {
  if (!features) return false;
  return features.some(feature => isDigitalFeature(feature));
};

// Get detail page route for formation category
const getFormationDetailRoute = (category: string): string | null => {
  const routes: Record<string, string> = {
    taxi: "/formations/taxi",
    vtc: "/formations/vtc",
    vmdtr: "/formations/vmdtr",
    mobilite: "/formations/mobilite",
  };
  return routes[category] || null;
};

const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } }
};

const FormationsSection = () => {
  const containerRef = useRef(null);
  const { formations, isLoading } = useFormations(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  // Show first 4 formations for homepage
  const displayedFormations = formations.slice(0, 4);

  // Determine if formation is popular (first taxi and first vtc)
  const isPopular = (category: string, index: number) => {
    if (category !== "taxi" && category !== "vtc") return false;
    const sameCategory = displayedFormations.filter(f => f.category === category);
    return sameCategory.indexOf(displayedFormations[index]) === 0;
  };

  // Check if formation is VMDTR (highlighted)
  const isVMDTR = (category: string) => category === "vmdtr";

  return (
    <section ref={containerRef} className="section-padding gradient-warm overflow-hidden relative">
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: y1, scale }}
        className="absolute -top-32 left-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-1/3 -right-20 w-64 h-64 bg-forest/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ y: y3 }}
        className="absolute -bottom-20 left-10 w-48 h-48 bg-gold/15 rounded-full blur-2xl pointer-events-none"
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">NOS FORMATIONS</h2>
          <p className="section-subtitle mx-auto">
            {isLoading ? "Chargement..." : `${formations.length} formations pour démarrer votre carrière`}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-forest animate-spin" />
          </div>
        ) : (
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            {displayedFormations.map((formation, i) => {
              const IconComponent = getIconComponent(formation.icon);
              const popular = isPopular(formation.category, i);
              const vmdtr = isVMDTR(formation.category);
              const hasDigital = hasDigitalFeatures(formation.features);
              
              return (
                <motion.div
                  key={formation.id}
                  variants={staggerItemVariants}
                  whileHover={{ 
                    y: -12, 
                    boxShadow: vmdtr 
                      ? "0 30px 60px rgba(212, 168, 83, 0.25)" 
                      : "0 30px 60px rgba(27, 77, 62, 0.18)",
                    borderColor: "rgba(212, 168, 83, 0.6)"
                  }}
                  whileTap={{ scale: 0.98, y: -6 }}
                  className={`card-livementor relative group cursor-pointer ${vmdtr ? 'ring-2 ring-gold/40 bg-gradient-to-br from-cream to-gold/5' : ''}`}
                >
                  {/* VMDTR Highlight Badge */}
                  {vmdtr && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-gold to-orange text-forest px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1 shadow-lg">
                      <Sparkles className="w-3 h-3" />
                      Nouveauté
                    </div>
                  )}
                  
                  {popular && !vmdtr && (
                    <div className="absolute -top-3 left-6 bg-gold text-forest px-4 py-1 rounded-full text-xs font-bold uppercase">
                      Populaire
                    </div>
                  )}

                  <motion.div 
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${vmdtr ? 'bg-gold/20' : 'bg-forest/10'}`}
                    whileHover={{ scale: 1.1, backgroundColor: vmdtr ? "rgba(212, 168, 83, 0.3)" : "rgba(27, 77, 62, 0.2)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <IconComponent className={`w-7 h-7 ${vmdtr ? 'text-gold' : 'text-forest'}`} />
                  </motion.div>

                  <div className="flex items-start justify-between gap-2 mb-3">
                    <motion.h3 
                      className="text-xl font-bold text-forest group-hover:text-gold transition-colors duration-300"
                    >
                      {formation.title}
                    </motion.h3>
                    {hasDigital && (
                      <span className="flex items-center gap-1 bg-gradient-to-r from-gold/20 to-orange/20 text-gold text-xs font-bold px-2 py-1 rounded-full border border-gold/30 whitespace-nowrap">
                        <Laptop className="w-3 h-3" />
                        Digital inclus
                      </span>
                    )}
                  </div>
                  <p className="text-warm-gray-600 mb-6 line-clamp-2">
                    {formation.description || "Formation professionnelle certifiante."}
                  </p>

                  <div className="space-y-2 mb-6">
                    {[
                      { Icon: Clock, text: formation.duration },
                      { Icon: Users, text: getCategoryLabel(formation.category) },
                      { Icon: CreditCard, text: "Paiement 4x sans frais" }
                    ].map(({ Icon, text }, idx) => (
                      <motion.div 
                        key={idx}
                        className="flex items-center gap-2 text-sm text-warm-gray-600"
                        whileHover={{ x: 5, color: "#1B4D3E" }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Icon className="w-4 h-4 text-forest" />{text}
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-border">
                    <div>
                      <span className="text-xs text-warm-gray-500 uppercase">Tarif</span>
                      <p className="font-bold text-forest">
                        {formation.price ? `${formation.price.toFixed(0)} €` : "Nous consulter"}
                      </p>
                    </div>
                    <motion.div 
                      whileHover={{ x: 8, scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <PrefetchLink 
                        to={getFormationDetailRoute(formation.category) || "/formations"} 
                        className="flex items-center gap-2 text-forest font-semibold hover:text-gold text-sm uppercase link-underline"
                      >
                        En savoir plus<ArrowRight className="w-4 h-4" />
                      </PrefetchLink>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <motion.div 
            whileHover={{ x: 10, scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <PrefetchLink to="/formations" className="inline-flex items-center gap-2 text-forest font-semibold hover:text-gold text-sm uppercase link-underline">
              Voir toutes nos formations<ArrowRight className="w-4 h-4" />
            </PrefetchLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FormationsSection;
