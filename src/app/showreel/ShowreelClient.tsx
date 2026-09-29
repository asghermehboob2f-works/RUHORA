"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MediaFrame } from "@/components/media/MediaFrame";
import { Volume2, VolumeX, Maximize2, Play, Pause, ArrowLeft } from "lucide-react";
import { clsx } from "clsx";

export const ShowreelClient: React.FC<{ site: any; projects: any[] }> = ({ site, projects }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const idleTimeout = useRef<NodeJS.Timeout | null>(null);

  const activeProject = projects[activeProjectIndex] || projects[0];

  // Auto-hide controls after 2.5s idle
  const handleMouseMove = () => {
    setShowControls(true);
    if (idleTimeout.current) clearTimeout(idleTimeout.current);
    idleTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 2500);
  };

  // Keyboard Hotkeys: Space (Play/Pause), M (Mute), F (Fullscreen)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.key === "m" || e.key === "M") {
        setIsMuted((prev) => !prev);
      } else if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      } else if (e.key === "ArrowRight") {
        setActiveProjectIndex((prev) => (prev + 1) % projects.length);
      } else if (e.key === "ArrowLeft") {
        setActiveProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [projects.length]);

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-screen h-[100svh] bg-[var(--bg-sunken)] overflow-hidden select-none cursor-default"
    >
      {/* 1. Fullscreen Cinema Media Canvas */}
      <div className="absolute inset-0">
        <MediaFrame
          aspectRatio="16:9"
          posterUrl={activeProject?.heroPosterUrl}
          hoverVideoUrl={activeProject?.hoverVideoUrl}
          timecode={`00:0${activeProjectIndex + 1}:30:00`}
          className="w-full h-full !aspect-auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,8,9,0.95)] via-transparent to-[rgba(8,8,9,0.85)] pointer-events-none" />
      </div>

      {/* 2. Top Navigation Bar (Auto-Hiding) */}
      <div
        className={clsx(
          "absolute top-0 inset-x-0 p-8 flex items-center justify-between z-30 transition-opacity duration-500",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--text)] hover:text-[var(--accent)] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>EXIT CINEMA VIEW</span>
        </Link>

        <div className="font-mono text-xs text-[var(--accent)] uppercase tracking-[0.1em]">
          {site.brandName} // SHOWREEL MASTER
        </div>
      </div>

      {/* 3. Bottom Cinema HUD Controls */}
      <div
        className={clsx(
          "absolute bottom-0 inset-x-0 p-8 space-y-6 z-30 transition-opacity duration-500",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Project Metadata Overlay */}
        {activeProject && (
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
              CHAPTER 0{activeProjectIndex + 1} // {activeProject.category}
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[var(--text)]">
              {activeProject.title}
            </h2>
          </div>
        )}

        {/* Scrubbable Timeline Chapters */}
        <div className="flex gap-2">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActiveProjectIndex(idx)}
              className={clsx(
                "h-1.5 flex-1 transition-all duration-300",
                idx === activeProjectIndex
                  ? "bg-[var(--accent)]"
                  : "bg-[rgba(236,234,230,0.2)] hover:bg-[rgba(236,234,230,0.5)]"
              )}
              aria-label={`Jump to chapter ${idx + 1}`}
            />
          ))}
        </div>

        {/* Playback Controls & Hotkey Hints */}
        <div className="flex items-center justify-between font-mono text-[11px] text-[var(--text-faint)] uppercase pt-2">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 text-[var(--text)] hover:text-[var(--accent)] transition-colors"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlaying ? "PAUSE [SPACE]" : "PLAY [SPACE]"}</span>
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center gap-2 text-[var(--text)] hover:text-[var(--accent)] transition-colors"
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              <span>{isMuted ? "UNMUTE [M]" : "MUTE [M]"}</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <span>FULLSCREEN [F]</span>
            <span>CHAPTERS [← / →]</span>
          </div>
        </div>
      </div>
    </div>
  );
};
