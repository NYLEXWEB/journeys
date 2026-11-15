import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { JournalModel } from "@/models/Journal";
import { getAdminSession } from "@/lib/auth";

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
    const body = await req.json();

    await connectDB();

    const updated = await JournalModel.findOneAndUpdate(
      { $or: [{ id }, { _id: id }] },
      { $set: body },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, article: updated });
  } catch (error: any) {
    console.error("[Journal PUT Error]:", error);
    return NextResponse.json({ error: "Failed to update article." }, { status: 500 });
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
    await connectDB();

    const deleted = await JournalModel.findOneAndDelete({
      $or: [{ id }, { _id: id }],
    });

    if (!deleted) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Article deleted." });
  } catch (error: any) {
    console.error("[Journal DELETE Error]:", error);
    return NextResponse.json({ error: "Failed to delete article." }, { status: 500 });
  }
}

