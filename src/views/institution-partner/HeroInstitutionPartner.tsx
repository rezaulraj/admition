import Image from "next/image";
import Link from "next/link";

// Place your background image at: /public/partner-hand.png

export default function HeroInstitutionPartner() {
  return (
    <section className="container mx-auto px-4 py-10">
      <style>{`
        @keyframes ipFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ipZoom {
          from { transform: scale(1.08); }
          to   { transform: scale(1); }
        }
      `}</style>
      <div className="relative min-h-[500px] w-full overflow-hidden rounded-[2rem] sm:min-h-0 sm:aspect-[16/9] lg:aspect-[21/9] lg:rounded-[2.5rem]">
        <Image
          src="/partner-hand.png"
          alt="University campus representing institution partnerships"
          fill
          sizes="100vw"
          className="object-cover object-center animate-[ipZoom_1.6s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none"
          priority
        />

        {/* Mobile: dark fade from the bottom (text sits at the bottom) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/90 via-[#1B1B1B]/50 to-transparent sm:hidden" />
        {/* Tablet & desktop: dark fade from the left (text sits on the left) */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#1B1B1B]/85 via-[#1B1B1B]/40 to-transparent sm:block" />

        <div className="relative z-10 flex h-full min-h-[500px] items-end px-6 pb-8 pt-24 sm:min-h-0 sm:items-center sm:px-10 sm:py-10 md:px-16">
          <div className="max-w-md lg:max-w-lg">
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white animate-[ipFadeUp_0.8s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none sm:text-4xl lg:text-5xl">
              Team Up With Us, Widen Your Reach
            </h1>
            <p
              className="mt-4 text-sm font-medium leading-relaxed text-white/90 animate-[ipFadeUp_0.8s_ease-out_both] motion-reduce:animate-none sm:text-base lg:text-lg"
              style={{ animationDelay: "200ms" }}
            >
              Become part of a trusted network of institutions and help even
              more students reach their international education goals through
              meaningful, strategic collaboration.
            </p>

            <Link
              href="#institution-form"
              style={{ animationDelay: "350ms" }}
              className="group mt-6 animate-[ipFadeUp_0.8s_ease-out_both] motion-reduce:animate-none inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1366E0] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1366E0]/30 transition-all hover:scale-105 hover:bg-[#0F55BE] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B] sm:mt-7 sm:w-auto sm:py-3"
            >
              Become An Institution Partner
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
    </section>
  );
}
