import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const COOKIE_NAME = "journeys_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 days

// Retrieve session secret as Uint8Array for jose
function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET || "journeys_super_secure_jwt_session_secret_key_32chars_min";
  return new TextEncoder().encode(secret);
}

// In-memory sliding window rate limiter for login attempts
interface RateLimitRecord {
  attempts: number;
  lastAttempt: number;
}
const loginRateLimitMap = new Map<string, RateLimitRecord>();

export function checkLoginRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const record = loginRateLimitMap.get(ip);
  const WINDOW_MS = 15 * 60 * 1000; // 15 minutes window
  const MAX_ATTEMPTS = 6; // max 6 attempts per 15 minutes

  if (!record) {
    loginRateLimitMap.set(ip, { attempts: 1, lastAttempt: now });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (now - record.lastAttempt > WINDOW_MS) {
    // Reset window
    loginRateLimitMap.set(ip, { attempts: 1, lastAttempt: now });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    const timeLeft = Math.ceil((WINDOW_MS - (now - record.lastAttempt)) / 1000);
    return { allowed: false, retryAfterSeconds: timeLeft };
  }

  record.attempts += 1;
  record.lastAttempt = now;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function resetLoginRateLimit(ip: string): void {
  loginRateLimitMap.delete(ip);
}

/**
 * Verify given username and password against environment variables.
 */
export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  const expectedUser = process.env.ADMIN_USERNAME || "admin";
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  if (username !== expectedUser) {
    return false;
  }

  if (expectedHash) {
    try {
      if (expectedHash.startsWith("$2a$") || expectedHash.startsWith("$2b$") || expectedHash.startsWith("$2y$")) {
        return await bcrypt.compare(password, expectedHash);
      }
      // If expectedHash is stored as plaintext fallback in dev
      return password === expectedHash;
    } catch {
      return false;
    }
  }

  // Fallback default password if ADMIN_PASSWORD_HASH is not set yet in .env
  // Allows the site owner to log in using default password on first run
  return password === "jibu2026" || password === "admin";
}

/**
 * Create a signed JWT session token.
 */
export async function createSessionToken(username: string): Promise<string> {
  const secret = getSecretKey();
  const token = await new SignJWT({ username, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(secret);
  return token;
}

/**
 * Verify a signed JWT session token.
 */
export async function verifySessionToken(token: string): Promise<{ username: string } | null> {
  try {
    const secret = getSecretKey();
    const { payload } = await jwtVerify(token, secret);
    if (payload && payload.username) {
      return { username: payload.username as string };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Check if the current request is from an authenticated admin.
 */
export async function getAdminSession(): Promise<{ username: string } | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

/**
 * Helper to check auth in Route Handlers.
 */
export async function verifyAuthRequest(req: NextRequest): Promise<{ username: string } | null> {
  const cookieToken = req.cookies.get(COOKIE_NAME)?.value;
  if (!cookieToken) return null;
  return await verifySessionToken(cookieToken);
}

export { COOKIE_NAME, SESSION_DURATION_SECONDS };

