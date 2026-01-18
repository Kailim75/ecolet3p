import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2, Sparkles, Users, Award, TrendingUp } from "lucide-react";

const HeroSection = () => {
  const stats = [
    { icon: Users, value: "5000+", label: "Apprenants formés" },
    { icon: Award, value: "95%", label: "Satisfaction" },
    { icon: TrendingUp, value: "85%", label: "Taux d'insertion" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl floating" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl floating-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl pulse-soft" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="relative container-custom pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 badge-modern mb-8 animate-fade-up">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-white/90">Formation professionnelle certifiante</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-6 animate-fade-up stagger-1 opacity-0 leading-[1.1]">
              Développez vos{" "}
              <span className="text-gradient">compétences</span>{" "}
              avec les experts
            </h1>
            
            <p className="text-lg md:text-xl text-white/75 mb-10 animate-fade-up stagger-2 opacity-0 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Rejoignez T3P Campus et transformez votre carrière grâce à des formations 
              innovantes, pratiques et reconnues par les entreprises.
            </p>

            {/* Features list */}
            <div className="flex flex-wrap gap-4 mb-10 justify-center lg:justify-start animate-fade-up stagger-3 opacity-0">
              {["Formations certifiantes", "Accompagnement personnalisé", "100% finançable"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-white/80">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up stagger-4 opacity-0">
              <Button
                asChild
                size="lg"
                className="btn-accent text-base px-8 py-6 rounded-full font-semibold shadow-glow"
              >
                <Link to="/formations" className="flex items-center gap-2">
                  Découvrir nos formations
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="glass text-white hover:bg-white/20 text-base px-8 py-6 rounded-full font-semibold"
              >
                <Link to="/a-propos" className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Découvrir T3P Campus
                </Link>
              </Button>
            </div>
          </div>

          {/* Right content - Stats cards */}
          <div className="hidden lg:flex flex-col gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`glass rounded-2xl p-6 flex items-center gap-6 animate-slide-in-right opacity-0 stagger-${index + 2}`}
                style={{ marginLeft: `${index * 40}px` }}
              >
                <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center shadow-glow">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
            
            {/* Decorative element */}
            <div className="relative mt-4 ml-20 animate-fade-up stagger-5 opacity-0">
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white/20 bg-gradient-to-br from-accent to-secondary"
                      />
                    ))}
                  </div>
                  <span className="text-white/80 text-sm">+1200 cette année</span>
                </div>
                <p className="text-white font-medium">Nouveaux diplômés</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
