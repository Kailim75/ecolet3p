import { useState, useEffect } from "react";
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
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
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

  const acceptAll = () => saveConsent({ essential: true, analytics: true, marketing: true });
  const acceptEssential = () => saveConsent({ essential: true, analytics: false, marketing: false });
  const saveCustom = () => saveConsent(preferences);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-fade-in-up"
      style={{ animationDuration: "0.3s" }}
    >
      <div className="container-custom max-md:px-0">
        <div className="bg-card border-2 border-border rounded-2xl md:rounded-2xl max-md:rounded-t-2xl max-md:rounded-b-none shadow-2xl p-4 md:p-8 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-start gap-3 mb-3">
              <div className="icon-container shrink-0 max-md:hidden">
                <Cookie className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-bold text-primary mb-1">
                  🍪 Nous respectons votre vie privée
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                  Cookies pour améliorer votre expérience.{" "}
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

            <div className="flex flex-col gap-3">
              <div className="flex gap-2 w-full">
                {showDetails ? (
                  <Button onClick={saveCustom} className="btn-secondary text-xs px-4 py-2.5 flex-1 min-h-[44px]">Enregistrer</Button>
                ) : (
                  <Button onClick={acceptEssential} variant="outline" className="border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground text-xs px-4 py-2.5 font-semibold flex-1 min-h-[44px]">✕ Refuser</Button>
                )}
                <Button onClick={acceptAll} className="btn-primary text-xs px-6 py-2.5 flex-1 min-h-[44px]">✓ Tout accepter</Button>
              </div>
              <button onClick={() => setShowDetails(!showDetails)} className="text-xs font-semibold text-primary hover:text-accent transition-colors underline text-center">
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
