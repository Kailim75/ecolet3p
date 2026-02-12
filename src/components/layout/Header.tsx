import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown, FileText, CarTaxiFront, Car, Bike, RefreshCw, ArrowRight, BookOpen, Info, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import PrefetchLink from "@/components/ui/PrefetchLink";
import { EcoleT3PMonogram } from "@/components/logo/EcoleT3PInstitutional";
import { useQuoteModal } from "@/components/quote/QuoteRequestModal";

// Formations sub-menu structure
const formationsSubMenu = {
  initiales: {
    label: "Formations Initiales",
    items: [
      { name: "Formation TAXI", path: "/formations/taxi", icon: CarTaxiFront, color: "text-amber-600" },
      { name: "Formation VTC", path: "/formations/vtc", icon: Car, color: "text-forest" },
      { name: "Formation VMDTR", path: "/formations/vmdtr", icon: Bike, color: "text-orange-600" },
    ],
  },
  continues: {
    label: "Formations Continues",
    items: [
      { name: "Continue TAXI (14h)", path: "/formations/continue-taxi", icon: RefreshCw, color: "text-amber-600" },
      { name: "Continue VTC (14h)", path: "/formations/continue-vtc", icon: RefreshCw, color: "text-forest" },
      { name: "Continue VMDTR (14h)", path: "/formations/continue-vmdtr", icon: RefreshCw, color: "text-orange-600" },
    ],
  },
  autres: {
    label: "Autres formations",
    items: [
      { name: "Mobilité Taxi", path: "/formations/mobilite", icon: ArrowRight, color: "text-forest" },
      { name: "Récupération de points", path: "/formations/recuperation-points", icon: MapPin, color: "text-forest" },
    ],
  },
};

