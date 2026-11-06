"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

// Place your images at, e.g.:
// /public/entry/foundation.jpg
// /public/entry/diploma.jpg
// /public/entry/bachelors.jpg
// /public/entry/masters.jpg
// /public/entry/mqp.jpg

type Program = {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
};

const programs: Program[] = [
  {
    title: "Foundation Program",
    description:
      "O Level or Year 10 completion. IELTS or PTE required as proof of English proficiency.",
    image: "/foundation.avif",
    icon: (
      <path d="M12 3 2 8l10 5 8-4v6h2V8L12 3Zm0 8L4 8l8-4 8 4-8 4Zm-6 2v4c0 1.66 2.69 3 6 3s6-1.34 6-3v-4l-6 3-6-3Z" />
    ),
  },
  {
    title: "Diploma Program",
    description:
      "A Level, HSC, or equivalent completion. IELTS or PTE required as proof of English proficiency.",
    image: "/diploma.avif",
    icon: (
      <path d="M9 2h6a2 2 0 0 1 2 2v2h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h4V4a2 2 0 0 1 2-2Zm0 4h6V4H9v2Z" />
    ),
  },
  {
    title: "Bachelor's Program",
    description:
      "HSC or equivalent with required grades. IELTS 6.0 or PTE 50+ generally accepted across partner universities.",
    image: "/bachelors.png",
    icon: (
      <path d="m12 2 10 5-10 5L2 7l10-5Zm-7 8.5 7 3.5 7-3.5V16l-7 3.5L5 16v-5.5Z" />
    ),
  },
  {
    title: "Master's Program",
    description:
      "A completed Bachelor's degree with a minimum GPA. IELTS 6.5 or PTE 58+ typically required.",
    image: "/masters.png",
    icon: (
      <path d="M12 2 1 7l11 5 9-4.09V17h2V7L12 2ZM5 13.18v4.72C5 20.66 8.13 22 12 22s7-1.34 7-4.1v-4.72l-7 3.19-7-3.19Z" />
    ),
  },
  {
    title: "Master's Qualifying Program (MQP)",
    description:
      "For students who don't meet direct master's entry requirements. Bridges the gap before progressing into the main program.",
    image: "/masters-quality.png",
    icon: (
      <path d="M7 2h10l1 5-1 1v2a5 5 0 0 1-10 0V8L6 7l1-5Zm5 12a3 3 0 0 0 3-3V8H9v3a3 3 0 0 0 3 3Zm-3 5h6v2H9v-2Z" />
    ),
  },
];

const AUTO_ADVANCE_MS = 4000;

export default function EntryRequirements() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-advance to the next program, resetting the timer any time
  // activeIndex changes (whether by the timer itself or a manual click).
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % programs.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [activeIndex]);

  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20">
      <div className="mx-auto container">
        <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          <span className="text-[#1366E0]">Entry</span>{" "}
          <span className="text-[#1B1B1B]">Requirements</span>
        </h2>

        <div className="mt-14 grid grid-cols-1 divide-y divide-[#ECECEC] sm:grid-cols-5 sm:divide-x sm:divide-y-0">
          {programs.map((program, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={program.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="flex flex-col items-start gap-3 px-4 py-6 text-left transition-colors sm:px-6"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill={isActive ? "#1366E0" : "#C9C9C9"}
                  className="transition-colors"
                >
                  {program.icon}
                </svg>

                <span
                  className={`text-sm font-semibold transition-colors sm:text-base ${
                    isActive ? "text-[#1B1B1B]" : "text-[#B5B5B5]"
                  }`}
                >
                  {program.title}
                </span>

                {/* Progress bar: fills over AUTO_ADVANCE_MS, restarts on every change */}
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
                    <p className="text-xs leading-relaxed text-[#6B6B6B] sm:text-sm">
                      {program.description}
                    </p>

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
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
