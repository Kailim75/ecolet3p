import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

const CTASection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="relative rounded-2xl overflow-hidden gradient-hero p-8 md:p-12 lg:p-16">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Prêt à démarrer votre nouvelle <span className="text-accent">carrière</span> ?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Contactez-nous dès aujourd'hui pour discuter de votre projet de formation. 
              Notre équipe vous accompagne de A à Z dans votre reconversion professionnelle.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
                <a href="tel:0188750555" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  01 88 75 05 55
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
