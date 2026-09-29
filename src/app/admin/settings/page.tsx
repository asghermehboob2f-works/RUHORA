import { getSite } from "@/lib/site";
import { AdminSettingsClient } from "./AdminSettingsClient";

export default async function AdminSettingsPage() {
  const site = await getSite();

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-[var(--line)] pb-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
          // GLOBAL SYSTEM PARAMETERS
        </span>
        <h1 className="text-3xl font-serif text-[var(--text)]">Site Settings</h1>
      </div>

      <AdminSettingsClient initialSite={site} />
    </div>
  );
}
