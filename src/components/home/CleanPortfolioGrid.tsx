"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { MediaFrame, AspectRatio } from "@/components/media/MediaFrame";
import { clsx } from "clsx";
import { ArrowUpRight, Film, Sparkles, Layers, LayoutGrid, Rows, Maximize2 } from "lucide-react";

export interface PortfolioProject {
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

interface CleanPortfolioGridProps {
  projects: PortfolioProject[];
}

export const CleanPortfolioGrid: React.FC<CleanPortfolioGridProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "full" | "list">("grid");

  const categories = ["ALL", "COMMERCIAL", "AI FILM", "VERTICAL", "DOCUMENTARY"];

  const filteredProjects = useMemo(() => {
    if (activeCategory === "ALL") return projects;
    return projects.filter((p) =>
      p.category.toUpperCase().includes(activeCategory.replace(" ", ""))
    );
  }, [projects, activeCategory]);

  return (
    <section id="work" className="w-full bg-[var(--bg)] py-20 md:py-32 border-b border-[var(--line)]">
      <div className="container-full mx-auto space-y-12">
        {/* Section Header with Fluid Full-Width Layout */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 border-b border-[var(--line)] pb-8">
          <div className="space-y-3 max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)] flex items-center gap-2">
              <Film size={14} />
              <span>SELECTED CINEMA & EDITORIAL PORTFOLIO</span>
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[var(--text)] tracking-tight">
              Featured <span className="italic text-[var(--accent)]">Work</span>
            </h2>
            <p className="font-sans text-base sm:text-lg text-[var(--text-muted)] leading-relaxed font-light">
              A curated catalog of commercial edits, AI-augmented visual pieces, and narrative storytelling engineered for maximum emotional resonance.
            </p>
          </div>

          {/* Controls: Category Filter Pills + View Switcher */}
          <div className="flex flex-wrap items-center gap-4 justify-between xl:justify-end">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={clsx(
                    "font-mono text-xs uppercase tracking-[0.1em] px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer",
                    activeCategory === cat
                      ? "bg-[var(--accent)] text-[var(--bg-sunken)] border-[var(--accent)] font-semibold shadow-sm"
                      : "bg-[var(--bg-raised)] text-[var(--text-muted)] border-[var(--line)] hover:border-[var(--line-strong)] hover:text-[var(--text)]"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View Mode Buttons */}
            <div className="hidden sm:flex items-center gap-1 bg-[var(--bg-raised)] p-1 border border-[var(--line)] rounded-full">
              <button
                onClick={() => setViewMode("grid")}
                title="Grid View"
                className={clsx(
                  "p-2 rounded-full transition-colors cursor-pointer",
                  viewMode === "grid"
                    ? "bg-[var(--accent)] text-[var(--bg-sunken)]"
                    : "text-[var(--text-faint)] hover:text-[var(--text)]"
                )}
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setViewMode("full")}
                title="Expanded Cinema View"
                className={clsx(
                  "p-2 rounded-full transition-colors cursor-pointer",
                  viewMode === "full"
                    ? "bg-[var(--accent)] text-[var(--bg-sunken)]"
                    : "text-[var(--text-faint)] hover:text-[var(--text)]"
                )}
              >
                <Maximize2 size={15} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                title="Editorial List View"
                className={clsx(
                  "p-2 rounded-full transition-colors cursor-pointer",
                  viewMode === "list"
                    ? "bg-[var(--accent)] text-[var(--bg-sunken)]"
                    : "text-[var(--text-faint)] hover:text-[var(--text)]"
                )}
              >
                <Rows size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="py-24 text-center space-y-3 bg-[var(--bg-raised)] border border-[var(--line)] rounded-xl">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
              NO PROJECTS IN THIS CATEGORY
            </p>
            <p className="font-sans text-xs text-[var(--text-faint)]">
              Select &quot;ALL&quot; to view the complete catalog.
            </p>
          </div>
        ) : viewMode === "list" ? (
          /* List Mode */
          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {filteredProjects.map((project, idx) => (
              <Link
                key={project.id}
                href={`/work/${project.slug}`}
                className="group flex flex-col md:flex-row md:items-center justify-between py-8 px-4 hover:bg-[rgba(201,185,154,0.03)] transition-colors duration-200"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase text-[var(--text-faint)]">
                    <span className="text-[var(--accent)] font-semibold">0{idx + 1} //</span>
                    <span>{project.category}</span>
                    <span>• RATIO {project.aspectRatio}</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-serif text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    {project.title}
                  </h3>
                </div>
                <div className="flex items-center gap-6 mt-4 md:mt-0 font-mono text-xs text-[var(--text-faint)]">
                  <span>YEAR {project.year}</span>
                  <span className="text-[var(--accent)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    EXPLORE CASE STUDY →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : viewMode === "full" ? (
          /* Fullscreen Cinema View (1 large item per row or ultra-wide cards) */
          <div className="space-y-16">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="group relative bg-[var(--bg-raised)] border border-[var(--line)] rounded-2xl overflow-hidden hover:border-[var(--line-strong)] transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                  <Link
                    href={`/work/${project.slug}`}
                    className="lg:col-span-8 relative overflow-hidden bg-[var(--bg-sunken)] min-h-[360px] sm:min-h-[480px]"
                  >
                    <MediaFrame
                      aspectRatio="16:9"
                      mediaUrl={project.heroMediaUrl}
                      posterUrl={project.heroPosterUrl}
                      hoverVideoUrl={project.hoverVideoUrl}
                      timecode={`0${idx + 1}:00:24`}
                      cursorLabel="PLAY PROJECT"
                    />
                  </Link>

                  <div className="lg:col-span-4 p-8 sm:p-12 flex flex-col justify-between space-y-8 bg-[var(--bg-raised)]">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
                        <span className="px-3 py-1 bg-[var(--bg)] border border-[var(--line)] rounded-full text-[var(--accent)] font-semibold">
                          {project.category}
                        </span>
                        <span>{project.year}</span>
                      </div>

                      <Link href={`/work/${project.slug}`}>
                        <h3 className="text-3xl sm:text-4xl font-serif text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                          {project.title}
                        </h3>
                      </Link>

                      {project.summary && (
                        <p className="font-sans text-sm sm:text-base text-[var(--text-muted)] leading-relaxed font-light">
                          {project.summary}
                        </p>
                      )}
                    </div>

                    <div className="pt-6 border-t border-[var(--line)] flex items-center justify-between font-mono text-xs">
                      <span className="text-[var(--text-faint)]">RATIO {project.aspectRatio}</span>
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline font-semibold"
                      >
                        <span>VIEW TIMELINE</span>
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Multi-Column Fluid Grid spanning full width */
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 lg:gap-10">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="group flex flex-col bg-[var(--bg-raised)] border border-[var(--line)] rounded-2xl overflow-hidden hover:border-[var(--line-strong)] transition-all duration-300 hover:shadow-2xl"
              >
                {/* Media Preview Container */}
                <Link
                  href={`/work/${project.slug}`}
                  className="block relative overflow-hidden bg-[var(--bg-sunken)]"
                >
                  <MediaFrame
                    aspectRatio={(project.aspectRatio as AspectRatio) || "16:9"}
                    mediaUrl={project.heroMediaUrl}
                    posterUrl={project.heroPosterUrl}
                    hoverVideoUrl={project.hoverVideoUrl}
                    timecode={`0${idx + 1}:00`}
                    cursorLabel="VIEW PROJECT"
                  />
                </Link>

                {/* Card Information */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
                      <span className="px-3 py-1 bg-[var(--bg)] border border-[var(--line)] rounded-full text-[var(--accent)] font-semibold">
                        {project.category}
                      </span>
                      <span>{project.year}</span>
                    </div>

                    <Link href={`/work/${project.slug}`} className="block group/title">
                      <h3 className="text-2xl sm:text-3xl font-serif text-[var(--text)] group-hover/title:text-[var(--accent)] transition-colors flex items-center justify-between">
                        <span>{project.title}</span>
                        <ArrowUpRight
                          size={20}
                          className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-[var(--accent)] shrink-0 ml-2"
                        />
                      </h3>
                    </Link>

                    {project.summary && (
                      <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2">
                        {project.summary}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[var(--line)] font-mono text-xs text-[var(--text-faint)]">
                    <span className="flex items-center gap-1.5">
                      <Layers size={12} className="text-[var(--accent)]" />
                      Ratio {project.aspectRatio}
                    </span>
                    <Link
                      href={`/work/${project.slug}`}
                      className="text-[var(--accent)] hover:underline flex items-center gap-1 font-semibold"
                    >
                      Case Study →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Archive Link */}
        <div className="flex justify-center pt-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[var(--bg-raised)] border border-[var(--line-strong)] rounded-full font-mono text-xs uppercase tracking-[0.16em] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:scale-[1.02] transition-all shadow-lg"
          >
            <span>EXPLORE COMPLETE TIMELINE ARCHIVE</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
