import Image from "next/image";
import Link from "next/link";

const stats = [
  {
    label: "Years of experience",
    value: "15+",
    icon: (
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.9 9h-3.02a15.5 15.5 0 0 0-1.2-5.32A8.03 8.03 0 0 1 19.9 11ZM12 4.06c.9 1.2 1.98 3.4 2.4 6.94H9.6c.42-3.54 1.5-5.74 2.4-6.94ZM4.1 13h3.02a15.5 15.5 0 0 0 1.2 5.32A8.03 8.03 0 0 1 4.1 13ZM7.12 11H4.1a8.03 8.03 0 0 1 4.22-5.32A15.5 15.5 0 0 0 7.12 11Zm2.48 2h4.8c-.42 3.54-1.5 5.74-2.4 6.94-.9-1.2-1.98-3.4-2.4-6.94Zm5.28 5.32a15.5 15.5 0 0 0 1.2-5.32h3.02a8.03 8.03 0 0 1-4.22 5.32Z" />
    ),
  },
  {
    label: "Service guarantee",
    value: "100%",
    icon: (
      <path d="M2 21h3V10H2v11Zm19-9c0-1.1-.9-2-2-2h-5.7l.86-4.13.03-.31c0-.42-.17-.8-.44-1.08L12.83 3 7.41 8.41C7.15 8.67 7 9.03 7 9.41V19a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2Z" />
    ),
  },
  {
    label: "Successful visas",
    value: "5,000+",
    icon: (
      <path d="M12 2 4 5v6c0 5.5 3.4 10.7 8 12 4.6-1.3 8-6.5 8-12V5l-8-3Zm-1.2 13.4-3.2-3.2 1.4-1.4 1.8 1.8 4.6-4.6 1.4 1.4-6 6Z" />
    ),
  },
  {
    label: "Students placed",
    value: "5,000+",
    icon: (
      <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.4 0-8 2.24-8 5v3h16v-3c0-2.76-3.6-5-8-5Z" />
    ),
  },
];

const offices = ["London", "Dhaka", "Sylhet", "Kathmandu"];

export default function Branches() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FFFEFA] px-6 py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#2F5DA8]/10 blur-3xl"
      />

      <div className="relative mx-auto container max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-14 lg:gap-20">
          {/* Left: map */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-0 -translate-x-3 translate-y-3 rounded-[2rem] bg-[#1366E0]/10"
            />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-[#ECECEC] bg-white shadow-xl shadow-black/5">
              <Image
                src="/map.png"
                alt="World map showing Admission OnBoard's offices"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-6 opacity-80"
              />
            </div>

            {/* Floating office badge */}
            <div className="absolute -bottom-5 right-5 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-black/5">
              <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-[#1366E0]/10">
                <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-[#1366E0]/60 motion-reduce:hidden" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-[#1366E0]" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-[#1B1B1B]">
                  {offices.length} offices
                </span>
                <span className="block text-xs text-[#6B6B6B]">
                  Across 3 countries
                </span>
              </span>
            </div>
          </div>

          {/* Right: copy */}
          <div>
            <span
              aria-hidden
              className="block h-1 w-12 rounded-full bg-[#1366E0]"
            />
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-[#1B1B1B] sm:text-4xl">
              Global presence since 2022
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#5A5A5A] sm:text-base sm:leading-relaxed">
              Since 2022, Admission OnBoard has helped students secure places at
              universities around the world. Built on real-life experience, our
              platform simplifies every step of the admission and transfer
              process.
            </p>

            {/* Office locations */}
            <ul className="mt-6 flex flex-wrap gap-2">
              {offices.map((city) => (
                <li
                  key={city}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#ECECEC] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#3A3A3A] shadow-sm"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="#1366E0"
                    aria-hidden
                  >
                    <path d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.25 6.19 11.44 6.46 11.7a1.5 1.5 0 0 0 2.08 0c.27-.26 6.46-6.45 6.46-11.7C19.5 5.36 16.14 2 12 2Zm0 10.5A3 3 0 1 1 12 6.5a3 3 0 0 1 0 6Z" />
                  </svg>
                  {city}
                </li>
              ))}
            </ul>

            <Link
              href="/careers"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#1366E0] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1366E0]/25 transition-all hover:-translate-y-0.5 hover:bg-[#1B1B1B] hover:shadow-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1366E0] focus-visible:ring-offset-2"
            >
              Join our team
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

        {/* Stats */}
        <dl className="mt-20 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-[#ECECEC] bg-white px-4 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1366E0] hover:bg-[#1366E0] hover:shadow-xl hover:shadow-[#1366E0]/25"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#1366E0]/10 text-[#1366E0] transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  {stat.icon}
                </svg>
              </span>
              <dd className="text-2xl font-bold tracking-tight text-[#1B1B1B] transition-colors group-hover:text-white sm:text-3xl">
                {stat.value}
              </dd>
              <dt className="text-xs font-semibold text-[#6B6B6B] transition-colors group-hover:text-white/90 sm:text-sm">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
