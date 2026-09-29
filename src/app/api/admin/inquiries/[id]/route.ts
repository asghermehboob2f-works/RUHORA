import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminSession } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { status } = await req.json();

    const inquiry = await db.contactInquiry.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, inquiry });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update inquiry" }, { status: 500 });
  }
}
