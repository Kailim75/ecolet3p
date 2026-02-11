import React from "react";
import { motion, type Easing } from "framer-motion";
import { ArrowRight, Car, Bike, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import PrefetchLink from "@/components/ui/PrefetchLink";

const smoothEase: Easing = [0.22, 1, 0.36, 1];

const vehicleServices = [
  {
    id: "vtc",
    title: "Examen VTC",
    price: "189",
    icon: Car,
    features: ["2h de conduite", "Véhicule conforme", "Mise à disposition jour J"],
  },
  {
    id: "taxi",
    title: "Examen TAXI",
    subtitle: "75 & banlieue",
    price: "249",
    icon: Car,
    features: ["2h de conduite", "Véhicule conforme", "Mise à disposition jour J"],
  },
  {
    id: "vmdtr",
    title: "Examen VMDTR",
    price: "299",
    icon: Bike,
    features: ["2h de conduite", "Moto conforme", "Mise à disposition jour J"],
  },
];

const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } }
};

const ServicesSection = () => {
  return (
    <section className="section-padding bg-forest/5">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-forest mb-4">
            Location de véhicule pour examen
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Véhicule double commande conforme aux exigences réglementaires
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {vehicleServices.map((service) => {
            const IconComponent = service.icon;
            
            return (
              <motion.div
                key={service.id}
                variants={staggerItemVariants}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(27, 77, 62, 0.12)" }}
                className="bg-card rounded-[16px] p-8 border border-border/50 hover:border-gold/30 transition-all duration-300 text-center"
                style={{ boxShadow: "0 8px 32px rgba(27, 77, 62, 0.08)" }}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-6 h-6 text-gold" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-forest mb-1">{service.title}</h3>
                {service.subtitle && (
                  <p className="text-sm text-muted-foreground mb-3">{service.subtitle}</p>
                )}

                {/* Price */}
                <p className="text-3xl font-black text-forest mb-4">
                  {service.price} <span className="text-base font-normal text-muted-foreground">€ TTC</span>
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button asChild variant="outline" className="w-full">
                  <PrefetchLink to="/services/location-vehicule-examen">
                    Réserver
                  </PrefetchLink>
                </Button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card rounded-xl p-4 border border-border/50 flex items-start gap-3 max-w-2xl mx-auto"
        >
          <Info className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Ce service est un accompagnement logistique. Il ne constitue pas une formation.
          </p>
        </motion.div>

        {/* Secondary link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8"
        >
          <PrefetchLink 
            to="/services/location-vehicule-examen" 
            className="inline-flex items-center gap-2 text-forest font-semibold hover:text-gold text-sm uppercase link-underline"
          >
            En savoir plus sur la location <ArrowRight className="w-4 h-4" />
          </PrefetchLink>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
