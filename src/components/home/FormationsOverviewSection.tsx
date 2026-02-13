import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Car, Bike, RefreshCw, CreditCard, Accessibility, Briefcase, Languages, ClipboardList, MapPin } from "lucide-react";
import PrefetchLink from "@/components/ui/PrefetchLink";
import AlmaLogo from "@/components/logo/AlmaLogo";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const formations = [
  {
    id: "taxi",
    icon: Car,
    title: "Formation Taxi",
    description: "Obtenez votre carte professionnelle taxi. Formation complète en journée ou soirée.",
    price: 990,
    label: "dès",
    accentColor: "hsl(var(--accent-amber, 30 90% 50%))",
    link: "/formations/taxi",
  },
  {
    id: "vtc",
    icon: Car,
    title: "Formation VTC",
    description: "Devenez chauffeur VTC professionnel avec notre formation agréée Préfecture.",
    price: 990,
    label: "dès",
    accentColor: "hsl(var(--primary))",
    link: "/formations/vtc",
  },
  {
    id: "vmdtr",
    icon: Bike,
    title: "Formation VMDTR",
    description: "Formation moto-taxi pour le transport de passagers sur deux roues.",
    price: 990,
    label: "dès",
    accentColor: "hsl(var(--accent-orange, 25 95% 53%))",
    link: "/formations/vmdtr",
  },
  {
    id: "continue",
    icon: RefreshCw,
    title: "Formation Continue",
    description: "Renouvellement obligatoire 14h — Taxi, VTC ou VMDTR. Tous les 5 ans.",
    price: 170,
    label: "dès",
    accentColor: "hsl(var(--muted-foreground))",
    link: "/formations#continues",
  },
  {
    id: "passerelle",
    icon: ArrowRight,
    title: "Passerelle",
    description: "Ajoutez une activité (VTC→Taxi, Taxi→VTC) à votre carte pro existante.",
    price: 665,
    label: "dès",
    accentColor: "hsl(var(--primary))",
    link: "/formations#passerelles",
  },
  {
    id: "complementaires",
    icon: Briefcase,
    title: "Complémentaires",
    description: "PMR, Gestion d'entreprise, Anglais pro, Accompagnement administratif.",
    price: 190,
    label: "dès",
    accentColor: "hsl(var(--primary))",
    link: "/formations#complementaires",
  },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } }
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } }
};

const FormationsOverviewSection = () => {
  return (
    <section className="py-10 md:py-20 bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-center mb-8 md:mb-14"
        >
          <h2 className="font-serif text-[24px] md:text-[36px] xl:text-[42px] font-extrabold text-foreground mb-2 md:mb-4">
            Nos Formations
          </h2>
          <p className="text-sm md:text-base max-w-lg mx-auto mb-4 text-muted-foreground">
            Un catalogue complet pour tous les professionnels du transport
          </p>
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold">
            <CreditCard className="w-4 h-4" />
            Paiement en 4× sans frais avec <AlmaLogo className="h-4" />
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6"
        >
          {formations.map((f) => {
            const Icon = f.icon;
            const monthly = f.price >= 150 ? (f.price / 4).toFixed(2) : null;
            return (
              <motion.div
                key={f.id}
                variants={staggerItem}
                whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
                className="bg-card rounded-2xl overflow-hidden border border-border/30 transition-all duration-300 relative group"
              >
                {/* Color top band */}
                <div className="h-1.5 w-full bg-primary" />

                <div className="p-5 md:p-6">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground mb-1.5">{f.title}</h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-muted-foreground mb-4 line-clamp-2">{f.description}</p>

                  {/* Price */}
                  <div className="mb-4 pt-3 border-t border-border/50">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs text-muted-foreground">{f.label}</span>
                      <span className="text-xl font-black text-primary">{f.price}€</span>
                    </div>
                    {monthly && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs font-semibold" style={{ color: "#FA5022" }}>
                          ou 4× {monthly}€
                        </span>
                        <AlmaLogo className="h-3.5" />
                      </div>
                    )}
                  </div>

                  {/* Link */}
                  <PrefetchLink
                    to={f.link}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline transition-colors"
                  >
                    En savoir plus <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </PrefetchLink>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Packs teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-primary/5 border border-primary/15 rounded-2xl px-6 py-4">
            <span className="text-2xl">📦</span>
            <div className="text-left">
              <p className="font-bold text-foreground text-sm">6 Packs Combinés — Économisez jusqu'à 190€</p>
              <p className="text-xs text-muted-foreground">Formation initiale + spécialisation à tarif préférentiel</p>
            </div>
            <PrefetchLink
              to="/formations#packs"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline whitespace-nowrap"
            >
              Voir les packs <ArrowRight className="w-4 h-4" />
            </PrefetchLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FormationsOverviewSection;
