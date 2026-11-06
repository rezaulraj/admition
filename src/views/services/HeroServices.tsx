import Image from "next/image";
import Link from "next/link";

export default function HeroServices() {
  return (
    <section className="w-full overflow-hidden bg-[#FFFEFA]">
      <style>{`
        @keyframes svcFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes svcImageIn {
          from { opacity: 0; transform: translateX(40px) scale(0.94); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes svcUnderline {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes svcGlow {
          from { opacity: 0; transform: scale(0.6); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div className="mx-auto container flex flex-col items-center gap-12 px-6 py-20 md:flex-row md:gap-10 md:py-24">
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#1B1B1B] animate-[svcFadeUp_0.8s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none sm:text-5xl lg:text-6xl">
            Discover{" "}
            <span className="relative inline-block text-[#1366E0]">
              what we offer
              {/* <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[5px] w-full origin-left rounded-full bg-[#1366E0]/25 animate-[svcUnderline_0.9s_cubic-bezier(0.65,0,0.35,1)_both] motion-reduce:animate-none"
                style={{ animationDelay: "800ms" }}
              /> */}
            </span>
            , how it works, and how it changes your journey
          </h1>

          <p
            className="mt-6 max-w-md text-base text-[#6B6B6B] animate-[svcFadeUp_0.8s_ease-out_both] motion-reduce:animate-none sm:text-lg"
            style={{ animationDelay: "250ms" }}
          >
            From personalized counselling to visa support, we cover every part
            of your study abroad experience, start to finish.
          </p>

          <div
            className="animate-[svcFadeUp_0.8s_ease-out_both] motion-reduce:animate-none"
            style={{ animationDelay: "400ms" }}
          >
            <Link
              href="/contact"
              className="group mt-9 inline-flex items-center gap-2 rounded-full border border-[#1B1B1B] bg-white px-6 py-3 text-sm font-semibold text-[#1B1B1B] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1B1B1B] hover:text-white hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1366E0] focus-visible:ring-offset-2"
            >
              Schedule A Free Consultation
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
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

        <div className="relative w-full md:w-1/2">
          <div
            aria-hidden
            className="absolute inset-0 m-auto h-3/4 w-3/4 rounded-full bg-[#1366E0]/10 blur-3xl animate-[svcGlow_1.2s_ease-out_both] motion-reduce:animate-none"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl animate-[svcImageIn_1s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none"
            style={{ animationDelay: "250ms" }}
          >
            <Image
              src="/heroservice.png"
              alt="Study abroad consultant explaining services"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
