"use client";

import React from "react";
import Link from "next/link";
import { LinkUnderline } from "@/components/ui/LinkUnderline";
import { Button } from "@/components/ui/Button";

export interface StudioTeaserProps {
  founderName?: string | null;
  founderBio?: string | null;
}

export const StudioTeaser: React.FC<StudioTeaserProps> = ({
  founderName = "Ruh",
  founderBio = "Director & Lead Editor specializing in narrative pacing, commercial visual post, and synthetic media pipelines.",
}) => {
  return (
    <section id="studio" className="w-full container-full mx-auto py-24 md:py-32 border-b border-[var(--line)] space-y-20">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)] border-b border-[var(--line)] pb-4">
        <span>07 // THE STUDIO</span>
        <span>HUMAN ARCHITECTURE</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
            CRAFT & METHODOLOGY
          </span>
          <h3 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[var(--text)] leading-tight">
            We treat every timeline as a piece of <span className="italic text-[var(--accent)]">architecture</span>.
          </h3>
          <p className="font-sans text-base text-[var(--text-muted)] max-w-xl leading-relaxed">
            Founded with a conviction that modern high-velocity content suffers from interchangeable
            templated aesthetics. We build customized visual worlds for creators, directors, and
            brands who treat visual quality as their strongest differentiator.
          </p>
          <div className="pt-4 flex gap-6">
            <Link href="/studio">
              <Button variant="secondary" size="md">
                READ THE STUDIO MANIFESTO →
              </Button>
            </Link>
            <Link href="/creative">
              <Button variant="ghost" size="md">
                CREATIVE DIRECTORY
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[var(--bg-raised)] border border-[var(--line)] p-8 md:p-12 space-y-6">
          <div className="space-y-2 border-b border-[var(--line)] pb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-faint)]">
              FOUNDED BY
            </span>
            <h4 className="text-2xl sm:text-3xl font-serif text-[var(--text)]">{founderName}</h4>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent)]">
              LEAD EDITOR & CREATIVE DIRECTOR
            </p>
          </div>

          <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
            {founderBio}
          </p>

          <div className="pt-4 border-t border-[var(--line)] flex justify-between items-center text-xs font-mono text-[var(--text-faint)]">
            <span>LOCATION: UTC +5:30</span>
            <span className="text-[var(--text)]">COLLABORATING GLOBALLY</span>
          </div>
        </div>
      </div>
    </section>
  );
};
