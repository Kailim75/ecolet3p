import { useState, useEffect } from "react";

// Inline SVG to avoid lucide-react in lazy-loaded component
const ArrowUpIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed z-30 flex items-center justify-center w-11 h-11 rounded-full shadow-lg transition-all duration-200 bg-primary text-primary-foreground ${
        visible ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-75 pointer-events-none"
      }`}
      style={{
        bottom: window.innerWidth < 768 ? 80 : 80,
        right: 16,
      }}
      aria-label="Remonter en haut de la page"
    >
      <ArrowUpIcon />
    </button>
  );
};

export default ScrollToTopButton;
