import Image from "next/image";
import ReactCountryFlag from "react-country-flag";

// Place your background photo at: /public/team-hero.jpg
// (wide 21:9, at least 2400×1030 px – real team group photo,
//  people on the RIGHT, calm space on the left for the text)

const WHATSAPP_URL = `https://wa.me/8801602065622?text=${encodeURIComponent(
  "Hi Admission OnBoard, I'd like to talk to a counsellor.",
)}`;

const stats = [
  { value: "5", label: "Offices" },
  { value: "4", label: "Countries" },
  { value: "12", label: "Study destinations" },
  { value: "15+", label: "Years of experience" },
];

const officeFlags = [
  { code: "GB", label: "United Kingdom" },
  { code: "BD", label: "Bangladesh" },
  { code: "NP", label: "Nepal" },
];

export default function HeroOurTeam() {
  return (
    <section className="container mx-auto px-4 py-10">
      <style>{`
        @keyframes otFadeUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
        @keyframes otZoom { from { transform: scale(1.08); } to { transform: scale(1); } }
        @keyframes otPulse { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }
        .ot-in { animation: otFadeUp .8s cubic-bezier(.22,1,.36,1) both; }
        .ot-zoom { animation: otZoom 1.6s cubic-bezier(.22,1,.36,1) both; }
        .ot-pulse { animation: otPulse 2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .ot-in, .ot-zoom, .ot-pulse { animation: none !important; } }
      `}</style>

      <div className="relative min-h-[620px] w-full overflow-hidden rounded-[2rem] sm:min-h-0 sm:aspect-[16/10] lg:aspect-[21/9] lg:rounded-[2.5rem]">
        {/* Background photo */}
        <Image
          src="/team-hero.png"
          alt="The Admission OnBoard team together in the office"
          fill
          priority
          sizes="100vw"
          className="ot-zoom object-cover object-[70%_center]"
        />

        {/* Readability overlays: bottom fade on mobile, left fade from tablet up */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1116]/95 via-[#0E1116]/60 to-[#0E1116]/10 sm:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#0E1116]/90 via-[#0E1116]/55 to-transparent sm:block" />

        <div className="relative z-10 flex h-full min-h-[620px] flex-col justify-end px-6 pb-8 pt-24 sm:min-h-0 sm:justify-center sm:px-10 sm:py-10 md:px-16">
          <div className="max-w-xl">
            {/* Eyebrow badge */}
            <span className="ot-in inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
              <span className="ot-pulse h-2 w-2 rounded-full bg-[#1366E0]" />
              Meet the team
            </span>

            <h1
              className="ot-in mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "100ms" }}
            >
              The people behind
              <br />
              <span className="text-[#1366E0]">your success story.</span>
            </h1>

            <p
              className="ot-in mt-4 max-w-md text-sm leading-relaxed text-white/85 sm:text-base lg:text-lg"
              style={{ animationDelay: "220ms" }}
            >
              We&apos;re a friendly team of counsellors, admissions experts and
              visa specialists who love helping students take their next big
              step. Your dream is our mission, and we&apos;ll be with you every
              step of the way.
            </p>

            {/* Buttons */}
            <div
              className="ot-in mt-7 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "340ms" }}
            >
              <a
                href="#team"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1366E0] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1366E0]/35 transition-all hover:-translate-y-0.5 hover:bg-[#0F55BE] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1116]"
              >
                Meet the team
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 5v14m0 0-6-6m6 6 6-6"
                  />
                </svg>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white hover:text-[#0E1116] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.82 14.1c-.25.69-1.44 1.32-1.98 1.37-.51.05-.99.24-3.34-.7-2.82-1.11-4.6-3.99-4.74-4.18-.14-.19-1.13-1.5-1.13-2.87 0-1.36.71-2.03.97-2.31.25-.28.55-.35.74-.35l.53.01c.17.01.4-.06.62.48.25.6.84 2.06.92 2.21.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.65-.14.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.12.07.69-.18 1.37Z" />
                </svg>
                Talk to a counsellor
              </a>
            </div>

            {/* Office flags */}
            <div
              className="ot-in mt-6 flex items-center gap-3"
              style={{ animationDelay: "460ms" }}
            >
              <div className="flex -space-x-2">
                {officeFlags.map((flag) => (
                  <span
                    key={flag.code}
                    className="flex h-8 w-8 overflow-hidden rounded-full ring-2 ring-[#0E1116]/60"
                  >
                    <ReactCountryFlag
                      countryCode={flag.code}
                      svg
                      aria-label={flag.label}
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                        objectFit: "cover",
                      }}
                    />
                  </span>
                ))}
              </div>
              <span className="text-xs font-medium text-white/80 sm:text-sm">
                London · Dhaka · Sylhet · Kathmandu
              </span>
            </div>
          </div>
        </div>

        {/* Stats glass card (desktop) */}
        <div
          className="ot-in absolute bottom-8 right-8 z-10 hidden w-[360px] rounded-3xl border border-white/20 bg-white/10 p-5 text-white shadow-2xl backdrop-blur-xl xl:block"
          style={{ animationDelay: "600ms" }}
        >
          <p className="text-xs font-semibold text-white/70">
            One team, one goal: your future
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-l-2 border-[#1366E0] pl-3"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-semibold leading-none">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-xs text-white/65">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Stats row (mobile & tablet) */}
      <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:hidden">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#ECECEC] bg-white px-4 py-4 text-center shadow-sm"
          >
            <dt className="sr-only">{stat.label}</dt>
            <dd className="text-2xl font-semibold text-[#1366E0]">
              {stat.value}
            </dd>
            <dd className="mt-1 text-xs text-[#6B6B6B]">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
