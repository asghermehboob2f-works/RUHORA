"use client";

import React from "react";
import { clsx } from "clsx";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  metaLabel?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, metaLabel, error, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <div className="flex justify-between items-center">
            <label
              htmlFor={inputId}
              className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--text-muted)]"
            >
              {label}
            </label>
            {metaLabel && (
              <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-[var(--text-faint)]">
                {metaLabel}
              </span>
            )}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "w-full bg-[var(--bg-sunken)] border text-[var(--text)] px-3.5 py-2.5 font-sans text-sm rounded-[2px] transition-colors duration-200 placeholder:text-[var(--text-faint)]",
            error
              ? "border-[var(--signal)] focus:outline-none focus:border-[var(--signal)]"
              : "border-[var(--line)] focus:outline-none focus:border-[var(--accent)] hover:border-[var(--line-strong)]",
            className
          )}
          {...props}
        />
        {error && (
          <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--signal)]">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  metaLabel?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, metaLabel, error, id, rows = 4, ...props }, ref) => {
    const textareaId = id || React.useId();

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <div className="flex justify-between items-center">
            <label
              htmlFor={textareaId}
              className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--text-muted)]"
            >
              {label}
            </label>
            {metaLabel && (
              <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-[var(--text-faint)]">
                {metaLabel}
              </span>
            )}
          </div>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={clsx(
            "w-full bg-[var(--bg-sunken)] border text-[var(--text)] p-3.5 font-sans text-sm rounded-[2px] transition-colors duration-200 placeholder:text-[var(--text-faint)] resize-y",
            error
              ? "border-[var(--signal)] focus:outline-none focus:border-[var(--signal)]"
              : "border-[var(--line)] focus:outline-none focus:border-[var(--accent)] hover:border-[var(--line-strong)]",
            className
          )}
          {...props}
        />
        {error && (
          <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--signal)]">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
