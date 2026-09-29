"use client";

import React from "react";
import { Crosshair, Zap, Cpu, Film } from "lucide-react";

export const BrandPillarsBento: React.FC = () => {
  const pillars = [
    {
      num: "01",
      title: "FRAME PRECISION",
      icon: Crosshair,
      desc: "Every cut is synchronized to narrative cadence and auditory micro-transients. Zero filler frames, zero wasted seconds.",
    },
    {
      num: "02",
      title: "ITERATIVE VELOCITY",
      icon: Zap,
      desc: "Streamlined post-production pipelines delivering high-turnaround edits without compromising on cinematic fidelity.",
    },
    {
      num: "03",
      title: "SYNTHETIC POWER",
      icon: Cpu,
      desc: "Direct integration of generative diffusion models and neural upscalers. AI expands what can be made; taste decides what stays.",
    },
    {
      num: "04",
      title: "CINEMA MASTERY",
      icon: Film,
      desc: "Full ACES color conformity, high dynamic range mastering, and frame-accurate multi-format deliverables.",
    },
  ];

  return (
    <section className="w-full bg-[var(--bg)] border-b border-[var(--line)] py-32 md:py-48 space-y-24">
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-baseline justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)] border-b border-[var(--line)] pb-4">
        <span>05 // CORE PILLARS</span>
        <span>ARCHITECTURAL PRINCIPLES</span>
      </div>

      <div className="max-w-[1680px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((p) => {
          const Icon = p.icon;

          return (
            <div
              key={p.num}
              className="bg-[var(--bg-raised)] border border-[var(--line)] p-8 space-y-8 flex flex-col justify-between hover:border-[var(--accent)] transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="text-[var(--accent)] font-semibold">{p.num} // PILLAR</span>
                  <Icon size={16} className="text-[var(--text-faint)] group-hover:text-[var(--accent)] transition-colors" />
                </div>

                <h4 className="text-2xl font-serif text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                  {p.title}
                </h4>

                <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--line)] font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
                STANDARD OPERATIONAL SPEC
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
