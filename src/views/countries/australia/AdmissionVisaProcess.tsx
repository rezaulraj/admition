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
    title: "Admission 🎓",
    list: [
      "Choose a course registered for international students and check its academic and English requirements.",
      "Apply to the university directly or through an authorised agent.",
      "Submit transcripts, an English test result, your passport, a CV and a statement of purpose. Some courses also need a portfolio, work experience or research proposal.",
      "After you accept the offer and pay the required deposit, the university issues your Confirmation of Enrolment (CoE).",
    ],
    tip: "If you want PR later, choose a course and field that fit an in-demand occupation.",
  },
  {
    title: "Student Visa (Subclass 500) 🛂",
    list: [
      "You need your CoE, Overseas Student Health Cover (OSHC) for the whole visa period, and a valid passport.",
      "Apply online and meet the Genuine Student requirement. Write your own answers about why you chose this course, this provider and Australia.",
      "Show enough funds for tuition, living costs and travel.",
      "Provide English test evidence, plus health checks, police certificates and biometrics if requested.",
      "Work is limited to 48 hours per fortnight during study periods.",
    ],
  },
  {
    title: "Arrive & Settle In ✈️",
    list: [
      "Arrange flights and accommodation, and carry your passport, visa grant, CoE and OSHC documents.",
      "Attend orientation and enrol in your units.",
      "Open a bank account and apply for a Tax File Number before working.",
      "Follow your visa conditions on study and work hours.",
    ],
  },
  {
    title: "Temporary Graduate Visa 💼",
    description:
      "After completing your course, apply from within Australia if you meet the study, age and English requirements.",
    list: [
      "It lets you live and work after study without a sponsor, and the length depends on your qualification and regional study.",
      "It is temporary and does not give PR on its own.",
      "Use it to build skilled work experience, get a skills assessment and improve your points.",
    ],
  },
  {
    title: "Permanent Residency 🏡",
    listIntro: "Main pathways:",
    list: [
      "Skilled Independent (189): Points-tested, with no sponsor. You need an eligible occupation, skills assessment, English, an Expression of Interest and an invitation.",
      "Skilled Nominated (190): The same process plus state or territory nomination.",
      "Skilled Work Regional (491): A provisional regional visa that can lead to permanent residence (subclass 191).",
      "Employer-sponsored (482, then 186): An employer sponsors you in an eligible skilled role, and you can transition to permanent status after meeting the work requirements.",
    ],
    tip: "The points test has a minimum score of 65, but invitations usually need a higher score.",
  },
];

export default function AdmissionVisaProcess() {
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
            your dream university in Australia.
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
                                {/^[^:]{1,40}:/.test(item) ? (
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
                src="/studyaus.png"
                alt="Passport, visa stamps, and travel compass"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="rounded-2xl object-contain"
              />
            </div>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] md:hidden">
            <Image
              src="/studyaus.png"
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
