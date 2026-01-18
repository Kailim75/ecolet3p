import { Trophy, BookOpen, GraduationCap, CreditCard, Clock } from "lucide-react";
import { motion } from "framer-motion";

const advantages = [
  {
    icon: Trophy,
    value: "96%",
    title: "De Réussite",
    description: "Notre taux de réussite aux examens TAXI et VTC. Votre succès est notre priorité.",
  },
  {
    icon: BookOpen,
    value: "10+",
    title: "Ans d'Expérience",
    description: "Une décennie d'expertise dans la formation de chauffeurs professionnels.",
  },
  {
    icon: GraduationCap,
    value: "10K+",
    title: "Élèves Formés",
    description: "Plus de 10 000 chauffeurs professionnels formés et certifiés.",
  },
  {
    icon: CreditCard,
    value: "4x",
    title: "Sans Frais",
    description: "Paiement en 4 fois sans frais pour faciliter votre formation.",
  },
  {
    icon: Clock,
    value: "3",
    title: "Formats Flexibles",
    description: "Présentiel, à distance ou cours du soir selon vos disponibilités.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

const AdvantagesSection = () => {
  return (
    <section className="section-padding section-cream">
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
            Pourquoi choisir T3P Campus ?
          </h2>
          <p className="text-lg text-warm-gray-600 leading-relaxed">
            L'accompagnement qui fait la différence
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {advantages.map((advantage) => (
            <motion.div
              key={advantage.title}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="bg-white rounded-2xl p-6 border border-warm-gray-100 shadow-sm hover:shadow-md hover:border-orange/20 transition-all duration-250 text-center"
            >
              {/* Icon */}
              <motion.div 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.25 }}
                className="icon-container mx-auto mb-4"
              >
                <advantage.icon className="w-6 h-6" />
              </motion.div>

              {/* Value */}
              <div className="text-3xl font-bold text-navy mb-1">{advantage.value}</div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-warm-gray-900 mb-2">
                {advantage.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-warm-gray-600 leading-relaxed">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
