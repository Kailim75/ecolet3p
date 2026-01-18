import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const emailSchema = z.string().trim().email({ message: "Adresse email invalide" }).max(255);

interface NewsletterFormProps {
  source?: string;
  variant?: "inline" | "card";
}

const NewsletterForm = ({ source = "blog", variant = "card" }: NewsletterFormProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate email
    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      setErrorMessage(validation.error.errors[0].message);
      return;
    }

    setStatus("loading");

    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: validation.data, source });

      if (error) {
        if (error.code === "23505") {
          // Unique constraint violation
          setErrorMessage("Cette adresse email est déjà inscrite.");
          setStatus("error");
        } else {
          throw error;
        }
        return;
      }

      // Send confirmation email
      try {
        const { error: emailError } = await supabase.functions.invoke(
          "send-newsletter-confirmation",
          {
            body: { email: validation.data, source },
          }
        );
        
        if (emailError) {
          console.warn("Failed to send confirmation email:", emailError);
          // Don't block the subscription if email fails
        }
      } catch (emailErr) {
        console.warn("Email sending error:", emailErr);
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${variant === "card" ? "bg-forest/5 rounded-2xl p-8" : ""} text-center`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle className="w-8 h-8 text-forest" />
        </motion.div>
        <h3 className="text-xl font-bold text-forest mb-2">Merci pour votre inscription !</h3>
        <p className="text-warm-gray-600">
          Vous recevrez nos prochains articles et conseils directement dans votre boîte mail.
        </p>
      </motion.div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray-400" />
          <Input
            type="email"
            placeholder="Votre adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-12 bg-white border-border"
            disabled={status === "loading"}
          />
        </div>
        <Button
          type="submit"
          className="btn-primary h-12 px-6"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Send className="w-4 h-4" />
            </motion.div>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              S'inscrire
            </>
          )}
        </Button>
        {(status === "error" || errorMessage) && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm flex items-center gap-1 sm:absolute sm:-bottom-6"
          >
            <AlertCircle className="w-4 h-4" />
            {errorMessage}
          </motion.p>
        )}
      </form>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-forest to-forest-light rounded-2xl p-8 md:p-10 text-cream"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
          <Mail className="w-6 h-6 text-gold" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Restez informé</h3>
          <p className="text-cream/70 text-sm">Conseils et actualités du secteur</p>
        </div>
      </div>

      <p className="text-cream/80 mb-6">
        Recevez nos meilleurs articles, guides pratiques et conseils pour réussir votre carrière de chauffeur professionnel.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray-400" />
          <Input
            type="email"
            placeholder="Votre adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-12 bg-white/10 border-cream/20 text-cream placeholder:text-cream/50 focus:border-gold"
            disabled={status === "loading"}
          />
        </div>

        {(status === "error" || errorMessage) && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-300 text-sm flex items-center gap-1"
          >
            <AlertCircle className="w-4 h-4" />
            {errorMessage}
          </motion.p>
        )}

        <Button
          type="submit"
          className="w-full bg-gold text-forest font-bold h-12 hover:bg-gold-light"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Inscription en cours...
            </motion.div>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              S'inscrire à la newsletter
            </>
          )}
        </Button>

        <p className="text-cream/50 text-xs text-center">
          En vous inscrivant, vous acceptez de recevoir nos emails. Désabonnement possible à tout moment.
        </p>
      </form>
    </motion.div>
  );
};

export default NewsletterForm;
