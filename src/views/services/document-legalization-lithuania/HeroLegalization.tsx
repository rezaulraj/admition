import Image from "next/image";
import ReactCountryFlag from "react-country-flag";

// Place your background photo at: /public/pcc-hero.jpg
// (wide 21:9, subject on the RIGHT, empty space on the left for text)

const WHATSAPP_NUMBER = "8801602065622";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Admission OnBoard, I need help with PCC legalization for my Lithuania student visa.",
)}`;
const PHONE = "+8801602065622";

const trustPoints = [
  "MoFA attestation",
  "Embassy legalization",
  "Tracked courier",
];

const route = [
  { code: "BD", city: "Dhaka", step: "MoFA attestation" },
  { code: "PL", city: "Poland", step: "Embassy legalization" },
  { code: "LT", city: "University", step: "Direct delivery" },
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

export default function HeroLegalization() {
  return (
    <section className="container mx-auto px-4 py-10">
      <style>{`
        @keyframes lgFadeUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
        @keyframes lgZoom { from { transform: scale(1.08); } to { transform: scale(1); } }
        @keyframes lgDash { to { stroke-dashoffset: -16; } }
        .lg-in { animation: lgFadeUp .8s cubic-bezier(.22,1,.36,1) both; }
        .lg-dash { animation: lgDash 1.2s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .lg-in, .lg-zoom, .lg-dash { animation: none !important; } }
      `}</style>

      <div className="relative min-h-[600px] w-full overflow-hidden rounded-[2rem] sm:min-h-0 sm:aspect-[16/10] lg:aspect-[21/9] lg:rounded-[2.5rem]">
        {/* Background photo */}
        <Image
          src="/heroligalize.png"
          alt="Passport and officially stamped documents on a desk"
          fill
          priority
          sizes="100vw"
          className="lg-zoom object-cover object-[70%_center]"
          style={{ animation: "lgZoom 1.6s cubic-bezier(.22,1,.36,1) both" }}
        />

        {/* Readability overlays: bottom fade on mobile, left fade from tablet up */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1116]/95 via-[#0E1116]/60 to-[#0E1116]/10 sm:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#0E1116]/90 via-[#0E1116]/55 to-transparent sm:block" />

        <div className="relative z-10 flex h-full min-h-[600px] flex-col justify-end px-6 pb-8 pt-24 sm:min-h-0 sm:justify-center sm:px-10 sm:py-10 md:px-16">
          <div className="max-w-xl">
            {/* Eyebrow badge */}
            <span className="lg-in inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 py-1.5 pl-1.5 pr-3.5 text-xs font-semibold text-white backdrop-blur-md">
              <span className="flex overflow-hidden rounded-full ring-1 ring-white/40">
                <ReactCountryFlag
                  countryCode="LT"
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
              Lithuania student visa
            </span>

            <h1
              className="lg-in mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "100ms" }}
            >
              PCC legalization,
              <br />
              <span className="text-[#1366E0]">handled for you.</span>
            </h1>

            <p
              className="lg-in mt-4 max-w-md text-sm leading-relaxed text-white/85 sm:text-base lg:text-lg"
              style={{ animationDelay: "220ms" }}
            >
              From MoFA attestation in Dhaka to the Bangladesh Embassy in Poland
              and on to your university, we take care of every step of your
              Police Clearance Certificate.
            </p>

            {/* Buttons */}
            <div
              className="lg-in mt-7 flex flex-col gap-3 sm:flex-row"
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
              className="lg-in mt-6 flex flex-wrap gap-2"
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

        {/* Route card (desktop): where your PCC travels */}
        <div
          className="lg-in absolute bottom-8 right-8 z-10 hidden w-[340px] rounded-3xl border border-white/20 bg-white/10 p-5 text-white shadow-2xl backdrop-blur-xl xl:block"
          style={{ animationDelay: "600ms" }}
        >
          <p className="text-xs font-semibold text-white/70">
            Your PCC&apos;s journey
          </p>
          <ol className="relative mt-4 space-y-4">
            {/* Dashed connector line */}
            <svg
              className="absolute left-[15px] top-4 h-[calc(100%-2rem)] w-0.5 overflow-visible"
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
                className="lg-dash"
              />
            </svg>
            {route.map((stop) => (
              <li key={stop.code} className="relative flex items-center gap-3">
                <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-[#1366E0]">
                  <ReactCountryFlag
                    countryCode={stop.code}
                    svg
                    aria-hidden
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "block",
                      objectFit: "cover",
                    }}
                  />
                </span>
                <span>
                  <span className="block text-sm font-semibold">
                    {stop.city}
                  </span>
                  <span className="block text-xs text-white/65">
                    {stop.step}
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
