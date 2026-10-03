"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { clsx } from "clsx";

export const LaptopTimelineShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<"TIMELINE" | "COLOR" | "SYNTHETIC">("TIMELINE");

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const total = rect.height - windowHeight;
      const current = -rect.top;
      const progress = Math.max(0, Math.min(1, current / total));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute 3D unhinging angles based on scroll
  const lidRotateX = mounted ? Math.max(0, 45 * (1 - scrollProgress * 1.5)) : 45;
  const laptopScale = mounted ? 0.88 + scrollProgress * 0.15 : 0.88;
  const laptopTranslateY = mounted ? (1 - scrollProgress) * 40 : 40;

  return (
    <section
      ref={containerRef}
      id="laptop-showcase"
      className="relative w-full min-h-[220vh] bg-[var(--bg)] border-b border-[var(--line)] select-none"
    >
      {/* Sticky Viewport Pinning Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden p-6 md:p-12">
        {/* Section Header */}
        <div className="container-full w-full mx-auto flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)] border-b border-[var(--line)] pb-4 z-20">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)] animate-pulse" />
            <span className="text-[var(--text)] font-semibold">04 // INTERACTIVE TIMELINE WORKSPACE</span>
          </div>
          <span className="text-[var(--accent)]">
            3D ENGINE CONFORM // SCROLL TO UNHINGE
          </span>
        </div>

        {/* 3D Hardware Device Canvas Container */}
        <div className="relative my-auto w-full max-w-5xl mx-auto flex items-center justify-center [perspective:1400px]">
          {/* Laptop Base & Keyboard Chassis */}
          <div
            className="relative w-full transition-transform duration-100 ease-out flex flex-col items-center"
            style={{
              transform: `scale(${laptopScale}) translateY(${laptopTranslateY}px)`,
            }}
          >
            {/* 1. Unhinging Laptop Screen Lid (3D Preserved Perspective) */}
            <div
              className="relative w-full aspect-[16/10] bg-[#161618] rounded-t-2xl border-4 border-[#28282B] p-3 shadow-2xl transition-transform duration-75 ease-out [transform-origin:bottom_center]"
              style={{
                transform: `rotateX(${lidRotateX}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* WebCam / Top Bezel Notch */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#0B0B0C] border border-[#333] flex items-center justify-center z-30">
                <span className="w-1 h-1 rounded-full bg-[#1A3B2E]" />
              </div>

              {/* High-Fidelity NLE Timeline Internal Screen Display */}
              <div className="relative w-full h-full bg-[#0D0D0E] rounded-lg overflow-hidden border border-[#1E1E22] flex flex-col text-[var(--text)]">
                {/* NLE Application Top Menu Bar */}
                <div className="h-7 bg-[#141417] border-b border-[#222226] px-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-[var(--text-faint)]">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                      <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                      <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                    </div>
                    <span className="text-[var(--text)] font-semibold">RUHORA NLE STUDIO</span>
                    <span className="hidden sm:inline text-[var(--text-faint)]">SEQUENCE 01 — MASTER_CUT_v4</span>
                  </div>

                  {/* Mode Tabs */}
                  <div className="flex items-center gap-2">
                    {(["TIMELINE", "COLOR", "SYNTHETIC"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={clsx(
                          "px-2 py-0.5 rounded transition-colors",
                          activeTab === tab
                            ? "bg-[var(--accent)] text-[var(--bg-sunken)] font-bold"
                            : "hover:text-[var(--text)]"
                        )}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Workspace Split: Preview Monitor & Waveform */}
                <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden bg-[#0A0A0B]">
                  {/* Left: Video Preview Monitor */}
                  <div className="col-span-8 relative border-r border-[#222226] flex flex-col justify-between p-3 bg-black">
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-[rgba(10,10,12,0.85)] font-mono text-[8px] text-[var(--accent)] border border-[var(--line)]">
                      REC 00:01:24:08 // 24.00 FPS
                    </div>

                    {/* Active Visual Feed Simulation */}
                    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                      <div className="text-center space-y-2 select-none">
                        <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                          RUHORA // SYNTHETIC MEDIA ENGINE
                        </p>
                        <p className="font-sans text-[11px] text-[var(--text-muted)]">
                          Frame conformity & audio cadence synchronized.
                        </p>
                      </div>

                      {/* Animated Audio Decibel Bars on bottom */}
                      <div className="absolute bottom-2 inset-x-3 flex items-end gap-1 h-8 opacity-60">
                        {Array.from({ length: 28 }).map((_, i) => {
                          const heightVal = mounted
                            ? Math.round(25 + Math.sin(i * 0.8 + scrollProgress * 10) * 45)
                            : Math.round(25 + Math.sin(i * 0.8) * 45);

                          return (
                            <div
                              key={i}
                              className="flex-1 bg-[var(--accent)] transition-all duration-150"
                              style={{ height: `${heightVal}%` }}
                              suppressHydrationWarning
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Preview Monitor Controls */}
                    <div className="flex items-center justify-between font-mono text-[9px] text-[var(--text-faint)] pt-2 border-t border-[#1C1C20]">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="hover:text-[var(--text)] flex items-center gap-1"
                        >
                          {isPlaying ? <Pause size={10} /> : <Play size={10} />}
                          <span>{isPlaying ? "PAUSE" : "PLAY"}</span>
                        </button>
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="hover:text-[var(--text)] flex items-center gap-1"
                        >
                          {isMuted ? <VolumeX size={10} /> : <Volume2 size={10} />}
                          <span>{isMuted ? "MUTED" : "LIVE"}</span>
                        </button>
                      </div>

                      <span className="text-[var(--accent)] font-semibold">ACEScc COLOR CONFORM</span>
                    </div>
                  </div>

                  {/* Right: Scopes & Metadata Inspector */}
                  <div className="col-span-4 bg-[#111114] p-3 space-y-3 font-mono text-[9px] text-[var(--text-muted)] flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[var(--text)] font-semibold uppercase block border-b border-[#222226] pb-1">
                        TIMELINE STATS
                      </span>
                      <div className="space-y-1 text-[8px] text-[var(--text-faint)]">
                        <p className="flex justify-between">
                          <span>RESOLUTION:</span>
                          <span className="text-[var(--text)]">3840 × 2160 (4K DCI)</span>
                        </p>
                        <p className="flex justify-between">
                          <span>CODEC:</span>
                          <span className="text-[var(--text)]">ProRes 4444 XQ</span>
                        </p>
                        <p className="flex justify-between">
                          <span>AUDIO:</span>
                          <span className="text-[var(--text)]">48.000 kHz / 24-Bit</span>
                        </p>
                        <p className="flex justify-between">
                          <span>NEURAL B-ROLL:</span>
                          <span className="text-[var(--accent)]">ACTIVE V2</span>
                        </p>
                      </div>
                    </div>

                    <div className="p-2 bg-[#0A0A0B] border border-[#222226] space-y-1">
                      <p className="text-[var(--accent)] font-bold text-[8px]">PICTURE LOCK READY</p>
                      <p className="text-[7px] text-[var(--text-faint)]">Zero dropped frames on conform export.</p>
                    </div>
                  </div>
                </div>

                {/* Bottom: Multi-Track Timeline Editor */}
                <div className="h-28 bg-[#111114] border-t border-[#222226] p-2 space-y-1 font-mono text-[8px]">
                  {/* Video Track V2 (AI B-Roll) */}
                  <div className="flex items-center gap-2">
                    <span className="w-8 text-[var(--text-faint)] text-right">V2 AI</span>
                    <div className="flex-1 h-5 bg-[#18181D] rounded relative flex items-center gap-1 px-1 border border-[#2A2A30]">
                      <div className="h-3.5 w-24 bg-[rgba(201,185,154,0.35)] border border-[var(--accent)] rounded-sm flex items-center px-1 text-[7px] text-[var(--text)] truncate">
                        DIFFUSION_BROLL_01
                      </div>
                      <div className="h-3.5 w-32 bg-[rgba(201,185,154,0.35)] border border-[var(--accent)] rounded-sm flex items-center px-1 text-[7px] text-[var(--text)] truncate ml-12">
                        GENERATIVE_PLATE_02
                      </div>
                    </div>
                  </div>

                  {/* Video Track V1 (Main Cut) */}
                  <div className="flex items-center gap-2">
                    <span className="w-8 text-[var(--text-faint)] text-right">V1 CUT</span>
                    <div className="flex-1 h-5 bg-[#18181D] rounded relative flex items-center gap-1 px-1 border border-[#2A2A30]">
                      <div className="h-3.5 w-36 bg-[#2B384E] border border-[#48638C] rounded-sm flex items-center px-1 text-[7px] text-white truncate">
                        A-CAM_SCENE_01
                      </div>
                      <div className="h-3.5 w-44 bg-[#2B384E] border border-[#48638C] rounded-sm flex items-center px-1 text-[7px] text-white truncate">
                        A-CAM_SCENE_02_RETIME
                      </div>
                      <div className="h-3.5 flex-1 bg-[#2B384E] border border-[#48638C] rounded-sm flex items-center px-1 text-[7px] text-white truncate">
                        B-CAM_CU_03
                      </div>
                    </div>
                  </div>

                  {/* Audio Track A1 (Dialog & Sound FX) */}
                  <div className="flex items-center gap-2">
                    <span className="w-8 text-[var(--text-faint)] text-right">A1 FX</span>
                    <div className="flex-1 h-4 bg-[#18181D] rounded relative flex items-center gap-1 px-1 border border-[#2A2A30]">
                      <div className="h-2.5 w-full bg-[#1E3B2E] border border-[#3E735B] rounded-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Laptop Keyboard Deck Bottom Chassis */}
            <div className="w-[104%] h-5 bg-[#28282B] rounded-b-xl border-t border-[#3A3A3E] shadow-2xl relative flex items-center justify-center">
              {/* Notch indentation for opening lid */}
              <div className="w-20 h-1 bg-[#161618] rounded-b" />
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="container-full w-full mx-auto flex justify-between items-center font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--text-faint)] border-t border-[var(--line)] pt-4 z-20">
          <span suppressHydrationWarning>PROGRESS: {mounted ? Math.round(scrollProgress * 100) : 0}% UNHINGED</span>
          <span className="text-[var(--accent)]">DAVINCI & PREMIERE TIMELINE ARCHITECTURE</span>
        </div>
      </div>
    </section>
  );
};
