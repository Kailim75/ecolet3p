import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Moon, Sun, Monitor, Check, CarTaxiFront, Car, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AlmaLogo from "@/components/logo/AlmaLogo";
import AlmaPaymentButton from "@/components/formations/AlmaPaymentButton";

const smoothEase = [0.22, 1, 0.36, 1] as const;

type FormationType = "taxi" | "vtc" | "vmdtr";
type FormatType = "soiree" | "journee" | "elearning";

const formationTabs: { key: FormationType; label: string; icon: React.ElementType; link: string }[] = [
  { key: "taxi", label: "Taxi", icon: CarTaxiFront, link: "/formations/taxi" },
  { key: "vtc", label: "VTC", icon: Car, link: "/formations/vtc" },
  { key: "vmdtr", label: "VMDTR", icon: Bike, link: "/formations/vmdtr" },
];

const formatOptions: { key: FormatType; icon: React.ElementType; label: string; hours: string; schedule: string; duration: string }[] = [
  { key: "soiree", icon: Moon, label: "Option Soirée", hours: "33h", schedule: "Lun–Ven 18h à 21h30", duration: "2 semaines" },
  { key: "journee", icon: Sun, label: "Option Journée", hours: "40h", schedule: "9h30 à 17h00", duration: "2 semaines" },
  { key: "elearning", icon: Monitor, label: "Option E-learning", hours: "Illimité", schedule: "Quiz interactifs", duration: "À votre rythme" },
];

const inclusions = [
  "2h de conduite incluses",
  "Véhicule fourni le jour de l'examen",
  "Support pédagogique complet",
];

const complementaryFormations = [
  { title: "Formation Continue", price: "170", link: "/formations/continue-taxi", description: "Renouvellement carte professionnelle" },
  { title: "Passerelle", price: "665", link: "/formations/taxi", description: "Changement de spécialité T3P" },
  { title: "Complémentaires", price: "190", link: "/formations", description: "Anglais, PMR, gestion…" },
  { title: "Accessibilité PMR", price: "290", link: "/formations/pmr", description: "Prise en charge des personnes à mobilité réduite" },
];

