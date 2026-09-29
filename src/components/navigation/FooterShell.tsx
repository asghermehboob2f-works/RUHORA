"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export interface FooterShellProps {
  brandName?: string;
  closingHeadline?: string;
  contactEmail?: string;
}

export const FooterShell: React.FC<FooterShellProps> = ({
  brandName = "RUHORA",
  closingHeadline = "HAVE SOMETHING WORTH *MAKING*?",
  contactEmail = "inquiry@ruhora.com",
}) => {
  return (
    <footer className="w-full bg-[var(--bg-sunken)] border-t border-[var(--line)] pt-24 pb-12 overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 space-y-20">
        {/* Massive Closing Frame Call to Action */}
        <div className="space-y-8 max-w-4xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
            // CLOSING FRAME
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-tight text-[var(--text)] leading-[0.95]">
            {closingHeadline.split("*").map((chunk, idx) =>
              idx % 2 === 1 ? (
                <span key={idx} className="italic text-[var(--accent)]">
                  {chunk}
                </span>
              ) : (
                chunk
              )
            )}
          </h2>
          <div>
            <Link href="/contact">
              <Button size="lg" variant="primary">
                START A PROJECT →
              </Button>
            </Link>
          </div>
        </div>

        {/* Structured Editorial Links & Studio Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-12 border-t border-[var(--line)]">
          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-faint)]">
              NAVIGATION
            </p>
            <ul className="space-y-2 font-mono text-xs text-[var(--text-muted)]">
              <li>
                <Link href="/work" className="hover:text-[var(--text)] transition-colors">
                  WORK ARCHIVE
                </Link>
              </li>
              <li>
                <Link href="/capabilities" className="hover:text-[var(--text)] transition-colors">
                  CAPABILITIES
                </Link>
              </li>
              <li>
                <Link href="/studio" className="hover:text-[var(--text)] transition-colors">
                  THE STUDIO
                </Link>
              </li>
              <li>
                <Link href="/creative" className="hover:text-[var(--text)] transition-colors">
                  CREATIVE DIRECTORY
                </Link>
              </li>
              <li>
                <Link href="/showreel" className="hover:text-[var(--text)] transition-colors">
                  CINEMA SHOWREEL
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-faint)]">
              INQUIRIES
            </p>
            <div className="space-y-2 font-mono text-xs text-[var(--text-muted)]">
              <p>DIRECT PRODUCTION LINE</p>
              <a
                href={`mailto:${contactEmail}`}
                className="text-[var(--accent)] hover:underline block"
              >
                {contactEmail}
              </a>
              <p className="text-[var(--text-faint)] pt-2">GLOBAL CLIENTS / UTC & IST</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-faint)]">
              SYNTHETIC POST
            </p>
            <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed">
              Classical timeline pacing merged with generative visual pipelines. Every frame holds
              weight.
            </p>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-faint)]">
              SYSTEM
            </p>
            <div className="space-y-1 font-mono text-[11px] text-[var(--text-faint)]">
              <p>TIMECODE 00:00:00:00</p>
              <p>FRAME RATE 24.000 FPS</p>
              <p>AUDIO 48.000 KHZ / 24-BIT</p>
              <p className="text-[var(--accent)] pt-2">DARK-FIRST TIMELINE</p>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--line)] font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
          <div>
            © {new Date().getFullYear()} {brandName} STUDIO. ALL RIGHTS RESERVED.
          </div>
          <div>OBSESSED WITH THE QUALITY OF THE FRAME.</div>
        </div>
      </div>
    </footer>
  );
};
