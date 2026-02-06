import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import PrefetchLink from "@/components/ui/PrefetchLink";
import { EcoleT3PMonogram } from "@/components/logo/EcoleT3PInstitutional";

// Formations sub-menu structure
const formationsSubMenu = {
  initiales: {
    label: "Formations Initiales",
    items: [
      { name: "Formation TAXI", path: "/formations/taxi" },
      { name: "Formation VTC", path: "/formations/vtc" },
      { name: "Formation VMDTR", path: "/formations/vmdtr" },
    ],
  },
  continues: {
    label: "Formations Continues",
    items: [
      { name: "Continue TAXI (14h)", path: "/formations/continue-taxi" },
      { name: "Continue VTC (14h)", path: "/formations/continue-vtc" },
      { name: "Continue VMDTR (14h)", path: "/formations/continue-vmdtr" },
    ],
  },
  autres: {
    label: "Autres formations",
    items: [
      { name: "Mobilité Taxi", path: "/formations/mobilite" },
      { name: "Récupération de points", path: "/formations/recuperation-points" },
    ],
  },
};

// Services sub-menu
const servicesSubMenu = [
  { name: "Location véhicule examen", path: "/services/location-vehicule-examen" },
];

const navLinks = [
  { name: "Accueil", path: "/" },
  { name: "Formations", path: "/formations", hasSubmenu: "formations" },
  { name: "Services", path: "/services/location-vehicule-examen", hasSubmenu: "services" },
  { name: "Pourquoi ECOLE T3P", path: "/a-propos" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedMenus, setMobileExpandedMenus] = useState<string[]>([]);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isFormationActive = location.pathname.startsWith("/formations");
  const isServiceActive = location.pathname.startsWith("/services");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setMobileExpandedMenus([]);
  }, [location]);

  const toggleMobileMenu = (menuKey: string) => {
    setMobileExpandedMenus(prev => 
      prev.includes(menuKey) 
        ? prev.filter(m => m !== menuKey)
        : [...prev, menuKey]
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-cream-light shadow-md"
          : "bg-cream-light/95 backdrop-blur-sm"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <EcoleT3PMonogram className="w-9 h-9" theme="light" />
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold text-forest tracking-wide">ÉCOLE T3P</span>
              <span className="text-[9px] text-muted-foreground tracking-wider hidden sm:block">Centre de formation agréé Préfecture</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              link.hasSubmenu ? (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.hasSubmenu)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <PrefetchLink
                    to={link.path}
                    prefetchOnHover
                    className={`relative font-semibold text-sm uppercase tracking-wide transition-colors duration-200 py-2 flex items-center gap-1 ${
                      (link.hasSubmenu === "formations" && isFormationActive) || 
                      (link.hasSubmenu === "services" && isServiceActive)
                        ? "text-forest"
                        : "text-warm-gray-600 hover:text-forest"
                    }`}
                  >
                    {link.name}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === link.hasSubmenu ? "rotate-180" : ""}`} />
                    {((link.hasSubmenu === "formations" && isFormationActive) || 
                      (link.hasSubmenu === "services" && isServiceActive)) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gold rounded-full"
                      />
                    )}
                  </PrefetchLink>
                  
                  {/* Formations Dropdown */}
                  <AnimatePresence>
                    {openDropdown === "formations" && link.hasSubmenu === "formations" && (
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
                                  className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                                    isActive(subLink.path)
                                      ? "bg-forest/10 text-forest"
                                      : "text-warm-gray-700 hover:bg-forest/5 hover:text-forest"
                                  }`}
                                >
                                  {subLink.name}
                                </PrefetchLink>
                              ))}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Services Dropdown */}
                  <AnimatePresence>
                    {openDropdown === "services" && link.hasSubmenu === "services" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-cream-light border border-cream-dark rounded-xl shadow-xl overflow-hidden z-50"
                      >
                        <div className="py-2">
                          {servicesSubMenu.map((subLink) => (
                            <PrefetchLink
                              key={subLink.path}
                              to={subLink.path}
                              prefetchOnHover
                              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                                isActive(subLink.path)
                                  ? "bg-forest/10 text-forest"
                                  : "text-warm-gray-700 hover:bg-forest/5 hover:text-forest"
                              }`}
                            >
                              <Car className="w-4 h-4" />
                              {subLink.name}
                            </PrefetchLink>
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
                    isActive(link.path)
                      ? "text-forest"
                      : "text-warm-gray-600 hover:text-forest"
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gold rounded-full"
                    />
                  )}
                </PrefetchLink>
              )
            ))}
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
            <Button asChild className="btn-accent">
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-forest hover:text-forest-light transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-cream-light border-t border-cream-dark max-h-[80vh] overflow-y-auto"
          >
            <div className="container-custom py-6">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {link.hasSubmenu === "formations" ? (
                      <>
                        <button
                          onClick={() => toggleMobileMenu("formations")}
                          className={`w-full flex items-center justify-between text-lg font-semibold uppercase tracking-wide py-3 px-4 rounded-lg transition-colors ${
                            isFormationActive
                              ? "text-forest bg-forest/10"
                              : "text-warm-gray-700 hover:text-forest hover:bg-forest/5"
                          }`}
                        >
                          {link.name}
                          <ChevronDown className={`w-5 h-5 transition-transform ${mobileExpandedMenus.includes("formations") ? "rotate-180" : ""}`} />
                        </button>
                        
                        <AnimatePresence>
                          {mobileExpandedMenus.includes("formations") && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4 overflow-hidden"
                            >
                              {Object.entries(formationsSubMenu).map(([key, section]) => (
                                <div key={key} className="py-2">
                                  <p className="px-4 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    {section.label}
                                  </p>
                                  {section.items.map((subLink) => (
                                    <Link
                                      key={subLink.path}
                                      to={subLink.path}
                                      className={`block text-base font-medium py-2 px-4 rounded-lg transition-colors ${
                                        isActive(subLink.path)
                                          ? "text-forest bg-forest/10"
                                          : "text-warm-gray-600 hover:text-forest hover:bg-forest/5"
                                      }`}
                                    >
                                      {subLink.name}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : link.hasSubmenu === "services" ? (
                      <>
                        <button
                          onClick={() => toggleMobileMenu("services")}
                          className={`w-full flex items-center justify-between text-lg font-semibold uppercase tracking-wide py-3 px-4 rounded-lg transition-colors ${
                            isServiceActive
                              ? "text-forest bg-forest/10"
                              : "text-warm-gray-700 hover:text-forest hover:bg-forest/5"
                          }`}
                        >
                          {link.name}
                          <ChevronDown className={`w-5 h-5 transition-transform ${mobileExpandedMenus.includes("services") ? "rotate-180" : ""}`} />
                        </button>
                        
                        <AnimatePresence>
                          {mobileExpandedMenus.includes("services") && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4 overflow-hidden"
                            >
                              {servicesSubMenu.map((subLink) => (
                                <Link
                                  key={subLink.path}
                                  to={subLink.path}
                                  className={`flex items-center gap-2 text-base font-medium py-2 px-4 rounded-lg transition-colors ${
                                    isActive(subLink.path)
                                      ? "text-forest bg-forest/10"
                                      : "text-warm-gray-600 hover:text-forest hover:bg-forest/5"
                                  }`}
                                >
                                  <Car className="w-4 h-4" />
                                  {subLink.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={link.path}
                        className={`block text-lg font-semibold uppercase tracking-wide py-3 px-4 rounded-lg transition-colors ${
                          isActive(link.path)
                            ? "text-forest bg-forest/10"
                            : "text-warm-gray-700 hover:text-forest hover:bg-forest/5"
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>
              
              <div className="mt-6 pt-6 border-t border-cream-dark space-y-4">
                <a
                  href="tel:0188750555"
                  className="flex items-center gap-3 font-semibold text-forest py-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>01 88 75 05 55</span>
                </a>
                <Button asChild className="btn-accent w-full">
                  <Link to="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
