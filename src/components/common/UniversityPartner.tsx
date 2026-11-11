"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);


type University = {
  slug: string;
  name: string;
  country: string;
  initials: string;
  color: string;
  logo: string;
  note?: string;
  image?: string;
};

const countries = [
  { name: "United Kingdom", code: "GB" },
  { name: "Australia", code: "AU" },
  { name: "Canada", code: "CA" },
  { name: "New Zealand", code: "NZ" },
  { name: "Finland", code: "FI" },
  { name: "Greece", code: "GR" },
  { name: "Lithuania", code: "LT" },
  { name: "Hungary", code: "HU" },
  { name: "Romania", code: "RO" },
  { name: "Malta", code: "MT" },
  { name: "Cyprus", code: "CY" },
  { name: "Italy", code: "IT" },
  { name: "Norway", code: "NO" },
] as const;

const universities: University[] = [
  {
    slug: "bpp-university",
    name: "BPP University",
    country: "United Kingdom",
    initials: "BP",
    color: "#2F5DA8",
    logo: "/univercity-logo/bpp.jpg",
  },
  {
    slug: "university-of-hertfordshire",
    name: "University of Hertfordshire",
    country: "United Kingdom",
    initials: "UH",
    color: "#1366E0",
    logo: "/univercity-logo/uh.jpg",
  },
  {
    slug: "university-of-law",
    name: "University of Law",
    country: "United Kingdom",
    initials: "UL",
    color: "#1B1B1B",
    note: "Except Business Course",
    logo: "/univercity-logo/low.png",
  },
  {
    slug: "university-of-chester",
    name: "University of Chester",
    country: "United Kingdom",
    initials: "UC",
    color: "#2F9E5C",
    note: "Except Sylhet",
    logo: "/univercity-logo/uoc.png",
  },
  {
    slug: "london-south-bank-university",
    name: "London South Bank University",
    country: "United Kingdom",
    initials: "LS",
    color: "#F58B0F",
    note: "Except Sylhet, Except Business Course",
    logo: "/univercity-logo/lsbu.jpg",
  },
  {
    slug: "aston-university-london",
    name: "Aston University, London",
    country: "United Kingdom",
    initials: "AL",
    color: "#1366E0",
    note: "Except Sylhet",
    logo: "/univercity-logo/aul.png",
  },
  {
    slug: "university-of-hull-london",
    name: "University of Hull - London",
    country: "United Kingdom",
    initials: "HL",
    color: "#2F5DA8",
    note: "Except Sylhet",
    logo: "/univercity-logo/uoh.png",
  },
  {
    slug: "regent-college-london",
    name: "Regent College London",
    country: "United Kingdom",
    initials: "RC",
    color: "#1B1B1B",
    note: "Except UG",
    logo: "/univercity-logo/rcl.png",
  },
  {
    slug: "university-of-bedfordshire",
    name: "University of Bedfordshire",
    country: "United Kingdom",
    initials: "UB",
    color: "#1366E0",
    note: "Except Sylhet",
    logo: "/univercity-logo/uob.png",
  },
  {
    slug: "anglia-ruskin-university",
    name: "Anglia Ruskin University",
    country: "United Kingdom",
    initials: "AR",
    color: "#2F9E5C",
    note: "UG Sylhet Restricted",
    logo: "/univercity-logo/aru.jpg",
  },
  {
    slug: "university-of-brighton",
    name: "University of Brighton",
    country: "United Kingdom",
    initials: "BR",
    color: "#F58B0F",
    logo: "/univercity-logo/uobb.jpg",
  },
  {
    slug: "university-of-south-wales",
    name: "University of South Wales",
    country: "United Kingdom",
    initials: "SW",
    color: "#1366E0",
    logo: "/univercity-logo/uosw.png",
  },
  {
    slug: "aston-university-birmingham",
    name: "Aston University, Birmingham",
    country: "United Kingdom",
    initials: "AB",
    color: "#2F5DA8",
    logo: "/univercity-logo/aub.jpg",
  },
  {
    slug: "cardiff-metropolitan-university",
    name: "Cardiff Metropolitan University",
    country: "United Kingdom",
    initials: "CM",
    color: "#1B1B1B",
    note: "Full Deposit for Sylhet",
    logo: "/univercity-logo/cfu.jpg",
  },
  {
    slug: "canterbury-christ-church-university",
    name: "Canterbury Christ Church University",
    country: "United Kingdom",
    initials: "CC",
    color: "#2F9E5C",
    note: "Except UG",
    logo: "/univercity-logo/cccu.png",
  },
  {
    slug: "uws-london-campus",
    name: "UWS - London Campus",
    country: "United Kingdom",
    initials: "UW",
    color: "#F58B0F",
    logo: "/univercity-logo/uws.jpg",
  },
  {
    slug: "aberystwyth-university",
    name: "Aberystwyth University",
    country: "United Kingdom",
    initials: "AY",
    color: "#1366E0",
    logo: "/univercity-logo/au.jpg",
  },
  {
    slug: "university-of-hartpury",
    name: "University of Hartpury",
    country: "United Kingdom",
    initials: "HP",
    color: "#2F5DA8",
    logo: "/univercity-logo/uoh.png",
  },
  //   {
  //     slug: "atlantis-college",
  //     name: "Atlantis College",
  //     country: "Cyprus",
  //     initials: "AT",
  //     color: "#1B1B1B",
  //     logo: "/univercity-logo/aui.png",
  //   },
  //   {
  //     slug: "american-university-of-cyprus",
  //     name: "American University of Cyprus",
  //     country: "Cyprus",
  //     initials: "AC",
  //     color: "#2F9E5C",
  //     logo: "/univercity-logo/auc.png",
  //   },
  // {
  //   slug: "john-von-neumann-university",
  //   name: "John von Neumann University",
  //   country: "Hungary",
  //   initials: "JV",
  //   color: "#F58B0F",
  //   logo: "/univercity-logo/jvnu.png",
  // },
  {
    slug: "training-three-sixty",
    name: "Training Three Sixty",
    country: "Malta",
    initials: "T3",
    color: "#1366E0",
    logo: "/univercity-logo/tts.png",
  },
  {
    slug: "thinktalent",
    name: "ThinkTalent",
    country: "Malta",
    initials: "TT",
    color: "#2F5DA8",
    logo: "/univercity-logo/thinktalent.webp",
  },
  {
    slug: "learnkey-institute",
    name: "LearnKey Institute",
    country: "Malta",
    initials: "LK",
    color: "#F58B0F",
    logo: "/univercity-logo/learnkeyinstutie.png",
  },
  {
    slug: "malta-leadership-institute",
    name: "Malta Leadership Institute",
    country: "Malta",
    initials: "ML",
    color: "#E4572E",
    logo: "/univercity-logo/mli.svg",
  },
  {
    slug: "ascencia-malta",
    name: "Ascencia Malta",
    country: "Malta",
    initials: "AM",
    color: "#CD0731",
    logo: "/univercity-logo/Ascencia-Malta-Logo.svg",
  },
];

