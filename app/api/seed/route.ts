import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Listing } from "@/models/Listing";
import { AdminUser } from "@/models/AdminUser";
import bcrypt from "bcryptjs";

export const sampleNagpurListings = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

export async function GET() {
  try {
    await connectToDatabase();

    // Check & seed admin user
    let admin = await AdminUser.findOne({ email: "admin@bhoomi.com" });
    if (!admin) {
      const passwordHash = await bcrypt.hash("admin123", 10);
      admin = await AdminUser.create({
        name: "Prime Nagpur Admin",
        email: "admin@bhoomi.com",
        passwordHash,
        role: "admin",
      });
    }

    // Refresh database with Nagpur listings
    await Listing.deleteMany({});
    const docsToInsert = sampleNagpurListings.map((item) => ({
      ...item,
      createdBy: admin._id,
    }));
    const inserted = await Listing.insertMany(docsToInsert);

    return NextResponse.json({
      success: true,
      message: `Database successfully seeded with ${inserted.length} Nagpur properties`,
      adminUser: "admin@bhoomi.com",
      listingsCount: inserted.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
