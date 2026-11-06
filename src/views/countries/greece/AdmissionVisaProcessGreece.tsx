import Image from "next/image";


type Step = {
  title: string;
  description?: string;
  listIntro?: string;
  list?: string[];
  tip?: string;
  after?: string;
};

const steps: Step[] = [
  {
    title: "Get Admitted 🎓",
    description: "Apply to a recognised Greek university.",
    list: [
      "Pick a university and programme recognised by Greece. Compare fees, English requirements, scholarships and intake dates.",
      "Send your application with your transcripts, passport copy and English proof.",
      "Receive your acceptance letter.",
    ],
  },
  {
    title: "Get Your Student Visa 🛂",
    description:
      "Apply for the National Type D visa at the Greek embassy in your country.",
    list: [
      "Documents: acceptance letter, passport, proof of funds and health insurance",
    ],
    tip: "Rules vary by embassy, so confirm the requirements with your local embassy.",
  },
  {
    title: "Get Your Residence Permit 🏠",
    description:
      "After arriving, apply for a student residence permit at the local migration office. It can take a few months.",
  },
  {
    title: "Study & Work Part-Time 💼",
    description:
      "Part-time work is allowed with authorisation, usually up to 20 hours a week during term, so check the conditions on your permit. Keep your permit valid and your studies on track.",
  },
  {
    title: "Stay After Graduation 🚀",
    list: [
      "Job-search permit: 12 months to find a job or start a business. Apply at least 30 days before your student permit expires.",
      "Work permit: Switch to this once you have a job offer.",
      "Long-term residence (M1): After 5 years of continuous legal residence, with study years counting as half. You need stable income, health insurance and basic Greek, and you can't be absent for more than 6 months at a time or 10 months in total.",
    ],
  },
];

export default function AdmissionVisaProcessGreece() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20">
      <div className="mx-auto container">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="text-[#1366E0]">Admission</span>{" "}
            <span className="text-[#1B1B1B]">&amp; Visa Process</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm font-semibold text-gray-700 sm:text-base">
            Follow our straightforward 5-step process to secure admission at
            your dream university in Greece.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
          {/* Left: steps */}
          <ol className="flex flex-col gap-4">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-[#ECECEC] bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1B1B1B] text-xs font-semibold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-[#1B1B1B] sm:text-base">
                      {step.title}
                    </h3>

                    {step.description && (
                      <p className="mt-1 text-xs leading-relaxed text-[#6B6B6B] sm:text-sm">
                        {step.description}
                      </p>
                    )}

                    {step.list && (
                      <div className="mt-3">
                        {step.listIntro && (
                          <p className="text-xs font-semibold text-[#1B1B1B] sm:text-sm">
                            {step.listIntro}
                          </p>
                        )}
                        <ul className="mt-2 space-y-1.5">
                          {step.list.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-xs leading-relaxed text-[#6B6B6B] sm:text-sm"
                            >
                              <svg
                                className="mt-[3px] h-3.5 w-3.5 shrink-0 text-[#1366E0] sm:mt-1"
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
                              <span>
                                {/^[^:]{1,30}:/.test(item) ? (
                                  <>
                                    <strong className="font-semibold text-[#1B1B1B]">
                                      {item.slice(0, item.indexOf(":") + 1)}
                                    </strong>
                                    {item.slice(item.indexOf(":") + 1)}
                                  </>
                                ) : (
                                  item
                                )}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {step.after && (
                      <p className="mt-2 text-xs leading-relaxed text-[#6B6B6B] sm:text-sm">
                        {step.after}
                      </p>
                    )}

                    {step.tip && (
                      <p className="mt-3 flex items-start gap-2 rounded-xl bg-[#FFF6E8] px-3 py-2.5 text-xs leading-relaxed text-[#7A5310] sm:text-sm">
                        <span aria-hidden>💡</span>
                        {step.tip}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* Right: image */}
          <div className="sticky top-24 hidden md:block">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
              <Image
                src="/studygre.png"
                alt="Passport, visa stamps, and travel compass"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="rounded-2xl object-contain"
              />
            </div>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] md:hidden">
            <Image
              src="/studygre.png"
              alt="Passport, visa stamps, and travel compass"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