const navLinks = [
  { name: "Formations", path: "/formations", hasSubmenu: true, icon: BookOpen },
  { name: "Blog", path: "/blog", icon: FileText },
  { name: "À propos", path: "/a-propos", icon: Info },
  { name: "Contact", path: "/contact", icon: Mail },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileFormationsOpen, setMobileFormationsOpen] = useState(false);
  const location = useLocation();
  const { openQuoteModal } = useQuoteModal();

  const isActive = (path: string) => location.pathname === path;
  const isFormationActive = location.pathname.startsWith("/formations");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setMobileFormationsOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-cream-light shadow-md"
          : "bg-cream-light/95 backdrop-blur-sm"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <EcoleT3PMonogram className="w-8 h-8 lg:w-9 lg:h-9" theme="light" />
            <span className="text-lg lg:text-xl font-serif font-bold text-forest tracking-wide">ÉCOLE T3P</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) =>
              link.hasSubmenu ? (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <PrefetchLink
                    to={link.path}
                    prefetchOnHover
                    className={`relative font-semibold text-sm uppercase tracking-wide transition-colors duration-200 py-2 flex items-center gap-1 ${
                      isFormationActive ? "text-forest" : "text-warm-gray-600 hover:text-forest"
                    }`}
                  >
                    {link.name}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`} />
                    {isFormationActive && (
                      <motion.div layoutId="activeNav" className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gold rounded-full" />
                    )}
                  </PrefetchLink>

                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-72 bg-cream-light border border-cream-dark rounded-xl shadow-xl overflow-hidden z-50"
                      >
                        <div className="py-2">
                          {Object.entries(formationsSubMenu).map(([key, section]) => (
                            <div key={key} className="py-1">
                              <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                {section.label}
                              </p>
                              {section.items.map((subLink) => (
                                <PrefetchLink
                                  key={subLink.path}
                                  to={subLink.path}
                                  prefetchOnHover
                                  className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                                    isActive(subLink.path)
                                      ? "bg-forest/10 text-forest"
                                      : "text-warm-gray-700 hover:bg-forest/5 hover:text-forest"
                                  }`}
                                >
                                  <subLink.icon className={`w-4 h-4 ${subLink.color}`} />
                                  {subLink.name}
                                </PrefetchLink>
                              ))}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <PrefetchLink
                  key={link.path}
                  to={link.path}
                  prefetchOnHover={link.path !== "/"}
                  className={`relative font-semibold text-sm uppercase tracking-wide transition-colors duration-200 py-2 ${
                    isActive(link.path) ? "text-forest" : "text-warm-gray-600 hover:text-forest"
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div layoutId="activeNav" className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gold rounded-full" />
                  )}
                </PrefetchLink>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:0188750555"
              className="flex items-center gap-2 font-semibold text-forest hover:text-forest-light transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>01 88 75 05 55</span>
            </a>
            <Button asChild className="btn-cta-orange">
              <Link to="/contact">S'inscrire</Link>
            </Button>
            <Button
              onClick={() => openQuoteModal()}
              variant="outline"
              className="border-forest text-forest hover:bg-forest/5"
            >
              <FileText className="w-4 h-4 mr-1" />
              Devis
            </Button>
          </div>

          {/* Mobile: Phone + Menu Button */}
          <div className="flex items-center gap-1 lg:hidden">
            <a
              href="tel:0188750555"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-forest/10 text-forest"
              aria-label="Appeler"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              className="flex items-center justify-center w-10 h-10 text-forest hover:bg-forest/5 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 lg:hidden bg-cream-light z-[60] overflow-y-auto"
          >
            <div className="container-custom py-6 pb-32 flex flex-col min-h-full">
              {/* Navigation */}
              <nav className="flex flex-col gap-0.5">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {link.hasSubmenu ? (
                      <>
                        <button
                          onClick={() => setMobileFormationsOpen(!mobileFormationsOpen)}
                          className={`w-full flex items-center gap-3 py-3.5 px-4 rounded-xl text-left transition-colors ${
                            isFormationActive
                              ? "text-forest bg-forest/10"
                              : "text-foreground hover:bg-forest/5"
                          }`}
                        >
                          <link.icon className="w-5 h-5 text-forest" />
                          <span className="text-[15px] font-semibold flex-1">{link.name}</span>
                          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${mobileFormationsOpen ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                          {mobileFormationsOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-3 pl-5 border-l-2 border-forest/10 py-1">
                                {Object.entries(formationsSubMenu).map(([key, section]) => (
                                  <div key={key} className="mb-2">
                                    <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                                      {section.label}
                                    </p>
                                    {section.items.map((subLink) => (
                                      <Link
                                        key={subLink.path}
                                        to={subLink.path}
                                        className={`flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                                          isActive(subLink.path)
                                            ? "text-forest bg-forest/10"
                                            : "text-warm-gray-700 hover:bg-forest/5"
                                        }`}
                                      >
                                        <subLink.icon className={`w-4 h-4 flex-shrink-0 ${subLink.color}`} />
                                        {subLink.name}
                                      </Link>
                                    ))}
                                  </div>
                                ))}

                                {/* Link to all formations */}
                                <Link
                                  to="/formations"
                                  className="flex items-center gap-2 py-2.5 px-3 text-sm font-semibold text-forest hover:bg-forest/5 rounded-lg"
                                >
                                  <ArrowRight className="w-4 h-4" />
                                  Voir toutes les formations
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={link.path}
                        className={`flex items-center gap-3 py-3.5 px-4 rounded-xl text-[15px] font-semibold transition-colors ${
                          isActive(link.path)
                            ? "text-forest bg-forest/10"
                            : "text-foreground hover:bg-forest/5"
                        }`}
                      >
                        <link.icon className="w-5 h-5 text-forest" />
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Separator + CTAs */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-6 pt-6 border-t border-cream-dark space-y-3"
              >
                {/* Phone */}
                <a
                  href="tel:0188750555"
                  className="flex items-center gap-3 py-3 px-4 rounded-xl bg-forest/5 font-semibold text-forest"
                >
                  <Phone className="w-5 h-5" />
                  <span>01 88 75 05 55</span>
                  <span className="ml-auto text-xs text-muted-foreground">Appeler</span>
                </a>

                {/* Primary CTA */}
                <Button asChild className="btn-cta-orange w-full h-12 text-base font-bold">
                  <Link to="/contact">
                    S'inscrire à une formation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>

                {/* Secondary CTA */}
                <Button
                  onClick={() => { openQuoteModal(); setIsMenuOpen(false); }}
                  variant="outline"
                  className="w-full h-11 border-forest/20 text-forest"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Demander un devis gratuit
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
