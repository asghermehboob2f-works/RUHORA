"use client";

import React, { useEffect, useState } from "react";

export interface PlayheadSection {
  id: string;
  label: string;
}

export const PlayheadTracker: React.FC<{ sections?: PlayheadSection[] }> = ({
  sections = [
    { id: "hero", label: "01 HERO" },
    { id: "statement", label: "02 STATEMENT" },
    { id: "reel", label: "03 REEL" },
    { id: "index", label: "04 INDEX" },
    { id: "capabilities", label: "05 SYSTEM" },
    { id: "process", label: "06 PROCESS" },
    { id: "slate", label: "07 SLATE" },
  ],
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[1px] bg-transparent z-50 md:hidden">
        <div
          className="h-full bg-[var(--accent)] transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Desktop Vertical Playhead Tracker on Right Edge */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center z-40 select-none pointer-events-none">
        <div className="relative h-48 w-[1px] bg-[var(--line)]">
          {/* Active playhead indicator */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[var(--accent)] transition-all duration-100 ease-out"
            style={{ top: `${progress}%` }}
          />

          {/* Section Chapter Ticks */}
          {sections.map((section, idx) => {
            const tickPos = (idx / (sections.length - 1)) * 100;
            return (
              <div
                key={section.id}
                className="absolute right-3 -translate-y-1/2 flex items-center gap-1.5 opacity-40 hover:opacity-100 transition-opacity"
                style={{ top: `${tickPos}%` }}
              >
                <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
                  {section.label}
                </span>
                <span className="w-1 h-[1px] bg-[var(--text-faint)]" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
