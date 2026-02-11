import React from "react";
import { motion, type Easing } from "framer-motion";
import { ArrowRight, GraduationCap, RefreshCw, MapPin, Shield } from "lucide-react";
import PrefetchLink from "@/components/ui/PrefetchLink";

const smoothEase: Easing = [0.22, 1, 0.36, 1];

const formationBlocks = [
  {
    id: "initiales",
    icon: GraduationCap,
    title: "Formations Initiales",
    subtitle: "Accès à la profession",
    description: "Obtenez votre carte professionnelle pour exercer comme chauffeur TAXI, VTC ou VMDTR.",
    link: "/formations",
    linkLabel: "Découvrir les parcours",
  },
  {
    id: "continues",
    icon: RefreshCw,
    title: "Formations Continues",
    subtitle: "Renouvellement obligatoire",
    description: "Formation de 14h requise tous les 5 ans pour le renouvellement de votre carte professionnelle.",
    link: "/formations",
    linkLabel: "Voir les sessions",
  },
  {
    id: "mobilite",
    icon: MapPin,
    title: "Mobilité Taxi",
    subtitle: "Changement de zone",
    description: "Formations pour exercer sur une nouvelle zone géographique (Paris 75, Hauts-de-Seine 92).",
    link: "/formations/mobilite",
    linkLabel: "En savoir plus",
  },
  {
    id: "points",
    icon: Shield,
    title: "Récupération de Points",
    subtitle: "Stage agréé 2 jours",
    description: "Récupérez jusqu'à 4 points sur votre permis de conduire. Attestation délivrée immédiatement.",
    link: "/formations/recuperation-points",
    linkLabel: "Voir les dates",
  },
];

const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } }
};

const FormationsOverviewSection = () => {
  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-forest mb-4">
            Choisir sa formation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sélectionnez le parcours adapté à votre situation
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {formationBlocks.map((block) => {
            const IconComponent = block.icon;
            
            return (
              <motion.div
                key={block.id}
                variants={staggerItemVariants}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(27, 77, 62, 0.12)" }}
                className="bg-card rounded-[16px] p-8 border border-border/50 hover:border-gold/30 transition-all duration-300"
                style={{ boxShadow: "0 8px 32px rgba(27, 77, 62, 0.08)" }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-forest/10 flex items-center justify-center mb-5">
                  <IconComponent className="w-7 h-7 text-forest" />
                </div>

                {/* Content */}
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {block.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-forest mt-1 mb-3">{block.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{block.description}</p>
                </div>

                {/* CTA */}
                <PrefetchLink 
                  to={block.link}
                  className="inline-flex items-center gap-2 text-forest font-semibold hover:text-gold text-sm uppercase link-underline"
                >
                  {block.linkLabel} <ArrowRight className="w-4 h-4" />
                </PrefetchLink>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Secondary link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <PrefetchLink to="/formations" className="inline-flex items-center gap-2 text-forest font-semibold hover:text-gold text-sm uppercase link-underline">
            Voir toutes les formations <ArrowRight className="w-4 h-4" />
          </PrefetchLink>
        </motion.div>
      </div>
    </section>
  );
};

export default FormationsOverviewSection;
