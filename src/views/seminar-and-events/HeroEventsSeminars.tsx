
import Image from "next/image";
import Link from "next/link";

// Place your image at: /public/events-seminars-graphic.png

export default function HeroEventsSeminars() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FFFEFA]">
      <div
        className="pointer-events-none absolute -right-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "#A5C8F4" }}
      />

      <div className="relative mx-auto container flex flex-col items-center gap-12 px-6 py-20 md:flex-row md:gap-10 md:py-24">
        {/* Left: image */}
        <div className="w-full md:w-1/2">
          <div className="relative mx-auto aspect-square w-full max-w-[420px]">
            <Image
              src="/events-seminars-graphic.png"
              alt="Students at a study abroad event"
              fill
              sizes="(max-width: 768px) 80vw, 420px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right: copy */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            <span className="text-[#1366E0]">Workshops</span>{" "}
            <span className="text-[#1B1B1B]">& Info Sessions</span>
          </h1>

          <p className="mt-6 max-w-md text-base text-[#6B6B6B] sm:text-lg">
            Join our free sessions and get first-hand guidance from study
            abroad experts, right where you are.
          </p>

          <Link
            href="/consultation"
            className="mt-9 inline-flex items-center gap-2 rounded-full border border-[#1B1B1B] bg-white px-6 py-3 text-sm font-semibold text-[#1B1B1B] transition-colors hover:bg-[#1B1B1B] hover:text-white"
          >
            Schedule A Free Consultation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}