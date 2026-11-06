import Image from "next/image";

// Place your image at: /public/studynor.png

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
    title: "University Application & Offer Letter 🎓",
    list: [
      "Choose a programme: Apply directly to an accredited public or private university in Norway, usually through its online portal between October and December for the August intake.",
      "Meet entry criteria: A recognised Bachelor's degree (for Master's applicants), or high school credentials plus 1–2 years of higher education (for Bachelor's applicants, under the GSU list), along with English proof (IELTS 6.5+ / TOEFL 90+).",
      "Get admitted: Receive your official Letter of Admission.",
    ],
  },
  {
    title: "Student Visa & Travel 🛂",
    list: [
      "Deposit funds: Transfer the required living allowance (about NOK 150,000–170,000 per academic year) into the university's deposit account.",
      "Apply for a UDI study permit: Submit your application online through the Norwegian Directorate of Immigration (UDI), pay the fee (about NOK 5,300) and register your biometrics at the embassy or VFS.",
      "Fly & settle in: Once approved, book your flight, collect your keys at student housing (SiO, Sammen, Sit), and attend your police appointment to receive your residence card.",
    ],
  },
  {
    title: "Study & Part-Time Work 💼",
    list: [
      "Complete your degree: Keep up good academic progress in your 2-year Master's or 3-year Bachelor's programme.",
      "Part-time work: Work up to 20 hours a week during term, and full-time (40 hours a week) during official semester breaks.",
    ],
  },
  {
    title: "Graduation & Job-Seeker Permit 🔍",
    description: "Earn your degree.",
    list: [
      "Job-seeker permit: Before your student permit expires, apply to UDI for a 12-month job-seeker permit to stay in Norway and look for qualified work.",
    ],
  },
  {
    title: "Get a Skilled Job & Switch Permits 🏢",
    list: [
      "Secure employment: Get a full-time job offer relevant to your degree that meets UDI's minimum salary threshold (about NOK 450,000–530,000+ a year, depending on the position).",
      "Skilled worker permit: Switch from the job-seeker permit to a skilled worker residence permit sponsored by your employer.",
    ],
  },
  {
    title: "Work 3 Years & Secure Permanent Residence (PR) 🏡",
    description:
      "Work continuously on a skilled worker permit for 3 full years.",
    tip: "Years spent on a student permit do not count toward permanent residence.",
    listIntro: "You must also:",
    list: [
      "Language test: Pass the oral Norwegian test (minimum A2 or B1 level).",
      "Social studies test: Pass the Samfunnskunnskap test.",
      "Finances: Show you are self-sufficient, with no social welfare support in the previous 12 months.",
      "PR granted: Receive your permanent residence permit, giving you the right to live and work in Norway indefinitely.",
    ],
  },
];

export default function AdmissionVisaProcessNorway() {
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
            your dream university in Norway.
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
                src="/studynor.png"
                alt="Passport, visa stamps, and travel compass"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="rounded-2xl object-contain"
              />
            </div>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] md:hidden">
            <Image
              src="/studynor.png"
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
