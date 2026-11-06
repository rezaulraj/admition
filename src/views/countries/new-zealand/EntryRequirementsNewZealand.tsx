"use client";

import { useEffect, useState } from "react";
import Image from "next/image";


type Group = "Pathway" | "Undergraduate" | "Postgraduate" | "Doctoral" | "Professional";

type Program = {
  title: string;
  group: Group;
  level?: string;
  duration?: string;
  summary: string;
  requirements?: string[];
  image: string;
};

const programs: Program[] = [
  {
    title: "Foundation Programme / Certificate",
    group: "Pathway",
    summary: "A bridge course into a bachelor's degree.",
    requirements: [
      "Academic: Class 12 / HSC or equivalent",
      "English: IELTS about 5.0–5.5",
    ],
    image: "/fundation.png",
  },
  {
    title: "Diploma",
    group: "Pathway",
    level: "Level 5–6",
    summary:
      "A vocational or academic course that can often be credited towards a degree.",
    requirements: [
      "Academic: Class 12 or equivalent",
      "English: IELTS about 5.5–6.0",
    ],
    image: "/diploma.png",
  },
  {
    title: "Bachelor's Degree",
    group: "Undergraduate",
    level: "Level 7",
    duration: "Usually 3 years",
    summary:
      "The main undergraduate degree, usually 3 years, and longer for fields such as engineering, medicine and architecture.",
    requirements: [
      "Academic: University entrance standard, or an overseas equivalent assessed by the university",
      "Please note: Students from 12-year school systems may need a Foundation programme or first-year university study",
      "English: IELTS about 6.0 overall, around 5.5 minimum in each skill",
    ],
    image: "/bachelor.png",
  },
  {
    title: "Conjoint (Double) Degree",
    group: "Undergraduate",
    summary:
      "Two bachelor's degrees completed together in less time than studying them separately.",
    requirements: [
      "Academic: The higher of the two degrees' entry requirements",
      "English: IELTS about 6.0–6.5",
    ],
    image: "/bachelor.png",
  },
  {
    title: "Graduate Certificate / Graduate Diploma",
    group: "Postgraduate",
    level: "Level 7",
    summary: "A short course for building skills or changing field.",
    requirements: ["Degree: Bachelor's degree", "English: IELTS about 6.0–6.5"],
    image: "/bachelor.png",
  },
  {
    title: "Bachelor's with Honours",
    group: "Postgraduate",
    level: "Level 8",
    summary:
      "An additional research-focused year and a common stepping stone to research degrees.",
    requirements: [
      "Academic: Strong bachelor's result",
      "English: IELTS about 6.5",
    ],
    image: "/bachelor.png",
  },
  {
    title: "Postgraduate Certificate / Postgraduate Diploma",
    group: "Postgraduate",
    level: "Level 8",
    summary: "Advanced study that often bridges into a master's.",
    requirements: ["Degree: Bachelor's degree", "English: IELTS about 6.5"],
    image: "/master.png",
  },
  {
    title: "Master's Degree",
    group: "Postgraduate",
    level: "Level 9",
    duration: "1–2 years",
    summary: "Coursework, research or thesis-based, usually 1–2 years.",
    requirements: [
      "Degree: Recognised bachelor's with good grades, or Honours or a postgraduate diploma",
      "Please note: A 3-year bachelor's may need extra study first, depending on the university",
      "English: IELTS about 6.5, around 6.0 minimum in each skill",
    ],
    image: "/master.png",
  },
  {
    title: "MBA",
    group: "Postgraduate",
    summary: "A professional management master's degree.",
    requirements: [
      "Degree: Bachelor's degree",
      "Experience: Relevant work experience",
      "English: IELTS about 6.5–7.0",
    ],
    image: "/mba.png",
  },
  {
    title: "Doctorate / PhD",
    group: "Doctoral",
    level: "Level 10",
    summary:
      "The highest research degree, completed with an original thesis.",
    requirements: [
      "Degree: Honours or master's degree",
      "Research: Research proposal and an agreed supervisor",
      "English: IELTS about 6.5",
    ],
    image: "/phd.png",
  },
  {
    title: "Professional Degrees (Medicine, Law, Health Sciences)",
    group: "Professional",
    summary:
      "Very competitive, with higher entry standards, selection tests or interviews, and sometimes higher English scores.",
    image: "/profetional.png",
  },
];

const AUTO_ADVANCE_MS = 7000;

/** Splits "Academic: Class 12..." into a bold label and its value */
function splitItem(item: string) {
  const i = item.indexOf(":");
  return i === -1 || i > 30
    ? { label: "", value: item }
    : { label: item.slice(0, i), value: item.slice(i + 1).trim() };
}

