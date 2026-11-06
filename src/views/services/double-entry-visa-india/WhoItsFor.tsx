import type { ReactNode } from "react";
import Image from "next/image";


type Audience = {
  title: string;
  text: string;
  image: string;
  alt: string;
  icon: ReactNode;
};

const audiences: Audience[] = [
  {
    title: "Embassy & VFS appointments in Delhi",
    text: "Applying for a European or other foreign visa for study, work, family or a visit? Go once to submit and again to collect your passport.",
    image: "/who-embassy.png",
    alt: "Entrance of an embassy-style office building",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3 3 7.5h18L12 3ZM5 10v7m4.67-7v7m4.66-7v7M19 10v7M3.5 20.5h17"
      />
    ),
  },
  {
    title: "Medical treatment",
    text: "An initial consultation and a follow-up visit at a hospital in India.",
    image: "/who-medical.png",
    alt: "Modern hospital corridor",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12M6 12h12" />
    ),
  },
  {
    title: "Business travel",
    text: "Meetings, trade fairs or supplier visits spread over two trips.",
    image: "/who-business.png",
    alt: "Business partners shaking hands",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M4.5 7h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Zm-1 5h17"
      />
    ),
  },
  {
    title: "Transit & onward travel",
    text: "Travelling to Nepal or Bhutan through India, and returning the same way.",
    image: "/who-transit.png",
    alt: "Mountain road in the Himalayas",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 19 9 8l4 7 2-3 6 7H3Z"
      />
    ),
  },
  {
    title: "Tourists & families",
    text: "Two visits within one travel plan, such as a wedding and a return trip.",
    image: "/who-family.png",
    alt: "Family travelling together with luggage",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8.5 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM2.5 19.5c0-2.8 2.5-5 5.5-5s5.5 2.2 5.5 5m1.5-4.3c.5-.2 1-.2 1.5-.2 2.5 0 4.5 1.8 4.5 4"
      />
    ),
  },
];

export default function WhoItsFor() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20 sm:py-24">
      <div className="mx-auto container max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span
              aria-hidden
              className="block h-1 w-12 rounded-full bg-[#1366E0]"
            />
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl">
              Who it&apos;s <span className="text-[#1366E0]">for</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#6B6B6B] sm:text-base">
            Students, patients, business travellers and families. If your plans
            take you to India twice, we&apos;re here to help.
          </p>
        </div>

        {/* Bento grid: large card on the left, four smaller cards on the right (desktop) */}
        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[300px_300px]">
          {audiences.map((audience, index) => {
            const featured = index === 0;
            return (
              <li
                key={audience.title}
                className={`group relative min-h-[300px] overflow-hidden lg:min-h-0 rounded-[1.75rem] shadow-lg shadow-black/5 ring-1 ring-black/5 ${
                  featured ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""
                }`}
              >
                <Image
                  src={audience.image}
                  alt={audience.alt}
                  fill
                  sizes={
                    featured
                      ? "(max-width: 1024px) 100vw, 33vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  }
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#1366E0] text-white shadow-lg shadow-[#1366E0]/30">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden
                    >
                      {audience.icon}
                    </svg>
                  </span>
                  <h3
                    className={`mt-4 font-semibold leading-tight text-white ${
                      featured ? "text-xl sm:text-2xl" : "text-lg"
                    }`}
                  >
                    {audience.title}
                  </h3>
                  <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-white/80">
                    {audience.text}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
