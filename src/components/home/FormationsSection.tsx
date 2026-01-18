import { Link } from "react-router-dom";
import { Clock, Users, ArrowRight, Zap } from "lucide-react";
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
    featured: true,
  },
  {
    id: 2,
    title: "Gestion de Projet Agile",
    description: "Apprenez les méthodologies Scrum et Kanban pour piloter vos projets efficacement.",
    duration: "3 mois",
    level: "Tous niveaux",
    category: "Management",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
    featured: false,
  },
  {
    id: 3,
    title: "Marketing Digital",
    description: "Développez une stratégie digitale complète : SEO, réseaux sociaux, publicité en ligne.",
    duration: "4 mois",
    level: "Intermédiaire",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop",
    featured: false,
  },
  {
    id: 4,
    title: "Data Science & IA",
    description: "Explorez le machine learning et l'analyse de données pour des insights business.",
    duration: "8 mois",
    level: "Avancé",
    category: "Informatique",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=250&fit=crop",
    featured: true,
  },
];

const FormationsSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-accent/5 to-transparent rounded-full blur-3xl" />
      
      <div className="container-custom relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-wider mb-4">
              <Zap className="w-4 h-4" />
              Nos formations
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Des parcours conçus pour votre{" "}
              <span className="text-gradient">réussite</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Des formations certifiantes, conçues par des experts et adaptées aux besoins réels du marché.
            </p>
          </div>
          <Button asChild variant="outline" className="self-start lg:self-end rounded-full px-6">
            <Link to="/formations" className="flex items-center gap-2">
              Voir tout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {formations.map((formation, index) => (
            <div
              key={formation.id}
              className={`group card-modern overflow-hidden animate-fade-up opacity-0 stagger-${index + 1}`}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={formation.image}
                  alt={formation.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 text-foreground backdrop-blur-sm">
                    {formation.category}
                  </span>
                </div>
                
                {/* Featured badge */}
                {formation.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold gradient-accent text-white">
                      <Zap className="w-3 h-3" />
                      Populaire
                    </span>
                  </div>
                )}

                {/* Duration on image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 text-white/90 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{formation.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>{formation.level}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-lg text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                  {formation.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
                  {formation.description}
                </p>

                <Link
                  to="/formations"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all"
                >
                  En savoir plus
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormationsSection;
