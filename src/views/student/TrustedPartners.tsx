"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUniversity } from "react-icons/fa";
import { apiFetch, resolveAssetUrl } from "@/lib/api";
import type { Country, University } from "@/views/student/dashboard/types";

const TrustedPartners = () => {
  const [universities, setUniversities] = useState<University[] | null>(null);
  const [activeCountryId, setActiveCountryId] = useState<number | null>(null);

  useEffect(() => {
    apiFetch<University[]>("/universities")
      .then(setUniversities)
      .catch(() => setUniversities([]));
  }, []);

  // Only countries that actually have partner universities get a tab — no point showing an
  // empty logo grid for a country we don't have any partners in yet.
  const { countries, universitiesByCountry } = useMemo(() => {
    const byCountry = new Map<number, { country: Country; universities: University[] }>();
    for (const u of universities ?? []) {
      if (!u.country) continue;
      const entry = byCountry.get(u.countryId);
      if (entry) entry.universities.push(u);
      else byCountry.set(u.countryId, { country: u.country, universities: [u] });
    }
    const sorted = [...byCountry.values()].sort((a, b) => b.universities.length - a.universities.length);
    return {
      countries: sorted.map((e) => e.country),
      universitiesByCountry: Object.fromEntries(sorted.map((e) => [e.country.countryId, e.universities])),
    };
  }, [universities]);

  useEffect(() => {
    if (activeCountryId === null && countries.length > 0) {
      setActiveCountryId(countries[0].countryId);
    }
  }, [countries, activeCountryId]);

  const activeCountry = countries.find((c) => c.countryId === activeCountryId);
  const activeUniversities = activeCountryId ? (universitiesByCountry[activeCountryId] ?? []) : [];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 space-y-3">
          <span className="text-sm font-bold font-sans tracking-[2px] text-primary-600 uppercase">
            TRUSTED PARTNERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 max-w-3xl mx-auto leading-tight">
            Trusted by {universities?.length ?? ""} Universities, Colleges, and Schools Worldwide
          </h2>
        </div>

        {universities === null ? (
          <div className="flex justify-center py-12 text-sm font-medium text-neutral-400">Loading partners…</div>
        ) : countries.length === 0 ? (
          <div className="flex justify-center py-12 text-sm font-medium text-neutral-400">
            No partner universities yet.
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {countries.map((country) => (
                <button
                  key={country.countryId}
                  onClick={() => setActiveCountryId(country.countryId)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                    activeCountryId === country.countryId
                      ? "bg-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105"
                      : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
                  }`}
                >
                  {country.flagUrl ? (
                    <Image
                      src={resolveAssetUrl(country.flagUrl) ?? ""}
                      alt=""
                      width={20}
                      height={20}
                      className="h-5 w-5 rounded-sm object-cover"
                    />
                  ) : (
                    <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-black/10 text-[9px] font-bold">
                      {country.countryCode}
                    </span>
                  )}
                  {country.countryName}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
              {activeUniversities.map((university, index) => (
                <div
                  key={university.universityId}
                  className="group bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-neutral-100 hover:border-primary-200 flex items-center justify-center min-h-30 animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    {university.logoUrl ? (
                      <div className="relative h-16 w-40">
                        <Image
                          src={resolveAssetUrl(university.logoUrl) ?? ""}
                          alt={university.universityName}
                          fill
                          sizes="160px"
                          className="object-contain transition-transform duration-300 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-neutral-400">
                        <FaUniversity size={24} />
                        <span className="text-center text-xs font-semibold leading-tight">
                          {university.universityName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Link
                href={`/explore?countryId=${activeCountryId}`}
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold font-sans text-base px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 hover:-translate-y-0.5 group"
              >
                <span className="flex items-center gap-2">
                  Explore More {activeCountry?.countryName} Institutions
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default TrustedPartners;
