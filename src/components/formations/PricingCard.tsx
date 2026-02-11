import { Euro, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  title: string;
  price: number;
  duration: string;
  features?: string[];
  onRegister: () => void;
}

const PricingCard = ({ title, price, duration, features, onRegister }: PricingCardProps) => {
  const monthly = Math.ceil((price / 4) * 100) / 100;

  return (
    <div className="rounded-2xl border-2 border-primary/20 bg-card p-8 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-[hsl(var(--cta))] text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
        POPULAIRE
      </div>

      <h3 className="text-xl font-bold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6">Durée : {duration}</p>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-primary">{price}€</span>
          <span className="text-muted-foreground text-sm">TTC</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Soit <span className="font-semibold text-foreground">{monthly.toFixed(2)}€/mois</span> en 4× sans frais
        </p>
        <p className="text-xs font-semibold text-primary mt-2">
          ✓ Frais d'examen de 241€ inclus
        </p>
      </div>

      {features && features.length > 0 && (
        <ul className="space-y-2 mb-6">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}

      <Button className="w-full btn-cta-orange text-base" size="lg" onClick={onRegister}>
        <Euro className="h-4 w-4 mr-2" />
        S'inscrire maintenant
      </Button>
    </div>
  );
};

export default PricingCard;
