"use client";

import React from "react";
import Link from "next/link";
import { Scissors, Sparkles, Palette, Volume2, ArrowRight, Cpu, Layers, Disc3 } from "lucide-react";

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
      icon: <Scissors size={22} className="text-[var(--accent)]" />,
      title: "Precision Video Editing",
      description:
        "Rhythm-first editorial cutting, multi-cam assembly, pacing control, and high-retention narrative structuring for commercial and digital formats.",
      tags: ["Assembly & Lock", "Pacing & Retime", "Multi-cam", "Commercial Cadence"],
    },
    {
      icon: <Sparkles size={22} className="text-[var(--accent)]" />,
      title: "AI Visual Post & VFX",
      description:
        "Custom generative neural workflows, style transfer, dynamic B-roll synthesis, upscaling, and hybrid live-action AI integration.",
      tags: ["ComfyUI", "Diffusion Models", "Neural Upscale", "Synthetic Frames"],
    },
    {
      icon: <Palette size={22} className="text-[var(--accent)]" />,
      title: "Color Grading & Look Dev",
      description:
        "Cinema-grade color conform in DaVinci Resolve Studio. Custom show LUTs, film emulation, tone curve balancing, and HDR delivery.",
      tags: ["DaVinci Resolve", "Film Emulation", "ACES / Color Managed", "HDR10 / SDR"],
    },
    {
      icon: <Volume2 size={22} className="text-[var(--accent)]" />,
      title: "Sound Design & Conform",
      description:
        "Frame-accurate sound effect micro-layering, audio sweetening, dialogue cleanup, and punchy spatial dynamics that elevate every cut.",
      tags: ["Soundscapes", "Audio Polish", "Master Conform", "Spatial Dynamics"],
    },
  ];

  return (
    <section id="about" className="w-full bg-[var(--bg)] py-20 md:py-32 border-b border-[var(--line)]">
      <div className="container-full mx-auto space-y-20">
        {/* Top Split Layout: Studio Philosophy & Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: About Profile (Spans 5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)] flex items-center gap-2">
                <Disc3 size={14} className="animate-spin text-[var(--accent)]" style={{ animationDuration: '8s' }} />
                <span>// STUDIO PHILOSOPHY & POST DIRECTION</span>
              </span>
              <h2 className="text-4xl sm:text-6xl font-serif text-[var(--text)] tracking-tight leading-[1.02]">
                Crafting frames that <span className="italic text-[var(--accent)]">resonate</span> across every display.
              </h2>
            </div>

            <p className="font-sans text-base sm:text-lg text-[var(--text-muted)] leading-relaxed font-light">
              {founderBio}
            </p>

            <p className="font-sans text-sm sm:text-base text-[var(--text-faint)] leading-relaxed font-light">
              We reject noisy templates and cookie-cutter trends. Instead, we treat editing as an
              architectural discipline—balancing emotional cadence, audio micro-transients, and visual
              weight to build compelling viewing experiences across widescreen and vertical platforms.
            </p>

            {/* Toolbox Badges */}
            <div className="space-y-3 pt-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
                PRODUCTION HARDWARE & ENGINE PIPELINE
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "DaVinci Resolve Studio 19",
                  "Premiere Pro CC",
                  "After Effects",
                  "ComfyUI / Stable Diffusion",
                  "ACEScct Color Space",
                  "Pro Tools / Logic Pro",
                ].map((tool) => (
                  <span
                    key={tool}
                    className="px-3.5 py-1.5 bg-[var(--bg-raised)] border border-[var(--line)] rounded-full font-mono text-[11px] text-[var(--text-muted)] hover:border-[var(--line-strong)] hover:text-[var(--text)] transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--accent)] hover:underline font-semibold"
              >
                <span>Read Full Studio Manifesto</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Column: Services Matrix (Spans 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2 pb-2 border-b border-[var(--line)]">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                // CORE SERVICE SPECIFICATIONS
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif text-[var(--text)]">
                What We Deliver
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="bg-[var(--bg-raised)] border border-[var(--line)] rounded-2xl p-6 sm:p-8 space-y-5 hover:border-[var(--line-strong)] hover:bg-[var(--bg-raised)]/90 transition-all duration-300 group shadow-sm hover:shadow-xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center group-hover:border-[var(--accent)] transition-colors">
                    {service.icon}
                  </div>

                  <h4 className="text-xl sm:text-2xl font-serif text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    {service.title}
                  </h4>

                  <p className="font-sans text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-light">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--line)]">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-[var(--bg)] border border-[var(--line)] rounded-md text-[10px] font-mono text-[var(--text-faint)]"
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
