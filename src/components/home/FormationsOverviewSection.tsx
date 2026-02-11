import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Car, Shield, Bike, RefreshCw } from "lucide-react";
import PrefetchLink from "@/components/ui/PrefetchLink";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const formations = [
  {
    id: "taxi",
    icon: Car,
    title: "Formation Taxi",
    description: "Formation complète pour obtenir votre carte professionnelle de chauffeur de taxi.",
    price: "À partir de 990€",
    cpf: true,
    gradient: "linear-gradient(135deg, #1A237E, #283593)",
    link: "/formations/taxi",
  },
  {
    id: "vtc",
    icon: Car,
    title: "Formation VTC",
    description: "Devenez chauffeur VTC professionnel avec notre formation agréée.",
    price: "À partir de 990€",
    cpf: true,
    gradient: "linear-gradient(135deg, #1B4D3E, #2E7D6E)",
    link: "/formations/vtc",
  },
  {
    id: "vmdtr",
    icon: Bike,
    title: "Formation VMDTR",
    description: "Formation moto-taxi pour le transport de passagers sur deux roues.",
    price: "À partir de 990€",
    cpf: true,
    gradient: "linear-gradient(135deg, #E67E22, #D4A853)",
    link: "/formations/vmdtr",
  },
  {
    id: "continue",
    icon: RefreshCw,
    title: "Formation Continue",
    description: "Renouvellement obligatoire de 14h pour maintenir votre carte professionnelle.",
    price: "À partir de 250€",
    cpf: false,
    gradient: "linear-gradient(135deg, #455A64, #37474F)",
    link: "/formations",
  },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } }
};

const FormationsOverviewSection = () => {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-[28px] md:text-[36px] mb-4" style={{ color: "#1A1A1A" }}>
            Nos Formations
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "#777" }}>
            Choisissez votre parcours professionnel
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {formations.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.id}
                variants={staggerItem}
                whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-2xl overflow-hidden border border-border/30 transition-all duration-300 relative"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
              >
                {/* Color top band */}
                <div className="h-1.5 w-full" style={{ background: f.gradient }} />
                
                {/* Subtle top border reflection */}
                <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.2)" }} />

                <div className="p-8">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(0,0,0,0.04)" }}>
                    <Icon className="w-6 h-6 text-forest" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2" style={{ color: "#1A1A1A" }}>{f.title}</h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#777" }}>{f.description}</p>

                  {/* Price + CPF badge */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-bold text-forest">{f.price}</span>
                    {f.cpf && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-forest/10 text-forest">CPF</span>
                    )}
                  </div>

                  {/* Link */}
                  <PrefetchLink
                    to={f.link}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:underline transition-colors"
                  >
                    En savoir plus <ArrowRight className="w-4 h-4" />
                  </PrefetchLink>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FormationsOverviewSection;
