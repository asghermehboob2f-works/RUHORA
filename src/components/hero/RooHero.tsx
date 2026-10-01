"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowDown, Sparkles, Video, Compass } from "lucide-react";

export interface RooHeroProps {
  brandName?: string;
  tagline?: string;
}

export const RooHero: React.FC<RooHeroProps> = ({
  brandName = "RUHORA",
  tagline = "Obsessed with the quality of the frame.",
}) => {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-between overflow-hidden bg-[var(--bg)] px-6 md:px-12 pt-36 pb-16">
      {/* Ambient background light - clean, soft, minimal */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(201,185,154,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Status & Role Pill */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 bg-[var(--bg-raised)] border border-[var(--line)] rounded-full shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[var(--signal)] animate-pulse" />
          <span className="text-[var(--text)] font-medium">{brandName} // ROO</span>
          <span className="text-[var(--text-faint)]">• EDITORIAL & AI POST</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[var(--text-faint)]">
          <span>GLOBAL REMOTE // 24 FPS</span>
        </div>
      </div>

      {/* Main Headline & Bio */}
      <div className="relative z-10 my-auto py-12 max-w-5xl space-y-8">
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)] flex items-center gap-2">
            <Sparkles size={14} />
            <span>PORTFOLIO & CREATIVE STUDIO</span>
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-serif font-normal text-[var(--text)] leading-[1.02] tracking-tight">
            Creative Video Editing &{" "}
            <span className="italic text-[var(--accent)]">Visual Post</span> Direction.
          </h1>
        </div>

        <p className="text-base sm:text-xl font-sans text-[var(--text-muted)] max-w-2xl leading-relaxed">
          Crafting high-cadence narratives, commercial edits, and synthetic AI visual workflows.
          Obsessed with the rhythm, weight, and emotional velocity of every single frame.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link href="#work">
            <Button size="lg" variant="primary">
              EXPLORE WORK ↓
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="secondary">
              GET IN TOUCH →
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom Minimalist Bar */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-faint)] border-t border-[var(--line)] pt-6">
        <div className="flex items-center gap-6">
          <span>DAVINCI RESOLVE</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">PREMIERE PRO</span>
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
