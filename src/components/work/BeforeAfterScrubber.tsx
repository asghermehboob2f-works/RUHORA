"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { AspectRatio } from "@/components/media/MediaFrame";

export interface BeforeAfterScrubberProps {
  beforeImageUrl?: string;
  afterImageUrl?: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: AspectRatio;
  timecode?: string;
}

export const BeforeAfterScrubber: React.FC<BeforeAfterScrubberProps> = ({
  beforeImageUrl,
  afterImageUrl,
  beforeLabel = "RAW GRADE",
  afterLabel = "FINAL CONFORM",
  aspectRatio = "16:9",
  timecode = "00:02:15:10",
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;
      setSliderPos(percent);
    },
    []
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPos((prev) => Math.min(100, prev + 5));
    } else if (e.key === "Home") {
      setSliderPos(0);
    } else if (e.key === "End") {
      setSliderPos(100);
    }
  };

  const ratioClass = {
    "16:9": "aspect-[16/9]",
    "21:9": "aspect-[21/9]",
    "9:16": "aspect-[9/16]",
    "1:1": "aspect-[1/1]",
    "4:5": "aspect-[4/5]",
  }[aspectRatio];

  return (
    <div className="space-y-3 select-none">
      <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-faint)]">
        <span>// BEFORE & AFTER COMPARISON SCRUBBER</span>
        <span className="text-[var(--accent)]">TC {timecode}</span>
      </div>

      <div
        ref={containerRef}
        role="slider"
        aria-valuenow={sliderPos}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Before and after comparison scrubber"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        data-cursor="DRAG"
        className={clsx(
          "relative w-full overflow-hidden bg-[var(--bg-sunken)] border border-[var(--line)] cursor-ew-resize focus-visible:outline-none focus-visible:border-[var(--accent)]",
          ratioClass
        )}
      >
        {/* After / Final Media (Base layer) */}
        <div className="absolute inset-0">
          {afterImageUrl ? (
            <Image
              src={afterImageUrl}
              alt={afterLabel}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,rgba(201,185,154,0.06)_0%,transparent_70%)]">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
                {afterLabel} // PROCESSED
              </span>
            </div>
          )}
        </div>

        {/* Before / Raw Media (Clipped Overlay layer) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          {beforeImageUrl ? (
            <Image
              src={beforeImageUrl}
              alt={beforeLabel}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[rgba(8,8,9,0.95)]">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                {beforeLabel} // UNGRADED
              </span>
            </div>
          )}
        </div>

        {/* Scrubber Divider Hairline & Handle */}
        <div
          className="absolute top-0 bottom-0 w-[1px] bg-[var(--accent)] pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 px-2 py-1 bg-[var(--bg-sunken)] border border-[var(--accent)] text-[9px] font-mono text-[var(--accent)] whitespace-nowrap shadow-lg">
            SCRUB
          </div>
        </div>

        {/* Static Edge Labels */}
        <div className="absolute bottom-3 left-3 px-2 py-1 bg-[rgba(8,8,9,0.85)] border border-[var(--line)] font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--text-muted)] pointer-events-none">
          {beforeLabel}
        </div>
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-[rgba(8,8,9,0.85)] border border-[var(--line)] font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--accent)] pointer-events-none">
          {afterLabel}
        </div>
      </div>
    </div>
  );
};
