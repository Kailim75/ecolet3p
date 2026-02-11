import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const FloatingPhoneButton = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <motion.a
      href="tel:0188750555"
      aria-label="Appeler le 01 88 75 05 55"
      className="fixed flex items-center justify-center rounded-full"
      style={{
        bottom: 80,
        right: 16,
        width: 56,
        height: 56,
        backgroundColor: "#22C55E",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        zIndex: 51,
        color: "#fff",
      }}
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: "easeInOut",
      }}
    >
      <Phone className="w-6 h-6" />
    </motion.a>
  );
};

export default FloatingPhoneButton;
