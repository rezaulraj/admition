import Image from "next/image";

// Place your photo at: /public/india-docs.jpg
// (portrait 4:5, about 1000×1250 px – e.g. an advisor checking a document folder)

const steps = [
  {
    title: "Tell us your travel plan",
    description: "Share why and when you need to visit India twice.",
  },
  {
    title: "We choose the right visa type",
    description:
      "We advise on the best category for your purpose, then prepare your application and check every document.",
  },
  {
    title: "Submit at IVAC",
    description:
      "You submit your application at the Indian Visa Application Centre.",
  },
  {
    title: "Receive your visa",
    description: "Collect your passport with your double-entry visa.",
  },
  {
    title: "Travel with confidence",
    description:
      "Make your first visit, return home, and use your second entry when you need it.",
  },
];

export default function HowItWorksDoubleEntry() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20 sm:py-24">
      <div className="mx-auto container max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl">
            How it <span className="text-[#1366E0]">works</span>
          </h2>
          <p className="mt-4 text-sm text-[#6B6B6B] sm:text-base">
            Five simple steps from your first message to your double-entry visa.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-12 md:grid-cols-[1.1fr_1fr] md:gap-14 lg:gap-20">
          {/* Left: steps timeline */}
          <ol className="relative flex flex-col gap-4">
            {/* Vertical line linking the numbers */}
            <span
              aria-hidden
              className="absolute bottom-8 left-[2.2rem] top-8 w-px bg-gradient-to-b from-[#1366E0]/50 via-[#1366E0]/25 to-[#1366E0]/50"
            />

            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              return (
                <li
                  key={step.title}
                  className="relative flex items-start gap-4 rounded-2xl border border-[#ECECEC] bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span
                    className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-md ${
                      isLast ? "bg-[#1366E0]" : "bg-[#1B1B1B]"
                    }`}
                  >
                    {isLast ? (
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        aria-hidden
                      >
                        <path
                          d="M5 12.5l4.5 4.5L19 7.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      String(index + 1).padStart(2, "0")
                    )}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-[#1B1B1B] sm:text-base">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#6B6B6B] sm:text-sm">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Right: photo (sticky on desktop) */}
          <div className="group relative md:sticky md:top-28">
            <div
              aria-hidden
              className="absolute inset-0 -translate-x-3 translate-y-3 rounded-[2rem] border-2 border-[#1366E0]/30 transition-transform duration-500 group-hover:-translate-x-4 group-hover:translate-y-4"
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-xl shadow-black/5 ring-1 ring-black/5 md:aspect-[4/5]">
              <Image
                src="/india-docs.png"
                alt="Advisor checking a traveller's visa documents"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Caption on the photo */}
              <div className="absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#1366E0] text-white">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 4.5H7.5A1.5 1.5 0 0 0 6 6v13.5A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H15M9 4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5M9 4.5A1.5 1.5 0 0 0 10.5 6h3A1.5 1.5 0 0 0 15 4.5M9 13.5l2 2 4-4"
                    />
                  </svg>
                </span>
                <span>
                  <span className="block text-sm font-semibold text-[#1B1B1B]">
                    Every document checked
                  </span>
                  <span className="block text-xs text-[#6B6B6B]">
                    Before you submit at IVAC
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
