"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const WORDS = ["Making", "World-Class", "Education"];

/**
 * The photo is cut into three panels, one per student, along the gaps between them (source-image pixels).
 * Everything left of the first cut is a baked-in green fade, so it is never shown.
 */
const IMAGE_WIDTH = 1568;
const IMAGE_HEIGHT = 672;
const PANELS = [
  { from: 620, to: 1005, y: -26, x: -9 },
  { from: 1005, to: 1238, y: 30, x: 0 },
  { from: 1238, to: 1568, y: -10, x: 9 },
];

const RADIUS = 28;

export default function HeroOurStory() {
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
        if (!motionOK) return; // reduced motion: the markup already shows one finished photo

        /* On load: headline rises word by word, the panels wipe up one after another */
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo(q("[data-eyebrow]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.1)
          .fromTo(q("[data-word]"), { autoAlpha: 0, yPercent: 115, rotate: 5 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.1 }, 0.15)
          .fromTo(
            q("[data-panel-inner]"),
            { autoAlpha: 0, y: 90, clipPath: `inset(100% 0% 0% 0% round ${RADIUS}px)` },
            { autoAlpha: 1, y: 0, clipPath: `inset(0% 0% 0% 0% round ${RADIUS}px)`, duration: 1.5, stagger: 0.14, clearProps: "clipPath" },
            0.3,
          )
          .fromTo(q("[data-underline]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.9, ease: "power2.inOut" }, 0.95)
          .fromTo(q("[data-copy]"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12 }, 1)
          .fromTo(q("[data-badge]"), { autoAlpha: 0, scale: 0.3, rotate: -60 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 1, ease: "back.out(1.8)" }, 1.25);

        gsap.to(q("[data-badge-text]"), { rotation: 360, svgOrigin: "60 60", duration: 16, ease: "none", repeat: -1 });

        /* On scroll: the three panels slide together into one photo */
        const stack = q("[data-panels]")[0];
        const join = isDesktop
          ? { trigger: el, start: "top top", end: "+=200", scrub: 0.8 }
          : { trigger: stack, start: "top 55%", end: "top 12%", scrub: 0.8 };
        const panels = q("[data-panel]");
        panels.forEach((panel, i) => {
          const last = panels.length - 1;
          const r = `${RADIUS}px`;
          gsap.fromTo(
            panel,
            { x: PANELS[i].x, y: PANELS[i].y, borderRadius: `${r} ${r} ${r} ${r}` },
            {
              x: 0,
              y: 0,
              borderRadius: `${i === 0 ? r : "0px"} ${i === last ? r : "0px"} ${i === last ? r : "0px"} ${i === 0 ? r : "0px"}`,
              ease: "power1.inOut",
              scrollTrigger: join,
            },
          );
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    // Pulled up under the sticky header so the navbar floats over the warm background
    <section ref={root} className="osh relative -mt-20 w-full lg:-mt-24">
      <style>{`
        .osh { overflow: clip; color: #350C0E; background: radial-gradient(60% 70% at 88% 18%, rgba(247,147,30,0.2), transparent 70%), linear-gradient(180deg, #FFF0E1 0%, #FFF8F0 58%, #FFFEFA 100%); }
        .osh .osh-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 3.5rem; max-width: 84rem; margin: 0 auto; padding: 8rem 1.5rem 5.5rem; }
        .osh .osh-title { font-size: clamp(2.9rem, 13vw, 4.4rem); line-height: 1.02; letter-spacing: -0.04em; font-weight: 600; }
        .osh .osh-mask { display: block; overflow: hidden; padding: 0 0.1em 0.1em 0; margin-bottom: -0.1em; }
        .osh .osh-accent { font-size: 1.16em; line-height: 0.9; letter-spacing: -0.02em; font-weight: 400; font-stretch: normal; }
        .osh .osh-text { max-width: 27rem; margin-top: 2.25rem; font-size: 1.0625rem; line-height: 1.65; color: rgba(53,12,14,0.72); }
        .osh .osh-btn { margin-top: 2rem; background: #350C0E; color: #fff; transition: background-color .3s ease, translate .3s ease; }
        .osh .osh-btn:hover, .osh .osh-btn:focus-visible { background: #F7931E; translate: 0 -2px; }
        .osh .osh-panels { position: relative; display: grid; aspect-ratio: ${PANELS[2].to - PANELS[0].from} / ${IMAGE_HEIGHT}; grid-template-rows: minmax(0, 1fr); grid-template-columns: ${PANELS.map((p) => `${p.to - p.from}fr`).join(" ")}; }
        .osh .osh-panel { position: relative; overflow: hidden; border-radius: 0; will-change: transform; }
        .osh .osh-panel + .osh-panel { margin-left: -1px; } /* no hairline between panels once joined */
        .osh .osh-panel:first-child { border-radius: ${RADIUS}px 0 0 ${RADIUS}px; }
        .osh .osh-panel:nth-child(3) { border-radius: 0 ${RADIUS}px ${RADIUS}px 0; }
        .osh .osh-badge { position: absolute; right: -0.5rem; bottom: -2.75rem; width: clamp(6.5rem, 9vw, 8.5rem); height: clamp(6.5rem, 9vw, 8.5rem); }
        @media (min-width: 1024px) {
          .osh .osh-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1.08fr); align-items: center; gap: clamp(3rem, 5vw, 5.5rem); padding: 9.5rem 5.4vw 7rem; }
          .osh .osh-title { font-size: clamp(3.4rem, 5.5vw, 5.9rem); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .osh [data-eyebrow], .osh [data-word], .osh [data-copy], .osh [data-panel-inner], .osh [data-badge] { visibility: hidden; }
        }
      `}</style>

      <div className="osh-grid">
        {/* Copy */}
        <div>
          <p data-eyebrow className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
            <span className="h-3.5 w-5 bg-[#F7931E] [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
            Our story
          </p>

          <h1 className="osh-title font-display mt-6">
            {WORDS.map((word) => (
              <span key={word} className="osh-mask">
                <span data-word className="inline-block origin-bottom-left">
                  {word}
                </span>{" "}
              </span>
            ))}
            <span className="osh-mask">
              <span data-word className={`${accentSerif.className} osh-accent relative inline-block origin-bottom-left`}>
                Within Reach
              </span>
            </span>
            <svg aria-hidden viewBox="0 0 320 16" preserveAspectRatio="none" className="mt-1 block overflow-visible" style={{ width: "min(100%, 6.1em)", height: "0.16em" }}>
              <path data-underline d="M3 11 C 70 3, 170 2, 317 8" fill="none" stroke="#F7931E" strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
          </h1>

          <p data-copy className="osh-text">
            From picking the perfect course to sailing through your visa, we walk beside you at every single step of the way.
          </p>

          <div data-copy>
            <Link href="#about" className="osh-btn group inline-flex h-14 items-center gap-3 rounded-full pl-7 pr-2.5 text-base font-semibold focus:outline-none">
              Learn more
              <span className="grid size-9 place-items-center rounded-full bg-white text-[#350C0E] transition-transform duration-300 group-hover:rotate-90">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* One photo, three panels */}
        <div data-panels className="osh-panels">
          {PANELS.map(({ from, to }, i) => (
            <div key={from} data-panel className="osh-panel">
              <div data-panel-inner className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute inset-y-0"
                  style={{
                    left: `${(-from / (to - from)) * 100}%`,
                    width: `${(IMAGE_WIDTH / (to - from)) * 100}%`,
                  }}>
                  <Image
                    src="/herostory.png"
                    alt={i === 0 ? "Three students studying together outdoors at sunset" : ""}
                    fill
                    priority
                    quality={90}
                    sizes="(min-width: 1024px) 1100px, 150vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Slowly turning stamp, taken from the promise in the copy */}
          <div data-badge aria-hidden className="osh-badge">
            <svg viewBox="0 0 120 120" className="size-full">
              <circle cx="60" cy="60" r="60" fill="#F7931E" />
              <g data-badge-text>
                <defs>
                  <path id="osh-circle" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
                </defs>
                <text fill="#350C0E" fontSize="11.6" fontWeight="700">
                  <textPath href="#osh-circle" textLength="270" lengthAdjust="spacing">
                    WITH YOU AT EVERY STEP •
                  </textPath>
                </text>
              </g>
              <path d="M60 42 34 53l26 11 21-9v15h5V53L60 42Zm-15 21v11c0 4 7 8 15 8s15-4 15-8V63l-15 6.5-15-6.5Z" fill="#350C0E" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
