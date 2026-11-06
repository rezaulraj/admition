import Image from "next/image";
import ReactCountryFlag from "react-country-flag";

// Place your photos (square 1:1, about 600×600 px) at:
//   /public/route-dhaka.jpg      – Dhaka cityscape or landmark
//   /public/route-poland.jpg     – Warsaw skyline or old town
//   /public/route-lithuania.jpg  – Lithuanian campus or Vilnius old town

const stops = [
  {
    code: "BD",
    city: "Dhaka",
    country: "Bangladesh",
    image: "/route-dhaka.png",
    alt: "Dhaka city skyline",
    title: "MoFA attestation",
    text: "We arrange the physical attestation of your PCC at the Ministry of Foreign Affairs.",
  },
  {
    code: "PL",
    city: "Warsaw",
    country: "Poland",
    image: "/route-poland.png",
    alt: "Warsaw old town, Poland",
    title: "Embassy legalization",
    text: "Your attested PCC is couriered to Poland and legalized at the Bangladesh Embassy.",
  },
  {
    code: "LT",
    city: "Your university",
    country: "Lithuania",
    image: "/route-lithuania.png",
    alt: "University campus in Lithuania",
    title: "Direct delivery",
    text: "If required, we send your legalized PCC straight to your university.",
  },
];

/** Horizontal dashed line + plane, spanning the gap between two cards (desktop) */
function ConnectorX() {
  return (
    <div
      aria-hidden
      className="absolute left-full top-1/2 z-10 hidden h-10 w-14 -translate-y-1/2 items-center md:flex lg:w-20"
    >
      <span className="mx-2 h-0 flex-1 border-t-2 border-dashed border-[#1366E0]/50" />
      <span className="rt-fly-x absolute top-1/2 -translate-y-1/2">
        <PlaneIcon className="h-5 w-5 rotate-90" />
      </span>
    </div>
  );
}

/** Vertical dashed line + plane between stacked cards (mobile) */
function ConnectorY() {
  return (
    <div
      aria-hidden
      className="relative mx-auto my-4 flex h-14 w-10 justify-center md:hidden"
    >
      <span className="h-full w-0 border-l-2 border-dashed border-[#1366E0]/50" />
      <span className="rt-fly-y absolute left-1/2 -translate-x-1/2">
        <PlaneIcon className="h-5 w-5 rotate-180" />
      </span>
    </div>
  );
}

function PlaneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`text-[#1366E0] ${className}`}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z" />
    </svg>
  );
}

export default function RouteCards() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20 sm:py-24">
      <style>{`
        @keyframes rtFlyX { 0% { left: 0; opacity: 0 } 15% { opacity: 1 } 85% { opacity: 1 } 100% { left: calc(100% - 20px); opacity: 0 } }
        @keyframes rtFlyY { 0% { top: 0; opacity: 0 } 15% { opacity: 1 } 85% { opacity: 1 } 100% { top: calc(100% - 20px); opacity: 0 } }
        .rt-fly-x { animation: rtFlyX 2.8s ease-in-out infinite; }
        .rt-fly-y { animation: rtFlyY 2.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .rt-fly-x, .rt-fly-y { animation: none; }
          .rt-fly-x { left: calc(50% - 10px); }
          .rt-fly-y { top: calc(50% - 10px); }
        }
      `}</style>

      <div className="mx-auto container max-w-6xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl">
            Where your <span className="text-[#1366E0]">PCC</span> travels
          </h2>
          <p className="mt-4 text-sm text-[#6B6B6B] sm:text-base">
            Three stops, one team. We manage every handover, so your document is
            never left waiting.
          </p>
        </div>

        {/* Route */}
        <ol className="mt-14 grid grid-cols-1 justify-items-center md:grid-cols-3 md:gap-x-14 lg:gap-x-20">
          {stops.map((stop, index) => (
            <li key={stop.code} className="group w-full max-w-sm md:max-w-none">
              {/* Photo card (wrapper is not clipped, so the connector can sit in the gap) */}
              <div className="relative">
                <div className="relative aspect-square w-full overflow-hidden rounded-[1.75rem] shadow-lg shadow-black/5 ring-1 ring-black/5">
                  <Image
                    src={stop.image}
                    alt={stop.alt}
                    fill
                    sizes="(max-width: 768px) 90vw, 30vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Step number */}
                  <span className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-[#1366E0] text-sm font-bold text-white shadow-md">
                    {index + 1}
                  </span>

                  {/* Flag + city */}
                  <div className="absolute inset-x-4 bottom-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                      <ReactCountryFlag
                        countryCode={stop.code}
                        svg
                        aria-label={`Flag of ${stop.country}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "block",
                          objectFit: "cover",
                        }}
                      />
                    </span>
                    <span>
                      <span className="block text-lg font-semibold leading-tight text-white">
                        {stop.city}
                      </span>
                      <span className="block text-xs text-white/80">
                        {stop.country}
                      </span>
                    </span>
                  </div>
                </div>

                {index < stops.length - 1 && <ConnectorX />}
              </div>

              {/* What happens here */}
              <div className="mt-5 px-1 text-center md:text-left">
                <h3 className="text-base font-semibold text-[#1B1B1B] sm:text-lg">
                  {stop.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#6B6B6B]">
                  {stop.text}
                </p>
              </div>

              {index < stops.length - 1 && <ConnectorY />}
            </li>
          ))}
        </ol>

        {/* Return option */}
        <p className="mx-auto mt-12 flex max-w-xl items-start justify-center gap-2.5 rounded-2xl border border-[#ECECEC] bg-white px-5 py-4 text-center text-sm text-[#5A5A5A] shadow-sm sm:items-center">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#1366E0]/10 text-[#1366E0]">
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
                d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11"
              />
            </svg>
          </span>
          <span>
            <strong className="font-semibold text-[#1B1B1B]">
              Need it back home?
            </strong>{" "}
            We can also courier your legalized PCC from Poland back to
            Bangladesh.
          </span>
        </p>
      </div>
    </section>
  );
}
