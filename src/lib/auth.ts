import { cookies } from "next/headers";
import crypto from "crypto";
import { env } from "./env";
import { db } from "./db";

const SESSION_COOKIE_NAME = "ruhora_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 days
const PBKDF2_ITERATIONS = 100000;
const PBKDF2_KEY_LEN = 64;
const PBKDF2_DIGEST = "sha512";

// In-Memory Rate Limiting Tracker
interface AttemptRecord {
  count: number;
  firstAttempt: number;
  lockedUntil: number | null;
}
const loginAttempts = new Map<string, AttemptRecord>();
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_PERIOD_MS = 15 * 60 * 1000; // 15 minutes
const ATTEMPT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Checks if an IP or identifier is currently rate-limited
 */
export function checkRateLimit(identifier: string): { allowed: boolean; waitSeconds?: number } {
  const now = Date.now();
  const record = loginAttempts.get(identifier);

  if (!record) {
    return { allowed: true };
  }

  // Check if currently locked out
  if (record.lockedUntil && record.lockedUntil > now) {
    const waitSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, waitSeconds };
  }

  // Reset window if elapsed
  if (now - record.firstAttempt > ATTEMPT_WINDOW_MS) {
    loginAttempts.delete(identifier);
    return { allowed: true };
  }

  return { allowed: true };
}

/**
 * Records a failed login attempt
 */
export function recordFailedAttempt(identifier: string): { locked: boolean; waitSeconds?: number } {
  const now = Date.now();
  const record = loginAttempts.get(identifier) || { count: 0, firstAttempt: now, lockedUntil: null };

  record.count += 1;

  if (record.count >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_PERIOD_MS;
    loginAttempts.set(identifier, record);
    return { locked: true, waitSeconds: Math.ceil(LOCKOUT_PERIOD_MS / 1000) };
  }

  loginAttempts.set(identifier, record);
  return { locked: false };
}

/**
 * Resets failed attempts upon successful authentication
 */
export function resetFailedAttempts(identifier: string): void {
  loginAttempts.delete(identifier);
}

/**
 * Constant-time comparison between two strings to prevent timing attacks
 */
export function constantTimeCompare(a: string, b: string): boolean {
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

/**
 * Hashes a password using PBKDF2 with a cryptographically secure random salt
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, PBKDF2_KEY_LEN, PBKDF2_DIGEST)
    .toString("hex");
  return `pbkdf2$${PBKDF2_ITERATIONS}$${salt}$${hash}`;
}

/**
 * Verifies a password against a stored PBKDF2 hash using constant-time comparison
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const parts = storedHash.split("$");
    if (parts.length !== 4 || parts[0] !== "pbkdf2") {
      return false;
    }

    const iterations = parseInt(parts[1], 10);
    const salt = parts[2];
    const originalHash = parts[3];

    const computedHash = crypto
      .pbkdf2Sync(password, salt, iterations, PBKDF2_KEY_LEN, PBKDF2_DIGEST)
      .toString("hex");

    return constantTimeCompare(computedHash, originalHash);
  } catch {
    return false;
  }
}

/**
 * Creates an HMAC-SHA256 signed session token
 */
export interface SessionPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export function signSessionToken(payload: Omit<SessionPayload, "iat" | "exp">): string {
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: SessionPayload = {
    ...payload,
    iat: now,
    exp: now + SESSION_DURATION_SECONDS,
  };

  const encodedPayload = Buffer.from(JSON.stringify(fullPayload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", env.ADMIN_SECRET_KEY)
    .update(encodedPayload)
    .digest("base64url");

  return `${encodedPayload}.${signature}`;
}

/**
 * Verifies and decodes an HMAC-SHA256 session token
 */
export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const [encodedPayload, signature] = token.split(".");
    if (!encodedPayload || !signature) {
      return null;
    }

    const expectedSignature = crypto
      .createHmac("sha256", env.ADMIN_SECRET_KEY)
      .update(encodedPayload)
      .digest("base64url");

    if (!constantTimeCompare(signature, expectedSignature)) {
      return null;
    }

    const payload: SessionPayload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf-8")
    );

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return null; // Expired session
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Creates an authenticated admin session cookie
 */
export async function createAdminSession(email: string, role = "SUPERADMIN"): Promise<boolean> {
  const cookieStore = await cookies();
  const token = signSessionToken({
    sub: email,
    email,
    role,
  });

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION_SECONDS,
    path: "/",
  });

  return true;
}

/**
 * Verifies that the current request has a valid, non-expired, cryptographically signed session
 */
export async function verifyAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie || !sessionCookie.value) {
      return false;
    }

    const payload = verifySessionToken(sessionCookie.value);
    return Boolean(payload);
  } catch {
    return false;
  }
}

/**
 * Retrieves the current admin session payload if valid
 */
export async function getAdminSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie || !sessionCookie.value) {
      return null;
    }

    return verifySessionToken(sessionCookie.value);
  } catch {
    return null;
  }
}

/**
 * Destroys the admin session cookie
 */
export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}
