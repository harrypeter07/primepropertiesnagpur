import mongoose, { Schema, Document, Model } from "mongoose";

export interface IListing extends Document {
  title: string;
  type: "plot" | "flat" | "land" | "commercial" | "farmhouse";
  description: string;
  price: number;
  priceUnit: string;
  area: {
    value: number;
    unit: "sqft" | "acre" | "gunta";
  };
  location: {
    address: string;
    city: string;
    state: string;
    lat: number;
    lng: number;
  };
  bedrooms?: number;
  bathrooms?: number;
  amenities: string[];
  images: string[];
  legalDocs: string[];
  status: "available" | "hold" | "sold";
  featured: boolean;
  badge: "Featured" | "New" | "HotDeal" | "none";
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ListingSchema = new Schema<IListing>(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["plot", "flat", "land", "commercial", "farmhouse"],
      required: true,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    priceUnit: { type: String, default: "INR" },
    area: {
      value: { type: Number, required: true },
      unit: { type: String, enum: ["sqft", "acre", "gunta"], required: true },
    },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      lat: { type: Number, default: 12.9716 },
      lng: { type: Number, default: 77.5946 },
    },
    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    amenities: [{ type: String }],
    images: [{ type: String }],
    legalDocs: [{ type: String }],
    status: {
      type: String,
      enum: ["available", "hold", "sold"],
      default: "available",
    },
    featured: { type: Boolean, default: false },
    badge: {
      type: String,
      enum: ["Featured", "New", "HotDeal", "none"],
      default: "none",
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "AdminUser" },
  },
  { timestamps: true }
);

export const Listing: Model<IListing> =
  mongoose.models.Listing || mongoose.model<IListing>("Listing", ListingSchema);
