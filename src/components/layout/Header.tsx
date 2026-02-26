import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import RdvChoiceModal from "./RdvChoiceModal";
import EcoleT3PLogoV5C from "../logo/EcoleT3PLogoV5C";

const navLinks = [
  {
    name: "Devenir Chauffeur",
    hasSubmenu: true,
    children: [
      { name: "Formation VTC", path: "/formations/vtc" },
      { name: "Formation TAXI", path: "/formations/taxi" },
      { name: "Formation VMDTR", path: "/formations/vmdtr" },
      { name: "Location véhicule examen", path: "/services/location-vehicule-examen" },
    ],
  },
  {
    name: "Renouveler sa Carte",
    hasSubmenu: true,
    children: [
      { name: "Renouvellement VTC", path: "/formations/continue-vtc" },
      { name: "Renouvellement TAXI", path: "/formations/continue-taxi" },
      { name: "Renouvellement VMDTR", path: "/formations/continue-vmdtr" },
    ],
  },
  {
    name: "Services Pro",
    hasSubmenu: true,
    children: [
      { name: "Passerelle TAXI↔VTC", path: "/passerelle-vtc-taxi" },
      { name: "Accessibilité TPMR", path: "/formation-accessibilite-pmr" },
      { name: "Gestion d'activité", path: "/accompagnement-gestion-activite" },
      { name: "Aide administrative", path: "/aide-administrative-creation-entreprise" },
    ],
  },
  { name: "Récupération de Points", path: "/stage-recuperation-points" },
  { name: "Témoignages", path: "/a-propos" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [hoverSubmenu, setHoverSubmenu] = useState<string | null>(null);
  const [isRdvOpen, setIsRdvOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenSubmenu(null);
    setHoverSubmenu(null);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-card shadow-md" : "bg-card/95 backdrop-blur-sm"
        }`}
      >
        <div className="container-custom px-3 lg:px-4">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link
              to="/"
              className="flex-shrink-0 flex items-center gap-2"
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <EcoleT3PLogoV5C className="h-16 lg:h-20 w-auto" variant="color" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) =>
                link.hasSubmenu ? (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setHoverSubmenu(link.name)}
                    onMouseLeave={() => setHoverSubmenu(null)}
                  >
                    <button className="flex items-center gap-1 px-2 py-2 text-[13px] font-medium text-foreground hover:text-primary transition-colors rounded-lg">
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${hoverSubmenu === link.name ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {hoverSubmenu === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 bg-card border border-border rounded-xl shadow-card-hover py-2 min-w-[220px] z-50"
                        >
                          {link.children?.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className="block px-4 py-2.5 text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path!}
                    className="px-2 py-2 text-[13px] font-medium text-foreground hover:text-primary transition-colors rounded-lg"
                  >
                    {link.name}
                  </Link>
                )
              )}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex flex-shrink-0 items-center gap-2">
              <a
                href="tel:0188750555"
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5" />
                01 88 75 05 55
              </a>
              <button onClick={() => setIsRdvOpen(true)} className="btn-cta-orange px-3 py-1.5 text-xs font-bold rounded-lg inline-flex items-center gap-1 whitespace-nowrap">
                Prendre RDV
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="tel:0188750555"
                className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center"
                aria-label="Appeler"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 flex items-center justify-center text-foreground"
                aria-label={isMenuOpen ? "Fermer" : "Menu"}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-16 lg:hidden bg-card z-[60] overflow-y-auto"
          >
            <div className="container-custom py-4 pb-32">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.hasSubmenu ? (
                      <>
                        <button
                          onClick={() => setOpenSubmenu(openSubmenu === link.name ? null : link.name)}
                          className="w-full flex items-center justify-between py-3 px-3 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                        >
                          {link.name}
                          <ChevronDown className={`w-4 h-4 transition-transform ${openSubmenu === link.name ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {openSubmenu === link.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pb-2 space-y-1">
                                {link.children?.map((child) => (
                                  <Link
                                    key={child.path}
                                    to={child.path}
                                    className="block py-2.5 px-3 text-sm text-muted-foreground hover:text-primary rounded-lg hover:bg-secondary transition-colors"
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={link.path!}
                        className="block py-3 px-3 text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <a
                  href="tel:0188750555"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg bg-secondary font-semibold text-primary text-sm"
                >
                  <Phone className="w-5 h-5" />
                  01 88 75 05 55
                </a>
                <button
                  onClick={() => { setIsMenuOpen(false); setIsRdvOpen(true); }}
                  className="btn-cta-orange w-full py-3.5 text-center font-bold rounded-lg flex items-center justify-center gap-2"
                >
                  Prendre RDV
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <RdvChoiceModal isOpen={isRdvOpen} onClose={() => setIsRdvOpen(false)} />
    </>
  );
};

export default Header;
