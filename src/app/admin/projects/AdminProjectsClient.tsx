"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { clsx } from "clsx";
import { Plus, Edit2, Trash2, Check, X } from "lucide-react";

export const AdminProjectsClient: React.FC<{ initialProjects: any[] }> = ({ initialProjects }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    year: "2026",
    category: "AI Film / Post-Production",
    aspectRatio: "16:9",
    layoutVariant: "FULLBLEED",
    summary: "",
    featured: false,
    published: true,
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.project) {
        setProjects([...projects, data.project]);
        setIsCreating(false);
        setFormData({
          title: "",
          slug: "",
          year: "2026",
          category: "AI Film / Post-Production",
          aspectRatio: "16:9",
          layoutVariant: "FULLBLEED",
          summary: "",
          featured: false,
          published: true,
        });
      }
    } catch (err) {
      console.error("Create error:", err);
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
      }
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <span className="font-mono text-xs text-[var(--text-faint)]">
          {projects.length} PROJECTS REGISTERED
        </span>
        <Button size="sm" variant="primary" onClick={() => setIsCreating(!isCreating)}>
          {isCreating ? "✕ CANCEL" : "+ ADD PROJECT"}
        </Button>
      </div>

      {/* Inline Create Drawer */}
      {isCreating && (
        <form
          onSubmit={handleCreate}
          className="bg-[var(--bg-raised)] border border-[var(--accent)] p-6 md:p-8 space-y-6 animate-in fade-in duration-200"
        >
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
            // INITIALIZE NEW CASE STUDY
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="PROJECT TITLE"
              required
              value={formData.title}
              onChange={(e) => {
                const title = e.target.value;
                const slug = title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)+/g, "");
                setFormData({ ...formData, title, slug });
              }}
              placeholder="e.g. Synthetic Horizon"
            />
            <Input
              label="URL SLUG"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="e.g. synthetic-horizon"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Input
              label="YEAR"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            />
            <Input
              label="CATEGORY"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
            <div>
              <label className="font-mono text-[10px] uppercase text-[var(--text-muted)] block mb-1.5">
                ASPECT RATIO
              </label>
              <select
                value={formData.aspectRatio}
                onChange={(e) => setFormData({ ...formData, aspectRatio: e.target.value })}
                className="w-full bg-[var(--bg-sunken)] border border-[var(--line)] text-[var(--text)] px-3 py-2 text-xs font-mono rounded-[2px]"
              >
                <option value="16:9">16:9 (Cinema Standard)</option>
                <option value="21:9">21:9 (Anamorphic Wide)</option>
                <option value="9:16">9:16 (Vertical Mobile)</option>
                <option value="1:1">1:1 (Square)</option>
                <option value="4:5">4:5 (Editorial)</option>
              </select>
            </div>
          </div>

          <Textarea
            label="EXECUTIVE SUMMARY"
            rows={3}
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            placeholder="Brief narrative description of the edit and synthetic conform..."
          />

          <div className="flex gap-4">
            <Button type="submit" variant="primary" size="md">
              CREATE & INITIALIZE →
            </Button>
          </div>
        </form>
      )}

      {/* Projects Table */}
      <div className="bg-[var(--bg-raised)] border border-[var(--line)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[var(--bg-sunken)] border-b border-[var(--line)] text-[var(--text-faint)]">
              <tr>
                <th className="p-4">TITLE</th>
                <th className="p-4">CATEGORY</th>
                <th className="p-4">YEAR</th>
                <th className="p-4">RATIO</th>
                <th className="p-4">STATUS</th>
                <th className="p-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-[rgba(236,234,230,0.02)]">
                  <td className="p-4 font-semibold text-[var(--text)]">
                    {p.title}
                    {p.isDemo && (
                      <span className="ml-2 px-1.5 py-0.5 bg-[rgba(201,185,154,0.1)] border border-[var(--accent)] text-[9px] text-[var(--accent)]">
                        DEMO
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-[var(--text-muted)]">{p.category}</td>
                  <td className="p-4 text-[var(--text-faint)]">{p.year}</td>
                  <td className="p-4 text-[var(--text-faint)]">{p.aspectRatio}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleTogglePublish(p.id, p.published)}
                      className={clsx(
                        "px-2 py-0.5 border text-[10px]",
                        p.published
                          ? "bg-[rgba(201,185,154,0.1)] border-[var(--accent)] text-[var(--accent)]"
                          : "bg-[var(--bg-sunken)] border-[var(--line)] text-[var(--text-faint)]"
                      )}
                    >
                      {p.published ? "PUBLISHED" : "DRAFT"}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/work/${p.slug}`}
                      target="_blank"
                      className="text-[var(--accent)] hover:underline mr-4"
                    >
                      VIEW LIVE →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
