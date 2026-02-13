import { motion } from "framer-motion";
import { GraduationCap, Star } from "lucide-react";
import AlmaLogo from "@/components/logo/AlmaLogo";

const items = [
  { icon: "🏛️", label: "Agréé Préfecture 92", iconColor: "#1A5276" },
  { icon: "📋", label: "CMA Île-de-France", iconColor: "#1A5276" },
];

const TrustBar = () => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="border-y"
    style={{ backgroundColor: "#F9FAFB", borderColor: "#EEEEEE" }}
  >
    <div className="container-custom" style={{ padding: "20px 0" }}>
      <div className="flex items-center justify-center gap-0 flex-wrap">
        {/* Agréé Préfecture */}
        <div className="flex items-center gap-2 opacity-75 hover:opacity-100 transition-all duration-200 cursor-default px-5 md:px-10">
          <span className="text-sm font-medium" style={{ color: "#374151" }}>
            <span style={{ color: "#1A5276" }}>🏛️</span> Agréé Préfecture 92
          </span>
        </div>

        <div className="hidden md:block h-5 w-px" style={{ backgroundColor: "#E0E0E0" }} />

        {/* CMA */}
        <div className="flex items-center gap-2 opacity-75 hover:opacity-100 transition-all duration-200 cursor-default px-5 md:px-10">
          <span className="text-sm font-medium" style={{ color: "#374151" }}>
            <span style={{ color: "#1A5276" }}>📋</span> CMA Île-de-France
          </span>
        </div>

        <div className="hidden md:block h-5 w-px" style={{ backgroundColor: "#E0E0E0" }} />

        {/* Alma */}
        <div className="flex items-center gap-2 opacity-75 hover:opacity-100 transition-all duration-200 cursor-default px-5 md:px-10">
          <AlmaLogo className="h-6" />
        </div>

        <div className="hidden md:block h-5 w-px" style={{ backgroundColor: "#E0E0E0" }} />

        {/* Google rating */}
        <div className="flex items-center gap-1.5 opacity-75 hover:opacity-100 transition-all duration-200 cursor-default px-5 md:px-10">
          <Star className="w-4 h-4 fill-[#F39C12]" style={{ color: "#F39C12" }} />
          <span className="text-sm font-medium" style={{ color: "#374151" }}>5.0/5 — 359 avis</span>
        </div>

        <div className="hidden md:block h-5 w-px" style={{ backgroundColor: "#E0E0E0" }} />

        {/* +2000 formés */}
        <div className="flex items-center gap-1.5 opacity-75 hover:opacity-100 transition-all duration-200 cursor-default px-5 md:px-10">
          <GraduationCap className="w-4 h-4" style={{ color: "#27AE60" }} />
          <span className="text-sm font-medium" style={{ color: "#374151" }}>+2000 formés</span>
        </div>
      </div>
    </div>
  </motion.section>
);

export default TrustBar;
