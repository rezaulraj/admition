import type { ReactNode } from "react";
import Image from "next/image";

// Place your image at: /public/mission.png

type Pillar = {
  title: string;
  description: string;
  icon: ReactNode;
};

const pillars: Pillar[] = [
  {
    title: "Free for every student",
    description:
      "From your first question to the day you enrol, our guidance never comes with a price tag.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z"
      />
    ),
  },
  {
    title: "Honest, unbiased advice",
    description:
      "We recommend what genuinely fits you, not just the universities we happen to partner with.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4"
      />
    ),
  },
  {
    title: "Local care, global reach",
    description:
      "Offices in the UK, Bangladesh and Nepal, backed by one coordinated team.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path
          strokeLinecap="round"
          d="M3.5 12h17M12 3.5c2.5 2.6 3.5 5.4 3.5 8.5s-1 5.9-3.5 8.5c-2.5-2.6-3.5-5.4-3.5-8.5s1-5.9 3.5-8.5Z"
        />
      </>
    ),
  },
  {
    title: "Experience you can trust",
    description:
      "Years of experience placing students at universities they once thought were out of reach.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z"
      />
    ),
  },
];

export default function OurMission() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FFFEFA] px-6 py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#1366E0]/10 blur-3xl"
      />

      <div className="relative mx-auto container max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-16 lg:gap-20">
          {/* Left: copy */}
          <div>
            <span
              aria-hidden
              className="block h-1 w-12 rounded-full bg-[#1366E0]"
            />
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl lg:text-5xl">
              Our mission
            </h2>

            <figure className="relative mt-7 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-7">
              <svg
                className="absolute -top-4 left-6 h-8 w-8 text-[#1366E0]"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M7.2 6C4.9 7.3 3.5 9.6 3.5 12.6V18h6v-6H6.6c.1-1.9 1-3.3 2.6-4.2L7.2 6Zm10 0c-2.3 1.3-3.7 3.6-3.7 6.6V18h6v-6h-2.9c.1-1.9 1-3.3 2.6-4.2L17.2 6Z" />
              </svg>
              <blockquote className="text-base font-medium italic leading-relaxed text-[#2A2A2A] sm:text-lg">
                To close the distance between ambitious students and the
                world&apos;s leading universities, so that quality education is
                never out of reach.
              </blockquote>
            </figure>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#5A5A5A] sm:text-base sm:leading-relaxed">
              Our students come from every corner of the world: South Asia, the
              Middle East, Africa and Europe. Every recommendation we make is
              honest and never limited to a fixed list of partners, and our
              support is completely free, from your first message to the day you
              enrol.
            </p>
          </div>

          {/* Right: image */}
          <div className="group relative">
            <div
              aria-hidden
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] bg-[#1366E0]/15 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4"
            />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-xl shadow-black/5 ring-1 ring-black/5">
              <Image
                src="/mission.png"
                alt="Diverse group of students on campus"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* What we stand for */}
        <div className="mt-24">
          <h3 className="text-center text-2xl font-semibold tracking-tight text-[#1B1B1B] sm:text-3xl">
            What we stand for
          </h3>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group relative overflow-hidden rounded-2xl border border-[#ECECEC] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1366E0]/30 hover:shadow-xl hover:shadow-[#1366E0]/10"
              >
                {/* Top accent bar that fills on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-[0.25] bg-[#1366E0] transition-transform duration-500 group-hover:scale-x-100"
                />
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#1366E0]/10 text-[#1366E0] transition-colors duration-300 group-hover:bg-[#1366E0] group-hover:text-white">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    aria-hidden
                  >
                    {pillar.icon}
                  </svg>
                </span>
                <h4 className="mt-5 text-base font-semibold text-[#1B1B1B] sm:text-lg">
                  {pillar.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B]">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
