import { getSite } from "@/lib/site";
import { NavShell } from "@/components/navigation/NavShell";
import { FooterShell } from "@/components/navigation/FooterShell";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const metadata = {
  title: "The Studio",
  description: "Craft, methodology, and narrative philosophy behind RUHORA visual production.",
};

export default async function StudioPage() {
  const site = await getSite();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <CustomCursor />
      <NavShell brandName={site.brandName} />

      <main className="max-w-[1680px] mx-auto px-6 md:px-12 pt-36 pb-32 space-y-32">
        {/* Header */}
        <header className="space-y-4 border-b border-[var(--line)] pb-12 max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
            // STUDIO MANIFESTO & ORIGINS
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[var(--text)]">
            The Studio <span className="italic text-[var(--accent)]">Philosophy</span>
          </h1>
          <p className="font-sans text-base text-[var(--text-muted)] leading-relaxed pt-2">
            We are built on the conviction that great editing is not about assembling clips—it is
            about controlling emotional velocity, audio cadence, and visual tension.
          </p>
        </header>

        {/* Core Principles Matrix */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-[var(--line)] pb-24">
          <div className="bg-[var(--bg-raised)] border border-[var(--line)] p-8 space-y-4">
            <span className="font-mono text-xs text-[var(--accent)]">01 // RESTRAINT</span>
            <h3 className="text-2xl font-serif text-[var(--text)]">Discipline Over Noise</h3>
            <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
              We reject cheap visual gimmicks and template transitions. Every cut must have a
              narrative purpose and rhythm that respects the viewer&apos;s intelligence.
            </p>
          </div>

          <div className="bg-[var(--bg-raised)] border border-[var(--line)] p-8 space-y-4">
            <span className="font-mono text-xs text-[var(--accent)]">02 // HYBRID PIPELINE</span>
            <h3 className="text-2xl font-serif text-[var(--text)]">Synthetic Visual Post</h3>
            <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
              We combine DaVinci Resolve color grading and classical timeline pacing with custom
              generative visual diffusion models to create impossible aesthetics.
            </p>
          </div>

          <div className="bg-[var(--bg-raised)] border border-[var(--line)] p-8 space-y-4">
            <span className="font-mono text-xs text-[var(--accent)]">03 // DIRECT COLLABORATION</span>
            <h3 className="text-2xl font-serif text-[var(--text)]">Director-Level Care</h3>
            <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
              You collaborate directly with senior lead editors and visual artists. No account
              managers, no lost context, zero unnecessary layers.
            </p>
          </div>
        </section>

        {/* Founder Profile Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-[var(--line)] pb-24">
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
              LEADERSHIP & DIRECTION
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[var(--text)]">
              Founded by <span className="italic text-[var(--accent)]">{site.founderName}</span>
            </h2>
            <p className="font-mono text-xs text-[var(--text-faint)]">
              DIRECTOR & LEAD EDITOR // RUHORA STUDIO
            </p>
          </div>

          <div className="lg:col-span-8 bg-[var(--bg-raised)] border border-[var(--line)] p-8 md:p-12 space-y-8">
            <p className="text-xl sm:text-2xl font-serif text-[var(--text)] leading-relaxed">
              &ldquo;{site.founderBio}&rdquo;
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[var(--line)] font-mono text-xs text-[var(--text-muted)]">
              <div>
                <p className="text-[var(--text-faint)] pb-1">TOOLCHAIN</p>
                <p className="text-[var(--text)]">DaVinci Resolve Studio, Premiere Pro, ComfyUI, After Effects</p>
              </div>
              <div>
                <p className="text-[var(--text-faint)] pb-1">TIMEZONE & CLIENTS</p>
                <p className="text-[var(--text)]">Operating globally across US, Europe, and Asia (UTC +5:30)</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-8 bg-[var(--bg-raised)] border border-[var(--line)] p-8 md:p-16">
          <div className="space-y-2">
            <h3 className="text-3xl font-serif text-[var(--text)]">
              Have a narrative that demands precision?
            </h3>
            <p className="font-mono text-xs text-[var(--text-muted)]">
              LET&apos;S DISCUSS SCOPE, RETENTION CADENCE & TIMELINE DELIVERY.
            </p>
          </div>
          <Link href="/contact">
            <Button size="lg" variant="primary">
              START A PROJECT →
            </Button>
          </Link>
        </section>
      </main>

      <FooterShell
        brandName={site.brandName}
        closingHeadline={site.footerClosing}
        contactEmail={site.contactEmail}
      />
    </div>
  );
}
