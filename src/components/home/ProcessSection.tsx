import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, BookOpen, Car, GraduationCap, ArrowRight, Zap } from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    number: "01",
    title: "Inscription",
    description: "Prenez rendez-vous dans notre centre. Nous étudions ensemble votre projet professionnel.",
    color: "from-blue-600 to-blue-500",
  },
  {
    icon: BookOpen,
    number: "02",
    title: "Formation Théorique",
    description: "10 jours de formation intensive en salle avec nos formateurs experts certifiés.",
    color: "from-purple-600 to-purple-500",
  },
  {
    icon: Car,
    number: "03",
    title: "Formation Pratique",
    description: "Mises en situation réelles pour vous préparer au métier et à l'examen.",
    color: "from-emerald-500 to-emerald-400",
  },
  {
    icon: GraduationCap,
    number: "04",
    title: "Examen & Carte Pro",
    description: "Passez l'examen et obtenez votre carte professionnelle. Prêt à travailler !",
    color: "from-orange-500 to-orange-400",
  },
];

const ProcessSection = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl">
        <div className="absolute top-20 left-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl" />
        <div className="absolute top-40 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 rounded-full px-4 py-2 text-sm font-semibold mb-6">
            <Zap className="w-4 h-4 text-orange-500" />
            Votre parcours
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Devenez Chauffeur en{" "}
            <span className="text-gradient-orange">4 Étapes</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Un parcours simple et accompagné jusqu'à l'obtention de votre carte professionnelle
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-emerald-500 to-orange-500 rounded-full" />

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative group animate-fade-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Number connector - desktop */}
                <div className="hidden lg:flex absolute -top-2 left-1/2 -translate-x-1/2 flex-col items-center">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500 z-10`}>
                    <span className="text-white font-black text-lg">{step.number}</span>
                  </div>
                </div>

                {/* Card */}
                <div className="bg-gray-50 rounded-3xl p-8 pt-16 lg:pt-20 text-center group-hover:bg-white group-hover:shadow-xl transition-all duration-500 border border-transparent group-hover:border-gray-100">
                  {/* Mobile number */}
                  <div className={`lg:hidden w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mx-auto mb-6`}>
                    <span className="text-white font-black text-lg">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white shadow-md flex items-center justify-center group-hover:shadow-lg transition-shadow duration-500">
                    <step.icon className={`w-8 h-8 bg-gradient-to-br ${step.color} bg-clip-text`} style={{ color: index === 0 ? '#2563eb' : index === 1 ? '#9333ea' : index === 2 ? '#10b981' : '#f97316' }} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 rounded-full px-5 py-2.5 text-sm font-semibold mb-6">
            <span className="text-lg">⏱️</span>
            En moyenne, nos élèves obtiennent leur carte en 2 à 3 mois
          </div>
          <div>
            <Button asChild className="btn-premium-orange px-8 py-6 rounded-full text-base">
              <Link to="/contact" className="flex items-center gap-2">
                Commencer mon parcours
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
