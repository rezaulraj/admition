"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaGraduationCap } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";
import { apiFetch } from "@/lib/api";
import { REQUIRED_STUDENT_DOC_TYPES, STUDENT_DOC_LABELS, type StudentDocType } from "@/lib/student-documents";
import { showAlert } from "@/lib/confirm";
import { Card, ErrorState, FieldLabel, PrimaryButton, SectionHeading, selectClass } from "./ui";
import type { Country, Intake, Program, University } from "./types";
import type { StudentTab } from "./DashboardShell";

export default function NewApplicationTab({
  onCreated,
  initialProgramId,
  onNavigate,
}: {
  onCreated: () => void;
  initialProgramId?: number | null;
  onNavigate: (tab: StudentTab) => void;
}) {
  const { authFetch } = useAuth();
  const { showToast } = useToast();

  const [countries, setCountries] = useState<Country[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [missingDocs, setMissingDocs] = useState<StudentDocType[] | null>(null);

  const [countryId, setCountryId] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [programId, setProgramId] = useState("");
  const [intakeId, setIntakeId] = useState("");

  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingUniversities, setLoadingUniversities] = useState(false);
  const [loadingPrograms, setLoadingPrograms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loadError, setLoadError] = useState("");
  const [success, setSuccess] = useState(false);

  // Set right before setCountryId/setUniversityId during the initialProgramId prefill below, so the
  // cascading effects that normally reset downstream selections on user-driven changes skip that reset once.
  const skipCountryCascade = useRef(false);
  const skipUniversityCascade = useRef(false);

  useEffect(() => {
    apiFetch<Country[]>("/countries")
      .then(setCountries)
      .catch(() => setLoadError("Could not load the list of countries."))
      .finally(() => setLoadingCountries(false));
  }, []);

  useEffect(() => {
    authFetch<{ docType: StudentDocType }[]>("/students/me/documents")
      .then((docs) => {
        const uploaded = new Set(docs.map((d) => d.docType));
        setMissingDocs(REQUIRED_STUDENT_DOC_TYPES.filter((t) => !uploaded.has(t)));
      })
      .catch(() => setMissingDocs([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (skipCountryCascade.current) {
      skipCountryCascade.current = false;
      return;
    }
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
    if (skipUniversityCascade.current) {
      skipUniversityCascade.current = false;
      return;
    }
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

  // Coming from "Apply Now" on a program card — resolve its country/university chain and pre-select
  // everything up through the program, letting the student pick the intake themselves.
  useEffect(() => {
    if (!initialProgramId) return;
    let cancelled = false;
    (async () => {
      try {
        const program = await apiFetch<Program>(`/programs/${initialProgramId}`);
        if (cancelled) return;
        const cid = program.university?.countryId;
        const uid = program.universityId;

        if (cid) {
          setLoadingUniversities(true);
          const unis = await apiFetch<University[]>(`/universities?countryId=${cid}`);
          if (cancelled) return;
          setUniversities(unis);
          setLoadingUniversities(false);
          skipCountryCascade.current = true;
          setCountryId(String(cid));
        }

        setLoadingPrograms(true);
        const progs = await apiFetch<Program[]>(`/programs?universityId=${uid}`);
        if (cancelled) return;
        setPrograms(progs);
        setLoadingPrograms(false);
        skipUniversityCascade.current = true;
        setUniversityId(String(uid));

        setProgramId(String(initialProgramId));
      } catch {
        if (!cancelled) {
          setError("Could not load the program you selected — please choose one below.");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [initialProgramId]);

  const selectedProgram = programs.find((p) => String(p.programId) === programId);
  const availableIntakes: Intake[] = selectedProgram?.intakes ?? [];

  useEffect(() => {
    setIntakeId("");
  }, [programId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (missingDocs && missingDocs.length > 0) {
      await showAlert(
        `Please upload your ${missingDocs.map((t) => STUDENT_DOC_LABELS[t]).join(" and ")} in My Documents before you can submit an application.`,
        "Documents required",
      );
      return;
    }
    if (!intakeId) {
      setError("Please select an intake to apply to.");
      return;
    }
    setSubmitting(true);
    try {
      await authFetch("/applications", { method: "POST", body: { intakeId: Number(intakeId) } });
      setSuccess(true);
      showToast("Application submitted.", "success");
      setTimeout(onCreated, 900);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Could not submit your application.";
      setError(message);
      showToast(message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadError) return <ErrorState message={loadError} />;

  return (
    <div className="fade-in">
      <SectionHeading
        title="New Application"
        subtitle="Pick a destination, university, program and intake to submit a new application."
      />

      <Card>
        {success ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <FaCheckCircle className="text-emerald-500" size={28} />
            <p className="text-sm font-bold text-[#0B1E3D]">Application submitted!</p>
            <p className="text-xs font-medium text-[#0B1E3D]/50">Taking you to My Application…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {missingDocs && missingDocs.length > 0 && (
              <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3 text-xs font-semibold text-amber-800">
                <FaExclamationTriangle className="mt-0.5 shrink-0" size={13} />
                <p>
                  Please upload your {missingDocs.map((t) => STUDENT_DOC_LABELS[t]).join(" and ")} in{" "}
                  <button
                    type="button"
                    onClick={() => onNavigate("documents")}
                    className="font-extrabold underline underline-offset-2 hover:text-amber-900"
                  >
                    My Documents
                  </button>{" "}
                  before you can submit an application.
                </p>
              </div>
            )}
            {initialProgramId && !error && (
              <div className="rounded-xl border border-[#1a5fd8]/20 bg-[#1a5fd8]/5 px-3.5 py-3 text-xs font-semibold text-[#1a5fd8]">
                We've pre-filled this application for the program you selected — just pick an intake below.
              </div>
            )}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
                {error}
              </div>
            )}

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
                {countryId && !loadingUniversities && universities.length === 0 && (
                  <p className="mt-1.5 text-[11px] font-medium text-[#0B1E3D]/40">
                    No universities are listed for this country yet.
                  </p>
                )}
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
              <div className="flex items-start gap-3 rounded-xl bg-[#1a5fd8]/5 px-4 py-3">
                <FaGraduationCap className="mt-0.5 shrink-0 text-[#1a5fd8]" size={16} />
                <div className="text-xs font-medium text-[#0B1E3D]/70">
                  <span className="font-bold text-[#0B1E3D]">{selectedProgram.programName}</span> ·{" "}
                  {selectedProgram.durationMonths ? `${selectedProgram.durationMonths} months · ` : ""}
                  Tuition {selectedProgram.currency} {Number(selectedProgram.tuitionFee).toLocaleString()}
                </div>
              </div>
            )}

            <PrimaryButton type="submit" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit application"}
            </PrimaryButton>
          </form>
        )}
      </Card>
    </div>
  );
}
