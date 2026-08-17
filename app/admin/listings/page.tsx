"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { Plus, Edit2, Trash2, Star, Search, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function AdminListingsPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const loadListings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/listings");
      const json = await res.json();
      if (json.success) {
        setListings(json.data);
      }
    } catch (e) {
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, []);

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !currentFeatured }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success(`Featured status updated!`);
        setListings((prev) =>
          prev.map((item) => (item._id === id ? { ...item, featured: !currentFeatured } : item))
        );
      }
    } catch (e) {
      toast.error("Failed to update featured status");
    }
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    try {
      const res = await fetch(`/api/listings/${deleteTargetId}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Listing deleted successfully");
        setListings((prev) => prev.filter((item) => item._id !== deleteTargetId));
      } else {
        toast.error("Error deleting listing");
      }
    } catch (e) {
      toast.error("Failed to delete listing");
    } finally {
      setDeleteTargetId(null);
    }
  };

  const filteredListings = listings.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.location?.city?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sand-dim">
        <div>
          <span className="font-mono-custom text-xs text-gold tracking-widest block mb-1">
            INVENTORY MANAGEMENT
          </span>
          <h1 className="font-fraunces text-3xl font-semibold text-stone-900">
            All Property Listings
          </h1>
        </div>
        <Link href="/admin/listings/new">
          <MagneticButton variant="primary" size="md">
            <Plus className="w-4 h-4 mr-1" />
            Add New Listing
          </MagneticButton>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-sand-dim max-w-md shadow-sm">
        <Search className="w-4 h-4 text-stone-400 ml-2" />
        <input
          type="text"
          placeholder="Search by title or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-sm text-stone-900 focus:outline-none w-full"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-[20px] shadow-sm border border-sand-dim overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-stone-400 font-mono-custom text-xs">
            Loading property inventory...
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="py-12 text-center text-stone-400 font-mono-custom text-xs">
            No properties found matching search.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-sand/60 border-b border-sand-dim text-[11px] font-mono-custom text-stone-500">
                  <th className="py-3 px-6 font-medium">PROPERTY</th>
                  <th className="py-3 px-4 font-medium">TYPE</th>
                  <th className="py-3 px-4 font-medium">PRICE</th>
                  <th className="py-3 px-4 font-medium">CITY</th>
                  <th className="py-3 px-4 font-medium">STATUS</th>
                  <th className="py-3 px-4 font-medium">FEATURED</th>
                  <th className="py-3 px-6 font-medium text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-dim">
                {filteredListings.map((item) => (
                  <tr key={item._id} className="hover:bg-sand/30 transition-colors">
                    {/* Thumbnail + Title */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-sand-dim shrink-0">
                          <Image
                            src={item.images?.[0] || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=200&q=80"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-fraunces font-semibold text-stone-900 line-clamp-1">
                            {item.title}
                          </p>
                          <p className="text-xs text-stone-500 font-mono-custom">
                            {item.area?.value} {item.area?.unit}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="py-4 px-4 font-mono-custom text-xs uppercase text-stone-600">
                      {item.type}
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 font-mono-custom font-semibold text-stone-900">
                      ₹{item.price?.toLocaleString("en-IN")}
                    </td>

                    {/* City */}
                    <td className="py-4 px-4 text-xs text-stone-600">
                      {item.location?.city}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono-custom ${
                        item.status === "available"
                          ? "bg-sage/15 text-sage font-bold"
                          : item.status === "hold"
                          ? "bg-gold/20 text-gold font-bold"
                          : "bg-danger/15 text-danger font-bold"
                      }`}>
                        {item.status?.toUpperCase()}
                      </span>
                    </td>

                    {/* Featured Switch */}
                    <td className="py-4 px-4">
                      <button
                        onClick={() => toggleFeatured(item._id, item.featured)}
                        className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                          item.featured
                            ? "bg-gold/15 border-gold text-gold"
                            : "bg-sand border-stone-300 text-stone-400 hover:text-stone-700"
                        }`}
                        title="Toggle Featured status"
                      >
                        <Star className={`w-4 h-4 ${item.featured ? "fill-gold" : ""}`} />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/listings/${item._id}/edit`}>
                          <button className="p-2 rounded-xl bg-sand hover:bg-sand-dim text-stone-700 transition-colors cursor-pointer" title="Edit">
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => setDeleteTargetId(item._id)}
                          className="p-2 rounded-xl bg-danger/10 hover:bg-danger text-danger hover:text-white transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] p-6 sm:p-8 max-w-sm w-full space-y-4 shadow-2xl border border-sand-dim">
            <div className="w-12 h-12 rounded-full bg-danger/15 text-danger flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-fraunces text-xl font-semibold text-stone-900 text-center">
              Confirm Property Deletion
            </h3>
            <p className="text-xs text-stone-500 text-center leading-relaxed">
              Are you sure you want to permanently delete this listing from MongoDB? This action cannot be undone.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="flex-1 py-3 bg-sand rounded-full text-xs font-mono-custom text-stone-700 hover:bg-sand-dim cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 bg-danger text-white rounded-full text-xs font-mono-custom hover:bg-red-700 cursor-pointer shadow-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
