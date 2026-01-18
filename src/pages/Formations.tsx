import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { 
  Clock, Users, Euro, ArrowRight, Monitor, Moon, MapPin, Info, CheckCircle2, 
  GraduationCap, Star, CreditCard, Car, Bike, Accessibility, 
  RefreshCw, BookOpen, UserPlus, Loader2, LucideIcon, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import PreRegistrationForm from "@/components/formations/PreRegistrationForm";
import SessionCard from "@/components/formations/SessionCard";
import { useFormations, Formation, getCategoryFilter, getCategoryLabel } from "@/hooks/useFormations";
import { useFormationSessions, FormationSession } from "@/hooks/useFormationSessions";
import { supabase } from "@/integrations/supabase/client";

const categories = ["Toutes", "TAXI", "VTC", "VMDTR", "Autres"];

// Icon mapping from string to component
const ICON_MAP: Record<string, LucideIcon> = {
  Car: Car,
  Bike: Bike,
  Accessibility: Accessibility,
  RefreshCw: RefreshCw,
  MapPin: MapPin,
  BookOpen: BookOpen,
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

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const Formations = () => {
  const [activeCategory, setActiveCategory] = useState("Toutes");
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);
  const [preRegistrationFormation, setPreRegistrationFormation] = useState<Formation | null>(null);
  const [formationSessions, setFormationSessions] = useState<FormationSession[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const { formations, isLoading, error } = useFormations(true);

  // Fetch sessions when a formation is selected
  useEffect(() => {
    if (selectedFormation) {
      setLoadingSessions(true);
      supabase
        .from("formation_sessions")
        .select("*")
        .eq("formation_id", selectedFormation.id)
        .in("status", ["upcoming", "ongoing"])
        .order("start_date", { ascending: true })
        .then(({ data }) => {
          setFormationSessions(data || []);
          setLoadingSessions(false);
        });
    } else {
      setFormationSessions([]);
    }
  }, [selectedFormation]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  // Filter formations by category
  const filteredFormations = formations.filter((f) => {
    if (activeCategory === "Toutes") return true;
    return getCategoryFilter(f.category) === activeCategory;
  });

  // Check if any formation is "popular" (first 2 of taxi/vtc)
  const isPopular = (formation: Formation) => {
    const popularCategories = ["taxi", "vtc"];
    if (!popularCategories.includes(formation.category)) return false;
    const sameCategory = formations.filter(f => f.category === formation.category);
    return sameCategory.indexOf(formation) < 1;
  };

  return (
    <Layout>
      <Helmet>
        <title>Formations Taxi VTC VMDTR à Montrouge | T3P Campus - 96% Réussite</title>
        <meta name="description" content="Découvrez nos formations Taxi, VTC et VMDTR certifiantes. Taux de réussite 96%, paiement en 4x sans frais, formateurs experts. Inscrivez-vous dès maintenant !" />
        <meta name="keywords" content="formation taxi, formation VTC, formation VMDTR, carte professionnelle taxi, carte VTC, centre formation Montrouge" />
        <link rel="canonical" href="https://t3pcampus.fr/formations" />
        
        <meta property="og:title" content="Formations Taxi VTC VMDTR - T3P Campus Montrouge" />
        <meta property="og:description" content="Formations certifiantes Taxi, VTC et VMDTR. 96% de réussite, paiement en 4x, formateurs experts du métier." />
        <meta property="og:url" content="https://t3pcampus.fr/formations" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Formations Taxi VTC VMDTR - T3P Campus" />
        <meta name="twitter:description" content="Formations certifiantes avec 96% de réussite. Inscrivez-vous maintenant !" />
      </Helmet>

      {/* Hero - Immersive with parallax */}
      <section ref={heroRef} className="gradient-hero py-24 md:py-32 relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-20 left-10 w-40 h-40 rounded-full opacity-10"
          style={{ backgroundColor: "#D4A853", y: heroY }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-10 right-20 w-60 h-60 rounded-full opacity-10"
          style={{ backgroundColor: "#F5EBD7", y: heroY }}
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="container-custom text-center relative z-10"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-gold/20 text-cream">
              <GraduationCap className="w-4 h-4" />
              {formations.length} formations certifiantes
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-cream uppercase tracking-tight mb-6"
          >
            Nos Formations{" "}
            <span className="text-gold">TAXI • VTC • VMDTR</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-cream/80 max-w-2xl mx-auto mb-8"
          >
            Découvrez nos formations professionnelles pour devenir chauffeur 
            ou maintenir vos compétences à jour.
          </motion.p>

          {/* Stats in hero */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 md:gap-10"
          >
            {[
              { value: "96%", label: "Taux de réussite" },
              { value: "10+", label: "Ans d'expérience" },
              { value: "4x", label: "Sans frais" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <p className="text-3xl md:text-4xl font-black text-gold">{stat.value}</p>
                <p className="text-sm text-cream/70">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Filters & Grid */}
      <section className="section-padding bg-background relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-forest/5 to-transparent" />
        
        <div className="container-custom">
          {/* Filters */}
          <motion.div 
            className="mb-12 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-forest text-cream shadow-lg"
                      : "bg-card text-forest border-2 border-border hover:border-forest"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Results count */}
            <p className="text-center text-muted-foreground text-sm">
              {filteredFormations.length} formation{filteredFormations.length > 1 ? "s" : ""} trouvée{filteredFormations.length > 1 ? "s" : ""}
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-forest animate-spin mb-4" />
              <p className="text-muted-foreground">Chargement des formations...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <p className="text-destructive mb-4">{error}</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Réessayer
              </Button>
            </div>
          )}

          {/* Grid */}
          {!isLoading && !error && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {filteredFormations.map((formation) => {
                const IconComponent = getIconComponent(formation.icon);
                const popular = isPopular(formation);
                
                return (
                  <motion.div
                    key={formation.id}
                    variants={staggerItemVariants}
                    whileHover={{ 
                      y: -8, 
                      boxShadow: "0 20px 40px rgba(27, 77, 62, 0.15)",
                      borderColor: "rgba(212, 168, 83, 0.5)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="group card-livementor relative"
                  >
                    {/* Popular badge */}
                    {popular && (
                      <motion.div 
                        className="absolute -top-3 -right-3 z-10"
                        initial={{ rotate: -12, scale: 0 }}
                        animate={{ rotate: -12, scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                      >
                        <span className="flex items-center gap-1 bg-gold text-forest text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                          <Star className="w-3 h-3 fill-current" />
                          Populaire
                        </span>
                      </motion.div>
                    )}

                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-4">
                        <motion.div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center bg-forest/10"
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <IconComponent className="w-6 h-6 text-forest" />
                        </motion.div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="bg-forest/10 text-forest text-xs font-bold uppercase px-3 py-1 rounded-full">
                            {getCategoryLabel(formation.category)}
                          </span>
                        </div>
                      </div>
                      
                      <motion.h3 
                        className="font-bold text-xl text-forest mb-2 group-hover:text-gold transition-colors duration-300"
                        whileHover={{ x: 5 }}
                      >
                        {formation.title}
                      </motion.h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {formation.description || "Formation professionnelle certifiante."}
                      </p>
                    </div>

                    {/* Meta */}
                    <div className="grid grid-cols-2 gap-3 text-xs mb-5">
                      <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
                        <Clock className="w-4 h-4 text-forest mb-1" />
                        <span className="font-semibold text-forest">{formation.duration}</span>
                      </div>
                      <div className="flex flex-col items-center p-2 rounded-lg bg-gold/10">
                        <Euro className="w-4 h-4 text-gold mb-1" />
                        <span className="font-semibold text-forest text-center">
                          {formation.price ? `${formation.price.toFixed(0)} €` : "Nous consulter"}
                        </span>
                      </div>
                    </div>

                    {/* Features preview */}
                    {formation.features && formation.features.length > 0 && (
                      <div className="mb-4 space-y-1">
                        {formation.features.slice(0, 2).map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="w-3 h-3 text-forest shrink-0" />
                            <span className="line-clamp-1">{feature}</span>
                          </div>
                        ))}
                        {formation.features.length > 2 && (
                          <p className="text-xs text-muted-foreground pl-5">
                            +{formation.features.length - 2} autres
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex flex-col gap-2 pt-4 border-t border-border">
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1 border-forest text-forest hover:bg-forest hover:text-cream transition-all duration-300"
                          onClick={() => setSelectedFormation(formation)}
                        >
                          <Info className="w-4 h-4 mr-2" />
                          Détails
                        </Button>
                        <Button 
                          className="flex-1 btn-primary"
                          onClick={() => setPreRegistrationFormation(formation)}
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          S'inscrire
                        </Button>
                      </div>
                      {getFormationDetailRoute(formation.category) && (
                        <Button 
                          variant="ghost" 
                          className="w-full text-forest hover:text-gold hover:bg-gold/10"
                          asChild
                        >
                          <Link to={getFormationDetailRoute(formation.category)!}>
                            En savoir plus sur la formation {getCategoryLabel(formation.category)}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {!isLoading && !error && filteredFormations.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-muted-foreground text-lg">Aucune formation ne correspond à vos critères.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setActiveCategory("Toutes")}
              >
                Réinitialiser les filtres
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-forest relative overflow-hidden">
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ backgroundColor: "#D4A853" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <div className="container-custom relative z-10">
          <motion.div 
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-black text-cream uppercase mb-4">
              Besoin d'aide pour choisir votre formation ?
            </h2>
            <p className="text-cream/80 mb-8">
              Nos conseillers sont disponibles pour vous orienter vers la formation 
              la plus adaptée à votre projet professionnel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="tel:0188750555"
                className="btn-secondary bg-transparent border-cream text-cream hover:bg-cream hover:text-forest"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>📞 01 88 75 05 55</span>
              </motion.a>
              <Button asChild>
                <Link to="/contact" className="btn-primary bg-gold text-forest hover:bg-gold/90">
                  <span>Prendre rendez-vous</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Details Modal */}
      <Dialog open={!!selectedFormation} onOpenChange={() => setSelectedFormation(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
          {selectedFormation && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-3">
                  {(() => {
                    const IconComp = getIconComponent(selectedFormation.icon);
                    return (
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-forest/10">
                        <IconComp className="w-7 h-7 text-forest" />
                      </div>
                    );
                  })()}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-forest/10 text-forest text-xs font-bold uppercase px-3 py-1 rounded-full">
                        {getCategoryLabel(selectedFormation.category)}
                      </span>
                    </div>
                    <DialogTitle className="text-xl md:text-2xl font-black text-forest">
                      {selectedFormation.title}
                    </DialogTitle>
                  </div>
                </div>
                <DialogDescription className="text-muted-foreground">
                  {selectedFormation.description || "Formation professionnelle certifiante."}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Info grid */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-xl">
                  <div className="text-center">
                    <Clock className="w-6 h-6 text-forest mx-auto mb-2" />
                    <p className="text-sm font-bold text-forest">{selectedFormation.duration}</p>
                    <p className="text-xs text-muted-foreground">Durée</p>
                  </div>
                  <div className="text-center">
                    <Euro className="w-6 h-6 text-gold mx-auto mb-2" />
                    <p className="text-sm font-bold text-forest">
                      {selectedFormation.price ? `${selectedFormation.price.toFixed(0)} €` : "Nous consulter"}
                    </p>
                    <p className="text-xs text-muted-foreground">Tarif</p>
                  </div>
                </div>

                {/* Features */}
                {selectedFormation.features && selectedFormation.features.length > 0 && (
                  <div>
                    <h4 className="font-bold text-forest mb-4 uppercase text-sm flex items-center gap-2">
                      <span className="w-1 h-4 bg-gold rounded-full" />
                      Contenu de la formation
                    </h4>
                    <ul className="space-y-3">
                      {selectedFormation.features.map((feature, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Sessions à venir */}
                <div>
                  <h4 className="font-bold text-forest mb-4 uppercase text-sm flex items-center gap-2">
                    <span className="w-1 h-4 bg-gold rounded-full" />
                    <Calendar className="w-4 h-4" />
                    Prochaines sessions
                  </h4>
                  {loadingSessions ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="w-5 h-5 animate-spin text-forest" />
                    </div>
                  ) : formationSessions.length > 0 ? (
                    <div className="space-y-3">
                      {formationSessions.slice(0, 3).map((session) => (
                        <SessionCard
                          key={session.id}
                          session={session}
                          compact
                          onRegister={() => {
                            setSelectedFormation(null);
                            setPreRegistrationFormation(selectedFormation);
                          }}
                        />
                      ))}
                      {formationSessions.length > 3 && (
                        <p className="text-xs text-muted-foreground text-center">
                          +{formationSessions.length - 3} autres sessions disponibles
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg text-center">
                      Aucune session programmée. Contactez-nous pour connaître les prochaines dates.
                    </p>
                  )}
                </div>

                {/* Payment info */}
                <div className="p-4 bg-forest/5 rounded-xl border border-forest/10">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-gold" />
                    <div>
                      <p className="font-bold text-forest">Paiement en 4x sans frais</p>
                      <p className="text-sm text-muted-foreground">Facilités de paiement disponibles</p>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    className="flex-1 btn-primary"
                    onClick={() => {
                      setSelectedFormation(null);
                      setPreRegistrationFormation(selectedFormation);
                    }}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    <span>Pré-inscription</span>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 border-forest text-forest hover:bg-forest hover:text-cream">
                    <a href="tel:0188750555">
                      📞 Appeler
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Pre-registration Form Modal */}
      <PreRegistrationForm
        isOpen={!!preRegistrationFormation}
        onClose={() => setPreRegistrationFormation(null)}
        formationTitle={preRegistrationFormation?.title || ""}
        formationDuration={preRegistrationFormation?.duration || ""}
      />
    </Layout>
  );
};

export default Formations;
