"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ReactCountryFlag from "react-country-flag";

type Level =
  | "Foundation"
  | "Diploma"
  | "Undergraduate"
  | "Postgraduate"
  | "Professional";

type Programme = {
  university: string;
  country: string;
  title: string;
  level: Level;
  duration: string;
  /** Award type shown on the card, e.g. "Level 5 Diploma" */
  award?: string;
};

/** Flag codes for the destination filter */
const countryCodes: Record<string, string> = {
  "United Kingdom": "GB",
  Cyprus: "CY",
  Hungary: "HU",
  Malta: "MT",
  Australia: "AU",
  Canada: "CA",
  "New Zealand": "NZ",
  Finland: "FI",
  Greece: "GR",
  Lithuania: "LT",
  Romania: "RO",
  Italy: "IT",
  Norway: "NO",
};

const levelOrder: Level[] = [
  "Foundation",
  "Diploma",
  "Undergraduate",
  "Postgraduate",
  "Professional",
];

const levelStyles: Record<Level, string> = {
  Foundation: "bg-[#FDF2E9] text-[#F58B0F]",
  Diploma: "bg-[#F1ECFA] text-[#7A4FBF]",
  Undergraduate: "bg-[#EAF1FB] text-[#2F5DA8]",
  Postgraduate: "bg-[#E3EDFC] text-[#1366E0]",
  Professional: "bg-[#EAF6EE] text-[#2F9E5C]",
};

const levelDots: Record<Level, string> = {
  Foundation: "#F58B0F",
  Diploma: "#7A4FBF",
  Undergraduate: "#2F5DA8",
  Postgraduate: "#1366E0",
  Professional: "#2F9E5C",
};

/** Logos – same files as the /universities page */
type UniInfo = { logo: string; initials: string; color: string; note?: string };

const universityInfo: Record<string, UniInfo> = {
  "BPP University": {
    logo: "/univercity-logo/bpp.jpg",
    initials: "BP",
    color: "#2F5DA8",
  },
  "University of Hertfordshire": {
    logo: "/univercity-logo/uh.jpg",
    initials: "UH",
    color: "#1366E0",
  },
  "University of Law": {
    logo: "/univercity-logo/low.png",
    initials: "UL",
    color: "#1B1B1B",
    note: "Except Business Course",
  },
  "University of Chester": {
    logo: "/univercity-logo/uoc.png",
    initials: "UC",
    color: "#2F9E5C",
    note: "Except Sylhet",
  },
  "London South Bank University": {
    logo: "/univercity-logo/lsbu.jpg",
    initials: "LS",
    color: "#F58B0F",
    note: "Except Sylhet, Except Business Course",
  },
  "Aston University, London": {
    logo: "/univercity-logo/aul.png",
    initials: "AL",
    color: "#1366E0",
    note: "Except Sylhet",
  },
  "University of Hull - London": {
    logo: "/univercity-logo/uoh.png",
    initials: "HL",
    color: "#2F5DA8",
    note: "Except Sylhet",
  },
  "Regent College London": {
    logo: "/univercity-logo/rcl.png",
    initials: "RC",
    color: "#1B1B1B",
    note: "Except UG",
  },
  "University of Bedfordshire": {
    logo: "/univercity-logo/uob.png",
    initials: "UB",
    color: "#1366E0",
    note: "Except Sylhet",
  },
  "Anglia Ruskin University": {
    logo: "/univercity-logo/aru.jpg",
    initials: "AR",
    color: "#2F9E5C",
    note: "UG Sylhet Restricted",
  },
  "University of Brighton": {
    logo: "/univercity-logo/uobb.jpg",
    initials: "BR",
    color: "#F58B0F",
  },
  "University of South Wales": {
    logo: "/univercity-logo/uosw.png",
    initials: "SW",
    color: "#1366E0",
  },
  "Aston University, Birmingham": {
    logo: "/univercity-logo/aub.jpg",
    initials: "AB",
    color: "#2F5DA8",
  },
  "Cardiff Metropolitan University": {
    logo: "/univercity-logo/cfu.jpg",
    initials: "CM",
    color: "#1B1B1B",
    note: "Full Deposit for Sylhet",
  },
  "Canterbury Christ Church University": {
    logo: "/univercity-logo/cccu.png",
    initials: "CC",
    color: "#2F9E5C",
    note: "Except UG",
  },
  "UWS - London Campus": {
    logo: "/univercity-logo/uws.jpg",
    initials: "UW",
    color: "#F58B0F",
  },
  "Aberystwyth University": {
    logo: "/univercity-logo/au.jpg",
    initials: "AY",
    color: "#1366E0",
  },
  "University of Hartpury": {
    logo: "/univercity-logo/uoh.png",
    initials: "HP",
    color: "#2F5DA8",
  },
  "Atlantis College": {
    logo: "/univercity-logo/aui.png",
    initials: "AT",
    color: "#1B1B1B",
  },
  "American University of Cyprus": {
    logo: "/univercity-logo/auc.png",
    initials: "AC",
    color: "#2F9E5C",
  },
  // "John von Neumann University": {
  //   logo: "/univercity-logo/jvnu.png",
  //   initials: "JV",
  //   color: "#F58B0F",
  // },
  "Training Three Sixty": {
    logo: "/univercity-logo/tts.png",
    initials: "T3",
    color: "#1366E0",
  },
  ThinkTalent: {
    logo: "/univercity-logo/thinktalent.webp",
    initials: "TT",
    color: "#2F5DA8",
  },
  "LearnKey Institute": {
    logo: "/univercity-logo/learnkeyinstutie.png",
    initials: "LK",
    color: "#F58B0F",
  },
};

