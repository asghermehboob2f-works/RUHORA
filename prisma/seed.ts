import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const iterations = 100000;
  const keyLen = 64;
  const digest = "sha512";
  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, keyLen, digest)
    .toString("hex");
  return `pbkdf2$${iterations}$${salt}$${hash}`;
}

async function main() {
  console.log("🌱 Seeding RUHORA database with structural demo records & secure admin...");

  // 0. Default Admin User (admin@ruhora.com / admin12345)
  await prisma.adminUser.upsert({
    where: { email: "admin@ruhora.com" },
    update: {},
    create: {
      email: "admin@ruhora.com",
      name: "Ruh Admin",
      passwordHash: hashPassword("admin12345"),
      role: "SUPERADMIN",
    },
  });

  // 1. Site Configuration
  await prisma.siteSetting.upsert({
    where: { id: "site_config" },
    update: {
      founderName: "Ruh",
    },
    create: {
      id: "site_config",
      brandName: "RUHORA",
      tagline: "Obsessed with the quality of the frame.",
      heroHeadline: "Creative Video Editing & Visual Post Direction",
      statementText:
        "We are a specialized post-production and AI visual studio. We do not mass-produce content. We partner with creators, brands, and directors who require every frame to hold weight.",
      accentColor: "#C9B99A",
      contactEmail: "inquiry@ruhora.com",
      footerClosing: "HAVE SOMETHING WORTH *MAKING*?",
      founderName: "Ruh",
      founderBio:
        "Director & Lead Editor specializing in narrative pacing, commercial visual post, and synthetic media pipelines.",
      founderSocials: JSON.stringify({
        x: "https://x.com",
        instagram: "https://instagram.com",
        youtube: "https://youtube.com",
      }),
      seoDefaultTitle: "RUHORA — Visual Production & AI Post Studio",
      seoDefaultDesc:
        "Digital flagship of a premium creative editing, post-production and AI visual production studio.",
    },
  });

  // 2. Navigation Items
  const navItems = [
    { label: "WORK", href: "/work", displayOrder: 1, isCta: false },
    { label: "CAPABILITIES", href: "/capabilities", displayOrder: 2, isCta: false },
    { label: "STUDIO", href: "/studio", displayOrder: 3, isCta: false },
    { label: "SHOWREEL", href: "/showreel", displayOrder: 4, isCta: false },
    { label: "START A PROJECT", href: "/contact", displayOrder: 5, isCta: true },
  ];

  for (const item of navItems) {
    const existing = await prisma.navigationItem.findFirst({
      where: { label: item.label },
    });
    if (!existing) {
      await prisma.navigationItem.create({ data: item });
    }
  }

  // 3. Capabilities System
  const capabilities = [
    {
      name: "Precision Video Editing",
      slug: "precision-video-editing",
      category: "Post-Production",
      description: "Rhythm-first editorial cutting, multi-cam assembly, pacing control, and high-retention narrative structuring for commercial and digital formats.",
      deliverables: JSON.stringify(["Assembly & Picture Lock", "Multi-cam Sync", "Pacing & Retime", "Audio Polish"]),
      displayOrder: 1,
    },
    {
      name: "AI Visual Production & VFX",
      slug: "ai-visual-production-vfx",
      category: "Synthetic Media",
      description: "Generative video, synthetic environment design, style transfer, and neural upscaling pipelines with director-level taste.",
      deliverables: JSON.stringify(["Generative Concept B-roll", "Style Transfer", "Neural Upscaling", "Synthetic Backdrops"]),
      displayOrder: 2,
    },
    {
      name: "Color Grading & Look Dev",
      slug: "color-grading-look-dev",
      category: "Post-Production",
      description: "Cinema-grade color conform in DaVinci Resolve Studio. Custom show LUTs, film emulation, tone curve balancing, and HDR delivery.",
      deliverables: JSON.stringify(["Color Grade Conform", "Title Design", "ACES / Color Managed", "Delivery Masters"]),
      displayOrder: 3,
    },
    {
      name: "Sound Design & Mastering",
      slug: "sound-design-mastering",
      category: "Audio Post",
      description: "Frame-accurate sound effect micro-layering, audio sweetening, dialogue cleanup, and punchy spatial dynamics that elevate every cut.",
      deliverables: JSON.stringify(["Story Spine Construction", "Archival Integration", "Soundscapes", "Audio Polish"]),
      displayOrder: 4,
    },
  ];

  for (const cap of capabilities) {
    await prisma.capability.upsert({
      where: { slug: cap.slug },
      update: {},
      create: cap,
    });
  }

  // 4. Structural Demo Projects
  const demoProjects = [
    {
      title: "Synthetic Motion Narrative",
      slug: "synthetic-motion-narrative",
      year: "2026",
      category: "AI Film",
      aspectRatio: "16:9",
      layoutVariant: "FULLBLEED",
      summary: "Cinematic hybrid narrative exploring generative visual workflows fused with classical timeline discipline.",
      featured: true,
      published: true,
      isDemo: true,
      displayOrder: 1,
    },
    {
      title: "Kinetics Commercial Cut",
      slug: "kinetics-commercial-cut",
      year: "2026",
      category: "Commercial",
      aspectRatio: "16:9",
      layoutVariant: "ASYMMETRIC",
      summary: "Precision commercial post-production highlighting dynamic typography, pacing, and color conformity.",
      featured: true,
      published: true,
      isDemo: true,
      displayOrder: 2,
    },
    {
      title: "Vertical Frame Architecture",
      slug: "vertical-frame-architecture",
      year: "2026",
      category: "Vertical",
      aspectRatio: "9:16",
      layoutVariant: "VERTICAL",
      summary: "High-retention 9:16 narrative with frame-by-frame sound design and editorial impact.",
      featured: true,
      published: true,
      isDemo: true,
      displayOrder: 3,
    },
    {
      title: "Archival Essay Documentary",
      slug: "archival-essay-documentary",
      year: "2025",
      category: "Documentary",
      aspectRatio: "16:9",
      layoutVariant: "SPLIT",
      summary: "Long-form editorial rhythm with archival restoration and bespoke motion accents.",
      featured: false,
      published: true,
      isDemo: true,
      displayOrder: 4,
    },
  ];

  for (const proj of demoProjects) {
    await prisma.project.upsert({
      where: { slug: proj.slug },
      update: {},
      create: proj,
    });
  }

  console.log("✅ Seed completed successfully with secure admin user and demo catalog.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
