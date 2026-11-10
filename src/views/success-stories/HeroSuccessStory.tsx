"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { getImageProps } from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const LEAD = "Success stories from students who turned their study-abroad".split(" ");
const ACCENT = "dreams into reality".split(" ");

/** The photo is cut into COLS × ROWS pieces */
const COLS = 6;
const ROWS = 4;
const PIECES = Array.from({ length: COLS * ROWS }, (_, i) => ({ c: i % COLS, r: Math.floor(i / COLS) }));
const RADIUS = 28;

const PHOTO = getImageProps({ src: "/success-students.png", alt: "", width: 1365, height: 768, quality: 90 }).props.src;

/** Repeatable pseudo-random number in 0–1, so the scatter looks the same on every visit */
const rand = (n: number) => {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

export default function HeroSuccessStory() {
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
        if (!motionOK) return; // reduced motion: the markup already shows the whole photo

        const stage = q("[data-stage]")[0];
        const frame = q("[data-frame]")[0];
        const pieces = q("[data-piece]") as HTMLElement[];
        const inners = q("[data-piece-in]") as HTMLElement[];

        const text = q("[data-text]")[0];
        const nCols = isDesktop ? 8 : 5;
        const nRows = isDesktop ? 5 : 10;
        const top = isDesktop ? 100 : 84; // clear of the navbar

        // An imaginary grid over the stage: each piece floats in its own cell, and cells under the headline stay empty
        let layoutKey = "";
        let cellW = 0;
        let cellH = 0;
        let cells: { c: number; r: number }[] = [];
        const layout = () => {
          const key = `${stage.offsetWidth}x${stage.offsetHeight}x${text.offsetHeight}`;
          if (key === layoutKey) return;
          layoutKey = key;
          cellW = stage.offsetWidth / nCols;
          cellH = (stage.offsetHeight - top) / nRows;
          const left = text.offsetLeft - text.offsetWidth / 2;
          const textTop = text.offsetTop - text.offsetHeight / 2;
          const underText = ({ c, r }: { c: number; r: number }) =>
            c * cellW < left + text.offsetWidth && (c + 1) * cellW > left && top + r * cellH < textTop + text.offsetHeight && top + (r + 1) * cellH > textTop;
          const score = (cell: { c: number; r: number }) => (underText(cell) ? 1 : 0) + rand(cell.c * 13 + cell.r * 7 + 3) * 0.9;
          cells = Array.from({ length: nCols * nRows }, (_, n) => ({ c: n % nCols, r: Math.floor(n / nCols) })).sort((a, b) => score(a) - score(b));
        };

        // Where a piece floats, as an offset from its place in the finished photo
        const scatter = (i: number) => {
          layout();
          const cell = cells[i];
          const stageBox = stage.getBoundingClientRect();
          const frameBox = frame.getBoundingClientRect();
          const p = pieces[i];
          return {
            x: cell.c * cellW + cellW * (0.5 + (rand(i + 11) - 0.5) * 0.26) - (frameBox.left - stageBox.left + p.offsetLeft + p.offsetWidth / 2),
            y: top + cell.r * cellH + cellH * (0.5 + (rand(i + 29) - 0.5) * 0.26) - (frameBox.top - stageBox.top + p.offsetTop + p.offsetHeight / 2),
          };
        };

        // Big enough to read, small enough to stay inside its own cell
        const floatScale = (i: number) => {
          layout();
          const p = pieces[i];
          return Math.min(1, 0.82 * Math.min(cellW / p.offsetWidth, cellH / p.offsetHeight)) * (0.82 + rand(i + 23) * 0.18);
        };

        /* On load: pieces pop into the air one by one, the headline rises in the middle */
        const intro = gsap
          .timeline({ paused: true, defaults: { ease: "expo.out" } })
          .fromTo(
            inners,
            { autoAlpha: 0, scale: 0.15, rotation: (i: number) => rand(i + 5) * 70 - 35 },
            { autoAlpha: 1, scale: 1, rotation: 0, duration: 1, ease: "back.out(1.6)", stagger: { each: 0.04, from: "random" } },
            0,
          )
          .fromTo(q("[data-w]"), { autoAlpha: 0, yPercent: 112 }, { autoAlpha: 1, yPercent: 0, duration: 1.1, stagger: 0.05 }, 0.25)
          .fromTo(q("[data-underline]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.9, ease: "power2.inOut" }, 1.05)
          .fromTo(q("[data-cta]"), { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 1.05);

        let cancelled = false;
        const loader = new window.Image();
        loader.src = PHOTO;
        loader
          .decode()
          .catch(() => undefined)
          .finally(() => {
            if (!cancelled) intro.play();
          });

        /* Idle: the pieces hover gently until scrolling begins */
        const hover = () =>
          inners.map((inner, i) =>
            gsap.to(inner, { y: rand(i + 3) * 14 - 7, x: rand(i + 17) * 10 - 5, duration: 2.2 + rand(i) * 1.6, ease: "sine.inOut", yoyo: true, repeat: -1 }),
          );
        let hovering = hover();
        let isHovering = true;

        /* On scroll: piece by piece, the photo builds itself */
        const r = `${RADIUS}px`;
        const build = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
            invalidateOnRefresh: true,
            onUpdate(self) {
              const shouldHover = self.progress < 0.015;
              if (shouldHover === isHovering) return;
              isHovering = shouldHover;
              if (shouldHover) hovering = hover();
              else {
                hovering.forEach((t) => t.kill());
                gsap.to(inners, { x: 0, y: 0, duration: 0.35, ease: "power2.out" });
              }
            },
          },
        });

        build.to(q("[data-text]"), { autoAlpha: 0, y: -46, scale: 0.94, duration: 0.2, ease: "power2.in" }, 0.02);

        const order = PIECES.map((_, i) => i).sort((a, b) => rand(a + 41) - rand(b + 41));
        order.forEach((index, turn) => {
          const { c, r: row } = PIECES[index];
          const tl = c === 0 && row === 0 ? r : "0px";
          const tr = c === COLS - 1 && row === 0 ? r : "0px";
          const br = c === COLS - 1 && row === ROWS - 1 ? r : "0px";
          const bl = c === 0 && row === ROWS - 1 ? r : "0px";
          build.fromTo(
            pieces[index],
            {
              x: () => scatter(index).x,
              y: () => scatter(index).y,
              rotation: rand(index + 7) * 36 - 18,
              scale: () => floatScale(index),
              borderRadius: "18px 18px 18px 18px",
              boxShadow: "0 26px 44px -20px rgba(53,12,14,0.55)",
            },
            {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              borderRadius: `${tl} ${tr} ${br} ${bl}`,
              boxShadow: "0 0px 0px 0px rgba(53,12,14,0)",
              duration: 0.34,
              ease: "power3.inOut",
            },
            0.08 + (turn / order.length) * 0.5,
          );
        });

        // Once every piece has landed, the solid photo underneath hides the hairline joins
        build
          .set(q("[data-whole]"), { autoAlpha: 1 }, 0.93)
          .fromTo(q("[data-final]"), { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.1, stagger: 0.03, ease: "power3.out" }, 0.9);

        return () => {
          cancelled = true;
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    // Pulled up under the sticky header so the navbar floats over the scene
    <section ref={root} className="ssh relative -mt-20 w-full lg:-mt-24">
      <style>{`
        .ssh { color: #350C0E; background: #FFFEFA; }
        .ssh .ssh-stage { position: relative; display: flex; flex-direction: column; align-items: center; gap: 2rem; padding: 7rem 1.5rem 3rem; background: radial-gradient(55% 60% at 88% 16%, rgba(247,147,30,0.2), transparent 70%), radial-gradient(50% 55% at 8% 88%, rgba(47,107,255,0.11), transparent 70%), linear-gradient(180deg, #FFF0E1 0%, #FFF8F0 58%, #FFFEFA 100%); }
        .ssh .ssh-text { position: relative; z-index: 3; width: 100%; max-width: 46rem; text-align: center; }
        .ssh .ssh-h1 { font-size: clamp(2.05rem, 9vw, 3rem); line-height: 1.07; letter-spacing: -0.035em; font-weight: 600; }
        .ssh .ssh-w { display: inline-block; overflow: hidden; padding: 0 0.04em 0.14em 0; margin-bottom: -0.14em; vertical-align: top; }
        .ssh .ssh-accent { font-size: 1.16em; line-height: 0.95; letter-spacing: -0.015em; font-weight: 400; font-stretch: normal; color: #D9651A; }
        .ssh .ssh-btn { background: #350C0E; color: #fff; transition: background-color .3s ease, translate .3s ease; }
        .ssh .ssh-btn:hover, .ssh .ssh-btn:focus-visible { background: #F7931E; translate: 0 -2px; }

        .ssh .ssh-holder { width: 100%; max-width: 84rem; display: flex; flex-direction: column; align-items: center; }
        .ssh .ssh-frame { --vx: 1; --vy: 1; position: relative; z-index: 2; width: min(100%, calc((100svh - 9rem) * 1.7773)); aspect-ratio: 1365 / 768; }
        .ssh .ssh-whole { position: absolute; inset: 0; border-radius: ${RADIUS}px; background-size: cover; background-position: center bottom; }
        .ssh .ssh-pieces { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(${COLS}, minmax(0, 1fr)); grid-template-rows: repeat(${ROWS}, minmax(0, 1fr)); }
        .ssh .ssh-piece { position: relative; overflow: hidden; will-change: transform; }
        .ssh .ssh-piece-in { position: absolute; inset: 0; background-size: calc(${COLS * 100}% / var(--vx)) calc(${ROWS * 100}% / var(--vy)); background-position: calc(((1 / var(--vx) - 1) / 2 + var(--c) / ${COLS}) / (1 / var(--vx) - 1 / ${COLS}) * 100%) calc((1 / var(--vy) - 1 + var(--r) / ${ROWS}) / (1 / var(--vy) - 1 / ${ROWS}) * 100%); }

        .ssh .ssh-final { position: absolute; z-index: 3; left: 0; right: 0; top: calc(100% + 0.9rem); display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
        .ssh .ssh-glass { display: flex; align-items: center; gap: 0.85rem; height: 4.25rem; padding: 0 1.4rem; border-radius: 1.25rem; background: rgba(255,255,255,0.88); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); box-shadow: 0 24px 44px -24px rgba(53,12,14,0.55); }
        .ssh .ssh-value { font-size: 1.85rem; line-height: 1; letter-spacing: -0.04em; font-weight: 600; }
        .ssh .ssh-label { font-size: 0.8125rem; line-height: 1.2; font-weight: 500; color: rgba(53,12,14,0.7); }

        /* Phones: tighter crop on the students, stats below the photo */
        @media (max-width: 639px) {
          .ssh .ssh-frame { --vx: 0.71; aspect-ratio: 5 / 4; margin-bottom: 9.5rem; }
        }
        @media (min-width: 640px) {
          .ssh .ssh-final { top: auto; left: 1.25rem; right: 1.25rem; bottom: 1.25rem; flex-direction: row; justify-content: space-between; }
        }

        @media (min-width: 1024px) {
          .ssh .ssh-stage { padding: 8rem 5.4vw 3rem; }
          .ssh .ssh-h1 { font-size: min(4.2vw, 8vh, 4.5rem); }
          .ssh .ssh-glass { height: 4.75rem; padding: 0 1.75rem; }
          .ssh .ssh-value { font-size: 2.25rem; }
          .ssh .ssh-label { font-size: 0.9375rem; }
        }

        /* With motion on, the scene is a sticky stage: text in the middle, pieces around it */
        @media (prefers-reduced-motion: no-preference) {
          .ssh { height: 190svh; }
          .ssh .ssh-stage { position: sticky; top: 0; height: 100svh; justify-content: center; overflow: clip; gap: 0; padding-bottom: 1.5rem; }
          .ssh .ssh-holder { position: absolute; inset: 5.25rem 1.5rem 1.5rem; width: auto; max-width: none; justify-content: center; }
          .ssh .ssh-frame { width: min(100%, 84rem, calc((100svh - 13rem) * 1.7773)); }
          .ssh .ssh-text { position: absolute; left: 50%; top: calc(50% + 2.25rem); width: min(100% - 3rem, 46rem); translate: -50% -50%; }
          .ssh [data-piece-in], .ssh [data-w], .ssh [data-cta], .ssh [data-whole], .ssh [data-final] { visibility: hidden; }
        }
        @media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
          .ssh { height: 200svh; }
          .ssh .ssh-holder { inset: 6.25rem 5.4vw 1.25rem; }
          .ssh .ssh-frame { width: min(100%, 84rem, calc((100svh - 7.5rem) * 1.7773)); }
          .ssh .ssh-text { width: 46vw; top: calc(50% + 2.75rem); }
        }
        /* Short, wide screens: keep the full container width and crop the map off the top instead */
        @media (min-width: 1024px) and (min-aspect-ratio: 2 / 1) and (prefers-reduced-motion: no-preference) {
          .ssh .ssh-frame { --vy: 0.68; aspect-ratio: 2.6; width: min(100%, 84rem, calc((100svh - 7.5rem) * 2.6)); }
        }
      `}</style>

      <div data-stage className="ssh-stage">
        <div data-text className="ssh-text">
          <h1 className="ssh-h1 font-display">
            {LEAD.map((word, i) => (
              <span key={i}>
                <span className="ssh-w">
                  <span data-w className="inline-block">
                    {word}
                  </span>
                </span>{" "}
              </span>
            ))}
            <span className="relative inline-block">
              {ACCENT.map((word, i) => (
                <span key={i}>
                  <span className="ssh-w">
                    <span data-w className={`${accentSerif.className} ssh-accent inline-block`}>
                      {word}
                    </span>
                  </span>{" "}
                </span>
              ))}
              <svg aria-hidden viewBox="0 0 320 16" preserveAspectRatio="none" className="absolute left-0 w-full overflow-visible" style={{ bottom: "-0.14em", height: "0.16em" }}>
                <path data-underline d="M3 11 C 70 3, 170 2, 317 8" fill="none" stroke="#F7931E" strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </svg>
            </span>
          </h1>
          <div data-cta style={{ marginTop: "1.75rem" }}>
            <CtaLink />
          </div>
        </div>

        <div className="ssh-holder">
          <div data-frame className="ssh-frame" role="img" aria-label="Three students smiling with their books after receiving study abroad offers">
            <div data-whole className="ssh-whole" style={{ backgroundImage: `url("${PHOTO}")` }} />
            <div className="ssh-pieces">
              {PIECES.map(({ c, r }) => (
                <div key={`${c}-${r}`} data-piece className="ssh-piece">
                  <div
                    data-piece-in
                    className="ssh-piece-in"
                    style={
                      {
                        backgroundImage: `url("${PHOTO}")`,
                        "--c": c,
                        "--r": r,
                      } as CSSProperties
                    }
                  />
                </div>
              ))}
            </div>

            <div className="ssh-final">
              <div data-final className="ssh-glass">
                <span className="ssh-value font-display">5,000+</span>
                <span className="ssh-label">
                  Students Placed
                  <br />
                  Abroad
                </span>
              </div>
              <div data-final>
                <CtaLink />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaLink() {
  return (
    <Link href="/contact" className="ssh-btn group inline-flex h-14 items-center gap-3 rounded-full pl-7 pr-2.5 text-base font-semibold focus:outline-none">
      Schedule A Free Consultation
      <span className="grid size-9 place-items-center rounded-full bg-white text-[#350C0E] transition-transform duration-300 group-hover:rotate-90">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
