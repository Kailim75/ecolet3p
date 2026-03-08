import { Calendar, MessageCircle, X } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { analytics } from "@/lib/analytics";

const WHATSAPP_URL = "https://wa.me/33783787663?text=Bonjour%2C%20je%20souhaite%20prendre%20rendez-vous%20pour%20une%20formation%20T3P.";

interface RdvChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RdvChoiceModal = ({ isOpen, onClose }: RdvChoiceModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[60]"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 top-1/2 -translate-y-1/2 z-[61] sm:w-[90vw] sm:max-w-sm bg-card rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="text-lg font-bold text-foreground">Prendre rendez-vous</h3>
              <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted transition-colors" aria-label="Fermer">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Options */}
            <div className="p-5 flex flex-col gap-3">
              {/* WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center gap-4 p-4 rounded-xl border-2 border-[#25D366]/30 bg-[#25D366]/5 hover:bg-[#25D366]/10 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-foreground group-hover:text-[#25D366] transition-colors">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">Réponse rapide • 07 83 78 76 63</p>
                </div>
              </a>

              {/* Formulaire */}
              <Link
                to="/contact"
                onClick={onClose}
                className="flex items-center gap-4 p-4 rounded-xl border-2 border-orange/30 bg-orange/5 hover:bg-orange/10 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-orange flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-foreground group-hover:text-orange transition-colors">Formulaire en ligne</p>
                  <p className="text-sm text-muted-foreground">Planifiez votre visite du campus</p>
                </div>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RdvChoiceModal;
