import { ClipboardCheck, BookOpen, Car, GraduationCap } from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    number: "01",
    title: "Inscription",
    description: "Prenez rendez-vous et inscrivez-vous à la formation de votre choix.",
  },
  {
    icon: BookOpen,
    number: "02",
    title: "Formation théorique",
    description: "10 jours de formation intensive en salle avec nos formateurs experts.",
  },
  {
    icon: Car,
    number: "03",
    title: "Formation pratique",
    description: "Mises en situation réelles pour vous préparer au métier.",
  },
  {
    icon: GraduationCap,
    number: "04",
    title: "Examen & Carte pro",
    description: "Passez l'examen et obtenez votre carte professionnelle. Prêt à travailler !",
  },
];

const ProcessSection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Votre parcours en <span className="text-primary">4 étapes</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Un accompagnement complet de l'inscription jusqu'à l'obtention de votre carte professionnelle
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
              )}

              <div className="relative bg-card rounded-xl border border-border p-6 text-center card-hover">
                {/* Number badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-sm font-bold px-3 py-1 rounded-full">
                  {step.number}
                </div>

                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mt-4 mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
