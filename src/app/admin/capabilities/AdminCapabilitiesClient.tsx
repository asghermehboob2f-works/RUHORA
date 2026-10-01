"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Plus, Edit2, Trash2, CheckCircle2, X } from "lucide-react";
import { clsx } from "clsx";

export interface CapabilityItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  deliverables: string;
  isVisible: boolean;
  displayOrder: number;
}

const DEFAULT_CAP: Omit<CapabilityItem, "id"> = {
  name: "",
  slug: "",
  category: "Post-Production",
  description: "",
  deliverables: "Assembly, Pacing, Color Grade, Sound Mix",
  isVisible: true,
  displayOrder: 0,
};

export const AdminCapabilitiesClient: React.FC<{ initialCapabilities: CapabilityItem[] }> = ({
  initialCapabilities,
}) => {
  const [capabilities, setCapabilities] = useState<CapabilityItem[]>(initialCapabilities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<CapabilityItem, "id">>(DEFAULT_CAP);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(DEFAULT_CAP);
    setIsModalOpen(true);
  };

  const openEditModal = (cap: CapabilityItem) => {
    setEditingId(cap.id);
    let delivStr = "";
    try {
      const parsed = JSON.parse(cap.deliverables);
      delivStr = Array.isArray(parsed) ? parsed.join(", ") : cap.deliverables;
    } catch {
      delivStr = cap.deliverables;
    }

    setFormData({
      name: cap.name,
      slug: cap.slug,
      category: cap.category,
      description: cap.description,
      deliverables: delivStr,
      isVisible: cap.isVisible,
      displayOrder: cap.displayOrder,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const deliverablesArray = formData.deliverables
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      deliverables: JSON.stringify(deliverablesArray),
    };

    try {
      if (editingId) {
        const res = await fetch(`/api/admin/capabilities/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (res.ok && data.capability) {
          setCapabilities(
            capabilities.map((c) => (c.id === editingId ? data.capability : c))
          );
          setIsModalOpen(false);
          showToast(`Service "${data.capability.name}" updated!`);
        }
      } else {
        const res = await fetch("/api/admin/capabilities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (res.ok && data.capability) {
          setCapabilities([...capabilities, data.capability]);
          setIsModalOpen(false);
          showToast(`Service "${data.capability.name}" added!`);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (cap: CapabilityItem) => {
    if (!confirm(`Are you sure you want to delete "${cap.name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/capabilities/${cap.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCapabilities(capabilities.filter((c) => c.id !== cap.id));
        showToast(`Service "${cap.name}" deleted.`);
      }
    } catch {
      console.error("Delete error");
    }
  };

  return (
    <div className="space-y-8">
      {feedback && (
        <div className="p-4 bg-[rgba(201,185,154,0.1)] border border-[var(--accent)] rounded-lg font-mono text-xs text-[var(--accent)] flex items-center justify-between">
          <span>{feedback}</span>
          <button onClick={() => setFeedback(null)}>✕</button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <span className="font-mono text-xs text-[var(--text-faint)]">
          {capabilities.length} SERVICES / CAPABILITIES
        </span>
        <Button size="sm" variant="primary" onClick={openCreateModal}>
          <Plus size={14} className="mr-1.5" /> ADD SERVICE / CAPABILITY
        </Button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.75)] backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[var(--bg-raised)] border border-[var(--accent)] rounded-xl p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
              <h2 className="text-2xl font-serif text-[var(--text)]">
                {editingId ? "Edit Service / Capability" : "New Service / Capability"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text)] font-mono text-xs border border-[var(--line)] p-1.5 rounded"
              >
                ✕ ESC
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="SERVICE NAME"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    setFormData({ ...formData, name, slug });
                  }}
                  placeholder="e.g. Video Editing"
                />

                <Input
                  label="CATEGORY"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Post-Production / AI Visuals"
                />
              </div>

              <Textarea
                label="DESCRIPTION"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="What this service entails..."
              />

              <Input
                label="DELIVERABLES (COMMA SEPARATED)"
                value={formData.deliverables}
                onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                placeholder="Assembly & Lock, Multi-cam Sync, Pacing & Retime, Audio Polish"
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--line)]">
                <Button type="button" variant="secondary" size="md" onClick={() => setIsModalOpen(false)}>
                  CANCEL
                </Button>
                <Button type="submit" variant="primary" size="md" isSubmitting={isSubmitting}>
                  {editingId ? "SAVE CHANGES →" : "CREATE SERVICE →"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-[var(--bg-raised)] border border-[var(--line)] rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-[var(--bg-sunken)] border-b border-[var(--line)] text-[var(--text-faint)]">
            <tr>
              <th className="p-4">SERVICE NAME</th>
              <th className="p-4">CATEGORY</th>
              <th className="p-4">DESCRIPTION</th>
              <th className="p-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {capabilities.map((cap) => (
              <tr key={cap.id} className="hover:bg-[rgba(236,234,230,0.02)] transition-colors">
                <td className="p-4 font-serif text-sm font-semibold text-[var(--text)]">
                  {cap.name}
                </td>
                <td className="p-4 text-[var(--accent)]">{cap.category}</td>
                <td className="p-4 text-[var(--text-muted)] max-w-sm truncate font-sans text-xs">
                  {cap.description}
                </td>
                <td className="p-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(cap)}
                      title="Edit Service"
                      className="p-1.5 text-[var(--accent)] border border-[var(--accent)] rounded hover:bg-[var(--bg-sunken)] cursor-pointer"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(cap)}
                      title="Delete Service"
                      className="p-1.5 text-[var(--signal)] border border-[var(--signal)] rounded hover:bg-[rgba(224,90,71,0.1)] cursor-pointer"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
