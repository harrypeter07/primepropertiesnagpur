import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Listing } from "@/models/Listing";

export const sampleFallbackListings = [
  {
    _id: "66b1a0000000000000000001",
    title: "Emerald Enclave NMRDA Approved Plot",
    type: "plot",
    description: "East-facing NMRDA Sanctioned RL Plot with 40ft wide internal tar roads, underground electric cabling, sewage treatment plant, and 24/7 security in Besa-Pipla prime residential zone.",
    price: 4800000,
    priceUnit: "INR",
    area: { value: 1500, unit: "sqft" },
    location: {
      address: "Near Besa Square, Besa-Pipla Road",
      city: "Nagpur",
      state: "Maharashtra",
      lat: 21.0825,
      lng: 79.0882,
    },
    amenities: ["NMRDA Approved", "RL Ready", "40ft Wide Road", "UG Drainage", "Park Facing", "Bank Loan 80%"],
    images: [
      "/images/hillside_residence.jpg",
      "/images/hero_estate.jpg",
    ],
    legalDocs: ["NMRDA Sanction Order", "Release Letter (RL)", "7/12 & Mutation Extract"],
    status: "available",
    featured: true,
    badge: "Featured",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "66b1a0000000000000000002",
    title: "The Grand Central 3BHK Luxury Penthouse",
    type: "flat",
    description: "Ultra-luxury modern 3BHK high-ceiling apartment in Civil Lines with panoramic botanical garden views, Italian marble flooring, 2 covered car parkings, and private clubhouse access.",
    price: 18500000,
    priceUnit: "INR",
    area: { value: 2800, unit: "sqft" },
    location: {
      address: "Civil Lines VIP Road",
      city: "Nagpur",
      state: "Maharashtra",
      lat: 21.1558,
      lng: 79.0682,
    },
    bedrooms: 3,
    bathrooms: 3,
    amenities: ["Swimming Pool", "Clubhouse", "EV Charging", "Fitness Center", "Covered Parking", "24/7 Power Backup"],
    images: [
      "/images/luxury_interior.jpg",
      "/images/hero_estate.jpg",
    ],
    legalDocs: ["RERA Registered", "Occupancy Certificate (OC)", "Commencement Certificate (CC)"],
    status: "available",
    featured: true,
    badge: "HotDeal",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "66b1a0000000000000000003",
    title: "MIHAN Tech Corridor Commercial Frontage Land",
    type: "commercial",
    description: "Prime 15,000 sqft commercial corner plot with 120ft main road frontage directly opposite AIIMS & MIHAN SEZ entrance. Ideal for IT office, hospital, or corporate headquarters.",
    price: 45000000,
    priceUnit: "INR",
    area: { value: 15000, unit: "sqft" },
    location: {
      address: "Opposite AIIMS, Wardha Road Corridor",
      city: "Nagpur",
      state: "Maharashtra",
      lat: 21.0355,
      lng: 79.0289,
    },
    amenities: ["120ft Main Road Frontage", "Commercial NA Sanctioned", "High Tension Power", "Metro Station 500m", "Storm Drainage"],
    images: [
      "/images/zenith_tower.jpg",
      "/images/aurora_retail.jpg",
    ],
    legalDocs: ["Commercial NA Order", "NHAI NOC", "Clear Title 30 Years"],
    status: "available",
    featured: true,
    badge: "New",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "66b1a0000000000000000004",
    title: "Green Valley Farmhouse & Orange Orchard",
    type: "land",
    description: "2.5 Acres fertile black-cotton & red soil agricultural land with 150+ bearing Nagpur orange trees, private borewell with solar pump, and perimeter barbed-wire fencing.",
    price: 9500000,
    priceUnit: "INR",
    area: { value: 2.5, unit: "acre" },
    location: {
      address: "Hingna-Bazargaon Expressway Connector",
      city: "Nagpur",
      state: "Maharashtra",
      lat: 21.1078,
      lng: 78.9612,
    },
    amenities: ["Solar Borewell", "Drip Irrigation", "Farmhouse Shed", "All-Weather Tar Road Access", "Fenced Perimeter"],
    images: [
      "/images/hero_estate.jpg",
      "/images/hillside_residence.jpg",
    ],
    legalDocs: ["7/12 Extract Single Name", "8A Mutation Entry", "Zero Encumbrance Certificate"],
    status: "available",
    featured: true,
    badge: "Featured",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "66b1a0000000000000000005",
    title: "Dharampeth Prestige 3BHK Residence",
    type: "flat",
    description: "Premium East-facing 3BHK flat located in the heart of Dharampeth near West High Court Road. Modern modular kitchen, wooden flooring in master bedroom, and video door phone.",
    price: 13500000,
    priceUnit: "INR",
    area: { value: 1950, unit: "sqft" },
    location: {
      address: "West High Court Road, Dharampeth",
      city: "Nagpur",
      state: "Maharashtra",
      lat: 21.1419,
      lng: 79.0623,
    },
    bedrooms: 3,
    bathrooms: 3,
    amenities: ["Automated Lift", "Modular Kitchen", "Solar Water Heating", "Covered Parking", "CCTV Security"],
    images: [
      "/images/luxury_interior.jpg",
      "/images/aurora_retail.jpg",
    ],
    legalDocs: ["RERA Approved", "Municipal Sanction Plan", "Bank Approved (SBI / HDFC)"],
    status: "available",
    featured: false,
    badge: "none",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "66b1a0000000000000000006",
    title: "Koradi Highway Logistics & Industrial Plot",
    type: "commercial",
    description: "18,000 sqft industrial / logistics plot on Koradi 6-Lane Highway with heavy vehicle turnaround access and direct connectivity to the Ring Road.",
    price: 22000000,
    priceUnit: "INR",
    area: { value: 18000, unit: "sqft" },
    location: {
      address: "Koradi Highway Outer Ring Junction",
      city: "Nagpur",
      state: "Maharashtra",
      lat: 21.2207,
      lng: 79.0963,
    },
    amenities: ["Industrial Zone Approved", "Heavy Vehicle Access", "HT Electric Line Ready", "Water Pipeline"],
    images: [
      "/images/aurora_retail.jpg",
      "/images/zenith_tower.jpg",
    ],
    legalDocs: ["Industrial Conversion", "Gram Panchayat NOC", "Clear Title"],
    status: "available",
    featured: false,
    badge: "none",
    createdAt: new Date().toISOString(),
  },
];

