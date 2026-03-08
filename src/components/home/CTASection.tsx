import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuoteModal } from "@/components/quote/QuoteModalContext";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const CTASection = () => {
  const { openQuoteModal } = useQuoteModal();

  return (
    <section className="py-20 md:py-24" style={{ backgroundColor: "#1B4D3E" }}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
          >
            <h2 className="font-serif text-[28px] md:text-[36px] text-white leading-tight mb-4">
              Prêt à changer de carrière ?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Notre équipe vous répond sous 24h
            </p>

            {/* Mobile: action buttons stacked */}
            <div className="flex flex-col gap-3 mb-8 lg:hidden">
              <a
                href="tel:0188750555"
                className="flex items-center justify-center gap-2 w-full h-[52px] rounded-xl font-bold text-base text-white"
                style={{ backgroundColor: "#F97316", boxShadow: "0 4px 14px rgba(249,115,22,0.4)" }}
              >
                <Phone className="w-5 h-5" /> Appeler le 01 88 75 05 55
              </a>
              <a
                href="mailto:montrouge@ecolet3p.fr"
                className="flex items-center justify-center gap-2 w-full h-[52px] rounded-xl font-bold text-base bg-white"
                style={{ color: "#1A1A1A" }}
              >
                <Mail className="w-5 h-5" /> Envoyer un email
              </a>
              <a
                href="https://www.google.com/maps/place/ECOLE+T3P"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full h-[52px] rounded-xl font-bold text-base bg-white"
                style={{ color: "#1A1A1A" }}
              >
                <MapPin className="w-5 h-5" /> Voir sur Google Maps
              </a>
              <p className="text-white/60 text-sm text-center mt-1">
                <Clock className="w-4 h-4 inline mr-1" /> Lun–Ven : 9h30–18h00
              </p>
            </div>

            {/* Desktop: info list */}
            <div className="hidden lg:block space-y-4 mb-8">
              <a href="tel:0188750555" className="flex items-center gap-3 text-white/90 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
                <span className="font-medium">01 88 75 05 55</span>
              </a>
              <a href="mailto:montrouge@ecolet3p.fr" className="flex items-center gap-3 text-white/90 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
                <span className="font-medium">montrouge@ecolet3p.fr</span>
              </a>
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="w-5 h-5" />
                <span>3 rue Corneille, 92120 Montrouge</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Clock className="w-5 h-5" />
                <span>Lun–Ven : 9h30–18h00</span>
              </div>
            </div>
          </motion.div>

          {/* Right - CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: smoothEase }}
            className="bg-white rounded-2xl p-8 md:p-10"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
          >
            <h3 className="font-serif text-2xl mb-2" style={{ color: "#1A1A1A" }}>
              Demandez votre devis gratuit
            </h3>
            <p className="text-sm mb-6" style={{ color: "#777" }}>
              Recevez un devis personnalisé pour votre formation en moins de 24h.
            </p>

            <Button
              onClick={() => openQuoteModal()}
              className="btn-cta-orange w-full px-8 py-4 text-base rounded-lg mb-4"
            >
              Obtenir mon devis gratuit <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <p className="text-center text-xs flex flex-col sm:flex-row sm:justify-center gap-1 sm:gap-0" style={{ color: "#999" }}>
              <span>✓ Sans engagement</span> <span className="hidden sm:inline">&nbsp;</span>
              <span>✓ Réponse sous 24h</span> <span className="hidden sm:inline">&nbsp;</span>
              <span>✓ Paiement 4x sans frais</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
