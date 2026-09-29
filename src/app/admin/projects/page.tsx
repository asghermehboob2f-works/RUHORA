import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AdminProjectsClient } from "./AdminProjectsClient";

export default async function AdminProjectsPage() {
  let projects: any[] = [];
  try {
    projects = await db.project.findMany({
      orderBy: { displayOrder: "asc" },
    });
  } catch (e) {
    console.error("DB error fetching projects:", e);
  }

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[var(--line)] pb-6">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
            // CASE STUDY MANAGEMENT
          </span>
          <h1 className="text-3xl font-serif text-[var(--text)]">Projects & Timelines</h1>
        </div>
      </div>

      <AdminProjectsClient initialProjects={projects} />
    </div>
  );
}
