import Image from "next/image";
import Link from "next/link";

const reasons = [
  {
    number: "01",
    title: "Clear Costs, Honest Advice",
    description:
      "See your onboarding fee and service charges upfront, with full clarity before your study abroad journey begins.",
  },
  {
    number: "02",
    title: "Complete A-Z Support",
    description:
      "From admission counselling to visa filing, we guide you through every stage, including interview prep and scholarship applications.",
  },
  {
    number: "03",
    title: "Fast, Stress-free Visa Filing",
    description:
      "Hand over your documents after consultation and let our team manage rapid visa processing on your behalf.",
  },
];

const stats = [
  { value: "100+", label: "University Partners" },
  { value: "15+", label: "Years Of Experience" },
  { value: "5,000+", label: "Students Placed" },
];

export default function WhyChose() {
  return (
    <section className="w-full bg-[#FFFEFA]">
      <div className="mx-auto container px-6 py-20 md:py-24">
        {/* Top: heading, centered, full width */}
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#1B1B1B] sm:text-5xl">
            Why partner with{" "}
            <span className="text-[#1366E0]">Admission OnBoard</span>?
          </h2>
          {/* <p className="mt-4 text-sm text-[#6B6B6B] sm:text-base">
            Everything you need to study abroad, handled by one dedicated team
            from application to arrival.
          </p> */}
        </div>

        {/* Below: image left, cards right */}
        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
          {/* Left: image with stats overlay */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <Image
                src="/partner-home.png"
                alt="Admission OnBoard consultant guiding students"
                width={680}
                height={780}
                className="h-full w-full object-contain"
                priority
              />
            </div>

            <div className="mx-4 -mt-14 grid grid-cols-3 gap-4 rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur sm:mx-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-[#6B6B6B] sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: reason cards with spinning border */}
          <div className="flex flex-col justify-center gap-5">
            {reasons.map((reason) => (
              <div key={reason.number} className="spinning-border-wrap">
                <div className="spinning-border" />
                <div className="relative flex items-start gap-4 rounded-[1.4rem] bg-white p-6">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1366E0] text-xs font-semibold text-white">
                    {reason.number}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#1B1B1B] sm:text-lg">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#6B6B6B] sm:text-base">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-l-2xl rounded-br-2xl bg-[#1366E0] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
              >
                Explore Programmes
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-l-2xl rounded-br-2xl border border-[#1366E0] bg-white px-7 py-3.5 text-sm font-semibold text-[#1366E0] transition-colors hover:border-[#1366E0]"
              >
                Speak To An Advisor
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .spinning-border-wrap {
          position: relative;
          border-radius: 1.5rem;
          padding: 1.5px;
          overflow: hidden;
          isolation: isolate;
        }
        .spinning-border {
          position: absolute;
          inset: -60%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            #1366E0 40deg,
            #F58B0F 80deg,
            transparent 130deg,
            transparent 360deg
          );
          animation: spin-border 5s linear infinite;
        }
        @keyframes spin-border {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
