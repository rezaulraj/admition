"use client";

import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import type { StudentTab } from "./DashboardShell";
import { Card, ErrorState, LoadingState, PrimaryButton, StatCard, StatusBadge } from "./ui";
import type { Application, StudentProfile, SuggestionsResponse } from "./types";
import { ACTIVE_STATUSES } from "./types";

interface OverviewData {
  profile: StudentProfile;
  applications: Application[];
  suggestions: SuggestionsResponse;
}

function profileCompletion(profile: StudentProfile): number {
  const checks = [
    Boolean(profile.fullName),
    Boolean(profile.phone),
    Boolean(profile.nationalityId),
    profile.destinations.length > 0,
    Boolean(profile.preference),
    Boolean(profile.preference?.hasEnglishTest),
  ];
  const done = checks.filter(Boolean).length;
  return Math.round((done / checks.length) * 100);
}

export default function OverviewTab({ onNavigate }: { onNavigate: (tab: StudentTab) => void }) {
  const { authFetch, account } = useAuth();
  const [data, setData] = useState<OverviewData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    setError("");
    Promise.all([
      authFetch<StudentProfile>("/students/me"),
      authFetch<Application[]>("/applications"),
      authFetch<SuggestionsResponse>("/students/me/suggestions"),
    ])
      .then(([profile, applications, suggestions]) => setData({ profile, applications, suggestions }))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load your dashboard."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <LoadingState label="Loading your dashboard…" />;
  if (error || !data) return <ErrorState message={error || "Something went wrong."} onRetry={load} />;

  const { profile, applications, suggestions } = data;
  const activeCount = applications.filter((a) => ACTIVE_STATUSES.includes(a.currentStatus)).length;
  const completion = profileCompletion(profile);
  const recent = [...applications]
    .sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime())
    .slice(0, 5);

  return (
    <div className="fade-in">
      <div className="mb-6">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-[#1a5fd8]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#1a5fd8]">
          Student dashboard
        </p>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-[#0B1E3D] sm:text-3xl">
          Welcome back, {(account?.fullName as string)?.split(" ")[0] ?? "there"}
        </h1>
        <p className="mt-1 text-sm font-medium text-[#0B1E3D]/50">
          Here&apos;s where your admission journey stands today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Active Applications" value={activeCount} />
        <StatCard label="Profile Completion" value={`${completion}%`} />
        <StatCard label="Suggested Programs" value={suggestions.count} />
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
                className="text-xs font-bold text-[#1a5fd8] hover:underline"
              >
                View all
              </button>
            )}
          </div>

          {recent.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <p className="text-sm font-semibold text-[#0B1E3D]/50">
                You haven&apos;t started an application yet.
              </p>
              <PrimaryButton onClick={() => onNavigate("new-application")}>
                Start your first application
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
                  <StatusBadge status={app.currentStatus} />
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
            <QuickAction label="Search programs" onClick={() => onNavigate("program-search")} />
            <QuickAction label="Start a new application" onClick={() => onNavigate("new-application")} />
            <QuickAction label="Upload required documents" onClick={() => onNavigate("documents")} />
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
      className="flex w-full items-center justify-between rounded-xl border border-[#0B1E3D]/8 bg-gray-50/60 px-3.5 py-2.5 text-left text-sm font-semibold text-[#0B1E3D] transition hover:border-[#1a5fd8]/30 hover:bg-[#1a5fd8]/5"
    >
      {label}
      <FaArrowRight size={11} className="text-[#0B1E3D]/30" />
    </button>
  );
}
