import Image from "next/image";

// Place your photo at: /public/pcc-courier.jpg
// (portrait 4:5, about 1000×1250 px – e.g. documents being packed into a courier envelope)

const steps = [
  {
    title: "Send us your PCC",
    description:
      "Share your documents with our team and we'll confirm exactly which services you need.",
  },
  {
    title: "MoFA attestation in Dhaka",
    description:
      "We arrange the physical attestation of your PCC at the Ministry of Foreign Affairs.",
  },
  {
    title: "Secure courier to Poland",
    description:
      "Your attested PCC is sent safely to Poland by tracked courier.",
  },
  {
    title: "Embassy legalization",
    description: "The Bangladesh Embassy in Poland legalizes your PCC.",
  },
  {
    title: "Delivery",
    description:
      "We send your legalized PCC to your university, or back to you in Bangladesh.",
  },
];

export default function HowItWork() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20 sm:py-24">
      <div className="mx-auto container max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl">
            How it <span className="text-[#1366E0]">works</span>
          </h2>
          <p className="mt-4 text-sm text-[#6B6B6B] sm:text-base">
            Five simple steps from your first message to a legalized PCC.
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
                src="/pcc-courier.png"
                alt="Documents being packed securely for courier delivery"
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
                      d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Zm0 0L12 12m0 0 8.5-4.5M12 12v9"
                    />
                  </svg>
                </span>
                <span>
                  <span className="block text-sm font-semibold text-[#1B1B1B]">
                    Tracked at every stage
                  </span>
                  <span className="block text-xs text-[#6B6B6B]">
                    We keep you updated on WhatsApp
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
