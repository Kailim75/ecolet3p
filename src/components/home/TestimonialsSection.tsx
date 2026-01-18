import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Marie Dupont",
    role: "Développeuse Web",
    company: "TechCorp",
    content: "Grâce à T3P Campus, j'ai pu me reconvertir dans le développement web. La qualité de l'enseignement et l'accompagnement personnalisé m'ont permis de décrocher mon premier emploi en seulement 3 mois après la formation !",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Thomas Martin",
    role: "Chef de Projet",
    company: "Innovate SA",
    content: "La formation en gestion de projet Agile a transformé ma façon de travailler. Les formateurs sont exceptionnels, les méthodes très pratiques et directement applicables. Je recommande à 100% !",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Sophie Bernard",
    role: "Responsable Marketing",
    company: "Digital Agency",
    content: "Une expérience incroyable ! Le contenu est actualisé et correspond parfaitement aux besoins du marché. L'équipe pédagogique est à l'écoute et vraiment investie dans notre réussite.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-dark" />
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />

      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            <Star className="w-4 h-4 fill-accent" />
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ce que disent nos{" "}
            <span className="text-gradient">anciens élèves</span>
          </h2>
          <p className="text-lg text-white/70">
            Découvrez les témoignages de ceux qui ont transformé leur carrière avec nous.
          </p>
        </div>

        {/* Main testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 relative animate-scale-in">
            {/* Quote icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 rounded-xl gradient-accent flex items-center justify-center shadow-glow">
              <Quote className="w-6 h-6 text-white" />
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Image */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-white/10">
                    <img
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                    <Star className="w-5 h-5 fill-white text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Rating */}
                <div className="flex gap-1 mb-4 justify-center md:justify-start">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
                  "{testimonials[activeIndex].content}"
                </p>

                <div>
                  <p className="font-bold text-white text-lg">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-white/60">
                    {testimonials[activeIndex].role} • {testimonials[activeIndex].company}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full glass text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "w-8 bg-accent"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full glass text-white hover:bg-white/20"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
