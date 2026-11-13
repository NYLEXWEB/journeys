import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { verifyAuthRequest } from "@/lib/auth";
import { JourneyModel } from "@/models/Journey";
import { INITIAL_JOURNEYS } from "@/lib/seedData";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ journeys: INITIAL_JOURNEYS, isLiveDb: false });
    }
    const journeys = await JourneyModel.find().sort({ order: 1 }).lean();
    return NextResponse.json({
      journeys: journeys.length ? journeys : INITIAL_JOURNEYS,
      isLiveDb: true,
    });
  } catch (err: any) {
    return NextResponse.json({ journeys: INITIAL_JOURNEYS, error: err.message }, { status: 500 });
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
    const route = body.route;
    const title = body.title || route;
    const { duration, shortVibe, overview, highlights, image } = body;

    if (!route || !duration || !shortVibe || !overview) {
      return NextResponse.json(
        { error: "Route, duration, short vibe, and overview are required." },
        { status: 400 }
      );
    }

    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    let uniqueId = baseSlug;
    let counter = 1;
    while (await JourneyModel.findOne({ id: uniqueId })) {
      uniqueId = `${baseSlug}-${counter++}`;
    }

    const count = await JourneyModel.countDocuments();
    const nextNumber = String(count + 1).padStart(2, "0");

    const created = await JourneyModel.create({
      id: uniqueId,
      number: nextNumber,
      title: title.trim(),
      route: route.trim(),
      duration: duration.trim(),
      shortVibe: shortVibe.trim(),
      overview: overview.trim(),
      highlights: Array.isArray(highlights) ? highlights : [],
      image: image || "/images/generated/houseboat-backwaters.jpg",
      order: count + 1,
    });

    return NextResponse.json({ success: true, journey: created }, { status: 201 });
  } catch (err: any) {
    console.error("POST Journey error:", err);
    return NextResponse.json({ error: err.message || "Failed to create journey" }, { status: 500 });
  }
}
