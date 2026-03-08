import React, { useState, useEffect, lazy, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";

const RdvChoiceModal = lazy(() => import("./RdvChoiceModal"));

// Inline SVG icons to avoid lucide-react bundle on critical path
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

const XIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const PhoneIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const ChevronDownIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ArrowRightIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

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
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
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

  const isTransparent = isHomePage && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent ? "bg-black/10 backdrop-blur-sm" : "bg-card shadow-md"
        }`}
      >
        <div className="container-custom px-3 lg:px-4">
          <div className="flex items-center justify-between h-[72px] lg:h-[80px]">
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
              <img src={isTransparent ? "/images/ecole-t3p-logo-white.svg" : "/images/ecole-t3p-logo-color.svg"} alt="ÉCOLE T3P — Centre de Formation Agréé" className="h-[48px] lg:h-[56px] w-auto block" width={160} height={48} loading="eager" decoding="async" />
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
                    <button className={`relative flex items-center gap-0.5 px-1.5 py-2 text-[12.5px] font-medium transition-colors rounded-lg after:absolute after:bottom-0.5 after:left-1.5 after:right-1.5 after:h-[1.5px] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 ${isTransparent ? "text-white/90 hover:text-white after:bg-white/70" : "text-foreground hover:text-primary after:bg-primary"}`}>
                      {link.name}
                      <ChevronDownIcon className={`w-4 h-4 transition-transform ${hoverSubmenu === link.name ? "rotate-180" : ""}`} />
                    </button>
                    {/* CSS-only dropdown — no framer-motion */}
                    <div
                      className={`absolute top-full left-0 mt-1 bg-card border border-border rounded-xl shadow-card-hover py-2 min-w-[220px] z-50 transition-all duration-150 origin-top ${
                        hoverSubmenu === link.name
                          ? "opacity-100 scale-y-100 pointer-events-auto"
                          : "opacity-0 scale-y-95 pointer-events-none"
                      }`}
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
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path!}
                    className={`relative px-1.5 py-2 text-[12.5px] font-medium transition-colors rounded-lg after:absolute after:bottom-0.5 after:left-1.5 after:right-1.5 after:h-[1.5px] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 ${isTransparent ? "text-white/90 hover:text-white after:bg-white/70" : "text-foreground hover:text-primary after:bg-primary"}`}
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
                className={`flex items-center gap-1 text-xs font-semibold transition-colors whitespace-nowrap ${isTransparent ? "text-white/90 hover:text-white" : "text-primary hover:text-primary/80"}`}
              >
                <PhoneIcon className="w-3.5 h-3.5" />
                01 88 75 05 55
              </a>
              <button onClick={() => setIsRdvOpen(true)} className="btn-cta-orange px-3 py-1.5 text-xs font-bold rounded-lg inline-flex items-center gap-1 whitespace-nowrap">
                Prendre RDV
                <ArrowRightIcon className="w-3 h-3" />
              </button>
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="tel:0188750555"
                className={`w-9 h-9 rounded-full flex items-center justify-center ${isTransparent ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}
                aria-label="Appeler"
              >
                <PhoneIcon />
              </a>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`w-10 h-10 flex items-center justify-center ${isTransparent ? "text-white" : "text-foreground"}`}
                aria-label={isMenuOpen ? "Fermer" : "Menu"}
              >
                {isMenuOpen ? <XIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu — CSS transition instead of framer-motion */}
      <div
        className={`fixed inset-0 top-16 lg:hidden bg-card z-[60] overflow-y-auto transition-all duration-200 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
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
                      <ChevronDownIcon className={`w-4 h-4 transition-transform ${openSubmenu === link.name ? "rotate-180" : ""}`} />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        openSubmenu === link.name ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
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
                    </div>
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
              <PhoneIcon className="w-5 h-5" />
              01 88 75 05 55
            </a>
            <button
              onClick={() => { setIsMenuOpen(false); setIsRdvOpen(true); }}
              className="btn-cta-orange w-full py-3.5 text-center font-bold rounded-lg flex items-center justify-center gap-2"
            >
              Prendre RDV
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>

      {isRdvOpen && (
        <Suspense fallback={null}>
          <RdvChoiceModal isOpen={isRdvOpen} onClose={() => setIsRdvOpen(false)} />
        </Suspense>
      )}
    </>
  );
};

export default Header;
