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
    const safeTrim = (v: any) =>
      typeof v === "string" ? v.trim() : v !== null && v !== undefined ? String(v).trim() : "";

    // Bulk update slides
    if (Array.isArray(body.slides)) {
      for (const s of body.slides) {
        if (s.slideId) {
          const updateData: any = {};
          if (s.word !== undefined) updateData.word = safeTrim(s.word);
          if (s.subWord !== undefined) updateData.subWord = safeTrim(s.subWord);
          if (s.location !== undefined) updateData.location = safeTrim(s.location);
          if (s.description !== undefined) updateData.description = safeTrim(s.description);
          if (s.src !== undefined) updateData.src = safeTrim(s.src);
          if (s.tag !== undefined) updateData.tag = safeTrim(s.tag);

          await HeroSlideModel.updateOne(
            { slideId: Number(s.slideId) },
            { $set: updateData }
          );
        }
      }
      const updatedSlides = await HeroSlideModel.find().sort({ order: 1 });
      return NextResponse.json({ success: true, slides: updatedSlides });
    }

    // Single slide update
    const { slideId, word, subWord, location, description, src, tag } = body;

    if (!slideId) {
      return NextResponse.json({ error: "Slide ID is required." }, { status: 400 });
    }

    const slide = await HeroSlideModel.findOne({ slideId: Number(slideId) });
    if (!slide) {
      return NextResponse.json({ error: "Hero slide not found" }, { status: 404 });
    }

    if (word !== undefined) slide.word = safeTrim(word);
    if (subWord !== undefined) slide.subWord = safeTrim(subWord);
    if (location !== undefined) slide.location = safeTrim(location);
    if (description !== undefined) slide.description = safeTrim(description);
    if (src !== undefined && src.trim().length > 0) slide.src = safeTrim(src);
    if (tag !== undefined) slide.tag = safeTrim(tag);

    await slide.save();

    return NextResponse.json({ success: true, slide });
  } catch (err: any) {
    console.error("PUT Hero Slide error:", err);
    return NextResponse.json({ error: err.message || "Failed to update hero slide" }, { status: 500 });
  }
}
