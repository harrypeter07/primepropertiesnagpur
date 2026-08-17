"use client";

import React from "react";

interface ContourDividerProps {
  variant?: "wave-1" | "wave-2" | "wave-3" | "diagonal";
  fill?: string; // CSS color or hex
  className?: string;
  flip?: boolean;
  position?: "top" | "bottom";
}

export const ContourDivider: React.FC<ContourDividerProps> = ({
  variant = "wave-1",
  fill = "#F5F0E6",
  className = "",
  flip = false,
  position = "bottom",
}) => {
  const transform = `${flip ? "scaleX(-1)" : ""} ${
    position === "top" ? "rotate(180deg)" : ""
  }`.trim();

  if (variant === "diagonal") {
    return (
      <div
        className={`w-full overflow-hidden leading-none pointer-events-none ${className}`}
        style={{ marginTop: position === "top" ? "-1px" : "0", marginBottom: position === "bottom" ? "-1px" : "0" }}
      >
        <svg
          viewBox="0 0 1440 60"
          className="w-full h-[36px] sm:h-[48px] md:h-[60px] block"
          preserveAspectRatio="none"
          style={{ transform }}
        >
          <path d="M0,0 L1440,48 L1440,60 L0,60 Z" fill={fill} />
        </svg>
      </div>
    );
  }

  if (variant === "wave-2") {
    return (
      <div
        className={`w-full overflow-hidden leading-none pointer-events-none ${className}`}
        style={{ marginTop: position === "top" ? "-1px" : "0", marginBottom: position === "bottom" ? "-1px" : "0" }}
      >
        <svg
          viewBox="0 0 1440 90"
          className="w-full h-[40px] sm:h-[65px] md:h-[90px] block"
          preserveAspectRatio="none"
          style={{ transform }}
        >
          <path
            d="M0,45 C220,95 440,15 680,55 C920,95 1160,25 1440,65 L1440,90 L0,90 Z"
            fill={fill}
          />
          {/* Subtle accent contour stroke */}
          <path
            d="M0,40 C220,90 440,10 680,50 C920,90 1160,20 1440,60"
            fill="none"
            stroke="#C9A227"
            strokeWidth="1.2"
            strokeOpacity="0.25"
          />
        </svg>
      </div>
    );
  }

  if (variant === "wave-3") {
    return (
      <div
        className={`w-full overflow-hidden leading-none pointer-events-none ${className}`}
        style={{ marginTop: position === "top" ? "-1px" : "0", marginBottom: position === "bottom" ? "-1px" : "0" }}
      >
        <svg
          viewBox="0 0 1440 80"
          className="w-full h-[35px] sm:h-[55px] md:h-[80px] block"
          preserveAspectRatio="none"
          style={{ transform }}
        >
          <path
            d="M0,20 C180,70 420,10 740,60 C1060,110 1280,30 1440,45 L1440,80 L0,80 Z"
            fill={fill}
          />
        </svg>
      </div>
    );
  }

  // Default wave-1: Uneven topographic curve
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none ${className}`}
      style={{ marginTop: position === "top" ? "-1px" : "0", marginBottom: position === "bottom" ? "-1px" : "0" }}
    >
      <svg
        viewBox="0 0 1440 70"
        className="w-full h-[35px] sm:h-[50px] md:h-[70px] block"
        preserveAspectRatio="none"
        style={{ transform }}
      >
        <path
          d="M0,35 C300,85 550,5 900,45 C1200,80 1350,15 1440,30 L1440,70 L0,70 Z"
          fill={fill}
        />
        <path
          d="M0,28 C300,78 550,0 900,40 C1200,75 1350,10 1440,25"
          fill="none"
          stroke="#C9A227"
          strokeWidth="1"
          strokeOpacity="0.2"
        />
      </svg>
    </div>
  );
};
