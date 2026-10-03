"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MediaFrame } from "@/components/media/MediaFrame";
import { clsx } from "clsx";

export interface IndexProject {
  id: string;
  title: string;
  slug: string;
  year: string;
  category: string;
  aspectRatio: string;
  heroPosterUrl?: string | null;
  hoverVideoUrl?: string | null;
}

export const ProjectIndexSection: React.FC<{ projects: IndexProject[] }> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [hoveredProject, setHoveredProject] = useState<IndexProject | null>(null);

  const categories = ["ALL", "AI FILM", "COMMERCIAL", "VERTICAL", "DOCUMENTARY"];

  const filteredProjects =
    activeCategory === "ALL"
      ? projects
      : projects.filter((p) =>
          p.category.toUpperCase().includes(activeCategory.replace(" ", ""))
        );

  return (
    <section id="index" className="w-full container-full mx-auto py-24 md:py-32 border-b border-[var(--line)] space-y-16">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)] border-b border-[var(--line)] pb-4">
        <span>04 // PROJECT INDEX</span>
        <span>TYPOGRAPHIC ARCHIVE</span>
      </div>

      {/* Inline Category Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={clsx(
              "font-mono text-xs uppercase tracking-[0.1em] px-4 py-2 border transition-all duration-200",
              activeCategory === cat
                ? "bg-[var(--accent)] text-[var(--bg-sunken)] border-[var(--accent)] font-semibold"
                : "bg-transparent text-[var(--text-muted)] border-[var(--line)] hover:border-[var(--line-strong)] hover:text-[var(--text)]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Typographic Index List with Hover Preview Dock */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {filteredProjects.map((project, idx) => {
            const timecode = `00:0${idx + 1}:22:04`;

            return (
              <Link
                key={project.id}
                href={`/work/${project.slug}`}
                onMouseEnter={() => setHoveredProject(project)}
                className="group flex flex-col sm:flex-row sm:items-center justify-between py-8 transition-colors duration-300 hover:bg-[rgba(236,234,230,0.02)] px-4"
              >
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-[var(--text-faint)] uppercase group-hover:text-[var(--accent)] transition-colors">
                    {timecode} // {project.category}
                  </span>
                  <h4 className="text-2xl sm:text-4xl font-serif text-[var(--text)] transition-transform duration-300 group-hover:translate-x-3 group-hover:text-[var(--accent)]">
                    {project.title}
                  </h4>
                </div>

                <div className="flex items-center gap-6 mt-4 sm:mt-0 font-mono text-xs text-[var(--text-faint)] group-hover:text-[var(--text)]">
                  <span>{project.year}</span>
                  <span className="text-[var(--accent)] transition-transform group-hover:translate-x-1">
                    VIEW →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Right-Side Media Dock Preview */}
        <div className="hidden lg:block lg:col-span-4 sticky top-28 space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
            LIVE FRAME PREVIEW
          </span>
          <MediaFrame
            aspectRatio="16:9"
            posterUrl={hoveredProject?.heroPosterUrl}
            hoverVideoUrl={hoveredProject?.hoverVideoUrl}
            timecode="00:00:24:00"
            cursorLabel="OPEN"
          />
          {hoveredProject && (
            <div className="font-mono text-[11px] text-[var(--text-muted)] space-y-1">
              <p className="text-[var(--text)] font-semibold">{hoveredProject.title}</p>
              <p>{hoveredProject.category} // {hoveredProject.year}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
