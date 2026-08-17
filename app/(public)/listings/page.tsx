"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { PropertyCard, PropertyCardProps } from "@/components/shared/PropertyCard";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { Filter, SlidersHorizontal, RefreshCw, Compass } from "lucide-react";

function ListingsContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || "all";
  const initialCity = searchParams.get("city") || "all";
  const initialMinPrice = searchParams.get("minPrice") || "";
  const initialMaxPrice = searchParams.get("maxPrice") || "";

  const [type, setType] = useState(initialType);
  const [city, setCity] = useState(initialCity);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [sortBy, setSortBy] = useState("newest");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [properties, setProperties] = useState<PropertyCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (type !== "all") params.set("type", type);
      if (city !== "all") params.set("city", city);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);

      const res = await fetch(`/api/listings?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        let items = json.data.map((item: any) => ({
          id: item._id,
          title: item.title,
          type: item.type,
          price: item.price,
          priceUnit: item.priceUnit,
          area: item.area,
          location: item.location,
          image: item.images?.[0] || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
          badge: item.badge,
          status: item.status,
          bedrooms: item.bedrooms,
          bathrooms: item.bathrooms,
        }));

        if (sortBy === "price-low") {
          items.sort((a: any, b: any) => a.price - b.price);
        } else if (sortBy === "price-high") {
          items.sort((a: any, b: any) => b.price - a.price);
        }

        setProperties(items);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [type, city, minPrice, maxPrice, sortBy]);

  useEffect(() => {
    if (!loading && gridRef.current) {
      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" }
      );
    }
  }, [loading, properties]);

  const resetFilters = () => {
    setType("all");
    setCity("all");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Banner */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-sand-dim">
        <div>
          <span className="font-mono-custom text-xs text-gold tracking-widest block mb-2">
            EXPLORE INVENTORY
          </span>
          <h1 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900">
            Verified Plots, Land & Flats
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-sand-dim text-xs font-mono-custom text-stone-900 shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-clay" />
            Filters
          </button>

          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full border border-sand-dim shadow-sm text-xs font-mono-custom">
            <span className="text-stone-500">SORT:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-semibold text-stone-900 focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sticky Filter Sidebar (Desktop) */}
        <aside className={`lg:col-span-3 ${mobileFilterOpen ? "block" : "hidden lg:block"}`}>
          <div className="bg-white p-6 rounded-[20px] shadow-ambient border border-sand-dim sticky top-28 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-sand-dim">
              <span className="font-fraunces font-semibold text-lg text-stone-900 flex items-center gap-2">
                <Filter className="w-4 h-4 text-clay" />
                Refine Search
              </span>
              <button
                onClick={resetFilters}
                className="text-xs font-mono-custom text-clay hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Type */}
            <div>
              <label className="text-xs font-mono-custom text-stone-500 block mb-2">
                PROPERTY TYPE
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-sand/60 p-3 rounded-xl border border-sand-dim text-sm text-stone-900 font-medium focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="plot">Residential Plot</option>
                <option value="flat">Flat / Apartment</option>
                <option value="land">Agricultural Land</option>
                <option value="farmhouse">Farmhouse Estate</option>
                <option value="commercial">Commercial Land</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label className="text-xs font-mono-custom text-stone-500 block mb-2">
                CITY / LOCATION
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-sand/60 p-3 rounded-xl border border-sand-dim text-sm text-stone-900 font-medium focus:outline-none"
              >
                <option value="all">All Locations</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Chikkaballapur">Chikkaballapur</option>
                <option value="Hosur">Hosur</option>
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label className="text-xs font-mono-custom text-stone-500 block mb-2">
                MIN PRICE (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 5000000"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-sand/60 p-3 rounded-xl border border-sand-dim text-sm text-stone-900 font-medium focus:outline-none"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="text-xs font-mono-custom text-stone-500 block mb-2">
                MAX PRICE (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 20000000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-sand/60 p-3 rounded-xl border border-sand-dim text-sm text-stone-900 font-medium focus:outline-none"
              />
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <main className="lg:col-span-9">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-80 bg-white rounded-[20px] animate-pulse border border-sand-dim" />
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="bg-white rounded-[20px] p-12 text-center border border-sand-dim max-w-md mx-auto my-12">
              <Compass className="w-12 h-12 text-gold mx-auto mb-4 animate-spin" />
              <h3 className="font-fraunces text-2xl text-stone-900 font-semibold mb-2">
                No Properties Match
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Try widening your price range or clearing type filters.
              </p>
              <MagneticButton onClick={resetFilters} variant="primary">
                Reset All Filters
              </MagneticButton>
            </div>
          ) : (
            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {properties.map((item) => (
                <PropertyCard key={item.id} {...item} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-stone-500 font-mono-custom">LOADING INVENTORY...</div>}>
      <ListingsContent />
    </Suspense>
  );
}
