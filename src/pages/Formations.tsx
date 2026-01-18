import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Clock, Users, Euro, ArrowRight, Monitor, Moon, MapPin, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

const categories = ["Toutes", "TAXI", "VTC", "Autres"];
const modalities = ["Tous", "Présentiel", "À distance", "Cours du soir"];

const formations = [
  {
    id: 1,
    title: "Formation TAXI Initiale",
    description: "Formation complète pour devenir chauffeur de taxi professionnel.",
    duration: "10 jours",
    level: "Tous niveaux",
    price: "Nous consulter",
    category: "TAXI",
    modality: "Présentiel",
    objectives: [
      "Maîtriser la réglementation du transport de personnes",
      "Connaître la géographie locale et les itinéraires",
      "Développer les compétences en relation client",
      "Préparer l'examen de la carte professionnelle"
    ],
    prerequisites: "Permis B de plus de 3 ans, casier judiciaire vierge",
    program: "Réglementation, gestion, sécurité routière, français, anglais, orientation locale",
  },
  {
    id: 2,
    title: "Formation VTC Initiale",
    description: "Devenez chauffeur privé professionnel avec notre formation VTC complète.",
    duration: "10 jours",
    level: "Tous niveaux",
    price: "Nous consulter",
    category: "VTC",
    modality: "Présentiel",
    objectives: [
      "Acquérir les compétences du transport privé de personnes",
      "Maîtriser la relation client haut de gamme",
      "Connaître la réglementation VTC",
      "Préparer l'examen de la carte professionnelle"
    ],
    prerequisites: "Permis B de plus de 3 ans, casier judiciaire vierge",
    program: "Réglementation, gestion, sécurité routière, français, anglais, développement commercial",
  },
  {
    id: 3,
    title: "Formation VMDTR",
    description: "Formation moto-taxi pour le transport rapide de passagers.",
    duration: "10 jours",
    level: "Tous niveaux",
    price: "À partir de 1 500 €",
    category: "Autres",
    modality: "Présentiel",
    objectives: [
      "Maîtriser les techniques de conduite moto en milieu urbain",
      "Assurer la sécurité des passagers",
      "Connaître la réglementation spécifique VMDTR",
      "Préparer l'examen de la carte professionnelle"
    ],
    prerequisites: "Permis A de plus de 3 ans, casier judiciaire vierge",
    program: "Réglementation, conduite sécuritaire, relation client, gestion d'activité",
  },
  {
    id: 4,
    title: "Formation TPMR",
    description: "Formation spécialisée pour le transport de personnes à mobilité réduite.",
    duration: "Spécialisée",
    level: "Tous niveaux",
    price: "Nous consulter",
    category: "Autres",
    modality: "Présentiel",
    objectives: [
      "Accompagner les personnes à mobilité réduite",
      "Maîtriser les équipements spécifiques",
      "Connaître les pathologies et handicaps",
      "Assurer confort et sécurité des passagers"
    ],
    prerequisites: "Permis B valide",
    program: "Handicaps et pathologies, équipements, accompagnement, sécurité",
  },
  {
    id: 5,
    title: "Formation Accélérée",
    description: "Formation intensive en cours du soir pour une reconversion rapide.",
    duration: "5 soirées",
    level: "Tous niveaux",
    price: "Nous consulter",
    category: "TAXI",
    modality: "Cours du soir",
    objectives: [
      "Préparer rapidement l'examen professionnel",
      "Réviser les points essentiels",
      "S'entraîner aux examens blancs",
      "Optimiser son temps de formation"
    ],
    prerequisites: "Permis B de plus de 3 ans",
    program: "Révisions intensives, examens blancs, coaching personnalisé",
  },
  {
    id: 6,
    title: "Formation à Distance",
    description: "Formation 100% en ligne, à votre rythme, accessible partout.",
    duration: "Équivalent 10 jours",
    level: "Tous niveaux",
    price: "Nous consulter",
    category: "VTC",
    modality: "À distance",
    objectives: [
      "Se former à son rythme",
      "Accéder aux cours 24h/24",
      "Bénéficier d'un suivi personnalisé",
      "Préparer l'examen à distance"
    ],
    prerequisites: "Permis B de plus de 3 ans, accès internet",
    program: "Modules e-learning, visioconférences, examens blancs en ligne",
  },
  {
    id: 7,
    title: "Formation Passerelle",
    description: "Passez d'une activité à l'autre : TAXI ↔ VTC ↔ VMDTR.",
    duration: "Adaptée",
    level: "Professionnels",
    price: "Nous consulter",
    category: "Autres",
    modality: "Présentiel",
    objectives: [
      "Acquérir les compétences complémentaires",
      "Valider une nouvelle carte professionnelle",
      "Diversifier son activité",
      "Élargir sa clientèle"
    ],
    prerequisites: "Carte professionnelle valide (TAXI, VTC ou VMDTR)",
    program: "Modules spécifiques selon la passerelle choisie",
  },
  {
    id: 8,
    title: "Formation Mobilité",
    description: "Changez de département d'exercice de votre activité.",
    duration: "14h (2 jours)",
    level: "Professionnels",
    price: "Nous consulter",
    category: "TAXI",
    modality: "Présentiel",
    objectives: [
      "Connaître la nouvelle zone géographique",
      "Mettre à jour ses connaissances réglementaires",
      "Obtenir l'attestation de mobilité",
      "Exercer dans un nouveau département"
    ],
    prerequisites: "Carte professionnelle TAXI valide",
    program: "Réglementation locale, géographie, tarification",
  },
  {
    id: 9,
    title: "Formation Continue",
    description: "Formation obligatoire tous les 5 ans pour maintenir votre carte professionnelle.",
    duration: "14h (2 jours)",
    level: "Professionnels",
    price: "Nous consulter",
    category: "Autres",
    modality: "Présentiel",
    objectives: [
      "Mettre à jour ses connaissances",
      "Renouveler sa carte professionnelle",
      "Se conformer à la réglementation",
      "Améliorer ses pratiques professionnelles"
    ],
    prerequisites: "Carte professionnelle de plus de 5 ans",
    program: "Actualités réglementaires, sécurité, relation client",
  },
  {
    id: 10,
    title: "Récupération de Points",
    description: "Stage de sensibilisation pour récupérer 4 points sur votre permis.",
    duration: "2 jours",
    level: "Tous",
    price: "Nous consulter",
    category: "Autres",
    modality: "Présentiel",
    objectives: [
      "Récupérer 4 points sur votre permis",
      "Comprendre les comportements à risque",
      "Adopter une conduite responsable",
      "Éviter les récidives"
    ],
    prerequisites: "Permis de conduire valide avec moins de 12 points",
    program: "Sécurité routière, comportements à risque, psychologie du conducteur",
  },
];

