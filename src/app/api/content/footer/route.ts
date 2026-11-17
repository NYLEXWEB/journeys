import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { verifyAuthRequest } from "@/lib/auth";
import { FooterContentModel } from "@/models/FooterContent";
import { INITIAL_FOOTER_CONTENT } from "@/lib/seedData";
import { invalidateContentCache } from "@/lib/contentService";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ footer: INITIAL_FOOTER_CONTENT, isLiveDb: false });
    }
    const footer = await FooterContentModel.findOne().lean();
    return NextResponse.json({
      footer: footer || INITIAL_FOOTER_CONTENT,
      isLiveDb: true,
    });
  } catch (err: any) {
    return NextResponse.json({ footer: INITIAL_FOOTER_CONTENT, error: err.message }, { status: 500 });
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
    const { brandName, tagline, atelierDescription, copyrightText, socialLinks } = body;

    let footer = await FooterContentModel.findOne();
    if (!footer) {
      footer = new FooterContentModel(INITIAL_FOOTER_CONTENT);
    }

    const safeTrim = (v: any) => (typeof v === "string" ? v.trim() : v !== null && v !== undefined ? String(v).trim() : "");

    if (brandName !== undefined && brandName !== null) footer.brandName = safeTrim(brandName);
    if (tagline !== undefined && tagline !== null) footer.tagline = safeTrim(tagline);
    if (atelierDescription !== undefined && atelierDescription !== null) footer.atelierDescription = safeTrim(atelierDescription);
    if (copyrightText !== undefined && copyrightText !== null) footer.copyrightText = safeTrim(copyrightText);
    
    if (socialLinks && Array.isArray(socialLinks)) {
      footer.socialLinks = socialLinks.map((s: any) => ({
        platform: s.platform || "Social",
        url: s.url || "#",
        active: s.active !== undefined ? Boolean(s.active) : true,
      }));
    }

    await footer.save();

    invalidateContentCache();
    return NextResponse.json({ success: true, footer });
  } catch (err: any) {
    console.error("PUT Footer error:", err);
    return NextResponse.json({ error: err.message || "Failed to update footer content" }, { status: 500 });
  }
}
