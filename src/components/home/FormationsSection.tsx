import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";

const formations = [
  {
    icon: "🚕",
    title: "Formation TAXI",
    duration: "10 jours",
    price: "Nous consulter",
    description: "Formation complète pour devenir chauffeur de taxi professionnel.",
  },
  {
    icon: "🚗",
    title: "Formation VTC",
    duration: "10 jours",
    price: "Nous consulter",
    description: "Devenez chauffeur privé professionnel avec notre formation VTC.",
  },
  {
    icon: "🏍️",
    title: "Formation VMDTR",
    duration: "10 jours",
    price: "À partir de 1 500 €",
    description: "Formation moto-taxi pour le transport rapide de passagers.",
  },
  {
    icon: "🔄",
    title: "Récupération de points",
    duration: "2 jours",
    price: "Nous consulter",
    description: "Stage de récupération de 4 points sur votre permis de conduire.",
  },
];

const FormationsSection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nos <span className="text-primary">Formations</span> Phares
          </h2>
          <p className="text-muted-foreground text-lg">
            Des formations certifiantes pour lancer votre carrière de chauffeur professionnel
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {formations.map((formation, index) => (
            <div
              key={formation.title}
              className="bg-card rounded-xl border border-border p-6 card-hover animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="text-4xl mb-4">{formation.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {formation.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {formation.description}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Clock className="w-4 h-4" />
                <span>{formation.duration}</span>
              </div>

              {/* Price */}
              <div className="text-lg font-semibold text-primary mb-4">
                {formation.price}
              </div>

              {/* CTA */}
              <Button asChild variant="outline" className="w-full">
                <Link to="/contact">
                  En savoir plus
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            to="/formations"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors"
          >
            Voir les 10 formations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FormationsSection;
