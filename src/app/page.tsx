import { getSite } from "@/lib/site";
import { db } from "@/lib/db";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PlayheadTracker } from "@/components/ui/PlayheadTracker";
import { NavShell } from "@/components/navigation/NavShell";
import { FooterShell } from "@/components/navigation/FooterShell";
import { HeroOpening } from "@/components/hero/HeroOpening";
import { StatementSection } from "@/components/home/StatementSection";
import { TheReel } from "@/components/home/TheReel";
import { ProjectIndexSection } from "@/components/home/ProjectIndexSection";
import { CapabilitiesSystem } from "@/components/home/CapabilitiesSystem";
import { CreativeProcess } from "@/components/home/CreativeProcess";
import { StudioTeaser } from "@/components/home/StudioTeaser";

export default async function HomePage() {
  const site = await getSite();

  // Load Projects from DB
  let projects: any[] = [];
  try {
    projects = await db.project.findMany({
      where: { published: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch {
    projects = [];
  }

  // Filter featured projects for The Reel
  const featuredProjects = projects.filter((p) => p.featured);
  const reelProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);

  // Load Capabilities from DB
  let capabilities: any[] = [];
  try {
    const rawCaps = await db.capability.findMany({
      where: { isVisible: true },
      orderBy: { displayOrder: "asc" },
    });

    capabilities = rawCaps.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      category: c.category,
      description: c.description,
      deliverables: typeof c.deliverables === "string" ? JSON.parse(c.deliverables) : c.deliverables,
    }));
  } catch {
    capabilities = [];
  }

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <CustomCursor />
      
      <PlayheadTracker
        sections={[
          { id: "hero", label: "01 HERO" },
          { id: "statement", label: "02 PRINCIPLE" },
          { id: "reel", label: "03 THE REEL" },
          { id: "index", label: "04 INDEX" },
          { id: "capabilities", label: "05 SYSTEM" },
          { id: "process", label: "06 PROCESS" },
          { id: "studio", label: "07 STUDIO" },
        ]}
      />

      <NavShell brandName={site.brandName} />

      <main className="space-y-0">
        <HeroOpening
          headline={site.heroHeadline}
          tagline={site.tagline}
          brandName={site.brandName}
        />

        <StatementSection
          statement={site.statementText}
          brandName={site.brandName}
        />

        {reelProjects.length > 0 && <TheReel projects={reelProjects} />}

        {projects.length > 0 && <ProjectIndexSection projects={projects} />}

        {capabilities.length > 0 && <CapabilitiesSystem capabilities={capabilities} />}

        <CreativeProcess />

        <StudioTeaser
          founderName={site.founderName}
          founderBio={site.founderBio}
        />
      </main>

      <FooterShell
        brandName={site.brandName}
        closingHeadline={site.footerClosing}
        contactEmail={site.contactEmail}
      />
    </div>
  );
}
