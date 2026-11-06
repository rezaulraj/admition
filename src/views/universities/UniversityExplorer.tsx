"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type University = {
  slug: string;
  name: string;
  country: string;
  initials: string;
  color: string;
  note?: string;
  logo: string;
};

const destinations = [
  "All destinations",
  "United Kingdom",
  "Hungary",
  "Cyprus",
  "Malta",
];

const universities: University[] = [
  {
    slug: "bpp-university",
    name: "BPP University",
    country: "United Kingdom",
    initials: "BP",
    color: "#2F5DA8",
    logo: "/univercity-logo/bpp.jpg",
  },
  {
    slug: "university-of-hertfordshire",
    name: "University of Hertfordshire",
    country: "United Kingdom",
    initials: "UH",
    color: "#1366E0",
    logo: "/univercity-logo/uh.jpg",
  },
  {
    slug: "university-of-law",
    name: "University of Law",
    country: "United Kingdom",
    initials: "UL",
    color: "#1B1B1B",
    note: "Except Business Course",
    logo: "/univercity-logo/low.png",
  },
  {
    slug: "university-of-chester",
    name: "University of Chester",
    country: "United Kingdom",
    initials: "UC",
    color: "#2F9E5C",
    note: "Except Sylhet",
    logo: "/univercity-logo/uoc.png",
  },
  {
    slug: "london-south-bank-university",
    name: "London South Bank University",
    country: "United Kingdom",
    initials: "LS",
    color: "#F58B0F",
    note: "Except Sylhet, Except Business Course",
    logo: "/univercity-logo/lsbu.jpg",
  },
  {
    slug: "aston-university-london",
    name: "Aston University, London",
    country: "United Kingdom",
    initials: "AL",
    color: "#1366E0",
    note: "Except Sylhet",
    logo: "/univercity-logo/aul.png",
  },
  {
    slug: "university-of-hull-london",
    name: "University of Hull - London",
    country: "United Kingdom",
    initials: "HL",
    color: "#2F5DA8",
    note: "Except Sylhet",
    logo: "/univercity-logo/uoh.png",
  },
  {
    slug: "regent-college-london",
    name: "Regent College London",
    country: "United Kingdom",
    initials: "RC",
    color: "#1B1B1B",
    note: "Except UG",
    logo: "/univercity-logo/rcl.png",
  },
  {
    slug: "university-of-bedfordshire",
    name: "University of Bedfordshire",
    country: "United Kingdom",
    initials: "UB",
    color: "#1366E0",
    note: "Except Sylhet",
    logo: "/univercity-logo/uob.png",
  },
  {
    slug: "anglia-ruskin-university",
    name: "Anglia Ruskin University",
    country: "United Kingdom",
    initials: "AR",
    color: "#2F9E5C",
    note: "UG Sylhet Restricted",
    logo: "/univercity-logo/aru.jpg",
  },
  {
    slug: "university-of-brighton",
    name: "University of Brighton",
    country: "United Kingdom",
    initials: "BR",
    color: "#F58B0F",
    logo: "/univercity-logo/uobb.jpg",
  },
  {
    slug: "university-of-south-wales",
    name: "University of South Wales",
    country: "United Kingdom",
    initials: "SW",
    color: "#1366E0",
    logo: "/univercity-logo/uosw.png",
  },
  {
    slug: "aston-university-birmingham",
    name: "Aston University, Birmingham",
    country: "United Kingdom",
    initials: "AB",
    color: "#2F5DA8",
    logo: "/univercity-logo/aub.jpg",
  },
  {
    slug: "cardiff-metropolitan-university",
    name: "Cardiff Metropolitan University",
    country: "United Kingdom",
    initials: "CM",
    color: "#1B1B1B",
    note: "Full Deposit for Sylhet",
    logo: "/univercity-logo/cfu.jpg",
  },
  {
    slug: "canterbury-christ-church-university",
    name: "Canterbury Christ Church University",
    country: "United Kingdom",
    initials: "CC",
    color: "#2F9E5C",
    note: "Except UG",
    logo: "/univercity-logo/cccu.png",
  },
  {
    slug: "uws-london-campus",
    name: "UWS - London Campus",
    country: "United Kingdom",
    initials: "UW",
    color: "#F58B0F",
    logo: "/univercity-logo/uws.jpg",
  },
  {
    slug: "aberystwyth-university",
    name: "Aberystwyth University",
    country: "United Kingdom",
    initials: "AY",
    color: "#1366E0",
    logo: "/univercity-logo/au.jpg",
  },
  {
    slug: "university-of-hartpury",
    name: "University of Hartpury",
    country: "United Kingdom",
    initials: "HP",
    color: "#2F5DA8",
    logo: "/univercity-logo/uoh.png",
  },
  // {
  //   slug: "atlantis-college",
  //   name: "Atlantis College",
  //   country: "Cyprus",
  //   initials: "AT",
  //   color: "#1B1B1B",
  //   logo: "/univercity-logo/aui.png",
  // },
  // {
  //   slug: "american-university-of-cyprus",
  //   name: "American University of Cyprus",
  //   country: "Cyprus",
  //   initials: "AC",
  //   color: "#2F9E5C",
  //   logo: "/univercity-logo/auc.png",
  // },
  // {
  //   slug: "john-von-neumann-university",
  //   name: "John von Neumann University",
  //   country: "Hungary",
  //   initials: "JV",
  //   color: "#F58B0F",
  //   logo: "/univercity-logo/jvnu.png",
  // },
  {
    slug: "training-three-sixty",
    name: "Training Three Sixty",
    country: "Malta",
    initials: "T3",
    color: "#1366E0",
    logo: "/univercity-logo/tts.png",
  },
  {
    slug: "thinktalent",
    name: "ThinkTalent",
    country: "Malta",
    initials: "TT",
    color: "#2F5DA8",
    logo: "/univercity-logo/thinktalent.webp",
  },
  {
    slug: "learnkey-institute",
    name: "LearnKey Institute",
    country: "Malta",
    initials: "LK",
    color: "#F58B0F",
    logo: "/univercity-logo/learnkeyinstutie.png",
  },
];

