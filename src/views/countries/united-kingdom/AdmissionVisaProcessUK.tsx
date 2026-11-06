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
    title: "Offer Letter 🎓",
    list: [
      "Choose a UK university licensed to sponsor international students.",
      "Apply through UCAS (undergraduate) or the university's own portal (postgraduate).",
      "Submit your academic records and proof of English, or a university-approved waiver.",
      "You first receive a conditional offer.",
      "It becomes unconditional once you meet all conditions, such as final results or an English test.",
    ],
    tip: "A deposit is a separate requirement set by the university.",
  },
  {
    title: "CAS & Student Visa 🛂",
    list: [
      "The university issues your CAS (Confirmation of Acceptance for Studies).",
      "Use the CAS to apply for the Student visa.",
      "Show enough funds for your remaining first-year tuition plus living costs.",
      "Living-cost amounts are higher for London than elsewhere.",
      "The money must be held in your account for the required minimum period.",
      "Degree-level students can generally work part-time in term time and full-time in official holidays, within visa limits.",
    ],
  },
  {
    title: "Graduate Visa 🔍",
    list: [
      "Apply from inside the UK while your Student visa is still valid.",
      "No job offer or sponsor is needed.",
      "You can work or look for work at any skill level.",
      "Pay the application fee and the Immigration Health Surcharge.",
      "PhD graduates get a longer stay than other graduates.",
    ],
    tip: "The Graduate Route cannot be extended and is not a route to settlement.",
  },
  {
    title: "Skilled Worker Visa 🏢",
    list: [
      "Find a job with a licensed sponsor.",
      "The job must meet the required skill level and salary threshold.",
      "Recent graduates may qualify for a lower \u201cnew entrant\u201d salary rate.",
    ],
    tip: "Skill and salary requirements change often, so check GOV.UK for current figures.",
  },
  {
    title: "ILR & Citizenship 🏡",
    list: [
      "Apply for Indefinite Leave to Remain (ILR) after the required continuous years on a Skilled Worker visa.",
      "Pass the Life in the UK Test.",
      "Show the required English level.",
      "Stay within the limit on days spent outside the UK.",
      "Remain in qualifying sponsored employment.",
    ],
    after:
      "After holding ILR for a further period, you can usually apply for British citizenship.",
  },
];

export default function AdmissionVisaProcessUK() {
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
            your dream university in the UK.
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
                src="/studyuk.png"
                alt="Passport, visa stamps, and travel compass"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="rounded-2xl object-contain"
              />
            </div>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] md:hidden">
            <Image
              src="/studyuk.png"
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
