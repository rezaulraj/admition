"use client";

import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaLink, FaPlus, FaTimes } from "react-icons/fa";
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
} from "@/components/dashboard/common/ui";
import { PaginationControls, usePagination } from "@/components/dashboard/common/Pagination";
import StudentSearchField from "@/components/dashboard/common/StudentSearchField";
import type { Meeting } from "@/views/admin/dashboard/types";
import { MEETING_COLORS } from "@/views/admin/dashboard/types";
import type { StudentSearchResult } from "@/views/student/dashboard/types";

export default function MeetingsTab() {
  const { authFetch } = useAuth();
  const { showToast } = useToast();
  const [meetings, setMeetings] = useState<Meeting[] | null>(null);
  const [error, setError] = useState("");

  const [selectedStudent, setSelectedStudent] = useState<StudentSearchResult | null>(null);
  const [scheduledAt, setScheduledAt] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("30");
  const [meetingLink, setMeetingLink] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [requestError, setRequestError] = useState("");

  const load = () => {
    setError("");
    setMeetings(null);
    authFetch<Meeting[]>("/meetings")
      .then(setMeetings)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load your meetings."));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { page, setPage, pageSize, setPageSize, totalPages, totalItems, pageItems } = usePagination(meetings ?? []);

  const handleRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRequestError("");
    setRequesting(true);
    try {
      await authFetch("/meetings", {
        method: "POST",
        body: {
          scheduledAt: new Date(scheduledAt).toISOString(),
          durationMinutes: durationMinutes ? Number(durationMinutes) : undefined,
          meetingLink: meetingLink || undefined,
          studentId: selectedStudent?.studentId,
        },
      });
      showToast("Meeting requested — waiting on admin approval.", "success");
      setSelectedStudent(null);
      setScheduledAt("");
      setDurationMinutes("30");
      setMeetingLink("");
      load();
    } catch (err) {
      setRequestError(err instanceof ApiError ? err.message : "Could not request this meeting.");
    } finally {
      setRequesting(false);
    }
  };

  return (
    <div className="fade-in space-y-6">
      <SectionHeading
        title="Meetings"
        subtitle="Meetings admin has scheduled with you, and any you've requested — approval happens on admin's side."
      />

      <Card>
        <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
          Request a meeting
        </h3>
        <form onSubmit={handleRequest} className="space-y-4">
          {requestError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
              {requestError}
            </div>
          )}
          <div>
            <FieldLabel>Student (optional — leave blank to meet with admin directly)</FieldLabel>
            {selectedStudent ? (
              <div className="flex items-center justify-between gap-3 rounded-xl border border-[#1E3A8A]/25 bg-[#1E3A8A]/5 px-3.5 py-2.5">
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

          <PrimaryButton type="submit" disabled={requesting}>
            <FaPlus size={12} />
            {requesting ? "Requesting…" : "Request meeting"}
          </PrimaryButton>
        </form>
      </Card>

      {meetings === null && !error && <LoadingState label="Loading your meetings…" />}
      {error && <ErrorState message={error} onRetry={load} />}
      {meetings && meetings.length === 0 && (
        <EmptyState title="No meetings yet" description="Meetings you request or admin schedules with you will show up here." />
      )}

      {meetings && meetings.length > 0 && (
        <>
          <div className="space-y-3">
            {pageItems.map((m) => (
              <Card key={m.meetingId} className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A]">
                    <FaCalendarAlt size={15} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#0B1E3D]">
                      {m.student ? m.student.fullName : "With admin"}
                    </p>
                    <p className="truncate text-xs font-medium text-[#0B1E3D]/45">
                      {new Date(m.scheduledAt).toLocaleString()}
                      {m.durationMinutes ? ` · ${m.durationMinutes} min` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  {m.meetingLink && (m.status === "Approved" || m.status === "Completed") && (
                    <a
                      href={m.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A8A] hover:underline"
                    >
                      <FaLink size={11} /> Join link
                    </a>
                  )}
                  <Badge label={m.status} color={MEETING_COLORS[m.status]} />
                </div>
              </Card>
            ))}
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
