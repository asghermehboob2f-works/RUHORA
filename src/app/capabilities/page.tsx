import { getSite } from "@/lib/site";
import { db } from "@/lib/db";
import { NavShell } from "@/components/navigation/NavShell";
import { FooterShell } from "@/components/navigation/FooterShell";
import { CapabilitiesSystem } from "@/components/home/CapabilitiesSystem";
import { CustomCursor } from "@/components/ui/CustomCursor";

export const metadata = {
  title: "Capabilities System",
  description: "Curated post-production capabilities, AI visual production, and delivery specifications.",
};

export default async function CapabilitiesPage() {
  const site = await getSite();

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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <CustomCursor />
      <NavShell brandName={site.brandName} />

      <main className="max-w-[1680px] mx-auto px-6 md:px-12 pt-36 pb-32 space-y-24">
        <header className="space-y-4 border-b border-[var(--line)] pb-12 max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
            // COMPREHENSIVE PRODUCTION CAPABILITIES
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[var(--text)]">
            Capabilities <span className="italic text-[var(--accent)]">System</span>
          </h1>
          <p className="font-sans text-base text-[var(--text-muted)] leading-relaxed">
            From precision picture locks to high-end generative visual workflows, explore our
            modular post-production services.
          </p>
        </header>

        <CapabilitiesSystem capabilities={capabilities} />
      </main>

      <FooterShell
        brandName={site.brandName}
        closingHeadline={site.footerClosing}
        contactEmail={site.contactEmail}
      />
    </div>
  );
}
