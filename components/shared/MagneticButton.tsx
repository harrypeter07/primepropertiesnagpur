"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  showIcon?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  (
    {
      variant = "primary",
      children,
      showIcon = true,
      className = "",
      size = "md",
      onClick,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const iconRef = useRef<SVGSVGElement | null>(null);
    const sweepRef = useRef<HTMLDivElement | null>(null);

    // Combine refs
    const setRefs = (element: HTMLButtonElement | null) => {
      buttonRef.current = element;
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current = element;
      }
    };

    useEffect(() => {
      const btn = buttonRef.current;
      if (!btn) return;

      // QuickTo setters for magnetic cursor pull
      const xTo = gsap.quickTo(btn, "x", { duration: 0.3, ease: "power2.out" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.3, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = (e.clientX - centerX) * 0.25;
        const distanceY = (e.clientY - centerY) * 0.25;

        // Limit to 12px max displacement
        const maxDist = 12;
        const clampedX = Math.max(-maxDist, Math.min(maxDist, distanceX));
        const clampedY = Math.max(-maxDist, Math.min(maxDist, distanceY));

        xTo(clampedX);
        yTo(clampedY);
      };

      const handleMouseEnter = () => {
        gsap.to(btn, { scale: 1.03, duration: 0.25, ease: "power2.out" });

        if (variant === "primary" && sweepRef.current) {
          gsap.to(sweepRef.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.35,
            ease: "power2.out",
          });
        }

        if (iconRef.current) {
          gsap.to(iconRef.current, { x: 6, duration: 0.25, ease: "power2.out" });
        }
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
        gsap.to(btn, { scale: 1, duration: 0.3, ease: "power2.out" });

        if (variant === "primary" && sweepRef.current) {
          gsap.to(sweepRef.current, {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            duration: 0.35,
            ease: "power2.inOut",
          });
        }

        if (iconRef.current) {
          gsap.to(iconRef.current, { x: 0, duration: 0.25, ease: "power2.out" });
        }
      };

      const handleMouseDown = () => {
        gsap.to(btn, { scale: 0.97, duration: 0.09, ease: "power1.inOut" });
      };

      const handleMouseUp = () => {
        gsap.to(btn, { scale: 1.03, duration: 0.15, ease: "power1.out" });
      };

      btn.addEventListener("mousemove", handleMouseMove);
      btn.addEventListener("mouseenter", handleMouseEnter);
      btn.addEventListener("mouseleave", handleMouseLeave);
      btn.addEventListener("mousedown", handleMouseDown);
      btn.addEventListener("mouseup", handleMouseUp);

      return () => {
        btn.removeEventListener("mousemove", handleMouseMove);
        btn.removeEventListener("mouseenter", handleMouseEnter);
        btn.removeEventListener("mouseleave", handleMouseLeave);
        btn.removeEventListener("mousedown", handleMouseDown);
        btn.removeEventListener("mouseup", handleMouseUp);
      };
    }, [variant]);

    const sizeClasses = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    }[size];

    if (variant === "primary") {
      return (
        <button
          ref={setRefs}
          onClick={onClick}
          className={`relative inline-flex items-center justify-center font-medium rounded-full overflow-hidden transition-shadow bg-clay text-white shadow-ambient hover:shadow-ambient-hover cursor-pointer tracking-wide ${sizeClasses} ${className}`}
          {...props}
        >
          {/* Diagonal sweep layer */}
          <div
            ref={sweepRef}
            className="absolute inset-0 bg-clay-dark pointer-events-none"
            style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}
          />

          {/* Button content */}
          <span className="relative z-10 flex items-center gap-2 font-medium">
            {children}
            {showIcon && (
              <ArrowRight
                ref={iconRef}
                className="w-4 h-4 transition-transform text-white"
              />
            )}
          </span>
        </button>
      );
    }

    // Secondary / Ghost variant: 1.5px --gold outline, --ink text, hover gold 12% opacity & outline animates to --clay
    return (
      <button
        ref={setRefs}
        onClick={onClick}
        className={`group relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 border-[1.5px] border-gold text-ink hover:border-clay hover:bg-gold/12 cursor-pointer tracking-wide ${sizeClasses} ${className}`}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2 font-medium">
          {children}
          {showIcon && (
            <ArrowRight
              ref={iconRef}
              className="w-4 h-4 transition-transform text-ink group-hover:text-clay"
            />
          )}
        </span>
      </button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";
