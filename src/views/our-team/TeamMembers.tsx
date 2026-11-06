"use client";

import { useState } from "react";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";


type OfficeId = "uk" | "dhaka-3" | "dhaka-10" | "sylhet" | "nepal";

type Member = {
  name: string;
  role: string;
  office: OfficeId;
  countries: string[];
  languages: string[];
  photo?: string;
  linkedin?: string;
};

const offices: { id: OfficeId; label: string; code: "GB" | "BD" | "NP" }[] = [
  { id: "uk", label: "UK London", code: "GB" },
  { id: "dhaka-3", label: "Dhaka Sector 3", code: "BD" },
  { id: "dhaka-10", label: "Dhaka Sector 10", code: "BD" },
  { id: "sylhet", label: "Sylhet", code: "BD" },
  { id: "nepal", label: "Kathmandu", code: "NP" },
];

const countryNames: Record<string, string> = {
  GB: "United Kingdom",
  AU: "Australia",
  NZ: "New Zealand",
  FI: "Finland",
  GR: "Greece",
  LT: "Lithuania",
  HU: "Hungary",
  RO: "Romania",
  MT: "Malta",
  CY: "Cyprus",
  IT: "Italy",
  NO: "Norway",
};

const members: Member[] = [
  {
    name: "Mayez Uddin",
    role: "Senior Admissions Counsellor",
    office: "uk",
    countries: ["GB", "IT", "MT"],
    languages: ["English", "Bangla"],
    photo: "/team1.avif",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Tanvir Hasan",
    role: "Admissions Counsellor",
    office: "dhaka-3",
    countries: ["LT", "HU", "RO"],
    languages: ["Bangla", "English"],
    photo: "/team2.avif",
  },
  {
    name: "Nusrat Jahan",
    role: "Visa & Documentation Officer",
    office: "dhaka-3",
    countries: ["LT", "CY", "GR"],
    languages: ["Bangla", "English"],
    photo: "/team3.webp",
  },
  {
    name: "Jewel Khan",
    role: "Admissions Counsellor",
    office: "dhaka-10",
    countries: ["FI", "NO"],
    languages: ["Bangla", "English"],
    photo: "/team4.png",
  },
  {
    name: "Rofiq Islam",
    role: "Student Support Officer",
    office: "dhaka-10",
    countries: ["AU", "NZ"],
    languages: ["Bangla", "English", "Hindi"],
  },
  {
    name: "Rafiq Chowdhury",
    role: "Branch Counsellor",
    office: "sylhet",
    countries: ["GB", "CY", "MT"],
    languages: ["Bangla", "Sylheti", "English"],
    photo: "/team5.png",
  },
  {
    name: "Anisha Shrestha",
    role: "Admissions Counsellor",
    office: "nepal",
    countries: ["AU", "FI", "LT"],
    languages: ["Nepali", "English", "Hindi"],
    photo: "/team6.png",
  },
  {
    name: "Bikash Thapa",
    role: "Visa & Documentation Officer",
    office: "nepal",
    countries: ["HU", "RO"],
    languages: ["Nepali", "English"],
  },
];

type Filter = "all" | OfficeId;

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function Flag({
  code,
  label,
  size = "100%",
}: {
  code: string;
  label?: string;
  size?: string;
}) {
  return (
    <ReactCountryFlag
      countryCode={code}
      svg
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{
        width: size,
        height: size,
        display: "block",
        objectFit: "cover",
      }}
    />
  );
}

