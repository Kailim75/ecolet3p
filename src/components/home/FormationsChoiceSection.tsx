import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const formations = [
  {
    id: "taxi",
    title: "TAXI",
    subtitle: "Formation continue obligatoire",
    duration: "14h",
    price: "280€",
    link: "/formations/taxi",
  },
  {
    id: "vtc",
    title: "VTC",
    subtitle: "Formation continue obligatoire",
    duration: "14h",
    price: "280€",
    link: "/formations/vtc",
  },
  {
    id: "vmdtr",
    title: "VMDTR",
    subtitle: "Formation continue obligatoire",
    duration: "14h",
    price: "280€",
    link: "/formations/vmdtr",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEase },
  },
};

const FormationsChoiceSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: smoothEase }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-forest mb-3">
            Choisir sa formation
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Sélectionnez votre catégorie professionnelle
          </p>
        </motion.div>

        {/* 3 cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {formations.map((formation) => (
            <motion.div
              key={formation.id}
              variants={cardVariants}
              className="bg-cream rounded-xl p-6 border border-border/30 hover:border-gold/40 transition-colors duration-300"
            >
              {/* Title */}
              <h3 className="text-xl font-bold text-forest mb-1">
                {formation.title}
              </h3>
              
              {/* Subtitle - regulatory */}
              <p className="text-sm text-muted-foreground mb-6">
                {formation.subtitle}
              </p>

              {/* Duration & Price - factual */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/30">
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Durée</span>
                  <p className="text-forest font-semibold">{formation.duration}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Tarif</span>
                  <p className="text-forest font-semibold">{formation.price}</p>
                </div>
              </div>

              {/* CTA - exploratory */}
              <Button asChild variant="outline" className="w-full group">
                <Link to={formation.link}>
                  Voir le programme
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FormationsChoiceSection;
