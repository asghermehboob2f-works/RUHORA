"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Copy, Check, Mail, ArrowUpRight, Sparkles, Send } from "lucide-react";

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
    <section className="w-full bg-[var(--bg-raised)] py-20 md:py-32 border-b border-[var(--line)]">
      <div className="container-full mx-auto">
        <div className="bg-[var(--bg-sunken)] border border-[var(--line-strong)] rounded-3xl p-8 sm:p-14 lg:p-20 relative overflow-hidden shadow-2xl">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(201,185,154,0.08)_0%,transparent_70%)] pointer-events-none rounded-full" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-8">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[var(--bg-raised)] border border-[var(--line)] rounded-full font-mono text-[11px] text-[var(--accent)]">
                <span className="w-2 h-2 rounded-full bg-[var(--signal)] animate-pulse" />
                <span>NOW ACCEPTING EDITORIAL & POST COMMISSIONS</span>
              </div>

              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[var(--text)] tracking-tight leading-[1.02]">
                Have a project that demands{" "}
                <span className="italic text-[var(--accent)]">uncompromising</span> visual quality?
              </h2>

              <p className="font-sans text-base sm:text-xl text-[var(--text-muted)] max-w-3xl leading-relaxed font-light">
                Whether you need precision commercial editing, synthetic AI visual generation, or a
                complete DaVinci Resolve color conform, let&apos;s engineer something extraordinary together.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link href="/contact">
                  <Button size="lg" variant="primary" className="text-xs tracking-[0.14em]">
                    START A CONVERSATION →
                  </Button>
                </Link>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-3 px-6 py-4 bg-[var(--bg-raised)] border border-[var(--line)] rounded-full font-mono text-xs uppercase tracking-wider text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all cursor-pointer shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check size={15} className="text-[var(--signal)]" />
                      <span>EMAIL COPIED TO CLIPBOARD!</span>
                    </>
                  ) : (
                    <>
                      <Mail size={15} />
                      <span>{contactEmail}</span>
                      <Copy size={13} className="text-[var(--text-faint)]" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Response Slate Info Box */}
            <div className="lg:col-span-4 bg-[var(--bg)] border border-[var(--line)] rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">
                  // RESPONSE TIME SLA
                </span>
                <p className="font-serif text-xl text-[var(--text)]">Under 24 Hours</p>
              </div>

              <div className="space-y-3 font-mono text-xs text-[var(--text-faint)] border-t border-[var(--line)] pt-4">
                <div className="flex justify-between">
                  <span>LOCATION</span>
                  <span className="text-[var(--text)]">GLOBAL REMOTE</span>
                </div>
                <div className="flex justify-between">
                  <span>COLOR PIPELINE</span>
                  <span className="text-[var(--accent)]">ACES 1.3 MANAGED</span>
                </div>
                <div className="flex justify-between">
                  <span>RESOLUTION</span>
                  <span className="text-[var(--text)]">UP TO 8K UHD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
