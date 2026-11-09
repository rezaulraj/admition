"use client";

import { useLayoutEffect, useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

type Pillar = {
  title: string;
  description: string;
  icon: ReactNode;
  /** Card wash, soft colour glow and icon colour */
  bg: string;
  glow: string;
  accent: string;
  dark?: boolean;
};

const GLOBE = (
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path strokeLinecap="round" d="M3.5 12h17M12 3.5c2.5 2.6 3.5 5.4 3.5 8.5s-1 5.9-3.5 8.5c-2.5-2.6-3.5-5.4-3.5-8.5s1-5.9 3.5-8.5Z" />
  </>
);

const pillars: Pillar[] = [
  {
    title: "Free for every student",
    description: "From your first question to the day you enrol, our guidance never comes with a price tag.",
    bg: "linear-gradient(160deg, #FFEBD9 0%, #FFC794 100%)",
    glow: "rgba(247,147,30,0.5)",
    accent: "#D9651A",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z" />,
  },
  {
    title: "Honest, unbiased advice",
    description: "We recommend what genuinely fits you, not just the universities we happen to partner with.",
    bg: "linear-gradient(160deg, #EEF2FF 0%, #BCCCFF 100%)",
    glow: "rgba(47,107,255,0.38)",
    accent: "#2F6BFF",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4" />,
  },
  {
    title: "Local care, global reach",
    description: "Offices in Bangladesh, India and the UK, backed by one coordinated team.",
    bg: "linear-gradient(160deg, #EBF8E7 0%, #B2E2A9 100%)",
    glow: "rgba(59,170,53,0.38)",
    accent: "#2E8F29",
    icon: GLOBE,
  },
  {
    title: "Experience you can trust",
    description: "Years of experience placing students at universities they once thought were out of reach.",
    bg: "linear-gradient(160deg, #561A1E 0%, #2A080A 100%)",
    glow: "rgba(247,147,30,0.5)",
    accent: "#FFB25E",
    dark: true,
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" />,
  },
];

const QUOTE = "To close the distance between ambitious students and the world’s leading universities, so that quality education is".split(" ");
const QUOTE_END = "never out of reach.".split(" ");

/** Soft light that follows the pointer across a card */
function trackPointer(e: PointerEvent<HTMLElement>) {
  const box = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`);
}

export default function OurMission() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add(
      { isDesktop: "(min-width: 1024px)", motionOK: "(prefers-reduced-motion: no-preference)" },
      (ctx) => {
        const { isDesktop, motionOK } = ctx.conditions as { isDesktop: boolean; motionOK: boolean };
        if (!motionOK) return; // reduced motion: the markup already shows the finished state

        gsap.fromTo(
          q("[data-osm-eyebrow]"),
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 82%", once: true } },
        );

        /* The mission card eases up to full size as it scrolls in, its colours drifting slowly */
        const stage = q("[data-osm-stage]")[0];
        gsap.fromTo(
          q("[data-osm-quote]"),
          { y: 70, scale: 0.93 },
          { y: 0, scale: 1, ease: "power2.out", scrollTrigger: { trigger: stage, start: "top 96%", end: "top 45%", scrub: 0.9 } },
        );
        q("[data-osm-blob]").forEach((blob, i) =>
          gsap.to(blob, { xPercent: i % 2 ? -18 : 18, yPercent: i % 2 ? 16 : -14, scale: 1.15, duration: 7 + i * 1.5, ease: "sine.inOut", yoyo: true, repeat: -1 }),
        );
        gsap.fromTo(q("[data-osm-globe]"), { rotate: -18 }, { rotate: 18, ease: "none", scrollTrigger: { trigger: stage, start: "top bottom", end: "bottom top", scrub: 1 } });

        /* The quote rises word by word, then the paragraph follows */
        gsap
          .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: stage, start: "top 62%", once: true } })
          .fromTo(q("[data-osm-mark]"), { autoAlpha: 0, scale: 0.4, rotate: -20 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.9, ease: "back.out(2)" }, 0)
          .fromTo(q("[data-osm-word]"), { autoAlpha: 0, yPercent: 110 }, { autoAlpha: 1, yPercent: 0, duration: 1, stagger: 0.03 }, 0.1)
          .fromTo(q("[data-osm-copy]"), { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.75);

        /* Cards */
        const grid = q("[data-osm-grid]")[0];
        gsap
          .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: q("[data-osm-head]")[0], start: "top 82%", once: true } })
          .fromTo(q("[data-osm-title]"), { autoAlpha: 0, yPercent: 110, rotate: 3 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.1 });

        (q("[data-osm-card]") as HTMLElement[]).forEach((card, i) => {
          const column = isDesktop ? i : i % 2;
          gsap.fromTo(
            card,
            { autoAlpha: 0, y: 90, scale: 0.94 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              delay: column * 0.11,
              ease: "expo.out",
              clearProps: "transform",
              scrollTrigger: { trigger: isDesktop ? grid : card, start: "top 86%", once: true },
            },
          );
        });

        // The large background icons turn slowly as the cards pass
        gsap.fromTo(q("[data-osm-decor]"), { rotate: -14 }, { rotate: 14, ease: "none", scrollTrigger: { trigger: grid, start: "top bottom", end: "bottom top", scrub: 1 } });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="osm relative w-full">
      <style>{`
        .osm { overflow: clip; color: #350C0E; background: #FFFEFA; }
        .osm .osm-wrap { max-width: 84rem; margin: 0 auto; padding: 1rem 1.5rem 5.5rem; }
        .osm .osm-w { display: inline-block; overflow: hidden; padding: 0 0.04em 0.14em 0; margin-bottom: -0.14em; vertical-align: top; }

        .osm .osm-head { margin-top: 5rem; }
        .osm .osm-h3 { font-size: clamp(2.5rem, 11vw, 3.5rem); line-height: 1.02; letter-spacing: -0.04em; font-weight: 600; }
        .osm .osm-mask { display: inline-block; overflow: hidden; padding: 0 0.08em 0.14em 0; margin-bottom: -0.14em; vertical-align: top; }
        .osm .osm-h3-accent { font-size: 1.16em; line-height: 0.9; letter-spacing: -0.02em; font-weight: 400; font-stretch: normal; color: #F7931E; }

        .osm .osm-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; margin-top: 2.5rem; }
        .osm .osm-card { --mx: 50%; --my: 0%; position: relative; isolation: isolate; overflow: hidden; display: flex; flex-direction: column; min-height: 19rem; padding: 1.75rem; border-radius: 1.75rem; transition: translate .5s cubic-bezier(.2,.8,.2,1), box-shadow .5s ease; }
        .osm .osm-card:hover { translate: 0 -8px; box-shadow: 0 34px 60px -32px rgba(53,12,14,0.55); }
        .osm .osm-card::before { content: ""; position: absolute; inset: 0; z-index: -1; opacity: 0; background: radial-gradient(260px circle at var(--mx) var(--my), rgba(255,255,255,0.55), transparent 70%); transition: opacity .4s ease; }
        .osm .osm-card.is-dark::before { background: radial-gradient(260px circle at var(--mx) var(--my), rgba(255,178,94,0.26), transparent 70%); }
        .osm .osm-card:hover::before { opacity: 1; }
        .osm .osm-card::after { content: ""; position: absolute; inset: 0; z-index: -2; opacity: 0.32; background-image: radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px); background-size: 15px 15px; -webkit-mask-image: linear-gradient(200deg, black, transparent 58%); mask-image: linear-gradient(200deg, black, transparent 58%); }
        .osm .osm-card.is-dark::after { opacity: 0.14; }
        .osm .osm-orb { position: absolute; z-index: -2; left: -22%; bottom: -24%; width: 72%; aspect-ratio: 1; border-radius: 50%; filter: blur(46px); transition: transform .8s cubic-bezier(.2,.8,.2,1); }
        .osm .osm-card:hover .osm-orb { transform: translate(14%, -12%) scale(1.15); }
        .osm .osm-decor { position: absolute; z-index: -1; top: -2.75rem; right: -2.75rem; width: 13rem; height: 13rem; opacity: 0.2; }
        .osm .osm-chip { display: grid; place-items: center; width: 3.25rem; height: 3.25rem; border-radius: 1rem; background: rgba(255,255,255,0.72); box-shadow: 0 12px 24px -14px rgba(53,12,14,0.5); transition: rotate .4s ease, scale .4s ease; }
        .osm .osm-card.is-dark .osm-chip { background: rgba(255,255,255,0.12); }
        .osm .osm-card:hover .osm-chip { rotate: -6deg; scale: 1.08; }
        .osm .osm-card-title { margin-top: auto; padding-top: 3rem; font-size: 1.5rem; line-height: 1.12; letter-spacing: -0.025em; font-weight: 600; }
        .osm .osm-card-text { margin-top: 0.7rem; font-size: 0.9375rem; line-height: 1.6; color: rgba(53,12,14,0.76); }
        .osm .osm-card.is-dark { color: #fff; }
        .osm .osm-card.is-dark .osm-card-text { color: rgba(255,255,255,0.74); }

        .osm .osm-stage { margin-top: 1.75rem; }
        .osm .osm-card.osm-quote { display: block; min-height: 0; padding: 2.25rem 1.75rem 2.5rem; border-radius: 2rem; }
        .osm .osm-card.osm-quote:hover { translate: none; box-shadow: none; }
        .osm .osm-blob { position: absolute; z-index: -2; width: 46%; aspect-ratio: 1; border-radius: 50%; filter: blur(70px); }
        .osm .osm-globe { position: absolute; z-index: -1; top: -7rem; right: -7rem; width: 18rem; height: 18rem; opacity: 0.28; }
        .osm .osm-line { margin-top: 1.75rem; font-size: clamp(1.75rem, 7.4vw, 2.5rem); line-height: 1.16; letter-spacing: -0.03em; font-weight: 600; }
        .osm .osm-accent { font-size: 1.16em; line-height: 0.95; letter-spacing: -0.015em; font-weight: 400; font-stretch: normal; color: #B8480C; }
        .osm .osm-copy { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(53,12,14,0.16); font-size: 1rem; line-height: 1.65; color: rgba(53,12,14,0.76); }

        @media (min-width: 640px) { .osm .osm-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (min-width: 1024px) {
          .osm .osm-wrap { padding: 1rem 5.4vw 7.5rem; }
          .osm .osm-head { margin-top: 7rem; }
          .osm .osm-h3 { font-size: clamp(3.2rem, 5vw, 5.3rem); }
          .osm .osm-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 3.25rem; }
          .osm .osm-card { min-height: 25rem; padding: 2rem; }
        }
        @media (min-width: 1024px) {
          .osm .osm-stage { margin-top: 2rem; }
          .osm .osm-card.osm-quote { padding: 4rem 4.25rem 4.5rem; }
          .osm .osm-quote-grid { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(0, 0.75fr); align-items: end; gap: 4.5rem; }
          .osm .osm-line { margin-top: 2.25rem; font-size: clamp(2.5rem, 4vw, 4.4rem); line-height: 1.1; }
          .osm .osm-copy { margin-top: 0; padding: 0 0 0.4rem 2.25rem; border-top: 0; border-left: 1px solid rgba(53,12,14,0.16); font-size: 1.0625rem; }
          .osm .osm-globe { width: 26rem; height: 26rem; top: -10rem; right: -7rem; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .osm [data-osm-eyebrow], .osm [data-osm-mark], .osm [data-osm-word], .osm [data-osm-copy], .osm [data-osm-title], .osm [data-osm-card] { visibility: hidden; }
        }
        @media (prefers-reduced-motion: reduce) { .osm .osm-card, .osm .osm-orb, .osm .osm-chip { transition: none; } }
      `}</style>

      <div className="osm-wrap">
        <h2 data-osm-eyebrow className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
          <span className="h-3.5 w-5 bg-[#F7931E] [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
          Our mission
        </h2>

        <div data-osm-stage className="osm-stage">
          <figure
            data-osm-quote
            onPointerMove={trackPointer}
            className="osm-card osm-quote"
            style={{ background: "linear-gradient(120deg, #FFEBD9 0%, #FFD8B5 36%, #E8EBFF 72%, #DFF4D9 100%)" }}>
            <span aria-hidden data-osm-blob className="osm-blob" style={{ left: "-10%", top: "-30%", background: "rgba(247,147,30,0.5)" }} />
            <span aria-hidden data-osm-blob className="osm-blob" style={{ right: "4%", top: "-24%", background: "rgba(47,107,255,0.34)" }} />
            <span aria-hidden data-osm-blob className="osm-blob" style={{ right: "-8%", bottom: "-36%", background: "rgba(59,170,53,0.36)" }} />
            <svg data-osm-globe aria-hidden className="osm-globe" viewBox="0 0 24 24" fill="none" stroke="#B8480C" strokeWidth={0.2}>
              {GLOBE}
            </svg>
            <span data-osm-mark className="osm-chip">
              <svg viewBox="0 0 24 24" fill="#D9651A" aria-hidden style={{ width: "1.75rem", height: "1.75rem" }}>
                <path d="M7.2 6C4.9 7.3 3.5 9.6 3.5 12.6V18h6v-6H6.6c.1-1.9 1-3.3 2.6-4.2L7.2 6Zm10 0c-2.3 1.3-3.7 3.6-3.7 6.6V18h6v-6h-2.9c.1-1.9 1-3.3 2.6-4.2L17.2 6Z" />
              </svg>
            </span>
            <div className="osm-quote-grid">
            <blockquote className="osm-line font-display">
              {QUOTE.map((word, i) => (
                <span key={i}>
                  <span className="osm-w">
                    <span data-osm-word className="inline-block">
                      {word}
                    </span>
                  </span>{" "}
                </span>
              ))}
              {QUOTE_END.map((word, i) => (
                <span key={i}>
                  <span className="osm-w">
                    <span data-osm-word className={`${accentSerif.className} osm-accent inline-block`}>
                      {word}
                    </span>
                  </span>{" "}
                </span>
              ))}
            </blockquote>
            <p data-osm-copy className="osm-copy">
              Our students come from every corner of the world: South Asia, the Middle East, Africa and Europe. Every recommendation we make is honest and never limited to a fixed list of partners, and our support is completely free, from your first message to the day you enrol.
            </p>
            </div>
          </figure>

        </div>

        <div data-osm-head className="osm-head">
          <h3 className="osm-h3 font-display">
            <span className="osm-mask">
              <span data-osm-title className="inline-block origin-bottom-left">
                What we
              </span>
            </span>{" "}
            <span className="osm-mask">
              <span data-osm-title className={`${accentSerif.className} osm-h3-accent inline-block origin-bottom-left`}>
                stand for
              </span>
            </span>
          </h3>
        </div>

        <ul data-osm-grid className="osm-grid">
          {pillars.map((p) => (
            <li key={p.title} data-osm-card onPointerMove={trackPointer} className={`osm-card${p.dark ? " is-dark" : ""}`} style={{ background: p.bg } as CSSProperties}>
              <span aria-hidden className="osm-orb" style={{ background: p.glow }} />
              <svg data-osm-decor aria-hidden className="osm-decor" viewBox="0 0 24 24" fill="none" stroke={p.dark ? "#FFB25E" : p.accent} strokeWidth={0.7}>
                {p.icon}
              </svg>
              <span className="osm-chip">
                <svg viewBox="0 0 24 24" fill="none" stroke={p.accent} strokeWidth={1.8} aria-hidden style={{ width: "1.6rem", height: "1.6rem" }}>
                  {p.icon}
                </svg>
              </span>
              <h4 className="osm-card-title font-display">{p.title}</h4>
              <p className="osm-card-text">{p.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
