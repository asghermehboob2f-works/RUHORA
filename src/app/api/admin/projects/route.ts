import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const project = await db.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        year: data.year || "2026",
        category: data.category || "Commercial",
        aspectRatio: data.aspectRatio || "16:9",
        layoutVariant: data.layoutVariant || "FULLBLEED",
        summary: data.summary || "",
        heroMediaUrl: data.heroMediaUrl || null,
        heroPosterUrl: data.heroPosterUrl || null,
        hoverVideoUrl: data.hoverVideoUrl || null,
        thumbnailUrl: data.thumbnailUrl || null,
        featured: Boolean(data.featured),
        published: data.published !== undefined ? Boolean(data.published) : true,
        isDemo: false,
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create project" }, { status: 500 });
  }
}
