import Image from "next/image";

// Place your badge images at:
// /public/icef-badge.png
// /public/airc-badge.png

const badges = [
  { src: "/icef-badge.png", alt: "ICEF Accredited Agency" },
  { src: "/airc-badge.png", alt: "AIRC Certified Recruitment Council" },
];

export default function Accreditations() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-10">
      <div className="mx-auto container">
        <div className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-[#ECECEC] bg-white px-8 py-8 shadow-sm sm:flex-row sm:gap-6">
          <h2 className="text-xl max-w-md font-semibold leading-snug text-[#1366E0] sm:text-4xl">
            Our Accreditations &amp; Memberships
          </h2>

          <div className="flex items-center gap-8">
            {badges.map((badge) => (
              <div
                key={badge.alt}
                className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20"
              >
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
