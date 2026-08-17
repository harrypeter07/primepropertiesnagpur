"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { MapPin, Heart, Maximize2, Bed, Bath, ArrowUpRight } from "lucide-react";

export interface PropertyCardProps {
  id: string;
  title: string;
  type: "plot" | "flat" | "land" | "commercial" | "farmhouse";
  price: number;
  priceUnit?: string;
  area: {
    value: number;
    unit: "sqft" | "acre" | "gunta";
  };
  location: {
    address?: string;
    city: string;
    state?: string;
  };
  image: string;
  badge?: "Featured" | "New" | "HotDeal" | "none";
  status?: "available" | "hold" | "sold";
  bedrooms?: number;
  bathrooms?: number;
  isLarge?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  type,
  price,
  priceUnit = "INR",
  area,
  location,
  image,
  badge = "none",
  status = "available",
  bedrooms,
  bathrooms,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const heartRef = useRef<SVGSVGElement | null>(null);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const nextState = !isFavorited;
    setIsFavorited(nextState);

    if (heartRef.current) {
      gsap.fromTo(
        heartRef.current,
        { scale: 0 },
        {
          scale: nextState ? 1.3 : 1,
          duration: 0.3,
          ease: "back.out(2)",
        }
      );
    }
  };

  const badgeConfig = {
    Featured: "bg-purple-600 text-white",
    New: "bg-emerald-600 text-white",
    HotDeal: "bg-rose-600 text-white",
    none: "hidden",
  }[badge];

  const formatPrice = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakh`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-floating transition-all duration-500 hover:-translate-y-2 flex flex-col border border-slate-100 h-full">
      {/* Image Container with Floating Badges */}
      <Link href={`/listings/${id}`} className="block relative aspect-[16/11] w-full overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Badge top-left */}
        {badge !== "none" && (
          <div className="absolute top-4 left-4 z-10">
            <span className={`px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full shadow-md ${badgeConfig}`}>
              {badge === "HotDeal" ? "Hot Deal" : badge}
            </span>
          </div>
        )}

        {/* Favorite Heart top-right */}
        <button
          onClick={handleFavoriteClick}
          aria-label="Add to favorites"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer"
        >
          <Heart
            ref={heartRef}
            className={`w-4 h-4 transition-colors ${
              isFavorited ? "fill-rose-500 text-rose-500" : "text-slate-600"
            }`}
          />
        </button>

        {/* Hover Visit Site Capsule Overlay (matching Horizon Reference Image 3) */}
        <div className="absolute bottom-3 left-4 z-20 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-bold shadow-lg backdrop-blur-md">
            View Details
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>

      {/* Card Details Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Row: Title & Price */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-heading font-bold text-lg text-slate-900 line-clamp-1 group-hover:text-clay transition-colors">
              <Link href={`/listings/${id}`}>{title}</Link>
            </h3>
            <span className="font-heading font-extrabold text-base sm:text-lg text-clay shrink-0">
              {formatPrice(price)}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-4">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{location.address ? `${location.address}, ${location.city}` : location.city}</span>
          </div>
        </div>

        {/* Specs Footer Row (matching Horizon specs format) */}
        <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
            <span>
              {area.value.toLocaleString("en-IN")} {area.unit}
            </span>
          </div>

          {type === "flat" && bedrooms && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-slate-400" />
                <span>{bedrooms} Bed</span>
              </div>
              {bathrooms && (
                <div className="flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5 text-slate-400" />
                  <span>{bathrooms} Bath</span>
                </div>
              )}
            </div>
          )}

          {type !== "flat" && (
            <span className="text-[11px] font-mono-custom text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
              Clear Title
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
