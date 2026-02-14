import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CarTaxiFront, Car, Bike, Moon, Sun, Monitor, CreditCard, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import PrefetchLink from "@/components/ui/PrefetchLink";
import AlmaLogo from "@/components/logo/AlmaLogo";
import { useQuoteModal } from "@/components/quote/QuoteRequestModal";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const formations = [
  {
    title: "TAXI",
    icon: CarTaxiFront,
    color: "text-amber-600",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    link: "/formations/taxi",
    quoteKey: "taxi",
    description: "Carte professionnelle Taxi — Examen CMA",
    formats: [
      { label: "Soirée", icon: Moon, price: 990, duration: "Lun–Ven 18h–21h30", detailLink: "/formations/formule-soiree" },
      { label: "Journée", icon: Sun, price: 1190, duration: "Lun–Ven 9h–17h", detailLink: "/formations/taxi" },
      { label: "E-learning", icon: Monitor, price: 890, duration: "À votre rythme", detailLink: "/formations/taxi" },
    ],
  },
  {
    title: "VTC",
    icon: Car,
    color: "text-emerald-600",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    link: "/formations/vtc",
    quoteKey: "vtc",
    description: "Carte professionnelle VTC — Examen CMA",
    formats: [
      { label: "Soirée", icon: Moon, price: 990, duration: "Lun–Ven 18h–21h30", detailLink: "/formations/formule-soiree" },
      { label: "Journée", icon: Sun, price: 1190, duration: "Lun–Ven 9h–17h", detailLink: "/formations/vtc" },
      { label: "E-learning", icon: Monitor, price: 890, duration: "À votre rythme", detailLink: "/formations/vtc" },
    ],
  },
  {
    title: "VMDTR",
    icon: Bike,
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    link: "/formations/vmdtr",
    quoteKey: "vmdtr",
    description: "Transport moto-taxi — Examen CMA",
    formats: [
      { label: "Soirée", icon: Moon, price: 990, duration: "Lun–Ven 18h–21h30", detailLink: "/formations/formule-soiree" },
      { label: "Journée", icon: Sun, price: 1190, duration: "Lun–Ven 9h–17h", detailLink: "/formations/vmdtr" },
      { label: "E-learning", icon: Monitor, price: 890, duration: "À votre rythme", detailLink: "/formations/vmdtr" },
    ],
  },
];

const OffersSection = () => {
  const { openQuoteModal } = useQuoteModal();

  return (
    <section className="section-padding gradient-warm overflow-hidden relative">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-center mb-12"
        >
           <h2 className="section-title mb-3">Nos Formations Initiales</h2>
           <p className="section-subtitle mx-auto mb-4">
             Taxi, VTC ou VMDTR — Choisissez votre métier et votre rythme
           </p>
           <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold">
             <BadgeCheck className="w-4 h-4" />
             Frais d'examen CMA de 241€ inclus dans tous nos tarifs
           </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {formations.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: smoothEase }}
              whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(27,67,50,0.12)" }}
              className={`bg-card rounded-2xl border ${f.borderColor} overflow-hidden`}
            >
              {/* Card header */}
              <div className="p-5 pb-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl ${f.bgColor} flex items-center justify-center`}>
                    <f.icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-forest">{f.title}</h3>
                    <p className="text-xs text-muted-foreground">{f.description}</p>
                  </div>
                </div>
              </div>

              {/* Formats */}
              <div className="px-5 pb-2 space-y-2">
                {f.formats.map((fmt) => (
                  <PrefetchLink
                    key={fmt.label}
                    to={fmt.detailLink}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center border border-border/50 group-hover:border-primary/30 transition-colors">
                      <fmt.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{fmt.label}</span>
                        <span className="text-xs text-muted-foreground">{fmt.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                         <span className="text-lg font-black text-primary">{fmt.price}€</span>
                         <span className="text-[10px] text-muted-foreground">· soit 4× {(fmt.price / 4).toFixed(0)}€</span>
                       </div>
                       <span className="text-[9px] font-medium text-primary/70">dont 241€ de frais d'examen inclus</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </PrefetchLink>
                ))}
              </div>

              {/* Alma + CTA */}
              <div className="px-5 pb-5 pt-2 space-y-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#FFF5F0] rounded-lg border border-[#FA5022]/10">
                  <CreditCard className="w-3.5 h-3.5 text-[#FA5022]" />
                  <span className="text-[11px] font-semibold" style={{ color: "#FA5022" }}>4× sans frais avec</span>
                  <AlmaLogo className="h-3" />
                </div>
                <Button onClick={() => openQuoteModal(f.quoteKey)} className="w-full btn-cta-orange" size="sm">
                  Demander un devis <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
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
