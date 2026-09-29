# RUHORA — Studio Digital Flagship Implementation Plan

> **Status:** Awaiting User Approval (Phase 0 Checkpoint)  
> **Target Project:** Ultra-Premium Creative Editing, Post-Production & AI Visual Studio  
> **Brand Working Name:** `RUHORA` (Globally configurable via `SiteSetting` / `getSite()`)  

---

## 1. Architectural Overview & Technology Stack

| Layer | Technology | Rationale & Approach |
|---|---|---|
| **Framework** | **Next.js 15+ (App Router)** | Full React 19 / Server Components support, streaming, SEO metadata, dynamic OG image generation. |
| **Language** | **TypeScript (Strict Mode)** | End-to-end type safety with zero `any` allowance, strictly typed CMS blocks, APIs, and client-server boundaries. |
| **Styling** | **Tailwind CSS + CSS Custom Properties** | Zero-runtime CSS with custom design tokens mapped in `styles/tokens.css` (sharp geometry, warm neutral palette, precise spacing scale). |
| **Motion & Scroll** | **Lenis + GSAP (Client-only / Lazy)** | Smooth inertia scroll + ScrollTrigger for scroll-linked playhead and clip-path cuts, completely disabled under `prefers-reduced-motion`. All micro-interactions handled via native CSS. |
| **Database & ORM** | **PostgreSQL + Prisma** | Relational schema with foreign keys, join tables, full audit trail, and JSON block validations. |
| **Authentication** | **Better Auth (or Auth.js)** | Secure session cookies (`httpOnly`, `SameSite=Strict`), server-side RBAC validation on all `/admin` routes and Server Actions. |
| **Media Handling** | **Cloudflare R2 / AWS S3 + Mux / CF Stream** | Presigned URL uploads with server-side MIME/magic-byte validation. Media frame system with fallback aspect ratio placeholders. |
| **Validation** | **Zod** | Shared schemas for runtime validation of forms, environment variables (`env.ts`), API payloads, and CMS block structures. |

---

## 2. Dependency List & Justifications

### Production Dependencies
- **`next`**: Core React framework with App Router, server-rendered components, and performance optimizations.
- **`react` & `react-dom`**: UI rendering engine.
- **`@prisma/client`**: Type-safe query engine for PostgreSQL database interactions.
- **`zod`**: Runtime schema validation for forms, API endpoints, environment variables, and CMS blocks.
- **`clsx` & `tailwind-merge`**: Utility for clean conditional class composition without style conflicts.
- **`lucide-react`**: Minimal, restrained editorial UI iconography (strictly for functional controls, player, and admin).
- **`lenis`**: Smooth momentum scroll implementation for desktop editorial pacing (dynamically imported).
- **`gsap`**: High-performance scroll choreography and timeline control for signature section transitions.
- **`@dnd-kit/core` & `@dnd-kit/sortable`**: Accessible drag-and-drop system for ordering case study blocks in the CMS.
- **`@tiptap/react` & `@tiptap/starter-kit`**: Clean headless rich-text editing for editorial case study prose.
- **`better-auth`**: Production-grade authentication with Argon2id password hashing and session tokens.
- **`@upstash/ratelimit` & `@upstash/redis`**: Distributed rate limiting for inquiry submissions and authentication endpoints.

### Development Dependencies
- **`typescript`**: Static typing engine.
- **`prisma`**: CLI for migrations, introspection, and database seeding.
- **`tailwindcss` & `postcss`**: CSS processing and utility styling.
- **`eslint` & `eslint-config-next`**: Linting and code quality gates.
- **`prettier` & `prettier-plugin-tailwindcss`**: Code and class formatting.

---

## 3. Data Model (Prisma Schema Design)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  SUPERADMIN
  ADMIN
  EDITOR
}

enum LayoutVariant {
  FULLBLEED
  ASYMMETRIC
  VERTICAL
  SPLIT
  COMPACT
}

enum InquiryStatus {
  NEW
  REVIEWING
  CONTACTED
  ACTIVE
  COMPLETED
  ARCHIVED
}

enum MediaType {
  IMAGE
  VIDEO
  AUDIO
  DOCUMENT
}

