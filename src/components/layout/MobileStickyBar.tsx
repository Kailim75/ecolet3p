import { Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";

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
        background: "linear-gradient(to top, rgba(0,0,0,0.04), transparent)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {/* Phone button — compact */}
      <a
        href="tel:0188750555"
        className="flex items-center justify-center rounded-xl"
        style={{
          width: 52,
          height: 48,
          backgroundColor: "#FFFFFF",
          border: "1.5px solid #E5E7EB",
          color: "#1B4D3E",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
        aria-label="Appeler"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Main CTA — takes remaining space */}
      <Link
        to="/contact"
        className="flex-1 flex items-center justify-center gap-2 rounded-xl"
        style={{
          height: 48,
          backgroundColor: "#F97316",
          color: "#fff",
          fontWeight: 700,
          fontSize: 15,
          boxShadow: "0 4px 14px rgba(249,115,22,0.4)",
        }}
      >
        S'inscrire maintenant
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default MobileStickyBar;
