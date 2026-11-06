import type { ReactNode } from "react";
import Link from "next/link";


const PHONE = "+8801602065622";
const WHATSAPP_URL = `https://wa.me/8801602065622?text=${encodeURIComponent(
  "Hi Admission OnBoard, I'd like to book a free consultation.",
)}`;

const trustPoints = [
  "Free consultation",
  "No obligation",
  "5 offices, 4 countries",
];

// ⚠️ Sample initials – change to your real counsellors' initials.
const counsellorInitials = ["SA", "TH", "NJ", "AS"];

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.82 14.1c-.25.69-1.44 1.32-1.98 1.37-.51.05-.99.24-3.34-.7-2.82-1.11-4.6-3.99-4.74-4.18-.14-.19-1.13-1.5-1.13-2.87 0-1.36.71-2.03.97-2.31.25-.28.55-.35.74-.35l.53.01c.17.01.4-.06.62.48.25.6.84 2.06.92 2.21.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.65-.14.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.12.07.69-.18 1.37Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-3 w-3"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3.5}
      aria-hidden
    >
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ContactOption = {
  title: string;
  text: string;
  href: string;
  external?: boolean;
  icon: ReactNode;
};

const contactOptions: ContactOption[] = [
  {
    title: "Message us",
    text: "Quick answers on WhatsApp",
    href: WHATSAPP_URL,
    external: true,
    icon: <WhatsAppIcon />,
  },
  {
    title: "Call us",
    text: "+880 1602-065622",
    href: `tel:${PHONE}`,
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.5 5.5c0-1 .8-1.8 1.8-1.8H8l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v2.7c0 1-.8 1.8-1.8 1.8C10.5 18.7 5.3 13.5 3.5 7.3V5.5Z"
        />
      </svg>
    ),
  },
  {
    title: "Visit an office",
    text: "London · Dhaka · Sylhet · Kathmandu",
    href: "/contact",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"
        />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
];

export default function TeamCta() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20 sm:py-24">
      <style>{`
        @keyframes tcSpin { to { transform: rotate(360deg); } }
        .tc-spin { animation: tcSpin 50s linear infinite; }
        .tc-spin-rev { animation: tcSpin 60s linear infinite reverse; }
        @media (prefers-reduced-motion: reduce) { .tc-spin, .tc-spin-rev { animation: none; } }
      `}</style>

      <div className="mx-auto container max-w-6xl">
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-[#ECECEC] bg-white px-6 py-14 shadow-xl shadow-black/5 sm:px-10 sm:py-16 lg:rounded-[2.5rem] lg:px-16 lg:py-20">
          {/* Decorative outline rings (no fill colour) */}
          <svg
            aria-hidden
            className="tc-spin pointer-events-none absolute -left-28 -top-28 -z-10 h-72 w-72 text-[#1366E0]/15 sm:h-96 sm:w-96"
            viewBox="0 0 200 200"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="100" cy="100" r="98" strokeWidth="1.2" />
            <circle
              cx="100"
              cy="100"
              r="74"
              strokeWidth="1.2"
              strokeDasharray="4 6"
            />
            <circle cx="100" cy="100" r="50" strokeWidth="1.2" />
          </svg>
          <svg
            aria-hidden
            className="tc-spin-rev pointer-events-none absolute -bottom-32 -right-32 -z-10 h-80 w-80 text-[#1366E0]/15 sm:h-[26rem] sm:w-[26rem]"
            viewBox="0 0 200 200"
            fill="none"
            stroke="currentColor"
          >
            <circle
              cx="100"
              cy="100"
              r="98"
              strokeWidth="1.2"
              strokeDasharray="4 6"
            />
            <circle cx="100" cy="100" r="70" strokeWidth="1.2" />
          </svg>

          {/* Centred message */}
          <div className="mx-auto max-w-3xl text-center">
            {/* Counsellor avatars */}
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <div className="flex -space-x-2.5">
                {counsellorInitials.map((initials) => (
                  <span
                    key={initials}
                    className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-[#FFFEFA] text-xs font-bold text-[#1366E0] shadow-sm ring-1 ring-[#1366E0]/20"
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <span className="flex items-center gap-2 text-sm font-medium text-[#3A3A3A]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#59B226] opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#59B226]" />
                </span>
                Our counsellors are ready to help
              </span>
            </div>

            <h2 className="mt-7 text-3xl font-semibold leading-tight tracking-tight text-[#1B1B1B] sm:text-4xl lg:text-5xl lg:leading-[1.1]">
              Your journey starts with{" "}
              <span className="text-[#1366E0]">a friendly conversation.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#6B6B6B] sm:text-base">
              Talk to one of our counsellors today. It&apos;s free, it&apos;s
              easy, and it could be the first step to your future abroad.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#1366E0] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1366E0]/30 transition-all hover:-translate-y-0.5 hover:bg-[#0F55BE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1366E0] focus-visible:ring-offset-2"
              >
                <WhatsAppIcon />
                Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#1B1B1B] px-7 py-3.5 text-sm font-semibold text-[#1B1B1B] transition-colors hover:bg-[#1B1B1B] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B1B1B] focus-visible:ring-offset-2"
              >
                Book a free consultation
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m0 0-6-6m6 6-6 6"
                  />
                </svg>
              </Link>
            </div>

            {/* Trust points */}
            <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2">
              {trustPoints.map((point) => (
                <li
                  key={point}
                  className="inline-flex items-center gap-1.5 text-sm text-[#5A5A5A]"
                >
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-[#1366E0] text-white">
                    <CheckIcon />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact options */}
          <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 border-t border-[#F0EBE3] pt-10 sm:grid-cols-3">
            {contactOptions.map((option) => {
              const content = (
                <>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border-2 border-[#1366E0]/25 text-[#1366E0] transition-all duration-300 group-hover:border-[#1366E0] group-hover:bg-[#1366E0] group-hover:text-white">
                    {option.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-[#1B1B1B]">
                      {option.title}
                    </span>
                    <span className="block text-xs text-[#6B6B6B]">
                      {option.text}
                    </span>
                  </span>
                </>
              );
              const className =
                "group flex h-full items-center gap-3.5 rounded-2xl border border-[#ECECEC] bg-[#FFFEFA] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#1366E0]/30 hover:shadow-lg hover:shadow-black/5 sm:flex-col sm:text-center";
              return (
                <li key={option.title}>
                  {option.href.startsWith("/") ? (
                    <Link href={option.href} className={className}>
                      {content}
                    </Link>
                  ) : (
                    <a
                      href={option.href}
                      {...(option.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={className}
                    >
                      {content}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
