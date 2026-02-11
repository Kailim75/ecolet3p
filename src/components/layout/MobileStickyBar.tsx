import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const MobileStickyBar = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg safe-area-bottom">
      <div className="flex items-stretch">
        <Link
          to="/contact"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 font-bold text-sm uppercase tracking-wide text-white"
          style={{ background: "linear-gradient(135deg, #E67E22 0%, #F39C12 100%)" }}
        >
          S'inscrire — 990€
        </Link>
        <a
          href="tel:0188750555"
          className="flex items-center justify-center gap-2 px-5 py-3.5 bg-forest text-white font-semibold text-sm"
        >
          <Phone className="w-4 h-4" />
          Appeler
        </a>
      </div>
    </div>
  );
};

export default MobileStickyBar;
