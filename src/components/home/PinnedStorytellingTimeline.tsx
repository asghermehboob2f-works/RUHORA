"use client";

import React, { useState } from "react";
import { clsx } from "clsx";

export const PinnedStorytellingTimeline: React.FC = () => {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      num: "01",
      title: "RAW INGESTION & STORY SPINE",
      badge: "INGESTION & METADATA",
      timecode: "00:00:15:00",
      description:
        "Multi-cam footage organization, transcript indexing, and narrative architecture sculpting. We isolate the core emotional turning points before making the first rough cut.",
      specs: ["10-Bit ProRES / BRAW", "Audio Waveform Sync", "Story Arc Structuring"],
    },
    {
      num: "02",
      title: "THE CUT & RETIME CADENCE",
      badge: "TIMELINE VELOCITY",
      timecode: "00:01:30:12",
      description:
        "Frame-accurate pacing, rhythmic tension modulation, and speed ramping. Every sequence is retimed to match speech cadence, micro-sound effects, and retention dynamics.",
      specs: ["Dynamic Retiming", "Micro-Transient Sound FX", "Retention Spike Framing"],
    },
    {
      num: "03",
      title: "SYNTHETIC AI EXPANSION",
      badge: "NEURAL DIFFUSION",
      timecode: "00:03:00:18",
      description:
        "Integrating generative diffusion models and custom neural upscalers. We generate cinema-grade synthetic visual backdrops and abstract textures with zero generic AI tropes.",
      specs: ["Stable Diffusion XL / ComfyUI", "Neural Upscaling", "Texture Synthesis"],
    },
    {
      num: "04",
      title: "MASTER COLOR & CONFORM",
      badge: "FINAL PICTURE LOCK",
      timecode: "00:04:45:00",
      description:
        "DaVinci Resolve color conform, ACES color management, and multi-aspect exports (16:9, 9:16, 21:9). Ready for commercial broadcast, YouTube 4K, and social vertical delivery.",
      specs: ["ACES Color Science", "Dolby Atmos 5.1 / Stereo", "Multi-Ratio Deliverables"],
    },
  ];

  const current = phases[activePhase];

  return (
    <section id="pipeline" className="w-full bg-[var(--bg)] border-b border-[var(--line)] py-32 md:py-48 space-y-24">
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-baseline justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)] border-b border-[var(--line)] pb-4">
        <span>04 // TIMELINE STORYTELLING SEQUENCE</span>
        <span>STEP-BY-STEP CONFORM</span>
      </div>

      <div className="max-w-[1680px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Phase Selectors */}
        <div className="lg:col-span-5 space-y-4">
          {phases.map((phase, idx) => {
            const isSelected = idx === activePhase;

            return (
              <button
                key={phase.num}
                onClick={() => setActivePhase(idx)}
                className={clsx(
                  "w-full text-left p-6 md:p-8 border transition-all duration-300 space-y-2 group",
                  isSelected
                    ? "bg-[var(--bg-raised)] border-[var(--accent)] text-[var(--text)]"
                    : "bg-transparent border-[var(--line)] hover:border-[var(--line-strong)] text-[var(--text-muted)]"
                )}
              >
                <div className="flex justify-between items-center font-mono text-[10px] uppercase">
                  <span
                    className={clsx(
                      "font-semibold",
                      isSelected ? "text-[var(--accent)]" : "text-[var(--text-faint)]"
                    )}
                  >
                    PHASE {phase.num}
                  </span>
                  <span className="text-[var(--text-faint)]">{phase.timecode}</span>
                </div>

                <h4 className="text-xl sm:text-2xl font-serif text-[var(--text)]">{phase.title}</h4>
              </button>
            );
          })}
        </div>

        {/* Right Side: Pinned Active Phase Inspection Canvas */}
        <div className="lg:col-span-7 bg-[var(--bg-raised)] border border-[var(--line)] p-8 md:p-14 space-y-8 sticky top-28">
          <div className="space-y-4 border-b border-[var(--line)] pb-8">
            <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-[0.14em]">
              <span className="text-[var(--accent)] font-semibold">{current.badge}</span>
              <span className="text-[var(--text-faint)]">TC {current.timecode}</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-serif text-[var(--text)] leading-tight">
              {current.title}
            </h3>

            <p className="font-sans text-base sm:text-lg text-[var(--text-muted)] leading-relaxed pt-2">
              {current.description}
            </p>
          </div>

          {/* Interactive Timeline Visualizer Track */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-faint)]">
              PIPELINE SPECIFICATIONS & ARTIFACTS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              {current.specs.map((spec, i) => (
                <div
                  key={i}
                  className="bg-[var(--bg-sunken)] p-3.5 border border-[var(--line)] text-[var(--text)] flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-[var(--accent)]" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
