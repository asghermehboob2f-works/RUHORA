"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { LinkUnderline } from "@/components/ui/LinkUnderline";
import { Input, Textarea } from "@/components/ui/Input";
import { MediaFrame } from "@/components/media/MediaFrame";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PlayheadTracker } from "@/components/ui/PlayheadTracker";
import { NavShell } from "@/components/navigation/NavShell";
import { FooterShell } from "@/components/navigation/FooterShell";

export default function DesignSystemPage() {
  const [inputValue, setInputValue] = useState("Cinematic Editorial Project");
  const [inputError, setInputError] = useState("");

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-[var(--bg-sunken)]">
      <CustomCursor />
      <PlayheadTracker
        sections={[
          { id: "tokens", label: "01 TOKENS" },
          { id: "typography", label: "02 TYPE" },
          { id: "buttons", label: "03 BUTTONS" },
          { id: "inputs", label: "04 INPUTS" },
          { id: "media", label: "05 MEDIA" },
        ]}
      />

      <NavShell />

      <main className="container-full mx-auto pt-36 pb-32 space-y-32">
        {/* Intro Header */}
        <section id="tokens" className="space-y-4 border-b border-[var(--line)] pb-12">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[var(--accent)] rounded-full" />
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
              RUHORA DESIGN SYSTEM SPECIFICATION — PHASE 1 CHECKPOINT
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-[var(--text)]">
            Design Tokens & <span className="italic text-[var(--accent)]">Primitives</span>
          </h1>
          <p className="font-sans text-[var(--text-muted)] max-w-2xl text-sm leading-relaxed">
            Strict editorial tokens and interface components governed by the timeline concept.
            Zero generic aesthetics, 0px radius geometry, warm neutral dark palette, and fluid typography.
          </p>
        </section>

        {/* 1. Color Palette Tokens */}
        <section className="space-y-6">
          <div className="flex justify-between items-baseline border-b border-[var(--line)] pb-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
              01 // COLOR TOKENS
            </h2>
            <span className="font-mono text-[10px] text-[var(--text-faint)]">WARM NEUTRALS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div className="space-y-2">
              <div className="h-20 bg-[var(--bg)] border border-[var(--line)] flex items-end p-2">
                <span className="font-mono text-[9px] text-[var(--text-faint)]">#0B0B0C</span>
              </div>
              <p className="font-mono text-[10px] uppercase text-[var(--text)]">--bg (Base)</p>
            </div>

            <div className="space-y-2">
              <div className="h-20 bg-[var(--bg-raised)] border border-[var(--line)] flex items-end p-2">
                <span className="font-mono text-[9px] text-[var(--text-faint)]">#111113</span>
              </div>
              <p className="font-mono text-[10px] uppercase text-[var(--text)]">--bg-raised</p>
            </div>

            <div className="space-y-2">
              <div className="h-20 bg-[var(--bg-sunken)] border border-[var(--line)] flex items-end p-2">
                <span className="font-mono text-[9px] text-[var(--text-faint)]">#080809</span>
              </div>
              <p className="font-mono text-[10px] uppercase text-[var(--text)]">--bg-sunken</p>
            </div>

            <div className="space-y-2">
              <div className="h-20 bg-[var(--accent)] text-[var(--bg-sunken)] flex items-end p-2">
                <span className="font-mono text-[9px] font-bold">#C9B99A</span>
              </div>
              <p className="font-mono text-[10px] uppercase text-[var(--accent)] font-bold">
                --accent (Champagne)
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-20 bg-[var(--signal)] text-white flex items-end p-2">
                <span className="font-mono text-[9px]">#E5432D</span>
              </div>
              <p className="font-mono text-[10px] uppercase text-[var(--signal)]">
                --signal (REC / Error)
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-20 bg-[rgba(236,234,230,0.18)] border border-[var(--line-strong)] flex items-end p-2">
                <span className="font-mono text-[9px] text-[var(--text)]">18% Opacity</span>
              </div>
              <p className="font-mono text-[10px] uppercase text-[var(--text)]">--line-strong</p>
            </div>
          </div>
        </section>

        {/* 2. Fluid Typography Scale */}
        <section id="typography" className="space-y-8">
          <div className="flex justify-between items-baseline border-b border-[var(--line)] pb-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
              02 // TYPOGRAPHIC SCALE & CONTRAST
            </h2>
            <span className="font-mono text-[10px] text-[var(--text-faint)]">INSTRUMENT SERIF + GEIST</span>
          </div>

          <div className="space-y-8 divide-y divide-[var(--line)]">
            <div className="pt-4 space-y-2">
              <span className="font-mono text-[10px] text-[var(--accent)]">
                DISPLAY-XL (HERO CANDIDATE)
              </span>
              <p className="text-5xl md:text-7xl lg:text-9xl font-serif tracking-tight leading-[0.9]">
                WE CUT. WE SHAPE. <span className="italic text-[var(--accent)]">VISUALS.</span>
              </p>
            </div>

            <div className="pt-6 space-y-2">
              <span className="font-mono text-[10px] text-[var(--accent)]">H1 (MAJOR HEADING)</span>
              <p className="text-3xl md:text-5xl font-serif tracking-tight">
                Obsessed with the <span className="italic text-[var(--accent)]">quality</span> of the frame.
              </p>
            </div>

            <div className="pt-6 space-y-2">
              <span className="font-mono text-[10px] text-[var(--accent)]">H2 / H3 (SUB-HEADINGS)</span>
              <p className="text-2xl md:text-3xl font-serif">
                Synthetic visuals fused with classical timeline discipline.
              </p>
            </div>

            <div className="pt-6 space-y-2">
              <span className="font-mono text-[10px] text-[var(--accent)]">BODY & METADATA CONTRAST</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
                  We are a specialized post-production and AI visual studio. We do not mass-produce content.
                  We partner with creators, brands, and directors who require every frame to hold weight.
                </p>
                <div className="space-y-1 font-mono text-xs text-[var(--text-faint)] uppercase tracking-[0.1em]">
                  <p>TC 00:14:02:18 // PROJECT SLATE</p>
                  <p>ASPECT: 16:9 CINEMA SCOPE</p>
                  <p className="text-[var(--accent)]">STATUS: ACTIVE INTAKE</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Interactive Buttons & Underlines */}
        <section id="buttons" className="space-y-8">
          <div className="flex justify-between items-baseline border-b border-[var(--line)] pb-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
              03 // BUTTON PRIMITIVES & DIRECTIONAL UNDERLINES
            </h2>
            <span className="font-mono text-[10px] text-[var(--text-faint)]">TEXT-SWAP HOVERS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-[var(--bg-raised)] border border-[var(--line)] space-y-6">
              <span className="font-mono text-[10px] uppercase text-[var(--text-faint)]">
                BUTTON VARIANTS
              </span>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary">START A PROJECT →</Button>
                <Button variant="secondary">VIEW CASE STUDY</Button>
                <Button variant="ghost">BACK TO REEL</Button>
                <Button variant="slate">00:00:12:04</Button>
              </div>
            </div>

            <div className="p-8 bg-[var(--bg-raised)] border border-[var(--line)] space-y-6">
              <span className="font-mono text-[10px] uppercase text-[var(--text-faint)]">
                DIRECTIONAL WIPES & SIZES
              </span>
              <div className="flex flex-wrap gap-6 items-center">
                <Button size="sm" variant="primary">SMALL CTA</Button>
                <Button size="md" variant="primary">MEDIUM CTA</Button>
                <Button size="lg" variant="primary">LARGE SLATE CTA</Button>
              </div>
              <div className="pt-2 flex gap-6">
                <LinkUnderline href="/work">EXPLORE ARCHIVE →</LinkUnderline>
                <LinkUnderline href="/capabilities">CAPABILITIES SYSTEM →</LinkUnderline>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Production Slate Form Inputs */}
        <section id="inputs" className="space-y-8">
          <div className="flex justify-between items-baseline border-b border-[var(--line)] pb-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
              04 // PRODUCTION SLATE INTAKE INPUTS
            </h2>
            <span className="font-mono text-[10px] text-[var(--text-faint)]">SHARP 2PX RADIUS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[var(--bg-raised)] p-8 border border-[var(--line)]">
            <div className="space-y-6">
              <Input
                label="01 / PROJECT TITLE"
                metaLabel="OPTIONAL"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input
                label="02 / CLIENT IDENTIFIER"
                metaLabel="REQUIRED"
                placeholder="Studio / Brand / Creator Name"
                error={inputError}
              />
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setInputError(inputError ? "" : "CLIENT FIELD IS REQUIRED FOR INTAKE")}
              >
                TOGGLE VALIDATION ERROR STATE
              </Button>
            </div>

            <div className="space-y-6">
              <Textarea
                label="03 / BRIEF & SPECIFICATIONS"
                metaLabel="MARKDOWN SUPPORTED"
                placeholder="Describe pacing, timeline deliverables, and visual references..."
                rows={4}
              />
            </div>
          </div>
        </section>

        {/* 5. Signature Media Frames & Aspect Ratios */}
        <section id="media" className="space-y-8">
          <div className="flex justify-between items-baseline border-b border-[var(--line)] pb-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
              05 // MEDIA FRAME SYSTEM & CROP MARKS
            </h2>
            <span className="font-mono text-[10px] text-[var(--text-faint)]">5 STRICT RATIOS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase text-[var(--text-faint)]">
                16:9 STANDARD CINEMA
              </span>
              <MediaFrame aspectRatio="16:9" timecode="00:01:24:12" cursorLabel="VIEW" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase text-[var(--text-faint)]">
                21:9 ANAMORPHIC WIDE
              </span>
              <MediaFrame aspectRatio="21:9" timecode="00:03:10:00" cursorLabel="PLAY" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase text-[var(--text-faint)]">
                1:1 SQUARE COMPOSITION
              </span>
              <MediaFrame aspectRatio="1:1" timecode="00:00:45:18" cursorLabel="OPEN" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-2 max-w-sm">
              <span className="font-mono text-[10px] uppercase text-[var(--text-faint)]">
                9:16 VERTICAL CINEMA
              </span>
              <MediaFrame aspectRatio="9:16" timecode="00:00:15:02" cursorLabel="VIEW REEL" />
            </div>

            <div className="space-y-2 max-w-sm">
              <span className="font-mono text-[10px] uppercase text-[var(--text-faint)]">
                4:5 EDITORIAL FRAME
              </span>
              <MediaFrame aspectRatio="4:5" timecode="00:02:08:14" cursorLabel="DISCOVER" />
            </div>
          </div>
        </section>
      </main>

      <FooterShell />
    </div>
  );
}
