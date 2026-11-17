import { NextResponse } from "next/server";
import { getLiveWebsiteContent } from "@/lib/contentService";

export async function GET() {
  try {
    const data = await getLiveWebsiteContent();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("API /api/content/all error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
