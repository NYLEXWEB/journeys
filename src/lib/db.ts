import mongoose from "mongoose";
import dns from "dns";

// Ensure DNS resolution for mongodb+srv works across all Windows & local network configurations
try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch {
  // Silent fallback
}

/**
 * Global connection cache for Mongoose in serverless environments (e.g. Vercel).
 * Prevents multiple simultaneous connection pools during hot reloads or serverless function invocations.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

let lastFailureTime = 0;
const FAILURE_COOLDOWN_MS = 60000; // 60s cooldown: prevents blocking on every route navigation if Atlas is unreachable

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    // If MONGODB_URI is not set, return null gracefully to use local fallback content
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  // Fast-fail if recent connection attempt timed out/failed, avoiding thread freeze
  const now = Date.now();
  if (lastFailureTime && now - lastFailureTime < FAILURE_COOLDOWN_MS) {
    return null;
  }

  if (!cached.promise) {
    try {
      dns.setServers(["8.8.8.8", "8.8.4.4"]);
    } catch {
      // Silent fallback
    }

    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 3000,
    };

    cached.promise = mongoose
      .connect(uri, opts)
      .then((m) => {
        lastFailureTime = 0;
        return m;
      })
      .catch((err) => {
        cached.promise = null;
        lastFailureTime = Date.now();
        // Use console.warn so Next.js SSR doesn't trigger the red error overlay modal
        console.warn("[MongoDB Info] Offline or DNS unavailable, gracefully using local content fallback:", err.message);
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    lastFailureTime = Date.now();
    return null;
  }

  return cached.conn;
}

export const connectDB = connectToDatabase;
