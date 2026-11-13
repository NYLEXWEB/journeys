import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { verifyAuthRequest } from "@/lib/auth";
import { DestinationModel } from "@/models/Destination";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAuthRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Admin session required." }, { status: 401 });
    }

    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ error: "Database not connected." }, { status: 503 });
    }

    const { id } = await context.params;
    const body = await req.json();
    const { name, state, region, shortVibe, overview, highlights, order, image } = body;

    const query = mongoose.isValidObjectId(id) ? { $or: [{ id }, { _id: id }] } : { id };
    const existing = await DestinationModel.findOne(query);
    if (!existing) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    if (name) existing.name = name.trim();
    if (state) {
      existing.state = state;
      existing.stateCategory =
        state === "Kerala" ? "kerala" : state === "Tamil Nadu" ? "tamil-nadu" : "karnataka";
    }
    if (region) existing.region = region.trim();
    if (shortVibe) existing.shortVibe = shortVibe.trim();
    if (overview) existing.overview = overview.trim();
    if (image) existing.image = image.trim();
    if (highlights && Array.isArray(highlights)) existing.highlights = highlights;
    if (typeof order === "number") existing.order = order;

    await existing.save();

    return NextResponse.json({ success: true, destination: existing });
  } catch (err: any) {
    console.error("PUT Destination error:", err);
    return NextResponse.json({ error: err.message || "Failed to update destination" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAuthRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Admin session required." }, { status: 401 });
    }

    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ error: "Database not connected." }, { status: 503 });
    }

    const { id } = await context.params;
    const query = mongoose.isValidObjectId(id) ? { $or: [{ id }, { _id: id }] } : { id };
    const deleted = await DestinationModel.findOneAndDelete(query);

    if (!deleted) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `Destination ${deleted.name} deleted successfully.` });
  } catch (err: any) {
    console.error("DELETE Destination error:", err);
    return NextResponse.json({ error: err.message || "Failed to delete destination" }, { status: 500 });
  }
}

