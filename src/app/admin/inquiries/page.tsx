import { db } from "@/lib/db";
import { AdminInquiriesClient } from "./AdminInquiriesClient";

export default async function AdminInquiriesPage() {
  let inquiries: any[] = [];
  try {
    inquiries = await db.contactInquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.error("DB error fetching inquiries:", e);
  }

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="border-b border-[var(--line)] pb-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
          // INCOMING PRODUCTION SLATES
        </span>
        <h1 className="text-3xl font-serif text-[var(--text)]">Project Inquiries</h1>
      </div>

      <AdminInquiriesClient initialInquiries={inquiries} />
    </div>
  );
}
