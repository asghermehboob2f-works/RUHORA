"use client";

import React, { useState } from "react";
import { clsx } from "clsx";

export const CreativeProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "UNDERSTAND",
      subtitle: "Brief & Raw Ingestion",
      desc: "Deep analysis of narrative intent, retention goals, footage organization, and visual benchmarks.",
    },
    {
      num: "02",
      title: "CONCEPT",
      subtitle: "Editorial Spine & Style",
      desc: "Establishing the pacing rhythm, soundscape direction, and synthetic media exploration.",
    },
    {
      num: "03",
      title: "BUILD",
      subtitle: "Assembly & Conforms",
      desc: "Precision timeline construction, retiming, seamless transition cuts, and VFX/AI integrations.",
    },
    {
      num: "04",
      title: "REFINE",
      subtitle: "Color, Sound & Micro-cadence",
      desc: "Fine audio mixing, frame-by-frame color conformity, subtitle design, and director revisions.",
    },
    {
      num: "05",
      title: "DELIVER",
      subtitle: "Master Output & Multi-format",
      desc: "Full-resolution master exports across horizontal, vertical, and cinema aspect ratio specifications.",
    },
  ];

  return (
    <section id="process" className="w-full max-w-[1680px] mx-auto px-6 md:px-12 py-32 border-b border-[var(--line)] space-y-16">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)] border-b border-[var(--line)] pb-4">
        <span>06 // PRODUCTION PIPELINE</span>
        <span>FIVE-STAGE CADENCE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {steps.map((step, idx) => {
          const isActive = idx === activeStep;

          return (
            <div
              key={step.num}
              onClick={() => setActiveStep(idx)}
              className={clsx(
                "p-6 border transition-all duration-300 cursor-pointer space-y-6 flex flex-col justify-between min-h-[260px]",
                isActive
                  ? "bg-[var(--bg-raised)] border-[var(--accent)] text-[var(--text)]"
                  : "bg-[var(--bg-sunken)] border-[var(--line)] hover:border-[var(--line-strong)] text-[var(--text-muted)]"
              )}
            >
              <div className="flex justify-between items-baseline font-mono">
                <span
                  className={clsx(
                    "text-xs font-semibold",
                    isActive ? "text-[var(--accent)]" : "text-[var(--text-faint)]"
                  )}
                >
                  {step.num}
                </span>
                <span className="text-[9px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
                  PHASE
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-xl sm:text-2xl text-[var(--text)]">{step.title}</h4>
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--accent)]">
                  {step.subtitle}
                </p>
                <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed pt-2">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--line)]">
                <div
                  className={clsx(
                    "h-[2px] transition-all duration-300",
                    isActive ? "bg-[var(--accent)] w-full" : "bg-[var(--line)] w-1/4"
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
