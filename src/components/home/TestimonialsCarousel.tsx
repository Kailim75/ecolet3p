import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Mohamed K.",
    formation: "Formation VTC",
    date: "Décembre 2025",
    content: "Excellente formation ! Les formateurs sont très compétents et connaissent le terrain. J'ai obtenu ma carte VTC en 2 mois. Je recommande à 100%.",
    rating: 5,
    initials: "MK",
  },
  {
    name: "Sophie L.",
    formation: "Formation Taxi",
    date: "Novembre 2025",
    content: "Je recommande ECOLE T3P à 100%. L'accompagnement est top du début à la fin. Réussite au premier passage grâce à une préparation solide !",
    rating: 5,
    initials: "SL",
  },
  {
    name: "Alexandre D.",
    formation: "Formation VTC",
    date: "Octobre 2025",
    content: "Le paiement en 4 fois m'a permis de suivre la formation sereinement. Les cours sont clairs, les formateurs patients. Merci à toute l'équipe !",
    rating: 5,
    initials: "AD",
  },
  {
    name: "Fatima R.",
    formation: "Formation VTC",
    date: "Septembre 2025",
    content: "L'accompagnement pour créer mon entreprise a été précieux. Les formateurs m'ont guidée pas à pas. Je suis aujourd'hui à mon compte.",
    rating: 5,
    initials: "FR",
  },
  {
    name: "Marc D.",
    formation: "Formation Taxi",
    date: "Août 2025",
    content: "Formation très complète. Les formateurs connaissent parfaitement le métier et transmettent leur passion. Carte professionnelle du premier coup !",
    rating: 5,
    initials: "MD",
  },
  {
    name: "Julien M.",
    formation: "Formation VMDTR",
    date: "Juillet 2025",
    content: "J'étais motard depuis 10 ans mais la formation m'a appris toutes les spécificités du transport de passagers. Les formateurs sont passionnés. Top !",
    rating: 5,
    initials: "JM",
  },
];

const TestimonialsCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const getVisibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(testimonials[(current + i) % testimonials.length]);
    }
    return result;
  };

  const visible = getVisibleTestimonials();

  return (
    <section className="py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Giant quotation marks background */}
      <div className="absolute top-8 left-8 text-[300px] leading-none font-serif pointer-events-none select-none" style={{ color: "rgba(0,0,0,0.03)" }}>"</div>
      <div className="absolute bottom-0 right-8 text-[300px] leading-none font-serif pointer-events-none select-none" style={{ color: "rgba(0,0,0,0.03)" }}>"</div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-[28px] md:text-[36px] font-extrabold mb-3" style={{ color: "#1A1A1A" }}>
            Ils nous ont fait confiance
          </h2>
          <p className="text-base" style={{ color: "#777" }}>
            5.0/5 sur Google — 359 avis vérifiés
          </p>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Arrows */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prev}
            className="absolute -left-2 lg:-left-12 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-md hover:bg-muted border border-border/30"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={next}
            className="absolute -right-2 lg:-right-12 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-md hover:bg-muted border border-border/30"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Cards grid */}
          <div className="overflow-hidden px-6">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {visible.map((t, i) => (
                  <div
                    key={`${t.name}-${i}`}
                    className={`bg-white rounded-xl p-6 border border-border/30 ${i > 0 ? "hidden md:block" : ""}`}
                    style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                  >
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-[#FBBC05] text-[#FBBC05]" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-sm leading-relaxed mb-5 italic" style={{ color: "#555" }}>
                      "{t.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center text-white text-sm font-bold">
                        {t.initials}
                      </div>
                      <div>
                        <p className="font-bold text-sm" style={{ color: "#1A1A1A" }}>{t.name}</p>
                        <p className="text-xs" style={{ color: "#999" }}>{t.formation} · {t.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-forest w-6" : "bg-border w-2.5"
                }`}
              />
            ))}
          </div>

          {/* Google link */}
          <div className="text-center mt-6">
            <a
              href="https://www.google.com/maps/place/ECOLE+T3P"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline transition-colors"
              style={{ color: "#777" }}
            >
              Voir les 359 avis sur Google <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
