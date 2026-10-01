"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export const AdminLogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      console.error("Logout error");
    }
  };

  return (
    <button
      onClick={handleLogout}
      title="Sign out of CMS"
      className="text-[var(--signal)] hover:underline flex items-center gap-1 cursor-pointer font-mono text-[10px]"
    >
      <LogOut size={11} />
      <span>LOGOUT</span>
    </button>
  );
};
