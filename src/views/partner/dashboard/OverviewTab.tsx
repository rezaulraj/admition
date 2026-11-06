"use client";

import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { Card, ErrorState, LoadingState, PrimaryButton, StatCard, Badge } from "@/components/dashboard/common/ui";
import type { Application } from "@/views/student/dashboard/types";
import { STATUS_COLORS, STATUS_LABELS } from "@/views/student/dashboard/types";
import type { PartnerTab } from "./DashboardShell";
import { PARTNER_ACCENT } from "./DashboardShell";
import type { AgentProfile, AgentStats } from "./types";
import { APPROVAL_COLORS } from "./types";

interface OverviewData {
  profile: AgentProfile;
  stats: AgentStats;
  applications: Application[];
}

export default function OverviewTab({ onNavigate }: { onNavigate: (tab: PartnerTab) => void }) {
  const { authFetch, account } = useAuth();
  const [data, setData] = useState<OverviewData | null>(null);
  const [error, setError] = useState("");

  const load = () => {
    setError("");
    setData(null);
    Promise.all([
      authFetch<AgentProfile>("/agents/me"),
      authFetch<AgentStats>("/agents/me/stats"),
      authFetch<Application[]>("/applications"),
    ])
      .then(([profile, stats, applications]) => setData({ profile, stats, applications }))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load your dashboard."));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!data) return <LoadingState label="Loading your dashboard…" />;

  const { profile, stats, applications } = data;
  const recent = [...applications]
    .sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime())
    .slice(0, 5);

  return (
    <div className="fade-in">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em]"
            style={{ backgroundColor: `${PARTNER_ACCENT}15`, color: PARTNER_ACCENT }}
          >
            Recruitment partner dashboard
          </p>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-[#0B1E3D] sm:text-3xl">
            Welcome back, {(account?.fullName as string)?.split(" ")[0] ?? "there"}
          </h1>
        </div>
        <Badge label={profile.approvalStatus} color={APPROVAL_COLORS[profile.approvalStatus]} />
      </div>

      {!profile.verificationSubmittedAt && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
          <p>
            Complete your{" "}
            <button
              type="button"
              onClick={() => onNavigate("verification")}
              className="font-extrabold underline underline-offset-2 hover:text-amber-900"
            >
              partner verification
            </button>{" "}
            so admin can review and approve your account — you&apos;ll be able to submit student
            applications once that&apos;s done.
          </p>
        </div>
      )}

      {profile.verificationSubmittedAt && profile.approvalStatus !== "Approved" && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
          <p>
            Your partner account is {profile.approvalStatus.toLowerCase()}. You&apos;ll be able to submit
            student applications once an admin approves your account.
          </p>
          {profile.kycReviewNote && (
            <p className="mt-2 border-t border-amber-200 pt-2">
              <span className="font-extrabold">Admin flagged an issue with your documents:</span>{" "}
              {profile.kycReviewNote} Please head to{" "}
              <button
                type="button"
                onClick={() => onNavigate("verification")}
                className="font-extrabold underline underline-offset-2 hover:text-amber-900"
              >
                Partner Verification
              </button>{" "}
              to fix it.
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatCard label="Total Applications" value={stats.applications} accent={PARTNER_ACCENT} />
        <StatCard label="Visa Success" value={stats.visaSuccess} accent={PARTNER_ACCENT} />
        <StatCard label="Total Commission" value={`$${stats.totalCommission.toLocaleString()}`} accent={PARTNER_ACCENT} />
        <StatCard label="Commission Paid" value={`$${stats.commissionPaid.toLocaleString()}`} accent={PARTNER_ACCENT} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
              Recent applications
            </h3>
            {applications.length > 0 && (
              <button
                onClick={() => onNavigate("applications")}
                className="text-xs font-bold hover:underline"
                style={{ color: PARTNER_ACCENT }}
              >
                View all
              </button>
            )}
          </div>

          {recent.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <p className="text-sm font-semibold text-[#0B1E3D]/50">No applications submitted yet.</p>
              <PrimaryButton onClick={() => onNavigate("new-application")}>
                Add a student application
                <FaArrowRight size={12} />
              </PrimaryButton>
            </div>
          ) : (
            <ul className="divide-y divide-[#0B1E3D]/6">
              {recent.map((app) => (
                <li key={app.applicationId} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#0B1E3D]">
                      {app.intake.program.programName}
                    </p>
                    <p className="truncate text-xs font-medium text-[#0B1E3D]/45">
                      {app.intake.program.university.universityName} · {app.intake.intakeName}{" "}
                      {app.intake.intakeYear}
                    </p>
                  </div>
                  <Badge label={STATUS_LABELS[app.currentStatus]} color={STATUS_COLORS[app.currentStatus]} />
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
            <QuickAction label="Add a student application" onClick={() => onNavigate("new-application")} />
            <QuickAction label="View commission & payouts" onClick={() => onNavigate("commission")} />
            <QuickAction label="Manage agreements" onClick={() => onNavigate("agreements")} />
            <QuickAction label="Update your profile" onClick={() => onNavigate("profile")} />
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
      className="flex w-full items-center justify-between rounded-xl border border-[#0B1E3D]/8 bg-gray-50/60 px-3.5 py-2.5 text-left text-sm font-semibold text-[#0B1E3D] transition hover:border-[#1E3A8A]/30 hover:bg-[#1E3A8A]/5"
    >
      {label}
      <FaArrowRight size={11} className="text-[#0B1E3D]/30" />
    </button>
  );
}
