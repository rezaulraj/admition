"use client";

import React from "react";
import {
  FaCalendarAlt,
  FaFolderOpen,
  FaUserPlus,
  FaHandshake,
  FaFileSignature,
  FaIdCard,
  FaUsersCog,
  FaUserTie,
  FaKey,
  FaFileAlt,
  FaUniversity,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import SharedDashboardShell, { type NavItem } from "@/components/dashboard/common/DashboardShell";

export type PartnerTab =
  | "overview"
  | "applications"
  | "new-application"
  | "commission"
  | "agreements"
  | "verification"
  | "team"
  | "universities"
  | "meetings"
  | "articles"
  | "profile"
  | "payout-method"
  | "password";

const ACCENT = "#1E3A8A";

const NAV_ITEMS: NavItem<PartnerTab>[] = [
  { key: "overview", label: "Dashboard", icon: HiOutlineViewGrid },
  { key: "applications", label: "Applications", icon: FaFolderOpen },
  { key: "new-application", label: "Add Student Application", icon: FaUserPlus },
  { key: "commission", label: "Commission and Partner", icon: FaHandshake },
  { key: "agreements", label: "All Agreements", icon: FaFileSignature },
  { key: "verification", label: "Partner Verification", icon: FaIdCard },
  { key: "team", label: "Agent Profiles", icon: FaUsersCog },
  { key: "universities", label: "Universities", icon: FaUniversity },
  { key: "meetings", label: "Meetings", icon: FaCalendarAlt },
  { key: "articles", label: "Articles & Guides", icon: FaFileAlt },
  { key: "profile", label: "My Profile", icon: FaUserTie },
  { key: "payout-method", label: "Payout Method", icon: FaMoneyCheckAlt },
  { key: "password", label: "Password Change", icon: FaKey },
];

export default function DashboardShell({
  activeTab,
  onTabChange,
  canAddStudents = true,
  children,
}: {
  activeTab: PartnerTab;
  onTabChange: (tab: PartnerTab) => void;
  /** Hides "Add Student Application" until verification is submitted and admin has approved. */
  canAddStudents?: boolean;
  children: React.ReactNode;
}) {
  const navItems = canAddStudents ? NAV_ITEMS : NAV_ITEMS.filter((item) => item.key !== "new-application");

  return (
    <SharedDashboardShell
      activeTab={activeTab}
      onTabChange={onTabChange}
      navItems={navItems}
      panelLabel="Recruitment Partner panel"
      panelIcon={FaHandshake}
      accent={ACCENT}
    >
      {children}
    </SharedDashboardShell>
  );
}

export { ACCENT as PARTNER_ACCENT };