const programmes: Programme[] = [
  {
    university: "BPP University",
    country: "United Kingdom",
    title: "LLB (Hons) Law",
    level: "Undergraduate",
    duration: "3 years",
  },
  {
    university: "BPP University",
    country: "United Kingdom",
    title: "MSc Management",
    level: "Postgraduate",
    duration: "12 months",
  },
  {
    university: "BPP University",
    country: "United Kingdom",
    title: "LLM Legal Practice (SQE1 & SQE2)",
    level: "Professional",
    duration: "12–18 months",
  },
  {
    university: "University of Hertfordshire",
    country: "United Kingdom",
    title: "BSc (Hons) Computer Science",
    level: "Undergraduate",
    duration: "3 years",
  },
  {
    university: "University of Hertfordshire",
    country: "United Kingdom",
    title: "International Tourism, Hospitality and Event Management",
    level: "Undergraduate",
    duration: "3 years",
  },
  {
    university: "University of Hertfordshire",
    country: "United Kingdom",
    title: "MSc International Business",
    level: "Postgraduate",
    duration: "1 year",
  },
  {
    university: "University of Law",
    country: "United Kingdom",
    title: "LLB (Hons) Law with International Business",
    level: "Undergraduate",
    duration: "3 years",
  },
  {
    university: "University of Law",
    country: "United Kingdom",
    title: "LLM Legal Practice (SQE1 & SQE2)",
    level: "Professional",
    duration: "12 months",
  },
  {
    university: "University of Law",
    country: "United Kingdom",
    title: "Postgraduate Diploma in Law (PGDL)",
    level: "Postgraduate",
    duration: "1 year",
  },
  {
    university: "University of Chester",
    country: "United Kingdom",
    title: "BA (Hons) Business Management",
    level: "Undergraduate",
    duration: "3 years",
  },
  {
    university: "University of Chester",
    country: "United Kingdom",
    title: "MSc Computer Science",
    level: "Postgraduate",
    duration: "1 year",
  },
  {
    university: "London South Bank University",
    country: "United Kingdom",
    title: "BSc (Hons) Computer Science",
    level: "Undergraduate",
    duration: "3 years",
  },
  {
    university: "London South Bank University",
    country: "United Kingdom",
    title: "MSc Data Science",
    level: "Postgraduate",
    duration: "1 year",
  },
  {
    university: "London South Bank University",
    country: "United Kingdom",
    title: "BSc (Hons) Biomedical Science",
    level: "Undergraduate",
    duration: "3 years",
  },
  {
    university: "Aston University, London",
    country: "United Kingdom",
    title: "BSc (Hons) Business and Management",
    level: "Undergraduate",
    duration: "3 years",
  },
  {
    university: "Aston University, London",
    country: "United Kingdom",
    title: "MSc International Business",
    level: "Postgraduate",
    duration: "1 year",
  },
  {
    university: "University of Hull - London",
    country: "United Kingdom",
    title: "BA (Hons) Business Management",
    level: "Undergraduate",
    duration: "3 years",
  },
  {
    university: "University of Hull - London",
    country: "United Kingdom",
    title: "MSc Finance and Investment",
    level: "Postgraduate",
    duration: "1 year",
  },
  {
    university: "Regent College London",
    country: "United Kingdom",
    title: "MBA (Master of Business Administration)",
    level: "Postgraduate",
    duration: "1 year",
  },
  {
    university: "Regent College London",
    country: "United Kingdom",
    title: "MA Marketing and Digital Media",
    level: "Postgraduate",
    duration: "1 year",
  },
  {
    university: "University of Bedfordshire",
    country: "United Kingdom",
    title: "BSc (Hons) Computer Science",
    level: "Undergraduate",
    duration: "3 years",
  },
  {
    university: "University of Bedfordshire",
    country: "United Kingdom",
    title: "MSc International Business Management",
    level: "Postgraduate",
    duration: "1 year",
  },
  {
    university: "Anglia Ruskin University",
    country: "United Kingdom",
    title: "BSc (Hons) Artificial Intelligence with Cyber Security",
    level: "Undergraduate",
    duration: "3 years",
  },
  {
    university: "Anglia Ruskin University",
    country: "United Kingdom",
    title: "MSc International Business Management",
    level: "Postgraduate",
    duration: "1 year",
  },
  {
    university: "Anglia Ruskin University",
    country: "United Kingdom",
    title: "MBA (Master of Business Administration)",
    level: "Postgraduate",
    duration: "1 year",
  },
  {
    university: "University of Brighton",
    country: "United Kingdom",
    title: "BA (Hons) Business Management",
    level: "Undergraduate",
    duration: "3 years",
  },
  {
    university: "University of Brighton",
    country: "United Kingdom",
    title: "MSc Data Science",
    level: "Postgraduate",
    duration: "1 year",
  },
  {
    university: "University of South Wales",
    country: "United Kingdom",
    title: "BSc (Hons) Computer Science",
    level: "Undergraduate",
    duration: "3 years",
  },
  {
    university: "University of South Wales",
    country: "United Kingdom",
    title: "MSc Cyber Security",
    level: "Postgraduate",
    duration: "1 year",
  },
  {
    university: "Aston University, Birmingham",
    country: "United Kingdom",
    title: "BSc (Hons) International Business",
    level: "Undergraduate",
    duration: "3 years",
  },
  {
    university: "Aston University, Birmingham",
    country: "United Kingdom",
    title: "MSc Data Science and Analytics",
    level: "Postgraduate",
    duration: "1 year",
  },
  {
    university: "Cardiff Metropolitan University",
    country: "United Kingdom",
    title: "BA (Hons) Business Management",
    level: "Undergraduate",
    duration: "3 years",
  },
  {
    university: "Cardiff Metropolitan University",
    country: "United Kingdom",
    title: "MSc International Hospitality Management",
    level: "Postgraduate",
    duration: "1 year",
  },
  {
    university: "Canterbury Christ Church University",
    country: "United Kingdom",
    title: "MSc Business Management",
    level: "Postgraduate",
    duration: "1 year",
  },
  {
    university: "Canterbury Christ Church University",
    country: "United Kingdom",
    title: "MA Design",
    level: "Postgraduate",
    duration: "1 year",
  },
  {
    university: "UWS - London Campus",
    country: "United Kingdom",
    title: "BA (Hons) Business Management",
    level: "Undergraduate",
    duration: "3 years",
  },
  {
    university: "UWS - London Campus",
    country: "United Kingdom",
    title: "MBA (Master of Business Administration)",
    level: "Postgraduate",
    duration: "1 year",
  },
  {
    university: "Aberystwyth University",
    country: "United Kingdom",
    title: "BSc (Hons) Computer Science",
    level: "Undergraduate",
    duration: "3 years",
  },
  {
    university: "Aberystwyth University",
    country: "United Kingdom",
    title: "MSc International Business Management",
    level: "Postgraduate",
    duration: "1 year",
  },
  {
    university: "University of Hartpury",
    country: "United Kingdom",
    title: "BSc (Hons) Animal Science",
    level: "Undergraduate",
    duration: "3 years",
  },
  {
    university: "University of Hartpury",
    country: "United Kingdom",
    title: "BSc (Hons) Sport and Exercise Science",
    level: "Undergraduate",
    duration: "3 years",
  },
  // {
  //   university: "Atlantis College",
  //   country: "Cyprus",
  //   title: "Diploma in Hospitality and Tourism Management",
  //   level: "Diploma",
  //   duration: "2 years",
  // },
  // {
  //   university: "Atlantis College",
  //   country: "Cyprus",
  //   title: "Diploma in Business Administration",
  //   level: "Diploma",
  //   duration: "2 years",
  // },
  // {
  //   university: "American University of Cyprus",
  //   country: "Cyprus",
  //   title: "BA Business Administration",
  //   level: "Undergraduate",
  //   duration: "4 years",
  // },
  // {
  //   university: "American University of Cyprus",
  //   country: "Cyprus",
  //   title: "BSc Computer Science",
  //   level: "Undergraduate",
  //   duration: "4 years",
  // },
  // {
  //   university: "John von Neumann University",
  //   country: "Hungary",
  //   title: "BSc Computer Science Engineering",
  //   level: "Undergraduate",
  //   duration: "4 years",
  // },
  // {
  //   university: "John von Neumann University",
  //   country: "Hungary",
  //   title: "BSc Business Administration and Management",
  //   level: "Undergraduate",
  //   duration: "3.5 years",
  // },
  {
    university: "Training Three Sixty",
    country: "Malta",
    title: "Level 4 Diploma in Tourism and Hospitality Management",
    level: "Foundation",
    duration: "1 year",
  },
  {
    university: "Training Three Sixty",
    country: "Malta",
    title: "Level 5 Diploma in Human Resources Management",
    level: "Diploma",
    duration: "1 year",
  },
  {
    university: "Training Three Sixty",
    country: "Malta",
    title: "Level 5 Diploma in Health and Social Care Management",
    level: "Diploma",
    duration: "1 year",
  },
  {
    university: "ThinkTalent",
    country: "Malta",
    title:
      "Bachelor/Undergraduate Diploma in Human Resource Management (MQF Level 5)",
    level: "Undergraduate",
    duration: "1 year",
  },
  {
    university: "ThinkTalent",
    country: "Malta",
    title:
      "Bachelor/Undergraduate Diploma in Health and Social Care Management (MQF Level 5)",
    level: "Undergraduate",
    duration: "1 year",
  },
  {
    university: "ThinkTalent",
    country: "Malta",
    title: "OTHM Level 4 Diploma in Tourism and Hospitality Management",
    level: "Foundation",
    duration: "1 year",
  },
  // ── LearnKey Institute (Malta) ──
  {
    university: "LearnKey Institute",
    country: "Malta",
    title: "Undergraduate Diploma in Business Management",
    award: "Level 5 Diploma",
    level: "Diploma",
    duration: "12 months",
  },
  {
    university: "LearnKey Institute",
    country: "Malta",
    title: "Undergraduate Diploma in Accounting",
    award: "Level 5 Diploma",
    level: "Diploma",
    duration: "12 months",
  },
  {
    university: "LearnKey Institute",
    country: "Malta",
    title: "Undergraduate Diploma in Information Technology",
    award: "Level 5 Diploma",
    level: "Diploma",
    duration: "12 months",
  },
  {
    university: "LearnKey Institute",
    country: "Malta",
    title: "Undergraduate Certificate in Nursing Studies",
    award: "Level 5 Diploma",
    level: "Undergraduate",
    duration: "12 months",
  },
  {
    university: "LearnKey Institute",
    country: "Malta",
    title: "Bachelor of Business Administration (BBA)",
    award: "Bachelor (Level 6)",
    level: "Undergraduate",
    duration: "3.5 years",
  },
  {
    university: "LearnKey Institute",
    country: "Malta",
    title: "BSc in Software Design, AI, and Cloud Computing",
    award: "Bachelor (Level 6)",
    level: "Undergraduate",
    duration: "3–4 years",
  },
  {
    university: "LearnKey Institute",
    country: "Malta",
    title: "BA (Hons) in Business Management (Top-Up)",
    award: "Bachelor (Top-Up)",
    level: "Undergraduate",
    duration: "12 months",
  },
  {
    university: "LearnKey Institute",
    country: "Malta",
    title: "BSc (Hons) in Accounting (Top-Up)",
    award: "Bachelor (Top-Up)",
    level: "Undergraduate",
    duration: "12 months",
  },
  {
    university: "LearnKey Institute",
    country: "Malta",
    title: "Level 7 Diploma in Strategic Management & Leadership",
    award: "Postgraduate Diploma",
    level: "Postgraduate",
    duration: "12 months",
  },
  {
    university: "LearnKey Institute",
    country: "Malta",
    title: "Level 7 Diploma in Tourism and Hospitality Management",
    award: "Postgraduate Diploma",
    level: "Postgraduate",
    duration: "12 months",
  },
  {
    university: "LearnKey Institute",
    country: "Malta",
    title: "Level 7 Diploma in Health and Social Care Management",
    award: "Postgraduate Diploma",
    level: "Postgraduate",
    duration: "12 months",
  },
  {
    university: "LearnKey Institute",
    country: "Malta",
    title: "Postgraduate Diploma in Accounting",
    award: "Postgraduate Diploma",
    level: "Postgraduate",
    duration: "12 months",
  },
  {
    university: "LearnKey Institute",
    country: "Malta",
    title: "Master of Business Administration (MBA)",
    award: "Masters (Level 7)",
    level: "Postgraduate",
    duration: "18 months",
  },
  {
    university: "LearnKey Institute",
    country: "Malta",
    title: "MSc in Accounting",
    award: "Masters (Level 7)",
    level: "Postgraduate",
    duration: "18 months",
  },
];

