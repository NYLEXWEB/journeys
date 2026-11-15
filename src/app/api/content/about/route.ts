import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { AboutModel } from "@/models/About";
import { getAdminSession } from "@/lib/auth";
import { INITIAL_ABOUT } from "@/lib/seedData";

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

    const updated = await AboutModel.findOneAndUpdate(
      {},
      { $set: body },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, about: updated });
  } catch (error: any) {
    console.error("[About PUT Error]:", error);
    return NextResponse.json({ error: "Failed to update about content." }, { status: 500 });
  }
}

