import { Award, Users, HeartHandshake, TrendingUp } from "lucide-react";

const advantages = [
  {
    icon: Award,
    title: "Formateurs Experts",
    description: "Nos formateurs sont des professionnels reconnus avec une expérience terrain significative.",
  },
  {
    icon: Users,
    title: "Petits Groupes",
    description: "Un maximum de 12 participants par session pour garantir un accompagnement personnalisé.",
  },
  {
    icon: HeartHandshake,
    title: "Suivi Personnalisé",
    description: "Un conseiller dédié vous accompagne avant, pendant et après votre formation.",
  },
  {
    icon: TrendingUp,
    title: "Certifications Reconnues",
    description: "Des formations certifiantes reconnues par l'État et les entreprises.",
  },
];

const AdvantagesSection = () => {
  return (
    <section className="section-padding section-alt">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pourquoi choisir T3P Campus ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une approche pédagogique unique centrée sur vos besoins et votre réussite.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={advantage.title}
              className={`text-center p-6 animate-fade-up opacity-0 stagger-${index + 1}`}
            >
              <div className="w-16 h-16 mx-auto mb-6 gradient-primary rounded-2xl flex items-center justify-center shadow-medium">
                <advantage.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {advantage.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
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
