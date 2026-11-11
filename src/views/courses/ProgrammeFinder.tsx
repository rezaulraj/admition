"use client";

import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ReactCountryFlag from "react-country-flag";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

type Level =
  | "Foundation"
  | "Diploma"
  | "Undergraduate"
  | "Postgraduate";

type Programme = {
  university: string;
  country: string;
  title: string;
  level: Level;
  duration: string;
  /** Award type shown on the card, e.g. "Level 5 Diploma" */
  award?: string;
  /** Tuition for the programme, e.g. "€9,000" */
  tuition?: string;
  /** Upcoming start dates */
  intakes?: string[];
  /** Tuition before a scholarship, shown struck through */
  fullTuition?: string;
  /** Scholarship percentage */
  scholarship?: number;
  /** Tuition plus the fixed costs payable with it */
  totalPayable?: string;
  /** Amount due before the visa under the flexible payment plan */
  beforeVisa?: string;
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
];

const levelStyles: Record<Level, string> = {
  Foundation: "bg-[#FDF2E9] text-[#F58B0F]",
  Diploma: "bg-[#F1ECFA] text-[#7A4FBF]",
  Undergraduate: "bg-[#EAF1FB] text-[#2F5DA8]",
  Postgraduate: "bg-[#E3EDFC] text-[#1366E0]",
};

