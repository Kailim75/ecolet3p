import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Clock, Users, Euro, ArrowRight, Monitor, Moon, MapPin, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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
      {/* Hero */}
      <section className="gradient-hero py-20 md:py-28">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-up">
            Nos Formations TAXI • VTC • VMDTR
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto animate-fade-up stagger-1">
            Découvrez nos 10 formations professionnelles pour devenir chauffeur ou 
            maintenir vos compétences à jour.
          </p>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Filters */}
          <div className="mb-10 space-y-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground shadow-primary"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
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
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    activeModality === modality
                      ? "bg-accent text-accent-foreground"
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
              <div
                key={formation.id}
                className="group bg-card rounded-xl overflow-hidden border border-border card-hover animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
              >
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                      {formation.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      {getModalityIcon(formation.modality)}
                      {formation.modality}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                    {formation.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {formation.description}
                  </p>
                </div>

                {/* Meta */}
                <div className="px-6 pb-4">
                  <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{formation.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{formation.level}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Euro className="w-4 h-4 text-accent" />
                      <span className="font-semibold text-foreground">{formation.price}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setSelectedFormation(formation)}
                    >
                      <Info className="w-4 h-4 mr-2" />
                      Détails
                    </Button>
                    <Button asChild className="flex-1 btn-accent">
                      <Link to="/contact">
                        Nous contacter
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFormations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucune formation ne correspond à vos critères.</p>
            </div>
          )}
        </div>
      </section>

      {/* Details Modal */}
      <Dialog open={!!selectedFormation} onOpenChange={() => setSelectedFormation(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedFormation && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                    {selectedFormation.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {selectedFormation.modality}
                  </span>
                </div>
                <DialogTitle className="text-2xl">{selectedFormation.title}</DialogTitle>
                <DialogDescription>{selectedFormation.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Info grid */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                  <div className="text-center">
                    <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-sm font-medium">{selectedFormation.duration}</p>
                    <p className="text-xs text-muted-foreground">Durée</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-sm font-medium">{selectedFormation.level}</p>
                    <p className="text-xs text-muted-foreground">Niveau</p>
                  </div>
                  <div className="text-center">
                    <Euro className="w-5 h-5 text-accent mx-auto mb-1" />
                    <p className="text-sm font-medium">{selectedFormation.price}</p>
                    <p className="text-xs text-muted-foreground">Tarif</p>
                  </div>
                </div>

                {/* Objectives */}
                <div>
                  <h4 className="font-semibold mb-3">Objectifs de la formation</h4>
                  <ul className="space-y-2">
                    {selectedFormation.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prerequisites */}
                <div>
                  <h4 className="font-semibold mb-2">Prérequis</h4>
                  <p className="text-sm text-muted-foreground">{selectedFormation.prerequisites}</p>
                </div>

                {/* Program */}
                <div>
                  <h4 className="font-semibold mb-2">Programme</h4>
                  <p className="text-sm text-muted-foreground">{selectedFormation.program}</p>
                </div>

                {/* Payment info */}
                <div className="p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm font-medium text-accent">
                    💳 Paiement en 4x sans frais disponible
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex gap-3">
                  <Button asChild className="flex-1 btn-accent">
                    <Link to="/contact">
                      Prendre rendez-vous
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
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
