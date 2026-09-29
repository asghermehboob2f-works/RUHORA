"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { MediaFrame } from "@/components/media/MediaFrame";
import { clsx } from "clsx";
import { Search } from "lucide-react";

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  year: string;
  category: string;
  aspectRatio: string;
  summary: string | null;
  heroPosterUrl?: string | null;
  hoverVideoUrl?: string | null;
}

export const WorkArchiveClient: React.FC<{ initialProjects: ProjectItem[] }> = ({
  initialProjects,
}) => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);

  const categories = ["ALL", "AI FILM", "COMMERCIAL", "VERTICAL", "DOCUMENTARY"];

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesCategory =
        activeCategory === "ALL" ||
        project.category.toUpperCase().includes(activeCategory.replace(" ", ""));

      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.year.includes(searchQuery);

      return matchesCategory && matchesSearch;
    });
  }, [initialProjects, activeCategory, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Filters & Command Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--line)]">
        {/* Category Toggles */}
        <div className="flex flex-wrap items-center gap-2">
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

        {/* Search Input Box */}
        <div className="relative w-full md:w-72">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-faint)]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH TIMELINES..."
            className="w-full bg-[var(--bg-raised)] border border-[var(--line)] text-[var(--text)] pl-9 pr-4 py-2 font-mono text-xs uppercase placeholder:text-[var(--text-faint)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>
      </div>

      {/* Projects List & Media Preview Dock */}
      {filteredProjects.length === 0 ? (
        <div className="py-24 text-center space-y-3 border border-[var(--line)] bg-[var(--bg-sunken)]">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
            NO PROJECTS MATCHING YOUR FILTER
          </p>
          <p className="font-sans text-xs text-[var(--text-faint)]">
            Try adjusting your search criteria or selecting ALL categories.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {filteredProjects.map((project, idx) => {
              const timecode = `00:0${idx + 1}:18:04`;

              return (
                <Link
                  key={project.id}
                  href={`/work/${project.slug}`}
                  onMouseEnter={() => setHoveredProject(project)}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between py-8 transition-colors duration-200 hover:bg-[rgba(236,234,230,0.02)] px-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3 font-mono text-[10px] text-[var(--text-faint)] uppercase">
                      <span className="text-[var(--accent)] font-medium">{timecode}</span>
                      <span>// {project.category}</span>
                      <span>// {project.aspectRatio}</span>
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-serif text-[var(--text)] transition-transform duration-300 group-hover:translate-x-3 group-hover:text-[var(--accent)]">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-6 mt-4 sm:mt-0 font-mono text-xs text-[var(--text-faint)] group-hover:text-[var(--text)]">
                    <span>{project.year}</span>
                    <span className="text-[var(--accent)] transition-transform group-hover:translate-x-1">
                      VIEW CASE →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Sticky Media Preview Dock */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28 space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
              INSPECTION DOCK
            </span>
            <MediaFrame
              aspectRatio="16:9"
              posterUrl={hoveredProject?.heroPosterUrl}
              hoverVideoUrl={hoveredProject?.hoverVideoUrl}
              timecode="00:00:24:00"
              cursorLabel="OPEN"
            />
            {hoveredProject && (
              <div className="bg-[var(--bg-raised)] border border-[var(--line)] p-4 font-mono text-xs space-y-2">
                <p className="text-[var(--text)] font-semibold">{hoveredProject.title}</p>
                <p className="text-[var(--text-muted)] text-[11px] font-sans">
                  {hoveredProject.summary}
                </p>
                <div className="flex justify-between text-[10px] text-[var(--text-faint)] pt-2 border-t border-[var(--line)]">
                  <span>RATIO: {hoveredProject.aspectRatio}</span>
                  <span className="text-[var(--accent)]">STATUS: MASTERED</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
