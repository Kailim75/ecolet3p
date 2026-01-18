import { Trophy, BookOpen, GraduationCap, CreditCard, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const advantages = [
  {
    icon: Trophy,
    value: "96%",
    title: "de Réussite",
    description: "Notre taux de réussite aux examens TAXI et VTC. Votre succès est notre priorité absolue.",
    stat: "96% de nos élèves réussissent du premier coup",
    color: "from-orange-500 to-orange-400",
  },
  {
    icon: BookOpen,
    value: "10+",
    title: "Ans d'Expérience",
    description: "Une décennie d'expertise dans la formation de chauffeurs professionnels.",
    stat: "Depuis 2014, nous formons l'excellence",
    color: "from-blue-600 to-blue-500",
  },
  {
    icon: GraduationCap,
    value: "10K+",
    title: "Élèves Formés",
    description: "Plus de 10 000 chauffeurs professionnels formés et certifiés.",
    stat: "Une communauté de professionnels",
    color: "from-emerald-500 to-emerald-400",
  },
  {
    icon: CreditCard,
    value: "4x",
    title: "Paiement Sans Frais",
    description: "Facilitez votre formation avec un paiement échelonné sans frais supplémentaires.",
    stat: "Accessibilité garantie pour tous",
    color: "from-purple-600 to-purple-500",
  },
  {
    icon: Clock,
    value: "3",
    title: "Formats Flexibles",
    description: "Présentiel, à distance ou cours du soir. Adaptez votre formation à votre rythme.",
    stat: "La flexibilité au service de votre projet",
    color: "from-pink-500 to-pink-400",
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
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

const AdvantagesSection = () => {
  return (
    <section className="section-padding section-blue relative overflow-hidden">
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Decorative gradient orbs */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
      />

      <div className="container-custom relative">
        {/* Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 rounded-full px-4 py-2 text-sm font-semibold mb-6"
          >
            <TrendingUp className="w-4 h-4" />
            Nos engagements
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Pourquoi <span className="text-orange-400">10 000 élèves</span><br />
            nous font confiance ?
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            L'excellence dans la formation professionnelle depuis 2014
          </p>
        </motion.div>

        {/* Grid - First row of 3 */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
        >
          {advantages.slice(0, 3).map((advantage) => (
            <motion.div
              key={advantage.title}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${advantage.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />
              
              <div className="relative">
                {/* Icon with gradient */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${advantage.color} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <advantage.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Value + Title */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-4xl font-black text-white">{advantage.value}</span>
                  <span className="text-xl font-bold text-white/80">{advantage.title}</span>
                </div>

                {/* Description */}
                <p className="text-white/60 leading-relaxed mb-4">
                  {advantage.description}
                </p>

                {/* Stat line */}
                <div className="flex items-center gap-2 text-sm">
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${advantage.color}`} />
                  <span className="text-white/50 font-medium">{advantage.stat}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Grid - Second row of 2, centered */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {advantages.slice(3, 5).map((advantage) => (
            <motion.div
              key={advantage.title}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${advantage.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />
              
              <div className="relative">
                {/* Icon with gradient */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${advantage.color} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <advantage.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Value + Title */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-4xl font-black text-white">{advantage.value}</span>
                  <span className="text-xl font-bold text-white/80">{advantage.title}</span>
                </div>

                {/* Description */}
                <p className="text-white/60 leading-relaxed mb-4">
                  {advantage.description}
                </p>

                {/* Stat line */}
                <div className="flex items-center gap-2 text-sm">
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${advantage.color}`} />
                  <span className="text-white/50 font-medium">{advantage.stat}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