function UniversityLogo({ uni }: { uni: University }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    // Graceful fallback if a logo file is missing/broken
    return (
      <div
        className="flex h-full w-full items-center justify-center rounded-xl text-sm font-bold text-white"
        style={{ backgroundColor: uni.color }}
      >
        {uni.initials}
      </div>
    );
  }

  return (
    <Image
      src={uni.logo}
      alt={`${uni.name} logo`}
      height={80}
      width={160}
      className="object-contain p-1"
      onError={() => setFailed(true)}
    />
  );
}

export default function UniversityExplorer() {
  const [query, setQuery] = useState("");
  const [destination, setDestination] = useState("All destinations");

  const filtered = useMemo(() => {
    return universities.filter((u) => {
      const matchesQuery =
        query.trim() === "" ||
        u.name.toLowerCase().includes(query.toLowerCase());
      const matchesDestination =
        destination === "All destinations" || u.country === destination;
      return matchesQuery && matchesDestination;
    });
  }, [query, destination]);

  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-16">
      <div className="mx-auto container">
        <p className="text-xs font-bold uppercase tracking-widest text-[#1366E0]">
          Universities
        </p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-[#1B1B1B] sm:text-4xl">
          Explore Universities Worldwide.
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-[#6B6B6B] sm:text-base">
          Browse universities and pathway colleges across our study
          destinations. Click a university to see its courses.
        </p>

        {/* Search + destination filter */}
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[#ECECEC] bg-white p-4 shadow-sm sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full">
            <label className="text-xs font-semibold text-[#6B6B6B]">
              Search universities
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Chester, Aston"
              className="mt-1 w-full rounded-xl border border-[#E5E5E5] px-4 py-3 text-sm text-[#1B1B1B] outline-none placeholder:text-[#9A9A9A] focus:border-[#1366E0]"
            />
          </div>

          <div className="w-full sm:w-56">
            <label className="text-xs font-semibold text-[#6B6B6B]">
              Destination
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#E5E5E5] px-4 py-3 text-sm text-[#1B1B1B] outline-none focus:border-[#1366E0]"
            >
              {destinations.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-6 text-sm text-[#6B6B6B]">
          Showing {filtered.length} of {universities.length} universities
        </p>

        {/* Results grid */}
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((uni) => (
            <Link
              key={uni.slug}
              href={`/courses?university=${uni.slug}`}
              aria-label={`View courses at ${uni.name}`}
              className="group flex flex-col items-center rounded-2xl border border-[#ECECEC] bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative flex h-20 w-36 items-center justify-center overflow-hidden rounded-2xl border border-[#ECECEC] bg-white shadow-sm ring-1 ring-black/[0.02] transition-transform group-hover:scale-105">
                <UniversityLogo uni={uni} />
              </div>

              <h3 className="mt-4 text-sm font-semibold leading-snug text-[#1B1B1B] sm:text-base">
                {uni.name}
              </h3>

              <p className="mt-1 text-xs font-medium text-[#2F5DA8] sm:text-sm">
                {uni.country}
              </p>

              {uni.note && (
                <p className="mt-2 rounded-full bg-[#E3EDFC] px-3 py-1 text-[11px] font-semibold text-[#1366E0]">
                  {uni.note}
                </p>
              )}

              <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-semibold text-[#1B1B1B] transition-colors group-hover:text-[#1366E0] sm:text-sm">
                View courses
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m0 0-6-6m6 6-6 6"
                  />
                </svg>
              </span>
            </Link>
          ))}

          {filtered.length === 0 && (
            <p className="col-span-full text-center text-sm text-[#6B6B6B]">
              No universities match your search. Try a different destination.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
