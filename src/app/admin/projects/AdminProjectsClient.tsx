"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { MediaFrame } from "@/components/media/MediaFrame";
import { clsx } from "clsx";
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Video,
  Eye,
  ExternalLink,
  Film,
  Sparkles,
  Search,
} from "lucide-react";

export interface ProjectData {
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
  thumbnailUrl?: string | null;
  featured: boolean;
  published: boolean;
  isDemo?: boolean;
}

const DEFAULT_FORM: Omit<ProjectData, "id"> = {
  title: "",
  slug: "",
  year: "2026",
  category: "Commercial",
  aspectRatio: "16:9",
  layoutVariant: "FULLBLEED",
  summary: "",
  heroMediaUrl: "",
  heroPosterUrl: "",
  hoverVideoUrl: "",
  thumbnailUrl: "",
  featured: false,
  published: true,
};

export const AdminProjectsClient: React.FC<{ initialProjects: ProjectData[] }> = ({
  initialProjects,
}) => {
  const [projects, setProjects] = useState<ProjectData[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDrawer, setActiveDrawer] = useState<"CREATE" | "EDIT" | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<ProjectData, "id">>(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  const showNotification = (type: "success" | "error", text: string) => {
    setFeedbackMsg({ type, text });
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(DEFAULT_FORM);
    setActiveDrawer("CREATE");
  };

  const openEditModal = (project: ProjectData) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      slug: project.slug,
      year: project.year,
      category: project.category,
      aspectRatio: project.aspectRatio || "16:9",
      layoutVariant: project.layoutVariant || "FULLBLEED",
      summary: project.summary || "",
      heroMediaUrl: project.heroMediaUrl || "",
      heroPosterUrl: project.heroPosterUrl || "",
      hoverVideoUrl: project.hoverVideoUrl || "",
      thumbnailUrl: project.thumbnailUrl || "",
      featured: project.featured,
      published: project.published,
    });
    setActiveDrawer("EDIT");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (activeDrawer === "CREATE") {
        const res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok && data.project) {
          setProjects([data.project, ...projects]);
          setActiveDrawer(null);
          showNotification("success", `Project "${data.project.title}" created successfully!`);
        } else {
          showNotification("error", data.error || "Failed to create project");
        }
      } else if (activeDrawer === "EDIT" && editingId) {
        const res = await fetch(`/api/admin/projects/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok && data.project) {
          setProjects(projects.map((p) => (p.id === editingId ? data.project : p)));
          setActiveDrawer(null);
          showNotification("success", `Project "${data.project.title}" updated successfully!`);
        } else {
          showNotification("error", data.error || "Failed to update project");
        }
      }
    } catch (err) {
      showNotification("error", "An unexpected error occurred while saving.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (project: ProjectData) => {
    if (!confirm(`Are you sure you want to permanently delete "${project.title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== project.id));
        showNotification("success", `Project "${project.title}" deleted.`);
      } else {
        showNotification("error", "Failed to delete project.");
      }
    } catch {
      showNotification("error", "Error connecting to server.");
    }
  };

  const handleTogglePublish = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !current }),
      });
      if (res.ok) {
        setProjects(
          projects.map((p) => (p.id === id ? { ...p, published: !current } : p))
        );
        showNotification("success", `Project status set to ${!current ? "Published" : "Draft"}.`);
      }
    } catch {
      showNotification("error", "Failed to update publish state.");
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.year.includes(searchQuery)
  );

  return (
    <div className="space-y-8">
      {/* Feedback Toast */}
      {feedbackMsg && (
        <div
          className={clsx(
            "p-4 border font-mono text-xs flex items-center justify-between rounded-lg transition-all",
            feedbackMsg.type === "success"
              ? "bg-[rgba(201,185,154,0.1)] border-[var(--accent)] text-[var(--accent)]"
              : "bg-[rgba(224,90,71,0.1)] border-[var(--signal)] text-[var(--signal)]"
          )}
        >
          <span>{feedbackMsg.text}</span>
          <button onClick={() => setFeedbackMsg(null)}>✕</button>
        </div>
      )}

      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-faint)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-[var(--bg-raised)] border border-[var(--line)] text-[var(--text)] pl-9 pr-4 py-2 font-mono text-xs rounded focus:outline-none focus:border-[var(--accent)]"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--text-faint)]">
            {filteredProjects.length} OF {projects.length} PROJECTS
          </span>
          <Button size="sm" variant="primary" onClick={openCreateModal}>
            <Plus size={14} className="mr-1.5" /> ADD NEW VIDEO / PROJECT
          </Button>
        </div>
      </div>

      {/* Create / Edit Modal Drawer */}
      {activeDrawer && (
        <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.75)] backdrop-blur-sm flex items-center justify-center p-4 md:p-8 overflow-y-auto">
          <div className="w-full max-w-4xl bg-[var(--bg-raised)] border border-[var(--accent)] rounded-xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                  {activeDrawer === "CREATE" ? "// CREATE PROJECT" : "// EDIT PROJECT"}
                </span>
                <h2 className="text-2xl font-serif text-[var(--text)]">
                  {activeDrawer === "CREATE" ? "New Portfolio Entry" : formData.title || "Edit Project"}
                </h2>
              </div>
              <button
                onClick={() => setActiveDrawer(null)}
                className="p-2 text-[var(--text-muted)] hover:text-[var(--text)] text-sm font-mono border border-[var(--line)] rounded"
              >
                ✕ ESC
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Section 1: Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="PROJECT TITLE"
                  required
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = activeDrawer === "CREATE"
                      ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
                      : formData.slug;
                    setFormData({ ...formData, title, slug });
                  }}
                  placeholder="e.g. Neo Tokyo Cyberpunk Commercial"
                />

                <Input
                  label="URL SLUG (UNIQUE)"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. neo-tokyo-cyberpunk-commercial"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Input
                  label="YEAR"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="2026"
                />

                <div>
                  <label className="font-mono text-[10px] uppercase text-[var(--text-muted)] block mb-1.5">
                    CATEGORY
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[var(--bg-sunken)] border border-[var(--line)] text-[var(--text)] px-3 py-2 text-xs font-mono rounded"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="AI Film">AI Film</option>
                    <option value="Vertical">Vertical / Social Cinema</option>
                    <option value="Documentary">Documentary</option>
                    <option value="Music Video">Music Video</option>
                    <option value="Post-Production">Post-Production</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase text-[var(--text-muted)] block mb-1.5">
                    ASPECT RATIO
                  </label>
                  <select
                    value={formData.aspectRatio}
                    onChange={(e) => setFormData({ ...formData, aspectRatio: e.target.value })}
                    className="w-full bg-[var(--bg-sunken)] border border-[var(--line)] text-[var(--text)] px-3 py-2 text-xs font-mono rounded"
                  >
                    <option value="16:9">16:9 (Cinema Standard)</option>
                    <option value="9:16">9:16 (Vertical Mobile)</option>
                    <option value="21:9">21:9 (Anamorphic Wide)</option>
                    <option value="1:1">1:1 (Square)</option>
                    <option value="4:5">4:5 (Social Portrait)</option>
                  </select>
                </div>
              </div>

              {/* Section 2: Video & Media URLs */}
              <div className="bg-[var(--bg-sunken)] border border-[var(--line)] p-5 rounded-lg space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent)] font-semibold">
                  <Video size={14} />
                  <span>MEDIA & VIDEO EMBEDS</span>
                </div>

                <Input
                  label="MAIN VIDEO URL (YOUTUBE / VIMEO / DIRECT MP4)"
                  value={formData.heroMediaUrl || ""}
                  onChange={(e) => setFormData({ ...formData, heroMediaUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/... or https://domain.com/video.mp4"
                  helperText="Supports YouTube, Vimeo, direct MP4, WebM, and Cloudinary URLs."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="HOVER PREVIEW VIDEO URL (OPTIONAL MP4 LOOP)"
                    value={formData.hoverVideoUrl || ""}
                    onChange={(e) => setFormData({ ...formData, hoverVideoUrl: e.target.value })}
                    placeholder="https://domain.com/hover-preview.mp4"
                    helperText="Short silent video looping on card hover."
                  />

                  <Input
                    label="POSTER / COVER IMAGE URL (OPTIONAL)"
                    value={formData.heroPosterUrl || ""}
                    onChange={(e) => setFormData({ ...formData, heroPosterUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/... or image link"
                    helperText="Static preview cover image."
                  />
                </div>

                {/* Live Preview Box */}
                {(formData.heroMediaUrl || formData.heroPosterUrl || formData.hoverVideoUrl) && (
                  <div className="pt-3 border-t border-[var(--line)] space-y-2">
                    <span className="font-mono text-[10px] uppercase text-[var(--text-faint)]">
                      LIVE MEDIA PREVIEW
                    </span>
                    <div className="max-w-md mx-auto">
                      <MediaFrame
                        aspectRatio={formData.aspectRatio as any}
                        mediaUrl={formData.heroMediaUrl}
                        posterUrl={formData.heroPosterUrl}
                        hoverVideoUrl={formData.hoverVideoUrl}
                        timecode="00:00:24:00"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Section 3: Summary */}
              <Textarea
                label="EXECUTIVE SUMMARY / DESCRIPTION"
                rows={3}
                value={formData.summary || ""}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="Narrative brief, pacing decisions, techniques used (e.g., DaVinci Resolve conform, ComfyUI style transfer)..."
              />

              {/* Section 4: Flags */}
              <div className="flex flex-wrap items-center gap-6 pt-2 font-mono text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="accent-[var(--accent)] w-4 h-4"
                  />
                  <span>PUBLISHED (VISIBLE ON PUBLIC SITE)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="accent-[var(--accent)] w-4 h-4"
                  />
                  <span>FEATURED ON HOMEPAGE</span>
                </label>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-[var(--line)]">
                <Button type="button" variant="secondary" size="md" onClick={() => setActiveDrawer(null)}>
                  CANCEL
                </Button>
                <Button type="submit" variant="primary" size="md" isSubmitting={isSubmitting}>
                  {activeDrawer === "CREATE" ? "CREATE PROJECT →" : "SAVE CHANGES →"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects Table */}
      <div className="bg-[var(--bg-raised)] border border-[var(--line)] rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[var(--bg-sunken)] border-b border-[var(--line)] text-[var(--text-faint)]">
              <tr>
                <th className="p-4">TITLE & MEDIA</th>
                <th className="p-4">CATEGORY</th>
                <th className="p-4">YEAR</th>
                <th className="p-4">RATIO</th>
                <th className="p-4">STATUS</th>
                <th className="p-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[var(--text-faint)]">
                    No projects found matching &quot;{searchQuery}&quot;.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-[rgba(236,234,230,0.02)] transition-colors">
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-sm font-semibold text-[var(--text)]">
                            {p.title}
                          </span>
                          {p.isDemo && (
                            <span className="px-1.5 py-0.5 bg-[rgba(201,185,154,0.1)] border border-[var(--accent)] text-[9px] text-[var(--accent)] rounded">
                              DEMO
                            </span>
                          )}
                          {p.featured && (
                            <span className="px-1.5 py-0.5 bg-[rgba(70,180,120,0.1)] border border-green-500 text-[9px] text-green-400 rounded">
                              FEATURED
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-[var(--text-faint)] truncate max-w-xs">
                          {p.heroMediaUrl ? `🎬 ${p.heroMediaUrl}` : "⚠️ No video link attached"}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 text-[var(--text-muted)]">{p.category}</td>
                    <td className="p-4 text-[var(--text-faint)]">{p.year}</td>
                    <td className="p-4 text-[var(--text-faint)]">{p.aspectRatio}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleTogglePublish(p.id, p.published)}
                        className={clsx(
                          "px-2.5 py-1 border text-[10px] rounded cursor-pointer transition-colors",
                          p.published
                            ? "bg-[rgba(201,185,154,0.1)] border-[var(--accent)] text-[var(--accent)]"
                            : "bg-[var(--bg-sunken)] border-[var(--line)] text-[var(--text-faint)]"
                        )}
                      >
                        {p.published ? "✓ PUBLISHED" : "DRAFT"}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/work/${p.slug}`}
                          target="_blank"
                          title="View Live Page"
                          className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--line)] rounded hover:border-[var(--line-strong)]"
                        >
                          <ExternalLink size={13} />
                        </Link>
                        <button
                          onClick={() => openEditModal(p)}
                          title="Edit Project & Videos"
                          className="p-1.5 text-[var(--accent)] hover:bg-[var(--bg-sunken)] border border-[var(--accent)] rounded cursor-pointer"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          title="Delete Project"
                          className="p-1.5 text-[var(--signal)] hover:bg-[rgba(224,90,71,0.1)] border border-[var(--signal)] rounded cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
