"use client";

import React from "react";
import Link from "next/link";
import { Scissors, Sparkles, Palette, Volume2, ArrowRight } from "lucide-react";

interface AboutServicesSectionProps {
  founderName?: string | null;
  founderBio?: string | null;
}

export const AboutServicesSection: React.FC<AboutServicesSectionProps> = ({
  founderName = "Ruh",
  founderBio = "Director & Lead Editor specializing in narrative pacing, commercial visual post, and synthetic AI media pipelines.",
}) => {
  const services = [
    {
      icon: <Scissors size={20} className="text-[var(--accent)]" />,
      title: "Precision Video Editing",
      description:
        "Rhythm-first editorial cutting, multi-cam assembly, pacing control, and high-retention narrative structuring for commercial and digital formats.",
      tags: ["Assembly & Lock", "Pacing & Retime", "Multi-cam"],
    },
    {
      icon: <Sparkles size={20} className="text-[var(--accent)]" />,
      title: "AI Visual Post & VFX",
      description:
        "Custom generative neural workflows, style transfer, dynamic B-roll synthesis, upscaling, and hybrid live-action AI integration.",
      tags: ["ComfyUI", "Diffusion Models", "Neural Upscale"],
    },
    {
      icon: <Palette size={20} className="text-[var(--accent)]" />,
      title: "Color Grading & Look Dev",
      description:
        "Cinema-grade color conform in DaVinci Resolve Studio. Custom show LUTs, film emulation, tone curve balancing, and HDR delivery.",
      tags: ["DaVinci Resolve", "Film Emulation", "ACES / Color Managed"],
    },
    {
      icon: <Volume2 size={20} className="text-[var(--accent)]" />,
      title: "Sound Design & Conform",
      description:
        "Frame-accurate sound effect micro-layering, audio sweetening, dialogue cleanup, and punchy spatial dynamics that elevate every cut.",
      tags: ["Soundscapes", "Audio Polish", "Master Conform"],
    },
  ];

  return (
    <section id="about" className="w-full bg-[var(--bg)] py-24 md:py-32 border-b border-[var(--line)]">
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 space-y-20">
        {/* Top 2-Column Split: Bio & Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: About Profile */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                // ABOUT & PHILOSOPHY
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[var(--text)] tracking-tight">
                Crafting frames that <span className="italic text-[var(--accent)]">resonate</span>.
              </h2>
            </div>

            <p className="font-sans text-base text-[var(--text-muted)] leading-relaxed">
              {founderBio}
            </p>

            <p className="font-sans text-sm text-[var(--text-faint)] leading-relaxed">
              We reject noisy templates and cookie-cutter trends. Instead, we treat editing as an
              architectural discipline—balancing emotional cadence, audio micro-transients, and visual
              weight to build compelling viewing experiences.
            </p>

            {/* Toolbox Badges */}
            <div className="space-y-3 pt-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-faint)]">
                CORE TOOLKIT
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "DaVinci Resolve Studio",
                  "Premiere Pro",
                  "After Effects",
                  "ComfyUI / Stable Diffusion",
                  "Logic Pro / Pro Tools",
                ].map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 bg-[var(--bg-raised)] border border-[var(--line)] rounded-full font-mono text-[11px] text-[var(--text-muted)]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--accent)] hover:underline"
              >
                <span>Read Full Studio Manifesto</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Column: Services Matrix */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2 pb-2">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                // SERVICES & SPECIALIZATIONS
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[var(--text)]">
                What We Deliver
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="bg-[var(--bg-raised)] border border-[var(--line)] rounded-xl p-6 space-y-4 hover:border-[var(--line-strong)] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center">
                    {service.icon}
                  </div>

                  <h4 className="text-lg font-serif text-[var(--text)]">{service.title}</h4>

                  <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-[var(--bg)] border border-[var(--line)] rounded text-[10px] font-mono text-[var(--text-faint)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
