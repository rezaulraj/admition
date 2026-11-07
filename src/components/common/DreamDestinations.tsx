import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

type Destination = {
  name: string;
  slug: string;
  flagCode: string;
  image: string;
  description: string;
};

const destinations: Destination[] = [
  {
    name: "United Kingdom",
    slug: "united-kingdom",
    flagCode: "GB",
    image: "/uk.png",
    description:
      "World-renowned universities, one-year master's degrees, and generous post-study work options.",
  },
  {
    name: "Australia",
    slug: "australia",
    flagCode: "AU",
    image: "/australia.png",
    description:
      "Globally ranked universities paired with some of the most generous post-study work rights around.",
  },
  {
    name: "New Zealand",
    slug: "new-zealand",
    flagCode: "NZ",
    image: "/newzeland.png",
    description:
      "Practical, globally respected degrees, post-study work visas, and a safe, welcoming lifestyle.",
  },
  {
    name: "Finland",
    slug: "finland",
    flagCode: "FI",
    image: "/findland-hero.png",
    description:
      "Tuition-friendly, innovation-led education in one of the world's happiest countries.",
  },
  {
    name: "Romania",
    slug: "romania",
    flagCode: "RO",
    image: "/romania-hero.png",
    description:
      "Affordable tuition and EU-recognized degrees across a wide range of disciplines.",
  },
  {
    name: "Malta",
    slug: "malta",
    flagCode: "MT",
    image: "/malta-hero.png",
    description:
      "English-taught programs on a safe, English-speaking island right inside the EU.",
  },
  {
    name: "Hungary",
    slug: "hungary",
    flagCode: "HU",
    image: "/hungary-hero.png",
    description:
      "Renowned medical and engineering programs paired with a low cost of living.",
  },
  {
    name: "Cyprus",
    slug: "cyprus",
    flagCode: "CY",
    image: "/cyprus-hero.png",
    description:
      "A fast-growing hub for business and tech degrees with a Mediterranean lifestyle.",
  },
  {
    name: "Greece",
    slug: "greece",
    flagCode: "GR",
    image: "/greece-hero.png",
    description:
      "Rich academic history paired with modern, budget-friendly degree options.",
  },
  {
    name: "Lithuania",
    slug: "lithuania",
    flagCode: "LT",
    image: "/lithuania-hero.png",
    description:
      "Budget-friendly EU degrees with a fast-growing international student community.",
  },
  {
    name: "Italy",
    slug: "italy",
    flagCode: "IT",
    image: "/italy.png",
    description:
      "Historic universities, 800+ English-taught programmes and low public tuition with regional scholarships.",
  },
  {
    name: "Norway",
    slug: "norway",
    flagCode: "NO",
    image: "/norway.png",
    description:
      "High-quality, research-led Master's programmes in one of the world's safest and best-paid economies.",
  },
];

export default function DreamDestinations() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20">
      <div className="mx-auto container">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#1366E0]">Destinations</p>
            <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl">
              Explore Top Study Destinations
            </h2>
          </div>

          <Link
            href="/courses"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#1366E0] bg-white px-6 py-3 text-sm font-semibold text-[#1366E0] transition-colors hover:bg-[#1366E0] hover:text-white">
            Browse All Programmes
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {destinations.map((destination) => (
            <Link
              key={destination.slug}
              href={`/countries/${destination.slug}`}
              title={destination.description}
              className="group relative block aspect-[4/3] overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-lg">
              <Image
                src={destination.image}
                alt={`Study in ${destination.name}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 17vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B3D]/80 via-[#0F1B3D]/10 to-transparent" />
              <span className="absolute bottom-3 left-3 flex items-center gap-2 text-sm font-semibold text-white sm:text-base">
                <span className="flex overflow-hidden rounded-[3px] shadow-md ring-1 ring-white/80">
                  <ReactCountryFlag
                    countryCode={destination.flagCode}
                    svg
                    title={destination.name}
                    aria-label={`Flag of ${destination.name}`}
                    style={{ width: "1.5em", height: "1.1em", display: "block", objectFit: "cover" }}
                  />
                </span>
                {destination.name}
              </span>
            </Link>
          ))}

          <div className="col-span-full flex items-center justify-center gap-4 rounded-2xl bg-[#EEF5FE] px-6 py-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#1366E0]" aria-hidden>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
              <path
                d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-base font-medium text-[#1366E0] sm:text-lg">And expanding European and other destinations.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
