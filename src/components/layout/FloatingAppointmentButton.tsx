import React from "react";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuoteModal } from "@/components/quote/QuoteRequestModal";

const FloatingAppointmentButton = () => {
  const isMobile = useIsMobile();
  const { openQuoteModal } = useQuoteModal();

  // Only show on desktop
  if (isMobile) return null;

  return (
    <motion.button
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        scale: [1, 1.02, 1],
      }}
      transition={{ 
        y: { type: "spring", stiffness: 300, damping: 30 },
        scale: { duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }
      }}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => openQuoteModal()}
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center gap-2 font-bold py-3 px-5 rounded-full transition-all text-sm"
      style={{
        background: "linear-gradient(135deg, #D4A853 0%, #E4BE73 100%)",
        color: "#1B4D3E",
        boxShadow: "0 8px 25px rgba(212, 168, 83, 0.4)",
      }}
      aria-label="Demander un devis gratuit"
    >
      <FileText className="w-4 h-4" />
      <span>Devis Gratuit</span>
    </motion.button>
  );
};

export default FloatingAppointmentButton;
