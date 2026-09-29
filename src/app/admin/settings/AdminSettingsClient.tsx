"use client";

import React, { useState } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export const AdminSettingsClient: React.FC<{ initialSite: any }> = ({ initialSite }) => {
  const [formData, setFormData] = useState({
    brandName: initialSite.brandName || "RUHORA",
    tagline: initialSite.tagline || "Obsessed with the quality of the frame.",
    heroHeadline: initialSite.heroHeadline || "WE CUT. WE SHAPE. WE MAKE *VISUALS* MOVE.",
    statementText: initialSite.statementText || "",
    accentColor: initialSite.accentColor || "#C9B99A",
    contactEmail: initialSite.contactEmail || "inquiry@ruhora.com",
    footerClosing: initialSite.footerClosing || "HAVE SOMETHING WORTH *MAKING*?",
    founderName: initialSite.founderName || "Roo",
    founderBio: initialSite.founderBio || "",
  });

  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSaved(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      }
    } catch (err) {
      console.error("Save settings error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[var(--bg-raised)] border border-[var(--line)] p-8 space-y-8">
      {isSaved && (
        <div className="p-4 bg-[rgba(201,185,154,0.1)] border border-[var(--accent)] font-mono text-xs text-[var(--accent)]">
          ✓ GLOBAL SETTINGS UPDATED & COMMITTED.
        </div>
      )}

      <div className="space-y-6">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
          01 // BRAND IDENTITY
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="BRAND WORKING NAME"
            metaLabel="GLOBAL CONFIG"
            required
            value={formData.brandName}
            onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
          />
          <Input
            label="ACCENT HEX COLOR"
            metaLabel="CHAMPAGNE"
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

      <div className="space-y-6 pt-6 border-t border-[var(--line)]">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
          02 // EDITORIAL COPY CANDIDATES
        </span>

        <Input
          label="HERO HEADLINE (USE *FOR EMPHASIS*)"
          value={formData.heroHeadline}
          onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
        />

        <Textarea
          label="STATEMENT PARAGRAPH"
          rows={3}
          value={formData.statementText}
          onChange={(e) => setFormData({ ...formData, statementText: e.target.value })}
        />

        <Input
          label="FOOTER CLOSING CTA (USE *FOR EMPHASIS*)"
          value={formData.footerClosing}
          onChange={(e) => setFormData({ ...formData, footerClosing: e.target.value })}
        />
      </div>

      <div className="space-y-6 pt-6 border-t border-[var(--line)]">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
          03 // OPERATIONS & FOUNDER
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="CONTACT EMAIL"
            type="email"
            value={formData.contactEmail}
            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
          />
          <Input
            label="FOUNDER NAME"
            value={formData.founderName}
            onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
          />
        </div>

        <Textarea
          label="FOUNDER BIOGRAPHY"
          rows={3}
          value={formData.founderBio}
          onChange={(e) => setFormData({ ...formData, founderBio: e.target.value })}
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
