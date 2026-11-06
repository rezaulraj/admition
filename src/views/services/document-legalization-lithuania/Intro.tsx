import Image from "next/image";

// Place your photo at: /public/pcc-intro.jpg
// (4:3, about 1200×900 px – e.g. an advisor checking a student's document folder)

const stages = [
  {
    title: "Ministry of Foreign Affairs, Dhaka",
    text: "Physical attestation of your PCC",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3 3 7.5h18L12 3ZM5 10v7m4.67-7v7m4.66-7v7M19 10v7M3.5 20.5h17"
      />
    ),
  },
  {
    title: "Bangladesh Embassy, Poland",
    text: "Legalization of your attested PCC",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3 4 6v5c0 4.5 3.4 8.7 8 10 4.6-1.3 8-5.5 8-10V6l-8-3Zm-3 9 2 2 4-4"
      />
    ),
  },
  {
    title: "International courier",
    text: "Tracked delivery between each stage",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Zm0 0L12 12m0 0 8.5-4.5M12 12v9"
      />
    ),
  },
];

export default function Intro() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20 sm:py-24">
      <div className="mx-auto container grid max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-16 lg:gap-20">
        {/* Left: copy */}
        <div>
          <span
            aria-hidden
            className="block h-1 w-12 rounded-full bg-[#1366E0]"
          />

          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-[#1B1B1B] sm:text-4xl">
            Legalizing your PCC shouldn&apos;t hold up your{" "}
            <span className="text-[#1366E0]">study plans</span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#5A5A5A] sm:text-base sm:leading-relaxed">
            Your Lithuania student visa application requires a legalized Police
            Clearance Certificate. The process involves the Ministry of Foreign
            Affairs in Dhaka, the Bangladesh Embassy in Poland and international
            courier delivery, which can be slow and confusing to manage alone.
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#5A5A5A] sm:text-base sm:leading-relaxed">
            We take care of every step, so you can focus on preparing for your
            studies.
          </p>

          {/* The three stages your PCC goes through */}
          <ul className="mt-8 flex max-w-xl flex-col gap-3">
            {stages.map((stage) => (
              <li
                key={stage.title}
                className="flex items-center gap-4 rounded-2xl border border-[#ECECEC] bg-white p-4 shadow-sm"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#1366E0]/10">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1366E0"
                    strokeWidth={1.8}
                    aria-hidden
                  >
                    {stage.icon}
                  </svg>
                </span>
                <span>
                  <span className="block text-sm font-semibold text-[#1B1B1B] sm:text-base">
                    {stage.title}
                  </span>
                  <span className="block text-xs text-[#6B6B6B] sm:text-sm">
                    {stage.text}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: photo */}
        <div className="group relative">
          {/* Offset red frame behind the photo */}
          <div
            aria-hidden
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border-2 border-[#1366E0]/30 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4"
          />
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-xl shadow-black/5 ring-1 ring-black/5">
            <Image
              src="/intro.png"
              alt="Admission OnBoard advisor reviewing a student's documents"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-black/5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#1366E0] text-white">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
                aria-hidden
              >
                <path
                  d="M5 12.5l4.5 4.5L19 7.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>
              <span className="block text-sm font-semibold text-[#1B1B1B]">
                End-to-end support
              </span>
              <span className="block text-xs text-[#6B6B6B]">
                From Dhaka to your university
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
