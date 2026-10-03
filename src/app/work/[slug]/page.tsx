import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { getSite } from "@/lib/site";
import { NavShell } from "@/components/navigation/NavShell";
import { FooterShell } from "@/components/navigation/FooterShell";
import { MediaFrame, AspectRatio } from "@/components/media/MediaFrame";
import { BeforeAfterScrubber } from "@/components/work/BeforeAfterScrubber";
import { Button } from "@/components/ui/Button";
import { CustomCursor } from "@/components/ui/CustomCursor";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await db.project.findUnique({
    where: { slug },
  });

  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.summary || "Case study from RUHORA Studio.",
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await getSite();

  const project = await db.project.findUnique({
    where: { slug },
    include: {
      blocks: { orderBy: { displayOrder: "asc" } },
      client: true,
      capabilities: { include: { capability: true } },
    },
  });

  if (!project) {
    notFound();
  }

  // Find next project for seamless cut transition
  const allProjects = await db.project.findMany({
    where: { published: true },
    orderBy: { displayOrder: "asc" },
  });

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : allProjects[0];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <CustomCursor />
      <NavShell brandName={site.brandName} />

      <main className="space-y-24 pt-32 pb-32">
        {/* 1. Case Study Header */}
        <section className="container-full mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)] border-b border-[var(--line)] pb-4">
            <Link
              href="/work"
              className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-1"
            >
              ← RETURN TO ARCHIVE
            </Link>
            <div className="flex items-center gap-4">
              <span>{project.category}</span>
              <span>// {project.year}</span>
              <span className="text-[var(--accent)]">RATIO {project.aspectRatio}</span>
            </div>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[var(--text)] tracking-tight">
              {project.title}
            </h1>
            <p className="font-sans text-base md:text-lg text-[var(--text-muted)] leading-relaxed">
              {project.summary}
            </p>
          </div>
        </section>

        {/* 2. Full-Bleed Hero Media Canvas */}
        <section className="container-full mx-auto">
          <MediaFrame
            aspectRatio={(project.aspectRatio as AspectRatio) || "16:9"}
            mediaUrl={project.heroMediaUrl}
            posterUrl={project.heroPosterUrl}
            hoverVideoUrl={project.hoverVideoUrl}
            timecode="00:01:00:00"
            showCropMarks={true}
            priority={true}
          />
        </section>

        {/* 3. Project Narrative & Specifications Grid */}
        <section className="container-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
                01 // THE EDITORIAL BRIEF
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[var(--text)]">
                Pacing, Tension & Synthetic Balance
              </h3>
              <p className="font-sans text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                The objective was to craft a narrative flow that retains viewer engagement across
                every scene without resorting to sensory overload. We structured the edit around
                deliberate tempo shifts, subtle audio cues, and custom generative visual extensions.
              </p>
            </div>

            {/* Before / After Scrubber Component */}
            <div className="pt-6">
              <BeforeAfterScrubber
                aspectRatio={(project.aspectRatio as AspectRatio) || "16:9"}
                timecode="00:02:14:08"
                beforeLabel="RAW TIMELINE INGEST"
                afterLabel="COLOR & AI CONFORM"
              />
            </div>
          </div>

          {/* Project Details Sidebar */}
          <div className="lg:col-span-4 bg-[var(--bg-raised)] border border-[var(--line)] p-8 space-y-8 h-fit">
            <div className="space-y-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
                PRODUCTION SPECS
              </span>
              <div className="divide-y divide-[var(--line)] font-mono text-xs text-[var(--text-muted)]">
                <div className="py-2.5 flex justify-between">
                  <span className="text-[var(--text-faint)]">YEAR</span>
                  <span className="text-[var(--text)]">{project.year}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-[var(--text-faint)]">FORMAT</span>
                  <span className="text-[var(--text)]">{project.aspectRatio}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-[var(--text-faint)]">FRAME RATE</span>
                  <span className="text-[var(--text)]">24.00 FPS</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-[var(--text-faint)]">STATUS</span>
                  <span className="text-[var(--accent)]">MASTERED</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
                POST DISCIPLINE
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 bg-[var(--bg-sunken)] border border-[var(--line)] font-mono text-[10px] text-[var(--text)]">
                  PICTURE LOCK
                </span>
                <span className="px-2.5 py-1 bg-[var(--bg-sunken)] border border-[var(--line)] font-mono text-[10px] text-[var(--text)]">
                  DIFFUSION B-ROLL
                </span>
                <span className="px-2.5 py-1 bg-[var(--bg-sunken)] border border-[var(--line)] font-mono text-[10px] text-[var(--text)]">
                  SOUND DESIGN
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Seamless Next Project Cut */}
        {nextProject && (
          <section className="container-full mx-auto pt-24 border-t border-[var(--line)]">
            <Link
              href={`/work/${nextProject.slug}`}
              className="group block bg-[var(--bg-raised)] border border-[var(--line)] p-8 md:p-16 hover:border-[var(--accent)] transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
                    NEXT CUT →
                  </span>
                  <h3 className="text-3xl sm:text-5xl font-serif text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    {nextProject.title}
                  </h3>
                  <p className="font-mono text-xs text-[var(--text-faint)]">
                    {nextProject.category} // {nextProject.year}
                  </p>
                </div>
                <Button variant="primary" size="lg">
                  VIEW NEXT CASE STUDY →
                </Button>
              </div>
            </Link>
          </section>
        )}
      </main>

      <FooterShell
        brandName={site.brandName}
        closingHeadline={site.footerClosing}
        contactEmail={site.contactEmail}
      />
    </div>
  );
}
