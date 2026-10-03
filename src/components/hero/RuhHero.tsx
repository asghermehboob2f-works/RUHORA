"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowDown, Sparkles } from "lucide-react";

export interface RuhHeroProps {
  brandName?: string;
  tagline?: string;
}

export const RuhHero: React.FC<RuhHeroProps> = ({
  brandName = "RUHORA",
  tagline = "Obsessed with the quality of the frame.",
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full min-h-[94vh] flex flex-col justify-between overflow-hidden bg-[var(--bg)] container-full pt-36 pb-16 border-b border-[var(--line)]">
      {/* 1. Soft Ambient Radial Light - Clean, subtle, glowing */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(201,185,154,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* 2. Top Clean Status Pill */}
      <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
        <div className="flex items-center gap-2.5 px-4 py-1.5 bg-[var(--bg-raised)] border border-[var(--line)] rounded-full shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[var(--signal)] animate-pulse" />
          <span className="text-[var(--text)] font-semibold">{brandName} // RUH</span>
          <span className="text-[var(--text-faint)]">• EDITORIAL & AI POST</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[var(--text-faint)]">
          <span>GLOBAL REMOTE // 24.00 FPS</span>
        </div>
      </div>

      {/* 3. Main Headline & Bio (Clean, Grand & Well-Spaced) */}
      <div className="relative z-10 my-auto py-12 lg:py-16 space-y-8 max-w-5xl">
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)] flex items-center gap-2">
            <Sparkles size={14} />
            <span>PORTFOLIO & CREATIVE STUDIO</span>
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.75rem] font-serif font-normal text-[var(--text)] leading-[1.02] tracking-tight">
            Creative Video Editing &{" "}
            <span className="italic text-[var(--accent)]">Visual Post</span> Direction.
          </h1>
        </div>

        <p className="text-base sm:text-xl font-sans text-[var(--text-muted)] max-w-2xl leading-relaxed font-light">
          Crafting high-cadence narratives, commercial edits, and synthetic AI visual workflows.
          Obsessed with the rhythm, weight, and emotional velocity of every single frame.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link href="#work">
            <Button size="lg" variant="primary" className="text-xs tracking-[0.14em]">
              EXPLORE WORK ↓
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="text-xs tracking-[0.14em]">
              GET IN TOUCH →
            </Button>
          </Link>
        </div>
      </div>

      {/* 4. Bottom Clean Status Bar */}
      <div className="relative z-10 w-full flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-faint)] border-t border-[var(--line)] pt-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <span>DAVINCI RESOLVE</span>
          <span>•</span>
          <span>PREMIERE PRO</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">AI DIFFUSION</span>
        </div>

        <Link
          href="#work"
          className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
        >
          <span>SCROLL TO VIEW</span>
          <ArrowDown size={13} className="animate-bounce" />
        </Link>
      </div>
    </section>
  );
};

// Backwards compatibility export
export const RooHero = RuhHero;