/** "Aston University, London" -> "aston-university-london" (matches the slugs on /universities) */
function toSlug(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const allUniversityNames = Array.from(
  new Set(programmes.map((p) => p.university)),
);
const allDestinations = Array.from(new Set(programmes.map((p) => p.country)));
/** Only show levels that have at least one programme */
const allLevels = levelOrder.filter((l) =>
  programmes.some((p) => p.level === l),
);

/** Reads ?university=slug-one,slug-two and returns the matching university names */
function namesFromParam(param: string | null) {
  if (!param) return [];
  const slugs = param
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return allUniversityNames.filter((name) => slugs.includes(toSlug(name)));
}

/* ───────────────────────── Small pieces ───────────────────────── */

function Flag({ country }: { country: string }) {
  const code = countryCodes[country];
  if (!code) return null;
  return (
    <span className="flex h-4 w-4 shrink-0 overflow-hidden rounded-full ring-1 ring-black/10">
      <ReactCountryFlag
        countryCode={code}
        svg
        aria-hidden
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
        }}
      />
    </span>
  );
}

/** University logo with an initials fallback if the file is missing */
function UniLogo({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const info = universityInfo[name];
  const [failed, setFailed] = useState(false);

  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#ECECEC] bg-white ${className}`}
    >
      {info && !failed ? (
        <Image
          src={info.logo}
          alt={`${name} logo`}
          width={160}
          height={80}
          className="h-full w-full object-contain p-1"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className="grid h-full w-full place-items-center text-[10px] font-bold text-white"
          style={{ backgroundColor: info?.color ?? "#1B1B1B" }}
        >
          {info?.initials ?? name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </span>
  );
}

type Option = { value: string; label: string; icon?: ReactNode };

/** Dropdown with tick boxes – pick several options */
function MultiSelect({
  id,
  label,
  allLabel,
  options,
  selected,
  onChange,
}: {
  id: string;
  label: string;
  allLabel: string;
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = (value: string) =>
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value],
    );

  const summary =
    selected.length === 0
      ? allLabel
      : selected.length === 1
        ? (options.find((o) => o.value === selected[0])?.label ?? selected[0])
        : `${selected.length} selected`;

  return (
    <div ref={ref} className="relative">
      <span id={`${id}-label`} className="text-xs font-semibold text-[#6B6B6B]">
        {label}
      </span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label`}
        onClick={() => setOpen((v) => !v)}
        className={`mt-1 flex w-full items-center justify-between gap-2 rounded-xl border bg-white px-4 py-3 text-left text-sm text-[#1B1B1B] outline-none transition-all ${
          open
            ? "border-[#1366E0] ring-4 ring-[#1366E0]/10"
            : "border-[#E5E5E5] hover:border-[#1366E0]/50"
        }`}
      >
        <span className="flex min-w-0 items-center gap-2">
          {selected.length === 1 &&
            options.find((o) => o.value === selected[0])?.icon}
          <span className="truncate">{summary}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5">
          {selected.length > 1 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#1366E0] px-1.5 text-[11px] font-bold text-white">
              {selected.length}
            </span>
          )}
          <svg
            className={`h-4 w-4 text-[#6B6B6B] transition-transform ${open ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m6 9 6 6 6-6"
            />
          </svg>
        </span>
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-xl border border-[#ECECEC] bg-white shadow-xl shadow-black/10">
          <ul
            role="listbox"
            aria-multiselectable
            aria-labelledby={`${id}-label`}
            className="max-h-72 overflow-y-auto p-1.5"
          >
            {options.map((option) => {
              const checked = selected.includes(option.value);
              return (
                <li key={option.value} role="option" aria-selected={checked}>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors hover:bg-[#FFFEFA]">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(option.value)}
                      className="h-4 w-4 shrink-0 cursor-pointer accent-[#1366E0]"
                    />
                    {option.icon}
                    <span
                      className={
                        checked
                          ? "font-semibold text-[#1B1B1B]"
                          : "text-[#3A3A3A]"
                      }
                    >
                      {option.label}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center justify-between border-t border-[#F0EBE3] px-3 py-2">
            <button
              type="button"
              onClick={() => onChange([])}
              disabled={selected.length === 0}
              className="text-xs font-semibold text-[#1366E0] disabled:text-[#C9C9C9]"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full bg-[#1B1B1B] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#1366E0]"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── Main component ───────────────────────── */

// useSearchParams needs a Suspense boundary in the Next.js App Router
export default function ProgrammeFinder() {
  return (
    <Suspense fallback={null}>
      <ProgrammeFinderInner />
    </Suspense>
  );
}

function ProgrammeFinderInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [destinations, setDestinations] = useState<string[]>([]); // empty = all
  const [levels, setLevels] = useState<Level[]>([]); // empty = all
  // Pre-select the university passed from the /universities page
  const [selectedUnis, setSelectedUnis] = useState<string[]>(() =>
    namesFromParam(searchParams.get("university")),
  );
  const [uniSearch, setUniSearch] = useState("");
  const [showUniFilter, setShowUniFilter] = useState(false);

  // Programmes matching search, destinations and levels (before the university filter)
  const baseFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return programmes.filter((p) => {
      const matchesQuery =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.university.toLowerCase().includes(q);
      const matchesDestination =
        destinations.length === 0 || destinations.includes(p.country);
      const matchesLevel = levels.length === 0 || levels.includes(p.level);
      return matchesQuery && matchesDestination && matchesLevel;
    });
  }, [query, destinations, levels]);

  // Universities for the sidebar, with how many matching programmes each has
  const universities = useMemo(() => {
    const map = new Map<string, { country: string; count: number }>();
    for (const p of programmes) {
      if (
        (destinations.length === 0 || destinations.includes(p.country)) &&
        !map.has(p.university)
      ) {
        map.set(p.university, { country: p.country, count: 0 });
      }
    }
    for (const p of baseFiltered) {
      const entry = map.get(p.university);
      if (entry) entry.count += 1;
    }
    return Array.from(map, ([name, info]) => ({ name, ...info }));
  }, [destinations, baseFiltered]);

  // Selected universities first, then A–Z
  const visibleUnis = universities
    .filter((u) =>
      u.name.toLowerCase().includes(uniSearch.trim().toLowerCase()),
    )
    .sort((a, b) => {
      const sa = selectedUnis.includes(a.name) ? 0 : 1;
      const sb = selectedUnis.includes(b.name) ? 0 : 1;
      return sa - sb || a.name.localeCompare(b.name);
    });

  const filtered =
    selectedUnis.length === 0
      ? baseFiltered
      : baseFiltered.filter((p) => selectedUnis.includes(p.university));

  /** Saves the chosen universities in the URL so the page can be shared or refreshed */
  const updateUnis = (names: string[]) => {
    setSelectedUnis(names);
    const params = new URLSearchParams(searchParams.toString());
    if (names.length > 0) params.set("university", names.map(toSlug).join(","));
    else params.delete("university");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const toggleUni = (name: string) =>
    updateUnis(
      selectedUnis.includes(name)
        ? selectedUnis.filter((n) => n !== name)
        : [...selectedUnis, name],
    );

  const changeDestinations = (values: string[]) => {
    setDestinations(values);
    // keep only the selected universities that exist in the chosen destinations
    updateUnis(
      selectedUnis.filter(
        (name) =>
          values.length === 0 ||
          programmes.some(
            (p) => p.university === name && values.includes(p.country),
          ),
      ),
    );
  };

  const hasFilters =
    query !== "" ||
    destinations.length > 0 ||
    levels.length > 0 ||
    selectedUnis.length > 0;

  const clearAll = () => {
    setQuery("");
    setDestinations([]);
    setLevels([]);
    updateUnis([]);
    setUniSearch("");
  };

  // Single university selected → show its banner
  const focusUni = selectedUnis.length === 1 ? selectedUnis[0] : null;
  const focusCountry = focusUni
    ? (programmes.find((p) => p.university === focusUni)?.country ?? "")
    : "";
  const focusTotal = focusUni
    ? programmes.filter((p) => p.university === focusUni).length
    : 0;

  const destinationOptions: Option[] = allDestinations.map((d) => ({
    value: d,
    label: d,
    icon: <Flag country={d} />,
  }));

  const levelOptions: Option[] = allLevels.map((l) => ({
    value: l,
    label: l,
    icon: (
      <span
        className="h-2.5 w-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: levelDots[l] }}
      />
    ),
  }));

  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-16">
      <div className="mx-auto container">
        <p className="text-xs font-bold uppercase tracking-widest text-[#1366E0]">
          Courses
        </p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-[#1B1B1B] sm:text-4xl">
          Find The Right Programme For You.
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-[#6B6B6B] sm:text-base">
          Search real programmes offered by our official pathway partners across
          the UK, Cyprus, Hungary and Malta.
        </p>

        {/* Top filters */}
        <div className="relative z-20 mt-8 grid grid-cols-1 gap-4 rounded-2xl border border-[#ECECEC] bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-[1fr_230px_210px] lg:items-end">
          <div className="sm:col-span-2 lg:col-span-1">
            <label
              htmlFor="pf-search"
              className="text-xs font-semibold text-[#6B6B6B]"
            >
              Search programmes
            </label>
            <input
              id="pf-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Computer Science, MBA, Law"
              className="mt-1 w-full rounded-xl border border-[#E5E5E5] bg-white px-4 py-3 text-sm text-[#1B1B1B] outline-none transition-all placeholder:text-[#9A9A9A] focus:border-[#1366E0] focus:ring-4 focus:ring-[#1366E0]/10"
            />
          </div>
          <MultiSelect
            id="pf-destination"
            label="Destination"
            allLabel="All destinations"
            options={destinationOptions}
            selected={destinations}
            onChange={changeDestinations}
          />
          <MultiSelect
            id="pf-level"
            label="Level"
            allLabel="All levels"
            options={levelOptions}
            selected={levels}
            onChange={(values) => setLevels(values as Level[])}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* Results */}
          <div className="order-2 lg:order-1">
            {/* Selected university banner */}
            {focusUni && (
              <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#1366E0]/25 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
                <UniLogo name={focusUni} className="h-16 w-32 rounded-xl" />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#1366E0]">
                    Showing courses from
                  </p>
                  <h3 className="mt-0.5 text-lg font-semibold text-[#1B1B1B]">
                    {focusUni}
                  </h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#6B6B6B]">
                    <span className="inline-flex items-center gap-1.5">
                      <Flag country={focusCountry} />
                      {focusCountry}
                    </span>
                    <span>{focusTotal} programmes</span>
                    {universityInfo[focusUni]?.note && (
                      <span className="rounded-full bg-[#E3EDFC] px-2.5 py-0.5 font-semibold text-[#1366E0]">
                        {universityInfo[focusUni]?.note}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Link
                    href="/universities"
                    className="rounded-full border border-[#E5E5E5] px-4 py-2 text-xs font-semibold text-[#1B1B1B] transition-colors hover:border-[#1B1B1B]"
                  >
                    All universities
                  </Link>
                  <button
                    type="button"
                    onClick={() => updateUnis([])}
                    className="rounded-full bg-[#1B1B1B] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1366E0]"
                  >
                    Show all courses
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[#6B6B6B]">
                Showing{" "}
                <span className="font-semibold text-[#1B1B1B]">
                  {filtered.length}
                </span>{" "}
                of {programmes.length} programmes
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-sm font-semibold text-[#1366E0] underline-offset-4 hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Active filter chips */}
            {(selectedUnis.length > 1 ||
              destinations.length > 0 ||
              levels.length > 0) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedUnis.length > 1 &&
                  selectedUnis.map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => toggleUni(name)}
                      aria-label={`Remove ${name} filter`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#1366E0] py-1 pl-1 pr-2 text-xs font-semibold text-white transition-colors hover:bg-[#0F55BE]"
                    >
                      <UniLogo
                        name={name}
                        className="h-6 w-6 rounded-full border-0"
                      />
                      {name}
                      <CloseIcon />
                    </button>
                  ))}
                {destinations.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() =>
                      changeDestinations(destinations.filter((x) => x !== d))
                    }
                    aria-label={`Remove ${d} filter`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E5E5] bg-white py-1 pl-1.5 pr-2 text-xs font-semibold text-[#1B1B1B] transition-colors hover:border-[#1366E0]"
                  >
                    <Flag country={d} />
                    {d}
                    <CloseIcon />
                  </button>
                ))}
                {levels.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLevels(levels.filter((x) => x !== l))}
                    aria-label={`Remove ${l} filter`}
                    className={`inline-flex items-center gap-1.5 rounded-full py-1 pl-3 pr-2 text-xs font-semibold ${levelStyles[l]}`}
                  >
                    {l}
                    <CloseIcon />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((programme) => (
                <div
                  key={`${programme.university}-${programme.title}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#ECECEC] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1366E0]/25 hover:shadow-xl hover:shadow-black/5"
                >
                  {/* Red line that grows on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[#1366E0] transition-transform duration-500 group-hover:scale-x-100"
                  />

                  {/* Top: university logo (left) + country flag (right) */}
                  <div className="flex items-start justify-between gap-3">
                    <UniLogo
                      name={programme.university}
                      className="h-14 w-28 rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105"
                    />
                    <span
                      title={programme.country}
                      aria-label={programme.country}
                      className="flex h-9 w-9 shrink-0 overflow-hidden rounded-full shadow-md ring-2 ring-white"
                    >
                      <ReactCountryFlag
                        countryCode={countryCodes[programme.country] ?? ""}
                        svg
                        aria-hidden
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "block",
                          objectFit: "cover",
                        }}
                      />
                    </span>
                  </div>

                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-[#2F5DA8]">
                    {programme.university}
                  </p>
                  <h3 className="mt-1 text-base font-semibold leading-snug text-[#1B1B1B]">
                    {programme.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold ${levelStyles[programme.level]}`}
                    >
                      {programme.level}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#F5F5F0] px-2.5 py-1 text-[11px] font-semibold text-[#6B6B6B]">
                      <svg
                        className="h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden
                      >
                        <circle cx="12" cy="12" r="8.5" />
                        <path strokeLinecap="round" d="M12 7.5V12l3 2" />
                      </svg>
                      {programme.duration}
                    </span>
                  </div>
                  {programme.award && (
                    <p className="mt-2 text-xs text-[#9A9A9A]">
                      {programme.award}
                    </p>
                  )}

                  <div className="min-h-5 flex-1" aria-hidden />
                  <div className="flex items-center justify-between gap-3 border-t border-[#F0EBE3] pt-4">
                    <span className="text-xs text-[#9A9A9A]">
                      Free counselling
                    </span>
                    <button
                      type="button"
                      className="group/btn inline-flex items-center gap-1.5 rounded-full bg-[#1B1B1B] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1366E0] sm:text-sm"
                    >
                      Enquire
                      <svg
                        className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5"
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
                    </button>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="col-span-full rounded-2xl border border-dashed border-[#1366E0]/30 bg-white px-6 py-12 text-center">
                  <p className="text-sm font-semibold text-[#1B1B1B]">
                    No programmes match your search.
                  </p>
                  <p className="mt-1 text-sm text-[#6B6B6B]">
                    Try a different university, destination or level.
                  </p>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="mt-4 rounded-full border border-[#1B1B1B] px-5 py-2 text-sm font-semibold text-[#1B1B1B] transition-colors hover:bg-[#1B1B1B] hover:text-white"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar: university filter */}
          <aside className="order-1 rounded-2xl border border-[#ECECEC] bg-white shadow-sm lg:sticky lg:top-28 lg:order-2">
            <button
              type="button"
              onClick={() => setShowUniFilter((v) => !v)}
              aria-expanded={showUniFilter}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left lg:pointer-events-none"
            >
              <span>
                <span className="block text-sm font-semibold text-[#1B1B1B]">
                  Filter by university
                </span>
                <span className="block text-xs text-[#6B6B6B]">
                  {selectedUnis.length > 0
                    ? `${selectedUnis.length} selected`
                    : `${universities.length} universities`}
                </span>
              </span>
              <svg
                className={`h-4 w-4 shrink-0 text-[#6B6B6B] transition-transform lg:hidden ${showUniFilter ? "rotate-180" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m6 9 6 6 6-6"
                />
              </svg>
            </button>

            <div
              className={`${showUniFilter ? "block" : "hidden"} border-t border-[#F0EBE3] px-5 pb-5 pt-4 lg:block`}
            >
              <input
                type="text"
                value={uniSearch}
                onChange={(e) => setUniSearch(e.target.value)}
                placeholder="Search universities"
                aria-label="Search universities"
                className="w-full rounded-xl border border-[#E5E5E5] px-3.5 py-2.5 text-sm text-[#1B1B1B] outline-none placeholder:text-[#9A9A9A] focus:border-[#1366E0]"
              />

              <ul className="mt-3 max-h-[440px] space-y-1 overflow-y-auto pr-1">
                {visibleUnis.map((uni) => {
                  const checked = selectedUnis.includes(uni.name);
                  const empty = uni.count === 0 && !checked;
                  return (
                    <li key={uni.name}>
                      <label
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border px-2 py-2 transition-colors ${
                          checked
                            ? "border-[#1366E0]/30 bg-[#F3F7FE]"
                            : "border-transparent hover:bg-[#FFFEFA]"
                        } ${empty ? "opacity-45" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleUni(uni.name)}
                          className="h-4 w-4 shrink-0 cursor-pointer accent-[#1366E0]"
                        />
                        <span className="min-w-0 flex-1">
                          <span
                            className={`block truncate text-sm ${checked ? "font-semibold text-[#1B1B1B]" : "text-[#3A3A3A]"}`}
                          >
                            {uni.name}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-[#9A9A9A]">
                            <Flag country={uni.country} />
                            {uni.country}
                          </span>
                        </span>
                        <span
                          className={`grid h-6 min-w-6 place-items-center rounded-full px-1.5 text-[11px] font-bold ${
                            checked
                              ? "bg-[#1366E0] text-white"
                              : "bg-[#F4EFE6] text-[#6B6B6B]"
                          }`}
                        >
                          {uni.count}
                        </span>
                      </label>
                    </li>
                  );
                })}

                {visibleUnis.length === 0 && (
                  <li className="px-2 py-4 text-center text-sm text-[#6B6B6B]">
                    No universities found.
                  </li>
                )}
              </ul>

              {selectedUnis.length > 0 && (
                <button
                  type="button"
                  onClick={() => updateUnis([])}
                  className="mt-3 w-full rounded-xl border border-[#1B1B1B] py-2.5 text-sm font-semibold text-[#1B1B1B] transition-colors hover:bg-[#1B1B1B] hover:text-white"
                >
                  Clear universities
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function CloseIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      aria-hidden
    >
      <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
