import { motion } from "framer-motion";
import { GraduationCap, Star } from "lucide-react";
import AlmaLogo from "@/components/logo/AlmaLogo";

const TrustBar = () => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="border-y"
    style={{ backgroundColor: "#F8F9FA", borderColor: "#F0F0F0" }}
  >
    <div className="container-custom py-4 md:py-5">
      <div className="flex items-center justify-center gap-6 md:gap-10 lg:gap-14 flex-wrap">
        {/* Agréé Préfecture */}
        <div className="flex items-center gap-2 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-default">
          <span className="text-xs md:text-sm font-semibold" style={{ color: "#374151" }}>🏛️ Agréé Préfecture 92</span>
        </div>

        {/* CMA IDF */}
        <div className="flex items-center gap-2 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-default">
          <span className="text-xs md:text-sm font-semibold" style={{ color: "#374151" }}>📋 CMA Île-de-France</span>
        </div>

        {/* Alma */}
        <div className="flex items-center gap-2 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-default">
          <AlmaLogo className="h-5" />
        </div>

        {/* Google rating */}
        <div className="flex items-center gap-1.5 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-default">
          <Star className="w-3.5 h-3.5 text-[#FBBC05] fill-[#FBBC05]" />
          <span className="text-xs md:text-sm font-semibold" style={{ color: "#374151" }}>5.0/5 — 359 avis</span>
        </div>

        {/* +2000 formés */}
        <div className="flex items-center gap-1.5 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-default">
          <GraduationCap className="w-4 h-4" style={{ color: "#374151" }} />
          <span className="text-xs md:text-sm font-semibold" style={{ color: "#374151" }}>+2000 formés</span>
        </div>
      </div>
    </div>
  </motion.section>
);

export default TrustBar;
