"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";

type Program = {
  title: string;
  description: string[];
  image: string;
  icon: ReactNode;
};

const programs: Program[] = [
  {
    title: "Foundation / Certificate",
    description: [
      "Who it's for: Students whose school results fall short of Maltese entry rules, or who need to improve their English",
      "Entry: Secondary school certificate, with about 50–60% overall",
      "English: Typically IELTS 5.0–5.5",
    ],
    image: "/fundation.png",
    icon: (
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v16H6.5a.5.5 0 0 0 0 1H20v3H6.5A2.5 2.5 0 0 1 4 19.5v-15Z" />
    ),
  },
  {
    title: "Higher / Advanced Diploma",
    description: [
      "Where: Vocational and technical programmes at MCAST, ITS and private institutions",
      "Entry: Higher secondary certificate (12 years), with relevant subjects such as Maths for IT",
      "English: Typically IELTS 5.5–6.0",
    ],
    image: "/diploma.png",
    icon: (
      <path d="M9 2h6a2 2 0 0 1 2 2v2h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h4V4a2 2 0 0 1 2-2Zm0 4h6V4H9v2Z" />
    ),
  },
  {
    title: "Bachelor's Degree",
    description: [
      "Entry: A recognised higher secondary certificate (A-Levels, IB, HSC or similar), plus subject requirements such as Maths for Engineering or Biology for Health",
      "English: Typically IELTS 6.0 (no band below 5.5) or TOEFL 80+",
      "Waiver: Students from English-speaking countries may request an English waiver",
    ],
    image: "/bachelor.png",
    icon: (
      <path d="m12 2 10 5-10 5L2 7l10-5Zm-7 8.5 7 3.5 7-3.5V16l-7 3.5L5 16v-5.5Z" />
    ),
  },
  {
    title: "Master's Degree",
    description: [
      "Entry: A recognised 3- or 4-year Bachelor's in a related field, with about 55% or a 2.5/4.0 GPA or higher",
      "Executive MBA: Usually needs 2–3 years of work experience",
      "English: Typically IELTS 6.5 (no band below 6.0)",
    ],
    image: "/master.png",
    icon: (
      <path d="M12 2 1 7l11 5 9-4.09V17h2V7L12 2ZM5 13.18v4.72C5 20.66 8.13 22 12 22s7-1.34 7-4.1v-4.72l-7 3.19-7-3.19Z" />
    ),
  },
  {
    title: "PhD",
    description: [
      "Entry: A Master's degree, a research proposal and a faculty supervisor",
      "English: Typically IELTS 7.0, depending on the faculty",
    ],
    image: "/phd.png",
    icon: (
      <path d="M7 2h10l1 5-1 1v2a5 5 0 0 1-10 0V8L6 7l1-5Zm5 12a3 3 0 0 0 3-3V8H9v3a3 3 0 0 0 3 3Zm-3 5h6v2H9v-2Z" />
    ),
  },
];

const AUTO_ADVANCE_MS = 6000;

/** Splits "Academic: High School..." into a bold label and its value */
function splitItem(item: string) {
  const i = item.indexOf(":");
  return i === -1
    ? { label: "", value: item }
    : { label: item.slice(0, i), value: item.slice(i + 1).trim() };
}

export default function EntryRequirementsMalta() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % programs.length);
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(id);
  }, [activeIndex]);

  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20">
      <div className="mx-auto container">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="text-[#1366E0]">Entry</span>{" "}
            <span className="text-[#1B1B1B]">Requirements</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm font-semibold text-gray-700 sm:text-base">
            Study in Malta – Entry Requirements
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 divide-y divide-[#ECECEC] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3 xl:grid-cols-5 xl:divide-x">
          {programs.map((program, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={program.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                className="flex flex-col items-start gap-3 px-4 py-6 text-left transition-colors sm:px-6"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill={isActive ? "#1366E0" : "#C9C9C9"}
                  className="transition-colors"
                  aria-hidden
                >
                  {program.icon}
                </svg>

                <span
                  className={`text-sm font-semibold transition-colors sm:text-base ${
                    isActive ? "text-[#1B1B1B]" : "text-[#B5B5B5]"
                  }`}
                >
                  <span className={isActive ? "text-[#1366E0]" : ""}>
                    {index + 1}.
                  </span>{" "}
                  {program.title}
                </span>

                {/* Progress bar */}
                <div className="h-1 w-full overflow-hidden rounded-full bg-[#ECECEC]">
                  {isActive && (
                    <div
                      key={activeIndex}
                      className="h-full rounded-full bg-[#1366E0]"
                      style={{
                        animation: `entry-progress ${AUTO_ADVANCE_MS}ms linear forwards`,
                      }}
                    />
                  )}
                </div>

                {isActive && (
                  <>
                    {/* Requirements */}
                    <ul className="mt-1 w-full space-y-2.5">
                      {program.description.map((item) => {
                        const { label, value } = splitItem(item);
                        return (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-xs leading-relaxed text-[#6B6B6B] sm:text-sm"
                          >
                            <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1366E0]" />
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

                    {/* Image */}
                    <div className="relative mt-2 w-full border-l-4 border-[#1366E0] pl-3">
                      <div className="relative aspect-square w-full max-w-[180px] overflow-hidden rounded-xl">
                        <Image
                          src={program.image}
                          alt={program.title}
                          fill
                          sizes="180px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes entry-progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
