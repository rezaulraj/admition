import Image from "next/image";
import Link from "next/link";

// Place your background image at: /public/uk_tower_bridge.webp

export default function CtaBanner() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-16">
      <div className="mx-auto container">
        <div className="relative overflow-hidden rounded-3xl bg-[#1366E0]">
          <Image
            src="/uk_tower_bridge.webp"
            alt="City skyline backdrop"
            fill
            sizes="100vw"
            className="object-cover opacity-25 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F58B0F]/40 via-[#F58B0F]/70 to-[#F58B0F]" />

          <div className="relative flex flex-col items-center px-6 py-16 text-center sm:py-20">
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Your study abroad journey starts with a single click
            </h2>
            <p className="mt-4 max-w-md text-sm font-semibold text-white/85 sm:text-base">
              Tap the button, follow a few quick steps, and let our team handle
              the rest.
            </p>

            <Link
              href="/contact"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-black px-7 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              Schedule A Free Consultation
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0"
              >
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
      </div>
    </section>
  );
}
