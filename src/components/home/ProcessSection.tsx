import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const steps = [
  { number: "1", emoji: "✍️", title: "Inscription", description: "Prenez rendez-vous. Nous étudions ensemble votre projet." },
  { number: "2", emoji: "📚", title: "Formation", description: "Suivez votre formation avec nos formateurs experts." },
  { number: "3", emoji: "🎯", title: "Examen", description: "Passez votre examen avec confiance grâce à notre préparation." },
  { number: "4", emoji: "🏆", title: "Carte Pro", description: "Obtenez votre carte et démarrez votre nouvelle carrière." },
];

const ProcessSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">
            LA MÉTHODE <span className="text-gold">T3P CAMPUS</span>
          </h2>
          <p className="section-subtitle mx-auto">
            4 étapes simples pour obtenir votre carte professionnelle
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-full h-0.5 bg-border" />
              )}

              <div className="relative bg-card rounded-xl p-6 border border-border hover:border-forest/30 hover:shadow-lg transition-all duration-300 group">
                {/* Step number */}
                <div className="step-number mb-4 group-hover:bg-gold group-hover:text-forest transition-colors">
                  {step.number}
                </div>

                {/* Emoji */}
                <div className="text-4xl mb-4">{step.emoji}</div>

                {/* Title */}
                <h3 className="text-lg font-bold text-forest mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-warm-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-warm-gray-600 mb-6">
            <span className="font-semibold text-forest">En moyenne,</span> nos élèves obtiennent leur carte en{" "}
            <span className="font-semibold text-forest">2 à 3 mois</span>
          </p>
          <Button asChild className="btn-primary">
            <Link to="/contact">COMMENCER MON PARCOURS</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
