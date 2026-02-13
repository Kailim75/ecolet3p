import { motion, AnimatePresence } from "framer-motion";
import { Download, Share, X, Smartphone } from "lucide-react";
import { useState } from "react";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { Button } from "@/components/ui/button";

const PWAInstallPrompt = () => {
  const { isInstallable, isInstalled, isIOS, promptInstall } = usePWAInstall();
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Don't show if already installed or dismissed
  if (isInstalled || dismissed) return null;

  // Show iOS instructions modal
  if (showIOSInstructions) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          onClick={() => setShowIOSInstructions(false)}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-card rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-forest" />
              </div>
              <button
                onClick={() => setShowIOSInstructions(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <h3 className="text-xl font-bold text-forest mb-2">
              Installer ECOLE T3P
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Ajoutez l'application à votre écran d'accueil pour un accès rapide.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-forest text-cream flex items-center justify-center text-sm font-bold shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium text-forest">Appuyez sur Partager</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Share className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-muted-foreground">en bas de Safari</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-forest text-cream flex items-center justify-center text-sm font-bold shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium text-forest">Sur l'écran d'accueil</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Faites défiler et appuyez sur "Sur l'écran d'accueil"
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-forest text-cream flex items-center justify-center text-sm font-bold shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium text-forest">Ajouter</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Appuyez sur "Ajouter" en haut à droite
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setShowIOSInstructions(false)}
              className="w-full mt-6 bg-forest hover:bg-forest/90"
            >
              J'ai compris
            </Button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Show install button for Android/Desktop or iOS hint
  const showButton = isInstallable || isIOS;
  if (!showButton) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 3 }}
        className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:max-w-xs z-[90]"
      >
        <div className="bg-card rounded-xl p-4 shadow-xl border border-border">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forest to-forest/80 flex items-center justify-center shrink-0">
              <Download className="w-5 h-5 text-cream" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-forest text-sm">Installer l'application</h4>
              <p className="text-muted-foreground text-xs mt-0.5">
                Accédez rapidement depuis votre écran d'accueil
              </p>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-muted-foreground hover:text-foreground shrink-0"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex gap-2 mt-3">
            <Button
              onClick={() => {
                if (isIOS) {
                  setShowIOSInstructions(true);
                } else {
                  promptInstall();
                }
              }}
              size="sm"
              className="flex-1 bg-forest hover:bg-forest/90 text-xs font-bold"
            >
              <Download className="w-3 h-3 mr-1" />
              Installer
            </Button>
            <Button
              onClick={() => setDismissed(true)}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-forest text-xs"
            >
              Plus tard
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PWAInstallPrompt;
