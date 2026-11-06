"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useUrlTab } from "@/lib/useUrlTab";
import DashboardShell, { type PartnerTab } from "./DashboardShell";
import OverviewTab from "./OverviewTab";
import ApplicationsTab from "./ApplicationsTab";
import NewApplicationTab from "./NewApplicationTab";
import CommissionTab from "./CommissionTab";
import AgreementsTab from "./AgreementsTab";
import VerificationTab from "./VerificationTab";
import TeamTab from "./TeamTab";
import UniversitiesTab from "./UniversitiesTab";
import MeetingsTab from "./MeetingsTab";
import ArticlesTab from "./ArticlesTab";
import ProfileTab from "./ProfileTab";
import PayoutMethodTab from "./PayoutMethodTab";
import PasswordTab from "./PasswordTab";
import type { AgentProfile } from "./types";
import type { University } from "@/views/student/dashboard/types";

const PARTNER_TABS: PartnerTab[] = [
  "overview",
  "applications",
  "new-application",
  "commission",
  "agreements",
  "verification",
  "team",
  "universities",
  "meetings",
  "articles",
  "profile",
  "payout-method",
  "password",
];

export default function PartnerDashboard() {
  const { authFetch } = useAuth();
  const [activeTab, setActiveTab] = useUrlTab<PartnerTab>(PARTNER_TABS, "overview");
  const [applicationsVersion, setApplicationsVersion] = useState(0);
  const [profile, setProfile] = useState<AgentProfile | null>(null);
  const [applyUniversity, setApplyUniversity] = useState<University | null>(null);

  useEffect(() => {
    authFetch<AgentProfile>("/agents/me")
      .then((p) => {
        setProfile(p);
        if (!p.verificationSubmittedAt) setActiveTab("verification", { replace: true });
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApplicationCreated = useCallback(() => {
    setApplicationsVersion((v) => v + 1);
    setActiveTab("applications", { replace: true });
  }, [setActiveTab]);

  // Regular sidebar/nav navigation always starts "Add Student Application" fresh at the
  // university browse step — only the Universities tab's card click should jump straight in.
  const handleTabChange = useCallback(
    (tab: PartnerTab) => {
      setApplyUniversity(null);
      setActiveTab(tab);
    },
    [setActiveTab],
  );

  const handleBrowseUniversity = useCallback(
    (university: University) => {
      setApplyUniversity(university);
      setActiveTab("new-application");
    },
    [setActiveTab],
  );

  const canAddStudents = Boolean(profile?.verificationSubmittedAt) && profile?.approvalStatus === "Approved";

  return (
    <DashboardShell activeTab={activeTab} onTabChange={handleTabChange} canAddStudents={canAddStudents}>
      {activeTab === "overview" && <OverviewTab key={applicationsVersion} onNavigate={handleTabChange} />}
      {activeTab === "applications" && <ApplicationsTab key={applicationsVersion} />}
      {activeTab === "new-application" && (
        <NewApplicationTab onCreated={handleApplicationCreated} initialUniversity={applyUniversity} />
      )}
      {activeTab === "commission" && <CommissionTab />}
      {activeTab === "agreements" && <AgreementsTab />}
      {activeTab === "verification" && <VerificationTab />}
      {activeTab === "team" && <TeamTab />}
      {activeTab === "universities" && <UniversitiesTab onSelectUniversity={handleBrowseUniversity} />}
      {activeTab === "meetings" && <MeetingsTab />}
      {activeTab === "articles" && <ArticlesTab />}
      {activeTab === "profile" && <ProfileTab />}
      {activeTab === "payout-method" && <PayoutMethodTab />}
      {activeTab === "password" && <PasswordTab />}
    </DashboardShell>
  );
}
