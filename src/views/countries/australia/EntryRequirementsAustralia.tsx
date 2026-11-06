"use client";

import { useEffect, useState } from "react";
import Image from "next/image";


type Group = "Pathway" | "Undergraduate" | "Postgraduate" | "Doctoral";

type Program = {
  title: string;
  group: Group;
  duration?: string;
  summary: string;
  requirements: string[];
  image: string;
};

const programs: Program[] = [
  {
    title: "Foundation Program",
    group: "Pathway",
    duration: "About 1 year",
    summary:
      "A pathway course of about 1 year that prepares students for entry into a bachelor's degree.",
    requirements: [
      "Academic: Class 12 / HSC or equivalent",
      "English: IELTS about 5.0–5.5",
    ],
    image: "/fundation.png",
  },
  {
    title: "Diploma / Advanced Diploma",
    group: "Pathway",
    duration: "1–2 years",
    summary:
      "A 1–2 year course that can often be credited towards the first year of a bachelor's degree.",
    requirements: [
      "Academic: Class 12 or equivalent",
      "English: IELTS about 5.5–6.0",
    ],
    image: "/diploma.png",
  },
  {
    title: "Bachelor's Degree",
    group: "Undergraduate",
    duration: "Usually 3 years",
    summary:
      "The standard undergraduate degree, usually 3 years, and longer for fields such as engineering and medicine.",
    requirements: [
      "Academic: Year 12 or equivalent, with the score set by the university",
      "Please note: Applicants from 12-year systems may need a Foundation or Diploma first",
      "English: IELTS about 6.0–6.5",
    ],
    image: "/bachelor.png",
  },
  {
    title: "Bachelor's with Honours",
    group: "Undergraduate",
    duration: "+1 year or 4-year integrated",
    summary:
      "An extra research-focused year after a bachelor's degree, or a 4-year integrated course, and a common route into research degrees.",
    requirements: [
      "Academic: A strong bachelor's result",
      "English: IELTS about 6.5",
    ],
    image: "/bachelor.png",
  },
  {
    title: "Double Degree",
    group: "Undergraduate",
    duration: "4–5 years",
    summary:
      "Two bachelor's degrees studied together in less time than separately, usually 4–5 years.",
    requirements: [
      "Academic: The higher entry requirement of the two courses",
      "English: IELTS about 6.0–6.5",
    ],
    image: "/bachelor.png",
  },
  {
    title: "Graduate Certificate",
    group: "Postgraduate",
    duration: "0.5–1 year",
    summary:
      "A short postgraduate course of about 0.5–1 year that builds skills in a field.",
    requirements: ["Degree: Bachelor's degree", "English: IELTS about 6.5"],
    image: "/master.png",
  },
  {
    title: "Graduate Diploma",
    group: "Postgraduate",
    duration: "1–2 years",
    summary:
      "A postgraduate course of about 1–2 years, often used to change fields or as a bridge to a master's.",
    requirements: ["Degree: Bachelor's degree", "English: IELTS about 6.5"],
    image: "/diploma.png",
  },
  {
    title: "Master's by Coursework",
    group: "Postgraduate",
    duration: "1–2 years",
    summary:
      "A taught postgraduate degree of 1–2 years, with classes, assignments and sometimes a project.",
    requirements: [
      "Degree: Recognised bachelor's degree with a good GPA or percentage",
      "Please note: A 3-year bachelor's may need a Graduate Diploma or Honours first",
      "English: IELTS about 6.5 (at least 6.0 in each skill)",
    ],
    image: "/master.png",
  },
  {
    title: "MBA",
    group: "Postgraduate",
    duration: "1–2 years",
    summary: "A professional management master's degree, usually 1–2 years.",
    requirements: [
      "Degree: Bachelor's degree",
      "Experience: 2–3 years or more of work experience",
      "English: IELTS about 6.5–7.0",
    ],
    image: "/mba.png",
  },
  {
    title: "Master's by Research",
    group: "Postgraduate",
    duration: "1–2 years",
    summary: "A 1–2 year degree based on an independent research thesis.",
    requirements: [
      "Degree: Strong bachelor's degree, often with Honours",
      "Research: Research proposal and supervisor",
      "English: IELTS about 6.5–7.0",
    ],
    image: "/research.png",
  },
  {
    title: "Extended Master's (Law, Medicine and similar)",
    group: "Postgraduate",
    duration: "3–4 years",
    summary:
      "A 3–4 year professional degree that leads directly into careers such as law and medicine.",
    requirements: [
      "Degree: Bachelor's degree with a strong GPA",
      "Selection: Possible admission test or interview",
      "English: The requirement depends on the profession",
    ],
    image: "/master.png",
  },
  {
    title: "PhD",
    group: "Doctoral",
    duration: "3–4 years",
    summary:
      "The highest research degree, usually 3–4 years, ending in an original thesis.",
    requirements: [
      "Degree: Honours bachelor's or master's degree",
      "Research: Research proposal and supervisor",
      "English: IELTS about 6.5–7.0",
    ],
    image: "/phd.png",
  },
  {
    title: "Professional Doctorate",
    group: "Doctoral",
    summary:
      "A research-based doctorate focused on professional practice, such as in education, engineering, business or health.",
    requirements: [
      "Degree: Master's degree",
      "Experience: Relevant professional experience",
      "English: IELTS about 6.5–7.0",
    ],
    image: "/phd.png",
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

export default function EntryRequirementsAustralia() {
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
            Study in Australia – Entry Requirements
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
                const showGroup =
                  index === 0 || programs[index - 1].group !== program.group;
                return (
                  <li key={program.title} className="shrink-0 lg:shrink">
                    {showGroup && (
                      <p
                        className={`hidden px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9A9A9A] lg:block ${index === 0 ? "" : "pt-4"}`}
                      >
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
                          isActive
                            ? "bg-[#1366E0] text-white"
                            : "bg-[#F4EFE6] text-[#9A9A9A]"
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
            <div
              key={activeIndex}
              className="entry-fade grid grid-cols-1 gap-8 sm:grid-cols-[minmax(0,1fr)_200px]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[#1366E0]/25 px-3 py-1 text-xs font-semibold text-[#1366E0]">
                    {active.group}
                  </span>
                  {active.duration && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4EFE6] px-3 py-1 text-xs font-semibold text-[#5A5A5A]">
                      <svg
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden
                      >
                        <circle cx="12" cy="12" r="8.5" />
                        <path strokeLinecap="round" d="M12 7.5V12l3 2" />
                      </svg>
                      {active.duration}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                  <span className="text-[#1366E0]">{activeIndex + 1}.</span>{" "}
                  {active.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B] sm:text-base">
                  {active.summary}
                </p>

                <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9A9A9A]">
                  Entry requirements
                </p>
                <ul className="mt-3 space-y-2.5">
                  {active.requirements.map((item) => {
                    const { label, value } = splitItem(item);
                    return (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm leading-relaxed text-[#6B6B6B]"
                      >
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1366E0]" />
                        <span>
                          {label && (
                            <span className="font-semibold text-[#1B1B1B]">
                              {label}:{" "}
                            </span>
                          )}
                          {value}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Image */}
              <div className="border-l-4 border-[#1366E0] pl-3 sm:self-start">
                <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-xl">
                  <Image
                    src={active.image}
                    alt={active.title}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Prev / next */}
            <div className="mt-8 flex items-center justify-between border-t border-[#F0EBE3] pt-5">
              <span className="text-xs font-semibold text-[#9A9A9A]">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(programs.length).padStart(2, "0")}
              </span>
              <div className="flex gap-2">
                {[
                  {
                    step: -1,
                    label: "Previous programme",
                    d: "M15 18l-6-6 6-6",
                  },
                  { step: 1, label: "Next programme", d: "M9 6l6 6-6 6" },
                ].map((btn) => (
                  <button
                    key={btn.step}
                    type="button"
                    onClick={() => go(btn.step)}
                    aria-label={btn.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-[#E5E5E5] text-[#1B1B1B] transition-colors hover:border-[#1366E0] hover:bg-[#1366E0] hover:text-white"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={btn.d}
                      />
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
