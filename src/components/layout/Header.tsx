import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-soft py-2"
          : "bg-transparent py-4"
      }`}
    >
      {/* Top bar with phone - visible on scroll or always on pages other than home */}
      <div className={`container-custom ${isScrolled ? "block" : "hidden"}`}>
        <div className="flex items-center justify-end pb-2 border-b border-border/50">
          <a
            href="tel:0188750555"
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
          >
            <Phone className="w-4 h-4" />
            01 88 75 05 55
          </a>
        </div>
      </div>

      <div className="container-custom">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`text-2xl font-bold transition-colors ${
              isScrolled ? "text-primary" : "text-white"
            }`}>
              T3P Campus
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? isScrolled
                      ? "bg-primary text-primary-foreground"
                      : "bg-white/20 text-white"
                    : isScrolled
                    ? "text-foreground hover:bg-muted"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:0188750555"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              <Phone className="w-4 h-4" />
              01 88 75 05 55
            </a>
            <Button
              asChild
              className="btn-accent px-5 py-2 rounded-lg"
            >
              <Link to="/contact" className="flex items-center gap-2">
                Prendre rendez-vous
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-all ${
              isScrolled 
                ? "text-foreground hover:bg-muted" 
                : "text-white hover:bg-white/10"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-large animate-fade-in">
            <nav className="container-custom py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-all ${
                    isActive(link.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.name}
                  <ChevronRight className="w-5 h-5 opacity-50" />
                </Link>
              ))}
              
              <a
                href="tel:0188750555"
                className="flex items-center gap-2 px-4 py-3 text-primary font-medium"
              >
                <Phone className="w-5 h-5" />
                01 88 75 05 55
              </a>
              
              <Button asChild className="btn-accent mt-2 rounded-lg py-6 text-base">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  Prendre rendez-vous
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
