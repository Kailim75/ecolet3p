import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Calendar, Users, CreditCard } from "lucide-react";

const stats = [
  { icon: Trophy, value: "96%", label: "Taux de réussite" },
  { icon: Calendar, value: "10 ans", label: "D'expérience" },
  { icon: Users, value: "10 000+", label: "Apprenants formés" },
  { icon: CreditCard, value: "4x", label: "Paiement sans frais" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&h=1080&fit=crop')"
        }}
      />
      
      {/* Content */}
      <div className="container-custom relative z-10 py-32 md:py-40">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 animate-fade-up">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm text-white/90 font-medium">
              Centre agréé • Certifications RS5635 & RS5637
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-up stagger-1">
            Devenez Chauffeur Professionnel{" "}
            <span className="text-accent">TAXI / VTC / VMDTR</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl animate-fade-up stagger-2">
            Formez-vous avec T3P Campus, le centre de référence à Montrouge. 
            Plus de 10 000 chauffeurs formés avec un taux de réussite exceptionnel de 96%.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-up stagger-3">
            <Button
              asChild
              size="lg"
              className="btn-accent text-base px-8 py-6 rounded-lg"
            >
              <Link to="/contact" className="flex items-center gap-2">
                Prendre rendez-vous
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-base px-8 py-6 rounded-lg"
            >
              <Link to="/formations">
                Voir nos formations
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up stagger-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center"
              >
                <stat.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
