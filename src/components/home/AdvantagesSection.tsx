import { motion } from "framer-motion";

const advantages = [
  { value: "96%", title: "De Réussite", description: "Notre taux de réussite aux examens TAXI et VTC." },
  { value: "10 000+", title: "Élèves Formés", description: "Depuis 2014, nous accompagnons les futurs chauffeurs." },
  { value: "10 ans", title: "D'Expérience", description: "Une décennie d'expertise dans la formation." },
  { value: "4x", title: "Paiement Sans Frais", description: "Facilitez votre formation avec le paiement en plusieurs fois." },
];

const AdvantagesSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-custom">
        {/* Header - LiveMentor style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">
            NOUS AVONS ACCOMPAGNÉ + DE{" "}
            <span className="text-gold">10 000 PROJETS</span>
          </h2>
          <p className="section-subtitle mx-auto">
            En 10 ans, nous avons appris qu'obtenir sa carte professionnelle demande une méthode. 
            Voici la « Méthode T3P Campus ».
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-livementor text-center group"
            >
              {/* Large Number */}
              <div className="mb-4">
                <span className="stat-number group-hover:text-gold transition-colors duration-300">
                  {adv.value}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-forest mb-2">
                {adv.title}
              </h3>

              {/* Description */}
              <p className="text-warm-gray-600 text-sm leading-relaxed">
                {adv.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