/** How many cards to show before the "Explore more" button */
const MAX_CARDS = 6;

const WHATSAPP_URL = `https://wa.me/8801602065622?text=${encodeURIComponent(
  "Hi Admission OnBoard, I'd like to know about universities in ",
)}`;

function Flag({ code }: { code: string }) {
  return (
    <ReactCountryFlag
      countryCode={code}
      svg
      aria-hidden
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        objectFit: "cover",
      }}
    />
  );
}

function Logo({ uni }: { uni: University }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className="grid h-full w-full place-items-center text-lg font-bold text-white"
        style={{ backgroundColor: uni.color }}
      >
        {uni.initials}
      </span>
    );
  }

  return (
    <Image
      src={uni.logo}
      alt={`${uni.name} logo`}
      width={160}
      height={80}
      className="h-full w-full object-contain p-2"
      onError={() => setFailed(true)}
    />
  );
}

export type PartnerCountry = (typeof countries)[number]["name"];

type UniversityPartnerProps = {
  /** Country to show first, e.g. <UniversityPartner country="Australia" /> on the Australia page */
  country?: PartnerCountry;
  /** Hide the country tabs and show only this country's universities */
  hideTabs?: boolean;
};

/** Every partner logo once, for the sliding strip */
const marqueeLogos = universities.filter((u, i, all) => all.findIndex((x) => x.logo === u.logo) === i);

const ArrowIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6" />
  </svg>
);

