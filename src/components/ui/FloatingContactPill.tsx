"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { ArrowUpRight } from "lucide-react";

export const FloatingContactPill: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={clsx(
        "fixed bottom-8 right-8 z-50 transition-all duration-500 ease-[var(--ease-out)]",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
      )}
    >
      <Link
        href="/contact"
        className="group relative inline-flex items-center gap-3 px-5 py-2.5 bg-[var(--bg-raised)] border border-[var(--line-strong)] hover:border-[var(--accent)] text-[var(--text)] font-mono text-xs uppercase tracking-[0.1em] rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105"
      >
        <span className="w-2 h-2 rounded-full bg-[var(--signal)] animate-pulse" />
        <span>START A PROJECT</span>
        <ArrowUpRight
          size={14}
          className="text-[var(--accent)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    </div>
  );
};