let memoryStore: any[] = [...sampleFallbackListings];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const type = searchParams.get("type");
    const city = searchParams.get("city");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const minArea = searchParams.get("minArea");
    const maxArea = searchParams.get("maxArea");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    let listings = [];

    try {
      const conn = await connectToDatabase();
      if (conn) {
        const query: any = {};
        if (type && type !== "all") query.type = type;
        if (city && city !== "all") query["location.city"] = { $regex: city, $options: "i" };
        if (featured === "true") query.featured = true;
        if (minPrice || maxPrice) {
          query.price = {};
          if (minPrice) query.price.$gte = Number(minPrice);
          if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        if (minArea || maxArea) {
          query["area.value"] = {};
          if (minArea) query["area.value"].$gte = Number(minArea);
          if (maxArea) query["area.value"].$lte = Number(maxArea);
        }
        if (search) {
          query.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { "location.address": { $regex: search, $options: "i" } },
            { "location.city": { $regex: search, $options: "i" } },
          ];
        }

        listings = await Listing.find(query).sort({ createdAt: -1 });
        if (listings.length === 0 && !type && !search && !city) {
          listings = memoryStore;
        }
      } else {
        throw new Error("DB offline");
      }
    } catch (dbErr) {
      // Fallback to in-memory store if Mongo connection fails
      listings = memoryStore.filter((item) => {
        if (type && type !== "all" && item.type !== type) return false;
        if (city && city !== "all" && !item.location.city.toLowerCase().includes(city.toLowerCase())) return false;
        if (featured === "true" && !item.featured) return false;
        if (minPrice && item.price < Number(minPrice)) return false;
        if (maxPrice && item.price > Number(maxPrice)) return false;
        if (search) {
          const s = search.toLowerCase();
          const match =
            item.title.toLowerCase().includes(s) ||
            item.description.toLowerCase().includes(s) ||
            item.location.city.toLowerCase().includes(s);
          if (!match) return false;
        }
        return true;
      });
    }

    return NextResponse.json({ success: true, count: listings.length, data: listings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    try {
      await connectToDatabase();
      const listing = await Listing.create(body);
      return NextResponse.json({ success: true, data: listing }, { status: 201 });
    } catch (dbErr) {
      const newItem = {
        _id: `mem_${Date.now()}`,
        ...body,
        createdAt: new Date().toISOString(),
      };
      memoryStore.unshift(newItem);
      return NextResponse.json({ success: true, data: newItem }, { status: 201 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
