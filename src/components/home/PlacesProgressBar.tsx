import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface PlacesProgressBarProps {
  month?: string;
  totalPlaces?: number;
  placesLeft?: number;
  className?: string;
}

const PlacesProgressBar = ({
  month = "mars 2026",
  totalPlaces = 20,
  placesLeft = 4,
  className = "",
}: PlacesProgressBarProps) => {
  const filled = ((totalPlaces - placesLeft) / totalPlaces) * 100;
  const [width, setWidth] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => setWidth(filled), 300);
    return () => clearTimeout(timer);
  }, [started, filled]);

  return (
    <div
      ref={ref}
      className={`bg-gradient-to-br from-orange/10 to-orange/5 border border-orange/20 rounded-xl p-4 ${className}`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-orange flex items-center gap-1">
          <Flame className="w-3.5 h-3.5" />
          Session de {month}
        </span>
        <span className="text-xs font-bold text-destructive">
          Plus que {placesLeft} places !
        </span>
      </div>
      <div className="w-full h-2.5 bg-orange/15 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, hsl(var(--orange)), hsl(0 84% 60%))",
            width: `${width}%`,
            transition: "width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>
      <p className="text-[11px] text-muted-foreground mt-1.5 text-right">
        {totalPlaces - placesLeft}/{totalPlaces} places réservées
      </p>
    </div>
  );
};

export default PlacesProgressBar;
