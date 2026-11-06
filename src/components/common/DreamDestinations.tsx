"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

/**
 * Card heights per row inside each column ([mobile, desktop] in rem), so the columns stagger like a
 * masonry wall. Passed as CSS variables so they never depend on Tailwind picking up generated class names.
 */
const HEIGHTS: [number, number][][] = [
  [[16, 34], [16, 24], [16, 29], [16, 22]],
  [[16, 24], [16, 36], [16, 22], [16, 28]],
  [[16, 30], [16, 22], [16, 34], [16, 24]],
];

/** How far each column drifts while the grid passes through the screen (px, desktop / mobile) */
const COLUMN_SPEED = [
  { lg: 120, sm: 0 },
  { lg: -150, sm: 0 },
  { lg: 170, sm: 0 },
];

const ArrowIcon = ({ className = "size-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function DestinationCard({ d, index, height }: { d: Destination; index: number; height: [number, number] }) {
  return (
    <Link
      href={`/countries/${d.slug}`}
      data-dest
      title={d.description}
      style={{ "--h": `${height[0]}rem`, "--h-lg": `${height[1]}rem` } as CSSProperties}
      className="dd-card group relative block overflow-hidden rounded-[2rem] bg-[#EEF3FF] shadow-[0_30px_60px_-34px_rgba(20,33,61,0.6)]">
      {/* Photo with its own inner parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div data-parallax className="absolute inset-x-0 -inset-y-[6%]">
          <Image
            src={d.image}
            alt={`Study in ${d.name}`}
            fill
            sizes="(max-width: 1024px) 50vw, 33vw"
            quality={90}
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
          />
        </div>
      </div>
      {/* Light gradient so the label always reads */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0F1B3D]/45 to-transparent" />
      {/* Number + arrow */}
      <span className="absolute left-4 top-4 z-10 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-bold text-[#14213D] shadow-sm backdrop-blur">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-white/85 text-[#14213D] shadow-sm backdrop-blur transition-all duration-300 group-hover:-rotate-45 group-hover:bg-[#F7931E] group-hover:text-white">
        <ArrowIcon />
      </span>

      {/* Name + description (description opens on hover) */}
      <div className="dd-label absolute z-10 rounded-[1.4rem] bg-white/90 text-[#14213D] shadow-[0_14px_34px_-14px_rgba(20,33,61,0.5)] backdrop-blur-md">
        <span className="flex items-center gap-3">
          <span className="flex shrink-0 overflow-hidden rounded-[5px] shadow-sm ring-1 ring-black/10">
            <ReactCountryFlag
              countryCode={d.flagCode}
              svg
              title={d.name}
              aria-label={`Flag of ${d.name}`}
              style={{ width: "1.9em", height: "1.35em", display: "block", objectFit: "cover" }}
            />
          </span>
          <span className="dd-name min-w-0 flex-1 truncate font-display font-semibold tracking-[-0.02em]">{d.name}</span>
          <span className="hidden shrink-0 items-center gap-1 text-xs font-semibold text-[#2F6BFF] transition-transform duration-300 group-hover:translate-x-0.5 sm:inline-flex">
            Explore
            <ArrowIcon className="size-3.5" />
          </span>
        </span>
        <span className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
          <span className="overflow-hidden">
            <span className="mt-2 block text-sm leading-relaxed text-[#4A5268]">{d.description}</span>
          </span>
        </span>
      </div>
    </Link>
  );
}

export default function DreamDestinations() {
  const root = useRef<HTMLElement>(null);

  // Deal the destinations round-robin into 3 big columns (phones flow them into a 2-up grid via CSS)
  const columns = [0, 1, 2].map((c) => destinations.map((d, i) => ({ d, i })).filter(({ i }) => i % 3 === c));

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add(
      { isDesktop: "(min-width: 1024px)", motionOK: "(prefers-reduced-motion: no-preference)" },
      (ctx) => {
        const { isDesktop, motionOK } = ctx.conditions as { isDesktop: boolean; motionOK: boolean };
        if (!motionOK) return;
        const grid = q("[data-grid]")[0] as HTMLElement;

        // Heading
        gsap
          .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: el, start: "top 78%", once: true } })
          .fromTo(q("[data-eyebrow]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
          .fromTo(q("[data-word]"), { autoAlpha: 0, yPercent: 110, rotate: 4 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.06 }, 0.1)
          .fromTo(q("[data-cta]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.45);

        // Columns drift at different speeds and directions → layered parallax wall (desktop only)
        (q("[data-col]") as HTMLElement[]).forEach((col, c) => {
          const speed = isDesktop ? COLUMN_SPEED[c].lg : COLUMN_SPEED[c].sm;
          if (!speed) return;
          gsap.fromTo(
            col,
            { y: speed },
            { y: -speed, ease: "none", scrollTrigger: { trigger: grid, start: "top bottom", end: "bottom top", scrub: 1.2 } },
          );
        });

        // Photos drift inside their frames (opposite to their column for extra depth)
        (q("[data-parallax]") as HTMLElement[]).forEach((img) =>
          gsap.fromTo(
            img,
            { yPercent: -5 },
            { yPercent: 5, ease: "none", scrollTrigger: { trigger: img.closest("[data-dest]"), start: "top bottom", end: "bottom top", scrub: 1 } },
          ),
        );

        // Cards wipe up into view as they arrive — no opacity fade, so photos stay fully solid
        const cards = q("[data-dest]") as HTMLElement[];
        gsap.set(cards, { clipPath: "inset(28% 0% 0% 0% round 28px)" });
        ScrollTrigger.batch(cards, {
          start: "top 95%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              clipPath: "inset(0% 0% 0% 0% round 28px)",
              duration: 1.1,
              stagger: 0.08,
              ease: "expo.out",
              clearProps: "clipPath",
            }),
        });

        // Giant outlined words slide in opposite directions behind the wall
        (q("[data-bigword]") as HTMLElement[]).forEach((w, k) =>
          gsap.fromTo(
            w,
            { xPercent: k % 2 ? -30 : 10 },
            { xPercent: k % 2 ? 0 : -25, ease: "none", scrollTrigger: { trigger: grid, start: "top bottom", end: "bottom top", scrub: 1.4 } },
          ),
        );

        // Banner
        gsap.fromTo(
          q("[data-banner]"),
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: q("[data-banner]")[0], start: "top 92%", once: true } },
        );
        gsap.to(q("[data-globe]"), { rotate: 360, duration: 24, ease: "none", repeat: -1 });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="dd relative w-full overflow-hidden bg-[#FFFEFA] px-6 py-20 sm:py-28">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .dd [data-eyebrow], .dd [data-word], .dd [data-cta], .dd [data-banner] { visibility: hidden; }
        }
        /* Layout kept here so it never depends on Tailwind generating new class names */
        .dd .dd-grid { position: relative; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; margin-top: 3rem; }
        .dd .dd-col { display: contents; }
        .dd .dd-card { height: var(--h); }
        .dd .dd-label { left: 0.6rem; right: 0.6rem; bottom: 0.6rem; padding: 0.65rem 0.8rem; }
        .dd .dd-name { font-size: 1rem; }
        .dd .dd-title { font-size: clamp(2.3rem, 7vw, 3rem); }
        .dd .dd-bigwords { display: none; }
        @media (min-width: 1024px) {
          .dd .dd-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.75rem; margin-top: 4rem; padding: 7rem 0; }
          .dd .dd-col { display: flex; flex-direction: column; gap: 1.75rem; will-change: transform; }
          .dd .dd-col:nth-child(2) { padding-top: 6rem; }
          .dd .dd-card { height: var(--h-lg); }
          .dd .dd-label { left: 1.1rem; right: 1.1rem; bottom: 1.1rem; padding: 1rem 1.25rem; }
          .dd .dd-name { font-size: 1.5rem; }
          .dd .dd-title { font-size: clamp(3rem, 5vw, 4.75rem); }
          .dd .dd-bigwords { display: block; }
        }
        .dd .dd-outline { -webkit-text-stroke: 1.5px rgba(20, 33, 61, 0.09); color: transparent; }
      `}</style>

      {/* Soft background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/3 size-[28rem] rounded-full bg-[#2F6BFF]/[0.07] blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 size-[28rem] rounded-full bg-[#F7931E]/[0.08] blur-3xl" />
      </div>

      <div className="container relative mx-auto">
        {/* Heading */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span data-eyebrow className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-[#2F6BFF]">
              <span className="h-3.5 w-4 bg-[#2F6BFF] [clip-path:polygon(0_0,65%_0,100%_50%,65%_100%,0_100%)]" />
              Destinations
            </span>
            <h2 className="dd-title font-display mt-3 font-semibold leading-[1.02] tracking-[-0.04em] text-[#14213D]">
              {["Explore", "top", "study"].map((w) => (
                <span key={w} className="mr-[0.24em] inline-block overflow-hidden pb-[0.08em] align-top">
                  <span data-word className="inline-block">
                    {w}
                  </span>
                </span>
              ))}
              <span className="inline-block overflow-hidden pb-[0.08em] align-top">
                <span data-word className="inline-block text-[#F7931E]">
                  destinations
                </span>
              </span>
            </h2>
          </div>

          <Link
            data-cta
            href="/courses"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#2F6BFF] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2F6BFF]/25 transition-[translate,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#1E4FD6]">
            Browse all programmes
            <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Parallax masonry wall */}
        <div data-grid className="dd-grid">
          {/* Giant outlined words drifting behind the cards (desktop) */}
          <div aria-hidden className="dd-bigwords pointer-events-none absolute inset-0 overflow-hidden">
            <p data-bigword className="dd-outline font-display absolute left-0 whitespace-nowrap font-bold leading-none tracking-[-0.04em]" style={{ top: "18%", fontSize: "14vw" }}>
              Study abroad · Study abroad
            </p>
            <p data-bigword className="dd-outline font-display absolute left-0 whitespace-nowrap font-bold leading-none tracking-[-0.04em]" style={{ top: "62%", fontSize: "14vw" }}>
              Your future · Your future
            </p>
          </div>
          {columns.map((col, c) => (
            <div key={c} data-col className="dd-col">
              {col.map(({ d, i }, row) => (
                <DestinationCard key={d.slug} d={d} index={i} height={HEIGHTS[c][row % 4]} />
              ))}
            </div>
          ))}
        </div>

        {/* Expanding banner */}
        <div
          data-banner
          className="relative mt-10 flex items-center justify-center gap-4 overflow-hidden rounded-[1.75rem] bg-[linear-gradient(120deg,#EEF3FF,#FFF3E6)] px-6 py-7">
          <svg data-globe width="40" height="40" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#2F6BFF]" aria-hidden>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
          <p className="font-display text-base font-semibold text-[#14213D] sm:text-xl">
            And expanding <span className="text-[#F7931E]">European</span> and other destinations.
          </p>
        </div>
      </div>
    </section>
  );
}
