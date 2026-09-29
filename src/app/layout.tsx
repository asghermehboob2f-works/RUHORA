import type { Metadata } from "next";
import { fontDisplay, fontSans, fontMono } from "@/config/fonts";
import { getSite } from "@/lib/site";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: {
      default: site.seoDefaultTitle,
      template: `%s | ${site.brandName}`,
    },
    description: site.seoDefaultDesc,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable} dark`}
    >
      <body className="bg-[var(--bg)] text-[var(--text)] antialiased min-h-screen selection:bg-[var(--accent)] selection:text-[var(--bg-sunken)]">
        {children}
      </body>
    </html>
  );
}
