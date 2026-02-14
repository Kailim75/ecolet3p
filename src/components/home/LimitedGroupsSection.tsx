import React from "react";
import { motion } from "framer-motion";
import { Users, GraduationCap, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PrefetchLink from "@/components/ui/PrefetchLink";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const benefits = [
  {
    icon: Users,
    title: "15 stagiaires maximum",
    description: "Des groupes restreints pour un apprentissage optimal et une attention individualisée.",
  },
  {
    icon: GraduationCap,
    title: "Formateurs dédiés",
    description: "Un formateur pour 15 personnes maximum : chaque question trouve sa réponse.",
  },
  {
    icon: MessageCircle,
    title: "Échanges privilégiés",
    description: "Le petit effectif favorise les mises en situation, débats et cas pratiques entre stagiaires.",
  },
];

const LimitedGroupsSection = () => {
  return (
    <section className="section-padding" style={{ backgroundColor: "#0F2A1D" }}>
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: big stat */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="text-center lg:text-left shrink-0"
          >
            <span
              className="text-7xl md:text-8xl lg:text-9xl font-black leading-none"
              style={{ color: "#D4A853" }}
            >
              15
            </span>
            <p className="text-white text-lg md:text-xl font-bold mt-2">stagiaires max.</p>
            <p className="text-sm mt-1" style={{ color: "#D1D5DB" }}>
              par session de formation
            </p>
          </motion.div>

          {/* Right: benefits */}
          <div className="flex-1 space-y-6">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: smoothEase }}
                  className="flex items-start gap-4"
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgba(212,168,83,0.15)" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "#D4A853" }} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">{b.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#D1D5DB" }}>{b.description}</p>
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <PrefetchLink to="/formations">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 mt-2">
                  Découvrir nos formations <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </PrefetchLink>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LimitedGroupsSection;
