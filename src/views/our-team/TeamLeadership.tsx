import Image from "next/image";
import ReactCountryFlag from "react-country-flag";

type Leader = {
  name: string;
  role: string;
  office: { code: "GB" | "BD" | "NP"; city: string };
  bio: string;
  photo?: string;
  linkedin?: string;
  quote?: string;
};

const founder: Leader = {
  name: "Mahmudul Karim",
  role: "Founder & Managing Director",
  office: { code: "GB", city: "London" },
  bio: "With more than 15 years in international education, our founder has guided thousands of students to universities across Europe, the UK and beyond.",
  photo: "/leadershipall.png",
  linkedin: "https://www.linkedin.com/",
  quote:
    "Every student deserves honest advice and a real chance to succeed. Seeing our students thrive in universities around the world is the best part of what we do.",
};

const leaders: Leader[] = [
  {
    name: "Shirin Akter",
    role: "Director, Bangladesh",
    office: { code: "BD", city: "Dhaka" },
    bio: "Leads our Dhaka and Sylhet teams and makes sure every student gets the care they deserve.",
    photo: "/team6.png",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Imran Hossain",
    role: "Head of Admissions",
    office: { code: "BD", city: "Dhaka" },
    bio: "Works closely with our partner universities to find the right course for every student.",
    photo: "/team7.png",
  },
  {
    name: "Suman Adhikari",
    role: "Branch Head, Nepal",
    office: { code: "NP", city: "Kathmandu" },
    bio: "Brings our trusted guidance to students in Nepal, from first enquiry to departure.",
    // photo: "/team/branch-nepal.jpg",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function Portrait({
  leader,
  sizes,
  priority = false,
}: {
  leader: Leader;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#F4EFE6]">
      {leader.photo ? (
        <Image
          src={leader.photo}
          alt={`${leader.name}, ${leader.role}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="grid h-full w-full place-items-center">
          <span className="grid h-28 w-28 place-items-center rounded-full bg-[#FFFEFA] text-3xl font-semibold text-[#1366E0] ring-4 ring-[#1366E0]/20">
            {initials(leader.name)}
          </span>
        </div>
      )}

      {/* Office chip */}
      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 py-1 pl-1 pr-3 text-xs font-semibold text-[#1B1B1B] shadow-md backdrop-blur-md">
        <span className="flex h-5 w-5 overflow-hidden rounded-full">
          <ReactCountryFlag
            countryCode={leader.office.code}
            svg
            aria-hidden
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
            }}
          />
        </span>
        {leader.office.city}
      </span>
    </div>
  );
}

function LinkedInLink({ leader }: { leader: Leader }) {
  if (!leader.linkedin) return null;
  return (
    <a
      href={leader.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${leader.name} on LinkedIn`}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#E5E5E5] text-[#1B1B1B] transition-colors hover:border-[#1366E0] hover:bg-[#1366E0] hover:text-white"
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
      </svg>
    </a>
  );
}

export default function TeamLeadership() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20 sm:py-24">
      <div className="mx-auto container max-w-6xl">
        {/* Heading */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span
              aria-hidden
              className="block h-1 w-12 rounded-full bg-[#1366E0]"
            />
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl">
              Led by people who{" "}
              <span className="text-[#1366E0]">believe in students</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#6B6B6B] sm:text-base">
            Our leaders have spent years helping students study abroad, and they
            still get excited about every offer letter.
          </p>
        </div>

        {/* Founder: featured card */}
        <article className="group mt-12 grid grid-cols-1 overflow-hidden rounded-[2rem] border border-[#ECECEC] bg-white shadow-lg shadow-black/5 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[440px]">
            <Portrait
              leader={founder}
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>

          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            {/* Quote mark */}
            <svg
              className="h-10 w-10 text-[#1366E0]"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M9.6 6C6.5 7.3 4.5 10 4.5 13.6V18h5.6v-5.6H7.2c0-1.9 1.1-3.5 3.2-4.4L9.6 6Zm9 0c-3.1 1.3-5.1 4-5.1 7.6V18h5.6v-5.6h-2.9c0-1.9 1.1-3.5 3.2-4.4L18.6 6Z" />
            </svg>

            {founder.quote && (
              <blockquote className="mt-5 text-xl font-medium leading-snug text-[#1B1B1B] sm:text-2xl lg:text-[1.65rem]">
                {founder.quote}
              </blockquote>
            )}

            <p className="mt-5 text-sm leading-relaxed text-[#6B6B6B] sm:text-base">
              {founder.bio}
            </p>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#ECECEC] pt-6">
              <div>
                <p className="text-lg font-semibold text-[#1B1B1B]">
                  {founder.name}
                </p>
                <p className="mt-0.5 text-sm font-medium text-[#1366E0]">
                  {founder.role}
                </p>
              </div>
              <LinkedInLink leader={founder} />
            </div>
          </div>
        </article>

        {/* Other leaders */}
        <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((leader, index) => (
            <li
              key={`${leader.name}-${index}`}
              className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-[#ECECEC] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
            >
              <div className="relative aspect-[4/5]">
                <Portrait
                  leader={leader}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1B1B1B]">
                      {leader.name}
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-[#1366E0]">
                      {leader.role}
                    </p>
                  </div>
                  <LinkedInLink leader={leader} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#6B6B6B]">
                  {leader.bio}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
