"use client";

import React from "react";
import Link from "next/link";
import { MediaFrame, AspectRatio } from "@/components/media/MediaFrame";
import { Button } from "@/components/ui/Button";
import { clsx } from "clsx";

export interface ExhibitionProject {
  id: string;
  title: string;
  slug: string;
  year: string;
  category: string;
  aspectRatio: string;
  summary: string | null;
  heroMediaUrl?: string | null;
  heroPosterUrl?: string | null;
  hoverVideoUrl?: string | null;
}

export const AlternatingExhibition: React.FC<{ projects: ExhibitionProject[] }> = ({
  projects,
}) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="work" className="w-full bg-[var(--bg)] border-b border-[var(--line)] py-32 md:py-48 space-y-36">
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-baseline justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)] border-b border-[var(--line)] pb-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)] animate-pulse" />
          <span className="text-[var(--text)] font-semibold">03 // FEATURED EXHIBITION</span>
        </div>
        <span>SELECTED TIMELINES // 24 FPS</span>
      </div>

      <div className="max-w-[1680px] mx-auto px-6 md:px-12 space-y-48">
        {projects.map((project, idx) => {
          const isEven = idx % 2 === 1;
          const timecode = `00:0${idx + 1}:18:12`;

          return (
            <div
              key={project.id}
              className={clsx(
                "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center group",
                isEven ? "lg:flex-row-reverse" : ""
              )}
            >
              {/* Media Canvas Column (Alternates 7 cols) */}
              <div className={clsx("lg:col-span-7", isEven ? "lg:order-2" : "lg:order-1")}>
                <Link href={`/work/${project.slug}`}>
                  <MediaFrame
                    aspectRatio={(project.aspectRatio as AspectRatio) || "16:9"}
                    mediaUrl={project.heroMediaUrl}
                    posterUrl={project.heroPosterUrl}
                    hoverVideoUrl={project.hoverVideoUrl}
                    timecode={timecode}
                    cursorLabel="VIEW PROJECT"
                  />
                </Link>
              </div>

              {/* Narrative Content Column (Alternates 5 cols) */}
              <div
                className={clsx(
                  "lg:col-span-5 space-y-8",
                  isEven ? "lg:order-1" : "lg:order-2"
                )}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase text-[var(--text-faint)]">
                    <span className="text-[var(--accent)] font-semibold">{timecode}</span>
                    <span>// {project.category}</span>
                    <span>// {project.year}</span>
                  </div>

                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[var(--text)] leading-[1.05] tracking-tight group-hover:text-[var(--accent)] transition-colors">
                    {project.title}
                  </h3>
                </div>

                <p className="font-sans text-base text-[var(--text-muted)] leading-relaxed">
                  {project.summary}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-[10px] uppercase text-[var(--text-faint)]">
                  <span className="px-2.5 py-1 bg-[var(--bg-raised)] border border-[var(--line)]">
                    RATIO {project.aspectRatio}
                  </span>
                  <span className="px-2.5 py-1 bg-[var(--bg-raised)] border border-[var(--line)]">
                    MASTER LOCK
                  </span>
                </div>

                <div className="pt-4">
                  <Link href={`/work/${project.slug}`}>
                    <Button variant="primary" size="md">
                      VIEW CASE STUDY •
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
