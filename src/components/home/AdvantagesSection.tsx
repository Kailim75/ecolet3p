import { Trophy, BookOpen, GraduationCap, CreditCard, Clock } from "lucide-react";

const advantages = [
  {
    icon: Trophy,
    title: "96% de réussite",
    description: "Un taux de réussite exceptionnel grâce à notre méthode pédagogique éprouvée.",
  },
  {
    icon: BookOpen,
    title: "10 ans d'expérience",
    description: "Une expertise reconnue dans la formation de chauffeurs professionnels.",
  },
  {
    icon: GraduationCap,
    title: "Formateurs professionnels",
    description: "Des formateurs certifiés et expérimentés issus du terrain.",
  },
  {
    icon: CreditCard,
    title: "Paiement en 4x sans frais",
    description: "Facilitez votre formation avec un paiement échelonné sans frais supplémentaires.",
  },
  {
    icon: Clock,
    title: "Formats flexibles",
    description: "Formation en présentiel, à distance ou en cours du soir selon vos besoins.",
  },
];

const AdvantagesSection = () => {
  return (
    <section className="section-padding section-alt">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pourquoi choisir <span className="text-primary">T3P Campus</span> ?
          </h2>
          <p className="text-muted-foreground text-lg">
            Les atouts qui font de nous le centre de formation de référence à Montrouge
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {advantages.map((advantage, index) => (
            <div
              key={advantage.title}
              className="bg-card rounded-xl border border-border p-6 text-center card-hover animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <advantage.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {advantage.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
