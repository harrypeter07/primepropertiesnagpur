"use client";

import React from "react";

interface BhoomiLogoProps {
  variant?: "full" | "mark" | "horizontal";
  theme?: "light" | "dark" | "auto";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const BhoomiLogo: React.FC<BhoomiLogoProps> = ({
  variant = "full",
  theme = "auto",
  size = "md",
  className = "",
}) => {
  const markSize = {
    sm: "w-8 h-8",
    md: "w-9 h-9",
    lg: "w-11 h-11",
    xl: "w-14 h-14",
  }[size];

  const textSize = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
    xl: "text-2xl",
  }[size];

  const subtextSize = {
    sm: "text-[8px] tracking-[0.2em]",
    md: "text-[9px] tracking-[0.24em]",
    lg: "text-[10px] tracking-[0.28em]",
    xl: "text-[12px] tracking-[0.32em]",
  }[size];

  // Architectural Luxury Monogram Emblem (Interlocking Geometric Gold Facets)
  const LogoMark = (
    <div
      className={`relative ${markSize} shrink-0 rounded-xl p-1 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm overflow-hidden bg-slate-950 border border-amber-400/30`}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="goldPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="45%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
          <linearGradient id="goldAccent" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#CA8A04" />
            <stop offset="60%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#FEF08A" />
          </linearGradient>
        </defs>

        {/* Central Geometric High-Rise Tower */}
        <polygon
          points="50,12 66,26 66,88 50,74"
          fill="url(#goldPrimary)"
        />
        <polygon
          points="50,12 34,26 34,88 50,74"
          fill="url(#goldAccent)"
          opacity="0.85"
        />

        {/* Left Architectural Stepped Wing */}
        <polygon
          points="34,42 20,52 20,88 34,78"
          fill="url(#goldPrimary)"
        />

        {/* Right Architectural Stepped Wing */}
        <polygon
          points="66,42 80,52 80,88 66,78"
          fill="url(#goldAccent)"
          opacity="0.9"
        />

        {/* Apex Pinnacle Diamond Star */}
        <polygon
          points="50,6 54,12 50,18 46,12"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );

  if (variant === "mark") {
    return <div className={`inline-flex items-center ${className}`}>{LogoMark}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {LogoMark}

      <div className="flex flex-col text-left">
        <span
          className={`font-heading font-extrabold leading-none tracking-tight ${textSize} ${
            theme === "dark"
              ? "text-white"
              : theme === "light"
              ? "text-slate-900"
              : "text-inherit"
          }`}
        >
          PRIME NAGPUR
        </span>
        <span
          className={`font-mono-custom font-bold text-amber-600 ${subtextSize} mt-1`}
        >
          PROPERTIES
        </span>
      </div>
    </div>
  );
};
