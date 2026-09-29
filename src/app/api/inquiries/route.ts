import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  projectType: z.string().min(1, "Project type is required"),
  budget: z.string().min(1, "Budget range is required"),
  timeline: z.string().min(1, "Timeline is required"),
  deliverables: z.string().optional(),
  referenceLinks: z.string().optional(),
  description: z.string().min(10, "Project description must be at least 10 characters"),
  commPreference: z.string().default("EMAIL"),
  _honeypot: z.string().max(0, "Bot detected").optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = inquirySchema.parse(body);

    if (validated._honeypot && validated._honeypot.length > 0) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    // Generate unique intake timecode stamp
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    const ff = String(Math.floor(Math.random() * 24)).padStart(2, "0");
    const timecode = `TC-${hh}:${mm}:${ss}:${ff}`;

    const inquiry = await db.contactInquiry.create({
      data: {
        timecode,
        name: validated.name,
        email: validated.email,
        company: validated.company || null,
        projectType: validated.projectType,
        budget: validated.budget,
        timeline: validated.timeline,
        deliverables: validated.deliverables || null,
        referenceLinks: validated.referenceLinks || null,
        description: validated.description,
        commPreference: validated.commPreference,
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      timecode: inquiry.timecode,
      message: "We received your project.",
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: err.flatten().fieldErrors },
        { status: 422 }
      );
    }
    console.error("Inquiry error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to submit project inquiry" },
      { status: 500 }
    );
  }
}
