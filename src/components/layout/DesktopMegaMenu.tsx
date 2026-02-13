import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { megaMenuColumns } from "@/data/megaMenuData";
import { Badge } from "@/components/ui/badge";

interface Props {
  open: boolean;
}

const DesktopMegaMenu: React.FC<Props> = ({ open }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="mt-2 w-[calc(100vw-2rem)] max-w-[1200px] mx-auto bg-white border border-border rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] z-50 overflow-hidden"
        >
          {/* 4-column grid */}
          <div className="grid grid-cols-4 divide-x divide-border">
            {megaMenuColumns.map((col) => (
              <div key={col.id} className="py-5 px-4 flex flex-col">
                {/* Column header */}
                <div className="flex items-center gap-2 mb-1">
                  <col.icon className="w-4 h-4 text-forest" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-forest">
                    {col.title}
                  </h3>
                </div>
                <p className="text-[11px] italic text-muted-foreground mb-3">
                  {col.subtitle}
                </p>

                {/* Items */}
                <div className="flex flex-col gap-0.5 flex-1">
                  {col.items.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="group flex items-start gap-2 py-1.5 px-2 rounded-lg text-[13px] font-medium transition-colors hover:bg-forest/5"
                    >
                      <item.icon className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${item.color}`} />
                      <span className="flex-1 text-foreground group-hover:text-forest transition-colors leading-tight">
                        {item.name}
                      </span>
                      {item.badge && (
                        <Badge className="bg-orange-500 text-white text-[8px] px-1 py-0 h-3.5 font-bold border-0 flex-shrink-0">
                          {item.badge}
                        </Badge>
                      )}
                      <span className="text-[10px] text-forest/60 font-semibold whitespace-nowrap flex-shrink-0">
                        {item.detail}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Footer items (separator + extra links) */}
                {col.footer && col.footer.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border flex flex-col gap-0.5">
                    {col.footer.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="group flex items-start gap-2 py-1.5 px-2 rounded-lg text-[13px] font-medium transition-colors hover:bg-forest/5"
                      >
                        <item.icon className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${item.color}`} />
                        <span className="flex-1 text-foreground group-hover:text-forest transition-colors leading-tight">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-forest/60 font-semibold whitespace-nowrap flex-shrink-0">
                          {item.detail}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom bar: Alma + CTA */}
          <div className="flex items-center justify-between px-6 py-3 bg-forest/5 border-t border-border">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-forest">Alma</span> — Toutes nos formations payables en 2x, 3x ou 4x sans frais
            </p>
            <Link
              to="/formations"
              className="flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-forest-light transition-colors"
            >
              Voir toutes nos formations
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DesktopMegaMenu;
