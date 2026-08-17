"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { Upload, X, Check, Save, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface ListingFormProps {
  initialData?: any;
  isEdit?: boolean;
}

const defaultAmenitiesList = [
  "Gated Community",
  "30ft Paved Road",
  "Electricity Connection",
  "Water Supply",
  "24/7 Security",
  "Borewell Water",
  "Solar Fencing",
  "Drip Irrigation",
  "High Voltage Power",
  "Park Facing",
  "Clubhouse Access",
  "EV Charging Station",
];

export function ListingForm({ initialData, isEdit = false }: ListingFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [type, setType] = useState(initialData?.type || "plot");
  const [description, setDescription] = useState(initialData?.description || "");

  const [address, setAddress] = useState(initialData?.location?.address || "");
  const [city, setCity] = useState(initialData?.location?.city || "Nagpur");
  const [state, setState] = useState(initialData?.location?.state || "Maharashtra");
  const [lat, setLat] = useState(initialData?.location?.lat || 21.1458);
  const [lng, setLng] = useState(initialData?.location?.lng || 79.0882);

  const [price, setPrice] = useState(initialData?.price || 4800000);
  const [priceUnit, setPriceUnit] = useState(initialData?.priceUnit || "INR");
  const [areaValue, setAreaValue] = useState(initialData?.area?.value || 1500);
  const [areaUnit, setAreaUnit] = useState(initialData?.area?.unit || "sqft");

  const [bedrooms, setBedrooms] = useState(initialData?.bedrooms || 0);
  const [bathrooms, setBathrooms] = useState(initialData?.bathrooms || 0);

  const [imageUrlInput, setImageUrlInput] = useState("");
  const [images, setImages] = useState<string[]>(
    initialData?.images || [
      "/images/hillside_residence.jpg",
    ]
  );
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    initialData?.amenities || ["Gated Community", "30ft Paved Road"]
  );
  const [legalDocs, setLegalDocs] = useState<string[]>(
    initialData?.legalDocs || ["Title Clearance Certificate", "Layout Approval Plan"]
  );

  const [status, setStatus] = useState(initialData?.status || "available");
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [badge, setBadge] = useState(initialData?.badge || "none");

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const newUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const json = await res.json();
        if (json.success) {
          newUrls.push(json.url);
        }
      }
      setImages((prev) => [...prev, ...newUrls]);
      toast.success("Images uploaded successfully!");
    } catch (e) {
      toast.error("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleAmenity = (item: string) => {
    if (selectedAmenities.includes(item)) {
      setSelectedAmenities((prev) => prev.filter((a) => a !== item));
    } else {
      setSelectedAmenities((prev) => [...prev, item]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !areaValue) {
      toast.error("Please fill in required fields.");
      return;
    }

    setSubmitting(true);
    const payload = {
      title,
      type,
      description,
      price: Number(price),
      priceUnit,
      area: { value: Number(areaValue), unit: areaUnit },
      location: { address, city, state, lat: Number(lat), lng: Number(lng) },
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      amenities: selectedAmenities,
      images,
      legalDocs,
      status,
      featured,
      badge,
    };

    try {
      const endpoint = isEdit ? `/api/listings/${initialData._id}` : "/api/listings";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        toast.success(isEdit ? "Listing updated!" : "New listing created!");
        router.push("/admin/listings");
      } else {
        toast.error(json.error || "Failed to save listing.");
      }
    } catch (err) {
      toast.error("Server error while saving listing.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-10 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-sand-dim">
        <div>
          <button
            type="button"
            onClick={() => router.push("/admin/listings")}
            className="text-xs font-mono-custom text-clay flex items-center gap-1 mb-2 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            BACK TO LISTINGS
          </button>
          <h1 className="font-fraunces text-3xl font-semibold text-stone-900">
            {isEdit ? "Edit Property Listing" : "Create New Property Listing"}
          </h1>
        </div>
      </div>

      {/* Section 1: Basic Info */}
      <div className="bg-white p-6 sm:p-8 rounded-[20px] shadow-sm border border-sand-dim space-y-6">
        <h3 className="font-fraunces text-xl font-semibold text-stone-900 border-b border-sand-dim pb-3">
          1. Basic Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label className="text-xs font-mono-custom text-stone-500 block mb-1">
              PROPERTY TITLE *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Greenacres Premium Corner Plot"
              className="w-full bg-sand/50 p-3 rounded-xl border border-sand-dim text-sm text-stone-900 focus:outline-none focus:border-clay"
            />
          </div>

          <div>
            <label className="text-xs font-mono-custom text-stone-500 block mb-1">
              PROPERTY TYPE *
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full bg-sand/50 p-3 rounded-xl border border-sand-dim text-sm text-stone-900 focus:outline-none"
            >
              <option value="plot">Residential Plot</option>
              <option value="flat">Flat / Apartment</option>
              <option value="land">Agricultural Land</option>
              <option value="farmhouse">Farmhouse Estate</option>
              <option value="commercial">Commercial Land</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-mono-custom text-stone-500 block mb-1">
              PROMOTIONAL BADGE
            </label>
            <select
              value={badge}
              onChange={(e) => setBadge(e.target.value as any)}
              className="w-full bg-sand/50 p-3 rounded-xl border border-sand-dim text-sm text-stone-900 focus:outline-none"
            >
              <option value="none">None</option>
              <option value="Featured">Featured</option>
              <option value="New">New Listing</option>
              <option value="HotDeal">Hot Deal</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-mono-custom text-stone-500 block mb-1">
              DESCRIPTION *
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Detailed description of layout approvals, facing, road width, legal clearance..."
              className="w-full bg-sand/50 p-3 rounded-xl border border-sand-dim text-sm text-stone-900 focus:outline-none focus:border-clay"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Location */}
      <div className="bg-white p-6 sm:p-8 rounded-[20px] shadow-sm border border-sand-dim space-y-6">
        <h3 className="font-fraunces text-xl font-semibold text-stone-900 border-b border-sand-dim pb-3">
          2. Location Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label className="text-xs font-mono-custom text-stone-500 block mb-1">
              ADDRESS / SECTOR *
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Phase 2, Devanahalli Highway Sector 4"
              className="w-full bg-sand/50 p-3 rounded-xl border border-sand-dim text-sm text-stone-900 focus:outline-none focus:border-clay"
            />
          </div>

          <div>
            <label className="text-xs font-mono-custom text-stone-500 block mb-1">
              CITY *
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              placeholder="Bengaluru"
              className="w-full bg-sand/50 p-3 rounded-xl border border-sand-dim text-sm text-stone-900 focus:outline-none focus:border-clay"
            />
          </div>

          <div>
            <label className="text-xs font-mono-custom text-stone-500 block mb-1">
              STATE *
            </label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              placeholder="Karnataka"
              className="w-full bg-sand/50 p-3 rounded-xl border border-sand-dim text-sm text-stone-900 focus:outline-none focus:border-clay"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Pricing & Area */}
      <div className="bg-white p-6 sm:p-8 rounded-[20px] shadow-sm border border-sand-dim space-y-6">
        <h3 className="font-fraunces text-xl font-semibold text-stone-900 border-b border-sand-dim pb-3">
          3. Pricing & Land Area
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-mono-custom text-stone-500 block mb-1">
              PRICE (₹ INR) *
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
              className="w-full bg-sand/50 p-3 rounded-xl border border-sand-dim text-sm text-stone-900 focus:outline-none focus:border-clay font-mono-custom"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-mono-custom text-stone-500 block mb-1">
                AREA VALUE *
              </label>
              <input
                type="number"
                value={areaValue}
                onChange={(e) => setAreaValue(Number(e.target.value))}
                required
                className="w-full bg-sand/50 p-3 rounded-xl border border-sand-dim text-sm text-stone-900 focus:outline-none font-mono-custom"
              />
            </div>
            <div className="w-32">
              <label className="text-xs font-mono-custom text-stone-500 block mb-1">
                UNIT *
              </label>
              <select
                value={areaUnit}
                onChange={(e) => setAreaUnit(e.target.value as any)}
                className="w-full bg-sand/50 p-3 rounded-xl border border-sand-dim text-sm text-stone-900 focus:outline-none"
              >
                <option value="sqft">sqft</option>
                <option value="acre">acre</option>
                <option value="gunta">gunta</option>
              </select>
            </div>
          </div>

          {type === "flat" && (
            <>
              <div>
                <label className="text-xs font-mono-custom text-stone-500 block mb-1">
                  BEDROOMS (BHK)
                </label>
                <input
                  type="number"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(Number(e.target.value))}
                  className="w-full bg-sand/50 p-3 rounded-xl border border-sand-dim text-sm text-stone-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-mono-custom text-stone-500 block mb-1">
                  BATHROOMS
                </label>
                <input
                  type="number"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(Number(e.target.value))}
                  className="w-full bg-sand/50 p-3 rounded-xl border border-sand-dim text-sm text-stone-900 focus:outline-none"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Section 4: Media Upload & Image URLs */}
      <div className="bg-white p-6 sm:p-8 rounded-[20px] shadow-sm border border-sand-dim space-y-6">
        <div className="flex items-center justify-between border-b border-sand-dim pb-3">
          <h3 className="font-heading text-xl font-bold text-slate-900">
            4. Property Photos & Media ({images.length} Photos)
          </h3>
          <span className="text-xs text-slate-500 font-mono-custom">EDITABLE / UPDATABLE</span>
        </div>

        {/* Direct Image URL input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Paste Image URL (e.g. /images/hillside_residence.jpg or https://...)"
            value={imageUrlInput}
            onChange={(e) => setImageUrlInput(e.target.value)}
            className="flex-1 bg-sand/50 p-3 rounded-xl border border-sand-dim text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-clay"
          />
          <button
            type="button"
            onClick={() => {
              if (imageUrlInput.trim()) {
                setImages((prev) => [...prev, imageUrlInput.trim()]);
                setImageUrlInput("");
                toast.success("Photo added to gallery!");
              }
            }}
            className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold tracking-wide transition-colors cursor-pointer"
          >
            + Add Photo URL
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-sand-dim border border-sand-dim group shadow-xs">
              <Image src={img} alt="Property" fill className="object-cover" />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/70 text-[10px] text-white font-mono-custom">
                #{idx + 1}
              </div>
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-2 right-2 p-1 bg-rose-600/90 text-white rounded-full hover:bg-rose-700 transition-colors cursor-pointer"
                title="Remove photo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          <label className="aspect-[4/3] rounded-xl border-2 border-dashed border-slate-300 hover:border-clay flex flex-col items-center justify-center text-center p-4 cursor-pointer bg-sand/30 hover:bg-sand/60 transition-colors">
            <Upload className="w-6 h-6 text-clay mb-1" />
            <span className="text-xs font-mono-custom text-slate-600 font-semibold">
              {uploading ? "Uploading..." : "Upload Local File"}
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Section 5: Amenities */}
      <div className="bg-white p-6 sm:p-8 rounded-[20px] shadow-sm border border-sand-dim space-y-6">
        <h3 className="font-fraunces text-xl font-semibold text-stone-900 border-b border-sand-dim pb-3">
          5. Amenities & Features
        </h3>

        <div className="flex flex-wrap gap-2.5">
          {defaultAmenitiesList.map((item) => {
            const isSelected = selectedAmenities.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleAmenity(item)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? "bg-clay text-white border-clay"
                    : "bg-sand/60 text-stone-700 border-sand-dim hover:bg-sand"
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                <span>{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 6: Status & Save Button */}
      <div className="bg-white p-6 sm:p-8 rounded-[20px] shadow-sm border border-sand-dim space-y-6">
        <h3 className="font-fraunces text-xl font-semibold text-stone-900 border-b border-sand-dim pb-3">
          6. Status & Publication
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-mono-custom text-stone-500 block mb-1">
              AVAILABILITY STATUS
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full bg-sand/50 p-3 rounded-xl border border-sand-dim text-sm text-stone-900 focus:outline-none"
            >
              <option value="available">Available</option>
              <option value="hold">On Hold</option>
              <option value="sold">Sold</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="featuredCheck"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-5 h-5 accent-clay cursor-pointer"
            />
            <label htmlFor="featuredCheck" className="text-sm font-semibold text-stone-900 cursor-pointer">
              Mark as Featured Homepage Selection
            </label>
          </div>
        </div>
      </div>

      {/* Sticky Save Button */}
      <div className="fixed bottom-6 right-6 sm:right-10 z-40">
        <MagneticButton type="submit" disabled={submitting} variant="primary" size="lg">
          <Save className="w-5 h-5 mr-2" />
          {submitting ? "Saving Property..." : isEdit ? "Update Property" : "Publish Property Listing"}
        </MagneticButton>
      </div>
    </form>
  );
}
