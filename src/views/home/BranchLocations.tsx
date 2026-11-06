import Link from "next/link";

type Office = {
  name: string;
  slug: string;
  active: boolean;
};

const offices: Office[] = [
  { name: "United Kingdom", slug: "united-kingdom-address", active: true },
  { name: "Bangladesh", slug: "bangladesh", active: true },
  { name: "Nepal", slug: "nepal", active: true },
  { name: "Sri Lanka", slug: "sri-lanka", active: false },
  { name: "India", slug: "india", active: false },
  // { name: "Kenya", slug: "kenya", active: false },
  // { name: "Nigeria", slug: "nigeria", active: false },
  { name: "Pakistan", slug: "pakistan", active: false },
  { name: "Ghana", slug: "ghana", active: false },
];

function OfficeItem({ name, slug, active }: Office) {
  if (active) {
    return (
      <Link
        href={`/countries/${slug}`}
        className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1366E0]/60 hover:bg-white/10"
      >
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-[#1366E0]/0 via-[#1366E0]/15 to-[#1366E0]/0 transition-transform duration-700 group-hover:translate-x-full"
          aria-hidden
        />
        <span className="relative">{name}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          className="relative shrink-0 -translate-x-1 text-white/40 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-[#1366E0] group-hover:opacity-100"
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
    );
  }

  // Not active yet: plain, non-clickable, visually muted.
  return (
    <span
      className="flex cursor-default items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4 text-sm font-semibold text-white/30"
      aria-disabled="true"
    >
      {name}
    </span>
  );
}

export default function GlobalNetwork() {
  return (
    <section className="w-full bg-black px-6 py-20">
      <div className="mx-auto container">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1.3fr] md:gap-16">
          {/* Left: copy */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#1366E0]">
              Global Network
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              Present Across Three Continents
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60 sm:text-base">
              Globally connected, locally focused. Find an Admission OnBoard
              team wherever you are.
            </p>
          </div>

          {/* Right: office grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {offices.map((office) => (
              <OfficeItem key={office.slug} {...office} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
