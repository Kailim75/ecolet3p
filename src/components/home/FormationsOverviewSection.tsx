import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Car, Bike, RefreshCw, CreditCard } from "lucide-react";
import PrefetchLink from "@/components/ui/PrefetchLink";
import AlmaLogo from "@/components/logo/AlmaLogo";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const formations = [
  {
    id: "taxi",
    icon: Car,
    title: "Formation Taxi",
    description: "Formation complète pour obtenir votre carte professionnelle de chauffeur de taxi.",
    price: 990,
    cpf: false,
    accentColor: "#F97316",
    bgLight: "rgba(249,115,22,0.06)",
    link: "/formations/taxi",
  },
  {
    id: "vtc",
    icon: Car,
    title: "Formation VTC",
    description: "Devenez chauffeur VTC professionnel avec notre formation agréée.",
    price: 990,
    cpf: false,
    accentColor: "#059669",
    bgLight: "rgba(5,150,105,0.06)",
    link: "/formations/vtc",
  },
  {
    id: "vmdtr",
    icon: Bike,
    title: "Formation VMDTR",
    description: "Formation moto-taxi pour le transport de passagers sur deux roues.",
    price: 990,
    cpf: false,
    accentColor: "#2563EB",
    bgLight: "rgba(37,99,235,0.06)",
    link: "/formations/vmdtr",
  },
  {
    id: "continue",
    icon: RefreshCw,
    title: "Formation Continue",
    description: "Renouvellement obligatoire de 14h pour maintenir votre carte professionnelle.",
    price: 250,
    cpf: false,
    accentColor: "#374151",
    bgLight: "rgba(55,65,81,0.06)",
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
    <section className="py-10 md:py-20" style={{ backgroundColor: "#F9FAFB" }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-center mb-8 md:mb-14"
        >
          <h2 className="font-serif text-[24px] md:text-[36px] xl:text-[42px] font-extrabold mb-2 md:mb-4" style={{ color: "#1A1A1A" }}>
            Nos Formations
          </h2>
          <p className="text-sm md:text-base max-w-lg mx-auto mb-4" style={{ color: "#777" }}>
            Choisissez votre parcours professionnel
          </p>
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold">
            <CreditCard className="w-4 h-4" />
            Paiement en 2×, 3× ou 4× sans frais avec Alma
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8"
        >
          {formations.map((f) => {
            const Icon = f.icon;
            const monthly = (f.price / 4).toFixed(2);
            return (
              <motion.div
                key={f.id}
                variants={staggerItem}
                whileHover={{ y: -4, boxShadow: `0 12px 24px rgba(0,0,0,0.08)` }}
                className="bg-white rounded-2xl overflow-hidden border border-border/30 transition-all duration-300 relative group"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
              >
                {/* Color top band */}
                <div className="h-1.5 w-full" style={{ backgroundColor: f.accentColor }} />

                <div className="p-5 md:p-8 xl:p-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: f.bgLight }}>
                    <Icon className="w-7 h-7" style={{ color: f.accentColor }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2" style={{ color: "#1A1A1A" }}>{f.title}</h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#777" }}>{f.description}</p>

                  {/* Price + Alma mini-widget */}
                  <div className="mb-5">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold" style={{ color: f.accentColor }}>{f.price}€</span>
                      {f.cpf && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-forest/10 text-forest">CPF</span>
                      )}
                    </div>
                    {f.price >= 500 && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-sm font-semibold" style={{ color: "#FA5022" }}>
                          ou 4× {monthly}€/mois
                        </span>
                        <AlmaLogo className="h-4" />
                      </div>
                    )}
                  </div>

                  {/* Link */}
                  <PrefetchLink
                    to={f.link}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline transition-colors"
                    style={{ color: f.accentColor }}
                  >
                    En savoir plus <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
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
