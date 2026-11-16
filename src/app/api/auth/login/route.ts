import { NextRequest, NextResponse } from "next/server";
import {
  verifyAdminCredentials,
  createSessionToken,
  checkLoginRateLimit,
  resetLoginRateLimit,
  extractClientIp,
  COOKIE_NAME,
  SESSION_DURATION_SECONDS,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const ip = extractClientIp(req);
    const rateCheck = checkLoginRateLimit(ip);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many failed login attempts from this address. For security, please wait ${rateCheck.retryAfterSeconds} seconds before trying again.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.retryAfterSeconds),
          },
        }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request payload format." },
        { status: 400 }
      );
    }

    const { username, password } = body || {};

    if (!username || !password || typeof username !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      );
    }

    if (password.length > 128) {
      return NextResponse.json(
        { error: "Password exceeds allowed length limits." },
        { status: 400 }
      );
    }

    const isValid = await verifyAdminCredentials(username, password);

    if (!isValid) {
      // Intentionally uniform error message to prevent user enumeration
      return NextResponse.json(
        { error: "Invalid username or password. Please verify your credentials." },
        { status: 401 }
      );
    }

    // Reset rate limiter on successful authentication
    resetLoginRateLimit(ip);

    // Create cryptographically signed JWT session token with issuer, audience & jti
    const token = await createSessionToken(username);

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
      user: {
        username: username.trim().toLowerCase(),
        role: "admin",
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_DURATION_SECONDS,
      path: "/",
    });

    return response;
  } catch (err: any) {
    console.error("[Login API Security Error]:", err);
    return NextResponse.json(
      { error: "An unexpected security error occurred during login. Please try again." },
      { status: 500 }
    );
  }
}
