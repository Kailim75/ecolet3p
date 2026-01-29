import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Cookie, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const COOKIE_CONSENT_KEY = "t3p_cookie_consent";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      ...prefs,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
  };

  const acceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
    });
  };

  const acceptEssential = () => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
    });
  };

  const saveCustom = () => {
    saveConsent(preferences);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container-custom">
            <div className="bg-card border-2 border-border rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-forest/10 rounded-full blur-xl" />

              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="icon-container shrink-0">
                    <Cookie className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-forest mb-2">
                      🍪 Nous respectons votre vie privée
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
                      Vous pouvez personnaliser vos préférences ou accepter tous les cookies.{" "}
                      <Link to="/politique-de-confidentialite" className="text-forest hover:text-gold font-semibold underline">
                        En savoir plus
                      </Link>
                    </p>
                  </div>
                  <button
                    onClick={acceptEssential}
                    className="text-muted-foreground hover:text-forest transition-colors p-1"
                    aria-label="Fermer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cookie details */}
                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="py-4 border-t border-b border-border my-4 space-y-4">
                        {/* Essential cookies */}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-forest text-sm">Cookies essentiels</p>
                            <p className="text-xs text-muted-foreground">Nécessaires au fonctionnement du site</p>
                          </div>
                          <div className="flex items-center gap-2 text-forest">
                            <Check className="w-4 h-4" />
                            <span className="text-xs font-medium">Toujours actifs</span>
                          </div>
                        </div>

                        {/* Analytics cookies */}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-forest text-sm">Cookies analytiques</p>
                            <p className="text-xs text-muted-foreground">Nous aident à améliorer le site</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preferences.analytics}
                              onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-forest transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                          </label>
                        </div>

                        {/* Marketing cookies */}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-forest text-sm">Cookies marketing</p>
                            <p className="text-xs text-muted-foreground">Personnalisation des contenus</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preferences.marketing}
                              onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-forest transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-sm font-semibold text-forest hover:text-gold transition-colors underline"
                  >
                    {showDetails ? "Masquer les détails" : "Personnaliser mes choix"}
                  </button>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                    {showDetails ? (
                      <Button onClick={saveCustom} className="btn-secondary text-xs px-4 py-2">
                        Enregistrer mes préférences
                      </Button>
                    ) : (
                      <Button 
                        onClick={acceptEssential} 
                        variant="outline" 
                        className="border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground text-xs px-4 py-2 font-semibold"
                      >
                        ✕ Refuser
                      </Button>
                    )}
                    <Button onClick={acceptAll} className="btn-primary text-xs px-6 py-2">
                      ✓ Tout accepter
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
