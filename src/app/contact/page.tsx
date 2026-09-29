import { getSite } from "@/lib/site";
import { NavShell } from "@/components/navigation/NavShell";
import { FooterShell } from "@/components/navigation/FooterShell";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SlateInquiryForm } from "./SlateInquiryForm";

export const metadata = {
  title: "Start a Project",
  description: "Direct production intake slate for RUHORA post-production and AI visual workflows.",
};

export default async function ContactPage() {
  const site = await getSite();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <CustomCursor />
      <NavShell brandName={site.brandName} />

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 pt-36 pb-32 space-y-16">
        <header className="space-y-4 border-b border-[var(--line)] pb-12 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--signal)] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
              // PRODUCTION INTAKE SLATE
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[var(--text)]">
            Start a <span className="italic text-[var(--accent)]">Project</span>
          </h1>
          <p className="font-sans text-base text-[var(--text-muted)] leading-relaxed">
            Specify your timeline parameters, delivery formats, and narrative scope. We review
            every inquiry directly and respond with technical feasibility and availability.
          </p>
        </header>

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