const levelDots: Record<Level, string> = {
  Foundation: "#F58B0F",
  Diploma: "#7A4FBF",
  Undergraduate: "#2F5DA8",
  Postgraduate: "#1366E0",
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
  "Malta Leadership Institute": {
    logo: "/univercity-logo/mli.svg",
    initials: "ML",
    color: "#E4572E",
  },
  "Ascencia Malta": {
    logo: "/univercity-logo/Ascencia-Malta-Logo.svg",
    initials: "AM",
    color: "#CD0731",
    note: "€1,000 admin, registration, visa & accommodation costs payable with tuition",
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
    level: "Foundation",
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
    level: "Foundation",
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
  // ── Malta Leadership Institute (Malta) · intakes for international students, academic year 2026–2027 ──
  {
    university: "Malta Leadership Institute",
    country: "Malta",
    title: "Master of Education in Inclusive Education",
    award: "Master's degree · Education",
    level: "Postgraduate",
    duration: "Full-time · Mon–Fri",
    tuition: "€8,000",
    intakes: ["21 Jan 2027", "20 Apr 2027", "6 Jul 2027", "17 Sep 2027"],
  },
  {
    university: "Malta Leadership Institute",
    country: "Malta",
    title: "Master of Business Administration (MBA)",
    award: "Master's degree · Management",
    level: "Postgraduate",
    duration: "Full-time · Mon–Fri",
    tuition: "€9,000",
    intakes: ["21 Jan 2027", "20 Apr 2027", "6 Jul 2027", "17 Sep 2027"],
  },
  {
    university: "Malta Leadership Institute",
    country: "Malta",
    title: "Bachelor of Arts (Hons) in Business Leadership",
    award: "Bachelor's degree · Management",
    level: "Undergraduate",
    duration: "Full-time · Mon–Fri",
    tuition: "€9,000",
    intakes: ["21 Jan 2027", "20 Apr 2027", "6 Jul 2027", "17 Sep 2027"],
  },
  {
    university: "Malta Leadership Institute",
    country: "Malta",
    title: "Diploma in Business Leadership",
    award: "Diploma · Management",
    level: "Diploma",
    duration: "Full-time · Mon–Fri",
    tuition: "€5,500",
    intakes: ["21 Jan 2027", "20 Apr 2027", "6 Jul 2027", "17 Sep 2027"],
  },
  {
    university: "Malta Leadership Institute",
    country: "Malta",
    title: "Postgraduate Diploma in Business Leadership",
    award: "Postgraduate Diploma · Management",
    level: "Postgraduate",
    duration: "Full-time · Mon–Fri",
    tuition: "€6,000",
    intakes: ["21 Jan 2027", "20 Apr 2027", "6 Jul 2027", "17 Sep 2027"],
  },
  {
    university: "Malta Leadership Institute",
    country: "Malta",
    title: "Master of Science in Applied Nutrition",
    award: "Master's degree · Health & Holistic Wellbeing",
    level: "Postgraduate",
    duration: "Full-time · Mon–Fri",
    tuition: "€16,000",
    intakes: ["21 Jan 2027", "17 Sep 2027"],
  },
  {
    university: "Malta Leadership Institute",
    country: "Malta",
    title: "Certificate for the Caring of the Elderly Person",
    award: "Certificate · Health & Holistic Wellbeing",
    level: "Foundation",
    duration: "Full-time · Mon–Fri",
    tuition: "€5,000",
    intakes: ["21 Jan 2027", "20 Apr 2027", "6 Jul 2027", "17 Sep 2027"],
  },
  {
    university: "Malta Leadership Institute",
    country: "Malta",
    title: "Master of Science in Nursing",
    award: "Master's degree · Health & Holistic Wellbeing",
    level: "Postgraduate",
    duration: "Full-time · Mon–Fri",
    tuition: "€10,000",
    intakes: ["21 Jan 2027", "20 Apr 2027", "17 Sep 2027"],
  },
  // ── Ascencia Malta (Malta) · fee table, 2026 fees ──
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Bachelor in Business Administration",
    award: "MQF / EQF Level 6 · 180 ECTS",
    level: "Undergraduate",
    duration: "3 years",
    tuition: "€6,000 per year",
    totalPayable: "€7,000 for first year",
    beforeVisa: "€4,000",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Bachelor of Science in Computer Science",
    award: "MQF / EQF Level 6 · 180 ECTS",
    level: "Undergraduate",
    duration: "3 years",
    tuition: "€7,000 per year",
    totalPayable: "€8,000 for first year",
    beforeVisa: "€4,500",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Undergraduate Diploma in Business Administration",
    award: "MQF / EQF Level 5 · 60 ECTS",
    level: "Diploma",
    duration: "1 year",
    tuition: "€5,000",
    totalPayable: "€6,000",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Undergraduate Diploma in Computer Science",
    award: "MQF / EQF Level 5 · 60 ECTS",
    level: "Diploma",
    duration: "1 year",
    tuition: "€7,000",
    totalPayable: "€8,000",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Undergraduate Certificate in Business English (Latam & MENA Region)",
    award: "MQF / EQF Level 5 · 30 ECTS",
    level: "Diploma",
    duration: "1 year",
    tuition: "€6,000",
    totalPayable: "€7,000",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "General English",
    award: "English language programme",
    level: "Foundation",
    duration: "1 year",
    tuition: "€5,000",
    totalPayable: "€6,000",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Business English",
    award: "English language programme",
    level: "Foundation",
    duration: "1 year",
    tuition: "€6,000",
    totalPayable: "€7,000",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Undergraduate Certificate in Business English",
    award: "MQF / EQF Level 5 · 30 ECTS",
    level: "Diploma",
    duration: "1 year",
    tuition: "€2,500",
    fullTuition: "€5,000",
    scholarship: 50,
    totalPayable: "€3,500",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Undergraduate Diploma in Computer Networks Engineering",
    award: "MQF / EQF Level 5 · 60 ECTS",
    level: "Diploma",
    duration: "1 year",
    tuition: "€3,500",
    fullTuition: "€7,000",
    scholarship: 50,
    totalPayable: "€4,500",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Master of Science in Computer Science (Data Science and Artificial Intelligence)",
    award: "MQF / EQF Level 7 · 90 ECTS",
    level: "Postgraduate",
    duration: "18 months",
    tuition: "€7,000",
    fullTuition: "€14,000",
    scholarship: 50,
    totalPayable: "€8,000",
    beforeVisa: "€4,500",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Master of Science in Business Economics",
    award: "MQF / EQF Level 7 · 90 ECTS",
    level: "Postgraduate",
    duration: "18 months",
    tuition: "€7,000",
    fullTuition: "€14,000",
    scholarship: 50,
    totalPayable: "€8,000",
    beforeVisa: "€4,500",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Post Graduate Diploma in Business Economics",
    award: "MQF / EQF Level 7 · 60 ECTS",
    level: "Postgraduate",
    duration: "1 year",
    tuition: "€4,000",
    fullTuition: "€8,000",
    scholarship: 50,
    totalPayable: "€5,000",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Post Graduate Diploma in Computer Science",
    award: "MQF / EQF Level 7 · 60 ECTS",
    level: "Postgraduate",
    duration: "1 year",
    tuition: "€6,000",
    fullTuition: "€12,000",
    scholarship: 50,
    totalPayable: "€7,000",
    beforeVisa: "€4,000",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Post Graduate Diploma in Computer Science (Blockchain and Fintech)",
    award: "MQF / EQF Level 7 · 60 ECTS",
    level: "Postgraduate",
    duration: "1 year",
    tuition: "€6,000",
    fullTuition: "€12,000",
    scholarship: 50,
    totalPayable: "€7,000",
    beforeVisa: "€4,000",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Post Graduate Diploma in Computer Science (Data Science and Artificial Intelligence)",
    award: "MQF / EQF Level 7 · 60 ECTS",
    level: "Postgraduate",
    duration: "1 year",
    tuition: "€6,000",
    fullTuition: "€12,000",
    scholarship: 50,
    totalPayable: "€7,000",
    beforeVisa: "€4,000",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Post Graduate Diploma in Computer Science (Information Security and Cryptography)",
    award: "MQF / EQF Level 7 · 60 ECTS",
    level: "Postgraduate",
    duration: "1 year",
    tuition: "€6,000",
    fullTuition: "€12,000",
    scholarship: 50,
    totalPayable: "€7,000",
    beforeVisa: "€4,000",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Master of Arts in Human Resource Management",
    award: "MQF / EQF Level 7 · 90 ECTS",
    level: "Postgraduate",
    duration: "18 months",
    tuition: "€7,700",
    fullTuition: "€11,000",
    scholarship: 30,
    totalPayable: "€8,700",
    beforeVisa: "€4,850",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Master of Arts in International Management and Global Business",
    award: "MQF / EQF Level 7 · 90 ECTS",
    level: "Postgraduate",
    duration: "18 months",
    tuition: "€7,700",
    fullTuition: "€11,000",
    scholarship: 30,
    totalPayable: "€8,700",
    beforeVisa: "€4,850",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Master of Arts in Leadership and Business Development",
    award: "MQF / EQF Level 7 · 90 ECTS",
    level: "Postgraduate",
    duration: "18 months",
    tuition: "€7,700",
    fullTuition: "€11,000",
    scholarship: 30,
    totalPayable: "€8,700",
    beforeVisa: "€4,850",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Master of Arts in Entrepreneurship",
    award: "MQF / EQF Level 7 · 90 ECTS",
    level: "Postgraduate",
    duration: "18 months",
    tuition: "€7,700",
    fullTuition: "€11,000",
    scholarship: 30,
    totalPayable: "€8,700",
    beforeVisa: "€4,850",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Master of Business Administration (MBA) in Leadership Excellence",
    award: "MQF / EQF Level 7 · 90 ECTS",
    level: "Postgraduate",
    duration: "18 months",
    tuition: "€7,700",
    fullTuition: "€11,000",
    scholarship: 30,
    totalPayable: "€8,700",
    beforeVisa: "€4,850",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Master of Science in Computer Science",
    award: "MQF / EQF Level 7 · 90 ECTS",
    level: "Postgraduate",
    duration: "18 months",
    tuition: "€9,800",
    fullTuition: "€14,000",
    scholarship: 30,
    totalPayable: "€10,800",
    beforeVisa: "€5,900",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Master of Science in Computer Science (Blockchain and Fintech)",
    award: "MQF / EQF Level 7 · 90 ECTS",
    level: "Postgraduate",
    duration: "18 months",
    tuition: "€9,800",
    fullTuition: "€14,000",
    scholarship: 30,
    totalPayable: "€10,800",
    beforeVisa: "€5,900",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Master of Science in Computer Science (Information Security and Cryptography)",
    award: "MQF / EQF Level 7 · 90 ECTS",
    level: "Postgraduate",
    duration: "18 months",
    tuition: "€9,800",
    fullTuition: "€14,000",
    scholarship: 30,
    totalPayable: "€10,800",
    beforeVisa: "€5,900",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Post Graduate Diploma in Human Resource Management",
    award: "MQF / EQF Level 7 · 60 ECTS",
    level: "Postgraduate",
    duration: "1 year",
    tuition: "€5,600",
    fullTuition: "€8,000",
    scholarship: 30,
    totalPayable: "€6,600",
    beforeVisa: "€3,800",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Post Graduate Diploma in International Management and Global Business",
    award: "MQF / EQF Level 7 · 60 ECTS",
    level: "Postgraduate",
    duration: "1 year",
    tuition: "€5,600",
    fullTuition: "€8,000",
    scholarship: 30,
    totalPayable: "€6,600",
    beforeVisa: "€3,800",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Post Graduate Diploma in Leadership and Business Development",
    award: "MQF / EQF Level 7 · 60 ECTS",
    level: "Postgraduate",
    duration: "1 year",
    tuition: "€5,600",
    fullTuition: "€8,000",
    scholarship: 30,
    totalPayable: "€6,600",
    beforeVisa: "€3,800",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Post Graduate Diploma in Entrepreneurship",
    award: "MQF / EQF Level 7 · 60 ECTS",
    level: "Postgraduate",
    duration: "1 year",
    tuition: "€5,600",
    fullTuition: "€8,000",
    scholarship: 30,
    totalPayable: "€6,600",
    beforeVisa: "€3,800",
  },
  {
    university: "Ascencia Malta",
    country: "Malta",
    title: "Post Graduate Diploma of Business Administration in Leadership Excellence",
    award: "MQF / EQF Level 7 · 60 ECTS",
    level: "Postgraduate",
    duration: "1 year",
    tuition: "€5,600",
    fullTuition: "€8,000",
    scholarship: 30,
    totalPayable: "€6,600",
    beforeVisa: "€3,800",
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
    <span className="pg-flag">
      <ReactCountryFlag countryCode={code} svg aria-hidden style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }} />
    </span>
  );
}

