import Image from "next/image";
import Link from "next/link";

// Place your image at: /public/partner-handshake.png

export default function PartnerExpand() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FFFEFA] px-6 py-20 sm:py-24">
      {/* Soft background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-[#1366E0]/10 blur-3xl"
      />

      <div className="relative mx-auto container grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
        {/* Text */}
        <div>
          <span
            aria-hidden
            className="block h-1 w-12 rounded-full bg-[#1366E0]"
          />

          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-[#1B1B1B] sm:text-4xl lg:text-5xl">
            Grow alongside top-tier universities
          </h2>

          <div className="mt-6 flex max-w-xl flex-col gap-4 text-sm leading-relaxed text-[#5A5A5A] sm:text-base sm:leading-relaxed">
            <p>
              Admission OnBoard connects your business with internationally
              recognised universities, so you can reach more students and help
              them succeed. With reliable partnerships and a smooth application
              process, your students get a genuine chance at leading
              institutions around the world.
            </p>
            <p>
              Whether you run a recruitment agency or an education consultancy,
              we give you the support and resources you need to grow. Join a
              global network built on trust, growth and real opportunity.
            </p>
          </div>

          <Link
            href="/auth/register?tab=partner"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#1366E0] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1366E0]/25 transition-all hover:-translate-y-0.5 hover:bg-[#1B1B1B] hover:shadow-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1366E0] focus-visible:ring-offset-2"
          >
            Partner with us
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

        {/* Image */}
        <div className="group relative">
          {/* Offset accent frame behind the image */}
          <div
            aria-hidden
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] bg-[#1366E0]/15 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4"
          />
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-black/5 ring-1 ring-black/5">
            <Image
              src="/partner-handshake.png"
              alt="Two partners shaking hands"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-black/5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#1366E0]/10">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1366E0"
                strokeWidth={1.8}
                aria-hidden
              >
                <circle cx="12" cy="12" r="8.5" />
                <path
                  strokeLinecap="round"
                  d="M3.5 12h17M12 3.5c2.5 2.6 3.5 5.4 3.5 8.5s-1 5.9-3.5 8.5c-2.5-2.6-3.5-5.4-3.5-8.5s1-5.9 3.5-8.5Z"
                />
              </svg>
            </span>
            <span>
              <span className="block text-sm font-semibold text-[#1B1B1B]">
                Global university network
              </span>
              <span className="block text-xs text-[#6B6B6B]">
                Across 10 study destinations
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
