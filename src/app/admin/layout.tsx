import React from "react";
import Link from "next/link";
import { verifyAdminSession } from "@/lib/auth";
import { getSite } from "@/lib/site";
import {
  LayoutDashboard,
  Film,
  Inbox,
  Settings,
  Layers,
  Users,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { AdminLogoutButton } from "./AdminLogoutButton";

export const metadata = {
  title: "Admin Console | RUHORA Operations",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAuth = await verifyAdminSession();
  const site = await getSite();

  const navLinks = [
    { label: "OVERVIEW", href: "/admin", icon: LayoutDashboard },
    { label: "PROJECTS & VIDEOS", href: "/admin/projects", icon: Film },
    { label: "SERVICES & CAPABILITIES", href: "/admin/capabilities", icon: Layers },
    { label: "INQUIRIES", href: "/admin/inquiries", icon: Inbox },
    { label: "CREATIVE TEAM", href: "/admin/creative", icon: Users },
    { label: "STUDIO SETTINGS", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-sunken)] text-[var(--text)] flex flex-col md:flex-row">
      {/* Admin Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[var(--bg)] border-b md:border-b-0 md:border-r border-[var(--line)] p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--signal)]" />
              <span className="font-mono text-sm font-bold tracking-[0.14em] uppercase text-[var(--text)]">
                {site.brandName} // CMS
              </span>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
              OPERATIONS CONSOLE
            </p>
          </div>

          <nav className="space-y-1 font-mono text-xs">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2.5 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-raised)] rounded-lg transition-colors"
                >
                  <Icon size={14} className="text-[var(--accent)]" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-8 border-t border-[var(--line)] space-y-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between font-mono text-[10px] uppercase text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors p-2 rounded hover:bg-[var(--bg-raised)]"
          >
            <span>VIEW LIVE PORTFOLIO</span>
            <ExternalLink size={12} />
          </Link>
          <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-faint)]">
            <span>SESSION ACTIVE</span>
            <AdminLogoutButton />
          </div>
        </div>
      </aside>

      {/* Admin Main Body Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-[var(--line)] px-6 md:px-10 flex items-center justify-between bg-[var(--bg)]">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--text-faint)]">
            RUHORA OPERATIONAL ENGINE // CMS v2.0
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/projects"
              className="font-mono text-xs text-[var(--accent)] hover:underline flex items-center gap-1"
            >
              + Add Video/Project
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-12 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
