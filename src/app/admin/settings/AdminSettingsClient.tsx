"use client";

import React, { useState } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ShieldAlert } from "lucide-react";

export const AdminSettingsClient: React.FC<{ initialSite: any }> = ({ initialSite }) => {
  const [formData, setFormData] = useState({
    brandName: initialSite.brandName || "RUHORA",
    tagline: initialSite.tagline || "Obsessed with the quality of the frame.",
    heroHeadline: initialSite.heroHeadline || "Creative Video Editing & Visual Post Direction",
    statementText: initialSite.statementText || "A specialized visual production and AI post studio.",
    accentColor: initialSite.accentColor || "#C9B99A",
    contactEmail: initialSite.contactEmail || "inquiry@ruhora.com",
    footerClosing: initialSite.footerClosing || "HAVE SOMETHING WORTH *MAKING*?",
    founderName: initialSite.founderName || "Roo",
    founderBio: initialSite.founderBio || "Director & Lead Editor specializing in narrative pacing, commercial visual post, and synthetic media pipelines.",
    founderSocials: initialSite.founderSocials ? (typeof initialSite.founderSocials === "string" ? initialSite.founderSocials : JSON.stringify(initialSite.founderSocials, null, 2)) : '{\n  "x": "https://x.com",\n  "instagram": "https://instagram.com",\n  "youtube": "https://youtube.com"\n}',
  });

  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSaved(false);

    try {
      const payload = {
        ...formData,
        founderSocials: typeof formData.founderSocials === "string" ? formData.founderSocials : JSON.stringify(formData.founderSocials),
      };

      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 4000);
      }
    } catch (err) {
      console.error("Save settings error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[var(--bg-raised)] border border-[var(--line)] rounded-xl p-6 sm:p-10 space-y-8 shadow-xl">
      {isSaved && (
        <div className="p-4 bg-[rgba(201,185,154,0.1)] border border-[var(--accent)] rounded-lg font-mono text-xs text-[var(--accent)] flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>✓ GLOBAL SETTINGS UPDATED & COMMITTED TO DATABASE.</span>
        </div>
      )}

      {/* Brand Identity */}
      <div className="space-y-6">
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
          01 // BRAND & IDENTITY
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="BRAND NAME"
            required
            value={formData.brandName}
            onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
          />
          <Input
            label="ACCENT COLOR (HEX)"
            required
            value={formData.accentColor}
            onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
          />
        </div>

        <Input
          label="POSITIONING TAGLINE"
          value={formData.tagline}
          onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
        />
      </div>

      {/* Copy & Statements */}
      <div className="space-y-6 pt-6 border-t border-[var(--line)]">
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
          02 // EDITORIAL COPY & HEADLINES
        </span>

        <Input
          label="HERO HEADLINE"
          value={formData.heroHeadline}
          onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
        />

        <Textarea
          label="STUDIO STATEMENT / MANIFESTO TEXT"
          rows={3}
          value={formData.statementText}
          onChange={(e) => setFormData({ ...formData, statementText: e.target.value })}
        />

        <Input
          label="FOOTER CLOSING CTA (USE *TEXT* FOR ITALIC ACCENT)"
          value={formData.footerClosing}
          onChange={(e) => setFormData({ ...formData, footerClosing: e.target.value })}
        />
      </div>

      {/* Founder & Inquiries */}
      <div className="space-y-6 pt-6 border-t border-[var(--line)]">
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
          03 // FOUNDER PROFILE & CONTACT
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="FOUNDER NAME"
            value={formData.founderName}
            onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
          />
          <Input
            label="CONTACT EMAIL"
            type="email"
            value={formData.contactEmail}
            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
          />
        </div>

        <Textarea
          label="FOUNDER BIOGRAPHY"
          rows={3}
          value={formData.founderBio}
          onChange={(e) => setFormData({ ...formData, founderBio: e.target.value })}
        />

        <Textarea
          label="FOUNDER SOCIAL LINKS (JSON FORMAT)"
          rows={4}
          value={formData.founderSocials}
          onChange={(e) => setFormData({ ...formData, founderSocials: e.target.value })}
          helperText='Example: {"x": "https://x.com", "instagram": "https://instagram.com"}'
        />
      </div>

      <div className="pt-6 border-t border-[var(--line)] flex justify-end">
        <Button type="submit" size="md" variant="primary" isSubmitting={isSubmitting}>
          COMMIT SYSTEM SETTINGS →
        </Button>
      </div>
    </form>
  );
};
