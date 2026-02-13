import { useState } from "react";
import { motion, type Easing } from "framer-motion";
import { ArrowRight, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import AlmaLogo from "@/components/logo/AlmaLogo";
import AlmaPaymentButton from "@/components/formations/AlmaPaymentButton";
import type { PackOffer } from "@/data/offreCatalogueData";

const smoothEase: Easing = [0.22, 1, 0.36, 1];
const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } }
};

interface PackCardProps {
  pack: PackOffer;
  onRegister?: (packTitle: string, format: string) => void;
}

const PackCard = ({ pack, onRegister }: PackCardProps) => {
  const [format, setFormat] = useState<"soiree" | "journee">("soiree");
  const variant = format === "soiree" ? pack.soiree : pack.journee;

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(27, 77, 62, 0.12)" }}
      className="group relative bg-card rounded-2xl overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-300"
    >
      {/* Pack badge */}
      <div className="absolute -top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-center py-1.5 text-xs font-bold uppercase tracking-wider">
        {pack.emoji} PACK — Économisez {variant.economie}€
      </div>

      <div className="p-6 pt-10">
        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-1">{pack.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{pack.description}</p>

        {/* Format toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFormat("soiree")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
              format === "soiree"
                ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-300"
                : "bg-muted/50 text-muted-foreground border-2 border-transparent hover:border-border"
            }`}
          >
            <Moon className="w-3.5 h-3.5" /> Soirée
          </button>
          <button
            onClick={() => setFormat("journee")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
              format === "journee"
                ? "bg-amber-100 text-amber-700 border-2 border-amber-300"
                : "bg-muted/50 text-muted-foreground border-2 border-transparent hover:border-border"
            }`}
          >
            <Sun className="w-3.5 h-3.5" /> Journée
          </button>
        </div>

        {/* Composition */}
        <p className="text-xs text-muted-foreground mb-4 bg-muted/50 p-3 rounded-lg">
          {variant.composition}
        </p>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-black text-primary">{variant.prixPack}€</span>
            <span className="text-sm text-muted-foreground line-through">{variant.prixSepares}€</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs font-bold text-destructive bg-destructive/10 px-2 py-0.5 rounded-full">
              -{variant.economie}€
            </span>
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold" style={{ color: "#FA5022" }}>
                ou 4× {variant.alma4x}
              </span>
              <AlmaLogo className="h-3.5" />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-2">
          <Button
            className="w-full font-bold text-sm btn-cta-orange"
            onClick={() => onRegister?.(pack.title, format === "soiree" ? "Soirée" : "Journée")}
          >
            Choisir ce pack <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <AlmaPaymentButton
            formationTitle={`${pack.title} (${format === "soiree" ? "Soirée" : "Journée"})`}
            price={variant.prixPack}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PackCard;
