"use client";

import React from "react";
import Image from "next/image";

interface BhoomiLogoProps {
  variant?: "full" | "mark" | "badge" | "banner";
  theme?: "light" | "dark" | "auto";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const BhoomiLogo: React.FC<BhoomiLogoProps> = ({
  variant = "full",
  size = "md",
  theme = "auto",
  className = "",
}) => {
  const sizeMap = {
    sm: {
      box: "w-10 h-10 sm:w-11 sm:h-11",
      title: "text-sm sm:text-base",
      subtitle: "text-[8px] sm:text-[9px] tracking-[0.2em]",
    },
    md: {
      box: "w-12 h-12 sm:w-14 sm:h-14",
      title: "text-base sm:text-lg",
      subtitle: "text-[9px] sm:text-[10px] tracking-[0.22em]",
    },
    lg: {
      box: "w-16 h-16 sm:w-20 sm:h-20",
      title: "text-xl sm:text-2xl",
      subtitle: "text-[11px] sm:text-[12px] tracking-[0.24em]",
    },
    xl: {
      box: "w-24 h-24 sm:w-28 sm:h-28",
      title: "text-2xl sm:text-3xl",
      subtitle: "text-[12px] sm:text-[14px] tracking-[0.26em]",
    },
  }[size];

  // Crisp White Background Logo Emblem Card
  const LogoCard = (
    <div
      className={`relative ${sizeMap.box} shrink-0 bg-white rounded-xl sm:rounded-2xl p-1 shadow-md border border-white/90 overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg`}
    >
      <Image
        src="/images/logo_with_bg.png"
        alt="Properties Nagpur Official Logo"
        fill
        priority
        className="object-contain p-0.5 rounded-lg"
        sizes="(max-width: 768px) 60px, 120px"
      />
    </div>
  );

  if (variant === "mark" || variant === "badge") {
    return <div className={`inline-flex items-center ${className}`}>{LogoCard}</div>;
  }

  const isDarkText = theme === "light";

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {LogoCard}

      <div className="flex flex-col text-left justify-center">
        <span
          className={`font-heading font-extrabold leading-none tracking-tight ${sizeMap.title} ${
            isDarkText ? "text-slate-900" : "text-white"
          }`}
        >
          PROPERTIES <span className="text-amber-400">NAGPUR</span>
        </span>
        <span className={`font-mono-custom font-bold text-amber-500/95 ${sizeMap.subtitle} uppercase mt-1`}>
          DISCOVER · INVEST · BELONG
        </span>
      </div>
    </div>
  );
};
