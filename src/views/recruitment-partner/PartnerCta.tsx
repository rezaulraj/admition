import Image from "next/image";
import Link from "next/link";

const NAVY = "#022B50";
const BRAND_BLUE = "#1366E0";

export default function PartnerCta() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 pb-16 pt-24 sm:pt-32">
      <div className="mx-auto container">
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{ backgroundColor: NAVY }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-1/2 hidden aspect-square w-[46%] -translate-y-1/2 rounded-full md:block lg:w-[40%]"
            style={{ backgroundColor: BRAND_BLUE }}
          />
          {/* Corner circle (top right) */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-24 aspect-square w-48 rounded-full sm:-right-20 sm:-top-28 sm:w-64 lg:w-72"
            style={{ backgroundColor: BRAND_BLUE }}
          />
          {/* Mobile-only soft circle (bottom left) */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-20 aspect-square w-48 rounded-full opacity-90 md:hidden"
            style={{ backgroundColor: BRAND_BLUE }}
          />

          <div className="relative grid grid-cols-1 items-end md:grid-cols-[38%_1fr] lg:grid-cols-[34%_1fr]">
            {/* Person image (tablet & desktop): sits on the bottom edge */}
            <div className="relative hidden h-full min-h-[340px] md:block lg:min-h-[380px]">
              <Image
                src="/partnership.png"
                alt="Partner ready to help students grow"
                fill
                sizes="(max-width: 1024px) 38vw, 34vw"
                className="object-contain object-bottom"
              />
            </div>

            {/* Text */}
            <div className="relative z-10 px-6 py-14 text-center sm:px-10 sm:py-16 md:py-16 md:pl-4 md:pr-28 md:text-left lg:pr-40">
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready to Expand?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/80 sm:text-base md:mx-0">
                Become one of hundreds of partners already working alongside
                Admission OnBoard to help students take their next big step.
              </p>

              <Link
                href="/auth/register?tab=partner"
                className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#1366E0] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                style={{ ["--tw-ring-offset-color" as string]: NAVY }}
              >
                Register as a Partner
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0 transition-transform group-hover:translate-x-1"
                  aria-hidden
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
      </div>
    </section>
  );
}
