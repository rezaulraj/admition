"use client";

import React, { useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUrlTab } from "@/lib/useUrlTab";
import DashboardShell, { type StudentTab } from "./DashboardShell";
import OverviewTab from "./OverviewTab";
import MyApplicationsTab from "./MyApplicationsTab";
import NewApplicationTab from "./NewApplicationTab";
import MyDocumentsTab from "./MyDocumentsTab";
import ProgramSearchTab from "./ProgramSearchTab";
import ProfileTab from "./ProfileTab";
import PasswordTab from "./PasswordTab";

const STUDENT_TABS: StudentTab[] = [
  "overview",
  "applications",
  "new-application",
  "documents",
  "program-search",
  "profile",
  "password",
];

export default function StudentDashboard() {
  const searchParams = useSearchParams();
  const urlApplyProgramId = searchParams.get("applyProgramId");

  const [activeTab, setActiveTab] = useUrlTab<StudentTab>(
    STUDENT_TABS,
    urlApplyProgramId ? "new-application" : "overview",
  );
  const [pendingApplyProgramId, setPendingApplyProgramId] = useState<number | null>(
    urlApplyProgramId ? Number(urlApplyProgramId) : null,
  );
  // Bumping this forces MyApplicationsTab/OverviewTab to refetch after a new application is created.
  const [applicationsVersion, setApplicationsVersion] = useState(0);

  const handleApplicationCreated = useCallback(() => {
    setApplicationsVersion((v) => v + 1);
    setActiveTab("applications", { replace: true });
  }, [setActiveTab]);

  const handleApplyToProgram = useCallback(
    (programId: number) => {
      setPendingApplyProgramId(programId);
      setActiveTab("new-application");
    },
    [setActiveTab],
  );

  return (
    <DashboardShell activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "overview" && (
        <OverviewTab key={applicationsVersion} onNavigate={setActiveTab} />
      )}
      {activeTab === "applications" && <MyApplicationsTab key={applicationsVersion} />}
      {activeTab === "new-application" && (
        <NewApplicationTab
          onCreated={handleApplicationCreated}
          initialProgramId={pendingApplyProgramId}
          onNavigate={setActiveTab}
        />
      )}
      {activeTab === "documents" && <MyDocumentsTab />}
      {activeTab === "program-search" && <ProgramSearchTab onApply={handleApplyToProgram} />}
      {activeTab === "profile" && <ProfileTab />}
      {activeTab === "password" && <PasswordTab />}
    </DashboardShell>
  );
}
