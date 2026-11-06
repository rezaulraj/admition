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
    title: "Foundation Year",
    description: [
      "Academic: Class 12 / HSC with about 50–60%",
      "English: IELTS about 4.5–5.5 overall",
    ],
    image: "/fundation.png",
    icon: (
      <path d="M3 5a1 1 0 0 1 1-1h6a3 3 0 0 1 2 .8A3 3 0 0 1 14 4h6a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a2 2 0 0 0-2 2 2 2 0 0 0-2-2H4a1 1 0 0 1-1-1V5Z" />
    ),
  },
  {
    title: "International Year One",
    description: [
      "Academic: Class 12 with about 60–70% or more, or 1 year of university study",
      "English: IELTS about 5.5–6.0 overall",
    ],
    image: "/internationalone.png",
    icon: <path d="M5 3h2v18H5V3Zm3 1h11l-2 4 2 4H8V4Z" />,
  },
  {
    title: "Bachelor's Degree: 3 years (4 in Scotland)",
    description: [
      "Academic: A-levels, IB, or strong Class 12 results (requirements vary by university)",
      "English: IELTS about 6.0–6.5 overall",
      "Please note: Lower HSC results usually mean a Foundation Year first",
    ],
    image: "/bachelor.png",
    icon: (
      <path d="m12 2 10 5-10 5L2 7l10-5Zm-7 8.5 7 3.5 7-3.5V16l-7 3.5L5 16v-5.5Z" />
    ),
  },
  {
    title: "Integrated Master's: 4 years",
    description: [
      "Academic: Higher grades, especially in maths and science",
      "English: IELTS about 6.5–7.0 overall",
    ],
    image: "/master_intergrate.png",
    icon: (
      <path d="M12 2 3 6.5 12 11l9-4.5L12 2Zm-9 9 9 4.5 9-4.5v2.5L12 18l-9-4.5V11Zm0 5 9 4.5 9-4.5v2.5L12 23l-9-4.5V16Z" />
    ),
  },
  {
    title: "Taught Master's: 1 year",
    description: [
      "Degree: 4-year bachelor's degree with a good CGPA or percentage",
      "English: IELTS about 6.5 overall",
    ],
    image: "/master.png",
    icon: (
      <path d="M12 2 1 7l11 5 9-4.09V17h2V7L12 2ZM5 13.18v4.72C5 20.66 8.13 22 12 22s7-1.34 7-4.1v-4.72l-7 3.19-7-3.19Z" />
    ),
  },
  {
    title: "MBA",
    description: [
      "Degree: Bachelor's degree",
      "Experience: 2–3 years or more of relevant work experience",
      "English: IELTS about 6.5–7.0 overall",
    ],
    image: "/mba.png",
    icon: (
      <path d="M9 2h6a2 2 0 0 1 2 2v2h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h4V4a2 2 0 0 1 2-2Zm0 4h6V4H9v2Z" />
    ),
  },
  {
    title: "Research Master's: 1–2 years",
    description: [
      "Degree: Strong bachelor's degree (about UK 2:1 equivalent)",
      "Proposal: A research proposal",
      "English: IELTS about 6.5–7.0 overall",
    ],
    image: "/research.png",
    icon: (
      <path d="M10 3a7 7 0 0 1 5.6 11.2l5.1 5.1-1.4 1.4-5.1-5.1A7 7 0 1 1 10 3Zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" />
    ),
  },
  {
    title: "PhD: 3–4 years",
    description: [
      "Degree: Strong master's or bachelor's degree",
      "Research: A research proposal and a supervisor",
      "English: IELTS about 6.5–7.0 overall",
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

export default function EntryRequirementsUK() {
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
            Study in the UK – Entry Requirements
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 divide-y divide-[#ECECEC] sm:grid-cols-2 sm:gap-y-4 sm:divide-y-0 lg:grid-cols-4">
          {programs.map((program, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={program.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                className="flex flex-col items-start gap-3 px-4 py-6 text-left transition-colors sm:px-6 lg:border-l lg:border-[#ECECEC] lg:[&:nth-child(4n+1)]:border-l-0"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill={isActive ? "#1366E0" : "#C9C9C9"}
                  fillRule="evenodd"
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
