import { Link } from "react-router-dom";
import { Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const formations = [
  {
    id: 1,
    title: "Développement Web Full Stack",
    description: "Maîtrisez les technologies front-end et back-end pour créer des applications web complètes.",
    duration: "6 mois",
    level: "Débutant à Intermédiaire",
    category: "Informatique",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    title: "Gestion de Projet Agile",
    description: "Apprenez les méthodologies Scrum et Kanban pour piloter vos projets efficacement.",
    duration: "3 mois",
    level: "Tous niveaux",
    category: "Management",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    title: "Marketing Digital",
    description: "Développez une stratégie digitale complète : SEO, réseaux sociaux, publicité en ligne.",
    duration: "4 mois",
    level: "Intermédiaire",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop",
  },
  {
    id: 4,
    title: "Data Science & IA",
    description: "Explorez le machine learning et l'analyse de données pour des insights business.",
    duration: "8 mois",
    level: "Avancé",
    category: "Informatique",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=250&fit=crop",
  },
];

const FormationsSection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nos formations phares
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des parcours complets conçus par des experts pour vous accompagner 
            vers la réussite professionnelle.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {formations.map((formation, index) => (
            <div
              key={formation.id}
              className={`group bg-card rounded-xl overflow-hidden border border-border card-hover animate-fade-up opacity-0 stagger-${index + 1}`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={formation.image}
                  alt={formation.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    {formation.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {formation.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {formation.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formation.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{formation.level}</span>
                  </div>
                </div>

                <Link
                  to="/formations"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-accent transition-colors"
                >
                  En savoir plus
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="gradient-primary border-0">
            <Link to="/formations">
              Voir toutes les formations
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FormationsSection;
