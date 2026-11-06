"use client";

import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaPlus, FaTimes, FaUserTie } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";
import {
  Badge,
  Card,
  EmptyState,
  ErrorState,
  FieldLabel,
  LoadingState,
  PrimaryButton,
  SectionHeading,
  inputClass,
  selectClass,
} from "@/components/dashboard/common/ui";
import { PaginationControls, usePagination } from "@/components/dashboard/common/Pagination";
import StudentSearchField from "@/components/dashboard/common/StudentSearchField";
import type { Meeting, MeetingStatus } from "./types";
import { MEETING_COLORS } from "./types";
import type { AgentProfile } from "@/views/partner/dashboard/types";
import type { StudentSearchResult } from "@/views/student/dashboard/types";

const NEXT_ACTION: Partial<Record<MeetingStatus, { label: string; next: MeetingStatus }>> = {
  Requested: { label: "Approve", next: "Approved" },
  Approved: { label: "Mark completed", next: "Completed" },
};

export default function MeetingsTab() {
  const { authFetch } = useAuth();
  const { showToast } = useToast();
  const [meetings, setMeetings] = useState<Meeting[] | null>(null);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [agents, setAgents] = useState<AgentProfile[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentSearchResult | null>(null);
  const [agentId, setAgentId] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("30");
  const [meetingLink, setMeetingLink] = useState("");
  const [scheduling, setScheduling] = useState(false);
  const [scheduleError, setScheduleError] = useState("");

  const load = () => {
    setError("");
    setMeetings(null);
    authFetch<Meeting[]>("/meetings")
      .then(setMeetings)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load meetings."));
  };

  useEffect(() => {
    load();
    authFetch<AgentProfile[]>("/agents?approvalStatus=Approved").then(setAgents).catch(() => setAgents([]));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { page, setPage, pageSize, setPageSize, totalPages, totalItems, pageItems } = usePagination(meetings ?? []);

  const handleUpdate = async (meetingId: number, status: MeetingStatus) => {
    setUpdatingId(meetingId);
    try {
      await authFetch(`/meetings/${meetingId}/status`, { method: "PATCH", body: { status } });
      showToast(`Meeting marked as ${status.toLowerCase()}.`, "success");
      load();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not update this meeting.", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSchedule = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setScheduleError("");
    if (!selectedStudent && !agentId) {
      setScheduleError("Pick at least a student or a partner for this meeting.");
      return;
    }
    setScheduling(true);
    try {
      await authFetch("/meetings", {
        method: "POST",
        body: {
          scheduledAt: new Date(scheduledAt).toISOString(),
          durationMinutes: durationMinutes ? Number(durationMinutes) : undefined,
          meetingLink: meetingLink || undefined,
          studentId: selectedStudent?.studentId,
          agentId: agentId ? Number(agentId) : undefined,
        },
      });
      showToast("Meeting scheduled.", "success");
      setSelectedStudent(null);
      setAgentId("");
      setScheduledAt("");
      setDurationMinutes("30");
      setMeetingLink("");
      load();
    } catch (err) {
      setScheduleError(err instanceof ApiError ? err.message : "Could not schedule this meeting.");
    } finally {
      setScheduling(false);
    }
  };

  return (
    <div className="fade-in space-y-6">
      <SectionHeading title="Meetings" subtitle="Meeting requests from students and partners." />

      <Card>
        <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
          Schedule a meeting
        </h3>
        <form onSubmit={handleSchedule} className="space-y-4">
          {scheduleError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
              {scheduleError}
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Student (optional)</FieldLabel>
              {selectedStudent ? (
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[#0B1E3D]/12 bg-gray-50/60 px-3.5 py-2.5">
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-[#0B1E3D]">{selectedStudent.fullName}</span>
                    <span className="block truncate text-[11px] font-medium text-[#0B1E3D]/50">
                      ID {selectedStudent.studentId} · {selectedStudent.email}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedStudent(null)}
                    className="shrink-0 text-[#0B1E3D]/40 hover:text-[#0B1E3D]"
                    aria-label="Clear selected student"
                  >
                    <FaTimes size={13} />
                  </button>
                </div>
              ) : (
                <StudentSearchField onSelect={setSelectedStudent} />
              )}
            </div>
            <div>
              <FieldLabel>Partner (optional)</FieldLabel>
              <select className={selectClass} value={agentId} onChange={(e) => setAgentId(e.target.value)}>
                <option value="">Select a partner</option>
                {agents.map((a) => (
                  <option key={a.agentId} value={a.agentId}>
                    {a.fullName}
                    {a.companyName ? ` · ${a.companyName}` : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <FieldLabel>Date & time</FieldLabel>
              <input
                type="datetime-local"
                className={inputClass}
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                required
              />
            </div>
            <div>
              <FieldLabel>Duration (minutes)</FieldLabel>
              <input
                type="number"
                min="5"
                className={inputClass}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
              />
            </div>
            <div>
              <FieldLabel>Meeting link (optional)</FieldLabel>
              <input
                className={inputClass}
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="https://meet.google.com/…"
              />
            </div>
          </div>

          <PrimaryButton type="submit" disabled={scheduling}>
            <FaPlus size={12} />
            {scheduling ? "Scheduling…" : "Schedule meeting"}
          </PrimaryButton>
        </form>
      </Card>

      {meetings === null && !error && <LoadingState label="Loading meetings…" />}
      {error && <ErrorState message={error} onRetry={load} />}
      {meetings && meetings.length === 0 && <EmptyState title="No meetings requested yet" />}

      {meetings && meetings.length > 0 && (
        <>
        <div className="space-y-3">
          {pageItems.map((m) => {
            const action = NEXT_ACTION[m.status];
            return (
              <Card key={m.meetingId} className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B1E3D]/10 text-[#0B1E3D]">
                    {m.student ? <FaCalendarAlt size={15} /> : <FaUserTie size={15} />}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#0B1E3D]">
                      {m.student?.fullName ?? m.agent?.fullName ?? "Unknown"}
                      {m.student && m.agent ? ` & ${m.agent.fullName}` : ""}
                    </p>
                    <p className="truncate text-xs font-medium text-[#0B1E3D]/45">
                      {new Date(m.scheduledAt).toLocaleString()}
                      {m.durationMinutes ? ` · ${m.durationMinutes} min` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Badge label={m.status} color={MEETING_COLORS[m.status]} />
                  {action && (
                    <PrimaryButton onClick={() => handleUpdate(m.meetingId, action.next)} disabled={updatingId === m.meetingId}>
                      {updatingId === m.meetingId ? "Updating…" : action.label}
                    </PrimaryButton>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
        <PaginationControls
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
        </>
      )}
    </div>
  );
}
