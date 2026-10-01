"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { MediaFrame, AspectRatio } from "@/components/media/MediaFrame";
import { clsx } from "clsx";
import { ArrowUpRight, Film, Sparkles, Layers } from "lucide-react";

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

  const categories = ["ALL", "COMMERCIAL", "AI FILM", "VERTICAL", "DOCUMENTARY"];

  const filteredProjects = useMemo(() => {
    if (activeCategory === "ALL") return projects;
    return projects.filter((p) =>
      p.category.toUpperCase().includes(activeCategory.replace(" ", ""))
    );
  }, [projects, activeCategory]);

  return (
    <section id="work" className="w-full bg-[var(--bg)] py-24 md:py-32 border-b border-[var(--line)]">
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--line)] pb-8">
          <div className="space-y-3 max-w-xl">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)] flex items-center gap-2">
              <Film size={13} />
              <span>SELECTED PORTFOLIO</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[var(--text)] tracking-tight">
              Featured <span className="italic text-[var(--accent)]">Work</span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              A curated selection of commercial edits, AI-augmented visual pieces, and narrative storytelling.
            </p>
          </div>

          {/* Category Filter Pills */}
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
        </div>

        {/* Portfolio Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-[var(--bg-raised)] border border-[var(--line)] rounded-xl">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
              NO PROJECTS IN THIS CATEGORY
            </p>
            <p className="font-sans text-xs text-[var(--text-faint)]">
              Select &quot;ALL&quot; to view the complete catalog.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="group flex flex-col bg-[var(--bg-raised)] border border-[var(--line)] rounded-xl overflow-hidden hover:border-[var(--line-strong)] transition-all duration-300 hover:shadow-2xl"
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
                      <span className="px-2.5 py-1 bg-[var(--bg)] border border-[var(--line)] rounded text-[var(--accent)] font-medium">
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
                      className="text-[var(--accent)] hover:underline flex items-center gap-1 font-medium"
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--bg-raised)] border border-[var(--line)] rounded-full font-mono text-xs uppercase tracking-[0.14em] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
          >
            <span>VIEW COMPLETE WORK ARCHIVE</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
