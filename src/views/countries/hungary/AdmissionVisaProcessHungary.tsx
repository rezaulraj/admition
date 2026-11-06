import Image from "next/image";

// Place your image at: /public/studyhun.png

const steps = [
  {
    title: "University Admission",
    description:
      "Choose an eligible Hungarian university and programme, and receive your admission letter.",
  },
  {
    title: "Student Residence Permit",
    description:
      "Apply for a Hungarian Residence Permit for the Purpose of Studies and travel to Hungary. The permit can generally be issued for up to 3 years and extended.",
  },
  {
    title: "Study & Graduate",
    description:
      "Complete your Bachelor’s, Master’s or other eligible higher-education programme. During your studies, you can work within the applicable limits.",
  },
  {
    title: "Post-Study Job Search",
    description:
      "After successfully completing your studies, you can apply in Hungary for a Residence Permit for Seeking a Job or Starting a Business, helping you move into employment or self-employment.",
  },
  {
    title: "Employment → Long-Term Residence",
    description:
      "After moving into a suitable residence status and meeting the legal requirements, you may become eligible for a National Residence Card (long-term residence). The standard route requires at least 3 years of legal, continuous residence in Hungary. Time spent on a study permit does not qualify directly, so your exact pathway depends on the residence status you hold after graduation.",
  },
];

export default function AdmissionVisaProcessHungary() {
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
            your dream university in Hungary.
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
                src="/studyhun.png"
                alt="Passport, visa stamps, and travel compass"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="rounded-2xl object-contain"
              />
            </div>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] md:hidden">
            <Image
              src="/studyhun.png"
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
