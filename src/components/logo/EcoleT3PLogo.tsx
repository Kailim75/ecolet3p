import React from "react";

interface LogoProps {
  className?: string;
  variant?: "full" | "icon" | "horizontal" | "stamp";
  theme?: "color" | "white" | "mono" | "gold" | "stamp";
}

export const EcoleT3PIcon = ({ 
  className = "w-10 h-10",
  theme = "color" 
}: { className?: string; theme?: "color" | "white" | "mono" | "gold" | "stamp" }) => {
  // Stamp vintage version
  if (theme === "stamp") {
    return (
      <svg viewBox="0 0 120 120" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="roughEdgeIcon" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5"/>
          </filter>
        </defs>
        <g transform="rotate(-3 60 60)" filter="url(#roughEdgeIcon)">
          <circle cx="60" cy="60" r="55" fill="none" stroke="#1B4D3E" strokeWidth="4"/>
          <circle cx="60" cy="60" r="50" fill="none" stroke="#1B4D3E" strokeWidth="2"/>
          <g fill="#1B4D3E">
            <circle cx="60" cy="8" r="2"/>
            <circle cx="60" cy="112" r="2"/>
            <circle cx="8" cy="60" r="2"/>
            <circle cx="112" cy="60" r="2"/>
          </g>
          <circle cx="60" cy="60" r="42" fill="none" stroke="#1B4D3E" strokeWidth="1" strokeDasharray="3 2"/>
          {/* ECOLE T3P - Main brand name */}
          <text x="60" y="45" textAnchor="middle" fontFamily="Plus Jakarta Sans, Arial, sans-serif" fontSize="12" fontWeight="900" fill="#1B4D3E" letterSpacing="0.05em">ECOLE</text>
          <text x="60" y="68" textAnchor="middle" fontFamily="Plus Jakarta Sans, Arial, sans-serif" fontSize="28" fontWeight="900" fill="#1B4D3E" letterSpacing="-0.02em">T3P</text>
          {/* Road symbol */}
          <path d="M35 85 L60 76 L85 85" stroke="#D4A853" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <circle cx="60" cy="76" r="3" fill="#D4A853"/>
          {/* Stars decoration */}
          <text x="22" y="62" fontSize="8" fill="#D4A853">★</text>
          <text x="93" y="62" fontSize="8" fill="#D4A853">★</text>
        </g>
      </svg>
    );
  }
  // Gold premium version - matches the favicon
  if (theme === "gold") {
    return (
      <svg viewBox="0 0 60 60" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldGradientIconPremium" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E4BE73"/>
            <stop offset="50%" stopColor="#D4A853"/>
            <stop offset="100%" stopColor="#C49843"/>
          </linearGradient>
        </defs>
        <circle cx="30" cy="30" r="28" fill="url(#goldGradientIconPremium)"/>
        <circle cx="30" cy="30" r="24" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.4"/>
        <text x="30" y="28" textAnchor="middle" fontFamily="Plus Jakarta Sans, Arial, sans-serif" fontSize="16" fontWeight="900" fill="#FFFFFF" letterSpacing="-0.02em">T3P</text>
        <path d="M16 40 L30 33 L44 40" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="30" cy="33" r="2.5" fill="#FFFFFF"/>
      </svg>
    );
  }

  if (theme === "white") {
    return (
      <svg viewBox="0 0 60 60" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="28" fill="#FFFFFF"/>
        <circle cx="30" cy="30" r="24" fill="none" stroke="#1B4D3E" strokeWidth="2" opacity="0.2"/>
        <text x="30" y="28" textAnchor="middle" fontFamily="Plus Jakarta Sans, Arial, sans-serif" fontSize="16" fontWeight="900" fill="#1B4D3E" letterSpacing="-0.02em">T3P</text>
        <path d="M16 40 L30 33 L44 40" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="30" cy="33" r="2.5" fill="#D4A853"/>
      </svg>
    );
  }

  if (theme === "mono") {
    return (
      <svg viewBox="0 0 60 60" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="28" fill="#1B4D3E"/>
        <circle cx="30" cy="30" r="24" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.2"/>
        <text x="30" y="28" textAnchor="middle" fontFamily="Plus Jakarta Sans, Arial, sans-serif" fontSize="16" fontWeight="900" fill="#FFFFFF" letterSpacing="-0.02em">T3P</text>
        <path d="M16 40 L30 33 L44 40" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/>
        <circle cx="30" cy="33" r="2.5" fill="#FFFFFF" opacity="0.8"/>
      </svg>
    );
  }

  // Default: color version
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGradientIcon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E4BE73"/>
          <stop offset="100%" stopColor="#C49843"/>
        </linearGradient>
      </defs>
      <circle cx="30" cy="30" r="28" fill="#1B4D3E"/>
      <circle cx="30" cy="30" r="24" fill="none" stroke="url(#goldGradientIcon)" strokeWidth="2"/>
      <text x="30" y="28" textAnchor="middle" fontFamily="Plus Jakarta Sans, Arial, sans-serif" fontSize="16" fontWeight="900" fill="#F5EBD7" letterSpacing="-0.02em">T3P</text>
      <path d="M16 40 L30 33 L44 40" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="30" cy="33" r="2.5" fill="#D4A853"/>
    </svg>
  );
};

