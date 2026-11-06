import Image from "next/image";

// Place your image at: /public/studyfin.png

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
    title: "Apply & Get Admitted 🎓",
    description:
      "Apply through Studyinfo.fi, where you can choose up to 6 programmes. Non-EU/EEA students usually pay tuition. If you're offered a place, you may need to pay the first-year fee to secure it, unless you receive a scholarship.",
  },
  {
    title: "Apply for Your Student Residence Permit 🛂",
    description:
      "Apply online through Enter Finland (enterfinland.fi). The permit can be granted for the whole length of your studies.",
    listIntro: "You will need:",
    list: [
      "Proof of funds: about €800 a month (€9,600 a year)",
      "Insurance: valid health insurance for your stay",
    ],
  },
  {
    title: "Study & Work Part-Time 💼",
    description:
      "You can usually work up to 30 hours a week during term and full-time during holidays.",
    tip: "Work limits can change, so check the current rules on Migri (migri.fi).",
  },
  {
    title: "Post-Study Job-Search Permit 🔍",
    description:
      "After graduating, apply for a residence permit to look for work or start a business, valid for up to 2 years. If your student permit was an A permit, this one will be an A permit too.",
    list: ["Proof of funds: about €19,200 for the full 2 years"],
  },
  {
    title: "Switch to a Work or Specialist Permit 🏢",
    description:
      "Once you have a job or your own business, switch to a work-based permit (worker, specialist or entrepreneur).",
    tip: "Apply before your current permit expires to avoid any gap in your stay.",
  },
  {
    title: "Apply for Permanent Residence (P Permit) 🏠",
    listIntro: "Migri's main routes are:",
    list: [
      "Finnish degree path: Complete a Master's (university or UAS), a university Bachelor's, or a licentiate or doctoral degree in Finland. You need A2 Finnish or Swedish (or 15 university credits in the language) and enough income, and you must not have spent long periods outside Finland after graduating. There is no fixed residence period, but a UAS Bachelor's doesn't qualify. You can't apply while your permit is for studies, so this usually follows job-seeking or work.",
      "6-year path: 6 years on an A permit, 2 years of work history and B1 Finnish or Swedish.",
      "4-year paths: 4 years plus an income of €40,000 a year, or a recognised foreign Master's plus 2 years of work, or C1 language skills plus 3 years of work.",
    ],
  },
];

export default function AdmissionVisaProcessFinland() {
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
            your dream university in Finland.
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
                src="/studyfin.png"
                alt="Passport, visa stamps, and travel compass"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="rounded-2xl object-contain"
              />
            </div>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] md:hidden">
            <Image
              src="/studyfin.png"
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
