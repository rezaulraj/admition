import Image from "next/image";
import Link from "next/link";


export default function CareerHero() {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="relative min-h-[520px] w-full overflow-hidden rounded-[2rem] sm:min-h-0 sm:aspect-[16/9] lg:aspect-[21/9] lg:rounded-[2.5rem]">
        <Image
          src="/carrer.png"
          alt="Team members collaborating at Admission OnBoard"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/90 via-[#1B1B1B]/50 to-transparent sm:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#1B1B1B]/85 via-[#1B1B1B]/40 to-transparent sm:block" />

        <div className="relative z-10 flex h-full min-h-[520px] items-end px-6 pb-8 pt-24 sm:min-h-0 sm:items-center sm:px-10 sm:py-10 md:px-16">
          <div className="max-w-md lg:max-w-lg">
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Build A Career That Changes Lives
            </h1>
            <p className="mt-4 text-sm font-medium leading-relaxed text-white/90 sm:text-base lg:text-lg">
              Join a team that helps students take on the world with confidence.
              From guiding university choices to visa support, we handle it all
              so you can focus on doing meaningful work.
            </p>

            <Link
              href="#careers-openings"
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1366E0] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1366E0]/30 transition-all hover:scale-105 hover:bg-[#0F55BE] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B] sm:mt-7 sm:w-auto sm:py-3"
            >
              Explore Careers
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
