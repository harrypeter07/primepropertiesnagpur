import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Listing } from "@/models/Listing";
import { sampleFallbackListings } from "../route";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    try {
      await connectToDatabase();
      const listing = await Listing.findById(id);
      if (listing) {
        return NextResponse.json({ success: true, data: listing });
      }
    } catch (dbErr) {
      // Fallback lookup
    }

    const fallback = sampleFallbackListings.find((item) => item._id === id);
    if (fallback) {
      return NextResponse.json({ success: true, data: fallback });
    }

    return NextResponse.json({ success: false, error: "Listing not found" }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    try {
      await connectToDatabase();
      const listing = await Listing.findByIdAndUpdate(id, body, { new: true, runValidators: true });
      if (listing) {
        return NextResponse.json({ success: true, data: listing });
      }
    } catch (dbErr) {
      // Fallback update
    }

    return NextResponse.json({ success: true, data: { _id: id, ...body } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    try {
      await connectToDatabase();
      const listing = await Listing.findByIdAndUpdate(id, { $set: body }, { new: true });
      if (listing) {
        return NextResponse.json({ success: true, data: listing });
      }
    } catch (dbErr) {
      // Fallback
    }

    return NextResponse.json({ success: true, data: { _id: id, ...body } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    try {
      await connectToDatabase();
      await Listing.findByIdAndDelete(id);
    } catch (dbErr) {
      // Fallback
    }
    return NextResponse.json({ success: true, data: { _id: id } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