export default function TeamMembers() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all" ? members : members.filter((m) => m.office === filter);
  const countFor = (id: Filter) =>
    id === "all"
      ? members.length
      : members.filter((m) => m.office === id).length;

  const tabs: { id: Filter; label: string; code?: string }[] = [
    { id: "all", label: "All" },
    ...offices,
  ];

  return (
    <section
      id="team"
      className="w-full scroll-mt-28 bg-[#FFFEFA] px-6 py-20 sm:py-24"
    >
      <style>{`
        @keyframes tmFadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        .tm-in { animation: tmFadeUp .55s cubic-bezier(.22,1,.36,1) both; }
        .tm-scroll::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) { .tm-in { animation: none !important; } }
      `}</style>

      <div className="mx-auto container max-w-6xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span
            aria-hidden
            className="mx-auto block h-1 w-12 rounded-full bg-[#1366E0]"
          />
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl">
            Friendly faces,{" "}
            <span className="text-[#1366E0]">expert guidance</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#6B6B6B] sm:text-base">
            Get to know the people who&apos;ll guide you, from our offices in
            London, Dhaka, Sylhet and Kathmandu.
          </p>
        </div>

        {/* Office filter tabs (scroll sideways on phones) */}
        <div className="-mx-6 mt-10 px-6 sm:mx-0 sm:px-0">
          <div
            role="group"
            aria-label="Filter team by office"
            className="tm-scroll flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible"
          >
            {tabs.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(tab.id)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border py-2 pr-3 text-sm font-semibold transition-all ${
                    tab.code ? "pl-2" : "pl-4"
                  } ${
                    active
                      ? "border-[#1366E0] bg-[#1366E0] text-white shadow-md shadow-[#1366E0]/25"
                      : "border-[#E5E5E5] bg-white text-[#1B1B1B] hover:border-[#1366E0]/50"
                  }`}
                >
                  {tab.code && (
                    <span className="flex h-5 w-5 overflow-hidden rounded-full ring-1 ring-black/10">
                      <Flag code={tab.code} />
                    </span>
                  )}
                  {tab.label}
                  <span
                    className={`grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-bold ${
                      active
                        ? "bg-white/25 text-white"
                        : "bg-[#F4EFE6] text-[#6B6B6B]"
                    }`}
                  >
                    {countFor(tab.id)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Members grid */}
        {visible.length > 0 ? (
          <ul
            key={filter}
            className="mt-10 grid grid-cols-1 gap-6 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {visible.map((member, index) => {
              const office = offices.find((o) => o.id === member.office)!;
              return (
                <li
                  key={`${member.name}-${member.office}-${index}`}
                  className="tm-in group flex flex-col overflow-hidden rounded-[1.5rem] border border-[#ECECEC] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {/* Photo or initials */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#F4EFE6]">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={`${member.name}, ${member.role}`}
                        fill
                        sizes="(max-width: 420px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center">
                        <span className="grid h-24 w-24 place-items-center rounded-full bg-[#FFFEFA] text-2xl font-semibold text-[#1366E0] ring-4 ring-[#1366E0]/20">
                          {initials(member.name)}
                        </span>
                      </div>
                    )}

                    {/* Office chip */}
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 py-1 pl-1 pr-2.5 text-[11px] font-semibold text-[#1B1B1B] shadow-md backdrop-blur-md">
                      <span className="flex h-4 w-4 overflow-hidden rounded-full">
                        <Flag code={office.code} />
                      </span>
                      {office.label}
                    </span>

                    {/* LinkedIn */}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                        className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-[#1B1B1B] shadow-md backdrop-blur-md transition-colors hover:bg-[#1366E0] hover:text-white"
                      >
                        <svg
                          className="h-3.5 w-3.5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
                        </svg>
                      </a>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-base font-semibold text-[#1B1B1B]">
                      {member.name}
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-[#1366E0]">
                      {member.role}
                    </p>

                    <div className="mt-4 space-y-3 border-t border-[#F0EBE3] pt-4">
                      {/* Specialist countries */}
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9A9A9A]">
                          Specialist in
                        </p>
                        <ul className="mt-1.5 flex flex-wrap gap-1.5">
                          {member.countries.map((code) => (
                            <li
                              key={code}
                              title={countryNames[code] ?? code}
                              className="inline-flex items-center gap-1.5 rounded-full border border-[#ECECEC] py-0.5 pl-0.5 pr-2 text-[11px] font-medium text-[#3A3A3A]"
                            >
                              <span className="flex h-4 w-4 overflow-hidden rounded-full">
                                <Flag code={code} />
                              </span>
                              {countryNames[code] ?? code}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Languages */}
                      <p className="flex items-start gap-1.5 text-xs text-[#6B6B6B]">
                        <svg
                          className="mt-px h-3.5 w-3.5 shrink-0 text-[#1366E0]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 9.5h9m-9 4h5.5M4.5 5.5h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4.5 3.5v-3.5a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z"
                          />
                        </svg>
                        <span>
                          <span className="font-semibold text-[#3A3A3A]">
                            Speaks:
                          </span>{" "}
                          {member.languages.join(", ")}
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div
            key={filter}
            className="tm-in mx-auto mt-10 max-w-md rounded-[1.5rem] border border-dashed border-[#1366E0]/30 bg-white px-6 py-12 text-center"
          >
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#1366E0]/10 text-[#1366E0]">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8.5c0-3.6 3.1-6 7-6s7 2.4 7 6M19 4v4m-2-2h4"
                />
              </svg>
            </span>
            <p className="mt-4 text-base font-semibold text-[#1B1B1B]">
              Our team here is growing
            </p>
            <p className="mt-1 text-sm text-[#6B6B6B]">
              New faces are coming soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
