"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { clsx } from "clsx";

export interface LinkUnderlineProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export const LinkUnderline: React.FC<LinkUnderlineProps> = ({
  href,
  children,
  className,
  external = false,
  ...props
}) => {
  const content = (
    <span className="relative inline-block group cursor-pointer overflow-hidden py-0.5">
      <span className="inline-block transition-colors duration-200 group-hover:text-[var(--text)]">
        {children}
      </span>
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--accent)] origin-left scale-x-0 transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-x-100" />
    </span>
  );

  if (external || (typeof href === "string" && href.startsWith("http"))) {
    return (
      <a
        href={href.toString()}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx("inline-block text-[var(--text-muted)]", className)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={clsx("inline-block text-[var(--text-muted)]", className)} {...props}>
      {content}
    </Link>
  );
};
