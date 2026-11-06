import Image from "next/image";

// Place your image at: /public/studycan.png

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
    list: [
      "Apply to a Designated Learning Institution (DLI), which is a government-approved school.",
      "After admission you get a Letter of Acceptance (LOA).",
      "Most applicants also need a Provincial Attestation Letter (PAL), which you usually get through the school.",
    ],
    tip: "Since January 1, 2026, master's and PhD students at public universities do not need a PAL. Master's and PhD students at private institutions still do.",
  },
  {
    title: "Prepare Your Documents 📄",
    list: [
      "Passport: A valid passport.",
      "Admission letters: Your LOA, and your PAL if required.",
      "Proof of funds: Enough to cover first-year tuition, living costs and return travel. For applications from September 1, 2026, a single applicant outside Quebec must show CAD $23,448 for living costs, on top of tuition and travel.",
      "Accepted proof: A GIC, bank statements, a loan letter, or proof of paid tuition and housing. Officers check where your funds come from in every case.",
      "Statement of Purpose (study plan): Explain why this programme, why Canada, and your career goals.",
      "English test: An IELTS, PTE or TOEFL result.",
      "Medical & police: A medical exam and police certificate, only if IRCC asks for them or your country requires them.",
    ],
  },
  {
    title: "Apply Online 💻",
    list: [
      "Create an IRCC account and fill in the study permit application form.",
      "Upload your documents.",
      "Pay the fees: CAD $150 for the study permit and CAD $85 for biometrics.",
    ],
  },
  {
    title: "Biometrics & Medical 🩺",
    list: [
      "IRCC sends a biometrics instruction letter to your account.",
      "Give your fingerprints and photo at a VFS centre, usually within 30 days.",
      "Do the medical exam with an IRCC panel doctor if requested.",
    ],
  },
  {
    title: "Decision & Travel ✈️",
    list: [
      "If approved, you get a Port of Entry (POE) Letter of Introduction.",
      "If you need a visa (TRV), IRCC will ask you to send your passport to VFS.",
      "At the Canadian airport, show your POE letter, passport and LOA to the border officer.",
    ],
    tip: "The border officer issues your actual study permit when you arrive in Canada.",
  },
];

export default function AdmissionVisaProcessCanada() {
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
            your dream university in Canada.
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
                src="/admission-canada.png"
                alt="Passport, visa stamps, and travel compass"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="rounded-2xl object-contain"
              />
            </div>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] md:hidden">
            <Image
              src="/admission-canada.png"
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
