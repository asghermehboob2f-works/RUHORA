"use client";

import React from "react";
import { clsx } from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "slate";
  size?: "sm" | "md" | "lg";
  isSubmitting?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isSubmitting = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.08em] transition-all duration-200 focus-visible:outline-1 focus-visible:outline-[var(--accent)] disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden group";

    const sizeStyles = {
      sm: "px-3 py-1.5 min-h-[32px]",
      md: "px-5 py-2.5 min-h-[42px]",
      lg: "px-7 py-3.5 min-h-[50px]",
    };

    const variantStyles = {
      primary:
        "bg-[var(--accent)] text-[var(--bg-sunken)] font-medium hover:bg-[#D5C7AB] active:bg-[#BDB092]",
      secondary:
        "bg-transparent border border-[var(--line-strong)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
      ghost:
        "bg-transparent text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[rgba(236,234,230,0.03)]",
      slate:
        "bg-[var(--bg-raised)] border border-[var(--line)] text-[var(--text)] hover:border-[var(--line-strong)]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isSubmitting}
        className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {/* Text Swap Hover Effect for Primary and Secondary */}
        {variant === "primary" || variant === "secondary" ? (
          <span className="relative inline-block overflow-hidden h-[1.2em]">
            <span className="inline-block transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-full">
              {isSubmitting ? "PROCESSING..." : children}
            </span>
            <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-y-0 text-inherit">
              {isSubmitting ? "PROCESSING..." : children}
            </span>
          </span>
        ) : (
          <span>{isSubmitting ? "PROCESSING..." : children}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