const OffersSection = () => {
  const [selectedFormation, setSelectedFormation] = useState<FormationType>("taxi");
  const [selectedFormat, setSelectedFormat] = useState<FormatType>("soiree");

  const currentFormation = formationTabs.find((f) => f.key === selectedFormation)!;

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 overflow-hidden" style={{ backgroundColor: "#F5F0E8" }}>
      <div className="container-custom">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-black mb-3" style={{ color: "#1B4332" }}>
            Formule Complète T3P — 990€
          </h2>
          <p className="text-base md:text-lg" style={{ color: "#666" }}>
            Choisissez votre rythme, nous gérons le reste
          </p>
        </motion.div>

        {/* === NIVEAU 1 — Formule Complète === */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: smoothEase }}
          className="bg-white rounded-2xl border overflow-hidden mb-12"
          style={{ borderColor: "rgba(27,67,50,0.15)", boxShadow: "0 8px 40px rgba(27,67,50,0.08)" }}
        >
          {/* Formation selector tabs */}
          <div className="flex border-b" style={{ borderColor: "rgba(27,67,50,0.1)" }}>
            {formationTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedFormation(tab.key)}
                className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold transition-all duration-200"
                style={{
                  backgroundColor: selectedFormation === tab.key ? "#1B4332" : "transparent",
                  color: selectedFormation === tab.key ? "#FFFFFF" : "#666",
                  borderBottom: selectedFormation === tab.key ? "3px solid #E8793A" : "3px solid transparent",
                }}
                aria-label={`Formation ${tab.label}`}
                aria-pressed={selectedFormation === tab.key}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-5 md:p-8">
            {/* Format tabs */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 mb-6">
              {formatOptions.map((fmt) => (
                <button
                  key={fmt.key}
                  onClick={() => setSelectedFormat(fmt.key)}
                  className="flex flex-col items-center gap-1.5 p-3 md:p-4 rounded-xl border-2 transition-all duration-200"
                  style={{
                    borderColor: selectedFormat === fmt.key ? "#1B4332" : "rgba(0,0,0,0.08)",
                    backgroundColor: selectedFormat === fmt.key ? "rgba(27,67,50,0.05)" : "transparent",
                  }}
                  aria-label={`${fmt.label} — ${fmt.hours}`}
                  aria-pressed={selectedFormat === fmt.key}
                >
                  <fmt.icon
                    className="w-5 h-5"
                    style={{ color: selectedFormat === fmt.key ? "#1B4332" : "#999" }}
                  />
                  <span
                    className="text-xs md:text-sm font-bold"
                    style={{ color: selectedFormat === fmt.key ? "#1B4332" : "#666" }}
                  >
                    {fmt.label}
                  </span>
                  <span className="text-[10px] md:text-xs" style={{ color: "#999" }}>
                    {fmt.hours} — {fmt.duration}
                  </span>
                  <span className="text-[10px] hidden md:block" style={{ color: "#999" }}>
                    {fmt.schedule}
                  </span>
                </button>
              ))}
            </div>

            {/* Inclusions line */}
            <div className="flex flex-wrap gap-3 md:gap-6 mb-6 py-3 px-4 rounded-xl" style={{ backgroundColor: "rgba(27,67,50,0.04)" }}>
              {inclusions.map((text) => (
                <span key={text} className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium" style={{ color: "#1B4332" }}>
                  <Check className="w-3.5 h-3.5" style={{ color: "#E8793A" }} />
                  {text}
                </span>
              ))}
            </div>

            {/* Price + Alma + CTA */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-black" style={{ fontSize: 48, color: "#1B4332", lineHeight: 1 }}>
                  990€
                </span>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1 text-sm font-semibold" style={{ color: "#666" }}>
                    ou 4× 247,50€ <AlmaLogo className="h-3.5" />
                  </span>
                  <span className="text-[11px]" style={{ color: "#999" }}>
                    dont 241€ de frais d'examen inclus
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto md:ml-auto">
                <Button
                  asChild
                  className="btn-cta-orange px-8 py-4 text-sm rounded-xl"
                  style={{ backgroundColor: "#E8793A", boxShadow: "0 4px 14px rgba(232,121,58,0.3)" }}
                >
                  <Link to={currentFormation.link} aria-label={`Choisir la formation ${currentFormation.label}`}>
                    Choisir cette formule <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <AlmaPaymentButton formationTitle={`Formation ${currentFormation.label}`} price={990} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reassurance prix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: smoothEase }}
          className="text-center py-4 px-6 rounded-xl mb-12"
          style={{ backgroundColor: "#F5F0E8", border: "1px solid rgba(27,67,50,0.08)" }}
        >
          <p className="text-sm" style={{ color: "#1B4332" }}>
            💰 Formation la plus abordable d'Île-de-France — Rentabilisée dès votre premier mois d'activité (revenu moyen chauffeur : 2 500 à 3 500 €/mois)
          </p>
        </motion.div>

        {/* === NIVEAU 2 — Formations complémentaires === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: smoothEase }}
        >
          <h3 className="text-lg md:text-xl font-bold mb-6 text-center" style={{ color: "#1B4332" }}>
            Déjà certifié ? Nos formations complémentaires
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {complementaryFormations.map((f, idx) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: smoothEase }}
              >
                <Link
                  to={f.link}
                  className="flex flex-col h-full bg-white rounded-xl border p-4 md:p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group"
                  style={{ borderColor: "rgba(27,67,50,0.12)" }}
                  aria-label={`${f.title} — dès ${f.price}€`}
                >
                  <h4 className="text-sm font-bold mb-1 group-hover:text-[#E8793A] transition-colors" style={{ color: "#1B4332" }}>
                    {f.title}
                  </h4>
                  <p className="text-[11px] mb-3 flex-1" style={{ color: "#999" }}>
                    {f.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black" style={{ color: "#1B4332" }}>
                      dès {f.price}€
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-[#E8793A] transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OffersSection;
