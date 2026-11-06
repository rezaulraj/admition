import Image from "next/image";
import ReactCountryFlag from "react-country-flag";


const WHATSAPP_NUMBER = "8801602065622";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Admission OnBoard, I need help with a double-entry Indian visa.",
)}`;
const PHONE = "+8801602065622";

const trustPoints = [
  "Application support",
  "Document check",
  "Appointment guidance",
];

const entries = [
  {
    label: "Entry 1",
    title: "First visit",
    text: "Appointment, treatment, business or travel",
  },
  {
    label: "Entry 2",
    title: "Return visit",
    text: "Come back again on the same visa",
  },
];

function CheckIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
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
  );
}

export default function HeroDoubleEntry() {
  return (
    <section className="container mx-auto px-4 py-10">
      <style>{`
        @keyframes deFadeUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
        @keyframes deZoom { from { transform: scale(1.08); } to { transform: scale(1); } }
        @keyframes deDash { to { stroke-dashoffset: -16; } }
        .de-in { animation: deFadeUp .8s cubic-bezier(.22,1,.36,1) both; }
        .de-dash { animation: deDash 1.2s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .de-in, .de-zoom, .de-dash { animation: none !important; } }
      `}</style>

      <div className="relative min-h-[600px] w-full overflow-hidden rounded-[2rem] sm:min-h-0 sm:aspect-[16/10] lg:aspect-[21/9] lg:rounded-[2.5rem]">
        {/* Background photo */}
        <Image
          src="/india-hero.png"
          alt="Passport and boarding pass ready for travel to India"
          fill
          priority
          sizes="100vw"
          className="de-zoom object-cover object-[70%_center]"
          style={{ animation: "deZoom 1.6s cubic-bezier(.22,1,.36,1) both" }}
        />

        {/* Readability overlays: bottom fade on mobile, left fade from tablet up */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1116]/95 via-[#0E1116]/60 to-[#0E1116]/10 sm:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#0E1116]/90 via-[#0E1116]/55 to-transparent sm:block" />

        <div className="relative z-10 flex h-full min-h-[600px] flex-col justify-end px-6 pb-8 pt-24 sm:min-h-0 sm:justify-center sm:px-10 sm:py-10 md:px-16">
          <div className="max-w-xl">
            {/* Eyebrow badge */}
            <span className="de-in inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 py-1.5 pl-1.5 pr-3.5 text-xs font-semibold text-white backdrop-blur-md">
              <span className="flex overflow-hidden rounded-full ring-1 ring-white/40">
                <ReactCountryFlag
                  countryCode="IN"
                  svg
                  aria-hidden
                  style={{
                    width: "1.35em",
                    height: "1.35em",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
              </span>
              Indian visa services
            </span>

            <h1
              className="de-in mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "100ms" }}
            >
              Double-entry Indian visa,
              <br />
              <span className="text-[#1366E0]">made simple.</span>
            </h1>

            <p
              className="de-in mt-4 max-w-md text-sm leading-relaxed text-white/85 sm:text-base lg:text-lg"
              style={{ animationDelay: "220ms" }}
            >
              Need to travel to India twice? Whether it&apos;s an embassy
              appointment, medical treatment, business or onward travel, we help
              you apply for the right double-entry visa, correctly and on time.
            </p>

            {/* Buttons */}
            <div
              className="de-in mt-7 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "340ms" }}
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#1366E0] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1366E0]/35 transition-all hover:-translate-y-0.5 hover:bg-[#0F55BE] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1116]"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.82 14.1c-.25.69-1.44 1.32-1.98 1.37-.51.05-.99.24-3.34-.7-2.82-1.11-4.6-3.99-4.74-4.18-.14-.19-1.13-1.5-1.13-2.87 0-1.36.71-2.03.97-2.31.25-.28.55-.35.74-.35l.53.01c.17.01.4-.06.62.48.25.6.84 2.06.92 2.21.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.65-.14.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.12.07.69-.18 1.37Z" />
                </svg>
                Chat on WhatsApp
              </a>
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white hover:text-[#0E1116] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <svg
                  className="h-4 w-4"
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
                Call +880 1602-065622
              </a>
            </div>

            {/* Trust chips */}
            <ul
              className="de-in mt-6 flex flex-wrap gap-2"
              style={{ animationDelay: "460ms" }}
            >
              {trustPoints.map((point) => (
                <li
                  key={point}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur-md"
                >
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-[#1366E0] text-white">
                    <CheckIcon />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Visa card (desktop): explains "double entry" at a glance */}
        <div
          className="de-in absolute bottom-8 right-8 z-10 hidden w-[340px] overflow-hidden rounded-3xl border border-white/20 bg-white/10 text-white shadow-2xl backdrop-blur-xl xl:block"
          style={{ animationDelay: "600ms" }}
        >
          <div className="flex items-center justify-between border-b border-white/15 px-5 py-3">
            <span className="flex items-center gap-2 text-xs font-semibold">
              <span className="flex overflow-hidden rounded-[3px] ring-1 ring-white/40">
                <ReactCountryFlag
                  countryCode="IN"
                  svg
                  aria-hidden
                  style={{
                    width: "1.4em",
                    height: "1em",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
              </span>
              India visa
            </span>
            <span className="rounded-full bg-[#1366E0] px-2.5 py-0.5 text-[11px] font-bold tracking-wide">
              DOUBLE ENTRY
            </span>
          </div>

          <ol className="relative space-y-4 px-5 py-5">
            {/* Dashed connector between the two entries */}
            <svg
              className="absolute left-[39px] top-10 h-[calc(100%-5rem)] w-0.5 overflow-visible"
              aria-hidden
            >
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="#1366E0"
                strokeOpacity=".9"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="de-dash"
              />
            </svg>
            {entries.map((entry) => (
              <li
                key={entry.label}
                className="relative flex items-center gap-3"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#1366E0] text-white ring-4 ring-white/10">
                  <CheckIcon />
                </span>
                <span>
                  <span className="block text-[11px] font-semibold text-white/60">
                    {entry.label}
                  </span>
                  <span className="block text-sm font-semibold">
                    {entry.title}
                  </span>
                  <span className="block text-xs text-white/65">
                    {entry.text}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
