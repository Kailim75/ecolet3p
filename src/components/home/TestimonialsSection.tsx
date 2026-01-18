import { motion, type Easing } from "framer-motion";
import { Star } from "lucide-react";

const smoothEase: Easing = [0.22, 1, 0.36, 1];

const testimonials = [
  { name: "Mohamed K.", role: "Chauffeur VTC", content: "Excellente formation ! Les formateurs sont très compétents. J'ai obtenu ma carte VTC en 2 mois.", rating: 5, initials: "MK" },
  { name: "Sophie L.", role: "Chauffeur TAXI", content: "Je recommande T3P Campus à 100%. L'accompagnement est top. Réussite au premier passage !", rating: 5, initials: "SL" },
  { name: "Alexandre D.", role: "Chauffeur VTC", content: "Le paiement en 4 fois m'a permis de suivre la formation sereinement. Merci à toute l'équipe.", rating: 5, initials: "AD" },
];

const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } }
};

const TestimonialsSection = () => {
  return (
    <section className="section-padding gradient-warm overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">ILS ONT RÉUSSI AVEC <span className="text-gold">T3P CAMPUS</span></h2>
          <p className="section-subtitle mx-auto">Rejoignez les 10 000+ professionnels formés</p>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              variants={staggerItemVariants}
              whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(27, 77, 62, 0.12)" }}
              className="card-livementor cursor-pointer"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 + j * 0.05, type: "spring", stiffness: 400 }}
                  >
                    <Star className="w-5 h-5 fill-gold text-gold" />
                  </motion.div>
                ))}
              </div>

              <motion.p 
                className="text-warm-gray-700 leading-relaxed mb-6 italic"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              >
                "{testimonial.content}"
              </motion.p>

              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <motion.div 
                  className="w-12 h-12 rounded-full bg-forest flex items-center justify-center text-cream font-bold"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {testimonial.initials}
                </motion.div>
                <div>
                  <p className="font-bold text-forest">{testimonial.name}</p>
                  <p className="text-sm text-warm-gray-500">{testimonial.role}</p>
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
