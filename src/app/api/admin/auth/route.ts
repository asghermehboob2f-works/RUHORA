import { NextRequest, NextResponse } from "next/server";
import {
  createAdminSession,
  destroyAdminSession,
  constantTimeCompare,
  hashPassword,
  verifyPassword,
  checkRateLimit,
  recordFailedAttempt,
  resetFailedAttempts,
} from "@/lib/auth";
import { env } from "@/lib/env";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  // Extract client IP / identifier for rate-limiting
  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "client-session";

  // Check rate-limit
  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: `Too many failed attempts. Access locked for ${rateLimit.waitSeconds} seconds for security.`,
      },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { key, email, password } = body;

    // 1. Password-based authentication if email & password are provided
    if (email && password) {
      const user = await db.adminUser.findUnique({
        where: { email: email.toLowerCase().trim() },
      });

      if (user && verifyPassword(password, user.passwordHash)) {
        resetFailedAttempts(clientIp);
        await createAdminSession(user.email, user.role);
        return NextResponse.json({ success: true, method: "credentials" });
      }
    }

    // 2. Master Secret Key authentication
    if (key && typeof key === "string" && key.trim().length > 0) {
      if (constantTimeCompare(key.trim(), env.ADMIN_SECRET_KEY.trim())) {
        resetFailedAttempts(clientIp);
        const adminEmail = email?.trim() || "admin@ruhora.com";
        await createAdminSession(adminEmail, "SUPERADMIN");
        return NextResponse.json({ success: true, method: "master_key" });
      }
    }

    // Authentication failed -> record attempt
    const attempt = recordFailedAttempt(clientIp);
    if (attempt.locked) {
      return NextResponse.json(
        {
          error: `Maximum login attempts exceeded. Account locked for ${attempt.waitSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Invalid credentials. Please verify your login details." },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json({ error: "Authentication service error" }, { status: 500 });
  }
}

export async function DELETE() {
  await destroyAdminSession();
  return NextResponse.json({ success: true });
}
