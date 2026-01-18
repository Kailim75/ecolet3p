import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-baseline">
              <span className={`text-2xl font-black tracking-tight transition-all duration-300 ${
                isScrolled ? "text-gradient-blue" : "text-white"
              }`}>
                T3P
              </span>
              <span className={`text-xl font-medium ml-1 transition-all duration-300 ${
                isScrolled ? "text-gray-600" : "text-white/80"
              }`}>
                Campus
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-full ${
                  isActive(link.path)
                    ? isScrolled
                      ? "text-blue-600 bg-blue-50"
                      : "text-white bg-white/15"
                    : isScrolled
                    ? "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-orange-500 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:0188750555"
              className={`flex items-center gap-2.5 font-semibold transition-all duration-300 group ${
                isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-orange-300"
              }`}
            >
              <div className={`p-2 rounded-full transition-all duration-300 ${
                isScrolled ? "bg-blue-50 group-hover:bg-blue-100" : "bg-white/10 group-hover:bg-white/20"
              }`}>
                <Phone className="w-4 h-4" />
              </div>
              <span>01 88 75 05 55</span>
            </a>
            <Button
              asChild
              className="btn-premium-orange px-6 py-2.5 rounded-full text-sm"
            >
              <Link to="/contact" className="flex items-center gap-2">
                Prendre RDV
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 ${
              isScrolled 
                ? "text-gray-700 hover:bg-gray-100" 
                : "text-white hover:bg-white/10"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute top-1 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? "rotate-45 top-2.5" : ""
              }`} />
              <span className={`absolute top-2.5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`} />
              <span className={`absolute top-4 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 top-2.5" : ""
              }`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed inset-0 top-[72px] transition-all duration-500 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}>
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className={`relative bg-white mx-4 mt-4 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 ${
            isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}>
            <nav className="p-6 flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-between px-5 py-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.name}
                  <ArrowRight className="w-5 h-5 opacity-50" />
                </Link>
              ))}
              
              <div className="border-t border-gray-100 mt-4 pt-4">
                <a
                  href="tel:0188750555"
                  className="flex items-center gap-3 px-5 py-3 text-blue-600 font-semibold"
                >
                  <Phone className="w-5 h-5" />
                  01 88 75 05 55
                </a>
              </div>
              
              <Button 
                asChild 
                className="btn-premium-orange mt-2 rounded-xl py-6 text-base"
              >
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  Prendre rendez-vous
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
