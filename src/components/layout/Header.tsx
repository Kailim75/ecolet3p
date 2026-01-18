import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Accueil", path: "/" },
  { name: "Formations", path: "/formations" },
  { name: "À propos", path: "/a-propos" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md border-b border-gray-100"
          : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold" style={{ color: '#0F4C81' }}>T3P</span>
            <span className="text-2xl font-medium text-gray-500 ml-1">Campus</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium transition-colors duration-200 py-2 ${
                  isActive(link.path)
                    ? "text-orange-500"
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: '#FF6B35' }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:0188750555"
              className="flex items-center gap-2 font-medium transition-colors"
              style={{ color: '#0F4C81' }}
            >
              <Phone className="w-4 h-4" />
              <span>01 88 75 05 55</span>
            </a>
            <Button asChild className="btn-primary">
              <Link to="/contact">Prendre rendez-vous</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-orange-500 transition-colors"
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
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="container-custom py-6">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`block text-xl font-medium py-2 transition-colors ${
                        isActive(link.path)
                          ? "text-orange-500"
                          : "text-gray-700 hover:text-orange-500"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                <a
                  href="tel:0188750555"
                  className="flex items-center gap-2 font-medium"
                  style={{ color: '#0F4C81' }}
                >
                  <Phone className="w-5 h-5" />
                  <span>01 88 75 05 55</span>
                </a>
                <Button asChild className="btn-primary w-full">
                  <Link to="/contact">Prendre rendez-vous</Link>
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
