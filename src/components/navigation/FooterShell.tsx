"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, Globe, Clock, ShieldCheck } from "lucide-react";

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
  const [utcTime, setUtcTime] = useState("");
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setUtcTime(
        now.toLocaleTimeString("en-US", { timeZone: "UTC", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
      setIstTime(
        now.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="w-full bg-[var(--bg-sunken)] border-t border-[var(--line)] pt-20 md:pt-32 pb-12 overflow-hidden">
      <div className="container-full mx-auto space-y-20">
        {/* Massive Closing Headline Spanning Full Display Width */}
        <div className="space-y-8 max-w-full">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span>// CLOSING FRAME & PRODUCTION INTAKE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[7vw] xl:text-[6.5vw] font-serif tracking-tight text-[var(--text)] leading-[0.92] max-w-[95vw]">
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

          <div className="pt-2 flex flex-wrap gap-4">
            <Link href="/contact">
              <Button size="lg" variant="primary" className="text-xs tracking-[0.14em]">
                START A PROJECT →
              </Button>
            </Link>
            <Link href="/showreel">
              <Button size="lg" variant="secondary" className="text-xs tracking-[0.14em]">
                WATCH REEL
              </Button>
            </Link>
          </div>
        </div>

        {/* Structured Editorial Links & Studio Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 pt-12 border-t border-[var(--line)]">
          <div className="space-y-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-faint)]">
              // DIRECTORY
            </p>
            <ul className="space-y-2.5 font-mono text-xs text-[var(--text-muted)]">
              <li>
                <Link href="/work" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                  WORK ARCHIVE
                </Link>
              </li>
              <li>
                <Link href="/capabilities" className="hover:text-[var(--accent)] transition-colors">
                  CAPABILITIES
                </Link>
              </li>
              <li>
                <Link href="/studio" className="hover:text-[var(--accent)] transition-colors">
                  THE STUDIO
                </Link>
              </li>
              <li>
                <Link href="/creative" className="hover:text-[var(--accent)] transition-colors">
                  CREATIVE DIRECTORY
                </Link>
              </li>
              <li>
                <Link href="/showreel" className="hover:text-[var(--accent)] transition-colors">
                  CINEMA SHOWREEL
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-faint)]">
              // INQUIRIES & BOOKING
            </p>
            <div className="space-y-3 font-mono text-xs text-[var(--text-muted)]">
              <p className="text-[10px] text-[var(--text-faint)]">DIRECT PRODUCTION DESK</p>
              <a
                href={`mailto:${contactEmail}`}
                className="text-[var(--accent)] hover:underline block font-semibold text-sm"
              >
                {contactEmail}
              </a>
              <p className="text-[var(--text-faint)] text-[10px]">GLOBAL TIMELINE DELIVERIES</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-faint)]">
              // WORLD CLOCKS
            </p>
            <div className="space-y-2 font-mono text-xs text-[var(--text-muted)]">
              <div className="flex justify-between items-center pr-4">
                <span className="text-[var(--text-faint)]">UTC / GMT</span>
                <span className="text-[var(--accent)]" suppressHydrationWarning>{utcTime || "00:00:00"}</span>
              </div>
              <div className="flex justify-between items-center pr-4">
                <span className="text-[var(--text-faint)]">IST (DELHI)</span>
                <span className="text-[var(--accent)]" suppressHydrationWarning>{istTime || "00:00:00"}</span>
              </div>
              <p className="text-[10px] text-[var(--text-faint)] pt-1">REMOTE DISPATCH 24/7</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-faint)]">
              // POST SPECIFICATION
            </p>
            <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed font-light">
              Classical timeline pacing merged with generative visual pipelines. Every cut calibrated for emotional velocity.
            </p>
          </div>

          <div className="space-y-4 col-span-2 sm:col-span-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-faint)]">
              // ENGINE SPECS
            </p>
            <div className="space-y-1 font-mono text-[11px] text-[var(--text-faint)]">
              <p>TIMECODE 00:00:00:00</p>
              <p>FRAME RATE 24.000 FPS</p>
              <p>AUDIO 48.000 KHZ / 24-BIT</p>
              <p className="text-[var(--accent)] pt-1">ACES COLOR MANAGED</p>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--line)] font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-faint)]">
          <div>
            © {new Date().getFullYear()} {brandName} STUDIO. ALL RIGHTS RESERVED.
          </div>
          <div className="text-[var(--accent)]">
            OBSESSED WITH THE QUALITY OF THE FRAME.
          </div>
        </div>
      </div>
    </footer>
  );
};
