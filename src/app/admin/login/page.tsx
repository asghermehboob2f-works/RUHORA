"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

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
        setError("Invalid master secret key. Access restricted.");
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

  return (
    <div className="min-h-screen bg-[var(--bg-sunken)] text-[var(--text)] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-[var(--bg-raised)] border border-[var(--line)] p-8 md:p-12 space-y-8">
        <div className="space-y-2 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">
            // RUHORA OPERATIONS
          </span>
          <h1 className="text-3xl font-serif text-[var(--text)]">Admin Console</h1>
          <p className="font-sans text-xs text-[var(--text-muted)]">
            Internal operations and case study management platform.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="MASTER SECRET KEY"
            metaLabel="SERVER GUARD"
            type="password"
            required
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter ADMIN_SECRET_KEY..."
            error={error}
          />

          <Button type="submit" variant="primary" size="md" className="w-full" isSubmitting={isSubmitting}>
            AUTHENTICATE & ACCESS CMS →
          </Button>
        </form>

        <div className="pt-4 border-t border-[var(--line)] text-center">
          <Link
            href="/"
            className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-faint)] hover:text-[var(--text)]"
          >
            ← RETURN TO PUBLIC DIGITAL FLAGSHIP
          </Link>
        </div>
      </div>
    </div>
  );
}
