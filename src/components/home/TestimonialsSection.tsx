import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Mohamed K.",
    role: "Chauffeur VTC",
    content: "Excellente formation ! Les formateurs sont très compétents et à l'écoute. J'ai obtenu ma carte VTC en 2 mois.",
    rating: 5,
    avatar: "MK",
  },
  {
    name: "Sophie M.",
    role: "Chauffeur TAXI",
    content: "Formation intensive mais très bien encadrée. Les mises en situation pratiques m'ont permis d'être prête pour l'examen.",
    rating: 5,
    avatar: "SM",
  },
  {
    name: "Pierre D.",
    role: "Chauffeur VMDTR",
    content: "Excellent centre de formation ! L'équipe est à l'écoute et les cours sont clairs. Je recommande vivement T3P Campus.",
    rating: 5,
    avatar: "PD",
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

const TestimonialsSection = () => {
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
            Ils ont réussi avec T3P Campus
          </h2>
          <p className="text-lg text-warm-gray-600 leading-relaxed">
            Rejoignez les 10 000+ professionnels formés
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="bg-white rounded-2xl p-8 border border-warm-gray-100 shadow-sm hover:shadow-md transition-all duration-250"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-accent text-yellow-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-warm-gray-600 leading-relaxed mb-6 text-lg">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center text-navy font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-warm-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-warm-gray-600">{testimonial.role}</p>
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
