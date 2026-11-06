import type { ReactNode } from "react";
import Image from "next/image";

type Row = {
  title: string;
  description: string;
  image: string;
  imageFirst: boolean;
  accent: string;
  icon: ReactNode;
};

const rows: Row[] = [
  {
    title: "End-to-End Admission Guidance",
    description:
      "We support students at every stage, from their very first question to the day they enrol. Our dedicated team manages follow-ups and paperwork, keeping the whole process smooth and stress-free.",
    image: "/admission-support.png",
    imageFirst: true,
    accent: "#1366E0",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Zm3 1.5v4.5c0 1.4 2.7 3 6 3s6-1.6 6-3V11"
      />
    ),
  },
  {
    title: "Prime Branding Exposure",
    description:
      "Get your institution in front of the right audience through international fairs, seminars, and targeted campaigns. Gain visibility across our social channels and connect with prospective students on a global scale.",
    image: "/branding.png",
    imageFirst: false,
    accent: "#2F5DA8",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 10v4a1 1 0 0 0 1 1h2l5 4V5L7 9H5a1 1 0 0 0-1 1Zm12-1.5a4 4 0 0 1 0 7M18.5 6a7.5 7.5 0 0 1 0 12"
      />
    ),
  },
  {
    title: "Complete Visa & Compliance Support",
    description:
      "We handle end-to-end support for student visa applications and documentation. Students get expert guidance on regulatory requirements, while your team's workload stays light and fully compliant.",
    image: "/visa-support.png",
    imageFirst: true,
    accent: "#59B226",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4"
      />
    ),
  },
];

export default function WhyPartnerWithUs() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FFFEFA] px-6 py-20 sm:py-24">
      {/* Soft background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-[#1366E0]/8 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#2F5DA8]/8 blur-3xl"
      />

      <div className="relative mx-auto container max-w-6xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl lg:text-5xl">
            Why Partner with{" "}
            <span className="text-[#1366E0] block">Admission OnBoard?</span>
          </h2>
          <p className="mt-4 text-sm font-medium text-[#6B6B6B] sm:text-base">
            Streamline recruitment. Boost visibility. Attract qualified
            students, effortlessly.
          </p>
        </div>

        {/* Rows */}
        <div className="mt-16 flex flex-col gap-16 sm:mt-20 md:gap-24">
          {rows.map((row) => (
            <div
              key={row.title}
              className="group grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14 lg:gap-20"
            >
              {/* Image */}
              <div
                className={`relative ${row.imageFirst ? "md:order-1" : "md:order-2"}`}
              >
                {/* Offset accent frame behind the image */}
                <div
                  aria-hidden
                  className={`absolute inset-0 rounded-[2rem] transition-transform duration-500 ${
                    row.imageFirst
                      ? "-translate-x-3 translate-y-3 group-hover:-translate-x-4 group-hover:translate-y-4"
                      : "translate-x-3 translate-y-3 group-hover:translate-x-4 group-hover:translate-y-4"
                  }`}
                  style={{ backgroundColor: `${row.accent}1F` }}
                />
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-black/5 ring-1 ring-black/5">
                  <Image
                    src={row.image}
                    alt={row.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Floating icon badge on the image corner */}
                <span
                  className={`absolute -bottom-5 grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-lg ring-1 ring-black/5 ${
                    row.imageFirst ? "right-6" : "left-6"
                  }`}
                >
                  <svg
                    className="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={row.accent}
                    strokeWidth={1.8}
                    aria-hidden
                  >
                    {row.icon}
                  </svg>
                </span>
              </div>

              {/* Text */}
              <div className={row.imageFirst ? "md:order-2" : "md:order-1"}>
                <span
                  aria-hidden
                  className="block h-1 w-12 rounded-full"
                  style={{ backgroundColor: row.accent }}
                />
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-[#1B1B1B] sm:text-3xl">
                  {row.title}
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#6B6B6B] sm:text-base sm:leading-relaxed">
                  {row.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
