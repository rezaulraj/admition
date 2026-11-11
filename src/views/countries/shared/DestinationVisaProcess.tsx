"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

export type Step = {
  title: string;
  description?: string;
  listIntro?: string;
  list?: string[];
  tip?: string;
  after?: string;
};


const TONES = [
  { bg: "#FFE7D1", accent: "#D9651A" },
  { bg: "#E5EBFF", accent: "#2F6BFF" },
  { bg: "#DFF4D9", accent: "#2E8F29" },
  { bg: "#FFF0C7", accent: "#B97F08" },
  { bg: "#FFE0E8", accent: "#D43D6C" },
];

type Props = {
  /** Country name, e.g. "Australia" */
  destination: string;
  intro: string;
  image: { src: string; alt: string; width: number; height: number };
  steps: Step[];
};

/** "Admission 🎓" -> { name: "Admission", emoji: "🎓" } */
function splitTitle(title: string) {
  const match = title.match(/^(.*?)\s*(\p{Extended_Pictographic}️?)$/u);
  return match ? { name: match[1], emoji: match[2] } : { name: title, emoji: "" };
}

function Item({ item, color }: { item: string; color: string }) {
  const labelled = /^[^:]{1,40}:/.test(item);
  return (
    <li>
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={3} aria-hidden style={{ flex: "none", width: "0.9rem", height: "0.9rem", marginTop: "0.28rem" }}>
        <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>
        {labelled ? (
          <>
            <strong>{item.slice(0, item.indexOf(":") + 1)}</strong>
            {item.slice(item.indexOf(":") + 1)}
          </>
        ) : (
          item
        )}
      </span>
    </li>
  );
}

