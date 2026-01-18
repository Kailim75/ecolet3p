import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, RefreshCw, X } from "lucide-react";
import { useState } from "react";
import { useServiceWorker } from "@/hooks/useServiceWorker";
import { Button } from "@/components/ui/button";

const PWAStatus = () => {
  const { isOffline, isUpdateAvailable, updateServiceWorker } = useServiceWorker();
  const [dismissed, setDismissed] = useState(false);

  const showOfflineIndicator = isOffline;
  const showUpdateBanner = isUpdateAvailable && !dismissed;

  return (
    <>
      {/* Offline Indicator */}
      <AnimatePresence>
        {showOfflineIndicator && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-amber-950 py-2 px-4 shadow-lg"
          >
            <div className="container-custom flex items-center justify-center gap-2 text-sm font-medium">
              <WifiOff className="w-4 h-4" />
              <span>Mode hors-ligne — Certaines fonctionnalités peuvent être limitées</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Update Available Banner */}
      <AnimatePresence>
        {showUpdateBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-[100]"
          >
            <div className="bg-forest text-cream rounded-xl p-4 shadow-2xl border border-gold/20">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-5 h-5 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm mb-1">Nouvelle version disponible</h4>
                  <p className="text-cream/70 text-xs mb-3">
                    Une mise à jour est prête. Actualisez pour profiter des dernières améliorations.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={updateServiceWorker}
                      size="sm"
                      className="bg-gold text-forest hover:bg-gold-light text-xs font-bold"
                    >
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Mettre à jour
                    </Button>
                    <Button
                      onClick={() => setDismissed(true)}
                      variant="ghost"
                      size="sm"
                      className="text-cream/70 hover:text-cream hover:bg-cream/10 text-xs"
                    >
                      Plus tard
                    </Button>
                  </div>
                </div>
                <button
                  onClick={() => setDismissed(true)}
                  className="text-cream/50 hover:text-cream transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PWAStatus;
