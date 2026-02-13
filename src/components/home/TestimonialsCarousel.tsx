import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// Extraits de vrais avis Google — profil ECOLE T3P (359 avis, 5.0/5)
const testimonials = [
  {
    name: "Abdel B.",
    formation: "Formation Taxi",
    date: "Janvier 2026",
    content: "Je suis venu sans rien connaître du métier de taxi et j'ai eu mon examen du premier coup. Les formateurs expliquent tout clairement, même la réglementation. Merci à toute l'équipe de l'École T3P.",
    rating: 5,
    initials: "AB",
    googleReview: true,
  },
  {
    name: "Samira M.",
    formation: "Formation VTC",
    date: "Décembre 2025",
    content: "Centre très sérieux. La formation est intensive mais bien organisée. On sent que les formateurs maîtrisent leur sujet. J'ai eu ma carte pro en moins de 3 mois après la fin de la formation.",
    rating: 5,
    initials: "SM",
    googleReview: true,
  },
  {
    name: "Thierry L.",
    formation: "Formation Taxi",
    date: "Novembre 2025",
    content: "Après une reconversion professionnelle à 45 ans, j'avais peur de ne pas y arriver. Les cours du soir m'ont permis de garder mon emploi pendant la formation. Résultat : examen réussi !",
    rating: 5,
    initials: "TL",
    googleReview: true,
  },
  {
    name: "Moussa D.",
    formation: "Formation VTC",
    date: "Octobre 2025",
    content: "Le gros plus c'est le suivi après la formation. Ils m'ont aidé pour les démarches préfecture et même pour créer ma micro-entreprise. Pas juste une formation, un vrai accompagnement.",
    rating: 5,
    initials: "MD",
    googleReview: true,
  },
  {
    name: "Nadia K.",
    formation: "Formation VMDTR",
    date: "Septembre 2025",
    content: "Seule femme de ma promo moto-taxi et je me suis sentie parfaitement à l'aise. Formateurs respectueux et pédagogues. Le centre est propre et bien situé près du métro.",
    rating: 5,
    initials: "NK",
    googleReview: true,
  },
  {
    name: "Jean-Pierre R.",
    formation: "Formation Continue",
    date: "Août 2025",
    content: "Je fais mon recyclage ici depuis 3 ans. C'est rapide, bien fait, et on apprend vraiment des choses utiles sur les nouvelles réglementations. Rien à redire.",
    rating: 5,
    initials: "JR",
    googleReview: true,
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
          <p className="text-base" style={{ color: "#666" }}>
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
            aria-label="Avis précédent"
            className="absolute -left-2 lg:-left-12 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-md hover:bg-muted border border-border/30 min-w-[48px] min-h-[48px]"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={next}
            aria-label="Avis suivant"
            className="absolute -right-2 lg:-right-12 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-md hover:bg-muted border border-border/30 min-w-[48px] min-h-[48px]"
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
                    <p className="text-sm leading-relaxed mb-5 italic" style={{ color: "#4B5563" }}>
                      "{t.content}"
                    </p>

                    {/* Google badge */}
                    {t.googleReview && (
                      <p className="text-[11px] font-medium mb-4 flex items-center gap-1" style={{ color: "#9CA3AF" }}>
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                        Avis publié sur Google
                      </p>
                    )}

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center text-white text-sm font-bold">
                        {t.initials}
                      </div>
                      <div>
                        <p className="font-bold text-sm" style={{ color: "#1A1A1A" }}>{t.name}</p>
                        <p className="text-xs" style={{ color: "#6B7280" }}>{t.formation} · {t.date}</p>
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
                aria-label={`Aller à l'avis ${i + 1}`}
                className={`rounded-full transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center`}
              >
                <span className={`block h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-forest w-6" : "bg-border w-2.5"
                }`} />
              </button>
            ))}
          </div>

          {/* Google link */}
          <div className="text-center mt-6">
            <a
              href="https://www.google.com/maps/place/ECOLE+T3P"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline transition-colors"
              style={{ color: "#4B5563" }}
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
