import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Clock, Users, Euro, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const categories = ["Toutes", "Informatique", "Management", "Marketing", "Ressources Humaines"];

const formations = [
  {
    id: 1,
    title: "Développement Web Full Stack",
    description: "Maîtrisez les technologies front-end et back-end pour créer des applications web complètes. HTML, CSS, JavaScript, React, Node.js et bases de données.",
    duration: "6 mois",
    level: "Débutant à Intermédiaire",
    price: "5 900 €",
    category: "Informatique",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Gestion de Projet Agile",
    description: "Apprenez les méthodologies Scrum et Kanban pour piloter vos projets efficacement. Certification Scrum Master incluse.",
    duration: "3 mois",
    level: "Tous niveaux",
    price: "3 200 €",
    category: "Management",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Marketing Digital",
    description: "Développez une stratégie digitale complète : SEO, réseaux sociaux, publicité en ligne, email marketing et analytics.",
    duration: "4 mois",
    level: "Intermédiaire",
    price: "4 100 €",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=500&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Data Science & Intelligence Artificielle",
    description: "Explorez le machine learning et l'analyse de données pour des insights business. Python, TensorFlow, et visualisation de données.",
    duration: "8 mois",
    level: "Avancé",
    price: "7 500 €",
    category: "Informatique",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=500&h=300&fit=crop",
  },
  {
    id: 5,
    title: "Leadership et Management d'Équipe",
    description: "Développez vos compétences managériales pour motiver et diriger votre équipe vers la performance.",
    duration: "2 mois",
    level: "Intermédiaire",
    price: "2 800 €",
    category: "Management",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop",
  },
  {
    id: 6,
    title: "Community Management",
    description: "Gérez et animez les communautés en ligne. Stratégie de contenu, modération et création d'engagement.",
    duration: "3 mois",
    level: "Débutant",
    price: "2 900 €",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=300&fit=crop",
  },
  {
    id: 7,
    title: "Cybersécurité",
    description: "Protégez les systèmes informatiques contre les menaces. Ethical hacking, audit de sécurité et conformité.",
    duration: "5 mois",
    level: "Avancé",
    price: "5 500 €",
    category: "Informatique",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=300&fit=crop",
  },
  {
    id: 8,
    title: "Recrutement et Marque Employeur",
    description: "Maîtrisez les techniques de sourcing, d'entretien et développez une marque employeur attractive.",
    duration: "2 mois",
    level: "Tous niveaux",
    price: "2 400 €",
    category: "Ressources Humaines",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=300&fit=crop",
  },
];

const Formations = () => {
  const [activeCategory, setActiveCategory] = useState("Toutes");

  const filteredFormations = activeCategory === "Toutes"
    ? formations
    : formations.filter((f) => f.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-primary py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-up">
            Nos Formations
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto animate-fade-up stagger-1 opacity-0">
            Découvrez notre catalogue de formations professionnelles certifiantes pour 
            développer vos compétences et booster votre carrière.
          </p>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "gradient-primary text-primary-foreground shadow-medium"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFormations.map((formation, index) => (
              <div
                key={formation.id}
                className="group bg-card rounded-xl overflow-hidden border border-border card-hover animate-fade-up opacity-0"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
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
                <div className="p-6">
                  <h3 className="font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                    {formation.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {formation.description}
                  </p>

                  {/* Meta */}
                  <div className="grid grid-cols-3 gap-2 mb-5 text-xs text-muted-foreground">
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

                  <Button asChild className="w-full gradient-accent border-0 hover:opacity-90">
                    <Link to="/contact">
                      En savoir plus
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Formations;
