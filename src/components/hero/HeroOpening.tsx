"use client";

import React, { useState, useEffect, useRef } from "react";
import { MediaFrame } from "@/components/media/MediaFrame";
import { Button } from "@/components/ui/Button";
import { Volume2, VolumeX, Maximize2, Play, Pause } from "lucide-react";

export interface HeroOpeningProps {
  headline?: string;
  tagline?: string;
  brandName?: string;
  videoUrl?: string | null;
  posterUrl?: string | null;
}

export const HeroOpening: React.FC<HeroOpeningProps> = ({
  headline = "WE CUT. WE SHAPE. WE MAKE *VISUALS* MOVE.",
  tagline = "Obsessed with the quality of the frame.",
  brandName = "RUHORA",
  videoUrl,
  posterUrl,
}) => {
  const [isLetterboxOpen, setIsLetterboxOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTimecode, setCurrentTimecode] = useState("00:00:00:00");
  const heroRef = useRef<HTMLDivElement>(null);

  // Timecode counter loop
  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame = (frame + 1) % 1440;
      const hh = String(Math.floor(frame / (24 * 60))).padStart(2, "0");
      const mm = String(Math.floor((frame / 24) % 60)).padStart(2, "0");
      const ss = String(Math.floor(frame % 24)).padStart(2, "0");
      const ff = String(frame % 24).padStart(2, "0");
      setCurrentTimecode(`TC ${hh}:${mm}:${ss}:${ff}`);
    }, 41.67); // ~24 fps

    return () => clearInterval(interval);
  }, []);

  // Letterbox retract animation on load (single run)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLetterboxOpen(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full h-[100svh] min-h-[640px] flex flex-col justify-between overflow-hidden bg-[var(--bg-sunken)] p-6 md:p-12 select-none"
    >
      {/* 1. Letterbox Retract Bars */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-[var(--bg-sunken)] z-30 transition-transform duration-1000 ease-[var(--ease-out)] ${
          isLetterboxOpen ? "-translate-y-full" : "translate-y-0"
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-[var(--bg-sunken)] z-30 transition-transform duration-1000 ease-[var(--ease-out)] ${
          isLetterboxOpen ? "translate-y-full" : "translate-y-0"
        }`}
      />

      {/* 2. Full-viewport Hero Canvas Media Frame */}
      <div className="absolute inset-0 z-0">
        {videoUrl ? (
          <video
            src={videoUrl}
            poster={posterUrl || undefined}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="w-full h-full">
            <MediaFrame
              aspectRatio="16:9"
              timecode={currentTimecode.replace("TC ", "")}
              className="w-full h-full !aspect-auto"
            />
          </div>
        )}
        {/* Dark Editorial Scrim for guaranteed contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[rgba(11,11,12,0.45)] to-[rgba(11,11,12,0.7)] pointer-events-none" />
      </div>

      {/* 3. Top Metadata Bar */}
      <div className="relative z-10 pt-16 flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[var(--signal)] animate-pulse" />
          <span className="text-[var(--text)] font-semibold">{brandName} // STUDIO</span>
          <span className="text-[var(--text-faint)] hidden sm:inline">GLOBAL / 24.00 FPS</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[var(--accent)] font-medium">{currentTimecode}</span>
        </div>
      </div>

      {/* 4. Center/Bottom Massive Typographic Statement */}
      <div className="relative z-10 my-auto max-w-5xl space-y-6 pt-12">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
          // EDITORIAL POST-PRODUCTION & AI CINEMA
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-serif text-[var(--text)] leading-[0.88] tracking-tight">
          {headline.split("*").map((chunk, idx) =>
            idx % 2 === 1 ? (
              <span key={idx} className="italic text-[var(--accent)]">
                {chunk}
              </span>
            ) : (
              chunk
            )
          )}
        </h1>
        <p className="font-sans text-sm md:text-base text-[var(--text-muted)] max-w-xl leading-relaxed">
          {tagline}
        </p>
      </div>

      {/* 5. Bottom Controls & Scroll Cue */}
      <div className="relative z-10 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-faint)] border-t border-[var(--line)] pt-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-1.5 hover:text-[var(--text)] transition-colors p-1"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            <span>{isMuted ? "SOUND: OFF" : "SOUND: ON"}</span>
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 hover:text-[var(--text)] transition-colors p-1"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? "PAUSE" : "PLAY"}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[var(--text)]">
          <span>SCROLL TO EXPLORE</span>
          <span className="animate-bounce">↓</span>
        </div>
      </div>
    </section>
  );
};
