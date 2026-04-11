import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  defaultCookiePreferences,
  persistCookieConsent,
  readCookieConsent,
  type CookiePreferences,
} from "@/lib/cookieConsent";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultCookiePreferences);

  useEffect(() => {
    const consent = readCookieConsent();
    if (consent) {
      setPreferences(consent);
    } else {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    persistCookieConsent(prefs);
    setIsVisible(false);
    setShowDetails(false);
  };

  const acceptAll = () => saveConsent({ essential: true, analytics: true, marketing: true });
  const acceptEssential = () => saveConsent({ essential: true, analytics: false, marketing: false });
  const saveCustom = () => saveConsent(preferences);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 p-3 md:left-auto md:right-4 md:bottom-4 md:max-w-[440px] md:p-0 animate-fade-in-up"
      style={{ animationDuration: "0.3s" }}
    >
      <div className="container-custom max-md:px-0 md:max-w-none md:px-0">
        <div className="bg-card border border-border rounded-2xl shadow-2xl p-4 md:p-5 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-start gap-3 mb-3">
              <div className="shrink-0 hidden md:flex w-10 h-10 rounded-xl bg-primary/8 items-center justify-center">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm md:text-base font-bold text-primary mb-1">
                  🍪 Nous respectons votre vie privée
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                  Nous n'activons l'analytics qu'après votre accord.{" "}
                  <Link to="/politique-de-confidentialite" className="text-primary hover:text-accent font-semibold underline">
                    En savoir plus
                  </Link>
                </p>
              </div>
              <button onClick={acceptEssential} className="text-muted-foreground hover:text-primary transition-colors p-1" aria-label="Fermer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {showDetails && (
              <div className="py-4 border-t border-b border-border my-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-primary text-sm">Cookies essentiels</p>
                    <p className="text-xs text-muted-foreground">Nécessaires au fonctionnement du site</p>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <Check className="w-4 h-4" />
                    <span className="text-xs font-medium">Toujours actifs</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-primary text-sm">Cookies analytiques</p>
                    <p className="text-xs text-muted-foreground">Nous aident à améliorer le site</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={preferences.analytics} onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))} className="sr-only peer" />
                    <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-primary text-sm">Cookies marketing</p>
                    <p className="text-xs text-muted-foreground">Personnalisation des contenus</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={preferences.marketing} onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))} className="sr-only peer" />
                    <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                  </label>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {showDetails ? (
                  <Button onClick={saveCustom} className="btn-secondary text-xs px-4 py-2.5 w-full min-h-[44px]">
                    Enregistrer
                  </Button>
                ) : (
                  <Button
                    onClick={acceptEssential}
                    variant="outline"
                    className="border border-border text-foreground hover:bg-muted text-xs px-4 py-2.5 font-semibold w-full min-h-[44px]"
                  >
                    Continuer sans analytics
                  </Button>
                )}
                <Button onClick={acceptAll} className="btn-primary text-xs px-6 py-2.5 w-full min-h-[44px]">
                  ✓ Tout accepter
                </Button>
              </div>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs font-semibold text-primary hover:text-accent transition-colors underline text-center"
              >
                {showDetails ? "Masquer" : "Personnaliser"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
