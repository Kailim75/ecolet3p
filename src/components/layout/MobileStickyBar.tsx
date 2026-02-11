import { Phone, FileText } from "lucide-react";
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
      className="fixed bottom-0 left-0 right-0 lg:hidden flex items-center"
      style={{
        zIndex: 50,
        height: 60,
        backgroundColor: "#F97316",
        boxShadow: "0 -4px 12px rgba(0,0,0,0.3)",
      }}
    >
      <a
        href="tel:0188750555"
        className="flex-1 flex items-center justify-center gap-2"
        style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}
      >
        <Phone className="w-4 h-4" />
        <span>Appeler</span>
      </a>
      <div className="w-px h-8 bg-white/30" />
      <Link
        to="/contact"
        className="flex-1 flex items-center justify-center gap-2"
        style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}
      >
        <FileText className="w-4 h-4" />
        <span>S'inscrire</span>
      </Link>
    </div>
  );
};

export default MobileStickyBar;
