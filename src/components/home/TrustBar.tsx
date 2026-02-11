import { motion } from "framer-motion";

const stats = [
  { icon: "🏛️", label: "Agréé Préfecture 92" },
  { icon: "⭐", label: "5.0/5 — 359 avis Google" },
  { icon: "👨‍🎓", label: "+2000 élèves formés" },
  { icon: "📅", label: "Depuis 2014" },
];

const TrustBar = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    style={{ backgroundColor: "#F8F9FA", borderTop: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB" }}
  >
    <div className="container-custom py-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-center gap-2 py-1">
            <span className="text-base">{stat.icon}</span>
            <span className="text-sm font-semibold" style={{ color: "#555" }}>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default TrustBar;
