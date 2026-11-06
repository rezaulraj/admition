import type { ReactNode } from "react";
import Link from "next/link";

// No image in this section: a clean white card on the cream background.

type Perk = { title: string; text: string; icon: ReactNode };

const perks: Perk[] = [
  {
    title: "Meaningful work",
    text: "Help students reach their dreams every day.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z"
      />
    ),
  },
  {
    title: "Learn and grow",
    text: "Training, mentoring and room to build your career.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 18 9.5 12.5l3.5 3.5L20 9m0 0h-5m5 0v5"
      />
    ),
  },
  {
    title: "A friendly team",
    text: "Supportive colleagues who celebrate wins together.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8.5 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM2.5 19.5c0-2.8 2.5-5 5.5-5s5.5 2.2 5.5 5m1.5-4.3c.5-.2 1-.2 1.5-.2 2.5 0 4.5 1.8 4.5 4"
      />
    ),
  },
  {
    title: "Global reach",
    text: "Work with offices in the UK, Bangladesh and Nepal.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.5 12h17M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5s1.2-6.1 3.5-8.5Z"
        />
      </>
    ),
  },
];

export default function JoinOurTeam() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20 sm:py-24">
      <div className="mx-auto container max-w-6xl">
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-[#ECECEC] bg-white p-7 shadow-xl shadow-black/5 sm:p-10 lg:rounded-[2.5rem] lg:p-14">
          {/* Decorative outline rings (no fill colour) */}
          <svg
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 text-[#1366E0]/15 sm:h-96 sm:w-96"
            viewBox="0 0 200 200"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="100" cy="100" r="98" strokeWidth="1.5" />
            <circle
              cx="100"
              cy="100"
              r="74"
              strokeWidth="1.5"
              strokeDasharray="4 6"
            />
            <circle cx="100" cy="100" r="50" strokeWidth="1.5" />
          </svg>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            {/* Left: message */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#1366E0]/25 px-3.5 py-1.5 text-xs font-semibold text-[#1366E0]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1366E0] opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1366E0]" />
                </span>
                We&apos;re hiring
              </span>

              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-[#1B1B1B] sm:text-4xl lg:text-[2.75rem]">
                Love helping people{" "}
                <span className="text-[#1366E0]">reach their dreams?</span>
              </h2>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#6B6B6B] sm:text-base">
                We&apos;re always looking for kind, curious and driven people to
                join our growing family. Come build a rewarding career while
                changing students&apos; lives.
              </p>

              <Link
                href="/careers"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#1366E0] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1366E0]/30 transition-all hover:-translate-y-0.5 hover:bg-[#0F55BE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1366E0] focus-visible:ring-offset-2"
              >
                See open roles
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m0 0-6-6m6 6-6 6"
                  />
                </svg>
              </Link>
            </div>

            {/* Right: perks */}
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {perks.map((perk) => (
                <li
                  key={perk.title}
                  className="group flex items-start gap-4 rounded-2xl border border-[#F0EBE3] p-5 transition-all duration-300 hover:border-[#1366E0]/30 hover:shadow-md"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 border-[#1366E0]/25 text-[#1366E0] transition-all duration-300 group-hover:border-[#1366E0] group-hover:bg-[#1366E0] group-hover:text-white">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      aria-hidden
                    >
                      {perk.icon}
                    </svg>
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[#1B1B1B] sm:text-base">
                      {perk.title}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-[#6B6B6B] sm:text-sm">
                      {perk.text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
