"use client";

import React from "react";
import Link from "next/link";
import { LinkUnderline } from "@/components/ui/LinkUnderline";

export interface StatementSectionProps {
  statement?: string;
  brandName?: string;
}

export const StatementSection: React.FC<StatementSectionProps> = ({
  statement = "We are a specialized post-production and AI visual studio. We do not mass-produce content. We partner with creators, brands, and directors who require every frame to hold weight.",
  brandName = "RUHORA",
}) => {
  return (
    <section
      id="statement"
      className="w-full container-full mx-auto py-24 md:py-36 border-b border-[var(--line)] space-y-16"
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)] border-b border-[var(--line)] pb-4">
        <span>02 // THE PRINCIPLE</span>
        <span>DISCIPLINE OVER EXCESS</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-baseline">
        <div className="lg:col-span-4 space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)]">
            OBSESSED WITH THE FRAME
          </p>
          <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
            Great editing is invisible until it takes your breath away. We craft pacing, texture, and
            visual identity for those who refuse generic output.
          </p>
          <div className="pt-4">
            <LinkUnderline href="/studio">LEARN ABOUT OUR PHILOSOPHY →</LinkUnderline>
          </div>
        </div>

        <div className="lg:col-span-8">
          <p className="text-3xl sm:text-5xl md:text-6xl font-serif text-[var(--text)] leading-[1.1] tracking-tight">
            &ldquo;{statement}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
};
