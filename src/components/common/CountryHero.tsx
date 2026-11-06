"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Image lives at /public/desination.png (rename both here and in /public if you fix the spelling)
const HERO_IMAGE = "/desination.png";

const titleLines = [
  "Discover your ideal",
  "study destination,",
  "built around you.",
];

const stats = [
  { value: "15+", label: "Years of experience" },
  { value: "5,000+", label: "Students placed" },
  { value: "100+", label: "University partners" },
];

const destinations = [
  "United Kingdom",
  "Australia",
  "New Zealand",
  "Finland",
  "Greece",
  "Lithuania",
  "Hungary",
  "Romania",
  "Malta",
  "Cyprus",
  "Italy",
  "Norway",
];

export default function CountryHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const reveal = (extra = "") =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${
      mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
    } ${extra}`;

  return (
    <section className="relative overflow-hidden bg-[#FFFEFA] px-5 py-14 text-[#1B1B1B] md:px-10 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#1366E0]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-[#2F5DA8]/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div className="relative z-10">
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            {titleLines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <span
                  className={`block transition-all duration-700 ease-out motion-reduce:transition-none ${
                    i === 1 ? "text-[#1366E0]" : ""
                  } ${mounted ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            className={reveal(
              "mt-6 max-w-lg text-base leading-relaxed text-[#4A4A4A] md:text-lg",
            )}
            style={{ transitionDelay: "420ms" }}
          >
            We connect ambitious students with leading universities abroad,
            guiding you from your first enquiry to the day you land on campus,
            wherever in the world that may be.
          </p>

          <div
            className={reveal("mt-9 flex flex-wrap items-center gap-4")}
            style={{ transitionDelay: "540ms" }}
          >
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-full bg-[#1366E0] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-[#1366E0]/25 transition-all hover:-translate-y-0.5 hover:bg-[#0F55BE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1366E0] focus-visible:ring-offset-2"
            >
              Visit Our Program
            </Link>

            <Link
              href="/our-story"
              className="group inline-flex items-center gap-3 rounded-full py-2 pr-4 text-sm font-semibold text-[#1B1B1B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1366E0]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-[#1366E0] text-xl text-[#1366E0] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#1366E0] group-hover:text-white">
                ↗
              </span>
              <span>
                <span className="block">Read our story</span>
                <span className="block text-xs font-normal text-[#8A8A8A]">
                  Built on trust, students and progress
                </span>
              </span>
            </Link>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-[#ECECEC] rounded-2xl border border-[#ECECEC] bg-white/80 shadow-sm backdrop-blur">
            {stats.map((item, i) => (
              <div
                key={item.label}
                className={reveal("px-4 py-5 text-center sm:px-6 sm:text-left")}
                style={{ transitionDelay: `${660 + i * 120}ms` }}
              >
                <dd className="text-2xl font-bold tracking-tight text-[#1366E0] sm:text-3xl">
                  {item.value}
                </dd>
                <dt className="mt-1 text-xs font-medium text-[#6B6B6B] sm:text-sm">
                  {item.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        <div
          className={`relative transition-all duration-[1200ms] ease-out motion-reduce:transition-none ${
            mounted
              ? "translate-x-0 scale-100 opacity-100"
              : "translate-x-16 scale-95 opacity-0"
          }`}
        >
          <div className="relative">
            <div
              aria-hidden
              className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-[2rem] border-2 border-[#1366E0]/30 sm:block"
            />

            <div className="relative rounded-[2rem] bg-white p-3 shadow-2xl ring-1 ring-[#ECECEC] sm:p-4">
              <Image
                src={HERO_IMAGE}
                alt="Students exploring study abroad opportunities"
                width={0}
                height={0}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="h-auto w-full rounded-[1.4rem]"
                priority
              />

              <Link
                href="/contact"
                aria-label="Book a free consultation"
                className="absolute right-7 top-7 grid h-12 w-12 place-items-center rounded-full border border-white/70 bg-[#1B1B1B]/40 text-xl text-white backdrop-blur-xl transition-all hover:rotate-45 hover:border-[#1366E0] hover:bg-[#1366E0] sm:right-8 sm:top-8 sm:h-14 sm:w-14 sm:text-2xl"
              >
                ↗
              </Link>
            </div>

            <div className="absolute -left-4 top-10 hidden items-center gap-3 rounded-2xl border border-[#ECECEC] bg-white px-4 py-3 shadow-xl sm:flex lg:-left-10">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#59B226]/15 text-lg">
                🎓
              </span>
              <span>
                <span className="block text-sm font-bold text-[#1B1B1B]">
                  Free expert guidance
                </span>
                <span className="block text-xs text-[#6B6B6B]">
                  From enquiry to campus
                </span>
              </span>
            </div>
          </div>

          <div
            className={reveal(
              "mt-8 flex flex-wrap items-center gap-2 sm:gap-3",
            )}
            style={{ transitionDelay: "900ms" }}
          >
            <span className="mr-1 text-sm font-semibold text-[#1B1B1B]">
              Popular destinations
            </span>
            {destinations.map((d) => (
              <span
                key={d}
                className="rounded-full border border-[#ECECEC] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#3A3A3A] shadow-sm transition-colors hover:border-[#1366E0]/50 hover:text-[#1366E0]"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
