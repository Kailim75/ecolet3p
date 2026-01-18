import { Star, Quote, Shield } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Mohamed K.",
    role: "Chauffeur VTC",
    year: "Promotion 2024",
    content: "Excellente formation ! Les formateurs sont très compétents et à l'écoute. J'ai obtenu ma carte VTC en 2 mois grâce à leur accompagnement personnalisé.",
    rating: 5,
    avatar: "MK",
    color: "from-blue-600 to-blue-500",
  },
  {
    name: "Sophie M.",
    role: "Chauffeur TAXI",
    year: "Promotion 2024",
    content: "Formation intensive mais très bien encadrée. J'ai particulièrement apprécié les mises en situation pratiques qui m'ont permis d'être prête pour l'examen.",
    rating: 5,
    avatar: "SM",
    color: "from-purple-600 to-purple-500",
  },
  {
    name: "Pierre D.",
    role: "Chauffeur VMDTR",
    year: "Promotion 2023",
    content: "Excellent centre de formation ! L'équipe est à l'écoute et les cours sont clairs. Je recommande vivement T3P Campus pour tous ceux qui veulent devenir chauffeur professionnel.",
    rating: 5,
    avatar: "PD",
    color: "from-emerald-500 to-emerald-400",
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

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
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

const TestimonialsSection = () => {
  return (
    <section className="section-padding section-light relative overflow-hidden">
      {/* Background decoration */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl"
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
            className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 rounded-full px-4 py-2 text-sm font-semibold mb-6"
          >
            <Star className="w-4 h-4 fill-current" />
            Témoignages
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Ils Ont Réussi Grâce à{" "}
            <span className="text-gradient-blue">T3P Campus</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Rejoignez les milliers d'élèves qui ont transformé leur vie professionnelle
          </p>

          {/* Trust badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-8"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 shadow-sm"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <span className="font-semibold text-gray-900">4.9/5</span>
              <span className="text-gray-500">sur Google</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 shadow-sm"
            >
              <Shield className="w-4 h-4 text-green-500" />
              <span className="font-semibold text-gray-900">Certifié Qualiopi</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Quote icon */}
              <motion.div 
                initial={{ rotate: 12 }}
                whileHover={{ rotate: 0, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="absolute -top-4 -right-2 w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center shadow-lg"
              >
                <Quote className="w-6 h-6 text-white" />
              </motion.div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.3 }}
                  >
                    <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                  </motion.div>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                >
                  {testimonial.avatar}
                </motion.div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {testimonial.role} • {testimonial.year}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