export default function DestinationVisaProcess({ destination, intro, image, steps }: Props) {
  const IMAGE_RATIO = image.width / image.height;
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add(
      { isDesktop: "(min-width: 1024px)", motionOK: "(prefers-reduced-motion: no-preference)" },
      (ctx) => {
        const { isDesktop, motionOK } = ctx.conditions as { isDesktop: boolean; motionOK: boolean };
        const cards = q("[data-av-card]") as HTMLElement[];

        // The step you are reading is the one crossing the middle of the screen
        cards.forEach((card, i) =>
          ScrollTrigger.create({
            trigger: card,
            start: "top 58%",
            end: "bottom 58%",
            onToggle: (self) => self.isActive && setActive(i),
          }),
        );
        if (!motionOK) return;

        gsap
          .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: el, start: "top 78%", once: true } })
          .fromTo(q("[data-av-eyebrow]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
          .fromTo(q("[data-av-word]"), { autoAlpha: 0, yPercent: 115, rotate: 4 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.12 }, 0.08)
          .fromTo(q("[data-av-copy]"), { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.4);

        /* The photo window opens up */
        const frame = q("[data-av-frame]")[0];
        gsap
          .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: frame, start: "top 88%", once: true } })
          .fromTo(frame, { clipPath: "inset(12% 10% 12% 10% round 48px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.6, ease: "power3.inOut", clearProps: "clipPath" }, 0)
          .fromTo(q("[data-av-zoom]"), { scale: 1.25 }, { scale: 1, duration: 2 }, 0)
          .fromTo(q("[data-av-badge]"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.9);

        /* Cards rise in as you reach them */
        cards.forEach((card, i) =>
          gsap.fromTo(
            card,
            { autoAlpha: 0, y: 70, rotate: i % 2 ? 1 : -1 },
            { autoAlpha: 1, y: 0, rotate: 0, duration: 1.15, ease: "expo.out", clearProps: "transform", scrollTrigger: { trigger: card, start: "top 90%", once: true } },
          ),
        );

        if (isDesktop) {
          /* Reading down the steps carries the view across Sydney: from the Opera House to the Harbour Bridge */
          const pan = q("[data-av-pan]")[0];
          gsap.fromTo(
            pan,
            { x: 0 },
            {
              x: () => Math.min(0, frame.offsetWidth - pan.offsetWidth),
              ease: "none",
              scrollTrigger: { trigger: q("[data-av-list]")[0], start: "top 62%", end: "bottom 75%", scrub: 0.9, invalidateOnRefresh: true },
            },
          );
        }
      },
    );

    return () => mm.revert();
     
  }, []);

  /* The label on the photo changes with the step */
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const labels = gsap.utils.selector(el)("[data-av-label]");
    gsap.killTweensOf(labels);
    labels.forEach((label, i) => {
      if (i === active) gsap.fromTo(label, { autoAlpha: 0, yPercent: 60 }, { autoAlpha: 1, yPercent: 0, duration: 0.6, ease: "expo.out" });
      else gsap.to(label, { autoAlpha: 0, yPercent: -60, duration: 0.35, ease: "power2.in" });
    });
  }, [active]);

  const current = splitTitle(steps[active].title);

  return (
    <section ref={root} className="av relative w-full">
      <style>{`
        .av { overflow: clip; color: #350C0E; background: #FFFEFA; }
        .av .av-wrap { max-width: var(--page-max); margin: 0 auto; padding: 1.5rem 1.5rem 5rem; }
        .av .av-head { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.25rem; }
        .av .av-title { margin-top: 1.25rem; font-size: clamp(2.6rem, 11.5vw, 4rem); line-height: 1.02; letter-spacing: -0.04em; font-weight: 600; }
        .av .av-mask { display: inline-block; overflow: hidden; padding: 0 0.08em 0.14em 0; margin-bottom: -0.14em; vertical-align: top; }
        .av .av-accent { font-size: 1.16em; line-height: 0.9; letter-spacing: -0.02em; font-weight: 400; font-stretch: normal; color: #F7931E; }
        .av .av-text { max-width: 28rem; font-size: 1.0625rem; line-height: 1.6; color: rgba(53,12,14,0.74); }

        .av .av-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.25rem; margin-top: 2.25rem; }
        .av .av-frame { position: relative; aspect-ratio: ${IMAGE_RATIO}; overflow: hidden; border-radius: 28px; background: #F6C79B; }
        .av .av-pan { position: absolute; left: 0; top: 0; height: 100%; aspect-ratio: ${IMAGE_RATIO}; will-change: transform; }
        .av .av-zoom { position: absolute; inset: 0; }
        .av .av-badge { display: none; }

        .av .av-list { display: flex; flex-direction: column; gap: 1rem; }
        .av .av-card { position: relative; padding: 1.5rem; border-radius: 1.75rem; background: #fff; box-shadow: inset 0 0 0 1px rgba(53,12,14,0.09); transition: opacity .5s ease, box-shadow .5s ease, translate .5s cubic-bezier(.2,.8,.2,1); }
        .av .av-card-top { display: flex; align-items: center; gap: 0.85rem; }
        .av .av-emoji { flex: none; display: grid; place-items: center; width: 3rem; height: 3rem; border-radius: 1rem; font-size: 1.4rem; }
        .av .av-emoji.is-num { font-size: 1rem; font-weight: 700; }
        .av .av-num { margin-left: auto; font-size: 3rem; line-height: 0.85; letter-spacing: -0.05em; font-weight: 700; color: rgba(53,12,14,0.05); -webkit-text-stroke: 1.5px rgba(53,12,14,0.22); }
        .av .av-step { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(53,12,14,0.6); }
        .av .av-h3 { margin-top: 1rem; font-size: 1.6rem; line-height: 1.1; letter-spacing: -0.03em; font-weight: 600; }
        .av .av-desc { margin-top: 0.6rem; font-size: 0.9688rem; line-height: 1.6; color: rgba(53,12,14,0.78); }
        .av .av-intro { margin-top: 0.9rem; font-size: 0.9375rem; font-weight: 600; }
        .av .av-items { display: flex; flex-direction: column; gap: 0.55rem; margin-top: 0.9rem; }
        .av .av-items li { display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.9375rem; line-height: 1.55; color: rgba(53,12,14,0.8); }
        .av .av-items strong { font-weight: 600; color: #350C0E; }
        .av .av-tip { display: flex; align-items: flex-start; gap: 0.6rem; margin-top: 1.1rem; padding: 0.8rem 1rem; border-radius: 1rem; font-size: 0.9375rem; line-height: 1.5; font-weight: 500; }

        @media (min-width: 640px) { .av .av-card { padding: 2rem; } }
        @media (min-width: 1024px) {
          .av .av-wrap { padding: 2rem var(--page-gutter) 7rem; }
          .av .av-head { grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr); align-items: end; gap: 4rem; }
          .av .av-title { font-size: clamp(3.4rem, 5.5vw, 5.9rem); }
          .av .av-grid { grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr); align-items: start; gap: clamp(1.5rem, 3vw, 3rem); margin-top: 3.25rem; }
          .av .av-frame { position: sticky; top: 6.5rem; aspect-ratio: auto; height: min(calc(100svh - 8rem), 46rem); }
          .av .av-badge { position: absolute; left: 1rem; right: 1rem; bottom: 1rem; display: block; padding: 1rem 1.25rem 1.1rem; border-radius: 1.25rem; background: rgba(255,255,255,0.9); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); box-shadow: 0 24px 44px -26px rgba(53,12,14,0.6); }
          .av .av-badge-step { font-size: 0.8125rem; font-weight: 600; color: rgba(53,12,14,0.66); }
          .av .av-labels { display: grid; margin-top: 0.15rem; overflow: hidden; }
          .av .av-label { grid-area: 1 / 1; display: flex; align-items: center; gap: 0.6rem; font-size: clamp(1.25rem, 1.9vw, 1.75rem); line-height: 1.25; letter-spacing: -0.03em; font-weight: 600; }
          .av .av-label:not(.is-first) { visibility: hidden; }
          .av .av-segs { display: grid; grid-template-columns: repeat(${steps.length}, minmax(0, 1fr)); gap: 0.35rem; margin-top: 0.8rem; }
          .av .av-seg { height: 4px; border-radius: 9999px; background: rgba(53,12,14,0.12); overflow: hidden; }
          .av .av-seg span { display: block; height: 100%; width: 0; background: #F7931E; transition: width .6s cubic-bezier(.2,.8,.2,1); }
          .av .av-seg.is-done span { width: 100%; }
        }
        @media (min-width: 1024px) and (max-height: 760px) { .av .av-frame { top: 6.25rem; height: calc(100svh - 7.25rem); } }
        @media (prefers-reduced-motion: no-preference) {
          .av [data-av-eyebrow], .av [data-av-word], .av [data-av-copy], .av [data-av-card], .av [data-av-badge] { visibility: hidden; }
        }
        @media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
          .av .av-card:not(.is-on) { opacity: 0.5; }
          .av .av-card.is-on { translate: -6px 0; box-shadow: inset 0 0 0 2px var(--tone), 0 34px 60px -38px rgba(53,12,14,0.55); }
        }
      `}</style>

      <div className="av-wrap">
        <div className="av-head">
          <div>
            <p data-av-eyebrow className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
              <span className="h-3.5 w-5 shrink-0 bg-[#F7931E] [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
              {steps.length} steps to {destination}
            </p>
            <h2 className="av-title font-display">
              <span className="av-mask">
                <span data-av-word className="inline-block origin-bottom-left">
                  Admission &amp;
                </span>
              </span>{" "}
              <span className="av-mask">
                <span data-av-word className={`${accentSerif.className} av-accent inline-block origin-bottom-left`}>
                  Visa Process
                </span>
              </span>
            </h2>
          </div>
          <p data-av-copy className="av-text">
            {intro}
          </p>
        </div>

        <div className="av-grid">
          {/* A window onto Sydney that travels with the steps */}
          <div data-av-frame className="av-frame">
            <div data-av-pan className="av-pan">
              <div data-av-zoom className="av-zoom">
                <Image src={image.src} alt={image.alt} fill quality={90} sizes="(min-width: 1024px) 90vw, 100vw" className="object-cover" />
              </div>
            </div>

            <div data-av-badge aria-hidden className="av-badge">
              <p className="av-badge-step">
                Step {String(active + 1).padStart(2, "0")} of {String(steps.length).padStart(2, "0")}
              </p>
              <div className="av-labels">
                {steps.map((step, i) => {
                  const { name, emoji } = splitTitle(step.title);
                  return (
                    <p key={step.title} data-av-label className={`av-label font-display${i === 0 ? " is-first" : ""}`}>
                      {emoji && <span>{emoji}</span>}
                      {name}
                    </p>
                  );
                })}
              </div>
              <div className="av-segs">
                {steps.map((step, i) => (
                  <span key={step.title} className={`av-seg${i <= active ? " is-done" : ""}`}>
                    <span />
                  </span>
                ))}
              </div>
            </div>
            <span className="sr-only">Current step: {current.name}</span>
          </div>

          <ol data-av-list className="av-list">
            {steps.map((step, index) => {
              const tone = TONES[index % TONES.length];
              const { name, emoji } = splitTitle(step.title);
              return (
                <li key={step.title} data-av-card className={`av-card${active === index ? " is-on" : ""}`} style={{ "--tone": tone.accent } as CSSProperties}>
                  <div className="av-card-top">
                    <span aria-hidden className={`av-emoji${emoji ? "" : " is-num"}`} style={{ background: tone.bg, color: tone.accent }}>
                      {emoji || String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="av-step">Step {index + 1}</span>
                    <span aria-hidden className="av-num font-display">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="av-h3 font-display">{name}</h3>
                  {step.description && <p className="av-desc">{step.description}</p>}
                  {step.list && (
                    <>
                      {step.listIntro && <p className="av-intro">{step.listIntro}</p>}
                      <ul className="av-items">
                        {step.list.map((item) => (
                          <Item key={item} item={item} color={tone.accent} />
                        ))}
                      </ul>
                    </>
                  )}
                  {step.after && <p className="av-desc">{step.after}</p>}
                  {step.tip && (
                    <p className="av-tip" style={{ background: tone.bg }}>
                      <span aria-hidden>💡</span>
                      {step.tip}
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
