import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Mohamed K.",
    formation: "Formation VTC",
    content: "Excellente formation ! Les formateurs sont très compétents et connaissent le terrain. J'ai obtenu ma carte VTC en 2 mois. Je recommande à 100%.",
    rating: 5,
    initials: "MK",
    link: "/formations/vtc",
  },
  {
    name: "Sophie L.",
    formation: "Formation Taxi",
    content: "Je recommande ECOLE T3P à 100%. L'accompagnement est top du début à la fin. Réussite au premier passage grâce à une préparation solide !",
    rating: 5,
    initials: "SL",
    link: "/formations/taxi",
  },
  {
    name: "Alexandre D.",
    formation: "Formation VTC",
    content: "Le paiement en 4 fois m'a permis de suivre la formation sereinement. Les cours sont clairs, les formateurs patients. Merci à toute l'équipe !",
    rating: 5,
    initials: "AD",
    link: "/formations/vtc",
  },
  {
    name: "Fatima R.",
    formation: "Formation VTC",
    content: "L'accompagnement pour créer mon entreprise a été précieux. Les formateurs m'ont guidée pas à pas. Je suis aujourd'hui à mon compte avec une activité florissante.",
    rating: 5,
    initials: "FR",
    link: "/formations/vtc",
  },
  {
    name: "Marc D.",
    formation: "Formation Taxi",
    content: "Formation très complète. Les formateurs connaissent parfaitement le métier et transmettent leur passion. J'ai obtenu ma carte professionnelle du premier coup !",
    rating: 5,
    initials: "MD",
    link: "/formations/taxi",
  },
  {
    name: "Julien M.",
    formation: "Formation VMDTR",
    content: "J'étais motard depuis 10 ans mais la formation m'a appris toutes les spécificités du transport de passagers. Les formateurs sont passionnés. Top !",
    rating: 5,
    initials: "JM",
    link: "/formations/vmdtr",
  },
];

const TestimonialsCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance every 5s
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 120 : -120, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -120 : 120, opacity: 0 }),
  };

  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">
            Ils ont réussi avec <span className="text-primary">ECOLE T3P</span>
          </h2>
          <p className="text-muted-foreground">
            5.0/5 sur Google — 359 avis vérifiés
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto relative">
          {/* Arrows */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prev}
            className="absolute -left-4 lg:-left-14 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background shadow-md hover:bg-muted"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={next}
            className="absolute -right-4 lg:-right-14 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background shadow-md hover:bg-muted"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Card */}
          <div className="overflow-hidden min-h-[260px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full bg-card rounded-2xl p-8 shadow-lg border"
              >
                <Quote className="h-8 w-8 text-primary/20 mb-4" />

                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#D4A017] text-[#D4A017]" />
                  ))}
                </div>

                <p className="text-foreground text-lg leading-relaxed mb-6 italic">
                  "{t.content}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{t.name}</p>
                      <Link
                        to={t.link}
                        className="text-sm text-primary hover:underline"
                      >
                        {t.formation}
                      </Link>
                    </div>
                  </div>
                  {/* Google badge */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <svg viewBox="0 0 24 24" className="w-4 h-4">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Avis Google
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === current ? "bg-primary w-6" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
