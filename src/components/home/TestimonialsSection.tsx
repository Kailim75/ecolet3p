import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Mohamed K.",
    role: "Chauffeur VTC",
    content: "Excellente formation ! Les formateurs sont très compétents. J'ai obtenu ma carte VTC en 2 mois.",
    rating: 5,
    initials: "MK",
  },
  {
    name: "Sophie L.",
    role: "Chauffeur TAXI",
    content: "Je recommande T3P Campus à 100%. L'accompagnement est top. Réussite au premier passage !",
    rating: 5,
    initials: "SL",
  },
  {
    name: "Alexandre D.",
    role: "Chauffeur VTC",
    content: "Le paiement en 4 fois m'a permis de suivre la formation sereinement. Merci à toute l'équipe.",
    rating: 5,
    initials: "AD",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding gradient-warm">
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
            ILS ONT RÉUSSI AVEC <span className="text-gold">T3P CAMPUS</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Rejoignez les 10 000+ professionnels formés
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-livementor"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>

              {/* Content */}
              <p className="text-warm-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-forest flex items-center justify-center text-cream font-bold">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-bold text-forest">{testimonial.name}</p>
                  <p className="text-sm text-warm-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
