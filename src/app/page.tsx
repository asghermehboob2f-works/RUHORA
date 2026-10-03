import { getSite } from "@/lib/site";
import { db } from "@/lib/db";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { NavShell } from "@/components/navigation/NavShell";
import { FooterShell } from "@/components/navigation/FooterShell";
import { RuhHero } from "@/components/hero/RuhHero";
import { CleanPortfolioGrid } from "@/components/home/CleanPortfolioGrid";
import { LaptopTimelineShowcase } from "@/components/home/LaptopTimelineShowcase";
import { AboutServicesSection } from "@/components/home/AboutServicesSection";
import { ContactCtaSection } from "@/components/home/ContactCtaSection";

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

  // Fallback demo projects if DB is empty or unmigrated
  if (projects.length === 0) {
    projects = [
      {
        id: "demo-1",
        title: "Synthetic Motion Narrative",
        slug: "synthetic-motion-narrative",
        year: "2026",
        category: "AI Film",
        aspectRatio: "16:9",
        summary: "Hybrid live-action and generative diffusion pipeline exploring temporal coherence and rapid cinematic cuts.",
      },
      {
        id: "demo-2",
        title: "Kinetics Commercial Cut",
        slug: "kinetics-commercial-cut",
        year: "2026",
        category: "Commercial",
        aspectRatio: "16:9",
        summary: "High-cadence commercial editing with precision sound design transients, custom typography, and dynamic pacing.",
      },
      {
        id: "demo-3",
        title: "Vertical Frame Architecture",
        slug: "vertical-frame-architecture",
        year: "2026",
        category: "Vertical",
        aspectRatio: "9:16",
        summary: "Modern 9:16 cinematic storytelling engineered for high retention and narrative impact across mobile displays.",
      },
      {
        id: "demo-4",
        title: "Archival Essay Documentary",
        slug: "archival-essay-documentary",
        year: "2025",
        category: "Documentary",
        aspectRatio: "16:9",
        summary: "Long-form narrative construction integrating historical restoration, DaVinci Resolve color conform, and bespoke scoring.",
      },
    ];
  }

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden w-full">
      <CustomCursor />
      <NavShell brandName={site.brandName} />

      <main className="space-y-0 w-full">
        {/* 1. Cinematic Fullscreen Hero with 3D WebGL Canvas */}
        <RuhHero brandName={site.brandName} tagline={site.tagline} />

        {/* 2. Full-Display Portfolio Showcase Grid */}
        <CleanPortfolioGrid projects={projects} />

        {/* 3. Interactive 3D Laptop Timeline Showcase */}
        <LaptopTimelineShowcase />

        {/* 4. About & Services Section */}
        <AboutServicesSection
          founderName={site.founderName}
          founderBio={site.founderBio}
        />

        {/* 5. Contact & Inquiries Banner */}
        <ContactCtaSection
          contactEmail={site.contactEmail}
          brandName={site.brandName}
        />
      </main>

      {/* 6. Minimalist Clean Footer */}
      <FooterShell
        brandName={site.brandName}
        closingHeadline={site.footerClosing}
        contactEmail={site.contactEmail}
      />
    </div>
  );
}
