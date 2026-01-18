import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, GraduationCap, ChevronRight } from "lucide-react";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl shadow-medium py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isScrolled ? "gradient-primary shadow-primary" : "glass"
            }`}>
              <GraduationCap className={`w-6 h-6 transition-colors ${
                isScrolled ? "text-primary-foreground" : "text-white"
              }`} />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-tight transition-colors ${
                isScrolled ? "text-foreground" : "text-white"
              }`}>
                T3P Campus
              </span>
              <span className={`text-[10px] font-medium uppercase tracking-widest transition-colors ${
                isScrolled ? "text-muted-foreground" : "text-white/70"
              }`}>
                Centre de Formation
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? isScrolled
                      ? "bg-primary text-primary-foreground shadow-primary"
                      : "bg-white/20 text-white"
                    : isScrolled
                    ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button
              asChild
              className={`btn-accent px-6 py-2.5 rounded-full font-semibold ${
                isScrolled ? "" : "shadow-glow"
              }`}
            >
              <Link to="/contact" className="flex items-center gap-2">
                Nous contacter
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2.5 rounded-xl transition-all ${
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
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border shadow-large animate-fade-in">
            <nav className="container-custom py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                    isActive(link.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.name}
                  <ChevronRight className="w-5 h-5 opacity-50" />
                </Link>
              ))}
              <Button asChild className="btn-accent mt-4 rounded-xl py-6 text-base font-semibold">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  Nous contacter
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
