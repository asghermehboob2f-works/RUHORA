import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function AdminOverviewPage() {
  let projectCount = 0;
  let publishedCount = 0;
  let draftCount = 0;
  let inquiryCount = 0;
  let recentInquiries: any[] = [];
  let recentProjects: any[] = [];

  try {
    projectCount = await db.project.count();
    publishedCount = await db.project.count({ where: { published: true } });
    draftCount = await db.project.count({ where: { published: false } });
    inquiryCount = await db.contactInquiry.count();

    recentInquiries = await db.contactInquiry.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    recentProjects = await db.project.findMany({
      take: 5,
      orderBy: { updatedAt: "desc" },
    });
  } catch (e) {
    console.error("DB error in admin overview:", e);
  }

  return (
    <div className="space-y-12 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[var(--line)] pb-6">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
            // OPERATIONS OVERVIEW
          </span>
          <h1 className="text-3xl font-serif text-[var(--text)]">Dashboard</h1>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/projects">
            <Button size="sm" variant="primary">
              + NEW PROJECT
            </Button>
          </Link>
        </div>
      </div>

      {/* Real Metric Widgets (Section 32) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[var(--bg-raised)] border border-[var(--line)] p-6 space-y-2">
          <span className="font-mono text-[10px] uppercase text-[var(--text-faint)]">
            TOTAL INTAKE INQUIRIES
          </span>
          <p className="text-4xl font-serif text-[var(--accent)]">{inquiryCount}</p>
          <p className="font-mono text-[9px] text-[var(--text-faint)]">LIVE SUBMISSIONS</p>
        </div>

        <div className="bg-[var(--bg-raised)] border border-[var(--line)] p-6 space-y-2">
          <span className="font-mono text-[10px] uppercase text-[var(--text-faint)]">
            PUBLISHED PROJECTS
          </span>
          <p className="text-4xl font-serif text-[var(--text)]">{publishedCount}</p>
          <p className="font-mono text-[9px] text-[var(--text-faint)]">ON DIGITAL FLAGSHIP</p>
        </div>

        <div className="bg-[var(--bg-raised)] border border-[var(--line)] p-6 space-y-2">
          <span className="font-mono text-[10px] uppercase text-[var(--text-faint)]">
            DRAFT TIMELINES
          </span>
          <p className="text-4xl font-serif text-[var(--text-muted)]">{draftCount}</p>
          <p className="font-mono text-[9px] text-[var(--text-faint)]">UNPUBLISHED</p>
        </div>

        <div className="bg-[var(--bg-raised)] border border-[var(--line)] p-6 space-y-2">
          <span className="font-mono text-[10px] uppercase text-[var(--text-faint)]">
            ANALYTICS ENGINE
          </span>
          <p className="font-mono text-sm text-[var(--text-muted)] pt-3">
            Analytics not connected.
          </p>
          <p className="font-mono text-[9px] text-[var(--text-faint)]">NO FABRICATED METRICS</p>
        </div>
      </div>

      {/* Recent Inquiries & Projects Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inquiries */}
        <div className="bg-[var(--bg-raised)] border border-[var(--line)] p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-[var(--line)] pb-3 font-mono text-xs">
            <span className="text-[var(--text)] font-semibold uppercase">RECENT SLATE INTAKES</span>
            <Link href="/admin/inquiries" className="text-[var(--accent)] hover:underline">
              VIEW ALL →
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <p className="font-mono text-xs text-[var(--text-faint)] py-8 text-center">
              NO INQUIRIES LOGGED YET.
            </p>
          ) : (
            <div className="divide-y divide-[var(--line)]">
              {recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="py-3 flex justify-between items-start font-mono text-xs">
                  <div>
                    <p className="text-[var(--text)] font-semibold">{inquiry.name}</p>
                    <p className="text-[var(--text-faint)] text-[10px]">
                      {inquiry.timecode} // {inquiry.projectType}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 bg-[var(--bg-sunken)] border border-[var(--line)] text-[var(--accent)] text-[10px]">
                    {inquiry.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Projects */}
        <div className="bg-[var(--bg-raised)] border border-[var(--line)] p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-[var(--line)] pb-3 font-mono text-xs">
            <span className="text-[var(--text)] font-semibold uppercase">RECENT PROJECT UPDATES</span>
            <Link href="/admin/projects" className="text-[var(--accent)] hover:underline">
              MANAGE ALL →
            </Link>
          </div>

          {recentProjects.length === 0 ? (
            <p className="font-mono text-xs text-[var(--text-faint)] py-8 text-center">
              NO PROJECTS RECORDED YET.
            </p>
          ) : (
            <div className="divide-y divide-[var(--line)]">
              {recentProjects.map((project) => (
                <div key={project.id} className="py-3 flex justify-between items-start font-mono text-xs">
                  <div>
                    <p className="text-[var(--text)] font-semibold">{project.title}</p>
                    <p className="text-[var(--text-faint)] text-[10px]">
                      {project.category} // {project.year}
                    </p>
                  </div>
                  <span className="text-[var(--text-muted)] text-[10px]">
                    {project.published ? "PUBLISHED" : "DRAFT"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
