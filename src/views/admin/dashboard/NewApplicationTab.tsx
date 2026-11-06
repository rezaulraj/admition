"use client";

import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaGraduationCap, FaTimes, FaUserGraduate } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";
import { apiFetch } from "@/lib/api";
import { Card, ErrorState, FieldLabel, PrimaryButton, SectionHeading, inputClass, selectClass } from "@/components/dashboard/common/ui";
import StudentSearchField from "@/components/dashboard/common/StudentSearchField";
import type { Country, Intake, Program, StudentSearchResult, University } from "@/views/student/dashboard/types";

export default function NewApplicationTab({ onCreated }: { onCreated: () => void }) {
  const { authFetch } = useAuth();
  const { showToast } = useToast();

  const [selectedStudent, setSelectedStudent] = useState<StudentSearchResult | null>(null);
  const [agentId, setAgentId] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);

  const [countryId, setCountryId] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [programId, setProgramId] = useState("");
  const [intakeId, setIntakeId] = useState("");

  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingUniversities, setLoadingUniversities] = useState(false);
  const [loadingPrograms, setLoadingPrograms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    apiFetch<Country[]>("/countries")
      .then(setCountries)
      .catch(() => setLoadError("Could not load the list of countries."))
      .finally(() => setLoadingCountries(false));
  }, []);

  useEffect(() => {
    setUniversities([]);
    setUniversityId("");
    setPrograms([]);
    setProgramId("");
    setIntakeId("");
    if (!countryId) return;
    setLoadingUniversities(true);
    apiFetch<University[]>(`/universities?countryId=${countryId}`)
      .then(setUniversities)
      .catch(() => setLoadError("Could not load universities for that country."))
      .finally(() => setLoadingUniversities(false));
  }, [countryId]);

  useEffect(() => {
    setPrograms([]);
    setProgramId("");
    setIntakeId("");
    if (!universityId) return;
    setLoadingPrograms(true);
    apiFetch<Program[]>(`/programs?universityId=${universityId}`)
      .then(setPrograms)
      .catch(() => setLoadError("Could not load programs for that university."))
      .finally(() => setLoadingPrograms(false));
  }, [universityId]);

  const selectedProgram = programs.find((p) => String(p.programId) === programId);
  const availableIntakes: Intake[] = selectedProgram?.intakes ?? [];

  useEffect(() => {
    setIntakeId("");
  }, [programId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedStudent) {
      showToast("Please search for and select a student before submitting.", "error");
      return;
    }
    if (!intakeId) {
      showToast("Please select an intake to apply to.", "error");
      return;
    }
    setSubmitting(true);
    try {
      await authFetch("/applications", {
        method: "POST",
        body: {
          studentId: selectedStudent.studentId,
          intakeId: Number(intakeId),
          agentId: agentId ? Number(agentId) : undefined,
        },
      });
      setSuccess(true);
      showToast("Application submitted successfully.", "success");
      setTimeout(onCreated, 900);
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not submit this application.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadError) return <ErrorState message={loadError} />;

  return (
    <div className="fade-in">
      <SectionHeading
        title="Add Student Application"
        subtitle="Submit a new application directly on behalf of any student."
      />

      <Card>
        {success ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <FaCheckCircle className="text-emerald-500" size={28} />
            <p className="text-sm font-bold text-[#0B1E3D]">Application submitted!</p>
            <p className="text-xs font-medium text-[#0B1E3D]/50">Taking you to Applications…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel>Student</FieldLabel>
                {selectedStudent ? (
                  <div className="flex items-center justify-between gap-2 rounded-xl border border-[#1a5fd8]/25 bg-[#1a5fd8]/5 px-3.5 py-2.5">
                    <span className="flex min-w-0 items-center gap-2">
                      <FaUserGraduate className="shrink-0 text-[#1a5fd8]" size={13} />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-bold text-[#0B1E3D]">{selectedStudent.fullName}</span>
                        <span className="block truncate text-[11px] font-medium text-[#0B1E3D]/50">
                          ID {selectedStudent.studentId} · {selectedStudent.email}
                        </span>
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
                <p className="mt-1.5 text-[11px] font-medium text-[#0B1E3D]/40">
                  Search by student ID, passport number, or name to find their existing account.
                </p>
              </div>

              <div>
                <FieldLabel>Attribute to partner (optional)</FieldLabel>
                <input
                  className={inputClass}
                  type="number"
                  min="1"
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  placeholder="Agent ID, if applicable"
                />
                <p className="mt-1.5 text-[11px] font-medium text-[#0B1E3D]/40">
                  Leave blank if this is a direct application with no recruitment partner involved.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel>Destination country</FieldLabel>
                <select
                  className={selectClass}
                  value={countryId}
                  onChange={(e) => setCountryId(e.target.value)}
                  disabled={loadingCountries}
                >
                  <option value="">{loadingCountries ? "Loading…" : "Select a country"}</option>
                  {countries.map((c) => (
                    <option key={c.countryId} value={c.countryId}>
                      {c.countryName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel>University</FieldLabel>
                <select
                  className={selectClass}
                  value={universityId}
                  onChange={(e) => setUniversityId(e.target.value)}
                  disabled={!countryId || loadingUniversities}
                >
                  <option value="">
                    {!countryId ? "Select a country first" : loadingUniversities ? "Loading…" : "Select a university"}
                  </option>
                  {universities.map((u) => (
                    <option key={u.universityId} value={u.universityId}>
                      {u.universityName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel>Program</FieldLabel>
                <select
                  className={selectClass}
                  value={programId}
                  onChange={(e) => setProgramId(e.target.value)}
                  disabled={!universityId || loadingPrograms}
                >
                  <option value="">
                    {!universityId ? "Select a university first" : loadingPrograms ? "Loading…" : "Select a program"}
                  </option>
                  {programs.map((p) => (
                    <option key={p.programId} value={p.programId}>
                      {p.programName} ({p.degreeLevel})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel>Intake</FieldLabel>
                <select
                  className={selectClass}
                  value={intakeId}
                  onChange={(e) => setIntakeId(e.target.value)}
                  disabled={!programId}
                >
                  <option value="">
                    {!programId
                      ? "Select a program first"
                      : availableIntakes.length === 0
                        ? "No open intakes for this program"
                        : "Select an intake"}
                  </option>
                  {availableIntakes.map((i) => (
                    <option key={i.intakeId} value={i.intakeId}>
                      {i.intakeName} {i.intakeYear} · deadline{" "}
                      {new Date(i.applicationDeadline).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedProgram && (
              <div className="flex items-start gap-3 rounded-xl bg-[#0B1E3D]/5 px-4 py-3">
                <FaGraduationCap className="mt-0.5 shrink-0 text-[#0B1E3D]" size={16} />
                <div className="text-xs font-medium text-[#0B1E3D]/70">
                  <span className="font-bold text-[#0B1E3D]">{selectedProgram.programName}</span> ·{" "}
                  {selectedProgram.durationMonths ? `${selectedProgram.durationMonths} months · ` : ""}
                  Tuition {selectedProgram.currency} {Number(selectedProgram.tuitionFee).toLocaleString()}
                </div>
              </div>
            )}

            <PrimaryButton type="submit" disabled={submitting || !intakeId || !selectedStudent}>
              {submitting ? "Submitting…" : "Submit application"}
            </PrimaryButton>
          </form>
        )}
      </Card>
    </div>
  );
}
