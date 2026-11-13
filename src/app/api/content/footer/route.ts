import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { verifyAuthRequest } from "@/lib/auth";
import { FooterContentModel } from "@/models/FooterContent";
import { INITIAL_FOOTER_CONTENT } from "@/lib/seedData";

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

    if (brandName !== undefined) footer.brandName = brandName.trim();
    if (tagline !== undefined) footer.tagline = tagline.trim();
    if (atelierDescription !== undefined) footer.atelierDescription = atelierDescription.trim();
    if (copyrightText !== undefined) footer.copyrightText = copyrightText.trim();
    if (socialLinks && Array.isArray(socialLinks)) {
      footer.socialLinks = socialLinks.map((s: any) => ({
        platform: s.platform || "Social",
        url: s.url || "#",
        active: s.active !== undefined ? Boolean(s.active) : true,
      }));
    }

    await footer.save();

    return NextResponse.json({ success: true, footer });
  } catch (err: any) {
    console.error("PUT Footer error:", err);
    return NextResponse.json({ error: err.message || "Failed to update footer content" }, { status: 500 });
  }
}
