import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import PrefetchLink from "@/components/ui/PrefetchLink";

const navLinks = [
  { name: "Accueil", path: "/" },
  { name: "Formations", path: "/formations" },
  { name: "Blog", path: "/blog" },
  { name: "À propos", path: "/a-propos" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const scrollToAppointment = () => {
    setIsMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation then scroll
      setTimeout(() => {
        const element = document.getElementById("rendez-vous");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      const element = document.getElementById("rendez-vous");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
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
          {/* Logo - LiveMentor style */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center">
              <span className="text-cream text-lg font-bold">T</span>
            </div>
            <span className="text-xl font-black text-forest tracking-tight uppercase">T3P Campus</span>
          </Link>

          {/* Desktop Navigation with Prefetch */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
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
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:0188750555"
              className="flex items-center gap-2 font-semibold text-forest hover:text-forest-light transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>+33 1 88 75 05 55</span>
            </a>
            <Button
              onClick={scrollToAppointment}
              className="btn-accent"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Prendre RDV
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
            className="lg:hidden bg-cream-light border-t border-cream-dark"
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
                  </motion.div>
                ))}
                {/* Appointment link in mobile menu */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                >
                  <button
                    onClick={scrollToAppointment}
                    className="w-full text-left block text-lg font-semibold uppercase tracking-wide py-3 px-4 rounded-lg transition-colors text-gold-dark hover:bg-gold/10"
                  >
                    <span className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Prendre RDV
                    </span>
                  </button>
                </motion.div>
              </nav>
              
              <div className="mt-6 pt-6 border-t border-cream-dark space-y-4">
                <a
                  href="tel:0188750555"
                  className="flex items-center gap-3 font-semibold text-forest py-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>+33 1 88 75 05 55</span>
                </a>
                <Button asChild className="btn-primary w-full">
                  <Link to="/contact">NOUS CONTACTER</Link>
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
