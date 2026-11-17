import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { FAQModel } from "@/models/FAQ";
import { getAdminSession } from "@/lib/auth";
import { invalidateContentCache } from "@/lib/contentService";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!id || id === "undefined") {
      return NextResponse.json({ error: "Invalid FAQ ID provided." }, { status: 400 });
    }

    const body = await req.json();
    await connectDB();

    const query = mongoose.isValidObjectId(id) ? { $or: [{ id }, { _id: id }] } : { id };
    const updated = await FAQModel.findOneAndUpdate(
      query,
      { $set: body },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "FAQ item not found." }, { status: 404 });
    }

    invalidateContentCache();
    return NextResponse.json({ success: true, faq: updated });
  } catch (error: any) {
    console.error("[FAQ PUT Error]:", error);
    return NextResponse.json({ error: error.message || "Failed to update FAQ item." }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!id || id === "undefined") {
      return NextResponse.json({ error: "Invalid FAQ ID provided." }, { status: 400 });
    }

    await connectDB();

    const query = mongoose.isValidObjectId(id) ? { $or: [{ id }, { _id: id }] } : { id };
    const deleted = await FAQModel.findOneAndDelete(query);

    if (!deleted) {
      return NextResponse.json({ error: "FAQ item not found." }, { status: 404 });
    }

    invalidateContentCache();
    return NextResponse.json({ success: true, message: "FAQ item deleted successfully." });
  } catch (error: any) {
    console.error("[FAQ DELETE Error]:", error);
    return NextResponse.json({ error: error.message || "Failed to delete FAQ item." }, { status: 500 });
  }
}
