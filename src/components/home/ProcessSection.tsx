import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    emoji: "✍️",
    title: "Inscription",
    description: "Prenez rendez-vous dans notre centre. Nous étudions ensemble votre projet.",
  },
  {
    number: "2",
    emoji: "📖",
    title: "Formation Théorique",
    description: "10 jours de formation intensive avec nos formateurs experts.",
  },
  {
    number: "3",
    emoji: "🚗",
    title: "Formation Pratique",
    description: "Mises en situation réelles pour vous préparer au métier.",
  },
  {
    number: "4",
    emoji: "🎓",
    title: "Examen & Carte Pro",
    description: "Passez l'examen et obtenez votre carte professionnelle.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

const ProcessSection = () => {
  return (
    <section className="section-padding section-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-warm-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-warm-gray-600 leading-relaxed">
            4 étapes simples pour obtenir votre carte professionnelle
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={stepVariants}
              className="relative"
            >
              {/* Connector line (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-warm-gray-200" />
              )}

              <div className="bg-white rounded-2xl p-6 border border-warm-gray-100 shadow-sm hover:shadow-md hover:border-orange/20 transition-all duration-250 relative z-10">
                {/* Number badge */}
                <div className="absolute -top-3 left-6 w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center font-bold text-sm">
                  {step.number}
                </div>

                {/* Emoji */}
                <div className="text-4xl mb-4 mt-2">{step.emoji}</div>

                {/* Title */}
                <h3 className="text-xl font-bold text-warm-gray-900 mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-warm-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-green-success/10 text-green-success font-medium px-5 py-2.5 rounded-full text-sm mb-6">
            <span>⏱️</span>
            En moyenne, nos élèves obtiennent leur carte en 2 à 3 mois
          </div>
          <div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button asChild className="btn-primary-lg">
                <Link to="/contact" className="flex items-center gap-2">
                  Commencer mon parcours
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
