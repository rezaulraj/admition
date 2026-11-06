import Image from "next/image";

// Place your image at: /public/admission-visa.png

const steps = [
  {
    title: "One-on-One Free Counselling",
    description:
      "Sit down with expert counsellors to explore your options, shortlist institutions in New Zealand, and understand what's required.",
  },
  {
    title: "Confirm Your Admission",
    description:
      "Apply to your preferred institution in New Zealand and receive your official Offer of Place.",
  },
  {
    title: "Submit Updated Documents",
    description:
      "Provide your latest academic and financial records, along with proof of health and character requirements.",
  },
  {
    title: "Pay Tuition & Receive Your Confirmation",
    description:
      "Pay your tuition fees and receive your Confirmation of Enrolment, the document your visa application will need.",
  },
  {
    title: "Apply For Your Student Visa & Prepare To Fly",
    description:
      "We help you lodge your New Zealand student visa application with Immigration New Zealand, then it's time to prepare for departure to your new campus.",
  },
];

export default function AdmissionVisaProcessNewZealand() {
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
            your dream institution in New Zealand.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
          {/* Left: steps */}
          <div className="flex flex-col gap-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-[#ECECEC] bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1B1B1B] text-xs font-semibold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-[#1B1B1B] sm:text-base">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#6B6B6B] sm:text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: image */}
          <div className="sticky top-24 hidden md:block">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
              <Image
                src="/studynew.png"
                alt="Passport, visa stamps, and travel compass"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-contain rounded-2xl"
              />
            </div>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] md:hidden">
            <Image
              src="/studynew.png"
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
