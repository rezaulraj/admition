import Image from "next/image";

// Place your photo at: /public/india-intro.jpg
// (4:3, about 1200×900 px – e.g. an adult at a laptop with a passport, filling in a form)

// Single vs double entry, shown side by side
const compare = [
  {
    title: "Single entry",
    text: "Your visa ends as soon as you leave India.",
    highlight: false,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14M13 6l6 6-6 6"
      />
    ),
  },
  {
    title: "Double entry",
    text: "Leave India and come back once more on the same visa.",
    highlight: true,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 8h13l-3-3M20 16H7l3 3"
      />
    ),
  },
];

export default function IntroDoubleEntry() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20 sm:py-24">
      <div className="mx-auto container grid max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-16 lg:gap-20">
        {/* Left: copy */}
        <div>
          <span
            aria-hidden
            className="block h-1 w-12 rounded-full bg-[#1366E0]"
          />

          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-[#1B1B1B] sm:text-4xl">
            What is a <span className="text-[#1366E0]">double-entry</span> visa?
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#5A5A5A] sm:text-base sm:leading-relaxed">
            A double-entry visa lets you enter India two times during its
            validity. It&apos;s ideal when your plans involve two separate
            visits, such as going to New Delhi for an appointment and returning
            later to collect your passport, or travelling to a neighbouring
            country through India and coming back the same way.
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#5A5A5A] sm:text-base sm:leading-relaxed">
            We help you choose the right visa type, prepare your application and
            avoid the mistakes that cause delays.
          </p>

          {/* Single vs double entry */}
          <ul className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
            {compare.map((item) => (
              <li
                key={item.title}
                className={`rounded-2xl border p-4 ${
                  item.highlight
                    ? "border-[#1366E0]/40 bg-white shadow-md shadow-[#1366E0]/10"
                    : "border-[#ECECEC] bg-white/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                      item.highlight
                        ? "bg-[#1366E0] text-white"
                        : "bg-[#F1F1EE] text-[#9A9A9A]"
                    }`}
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden
                    >
                      {item.icon}
                    </svg>
                  </span>
                  <span
                    className={`text-sm font-semibold sm:text-base ${
                      item.highlight ? "text-[#1B1B1B]" : "text-[#8A8A8A]"
                    }`}
                  >
                    {item.title}
                  </span>
                  {item.highlight && (
                    <span className="ml-auto rounded-full bg-[#1366E0]/10 px-2 py-0.5 text-[11px] font-semibold text-[#1366E0]">
                      We help with this
                    </span>
                  )}
                </div>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    item.highlight ? "text-[#5A5A5A]" : "text-[#9A9A9A]"
                  }`}
                >
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: photo */}
        <div className="group relative">
          {/* Offset red frame behind the photo */}
          <div
            aria-hidden
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border-2 border-[#1366E0]/30 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4"
          />
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-xl shadow-black/5 ring-1 ring-black/5">
            <Image
              src="/india-intro.png"
              alt="Traveller filling in an online visa application with a passport beside them"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-black/5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#1366E0] text-white">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
                aria-hidden
              >
                <path
                  d="M5 12.5l4.5 4.5L19 7.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>
              <span className="block text-sm font-semibold text-[#1B1B1B]">
                Two visits, one visa
              </span>
              <span className="block text-xs text-[#6B6B6B]">
                Applied for correctly, first time
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
