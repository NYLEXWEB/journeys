import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { verifyAuthRequest } from "@/lib/auth";
import { HeroSlideModel } from "@/models/HeroSlide";
import { INITIAL_HERO_SLIDES } from "@/lib/seedData";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ slides: INITIAL_HERO_SLIDES, isLiveDb: false });
    }
    const slides = await HeroSlideModel.find().sort({ order: 1 }).lean();
    return NextResponse.json({
      slides: slides.length ? slides : INITIAL_HERO_SLIDES,
      isLiveDb: true,
    });
  } catch (err: any) {
    return NextResponse.json({ slides: INITIAL_HERO_SLIDES, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
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

    if (Array.isArray(body.slides)) {
      for (const s of body.slides) {
        if (s.slideId) {
          await HeroSlideModel.updateOne(
            { slideId: Number(s.slideId) },
            {
              $set: {
                word: s.word?.trim(),
                subWord: s.subWord?.trim(),
                location: s.location?.trim(),
                description: s.description?.trim(),
              },
            }
          );
        }
      }
      const updatedSlides = await HeroSlideModel.find().sort({ order: 1 });
      return NextResponse.json({ success: true, slides: updatedSlides });
    }

    const { slideId, word, subWord, location, description } = body;

    if (!slideId || !word) {
      return NextResponse.json({ error: "Slide ID and main word are required." }, { status: 400 });
    }

    const slide = await HeroSlideModel.findOne({ slideId: Number(slideId) });
    if (!slide) {
      return NextResponse.json({ error: "Hero slide not found" }, { status: 404 });
    }

    slide.word = word.trim();
    if (subWord !== undefined) slide.subWord = subWord.trim();
    if (location !== undefined) slide.location = location.trim();
    if (description !== undefined) slide.description = description.trim();

    await slide.save();

    return NextResponse.json({ success: true, slide });
  } catch (err: any) {
    console.error("PUT Hero Slide error:", err);
    return NextResponse.json({ error: err.message || "Failed to update hero slide" }, { status: 500 });
  }
}
