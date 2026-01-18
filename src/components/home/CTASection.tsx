import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, CheckCircle2 } from "lucide-react";

const CTASection = () => {
  const benefits = [
    "Conseiller dédié à votre écoute",
    "Étude personnalisée de votre projet",
    "Réponse sous 24h garantie",
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom relative">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 gradient-primary" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent" />
          
          {/* Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }} />

          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-secondary/30 rounded-full blur-3xl translate-y-1/2" />

          <div className="relative px-8 py-16 md:px-16 md:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  Prêt à donner un nouvel élan à votre{" "}
                  <span className="text-gradient-light">carrière</span> ?
                </h2>
                <p className="text-lg text-white/80 mb-8 leading-relaxed">
                  Contactez-nous dès aujourd'hui pour discuter de votre projet de formation. 
                  Nos conseillers experts sont à votre écoute pour vous orienter vers le parcours idéal.
                </p>

                {/* Benefits */}
                <div className="space-y-3 mb-10">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3 text-white/90">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="btn-accent text-base px-8 py-6 rounded-full font-semibold shadow-glow"
                  >
                    <Link to="/contact" className="flex items-center gap-2">
                      Demander un rendez-vous
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="glass text-white hover:bg-white/20 text-base px-8 py-6 rounded-full font-semibold"
                  >
                    <a href="tel:+33123456789" className="flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      01 23 45 67 89
                    </a>
                  </Button>
                </div>
              </div>

              {/* Contact card */}
              <div className="hidden lg:block">
                <div className="glass-light rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Contact rapide
                  </h3>
                  
                  <div className="space-y-4">
                    <a
                      href="tel:+33123456789"
                      className="flex items-center gap-4 p-4 rounded-xl bg-background hover:bg-muted transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-primary">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Téléphone</p>
                        <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                          +33 1 23 45 67 89
                        </p>
                      </div>
                    </a>

                    <a
                      href="mailto:contact@t3pcampus.fr"
                      className="flex items-center gap-4 p-4 rounded-xl bg-background hover:bg-muted transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center shadow-glow">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                          contact@t3pcampus.fr
                        </p>
                      </div>
                    </a>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground text-center">
                      Nos conseillers sont disponibles du lundi au vendredi, de 9h à 18h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
