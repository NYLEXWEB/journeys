import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { verifyAuthRequest } from "@/lib/auth";
import { ReviewModel } from "@/models/Review";
import { INITIAL_REVIEWS } from "@/lib/seedData";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ reviews: INITIAL_REVIEWS, isLiveDb: false });
    }
    const reviews = await ReviewModel.find().sort({ order: 1 }).lean();
    return NextResponse.json({
      reviews: reviews.length ? reviews : INITIAL_REVIEWS,
      isLiveDb: true,
    });
  } catch (err: any) {
    return NextResponse.json({ reviews: INITIAL_REVIEWS, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await verifyAuthRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Admin session required." }, { status: 401 });
    }

    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ error: "Database not connected." }, { status: 503 });
    }

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
    } = body;

    if (!author || !location || !text) {
      return NextResponse.json(
        { error: "Author name, location, and review text are required." },
        { status: 400 }
      );
    }

    const count = await ReviewModel.countDocuments();
    const avatarInitial = author.trim().charAt(0).toUpperCase() || "J";
    const colors = ["bg-[#1A73E8]", "bg-[#EA4335]", "bg-[#34A853]", "bg-[#FBBC04]", "bg-[#673AB7]", "bg-[#183D2B]"];
    const avatarColor = colors[count % colors.length];

    const created = await ReviewModel.create({
      author: author.trim(),
      avatarColor,
      avatarInitial,
      location: location.trim(),
      isLocalGuide: Boolean(isLocalGuide),
      guideStats: guideStats || (isLocalGuide ? "Local Guide" : ""),
      rating: Number(rating) || 5,
      relativeTime: relativeTime || "Recently",
      tripType: tripType || "Bespoke Kerala Journey",
      text: text.trim(),
      ownerResponse: {
        date: ownerResponseDate || "",
        text: ownerResponseText || "",
      },
      order: count + 1,
    });

    return NextResponse.json({ success: true, review: created }, { status: 201 });
  } catch (err: any) {
    console.error("POST Review error:", err);
    return NextResponse.json({ error: err.message || "Failed to create review" }, { status: 500 });
  }
}
