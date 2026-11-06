import Image from "next/image";
import Link from "next/link";

// Banner image at: /public/rescruitment-partner.png
// The whole image is shown at its own shape – nothing is cropped.
// ⚠️ If your image is not 1067×441, update IMAGE_WIDTH / IMAGE_HEIGHT so it isn't stretched.
const IMAGE_WIDTH = 1067;
const IMAGE_HEIGHT = 441;

function Arrow() {
  return (
    <svg
      className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
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
  );
}

export default function HeroRecruitmentPartner() {
  return (
    <section className="container mx-auto px-4 py-10">
      <style>{`
        @keyframes rpFadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        @keyframes rpZoom { from { opacity: 0; transform: scale(1.03); } to { opacity: 1; transform: scale(1); } }
        .rp-zoom { animation: rpZoom 1s cubic-bezier(.22,1,.36,1) both; }
        .rp-in { animation: rpFadeUp .7s cubic-bezier(.22,1,.36,1) both; }
        @media (prefers-reduced-motion: reduce) { .rp-zoom, .rp-in { animation: none !important; } }
      `}</style>

      {/* Full banner image */}
      <div className="rp-zoom overflow-hidden rounded-[1.5rem] shadow-xl shadow-black/5 ring-1 ring-black/5 sm:rounded-[2rem] lg:rounded-[2.5rem]">
        <Image
          src="/partnerhero.png"
          alt="Why partner with Admission OnBoard: university partners, years of experience, students placed, clear costs, complete A–Z support and fast visa filing"
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          sizes="(max-width: 1536px) 100vw, 1536px"
          priority
          className="block h-auto w-full"
        />
      </div>

      {/* Buttons – bottom left */}
      <div
        className="rp-in mt-6 flex flex-col gap-3 sm:flex-row"
        style={{ animationDelay: "250ms" }}
      >
        <Link
          href="/courses"
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E6FE8] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1E6FE8]/30 transition-all hover:-translate-y-0.5 hover:bg-[#1659C4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FE8] focus-visible:ring-offset-2"
        >
          Explore Programmes
          <Arrow />
        </Link>
        <Link
          href="/contact"
          className="group inline-flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-[#13213C] bg-white px-7 py-3.5 text-sm font-semibold text-[#13213C] transition-all hover:-translate-y-0.5 hover:bg-[#13213C] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13213C] focus-visible:ring-offset-2"
        >
          Speak To An Advisor
          <Arrow />
        </Link>
      </div>
    </section>
  );
}
