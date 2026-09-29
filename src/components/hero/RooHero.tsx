"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { KashbitHeroCanvas } from "@/components/canvas/KashbitHeroCanvas";
import { ArrowDown, Sparkles } from "lucide-react";

export interface RooHeroProps {
  brandName?: string;
  tagline?: string;
}

export const RooHero: React.FC<RooHeroProps> = ({
  brandName = "RUHORA",
  tagline = "Obsessed with the quality of the frame.",
}) => {
  const [timecode, setTimecode] = useState("00:00:00:00");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    let frame = 0;
    const interval = setInterval(() => {
      frame = (frame + 1) % 1440;
      const hh = String(Math.floor(frame / (24 * 60))).padStart(2, "0");
      const mm = String(Math.floor((frame / 24) % 60)).padStart(2, "0");
      const ss = String(Math.floor(frame % 24)).padStart(2, "0");
      const ff = String(frame % 24).padStart(2, "0");
      setTimecode(`TC ${hh}:${mm}:${ss}:${ff}`);
    }, 41.67);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-between overflow-hidden bg-[var(--bg)] px-6 md:px-12 pt-32 pb-16 select-none">
      {/* 3D WebGL Background Canvas */}
      <KashbitHeroCanvas />

      {/* Atmospheric Vignette & Scrims */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg)_80%)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--bg)] to-transparent pointer-events-none" />

      {/* Top HUD Badge */}
      <div
        className={`relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)] transition-all duration-700 ${
          isReady ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex items-center gap-2.5 px-3 py-1.5 bg-[var(--bg-raised)] border border-[var(--line)] rounded-full backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[var(--signal)] animate-pulse" />
          <span className="text-[var(--text)] font-semibold">{brandName} // STUDIO</span>
          <span className="text-[var(--text-faint)] hidden sm:inline">• 24.00 FPS CONFORM</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-medium text-[var(--accent)]">{timecode}</span>
        </div>
      </div>

      {/* Center Cinematic Display Statement */}
      <div className="relative z-10 my-auto py-12 max-w-6xl space-y-8">
        {/* Extreme Scale Brand Title */}
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)] flex items-center gap-2">
            <Sparkles size={12} className="text-[var(--accent)]" />
            <span>AI CINEMA POST & HIGH-CADENCE EDITING</span>
          </p>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.8rem] font-serif font-normal text-[var(--text)] leading-[0.88] tracking-tight uppercase">
            RU<span className="italic font-normal text-[var(--accent)]">HORA</span>
          </h1>
        </div>

        {/* Narrative Positioning Statement with Dot Separators */}
        <div className="space-y-4 max-w-2xl">
          <p className="text-lg sm:text-2xl font-serif text-[var(--text)] leading-relaxed">
            We engineer visual velocity for creators, commercial directors, and global brands.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-[0.08em]">
            <span>Precision Timeline Cadence</span>
            <span className="text-[var(--accent)]">•</span>
            <span>Generative AI Visuals</span>
            <span className="text-[var(--accent)]">•</span>
            <span>Cinema Master Conform</span>
          </div>
        </div>

        {/* Direct Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <Link href="/contact">
            <Button size="lg" variant="primary">
              START A PROJECT →
            </Button>
          </Link>
          <Link href="#manifesto">
            <Button size="lg" variant="secondary">
              EXPLORE THE WORK ↓
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom Technical Bar & Scroll Cue */}
      <div className="relative z-10 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)] border-t border-[var(--line)] pt-6">
        <div className="flex items-center gap-6">
          <span>PICTURE LOCK ARCHITECTURE</span>
          <span className="hidden sm:inline text-[var(--accent)]">SYNTHETIC MEDIA COMPLIANT</span>
        </div>

        <Link
          href="#manifesto"
          className="flex items-center gap-2 text-[var(--text)] hover:text-[var(--accent)] transition-colors"
        >
          <span>SCROLL TO DISCOVER</span>
          <ArrowDown size={12} className="animate-bounce" />
        </Link>
      </div>
    </section>
  );
};
