"use client";

import React from "react";
import {
  FaFolderOpen,
  FaUserPlus,
  FaUsersCog,
  FaUniversity,
  FaMoneyBillWave,
  FaUserGraduate,
  FaHistory,
  FaCalendarCheck,
  FaKey,
  FaShieldAlt,
  FaFileAlt,
  FaCalendarAlt,
  FaBullhorn,
  FaUserCircle,
  FaPaperPlane,
  FaPassport,
} from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import SharedDashboardShell, { type NavItem } from "@/components/dashboard/common/DashboardShell";

export type AdminTab =
  | "overview"
  | "applications"
  | "new-application"
  | "agents"
  | "universities"
  | "commissions"
  | "students"
  | "transactions"
  | "meetings"
  | "content"
  | "events"
  | "leads"
  | "campaigns"
  | "visa-processing"
  | "profile"
  | "password";

const ACCENT = "#0B1E3D";

const NAV_ITEMS: NavItem<AdminTab>[] = [
  { key: "overview", label: "Dashboard", icon: HiOutlineViewGrid },
  { key: "applications", label: "Applications", icon: FaFolderOpen },
  { key: "new-application", label: "Add Student Application", icon: FaUserPlus },
  { key: "agents", label: "Manage Agents", icon: FaUsersCog },
  { key: "universities", label: "Universities & Programs", icon: FaUniversity },
  { key: "commissions", label: "Commissions & Payouts", icon: FaMoneyBillWave },
  { key: "students", label: "All Student Management", icon: FaUserGraduate },
  { key: "transactions", label: "Transaction History", icon: FaHistory },
  { key: "meetings", label: "Meetings", icon: FaCalendarCheck },
  { key: "content", label: "Articles & Guides", icon: FaFileAlt },
  { key: "events", label: "Events", icon: FaCalendarAlt },
  { key: "leads", label: "Leads", icon: FaBullhorn },
  { key: "campaigns", label: "Email Campaigns", icon: FaPaperPlane },
  { key: "visa-processing", label: "Visa Processing", icon: FaPassport },
  { key: "profile", label: "My Profile", icon: FaUserCircle },
  { key: "password", label: "Change Password", icon: FaKey },
];

export default function DashboardShell({
  activeTab,
  onTabChange,
  children,
}: {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  children: React.ReactNode;
}) {
  return (
    <SharedDashboardShell
      activeTab={activeTab}
      onTabChange={onTabChange}
      navItems={NAV_ITEMS}
      panelLabel="Admin panel"
      panelIcon={FaShieldAlt}
      accent={ACCENT}
    >
      {children}
    </SharedDashboardShell>
  );
}

export { ACCENT as ADMIN_ACCENT };
