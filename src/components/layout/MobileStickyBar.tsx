import { Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect, useRef } from "react";

const getCtaConfig = (pathname: string): { label: string; price?: string } => {
  if (pathname === "/formations/taxi") return { label: "S'inscrire", price: "1190€" };
  if (pathname === "/formations/vtc") return { label: "S'inscrire", price: "1190€" };
  if (pathname === "/formations/vmdtr") return { label: "S'inscrire", price: "1190€" };
  if (pathname === "/formations/continue-taxi") return { label: "S'inscrire", price: "239€" };
  if (pathname === "/formations/continue-vtc") return { label: "S'inscrire", price: "170€" };
  if (pathname === "/formations/continue-vmdtr") return { label: "S'inscrire", price: "239€" };
  if (pathname === "/formations/mobilite") return { label: "S'inscrire", price: "390€" };
  if (pathname === "/formations/recuperation-points") return { label: "Réserver", price: "250€" };
  return { label: "S'inscrire maintenant" };
};

const MobileStickyBar = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
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

  const { label, price } = getCtaConfig(location.pathname);
  const displayText = price ? `${label} — ${price}` : label;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 lg:hidden flex items-center"
      style={{
        zIndex: 1000,
        height: 60,
        backgroundColor: "#E67E22",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.15)",
      }}
    >
      <Link
        to="/contact"
        className="flex-1 flex items-center justify-center"
        style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}
      >
        {displayText}
      </Link>
      <a
        href="tel:0188750555"
        className="flex items-center justify-center"
        style={{ width: 60, height: 60, color: "#fff" }}
        aria-label="Appeler"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
};

export default MobileStickyBar;
