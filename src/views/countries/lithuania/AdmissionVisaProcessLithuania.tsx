import Image from "next/image";

// Place your image at: /public/lithuania-des.png

const steps = [
  {
    title: "Choose Your University & Course",
    description:
      "Select your preferred Bachelor’s, Master’s, or other eligible programme and check the entry requirements.",
  },
  {
    title: "Apply for Admission",
    description:
      "Submit your academic documents, passport, English proficiency proof, CV and other required documents to the university. Receive your Offer/Admission Letter.",
  },
  {
    title: "Prepare Documents & Complete MIGRIS",
    description:
      "Complete the required PCC collection & legalization/attestation, financial and other documents, then submit your application through MIGRIS for the required residence procedure.",
  },
  {
    title: "Biometrics → Decision → TRP",
    description:
      "Attend the required biometrics/document verification appointment. After Migration Department assessment and a positive decision, obtain your Temporary Residence Permit (TRP).",
  },
  {
    title: "Travel to Lithuania & Join Classes ✈️",
    description:
      "After receiving the required travel/residence authorization, book your flight, arrange accommodation, travel to Lithuania, complete university registration, and start your classes.",
  },
];

export default function AdmissionVisaProcessLithuania() {
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
            your dream university in Lithuania.
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
                  <div>
                    <h3 className="text-sm font-semibold text-[#1B1B1B] sm:text-base">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#6B6B6B] sm:text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* Right: image */}
          <div className="sticky top-24 hidden md:block">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
              <Image
                src="/lithuania-des.png"
                alt="Passport, visa stamps, and travel compass"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="rounded-2xl object-contain"
              />
            </div>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] md:hidden">
            <Image
              src="/lithuania-des.png"
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
