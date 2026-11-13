import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { verifyAuthRequest } from "@/lib/auth";
import { JourneyModel } from "@/models/Journey";

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
    const { title, route, duration, shortVibe, overview, highlights, order, image } = body;

    const query = mongoose.isValidObjectId(id) ? { $or: [{ id }, { _id: id }] } : { id };
    const existing = await JourneyModel.findOne(query);
    if (!existing) {
      return NextResponse.json({ error: "Journey not found" }, { status: 404 });
    }

    if (title) existing.title = title.trim();
    if (route) existing.route = route.trim();
    if (duration) existing.duration = duration.trim();
    if (shortVibe) existing.shortVibe = shortVibe.trim();
    if (overview) existing.overview = overview.trim();
    if (image) existing.image = image.trim();
    if (highlights && Array.isArray(highlights)) existing.highlights = highlights;
    if (typeof order === "number") existing.order = order;

    await existing.save();

    return NextResponse.json({ success: true, journey: existing });
  } catch (err: any) {
    console.error("PUT Journey error:", err);
    return NextResponse.json({ error: err.message || "Failed to update journey" }, { status: 500 });
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
    const deleted = await JourneyModel.findOneAndDelete(query);

    if (!deleted) {
      return NextResponse.json({ error: "Journey not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `Journey ${deleted.title || deleted.route} deleted successfully.` });
  } catch (err: any) {
    console.error("DELETE Journey error:", err);
    return NextResponse.json({ error: err.message || "Failed to delete journey" }, { status: 500 });
  }
}

