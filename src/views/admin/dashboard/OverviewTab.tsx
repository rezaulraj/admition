"use client";

import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { Badge, Card, ErrorState, LoadingState, StatCard } from "@/components/dashboard/common/ui";
import { STATUS_COLORS, STATUS_LABELS } from "@/views/student/dashboard/types";
import type { ApplicationStatus } from "@/views/student/dashboard/types";
import type { AdminTab } from "./DashboardShell";
import { ADMIN_ACCENT } from "./DashboardShell";
import type { AdminStats } from "./types";

export default function OverviewTab({ onNavigate }: { onNavigate: (tab: AdminTab) => void }) {
  const { authFetch, account } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState("");

  const load = () => {
    setError("");
    setStats(null);
    authFetch<AdminStats>("/admin/stats")
      .then(setStats)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load admin stats."));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!stats) return <LoadingState label="Loading platform stats…" />;

  const statusEntries = Object.entries(stats.applicationsByStatus) as [ApplicationStatus, number][];

  return (
    <div className="fade-in">
      <div className="mb-6">
        <p
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em]"
          style={{ backgroundColor: `${ADMIN_ACCENT}15`, color: ADMIN_ACCENT }}
        >
          Admin dashboard
        </p>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-[#0B1E3D] sm:text-3xl">
          Welcome back, {(account?.fullName as string)?.split(" ")[0] ?? "Admin"}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Total Students" value={stats.totalStudents} accent={ADMIN_ACCENT} />
        <StatCard label="Total Agents" value={stats.totalAgents} accent={ADMIN_ACCENT} />
        <StatCard label="Pending Agents" value={stats.pendingAgents} accent={ADMIN_ACCENT} />
        <StatCard label="Universities" value={stats.totalUniversities} accent={ADMIN_ACCENT} />
        <StatCard label="Programs" value={stats.totalPrograms} accent={ADMIN_ACCENT} />
        <StatCard label="Applications" value={stats.totalApplications} accent={ADMIN_ACCENT} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Commission Paid" value={`$${stats.commissionPaid.toLocaleString()}`} accent={ADMIN_ACCENT} />
        <StatCard label="Commission Pending" value={`$${stats.commissionPending.toLocaleString()}`} accent={ADMIN_ACCENT} />
        <StatCard label="Pending Meetings" value={stats.pendingMeetings} accent={ADMIN_ACCENT} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
            Applications by status
          </h3>
          {statusEntries.length === 0 ? (
            <p className="text-sm font-medium text-[#0B1E3D]/45">No applications submitted yet.</p>
          ) : (
            <ul className="space-y-2.5">
              {statusEntries.map(([status, count]) => (
                <li key={status} className="flex items-center justify-between">
                  <Badge label={STATUS_LABELS[status]} color={STATUS_COLORS[status]} />
                  <span className="text-sm font-bold text-[#0B1E3D]">{count}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
            Quick actions
          </h3>
          <div className="space-y-2">
            <QuickAction label="Review pending agents" onClick={() => onNavigate("agents")} />
            <QuickAction label="Manage universities & programs" onClick={() => onNavigate("universities")} />
            <QuickAction label="Review applications" onClick={() => onNavigate("applications")} />
            <QuickAction label="Approve meeting requests" onClick={() => onNavigate("meetings")} />
          </div>
        </Card>
      </div>
    </div>
  );
}

function QuickAction({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-xl border border-[#0B1E3D]/8 bg-gray-50/60 px-3.5 py-2.5 text-left text-sm font-semibold text-[#0B1E3D] transition hover:border-[#0B1E3D]/30 hover:bg-[#0B1E3D]/5"
    >
      {label}
      <FaArrowRight size={11} className="text-[#0B1E3D]/30" />
    </button>
  );
}
