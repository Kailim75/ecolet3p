import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const FloatingAppointmentButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Only show on mobile
  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={scrollToAppointment}
          className="fixed bottom-6 left-4 right-4 z-50 flex items-center justify-center gap-2 bg-orange hover:bg-orange/90 text-white font-bold py-4 px-6 rounded-full shadow-lg shadow-orange/30 active:scale-95 transition-transform"
          aria-label="Prendre rendez-vous"
        >
          <Calendar className="w-5 h-5" />
          <span>Prendre RDV</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingAppointmentButton;
