import type { ReactNode } from "react";

type Item = { title: string; text: string; icon: ReactNode };

const services: Item[] = [
  {
    title: "MoFA attestation",
    text: "Physical attestation of your PCC at the Ministry of Foreign Affairs (MoFA), Dhaka.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3 3 7.5h18L12 3ZM5 10v7m4.67-7v7m4.66-7v7M19 10v7M3.5 20.5h17"
      />
    ),
  },
  {
    title: "Embassy legalization",
    text: "PCC legalization at the Bangladesh Embassy in Poland.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3 4 6v5c0 4.5 3.4 8.7 8 10 4.6-1.3 8-5.5 8-10V6l-8-3Zm-3 9 2 2 4-4"
      />
    ),
  },
  {
    title: "Bangladesh → Poland courier",
    text: "Fast, secure delivery of your documents to Poland.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Zm0 0L12 12m0 0 8.5-4.5M12 12v9"
      />
    ),
  },
  {
    title: "Poland → university courier",
    text: "Direct delivery of your legalized PCC to your university, if required.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Zm3 1.5v4.5c0 1.4 2.7 3 6 3s6-1.6 6-3V11"
      />
    ),
  },
  {
    title: "Poland → Bangladesh courier",
    text: "Fast return delivery of your documents to you.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11"
      />
    ),
  },
  {
    title: "Flexible packages",
    text: "Affordable service packages based on exactly what you need.",
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.5 12.5V5a1.5 1.5 0 0 1 1.5-1.5h7.5l8 8-9 9-8-8Z"
        />
        <circle cx="8.5" cy="8.5" r="1.5" />
      </>
    ),
  },
];

const reasons: Item[] = [
  {
    title: "Hassle-free processing",
    text: "We manage every step of your document process.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12.5l4.5 4.5L19 7.5"
      />
    ),
  },
  {
    title: "Reliable & professional",
    text: "A trusted team handling your important documents with care.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z"
      />
    ),
  },
  {
    title: "On-time delivery",
    text: "We prioritise getting your documents where they need to be, on time.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path strokeLinecap="round" d="M12 7.5V12l3 2" />
      </>
    ),
  },
  {
    title: "Fast support",
    text: "Quick answers on WhatsApp whenever you have a question.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5h16v11H9l-5 4V5Zm4 4.5h8M8 12.5h5"
      />
    ),
  },
];

function IconTile({
  children,
  solid = false,
}: {
  children: ReactNode;
  solid?: boolean;
}) {
  return (
    <span
      className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${
        solid ? "bg-[#1366E0] text-white" : "bg-[#1366E0]/10 text-[#1366E0]"
      }`}
    >
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        aria-hidden
      >
        {children}
      </svg>
    </span>
  );
}

export default function WhyServiceUs() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20 sm:py-24">
      <div className="mx-auto container max-w-6xl">
        {/* ── Services ── */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl">
            Our PCC{" "}
            <span className="text-[#1366E0]">legalization services</span>
          </h2>
          <p className="mt-4 text-sm text-[#6B6B6B] sm:text-base">
            Choose the full journey or just the steps you need.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li
              key={service.title}
              className="flex gap-4 rounded-3xl border border-[#ECECEC] bg-white p-6 shadow-sm transition-colors hover:border-[#1366E0]/40"
            >
              <IconTile>{service.icon}</IconTile>
              <div>
                <h3 className="text-base font-semibold text-[#1B1B1B] sm:text-lg">
                  {service.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#6B6B6B]">
                  {service.text}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* ── Why us ── */}
        <div className="mt-20 rounded-[2rem] border border-[#ECECEC] bg-white p-6 shadow-sm sm:p-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-[#1B1B1B] sm:text-3xl">
              Why <span className="text-[#1366E0]">Admission OnBoard</span>?
            </h2>
            <p className="text-sm text-[#6B6B6B]">
              Your documents, in safe hands from start to finish.
            </p>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-[#ECECEC]">
            {reasons.map((reason) => (
              <li
                key={reason.title}
                className="flex flex-col gap-3 lg:px-6 lg:first:pl-0 lg:last:pr-0"
              >
                <IconTile solid>{reason.icon}</IconTile>
                <h3 className="text-base font-semibold text-[#1B1B1B]">
                  {reason.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#6B6B6B]">
                  {reason.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
