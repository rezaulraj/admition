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
    title: "Choose Your University & Apply",
    description:
      "Pick a university and programme recognised by the Republic of Cyprus. Compare fees, English requirements, scholarships and intake dates. Then send your application with your transcripts, passport copy and English proof. After acceptance, pay the required deposit and receive your acceptance letter.",
  },
  {
    title: "Prepare Your Documents",
    listIntro: "Gather:",
    list: [
      "Academic certificates and transcripts",
      "Valid passport",
      "Bank statement showing you can cover your costs",
      "Medical test results (chest X-ray, hepatitis B and C, syphilis, HIV)",
      "Apostille or legalisation on required documents",
    ],
    tip: "Medical results are valid for about 4 months, so time your tests carefully.",
  },
  {
    title: "Entry Permit, Travel & Join Classes ✈️",
    description:
      "Your university submits your file to the Civil Registry and Migration Department (CRMD). Wait in your home country while it is processed. If approved, you receive your Entry Permit (blue slip) by email.",
    after:
      "Travel to Cyprus and apply for your student Temporary Residence Permit soon after arrival, following your university's deadline. Prepare health insurance, a medical certificate and proof of funds. Renew your permit every year while you study.",
  },
  {
    title: "Graduate, Find a Job & Get a Work Permit 💼",
    description:
      "Master's and PhD graduates (EQF level 7 or higher) can apply for a residence permit of up to 12 months to find a job or start a business in their field. Bachelor's graduates do not qualify for this permit, so they usually need a job offer and employer sponsorship.",
    after:
      "When you get a job offer, your employer applies for your work and residence permit. Renew it as required, work legally, and pay your taxes and social insurance.",
  },
  {
    title: "Apply for Long-Term Residence (PR) 🏡",
    description:
      "After 5 years of continuous legal residence, you can apply for EU Long-Term Resident status.",
    listIntro: "Main requirements:",
    list: [
      "Stable income without relying on social assistance",
      "Housing (rental agreement or property title)",
      "Health insurance",
      "Clean criminal record",
      "Basic language knowledge (a Greek test may be requested)",
    ],
  },
];

export default function AdmissionVisaProcessCyprus() {
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
            your dream university in Cyprus.
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
                              {item}
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
                src="/studycy.png"
                alt="Passport, visa stamps, and travel compass"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="rounded-2xl object-contain"
              />
            </div>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] md:hidden">
            <Image
              src="/studycy.png"
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