const Formations = () => {
  const [activeCategory, setActiveCategory] = useState("Toutes");
  const [activeModality, setActiveModality] = useState("Tous");
  const [selectedFormation, setSelectedFormation] = useState<typeof formations[0] | null>(null);

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
      {/* Hero - LiveMentor style */}
      <section className="gradient-hero py-20 md:py-28">
        <div className="container-custom text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-black text-cream uppercase tracking-tight mb-4"
          >
            Nos Formations <span className="text-gold">TAXI • VTC • VMDTR</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-cream/80 max-w-2xl mx-auto"
          >
            Découvrez nos 10 formations professionnelles pour devenir chauffeur ou 
            maintenir vos compétences à jour.
          </motion.p>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Filters */}
          <div className="mb-10 space-y-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-md text-sm font-bold uppercase tracking-wide transition-all ${
                    activeCategory === category
                      ? "bg-forest text-cream"
                      : "bg-card text-forest border border-border hover:border-forest"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Modality Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {modalities.map((modality) => (
                <button
                  key={modality}
                  onClick={() => setActiveModality(modality)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                    activeModality === modality
                      ? "bg-gold text-forest"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {modality !== "Tous" && getModalityIcon(modality)}
                  {modality}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFormations.map((formation, index) => (
              <motion.div
                key={formation.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group card-livementor"
              >
                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="bg-forest/10 text-forest text-xs font-bold uppercase px-3 py-1 rounded">
                      {formation.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-warm-gray-500">
                      {getModalityIcon(formation.modality)}
                      {formation.modality}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-xl text-forest mb-2 group-hover:text-gold transition-colors">
                    {formation.title}
                  </h3>
                  <p className="text-warm-gray-600 text-sm mb-4 line-clamp-2">
                    {formation.description}
                  </p>
                </div>

                {/* Meta */}
                <div className="grid grid-cols-3 gap-2 text-xs text-warm-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-forest" />
                    <span>{formation.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-forest" />
                    <span>{formation.level}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Euro className="w-4 h-4 text-gold" />
                    <span className="font-semibold text-forest">{formation.price}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-forest text-forest hover:bg-forest hover:text-cream"
                    onClick={() => setSelectedFormation(formation)}
                  >
                    <Info className="w-4 h-4 mr-2" />
                    Détails
                  </Button>
                  <Button asChild className="flex-1 btn-primary">
                    <Link to="/contact">
                      Contacter
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredFormations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-warm-gray-600">Aucune formation ne correspond à vos critères.</p>
            </div>
          )}
        </div>
      </section>

      {/* Details Modal */}
      <Dialog open={!!selectedFormation} onOpenChange={() => setSelectedFormation(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-cream-light">
          {selectedFormation && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-forest/10 text-forest text-xs font-bold uppercase px-3 py-1 rounded">
                    {selectedFormation.category}
                  </span>
                  <span className="text-xs text-warm-gray-500">
                    {selectedFormation.modality}
                  </span>
                </div>
                <DialogTitle className="text-2xl font-black text-forest uppercase">{selectedFormation.title}</DialogTitle>
                <DialogDescription className="text-warm-gray-600">{selectedFormation.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Info grid */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-card rounded-lg border border-border">
                  <div className="text-center">
                    <Clock className="w-5 h-5 text-forest mx-auto mb-1" />
                    <p className="text-sm font-bold text-forest">{selectedFormation.duration}</p>
                    <p className="text-xs text-warm-gray-500">Durée</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-5 h-5 text-forest mx-auto mb-1" />
                    <p className="text-sm font-bold text-forest">{selectedFormation.level}</p>
                    <p className="text-xs text-warm-gray-500">Niveau</p>
                  </div>
                  <div className="text-center">
                    <Euro className="w-5 h-5 text-gold mx-auto mb-1" />
                    <p className="text-sm font-bold text-forest">{selectedFormation.price}</p>
                    <p className="text-xs text-warm-gray-500">Tarif</p>
                  </div>
                </div>

                {/* Objectives */}
                <div>
                  <h4 className="font-bold text-forest mb-3 uppercase text-sm">Objectifs de la formation</h4>
                  <ul className="space-y-2">
                    {selectedFormation.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-warm-gray-600">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 shrink-0" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prerequisites */}
                <div>
                  <h4 className="font-bold text-forest mb-2 uppercase text-sm">Prérequis</h4>
                  <p className="text-sm text-warm-gray-600">{selectedFormation.prerequisites}</p>
                </div>

                {/* Program */}
                <div>
                  <h4 className="font-bold text-forest mb-2 uppercase text-sm">Programme</h4>
                  <p className="text-sm text-warm-gray-600">{selectedFormation.program}</p>
                </div>

                {/* Payment info */}
                <div className="p-4 bg-gold/10 rounded-lg border border-gold/20">
                  <p className="text-sm font-bold text-forest">
                    💳 Paiement en 4x sans frais disponible
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex gap-3">
                  <Button asChild className="flex-1 btn-primary">
                    <Link to="/contact">
                      Prendre rendez-vous
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 border-forest text-forest hover:bg-forest hover:text-cream">
                    <a href="tel:0188750555">
                      Appeler le 01 88 75 05 55
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
