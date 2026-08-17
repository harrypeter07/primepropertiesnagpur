import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Inquiry } from "@/models/Inquiry";

let inMemoryInquiries: any[] = [
  {
    _id: "inq_1",
    name: "Ramesh Sharma",
    email: "ramesh.sharma@example.com",
    phone: "9845012345",
    message: "Interested in visiting the Greenacres Devanahalli Plot this Saturday morning.",
    status: "new",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "inq_2",
    name: "Pooja Hegde",
    email: "pooja.h@example.com",
    phone: "9980112233",
    message: "Requesting legal document copies for Chikkaballapur agricultural farmland.",
    status: "contacted",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export async function GET() {
  try {
    try {
      await connectToDatabase();
      const inquiries = await Inquiry.find()
        .populate("listingId", "title type price location")
        .sort({ createdAt: -1 });
      return NextResponse.json({ success: true, count: inquiries.length, data: inquiries });
    } catch (dbErr) {
      return NextResponse.json({ success: true, count: inMemoryInquiries.length, data: inMemoryInquiries });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    try {
      await connectToDatabase();
      const inquiry = await Inquiry.create(body);
      return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
    } catch (dbErr) {
      const newInq = {
        _id: `inq_${Date.now()}`,
        ...body,
        status: "new",
        createdAt: new Date().toISOString(),
      };
      inMemoryInquiries.unshift(newInq);
      return NextResponse.json({ success: true, data: newInq }, { status: 201 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    try {
      await connectToDatabase();
      const inquiry = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
      if (inquiry) {
        return NextResponse.json({ success: true, data: inquiry });
      }
    } catch (dbErr) {
      // Fallback
    }

    inMemoryInquiries = inMemoryInquiries.map((item) =>
      item._id === id ? { ...item, status } : item
    );
    return NextResponse.json({ success: true, data: { _id: id, status } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
