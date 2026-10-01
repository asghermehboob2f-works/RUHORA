"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ShieldCheck, Lock, Key, Mail, AlertTriangle } from "lucide-react";
import { clsx } from "clsx";

export default function AdminLoginPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"KEY" | "CREDENTIALS">("KEY");
  const [key, setKey] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const payload =
        authMode === "KEY"
          ? { key }
          : { email, password };

      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Authentication failed. Access restricted.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Authentication service error. Check connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-sunken)] text-[var(--text)] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-[var(--bg-raised)] border border-[var(--line)] rounded-2xl p-8 md:p-10 space-y-8 shadow-2xl">
        {/* Header Badge */}
        <div className="space-y-3 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center text-[var(--accent)]">
            <ShieldCheck size={22} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)] block">
            // SECURE OPERATIONS CONSOLE
          </span>
          <h1 className="text-3xl font-serif text-[var(--text)]">CMS Access</h1>
          <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed">
            Protected with HMAC-SHA256 session encryption and brute-force rate-limiting.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="grid grid-cols-2 p-1 bg-[var(--bg)] border border-[var(--line)] rounded-lg font-mono text-xs">
          <button
            type="button"
            onClick={() => {
              setAuthMode("KEY");
              setError("");
            }}
            className={clsx(
              "py-2 rounded transition-all cursor-pointer flex items-center justify-center gap-1.5",
              authMode === "KEY"
                ? "bg-[var(--accent)] text-[var(--bg-sunken)] font-semibold shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text)]"
            )}
          >
            <Key size={13} />
            <span>SECRET KEY</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode("CREDENTIALS");
              setError("");
            }}
            className={clsx(
              "py-2 rounded transition-all cursor-pointer flex items-center justify-center gap-1.5",
              authMode === "CREDENTIALS"
                ? "bg-[var(--accent)] text-[var(--bg-sunken)] font-semibold shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text)]"
            )}
          >
            <Lock size={13} />
            <span>EMAIL & PASS</span>
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-3.5 bg-[rgba(224,90,71,0.1)] border border-[var(--signal)] rounded-lg font-mono text-xs text-[var(--signal)] flex items-center gap-2">
            <AlertTriangle size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {authMode === "KEY" ? (
            <Input
              label="MASTER SECRET KEY"
              type="password"
              required
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter server ADMIN_SECRET_KEY..."
              helperText="Set via ADMIN_SECRET_KEY in server environment."
            />
          ) : (
            <div className="space-y-4">
              <Input
                label="ADMIN EMAIL"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ruhora.com"
              />
              <Input
                label="ADMIN PASSWORD"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
              />
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
            isSubmitting={isSubmitting}
          >
            SECURE LOGIN →
          </Button>
        </form>

        {/* Security Colophon */}
        <div className="pt-4 border-t border-[var(--line)] flex flex-col items-center gap-3">
          <Link
            href="/"
            className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-faint)] hover:text-[var(--text)]"
          >
            ← Return to Public Portfolio
          </Link>

          <div className="flex items-center gap-2 font-mono text-[9px] text-[var(--text-faint)]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>TLS ENCRYPTED // CONSTANT-TIME TIMING DEFENSE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
