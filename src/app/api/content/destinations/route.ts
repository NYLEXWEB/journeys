import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { verifyAuthRequest } from "@/lib/auth";
import { DestinationModel } from "@/models/Destination";
import { INITIAL_DESTINATIONS } from "@/lib/seedData";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ destinations: INITIAL_DESTINATIONS, isLiveDb: false });
    }
    const destinations = await DestinationModel.find().sort({ order: 1 }).lean();
    return NextResponse.json({
      destinations: destinations.length ? destinations : INITIAL_DESTINATIONS,
      isLiveDb: true,
    });
  } catch (err: any) {
    return NextResponse.json({ destinations: INITIAL_DESTINATIONS, error: err.message }, { status: 500 });
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
      return NextResponse.json({ error: "Database not connected. Please check MONGODB_URI." }, { status: 503 });
    }

    const body = await req.json();
    const { name, state, region, shortVibe, overview, highlights, image } = body;

    if (!name || !state || !region || !shortVibe || !overview) {
      return NextResponse.json(
        { error: "Name, state, region, short vibe, and overview are required fields." },
        { status: 400 }
      );
    }

    // Generate slug id from name
    const baseSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    let uniqueId = baseSlug;
    let counter = 1;
    while (await DestinationModel.findOne({ id: uniqueId })) {
      uniqueId = `${baseSlug}-${counter++}`;
    }

    const stateCategory =
      state === "Kerala" ? "kerala" : state === "Tamil Nadu" ? "tamil-nadu" : "karnataka";

    const defaultImage = image || "/images/generated/tea-plantation-approach.jpg";

    const count = await DestinationModel.countDocuments();

    const created = await DestinationModel.create({
      id: uniqueId,
      name: name.trim(),
      state,
      stateCategory,
      region: region.trim(),
      shortVibe: shortVibe.trim(),
      overview: overview.trim(),
      highlights: Array.isArray(highlights) ? highlights : [],
      image: defaultImage,
      order: count + 1,
    });

    return NextResponse.json({ success: true, destination: created }, { status: 201 });
  } catch (err: any) {
    console.error("POST Destination error:", err);
    return NextResponse.json({ error: err.message || "Failed to create destination" }, { status: 500 });
  }
}
