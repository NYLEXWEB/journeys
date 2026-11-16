import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getUploadThingStorageUsage } from "@/lib/uploadthing-server";

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const usage = await getUploadThingStorageUsage();
  return NextResponse.json({ success: true, usage });
}
