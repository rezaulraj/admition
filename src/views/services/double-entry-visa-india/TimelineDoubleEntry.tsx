import Image from "next/image";
import ReactCountryFlag from "react-country-flag";

// Place your photos (square 1:1, about 600×600 px) in /public:
//   trip-dhaka.jpg    – Dhaka skyline or Hazrat Shahjalal Airport
//   trip-india-1.jpg  – India Gate, New Delhi
//   trip-home.jpg     – home / family in Bangladesh
//   trip-india-2.jpg  – a different landmark (e.g. Lotus Temple), so the two visits look distinct

type Stop = {
  code: "BD" | "IN";
  place: string;
  tag?: "Entry 1" | "Entry 2";
  image: string;
  alt: string;
  title: string;
  text: string;
};

const stops: Stop[] = [
  {
    code: "BD",
    place: "Dhaka",
    image: "/trip-dhaka.png",
    alt: "Dhaka city skyline",
    title: "Get your visa",
    text: "We prepare your application and you receive your double-entry visa.",
  },
  {
    code: "IN",
    place: "India",
    tag: "Entry 1",
    image: "/trip-india-1.png",
    alt: "India Gate in New Delhi",
    title: "First visit",
    text: "Your appointment, treatment, meeting or onward journey.",
  },
  {
    code: "BD",
    place: "Back home",
    image: "/trip-home.png",
    alt: "Family at home in Bangladesh",
    title: "Return home",
    text: "Travel back while you wait. Your visa stays valid for the second trip.",
  },
  {
    code: "IN",
    place: "India",
    tag: "Entry 2",
    image: "/trip-india-2.png",
    alt: "Lotus Temple in New Delhi",
    title: "Second visit",
    text: "Collect your passport, attend a follow-up or finish your trip.",
  },
];

function PlaneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`text-[#1366E0] ${className}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z" />
    </svg>
  );
}

/** Horizontal connector in the gap between two cards (desktop only) */
function ConnectorX() {
  return (
    <div
      aria-hidden
      className="absolute left-full top-1/2 z-10 hidden h-10 w-8 -translate-y-1/2 items-center lg:flex xl:w-10"
    >
      <span className="h-0 w-full border-t-2 border-dashed border-[#1366E0]/50" />
      <span className="tl-fly-x absolute top-1/2 -translate-y-1/2">
        <PlaneIcon className="h-4 w-4 rotate-90" />
      </span>
    </div>
  );
}

/** Vertical connector between stacked cards (phones only) */
function ConnectorY() {
  return (
    <div
      aria-hidden
      className="relative mx-auto my-3 flex h-12 w-10 justify-center sm:hidden"
    >
      <span className="h-full w-0 border-l-2 border-dashed border-[#1366E0]/50" />
      <span className="tl-fly-y absolute left-1/2 -translate-x-1/2">
        <PlaneIcon className="h-4 w-4 rotate-180" />
      </span>
    </div>
  );
}

export default function TimelineDoubleEntry() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20 sm:py-24">
      <style>{`
        @keyframes tlFlyX { 0% { left: 0; opacity: 0 } 20% { opacity: 1 } 80% { opacity: 1 } 100% { left: calc(100% - 16px); opacity: 0 } }
        @keyframes tlFlyY { 0% { top: 0; opacity: 0 } 20% { opacity: 1 } 80% { opacity: 1 } 100% { top: calc(100% - 16px); opacity: 0 } }
        .tl-fly-x { animation: tlFlyX 2.6s ease-in-out infinite; }
        .tl-fly-y { animation: tlFlyY 2.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .tl-fly-x, .tl-fly-y { animation: none; }
          .tl-fly-x { left: calc(50% - 8px); }
          .tl-fly-y { top: calc(50% - 8px); }
        }
      `}</style>

      <div className="mx-auto container max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl">
            Two trips, <span className="text-[#1366E0]">one visa</span>
          </h2>
          <p className="mt-4 text-sm text-[#6B6B6B] sm:text-base">
            Here&apos;s how a double-entry visa covers your whole travel plan.
          </p>
        </div>

        <ol className="mt-14 grid grid-cols-1 justify-items-center gap-y-0 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8 xl:gap-x-10">
          {stops.map((stop, index) => (
            <li
              key={`${stop.place}-${index}`}
              className="group w-full max-w-sm sm:max-w-none"
            >
              <div className="relative">
                <div
                  className={`relative aspect-square w-full overflow-hidden rounded-[1.75rem] shadow-lg shadow-black/5 ${
                    stop.tag ? "ring-2 ring-[#1366E0]" : "ring-1 ring-black/5"
                  }`}
                >
                  <Image
                    src={stop.image}
                    alt={stop.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                    className="object-fill transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                  {/* Step number */}
                  <span className="absolute left-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white text-xs font-bold text-[#1B1B1B] shadow-md">
                    {index + 1}
                  </span>

                  {/* Entry tag on the India visits */}
                  {stop.tag && (
                    <span className="absolute right-4 top-4 rounded-full bg-[#1366E0] px-3 py-1 text-[11px] font-bold tracking-wide text-white shadow-md">
                      {stop.tag.toUpperCase()}
                    </span>
                  )}

                  {/* Flag + place */}
                  <div className="absolute inset-x-4 bottom-4 flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                      <ReactCountryFlag
                        countryCode={stop.code}
                        svg
                        aria-label={
                          stop.code === "IN"
                            ? "Flag of India"
                            : "Flag of Bangladesh"
                        }
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "block",
                          objectFit: "cover",
                        }}
                      />
                    </span>
                    <span className="text-lg font-semibold text-white">
                      {stop.place}
                    </span>
                  </div>
                </div>

                {index < stops.length - 1 && <ConnectorX />}
              </div>

              <div className="mt-4 px-1 text-center lg:text-left">
                <h3 className="text-base font-semibold text-[#1B1B1B]">
                  {stop.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#6B6B6B]">
                  {stop.text}
                </p>
              </div>

              {index < stops.length - 1 && <ConnectorY />}
            </li>
          ))}
        </ol>

        {/* Note */}
        <p className="mx-auto mt-12 flex max-w-2xl items-start gap-3 rounded-2xl border border-[#ECECEC] bg-white px-5 py-4 text-sm text-[#5A5A5A] shadow-sm sm:items-center">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#1366E0]/10 text-[#1366E0]">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <circle cx="12" cy="12" r="8.5" />
              <path strokeLinecap="round" d="M12 7.5V12l3 2" />
            </svg>
          </span>
          <span>
            <strong className="font-semibold text-[#1B1B1B]">
              Plan your dates carefully.
            </strong>{" "}
            Both visits must fall within your visa&apos;s validity. We&apos;ll
            help you time your application around your travel plan.
          </span>
        </p>
      </div>
    </section>
  );
}
