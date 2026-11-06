"use client";

import React, { useState } from "react";
import {
  FaPlusCircle,
  FaUserEdit,
  FaFileAlt,
  FaSearch,
  FaKey,
  FaFolderOpen,
  FaUserPlus,
  FaFileInvoice,
  FaHandshake,
  FaFileSignature,
  FaFileMedical,
  FaUserTie,
  FaExchangeAlt,
  FaUsersCog,
  FaCheckCircle,
  FaUniversity,
  FaCogs,
  FaMoneyBillWave,
  FaUserGraduate,
  FaFileContract,
  FaHistory,
  FaShieldAlt,
  FaGraduationCap,
} from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import DashBoardHeader, {
  type RoleMeta,
} from "../../components/common/DashBoardHeader";
import DashBoardSidebar, {
  type NavItem,
} from "../../components/common/DashBoardSidebar";

type Role = "student" | "agent" | "admin";

const ROLES: Record<Role, RoleMeta> = {
  student: {
    label: "Student",
    icon: FaGraduationCap,
    accent: "#1a5fd8",
    accentBg: "bg-[#1a5fd8]/10",
  },
  agent: {
    label: "Recruitment Partner",
    icon: FaHandshake,
    accent: "#1E3A8A",
    accentBg: "bg-[#1E3A8A]/10",
  },
  admin: {
    label: "Admin",
    icon: FaShieldAlt,
    accent: "#0B1E3D",
    accentBg: "bg-[#0B1E3D]/10",
  },
};

const NAV_ITEMS: Record<Role, NavItem[]> = {
  student: [
    { label: "Dashboard", icon: HiOutlineViewGrid },
    { label: "My Application", icon: FaFileAlt },
    { label: "New Application", icon: FaPlusCircle },
    { label: "Program Search", icon: FaSearch },
    { label: "Profile Update", icon: FaUserEdit },
    { label: "Password Change", icon: FaKey },
  ],
  agent: [
    { label: "Dashboard", icon: HiOutlineViewGrid },
    { label: "Applications", icon: FaFolderOpen },
    { label: "Add Student Application", icon: FaUserPlus },
    { label: "Information and Document", icon: FaFileInvoice },
    { label: "Commission and Partner", icon: FaHandshake },
    { label: "All Agreements", icon: FaFileSignature },
    { label: "Request for Agreements", icon: FaFileMedical },
    { label: "Agent Profiles", icon: FaUserTie },
    { label: "Transition", icon: FaExchangeAlt },
    { label: "Password Change", icon: FaKey },
  ],
  admin: [
    { label: "Dashboard", icon: HiOutlineViewGrid },
    { label: "Applications", icon: FaFolderOpen },
    { label: "Add Student Application", icon: FaUserPlus },
    { label: "Manage Agents", icon: FaUsersCog },
    { label: "Agents Agreement Approve", icon: FaCheckCircle },
    { label: "Add University", icon: FaUniversity },
    { label: "Programs Setup", icon: FaCogs },
    { label: "Partner Commissions Add", icon: FaMoneyBillWave },
    { label: "All Student Management", icon: FaUserGraduate },
    {
      label: "Agents Agreement and Documents Preparation",
      icon: FaFileContract,
    },
    { label: "Transaction History", icon: FaHistory },
    { label: "Change Password", icon: FaKey },
  ],
};

interface Stat {
  label: string;
  value: string;
}

const STATS: Record<Role, Stat[]> = {
  student: [
    { label: "Active Applications", value: "3" },
    { label: "Saved Programs", value: "8" },
    { label: "Profile Completion", value: "72%" },
  ],
  agent: [
    { label: "Active Students", value: "46" },
    { label: "Pending Commissions", value: "$4,320" },
    { label: "Agreements Signed", value: "12" },
  ],
  admin: [
    { label: "Total Agents", value: "128" },
    { label: "Total Students", value: "3,204" },
    { label: "Monthly Revenue", value: "$82,450" },
  ],
};

const DashBoardLayout = () => {
  const [role, setRole] = useState<Role>("student");
  const [activeItem, setActiveItem] = useState(NAV_ITEMS.student[0].label);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const roleMeta = ROLES[role];
  const navItems = NAV_ITEMS[role];
  const stats = STATS[role];

  const handleRoleChange = (nextRole: string) => {
    const typedRole = nextRole as Role;
    setRole(typedRole);
    setActiveItem(NAV_ITEMS[typedRole][0].label);
    setSidebarOpen(false);
  };

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500&display=swap');
        .no-scrollbar::-webkit-scrollbar { width: 6px; }
        .no-scrollbar::-webkit-scrollbar-thumb { background: #0B1E3D22; border-radius: 8px; }
        @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .sidebar-slide-in { animation: slideIn 0.25s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .fade-in { animation: fadeIn 0.15s ease-out; }
      `}</style>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0B1E3D]/40 backdrop-blur-[2px] lg:hidden fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <DashBoardSidebar
        roleMeta={roleMeta}
        navItems={navItems}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="lg:pl-64">
        <DashBoardHeader
          role={role}
          roleMeta={roleMeta}
          allRoles={ROLES}
          onRoleChange={handleRoleChange}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        <main className="bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
          <MainContent
            roleMeta={roleMeta}
            activeItem={activeItem}
            stats={stats}
          />
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;

function MainContent({
  roleMeta,
  activeItem,
  stats,
}: {
  roleMeta: RoleMeta;
  activeItem: string;
  stats: Stat[];
}) {
  return (
    <div className="fade-in">
      <div className="mb-6">
        <p
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em]"
          style={{
            backgroundColor: `${roleMeta.accent}15`,
            color: roleMeta.accent,
          }}>
          {roleMeta.label} dashboard
        </p>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-[#0B1E3D] sm:text-3xl">
          {activeItem}
        </h1>
        <p className="mt-1 text-sm font-medium text-[#0B1E3D]/50">
          This is a layout demo — swap the "Viewing as" role in the header to
          preview the Student, Recruitment Partner, and Admin sidebars.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-[#0B1E3D]/8 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0B1E3D]/40">
              {s.label}
            </p>
            <p
              className="mt-2 text-2xl font-extrabold tracking-tight"
              style={{ color: roleMeta.accent }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-[#0B1E3D]/8 bg-white p-8">
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#0B1E3D]/10 bg-gray-50/60 py-16 text-center">
          <div
            className="mb-3 flex h-12 w-12 items-center justify-center rounded-full"
            style={{ backgroundColor: `${roleMeta.accent}15` }}>
            <HiOutlineViewGrid size={20} style={{ color: roleMeta.accent }} />
          </div>
          <p className="text-sm font-bold text-[#0B1E3D]">
            "{activeItem}" content goes here
          </p>
          <p className="mt-1 max-w-xs text-xs font-medium text-[#0B1E3D]/45">
            Build out this page's real content once the backend for the{" "}
            {roleMeta.label.toLowerCase()} flow is ready.
          </p>
        </div>
      </div>
    </div>
  );
}
