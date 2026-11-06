"use client";

import React, { useCallback, useState } from "react";
import { useUrlTab } from "@/lib/useUrlTab";
import DashboardShell, { type AdminTab } from "./DashboardShell";
import OverviewTab from "./OverviewTab";
import ApplicationsTab from "./ApplicationsTab";
import NewApplicationTab from "./NewApplicationTab";
import AgentsTab from "./AgentsTab";
import UniversitiesTab from "./UniversitiesTab";
import CommissionsTab from "./CommissionsTab";
import StudentsTab from "./StudentsTab";
import TransactionsTab from "./TransactionsTab";
import MeetingsTab from "./MeetingsTab";
import ContentTab from "./ContentTab";
import EventsTab from "./EventsTab";
import LeadsTab from "./LeadsTab";
import CampaignsTab from "./CampaignsTab";
import VisaProcessingTab from "./VisaProcessingTab";
import ProfileTab from "./ProfileTab";
import PasswordTab from "./PasswordTab";

const ADMIN_TABS: AdminTab[] = [
  "overview",
  "applications",
  "new-application",
  "agents",
  "universities",
  "commissions",
  "students",
  "transactions",
  "meetings",
  "content",
  "events",
  "leads",
  "campaigns",
  "visa-processing",
  "profile",
  "password",
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useUrlTab<AdminTab>(ADMIN_TABS, "overview");
  const [applicationsVersion, setApplicationsVersion] = useState(0);

  const handleApplicationCreated = useCallback(() => {
    setApplicationsVersion((v) => v + 1);
    setActiveTab("applications", { replace: true });
  }, [setActiveTab]);

  return (
    <DashboardShell activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "overview" && <OverviewTab onNavigate={setActiveTab} />}
      {activeTab === "applications" && <ApplicationsTab key={applicationsVersion} />}
      {activeTab === "new-application" && <NewApplicationTab onCreated={handleApplicationCreated} />}
      {activeTab === "agents" && <AgentsTab />}
      {activeTab === "universities" && <UniversitiesTab />}
      {activeTab === "commissions" && <CommissionsTab />}
      {activeTab === "students" && <StudentsTab />}
      {activeTab === "transactions" && <TransactionsTab />}
      {activeTab === "meetings" && <MeetingsTab />}
      {activeTab === "content" && <ContentTab />}
      {activeTab === "events" && <EventsTab />}
      {activeTab === "leads" && <LeadsTab />}
      {activeTab === "campaigns" && <CampaignsTab />}
      {activeTab === "visa-processing" && <VisaProcessingTab />}
      {activeTab === "profile" && <ProfileTab />}
      {activeTab === "password" && <PasswordTab />}
    </DashboardShell>
  );
}
