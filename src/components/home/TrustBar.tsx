import { motion } from "framer-motion";

const stats = [
  { icon: "🏛️", label: "Agréé Préfecture 92" },
  { icon: "📋", label: "N° agrément 23/007" },
  { icon: "⭐", label: "5.0/5 Google (359 avis)" },
  { icon: "👨‍🎓", label: "+1200 élèves formés" },
];

const TrustBar = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white border-y border-border/40"
  >
    <div className="container-custom py-4">
      <div className="flex flex-wrap justify-center gap-x-0 gap-y-3">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex items-center">
            <div className="flex items-center gap-2 px-4 md:px-6">
              <span className="text-base">{stat.icon}</span>
              <span className="text-[13px] font-medium" style={{ color: "#666" }}>{stat.label}</span>
            </div>
            {i < stats.length - 1 && (
              <div className="hidden md:block w-px h-4 bg-border" />
            )}
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default TrustBar;
