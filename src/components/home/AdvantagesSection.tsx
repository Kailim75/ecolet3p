import { motion, type Easing } from "framer-motion";

const smoothEase: Easing = [0.22, 1, 0.36, 1];

const advantages = [
  { value: "96%", title: "De Réussite", description: "Notre taux de réussite aux examens TAXI et VTC." },
  { value: "10 000+", title: "Élèves Formés", description: "Depuis 2014, nous accompagnons les futurs chauffeurs." },
  { value: "10 ans", title: "D'Expérience", description: "Une décennie d'expertise dans la formation." },
  { value: "4x", title: "Paiement Sans Frais", description: "Facilitez votre formation avec le paiement en plusieurs fois." },
];

const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: smoothEase }
  }
};

const AdvantagesSection = () => {
  return (
    <section className="section-padding bg-card overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="section-title mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            NOUS AVONS ACCOMPAGNÉ + DE{" "}
            <motion.span 
              className="text-gold"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
            >
              10 000 PROJETS
            </motion.span>
          </motion.h2>
          <motion.p 
            className="section-subtitle mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            En 10 ans, nous avons appris qu'obtenir sa carte professionnelle demande une méthode.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.title}
              variants={staggerItemVariants}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(27, 77, 62, 0.15)" }}
              className="card-livementor text-center group cursor-pointer"
            >
              <motion.div 
                className="mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.span 
                  className="stat-number group-hover:text-gold transition-colors duration-300"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, type: "spring", stiffness: 200 }}
                >
                  {adv.value}
                </motion.span>
              </motion.div>
              <h3 className="text-lg font-bold text-forest mb-2">{adv.title}</h3>
              <p className="text-warm-gray-600 text-sm leading-relaxed">{adv.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
