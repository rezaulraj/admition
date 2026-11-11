"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const RADIUS = 28;

/**
 * The photo is split by slanted cuts that run in the gaps between the people.
 * Each number is where a cut meets the top edge, as a % of the frame width; it leans left by `lean` on the way down.
 */
const DESKTOP = { cuts: [20, 41, 62, 77.6], lean: 10 };
const PHONE = { cuts: [10, 31, 52.7, 73.5], lean: 13.3 };

/** How far each slice sits from its place before it joins: y in px, x in multiples of the gap */
const OFFSETS = [
  { y: -34, x: -2 },
  { y: 30, x: -1 },
  { y: -54, x: 0 },
  { y: 24, x: 1 },
  { y: -30, x: 2 },
];

/** CSS polygon for slice `i`, sharing its edges exactly with the neighbours */
function slicePolygon(i: number, { cuts, lean }: { cuts: number[]; lean: number }) {
  const left = i === 0 ? [0, 0] : [cuts[i - 1], cuts[i - 1] - lean];
  const right = i === cuts.length ? [100, 100] : [cuts[i], cuts[i] - lean];
  return `polygon(${left[0]}% 0%, ${right[0]}% 0%, ${right[1]}% 100%, ${left[1]}% 100%)`;
}

export default function CareerHero() {
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
        if (!motionOK) return; // reduced motion: the markup shows the whole photo

        const frame = q("[data-frame]")[0];
        const slices = q("[data-slice]") as HTMLElement[];
        const floats = q("[data-float]") as HTMLElement[];
        const gap = isDesktop ? 15 : 6;
        const depth = isDesktop ? 1 : 0.42;

        /* On load: copy rises, each slice slides into its own slanted window from alternate sides */
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo(q("[data-eyebrow]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.1)
          .fromTo(q("[data-word]"), { autoAlpha: 0, yPercent: 115, rotate: 4 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.12 }, 0.15)
          .fromTo(q("[data-underline]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.9, ease: "power2.inOut" }, 0.9)
          .fromTo(q("[data-copy]"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.55)
          .fromTo(q("[data-inner]"), { autoAlpha: 0, yPercent: (i: number) => (i % 2 ? 105 : -105) }, { autoAlpha: 1, yPercent: 0, duration: 1.5, stagger: 0.1 }, 0.3);

        /* Idle: the slices drift gently until scrolling starts */
        const drift = () => floats.map((f, i) => gsap.to(f, { y: i % 2 ? 9 : -9, duration: 2.6 + i * 0.35, ease: "sine.inOut", yoyo: true, repeat: -1 }));
        let drifting = drift();
        let isDrifting = true;

        /* On scroll: the slices slide together until the photo is whole, just as it reaches the navbar */
        const join = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${Math.max(220, frame.offsetTop - 112)}`,
            scrub: 0.7,
            invalidateOnRefresh: true,
            onUpdate(self) {
              const shouldDrift = self.progress < 0.02;
              if (shouldDrift === isDrifting) return;
              isDrifting = shouldDrift;
              if (shouldDrift) drifting = drift();
              else {
                drifting.forEach((t) => t.kill());
                gsap.to(floats, { y: 0, duration: 0.4, ease: "power2.out" });
              }
            },
          },
        });

        join.fromTo(frame, { scale: isDesktop ? 0.955 : 1 }, { scale: 1, duration: 1, ease: "power1.inOut" }, 0).fromTo(
          frame,
          { clipPath: `inset(-22% -8% -22% -8% round ${RADIUS}px)` },
          { clipPath: `inset(0% 0% 0% 0% round ${RADIUS}px)`, duration: 0.3 },
          0.7,
        );
        slices.forEach((slice, i) => {
          join.fromTo(
            slice,
            { x: OFFSETS[i].x * gap, y: OFFSETS[i].y * depth },
            { x: 0, y: 0, duration: 0.8, ease: "power2.inOut" },
            Math.abs(i - 2) * 0.05,
          );
        });
        // Once joined, the uncut photo underneath hides any hairline along the cuts
        join.set(q("[data-whole]"), { autoAlpha: 1 }, 0.97);
      },
    );

    return () => mm.revert();
  }, []);

  return (
    // Pulled up under the sticky header so the navbar floats over the warm background
    <section ref={root} className="ckh relative -mt-20 w-full lg:-mt-24">
      <style>{`
        .ckh { overflow: clip; color: #350C0E; background: radial-gradient(60% 45% at 90% 8%, rgba(247,147,30,0.2), transparent 70%), linear-gradient(180deg, #FFF0E1 0%, #FFF8F0 46%, #FFFEFA 100%); }
        .ckh .ckh-wrap { max-width: var(--page-max); margin: 0 auto; padding: 7.5rem 1.5rem 4rem; }
        .ckh .ckh-head { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2rem; }
        .ckh .ckh-title { margin-top: 1.5rem; font-size: clamp(2.9rem, 13vw, 4.4rem); line-height: 1.02; letter-spacing: -0.04em; font-weight: 600; }
        .ckh .ckh-mask { display: block; overflow: hidden; padding: 0 0.1em 0.12em 0; margin-bottom: -0.12em; }
        .ckh .ckh-accent { font-size: 1.16em; line-height: 0.9; letter-spacing: -0.02em; font-weight: 400; font-stretch: normal; color: #D9651A; }
        .ckh .ckh-text { max-width: 31rem; font-size: 1.0625rem; line-height: 1.65; color: rgba(53,12,14,0.74); }
        .ckh .ckh-btn { margin-top: 1.75rem; background: #350C0E; color: #fff; transition: background-color .3s ease, translate .3s ease; }
        .ckh .ckh-btn:hover, .ckh .ckh-btn:focus-visible { background: #F7931E; translate: 0 -2px; }

        .ckh .ckh-frame { position: relative; margin-top: 3.25rem; aspect-ratio: 4 / 3; border-radius: ${RADIUS}px; will-change: transform; }
        .ckh .ckh-whole { position: absolute; inset: 0; overflow: hidden; border-radius: ${RADIUS}px; }
        .ckh .ckh-photo { object-fit: cover; object-position: 90% 30%; }
        .ckh .ckh-float, .ckh .ckh-slice { position: absolute; inset: 0; display: none; }
        .ckh .ckh-inner { position: absolute; inset: 0; }
        ${OFFSETS.map((_, i) => `.ckh .ckh-slice-${i} { clip-path: ${slicePolygon(i, PHONE)}; }`).join("\n        ")}

        @media (min-width: 1024px) {
          .ckh .ckh-wrap { padding: 9rem var(--page-gutter) 5rem; }
          .ckh .ckh-head { grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); align-items: end; gap: 4rem; }
          .ckh .ckh-title { font-size: clamp(3.4rem, 5.5vw, 5.9rem); }
          .ckh .ckh-frame { margin-top: 5.5rem; aspect-ratio: 2.05; }
          .ckh .ckh-photo { object-position: 50% 30%; }
          ${OFFSETS.map((_, i) => `.ckh .ckh-slice-${i} { clip-path: ${slicePolygon(i, DESKTOP)}; }`).join("\n          ")}
        }
        /* Short, wide screens: same container width, shallower crop, so the joined photo fits under the navbar */
        @media (min-width: 1024px) and (min-aspect-ratio: 2 / 1) {
          .ckh .ckh-wrap { padding-top: 7.5rem; }
          .ckh .ckh-frame { margin-top: 4.25rem; aspect-ratio: 2.7; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .ckh .ckh-float, .ckh .ckh-slice { display: block; }
          .ckh [data-whole], .ckh [data-eyebrow], .ckh [data-word], .ckh [data-copy], .ckh [data-inner] { visibility: hidden; }
        }
      `}</style>

      <div className="ckh-wrap">
        <div className="ckh-head">
          <div>
            <p data-eyebrow className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
              <span className="h-3.5 w-5 bg-[#F7931E] [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
              Careers
            </p>
            <h1 className="ckh-title font-display">
              <span className="ckh-mask">
                <span data-word className="inline-block origin-bottom-left">
                  Build A Career
                </span>{" "}
              </span>
              <span className="ckh-mask">
                <span data-word className={`${accentSerif.className} ckh-accent inline-block origin-bottom-left`}>
                  That Changes Lives
                </span>
              </span>
              <svg aria-hidden viewBox="0 0 320 16" preserveAspectRatio="none" className="mt-1 block overflow-visible" style={{ width: "min(100%, 7.2em)", height: "0.16em" }}>
                <path data-underline d="M3 11 C 70 3, 170 2, 317 8" fill="none" stroke="#F7931E" strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </svg>
            </h1>
          </div>

          <div>
            <p data-copy className="ckh-text">
              Join a team that helps students take on the world with confidence. From guiding university choices to visa support, we handle it all so you can focus on doing meaningful work.
            </p>
            <div data-copy>
              <Link href="#careers-openings" className="ckh-btn group inline-flex h-14 items-center gap-3 rounded-full pl-7 pr-2.5 text-base font-semibold focus:outline-none">
                Explore Careers
                <span className="grid size-9 place-items-center rounded-full bg-white text-[#350C0E] transition-transform duration-300 group-hover:rotate-90">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div data-frame className="ckh-frame">
          <div data-whole className="ckh-whole">
            <Image src="/carrer.png" alt="The Admission OnBoard team working together in the office" fill priority quality={90} sizes="(min-width: 1024px) 90vw, 150vw" className="ckh-photo" />
          </div>
          {OFFSETS.map((_, i) => (
            <div key={i} aria-hidden data-float className="ckh-float">
              <div data-slice className={`ckh-slice ckh-slice-${i}`}>
                <div data-inner className="ckh-inner">
                  <Image src="/carrer.png" alt="" fill priority quality={90} sizes="(min-width: 1024px) 90vw, 150vw" className="ckh-photo" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
