import { motion } from "framer-motion";

const stats = [
  { value: "94%", label: "Taux de réussite" },
  { value: "+2000", label: "Chauffeurs formés" },
  { value: "5.0/5", label: "Note Google (359 avis)" },
  { value: "4x", label: "Paiement sans frais" },
];

const TrustBar = () => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    style={{ background: "linear-gradient(135deg, #0F4A32 0%, #166534 100%)" }}
  >
    <div className="container-custom py-6 md:py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-0">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex flex-col items-center text-center relative">
            {i > 0 && (
              <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-10" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
            )}
            <span className="text-[32px] md:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold text-white mb-0.5 md:mb-1">{stat.value}</span>
            <span className="text-xs md:text-sm xl:text-base text-white/80 leading-tight">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  </motion.section>
);

export default TrustBar;
