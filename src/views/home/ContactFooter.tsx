import Image from "next/image";
import Link from "next/link";

// Card images in /public – the full image is shown, nothing is cropped:
//   /studentcta.png
//   /institutoncta.png
//   /recruitmentpartner.png
//
// ⚠️ Check these links match your page routes.

type Card = {
  cta: string;
  href: string;
  image: string;
  alt: string;
  accent: string;
  button: "outline" | "solid" | "soft";
};

const cards: Card[] = [
  {
    cta: "Learn more",
    href: "/contact",
    image: "/student_us.png",
    alt: "For Students – free guidance and global opportunities",
    accent: "#2563EB",
    button: "outline",
  },
  {
    cta: "Partner with us",
    href: "/institution-partner#institution-form",
    image: "/forinstutite.png",
    alt: "For Institutions – quality recruitment and strategic growth",
    accent: "#C98A1B",
    button: "soft",
  },
  {
    cta: "Join our network",
    href: "/recruitment-partner",
    image: "/recruitmentpart.png",
    alt: "For Recruitment Partners – stronger partnerships and greater opportunities",
    accent: "#7A4FBF",
    button: "solid",
  },
];

function buttonStyle(card: Card) {
  if (card.button === "solid") {
    return {
      className: "text-white shadow-lg hover:brightness-110",
      style: { backgroundColor: card.accent },
    };
  }
  if (card.button === "soft") {
    return {
      className: "text-[#1B1B1B] shadow-md hover:brightness-95",
      style: {
        backgroundColor: "#FBE7BF",
        border: `1px solid ${card.accent}80`,
      },
    };
  }
  return {
    className: "bg-white shadow-md hover:bg-[#F5F8FF]",
    style: { color: card.accent, border: `1.5px solid ${card.accent}` },
  };
}

export default function ContactFooter() {
  return (
    <section className="w-full bg-[#FFFEFA] px-4 py-16 sm:px-6">
      <div className="mx-auto container">
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => {
            const btn = buttonStyle(card);
            return (
              <li
                key={card.href}
                className="group relative overflow-hidden rounded-[1.75rem] bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 py-4"
              >
                {/* Full image – keeps its own shape, nothing cropped */}
                <Image
                  src={card.image}
                  alt={card.alt}
                  width={948}
                  height={445}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Button sits below the image – overlaid, it covers the image's bullet list */}
                <div className="relative px-4 pt-3">
                  <Link
                    href={card.href}
                    className={`group/btn inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${btn.className}`}
                    style={btn.style}
                  >
                    {card.cta}
                    <svg
                      className="h-4 w-4 transition-transform group-hover/btn:translate-x-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14m0 0-6-6m6 6-6 6"
                      />
                    </svg>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
