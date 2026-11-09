"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

type Card = {
  title: string;
  tagline: string;
  points: string[];
  sticker: string;
  cta: string;
  href: string;
  accent: string;
  tint: string;
  image: string;
  alt: string;
  /** Cut-out photos sit on a tinted panel; regular photos fill the frame */
  cutout?: boolean;
  icon: ReactNode;
};

const cards: Card[] = [
  {
    title: "For Students",
    tagline: "Free guidance. Global opportunities.",
    points: [
      "Personalised counselling",
      "Programme matching",
      "Scholarship & financial guidance",
      "Visa support",
      "Pre-departure & accommodation",
    ],
    sticker: "Your future starts here",
    cta: "Learn more",
    href: "/contact",
    accent: "#2563EB",
    tint: "linear-gradient(160deg,#EAF1FF 0%,#CFE0FF 100%)",
    image: "/student.png",
    alt: "Smiling student with a backpack and notebooks",
    cutout: true,
    icon: <path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3Zm-6.8 9.2V16c0 1.9 3 3.8 6.8 3.8s6.8-1.9 6.8-3.8v-3.8L12 16l-6.8-3.8Z" />,
  },
  {
    title: "For Institutions",
    tagline: "Quality recruitment. Strategic growth.",
    points: [
      "Pre-screened, complete applications",
      "Source market representation",
      "Programme showcasing",
      "Real-time CRM tracking",
      "Flexible commercial models",
    ],
    sticker: "Grow your global presence",
    cta: "Partner with us",
    href: "/institution-partner#institution-form",
    accent: "#C98A1B",
    tint: "linear-gradient(160deg,#FFF6E3 0%,#FBE3B3 100%)",
    image: "/uk.png",
    alt: "Historic university city on the river",
    icon: <path d="M12 2 2 7v2h20V7L12 2Zm-7 9v7H3v2h18v-2h-2v-7h-2v7h-3v-7h-2v7H9v-7H7v7H5v-7Z" />,
  },
  {
    title: "For Recruitment Partners",
    tagline: "Stronger partnerships. Greater opportunities.",
    points: [
      "Access to 1,000+ partner institutions",
      "Centralised application management",
      "Tracking & market insights",
      "Transparent communication structure",
      "Ongoing operational support",
    ],
    sticker: "Expand your reach",
    cta: "Join our network",
    href: "/recruitment-partner",
    accent: "#5B3FD9",
    tint: "linear-gradient(160deg,#F0EDFF 0%,#DCD4FF 100%)",
    image: "/partner-handshake.png",
    alt: "Two partners shaking hands",
    icon: (
      <path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 2c-2.7 0-8 1.3-8 4v3h10v-3c0-1.1.4-2.1 1.2-2.9A11 11 0 0 0 8 13Zm8 0c-.3 0-.7 0-1.1.1 1.2.9 2.1 2.1 2.1 3.9v3h7v-3c0-2.7-5.3-4-8-4Z" />
    ),
  },
];

const ArrowIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6" />
  </svg>
);

