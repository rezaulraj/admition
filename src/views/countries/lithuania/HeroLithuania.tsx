import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

type Stat = {
  value: string;
  suffix?: string;
  label: string;
  icon: ReactNode;
};

const stats: Stat[] = [
  {
    value: "15+ Universities & 500+ English-Taught Programmes",
    label: "open for international student admissions.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Zm3 1.5v4.5c0 1.4 2.7 3 6 3s6-1.6 6-3V11"
      />
    ),
  },
  {
    value: "€1,300 – €6,500",
    suffix: "/",
    label: "Tuition Fee Per Year",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path
          strokeLinecap="round"
          d="M15 9a3.5 3.5 0 1 0 0 6M7.5 11h5M7.5 13h5"
        />
      </>
    ),
  },
  {
    value: "Post-Study Work",
    label: "12-month work permit after graduation",
    icon: (
      <>
        <rect x="3.5" y="7.5" width="17" height="12" rx="2" />
        <path
          strokeLinecap="round"
          d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5M3.5 12.5h17"
        />
      </>
    ),
  },
  {
    value: "Permanent Residency",
    label: "Eligible after 5 years of legal residence",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1v-8.5Z"
      />
    ),
  },
];

export default function HeroLithuania() {
  return (
    <section className="container mx-auto px-4 py-10 lg:pb-28">
      <div className="relative">
        {/* Image + copy */}
        <div className="relative min-h-[520px] w-full overflow-hidden rounded-[2rem] sm:min-h-0 sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src="/lithuania-hero.png"
            alt="Vilnius Old Town, Lithuania"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />

          {/* Red gradient fading in from the left */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1366E0] via-[#1366E0]/5 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1366E0] via-[#1366E0]/5 to-transparent" />

          <div className="relative z-10 flex h-full min-h-[520px] flex-col justify-center px-6 pb-20 pt-10 sm:min-h-0 sm:px-10 sm:pb-16 md:px-16 lg:pb-24">
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
              Lithuania
            </h1>

            <p className="mt-4 max-w-lg text-sm font-semibold leading-relaxed text-white/90 sm:text-base">
              Study in Lithuania with Admission On Board. Get expert guidance on
              admissions, scholarships, and visa support for a smooth study
              abroad journey.
            </p>

            <Link
              href="/contact"
              className="group mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1B1B1B] shadow-md transition-transform hover:scale-105"
            >
              Free Expert Consultation
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0 transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/*
          Stat cards
          - Mobile/tablet: 2×2 grid, pulled up slightly over the image's bottom edge
          - Desktop: 4 in a row, hanging half outside the image
        */}
        <div className="relative z-20 mx-3 -mt-12 sm:mx-8 lg:absolute lg:inset-x-10 lg:bottom-0 lg:mx-0 lg:mt-0 lg:translate-y-1/2">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[#1B1B1B]/10 shadow-xl ring-1 ring-black/5 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="flex flex-col items-center gap-2 bg-white/95 px-3 py-5 text-center backdrop-blur-md sm:px-5 lg:py-6"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#1366E0]/10">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1366E0"
                    strokeWidth={1.8}
                    aria-hidden
                  >
                    {stat.icon}
                  </svg>
                </span>

                <p className="text-base font-bold leading-tight text-[#1B1B1B] sm:text-lg xl:text-xl">
                  {stat.value}
                  {stat.suffix && (
                    <span className="ml-1 text-xs font-semibold text-[#6B6B6B] sm:text-sm">
                      {stat.suffix}
                    </span>
                  )}
                </p>

                <p className="text-xs leading-snug text-[#6B6B6B] sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
