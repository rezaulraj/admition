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
    title: "Apply & Pre-Enrol 🎓",
    description:
      "Choose a programme on Universitaly (universitaly.it) and apply to the university. You need your diploma or degree, a CIMEA statement or Declaration of Value, and English proof. Some programmes also require an entry test.",
    tip: "Non-EU students living abroad must pre-enrol on Universitaly to start the study visa process.",
  },
  {
    title: "Apply for Scholarships 💶",
    list: [
      "MAECI (Italian Government): €1,200 a month for 9 months (€10,800 in total), for Master's, PhD, AFAM and research only, not Bachelor's. Apply at studyinitaly.esteri.it. The 2026–27 deadline was 26 March 2026, and the next call is expected in early 2027.",
      "DSU (regional, need-based): A tuition waiver plus, depending on the region, cash, housing and meals. Amounts vary, so check your regional agency's official call. Apply after admission, usually in summer.",
      "University awards: Check each university's website.",
    ],
  },
  {
    title: "Visa & Residence Permit 🛂",
    description:
      "Apply for the study visa at the Italian embassy in your country.",
    tip: "After arriving, apply for your residence permit at the Questura within 8 working days.",
  },
  {
    title: "Study & Work Part-Time 💼",
    description:
      "You can work up to 20 hours a week (1,040 hours a year). Renew your permit on time.",
  },
  {
    title: "Stay & Settle 🚀",
    list: [
      "Job-search permit: 12 months after your Bachelor's or Master's. Apply before your student permit expires.",
      "Work permit: Switch once you have a job offer. Conversion runs through the annual Decreto Flussi, so confirm quota details with the Questura.",
      "Long-term residence: The EU Long-Term Residence Permit after 5 years. Study years count, but you can't apply directly from a student permit, so convert to a work permit first. You need income at least equal to the assegno sociale, suitable housing and A2 Italian, and absences can't exceed 6 months at a time or 10 months in total.",
      "Citizenship: You can usually apply after 10 years of legal residence.",
    ],
  },
];

export default function AdmissionVisaProcessItaly() {
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
            your dream university in Italy.
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
                src="/studyita.png"
                alt="Passport, visa stamps, and travel compass"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="rounded-2xl object-contain"
              />
            </div>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] md:hidden">
            <Image
              src="/studyita.png"
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