export default function EntryRequirementsNewZealand() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % programs.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [activeIndex, paused]);

  const active = programs[activeIndex];
  const go = (step: number) =>
    setActiveIndex((prev) => (prev + step + programs.length) % programs.length);

  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20">
      <style>{`
        @keyframes entry-progress { from { width: 0%; } to { width: 100%; } }
        @keyframes entry-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .entry-fade { animation: entry-fade .45s cubic-bezier(.22,1,.36,1) both; }
        .entry-scroll::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) { .entry-fade { animation: none; } }
      `}</style>

      <div className="mx-auto container max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="text-[#1366E0]">Entry</span>{" "}
            <span className="text-[#1B1B1B]">Requirements</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm font-semibold text-gray-700 sm:text-base">
            Study in New Zealand – Entry Requirements
          </p>
        </div>

        <div
          className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Left: programme list (sideways scroll on phones/tablets) */}
          <div className="-mx-6 px-6 lg:mx-0 lg:px-0">
            <ol
              aria-label="Study programmes"
              className="entry-scroll flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:flex-col lg:gap-1 lg:overflow-visible"
            >
              {programs.map((program, index) => {
                const isActive = index === activeIndex;
                const showGroup = index === 0 || programs[index - 1].group !== program.group;
                return (
                  <li key={program.title} className="shrink-0 lg:shrink">
                    {showGroup && (
                      <p className={`hidden px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9A9A9A] lg:block ${index === 0 ? "" : "pt-4"}`}>
                        {program.group}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-pressed={isActive}
                      className={`relative flex w-full items-center gap-3 overflow-hidden rounded-xl border px-3 py-2.5 text-left transition-all ${
                        isActive
                          ? "border-[#1366E0]/30 bg-white shadow-md"
                          : "border-transparent hover:bg-white/70 max-lg:border-[#ECECEC] max-lg:bg-white"
                      }`}
                    >
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-bold transition-colors ${
                          isActive ? "bg-[#1366E0] text-white" : "bg-[#F4EFE6] text-[#9A9A9A]"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span
                        className={`whitespace-nowrap text-sm font-semibold transition-colors lg:whitespace-normal ${
                          isActive ? "text-[#1B1B1B]" : "text-[#8A8A8A]"
                        }`}
                      >
                        {program.title}
                      </span>

                      {/* Progress bar */}
                      {isActive && (
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#ECECEC]">
                          <span
                            key={`${activeIndex}-${paused}`}
                            className="block h-full bg-[#1366E0]"
                            style={{
                              animation: `entry-progress ${AUTO_ADVANCE_MS}ms linear forwards`,
                              animationPlayState: paused ? "paused" : "running",
                            }}
                          />
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Right: details panel */}
          <div className="h-fit rounded-[1.75rem] border border-[#ECECEC] bg-white p-6 shadow-sm sm:p-8 lg:sticky lg:top-28">
            <div key={activeIndex} className="entry-fade grid grid-cols-1 gap-8 sm:grid-cols-[minmax(0,1fr)_200px]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[#1366E0]/25 px-3 py-1 text-xs font-semibold text-[#1366E0]">
                    {active.group}
                  </span>
                  {active.level && (
                    <span className="rounded-full bg-[#1B1B1B] px-3 py-1 text-xs font-semibold text-white">
                      NZQCF {active.level}
                    </span>
                  )}
                  {active.duration && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4EFE6] px-3 py-1 text-xs font-semibold text-[#5A5A5A]">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                        <circle cx="12" cy="12" r="8.5" />
                        <path strokeLinecap="round" d="M12 7.5V12l3 2" />
                      </svg>
                      {active.duration}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                  <span className="text-[#1366E0]">{activeIndex + 1}.</span> {active.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B] sm:text-base">
                  {active.summary}
                </p>

                {active.requirements && (
                <>
                <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9A9A9A]">
                  Entry requirements
                </p>
                <ul className="mt-3 space-y-2.5">
                  {active.requirements.map((item) => {
                    const { label, value } = splitItem(item);
                    return (
                      <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-[#6B6B6B]">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1366E0]" />
                        <span>
                          {label && <span className="font-semibold text-[#1B1B1B]">{label}: </span>}
                          {value}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                </>
                )}
              </div>

              {/* Image */}
              <div className="border-l-4 border-[#1366E0] pl-3 sm:self-start">
                <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-xl">
                  <Image src={active.image} alt={active.title} fill sizes="200px" className="object-cover" />
                </div>
              </div>
            </div>

            {/* Prev / next */}
            <div className="mt-8 flex items-center justify-between border-t border-[#F0EBE3] pt-5">
              <span className="text-xs font-semibold text-[#9A9A9A]">
                {String(activeIndex + 1).padStart(2, "0")} / {String(programs.length).padStart(2, "0")}
              </span>
              <div className="flex gap-2">
                {[
                  { step: -1, label: "Previous programme", d: "M15 18l-6-6 6-6" },
                  { step: 1, label: "Next programme", d: "M9 6l6 6-6 6" },
                ].map((btn) => (
                  <button
                    key={btn.step}
                    type="button"
                    onClick={() => go(btn.step)}
                    aria-label={btn.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-[#E5E5E5] text-[#1B1B1B] transition-colors hover:border-[#1366E0] hover:bg-[#1366E0] hover:text-white"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d={btn.d} />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}