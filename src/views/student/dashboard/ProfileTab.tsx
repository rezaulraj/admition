"use client";

import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";
import { apiFetch } from "@/lib/api";
import {
  Card,
  ErrorState,
  FieldLabel,
  LoadingState,
  PrimaryButton,
  SectionHeading,
  inputClass,
  selectClass,
} from "./ui";
import type { Country, StudentProfile, StudyLevel } from "./types";

const STUDY_LEVELS: StudyLevel[] = ["Foundation", "Diploma", "Bachelor", "Master"];

export default function ProfileTab() {
  const { authFetch, refreshAccount } = useAuth();
  const { showToast } = useToast();

  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loadError, setLoadError] = useState("");

  // Basic profile fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [nationalityId, setNationalityId] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);

  // Preference fields
  const [destinationCountryIds, setDestinationCountryIds] = useState<string[]>([]);
  const [intendedStudyLevel, setIntendedStudyLevel] = useState("");
  const [desiredField, setDesiredField] = useState("");
  const [tuitionBudgetUsd, setTuitionBudgetUsd] = useState("");
  const [hasEnglishTest, setHasEnglishTest] = useState(false);
  const [englishTestType, setEnglishTestType] = useState("");
  const [englishTestScore, setEnglishTestScore] = useState("");
  const [savingPreference, setSavingPreference] = useState(false);
  const [preferenceError, setPreferenceError] = useState("");
  const [preferenceSaved, setPreferenceSaved] = useState(false);

  const load = () => {
    setLoadError("");
    setProfile(null);
    authFetch<StudentProfile>("/students/me")
      .then((p) => {
        setProfile(p);
        setFullName(p.fullName);
        setPhone(p.phone ?? "");
        setNationalityId(String(p.nationalityId));
        setDestinationCountryIds(p.destinations.map((d) => String(d.countryId)));
        setIntendedStudyLevel(p.preference?.intendedStudyLevel ?? "");
        setDesiredField(p.preference?.desiredField ?? "");
        setTuitionBudgetUsd(p.preference?.tuitionBudgetUsd ?? "");
        setHasEnglishTest(p.preference?.hasEnglishTest ?? false);
        setEnglishTestType(p.preference?.englishTestType ?? "");
        setEnglishTestScore(p.preference?.englishTestScore ?? "");
      })
      .catch((err) => setLoadError(err instanceof ApiError ? err.message : "Failed to load your profile."));
    apiFetch<Country[]>("/countries").then(setCountries).catch(() => setCountries([]));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileError("");
    setProfileSaved(false);
    setSavingProfile(true);
    try {
      await authFetch("/students/me", {
        method: "PATCH",
        body: {
          fullName,
          phone: phone || undefined,
          nationalityId: Number(nationalityId),
        },
      });
      await refreshAccount();
      setProfileSaved(true);
      showToast("Profile updated.", "success");
      setTimeout(() => setProfileSaved(false), 2500);
    } catch (err) {
      setProfileError(err instanceof ApiError ? err.message : "Could not save your profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePreferenceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPreferenceError("");
    setPreferenceSaved(false);
    setSavingPreference(true);
    try {
      await authFetch("/students/me/preference", {
        method: "PUT",
        body: {
          destinationCountryIds: destinationCountryIds.length
            ? destinationCountryIds.map(Number)
            : undefined,
          intendedStudyLevel: intendedStudyLevel || undefined,
          desiredField: desiredField || undefined,
          tuitionBudgetUsd: tuitionBudgetUsd ? Number(tuitionBudgetUsd) : undefined,
          hasEnglishTest,
          englishTestType: englishTestType || undefined,
          englishTestScore: englishTestScore || undefined,
        },
      });
      setPreferenceSaved(true);
      showToast("Preferences updated.", "success");
      setTimeout(() => setPreferenceSaved(false), 2500);
    } catch (err) {
      setPreferenceError(err instanceof ApiError ? err.message : "Could not save your preferences.");
    } finally {
      setSavingPreference(false);
    }
  };

  if (loadError) return <ErrorState message={loadError} onRetry={load} />;
  if (!profile) return <LoadingState label="Loading your profile…" />;

  return (
    <div className="fade-in space-y-6">
      <SectionHeading title="Profile Update" subtitle="Keep your details and study preferences up to date." />

      <Card>
        <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
          Basic information
        </h3>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          {profileError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
              {profileError}
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Full name</FieldLabel>
              <input className={inputClass} value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div>
              <FieldLabel>Email</FieldLabel>
              <input className={inputClass} value={profile.email} disabled />
            </div>
            <div>
              <FieldLabel>Phone</FieldLabel>
              <input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555 123 4567" />
            </div>
            <div>
              <FieldLabel>Nationality</FieldLabel>
              <select className={selectClass} value={nationalityId} onChange={(e) => setNationalityId(e.target.value)}>
                {countries.map((c) => (
                  <option key={c.countryId} value={c.countryId}>
                    {c.countryName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <PrimaryButton type="submit" disabled={savingProfile}>
              {savingProfile ? "Saving…" : "Save changes"}
            </PrimaryButton>
            {profileSaved && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <FaCheckCircle size={12} /> Saved
              </span>
            )}
          </div>
        </form>
      </Card>

      <Card>
        <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
          Study preferences
        </h3>
        <form onSubmit={handlePreferenceSubmit} className="space-y-4">
          {preferenceError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
              {preferenceError}
            </div>
          )}
          <div>
            <FieldLabel>Destination countries</FieldLabel>
            <select
              multiple
              className={`${selectClass} h-32`}
              value={destinationCountryIds}
              onChange={(e) =>
                setDestinationCountryIds(Array.from(e.target.selectedOptions, (o) => o.value))
              }
            >
              {countries.map((c) => (
                <option key={c.countryId} value={c.countryId}>
                  {c.countryName}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-[11px] font-medium text-[#0B1E3D]/40">
              Hold Ctrl (Windows) or Cmd (Mac) to select more than one.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <FieldLabel>Intended study level</FieldLabel>
              <select className={selectClass} value={intendedStudyLevel} onChange={(e) => setIntendedStudyLevel(e.target.value)}>
                <option value="">Not set</option>
                {STUDY_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel>Desired field</FieldLabel>
              <input className={inputClass} value={desiredField} onChange={(e) => setDesiredField(e.target.value)} placeholder="e.g. Data Science" />
            </div>
            <div>
              <FieldLabel>Tuition budget (USD)</FieldLabel>
              <input
                type="number"
                min="0"
                className={inputClass}
                value={tuitionBudgetUsd}
                onChange={(e) => setTuitionBudgetUsd(e.target.value)}
                placeholder="e.g. 20000"
              />
            </div>
          </div>

          <div className="rounded-xl border border-[#0B1E3D]/8 bg-gray-50/60 p-4">
            <label className="flex items-center gap-2.5 text-sm font-semibold text-[#0B1E3D]">
              <input
                type="checkbox"
                checked={hasEnglishTest}
                onChange={(e) => setHasEnglishTest(e.target.checked)}
                className="h-4 w-4 rounded border-[#0B1E3D]/20 text-[#1a5fd8] focus:ring-[#1a5fd8]"
              />
              I've taken an English proficiency test
            </label>
            {hasEnglishTest && (
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  className={inputClass}
                  value={englishTestType}
                  onChange={(e) => setEnglishTestType(e.target.value)}
                  placeholder="Test type (e.g. IELTS)"
                />
                <input
                  className={inputClass}
                  value={englishTestScore}
                  onChange={(e) => setEnglishTestScore(e.target.value)}
                  placeholder="Score (e.g. 7.0)"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <PrimaryButton type="submit" disabled={savingPreference}>
              {savingPreference ? "Saving…" : "Save preferences"}
            </PrimaryButton>
            {preferenceSaved && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <FaCheckCircle size={12} /> Saved
              </span>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
