import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { verifyAuthRequest } from "@/lib/auth";
import { ExperienceModel } from "@/models/Experience";
import { INITIAL_EXPERIENCES } from "@/lib/seedData";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ experiences: INITIAL_EXPERIENCES, isLiveDb: false });
    }
    const experiences = await ExperienceModel.find().sort({ order: 1 }).lean();
    return NextResponse.json({
      experiences: experiences.length ? experiences : INITIAL_EXPERIENCES,
      isLiveDb: true,
    });
  } catch (err: any) {
    return NextResponse.json({ experiences: INITIAL_EXPERIENCES, error: err.message }, { status: 500 });
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
    const { title, locations, description, highlights, image, number } = body;
    const idealDuration = body.idealDuration || body.duration;

    if (!title || !description || !idealDuration || !locations) {
      return NextResponse.json(
        { error: "Title, ideal duration, locations, and description are required." },
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
    while (await ExperienceModel.findOne({ id: uniqueId })) {
      uniqueId = `${baseSlug}-${counter++}`;
    }

    const count = await ExperienceModel.countDocuments();
    const nextNumber = String(count + 1).padStart(2, "0");

    const created = await ExperienceModel.create({
      id: uniqueId,
      number: nextNumber,
      title: title.trim(),
      idealDuration: idealDuration.trim(),
      locations: locations.trim(),
      description: description.trim(),
      highlights: Array.isArray(highlights) ? highlights : [],
      image: image || "/images/generated/houseboat-backwaters.jpg",
      order: count + 1,
    });

    return NextResponse.json({ success: true, experience: created }, { status: 201 });
  } catch (err: any) {
    console.error("POST Experience error:", err);
    return NextResponse.json({ error: err.message || "Failed to create experience" }, { status: 500 });
  }
}
