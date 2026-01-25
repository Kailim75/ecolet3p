import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

const WHATSAPP_NUMBER = "33188750555"; // +33 1 88 75 05 55
const DEFAULT_MESSAGE = "Bonjour, je souhaite avoir des informations sur vos formations.";

const FloatingWhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);

  const handleSendMessage = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <>
      {/* WhatsApp Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-colors duration-300"
        style={{ 
          backgroundColor: "#25D366",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contacter via WhatsApp"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 left-6 z-50 w-80 bg-card rounded-2xl shadow-2xl overflow-hidden border border-border"
          >
            {/* Header */}
            <div 
              className="p-4 text-white"
              style={{ backgroundColor: "#25D366" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">T3P Campus</h3>
                  <p className="text-xs text-white/80">Répond généralement en 1h</p>
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-muted/30">
              {/* Bubble message */}
              <div className="bg-card rounded-lg p-3 shadow-sm mb-4 relative">
                <div 
                  className="absolute -left-2 top-3 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-card border-b-8 border-b-transparent"
                />
                <p className="text-sm text-foreground">
                  👋 Bonjour ! Une question sur nos formations Taxi, VTC ou VMDTR ? Envoyez-nous un message !
                </p>
                <span className="text-xs text-muted-foreground mt-1 block">
                  T3P Campus
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
                <button
                  onClick={handleSendMessage}
                  className="self-end p-3 rounded-full text-white transition-transform hover:scale-105"
                  style={{ backgroundColor: "#25D366" }}
                  aria-label="Envoyer sur WhatsApp"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingWhatsAppButton;
