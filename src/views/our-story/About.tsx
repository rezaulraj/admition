import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full scroll-mt-28 overflow-hidden bg-[#FFFEFA] px-6 py-20 sm:py-24"
    >
      <div className="relative mx-auto container grid max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-16 lg:gap-20">
        {/* Left: copy */}
        <div>
          <span
            aria-hidden
            className="block h-1 w-12 rounded-full bg-[#1366E0]"
          />

          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl lg:text-5xl">
            About <span className="text-[#1366E0]">us</span>
          </h2>

          <p className="mt-6 max-w-xl text-lg font-medium leading-snug text-[#1B1B1B] sm:text-xl">
            Admission OnBoard started with one simple idea: studying abroad
            should feel exciting, not overwhelming.
          </p>

          <div className="mt-5 flex max-w-xl flex-col gap-4 text-sm leading-relaxed text-[#5A5A5A] sm:text-base sm:leading-relaxed">
            <p>
              We connect students with leading universities, cut through the
              confusion around admissions and visas, and bring every part of the
              journey under one roof.
            </p>
            <p>
              Today, we&apos;re more than a consultancy. We&apos;re the bridge
              between ambition and opportunity, one student at a time.
            </p>
          </div>

          <Link
            href="/careers"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#1366E0] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1366E0]/25 transition-all hover:-translate-y-0.5 hover:bg-[#1B1B1B] hover:shadow-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1366E0] focus-visible:ring-offset-2"
          >
            Join our team
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0 transition-transform group-hover:translate-x-1"
              aria-hidden
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

        {/* Right: image with distinct shape */}
        <div className="group relative isolate">
          {/* Soft pink glow (isolate keeps it visible above the section background) */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-[#A5C8F4] opacity-40 blur-3xl"
          />
          {/* Offset accent shape */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-bl-[3rem] rounded-br-lg rounded-tl-[3rem] rounded-tr-[3rem] border-2 border-[#1366E0]/30 transition-transform duration-500 group-hover:translate-x-5 group-hover:translate-y-5"
          />

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-bl-[3rem] rounded-br-lg rounded-tl-[3rem] rounded-tr-[3rem] shadow-xl shadow-black/5">
            <Image
              src="/about.png"
              alt="Admission OnBoard team at work"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
