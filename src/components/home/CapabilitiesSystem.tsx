"use client";

import React, { useState } from "react";
import { clsx } from "clsx";

export interface CapabilityItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  deliverables: string[];
}

export const CapabilitiesSystem: React.FC<{ capabilities: CapabilityItem[] }> = ({
  capabilities,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeCap = capabilities[selectedIndex] || capabilities[0];

  return (
    <section id="capabilities" className="w-full container-full mx-auto py-24 md:py-32 border-b border-[var(--line)] space-y-20">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)] border-b border-[var(--line)] pb-4">
        <span>05 // CAPABILITIES SYSTEM</span>
        <span>PRODUCTION ARCHITECTURE</span>
      </div>

      {/* AI Philosophy Banner (Section 21) */}
      <div className="bg-[var(--bg-raised)] border border-[var(--line)] p-8 md:p-12 space-y-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">
          // SYNTHETIC MEDIA & AI PRODUCTION CHAPTER
        </span>
        <h3 className="text-2xl sm:text-4xl font-serif text-[var(--text)]">
          &ldquo;AI expands what can be produced. <span className="italic text-[var(--accent)]">Taste</span> decides what is kept.&rdquo;
        </h3>
        <p className="font-sans text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed">
          We integrate generative diffusion models and neural upscalers directly into timeline
          conforms. AI is not a gimmick here; it is a rapid visual expansion layer backed by
          director-level restraint.
        </p>
      </div>

      {/* Interactive System Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Capabilities Index */}
        <div className="lg:col-span-6 space-y-2">
          {capabilities.map((cap, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={cap.id}
                onClick={() => setSelectedIndex(idx)}
                className={clsx(
                  "w-full text-left p-6 border transition-all duration-300 flex items-center justify-between group",
                  isSelected
                    ? "bg-[var(--bg-raised)] border-[var(--accent)]"
                    : "bg-transparent border-[var(--line)] hover:border-[var(--line-strong)]"
                )}
              >
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-[var(--text-faint)] uppercase">
                    0{idx + 1} // {cap.category}
                  </span>
                  <h4
                    className={clsx(
                      "text-xl sm:text-2xl font-serif transition-colors",
                      isSelected ? "text-[var(--accent)]" : "text-[var(--text)] group-hover:text-[var(--text)]"
                    )}
                  >
                    {cap.name}
                  </h4>
                </div>
                <span
                  className={clsx(
                    "font-mono text-xs transition-transform duration-200",
                    isSelected ? "text-[var(--accent)] translate-x-1" : "text-[var(--text-faint)] opacity-0 group-hover:opacity-100"
                  )}
                >
                  SELECT →
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Active Capability Deep Inspection */}
        {activeCap && (
          <div className="lg:col-span-6 bg-[var(--bg-raised)] border border-[var(--line)] p-8 md:p-12 space-y-8 sticky top-28">
            <div className="space-y-2 border-b border-[var(--line)] pb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
                SPECIFICATION // {activeCap.category}
              </span>
              <h3 className="text-3xl md:text-4xl font-serif text-[var(--text)]">
                {activeCap.name}
              </h3>
            </div>

            <p className="font-sans text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
              {activeCap.description}
            </p>

            <div className="space-y-4 pt-4 border-t border-[var(--line)]">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-faint)]">
                CORE DELIVERABLES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeCap.deliverables.map((del, i) => (
                  <div
                    key={i}
                    className="font-mono text-xs text-[var(--text)] flex items-center gap-2 bg-[var(--bg-sunken)] p-3 border border-[var(--line)]"
                  >
                    <span className="w-1.5 h-1.5 bg-[var(--accent)]" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
