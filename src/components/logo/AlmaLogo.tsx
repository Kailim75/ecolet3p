import React from "react";

interface AlmaLogoProps {
  className?: string;
}

const AlmaLogo = ({ className = "h-5" }: AlmaLogoProps) => (
  <svg
    viewBox="0 0 361 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Alma"
  >
    {/* "alma" wordmark in Alma brand orange */}
    <text
      x="0"
      y="90"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="800"
      fontSize="100"
      fill="#FA5022"
      letterSpacing="-2"
    >
      alma
    </text>
  </svg>
);

export default AlmaLogo;
