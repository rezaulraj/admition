type Job = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  postedOn: string;
  description: string;
};

const jobs: Job[] = [
  {
    slug: "student-consultation-officer",
    title: "Student Consultation Officer",
    department: "Admissions",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    postedOn: "10 Sept 2026",
    description:
      "Guide prospective students through course and university selection, and support them from first enquiry through to application submission.",
  },
  {
    slug: "marketing-officer",
    title: "Marketing Officer",
    department: "Marketing",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    postedOn: "8 Sept 2026",
    description:
      "Plan and run campaigns across social media, events, and partnerships to grow awareness and bring qualified student leads into our pipeline.",
  },
  {
    slug: "graphic-designer",
    title: "Graphic Designer",
    department: "Creative",
    location: "Dhaka, Bangladesh (Hybrid)",
    type: "Full-time",
    postedOn: "5 Sept 2026",
    description:
      "Design social posts, brochures, and campaign creatives that bring our brand to life across digital and print, working closely with marketing.",
  },
  {
    slug: "visa-processing-officer",
    title: "Visa Processing Officer",
    department: "Visa & Compliance",
    location: "Sylhet, Bangladesh",
    type: "Full-time",
    postedOn: "2 Sept 2026",
    description:
      "Prepare and review visa documentation for students, coordinate with embassies, and keep applicants informed at every stage of the process.",
  },
  {
    slug: "front-desk-executive",
    title: "Front Desk Executive",
    department: "Operations",
    location: "Banani, Dhaka",
    type: "Part-time",
    postedOn: "30 Aug 2026",
    description:
      "Be the first friendly face students and parents meet in-branch, manage appointment scheduling, and support walk-in enquiries.",
  },
  {
    slug: "social-media-executive",
    title: "Social Media Executive",
    department: "Marketing",
    location: "Remote",
    type: "Contract",
    postedOn: "27 Aug 2026",
    description:
      "Own our day-to-day social presence, plan content calendars, and engage with our community across Facebook, Instagram, and TikTok.",
  },
];

const typeStyles: Record<Job["type"], string> = {
  "Full-time": "bg-[#2F9E5C]/10 text-[#2F9E5C]",
  "Part-time": "bg-[#F58B0F]/10 text-[#F58B0F]",
  Contract: "bg-[#2F5DA8]/10 text-[#2F5DA8]",
};

function LocationIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="#9A9A9A"
      className="shrink-0"
    >
      <path d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.25 6.19 11.44 6.46 11.7a1.5 1.5 0 0 0 2.08 0c.27-.26 6.46-6.45 6.46-11.7C19.5 5.36 16.14 2 12 2Zm0 10.5A3 3 0 1 1 12 6.5a3 3 0 0 1 0 6Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="#9A9A9A"
      className="shrink-0"
    >
      <path d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7ZM5 9h14v11H5V9Z" />
    </svg>
  );
}

export default function CareerOpenings() {
  return (
    <section id="careers-openings" className="w-full bg-[#FFFEFA] px-6 py-20">
      <div className="mx-auto container">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1366E0]">
            Careers
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl">
            Current Openings
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#6B6B6B] sm:text-base">
            Join a team helping students take on the world. Here&apos;s what
            we&apos;re hiring for right now.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-5">
          {jobs.map((job) => (
            <div
              key={job.slug}
              className="flex flex-col gap-4 rounded-2xl border border-[#ECECEC] bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold text-[#1B1B1B]">
                    {job.title}
                  </h3>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${typeStyles[job.type]}`}
                  >
                    {job.type}
                  </span>
                  <span className="rounded-full bg-[#F5F5F3] px-3 py-1 text-[11px] font-semibold text-[#6B6B6B]">
                    {job.department}
                  </span>
                </div>

                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6B6B6B]">
                  {job.description}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-medium text-[#9A9A9A]">
                  <span className="flex items-center gap-1.5">
                    <LocationIcon />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon />
                    Posted on {job.postedOn}
                  </span>
                </div>
              </div>

              <button
                // href={`/careers/${job.slug}`}
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#1B1B1B] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1366E0]"
              >
                Apply Now
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
