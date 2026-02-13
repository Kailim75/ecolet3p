import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Easing } from "framer-motion";
import { ArrowRight, Car, Shield, FileText, Package, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import PrefetchLink from "@/components/ui/PrefetchLink";
import AlmaLogo from "@/components/logo/AlmaLogo";
import { useQuoteModal } from "@/components/quote/QuoteRequestModal";

const smoothEase: Easing = [0.22, 1, 0.36, 1];

const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: smoothEase } }
};

const OffersSection = () => {
  const containerRef = useRef(null);
  const { openQuoteModal } = useQuoteModal();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <section ref={containerRef} className="section-padding gradient-warm overflow-hidden relative">
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute -top-32 left-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-1/3 -right-20 w-64 h-64 bg-forest/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">Nos Offres de Formation</h2>
          <p className="section-subtitle mx-auto">
            Formations initiales, packs combinés et programme parrainage
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12"
        >
          {/* Card 1: Formation T3P principale */}
          <motion.div
            variants={staggerItemVariants}
            whileHover={{ y: -8, boxShadow: "0 24px 50px rgba(212, 168, 83, 0.2)" }}
            className="relative bg-card rounded-2xl p-6 md:p-8 border border-gold/40 ring-2 ring-gold/20 bg-gradient-to-br from-cream to-gold/5 lg:row-span-1"
          >
            <div className="absolute -top-3 left-6 bg-forest text-cream px-4 py-1 rounded-full text-xs font-bold uppercase">
              Populaire
            </div>

            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-gold/20">
              <Car className="w-7 h-7 text-gold" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Transport de Personnes à Titre Onéreux
            </span>
            <h3 className="text-2xl font-bold text-forest mt-1 mb-3">Formation T3P</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Taxi, VTC ou VMDTR — Obtenez votre carte professionnelle. 94% de réussite, +2000 chauffeurs formés.
            </p>

            {/* Pricing */}
            <div className="p-4 bg-forest/5 rounded-xl mb-5">
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { title: "Taxi", link: "/formations/taxi" },
                  { title: "VTC", link: "/formations/vtc" },
                  { title: "VMDTR", link: "/formations/vmdtr" },
                ].map((path) => (
                  <PrefetchLink
                    key={path.title}
                    to={path.link}
                    className="flex flex-col items-center p-2.5 bg-card rounded-lg border border-border/50 hover:border-gold/50 hover:shadow-md transition-all group text-center"
                  >
                    <span className="text-xs font-semibold text-forest group-hover:text-gold transition-colors">{path.title}</span>
                  </PrefetchLink>
                ))}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-muted-foreground">dès</span>
                <span className="text-2xl font-black text-primary">990€</span>
                <span className="text-xs text-muted-foreground">(soirée)</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs font-semibold" style={{ color: "#FA5022" }}>ou 4× 247,50€</span>
                <AlmaLogo className="h-3.5" />
              </div>
            </div>

            <div className="space-y-2.5">
              <Button onClick={() => openQuoteModal("t3p")} className="w-full btn-accent">
                <FileText className="w-4 h-4 mr-2" />
                Demander un devis
              </Button>
              <PrefetchLink to="/formations" className="flex items-center justify-center gap-2 text-forest font-semibold hover:text-gold text-sm uppercase link-underline py-2">
                Voir les 3 parcours <ArrowRight className="w-4 h-4" />
              </PrefetchLink>
            </div>
          </motion.div>

          {/* Card 2: Packs Combinés */}
          <motion.div
            variants={staggerItemVariants}
            whileHover={{ y: -8, boxShadow: "0 24px 50px rgba(27, 77, 62, 0.15)" }}
            className="relative bg-card rounded-2xl p-6 md:p-8 border border-border/50 hover:border-primary/30"
          >
            <div className="absolute -top-3 right-6 bg-destructive text-cream px-4 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Nouveau
            </div>

            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-primary/10">
              <Package className="w-7 h-7 text-primary" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Économisez jusqu'à 190€
            </span>
            <h3 className="text-2xl font-bold text-forest mt-1 mb-3">Packs Combinés</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Combinez formation initiale + spécialisation à tarif préférentiel.
            </p>

            {/* Pack list */}
            <div className="space-y-2 mb-5">
              {[
                { name: "Double Activité", eco: "165€", emoji: "🔥" },
                { name: "Reconversion Complète", eco: "150€", emoji: "🚀" },
                { name: "Entrepreneur", eco: "190€", emoji: "💼" },
                { name: "International", eco: "150€", emoji: "🇬🇧" },
                { name: "Accessibilité", eco: "130€", emoji: "♿" },
                { name: "Sérénité Admin", eco: "90€", emoji: "📋" },
              ].map((p) => (
                <div key={p.name} className="flex items-center justify-between text-sm py-1.5 px-3 bg-muted/50 rounded-lg">
                  <span className="font-medium text-foreground">{p.emoji} {p.name}</span>
                  <span className="text-xs font-bold text-primary">-{p.eco}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2.5">
              <Button asChild className="w-full btn-cta-orange">
                <PrefetchLink to="/formations#packs">
                  Découvrir les packs <ArrowRight className="w-4 h-4 ml-1" />
                </PrefetchLink>
              </Button>
            </div>
          </motion.div>

          {/* Card 3: Récup Points + Parrainage */}
          <motion.div
            variants={staggerItemVariants}
            className="flex flex-col gap-6"
          >
            {/* Récup Points */}
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(27, 77, 62, 0.12)" }}
              className="bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 flex-1"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-forest mb-1">Récupération de Points</h3>
                  <p className="text-sm text-muted-foreground mb-3">Stage agréé 2 jours — Attestation immédiate</p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xl font-black text-primary">250€</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold" style={{ color: "#FA5022" }}>ou 4× 62,50€</span>
                    <AlmaLogo className="h-3" />
                  </div>
                </div>
              </div>
              <Button asChild size="sm" className="w-full mt-4 btn-cta-orange">
                <PrefetchLink to="/formations/recuperation-points">
                  Réserver <ArrowRight className="w-4 h-4 ml-1" />
                </PrefetchLink>
              </Button>
            </motion.div>

            {/* Parrainage teaser */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-forest rounded-2xl p-6 text-cream flex-1"
            >
              <div className="flex items-start gap-3 mb-4">
                <Gift className="w-8 h-8 text-gold shrink-0" />
                <div>
                  <h3 className="text-lg font-bold mb-1">Programme Parrainage</h3>
                  <p className="text-sm text-cream/70">
                    <span className="font-bold text-gold">100€</span> pour le parrain · <span className="font-bold text-gold">50€</span> pour le filleul
                  </p>
                </div>
              </div>
              <p className="text-sm text-cream/60 mb-4">
                Recommandez ÉCOLE T3P et cumulez les réductions sans limite.
              </p>
              <PrefetchLink
                to="/formations#parrainage"
                className="inline-flex items-center gap-2 text-gold font-semibold hover:underline text-sm"
              >
                En savoir plus <ArrowRight className="w-4 h-4" />
              </PrefetchLink>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <PrefetchLink to="/formations" className="inline-flex items-center gap-2 text-forest font-semibold hover:text-gold text-sm uppercase link-underline">
            Voir le catalogue complet <ArrowRight className="w-4 h-4" />
          </PrefetchLink>
        </motion.div>
      </div>
    </section>
  );
};

export default OffersSection;
