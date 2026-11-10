"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Stat = {
  value: string;
  suffix?: string;
  label: string;
  icon: ReactNode;
};

const stats: Stat[] = [
  {
    value: "42+ Universities",
    label: "2,200+ programmes in Australia",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Zm3 1.5v4.5c0 1.4 2.7 3 6 3s6-1.6 6-3V11" />,
  },
  {
    value: "$20,000 to $50,000",
    suffix: "AUD / year",
    label: "Tuition fees",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path strokeLinecap="round" d="M12 6.5v11M14.5 9.5c0-1.1-1.1-2-2.5-2s-2.5.9-2.5 2 1.1 1.7 2.5 2 2.5.9 2.5 2-1.1 2-2.5 2-2.5-.9-2.5-2" />
      </>
    ),
  },
  {
    value: "2 Years",
    label: "Post-study work permit after graduation",
    icon: (
      <>
        <rect x="3.5" y="7.5" width="17" height="12" rx="2" />
        <path strokeLinecap="round" d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5M3.5 12.5h17" />
      </>
    ),
  },
];

const IMAGE_RATIO = 1919 / 820;
const PAGE = "#FFFEFA";
const RADIUS = 28;

/** Landmarks in the panorama, as a share of its width: phones pan from one to the other */
const BRIDGE = 0.27;
const OPERA = 0.71;

