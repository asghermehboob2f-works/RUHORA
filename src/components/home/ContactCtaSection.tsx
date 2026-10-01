"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Copy, Check, Mail, ArrowUpRight } from "lucide-react";

interface ContactCtaSectionProps {
  contactEmail?: string;
  brandName?: string;
}

export const ContactCtaSection: React.FC<ContactCtaSectionProps> = ({
  contactEmail = "inquiry@ruhora.com",
  brandName = "RUHORA",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full bg-[var(--bg-raised)] py-24 md:py-32 border-b border-[var(--line)]">
      <div className="max-w-[1680px] mx-auto px-6 md:px-12">
        <div className="bg-[var(--bg-sunken)] border border-[var(--line)] rounded-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)] opacity-5 blur-3xl pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-raised)] border border-[var(--line)] rounded-full font-mono text-[11px] text-[var(--accent)]">
              <span className="w-2 h-2 rounded-full bg-[var(--signal)] animate-pulse" />
              <span>NOW BOOKING FOR 2025 – 2026</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[var(--text)] tracking-tight leading-[1.08]">
              Have a project that demands{" "}
              <span className="italic text-[var(--accent)]">uncompromising</span> visual quality?
            </h2>

            <p className="font-sans text-base sm:text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed">
              Whether you need precision commercial editing, synthetic AI visual generation, or a
              complete post-production workflow conform, let&apos;s build something exceptional.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href="/contact">
                <Button size="lg" variant="primary">
                  START A CONVERSATION →
                </Button>
              </Link>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[var(--bg-raised)] border border-[var(--line)] rounded-full font-mono text-xs uppercase tracking-wider text-[var(--text)] hover:border-[var(--line-strong)] hover:text-[var(--accent)] transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-[var(--signal)]" />
                    <span>EMAIL COPIED!</span>
                  </>
                ) : (
                  <>
                    <Mail size={14} />
                    <span>{contactEmail}</span>
                    <Copy size={12} className="text-[var(--text-faint)]" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
