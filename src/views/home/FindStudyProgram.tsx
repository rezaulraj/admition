import Image from "next/image";
import Link from "next/link";
import React from "react";

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    title: "Apply to multiple programs",
    description: "One profile, many applications. No repeated paperwork.",
    icon: (
      <path d="M12 6.5C10.3 5.2 7.9 4.5 5 4.5H3v14h2c2.9 0 5.3.7 7 2 1.7-1.3 4.1-2 7-2h2v-14h-2c-2.9 0-5.3.7-7 2Zm-1 11.4c-1.6-.8-3.5-1.3-6-1.4V6.5c2.6.1 4.6.8 6 2v9.4Zm8-1.4c-2.5.1-4.4.6-6 1.4V8.5c1.4-1.2 3.4-1.9 6-2v10Z" />
    ),
  },
  {
    title: "150,000+ programs to choose from",
    description: "Find the right fit across five top study destinations.",
    icon: (
      <path d="M10.5 3a7.5 7.5 0 0 1 5.9 12.1l4.3 4.3-1.4 1.4-4.3-4.3A7.5 7.5 0 1 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" />
    ),
  },
  {
    title: "Higher chance of success",
    description: "Every application is quality-checked with AI-assisted reviews.",
    icon: (
      <path d="M4 20V10h3v10H4Zm6.5 0V4h3v16h-3ZM17 20v-7h3v7h-3Z" />
    ),
  },
];

const fadeUp =
  "animate-[studyFadeUp_0.8s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none";

export default function FindStudyProgram() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20">
      <style>{`
        @keyframes studyFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="mx-auto container grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Text */}
        <div className={fadeUp}>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1366E0]">
            <span className="h-px w-8 bg-[#1366E0]" />
            International Students
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#1B1B1B] sm:text-4xl lg:text-[2.75rem]">
            Find Your Perfect{" "}
            <span className="text-[#1366E0]">Study Program</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#6B6B6B]">
            We&apos;ve spent a decade perfecting a faster, easier, quality-first
            international study application process. Now, the world is yours
            to explore in just a few clicks.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {features.map((feature) => (
              <li
                key={feature.title}
                className="group flex items-start gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-sm shadow-black/2 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1366E0]/20 hover:shadow-md">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1366E0]/10 text-[#1366E0] transition-colors duration-300 group-hover:bg-[#1366E0] group-hover:text-white">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    {feature.icon}
                  </svg>
                </span>
                <div>
                  <h3 className="text-base font-semibold text-[#1B1B1B]">
                    {feature.title}
                  </h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-[#6B6B6B]">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href="/auth/register"
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#1366E0] px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#1366E0]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0F55BE] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1366E0] focus-visible:ring-offset-2">
            Create a Student Account
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">
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

        {/* Image collage */}
        <div
          className={`grid h-[440px] grid-cols-[1.4fr_1fr] gap-4 sm:h-[540px] lg:h-[600px] ${fadeUp}`}
          style={{ animationDelay: "150ms" }}>
          <div className="relative overflow-hidden rounded-[2rem]">
            <Image
              src="/Find%20Your%20Perfect%20Study%20Program%201.png"
              alt="Smiling student holding books, ready to study abroad"
              fill
              sizes="(min-width: 1024px) 30vw, 58vw"
              className="object-cover object-top"
            />
            {/* Floating badge */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl bg-white/90 p-3 shadow-lg backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-auto">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F58B0F] text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2 2 8l10 5 8-4v6h2V8L12 2Zm-6 10v4c0 1.66 2.69 3 6 3s6-1.34 6-3v-4l-6 3-6-3Z" />
                </svg>
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-[#1B1B1B]">150,000+</p>
                <p className="text-xs text-[#6B6B6B]">Programs worldwide</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Stat card */}
            <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-[2rem] bg-linear-to-br from-[#1366E0] to-[#0A3FB8] p-5 text-white sm:p-7">
              <span
                aria-hidden
                className="absolute -right-10 -top-10 h-36 w-36 rounded-full border-[18px] border-white/10"
              />
              <span
                aria-hidden
                className="absolute -bottom-14 -left-8 h-32 w-32 rounded-full bg-white/5"
              />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2 4 5v6c0 5.5 3.4 10.7 8 12 4.6-1.3 8-6.5 8-12V5l-8-3Zm-1.2 13.4-3.2-3.2 1.4-1.4 1.8 1.8 4.6-4.6 1.4 1.4-6 6Z" />
                </svg>
              </span>
              <div className="relative">
                <p className="text-4xl font-bold tracking-tight sm:text-5xl">
                  95%
                </p>
                <p className="mt-1 text-sm text-white/80 sm:text-base">
                  Acceptance Rate
                </p>
              </div>
            </div>

            <div className="relative flex-[1.3] overflow-hidden rounded-[2rem]">
              <Image
                src="/Find%20Your%20Perfect%20Study%20Program%202.png"
                alt="Students reviewing their study application on a tablet"
                fill
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
