import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const GuaranteeSection = () => {
  return (
    <section className="py-12 md:py-20" style={{ backgroundColor: "#1B4332" }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto"
        >
          {/* Shield icon */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h2 className="text-[24px] md:text-[36px] font-black text-white mb-4 leading-tight">
            Notre engagement réussite
          </h2>

          {/* Text */}
          <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.85)" }}>
            Si vous ne réussissez pas l'examen, nous vous réaccompagnons gratuitement
            jusqu'à la prochaine session disponible. Aucun frais pédagogique supplémentaire.
          </p>

          {/* Badge */}
          <span
            className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-4"
            style={{ backgroundColor: "#E8793A", color: "#FFFFFF" }}
          >
            Valable pour tous nos candidats assidus
          </span>

          {/* Link */}
          <Link
            to="/contact"
            className="text-xs underline underline-offset-4 transition-colors hover:text-white"
            style={{ color: "rgba(255,255,255,0.6)" }}
            aria-label="Voir les conditions de la garantie réussite"
          >
            Voir les conditions →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
