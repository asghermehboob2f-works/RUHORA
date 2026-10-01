import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const capabilities = await db.capability.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ capabilities });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch capabilities" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const deliverables = Array.isArray(data.deliverables)
      ? JSON.stringify(data.deliverables)
      : typeof data.deliverables === "string"
      ? data.deliverables
      : JSON.stringify([]);

    const capability = await db.capability.create({
      data: {
        name: data.name,
        slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        category: data.category || "Post-Production",
        description: data.description || "",
        deliverables,
        isVisible: data.isVisible !== undefined ? Boolean(data.isVisible) : true,
        displayOrder: Number(data.displayOrder) || 0,
      },
    });

    return NextResponse.json({ success: true, capability });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create capability" }, { status: 500 });
  }
}
