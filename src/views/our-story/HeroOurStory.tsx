import Image from "next/image";
import Link from "next/link";


export default function HeroOurStory() {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="relative min-h-[480px] w-full overflow-hidden rounded-[2rem] sm:min-h-0 sm:aspect-[16/9] lg:aspect-[21/9] lg:rounded-[2.5rem]">
        <Image
          src="/herostory.png"
          alt="Students studying together outdoors at sunset"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2417]/90 via-[#0F2417]/45 to-transparent sm:hidden" />
        {/* Tablet & desktop: dark fade from the left (text sits on the left) */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#0F2417]/85 via-[#0F2417]/40 to-transparent sm:block" />

        <div className="relative z-10 flex h-full min-h-[480px] items-end px-6 pb-8 pt-24 sm:min-h-0 sm:items-center sm:px-10 sm:py-10 md:px-16">
          <div className="max-w-md lg:max-w-lg">
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Making World-Class Education Within Reach
            </h1>
            <p className="mt-4 text-sm font-medium leading-relaxed text-white/90 sm:text-base lg:text-lg">
              From picking the perfect course to sailing through your visa, we
              walk beside you at every single step of the way.
            </p>

            <Link
              href="#about"
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#1B1B1B] shadow-md transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F2417] sm:mt-7 sm:w-auto sm:py-3"
            >
              Learn More
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
