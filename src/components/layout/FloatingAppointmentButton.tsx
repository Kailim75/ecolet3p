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
      onClick={scrollToAppointment}
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center gap-2 bg-orange hover:bg-orange/90 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-orange/30 active:scale-95 transition-transform"
      aria-label="Prendre rendez-vous"
    >
      <Calendar className="w-5 h-5" />
      <span>Prendre RDV</span>
    </motion.button>
  );
};

export default FloatingAppointmentButton;
