import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";

const f = createUploadthing();

/**
 * Server-side authorization check for UploadThing uploads.
 * Verifies Bearer token or HTTP-only session cookie (journeys_admin_session).
 */
async function checkAdminAuth(req?: NextRequest) {
  try {
    let authHeader = req?.headers.get("authorization");
    if (!authHeader) {
      try {
        const headerStore = await headers();
        authHeader = headerStore.get("authorization");
      } catch {
        // Headers might not be available in some contexts
      }
    }

    if (authHeader?.startsWith("Bearer ")) {
      const bearer = authHeader.substring(7).trim();
      const session = await verifySessionToken(bearer);
      if (session?.username) {
        return { username: session.username };
      }
    }

    let token = req?.cookies?.get(COOKIE_NAME)?.value;
    if (!token) {
      try {
        const cookieStore = await cookies();
        token = cookieStore.get(COOKIE_NAME)?.value;
      } catch {
        // Cookies might not be available in some contexts
      }
    }

    if (token) {
      const session = await verifySessionToken(token);
      if (session?.username) {
        return { username: session.username };
      }
    }
  } catch (err) {
    console.warn("Auth verification warning in uploadthing:", err);
  }

  throw new UploadThingError("Unauthorized: Admin authentication required to upload media.");
}

export const ourFileRouter = {
  // Photos up to 10 MB
  imageUploader: f({
    image: {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req, files }) => {
      const user = await checkAdminAuth(req);
      const maxBytes = 10 * 1024 * 1024;
      for (const file of files) {
        if (file.size > maxBytes) {
          throw new UploadThingError("Image size exceeds the strict 10 MB limit.");
        }
      }
      return { uploadedBy: user.username };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const fileUrl =
        (file as any).ufsUrl ||
        (file as any).url ||
        (file.key ? `https://utfs.io/f/${file.key}` : "");
      return {
        uploadedBy: metadata.uploadedBy,
        url: fileUrl,
        key: file.key,
        name: file.name,
        type: "image" as const,
      };
    }),

  // Standard videos up to 50 MB
  videoUploader: f({
    video: {
      maxFileSize: "64MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req, files }) => {
      const user = await checkAdminAuth(req);
      const maxBytes = 50 * 1024 * 1024;
      for (const file of files) {
        if (file.size > maxBytes) {
          throw new UploadThingError("Video size exceeds the strict 50 MB limit.");
        }
      }
      return { uploadedBy: user.username };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const fileUrl =
        (file as any).ufsUrl ||
        (file as any).url ||
        (file.key ? `https://utfs.io/f/${file.key}` : "");
      return {
        uploadedBy: metadata.uploadedBy,
        url: fileUrl,
        key: file.key,
        name: file.name,
        type: "video" as const,
      };
    }),

  // Homepage hero video strictly up to 15 MB
  heroVideoUploader: f({
    video: {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req, files }) => {
      const user = await checkAdminAuth(req);
      const maxBytes = 15 * 1024 * 1024;
      for (const file of files) {
        if (file.size > maxBytes) {
          throw new UploadThingError("Hero video size exceeds the strict 15 MB limit.");
        }
      }
      return { uploadedBy: user.username };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const fileUrl =
        (file as any).ufsUrl ||
        (file as any).url ||
        (file.key ? `https://utfs.io/f/${file.key}` : "");
      return {
        uploadedBy: metadata.uploadedBy,
        url: fileUrl,
        key: file.key,
        name: file.name,
        type: "video" as const,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
