import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Mail } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const emailSchema = z.string().email("Veuillez entrer un email valide");

const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Check if popup was already shown in this session
    const wasShown = sessionStorage.getItem("exitIntentShown");
    if (wasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from the top
      if (e.clientY <= 0) {
        setIsOpen(true);
        sessionStorage.setItem("exitIntentShown", "true");
        // Remove listener after showing
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    // Delay adding the listener to avoid triggering immediately
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000); // Wait 5 seconds before activating

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate email
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert into newsletter_subscribers
      const { error: insertError } = await supabase
        .from("newsletter_subscribers")
        .insert({
          email: email.trim().toLowerCase(),
          source: "exit_popup",
        });

      if (insertError) {
        if (insertError.code === "23505") {
          // Duplicate email
          toast({
            title: "Déjà inscrit !",
            description: "Cet email est déjà inscrit à notre newsletter.",
          });
          setIsOpen(false);
          return;
        }
        throw insertError;
      }

      // Send confirmation email
      try {
        await supabase.functions.invoke("send-newsletter-confirmation", {
          body: { email: email.trim().toLowerCase() },
        });
      } catch (emailError) {
        console.error("Email confirmation error:", emailError);
      }

      setIsSubmitted(true);
      toast({
        title: "Merci ! 🎉",
        description: "Vérifiez votre boîte mail pour votre guide gratuit.",
      });

      // Close popup after 3 seconds
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } catch (err) {
      console.error("Subscription error:", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={() => setIsOpen(false)}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-md"
          >
            <div className="bg-card rounded-2xl shadow-2xl overflow-hidden">
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors z-10"
                aria-label="Fermer"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Header with gradient */}
              <div className="bg-gradient-to-br from-forest to-forest/80 p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-4"
                >
                  <Gift className="w-8 h-8 text-gold" />
                </motion.div>
                <h2 className="text-2xl font-bold text-cream mb-2">
                  Attendez ! 🎁
                </h2>
                <p className="text-cream/80 text-sm">
                  Recevez notre guide gratuit pour réussir votre examen
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                {!isSubmitted ? (
                  <>
                    <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="text-gold">✓</span>
                        <span>Les 10 erreurs à éviter le jour J</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gold">✓</span>
                        <span>Conseils d'anciens lauréats</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gold">✓</span>
                        <span>Actualités des formations T3P</span>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                          }}
                          placeholder="Votre adresse email"
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      {error && (
                        <p className="text-sm text-destructive">{error}</p>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-4 rounded-lg font-semibold text-forest transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
                        style={{ backgroundColor: "#D4A853" }}
                      >
                        {isSubmitting ? "Envoi..." : "Recevoir mon guide gratuit"}
                      </button>
                    </form>

                    <p className="mt-4 text-xs text-center text-muted-foreground">
                      En vous inscrivant, vous acceptez de recevoir nos emails. 
                      Désinscription possible à tout moment.
                    </p>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-3xl">🎉</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      C'est parti !
                    </h3>
                    <p className="text-muted-foreground">
                      Votre guide arrive dans votre boîte mail.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
