import { useState, useRef } from "react";
import Layout from "@/components/layout/Layout";
import { Clock, Users, Euro, ArrowRight, Monitor, Moon, MapPin, Info, CheckCircle2, GraduationCap, Star, CreditCard } from "lucide-react";
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

const categories = ["Toutes", "TAXI", "VTC", "Autres"];
const modalities = ["Tous", "Présentiel", "À distance", "Cours du soir"];

const formations = [
  {
    id: 1,
    emoji: "🚕",
    title: "Formation TAXI Initiale",
    description: "Formation complète pour devenir chauffeur de taxi professionnel. Préparez l'examen officiel avec nos experts.",
    duration: "10 jours",
    level: "Tous niveaux",
    price: "Nous consulter",
    category: "TAXI",
    modality: "Présentiel",
    popular: true,
    objectives: [
      "Maîtriser la réglementation du transport de personnes",
      "Connaître la géographie locale et les itinéraires",
      "Développer les compétences en relation client",
      "Préparer l'examen de la carte professionnelle"
    ],
    prerequisites: "Permis B de plus de 3 ans, casier judiciaire vierge",
    program: [
      "Réglementation nationale et locale",
      "Gestion et comptabilité",
      "Sécurité routière",
      "Français et communication",
      "Anglais professionnel",
      "Orientation et cartographie locale"
    ],
    certification: "RS5635"
  },
  {
    id: 2,
    emoji: "🚗",
    title: "Formation VTC Initiale",
    description: "Devenez chauffeur privé professionnel avec notre formation VTC complète et personnalisée.",
    duration: "10 jours",
    level: "Tous niveaux",
    price: "Nous consulter",
    category: "VTC",
    modality: "Présentiel",
    popular: true,
    objectives: [
      "Acquérir les compétences du transport privé de personnes",
      "Maîtriser la relation client haut de gamme",
      "Connaître la réglementation VTC",
      "Préparer l'examen de la carte professionnelle"
    ],
    prerequisites: "Permis B de plus de 3 ans, casier judiciaire vierge",
    program: [
      "Réglementation VTC",
      "Gestion d'entreprise",
      "Sécurité routière",
      "Français et anglais",
      "Développement commercial",
      "Service client premium"
    ],
    certification: "RS5637"
  },
  {
    id: 3,
    emoji: "🏍️",
    title: "Formation VMDTR",
    description: "Formation moto-taxi pour le transport rapide et sécurisé de passagers en milieu urbain.",
    duration: "10 jours",
    level: "Tous niveaux",
    price: "À partir de 1 500 €",
    category: "Autres",
    modality: "Présentiel",
    popular: false,
    objectives: [
      "Maîtriser les techniques de conduite moto en milieu urbain",
      "Assurer la sécurité des passagers",
      "Connaître la réglementation spécifique VMDTR",
      "Préparer l'examen de la carte professionnelle"
    ],
    prerequisites: "Permis A de plus de 3 ans, casier judiciaire vierge",
    program: [
      "Réglementation VMDTR",
      "Conduite sécuritaire en deux-roues",
      "Relation client",
      "Gestion d'activité",
      "Équipements de sécurité",
      "Navigation urbaine"
    ],
    certification: null
  },
  {
    id: 4,
    emoji: "♿",
    title: "Formation TPMR",
    description: "Formation spécialisée pour le transport de personnes à mobilité réduite avec bienveillance.",
    duration: "14 heures",
    level: "Tous niveaux",
    price: "Nous consulter",
    category: "Autres",
    modality: "Présentiel",
    popular: false,
    objectives: [
      "Accompagner les personnes à mobilité réduite",
      "Maîtriser les équipements spécifiques",
      "Connaître les pathologies et handicaps",
      "Assurer confort et sécurité des passagers"
    ],
    prerequisites: "Permis B valide",
    program: [
      "Handicaps et pathologies",
      "Équipements adaptés",
      "Techniques d'accompagnement",
      "Sécurité et ergonomie",
      "Communication adaptée",
      "Aspects juridiques"
    ],
    certification: null
  },
  {
    id: 5,
    emoji: "⚡",
    title: "Formation Accélérée",
    description: "Formation intensive en cours du soir pour une reconversion rapide et efficace.",
    duration: "5 soirées",
    level: "Tous niveaux",
    price: "Nous consulter",
    category: "TAXI",
    modality: "Cours du soir",
    popular: false,
    objectives: [
      "Préparer rapidement l'examen professionnel",
      "Réviser les points essentiels",
      "S'entraîner aux examens blancs",
      "Optimiser son temps de formation"
    ],
    prerequisites: "Permis B de plus de 3 ans",
    program: [
      "Révisions intensives",
      "Examens blancs",
      "Coaching personnalisé",
      "Méthodologie d'examen",
      "Questions fréquentes",
      "Simulations orales"
    ],
    certification: null
  },
  {
    id: 6,
    emoji: "💻",
    title: "Formation à Distance",
    description: "Formation 100% en ligne, à votre rythme, accessible 24h/24 depuis n'importe où.",
    duration: "Équivalent 10 jours",
    level: "Tous niveaux",
    price: "Nous consulter",
    category: "VTC",
    modality: "À distance",
    popular: false,
    objectives: [
      "Se former à son rythme",
      "Accéder aux cours 24h/24",
      "Bénéficier d'un suivi personnalisé",
      "Préparer l'examen à distance"
    ],
    prerequisites: "Permis B de plus de 3 ans, accès internet",
    program: [
      "Modules e-learning interactifs",
      "Visioconférences avec formateurs",
      "Examens blancs en ligne",
      "Forum d'entraide",
      "Ressources téléchargeables",
      "Suivi personnalisé"
    ],
    certification: null
  },
  {
    id: 7,
    emoji: "🔄",
    title: "Formation Passerelle",
    description: "Passez d'une activité à l'autre : TAXI ↔ VTC ↔ VMDTR facilement.",
    duration: "Variable",
    level: "Professionnels",
    price: "Nous consulter",
    category: "Autres",
    modality: "Présentiel",
    popular: false,
    objectives: [
      "Acquérir les compétences complémentaires",
      "Valider une nouvelle carte professionnelle",
      "Diversifier son activité",
      "Élargir sa clientèle"
    ],
    prerequisites: "Carte professionnelle valide (TAXI, VTC ou VMDTR)",
    program: [
      "Modules spécifiques selon passerelle",
      "Réglementation complémentaire",
      "Spécificités métier",
      "Examen de validation",
      "Accompagnement administratif"
    ],
    certification: null
  },
  {
    id: 8,
    emoji: "📍",
    title: "Formation Mobilité",
    description: "Changez de département d'exercice et étendez votre zone d'activité.",
    duration: "14h (2 jours)",
    level: "Professionnels",
    price: "Nous consulter",
    category: "TAXI",
    modality: "Présentiel",
    popular: false,
    objectives: [
      "Connaître la nouvelle zone géographique",
      "Mettre à jour ses connaissances réglementaires",
      "Obtenir l'attestation de mobilité",
      "Exercer dans un nouveau département"
    ],
    prerequisites: "Carte professionnelle TAXI valide",
    program: [
      "Réglementation locale",
      "Géographie du nouveau département",
      "Tarification spécifique",
      "Points d'intérêt majeurs",
      "Examen de validation"
    ],
    certification: null
  },
  {
    id: 9,
    emoji: "🔄",
    title: "Formation Continue",
    description: "Formation obligatoire tous les 5 ans pour maintenir votre carte professionnelle à jour.",
    duration: "14h (2 jours)",
    level: "Professionnels",
    price: "Nous consulter",
    category: "Autres",
    modality: "Présentiel",
    popular: false,
    objectives: [
      "Mettre à jour ses connaissances",
      "Renouveler sa carte professionnelle",
      "Se conformer à la réglementation",
      "Améliorer ses pratiques professionnelles"
    ],
    prerequisites: "Carte professionnelle de plus de 5 ans",
    program: [
      "Actualités réglementaires",
      "Sécurité routière",
      "Relation client",
      "Nouvelles technologies",
      "Éco-conduite",
      "Attestation de formation"
    ],
    certification: null
  },
  {
    id: 10,
    emoji: "🎯",
    title: "Récupération de Points",
    description: "Stage de sensibilisation pour récupérer 4 points sur votre permis de conduire.",
    duration: "2 jours",
    level: "Tous",
    price: "Nous consulter",
    category: "Autres",
    modality: "Présentiel",
    popular: false,
    objectives: [
      "Récupérer 4 points sur votre permis",
      "Comprendre les comportements à risque",
      "Adopter une conduite responsable",
      "Éviter les récidives"
    ],
    prerequisites: "Permis de conduire valide avec moins de 12 points",
    program: [
      "Sécurité routière",
      "Comportements à risque",
      "Psychologie du conducteur",
      "Facteurs d'accidents",
      "Prévention",
      "Attestation de stage"
    ],
    certification: null
  },
];

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const Formations = () => {
  const [activeCategory, setActiveCategory] = useState("Toutes");
  const [activeModality, setActiveModality] = useState("Tous");
  const [selectedFormation, setSelectedFormation] = useState<typeof formations[0] | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  const filteredFormations = formations.filter((f) => {
    const categoryMatch = activeCategory === "Toutes" || f.category === activeCategory;
    const modalityMatch = activeModality === "Tous" || f.modality === activeModality;
    return categoryMatch && modalityMatch;
  });

  const getModalityIcon = (modality: string) => {
    switch (modality) {
      case "À distance": return <Monitor className="w-4 h-4" />;
      case "Cours du soir": return <Moon className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <Layout>
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
              10 formations certifiantes
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
            ou maintenir vos compétences à jour. Éligibles CPF.
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

            {/* Modality Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {modalities.map((modality) => (
                <motion.button
                  key={modality}
                  onClick={() => setActiveModality(modality)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeModality === modality
                      ? "bg-gold text-forest shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {modality !== "Tous" && getModalityIcon(modality)}
                  {modality}
                </motion.button>
              ))}
            </div>

            {/* Results count */}
            <p className="text-center text-muted-foreground text-sm">
              {filteredFormations.length} formation{filteredFormations.length > 1 ? "s" : ""} trouvée{filteredFormations.length > 1 ? "s" : ""}
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {filteredFormations.map((formation) => (
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
                {formation.popular && (
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
                    <motion.span 
                      className="text-4xl"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {formation.emoji}
                    </motion.span>
                    <div className="flex flex-col items-end gap-2">
                      <span className="bg-forest/10 text-forest text-xs font-bold uppercase px-3 py-1 rounded-full">
                        {formation.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        {getModalityIcon(formation.modality)}
                        {formation.modality}
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
                    {formation.description}
                  </p>
                </div>

                {/* Meta */}
                <div className="grid grid-cols-3 gap-3 text-xs mb-5">
                  <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
                    <Clock className="w-4 h-4 text-forest mb-1" />
                    <span className="font-semibold text-forest">{formation.duration}</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
                    <Users className="w-4 h-4 text-forest mb-1" />
                    <span className="font-semibold text-forest">{formation.level}</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-lg bg-gold/10">
                    <Euro className="w-4 h-4 text-gold mb-1" />
                    <span className="font-semibold text-forest text-center">{formation.price}</span>
                  </div>
                </div>

                {/* Certification badge */}
                {formation.certification && (
                  <div className="mb-4 px-3 py-2 bg-forest/5 rounded-lg border border-forest/10">
                    <p className="text-xs text-forest font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold" />
                      Certification {formation.certification}
                    </p>
                  </div>
                )}

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-forest text-forest hover:bg-forest hover:text-cream transition-all duration-300"
                    onClick={() => setSelectedFormation(formation)}
                  >
                    <Info className="w-4 h-4 mr-2" />
                    Détails
                  </Button>
                  <Button asChild className="flex-1 btn-primary">
                    <Link to="/contact">
                      S'inscrire
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredFormations.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-muted-foreground text-lg">Aucune formation ne correspond à vos critères.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => { setActiveCategory("Toutes"); setActiveModality("Tous"); }}
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
                  <span className="text-4xl">{selectedFormation.emoji}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-forest/10 text-forest text-xs font-bold uppercase px-3 py-1 rounded-full">
                        {selectedFormation.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        {getModalityIcon(selectedFormation.modality)}
                        {selectedFormation.modality}
                      </span>
                    </div>
                    <DialogTitle className="text-xl md:text-2xl font-black text-forest">
                      {selectedFormation.title}
                    </DialogTitle>
                  </div>
                </div>
                <DialogDescription className="text-muted-foreground">
                  {selectedFormation.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Info grid */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-xl">
                  <div className="text-center">
                    <Clock className="w-6 h-6 text-forest mx-auto mb-2" />
                    <p className="text-sm font-bold text-forest">{selectedFormation.duration}</p>
                    <p className="text-xs text-muted-foreground">Durée</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-6 h-6 text-forest mx-auto mb-2" />
                    <p className="text-sm font-bold text-forest">{selectedFormation.level}</p>
                    <p className="text-xs text-muted-foreground">Niveau</p>
                  </div>
                  <div className="text-center">
                    <Euro className="w-6 h-6 text-gold mx-auto mb-2" />
                    <p className="text-sm font-bold text-forest">{selectedFormation.price}</p>
                    <p className="text-xs text-muted-foreground">Tarif</p>
                  </div>
                </div>

                {/* Certification */}
                {selectedFormation.certification && (
                  <div className="flex items-center gap-3 p-4 bg-gold/10 rounded-xl border border-gold/20">
                    <CheckCircle2 className="w-6 h-6 text-gold shrink-0" />
                    <div>
                      <p className="font-bold text-forest">Certification officielle {selectedFormation.certification}</p>
                      <p className="text-sm text-muted-foreground">Formation certifiante reconnue par l'État</p>
                    </div>
                  </div>
                )}

                {/* Objectives */}
                <div>
                  <h4 className="font-bold text-forest mb-4 uppercase text-sm flex items-center gap-2">
                    <span className="w-1 h-4 bg-gold rounded-full" />
                    Objectifs de la formation
                  </h4>
                  <ul className="space-y-3">
                    {selectedFormation.objectives.map((obj, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                        {obj}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Prerequisites */}
                <div>
                  <h4 className="font-bold text-forest mb-3 uppercase text-sm flex items-center gap-2">
                    <span className="w-1 h-4 bg-gold rounded-full" />
                    Prérequis
                  </h4>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                    {selectedFormation.prerequisites}
                  </p>
                </div>

                {/* Program */}
                <div>
                  <h4 className="font-bold text-forest mb-3 uppercase text-sm flex items-center gap-2">
                    <span className="w-1 h-4 bg-gold rounded-full" />
                    Programme
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedFormation.program.map((item, i) => (
                      <div 
                        key={i}
                        className="flex items-center gap-2 text-sm text-muted-foreground p-2 bg-muted/30 rounded-lg"
                      >
                        <span className="w-2 h-2 bg-gold rounded-full shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment info */}
                <div className="p-4 bg-forest/5 rounded-xl border border-forest/10">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-gold" />
                    <div>
                      <p className="font-bold text-forest">Paiement en 4x sans frais</p>
                      <p className="text-sm text-muted-foreground">Éligible au CPF • Facilités de paiement disponibles</p>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex gap-3 pt-4">
                  <Button asChild className="flex-1 btn-primary">
                    <Link to="/contact">
                      <span>Prendre rendez-vous</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
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
    </Layout>
  );
};

export default Formations;
