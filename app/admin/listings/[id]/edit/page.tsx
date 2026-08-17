"use client";

import React, { useEffect, useState, use } from "react";
import { ListingForm } from "@/components/admin/ListingForm";

export default function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await fetch(`/api/listings/${id}`);
        const json = await res.json();
        if (json.success) {
          setListing(json.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className="py-12 text-center text-stone-400 font-mono-custom text-xs">
        Loading property data...
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="py-12 text-center text-stone-900 font-fraunces text-xl">
        Property not found.
      </div>
    );
  }

  return <ListingForm initialData={listing} isEdit={true} />;
}
