import { motion } from "framer-motion";
import { Gift, ArrowRight, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { parrainage } from "@/data/offreCatalogueData";

const ParrainageSection = () => {
  return (
    <section id="parrainage" className="py-16 md:py-20 scroll-mt-14" style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.85) 100%)" }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Gift className="w-4 h-4" />
            Programme Parrainage
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            {parrainage.title}
          </h2>
          <p className="text-xl text-white/80 mb-10">
            {parrainage.subtitle}
          </p>

          {/* Avantages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <Users className="w-8 h-8 text-white/80 mx-auto mb-3" />
              <p className="text-lg font-black text-white mb-1">100€</p>
              <p className="text-sm text-white/70">pour le parrain</p>
              <p className="text-xs text-white/50 mt-2">{parrainage.avantages.parrain}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <Heart className="w-8 h-8 text-white/80 mx-auto mb-3" />
              <p className="text-lg font-black text-white mb-1">50€</p>
              <p className="text-sm text-white/70">pour le filleul</p>
              <p className="text-xs text-white/50 mt-2">{parrainage.avantages.filleul}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <Gift className="w-8 h-8 text-white/80 mx-auto mb-3" />
              <p className="text-lg font-black text-white mb-1">Illimité</p>
              <p className="text-sm text-white/70">cumulable</p>
              <p className="text-xs text-white/50 mt-2">{parrainage.avantages.illimite}</p>
            </div>
          </div>

          {/* Étapes */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
            {parrainage.etapes.map((etape, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold text-white shrink-0">
                  {i + 1}
                </span>
                <p className="text-sm text-white/80 text-left">{etape}</p>
                {i < parrainage.etapes.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-white/40 hidden md:block shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <Button
            asChild
            size="lg"
            className="font-bold text-base bg-white text-primary hover:bg-white/90"
          >
            <a href={parrainage.whatsappUrl} target="_blank" rel="noopener noreferrer">
              Parrainer un proche <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ParrainageSection;
