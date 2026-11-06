"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaChevronDown, FaFlag, FaGlobeAmericas, FaLink, FaPencilAlt, FaPlus, FaTrash, FaUniversity } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { apiFetch, resolveAssetUrl } from "@/lib/api";
import { confirmDelete } from "@/lib/confirm";
import { useToast } from "@/lib/toast-context";
import {
  Card,
  EmptyState,
  ErrorState,
  FieldLabel,
  LoadingState,
  PrimaryButton,
  SecondaryButton,
  SectionHeading,
  inputClass,
  selectClass,
} from "@/components/dashboard/common/ui";
import CoverImageUploader from "@/components/dashboard/common/CoverImageUploader";
import BannerUploader from "@/components/dashboard/admin/BannerUploader";
import RichTextEditor from "@/components/dashboard/common/RichTextEditor";
import { PaginationControls, usePagination } from "@/components/dashboard/common/Pagination";
import type { Country, Intake, Program, StudyLevel, University } from "@/views/student/dashboard/types";

const STUDY_LEVELS: StudyLevel[] = ["Foundation", "Diploma", "Bachelor", "Master"];
const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD"];

export default function UniversitiesTab() {
  const { authFetch } = useAuth();
  const [countries, setCountries] = useState<Country[]>([]);
  const [universities, setUniversities] = useState<University[] | null>(null);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filterCountryId, setFilterCountryId] = useState("");

  const [editingUniversityId, setEditingUniversityId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [city, setCity] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [admissionBannerUrl, setAdmissionBannerUrl] = useState("");
  const [universityImageUrl, setUniversityImageUrl] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const loadCountries = () => {
    apiFetch<Country[]>("/countries").then(setCountries).catch(() => setCountries([]));
  };

  const load = () => {
    setError("");
    setUniversities(null);
    const params = new URLSearchParams();
    if (filterCountryId) params.set("countryId", filterCountryId);
    apiFetch<University[]>(`/universities?${params.toString()}`)
      .then(setUniversities)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load universities."));
  };

  useEffect(() => {
    loadCountries();
  }, []);

  useEffect(() => {
    load();
  }, [filterCountryId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreateError("");
    setCreating(true);
    try {
      await authFetch("/universities", {
        method: "POST",
        body: {
          universityName: name,
          countryId: Number(countryId),
          city: city || undefined,
          logoUrl: logoUrl || undefined,
          admissionBannerUrl: admissionBannerUrl || undefined,
          universityImageUrl: universityImageUrl || undefined,
        },
      });
      setName("");
      setCountryId("");
      setCity("");
      setLogoUrl("");
      setAdmissionBannerUrl("");
      setUniversityImageUrl("");
      load();
    } catch (err) {
      setCreateError(err instanceof ApiError ? err.message : "Could not create university.");
    } finally {
      setCreating(false);
    }
  };

  const handleSaveEditUniversity = async (universityId: number, dto: Record<string, unknown>) => {
    await authFetch(`/universities/${universityId}`, { method: "PATCH", body: dto });
    setEditingUniversityId(null);
    load();
  };

  const { page, setPage, pageSize, setPageSize, totalPages, totalItems, pageItems } = usePagination(
    universities ?? [],
  );

  const handleDeleteUniversity = async (universityId: number) => {
    try {
      await authFetch(`/universities/${universityId}`, { method: "DELETE" });
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not delete this university.");
    }
  };

  return (
    <div className="fade-in space-y-6">
      <SectionHeading title="Universities & Programs" subtitle="Manage the program catalog students and partners see." />

      <CountriesManager countries={countries} onChanged={loadCountries} />

      <Card>
        <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
          Add a university
        </h3>
        <form onSubmit={handleCreate} className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          {createError && (
            <div className="sm:col-span-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
              {createError}
            </div>
          )}
          <div className="sm:col-span-2">
            <FieldLabel>University name</FieldLabel>
            <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <FieldLabel>Country</FieldLabel>
            <select className={selectClass} value={countryId} onChange={(e) => setCountryId(e.target.value)} required>
              <option value="">Select</option>
              {countries.map((c) => (
                <option key={c.countryId} value={c.countryId}>
                  {c.countryName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel>City</FieldLabel>
            <input className={inputClass} value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div>
            <CoverImageUploader value={logoUrl} onChange={setLogoUrl} label="Logo" endpoint="/universities/image" />
          </div>
          <div>
            <BannerUploader value={admissionBannerUrl} onChange={setAdmissionBannerUrl} label="Admission banner" />
          </div>
          <div>
            <CoverImageUploader
              value={universityImageUrl}
              onChange={setUniversityImageUrl}
              label="University image"
              endpoint="/universities/image"
            />
          </div>
          <div className="sm:col-span-4">
            <PrimaryButton type="submit" disabled={creating}>
              <FaPlus size={12} />
              {creating ? "Creating…" : "Add university"}
            </PrimaryButton>
          </div>
        </form>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">Universities</h3>
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#0B1E3D]/60">Filter by country</label>
          <select
            className={`${selectClass} w-56`}
            value={filterCountryId}
            onChange={(e) => setFilterCountryId(e.target.value)}>
            <option value="">All countries</option>
            {countries.map((c) => (
              <option key={c.countryId} value={c.countryId}>
                {c.countryName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {universities === null && !error && <LoadingState label="Loading universities…" />}
      {error && <ErrorState message={error} onRetry={load} />}
      {universities && universities.length === 0 && <EmptyState title="No universities yet" />}

      {universities && universities.length > 0 && (
        <>
          <div className="space-y-3">
            {pageItems.map((u) => (
              <UniversityRow
                key={u.universityId}
                university={u}
                countries={countries}
                isOpen={expandedId === u.universityId}
                isEditing={editingUniversityId === u.universityId}
                onToggle={() => setExpandedId(expandedId === u.universityId ? null : u.universityId)}
                onStartEdit={() => {
                  setEditingUniversityId(u.universityId);
                  setExpandedId(u.universityId);
                }}
                onCancelEdit={() => setEditingUniversityId(null)}
                onSaveEdit={(dto) => handleSaveEditUniversity(u.universityId, dto)}
                onDelete={() => handleDeleteUniversity(u.universityId)}
              />
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

function CountriesManager({ countries, onChanged }: { countries: Country[]; onChanged: () => void }) {
  const { authFetch } = useAuth();
  const { showToast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [rowError, setRowError] = useState("");

  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [flagUrl, setFlagUrl] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreateError("");
    setCreating(true);
    try {
      await authFetch("/countries", {
        method: "POST",
        body: { countryName, countryCode: countryCode.toUpperCase(), flagUrl: flagUrl || undefined },
      });
      setCountryName("");
      setCountryCode("");
      setFlagUrl("");
      onChanged();
    } catch (err) {
      setCreateError(err instanceof ApiError ? err.message : "Could not create country.");
    } finally {
      setCreating(false);
    }
  };

  const handleSaveEdit = async (countryIdToSave: number, dto: Record<string, unknown>) => {
    setRowError("");
    try {
      await authFetch(`/countries/${countryIdToSave}`, { method: "PATCH", body: dto });
      setEditingId(null);
      onChanged();
    } catch (err) {
      setRowError(err instanceof ApiError ? err.message : "Could not save changes.");
    }
  };

  const handleDelete = async (countryIdToDelete: number) => {
    const confirmed = await confirmDelete("Delete this country? Universities or students referencing it will block this.");
    if (!confirmed) return;
    setRowError("");
    try {
      await authFetch(`/countries/${countryIdToDelete}`, { method: "DELETE" });
      showToast("Country deleted.", "success");
      onChanged();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not delete this country.", "error");
    }
  };

  return (
    <Card>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between text-left">
        <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
          <FaGlobeAmericas size={13} />
          Manage countries ({countries.length})
        </h3>
        <FaChevronDown size={12} className={`text-[#0B1E3D]/30 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>

      {expanded && (
        <div className="mt-4 space-y-4">
          {rowError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
              {rowError}
            </div>
          )}

          <form onSubmit={handleCreate} className="grid grid-cols-1 gap-4 rounded-xl bg-gray-50/60 p-4 sm:grid-cols-4">
            {createError && (
              <div className="sm:col-span-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
                {createError}
              </div>
            )}
            <div className="sm:col-span-2">
              <FieldLabel>Country name</FieldLabel>
              <input className={inputClass} value={countryName} onChange={(e) => setCountryName(e.target.value)} required />
            </div>
            <div>
              <FieldLabel>Code (e.g. USA)</FieldLabel>
              <input
                className={inputClass}
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                maxLength={3}
                required
              />
            </div>
            <div>
              <CoverImageUploader value={flagUrl} onChange={setFlagUrl} label="Flag" endpoint="/countries/flag" />
            </div>
            <div className="sm:col-span-4">
              <PrimaryButton type="submit" disabled={creating}>
                <FaPlus size={12} />
                {creating ? "Creating…" : "Add country"}
              </PrimaryButton>
            </div>
          </form>

          <div className="space-y-2">
            {countries.map((c) => (
              <CountryRow
                key={c.countryId}
                country={c}
                isEditing={editingId === c.countryId}
                onStartEdit={() => setEditingId(c.countryId)}
                onCancelEdit={() => setEditingId(null)}
                onSaveEdit={(dto) => handleSaveEdit(c.countryId, dto)}
                onDelete={() => handleDelete(c.countryId)}
              />
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

function CountryRow({
  country,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
}: {
  country: Country;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSaveEdit: (dto: Record<string, unknown>) => Promise<void>;
  onDelete: () => void;
}) {
  const [countryName, setCountryName] = useState(country.countryName);
  const [countryCode, setCountryCode] = useState(country.countryCode);
  const [flagUrl, setFlagUrl] = useState(country.flagUrl ?? "");
  const [saving, setSaving] = useState(false);

  if (isEditing) {
    return (
      <div className="grid grid-cols-1 gap-3 rounded-xl border border-[#1a5fd8]/20 bg-[#1a5fd8]/5 p-4 sm:grid-cols-4">
        <div className="sm:col-span-2">
          <FieldLabel>Country name</FieldLabel>
          <input className={inputClass} value={countryName} onChange={(e) => setCountryName(e.target.value)} required />
        </div>
        <div>
          <FieldLabel>Code</FieldLabel>
          <input className={inputClass} value={countryCode} onChange={(e) => setCountryCode(e.target.value)} maxLength={3} required />
        </div>
        <div>
          <CoverImageUploader value={flagUrl} onChange={setFlagUrl} label="Flag" endpoint="/countries/flag" />
        </div>
        <div className="flex gap-3 sm:col-span-4">
          <PrimaryButton
            type="button"
            disabled={saving}
            onClick={async () => {
              setSaving(true);
              await onSaveEdit({ countryName, countryCode: countryCode.toUpperCase(), flagUrl: flagUrl || undefined });
              setSaving(false);
            }}>
            {saving ? "Saving…" : "Save changes"}
          </PrimaryButton>
          <SecondaryButton type="button" onClick={onCancelEdit} disabled={saving}>
            Cancel
          </SecondaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-[#0B1E3D]/8 bg-white px-4 py-2.5">
      <div className="flex min-w-0 items-center gap-3">
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#0B1E3D]/6 text-[#0B1E3D]/40">
          {country.flagUrl ? (
            <Image
              src={resolveAssetUrl(country.flagUrl)!}
              alt=""
              fill
              sizes="32px"
              className="object-cover"
            />
          ) : (
            <FaFlag size={12} />
          )}
        </span>
        <p className="truncate text-sm font-semibold text-[#0B1E3D]">
          {country.countryName} <span className="font-normal text-[#0B1E3D]/40">· {country.countryCode}</span>
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <button onClick={onStartEdit} className="text-[#0B1E3D]/50 hover:text-[#1a5fd8]" aria-label="Edit country">
          <FaPencilAlt size={12} />
        </button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700" aria-label="Delete country">
          <FaTrash size={12} />
        </button>
      </div>
    </div>
  );
}

function UniversityRow({
  university,
  countries,
  isOpen,
  isEditing,
  onToggle,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
}: {
  university: University;
  countries: Country[];
  isOpen: boolean;
  isEditing: boolean;
  onToggle: () => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSaveEdit: (dto: Record<string, unknown>) => Promise<void>;
  onDelete: () => void;
}) {
  const { authFetch } = useAuth();
  const [programs, setPrograms] = useState<Program[] | null>(null);
  const [detailError, setDetailError] = useState("");
  const [expandedProgramId, setExpandedProgramId] = useState<number | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyInquiryLink = async () => {
    const url = `${window.location.origin}/inquire/${university.universityId}`;
    try {
      if (window.isSecureContext && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        // navigator.clipboard is unavailable outside secure contexts (e.g. plain-HTTP
        // VPS deployments not on localhost), so fall back to the legacy copy command.
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 1800);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  const [programName, setProgramName] = useState("");
  const [degreeLevel, setDegreeLevel] = useState<StudyLevel>("Bachelor");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [tuitionFee, setTuitionFee] = useState("");
  const [applicationFee, setApplicationFee] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [admissionDetails, setAdmissionDetails] = useState("");
  const [addingProgram, setAddingProgram] = useState(false);

  const loadPrograms = () => {
    setDetailError("");
    apiFetch<Program[]>(`/programs?universityId=${university.universityId}`)
      .then(setPrograms)
      .catch((err) => setDetailError(err instanceof ApiError ? err.message : "Failed to load programs."));
  };

  useEffect(() => {
    if (isOpen && programs === null) loadPrograms();
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddProgram = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddingProgram(true);
    try {
      await authFetch(`/universities/${university.universityId}/programs`, {
        method: "POST",
        body: {
          programName,
          degreeLevel,
          fieldOfStudy: fieldOfStudy || undefined,
          tuitionFee: Number(tuitionFee),
          applicationFee: applicationFee ? Number(applicationFee) : undefined,
          currency,
          admissionDetails: admissionDetails || undefined,
        },
      });
      setProgramName("");
      setFieldOfStudy("");
      setTuitionFee("");
      setApplicationFee("");
      setCurrency("USD");
      setAdmissionDetails("");
      loadPrograms();
    } catch (err) {
      setDetailError(err instanceof ApiError ? err.message : "Could not create program.");
    } finally {
      setAddingProgram(false);
    }
  };

  const handleDeleteProgram = async (programId: number) => {
    try {
      await authFetch(`/programs/${programId}`, { method: "DELETE" });
      loadPrograms();
    } catch (err) {
      setDetailError(err instanceof ApiError ? err.message : "Could not delete this program.");
    }
  };

  return (
    <Card className="p-0">
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <button onClick={onToggle} className="flex flex-1 items-center gap-3 text-left min-w-0">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#0B1E3D]/10 text-[#0B1E3D]">
            {university.logoUrl ? (
              <Image
                src={resolveAssetUrl(university.logoUrl)!}
                alt=""
                fill
                sizes="40px"
                className="object-cover"
              />
            ) : (
              <FaUniversity size={15} />
            )}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#0B1E3D]">{university.universityName}</p>
            <p className="truncate text-xs font-medium text-[#0B1E3D]/45">
              {university.city ? `${university.city}, ` : ""}
              {university.country?.countryName}
            </p>
          </div>
        </button>
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={handleCopyInquiryLink}
            className={`text-xs font-bold ${linkCopied ? "text-emerald-600" : "text-[#0B1E3D]/50 hover:text-[#1a5fd8]"}`}
            aria-label="Copy inquiry landing page link"
            title="Copy inquiry landing page link — for email marketing campaigns">
            {linkCopied ? "Copied!" : <FaLink size={13} />}
          </button>
          <button onClick={onStartEdit} className="text-[#0B1E3D]/50 hover:text-[#1a5fd8]" aria-label="Edit university">
            <FaPencilAlt size={13} />
          </button>
          <button onClick={onDelete} className="text-red-500 hover:text-red-700" aria-label="Delete university">
            <FaTrash size={13} />
          </button>
          <button onClick={onToggle}>
            <FaChevronDown size={12} className={`text-[#0B1E3D]/30 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {isOpen && isEditing && (
        <UniversityEditForm university={university} countries={countries} onCancel={onCancelEdit} onSave={onSaveEdit} />
      )}

      {isOpen && !isEditing && (
        <div className="border-t border-[#0B1E3D]/8 px-5 py-4 space-y-4">
          {detailError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
              {detailError}
            </div>
          )}

          {programs === null ? (
            <LoadingState label="Loading programs…" />
          ) : programs.length === 0 ? (
            <p className="text-xs font-medium text-[#0B1E3D]/40">No programs added yet.</p>
          ) : (
            <div className="space-y-2">
              {programs.map((p) => (
                <ProgramRow
                  key={p.programId}
                  program={p}
                  isOpen={expandedProgramId === p.programId}
                  onToggle={() => setExpandedProgramId(expandedProgramId === p.programId ? null : p.programId)}
                  onDelete={() => handleDeleteProgram(p.programId)}
                  onRefresh={loadPrograms}
                />
              ))}
            </div>
          )}

          <form onSubmit={handleAddProgram} className="grid grid-cols-1 gap-3 rounded-xl bg-gray-50/60 p-4 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <FieldLabel>Program name</FieldLabel>
              <input className={inputClass} value={programName} onChange={(e) => setProgramName(e.target.value)} required />
            </div>
            <div>
              <FieldLabel>Degree level</FieldLabel>
              <select className={selectClass} value={degreeLevel} onChange={(e) => setDegreeLevel(e.target.value as StudyLevel)}>
                {STUDY_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel>Tuition fee</FieldLabel>
              <input type="number" min="0" className={inputClass} value={tuitionFee} onChange={(e) => setTuitionFee(e.target.value)} required />
            </div>
            <div>
              <FieldLabel>Currency</FieldLabel>
              <select className={selectClass} value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {CURRENCIES.map((cur) => (
                  <option key={cur} value={cur}>
                    {cur}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel>Application fee</FieldLabel>
              <input type="number" min="0" className={inputClass} value={applicationFee} onChange={(e) => setApplicationFee(e.target.value)} placeholder="0" />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel>Field of study</FieldLabel>
              <input className={inputClass} value={fieldOfStudy} onChange={(e) => setFieldOfStudy(e.target.value)} placeholder="e.g. Computer Science" />
            </div>
            <div className="sm:col-span-4">
              <FieldLabel>Admission details</FieldLabel>
              <RichTextEditor
                value={admissionDetails}
                onChange={setAdmissionDetails}
                placeholder="Write admission requirements, process, notes…"
              />
            </div>
            <div className="flex items-end">
              <PrimaryButton type="submit" disabled={addingProgram} className="w-full">
                <FaPlus size={11} />
                Add program
              </PrimaryButton>
            </div>
          </form>
        </div>
      )}
    </Card>
  );
}

function UniversityEditForm({
  university,
  countries,
  onCancel,
  onSave,
}: {
  university: University;
  countries: Country[];
  onCancel: () => void;
  onSave: (dto: Record<string, unknown>) => Promise<void>;
}) {
  const [name, setName] = useState(university.universityName);
  const [countryId, setCountryId] = useState(String(university.countryId));
  const [city, setCity] = useState(university.city ?? "");
  const [logoUrl, setLogoUrl] = useState(university.logoUrl ?? "");
  const [admissionBannerUrl, setAdmissionBannerUrl] = useState(university.admissionBannerUrl ?? "");
  const [universityImageUrl, setUniversityImageUrl] = useState(university.universityImageUrl ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      await onSave({
        universityName: name,
        countryId: Number(countryId),
        city: city || undefined,
        logoUrl: logoUrl || undefined,
        admissionBannerUrl: admissionBannerUrl || undefined,
        universityImageUrl: universityImageUrl || undefined,
      });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not save changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="border-t border-[#0B1E3D]/8 px-5 py-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {error && (
          <div className="sm:col-span-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
            {error}
          </div>
        )}
        <div className="sm:col-span-2">
          <FieldLabel>University name</FieldLabel>
          <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <FieldLabel>Country</FieldLabel>
          <select className={selectClass} value={countryId} onChange={(e) => setCountryId(e.target.value)} required>
            {countries.map((c) => (
              <option key={c.countryId} value={c.countryId}>
                {c.countryName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel>City</FieldLabel>
          <input className={inputClass} value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div>
          <CoverImageUploader value={logoUrl} onChange={setLogoUrl} label="Logo" endpoint="/universities/image" />
        </div>
        <div>
          <BannerUploader value={admissionBannerUrl} onChange={setAdmissionBannerUrl} label="Admission banner" />
        </div>
        <div>
          <CoverImageUploader
            value={universityImageUrl}
            onChange={setUniversityImageUrl}
            label="University image"
            endpoint="/universities/image"
          />
        </div>
        <div className="flex gap-3 sm:col-span-4">
          <PrimaryButton onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </PrimaryButton>
          <SecondaryButton onClick={onCancel} disabled={saving}>
            Cancel
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}

function ProgramRow({
  program,
  isOpen,
  onToggle,
  onDelete,
  onRefresh,
}: {
  program: Program;
  isOpen: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onRefresh: () => void;
}) {
  const { authFetch } = useAuth();
  const [intakeName, setIntakeName] = useState("Fall");
  const [intakeYear, setIntakeYear] = useState(String(new Date().getFullYear() + 1));
  const [deadline, setDeadline] = useState("");
  const [seats, setSeats] = useState("");
  const [addingIntake, setAddingIntake] = useState(false);
  const [intakeError, setIntakeError] = useState("");

  const [admissionDetails, setAdmissionDetails] = useState(program.admissionDetails ?? "");
  const [savingDetails, setSavingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState("");
  const [detailsSaved, setDetailsSaved] = useState(false);

  const [programName, setProgramName] = useState(program.programName);
  const [degreeLevel, setDegreeLevel] = useState<StudyLevel>(program.degreeLevel);
  const [fieldOfStudy, setFieldOfStudy] = useState(program.fieldOfStudy ?? "");
  const [durationYears, setDurationYears] = useState(program.durationMonths != null ? String(program.durationMonths / 12) : "");
  const [tuitionFee, setTuitionFee] = useState(program.tuitionFee);
  const [applicationFee, setApplicationFee] = useState(program.applicationFee);
  const [currency, setCurrency] = useState(program.currency ?? "USD");
  const [savingDetails2, setSavingDetails2] = useState(false);
  const [details2Error, setDetails2Error] = useState("");
  const [details2Saved, setDetails2Saved] = useState(false);

  const handleSaveProgramDetails = async () => {
    setDetails2Error("");
    setDetails2Saved(false);
    setSavingDetails2(true);
    try {
      await authFetch(`/programs/${program.programId}`, {
        method: "PATCH",
        body: {
          programName,
          degreeLevel,
          fieldOfStudy: fieldOfStudy || undefined,
          durationMonths: durationYears ? Math.round(Number(durationYears) * 12) : undefined,
          tuitionFee: Number(tuitionFee),
          applicationFee: Number(applicationFee),
          currency,
        },
      });
      setDetails2Saved(true);
      onRefresh();
    } catch (err) {
      setDetails2Error(err instanceof ApiError ? err.message : "Could not save program details.");
    } finally {
      setSavingDetails2(false);
    }
  };

  const handleAddIntake = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIntakeError("");
    setAddingIntake(true);
    try {
      await authFetch(`/programs/${program.programId}/intakes`, {
        method: "POST",
        body: {
          intakeName,
          intakeYear: Number(intakeYear),
          applicationDeadline: deadline,
          seatsAvailable: seats ? Number(seats) : undefined,
        },
      });
      setDeadline("");
      setSeats("");
      onRefresh();
    } catch (err) {
      setIntakeError(err instanceof ApiError ? err.message : "Could not add intake.");
    } finally {
      setAddingIntake(false);
    }
  };

  const handleSaveAdmissionDetails = async () => {
    setDetailsError("");
    setDetailsSaved(false);
    setSavingDetails(true);
    try {
      await authFetch(`/programs/${program.programId}`, {
        method: "PATCH",
        body: { admissionDetails: admissionDetails || undefined },
      });
      setDetailsSaved(true);
      onRefresh();
    } catch (err) {
      setDetailsError(err instanceof ApiError ? err.message : "Could not save admission details.");
    } finally {
      setSavingDetails(false);
    }
  };

  return (
    <div className="rounded-xl border border-[#0B1E3D]/8 bg-white">
      <div className="flex items-center justify-between gap-3 px-3.5 py-2.5">
        <button onClick={onToggle} className="flex-1 text-left">
          <p className="text-sm font-semibold text-[#0B1E3D]">
            {program.programName}{" "}
            <span className="font-normal text-[#0B1E3D]/45">
              · {program.degreeLevel} · {program.currency} {Number(program.tuitionFee).toLocaleString()}/yr
            </span>
          </p>
        </button>
        <div className="flex items-center gap-3">
          <button onClick={onDelete} className="text-red-500 hover:text-red-700" aria-label="Delete program">
            <FaTrash size={12} />
          </button>
          <button onClick={onToggle}>
            <FaChevronDown size={11} className={`text-[#0B1E3D]/30 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-[#0B1E3D]/8 px-3.5 py-3 space-y-4">
          <div>
            <FieldLabel>Program details</FieldLabel>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="col-span-2">
                <FieldLabel>Program name</FieldLabel>
                <input
                  className={inputClass}
                  placeholder="Program name"
                  value={programName}
                  onChange={(e) => {
                    setProgramName(e.target.value);
                    setDetails2Saved(false);
                  }}
                />
              </div>
              <div>
                <FieldLabel>Degree level</FieldLabel>
                <select
                  className={selectClass}
                  value={degreeLevel}
                  onChange={(e) => {
                    setDegreeLevel(e.target.value as StudyLevel);
                    setDetails2Saved(false);
                  }}>
                  {STUDY_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel>Duration (years)</FieldLabel>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  className={inputClass}
                  placeholder="e.g. 4"
                  value={durationYears}
                  onChange={(e) => {
                    setDurationYears(e.target.value);
                    setDetails2Saved(false);
                  }}
                />
              </div>
              <div className="col-span-2">
                <FieldLabel>Field of study</FieldLabel>
                <input
                  className={inputClass}
                  placeholder="Field of study"
                  value={fieldOfStudy}
                  onChange={(e) => {
                    setFieldOfStudy(e.target.value);
                    setDetails2Saved(false);
                  }}
                />
              </div>
              <div>
                <FieldLabel>Tuition fee</FieldLabel>
                <input
                  type="number"
                  min="0"
                  className={inputClass}
                  placeholder="Tuition fee"
                  value={tuitionFee}
                  onChange={(e) => {
                    setTuitionFee(e.target.value);
                    setDetails2Saved(false);
                  }}
                />
              </div>
              <div>
                <FieldLabel>Currency</FieldLabel>
                <select
                  className={selectClass}
                  value={currency}
                  onChange={(e) => {
                    setCurrency(e.target.value);
                    setDetails2Saved(false);
                  }}>
                  {CURRENCIES.map((cur) => (
                    <option key={cur} value={cur}>
                      {cur}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel>Application fee</FieldLabel>
                <input
                  type="number"
                  min="0"
                  className={inputClass}
                  placeholder="Application fee"
                  value={applicationFee}
                  onChange={(e) => {
                    setApplicationFee(e.target.value);
                    setDetails2Saved(false);
                  }}
                />
              </div>
            </div>
            {details2Error && <p className="mt-1.5 text-xs font-semibold text-red-600">{details2Error}</p>}
            {details2Saved && !details2Error && <p className="mt-1.5 text-xs font-semibold text-emerald-600">Saved.</p>}
            <PrimaryButton onClick={handleSaveProgramDetails} disabled={savingDetails2} className="mt-2">
              {savingDetails2 ? "Saving…" : "Save program details"}
            </PrimaryButton>
          </div>

          <div>
            <FieldLabel>Admission details</FieldLabel>
            <RichTextEditor
              value={admissionDetails}
              onChange={(html) => {
                setAdmissionDetails(html);
                setDetailsSaved(false);
              }}
              placeholder="Write admission requirements, process, notes…"
            />
            {detailsError && <p className="mt-1.5 text-xs font-semibold text-red-600">{detailsError}</p>}
            {detailsSaved && !detailsError && (
              <p className="mt-1.5 text-xs font-semibold text-emerald-600">Saved.</p>
            )}
            <PrimaryButton onClick={handleSaveAdmissionDetails} disabled={savingDetails} className="mt-2">
              {savingDetails ? "Saving…" : "Save admission details"}
            </PrimaryButton>
          </div>

          {intakeError && <p className="text-xs font-semibold text-red-600">{intakeError}</p>}

          {(program.intakes ?? []).length === 0 ? (
            <p className="text-xs font-medium text-[#0B1E3D]/40">No intakes yet.</p>
          ) : (
            <ul className="space-y-1">
              {(program.intakes ?? []).map((i: Intake) => (
                <li key={i.intakeId} className="flex items-center justify-between text-xs text-[#0B1E3D]/70">
                  <span>
                    {i.intakeName} {i.intakeYear} — deadline {new Date(i.applicationDeadline).toLocaleDateString()}
                  </span>
                  <span>{i.seatsAvailable != null ? `${i.seatsAvailable} seats` : ""}</span>
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleAddIntake} className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            <div>
              <FieldLabel>Intake name</FieldLabel>
              <input className={inputClass} value={intakeName} onChange={(e) => setIntakeName(e.target.value)} placeholder="Fall" required />
            </div>
            <div>
              <FieldLabel>Year</FieldLabel>
              <input
                type="number"
                className={inputClass}
                value={intakeYear}
                onChange={(e) => setIntakeYear(e.target.value)}
                required
              />
            </div>
            <div>
              <FieldLabel>Application deadline</FieldLabel>
              <input
                type="date"
                className={inputClass}
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </div>
            <div>
              <FieldLabel>Seats available</FieldLabel>
              <input
                type="number"
                min="0"
                className={inputClass}
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                placeholder="Seats"
              />
            </div>
            <div className="flex items-end">
              <PrimaryButton type="submit" disabled={addingIntake} className="w-full">
                <FaPlus size={10} />
              </PrimaryButton>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
