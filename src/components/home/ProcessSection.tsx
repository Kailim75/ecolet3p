import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const steps = [
  { number: 1, icon: "📞", title: "Contactez-nous", description: "Appelez ou remplissez le formulaire" },
  { number: 2, icon: "📋", title: "Choisissez votre formation", description: "Taxi, VTC, VMDTR ou Continue" },
  { number: 3, icon: "💰", title: "Financement", description: "CPF, France Travail ou personnel" },
  { number: 4, icon: "🎓", title: "Démarrez votre formation", description: "Prochaine session : mars 2026" },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } }
};

const ProcessSection = () => {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-[28px] md:text-[36px] mb-4" style={{ color: "#1A1A1A" }}>
            Comment s'inscrire ?
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          {/* Horizontal line connecting steps (desktop) */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5" style={{ backgroundColor: "#E0E0E0" }} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={staggerItem}
                className="flex flex-col items-center text-center relative"
              >
                {/* Vertical line connecting steps (mobile) */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden absolute top-16 left-1/2 -translate-x-1/2 w-0.5 h-8" style={{ backgroundColor: "#E0E0E0" }} />
                )}

                {/* Number circle */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-4 relative z-10"
                  style={{ backgroundColor: "#1B4D3E", color: "#FFFFFF" }}
                >
                  {step.number}
                </div>

                {/* Emoji icon */}
                <span className="text-2xl mb-3">{step.icon}</span>

                {/* Title */}
                <h3 className="font-bold text-base mb-1" style={{ color: "#1A1A1A" }}>{step.title}</h3>

                {/* Description */}
                <p className="text-sm" style={{ color: "#777" }}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button asChild className="btn-cta-orange px-8 py-4 text-base rounded-lg w-full md:w-auto">
            <Link to="/contact">
              Commencer mon inscription <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
