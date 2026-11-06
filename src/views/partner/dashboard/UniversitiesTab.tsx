"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaGraduationCap, FaMapMarkerAlt, FaSearch, FaUniversity } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { apiFetch, ApiError, resolveAssetUrl } from "@/lib/api";
import { Card, EmptyState, ErrorState, LoadingState, SectionHeading, inputClass, selectClass } from "@/components/dashboard/common/ui";
import { PaginationControls, usePagination } from "@/components/dashboard/common/Pagination";
import type { Country, University } from "@/views/student/dashboard/types";

export default function UniversitiesTab({ onSelectUniversity }: { onSelectUniversity: (university: University) => void }) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [universities, setUniversities] = useState<University[] | null>(null);
  const [error, setError] = useState("");
  const [countryId, setCountryId] = useState("");
  const [search, setSearch] = useState("");

  const load = () => {
    setError("");
    setUniversities(null);
    const params = new URLSearchParams();
    if (countryId) params.set("countryId", countryId);
    if (search) params.set("search", search);
    apiFetch<University[]>(`/universities?${params.toString()}`)
      .then(setUniversities)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load universities."));
  };

  useEffect(() => {
    apiFetch<Country[]>("/countries").then(setCountries).catch(() => setCountries([]));
  }, []);

  useEffect(() => {
    load();
  }, [countryId, search]); // eslint-disable-line react-hooks/exhaustive-deps

  const { page, setPage, pageSize, setPageSize, totalPages, totalItems, pageItems } = usePagination(
    universities ?? [],
  );

  return (
    <div className="fade-in space-y-6">
      <SectionHeading
        title="Universities"
        subtitle="Browse partner universities — pick one to view its programs and apply."
      />

      <Card>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2 relative">
            <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0B1E3D]/30" size={13} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search universities…"
              className={`${inputClass} pl-9`}
            />
          </div>
          <select className={selectClass} value={countryId} onChange={(e) => setCountryId(e.target.value)}>
            <option value="">All countries</option>
            {countries.map((c) => (
              <option key={c.countryId} value={c.countryId}>
                {c.countryName}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {universities === null && !error && <LoadingState label="Loading universities…" />}
      {error && <ErrorState message={error} onRetry={load} />}
      {universities && universities.length === 0 && <EmptyState title="No universities match your filters" />}

      {universities && universities.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((u) => (
              <UniversityCard key={u.universityId} university={u} onClick={() => onSelectUniversity(u)} />
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

function UniversityCard({ university, onClick }: { university: University; onClick: () => void }) {
  return (
    <button onClick={onClick} className="group text-left">
      <div className="overflow-hidden rounded-2xl border border-[#0B1E3D]/8 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#1E3A8A]/25 group-hover:shadow-xl group-hover:shadow-[#1E3A8A]/10">
        <div className="relative h-32 w-full overflow-hidden bg-linear-to-br from-[#1E3A8A]/12 via-[#1E3A8A]/6 to-transparent">
          {university.universityImageUrl ? (
            <Image
              src={resolveAssetUrl(university.universityImageUrl)!}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[#1E3A8A]/15">
              <FaUniversity size={34} />
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
          <span className="absolute -bottom-6 left-4 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[3px] border-white bg-white text-[#1E3A8A] shadow-md">
            {university.logoUrl ? (
              <Image
                src={resolveAssetUrl(university.logoUrl)!}
                alt=""
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : (
              <FaUniversity size={18} />
            )}
          </span>
        </div>
        <div className="px-4 pb-4 pt-8">
          <p className="truncate text-[15px] font-extrabold text-[#0B1E3D] transition-colors group-hover:text-[#1E3A8A]">
            {university.universityName}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-[#0B1E3D]/50">
            <FaMapMarkerAlt size={10} className="text-[#1E3A8A]/50" />
            {university.city ? `${university.city}, ` : ""}
            {university.country?.countryName}
          </p>
          <div className="mt-3.5 flex items-center justify-between border-t border-[#0B1E3D]/6 pt-3">
            {university._count ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E3A8A]/8 px-2.5 py-1 text-[11px] font-bold text-[#1E3A8A]">
                <FaGraduationCap size={10} />
                {university._count.programs} programs
              </span>
            ) : (
              <span />
            )}
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1E3A8A]/40 transition-all group-hover:gap-1.5 group-hover:text-[#1E3A8A]">
              View
              <HiArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
