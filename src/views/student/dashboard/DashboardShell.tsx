"use client";

import React from "react";
import {
  FaFileAlt,
  FaIdCard,
  FaPlusCircle,
  FaSearch,
  FaUserEdit,
  FaKey,
  FaGraduationCap,
} from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import SharedDashboardShell, { type NavItem } from "@/components/dashboard/common/DashboardShell";

export type StudentTab =
  | "overview"
  | "applications"
  | "new-application"
  | "documents"
  | "program-search"
  | "profile"
  | "password";

const NAV_ITEMS: NavItem<StudentTab>[] = [
  { key: "overview", label: "Dashboard", icon: HiOutlineViewGrid },
  { key: "applications", label: "My Application", icon: FaFileAlt },
  { key: "new-application", label: "New Application", icon: FaPlusCircle },
  { key: "documents", label: "My Documents", icon: FaIdCard },
  { key: "program-search", label: "Program Search", icon: FaSearch },
  { key: "profile", label: "Profile Update", icon: FaUserEdit },
  { key: "password", label: "Password Change", icon: FaKey },
];

export default function DashboardShell({
  activeTab,
  onTabChange,
  children,
}: {
  activeTab: StudentTab;
  onTabChange: (tab: StudentTab) => void;
  children: React.ReactNode;
}) {
  return (
    <SharedDashboardShell
      activeTab={activeTab}
      onTabChange={onTabChange}
      navItems={NAV_ITEMS}
      panelLabel="Student panel"
      panelIcon={FaGraduationCap}
    >
      {children}
    </SharedDashboardShell>
  );
}
