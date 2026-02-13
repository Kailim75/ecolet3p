import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { megaMenuColumns } from "@/data/megaMenuData";
import { Badge } from "@/components/ui/badge";

const MobileMegaMenu: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const allItems = (col: typeof megaMenuColumns[0]) =>
    [...col.items, ...(col.footer ?? [])];

  return (
    <div className="ml-3 pl-5 border-l-2 border-forest/10 py-1">
      {megaMenuColumns.map((col) => (
        <div key={col.id} className="mb-1">
          {/* Section toggle */}
          <button
            onClick={() => toggle(col.id)}
            className="w-full flex items-center gap-2 py-2.5 px-3 rounded-lg text-left transition-colors hover:bg-forest/5"
          >
            <col.icon className="w-4 h-4 text-forest flex-shrink-0" />
            <span className="flex-1 text-sm font-semibold text-foreground">
              {col.title}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                openSection === col.id ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Section items accordion */}
          <AnimatePresence>
            {openSection === col.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pl-6 pb-1">
                  {allItems(col).map((item, i) => {
                    // Show separator before footer items
                    const isFooterStart =
                      col.footer &&
                      col.footer.length > 0 &&
                      i === col.items.length;

                    return (
                      <React.Fragment key={item.name}>
                        {isFooterStart && (
                          <div className="my-1.5 border-t border-border" />
                        )}
                        <Link
                          to={item.path}
                          className="flex items-center gap-2 py-2 px-2 rounded-lg text-sm font-medium transition-colors hover:bg-forest/5"
                        >
                          <item.icon
                            className={`w-4 h-4 flex-shrink-0 ${item.color}`}
                          />
                          <span className="flex-1 text-foreground truncate">
                            {item.name}
                          </span>
                          {item.badge && (
                            <Badge className="bg-orange-500 text-white text-[9px] px-1.5 py-0 h-4 font-bold border-0">
                              {item.badge}
                            </Badge>
                          )}
                          <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                            {item.detail}
                          </span>
                        </Link>
                      </React.Fragment>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* Link to all formations */}
      <Link
        to="/formations"
        className="flex items-center gap-2 py-2.5 px-3 text-sm font-semibold text-forest hover:bg-forest/5 rounded-lg mt-1"
      >
        <span>→</span>
        Voir toutes les formations
      </Link>
    </div>
  );
};

export default MobileMegaMenu;
