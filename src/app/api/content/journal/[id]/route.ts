import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { JournalModel } from "@/models/Journal";
import { getAdminSession } from "@/lib/auth";
import { deleteUploadThingFiles } from "@/lib/uploadthing-server";
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
      return NextResponse.json({ error: "Invalid article ID provided." }, { status: 400 });
    }

    const body = await req.json();
    await connectDB();

    const query = mongoose.isValidObjectId(id) ? { $or: [{ id }, { _id: id }] } : { id };
    const existing = await JournalModel.findOne(query);
    if (!existing) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    if (body.image !== undefined && body.image.trim() !== existing.image) {
      const oldImage = existing.image;
      if (oldImage) {
        deleteUploadThingFiles([oldImage]).catch((err) =>
          console.warn("[UploadThing] Failed to delete replaced journal image:", err)
        );
      }
    }

    const updated = await JournalModel.findOneAndUpdate(
      query,
      { $set: body },
      { new: true }
    );

    invalidateContentCache();
    return NextResponse.json({ success: true, article: updated });
  } catch (error: any) {
    console.error("[Journal PUT Error]:", error);
    return NextResponse.json({ error: error.message || "Failed to update article." }, { status: 500 });
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
      return NextResponse.json({ error: "Invalid article ID provided." }, { status: 400 });
    }

    await connectDB();

    const query = mongoose.isValidObjectId(id) ? { $or: [{ id }, { _id: id }] } : { id };
    const deleted = await JournalModel.findOneAndDelete(query);

    if (!deleted) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Automatically purge remote cloud assets from UploadThing if uploaded
    if (deleted.image) {
      deleteUploadThingFiles([deleted.image]).catch((err) => {
        console.warn("[UploadThing] Failed to delete file after journal deletion:", err);
      });
    }

    invalidateContentCache();
    return NextResponse.json({ success: true, message: "Article deleted." });
  } catch (error: any) {
    console.error("[Journal DELETE Error]:", error);
    return NextResponse.json({ error: error.message || "Failed to delete article." }, { status: 500 });
  }
}
