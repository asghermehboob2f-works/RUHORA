"use client";

import React, { useState, useEffect } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  Film,
  Send,
  Copy,
  Check,
  Mail,
  Layers,
  ArrowRight,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { clsx } from "clsx";

export const SlateInquiryForm: React.FC<{ contactEmail: string }> = ({ contactEmail }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "Commercial Edit",
    budget: "$5,000 – $15,000",
    timeline: "2–4 Weeks",
    deliverables: "16:9 Master (4K)",
    referenceLinks: "",
    description: "",
    commPreference: "EMAIL",
    _honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentTimecode, setCurrentTimecode] = useState("00:00:00:00");
  const [mounted, setMounted] = useState(false);

  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    timecode?: string;
    message?: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const totalFrames = frame % (24 * 60 * 60);
      const hours = Math.floor(totalFrames / (24 * 3600));
      const minutes = Math.floor((totalFrames % (24 * 3600)) / (24 * 60));
      const seconds = Math.floor((totalFrames % (24 * 60)) / 24);
      const f = totalFrames % 24;

      const pad = (n: number) => n.toString().padStart(2, "0");
      setCurrentTimecode(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(f)}`);
    }, 1000 / 24);

    return () => clearInterval(interval);
  }, []);

  const projectTypes = [
    { label: "Commercial Edit", desc: "High-cadence brand & product films" },
    { label: "AI Visual Production", desc: "Generative B-roll, style transfer & VFX" },
    { label: "YouTube / Creator Long-Form", desc: "High-retention storytelling & pacing" },
    { label: "Short-Form Cinema", desc: "Narrative festival & promotional cuts" },
    { label: "Vertical 9:16 Retention", desc: "Mobile-first cinematic short-form" },
    { label: "Complete Post Package", desc: "Edit + Color + Sound + AI VFX" },
  ];

  const budgetRanges = [
    "< $5,000",
    "$5,000 – $15,000",
    "$15,000 – $30,000",
    "$30,000+",
  ];

  const timelineOptions = [
    "Rush Delivery (< 1 Week)",
    "1–2 Weeks",
    "2–4 Weeks",
    "Flexible / Retainer",
  ];

  const deliverableFormats = [
    "16:9 Master (4K UHD)",
    "9:16 Vertical Cutdowns",
    "16:9 + 9:16 Bundle",
    "21:9 Anamorphic Widescreen",
    "Full ACES / ProRes Master Archival",
  ];

  const communicationChannels = ["EMAIL", "TELEGRAM", "WHATSAPP", "DISCORD"];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

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

  const faqs = [
    {
      q: "What is the typical turnaround timeline for a commercial cut?",
      a: "Standard commercial deliverables range between 5 to 14 business days from initial footage ingest to picture lock and final color conform. Rush turnarounds are accommodated on request.",
    },
    {
      q: "How do you handle raw footage delivery and project assets?",
      a: "We work directly with Frame.io, Google Drive, Dropbox, Aspera, or custom cloud buckets. We ingest 10-bit/12-bit RAW, BRAW, and ProRes files natively.",
    },
    {
      q: "Can we sign NDAs prior to footage transfer?",
      a: "Yes. All commercial, narrative, and unreleased client assets are handled with strict privacy protocols and NDA conformity before file transfers begin.",
    },
    {
      q: "What color grading and delivery standards do you conform to?",
      a: "All color grading is executed inside DaVinci Resolve Studio using ACES 1.3 color-managed pipelines, ensuring consistent display calibration across SDR, HDR10, Apple displays, and web platforms.",
    },
  ];

  return (
    <div className="w-full space-y-16">
      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Direct Desk, Studio Specs & FAQs (Spans 4.5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Direct Production Line Card */}
          <div className="bg-[var(--bg-raised)] border border-[var(--line)] rounded-2xl p-6 sm:p-8 space-y-6 shadow-md">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--signal)] animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)] font-semibold">
                  DIRECT DESK
                </span>
              </div>
              <span className="font-mono text-[10px] text-[var(--text-faint)]">
                RESPONSE &lt; 24H
              </span>
            </div>

            <div className="space-y-2">
              <p className="font-mono text-[10px] uppercase text-[var(--text-faint)]">
                PRODUCTION INTAKE EMAIL
              </p>
              <div className="flex items-center justify-between gap-3 p-3 bg-[var(--bg-sunken)] border border-[var(--line)] rounded-lg">
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-mono text-sm text-[var(--text)] hover:text-[var(--accent)] transition-colors truncate font-medium"
                >
                  {contactEmail}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors shrink-0 cursor-pointer"
                  title="Copy Email"
                >
                  {copiedEmail ? (
                    <Check size={16} className="text-[var(--signal)]" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
              <div className="p-3 bg-[var(--bg)] border border-[var(--line)] rounded-lg space-y-1">
                <span className="text-[10px] text-[var(--text-faint)] block">TIMEZONE</span>
                <span className="text-[var(--text)] font-semibold">GLOBAL / UTC +5:30</span>
              </div>
              <div className="p-3 bg-[var(--bg)] border border-[var(--line)] rounded-lg space-y-1">
                <span className="text-[10px] text-[var(--text-faint)] block">AVAILABILITY</span>
                <span className="text-[var(--accent)] font-semibold">ACTIVE COMMISSIONS</span>
              </div>
            </div>
          </div>

          {/* Quality Standards & Guarantees */}
          <div className="bg-[var(--bg-raised)] border border-[var(--line)] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">
                // STUDIO DIRECTIVES
              </span>
              <h3 className="text-xl font-serif text-[var(--text)]">Standard Operational Specs</h3>
            </div>

            <ul className="space-y-3 font-mono text-xs text-[var(--text-muted)]">
              <li className="flex items-start gap-2.5">
                <ShieldCheck size={16} className="text-[var(--accent)] shrink-0 mt-0.5" />
                <span>Zero template cuts. Every timeline engineered from scratch.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Film size={16} className="text-[var(--accent)] shrink-0 mt-0.5" />
                <span>DaVinci Resolve Studio ACES color conform & look dev.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Sparkles size={16} className="text-[var(--accent)] shrink-0 mt-0.5" />
                <span>Custom ComfyUI neural diffusion & synthetic visual plates.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={16} className="text-[var(--accent)] shrink-0 mt-0.5" />
                <span>Strict delivery milestones with frame-accurate versioning.</span>
              </li>
            </ul>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-[var(--bg-raised)] border border-[var(--line)] rounded-2xl p-6 sm:p-8 space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)] flex items-center gap-2">
              <HelpCircle size={14} />
              <span>COMMISSIONING FAQS</span>
            </span>

            <div className="space-y-2 divide-y divide-[var(--line)]">
              {faqs.map((faq, idx) => (
                <div key={idx} className="pt-3 first:pt-0">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-left py-2 group cursor-pointer"
                  >
                    <span className="font-serif text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors pr-2">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={15}
                      className={clsx(
                        "text-[var(--text-faint)] transition-transform duration-200 shrink-0",
                        activeFaq === idx ? "rotate-180 text-[var(--accent)]" : ""
                      )}
                    />
                  </button>
                  {activeFaq === idx && (
                    <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed pb-3 pt-1">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Full Interactive Slate Inquiry Form (Spans 7.5 cols) */}
        <div className="lg:col-span-7">
          {submitResult?.success ? (
            <div className="bg-[var(--bg-raised)] border border-[var(--accent)] rounded-3xl p-8 sm:p-14 space-y-8 text-center shadow-2xl">
              <div className="w-16 h-16 mx-auto rounded-full bg-[rgba(201,185,154,0.12)] border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] shadow-inner">
                <CheckCircle2 size={32} />
              </div>

              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                  INTAKE SLATE RECORDED // {submitResult.timecode}
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif text-[var(--text)] tracking-tight">
                  Timeline Brief Received.
                </h2>
                <p className="font-sans text-base text-[var(--text-muted)] max-w-lg mx-auto leading-relaxed font-light">
                  Our editorial directors review incoming parameters directly. A technical assessment
                  and availability confirmation will be dispatched to{" "}
                  <span className="text-[var(--accent)] font-mono font-semibold">{formData.email}</span>.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[var(--bg-sunken)] border border-[var(--line)] rounded-xl p-6 text-left font-mono text-xs space-y-2 max-w-lg mx-auto">
                <div className="flex justify-between text-[var(--text-faint)]">
                  <span>PROJECT CLASSIFICATION:</span>
                  <span className="text-[var(--text)] font-semibold">{formData.projectType}</span>
                </div>
                <div className="flex justify-between text-[var(--text-faint)]">
                  <span>BUDGET PARAMETER:</span>
                  <span className="text-[var(--text)]">{formData.budget}</span>
                </div>
                <div className="flex justify-between text-[var(--text-faint)]">
                  <span>TARGET TIMELINE:</span>
                  <span className="text-[var(--text)]">{formData.timeline}</span>
                </div>
                <div className="flex justify-between text-[var(--text-faint)]">
                  <span>DELIVERABLES:</span>
                  <span className="text-[var(--accent)]">{formData.deliverables}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center">
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
                      deliverables: "16:9 Master (4K)",
                      referenceLinks: "",
                      description: "",
                      commPreference: "EMAIL",
                      _honeypot: "",
                    });
                  }}
                >
                  SUBMIT ANOTHER TIMELINE BRIEF
                </Button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-[var(--bg-raised)] border border-[var(--line)] rounded-3xl p-6 sm:p-10 lg:p-12 space-y-10 shadow-xl"
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

              {/* Slate Clapperboard Header Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[var(--bg-sunken)] border border-[var(--line)] rounded-xl font-mono text-[10px] uppercase text-[var(--text-faint)]">
                <div>
                  <p className="text-[var(--text-muted)] text-[9px]">SLATE ID</p>
                  <p className="text-[var(--accent)] font-semibold truncate">RUHORA-INTAKE</p>
                </div>
                <div>
                  <p className="text-[var(--text-muted)] text-[9px]">DATE</p>
                  <p className="text-[var(--text)]" suppressHydrationWarning>
                    {mounted ? new Date().toISOString().split("T")[0] : "2026-10-03"}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--text-muted)] text-[9px]">TIMECODE</p>
                  <p className="text-[var(--text)]" suppressHydrationWarning>{currentTimecode}</p>
                </div>
                <div>
                  <p className="text-[var(--text-muted)] text-[9px]">STATUS</p>
                  <p className="text-[var(--signal)] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)] animate-pulse" />
                    REC READY
                  </p>
                </div>
              </div>

              {submitResult && !submitResult.success && (
                <div className="p-4 bg-[rgba(229,67,45,0.1)] border border-[var(--signal)] text-[var(--signal)] rounded-xl font-mono text-xs flex items-center gap-2.5">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{submitResult.message}</span>
                </div>
              )}

              {/* Block 1: Producer & Contact Details */}
              <div className="space-y-6">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)] flex items-center gap-2">
                  <span>01</span>
                  <span>// PRODUCER / CLIENT IDENTITY</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                  placeholder="e.g. A24 Films, Kinetics Studio, Nike, Personal Channel"
                />
              </div>

              {/* Block 2: Project Classification */}
              <div className="space-y-4 pt-6 border-t border-[var(--line)]">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)] flex items-center gap-2">
                  <span>02</span>
                  <span>// PROJECT CLASSIFICATION</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projectTypes.map((type) => (
                    <button
                      type="button"
                      key={type.label}
                      onClick={() => setFormData({ ...formData, projectType: type.label })}
                      className={clsx(
                        "p-4 text-left border rounded-xl transition-all duration-200 cursor-pointer space-y-1",
                        formData.projectType === type.label
                          ? "bg-[var(--accent)] text-[var(--bg-sunken)] border-[var(--accent)] font-semibold shadow-md"
                          : "bg-[var(--bg-sunken)] text-[var(--text-muted)] border-[var(--line)] hover:border-[var(--line-strong)] hover:text-[var(--text)]"
                      )}
                    >
                      <p className="font-mono text-xs uppercase tracking-wider">
                        {type.label}
                      </p>
                      <p
                        className={clsx(
                          "font-sans text-[11px] leading-tight",
                          formData.projectType === type.label
                            ? "text-[var(--bg-sunken)] opacity-90"
                            : "text-[var(--text-faint)]"
                        )}
                      >
                        {type.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Block 3: Budget & Turnaround Timeline */}
              <div className="space-y-6 pt-6 border-t border-[var(--line)]">
                <div className="space-y-4">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)] flex items-center gap-2">
                    <span>03</span>
                    <span>// BUDGET RANGE</span>
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {budgetRanges.map((range) => (
                      <button
                        type="button"
                        key={range}
                        onClick={() => setFormData({ ...formData, budget: range })}
                        className={clsx(
                          "py-3 px-2 text-center border rounded-xl font-mono text-xs transition-all duration-200 cursor-pointer",
                          formData.budget === range
                            ? "bg-[var(--accent)] text-[var(--bg-sunken)] border-[var(--accent)] font-semibold shadow-md"
                            : "bg-[var(--bg-sunken)] text-[var(--text-muted)] border-[var(--line)] hover:border-[var(--line-strong)] hover:text-[var(--text)]"
                        )}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)] flex items-center gap-2">
                    <span>04</span>
                    <span>// ESTIMATED TIMELINE</span>
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {timelineOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setFormData({ ...formData, timeline: opt })}
                        className={clsx(
                          "py-3 px-2 text-center border rounded-xl font-mono text-xs transition-all duration-200 cursor-pointer",
                          formData.timeline === opt
                            ? "bg-[var(--accent)] text-[var(--bg-sunken)] border-[var(--accent)] font-semibold shadow-md"
                            : "bg-[var(--bg-sunken)] text-[var(--text-muted)] border-[var(--line)] hover:border-[var(--line-strong)] hover:text-[var(--text)]"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Block 4: Delivery Formats */}
              <div className="space-y-4 pt-6 border-t border-[var(--line)]">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)] flex items-center gap-2">
                  <span>05</span>
                  <span>// CORE DELIVERABLE SPEC</span>
                </span>

                <div className="flex flex-wrap gap-2">
                  {deliverableFormats.map((fmt) => (
                    <button
                      type="button"
                      key={fmt}
                      onClick={() => setFormData({ ...formData, deliverables: fmt })}
                      className={clsx(
                        "px-4 py-2 border rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer",
                        formData.deliverables === fmt
                          ? "bg-[var(--accent)] text-[var(--bg-sunken)] border-[var(--accent)] font-semibold"
                          : "bg-[var(--bg-sunken)] text-[var(--text-muted)] border-[var(--line)] hover:border-[var(--line-strong)] hover:text-[var(--text)]"
                      )}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Block 5: Description & Reference Links */}
              <div className="space-y-6 pt-6 border-t border-[var(--line)]">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)] flex items-center gap-2">
                  <span>06</span>
                  <span>// PROJECT BRIEF & REFERENCES</span>
                </span>

                <Input
                  label="FOOTAGE LINKS / REFERENCE BENCHMARKS"
                  metaLabel="VIMEO / DRIVE / FRAME.IO"
                  value={formData.referenceLinks}
                  onChange={(e) => setFormData({ ...formData, referenceLinks: e.target.value })}
                  placeholder="https://vimeo.com/... or https://drive.google.com/..."
                />

                <Textarea
                  label="PROJECT BRIEF & NARRATIVE CADENCE"
                  metaLabel="REQUIRED"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your footage volume, desired pacing/cadence, audio requirements, tone references, and target delivery deadline..."
                  error={errors.description?.[0]}
                />
              </div>

              {/* Block 6: Preferred Communication Channel */}
              <div className="space-y-4 pt-6 border-t border-[var(--line)]">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)] flex items-center gap-2">
                  <span>07</span>
                  <span>// PREFERRED DISPATCH CHANNEL</span>
                </span>

                <div className="flex flex-wrap gap-2">
                  {communicationChannels.map((channel) => (
                    <button
                      type="button"
                      key={channel}
                      onClick={() => setFormData({ ...formData, commPreference: channel })}
                      className={clsx(
                        "px-4 py-2 border rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer",
                        formData.commPreference === channel
                          ? "bg-[var(--accent)] text-[var(--bg-sunken)] border-[var(--accent)] font-semibold"
                          : "bg-[var(--bg-sunken)] text-[var(--text-muted)] border-[var(--line)] hover:border-[var(--line-strong)] hover:text-[var(--text)]"
                      )}
                    >
                      {channel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit & Dispatch Action Bar */}
              <div className="pt-8 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-left">
                  <p className="font-mono text-xs text-[var(--text)] font-semibold">
                    DIRECTORIAL REVIEW SLA
                  </p>
                  <p className="font-sans text-[11px] text-[var(--text-faint)]">
                    All incoming slates reviewed personally within 24 hours.
                  </p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  isSubmitting={isSubmitting}
                  className="w-full sm:w-auto text-xs tracking-[0.14em]"
                >
                  DISPATCH PRODUCTION BRIEF →
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
