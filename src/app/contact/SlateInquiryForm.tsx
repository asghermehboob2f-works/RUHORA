"use client";

import React, { useState } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { clsx } from "clsx";

export const SlateInquiryForm: React.FC<{ contactEmail: string }> = ({ contactEmail }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "Commercial Edit",
    budget: "$5,000 – $15,000",
    timeline: "2–4 Weeks",
    deliverables: "16:9 Master + 9:16 Cutdowns",
    referenceLinks: "",
    description: "",
    commPreference: "EMAIL",
    _honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    timecode?: string;
    message?: string;
  } | null>(null);

  const projectTypes = [
    "Commercial Edit",
    "AI Visual Production",
    "YouTube / Creator Long-Form",
    "Short-Form Cinema",
    "Documentary Post",
    "Complete Post Package",
  ];

  const budgetRanges = [
    "< $5,000",
    "$5,000 – $15,000",
    "$15,000 – $30,000",
    "$30,000+",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSubmitResult(null);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setSubmitResult({ success: false, message: data.error || "Submission failed" });
        }
      } else {
        setSubmitResult({
          success: true,
          timecode: data.timecode,
          message: data.message || "We received your project.",
        });
      }
    } catch {
      setSubmitResult({
        success: false,
        message: "Network error occurred. Please try again or email directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitResult?.success) {
    return (
      <div className="bg-[var(--bg-raised)] border border-[var(--accent)] p-8 md:p-16 space-y-6 text-center max-w-2xl mx-auto">
        <div className="w-12 h-12 mx-auto rounded-full bg-[rgba(201,185,154,0.1)] border border-[var(--accent)] flex items-center justify-center text-[var(--accent)]">
          <CheckCircle2 size={24} />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
            INTAKE RECEIPT // {submitResult.timecode}
          </span>
          <h2 className="text-3xl font-serif text-[var(--text)]">We received your project.</h2>
          <p className="font-sans text-sm text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
            Our editorial directors review incoming parameters directly. A technical assessment
            will be dispatched to <span className="text-[var(--text)] font-mono">{formData.email}</span>.
          </p>
        </div>

        <div className="pt-6 border-t border-[var(--line)]">
          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              setSubmitResult(null);
              setFormData({
                name: "",
                email: "",
                company: "",
                projectType: "Commercial Edit",
                budget: "$5,000 – $15,000",
                timeline: "2–4 Weeks",
                deliverables: "",
                referenceLinks: "",
                description: "",
                commPreference: "EMAIL",
                _honeypot: "",
              });
            }}
          >
            SUBMIT ANOTHER TIMELINE SPECIFICATION
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--bg-raised)] border border-[var(--line)] p-8 md:p-16 space-y-12 max-w-4xl mx-auto"
    >
      {/* Hidden Bot Honeypot */}
      <input
        type="text"
        name="_honeypot"
        value={formData._honeypot}
        onChange={(e) => setFormData({ ...formData, _honeypot: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Production Slate Header Metadata Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[var(--bg-sunken)] border border-[var(--line)] font-mono text-[10px] uppercase text-[var(--text-faint)]">
        <div>
          <p className="text-[var(--text-muted)]">SLATE</p>
          <p className="text-[var(--accent)] font-semibold">RUHORA-INTAKE</p>
        </div>
        <div>
          <p className="text-[var(--text-muted)]">DATE</p>
          <p className="text-[var(--text)]">{new Date().toISOString().split("T")[0]}</p>
        </div>
        <div>
          <p className="text-[var(--text-muted)]">FPS</p>
          <p className="text-[var(--text)]">24.000</p>
        </div>
        <div>
          <p className="text-[var(--text-muted)]">STATUS</p>
          <p className="text-[var(--signal)]">REC READY</p>
        </div>
      </div>

      {submitResult && !submitResult.success && (
        <div className="p-4 bg-[rgba(229,67,45,0.1)] border border-[var(--signal)] text-[var(--signal)] font-mono text-xs flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{submitResult.message}</span>
        </div>
      )}

      {/* Primary Contact Block */}
      <div className="space-y-6">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
          01 // PRODUCER / CLIENT DETAILS
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="YOUR NAME"
            metaLabel="REQUIRED"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Director / Producer / Creator"
            error={errors.name?.[0]}
          />
          <Input
            label="EMAIL ADDRESS"
            metaLabel="REQUIRED"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="name@domain.com"
            error={errors.email?.[0]}
          />
        </div>

        <Input
          label="STUDIO / BRAND / CHANNEL"
          metaLabel="OPTIONAL"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          placeholder="Organization or Channel Identity"
        />
      </div>

      {/* Project Type Matrix */}
      <div className="space-y-4 pt-6 border-t border-[var(--line)]">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
          02 // PROJECT CLASSIFICATION
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {projectTypes.map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => setFormData({ ...formData, projectType: type })}
              className={clsx(
                "p-3.5 text-left border font-mono text-xs uppercase tracking-[0.06em] transition-all",
                formData.projectType === type
                  ? "bg-[var(--accent)] text-[var(--bg-sunken)] border-[var(--accent)] font-semibold"
                  : "bg-[var(--bg-sunken)] text-[var(--text-muted)] border-[var(--line)] hover:border-[var(--line-strong)] hover:text-[var(--text)]"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Budget & Timeline Selectors */}
      <div className="space-y-6 pt-6 border-t border-[var(--line)]">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
          03 // BUDGET PARAMETERS
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {budgetRanges.map((range) => (
            <button
              type="button"
              key={range}
              onClick={() => setFormData({ ...formData, budget: range })}
              className={clsx(
                "p-3 text-center border font-mono text-xs transition-all",
                formData.budget === range
                  ? "bg-[var(--accent)] text-[var(--bg-sunken)] border-[var(--accent)] font-semibold"
                  : "bg-[var(--bg-sunken)] text-[var(--text-muted)] border-[var(--line)] hover:border-[var(--line-strong)] hover:text-[var(--text)]"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Description & Reference Links */}
      <div className="space-y-6 pt-6 border-t border-[var(--line)]">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
          04 // TIMELINE SCOPE & REFERENCES
        </span>
        <Input
          label="REFERENCE LINKS / FOOTAGE SAMPLES"
          metaLabel="VIMEO / YOUTUBE / DRIVE"
          value={formData.referenceLinks}
          onChange={(e) => setFormData({ ...formData, referenceLinks: e.target.value })}
          placeholder="https://vimeo.com/... or https://youtube.com/..."
        />

        <Textarea
          label="PROJECT BRIEF & RETENTION OBJECTIVES"
          metaLabel="REQUIRED"
          required
          rows={5}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe footage volume, desired pacing, tone benchmarks, and specific deliverables needed..."
          error={errors.description?.[0]}
        />
      </div>

      {/* Submit Action */}
      <div className="pt-8 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="font-mono text-[10px] uppercase text-[var(--text-faint)]">
          OR TRANSMIT DIRECTLY TO:{" "}
          <a href={`mailto:${contactEmail}`} className="text-[var(--accent)] hover:underline">
            {contactEmail}
          </a>
        </p>

        <Button
          type="submit"
          size="lg"
          variant="primary"
          isSubmitting={isSubmitting}
          className="w-full sm:w-auto"
        >
          DISPATCH PROJECT SLATE →
        </Button>
      </div>
    </form>
  );
};
