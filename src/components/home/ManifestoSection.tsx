"use client";

import React from "react";
import Link from "next/link";
import { LinkUnderline } from "@/components/ui/LinkUnderline";

export const ManifestoSection: React.FC = () => {
  return (
    <section id="manifesto" className="w-full bg-[var(--bg)] border-b border-[var(--line)] py-32 md:py-48">
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 space-y-24">
        {/* Top Header Tag */}
        <div className="flex justify-between items-baseline font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)] border-b border-[var(--line)] pb-4">
          <span>02 // THE MANIFESTO</span>
          <span>ENGINEERING VISUAL CADENCE</span>
        </div>

        {/* 2-Column Split Manifesto (kashbit.in inspired pacing) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[var(--text)] leading-[1.05] tracking-tight">
              We don&apos;t just cut footage. We engineer{" "}
              <span className="italic text-[var(--accent)]">visual velocity</span>.
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-8 lg:pt-4">
            <p className="font-sans text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
              At the intersection of classical editing discipline and generative visual technology,
              ROO EDITS sculpts high-retention narratives for modern attention spans. Every cut,
              retime, and sound micro-transient is placed with mathematical intent.
            </p>

            <div className="pt-2">
              <LinkUnderline href="/studio">
                READ THE STUDIO MANIFESTO & PHILOSOPHY →
              </LinkUnderline>
            </div>
          </div>
        </div>

        {/* 4-Column Technical Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-[var(--line)]">
          <div className="bg-[var(--bg-raised)] border border-[var(--line)] p-6 space-y-1">
            <p className="font-mono text-2xl sm:text-3xl text-[var(--accent)] font-semibold">24.000</p>
            <p className="font-mono text-[10px] uppercase text-[var(--text-muted)] tracking-[0.1em]">
              FPS CONFORM BASE
            </p>
          </div>

          <div className="bg-[var(--bg-raised)] border border-[var(--line)] p-6 space-y-1">
            <p className="font-mono text-2xl sm:text-3xl text-[var(--text)] font-semibold">8K / 4K</p>
            <p className="font-mono text-[10px] uppercase text-[var(--text-muted)] tracking-[0.1em]">
              MASTER RESOLUTION
            </p>
          </div>

          <div className="bg-[var(--bg-raised)] border border-[var(--line)] p-6 space-y-1">
            <p className="font-mono text-2xl sm:text-3xl text-[var(--accent)] font-semibold">48.000</p>
            <p className="font-mono text-[10px] uppercase text-[var(--text-muted)] tracking-[0.1em]">
              KHZ 24-BIT AUDIO POST
            </p>
          </div>

          <div className="bg-[var(--bg-raised)] border border-[var(--line)] p-6 space-y-1">
            <p className="font-mono text-2xl sm:text-3xl text-[var(--signal)] font-semibold">0.00%</p>
            <p className="font-mono text-[10px] uppercase text-[var(--text-muted)] tracking-[0.1em]">
              FRAME DROP TOLERANCE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
