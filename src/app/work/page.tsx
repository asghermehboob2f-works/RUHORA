import { db } from "@/lib/db";
import { getSite } from "@/lib/site";
import { NavShell } from "@/components/navigation/NavShell";
import { FooterShell } from "@/components/navigation/FooterShell";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { WorkArchiveClient } from "./WorkArchiveClient";

export const metadata = {
  title: "Work Archive",
  description: "Curated catalog of editorial post-production, commercial cuts, and synthetic AI visual workflows.",
};

export default async function WorkArchivePage() {
  const site = await getSite();

  let projects: any[] = [];
  try {
    projects = await db.project.findMany({
      where: { published: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch {
    projects = [];
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <CustomCursor />
      <NavShell brandName={site.brandName} />

      <main className="container-full mx-auto pt-36 pb-32 space-y-16">
        <header className="space-y-4 border-b border-[var(--line)] pb-12">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
            // SELECTED PROJECTS & TIMELINES
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[var(--text)]">
            The Work <span className="italic text-[var(--accent)]">Archive</span>
          </h1>
          <p className="font-sans text-sm text-[var(--text-muted)] max-w-xl leading-relaxed">
            Every project represents a customized approach to pacing, color conform, and visual
            narrative architecture. Filter by category or search across timeline specifications.
          </p>
        </header>

        <WorkArchiveClient initialProjects={projects} />
      </main>

      <FooterShell
        brandName={site.brandName}
        closingHeadline={site.footerClosing}
        contactEmail={site.contactEmail}
      />
    </div>
  );
}
