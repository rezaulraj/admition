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
    title: "Diversify your enrolment",
    description: "Reach students from 180+ nationalities around the world.",
    icon: (
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 6h-2.9a15.7 15.7 0 0 0-1.4-3.6A8 8 0 0 1 18.9 8ZM12 4c.8 1.2 1.5 2.5 1.9 4h-3.8c.4-1.5 1.1-2.8 1.9-4ZM4.3 14a8.2 8.2 0 0 1 0-4h3.4a16.5 16.5 0 0 0 0 4H4.3Zm.8 2h2.9c.3 1.3.8 2.5 1.4 3.6A8 8 0 0 1 5.1 16ZM8 8H5.1a8 8 0 0 1 4.3-3.6C8.8 5.5 8.4 6.7 8 8Zm4 12c-.8-1.2-1.5-2.5-1.9-4h3.8c-.4 1.5-1.1 2.8-1.9 4Zm2.3-6H9.7a14.7 14.7 0 0 1 0-4h4.6a14.7 14.7 0 0 1 0 4Zm.3 5.6c.6-1.1 1.1-2.3 1.4-3.6h2.9a8 8 0 0 1-4.3 3.6Zm1.7-5.6a16.5 16.5 0 0 0 0-4h3.4a8.2 8.2 0 0 1 0 4h-3.4Z" />
    ),
  },
  {
    title: "Higher quality applications",
    description: "Pre-screened, complete files that improve conversion by 10%.",
    icon: (
      <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5ZM10.6 17.4l5.7-5.7-1.4-1.4-4.3 4.3-1.9-1.9-1.4 1.4 3.3 3.3Z" />
    ),
  },
  {
    title: "Less manual processing",
    description: "Proven technology that cuts manual work by 40% and saves time.",
    icon: (
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    ),
  },
];

const fadeUp =
  "animate-[partnerFadeUp_0.8s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none";

export default function HelpPartnerInstitutions() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20">
      <style>{`
        @keyframes partnerFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="mx-auto container grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Image collage (left on desktop, mirrors the "Find Your Perfect Study Program" section) */}
        <div
          className={`order-2 grid h-[440px] grid-cols-[1fr_1.4fr] gap-4 sm:h-[540px] lg:order-1 lg:h-[600px] ${fadeUp}`}
          style={{ animationDelay: "150ms" }}>
          <div className="flex flex-col gap-4">
            {/* Stat card */}
            <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-[2rem] bg-linear-to-br from-[#14B08C] to-[#0B7A64] p-5 text-white sm:p-7">
              <span
                aria-hidden
                className="absolute -right-10 -top-10 h-36 w-36 rotate-45 rounded-[2rem] border-[18px] border-white/10"
              />
              <span
                aria-hidden
                className="absolute -bottom-14 -left-8 h-32 w-32 rotate-45 rounded-[1.5rem] bg-white/5"
              />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  {features[0].icon}
                </svg>
              </span>
              <div className="relative">
                <p className="text-4xl font-bold tracking-tight sm:text-5xl">
                  150+
                </p>
                <p className="mt-1 text-sm text-white/85 sm:text-base">
                  Student Nationalities
                </p>
              </div>
            </div>

            <div className="relative flex-[1.3] overflow-hidden rounded-[2rem]">
              <Image
                src="/How%20We%20Help%20Partner%20Institutions%202.png"
                alt="University admissions officer working on a laptop"
                fill
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-[#14B08C]">
            <Image
              src="/How%20We%20Help%20Partner%20Institutions%201.png"
              alt="Partner institution representative reviewing applications on a tablet"
              fill
              sizes="(min-width: 1024px) 30vw, 58vw"
              className="object-cover object-top"
            />
            {/* Floating badge */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl bg-white/90 p-3 shadow-lg backdrop-blur-md sm:bottom-5 sm:left-auto sm:right-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F58B0F] text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 17.6 9 11.5l4 4L21 7.4V12h2V4h-8v2h4.6L13 12.7l-4-4-7.4 7.5L3 17.6Z" />
                </svg>
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-[#1B1B1B]">+10%</p>
                <p className="text-xs text-[#6B6B6B]">Higher conversion</p>
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className={`order-1 lg:order-2 ${fadeUp}`}>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1366E0]">
            <span className="h-px w-8 bg-[#1366E0]" />
            Partner Institutions
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#1B1B1B] sm:text-4xl lg:text-[2.75rem]">
            How We Help{" "}
            <span className="text-[#1366E0]">Partner Institutions</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#6B6B6B]">
            Grow a diverse, high-quality international intake while spending
            less time on paperwork. We handle the heavy lifting so your team
            can focus on admitting the right students.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {features.map((feature) => (
              <li
                key={feature.title}
                className="group flex items-start gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-sm shadow-black/2 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#14B08C]/25 hover:shadow-md">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#14B08C]/10 text-[#0B7A64] transition-colors duration-300 group-hover:bg-[#14B08C] group-hover:text-white">
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
            href="/institution-partner"
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#1366E0] px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#1366E0]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0F55BE] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1366E0] focus-visible:ring-offset-2">
            Partner with Us
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
      </div>
    </section>
  );
}