model AdminUser {
  id           String        @id @default(cuid())
  email        String        @unique
  name         String
  passwordHash String
  role         Role          @default(EDITOR)
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  activityLogs ActivityLog[]
}

model SiteSetting {
  id                String   @id @default("site_config")
  brandName         String   @default("RUHORA")
  tagline           String   @default("Obsessed with the quality of the frame.")
  heroHeadline      String   @default("WE CUT. WE SHAPE. WE MAKE VISUALS MOVE.")
  statementText     String   @default("A visual production studio dedicated to the craft of the edit.")
  accentColor       String   @default("#C9B99A")
  contactEmail      String   @default("inquiry@ruhora.com")
  footerClosing     String   @default("HAVE SOMETHING WORTH MAKING?")
  founderName       String?
  founderBio        String?
  founderPhotoUrl   String?
  founderSocials    Json?
  seoDefaultTitle   String   @default("RUHORA — Visual Production Studio")
  seoDefaultDesc    String   @default("Digital flagship of a premium creative editing, post-production and AI visual production studio.")
  updatedAt         DateTime @updatedAt
}

model NavigationItem {
  id           String   @id @default(cuid())
  label        String
  href         String
  displayOrder Int      @default(0)
  isExternal   Boolean  @default(false)
  isCta        Boolean  @default(false)
  isVisible    Boolean  @default(true)
}

model Project {
  id             String         @id @default(cuid())
  title          String
  slug           String         @unique
  year           String
  category       String
  aspectRatio    String         @default("16:9")
  layoutVariant  LayoutVariant  @default(FULLBLEED)
  summary        String?
  heroMediaUrl   String?
  heroPosterUrl  String?
  thumbnailUrl   String?
  hoverVideoUrl  String?
  featured       Boolean        @default(false)
  published      Boolean        @default(false)
  isDemo         Boolean        @default(false)
  displayOrder   Int            @default(0)
  
  // SEO
  seoTitle       String?
  seoDescription String?
  ogImageUrl     String?
  noIndex        Boolean        @default(false)

  // Relationships
  clientId       String?
  client         Client?        @relation(fields: [clientId], references: [id])
  capabilities   ProjectCapability[]
  teamMembers    ProjectTeamMember[]
  blocks         ProjectBlock[]
  mediaAssets    ProjectMedia[]
  
  createdAt      DateTime       @default(now())
  updatedAt      DateTime       @updatedAt
}

