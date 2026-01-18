import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Phone, ChevronDown, ChevronUp, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppointmentForm from "@/components/appointments/AppointmentForm";

const AppointmentSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const benefits = [
    { icon: Calendar, text: "Choix du jour et de l'heure", highlight: "Flexible" },
    { icon: Clock, text: "Entretien personnalisé", highlight: "30 min" },
    { icon: MapPin, text: "Visite du campus incluse", highlight: "Gratuit" },
    { icon: Phone, text: "Confirmation rapide", highlight: "24h" },
  ];

  return (
    <section id="rendez-vous" className="py-16 md:py-24 bg-gradient-to-b from-white via-cream/50 to-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-forest/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - Centered and impactful */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-forest/10 to-orange/10 text-forest rounded-full text-sm font-semibold mb-6 border border-forest/10"
          >
            <Sparkles className="w-4 h-4 text-orange" />
            Rencontrez-nous gratuitement
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-forest mb-4 leading-tight">
            Visitez notre campus
          </h2>
          <p className="text-lg text-muted-foreground">
            Prenez rendez-vous pour une visite personnalisée et discutez de votre projet avec nos conseillers.
          </p>
        </motion.div>

        {/* Benefits - Horizontal on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-forest/5 hover:shadow-md hover:border-forest/10 transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forest/10 to-forest/5 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5 text-forest" />
                </div>
                <div className="min-w-0">
                  <span className="inline-block px-2 py-0.5 bg-orange/10 text-orange text-xs font-bold rounded-full mb-1">
                    {benefit.highlight}
                  </span>
                  <p className="text-sm text-charcoal font-medium leading-tight">{benefit.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main CTA and Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          {/* CTA Button - Always visible */}
          <div className="bg-gradient-to-br from-forest to-forest/90 rounded-3xl p-6 md:p-8 shadow-xl border border-forest/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  Prêt à nous rencontrer ?
                </h3>
                <p className="text-white/80 text-sm md:text-base">
                  Réservez votre créneau en moins de 2 minutes
                </p>
              </div>
              <Button
                onClick={() => setIsFormOpen(!isFormOpen)}
                size="lg"
                className="bg-orange hover:bg-orange/90 text-white px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap"
              >
                {isFormOpen ? (
                  <>
                    <ChevronUp className="w-5 h-5 mr-2" />
                    Fermer
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5 mr-2" />
                    Prendre RDV
                  </>
                )}
              </Button>
            </div>

            {/* Campus info - Compact */}
            <div className="mt-6 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-center gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>21 Rue Hoche, Montrouge</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40" />
              <div className="flex items-center gap-2">
                <span>Métro : Mairie de Montrouge (L4)</span>
              </div>
            </div>
          </div>

          {/* Expandable Form */}
          <AnimatePresence>
            {isFormOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-forest/10">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-forest/10">
                    <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-forest">
                        Réservez votre créneau
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Tous les champs sont obligatoires
                      </p>
                    </div>
                  </div>
                  <AppointmentForm />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default AppointmentSection;
