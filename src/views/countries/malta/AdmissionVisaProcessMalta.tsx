import Image from "next/image";

// Place your image at: /public/studymal.png

type Step = {
  title: string;
  description?: string;
  /** Optional lead-in shown above the checklist, e.g. "Gather:" */
  listIntro?: string;
  list?: string[];
  /** Optional highlighted tip shown at the bottom of the card */
  tip?: string;
  /** Optional closing text shown after the checklist */
  after?: string;
};

const steps: Step[] = [
  {
    title: "Get Admission 🎓",
    description:
      "Apply to a Malta institution offering an MQF Level 5+ programme (a Bachelor's is Level 6 and a Master's is Level 7). Accept the offer and pay the tuition deposit.",
  },
  {
    title: "Apply for the Type D Student Visa 🛂",
    description:
      "Submit your application through the Maltese visa channel for your country.",
    listIntro: "Prepare:",
    list: [
      "3 months of bank statements showing at least 75% of Malta's minimum wage for each month of study (roughly €950 a month)",
      "Health insurance with cover of at least €30,000",
      "Proof of accommodation for your first 14 nights",
      "Your acceptance letter and payment receipt",
    ],
  },
  {
    title: "Get Your Study Residence Permit 🏠",
    description:
      "Apply to Identità as soon as you arrive in Malta. Renew it every year by keeping good attendance and passing your exams.",
    tip: "Want to work? Request Jobsplus authorisation first, and keep to a maximum of 20 hours a week.",
  },
  {
    title: "Request the Post-Study Permit 🔍",
    description:
      "Apply once after finishing your MQF Level 5+ course, while your student permit is still valid. Use the 9 months to find a full-time job.",
  },
  {
    title: "Switch to a Single Permit 💼",
    description:
      "Ask your employer to sponsor your combined work and residence permit (Single Permit). Renew it each year while you stay employed.",
  },
  {
    title: "Apply for Long-Term Residence (PR) 🏡",
    description: "Apply after 5 years of legal, continuous residence in Malta.",
    listIntro: "Before applying:",
    list: [
      "Keep each absence under 6 months and your total time abroad under 10 months",
      "Earn at least the minimum wage for 2 years, and keep your payslips and FS3 forms",
      "Complete the 100-hour \u201cI Belong\u201d course with a score of at least 75%",
      "Pass the Maltese language test (MQF Level 2) with at least 65%",
    ],
  },
];

export default function AdmissionVisaProcessMalta() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20">
      <div className="mx-auto container">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="text-[#1366E0]">Admission</span>{" "}
            <span className="text-[#1B1B1B]">&amp; Visa Process</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm font-semibold text-gray-700 sm:text-base">
            Follow our straightforward 6-step process to secure admission at
            your dream university in Malta.
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
                src="/studymal.png"
                alt="Passport, visa stamps, and travel compass"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="rounded-2xl object-contain"
              />
            </div>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] md:hidden">
            <Image
              src="/studymal.png"
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
