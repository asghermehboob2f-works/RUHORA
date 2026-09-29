import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding RUHORA database with structural demo records...");

  // 1. Site Configuration
  await prisma.siteSetting.upsert({
    where: { id: "site_config" },
    update: {},
    create: {
      id: "site_config",
      brandName: "RUHORA",
      tagline: "Obsessed with the quality of the frame.",
      heroHeadline: "WE CUT. WE SHAPE. WE MAKE *VISUALS* MOVE.",
      statementText:
        "We are a specialized post-production and AI visual studio. We do not mass-produce content. We partner with creators, brands, and directors who require every frame to hold weight.",
      accentColor: "#C9B99A",
      contactEmail: "inquiry@ruhora.com",
      footerClosing: "HAVE SOMETHING WORTH *MAKING*?",
      founderName: "Roo",
      founderBio:
        "Director & Lead Editor specializing in narrative pacing, commercial visual post, and synthetic media pipelines.",
      founderSocials: JSON.stringify({
        x: "https://x.com",
        instagram: "https://instagram.com",
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
    { label: "CREATIVE", href: "/creative", displayOrder: 4, isCta: false },
    { label: "SHOWREEL", href: "/showreel", displayOrder: 5, isCta: false },
    { label: "START A PROJECT", href: "/contact", displayOrder: 6, isCta: true },
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
      name: "Video Editing",
      slug: "video-editing",
      category: "Post-Production",
      description: "Precision rhythm, pacing, and editorial architecture for cinema, commercials, and elite creator formats.",
      deliverables: JSON.stringify(["Assembly & Picture Lock", "Multi-cam Sync", "Pacing & Retime", "Audio Polish"]),
      displayOrder: 1,
    },
    {
      name: "AI Visual Production",
      slug: "ai-visual-production",
      category: "Synthetic Media",
      description: "Generative video, synthetic environment design, and hybrid live-action/AI pipelines with director-level taste.",
      deliverables: JSON.stringify(["Generative Concept B-roll", "Style Transfer", "Neural Upscaling", "Synthetic Backdrops"]),
      displayOrder: 2,
    },
    {
      name: "Commercial Post",
      slug: "commercial-post",
      category: "Post-Production",
      description: "Full-stack post-production including precision color grading, motion graphics integration, and audio design.",
      deliverables: JSON.stringify(["Color Grade Conform", "Title Design", "VFX Clean-up", "Delivery Masters"]),
      displayOrder: 3,
    },
    {
      name: "Long-Form & Documentary",
      slug: "long-form-documentary",
      category: "Narrative",
      description: "In-depth narrative sculpting for feature YouTube essays, documentary series, and masterclass formats.",
      deliverables: JSON.stringify(["Story Spine Construction", "Archival Integration", "Dynamic Chapters", "Soundscapes"]),
      displayOrder: 4,
    },
    {
      name: "Short-Form Cinema",
      slug: "short-form-cinema",
      category: "Creator Formats",
      description: "High-density, cinematic vertical narratives designed for immediate retention without cheap visual gimmicks.",
      deliverables: JSON.stringify(["9:16 Kinetic Framing", "Sound FX Micro-layering", "Retention Hooks", "Custom Graphics"]),
      displayOrder: 5,
    },
  ];

  for (const cap of capabilities) {
    await prisma.capability.upsert({
      where: { slug: cap.slug },
      update: {},
      create: cap,
    });
  }

  // 4. Structural Demo Projects (isDemo = true, using Media Placeholders per Section 12)
  const demoProjects = [
    {
      title: "Sample Project 01 — Replace",
      slug: "sample-project-01",
      year: "2026",
      category: "AI Film / Post-Production",
      aspectRatio: "16:9",
      layoutVariant: "FULLBLEED",
      summary: "Cinematic hybrid narrative exploring generative visual workflows fused with classical timeline discipline.",
      featured: true,
      published: true,
      isDemo: true,
      displayOrder: 1,
    },
    {
      title: "Sample Project 02 — Replace",
      slug: "sample-project-02",
      year: "2026",
      category: "Commercial Edit",
      aspectRatio: "21:9",
      layoutVariant: "ASYMMETRIC",
      summary: "Precision commercial post-production highlighting dynamic typography, pacing, and color conformity.",
      featured: true,
      published: true,
      isDemo: true,
      displayOrder: 2,
    },
    {
      title: "Sample Project 03 — Replace",
      slug: "sample-project-03",
      year: "2026",
      category: "Vertical Cinema",
      aspectRatio: "9:16",
      layoutVariant: "VERTICAL",
      summary: "High-retention 9:16 narrative with frame-by-frame sound design and editorial impact.",
      featured: true,
      published: true,
      isDemo: true,
      displayOrder: 3,
    },
    {
      title: "Sample Project 04 — Replace",
      slug: "sample-project-04",
      year: "2025",
      category: "Documentary Post",
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

  // 5. Creative Directory
  const teamMembers = [
    {
      name: "Roo",
      role: "Founder & Creative Director",
      specialization: "Editorial Architecture & Visual Direction",
      bio: "Focuses on narrative pacing, commercial visual post, and synthetic media integration.",
      skills: JSON.stringify(["Premiere Pro", "DaVinci Resolve", "ComfyUI / Stable Diffusion", "Sound Design"]),
      displayOrder: 1,
      isVisible: true,
      isDemo: true,
    },
    {
      name: "Lead Editor",
      role: "Senior Editor",
      specialization: "Rhythm, Sound FX & Motion Flow",
      bio: "Master of timing and retention dynamics across long-form and high-energy short-form.",
      skills: JSON.stringify(["Premiere Pro", "After Effects", "Sound Mixing"]),
      displayOrder: 2,
      isVisible: true,
      isDemo: true,
    },
  ];

  for (const member of teamMembers) {
    const existing = await prisma.teamMember.findFirst({
      where: { name: member.name },
    });
    if (!existing) {
      await prisma.teamMember.create({ data: member });
    }
  }

  console.log("✅ Seed completed successfully with structural demo placeholders.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
