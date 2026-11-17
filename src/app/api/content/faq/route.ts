import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { FAQModel } from "@/models/FAQ";
import { getAdminSession } from "@/lib/auth";
import { INITIAL_FAQS } from "@/lib/seedData";
import { invalidateContentCache } from "@/lib/contentService";

export async function GET() {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: true, faqs: INITIAL_FAQS });
    }

    const faqs = await FAQModel.find().sort({ order: 1 }).lean();
    if (!faqs || faqs.length === 0) {
      return NextResponse.json({ success: true, faqs: INITIAL_FAQS });
    }

    return NextResponse.json({ success: true, faqs });
  } catch (error: any) {
    console.error("[FAQ GET Error]:", error);
    return NextResponse.json({ success: true, faqs: INITIAL_FAQS });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { question, answer, category, order } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and answer are required." },
        { status: 400 }
      );
    }

    await connectDB();

    const slugId =
      body.id ||
      `faq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const newFaq = await FAQModel.create({
      id: slugId,
      question: question.trim(),
      answer: answer.trim(),
      category: category ? category.trim() : "General",
      order: Number(order) || 0,
    });

    invalidateContentCache();
    return NextResponse.json({ success: true, faq: newFaq }, { status: 201 });
  } catch (error: any) {
    console.error("[FAQ POST Error]:", error);
    return NextResponse.json({ error: "Failed to create FAQ item." }, { status: 500 });
  }
}
