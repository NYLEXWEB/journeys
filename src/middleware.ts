import { NextRequest, NextResponse } from "next/server";
import {
  verifySessionToken,
  COOKIE_NAME,
  extractTokenFromHeaders,
} from "@/lib/jwt";

/**
 * Origin validation for mutation requests (CSRF Defense)
 */
function isAllowedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) {
    // If no Origin header, check Referer
    const referer = req.headers.get("referer");
    if (!referer) return true; // Direct non-browser or curl request
    try {
      const refererUrl = new URL(referer);
      const host = req.headers.get("host") || req.nextUrl.host;
      return refererUrl.host === host;
    } catch {
      return false;
    }
  }

  try {
    const originUrl = new URL(origin);
    const host = req.headers.get("host") || req.nextUrl.host;
    return originUrl.host === host;
  } catch {
    return false;
  }
}

/**
 * Apply security headers to response
 */
function applySecurityHeaders(res: NextResponse): NextResponse {
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.headers.set("X-XSS-Protection", "1; mode=block");
  return res;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method.toUpperCase();

  // 1. Verify Origin for all state-changing API operations (CSRF Defense)
  // Exclude UploadThing (/api/uploadthing receives HMAC signed webhooks from UploadThing cloud ingest)
  if (
    ["POST", "PUT", "DELETE", "PATCH"].includes(method) &&
    pathname.startsWith("/api/") &&
    !pathname.startsWith("/api/uploadthing")
  ) {
    if (!isAllowedOrigin(req)) {
      return applySecurityHeaders(
        NextResponse.json(
          { error: "Forbidden: Cross-site request forgery (CSRF) detected." },
          { status: 403 }
        )
      );
    }
  }

  // 2. Identify if route requires Admin JWT authentication
  let requiresAdminAuth = false;

  // Content mutation routes (POST, PUT, DELETE, PATCH on /api/content/*)
  if (pathname.startsWith("/api/content/") && ["POST", "PUT", "DELETE", "PATCH"].includes(method)) {
    requiresAdminAuth = true;
  }

  // Media upload fallback route (/api/upload)
  // Note: /api/uploadthing secures uploads via its internal FileRouter middleware (core.ts checkAdminAuth)
  // and validates callback webhooks via UploadThing HMAC signature. It must NOT be intercepted here.
  if (pathname === "/api/upload" && method === "POST") {
    requiresAdminAuth = true;
  }

  // Enquiries management (GET, PATCH, DELETE on /api/enquiries)
  // Public users can only POST new enquiries
  if (pathname.startsWith("/api/enquiries") && method !== "POST") {
    requiresAdminAuth = true;
  }

  // 3. Enforce JWT authentication if required
  if (requiresAdminAuth) {
    const authHeader = req.headers.get("authorization");
    const cookieHeader = req.headers.get("cookie");
    const token = extractTokenFromHeaders(authHeader, cookieHeader);

    if (!token) {
      return applySecurityHeaders(
        NextResponse.json(
          { error: "Unauthorized: Missing or invalid admin authentication token." },
          { status: 401 }
        )
      );
    }

    const session = await verifySessionToken(token);
    if (!session || session.role !== "admin") {
      return applySecurityHeaders(
        NextResponse.json(
          { error: "Unauthorized: Invalid or expired admin session token." },
          { status: 401 }
        )
      );
    }
  }

  // Proceed to route and append security headers
  const response = NextResponse.next();
  return applySecurityHeaders(response);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static assets)
     * - _next/image (image optimization files)
     * - favicon.ico (browser favicon)
     * - images/ (public static images)
     */
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
