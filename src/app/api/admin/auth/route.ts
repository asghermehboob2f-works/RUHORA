import { NextRequest, NextResponse } from "next/server";
import { createAdminSession, destroyAdminSession } from "@/lib/auth";
import { env } from "@/lib/env";

export async function POST(req: NextRequest) {
  try {
    const { key, email } = await req.json();

    if (!key || key !== env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ error: "Invalid master secret key" }, { status: 401 });
    }

    await createAdminSession(email || "admin@ruhora.com");
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}

export async function DELETE() {
  await destroyAdminSession();
  return NextResponse.json({ success: true });
}