export const EcoleT3PLogo = ({ 
  className = "h-12",
  variant = "full",
  theme = "color" 
}: LogoProps) => {
  if (variant === "icon") {
    return <EcoleT3PIcon className={className} theme={theme} />;
  }

  if (variant === "horizontal") {
    return (
      <svg viewBox="0 0 340 50" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldGradientH" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E4BE73"/>
            <stop offset="100%" stopColor="#C49843"/>
          </linearGradient>
        </defs>
        <circle cx="25" cy="25" r="23" fill="#1B4D3E"/>
        <circle cx="25" cy="25" r="19" fill="none" stroke="url(#goldGradientH)" strokeWidth="1.5"/>
        <text x="25" y="22" textAnchor="middle" fontFamily="Plus Jakarta Sans, Arial, sans-serif" fontSize="11" fontWeight="900" fill="#F5EBD7">T3P</text>
        <path d="M14 32 L25 27 L36 32" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="25" cy="27" r="1.5" fill="#D4A853"/>
        <text x="60" y="30" fontFamily="Plus Jakarta Sans, Arial, sans-serif" fontSize="24" fontWeight="900" fill="#1B4D3E" letterSpacing="-0.02em">ECOLE</text>
        <text x="140" y="30" fontFamily="Plus Jakarta Sans, Arial, sans-serif" fontSize="24" fontWeight="700" fill="#1B4D3E" letterSpacing="-0.02em">T3P</text>
      </svg>
    );
  }

  // Full logo with tagline
  if (theme === "white") {
    return (
      <svg viewBox="0 0 300 60" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="28" fill="#FFFFFF"/>
        <circle cx="30" cy="30" r="24" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.3"/>
        <text x="30" y="26" textAnchor="middle" fontFamily="Plus Jakarta Sans, Arial, sans-serif" fontSize="14" fontWeight="900" fill="#1B4D3E">T3P</text>
        <path d="M18 38 L30 32 L42 38" stroke="#1B4D3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="30" cy="32" r="2" fill="#1B4D3E"/>
        <text x="70" y="28" fontFamily="Plus Jakarta Sans, Arial, sans-serif" fontSize="28" fontWeight="900" fill="#FFFFFF" letterSpacing="-0.02em">ECOLE</text>
        <text x="160" y="28" fontFamily="Plus Jakarta Sans, Arial, sans-serif" fontSize="28" fontWeight="700" fill="#FFFFFF" letterSpacing="-0.02em">T3P</text>
        <text x="70" y="48" fontFamily="Inter, Arial, sans-serif" fontSize="10" fontWeight="500" fill="#FFFFFF" opacity="0.7" letterSpacing="0.1em">FORMATION TAXI • VTC • VMDTR</text>
      </svg>
    );
  }

  if (theme === "mono") {
    return (
      <svg viewBox="0 0 300 60" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="28" fill="#1B4D3E"/>
        <circle cx="30" cy="30" r="24" fill="none" stroke="#1B4D3E" strokeWidth="2" opacity="0.3"/>
        <text x="30" y="26" textAnchor="middle" fontFamily="Plus Jakarta Sans, Arial, sans-serif" fontSize="14" fontWeight="900" fill="#FFFFFF">T3P</text>
        <path d="M18 38 L30 32 L42 38" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/>
        <circle cx="30" cy="32" r="2" fill="#FFFFFF" opacity="0.8"/>
        <text x="70" y="28" fontFamily="Plus Jakarta Sans, Arial, sans-serif" fontSize="28" fontWeight="900" fill="#1B4D3E" letterSpacing="-0.02em">ECOLE</text>
        <text x="160" y="28" fontFamily="Plus Jakarta Sans, Arial, sans-serif" fontSize="28" fontWeight="700" fill="#1B4D3E" letterSpacing="-0.02em">T3P</text>
        <text x="70" y="48" fontFamily="Inter, Arial, sans-serif" fontSize="10" fontWeight="500" fill="#1B4D3E" opacity="0.6" letterSpacing="0.1em">FORMATION TAXI • VTC • VMDTR</text>
      </svg>
    );
  }

  // Default: full color version
  return (
    <svg viewBox="0 0 300 60" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGradientFull" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E4BE73"/>
          <stop offset="100%" stopColor="#C49843"/>
        </linearGradient>
      </defs>
      <circle cx="30" cy="30" r="28" fill="#1B4D3E"/>
      <circle cx="30" cy="30" r="24" fill="none" stroke="url(#goldGradientFull)" strokeWidth="2"/>
      <text x="30" y="26" textAnchor="middle" fontFamily="Plus Jakarta Sans, Arial, sans-serif" fontSize="14" fontWeight="900" fill="#F5EBD7">T3P</text>
      <path d="M18 38 L30 32 L42 38" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="30" cy="32" r="2" fill="#D4A853"/>
      <text x="70" y="28" fontFamily="Plus Jakarta Sans, Arial, sans-serif" fontSize="28" fontWeight="900" fill="#1B4D3E" letterSpacing="-0.02em">ECOLE</text>
      <text x="160" y="28" fontFamily="Plus Jakarta Sans, Arial, sans-serif" fontSize="28" fontWeight="700" fill="#1B4D3E" letterSpacing="-0.02em">T3P</text>
      <text x="70" y="48" fontFamily="Inter, Arial, sans-serif" fontSize="10" fontWeight="500" fill="#6B6B6B" letterSpacing="0.1em">FORMATION TAXI • VTC • VMDTR</text>
    </svg>
  );
};

export default EcoleT3PLogo;
