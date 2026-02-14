import { Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import AlmaLogo from "@/components/logo/AlmaLogo";

const MobileStickyBar = () => {
  const isMobile = useIsMobile();
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (!isMobile || isFooterVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 lg:hidden flex items-center gap-2 px-3"
      style={{
        zIndex: 50,
        height: 64,
        backgroundColor: "#1B4332",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      role="navigation"
      aria-label="Barre d'actions mobile"
    >
      {/* Price */}
      <div className="flex flex-col items-start shrink-0">
        <span className="text-white font-black text-lg leading-none">990€</span>
        <span className="flex items-center gap-1 mt-0.5">
          <AlmaLogo className="h-2.5" />
          <span className="text-white/70 text-[10px]">4× 247,50€</span>
        </span>
      </div>

      {/* CTA */}
      <Link
        to="/contact"
        className="flex-1 flex items-center justify-center gap-2 rounded-xl"
        style={{
          height: 44,
          backgroundColor: "#E8793A",
          color: "#fff",
          fontWeight: 700,
          fontSize: 14,
          boxShadow: "0 4px 14px rgba(232,121,58,0.4)",
        }}
        aria-label="S'inscrire à la formation"
      >
        S'inscrire <ArrowRight className="w-4 h-4" />
      </Link>

      {/* Phone */}
      <a
        href="tel:0188750555"
        className="flex items-center justify-center rounded-xl shrink-0"
        style={{
          width: 44,
          height: 44,
          backgroundColor: "rgba(255,255,255,0.15)",
          color: "#FFFFFF",
        }}
        aria-label="Appeler le 01 88 75 05 55"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
};

export default MobileStickyBar;
