import { Phone, ArrowRight, MessageCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import RdvChoiceModal from "./RdvChoiceModal";

const WHATSAPP_URL = "https://wa.me/33783787663?text=Bonjour%2C%20je%20souhaite%20des%20informations%20sur%20vos%20formations%20T3P.";

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

  const [isRdvOpen, setIsRdvOpen] = useState(false);

  if (!isMobile || isFooterVisible) return null;

  return (
    <>
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
      {/* Phone */}
      <a
        href="tel:0188750555"
        className="flex flex-col items-center justify-center rounded-xl shrink-0"
        style={{
          width: 52,
          height: 44,
          backgroundColor: "rgba(255,255,255,0.15)",
          color: "#FFFFFF",
        }}
        aria-label="Appeler le 01 88 75 05 55"
      >
        <Phone className="w-5 h-5" />
        <span className="text-[9px] mt-0.5 font-medium">Appeler</span>
      </a>

      {/* WhatsApp */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center rounded-xl shrink-0"
        style={{
          width: 52,
          height: 44,
          backgroundColor: "rgba(37,211,102,0.2)",
          color: "#25D366",
        }}
        aria-label="Contacter via WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-[9px] mt-0.5 font-medium text-white">WhatsApp</span>
      </a>

      {/* CTA */}
      <button
        onClick={() => setIsRdvOpen(true)}
        className="flex-1 flex items-center justify-center gap-2 rounded-xl"
        style={{
          height: 44,
          backgroundColor: "#E8793A",
          color: "#fff",
          fontWeight: 700,
          fontSize: 14,
          boxShadow: "0 4px 14px rgba(232,121,58,0.4)",
        }}
        aria-label="Prendre rendez-vous"
      >
        Prendre RDV <ArrowRight className="w-4 h-4" />
      </button>
    </div>

    <RdvChoiceModal isOpen={isRdvOpen} onClose={() => setIsRdvOpen(false)} />
    </>
  );
};

export default MobileStickyBar;
