import { useLocation, useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const FloatingAppointmentButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const scrollToAppointment = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById("rendez-vous");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      const element = document.getElementById("rendez-vous");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Only show on desktop
  if (isMobile) return null;

  return (
    <motion.button
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={scrollToAppointment}
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-full transition-all"
      style={{
        background: "linear-gradient(135deg, #D4A853 0%, #E4BE73 100%)",
        color: "#1B4D3E",
        boxShadow: "0 8px 25px rgba(212, 168, 83, 0.4)",
      }}
      aria-label="Prendre rendez-vous"
    >
      <Calendar className="w-5 h-5" />
      <span>Prendre RDV</span>
    </motion.button>
  );
};

export default FloatingAppointmentButton;
