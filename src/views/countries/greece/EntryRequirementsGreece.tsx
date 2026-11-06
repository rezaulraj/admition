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
    title: "Bachelor's (3 to 6 years)",
    description: [
      "Duration: Most take 4 years. Engineering, Dentistry, Pharmacy, Agriculture, Forestry and Fine Arts take 5, and Medicine takes 6",
      "English-taught: The portal lists 16 programmes, including Medicine, Pharmacy, Law, AI & Data Science, Business, Archaeology and Engineering",
      "Fees (English-taught): €5,000–€15,000 a year",
      "Entry (English-taught): A recognised secondary diploma and proof of English (often IELTS 6.0–6.5, but it varies by programme). Apply via SiG",
      "Greek-taught: More than 1,000 programmes, with free tuition",
      "Entry (Greek-taught): You and your parents must not be Greek nationals. Apply through the Ministry of Education's system with Apostille-certified, Greek-translated documents. You need enough Greek to study in Greek. Check the dates for the next intake (the 2026–27 window was 2–9 July 2026)",
    ],
    image: "/bachelor.png",
    icon: (
      <path d="m12 2 10 5-10 5L2 7l10-5Zm-7 8.5 7 3.5 7-3.5V16l-7 3.5L5 16v-5.5Z" />
    ),
  },
  {
    title: "Master's (1 to 2 years)",
    description: [
      "Programmes: 170+ English-taught programmes",
      "Fees: About €3,000–€7,000 a year",
      "Entry: A recognised Bachelor's degree, usually in a related field, and proof of English",
      "Extra: Some programmes, such as MBAs, also ask for GMAT/GRE scores or work experience",
      "Deadlines: Each programme sets its own rules and deadlines",
    ],
    image: "/master.png",
    icon: (
      <path d="M12 2 1 7l11 5 9-4.09V17h2V7L12 2ZM5 13.18v4.72C5 20.66 8.13 22 12 22s7-1.34 7-4.1v-4.72l-7 3.19-7-3.19Z" />
    ),
  },
  {
    title: "PhD (3+ years)",
    description: [
      "Entry: A Master's degree is generally required",
      "Conditions: Departments set their own conditions",
      "Documents: You usually need a research proposal and a supervisor",
      "Where to look: Find PhD opportunities on MaTSiG",
    ],
    image: "/phd.png",
    icon: (
      <path d="M7 2h10l1 5-1 1v2a5 5 0 0 1-10 0V8L6 7l1-5Zm5 12a3 3 0 0 0 3-3V8H9v3a3 3 0 0 0 3 3Zm-3 5h6v2H9v-2Z" />
    ),
  },
];

// Longer than other countries: the Greek requirements have more to read
const AUTO_ADVANCE_MS = 9000;

/** Splits "Academic: High School..." into a bold label and its value */
function splitItem(item: string) {
  const i = item.indexOf(":");
  return i === -1
    ? { label: "", value: item }
    : { label: item.slice(0, i), value: item.slice(i + 1).trim() };
}

export default function EntryRequirementsGreece() {
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
            Study in Greece – Entry Requirements
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 divide-y divide-[#ECECEC] md:grid-cols-3 md:divide-x md:divide-y-0">
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