export default function UniversityPartner({
  country = "United Kingdom",
  hideTabs = false,
}: UniversityPartnerProps) {
  const [active, setActive] = useState<string>(country);
  const root = useRef<HTMLElement>(null);
  /** True once the visitor has clicked a tab (vs. the first render) */
  const switched = useRef(false);

  const activeCountry = countries.find((c) => c.name === active)!;
  const list = universities.filter((u) => u.country === active);
  const shown = list.slice(0, MAX_CARDS);
  const countFor = (name: string) => universities.filter((u) => u.country === name).length;

  /* ---------- Section-level motion (once) ---------- */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: el, start: "top 75%", once: true } })
        .fromTo(q("[data-eyebrow]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
        .fromTo(q("[data-word]"), { autoAlpha: 0, yPercent: 110, rotate: 4 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.06 }, 0.1)
        .fromTo(q("[data-squiggle]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1, ease: "power2.inOut" }, 0.7)
        .fromTo(q("[data-sub]"), { autoAlpha: 0, y: 16, filter: "blur(6px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9 }, 0.5)
        .fromTo(q("[data-marquee]"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.6)
        .fromTo(q("[data-tab]"), { autoAlpha: 0, y: 18, scale: 0.9 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.035, ease: "back.out(1.8)" }, 0.75);

      // Endless logo strip; eases down to a crawl while hovered
      const track = q("[data-marquee-track]")[0] as HTMLElement | undefined;
      if (track) {
        const loop = gsap.to(track, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
        const wrap = q("[data-marquee]")[0] as HTMLElement;
        const slow = () => gsap.to(loop, { timeScale: 0.2, duration: 0.6 });
        const fast = () => gsap.to(loop, { timeScale: 1, duration: 0.6 });
        wrap.addEventListener("pointerenter", slow);
        wrap.addEventListener("pointerleave", fast);
        return () => {
          wrap.removeEventListener("pointerenter", slow);
          wrap.removeEventListener("pointerleave", fast);
        };
      }
    });

    return () => mm.revert();
  }, []);

  /* ---------- Active-tab highlight slides between tabs ---------- */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el || hideTabs) return;
    const indicator = el.querySelector<HTMLElement>("[data-indicator]");
    const place = (animate: boolean) => {
      const tab = el.querySelector<HTMLElement>(`[data-tab][aria-selected="true"]`);
      if (!indicator || !tab) return;
      const vars = { x: tab.offsetLeft, y: tab.offsetTop, width: tab.offsetWidth, height: tab.offsetHeight };
      if (animate) gsap.to(indicator, { ...vars, duration: 0.55, ease: "power3.out" });
      else gsap.set(indicator, vars);
    };
    place(switched.current);
    const onResize = () => place(false);
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(() => place(false));
    return () => window.removeEventListener("resize", onResize);
  }, [active, hideTabs]);

  /* ---------- Cards: rise in on scroll, replay on every tab change, 3D tilt on hover ---------- */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();
    const isFirst = !switched.current;

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = q("[data-card]");
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 60, rotateX: -14, scale: 0.95, transformPerspective: 900, filter: "blur(4px)" },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.08,
          ease: "expo.out",
          clearProps: "filter",
          ...(isFirst ? { scrollTrigger: { trigger: q("[data-panel]")[0], start: "top 85%", once: true } } : {}),
        },
      );
      gsap.fromTo(
        q("[data-cta]"),
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          delay: isFirst ? 0 : 0.35,
          ease: "expo.out",
          ...(isFirst ? { scrollTrigger: { trigger: q("[data-panel]")[0], start: "top 60%", once: true } } : {}),
        },
      );
    });

    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const offs = (q("[data-tilt]") as HTMLElement[]).map((card) => {
        const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
        const glare = card.querySelector<HTMLElement>("[data-glare]");
        gsap.set(card, { transformPerspective: 1000 });
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          ry((px - 0.5) * 10);
          rx((0.5 - py) * 8);
          if (glare) gsap.to(glare, { autoAlpha: 1, x: (px - 0.5) * r.width, y: (py - 0.5) * r.height, duration: 0.4 });
        };
        const leave = () => {
          rx(0);
          ry(0);
          if (glare) gsap.to(glare, { autoAlpha: 0, duration: 0.5 });
        };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        return () => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        };
      });
      return () => offs.forEach((off) => off());
    });

    return () => mm.revert();
  }, [active]);

  const headline = ["Our", "university", "partners"];

  return (
    <section ref={root} className="uni-partners relative w-full overflow-hidden bg-[#FFFEFA] px-6 py-20 sm:py-24">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .uni-partners [data-eyebrow], .uni-partners [data-word], .uni-partners [data-sub],
          .uni-partners [data-marquee], .uni-partners [data-tab], .uni-partners [data-card], .uni-partners [data-cta] { visibility: hidden; }
        }
      `}</style>

      {/* Soft background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-24 size-[26rem] rounded-full bg-[#2F6BFF]/[0.07] blur-3xl" />
        <div className="absolute -right-40 bottom-10 size-[26rem] rounded-full bg-[#F7931E]/[0.08] blur-3xl" />
      </div>

      <div className="container relative mx-auto max-w-6xl min-[120rem]:max-w-[var(--page-inner)]">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span data-eyebrow className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-[#2F6BFF]">
            <span className="h-3.5 w-4 bg-[#2F6BFF] [clip-path:polygon(0_0,65%_0,100%_50%,65%_100%,0_100%)]" />
            Trusted partners
          </span>
          <h2 className="font-display mt-4 text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.035em] text-[#350C0E] sm:text-5xl lg:text-[3.6rem]">
            {headline.map((w) => (
              <span key={w} className="mr-[0.24em] inline-block overflow-hidden pb-[0.08em] align-top">
                <span data-word className="inline-block">
                  {w}
                </span>
              </span>
            ))}
            <br />
            <span className="relative inline-block">
              <span className="inline-block overflow-hidden pb-[0.12em] align-top">
                <span data-word className="inline-block text-[#F7931E]">
                  {hideTabs ? `in ${active}` : "around the world"}
                </span>
              </span>
              <svg
                aria-hidden
                viewBox="0 0 300 20"
                preserveAspectRatio="none"
                className="absolute -bottom-[0.18em] left-0 h-[0.28em] w-full overflow-visible">
                <path
                  data-squiggle
                  d="M3 12 C 40 4, 70 18, 110 9 S 180 4, 210 12 S 260 16, 297 6"
                  fill="none"
                  stroke="#F7931E"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p data-sub className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[#4A5268] sm:text-base">
            {hideTabs
              ? `Explore the universities and colleges we work with in ${active}, then view their courses.`
              : "Choose a destination to see the universities and colleges we work with, then explore their courses."}
          </p>
        </div>

        {/* Sliding logo strip */}
        {!hideTabs && (
          <div
            data-marquee
            aria-hidden
            className="relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <div data-marquee-track className="flex w-max gap-4">
              {[...marqueeLogos, ...marqueeLogos].map((uni, i) => (
                <span
                  key={`${uni.slug}-${i}`}
                  className="flex h-16 w-36 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#ECECEC] bg-white grayscale transition duration-300 hover:grayscale-0 sm:h-[4.5rem] sm:w-40">
                  <Logo uni={uni} />
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Country tabs with a sliding highlight */}
        {!hideTabs && (
          <div role="tablist" aria-label="Study destinations" className="relative mt-10 flex flex-wrap justify-center gap-2.5">
            <span
              data-indicator
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 rounded-full bg-gradient-to-r from-[#2F6BFF] to-[#1E4FD6] shadow-lg shadow-[#2F6BFF]/30"
            />
            {countries.map((c) => {
              const isActive = c.name === active;
              const count = countFor(c.name);
              return (
                <button
                  key={c.code}
                  type="button"
                  role="tab"
                  data-tab
                  aria-selected={isActive}
                  onClick={() => {
                    switched.current = true;
                    setActive(c.name);
                  }}
                  className={`relative inline-flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3.5 text-sm font-semibold transition-[color,border-color,background-color,translate] duration-300 ${
                    isActive
                      ? "border-transparent bg-transparent text-white"
                      : "border-[#E5E5E5] bg-white text-[#350C0E] hover:-translate-y-0.5 hover:border-[#2F6BFF]/50 hover:shadow-md"
                  }`}>
                  <span className={`flex h-6 w-6 shrink-0 overflow-hidden rounded-full ${isActive ? "ring-2 ring-white" : "ring-1 ring-black/10"}`}>
                    <Flag code={c.code} />
                  </span>
                  {c.name}
                  {count > 0 && (
                    <span
                      className={`grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-bold ${
                        isActive ? "bg-white/25 text-white" : "bg-[#F4EFE6] text-[#6B6B6B]"
                      }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Cards */}
        <div data-panel role="tabpanel" aria-label={`${active} partners`} key={active} className="mt-12">
          {shown.length > 0 ? (
            <>
              <ul className="grid grid-cols-1 gap-6 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((uni) => (
                  <li key={uni.slug} data-card>
                    <Link
                      href={`/courses?university=${uni.slug}`}
                      data-tilt
                      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#ECECEC] bg-white shadow-[0_20px_45px_-30px_rgba(20,33,61,0.35)] transition-shadow duration-500 hover:shadow-[0_35px_60px_-30px_rgba(20,33,61,0.45)]">
                      {/* Glare that follows the pointer */}
                      <span
                        data-glare
                        aria-hidden
                        className="pointer-events-none invisible absolute left-1/2 top-1/2 z-20 -ml-32 -mt-32 size-64 rounded-full bg-white/50 blur-3xl"
                      />
                      {/* Colour accent bar */}
                      <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-1.5" style={{ background: uni.color }} />

                      {/* Logo panel */}
                      <div className="relative aspect-[16/9] overflow-hidden" style={{ background: `linear-gradient(160deg, ${uni.color}14, ${uni.color}05)` }}>
                        {uni.image ? (
                          <>
                            <Image
                              src={uni.image}
                              alt={`${uni.name} campus`}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                          </>
                        ) : (
                          <>
                            <div
                              aria-hidden
                              className="absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
                              style={{ backgroundImage: `radial-gradient(circle at 1px 1px, ${uni.color}33 1px, transparent 0)`, backgroundSize: "18px 18px" }}
                            />
                            <span
                              aria-hidden
                              className="absolute -right-10 -top-10 size-40 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                              style={{ background: uni.color }}
                            />
                          </>
                        )}

                        <span className="absolute left-4 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#350C0E] shadow-sm backdrop-blur-md">
                          <span className="relative flex size-1.5">
                            <span className="absolute inline-flex size-full animate-ping rounded-full opacity-60" style={{ background: uni.color }} />
                            <span className="relative inline-flex size-1.5 rounded-full" style={{ background: uni.color }} />
                          </span>
                          Official partner
                        </span>

                        <div
                          className={`absolute left-1/2 flex h-20 w-44 -translate-x-1/2 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_14px_30px_-14px_rgba(20,33,61,0.35)] ring-1 ring-black/5 transition-transform duration-500 group-hover:scale-110 ${
                            uni.image ? "-bottom-10" : "top-1/2 -translate-y-1/2"
                          }`}>
                          <Logo uni={uni} />
                        </div>
                      </div>

                      {/* Body */}
                      <div className={`flex flex-1 flex-col items-center px-6 pb-6 text-center ${uni.image ? "pt-14" : "pt-6"}`}>
                        <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-[#350C0E] sm:text-xl">{uni.name}</h3>
                        <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-[#6B6B6B]">
                          <span className="flex h-4 w-4 overflow-hidden rounded-full ring-1 ring-black/10">
                            <Flag code={activeCountry.code} />
                          </span>
                          {uni.country}
                        </p>

                        {uni.note && (
                          <p className="mt-3 rounded-full bg-[#2F6BFF]/10 px-3 py-1 text-[11px] font-semibold text-[#2F6BFF]">{uni.note}</p>
                        )}

                        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-[#350C0E] transition-colors group-hover:text-[#2F6BFF]">
                          View courses
                          <span className="grid size-7 place-items-center rounded-full bg-[#14213D] text-white transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#2F6BFF]">
                            <ArrowIcon className="h-3.5 w-3.5" />
                          </span>
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              <div data-cta className="mt-12 flex justify-center">
                <Link
                  href="/universities"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#14213D] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#14213D]/25 transition-[translate,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#2F6BFF]">
                  {list.length > MAX_CARDS ? `Explore all ${list.length} ${active} institutions` : `Explore all universities`}
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </>
          ) : (
            /* No partners listed yet for this country */
            <div
              data-card
              className="mx-auto flex max-w-xl flex-col items-center rounded-[1.75rem] border border-dashed border-[#2F6BFF]/30 bg-white px-6 py-14 text-center">
              <span className="flex h-14 w-14 overflow-hidden rounded-full shadow-md ring-4 ring-[#FFFEFA]">
                <Flag code={activeCountry.code} />
              </span>
              <h3 className="font-display mt-5 text-xl font-semibold text-[#350C0E]">{active} partners coming soon</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#6B6B6B]">
                We&apos;re adding our {active} universities here. Our counsellors can already help you find the right course and apply.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`${WHATSAPP_URL}${encodeURIComponent(active)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2F6BFF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2F6BFF]/30 transition-[translate,background-color] hover:-translate-y-0.5 hover:bg-[#1E4FD6]">
                  Ask a counsellor
                </a>
                <Link
                  href="/universities"
                  className="inline-flex items-center justify-center rounded-full border border-[#14213D] px-6 py-3 text-sm font-semibold text-[#350C0E] transition-colors hover:bg-[#14213D] hover:text-white">
                  See all universities
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
