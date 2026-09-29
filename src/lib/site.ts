import { db } from "./db";

export interface SiteConfig {
  brandName: string;
  tagline: string;
  heroHeadline: string;
  statementText: string;
  accentColor: string;
  contactEmail: string;
  footerClosing: string;
  founderName: string | null;
  founderBio: string | null;
  founderPhotoUrl: string | null;
  founderSocials: Record<string, string> | null;
  seoDefaultTitle: string;
  seoDefaultDesc: string;
}

export const defaultSiteConfig: SiteConfig = {
  brandName: "RUHORA",
  tagline: "Obsessed with the quality of the frame.",
  heroHeadline: "WE CUT. WE SHAPE. WE MAKE *VISUALS* MOVE.",
  statementText: "A specialized visual production and AI post studio. We partner with creators, brands, and directors who require every frame to hold weight.",
  accentColor: "#C9B99A",
  contactEmail: "inquiry@ruhora.com",
  footerClosing: "HAVE SOMETHING WORTH *MAKING*?",
  founderName: "Roo",
  founderBio: "Director & Lead Editor specializing in narrative pacing, commercial visual post, and synthetic media pipelines.",
  founderPhotoUrl: null,
  founderSocials: {
    x: "https://x.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  },
  seoDefaultTitle: "RUHORA — Visual Production & AI Post Studio",
  seoDefaultDesc: "Digital flagship of a premium creative editing, post-production and AI visual production studio.",
};

export async function getSite(): Promise<SiteConfig> {
  try {
    const setting = await db.siteSetting.findUnique({
      where: { id: "site_config" },
    });

    if (!setting) {
      return defaultSiteConfig;
    }

    let parsedSocials: Record<string, string> | null = null;
    if (setting.founderSocials) {
      try {
        parsedSocials = JSON.parse(setting.founderSocials);
      } catch {
        parsedSocials = null;
      }
    }

    return {
      brandName: setting.brandName,
      tagline: setting.tagline,
      heroHeadline: setting.heroHeadline,
      statementText: setting.statementText,
      accentColor: setting.accentColor,
      contactEmail: setting.contactEmail,
      footerClosing: setting.footerClosing,
      founderName: setting.founderName,
      founderBio: setting.founderBio,
      founderPhotoUrl: setting.founderPhotoUrl,
      founderSocials: parsedSocials,
      seoDefaultTitle: setting.seoDefaultTitle,
      seoDefaultDesc: setting.seoDefaultDesc,
    };
  } catch {
    // If DB is offline during build or initial setup, return default config seamlessly
    return defaultSiteConfig;
  }
}
