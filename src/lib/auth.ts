import { cookies } from "next/headers";
import { env } from "./env";

const SESSION_COOKIE_NAME = "ruhora_admin_session";

export async function createAdminSession(email: string): Promise<boolean> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, `session_${Buffer.from(email).toString("base64")}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
  return true;
}

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  return Boolean(session && session.value.startsWith("session_"));
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