export default function ContactFooter() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Heading
      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: el, start: "top 80%", once: true } })
        .fromTo(q("[data-eyebrow]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
        .fromTo(q("[data-word]"), { autoAlpha: 0, yPercent: 110, rotate: 4 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.06 }, 0.1);

      // Each card plays its own little story when it arrives
      (q("[data-card]") as HTMLElement[]).forEach((card, i) => {
        const c = gsap.utils.selector(card);
        gsap
          .timeline({
            defaults: { ease: "expo.out" },
            delay: i * 0.12,
            scrollTrigger: { trigger: q("[data-cards]")[0], start: "top 82%", once: true },
          })
          .fromTo(card, { autoAlpha: 0, y: 80, rotateX: -14, transformPerspective: 1000 }, { autoAlpha: 1, y: 0, rotateX: 0, duration: 1.2 }, 0)
          .fromTo(c("[data-media]"), { clipPath: "inset(0% 0% 100% 0% round 22px)" }, { clipPath: "inset(0% 0% 0% 0% round 22px)", duration: 1.2, ease: "power4.inOut" }, 0.1)
          .fromTo(c("[data-photo]"), { scale: 1.25 }, { scale: 1, duration: 1.6 }, 0.1)
          .fromTo(c("[data-sticker]"), { autoAlpha: 0, scale: 0.4, rotate: -30 }, { autoAlpha: 1, scale: 1, rotate: -6, duration: 0.9, ease: "back.out(2.4)" }, 0.75)
          .fromTo(c("[data-badge]"), { scale: 0, rotate: -40 }, { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(2.2)" }, 0.55)
          .fromTo(c("[data-text]"), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.6)
          .fromTo(c("[data-point]"), { autoAlpha: 0, x: -18 }, { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.07 }, 0.8)
          .fromTo(c("[data-tick]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.45, stagger: 0.07, ease: "power2.out" }, 0.95)
          .fromTo(c("[data-cta]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 1.15);
      });

      // Sticker keeps a gentle wobble (inner layer, so it never fights the pop-in)
      gsap.to(q("[data-sticker-float]"), { rotate: 3, y: -4, duration: 2.2, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.4 });
    });

    // 3D tilt + glare for mouse users
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const offs = (q("[data-tilt]") as HTMLElement[]).map((card) => {
        const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
        const glare = card.querySelector<HTMLElement>("[data-glare]");
        gsap.set(card, { transformPerspective: 1100 });
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          ry((px - 0.5) * 9);
          rx((0.5 - py) * 7);
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
  }, []);

  return (
    <section ref={root} className="cfoot relative w-full overflow-hidden bg-[#FFFEFA] px-4 py-20 sm:px-6 sm:py-24">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .cfoot [data-eyebrow], .cfoot [data-word], .cfoot [data-card], .cfoot [data-sticker], .cfoot [data-text], .cfoot [data-point], .cfoot [data-cta] { visibility: hidden; }
        }
        /* Layout kept here so it never depends on Tailwind generating new class names */
        .cfoot .cfoot-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.75rem; margin-top: 3rem; perspective: 1400px; }
        @media (min-width: 768px) { .cfoot .cfoot-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (min-width: 1080px) { .cfoot .cfoot-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        .cfoot .cfoot-media { position: relative; height: 15rem; overflow: hidden; border-radius: 22px; }
        .cfoot .cfoot-sticker { clip-path: polygon(2% 8%, 98% 0, 100% 88%, 3% 100%); }
      `}</style>

      <div className="container relative mx-auto">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span data-eyebrow className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-[#2F6BFF]">
            <span className="h-3.5 w-4 bg-[#2F6BFF] [clip-path:polygon(0_0,65%_0,100%_50%,65%_100%,0_100%)]" />
            Work with us
          </span>
          <h2 className="font-display mt-3 text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.035em] text-[#350C0E] sm:text-5xl">
            {["One", "team,", "built", "for"].map((w) => (
              <span key={w} className="mr-[0.24em] inline-block overflow-hidden pb-[0.08em] align-top">
                <span data-word className="inline-block">
                  {w}
                </span>
              </span>
            ))}
            <span className="inline-block overflow-hidden pb-[0.08em] align-top">
              <span data-word className="inline-block text-[#F7931E]">
                everyone
              </span>
            </span>
          </h2>
        </div>

        <ul data-cards className="cfoot-grid">
          {cards.map((card) => (
            <li key={card.href} data-card className="flex">
              <div
                data-tilt
                className="group relative flex w-full flex-col overflow-hidden rounded-[30px] border border-white bg-white p-3 shadow-[0_30px_60px_-38px_rgba(20,33,61,0.55)] transition-shadow duration-500 hover:shadow-[0_40px_70px_-36px_rgba(20,33,61,0.6)]">
                {/* Glare */}
                <span
                  data-glare
                  aria-hidden
                  className="pointer-events-none invisible absolute left-1/2 top-1/2 z-30 -ml-32 -mt-32 size-64 rounded-full bg-white/40 blur-3xl"
                />

                {/* Photo */}
                <div data-media className="cfoot-media" style={{ background: card.tint }}>
                  <div data-photo className="absolute inset-0">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className={`transition-transform duration-[900ms] ease-out group-hover:scale-105 ${
                        card.cutout ? "object-contain object-bottom pt-4 drop-shadow-[0_18px_22px_rgba(20,33,61,0.3)]" : "object-cover"
                      }`}
                    />
                  </div>
                  {!card.cutout && <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />}

                  {/* Brush-style sticker */}
                  <span data-sticker className="absolute right-3 top-4 z-10 block">
                    <span
                      data-sticker-float
                      className="cfoot-sticker block max-w-[11rem] bg-white px-4 py-2.5 text-center font-display text-sm font-bold leading-tight shadow-[0_12px_24px_-10px_rgba(20,33,61,0.45)]"
                      style={{ color: card.accent } as CSSProperties}>
                      {card.sticker}
                    </span>
                  </span>
                </div>

                {/* Body */}
                <div className="relative flex flex-1 flex-col px-4 pb-4 pt-0 sm:px-5">
                  <span
                    data-badge
                    className="-mt-8 grid size-16 place-items-center rounded-full text-white shadow-[0_14px_28px_-10px_rgba(20,33,61,0.5)] ring-4 ring-white"
                    style={{ background: card.accent }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-7" aria-hidden>
                      {card.icon}
                    </svg>
                  </span>

                  <h3 data-text className="font-display mt-4 text-2xl font-semibold tracking-[-0.02em]" style={{ color: card.accent }}>
                    {card.title}
                  </h3>
                  <p data-text className="mt-1 text-sm font-medium text-[#4A5268]">
                    {card.tagline}
                  </p>

                  <ul className="mt-5 flex flex-col gap-2.5">
                    {card.points.map((pt) => (
                      <li key={pt} data-point className="flex items-center gap-3 text-sm text-[#350C0E]">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full" style={{ background: `${card.accent}1A` }}>
                          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
                            <path data-tick d="M5 12.5 10 17 19 7" stroke={card.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <div data-cta className="mt-auto pt-6">
                    <Link
                      href={card.href}
                      className="group/btn inline-flex w-full items-center justify-between gap-3 rounded-2xl py-2 pl-5 pr-2 text-sm font-semibold text-white transition-[filter,translate] duration-300 hover:-translate-y-0.5 hover:brightness-110"
                      style={{ background: card.accent }}>
                      {card.cta}
                      <span className="grid size-9 place-items-center rounded-xl bg-white/20 transition-transform duration-300 group-hover/btn:-rotate-45">
                        <ArrowIcon />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