function Arrow() {
  return (
    <span className="aus-btn-i">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden style={{ width: "1rem", height: "1rem" }}>
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function StatsRow() {
  return (
    <>
      {stats.map((stat) => (
        <div key={stat.value} className="aus-stat">
          <span className="aus-stat-i">
            <svg viewBox="0 0 24 24" fill="none" stroke="#D9651A" strokeWidth={1.8} aria-hidden style={{ width: "1.25rem", height: "1.25rem" }}>
              {stat.icon}
            </svg>
          </span>
          <div className="min-w-0">
            <p className="aus-stat-v font-display">
              {stat.value}
              {stat.suffix && <span className="aus-stat-s">{stat.suffix}</span>}
            </p>
            <p className="aus-stat-l">{stat.label}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default function HeroAustralia() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    /* Desktop: the view through the letters opens into the whole harbour */
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(q("[data-frame]"), { autoAlpha: 0, clipPath: "inset(0% 100% 0% 0%)" }, { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.7, ease: "power3.inOut", clearProps: "clipPath" }, 0.1)
        .fromTo(q("[data-pan]"), { xPercent: -5 }, { xPercent: 0, duration: 2.4 }, 0.1)
        .fromTo(q("[data-intro]"), { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.12 }, 1);

      gsap.to(q("[data-ken]"), { scale: 1.035, duration: 8, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "50% 40%" });

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.7, invalidateOnRefresh: true },
        })
        .to(q("[data-intro]"), { autoAlpha: 0, y: -30, duration: 0.2, ease: "power2.in" }, 0.02)
        // Camera tilts down from the sunset sky to the bridge, the Opera House and the water
        .fromTo(q("[data-tilt]"), { scale: 1.5 }, { scale: 1, duration: 0.68, ease: "power2.inOut" }, 0.06)
        .fromTo(q("[data-cover]"), { scale: 1 }, { scale: 1.2, duration: 0.56, ease: "power1.in" }, 0.12)
        .to(q("[data-cover]"), { autoAlpha: 0, duration: 0.38, ease: "power1.inOut" }, 0.3)
        // While the letters show, the photo stops just short of the frame so no sliver of it peeks round the edge
        .fromTo(q("[data-pan]"), { clipPath: `inset(4px round ${RADIUS - 4}px)` }, { clipPath: `inset(0px round ${RADIUS}px)`, duration: 0.12 }, 0.3)
        .fromTo(q("[data-final]"), { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.14, ease: "power3.out" }, 0.82);
    });

    /* Phones and tablets: the window pans across the harbour as you scroll */
    mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      const frame = q("[data-frame]")[0];
      const pan = q("[data-pan]")[0];
      const panTo = (landmark: number) => gsap.utils.clamp(frame.offsetWidth - pan.offsetWidth, 0, frame.offsetWidth / 2 - pan.offsetWidth * landmark);

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(q("[data-intro]"), { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 }, 0.1)
        .fromTo(frame, { autoAlpha: 0, clipPath: `inset(100% 0% 0% 0% round ${RADIUS}px)` }, { autoAlpha: 1, clipPath: `inset(0% 0% 0% 0% round ${RADIUS}px)`, duration: 1.5, clearProps: "clipPath" }, 0.35);

      gsap.fromTo(pan, { x: () => panTo(BRIDGE) }, { x: () => panTo(OPERA), ease: "none", immediateRender: true, scrollTrigger: { trigger: frame, start: "top 72%", end: "bottom 35%", scrub: 0.8, invalidateOnRefresh: true } });
      gsap.fromTo(q("[data-stats]"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: q("[data-stats]")[0], start: "top 92%", once: true } });
    });

    return () => mm.revert();
  }, []);

  return (
    // Pulled up under the sticky header so the navbar floats over the scene
    <section ref={root} className="aus relative -mt-20 w-full lg:-mt-24">
      <style>{`
        .aus { color: #350C0E; background: linear-gradient(180deg, #FFF0E1 0, #FFF8F0 380px, ${PAGE} 760px); }
        .aus .aus-stage { display: flex; flex-direction: column; gap: 1.5rem; max-width: 84rem; margin: 0 auto; padding: 7rem 1.5rem 3rem; }
        .aus .aus-eyebrow { font-size: 0.875rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; }
        .aus .aus-h1 { margin-top: 0.5rem; font-size: clamp(3.4rem, 16.5vw, 6.5rem); line-height: 1; letter-spacing: -0.045em; font-weight: 700; }
        .aus .aus-copy { display: flex; flex-direction: column; align-items: flex-start; gap: 1.5rem; }
        .aus .aus-text { max-width: 33rem; font-size: 1.0625rem; line-height: 1.6; color: rgba(53,12,14,0.76); }
        .aus .aus-btn { flex: none; display: inline-flex; align-items: center; gap: 0.75rem; height: 3.5rem; padding: 0 0.5rem 0 1.6rem; border-radius: 9999px; font-size: 1rem; font-weight: 600; white-space: nowrap; color: #fff; background: #350C0E; transition: background-color .3s ease, translate .3s ease; }
        .aus .aus-btn:hover, .aus .aus-btn:focus-visible { background: #F7931E; translate: 0 -2px; }
        .aus .aus-btn-i { display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; color: #350C0E; background: #fff; transition: rotate .3s ease; }
        .aus .aus-btn:hover .aus-btn-i { rotate: 90deg; }

        .aus .aus-frame { position: relative; aspect-ratio: 4 / 5; overflow: hidden; border-radius: ${RADIUS}px; background: #F6C79B; }
        .aus .aus-pan { position: absolute; left: 0; top: 0; height: 100%; aspect-ratio: ${IMAGE_RATIO}; }
        .aus .aus-tilt { position: absolute; inset: -1px; }
        .aus .aus-ken { position: absolute; inset: 0; }
        .aus .aus-tilt { transform-origin: 50% 0; }
        .aus .aus-cover, .aus .aus-final { display: none; }

        .aus .aus-stats { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0.5rem; }
        .aus .aus-stat { display: flex; align-items: center; gap: 0.85rem; padding: 0.9rem 1rem; border-radius: 1.25rem; background: #fff; box-shadow: inset 0 0 0 1px rgba(53,12,14,0.08); }
        .aus .aus-stat-i { flex: none; display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border-radius: 0.8rem; background: rgba(247,147,30,0.15); }
        .aus .aus-stat-v { font-size: 1.125rem; line-height: 1.2; letter-spacing: -0.02em; font-weight: 600; }
        .aus .aus-stat-s { margin-left: 0.35rem; font-family: inherit; font-size: 0.75rem; font-weight: 500; letter-spacing: 0; color: rgba(53,12,14,0.66); }
        .aus .aus-stat-l { margin-top: 0.1rem; font-size: 0.8125rem; line-height: 1.3; color: rgba(53,12,14,0.68); }

        @media (min-width: 640px) { .aus .aus-frame { aspect-ratio: 16 / 10; } .aus .aus-copy { flex-direction: row; align-items: center; justify-content: space-between; } }
        @media (min-width: 1024px) { .aus .aus-stage { padding: 8.5rem 5.4vw 3rem; } .aus .aus-frame { aspect-ratio: ${IMAGE_RATIO}; } .aus .aus-pan { width: 100%; } .aus .aus-stats { grid-template-columns: repeat(3, minmax(0, 1fr)); } }

        /* Desktop: a sticky stage. The frame's page-coloured cover has letter-shaped holes showing the photo behind */
        @media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
          .aus { --w: calc(min(100vw, 84rem) - 10.8vw); /* same width as the sections below */ --mid: calc(50% + 2.5rem); height: 190svh; background: ${PAGE}; }
          .aus .aus-stage { position: sticky; top: 0; display: block; max-width: none; height: 100svh; padding: 0; overflow: clip; }
          .aus .aus-intro { display: contents; }
          .aus .aus-h1 { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
          .aus .aus-frame { position: absolute; z-index: 1; left: 50%; top: var(--mid); width: var(--w); height: min(100svh - 7.25rem, var(--w) / 2); aspect-ratio: auto; margin-left: calc(var(--w) / -2); translate: 0 -50%; background: none; }
          .aus .aus-cover { display: block; position: absolute; left: -2px; top: -2px; width: calc(100% + 4px); height: calc(100% + 4px); will-change: transform, opacity; }
          .aus .aus-eyebrow { position: absolute; z-index: 2; left: 0; right: 0; bottom: calc(100% - var(--mid) + var(--w) * 0.098 + 0.6rem); text-align: center; }
          .aus .aus-copy { position: absolute; z-index: 2; left: 50%; top: calc(var(--mid) + var(--w) * 0.098 + 0.9rem); width: var(--w); margin-left: calc(var(--w) / -2); gap: 3rem; }
          .aus .aus-stats { display: none; }
          .aus .aus-final { position: absolute; z-index: 3; left: 1.25rem; right: 1.25rem; bottom: 1.25rem; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)) auto; align-items: center; gap: 1.25rem; padding: 0.85rem 0.85rem 0.85rem 1.4rem; border-radius: 1.5rem; background: rgba(255,255,255,0.92); -webkit-backdrop-filter: blur(16px); backdrop-filter: blur(16px); box-shadow: 0 26px 50px -26px rgba(53,12,14,0.6); }
          .aus .aus-final .aus-stat { padding: 0; background: none; box-shadow: none; }
          .aus .aus-final .aus-stat-v { font-size: clamp(0.95rem, 1.28vw, 1.25rem); }
          .aus .aus-final .aus-stat-l { font-size: 0.75rem; }
          .aus .aus-final .aus-stat-s { display: block; margin: 0; }
          .aus [data-final] { visibility: hidden; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .aus [data-intro], .aus [data-frame] { visibility: hidden; }
        }
        @media (max-width: 1023px) { .aus .aus-copy { margin-top: 1.25rem; } }
        @media (max-width: 1023px) and (prefers-reduced-motion: no-preference) {
          .aus [data-stats] { visibility: hidden; }
        }
        @media (max-width: 1023px) and (prefers-reduced-motion: reduce) {
          .aus .aus-pan { right: 0; left: auto; }
        }
      `}</style>

      <div className="aus-stage">
        <div className="aus-intro">
          <p data-intro className="aus-eyebrow">
            Study in
          </p>
          <h1 className="aus-h1 font-display">
            Australia
          </h1>
          <div data-intro className="aus-copy">
            <p className="aus-text">Study in Australia with Admission OnBoard. Get expert guidance on admissions, scholarships, and visa support for a smooth study abroad journey.</p>
            <Link href="/contact" className="aus-btn focus:outline-none">
              Free Expert Consultation
              <Arrow />
            </Link>
          </div>
        </div>

        <div data-frame className="aus-frame">
          <div data-pan className="aus-pan">
            <div data-tilt className="aus-tilt">
              <div data-ken className="aus-ken">
                <Image src="/australia.png" alt="Sydney Harbour Bridge and Opera House at sunset, Australia" fill priority quality={90} sizes="(min-width: 1024px) 90vw, 260vw" className="object-cover" style={{ objectPosition: "45% 50%" }} />
              </div>
            </div>
          </div>

          <svg data-cover aria-hidden className="aus-cover" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid meet">
            <defs>
              <mask id="aus-letters" maskUnits="userSpaceOnUse" x="-4000" y="-4000" width="9200" height="8240">
                <rect x="-4000" y="-4000" width="9200" height="8240" fill="#fff" />
                <text x="600" y="120" dy="0.36em" textAnchor="middle" textLength="1188" lengthAdjust="spacingAndGlyphs" fill="#000" fontSize="222" fontWeight="800" style={{ fontFamily: "var(--font-mona)" }}>
                  AUSTRALIA
                </text>
              </mask>
            </defs>
            <rect x="-4000" y="-4000" width="9200" height="8240" fill={PAGE} mask="url(#aus-letters)" />
          </svg>

          <div data-final className="aus-final">
            <StatsRow />
            <Link href="/contact" className="aus-btn focus:outline-none">
              Free Expert Consultation
              <Arrow />
            </Link>
          </div>
        </div>

        <div data-stats className="aus-stats">
          <StatsRow />
        </div>
      </div>
    </section>
  );
}
