import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export const COOKIE_NAME = "journeys_admin_session";
export const SESSION_DURATION_SECONDS = 60 * 60 * 24; // 24 hours
export const JWT_ISSUER = "journeys-atelier";
export const JWT_AUDIENCE = "journeys-admin";

export interface AdminSessionPayload extends JWTPayload {
  username: string;
  role: "admin";
  jti?: string;
}

// In-memory fallback secret generated once per process runtime in development only
let devEphemeralSecret: Uint8Array | null = null;

function getDevFallbackSecret(): Uint8Array {
  if (!devEphemeralSecret) {
    devEphemeralSecret = crypto.getRandomValues(new Uint8Array(32));
    console.warn(
      "[SECURITY NOTICE]: SESSION_SECRET is not set in environment. An ephemeral random 256-bit secret was generated for this session. Set SESSION_SECRET in .env.local to persist sessions across server restarts."
    );
  }
  return devEphemeralSecret;
}

/**
 * Retrieve session secret key as a Uint8Array suitable for jose Web Crypto.
 */
export function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET || process.env.JWT_SECRET;

  if (!secret || secret.trim().length === 0) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "FATAL SECURITY CONFIGURATION ERROR: SESSION_SECRET (or JWT_SECRET) is missing in production environment. Admin authentication cannot run without a valid secret."
      );
    }
    return getDevFallbackSecret();
  }

  if (secret.length < 32) {
    throw new Error(
      "FATAL SECURITY CONFIGURATION ERROR: SESSION_SECRET must be at least 32 characters long for cryptographic security."
    );
  }

  return new TextEncoder().encode(secret);
}

/**
 * Create a signed, tampering-proof JWT admin session token.
 */
export async function createSessionToken(username: string): Promise<string> {
  const secret = getSecretKey();
  const cleanUsername = username.trim().toLowerCase();
  const jti = crypto.randomUUID();

  const token = await new SignJWT({
    username: cleanUsername,
    role: "admin" as const,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(cleanUsername)
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setJti(jti)
    .setIssuedAt()
    .setNotBefore("0s")
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(secret);

  return token;
}

/**
 * Verify a signed JWT token against secret, issuer, audience, and algorithm.
 * Rejects expired, tampered, or mismatched tokens.
 */
export async function verifySessionToken(token: string): Promise<AdminSessionPayload | null> {
  if (!token || typeof token !== "string" || token.trim().length === 0) {
    return null;
  }

  try {
    const secret = getSecretKey();
    const { payload } = await jwtVerify(token.trim(), secret, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
      algorithms: ["HS256"], // Strictly enforce HS256 to prevent algorithm confusion attacks
      clockTolerance: 10, // 10 seconds leeway for minor clock drift
    });

    if (
      payload &&
      typeof payload.username === "string" &&
      payload.role === "admin" &&
      payload.sub === payload.username
    ) {
      return payload as AdminSessionPayload;
    }

    return null;
  } catch {
    // Verification failed (signature invalid, expired, or malformed)
    return null;
  }
}

/**
 * Extract token from either Authorization Bearer header or Cookie store.
 */
export function extractTokenFromHeaders(authHeader?: string | null, cookieHeader?: string | null): string | null {
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const bearer = authHeader.substring(7).trim();
    if (bearer) return bearer;
  }

  if (cookieHeader) {
    // Parse cookie header manually for edge runtime resilience
    const cookies = cookieHeader.split(";");
    for (const cookie of cookies) {
      const [name, ...rest] = cookie.trim().split("=");
      if (name === COOKIE_NAME) {
        return rest.join("=").trim();
      }
    }
  }

  return null;
}

/**
 * Safely extract client IP address to prevent header spoofing.
 */
export function extractClientIp(req: Request | { headers: Headers }): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    // The first IP is the true client IP before any trusted reverse proxies
    const firstIp = forwarded.split(",")[0].trim();
    if (firstIp) return firstIp;
  }

  const realIp = req.headers.get("x-real-ip");
  if (realIp && realIp.trim().length > 0) {
    return realIp.trim();
  }

  return "127.0.0.1";
}
