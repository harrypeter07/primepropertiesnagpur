"use client";

import React from "react";
import Image from "next/image";

interface BhoomiLogoProps {
  variant?: "full" | "mark" | "horizontal" | "badge";
  theme?: "light" | "dark" | "auto";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const BhoomiLogo: React.FC<BhoomiLogoProps> = ({
  variant = "full",
  size = "md",
  className = "",
}) => {
  const sizeMap = {
    sm: { width: 36, height: 36, container: "h-9", markH: "h-9 w-9" },
    md: { width: 44, height: 44, container: "h-11", markH: "h-11 w-11" },
    lg: { width: 56, height: 56, container: "h-14", markH: "h-14 w-14" },
    xl: { width: 72, height: 72, container: "h-18", markH: "h-18 w-18" },
  }[size];

  const logoSrc =
    variant === "badge"
      ? "/images/logo_with_bg.png"
      : "/images/logo_transparent.png";

  if (variant === "mark") {
    return (
      <div className={`relative ${sizeMap.markH} shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}>
        <Image
          src={logoSrc}
          alt="Properties Nagpur Logo"
          fill
          priority
          className="object-contain"
          sizes="72px"
        />
      </div>
    );
  }

  if (variant === "badge") {
    return (
      <div className={`relative rounded-2xl overflow-hidden shadow-lg border border-slate-700/60 transition-transform duration-300 group-hover:scale-105 ${className}`}>
        <Image
          src="/images/logo_with_bg.png"
          alt="Properties Nagpur"
          width={sizeMap.width * 2}
          height={sizeMap.height * 2}
          priority
          className="object-contain rounded-2xl"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className={`relative ${sizeMap.markH} shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <Image
          src={logoSrc}
          alt="Properties Nagpur Logo Icon"
          fill
          priority
          className="object-contain"
          sizes="72px"
        />
      </div>

      <div className="flex flex-col text-left">
        <span className="font-heading font-extrabold leading-none tracking-tight text-white text-base sm:text-lg">
          PROPERTIES <span className="text-amber-400">NAGPUR</span>
        </span>
        <span className="font-mono-custom font-bold text-amber-500/90 text-[8px] sm:text-[9px] tracking-[0.24em] uppercase mt-1">
          DISCOVER · INVEST · BELONG
        </span>
      </div>
    </div>
  );
};
