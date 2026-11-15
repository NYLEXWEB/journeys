import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { JournalModel } from "@/models/Journal";
import { getAdminSession } from "@/lib/auth";
import { INITIAL_JOURNAL } from "@/lib/seedData";

export async function GET() {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: true, articles: INITIAL_JOURNAL });
    }

    const articles = await JournalModel.find().sort({ order: 1, createdAt: -1 }).lean();
    if (!articles || articles.length === 0) {
      return NextResponse.json({ success: true, articles: INITIAL_JOURNAL });
    }

    return NextResponse.json({ success: true, articles });
  } catch (error: any) {
    console.error("[Journal GET Error]:", error);
    return NextResponse.json({ success: true, articles: INITIAL_JOURNAL });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      subtitle,
      category,
      categoryKey,
      readTime,
      date,
      image,
      summary,
      fullContent,
      takeaways,
      order,
    } = body;

    if (!title || !summary) {
      return NextResponse.json({ error: "Title and summary are required." }, { status: 400 });
    }

    await connectDB();

    const slugId =
      body.id ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newArticle = await JournalModel.create({
      id: slugId,
      issueNumber: body.issueNumber || "Dispatches",
      category: category || "Travel Guide",
      categoryKey: categoryKey || "general",
      title: title.trim(),
      subtitle: subtitle || "",
      readTime: readTime || "5 min read",
      date: date || "Recently Published",
      image: image || "/images/generated/tea-plantation-approach.jpg",
      summary: summary.trim(),
      fullContent: Array.isArray(fullContent) ? fullContent : [summary],
      takeaways: Array.isArray(takeaways) ? takeaways : [],
      order: Number(order) || 0,
    });

    return NextResponse.json({ success: true, article: newArticle }, { status: 201 });
  } catch (error: any) {
    console.error("[Journal POST Error]:", error);
    return NextResponse.json({ error: "Failed to create article." }, { status: 500 });
  }
}

