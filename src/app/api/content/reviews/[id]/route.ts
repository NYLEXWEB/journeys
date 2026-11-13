import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { verifyAuthRequest } from "@/lib/auth";
import { ReviewModel } from "@/models/Review";

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
    const {
      author,
      location,
      rating,
      relativeTime,
      tripType,
      text,
      isLocalGuide,
      guideStats,
      ownerResponseDate,
      ownerResponseText,
      order,
    } = body;

    const existing = await ReviewModel.findById(id);
    if (!existing) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    if (author) {
      existing.author = author.trim();
      existing.avatarInitial = author.trim().charAt(0).toUpperCase();
    }
    if (location) existing.location = location.trim();
    if (typeof rating === "number") existing.rating = rating;
    if (relativeTime) existing.relativeTime = relativeTime.trim();
    if (tripType !== undefined) existing.tripType = tripType.trim();
    if (text) existing.text = text.trim();
    if (isLocalGuide !== undefined) existing.isLocalGuide = Boolean(isLocalGuide);
    if (guideStats !== undefined) existing.guideStats = guideStats;
    if (ownerResponseDate !== undefined || ownerResponseText !== undefined) {
      existing.ownerResponse = {
        date: ownerResponseDate ?? existing.ownerResponse?.date ?? "",
        text: ownerResponseText ?? existing.ownerResponse?.text ?? "",
      };
    }
    if (typeof order === "number") existing.order = order;

    await existing.save();

    return NextResponse.json({ success: true, review: existing });
  } catch (err: any) {
    console.error("PUT Review error:", err);
    return NextResponse.json({ error: err.message || "Failed to update review" }, { status: 500 });
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
    const deleted = await ReviewModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `Review by ${deleted.author} deleted successfully.` });
  } catch (err: any) {
    console.error("DELETE Review error:", err);
    return NextResponse.json({ error: err.message || "Failed to delete review" }, { status: 500 });
  }
}

