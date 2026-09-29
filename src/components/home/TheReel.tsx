"use client";

import React from "react";
import Link from "next/link";
import { MediaFrame, AspectRatio } from "@/components/media/MediaFrame";
import { Button } from "@/components/ui/Button";

export interface ReelProject {
  id: string;
  title: string;
  slug: string;
  year: string;
  category: string;
  aspectRatio: string;
  layoutVariant: string;
  summary: string | null;
  heroMediaUrl?: string | null;
  heroPosterUrl?: string | null;
  hoverVideoUrl?: string | null;
}

export const TheReel: React.FC<{ projects: ReelProject[] }> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="reel" className="w-full bg-[var(--bg)] border-b border-[var(--line)] py-24 md:py-36 space-y-32">
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-baseline justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)] border-b border-[var(--line)] pb-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)] animate-pulse" />
          <span className="text-[var(--text)] font-semibold">03 // THE REEL</span>
        </div>
        <span>CURATED SELECTION // {projects.length} CUTS</span>
      </div>

      <div className="space-y-40">
        {projects.map((project, idx) => {
          const indexTimecode = `00:0${idx + 1}:14:08`;

          return (
            <div
              key={project.id}
              className="max-w-[1680px] mx-auto px-6 md:px-12 space-y-8 group"
            >
              {/* Project Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 font-mono text-xs border-b border-[var(--line)] pb-4">
                <div className="flex items-center gap-4">
                  <span className="text-[var(--accent)] font-semibold">{indexTimecode}</span>
                  <span className="text-[var(--text-muted)] uppercase">{project.category}</span>
                </div>
                <div className="text-[var(--text-faint)]">{project.year} // 24 FPS</div>
              </div>

              {/* Dynamic Layout Rendering based on layoutVariant */}
              {project.layoutVariant === "ASYMMETRIC" ? (
                /* Asymmetric Composition */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8">
                    <MediaFrame
                      aspectRatio={(project.aspectRatio as AspectRatio) || "21:9"}
                      mediaUrl={project.heroMediaUrl}
                      posterUrl={project.heroPosterUrl}
                      hoverVideoUrl={project.hoverVideoUrl}
                      timecode={indexTimecode}
                      cursorLabel="VIEW CASE"
                    />
                  </div>
                  <div className="lg:col-span-4 space-y-6">
                    <h3 className="text-3xl md:text-5xl font-serif text-[var(--text)] leading-tight group-hover:text-[var(--accent)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
                      {project.summary}
                    </p>
                    <Link href={`/work/${project.slug}`}>
                      <Button variant="secondary" size="md">
                        VIEW CASE STUDY →
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : project.layoutVariant === "VERTICAL" ? (
                /* Vertical Split Composition */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 max-w-sm mx-auto lg:mx-0">
                    <MediaFrame
                      aspectRatio="9:16"
                      mediaUrl={project.heroMediaUrl}
                      posterUrl={project.heroPosterUrl}
                      hoverVideoUrl={project.hoverVideoUrl}
                      timecode={indexTimecode}
                      cursorLabel="VIEW REEL"
                    />
                  </div>
                  <div className="lg:col-span-7 space-y-8">
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
                      VERTICAL RETENTION & SOUND ARCHITECTURE
                    </span>
                    <h3 className="text-4xl md:text-6xl font-serif text-[var(--text)] leading-tight group-hover:text-[var(--accent)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-sans text-base text-[var(--text-muted)] max-w-lg leading-relaxed">
                      {project.summary}
                    </p>
                    <Link href={`/work/${project.slug}`}>
                      <Button variant="primary" size="lg">
                        EXPLORE FULL PRODUCTION →
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                /* Full-Bleed Default Composition */
                <div className="space-y-6">
                  <MediaFrame
                    aspectRatio={(project.aspectRatio as AspectRatio) || "16:9"}
                    mediaUrl={project.heroMediaUrl}
                    posterUrl={project.heroPosterUrl}
                    hoverVideoUrl={project.hoverVideoUrl}
                    timecode={indexTimecode}
                    cursorLabel="VIEW CASE"
                  />
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 pt-4">
                    <div className="space-y-2 max-w-2xl">
                      <h3 className="text-3xl md:text-5xl font-serif text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                        {project.title}
                      </h3>
                      <p className="font-sans text-sm text-[var(--text-muted)]">
                        {project.summary}
                      </p>
                    </div>
                    <Link href={`/work/${project.slug}`}>
                      <Button variant="secondary" size="md">
                        VIEW CASE STUDY →
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
