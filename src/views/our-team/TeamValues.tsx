import type { ReactNode } from "react";

// No image in this section: icon cards on the cream background.

type Value = {
  title: string;
  text: string;
  icon: ReactNode;
};

const values: Value[] = [
  {
    title: "Honest advice",
    text: "We tell you what's truly best for you, even when it's not the easy answer.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3.5 4.5 6.5v5c0 4.4 3.2 8 7.5 9 4.3-1 7.5-4.6 7.5-9v-5L12 3.5Zm-3.5 8.5 2.5 2.5 4.5-4.5"
      />
    ),
  },
  {
    title: "Clear and transparent",
    text: "No hidden surprises. You'll always know what's next and why.",
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
        />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    title: "Students come first",
    text: "Your goals, your budget and your future guide every recommendation we make.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20s-7.5-4.4-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3c0 5.6-7.5 10-7.5 10Z"
      />
    ),
  },
  {
    title: "With you all the way",
    text: "From application to arrival, we celebrate every milestone together with you.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 21V4m0 0h11l-2 4 2 4H5"
      />
    ),
  },
];

export default function TeamValues() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20 sm:py-24">
      <div className="mx-auto container max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
          {/* Left: heading (sticky on desktop) */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span
              aria-hidden
              className="block h-1 w-12 rounded-full bg-[#1366E0]"
            />
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl lg:text-5xl lg:leading-[1.1]">
              What <span className="text-[#1366E0]">drives us</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#6B6B6B] sm:text-base">
              Four simple promises shape how every one of us works with you, in
              every office, every single day.
            </p>

            <div className="mt-8 hidden items-center gap-3 lg:flex">
              <span className="h-px w-10 bg-[#1366E0]/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9A9A9A]">
                Our promise to you
              </span>
            </div>
          </div>

          {/* Right: 2×2 value cards */}
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {values.map((value, index) => (
              <li
                key={value.title}
                className="group relative overflow-hidden rounded-[1.5rem] border border-[#ECECEC] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1366E0]/30 hover:shadow-xl hover:shadow-black/5 sm:p-8"
              >
                {/* Red line that grows on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[#1366E0] transition-transform duration-500 group-hover:scale-x-100"
                />

                {/* Large faded number */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-1 -top-3 select-none text-[5.5rem] font-bold leading-none text-[#F4EFE6] transition-colors duration-300 group-hover:text-[#1366E0]/10"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="relative grid h-12 w-12 place-items-center rounded-2xl border-2 border-[#1366E0]/25 text-[#1366E0] transition-all duration-300 group-hover:border-[#1366E0] group-hover:bg-[#1366E0] group-hover:text-white">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    aria-hidden
                  >
                    {value.icon}
                  </svg>
                </span>

                <h3 className="relative mt-6 text-lg font-semibold text-[#1B1B1B]">
                  {value.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-[#6B6B6B]">
                  {value.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
