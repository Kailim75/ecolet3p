import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Easing } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const smoothEase: Easing = [0.22, 1, 0.36, 1];

const testimonials = [
  { name: "Mohamed K.", role: "Chauffeur VTC", content: "Excellente formation ! Les formateurs sont très compétents. J'ai obtenu ma carte VTC en 2 mois.", rating: 5, initials: "MK", formation: "vtc" },
  { name: "Sophie L.", role: "Chauffeur TAXI", content: "Je recommande ECOLE T3P à 100%. L'accompagnement est top. Réussite au premier passage !", rating: 5, initials: "SL", formation: "taxi" },
  { name: "Alexandre D.", role: "Chauffeur VTC", content: "Le paiement en 4 fois m'a permis de suivre la formation sereinement. Merci à toute l'équipe.", rating: 5, initials: "AD", formation: "vtc" },
  { name: "Fatima R.", role: "Auto-entrepreneuse VTC", content: "L'accompagnement pour créer mon entreprise a été précieux. Je suis aujourd'hui à mon compte avec une activité florissante.", rating: 5, initials: "FR", formation: "vtc" },
  { name: "Marc D.", role: "Chauffeur Taxi depuis 2024", content: "Formation très complète. Les formateurs connaissent parfaitement le métier et transmettent leur passion. J'ai obtenu ma carte professionnelle du premier coup !", rating: 5, initials: "MD", formation: "taxi" },
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
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9]);

  return (
    <section ref={containerRef} className="section-padding gradient-warm overflow-hidden relative">
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: y1, scale }}
        className="absolute -top-20 right-1/4 w-72 h-72 bg-gold/15 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-1/2 -left-20 w-64 h-64 bg-forest/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ y: y3 }}
        className="absolute -bottom-32 right-10 w-56 h-56 bg-gold/10 rounded-full blur-2xl pointer-events-none"
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">ILS ONT RÉUSSI AVEC <span className="text-gold">ECOLE T3P</span></h2>
          <p className="section-subtitle mx-auto">Rejoignez les 2 000+ professionnels formés depuis 2014</p>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.slice(0, 3).map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              variants={staggerItemVariants}
              whileHover={{ 
                y: -12, 
                boxShadow: "0 30px 60px rgba(27, 77, 62, 0.15)",
                borderColor: "rgba(212, 168, 83, 0.5)"
              }}
              whileTap={{ scale: 0.98, y: -6 }}
              className="card-livementor cursor-pointer"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>

              <motion.p 
                className="text-foreground leading-relaxed mb-6 italic"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              >
                "{testimonial.content}"
              </motion.p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-forest flex items-center justify-center text-cream font-bold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-bold text-forest">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                {/* Internal link to formation */}
                <Link 
                  to={`/formations/${testimonial.formation}`}
                  className="text-xs font-semibold text-gold hover:text-gold-dark transition-colors flex items-center gap-1"
                >
                  Voir la formation
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional testimonials row */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto"
        >
          {testimonials.slice(3).map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              variants={staggerItemVariants}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 20px 40px rgba(27, 77, 62, 0.12)",
              }}
              className="card-livementor cursor-pointer"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              <p className="text-foreground leading-relaxed mb-4 italic text-sm">
                "{testimonial.content}"
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center text-cream font-bold text-sm">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-forest text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <Link 
                  to={`/formations/${testimonial.formation}`}
                  className="text-xs font-semibold text-gold hover:text-gold-dark transition-colors flex items-center gap-1"
                >
                  Voir
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
