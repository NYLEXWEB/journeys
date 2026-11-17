import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { AboutModel } from "@/models/About";
import { getAdminSession } from "@/lib/auth";
import { INITIAL_ABOUT } from "@/lib/seedData";
import { deleteUploadThingFiles } from "@/lib/uploadthing-server";

export async function GET() {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: true, about: INITIAL_ABOUT });
    }

    let about = await AboutModel.findOne().lean();
    if (!about) {
      about = await AboutModel.create(INITIAL_ABOUT);
    }

    return NextResponse.json({ success: true, about });
  } catch (error: any) {
    console.error("[About GET Error]:", error);
    return NextResponse.json({ success: true, about: INITIAL_ABOUT });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await connectDB();

    // Check existing document to compare image URLs
    const existing = await AboutModel.findOne().lean();

    const updated = await AboutModel.findOneAndUpdate(
      {},
      { $set: body },
      { upsert: true, new: true }
    );

    // If storyImage replaced, purge old file
    if (existing && body.storyImage && existing.storyImage && body.storyImage !== existing.storyImage) {
      deleteUploadThingFiles([existing.storyImage]).catch((err) => {
        console.warn("[UploadThing] Failed to delete replaced storyImage:", err);
      });
    }

    // If jibuImage replaced, purge old file
    if (existing && body.jibuImage && existing.jibuImage && body.jibuImage !== existing.jibuImage) {
      deleteUploadThingFiles([existing.jibuImage]).catch((err) => {
        console.warn("[UploadThing] Failed to delete replaced jibuImage:", err);
      });
    }

    return NextResponse.json({ success: true, about: updated });
  } catch (error: any) {
    console.error("[About PUT Error]:", error);
    return NextResponse.json({ error: "Failed to update about content." }, { status: 500 });
  }
}
