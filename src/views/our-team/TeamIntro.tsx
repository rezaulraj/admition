import type { ReactNode } from "react";


type Point = {
  title: string;
  text: string;
  icon: ReactNode;
};

const points: Point[] = [
  {
    title: "One counsellor, start to finish",
    text: "A familiar face who knows your story, from your first question to the day you land.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8.5c0-3.6 3.1-6 7-6s7 2.4 7 6"
      />
    ),
  },
  {
    title: "Experts for every destination",
    text: "Specialists who know each country's universities, rules and visas inside out.",
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
  {
    title: "Always in the loop",
    text: "Quick, friendly updates on WhatsApp, so you always know what's next.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 9.5h9m-9 4h5.5M4.5 5.5h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4.5 3.5v-3.5a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z"
      />
    ),
  },
];

export default function TeamIntro() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20 sm:py-24">
      <div className="mx-auto container max-w-5xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span
            aria-hidden
            className="mx-auto block h-1 w-12 rounded-full bg-[#1366E0]"
          />
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            One team, one goal:{" "}
            <span className="text-[#1366E0]">your future</span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[#6B6B6B] sm:text-base lg:text-lg">
            Every student who walks through our door gets a dedicated counsellor
            who knows them by name. Behind them, our admissions, documentation
            and visa teams double-check every file, so you can apply with
            confidence.
          </p>
        </div>

        {/* Three points, separated by thin lines */}
        <ul className="mt-14 grid grid-cols-1 divide-y divide-[#ECE7DE] border-y border-[#ECE7DE] md:grid-cols-3 md:divide-x md:divide-y-0">
          {points.map((point, index) => (
            <li
              key={point.title}
              className="group flex flex-col items-center px-6 py-9 text-center md:py-10 lg:px-8"
            >
              <span className="relative grid h-14 w-14 place-items-center rounded-full border-2 border-[#1366E0]/25 text-[#1366E0] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#1366E0] group-hover:bg-[#1366E0] group-hover:text-white">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  aria-hidden
                >
                  {point.icon}
                </svg>
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#1B1B1B] text-[10px] font-bold text-white">
                  {index + 1}
                </span>
              </span>
              <h3 className="mt-5 text-base font-semibold text-[#1B1B1B] sm:text-lg">
                {point.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#6B6B6B]">
                {point.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
