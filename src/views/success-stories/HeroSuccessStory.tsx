import React from "react";
import Image from "next/image";
import Link from "next/link";

// Place your image at: /public/success-students.png

export default function HeroSuccessStory() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FFFEFA]">
      <div
        className="pointer-events-none absolute -left-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "#A5C8F4" }}
      />

      <div className="relative mx-auto container flex flex-col items-center gap-12 px-6 py-20 md:flex-row md:gap-18 md:py-24">
        {/* Left: copy */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#1B1B1B] sm:text-5xl">
            <span className="text-[#1366E0]">Success stories</span> from
            students who turned their study-abroad dreams into reality
          </h1>

          <Link
            href="/contact"
            className="mt-9 inline-flex items-center gap-2 rounded-full border border-[#1B1B1B] bg-white px-6 py-3 text-sm font-semibold text-[#1B1B1B] transition-colors hover:bg-[#1B1B1B] hover:text-white"
          >
            Schedule A Free Consultation
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0"
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

        {/* Right: image with floating stat badge */}
        <div className="relative w-full md:w-1/2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
            <Image
              src="/success-students.png"
              alt="Students celebrating their study abroad offers"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.2)] sm:-bottom-8 sm:left-10">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1366E0]/10">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2 14.5 8.5 21 9l-5 4.5L17.5 20 12 16.5 6.5 20 8 13.5 3 9l6.5-.5Z"
                  fill="#1366E0"
                />
              </svg>
            </div>
            <div>
              <div className="text-lg font-semibold text-[#1B1B1B]">5,000+</div>
              <div className="text-xs font-semibold text-[#6B6B6B]">
                Students Placed Abroad
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
