"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Key, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, email: "admin@ruhora.com" }),
      });

      if (!res.ok) {
        setError("Invalid master secret key. Access denied.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Authentication service error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDevKey = () => {
    setKey("ruhora-ultra-secure-development-secret-key-replace-in-prod");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-sunken)] text-[var(--text)] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-[var(--bg-raised)] border border-[var(--line)] rounded-2xl p-8 md:p-10 space-y-8 shadow-2xl">
        <div className="space-y-3 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center text-[var(--accent)]">
            <ShieldCheck size={22} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)] block">
            // RUHORA CMS & OPERATIONS
          </span>
          <h1 className="text-3xl font-serif text-[var(--text)]">Admin Console</h1>
          <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed">
            Sign in to manage your portfolio, upload videos, edit services, and update studio settings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              label="ADMIN SECRET KEY"
              type="password"
              required
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter your master secret key..."
              error={error}
            />
            
            {/* 1-Click Dev Fill */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={fillDevKey}
                className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] hover:underline cursor-pointer flex items-center gap-1"
              >
                <Sparkles size={11} />
                <span>Fill Default Key</span>
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
            isSubmitting={isSubmitting}
          >
            AUTHENTICATE & ENTER CMS →
          </Button>
        </form>

        <div className="pt-4 border-t border-[var(--line)] text-center">
          <Link
            href="/"
            className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-faint)] hover:text-[var(--text)] inline-flex items-center gap-1.5"
          >
            <span>← Return to Public Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
