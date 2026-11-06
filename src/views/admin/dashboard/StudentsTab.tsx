"use client";

import React, { useEffect, useState } from "react";
import { useAuth, ApiError } from "@/lib/auth-context";
import { Badge, Card, EmptyState, ErrorState, LoadingState, SectionHeading } from "@/components/dashboard/common/ui";
import { PaginationControls, usePagination } from "@/components/dashboard/common/Pagination";
import type { AdminStudentRow } from "./types";

export default function StudentsTab() {
  const { authFetch } = useAuth();
  const [students, setStudents] = useState<AdminStudentRow[] | null>(null);
  const [error, setError] = useState("");

  const load = () => {
    setError("");
    setStudents(null);
    authFetch<AdminStudentRow[]>("/admin/students")
      .then(setStudents)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load students."));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { page, setPage, pageSize, setPageSize, totalPages, totalItems, pageItems } = usePagination(students ?? []);

  return (
    <div className="fade-in">
      <SectionHeading title="All Student Management" subtitle="Every student registered on the platform." />

      {students === null && !error && <LoadingState label="Loading students…" />}
      {error && <ErrorState message={error} onRetry={load} />}
      {students && students.length === 0 && <EmptyState title="No students registered yet" />}

      {students && students.length > 0 && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#0B1E3D]/8 text-left text-[11px] font-bold uppercase tracking-[0.06em] text-[#0B1E3D]/40">
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Nationality</th>
                  <th className="px-5 py-3">Preference</th>
                  <th className="px-5 py-3">Registered</th>
                  <th className="px-5 py-3">Verified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0B1E3D]/6">
                {pageItems.map((s) => (
                  <tr key={s.studentId}>
                    <td className="px-5 py-3 font-semibold text-[#0B1E3D]">{s.fullName}</td>
                    <td className="px-5 py-3 text-[#0B1E3D]/70">{s.email}</td>
                    <td className="px-5 py-3 text-[#0B1E3D]/70">{s.nationality?.countryName ?? "—"}</td>
                    <td className="px-5 py-3 text-[#0B1E3D]/70">
                      {s.preference
                        ? `${s.preference.intendedStudyLevel ?? "—"} · ${s.preference.desiredField ?? "—"}`
                        : "Not set"}
                    </td>
                    <td className="px-5 py-3 text-[#0B1E3D]/50">
                      {new Date(s.registeredOn).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3">
                      <Badge label={s.isEmailVerified ? "Verified" : "Unverified"} color={s.isEmailVerified ? "#15803d" : "#a16207"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 pb-4">
            <PaginationControls
              page={page}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        </Card>
      )}
    </div>
  );
}
