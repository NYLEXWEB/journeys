import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAdminSession, verifyAuthRequest } from "@/lib/auth";
import { HeroSlideModel } from "@/models/HeroSlide";
import { INITIAL_HERO_SLIDES } from "@/lib/seedData";
import { deleteUploadThingFiles } from "@/lib/uploadthing-server";
import { invalidateContentCache } from "@/lib/contentService";

export async function GET() {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ slides: INITIAL_HERO_SLIDES, isLiveDb: false });
    }
    const slides = await HeroSlideModel.find().sort({ order: 1, slideId: 1 }).lean();
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
    const session = (await getAdminSession()) || (await verifyAuthRequest(req));
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Admin session required." }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const safeTrim = (v: any) =>
      typeof v === "string" ? v.trim() : v !== null && v !== undefined ? String(v).trim() : "";

    // Bulk update slides
    if (Array.isArray(body.slides)) {
      for (const s of body.slides) {
        if (s.slideId) {
          const existing = await HeroSlideModel.findOne({ slideId: Number(s.slideId) });
          if (existing) {
            const oldSrc = existing.src;
            if (s.word !== undefined) existing.word = safeTrim(s.word);
            if (s.subWord !== undefined) existing.subWord = safeTrim(s.subWord);
            if (s.location !== undefined) existing.location = safeTrim(s.location);
            if (s.description !== undefined) existing.description = safeTrim(s.description);
            if (s.tag !== undefined) existing.tag = safeTrim(s.tag);
            if (s.mediaType || s.type) existing.mediaType = s.mediaType || s.type;

            if (s.src !== undefined && s.src.trim() !== "") {
              const newSrc = safeTrim(s.src);
              if (oldSrc && newSrc !== oldSrc) {
                deleteUploadThingFiles([oldSrc]).catch((err) => {
                  console.warn("[UploadThing] Failed to delete old hero media:", err);
                });
              }
              existing.src = newSrc;
            }
            await existing.save();
          }
        }
      }
      invalidateContentCache();
      const updatedSlides = await HeroSlideModel.find().sort({ order: 1, slideId: 1 });
      return NextResponse.json({ success: true, slides: updatedSlides });
    }

    // Single slide update
    const { slideId, word, subWord, location, description, src, tag, mediaType, type } = body;

    if (!slideId) {
      return NextResponse.json({ error: "Slide ID is required." }, { status: 400 });
    }

    const slide = await HeroSlideModel.findOne({ slideId: Number(slideId) });
    if (!slide) {
      return NextResponse.json({ error: "Hero slide not found" }, { status: 404 });
    }

    const oldSrc = slide.src;

    if (word !== undefined) slide.word = safeTrim(word);
    if (subWord !== undefined) slide.subWord = safeTrim(subWord);
    if (location !== undefined) slide.location = safeTrim(location);
    if (description !== undefined) slide.description = safeTrim(description);
    if (tag !== undefined) slide.tag = safeTrim(tag);
    if (mediaType || type) slide.mediaType = mediaType || type;

    if (src !== undefined && src.trim() !== "") {
      const newSrc = safeTrim(src);
      if (oldSrc && newSrc !== oldSrc) {
        deleteUploadThingFiles([oldSrc]).catch((err) => {
          console.warn("[UploadThing] Failed to delete old hero media:", err);
        });
      }
      slide.src = newSrc;
    }

    await slide.save();
    invalidateContentCache();

    return NextResponse.json({ success: true, slide });
  } catch (err: any) {
    console.error("PUT Hero Slide error:", err);
    return NextResponse.json({ error: err.message || "Failed to update hero slide" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = (await getAdminSession()) || (await verifyAuthRequest(req));
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Admin session required." }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const maxSlide = await HeroSlideModel.findOne().sort({ slideId: -1 }).lean();
    const nextSlideId = (maxSlide?.slideId ?? 0) + 1;

    const newSlide = await HeroSlideModel.create({
      slideId: body.slideId ? Number(body.slideId) : nextSlideId,
      word: body.word?.trim() || "JOURNEYS",
      subWord: body.subWord?.trim() || "by Jibu Thomas",
      location: body.location?.trim() || "Kerala, India",
      description: body.description?.trim() || "",
      src: body.src?.trim() || "/images/generated/tea-plantation-approach.jpg",
      mediaType: body.mediaType || body.type || (body.src?.endsWith(".mp4") ? "video" : "image"),
      order: body.order ?? nextSlideId,
    });

    invalidateContentCache();
    return NextResponse.json({ success: true, slide: newSlide }, { status: 201 });
  } catch (err: any) {
    console.error("POST Hero Slide error:", err);
    return NextResponse.json({ error: err.message || "Failed to create hero slide" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = (await getAdminSession()) || (await verifyAuthRequest(req));
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Admin session required." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const slideId = searchParams.get("slideId");

    if (!slideId) {
      return NextResponse.json({ error: "slideId query param required" }, { status: 400 });
    }

    await connectDB();
    const deleted = await HeroSlideModel.findOneAndDelete({ slideId: Number(slideId) });

    if (!deleted) {
      return NextResponse.json({ error: "Slide not found" }, { status: 404 });
    }

    if (deleted.src) {
      deleteUploadThingFiles([deleted.src]).catch((err) => {
        console.warn("[UploadThing] Failed to delete hero media file:", err);
      });
    }

    invalidateContentCache();
    return NextResponse.json({ success: true, message: "Hero slide deleted" });
  } catch (err: any) {
    console.error("DELETE Hero Slide error:", err);
    return NextResponse.json({ error: err.message || "Failed to delete hero slide" }, { status: 500 });
  }
}
