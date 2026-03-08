import React from "react";
import { MessageCircle, X, Send, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analytics } from "@/lib/analytics";

const WHATSAPP_NUMBER = "33783787663";
const DEFAULT_MESSAGE = "Bonjour, je souhaite avoir des informations sur vos formations.";

const FloatingWhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [message, setMessage] = React.useState(DEFAULT_MESSAGE);
  const [copied, setCopied] = React.useState(false);
  const { toast } = useToast();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const isEmbeddedPreview = React.useMemo(() => {
    try {
      return window.self !== window.top;
    } catch {
      return true;
    }
  }, []);

  const getWhatsAppUrl = () => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  };

  const handleCopyLinkWithFallback = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "Lien copié !",
        description: "Collez le lien dans un nouvel onglet pour ouvrir WhatsApp.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copiez ce lien WhatsApp :", url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyLink = async () => {
    await handleCopyLinkWithFallback(getWhatsAppUrl());
  };

  const handleSendMessage = async () => {
    const whatsappUrl = getWhatsAppUrl();

    if (isEmbeddedPreview) {
      await handleCopyLinkWithFallback(whatsappUrl);
      toast({
        title: "Prévisualisation : WhatsApp bloqué",
        description:
          "Le lien est copié. Collez-le dans un nouvel onglet (ou utilisez le lien \u00ABOuvrir\u00BB).",
      });
      setIsOpen(false);
      return;
    }

    analytics.trackCTAClick('whatsapp', 'floating-button');
    const win = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!win) {
      await handleCopyLinkWithFallback(whatsappUrl);
      toast({
        title: "Popup bloquée",
        description: "Le lien WhatsApp a été copié.",
      });
    }

    setIsOpen(false);
  };

  // Hide on mobile — WhatsApp is already in MobileStickyBar
  if (isMobile) return null;

  return (
    <>
      {/* WhatsApp Button — CSS transitions instead of framer-motion */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-[84px] lg:bottom-6 left-4 lg:left-6 z-[45] flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-forest transition-transform duration-200 hover:scale-110 active:scale-95"
        aria-label="Contacter via WhatsApp"
      >
        <span className={`transition-all duration-200 ${isOpen ? "rotate-90 opacity-0 scale-0 absolute" : "rotate-0 opacity-100 scale-100"}`}>
          <MessageCircle className="w-6 h-6 text-white" />
        </span>
        <span className={`transition-all duration-200 ${isOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-0 absolute"}`}>
          <X className="w-6 h-6 text-white" />
        </span>
      </button>

      {/* Chat Popup — CSS transitions */}
      <div
        className={`fixed bottom-[148px] lg:bottom-24 left-4 lg:left-6 z-50 w-80 max-w-[calc(100vw-2rem)] bg-card rounded-2xl shadow-2xl overflow-hidden border border-border transition-all duration-300 origin-bottom-left ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="p-4 text-cream bg-forest">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">ECOLE T3P</h3>
              <p className="text-xs text-white/80">Répond généralement en 1h</p>
            </div>
          </div>
        </div>

        {/* Chat Body */}
        <div className="p-4 bg-muted/30">
          <div className="bg-card rounded-lg p-3 shadow-sm mb-4 relative">
            <div 
              className="absolute -left-2 top-3 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-card border-b-8 border-b-transparent"
            />
            <p className="text-sm text-foreground">
              👋 Bonjour ! Une question sur nos formations Taxi, VTC ou VMDTR ? Envoyez-nous un message !
            </p>
            <span className="text-xs text-muted-foreground mt-1 block">
              ECOLE T3P
            </span>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tapez votre message..."
              className="flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              rows={2}
            />
            <div className="flex flex-col gap-1 self-end">
              <button
                onClick={handleSendMessage}
                className="p-3 rounded-full text-cream transition-transform hover:scale-105 bg-forest"
                aria-label="Envoyer sur WhatsApp"
                title="Ouvrir WhatsApp"
              >
                <Send className="w-5 h-5" />
              </button>
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Copier le lien"
                title="Copier le lien WhatsApp"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-forest" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
          <div className="mt-3 text-center">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline"
            >
              Ouvrir WhatsApp dans un nouvel onglet
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Ou appelez le <a href="tel:+33783787663" className="text-primary hover:underline">07 83 78 76 63</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default FloatingWhatsAppButton;