/** University logo with an initials fallback if the file is missing */
function UniLogo({ name, className = "" }: { name: string; className?: string }) {
  const info = universityInfo[name];
  const [failed, setFailed] = useState(false);

  return (
    <span className={`pg-logo ${className}`}>
      {info && !failed ? (
        <Image src={info.logo} alt={`${name} logo`} width={160} height={80} onError={() => setFailed(true)} />
      ) : (
        <span className="pg-logo-fallback" style={{ backgroundColor: info?.color ?? "#350C0E" }}>
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
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
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

  const toggle = (value: string) => onChange(selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value]);

  const summary =
    selected.length === 0
      ? allLabel
      : selected.length === 1
        ? (options.find((o) => o.value === selected[0])?.label ?? selected[0])
        : `${selected.length} selected`;

  return (
    <div ref={ref} className="pg-field pg-ms">
      <span id={`${id}-label`} className="pg-label">
        {label}
      </span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label`}
        onClick={() => setOpen((v) => !v)}
        className="pg-control pg-ms-btn"
      >
        <span className="pg-ms-value">
          {selected.length === 1 && options.find((o) => o.value === selected[0])?.icon}
          <span className="truncate">{summary}</span>
        </span>
        <span className="pg-ms-end">
          {selected.length > 1 && <span className="pg-ms-count">{selected.length}</span>}
          <svg className="pg-caret" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="pg-pop">
          <ul role="listbox" aria-multiselectable aria-labelledby={`${id}-label`} className="pg-pop-list" data-lenis-prevent>
            {options.map((option) => {
              const checked = selected.includes(option.value);
              return (
                <li key={option.value} role="option" aria-selected={checked}>
                  <label className={`pg-opt${checked ? " is-on" : ""}`}>
                    <input type="checkbox" checked={checked} onChange={() => toggle(option.value)} />
                    {option.icon}
                    <span>{option.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
          <div className="pg-pop-foot">
            <button type="button" onClick={() => onChange([])} disabled={selected.length === 0} className="pg-link">
              Clear
            </button>
            <button type="button" onClick={() => setOpen(false)} className="pg-pill-btn">
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
  const root = useRef<HTMLElement>(null);
  const firstFilter = useRef(true);
  const cardReveal = useRef<ScrollTrigger[]>([]);

  const [query, setQuery] = useState("");
  const [destinations, setDestinations] = useState<string[]>([]); // empty = all
  const [levels, setLevels] = useState<Level[]>([]); // empty = all
  // Pre-select the university passed from the /universities page
  const [selectedUnis, setSelectedUnis] = useState<string[]>(() => namesFromParam(searchParams.get("university")));
  const [uniSearch, setUniSearch] = useState("");
  const [showUniFilter, setShowUniFilter] = useState(false);

  // Programmes matching search, destinations and levels (before the university filter)
  const baseFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return programmes.filter((p) => {
      const matchesQuery = q === "" || p.title.toLowerCase().includes(q) || p.university.toLowerCase().includes(q);
      const matchesDestination = destinations.length === 0 || destinations.includes(p.country);
      const matchesLevel = levels.length === 0 || levels.includes(p.level);
      return matchesQuery && matchesDestination && matchesLevel;
    });
  }, [query, destinations, levels]);

  // Universities for the sidebar, with how many matching programmes each has
  const universities = useMemo(() => {
    const map = new Map<string, { country: string; count: number }>();
    for (const p of programmes) {
      if ((destinations.length === 0 || destinations.includes(p.country)) && !map.has(p.university)) {
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
    .filter((u) => u.name.toLowerCase().includes(uniSearch.trim().toLowerCase()))
    .sort((a, b) => {
      const sa = selectedUnis.includes(a.name) ? 0 : 1;
      const sb = selectedUnis.includes(b.name) ? 0 : 1;
      return sa - sb || a.name.localeCompare(b.name);
    });

  const filtered = selectedUnis.length === 0 ? baseFiltered : baseFiltered.filter((p) => selectedUnis.includes(p.university));

  /** Saves the chosen universities in the URL so the page can be shared or refreshed */
  const updateUnis = (names: string[]) => {
    setSelectedUnis(names);
    const params = new URLSearchParams(searchParams.toString());
    if (names.length > 0) params.set("university", names.map(toSlug).join(","));
    else params.delete("university");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const toggleUni = (name: string) => updateUnis(selectedUnis.includes(name) ? selectedUnis.filter((n) => n !== name) : [...selectedUnis, name]);

  const changeDestinations = (values: string[]) => {
    setDestinations(values);
    // keep only the selected universities that exist in the chosen destinations
    updateUnis(selectedUnis.filter((name) => values.length === 0 || programmes.some((p) => p.university === name && values.includes(p.country))));
  };

  const hasFilters = query !== "" || destinations.length > 0 || levels.length > 0 || selectedUnis.length > 0;

  const clearAll = () => {
    setQuery("");
    setDestinations([]);
    setLevels([]);
    updateUnis([]);
    setUniSearch("");
  };

  // Single university selected → show its banner
  const focusUni = selectedUnis.length === 1 ? selectedUnis[0] : null;
  const focusCountry = focusUni ? (programmes.find((p) => p.university === focusUni)?.country ?? "") : "";
  const focusTotal = focusUni ? programmes.filter((p) => p.university === focusUni).length : 0;

  const destinationOptions: Option[] = allDestinations.map((d) => ({ value: d, label: d, icon: <Flag country={d} /> }));

  const levelOptions: Option[] = allLevels.map((l) => ({
    value: l,
    label: l,
    icon: <span className="pg-dot" style={{ backgroundColor: levelDots[l] }} />,
  }));

  /* Entrance: heading, filters, then cards as they scroll into view */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" }, delay: 0.1 })
        .fromTo(q("[data-pg-eyebrow]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0)
        .fromTo(q("[data-pg-word]"), { autoAlpha: 0, yPercent: 115, rotate: 5 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.12 }, 0.1)
        .fromTo(q("[data-pg-copy]"), { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.45)
        .fromTo(q("[data-pg-filters]"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.1 }, 0.6)
        .fromTo(q("[data-pg-side]"), { autoAlpha: 0, x: 30 }, { autoAlpha: 1, x: 0, duration: 1.1 }, 0.75);

      cardReveal.current = ScrollTrigger.batch(q("[data-pg-card]"), {
        start: "top 92%",
        once: true,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.06, ease: "expo.out", overwrite: true }),
      });
    });
    return () => mm.revert();
  }, []);

  /* When the filters change, the results settle in with a light stagger */
  useLayoutEffect(() => {
    if (firstFilter.current) {
      firstFilter.current = false;
      return;
    }
    const el = root.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-pg-card]"));
    /* From now on the filter animation reveals the cards, so the scroll reveal stands down */
    cardReveal.current.forEach((t) => t.kill());
    cardReveal.current = [];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(cards, { autoAlpha: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: { each: 0.035, amount: 0.4 }, overwrite: true },
    );
  }, [query, destinations, levels, selectedUnis]);

  return (
    <section ref={root} className="pg relative w-full">
      <style>{`
        .pg { color: #350C0E; margin-top: -7rem; overflow: clip;
          background:
            radial-gradient(45% 40% at 85% 4%, rgba(47,107,255,0.09), transparent 70%),
            radial-gradient(40% 36% at 6% 6%, rgba(247,147,30,0.14), transparent 70%),
            linear-gradient(180deg, #FFEFDD 0%, #FFF6EC 18%, #FFFEFA 34%); }
        .pg .pg-wrap { max-width: var(--page-max); margin: 0 auto; padding: 9.5rem 1.5rem 5rem; }

        /* Header */
        .pg .pg-head { display: flex; flex-direction: column; align-items: center; text-align: center; }
        .pg .pg-eyebrow { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0.95rem 0.45rem 0.55rem; border-radius: 999px;
          background: rgba(255,255,255,0.85); border: 1px solid rgba(53,12,14,0.08); font-size: 0.8rem; font-weight: 600; letter-spacing: 0.02em; }
        .pg .pg-eyebrow span { display: grid; place-items: center; width: 1.4rem; height: 1.4rem; border-radius: 999px; background: #F7931E; color: #fff; }
        .pg .pg-title { margin-top: 1.3rem; font-size: clamp(2.4rem, 10vw, 3.6rem); line-height: 1.02; letter-spacing: -0.045em; font-weight: 600; }
        .pg .pg-mask { display: block; overflow: hidden; padding: 0.04em 0.1em 0.16em; margin: -0.04em 0 -0.16em; }
        .pg .pg-accent { color: #F7931E; font-weight: 400; font-style: italic; letter-spacing: -0.02em; font-size: 1.1em; line-height: 0.95; }
        .pg .pg-copy { margin: 1.3rem auto 0; max-width: 36rem; font-size: 1rem; line-height: 1.7; color: rgba(53,12,14,0.72); }

        /* Shared controls */
        .pg .pg-label { font-size: 0.75rem; font-weight: 600; color: rgba(53,12,14,0.6); }
        .pg .pg-control { margin-top: 0.3rem; width: 100%; height: 3rem; border-radius: 14px; border: 1px solid rgba(53,12,14,0.12); background: #FFFBF6;
          padding: 0 1rem; font-size: 0.9rem; color: #350C0E; outline: none; transition: border-color .25s ease, background .25s ease, box-shadow .25s ease; }
        .pg .pg-control::placeholder { color: rgba(53,12,14,0.4); }
        .pg .pg-control:hover { border-color: rgba(53,12,14,0.22); }
        .pg .pg-control:focus, .pg .pg-ms-btn[aria-expanded="true"] { border-color: #F7931E; background: #fff; box-shadow: 0 0 0 4px rgba(247,147,30,0.14); }
        .pg .pg-flag { display: flex; width: 1rem; height: 1rem; flex: none; overflow: hidden; border-radius: 999px; box-shadow: 0 0 0 1px rgba(0,0,0,0.1); }
        .pg .pg-dot { width: 0.6rem; height: 0.6rem; flex: none; border-radius: 999px; }
        .pg .pg-link { font-size: 0.82rem; font-weight: 600; color: #C46A00; cursor: pointer; }
        .pg .pg-link:hover { text-decoration: underline; text-underline-offset: 4px; }
        .pg .pg-link:disabled { color: rgba(53,12,14,0.25); cursor: default; text-decoration: none; }
        .pg .pg-pill-btn { padding: 0.45rem 0.95rem; border-radius: 999px; background: #350C0E; color: #fff; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: background .3s ease; }
        .pg .pg-pill-btn:hover { background: #F7931E; }

        /* Filters */
        .pg .pg-filters { position: relative; z-index: 20; margin-top: 2.5rem; display: grid; grid-template-columns: minmax(0, 1fr); gap: 0.9rem; padding: 1rem;
          border-radius: 22px; background: #fff; border: 1px solid rgba(53,12,14,0.08); }
        .pg .pg-search { position: relative; }
        .pg .pg-search svg { position: absolute; left: 1rem; bottom: 0.95rem; color: rgba(53,12,14,0.4); pointer-events: none; }
        .pg .pg-search .pg-control { padding-left: 2.7rem; }
        .pg .pg-ms { position: relative; }
        .pg .pg-ms-btn { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; text-align: left; cursor: pointer; }
        .pg .pg-ms-value { display: flex; min-width: 0; align-items: center; gap: 0.5rem; }
        .pg .pg-ms-end { display: flex; flex: none; align-items: center; gap: 0.4rem; color: rgba(53,12,14,0.5); }
        .pg .pg-ms-count { display: grid; place-items: center; min-width: 1.3rem; height: 1.3rem; padding: 0 0.35rem; border-radius: 999px; background: #F7931E; color: #fff; font-size: 0.7rem; font-weight: 700; }
        .pg .pg-caret { transition: transform .3s cubic-bezier(.22,1,.36,1); }
        .pg .pg-ms-btn[aria-expanded="true"] .pg-caret { transform: rotate(180deg); }
        .pg .pg-pop { position: absolute; left: 0; right: 0; z-index: 30; margin-top: 0.4rem; overflow: hidden; border-radius: 16px; background: #fff;
          border: 1px solid rgba(53,12,14,0.1); box-shadow: 0 16px 32px -24px rgba(53,12,14,0.5); animation: pg-pop .22s cubic-bezier(.22,1,.36,1); }
        @keyframes pg-pop { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
        .pg .pg-pop-list { max-height: 18rem; overflow-y: auto; padding: 0.35rem; }
        .pg .pg-opt { display: flex; align-items: center; gap: 0.65rem; padding: 0.55rem 0.65rem; border-radius: 10px; font-size: 0.88rem; cursor: pointer; color: rgba(53,12,14,0.8); transition: background .2s ease; }
        .pg .pg-opt:hover { background: #FFF6EC; }
        .pg .pg-opt.is-on { font-weight: 600; color: #350C0E; }
        .pg .pg-opt input { width: 1rem; height: 1rem; flex: none; accent-color: #F7931E; cursor: pointer; }
        .pg .pg-pop-foot { display: flex; align-items: center; justify-content: space-between; padding: 0.55rem 0.8rem; border-top: 1px solid rgba(53,12,14,0.07); }

        /* Layout */
        .pg .pg-body { margin-top: 2rem; display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.75rem; align-items: start; }
        .pg .pg-results { order: 2; }
        .pg .pg-side { order: 1; }

        /* Focused university banner */
        .pg .pg-focus { margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 1rem; padding: 1.1rem; border-radius: 22px;
          background: linear-gradient(135deg, #FFF3E6 0%, #FFE9D3 100%); border: 1px solid rgba(247,147,30,0.22); }
        .pg .pg-focus .pg-logo { width: 8rem; height: 4rem; }
        .pg .pg-focus-kicker { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #C46A00; }
        .pg .pg-focus h3 { margin-top: 0.2rem; font-size: 1.2rem; font-weight: 600; letter-spacing: -0.02em; }
        .pg .pg-focus-meta { margin-top: 0.4rem; display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem 0.9rem; font-size: 0.8rem; color: rgba(53,12,14,0.65); }
        .pg .pg-focus-meta > span { display: inline-flex; align-items: center; gap: 0.4rem; }
        .pg .pg-note { padding: 0.2rem 0.6rem; border-radius: 999px; background: #fff; color: #B85F00; font-weight: 600; font-size: 0.72rem; }
        .pg .pg-focus-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .pg .pg-ghost { padding: 0.55rem 1rem; border-radius: 999px; border: 1px solid rgba(53,12,14,0.18); background: #fff; font-size: 0.8rem; font-weight: 600; transition: border-color .3s ease; }
        .pg .pg-ghost:hover { border-color: #350C0E; }

        /* Results toolbar and chips */
        .pg .pg-toolbar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; }
        .pg .pg-count { font-size: 0.9rem; color: rgba(53,12,14,0.65); }
        .pg .pg-count b { color: #350C0E; font-weight: 700; }
        .pg .pg-chips { margin-top: 0.8rem; display: flex; flex-wrap: wrap; gap: 0.45rem; }
        .pg .pg-chip { display: inline-flex; align-items: center; gap: 0.4rem; height: 2rem; padding: 0 0.6rem 0 0.4rem; border-radius: 999px; font-size: 0.78rem; font-weight: 600;
          background: #fff; border: 1px solid rgba(53,12,14,0.12); cursor: pointer; transition: border-color .25s ease, background .25s ease; }
        .pg .pg-chip:hover { border-color: #F7931E; background: #FFF6EC; }
        .pg .pg-chip .pg-logo { width: 1.5rem; height: 1.5rem; border-radius: 999px; }
        .pg .pg-chip-level { padding-left: 0.75rem; }

        /* Programme cards */
        .pg .pg-grid { margin-top: 1.1rem; display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; }
        .pg .pg-card { position: relative; display: flex; flex-direction: column; overflow: hidden; border-radius: 22px; background: #fff;
          border: 1px solid rgba(53,12,14,0.08); transition: border-color .35s ease, transform .5s cubic-bezier(.22,1,.36,1), box-shadow .5s ease; }
        .pg .pg-card:hover { border-color: rgba(247,147,30,0.45); transform: translateY(-4px); box-shadow: 0 14px 28px -24px rgba(53,12,14,0.45); }
        .pg .pg-card-top { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; padding: 0.9rem 0.9rem 0.9rem 0.9rem;
          background: var(--tint); }
        .pg .pg-card-top::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: var(--lvl); transform: scaleX(0); transform-origin: 0 50%;
          transition: transform .6s cubic-bezier(.22,1,.36,1); }
        .pg .pg-card:hover .pg-card-top::after { transform: scaleX(1); }
        .pg .pg-card-top .pg-logo { width: 7rem; height: 3.5rem; transition: transform .5s cubic-bezier(.22,1,.36,1); }
        .pg .pg-card:hover .pg-card-top .pg-logo { transform: scale(1.04); }
        .pg .pg-card-flag { display: flex; width: 2rem; height: 2rem; flex: none; overflow: hidden; border-radius: 999px; box-shadow: 0 0 0 2px #fff; }
        .pg .pg-card-body { display: flex; flex: 1; flex-direction: column; padding: 1rem 1.1rem 1.1rem; }
        .pg .pg-uni { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(53,12,14,0.5); }
        .pg .pg-card h3 { margin-top: 0.3rem; font-size: 1.02rem; line-height: 1.3; letter-spacing: -0.015em; font-weight: 600; }
        .pg .pg-tags { margin-top: 0.7rem; display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem; }
        .pg .pg-tag { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.25rem 0.65rem; border-radius: 999px; font-size: 0.72rem; font-weight: 600; }
        .pg .pg-tag-time { background: #F6F2EC; color: rgba(53,12,14,0.7); }
        .pg .pg-award { margin-top: 0.5rem; font-size: 0.76rem; color: rgba(53,12,14,0.5); }
        .pg .pg-facts { margin-top: 0.8rem; display: grid; gap: 0.4rem; padding: 0.7rem 0.8rem; border-radius: 14px; background: #FFF8F0; font-size: 0.78rem; }
        .pg .pg-facts p { display: flex; align-items: flex-start; justify-content: space-between; gap: 0.6rem; }
        .pg .pg-facts p > span:first-child { flex: none; color: rgba(53,12,14,0.6); }
        .pg .pg-facts p > span:last-child { text-align: right; font-weight: 600; }
        .pg .pg-facts s { margin-right: 0.35rem; font-weight: 400; color: rgba(53,12,14,0.4); }
        .pg .pg-facts .pg-save { color: #2E8F29; }
        .pg .pg-card-foot { margin-top: auto; padding-top: 1rem; display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; }
        .pg .pg-free { display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.76rem; color: rgba(53,12,14,0.55); }
        .pg .pg-free i { width: 0.45rem; height: 0.45rem; border-radius: 999px; background: #3BAA35; }
        .pg .pg-enquire { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0.35rem 0.35rem 0.95rem; border-radius: 999px; background: #350C0E; color: #fff;
          font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: background .3s ease; }
        .pg .pg-enquire span { display: grid; place-items: center; width: 1.6rem; height: 1.6rem; border-radius: 999px; background: rgba(255,255,255,0.16);
          transition: transform .4s cubic-bezier(.22,1,.36,1); }
        .pg .pg-enquire:hover { background: #F7931E; }
        .pg .pg-enquire:hover span { transform: rotate(-45deg); }

        .pg .pg-logo { display: flex; flex: none; align-items: center; justify-content: center; overflow: hidden; border-radius: 12px; background: #fff; border: 1px solid rgba(53,12,14,0.06); }
        .pg .pg-logo img { width: 100%; height: 100%; object-fit: contain; padding: 0.3rem; }
        .pg .pg-logo-fallback { display: grid; width: 100%; height: 100%; place-items: center; color: #fff; font-size: 0.65rem; font-weight: 700; }

        .pg .pg-empty { grid-column: 1 / -1; padding: 3rem 1.5rem; border-radius: 22px; border: 1px dashed rgba(247,147,30,0.5); background: #FFF8F0; text-align: center; }
        .pg .pg-empty strong { display: block; font-size: 0.95rem; }
        .pg .pg-empty p { margin-top: 0.3rem; font-size: 0.88rem; color: rgba(53,12,14,0.65); }
        .pg .pg-empty .pg-pill-btn { margin-top: 1rem; padding: 0.65rem 1.25rem; font-size: 0.85rem; }

        /* University sidebar */
        .pg .pg-side { border-radius: 22px; background: #fff; border: 1px solid rgba(53,12,14,0.08); }
        .pg .pg-side-head { display: flex; width: 100%; align-items: center; justify-content: space-between; gap: 0.75rem; padding: 1rem 1.2rem; text-align: left; cursor: pointer; }
        .pg .pg-side-head strong { display: block; font-size: 0.95rem; font-weight: 600; }
        .pg .pg-side-head small { display: block; margin-top: 0.1rem; font-size: 0.78rem; color: rgba(53,12,14,0.55); }
        .pg .pg-side-body { display: none; padding: 1rem 1.2rem 1.2rem; border-top: 1px solid rgba(53,12,14,0.07); }
        .pg .pg-side-body.is-open { display: block; }
        .pg .pg-side-body .pg-control { margin-top: 0; height: 2.6rem; font-size: 0.86rem; }
        .pg .pg-unis { margin-top: 0.75rem; max-height: 28rem; overflow-y: auto; display: grid; gap: 0.2rem; padding: 0.1rem 0.4rem 0.1rem 0; }
        .pg .pg-uni-row { display: flex; align-items: center; gap: 0.7rem; padding: 0.55rem 0.55rem; border-radius: 12px; border: 1px solid transparent; cursor: pointer; transition: background .2s ease, border-color .2s ease; }
        .pg .pg-uni-row:hover { background: #FFF8F0; }
        .pg .pg-uni-row.is-on { background: #FFF3E6; border-color: rgba(247,147,30,0.35); }
        .pg .pg-uni-row.is-empty { opacity: 0.45; }
        .pg .pg-uni-row input { width: 1rem; height: 1rem; flex: none; accent-color: #F7931E; cursor: pointer; }
        .pg .pg-uni-name { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.86rem; color: rgba(53,12,14,0.85); }
        .pg .pg-uni-row.is-on .pg-uni-name { font-weight: 600; color: #350C0E; }
        .pg .pg-uni-where { display: flex; align-items: center; gap: 0.3rem; margin-top: 0.1rem; font-size: 0.7rem; color: rgba(53,12,14,0.5); }
        .pg .pg-uni-logo { width: 3.4rem; height: 2.1rem; border-radius: 8px; }
        .pg .pg-uni-logo img { padding: 0.15rem; }
        .pg .pg-uni-count { display: grid; place-items: center; min-width: 1.5rem; height: 1.5rem; padding: 0 0.4rem; border-radius: 999px; background: #F6F2EC; font-size: 0.7rem; font-weight: 700; color: rgba(53,12,14,0.6); }
        .pg .pg-uni-row.is-on .pg-uni-count { background: #F7931E; color: #fff; }
        .pg .pg-outline { margin-top: 0.8rem; width: 100%; padding: 0.65rem; border-radius: 12px; border: 1px solid #350C0E; font-size: 0.86rem; font-weight: 600; cursor: pointer; transition: background .3s ease, color .3s ease; }
        .pg .pg-outline:hover { background: #350C0E; color: #fff; }

        @media (prefers-reduced-motion: no-preference) {
          .pg [data-pg-eyebrow], .pg [data-pg-word], .pg [data-pg-copy], .pg [data-pg-filters], .pg [data-pg-side] { visibility: hidden; }
        }

        @media (min-width: 640px) {
          .pg .pg-wrap { padding: 10rem 2rem 6rem; }
          .pg .pg-filters { grid-template-columns: repeat(2, minmax(0, 1fr)); padding: 1.1rem; }
          .pg .pg-search { grid-column: 1 / -1; }
          .pg .pg-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .pg .pg-focus { flex-direction: row; align-items: center; padding: 1.25rem; }
          .pg .pg-focus > div:nth-child(2) { flex: 1; min-width: 0; }
        }
        @media (min-width: 1024px) {
          .pg .pg-wrap { padding: 10rem var(--page-gutter) 7rem; }
          .pg .pg-title { font-size: clamp(3.2rem, 4.8vw, 4.6rem); }
          .pg .pg-filters { grid-template-columns: minmax(0, 1fr) 15rem 13.5rem; align-items: end; }
          .pg .pg-search { grid-column: auto; }
          .pg .pg-body { grid-template-columns: minmax(0, 1fr) 19rem; gap: 2rem; }
          .pg .pg-results { order: 1; }
          .pg .pg-side { order: 2; position: sticky; top: 7rem; }
          .pg .pg-side-head { cursor: default; }
          .pg .pg-side-head svg { display: none; }
          .pg .pg-side-body { display: block; }
          .pg .pg-unis { max-height: min(28rem, calc(100svh - 18rem)); }
        }
        @media (min-width: 1280px) {
          .pg .pg-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        @media (min-width: 1024px) and (max-height: 760px) {
          .pg .pg-wrap { padding-top: 8.25rem; }
          .pg .pg-title { font-size: clamp(2.8rem, 4vw, 3.8rem); }
          .pg .pg-side { top: 6.5rem; }
        }
      `}</style>

      <div className="pg-wrap">
        <div className="pg-head">
          <span data-pg-eyebrow className="pg-eyebrow">
            <span aria-hidden>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3Zm-6.5 9.7V16c0 2 2.9 4 6.5 4s6.5-2 6.5-4v-3.3L12 16.3l-6.5-3.6Z" />
              </svg>
            </span>
            Courses
          </span>
          <h2 className="pg-title">
            <span className="pg-mask">
              <span data-pg-word className="inline-block origin-bottom-left">
                Find The Right Programme
              </span>
            </span>
            <span className="pg-mask">
              <span data-pg-word className={`${accentSerif.className} pg-accent inline-block origin-bottom-left`}>
                For You.
              </span>
            </span>
          </h2>
          <p data-pg-copy className="pg-copy">
            Search real programmes offered by our official pathway partners across the UK, Cyprus, Hungary and Malta.
          </p>
        </div>

        {/* Top filters */}
        <div data-pg-filters className="pg-filters">
          <div className="pg-field pg-search">
            <label htmlFor="pf-search" className="pg-label">
              Search programmes
            </label>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              id="pf-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Computer Science, MBA, Law"
              className="pg-control"
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

        <div className="pg-body">
          {/* Results */}
          <div className="pg-results">
            {/* Selected university banner */}
            {focusUni && (
              <div className="pg-focus">
                <UniLogo name={focusUni} />
                <div>
                  <p className="pg-focus-kicker">Showing courses from</p>
                  <h3>{focusUni}</h3>
                  <p className="pg-focus-meta">
                    <span>
                      <Flag country={focusCountry} />
                      {focusCountry}
                    </span>
                    <span>{focusTotal} programmes</span>
                    {universityInfo[focusUni]?.note && <span className="pg-note">{universityInfo[focusUni]?.note}</span>}
                  </p>
                </div>
                <div className="pg-focus-actions">
                  <Link href="/universities" className="pg-ghost">
                    All universities
                  </Link>
                  <button type="button" onClick={() => updateUnis([])} className="pg-pill-btn">
                    Show all courses
                  </button>
                </div>
              </div>
            )}

            <div className="pg-toolbar">
              <p className="pg-count" aria-live="polite">
                Showing <b>{filtered.length}</b> of {programmes.length} programmes
              </p>
              {hasFilters && (
                <button type="button" onClick={clearAll} className="pg-link">
                  Clear all filters
                </button>
              )}
            </div>

            {/* Active filter chips */}
            {(selectedUnis.length > 1 || destinations.length > 0 || levels.length > 0) && (
              <div className="pg-chips">
                {selectedUnis.length > 1 &&
                  selectedUnis.map((name) => (
                    <button key={name} type="button" onClick={() => toggleUni(name)} aria-label={`Remove ${name} filter`} className="pg-chip">
                      <UniLogo name={name} />
                      {name}
                      <CloseIcon />
                    </button>
                  ))}
                {destinations.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => changeDestinations(destinations.filter((x) => x !== d))}
                    aria-label={`Remove ${d} filter`}
                    className="pg-chip"
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
                    className="pg-chip pg-chip-level"
                  >
                    <span className="pg-dot" style={{ backgroundColor: levelDots[l] }} />
                    {l}
                    <CloseIcon />
                  </button>
                ))}
              </div>
            )}

            <div className="pg-grid">
              {filtered.map((programme) => (
                <article
                  key={`${programme.university}-${programme.title}`}
                  data-pg-card
                  className="pg-card"
                  style={{ "--lvl": levelDots[programme.level], "--tint": `${levelDots[programme.level]}12` } as CSSProperties}
                >
                  <div className="pg-card-top">
                    <UniLogo name={programme.university} />
                    <span title={programme.country} aria-label={programme.country} className="pg-card-flag">
                      <ReactCountryFlag
                        countryCode={countryCodes[programme.country] ?? ""}
                        svg
                        aria-hidden
                        style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
                      />
                    </span>
                  </div>

                  <div className="pg-card-body">
                    <p className="pg-uni">{programme.university}</p>
                    <h3>{programme.title}</h3>

                    <div className="pg-tags">
                      <span className={`pg-tag ${levelStyles[programme.level]}`}>{programme.level}</span>
                      <span className="pg-tag pg-tag-time">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                          <circle cx="12" cy="12" r="8.5" />
                          <path strokeLinecap="round" d="M12 7.5V12l3 2" />
                        </svg>
                        {programme.duration}
                      </span>
                    </div>
                    {programme.award && <p className="pg-award">{programme.award}</p>}

                    {(programme.tuition || programme.intakes) && (
                      <div className="pg-facts">
                        {programme.tuition && (
                          <p>
                            <span>Tuition</span>
                            <span>
                              {programme.fullTuition && <s>{programme.fullTuition}</s>}
                              {programme.tuition}
                            </span>
                          </p>
                        )}
                        {programme.scholarship && (
                          <p>
                            <span>Scholarship</span>
                            <span className="pg-save">{programme.scholarship}% applied</span>
                          </p>
                        )}
                        {programme.totalPayable && (
                          <p>
                            <span>Total with €1,000 costs</span>
                            <span>{programme.totalPayable}</span>
                          </p>
                        )}
                        {programme.beforeVisa && (
                          <p>
                            <span>Flexible plan, before visa</span>
                            <span>{programme.beforeVisa}</span>
                          </p>
                        )}
                        {programme.intakes && (
                          <p>
                            <span>Intakes</span>
                            <span>{programme.intakes.join(" · ")}</span>
                          </p>
                        )}
                      </div>
                    )}

                    <div className="pg-card-foot">
                      <span className="pg-free">
                        <i aria-hidden />
                        Free counselling
                      </span>
                      <button type="button" className="pg-enquire">
                        Enquire
                        <span aria-hidden>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              {filtered.length === 0 && (
                <div className="pg-empty">
                  <strong>No programmes match your search.</strong>
                  <p>Try a different university, destination or level.</p>
                  <button type="button" onClick={clearAll} className="pg-pill-btn">
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar: university filter */}
          <aside data-pg-side className="pg-side">
            <button type="button" onClick={() => setShowUniFilter((v) => !v)} aria-expanded={showUniFilter} className="pg-side-head">
              <span>
                <strong>Filter by university</strong>
                <small>{selectedUnis.length > 0 ? `${selectedUnis.length} selected` : `${universities.length} universities`}</small>
              </span>
              <svg
                className="pg-caret"
                style={{ transform: showUniFilter ? "rotate(180deg)" : undefined }}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <div className={`pg-side-body${showUniFilter ? " is-open" : ""}`}>
              <input
                type="text"
                value={uniSearch}
                onChange={(e) => setUniSearch(e.target.value)}
                placeholder="Search universities"
                aria-label="Search universities"
                className="pg-control"
              />

              <ul className="pg-unis" data-lenis-prevent>
                {visibleUnis.map((uni) => {
                  const checked = selectedUnis.includes(uni.name);
                  const empty = uni.count === 0 && !checked;
                  return (
                    <li key={uni.name}>
                      <label className={`pg-uni-row${checked ? " is-on" : ""}${empty ? " is-empty" : ""}`}>
                        <input type="checkbox" checked={checked} onChange={() => toggleUni(uni.name)} />
                        <UniLogo name={uni.name} className="pg-uni-logo" />
                        <span className="min-w-0 flex-1">
                          <span className="pg-uni-name">{uni.name}</span>
                          <span className="pg-uni-where">{uni.country}</span>
                        </span>
                        <span className="pg-uni-count">{uni.count}</span>
                      </label>
                    </li>
                  );
                })}

                {visibleUnis.length === 0 && <li className="px-2 py-4 text-center text-sm text-[#350C0E]/60">No universities found.</li>}
              </ul>

              {selectedUnis.length > 0 && (
                <button type="button" onClick={() => updateUnis([])} className="pg-outline">
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
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden>
      <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
