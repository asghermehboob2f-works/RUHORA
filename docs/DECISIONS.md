# RUHORA — Architecture & Design Decisions Log

This document records architectural and technical decisions made during the build process.

## Decision Log

### 2026-09-29 — Initial Architecture Stack
- **Decision:** Next.js 15 (App Router) + TypeScript Strict + Tailwind CSS + Prisma ORM + PostgreSQL.
- **Rationale:** Standardized high-performance server component architecture with end-to-end type safety and zero client runtime bloat.

### 2026-09-29 — Motion Strategy & Smooth Scroll
- **Decision:** Lenis smooth scrolling (client-only, dynamically imported) + GSAP ScrollTrigger for section cuts/playhead; pure CSS for micro-interactions.
- **Rationale:** Guarantees 60fps on mid-range devices while fully honoring `prefers-reduced-motion`.
