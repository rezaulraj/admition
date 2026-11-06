"use client";

import { useState } from "react";

const testimonials = [
  {
    quote:
      "I landed my UK student visa on 3rd March for a Master's in Data Analytics at the University of Leicester, and Admission OnBoard made what looked like a mountain of paperwork feel manageable. From choosing the right course to preparing my financial documents, their team was with me at every stage. I'd completed my undergraduate degree just eight months earlier, so having experts double-check everything gave me real peace of mind. Big thanks to Sadia Apu for her patience...",
    name: "Rafid Hasan Chowdhury",
    school: "University of Leicester, United Kingdom",
    initials: "RH",
  },
  {
    quote:
      "Getting my New Zealand visa approved for the Bachelor of Applied Computing at Otago Polytechnic felt like a huge weight off my shoulders. Admission OnBoard handled the university offer, the financial planning, and the visa interview prep without me ever feeling lost. I'd just wrapped up my HSC and had zero idea where to start, but their step-by-step guidance changed that completely. I want to especially thank Imran Vai for always answering my late-night questions...",
    name: "Nusrat Jahan Priya",
    school: "Otago Polytechnic, New Zealand",
    initials: "NJ",
  },
  {
    quote:
      "My Malta student visa was approved for the Bachelor of Science in Information Technology at the University of Malta, and Admission OnBoard guided me through the whole process without a single missed deadline. From the university application to the financial documents and the visa interview preparation, their team explained every step clearly whenever I felt confused. I had only just finished my HSC and knew almost nothing about European study visas, so having people I could ask at any hour meant a lot. Thank you to the entire team for...",
    name: "Mahmud Jubare",
    school: "University of Malta, Malta",
    initials: "MJ",
  },
  {
    quote:
      "Receiving my Hungary study visa for the Bachelor's in Computer Science Engineering at the University of Debrecen felt like a dream come true, and Admission OnBoard was beside me from the first application to the final appointment. They helped me organise my documents, prepare for the embassy interview, and understand what student life in Hungary would really look like. I was nervous about applying abroad for the first time, but their patient, step-by-step support made everything feel achievable. I'm truly grateful to the whole team for...",
    name: "Hossen Akram",
    school: "University of Debrecen, Hungary",
    initials: "HA",
  },
];

export default function VisaSuccessStories() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  const goPrev = () =>
    setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const goNext = () =>
    setActive((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20">
      <div className="mx-auto container">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          {/* Left: heading + controls */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl">
              Visa <span className="text-[#1366E0]">Success Stories</span>
            </h2>
            <p className="mt-3 text-sm font-semibold text-[#6B6B6B] sm:text-base">
              Real journeys, real approvals
            </p>

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous story"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1B1B1B] text-[#1B1B1B] transition-colors hover:bg-[#1B1B1B] hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 12H5M11 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next story"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1B1B1B] text-[#1B1B1B] transition-colors hover:bg-[#1B1B1B] hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: testimonial card */}
          <div className="relative">
            <span className="pointer-events-none absolute -top-10 -left-2 select-none font-serif text-[140px] leading-none text-[#1366E0]/10">
              &ldquo;
            </span>

            <div className="relative">
              <p className="text-base leading-relaxed text-[#2B2B2B] sm:text-lg">
                {current.quote}{" "}
                <button
                  type="button"
                  className="font-semibold text-[#1366E0] hover:underline"
                >
                  View More
                </button>
              </p>

              <div className="mt-8 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1366E0] text-sm font-semibold text-white">
                  {current.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#1B1B1B] sm:text-base">
                    {current.name}
                  </div>
                  <div className="text-xs font-semibold text-[#6B6B6B] sm:text-sm">
                    {current.school}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
