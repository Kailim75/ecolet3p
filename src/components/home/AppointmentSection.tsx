import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Phone } from "lucide-react";
import AppointmentForm from "@/components/appointments/AppointmentForm";

const AppointmentSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-cream via-white to-cream relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-forest/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-forest/10 text-forest rounded-full text-sm font-semibold mb-6">
              📅 Prenez rendez-vous
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-forest mb-6 leading-tight">
              Rencontrez notre équipe
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Vous avez des questions sur nos formations ? Prenez rendez-vous avec notre équipe pédagogique 
              pour une visite du campus et un entretien personnalisé.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {[
                { icon: Calendar, text: "Choix du jour et de l'heure" },
                { icon: Clock, text: "Entretien de 30 minutes" },
                { icon: MapPin, text: "Visite du campus incluse" },
                { icon: Phone, text: "Confirmation par téléphone" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-forest" />
                  </div>
                  <span className="text-charcoal font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Campus info */}
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-forest/10">
              <h3 className="font-bold text-forest mb-3">📍 Campus T3P Montrouge</h3>
              <p className="text-muted-foreground text-sm mb-2">
                21 Rue Hoche, 92120 Montrouge
              </p>
              <p className="text-muted-foreground text-sm">
                Métro : Mairie de Montrouge (L4)
              </p>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-8 border border-forest/10"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-forest mb-2">
                Réservez votre créneau
              </h3>
              <p className="text-muted-foreground">
                Remplissez le formulaire ci-dessous
              </p>
            </div>
            <AppointmentForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
