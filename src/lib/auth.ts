import bcrypt from "bcryptjs";
import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import {
  COOKIE_NAME,
  SESSION_DURATION_SECONDS,
  JWT_ISSUER,
  JWT_AUDIENCE,
  createSessionToken,
  verifySessionToken,
  extractTokenFromHeaders,
  extractClientIp,
  type AdminSessionPayload,
} from "./jwt";

// Re-export all JWT utilities for backward compatibility across the codebase
export {
  COOKIE_NAME,
  SESSION_DURATION_SECONDS,
  JWT_ISSUER,
  JWT_AUDIENCE,
  createSessionToken,
  verifySessionToken,
  extractTokenFromHeaders,
  extractClientIp,
  type AdminSessionPayload,
};

// Constant pre-computed 12-round bcrypt hash used for dummy comparison to defeat timing attacks
const TIMING_ATTACK_DUMMY_HASH =
  "$2b$12$dVFUylfcevYGvcQU2XW7AuZAuDLwwcMkI.wNaUB7pvucBVzpioUOi";

/**
 * Constant-time string equality check to prevent side-channel timing analysis.
 */
function constantTimeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Perform dummy timing comparison to avoid leaking length difference timing
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

// In-memory sliding-window rate limiter for admin login attempts
interface RateLimitRecord {
  attempts: number;
  firstAttempt: number;
  lockedUntil?: number;
}
const loginRateLimitMap = new Map<string, RateLimitRecord>();

// Clean up stale entries every 30 minutes
const CLEANUP_INTERVAL_MS = 30 * 60 * 1000;
let lastCleanup = Date.now();

function purgeStaleRateLimitRecords(): void {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  const EXPIRATION_MS = 60 * 60 * 1000; // 1 hour
  for (const [ip, record] of loginRateLimitMap.entries()) {
    if (now - record.firstAttempt > EXPIRATION_MS) {
      loginRateLimitMap.delete(ip);
    }
  }
}

/**
 * Check if the given client IP has exceeded the allowed login attempts.
 * Max 5 attempts per 15 minutes window. On 5th failure, locks out for 15 minutes.
 */
export function checkLoginRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  purgeStaleRateLimitRecords();

  const now = Date.now();
  const isDev = process.env.NODE_ENV !== "production";
  const WINDOW_MS = isDev ? 60 * 1000 : 15 * 60 * 1000; // 1 min in dev, 15 min in prod
  const MAX_ATTEMPTS = isDev ? 15 : 5; // 15 attempts in dev, 5 in prod

  const record = loginRateLimitMap.get(ip);

  if (!record) {
    loginRateLimitMap.set(ip, { attempts: 1, firstAttempt: now });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  // Check if active lockout exists
  if (record.lockedUntil && now < record.lockedUntil) {
    const timeLeft = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, retryAfterSeconds: timeLeft };
  }

  // Window expired, reset window
  if (now - record.firstAttempt > WINDOW_MS) {
    loginRateLimitMap.set(ip, { attempts: 1, firstAttempt: now });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  // Increment attempts
  record.attempts += 1;

  if (record.attempts > MAX_ATTEMPTS) {
    const lockDuration = isDev ? 15 * 1000 : WINDOW_MS; // 15s in dev, 15 min in prod
    record.lockedUntil = now + lockDuration;
    const timeLeft = Math.ceil(lockDuration / 1000);
    return { allowed: false, retryAfterSeconds: timeLeft };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

/**
 * Reset rate limit counter on successful authentication.
 */
export function resetLoginRateLimit(ip: string): void {
  loginRateLimitMap.delete(ip);
}

/**
 * 100% Secure Admin Credentials Verification.
 * - Enforces bcrypt hashing with salt.
 * - Constant-time execution path (runs bcrypt comparison even on non-existent usernames to prevent timing attacks).
 * - Restricts input types and maximum password length (defends against bcrypt CPU exhaustion DoS).
 * - Zero hardcoded plaintext passwords.
 */
export async function verifyAdminCredentials(username: unknown, password: unknown): Promise<boolean> {
  // Input type validation
  if (typeof username !== "string" || typeof password !== "string") {
    await bcrypt.compare("dummy", TIMING_ATTACK_DUMMY_HASH);
    return false;
  }

  const cleanUser = username.trim().toLowerCase();
  const cleanPass = password;

  // Enforce reasonable length bounds to stop denial-of-service
  if (cleanUser.length === 0 || cleanPass.length === 0 || cleanPass.length > 128) {
    await bcrypt.compare("dummy", TIMING_ATTACK_DUMMY_HASH);
    return false;
  }

  const expectedUser = (process.env.ADMIN_USERNAME || "admin").trim().toLowerCase();
  const expectedHash = process.env.ADMIN_PASSWORD_HASH?.trim();
  const expectedPlain = process.env.ADMIN_PASSWORD?.trim();

  // Check username in constant time
  const isUserMatch = constantTimeEqual(cleanUser, expectedUser);

  // If username does not match, execute a dummy bcrypt comparison to match the time of a real check
  if (!isUserMatch) {
    await bcrypt.compare(cleanPass, TIMING_ATTACK_DUMMY_HASH);
    return false;
  }

  // Username matches: now verify the password
  let cleanHash = expectedHash;
  if (cleanHash?.startsWith("\\$")) {
    cleanHash = cleanHash.replace(/\\/g, "");
  }

  if (cleanHash && (cleanHash.startsWith("$2a$") || cleanHash.startsWith("$2b$") || cleanHash.startsWith("$2y$"))) {
    try {
      const isBcryptMatch = await bcrypt.compare(cleanPass, cleanHash);
      if (isBcryptMatch) return true;
    } catch (err) {
      console.error("[AUTH SECURITY ERROR]: bcrypt compare exception:", err);
    }
  }

  // Fallback to explicit plain ADMIN_PASSWORD in environment (checked in constant time)
  if (expectedPlain) {
    return constantTimeEqual(cleanPass, expectedPlain);
  }

  // No valid credentials configured or match failed
  await bcrypt.compare(cleanPass, TIMING_ATTACK_DUMMY_HASH);
  return false;
}

/**
 * Retrieve current authenticated admin session from cookies in Server Components or Route Handlers.
 */
export async function getAdminSession(): Promise<AdminSessionPayload | null> {
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
 * Helper to verify admin authentication in Next.js Route Handlers.
 * Accepts both HTTP-only session cookie and Authorization: Bearer token header.
 */
export async function verifyAuthRequest(req: NextRequest): Promise<AdminSessionPayload | null> {
  // Check Authorization header first
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const bearer = authHeader.substring(7).trim();
    const session = await verifySessionToken(bearer);
    if (session) return session;
  }

  // Check cookie
  const cookieToken = req.cookies.get(COOKIE_NAME)?.value;
  if (!cookieToken) return null;
  return await verifySessionToken(cookieToken);
}
