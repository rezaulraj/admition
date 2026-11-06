"use client";

import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { apiFetch } from "@/lib/api";
import {
  Card,
  EmptyState,
  ErrorState,
  FieldLabel,
  LoadingState,
  PrimaryButton,
  SectionHeading,
  selectClass,
  inputClass,
} from "./ui";
import type { Country, Program, StudyLevel, SuggestionsResponse } from "./types";

const STUDY_LEVELS: StudyLevel[] = ["Foundation", "Diploma", "Bachelor", "Master"];

function ProgramCard({ program, onApply }: { program: Program; onApply: (programId: number) => void }) {
  return (
    <Card>
      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#1a5fd8]">
        {program.degreeLevel}
      </p>
      <h3 className="mt-1 text-sm font-extrabold text-[#0B1E3D]">{program.programName}</h3>
      <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-[#0B1E3D]/50">
        <FaMapMarkerAlt size={11} />
        {program.university?.universityName}
        {program.university?.country ? `, ${program.university.country.countryName}` : ""}
      </p>
      <div className="mt-3 flex items-center justify-between text-xs font-semibold text-[#0B1E3D]/70">
        <span>
          {program.currency} {Number(program.tuitionFee).toLocaleString()}/yr
        </span>
        {program.durationMonths && <span>{program.durationMonths} months</span>}
      </div>
      {program.fieldOfStudy && (
        <p className="mt-2 text-[11px] font-medium text-[#0B1E3D]/40">{program.fieldOfStudy}</p>
      )}
      <button
        onClick={() => onApply(program.programId)}
        className="mt-3 w-full rounded-xl bg-[#1a5fd8] py-2 text-xs font-bold text-white transition hover:bg-[#1551b9]">
        Apply Now
      </button>
    </Card>
  );
}

export default function ProgramSearchTab({ onApply }: { onApply: (programId: number) => void }) {
  const { authFetch } = useAuth();

  const [countries, setCountries] = useState<Country[]>([]);
  const [countryId, setCountryId] = useState("");
  const [degreeLevel, setDegreeLevel] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");

  const [results, setResults] = useState<Program[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const [suggestions, setSuggestions] = useState<SuggestionsResponse | null>(null);

  useEffect(() => {
    apiFetch<Country[]>("/countries").then(setCountries).catch(() => setCountries([]));
    authFetch<SuggestionsResponse>("/students/me/suggestions")
      .then(setSuggestions)
      .catch(() => setSuggestions(null));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const runSearch = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setSearching(true);
    setSearchError("");
    setHasSearched(true);
    const params = new URLSearchParams();
    if (countryId) params.set("countryId", countryId);
    if (degreeLevel) params.set("degreeLevel", degreeLevel);
    if (fieldOfStudy) params.set("fieldOfStudy", fieldOfStudy);
    try {
      const programs = await apiFetch<Program[]>(`/programs?${params.toString()}`);
      setResults(programs);
    } catch (err) {
      setSearchError(err instanceof ApiError ? err.message : "Search failed. Please try again.");
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="fade-in">
      <SectionHeading title="Program Search" subtitle="Browse programs across our partner universities." />

      <Card>
        <form onSubmit={runSearch} className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div>
            <FieldLabel>Country</FieldLabel>
            <select className={selectClass} value={countryId} onChange={(e) => setCountryId(e.target.value)}>
              <option value="">Any country</option>
              {countries.map((c) => (
                <option key={c.countryId} value={c.countryId}>
                  {c.countryName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel>Study level</FieldLabel>
            <select className={selectClass} value={degreeLevel} onChange={(e) => setDegreeLevel(e.target.value)}>
              <option value="">Any level</option>
              {STUDY_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel>Field of study</FieldLabel>
            <input
              className={inputClass}
              value={fieldOfStudy}
              onChange={(e) => setFieldOfStudy(e.target.value)}
              placeholder="e.g. Computer Science"
            />
          </div>
          <div className="flex items-end">
            <PrimaryButton type="submit" disabled={searching} className="w-full">
              <FaSearch size={12} />
              {searching ? "Searching…" : "Search"}
            </PrimaryButton>
          </div>
        </form>
      </Card>

      {suggestions && suggestions.count > 0 && !hasSearched && (
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
            {suggestions.basedOnPreference ? "Suggested for you" : "Popular programs"}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.programs.map((p) => (
              <ProgramCard key={p.programId} program={p} onApply={onApply} />
            ))}
          </div>
        </div>
      )}

      {hasSearched && (
        <div className="mt-6">
          {searching && <LoadingState label="Searching programs…" />}
          {searchError && <ErrorState message={searchError} onRetry={() => runSearch()} />}
          {!searching && !searchError && results && results.length === 0 && (
            <EmptyState
              title="No programs matched your filters"
              description="Try broadening your search — a different country or study level."
            />
          )}
          {!searching && !searchError && results && results.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((p) => (
                <ProgramCard key={p.programId} program={p} onApply={onApply} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
