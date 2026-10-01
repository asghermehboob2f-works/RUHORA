import { db } from "@/lib/db";
import { AdminCapabilitiesClient } from "./AdminCapabilitiesClient";

export default async function AdminCapabilitiesPage() {
  let capabilities: any[] = [];
  try {
    capabilities = await db.capability.findMany({
      orderBy: { displayOrder: "asc" },
    });
  } catch (e) {
    console.error("DB error fetching capabilities:", e);
  }

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="border-b border-[var(--line)] pb-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
          // SERVICES & CAPABILITIES MANAGEMENT
        </span>
        <h1 className="text-3xl font-serif text-[var(--text)]">Capabilities & Services CMS</h1>
        <p className="font-sans text-xs text-[var(--text-muted)] pt-1">
          Add, edit, and reorganize studio services displayed across the portfolio.
        </p>
      </div>

      <AdminCapabilitiesClient initialCapabilities={capabilities} />
    </div>
  );
}
