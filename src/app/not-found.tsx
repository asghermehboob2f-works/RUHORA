import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-sunken)] text-[var(--text)] flex flex-col items-center justify-center p-6 text-center select-none space-y-8">
      {/* 404 Framing Box */}
      <div className="border border-[var(--line-strong)] bg-[var(--bg-raised)] p-12 md:p-20 max-w-xl space-y-6 relative">
        {/* Corner Crop Marks */}
        <div className="absolute inset-3 pointer-events-none">
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--accent)]" />
          <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--accent)]" />
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--accent)]" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--accent)]" />
        </div>

        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--signal)]">
            TC 00:00:00:00 // CUT MISSING
          </p>
          <h1 className="text-4xl sm:text-6xl font-serif text-[var(--text)] leading-tight">
            Frame Not <span className="italic text-[var(--accent)]">Found</span>
          </h1>
        </div>

        <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed max-w-md mx-auto">
          This cut did not make the timeline conform. The sequence you are attempting to scrub
          either moved or was permanently removed from the edit.
        </p>

        <div className="pt-4">
          <Link href="/work">
            <Button size="lg" variant="primary">
              RETURN TO WORK TIMELINE →
            </Button>
          </Link>
        </div>
      </div>

      <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
        RUHORA STUDIO // 24.00 FPS CONFORM ENGINE
      </div>
    </div>
  );
}
