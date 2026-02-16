import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface TransformationItem {
  name: string;
  initials: string;
  before: { label: string; value: string }[];
  after: { label: string; value: string }[];
  quote: string;
  formation: string;
}

interface BeforeAfterBlockProps {
  title: string;
  subtitle: string;
  transformations: TransformationItem[];
}

const BeforeAfterBlock = ({ title, subtitle, transformations }: BeforeAfterBlockProps) => {
  return (
    <section className="section-padding bg-muted/50">
      <div className="container-custom">
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border bg-primary/5 text-primary border-primary/15">
            Avant / Après — Témoignages réels
          </span>
          <h2 className="section-title">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {transformations.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.12 }}
              className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Identity */}
              <div className="flex items-center gap-3 p-5 pb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">{t.name}</p>
                  <span className="text-[11px] font-semibold text-primary/70">{t.formation}</span>
                </div>
              </div>

              {/* Before */}
              <div className="px-5 py-3 border-t border-border">
                <p className="text-[11px] font-bold text-destructive/80 uppercase tracking-wider mb-2">❌ Avant</p>
                {t.before.map((b, j) => (
                  <div key={j} className="flex items-center gap-2 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive/50 shrink-0" />
                    <span className="text-xs text-muted-foreground">{b.label} :</span>
                    <span className="text-xs font-semibold text-foreground">{b.value}</span>
                  </div>
                ))}
              </div>

              {/* After */}
              <div className="px-5 py-3 bg-primary/[0.03] border-t border-border">
                <p className="text-[11px] font-bold text-primary uppercase tracking-wider mb-2">✅ Après</p>
                {t.after.map((a, j) => (
                  <div key={j} className="flex items-center gap-2 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                    <span className="text-xs text-muted-foreground">{a.label} :</span>
                    <span className="text-xs font-semibold text-foreground">{a.value}</span>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="px-5 py-3 border-t border-border">
                <p className="text-xs italic text-muted-foreground leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterBlock;
