import { motion, type Easing } from "framer-motion";
import { Moon, Sun, ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PrefetchLink from "@/components/ui/PrefetchLink";
import AlmaLogo from "@/components/logo/AlmaLogo";
import AlmaPaymentButton from "@/components/formations/AlmaPaymentButton";
import type { FormationOffer } from "@/data/offreCatalogueData";

const smoothEase: Easing = [0.22, 1, 0.36, 1];
const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } }
};

interface CatalogueCardProps {
  formation: FormationOffer;
  onRegister?: (formation: FormationOffer) => void;
  compact?: boolean;
}

const CatalogueCard = ({ formation, onRegister, compact = false }: CatalogueCardProps) => {
  const isSoiree = formation.format === "soiree";
  const hasAlma = formation.price >= 150;

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(27, 77, 62, 0.12)" }}
      className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300"
    >
      {/* Top color band */}
      <div className={`h-1.5 w-full ${isSoiree ? 'bg-indigo-500' : 'bg-primary'}`} />

      {/* Badges */}
      <div className="absolute top-4 right-4 flex flex-col gap-1.5 items-end">
        {formation.badge && (
          <span className="text-[10px] font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-full border border-primary/20">
            ✓ {formation.badge}
          </span>
        )}
        {isSoiree ? (
          <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Moon className="w-3 h-3" /> Soirée
          </span>
        ) : formation.format === "journee" ? (
          <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Sun className="w-3 h-3" /> Journée
          </span>
        ) : null}
      </div>

      <div className={compact ? "p-5" : "p-6"}>
        {/* Emoji + Title */}
        <div className="flex items-start gap-3 mb-3">
          {formation.emoji && (
            <span className="text-2xl mt-0.5">{formation.emoji}</span>
          )}
          <div className="min-w-0">
            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-tight">
              {formation.title}
            </h3>
            {formation.subtitle && (
              <p className="text-xs text-muted-foreground mt-0.5">{formation.subtitle}</p>
            )}
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>{formation.duration}</span>
        </div>

        {/* Accroche */}
        {formation.accroche && (
          <p className="text-sm text-muted-foreground italic mb-3">{formation.accroche}</p>
        )}

        {/* Features */}
        {formation.features && !compact && (
          <ul className="space-y-1.5 mb-4">
            {formation.features.slice(0, 4).map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Price */}
        <div className="mb-4 pt-3 border-t border-border/50">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-primary">{formation.price}€</span>
            {formation.priceAlt && (
              <span className="text-sm text-muted-foreground">
                / {formation.priceAlt}€ <span className="text-[10px]">(individuel)</span>
              </span>
            )}
          </div>
          {hasAlma && (
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xs font-semibold" style={{ color: "#FA5022" }}>
                ou 4× {formation.alma4x}
              </span>
              <AlmaLogo className="h-3.5" />
            </div>
          )}
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-2">
          <Button
            className="w-full font-bold text-sm btn-cta-orange"
            onClick={() => onRegister?.(formation)}
          >
            Réserver ma place <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          {hasAlma && (
            <AlmaPaymentButton formationTitle={formation.title} price={formation.price} />
          )}
          <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-primary" asChild>
            <PrefetchLink to={formation.link}>
              En savoir plus
            </PrefetchLink>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CatalogueCard;
