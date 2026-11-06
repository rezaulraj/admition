
import Image from "next/image";

// Place your logo images at, e.g.:
// /public/partners/macquarie.png
// /public/partners/la-trobe.png
// /public/partners/deakin.png
// /public/partners/curtin.png
// /public/partners/wollongong.png
// /public/partners/victoria.png
// /public/partners/charles-darwin.png
// /public/partners/memorial.png

const rowOne = [
  { name: "Macquarie University", logo: "/macquarie_university.webp" },
  { name: "La Trobe University", logo: "/la_trobe_university.webp" },
  { name: "Deakin University", logo: "/deakin_university.webp" },
  { name: "Curtin University", logo: "/curtin_university.webp" },
];

const rowTwo = [
  { name: "University Of Wollongong", logo: "/wollongong.webp" },
  { name: "Victoria University", logo: "/victoria.webp" },
  { name: "Charles Darwin University", logo: "/charles-darwin.webp" },
  {
    name: "Memorial University Of Newfoundland",
    logo: "/memorial.webp",
  },
];

function LogoCard({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="mx-3 flex h-40 w-56 shrink-0 flex-col items-center justify-center gap-4 rounded-2xl border border-[#ECECEC] bg-white px-6 py-5 shadow-sm">
      <div className="relative h-12 w-full">
        <Image
          src={logo}
          alt={name}
          fill
          sizes="200px"
          className="object-contain"
        />
      </div>
      <span className="text-center text-sm font-semibold text-[#1B1B1B]">
        {name}
      </span>
    </div>
  );
}

export default function PartnerInstitutions() {
  return (
    <section className="w-full overflow-hidden bg-[#FFFEFA] py-20">
      <div className="mx-auto container px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl">
          Our Partner <span className="text-[#1366E0]">Institutions</span>
        </h2>
        <p className="mt-3 text-sm font-semibold text-zinc-700 sm:text-base">
          Unlock your future with world-class universities
        </p>
      </div>

      <div className="relative mt-14 flex flex-col gap-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#FFFEFA] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#FFFEFA] to-transparent" />

        <div className="flex w-max animate-[scroll-left_28s_linear_infinite]">
          {[...rowOne, ...rowOne].map((item, i) => (
            <LogoCard
              key={`${item.name}-${i}`}
              name={item.name}
              logo={item.logo}
            />
          ))}
        </div>

        <div className="flex w-max animate-[scroll-right_28s_linear_infinite]">
          {[...rowTwo, ...rowTwo].map((item, i) => (
            <LogoCard
              key={`${item.name}-${i}`}
              name={item.name}
              logo={item.logo}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
