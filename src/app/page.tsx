import { getSite } from "@/lib/site";
import { db } from "@/lib/db";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PlayheadTracker } from "@/components/ui/PlayheadTracker";
import { FloatingContactPill } from "@/components/ui/FloatingContactPill";
import { NavShell } from "@/components/navigation/NavShell";
import { FooterShell } from "@/components/navigation/FooterShell";
import { RooHero } from "@/components/hero/RooHero";
import { ManifestoSection } from "@/components/home/ManifestoSection";
import { AlternatingExhibition } from "@/components/home/AlternatingExhibition";
import { PinnedStorytellingTimeline } from "@/components/home/PinnedStorytellingTimeline";
import { BrandPillarsBento } from "@/components/home/BrandPillarsBento";
import { LaptopTimelineShowcase } from "@/components/home/LaptopTimelineShowcase";
import { CapabilitiesSystem } from "@/components/home/CapabilitiesSystem";
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
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">
      <CustomCursor />
      <FloatingContactPill />

      <PlayheadTracker
        sections={[
          { id: "hero", label: "01 HERO" },
          { id: "manifesto", label: "02 MANIFESTO" },
          { id: "work", label: "03 EXHIBITION" },
          { id: "laptop-showcase", label: "04 WORKSPACE" },
          { id: "pipeline", label: "05 PIPELINE" },
          { id: "pillars", label: "06 PILLARS" },
          { id: "capabilities", label: "07 SYSTEM" },
          { id: "studio", label: "08 STUDIO" },
        ]}
      />

      <NavShell brandName="ROO EDITS" />

      <main className="space-y-0">
        {/* 1. Complete Redesigned Hero with 3D Canvas */}
        <RooHero brandName="ROO EDITS" tagline={site.tagline} />

        {/* 2. Visual Manifesto & Live Metrics Bar */}
        <ManifestoSection />

        {/* 3. Alternating Featured Exhibition */}
        {projects.length > 0 && <AlternatingExhibition projects={projects} />}

        {/* 4. Interactive 3D MacBook Pro NLE Timeline Showcase (kashbit.in reference) */}
        <LaptopTimelineShowcase />

        {/* 5. Scroll-Driven Storytelling Timeline Sequence */}
        <PinnedStorytellingTimeline />

        {/* 5. Core Architectural Pillars Bento */}
        <BrandPillarsBento />

        {/* 6. Capabilities System Matrix */}
        {capabilities.length > 0 && <CapabilitiesSystem capabilities={capabilities} />}

        {/* 7. Studio & Leadership Teaser */}
        <StudioTeaser founderName={site.founderName} founderBio={site.founderBio} />
      </main>

      {/* 8. Closing Frame Footer */}
      <FooterShell
        brandName="ROO EDITS"
        closingHeadline={site.footerClosing}
        contactEmail={site.contactEmail}
      />
    </div>
  );
}
