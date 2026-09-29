"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { Button } from "@/components/ui/Button";

export interface NavItem {
  label: string;
  href: string;
  isCta?: boolean;
}

export interface NavShellProps {
  brandName?: string;
  navItems?: NavItem[];
}

export const NavShell: React.FC<NavShellProps> = ({
  brandName = "RUHORA",
  navItems = [
    { label: "WORK", href: "/work" },
    { label: "CAPABILITIES", href: "/capabilities" },
    { label: "STUDIO", href: "/studio" },
    { label: "CREATIVE", href: "/creative" },
    { label: "SHOWREEL", href: "/showreel" },
    { label: "START A PROJECT", href: "/contact", isCta: true },
  ],
}) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled past threshold
      if (currentScrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isVisible ? "translate-y-0" : "-translate-y-full",
          isScrolled
            ? "bg-[rgba(11,11,12,0.85)] backdrop-blur-md border-b border-[var(--line)] py-3.5"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-[1680px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo / Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus-visible:outline-none"
          >
            <span className="w-2 h-2 bg-[var(--signal)] rounded-full animate-pulse" />
            <span className="font-mono text-sm tracking-[0.14em] uppercase font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
              {brandName}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems
              .filter((item) => !item.isCta)
              .map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={clsx(
                      "font-mono text-[11px] uppercase tracking-[0.1em] transition-colors relative py-1 group",
                      isActive
                        ? "text-[var(--text)] font-semibold"
                        : "text-[var(--text-muted)] hover:text-[var(--text)]"
                    )}
                  >
                    <span>{item.label}</span>
                    <span
                      className={clsx(
                        "absolute bottom-0 left-0 w-full h-[1px] bg-[var(--accent)] transition-transform duration-300 ease-[var(--ease-out)]",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                );
              })}
          </nav>

          {/* Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-4">
            {navItems.find((item) => item.isCta) && (
              <Link
                href={navItems.find((item) => item.isCta)!.href}
                className="hidden sm:inline-block"
              >
                <Button size="sm" variant="primary">
                  {navItems.find((item) => item.isCta)!.label}
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[var(--text)] font-mono text-[10px] uppercase tracking-[0.1em] border border-[var(--line)] bg-[var(--bg-raised)]"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? "CLOSE [ESC]" : "MENU"}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[var(--bg-sunken)] flex flex-col justify-between p-8 md:p-16 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-6">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-mono text-sm tracking-[0.14em] uppercase font-bold text-[var(--text)]"
            >
              {brandName}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent)] border border-[var(--line-strong)] px-3 py-1"
            >
              CLOSE ✕
            </button>
          </div>

          <nav className="flex flex-col space-y-6 my-auto">
            {navItems.map((item, idx) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-baseline justify-between text-2xl sm:text-4xl font-serif text-[var(--text)] hover:text-[var(--accent)] transition-colors border-b border-[var(--line)] pb-4"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-[var(--text-faint)] group-hover:text-[var(--accent)] tracking-[0.1em]">
                  0{idx + 1}
                </span>
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-[var(--line)] flex justify-between items-center text-xs font-mono text-[var(--text-faint)]">
            <span>TC 00:00:00:00</span>
            <span>TIMELESS EDITORIAL</span>
          </div>
        </div>
      )}
    </>
  );
};
