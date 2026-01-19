import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Easing } from "framer-motion";
import { ArrowRight, Clock, Users, CreditCard, Car, Bike, GraduationCap, Loader2, LucideIcon } from "lucide-react";
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
              
              return (
                <motion.div
                  key={formation.id}
                  variants={staggerItemVariants}
                  whileHover={{ 
                    y: -12, 
                    boxShadow: "0 30px 60px rgba(27, 77, 62, 0.18)",
                    borderColor: "rgba(212, 168, 83, 0.6)"
                  }}
                  whileTap={{ scale: 0.98, y: -6 }}
                  className="card-livementor relative group cursor-pointer"
                >
                  {popular && (
                    <div className="absolute -top-3 left-6 bg-gold text-forest px-4 py-1 rounded-full text-xs font-bold uppercase">
                      Populaire
                    </div>
                  )}

                  <motion.div 
                    className="w-14 h-14 rounded-2xl bg-forest/10 flex items-center justify-center mb-5"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(27, 77, 62, 0.2)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <IconComponent className="w-7 h-7 text-forest" />
                  </motion.div>

                  <motion.h3 
                    className="text-xl font-bold text-forest mb-3 group-hover:text-gold transition-colors duration-300"
                  >
                    {formation.title}
                  </motion.h3>
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
