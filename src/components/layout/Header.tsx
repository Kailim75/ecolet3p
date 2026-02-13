import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown, FileText, BookOpen, Info, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import PrefetchLink from "@/components/ui/PrefetchLink";
import { EcoleT3PMonogram } from "@/components/logo/EcoleT3PInstitutional";
import { useQuoteModal } from "@/components/quote/QuoteRequestModal";
import DesktopMegaMenu from "@/components/layout/DesktopMegaMenu";
import MobileMegaMenu from "@/components/layout/MobileMegaMenu";

const navLinks = [
  { name: "Formations", path: "/formations", hasSubmenu: true, icon: BookOpen },
  { name: "Paiement", path: "/paiement", icon: FileText },
  { name: "Blog", path: "/blog", icon: FileText },
  { name: "À propos", path: "/a-propos", icon: Info },
  { name: "Contact", path: "/contact", icon: Mail },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [mobileFormationsOpen, setMobileFormationsOpen] = useState(false);
  const location = useLocation();
  const { openQuoteModal } = useQuoteModal();
  const megaMenuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    setShowMegaMenu(false);
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

  // Close mega menu on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowMegaMenu(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const handleMegaEnter = () => {
    if (megaMenuTimer.current) clearTimeout(megaMenuTimer.current);
    megaMenuTimer.current = setTimeout(() => setShowMegaMenu(true), 150);
  };

  const handleMegaLeave = () => {
    if (megaMenuTimer.current) clearTimeout(megaMenuTimer.current);
    megaMenuTimer.current = setTimeout(() => setShowMegaMenu(false), 100);
  };

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
                    onMouseEnter={handleMegaEnter}
                    onMouseLeave={handleMegaLeave}
                  >
                    <PrefetchLink
                      to={link.path}
                      prefetchOnHover
                      className={`relative font-semibold text-sm uppercase tracking-wide transition-colors duration-200 py-2 flex items-center gap-1 ${
                        isFormationActive ? "text-forest" : "text-warm-gray-600 hover:text-forest"
                      }`}
                      aria-haspopup="true"
                      aria-expanded={showMegaMenu}
                    >
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showMegaMenu ? "rotate-180" : ""}`} />
                      {isFormationActive && (
                        <motion.div layoutId="activeNav" className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gold rounded-full" />
                      )}
                    </PrefetchLink>
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

      {/* Desktop Mega Menu — positioned outside header for full width */}
      <div
        className="hidden lg:block fixed top-0 left-0 right-0 z-[49]"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="container-custom relative"
          style={{ pointerEvents: showMegaMenu ? "auto" : "none", paddingTop: "72px" }}
          onMouseEnter={handleMegaEnter}
          onMouseLeave={handleMegaLeave}
        >
          <DesktopMegaMenu open={showMegaMenu} />
        </div>
      </div>

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
                              <MobileMegaMenu />
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
                <a
                  href="tel:0188750555"
                  className="flex items-center gap-3 py-3 px-4 rounded-xl bg-forest/5 font-semibold text-forest"
                >
                  <Phone className="w-5 h-5" />
                  <span>01 88 75 05 55</span>
                  <span className="ml-auto text-xs text-muted-foreground">Appeler</span>
                </a>

                <Button asChild className="btn-cta-orange w-full h-12 text-base font-bold">
                  <Link to="/contact">
                    S'inscrire à une formation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>

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
