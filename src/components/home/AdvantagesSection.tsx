import { Award, Users, HeartHandshake, TrendingUp, Shield, BookOpen } from "lucide-react";

const advantages = [
  {
    icon: Award,
    title: "Formateurs Experts",
    description: "Nos formateurs sont des professionnels reconnus avec une expérience terrain significative dans leur domaine.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Petits Groupes",
    description: "Un maximum de 12 participants par session pour garantir un accompagnement personnalisé et interactif.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: HeartHandshake,
    title: "Suivi Personnalisé",
    description: "Un conseiller dédié vous accompagne avant, pendant et après votre formation pour assurer votre réussite.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: TrendingUp,
    title: "Certifications Reconnues",
    description: "Des formations certifiantes reconnues par l'État et les entreprises pour valoriser vos compétences.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Shield,
    title: "100% Finançable",
    description: "Nos formations sont éligibles au CPF, aux OPCO et à diverses aides pour faciliter votre projet.",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: BookOpen,
    title: "Méthodes Innovantes",
    description: "Une pédagogie active basée sur la pratique, les cas concrets et les dernières innovations.",
    color: "from-sky-500 to-blue-500",
  },
];

const AdvantagesSection = () => {
  return (
    <section className="section-padding section-alt relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            <Shield className="w-4 h-4" />
            Nos engagements
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Pourquoi choisir{" "}
            <span className="text-gradient">T3P Campus</span> ?
          </h2>
          <p className="text-lg text-muted-foreground">
            Une approche pédagogique unique centrée sur vos besoins, votre rythme et votre réussite professionnelle.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={advantage.title}
              className={`group relative bg-card rounded-2xl p-8 border border-border/50 transition-all duration-500 hover:border-accent/30 hover:shadow-large animate-fade-up opacity-0 stagger-${index + 1}`}
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${advantage.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <advantage.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
