import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { 
  Clock, Users, Euro, ArrowRight, Monitor, Moon, MapPin, Info, CheckCircle2, 
  GraduationCap, Star, CreditCard, Car, Bike, Accessibility, 
  RefreshCw, BookOpen, UserPlus, Loader2, LucideIcon, Calendar,
  Laptop, Brain, RotateCcw, Phone, Shield, Award, FileText
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
import { useIsMobile } from "@/hooks/use-mobile";
import salleFormation from "@/assets/center/salle-formation-equipee.jpg";

// Icon mapping from string to component
const ICON_MAP: Record<string, LucideIcon> = {
  Car, Bike, Accessibility, RefreshCw, MapPin, BookOpen,
};

const getIconComponent = (iconName: string | null): LucideIcon => {
  return iconName && ICON_MAP[iconName] ? ICON_MAP[iconName] : Car;
};

const getFormationDetailRoute = (category: string): string | null => {
  const routes: Record<string, string> = {
    taxi: "/formations/taxi",
    vtc: "/formations/vtc",
    vmdtr: "/formations/vmdtr",
    mobilite: "/formations/mobilite",
  };
  return routes[category] || null;
};

const getFeatureIcon = (feature: string): LucideIcon => {
  const lf = feature.toLowerCase();
  if (lf.includes('e-learning') || lf.includes('elearning')) return Laptop;
  if (lf.includes('quiz') || lf.includes('application')) return Brain;
  if (lf.includes('illimité') || lf.includes('entraînement')) return RotateCcw;
  return CheckCircle2;
};

const isDigitalFeature = (feature: string): boolean => {
  const lf = feature.toLowerCase();
  return lf.includes('e-learning') || lf.includes('quiz') || lf.includes('application quiz') || lf.includes('illimité') || lf.includes('entraînement illimité');
};

const hasDigitalFeatures = (features: string[] | null): boolean => features?.some(isDigitalFeature) || false;

// Category color config
const categoryColors: Record<string, { bg: string; text: string; border: string; emoji: string }> = {
  taxi: { bg: "bg-amber-400", text: "text-amber-900", border: "border-amber-400", emoji: "🚕" },
  vtc: { bg: "bg-[#1B3A5C]", text: "text-white", border: "border-[#1B3A5C]", emoji: "🚘" },
  vmdtr: { bg: "bg-emerald-600", text: "text-white", border: "border-emerald-600", emoji: "🏍️" },
  continue: { bg: "bg-forest", text: "text-white", border: "border-forest", emoji: "🔄" },
  mobilite: { bg: "bg-blue-500", text: "text-white", border: "border-blue-500", emoji: "📍" },
  tpmr: { bg: "bg-purple-500", text: "text-white", border: "border-purple-500", emoji: "♿" },
  general: { bg: "bg-forest", text: "text-white", border: "border-forest", emoji: "🛡️" },
};

const getCategoryColor = (cat: string) => categoryColors[cat] || categoryColors.general;

// Section anchors
const sections = [
  { id: "devenir-chauffeur", label: "Devenir chauffeur" },
  { id: "formation-continue", label: "Formation continue" },
  { id: "specialisations", label: "Spécialisations" },
  { id: "recuperation-points", label: "Récupération de points" },
];

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const Formations = () => {
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);
  const [preRegistrationFormation, setPreRegistrationFormation] = useState<Formation | null>(null);
  const [formationSessions, setFormationSessions] = useState<FormationSession[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState("devenir-chauffeur");
  const isMobile = useIsMobile();
  const [isFooterVisible, setIsFooterVisible] = useState(false);

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

  // Footer observer for mobile sticky bar
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Intersection observer for active anchor
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveAnchor(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    );
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [formations]);

  // Categorize formations
  const initiales = formations.filter(f => ["taxi", "vtc", "vmdtr"].includes(f.category) && !f.title.toLowerCase().includes("continue"));
  const continues = formations.filter(f => f.title.toLowerCase().includes("continue") || f.category === "continue");
  const specialisations = formations.filter(f => ["mobilite", "tpmr"].includes(f.category));
  const recuperation = formations.filter(f => f.category === "general" || f.title.toLowerCase().includes("récup") || f.title.toLowerCase().includes("points"));

  // Determine if a formation is "soirée"
  const isSoiree = (f: Formation) => f.title.toLowerCase().includes("soirée") || f.title.toLowerCase().includes("soiree");

  // SEO schemas
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Formations ECOLE T3P - Taxi, VTC, VMDTR",
    "description": "Catalogue des formations professionnelles pour chauffeurs à Montrouge",
    "url": "https://www.ecolet3p.fr/formations",
    "numberOfItems": formations.length,
    "itemListElement": formations.map((formation, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": formation.title,
      "url": getFormationDetailRoute(formation.category) 
        ? `https://www.ecolet3p.fr${getFormationDetailRoute(formation.category)}`
        : "https://www.ecolet3p.fr/formations"
    }))
  };

  const courseSchemas = formations.map((formation) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    "name": formation.title,
    "description": formation.description || `Formation ${formation.title} professionnelle`,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "ECOLE T3P",
      "sameAs": "https://www.ecolet3p.fr",
    },
    "offers": formation.price ? {
      "@type": "Offer",
      "price": formation.price,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
    } : undefined,
    "timeRequired": `PT${formation.duration.replace(/[^0-9]/g, '')}H`,
    "url": getFormationDetailRoute(formation.category) 
      ? `https://www.ecolet3p.fr${getFormationDetailRoute(formation.category)}`
      : "https://www.ecolet3p.fr/formations",
    "inLanguage": "fr-FR",
  }));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.ecolet3p.fr/" },
      { "@type": "ListItem", "position": 2, "name": "Formations", "item": "https://www.ecolet3p.fr/formations" }
    ]
  };

  // Render a formation card
  const renderCard = (formation: Formation, variant: "initial" | "continue" | "special" = "initial") => {
    const IconComponent = getIconComponent(formation.icon);
    const colors = getCategoryColor(formation.category);
    const isVmdtrInitial = formation.category === "vmdtr" && !formation.title.toLowerCase().includes("continue");
    const isMobilite = formation.category === "mobilite";
    const isTpmr = formation.category === "tpmr";
    const soiree = isSoiree(formation);
    const popular = !soiree && ["taxi", "vtc"].includes(formation.category) && variant === "initial";
    const isCompact = variant === "continue";

    return (
      <motion.div
        key={formation.id}
        variants={staggerItem}
        className={`group relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-transparent transition-all duration-300 hover:shadow-[0_20px_50px_rgba(27,77,62,0.12)] ${isCompact ? '' : ''}`}
      >
        {/* Colored top banner */}
        <div className={`h-10 ${colors.bg} flex items-center justify-between px-4`}>
          <span className={`text-sm font-bold ${colors.text} flex items-center gap-2`}>
            <span>{colors.emoji}</span>
            {getCategoryLabel(formation.category)}
          </span>
          {soiree && (
            <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full flex items-center gap-1" style={{ color: 'white' }}>
              <Moon className="w-3 h-3" /> Soirée
            </span>
          )}
          {popular && (
            <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full flex items-center gap-1" style={{ color: 'white' }}>
              <Star className="w-3 h-3 fill-current" /> Populaire
            </span>
          )}
        </div>

        <div className={`${isCompact ? 'p-5' : 'p-6'}`}>
          {/* Title */}
          <h3 className="font-bold text-lg text-forest mb-1 group-hover:text-gold transition-colors duration-300 leading-tight">
            {formation.title}
          </h3>

          {/* Duration + VMDTR subtitle */}
          <p className="text-sm text-muted-foreground mb-3">
            {formation.duration}
            {isVmdtrInitial && <span className="block text-xs italic mt-0.5">Inclut le tronc commun VTC + module spécifique VMDTR</span>}
          </p>

          {/* Mobilité badge */}
          {isMobilite && (
            <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-200 mb-3">
              <MapPin className="w-3 h-3" /> Géographique
            </span>
          )}

          {/* Price */}
          <div className="mb-4">
            <span className="text-2xl font-black" style={{ color: '#FF6B2B' }}>
              {formation.price ? `${formation.price.toFixed(0)}€` : "Nous consulter"}
            </span>
            {formation.price && formation.price > 500 && (
              <span className="text-xs text-muted-foreground ml-2">
                soit 4× {Math.ceil(formation.price / 4)}€
              </span>
            )}
          </div>

          {/* Tags */}
          {variant === "initial" && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {["✓ Examen CMA inclus", "✓ Support digital", "✓ Finançable OPCO"].map(tag => (
                <span key={tag} className="text-[10px] font-medium bg-forest/5 text-forest px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
          )}

          {variant === "continue" && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="text-[10px] font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-100">Obligatoire</span>
              <span className="text-[10px] font-medium bg-forest/5 text-forest px-2 py-0.5 rounded-full">✓ Attestation officielle</span>
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col gap-2 pt-3 border-t border-border/50">
            {variant === "continue" ? (
              <Button
                className="w-full font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #FF6B2B, #FF8F5E)', color: 'white' }}
                onClick={() => setPreRegistrationFormation(formation)}
              >
                S'inscrire <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : isTpmr ? (
              <Button variant="outline" className="w-full border-forest/30 text-forest hover:bg-forest hover:text-white" asChild>
                <Link to="/contact?subject=Je+souhaite+des+informations+sur+la+formation+TPMR">
                  En savoir plus <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="w-full text-sm font-semibold"
                  style={{ borderColor: '#FF6B2B', color: '#FF6B2B' }}
                  onClick={() => setSelectedFormation(formation)}
                >
                  Voir le programme <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                {getFormationDetailRoute(formation.category) && (
                  <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-forest" asChild>
                    <Link to={getFormationDetailRoute(formation.category)!}>
                      Page détaillée
                    </Link>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <Layout>
      <Helmet>
        <title>Nos Formations Taxi VTC VMDTR | ECOLE T3P</title>
        <meta name="description" content="Découvrez nos formations : initiale Taxi (63h), initiale VTC (63h), VMDTR moto-taxi (14h), mobilité, formation continue et récupération de points à Montrouge." />
        <link rel="canonical" href="https://www.ecolet3p.fr/formations" />
        <meta property="og:title" content="Formation Taxi VTC VMDTR Montrouge Bagneux | 92 Sud Paris" />
        <meta property="og:description" content="Formations professionnelles Taxi VTC VMDTR à Montrouge. 94% de réussite." />
        <meta property="og:url" content="https://www.ecolet3p.fr/formations" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.ecolet3p.fr/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {courseSchemas.map((schema, index) => (
          <script key={index} type="application/ld+json">{JSON.stringify(schema)}</script>
        ))}
      </Helmet>

      {/* ============ SECTION 1: HERO ============ */}
      <section className="relative min-h-[520px] md:min-h-[560px] flex items-center overflow-hidden">
        {/* Background image + overlay */}
        <div className="absolute inset-0">
          <img 
            src={salleFormation} 
            alt="Centre de formation ECOLE T3P" 
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(13,33,55,0.92) 0%, rgba(27,58,92,0.85) 100%)' }} />
          {/* Geometric pattern overlay */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="container-custom relative z-10 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            {/* Left 60% */}
            <div className="lg:col-span-3">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-sm font-semibold text-white/70 mb-3 tracking-wide uppercase"
              >
                Centre de formation agréé Préfecture • Montrouge (92)
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4"
                style={{ lineHeight: 1.1 }}
              >
                Formations{" "}
                <span className="text-gold">TAXI · VTC · VMDTR</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base md:text-lg text-white/80 mb-8 max-w-xl"
              >
                Rejoignez les 2000+ chauffeurs formés depuis 2014. Programme complet, paiement en 4× sans frais.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Button asChild size="lg" className="font-bold text-base px-8" style={{ background: 'linear-gradient(135deg, #FF6B2B, #FF8F5E)', color: 'white', border: 'none' }}>
                  <Link to="/contact">
                    Demander un devis gratuit <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-bold text-base border-white/30 text-white hover:bg-white/10">
                  <a href="tel:0188750555">
                    <Phone className="w-4 h-4 mr-2" /> 01 88 75 05 55
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Right 40% — 2×2 Badge Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 grid grid-cols-2 gap-3"
            >
              {[
                { icon: <Award className="w-5 h-5 text-gold" />, value: "94%", label: "Taux de réussite" },
                { icon: <Star className="w-5 h-5 text-gold fill-gold" />, value: "5.0/5", label: "359 avis Google" },
                { icon: <Shield className="w-5 h-5 text-gold" />, value: "Qualiopi", label: "Certifié qualité" },
                { icon: <CreditCard className="w-5 h-5 text-gold" />, value: "4×", label: "Paiement sans frais" },
              ].map((badge, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                  <div className="flex justify-center mb-2">{badge.icon}</div>
                  <p className="text-xl font-black text-white">{badge.value}</p>
                  <p className="text-xs text-white/60">{badge.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 2: STICKY NAV ============ */}
      <nav className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="container-custom">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-0 -mx-2 px-2">
            {sections.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`whitespace-nowrap px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                  activeAnchor === s.id
                    ? 'border-[#FF6B2B] text-forest'
                    : 'border-transparent text-muted-foreground hover:text-forest hover:border-[#FF6B2B]/40'
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Loading */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-forest animate-spin mb-4" />
          <p className="text-muted-foreground">Chargement des formations...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-24">
          <p className="text-destructive mb-4">{error}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>Réessayer</Button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          {/* ============ SECTION 3: DEVENIR CHAUFFEUR ============ */}
          <section id="devenir-chauffeur" className="py-16 md:py-20 bg-white scroll-mt-14">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <h2 className="text-2xl md:text-3xl font-black text-forest mb-2">
                  🚀 Devenir chauffeur professionnel
                </h2>
                <p className="text-muted-foreground text-base max-w-2xl">
                  Nos formations initiales pour obtenir votre carte professionnelle T3P
                </p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {initiales.map(f => renderCard(f, "initial"))}
              </motion.div>
            </div>
          </section>

          {/* ============ SECTION 4: TESTIMONIAL BANDEAU ============ */}
          <section className="py-12 md:py-14" style={{ backgroundColor: '#F0F1F3' }}>
            <div className="container-custom">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 max-w-4xl mx-auto">
                {/* Avatar */}
                <div className="shrink-0 w-20 h-20 rounded-full bg-forest flex items-center justify-center text-2xl font-black text-white">
                  MK
                </div>
                <div>
                  <div className="flex gap-0.5 mb-2">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                    ))}
                  </div>
                  <blockquote className="text-base md:text-lg text-forest italic leading-relaxed mb-3">
                    "Grâce à ECOLE T3P, j'ai obtenu ma carte VTC du premier coup. La formation en soirée m'a permis de continuer à travailler. Aujourd'hui je suis chauffeur indépendant depuis 2 ans."
                  </blockquote>
                  <p className="text-sm text-muted-foreground font-semibold">
                    — Mohamed K., Chauffeur VTC depuis 2023
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ============ SECTION 5: FORMATION CONTINUE ============ */}
          <section id="formation-continue" className="py-16 md:py-20 bg-white scroll-mt-14">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <h2 className="text-2xl md:text-3xl font-black text-forest mb-2">
                  🔄 Formation continue obligatoire
                </h2>
                <p className="text-muted-foreground text-base max-w-2xl">
                  Renouvelez votre carte professionnelle — 14h tous les 5 ans
                </p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl"
              >
                {continues.map(f => renderCard(f, "continue"))}
              </motion.div>
            </div>
          </section>

          {/* ============ SECTION 6: SPÉCIALISATIONS ============ */}
          <section id="specialisations" className="py-16 md:py-20 scroll-mt-14" style={{ backgroundColor: '#F8F9FA' }}>
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <h2 className="text-2xl md:text-3xl font-black text-forest mb-2">
                  📍 Développez votre activité
                </h2>
                <p className="text-muted-foreground text-base max-w-2xl">
                  Mobilité géographique, TPMR et diversification
                </p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl"
              >
                {specialisations.map(f => renderCard(f, "special"))}
              </motion.div>

              <p className="text-xs text-muted-foreground mt-6 max-w-2xl">
                La mobilité permet aux taxis de changer de département d'exercice. 14h pour la plupart des départements, 35h pour Paris.
              </p>
            </div>
          </section>

          {/* ============ SECTION 7: RÉCUPÉRATION DE POINTS ============ */}
          <section id="recuperation-points" className="py-16 md:py-20 bg-white scroll-mt-14">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <h2 className="text-2xl md:text-3xl font-black text-forest mb-2">
                  🛡️ Stage de récupération de points
                </h2>
              </motion.div>

              {recuperation.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 max-w-4xl"
                >
                  <div className="shrink-0 w-16 h-16 rounded-2xl bg-forest/10 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-forest" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-forest mb-1">Récupérez jusqu'à 4 points en 2 jours</h3>
                    <p className="text-sm text-muted-foreground mb-2">Attestation immédiate. Stage agréé par la Préfecture.</p>
                    <span className="text-2xl font-black" style={{ color: '#FF6B2B' }}>
                      {recuperation[0]?.price ? `${recuperation[0].price.toFixed(0)}€` : "250€"}
                    </span>
                  </div>
                  <Button
                    size="lg"
                    className="font-bold shrink-0"
                    style={{ background: 'linear-gradient(135deg, #FF6B2B, #FF8F5E)', color: 'white' }}
                    onClick={() => setPreRegistrationFormation(recuperation[0])}
                  >
                    Réserver mon stage <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              ) : (
                <p className="text-muted-foreground">Aucun stage disponible pour le moment.</p>
              )}
            </div>
          </section>

          {/* ============ SECTION 8: CTA FINAL ============ */}
          <section className="py-16 md:py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1B3A5C 0%, #0D2137 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            <div className="container-custom relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center max-w-2xl mx-auto"
              >
                <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
                  Pas sûr de quelle formation choisir ?
                </h2>
                <p className="text-white/70 mb-8 text-base">
                  Nos conseillers vous orientent gratuitement en 5 minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                  <Button asChild size="lg" variant="outline" className="font-bold border-white/30 text-white hover:bg-white/10">
                    <a href="tel:0188750555">
                      <Phone className="w-4 h-4 mr-2" /> 01 88 75 05 55
                    </a>
                  </Button>
                  <Button asChild size="lg" className="font-bold" style={{ background: 'linear-gradient(135deg, #FF6B2B, #FF8F5E)', color: 'white' }}>
                    <Link to="/contact">
                      Être rappelé <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
                {/* Trust badges */}
                <div className="flex flex-wrap justify-center gap-4 text-xs text-white/50">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-gold fill-gold" /> 5.0/5 sur Google</span>
                  <span>•</span>
                  <span>Agréé Préfecture</span>
                  <span>•</span>
                  <span>Certifié Qualiopi</span>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}

      {/* ============ SECTION 9: MOBILE STICKY BAR ============ */}
      {isMobile && !isFooterVisible && (
        <div
          className="fixed bottom-0 left-0 right-0 lg:hidden flex items-center bg-white border-t border-border"
          style={{ zIndex: 1000, height: 56, boxShadow: '0 -4px 12px rgba(0,0,0,0.08)' }}
        >
          <a
            href="tel:0188750555"
            className="flex-1 flex items-center justify-center gap-2 text-forest font-bold text-sm border-r border-border"
            style={{ height: '100%' }}
          >
            <Phone className="w-4 h-4" /> Appeler
          </a>
          <Link
            to="/contact"
            className="flex-1 flex items-center justify-center gap-2 font-bold text-sm text-white"
            style={{ height: '100%', background: '#FF6B2B' }}
          >
            <FileText className="w-4 h-4" /> Devis gratuit
          </Link>
        </div>
      )}

      {/* ============ MODALS ============ */}
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
                    <span className="bg-forest/10 text-forest text-xs font-bold uppercase px-3 py-1 rounded-full">
                      {getCategoryLabel(selectedFormation.category)}
                    </span>
                    <DialogTitle className="text-xl md:text-2xl font-black text-forest mt-1">
                      {selectedFormation.title}
                    </DialogTitle>
                  </div>
                </div>
                <DialogDescription className="text-muted-foreground">
                  {selectedFormation.description || "Formation professionnelle."}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-6">
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

                {selectedFormation.features && selectedFormation.features.length > 0 && (
                  <div>
                    <h4 className="font-bold text-forest mb-4 uppercase text-sm flex items-center gap-2">
                      <span className="w-1 h-4 bg-gold rounded-full" />
                      Contenu de la formation
                    </h4>
                    <ul className="space-y-3">
                      {selectedFormation.features.map((feature, i) => {
                        const FeatureIcon = getFeatureIcon(feature);
                        const digital = isDigitalFeature(feature);
                        return (
                          <motion.li 
                            key={i} 
                            className={`flex items-start gap-3 text-sm ${digital ? 'text-gold font-medium' : 'text-muted-foreground'}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <FeatureIcon className={`w-5 h-5 shrink-0 mt-0.5 ${digital ? 'text-gold' : 'text-forest'}`} />
                            {feature}
                          </motion.li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* Sessions */}
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
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg text-center">
                      Aucune session programmée. Contactez-nous pour connaître les prochaines dates.
                    </p>
                  )}
                </div>

                <div className="p-4 bg-forest/5 rounded-xl border border-forest/10">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-gold" />
                    <div>
                      <p className="font-bold text-forest">Paiement en 4× sans frais</p>
                      <p className="text-sm text-muted-foreground">Facilités de paiement disponibles</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    className="flex-1 font-bold"
                    style={{ background: 'linear-gradient(135deg, #FF6B2B, #FF8F5E)', color: 'white' }}
                    onClick={() => {
                      setSelectedFormation(null);
                      setPreRegistrationFormation(selectedFormation);
                    }}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Pré-inscription
                  </Button>
                  <Button asChild variant="outline" className="flex-1 border-forest text-forest hover:bg-forest hover:text-white">
                    <a href="tel:0188750555">
                      <Phone className="w-4 h-4 mr-2" /> Appeler
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

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