model ProjectBlock {
  id           String   @id @default(cuid())
  projectId    String
  project      Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  type         String   // "Hero" | "Video" | "Image" | "Gallery" | "Text" | "Quote" | "BeforeAfter" | "FullWidthMedia" | "TwoColumnMedia" | "ProjectDetails" | "Credits" | "CTA"
  content      Json     // Strictly validated against Zod discriminated unions per type
  displayOrder Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Client {
  id          String    @id @default(cuid())
  name        String
  logoUrl     String?
  websiteUrl  String?
  description String?
  displayOrder Int      @default(0)
  isVisible   Boolean   @default(true)
  isDemo      Boolean   @default(false)
  projects    Project[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Capability {
  id           String              @id @default(cuid())
  name         String
  slug         String              @unique
  category     String              // "Production" | "AI Visuals" | "Post"
  description  String
  deliverables String[]
  displayOrder Int                 @default(0)
  isVisible    Boolean             @default(true)
  projects     ProjectCapability[]
  createdAt    DateTime            @default(now())
  updatedAt    DateTime            @updatedAt
}

model ProjectCapability {
  projectId    String
  capabilityId String
  project      Project    @relation(fields: [projectId], references: [id], onDelete: Cascade)
  capability   Capability @relation(fields: [capabilityId], references: [id], onDelete: Cascade)

  @@id([projectId, capabilityId])
}

model TeamMember {
  id             String              @id @default(cuid())
  name           String
  role           String              // "Editor", "Creative Director", "AI Artist", etc.
  specialization String?
  bio            String?
  portraitUrl    String?
  skills         String[]
  socialLinks    Json?
  displayOrder   Int                 @default(0)
  isVisible      Boolean             @default(true)
  isDemo         Boolean             @default(false)
  projects       ProjectTeamMember[]
  createdAt      DateTime            @default(now())
  updatedAt      DateTime            @updatedAt
}

model ProjectTeamMember {
  projectId    String
  teamMemberId String
  project      Project    @relation(fields: [projectId], references: [id], onDelete: Cascade)
  teamMember   TeamMember @relation(fields: [teamMemberId], references: [id], onDelete: Cascade)

  @@id([projectId, teamMemberId])
}

model Testimonial {
  id           String   @id @default(cuid())
  quote        String
  authorName   String
  authorRole   String
  company      String?
  photoUrl     String?
  displayOrder Int      @default(0)
  isVisible    Boolean  @default(true)
  isDemo       Boolean  @default(false)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model ContactInquiry {
  id              String        @id @default(cuid())
  timecode        String        // Generated intake timecode stamp e.g. "TC-00:14:02:18"
  name            String
  email           String
  company         String?
  projectType     String
  budget          String
  timeline        String
  deliverables    String?
  referenceLinks  String?
  description     String
  fileAttachmentUrl String?
  commPreference  String
  status          InquiryStatus @default(NEW)
  internalNotes   InquiryNote[]
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

model InquiryNote {
  id         String         @id @default(cuid())
  inquiryId  String
  inquiry    ContactInquiry @relation(fields: [inquiryId], references: [id], onDelete: Cascade)
  authorName String
  note       String
  createdAt  DateTime       @default(now())
}

model MediaAsset {
  id          String         @id @default(cuid())
  filename    String
  url         String
  mimeType    String
  sizeBytes   Int
  aspectRatio String?
  altText     String?
  blurhash    String?
  isDemo      Boolean        @default(false)
  projects    ProjectMedia[]
  createdAt   DateTime       @default(now())
}

model ProjectMedia {
  projectId    String
  mediaAssetId String
  project      Project    @relation(fields: [projectId], references: [id], onDelete: Cascade)
  mediaAsset   MediaAsset @relation(fields: [mediaAssetId], references: [id], onDelete: Restrict)

  @@id([projectId, mediaAssetId])
}

model ActivityLog {
  id          String    @id @default(cuid())
  userId      String?
  user        AdminUser? @relation(fields: [userId], references: [id])
  action      String    // "CREATE_PROJECT", "DELETE_MEDIA", etc.
  details     Json?
  ipAddress   String?
  createdAt   DateTime  @default(now())
}
```

---

## 4. Application Route Map

### Public Experience
- `/` — **Homepage**: Opening Letterbox → Hero → Statement → The Reel (Featured Cuts) → Project Index → Capabilities System → Creative Process → Studio Teaser → Real Proof (if populated) → Closing Slate CTA.
- `/work` — **Editorial Project Archive**: Filterable by format, capability, year; lightweight command overlay (`/`) search; cursor video previews.
- `/work/[slug]` — **Dynamic Case Study**: Block-rendered dynamic story with Before/After Scrubbers, Production Notes, Full-bleed media, Credits, and Seamless Cut to Next Project.
- `/showreel` — **Cinema View**: 100svh distraction-free media canvas with auto-hiding controls (Space/M/F hotkeys), chapter markers, and current project HUD.
- `/capabilities` — **The System**: Comprehensive capability index with interactive right-side stage inspection and dedicated AI Production chapter.
- `/studio` — **The Studio & Founder**: Narrative manifesto, operational principles, founder profile, and hardware/software setup.
- `/creative` — **Creative Directory**: Curated team index with expandable role profiles, specializations, and selected project associations.
- `/contact` — **The Slate (Inquiry Intake)**: Production slate structured form with client/budget/deadline matrix, file upload, and real-time validation.
- `/not-found` — **Custom Branded 404**: Frame counter out of sync (`FRAME NOT FOUND — 00:00:00:00 / Return to timeline`).
- `/design-system` — **(Dev-Only Route)**: Visual token catalog, component states, typography scale, inputs, and media placeholders for approval checkpoint.

### Admin Platform (`/admin`) — Protected
- `/admin/login` — Dedicated secure login with Argon2id verification and rate limiting.
- `/admin` — **Overview**: Real metrics only (recent inquiries, published vs draft counts, storage usage, activity log).
- `/admin/projects` — List, sort, filter, bulk publish, and create new projects.
- `/admin/projects/[id]/edit` — Full project editor with drag-and-drop block builder (`dnd-kit`), SEO metadata, and live preview drawer.
- `/admin/media` — Media asset gallery, validated file uploader, reference checker (prevents deleting active assets), and clipboard URL copy.
- `/admin/inquiries` — Kanban/table status management (`NEW` → `ARCHIVED`), internal note threads, and email response actions.
- `/admin/capabilities` — Capability management with deliverables lists and project association tags.
- `/admin/creative` — Team member management, role sorting, and project links.
- `/admin/clients` & `/admin/testimonials` — Real evidence management (gracefully omitted on public site if 0 items).
- `/admin/navigation` & `/admin/settings` — Global site parameters (brand name, accent color, headline copies, SEO defaults).

### API & Server Action Routes
- `POST /api/inquiries` — Public submission endpoint with Zod validation, honeypot spam protection, Upstash rate limiting, and optional Resend dispatch.
- `POST /api/upload/presign` — Authenticated presigned S3/R2 upload URL generation.
- `POST /api/auth/*` — Session lifecycle handlers.

---

## 5. Design & Motion System ("The Edit")

| Motif | Visual Execution |
|---|---|
| **Timecode (`00:00:12:04`)** | Monospace uppercase running stamp on hero metadata, project indexes, before/after handles, media placeholder frames, and 404 error frame. |
| **Playhead** | Hairline vertical scroll progress line on right viewport edge with subtle chapter ticks corresponding to page sections. |
| **Frame / Crop Marks** | Precise hairline corner brackets (`┌ ┐ └ ┘`) on hover and placeholder states, respecting true aspect ratios (16:9, 9:16, 1:1, 4:5, 21:9). |
| **Letterbox Reveal** | Hero intro sequence: twin black bars (`#080809`) retract vertically on first paint to reveal the visual canvas (single run per session). |
| **Production Slate** | Project inquiry form layout structured as a film slate header (PRODUCTION / CLIENT / SCOPE / DEADLINE / BUDGET). |
| **The Cut Transition** | Hard, crisp clip-path wipes (`--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)`) between project scenes, avoiding floaty generic fades. |

### Color Tokens (`styles/tokens.css`)
```css
:root {
  --bg:          #0B0B0C;   /* page main background */
  --bg-raised:   #111113;   /* panels, menus, elevated surfaces */
  --bg-sunken:   #080809;   /* letterbox, footer, sunken media frames */
  --line:        rgba(236, 234, 230, 0.09); /* hairlines */
  --line-strong: rgba(236, 234, 230, 0.18);
  --text:        #ECEAE6;   /* soft warm white */
  --text-muted:  #8E8C88;
  --text-faint:  #5A5956;
  --accent:      #C9B99A;   /* champagne — primary accent (CMS editable) */
  --signal:      #E5432D;   /* recording red — live/REC dot and errors only */
  
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-snap:   cubic-bezier(0.32, 0.72, 0, 1);
}
```

---

## 6. Copy Candidates (For Selection)

### Hero Headlines (Display-XL)
1. **Option 1 (The Craft):**  
   `WE CUT.`  
   `WE SHAPE.`  
   `WE MAKE *VISUALS* MOVE.`
2. **Option 2 (The Focus):**  
   `OBSESSED WITH`  
   `THE *QUALITY*`  
   `OF THE FRAME.`
3. **Option 3 (The Impact):**  
   `PRECISION EDITING.`  
   `SYNTHETIC VISUALS.`  
   `ZERO *COMPROMISE*.`

### Statement Paragraphs (Body-LG / H3)
1. **Option 1:**  
   *"We are a specialized post-production and AI visual studio. We do not mass-produce content. We partner with creators, brands, and directors who require every frame to hold weight."*
2. **Option 2:**  
   *"At the intersection of classical editing discipline and generative visual technology, RUHORA builds cinema-grade narratives for modern attention spans."*
3. **Option 3:**  
   *"Great editing is invisible until it takes your breath away. We craft pacing, texture, and visual identity for those who refuse generic output."*

### Closing CTA Statements (Display)
1. **Option 1:**  
   `HAVE SOMETHING`  
   `WORTH *MAKING*?`  
   `[ START A PROJECT → ]`
2. **Option 2:**  
   `LET'S BUILD`  
   `YOUR NEXT *FRAME*.`  
   `[ INITIATE PRODUCTION → ]`
3. **Option 3:**  
   `READY FOR`  
   `THE *CUT*?`  
   `[ START A PROJECT → ]`

---

## 7. Key Technical & Design Risks + Mitigations

| Risk | Potential Pitfall | Mitigation Strategy |
|---|---|---|
| **Heavy Media Performance** | High video bitrates causing sluggish mobile page loads or high LCP scores. | Serve static WebP/AVIF posters first; load videos only via `IntersectionObserver` when entering viewport; support `navigator.connection.saveData` to fallback to posters on constrained connections. |
| **Over-Animation / Bloat** | Unnecessary GSAP bindings causing layout jank or mobile battery drain. | Restrict GSAP strictly to scroll choreography on desktop; execute all hovers, reveals, and borders via pure hardware-accelerated CSS (`transform`, `opacity`, `clip-path`). Support `prefers-reduced-motion` everywhere. |
| **Fake Social Proof Trap** | Generating placeholder logos or fake testimonials that violate Section 12. | Strict structural demo records only (`isDemo: true`). Empty states are styled gracefully; sections with 0 verified items are completely removed from public rendering. |
| **CMS Block Builder Complexity** | Complex block combinations breaking mobile responsive layout. | Enforce strict Zod discriminated union schemas per block type; test every block component at 375px, 768px, 1440px, and 2560px on `/design-system`. |
| **Admin Security Exposure** | Unauthorized access to project management or media deletion. | Full server-side session authentication with middleware route guards, CSRF protection, and restricted asset deletion if linked to projects. |

---

## 8. Phased Execution Roadmap & Checkpoints

```
[Phase 0: Foundation] ──► [Phase 1: Design System] ──► [Phase 2: Homepage]
         │                            │                         │
         ▼                            ▼                         ▼
[Phase 3: Work & Reel] ──► [Phase 4: Studio & Slate] ──► [Phase 5: Admin CMS]
                                                                │
                                                                ▼
                                                     [Phase 6: Hardening & Audit]
```

- **Phase 0 — Plan & Foundation:** Plan review & approval $\rightarrow$ Next.js 15 App Router setup $\rightarrow$ Strict TS, ESLint $\rightarrow$ `env.ts` $\rightarrow$ Prisma schema & migrations $\rightarrow$ `getSite()` singleton $\rightarrow$ Demo seed script.  
  *Checkpoint:* Clean build, passing typecheck and lint.
- **Phase 1 — Design System & Primitives:** Token definitions, fluid typography scale, `MediaFrame` component with timecode crop marks, custom cursor, navigation shell, footer shell, and dev-only `/design-system` route.  
  *Checkpoint:* Responsive inspection at 375, 768, 1440, and 2560px.
- **Phase 2 — Homepage Experience:** Letterbox opening reveal, Hero, statement typography, The Reel (featured projects with cut transitions), index list, capabilities teaser, process sequence, and closing CTA.  
  *Checkpoint:* Lighthouse mobile report & responsive verification.
- **Phase 3 — Work, Case Studies & Showreel:** Filterable `/work` archive, dynamic `/work/[slug]` block renderer (before/after scrubber, video grids, production notes), and `/showreel` distraction-free cinema mode.  
  *Checkpoint:* Case study rendered with 3 distinct block compositions.
- **Phase 4 — Studio, Creative & The Slate:** `/studio` narrative, `/creative` team directory, capabilities catalog, structured Slate inquiry form with end-to-end validation, rate limiting, and 404 frame page.  
  *Checkpoint:* End-to-end inquiry submission test (success and validation failure).
- **Phase 5 — Admin CMS & Media Management:** Protected `/admin` panel, project drag-and-drop block builder (`dnd-kit`), media library with presigned uploads, inquiry kanban/notes, and site configuration controls.  
  *Checkpoint:* End-to-end project creation, publication, and live rendering.
- **Phase 6 — Hardening & Final Quality Audit:** Complete SEO (sitemap, robots, dynamic OG images), accessibility compliance (WCAG 2.2 AA), zero dead-code purge, and Section 14 final audit review.
