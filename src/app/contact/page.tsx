import { getSite } from "@/lib/site";
import { NavShell } from "@/components/navigation/NavShell";
import { FooterShell } from "@/components/navigation/FooterShell";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SlateInquiryForm } from "./SlateInquiryForm";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export const metadata = {
  title: "Start a Project // Production Slate",
  description: "Direct production intake slate for RUHORA post-production, commercial editing, and AI visual workflows.",
};

export default async function ContactPage() {
  const site = await getSite();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <CustomCursor />
      <NavShell brandName={site.brandName} />

      <main className="container-full mx-auto pt-36 pb-32 space-y-16">
        {/* Header with Fluid Full-Width Layout */}
        <header className="space-y-6 border-b border-[var(--line)] pb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
            <Link
              href="/"
              className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft size={13} />
              <span>RETURN TO MAIN TIMELINE</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--signal)] animate-pulse" />
              <span className="text-[var(--accent)] font-semibold">DIRECT PRODUCTION INTAKE // 2025–2026</span>
            </div>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[var(--text)] tracking-tight leading-[0.96]">
              Start a <span className="italic text-[var(--accent)]">Project</span>.
            </h1>
            <p className="font-sans text-base sm:text-xl text-[var(--text-muted)] leading-relaxed font-light max-w-3xl">
              Specify your narrative scope, timeline parameters, and delivery formats. We evaluate every inquiry directly with technical feasibility, pricing, and scheduling within 24 hours.
            </p>
          </div>
        </header>

        {/* Enhanced Slate Inquiry Form Component */}
        <SlateInquiryForm contactEmail={site.contactEmail} />
      </main>

      <FooterShell
        brandName={site.brandName}
        closingHeadline={site.footerClosing}
        contactEmail={site.contactEmail}
      />
    </div>
  );
}
