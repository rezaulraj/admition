"use client";

import React, {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

type Step = {
  number: number;
  title: string;
  icon: React.ReactNode;
};

const steps: Step[] = [
  {
    number: 1,
    title: "Activate Account",
    icon: (
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4 0-8 2-8 5v1h11.28A6 6 0 0 1 15 15.08 10.7 10.7 0 0 0 12 14Zm7 0-4 4-2-2-1.4 1.4L15 20.8l5.4-5.4Z" />
    ),
  },
  {
    number: 2,
    title: "Add Students",
    icon: (
      <path d="M12 2 3 7l9 5 7-3.89V16h2V7L12 2Zm-7 8.27V15c0 2.76 3.58 5 8 5s8-2.24 8-5v-4.73l-8 4.45-8-4.45Z" />
    ),
  },
  {
    number: 3,
    title: "Track Progress",
    icon: (
      <path d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.25 6.19 11.44 6.46 11.7a1.5 1.5 0 0 0 2.08 0c.27-.26 6.46-6.45 6.46-11.7C19.5 5.36 16.14 2 12 2Zm0 10.5A3 3 0 1 1 12 6.5a3 3 0 0 1 0 6Z" />
    ),
  },
  {
    number: 4,
    title: "Get Commissions",
    icon: (
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm.75 15.5v1.25h-1.5V17.5c-1.4-.2-2.5-.95-2.7-2.35h1.6c.13.65.65 1.05 1.6 1.05.9 0 1.45-.4 1.45-.95 0-.5-.35-.8-1.6-1.1-1.7-.4-2.8-1.05-2.8-2.55 0-1.2.9-2.05 2.45-2.3V8h1.5v1.3c1.35.25 2.2 1.05 2.35 2.25h-1.55c-.1-.55-.55-.9-1.3-.9-.8 0-1.3.35-1.3.85 0 .45.35.7 1.55 1 1.75.4 2.85 1.05 2.85 2.6 0 1.3-.95 2.15-2.6 2.4Z" />
    ),
  },
  {
    number: 5,
    title: "Grow Together",
    icon: (
      <path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 2c-2.7 0-6 1.34-6 4v2h8.5l1.5-3.3c-1-.4-2.3-.7-4-.7Zm8 0c-.62 0-1.35.06-2.1.2L12 17h6.5v-2c0-2-2.5-4-2.5-4Z" />
    ),
  },
];

const TONES = [
  {
    bg: "linear-gradient(180deg, #FFEBD9 0%, #FFCFA3 100%)",
    accent: "#F7931E",
  },
  {
    bg: "linear-gradient(180deg, #EEF2FF 0%, #C4D2FF 100%)",
    accent: "#2F6BFF",
  },
  {
    bg: "linear-gradient(180deg, #EBF8E7 0%, #BCE6B4 100%)",
    accent: "#3BAA35",
  },
  {
    bg: "linear-gradient(180deg, #FFF6DD 0%, #FFE0A0 100%)",
    accent: "#E08A00",
  },
  {
    bg: "linear-gradient(180deg, #FFEDF2 0%, #FFC9D6 100%)",
    accent: "#E5486F",
  },
];

/* Each step stands taller than the last; on phones each bar reaches further across */
const HEIGHTS = ["40%", "54%", "68%", "84%", "100%"];
const WIDTHS = ["72%", "79%", "86%", "93%", "100%"];

/* Position of an element inside an ancestor, ignoring transforms */
function offsetIn(node: HTMLElement, stop: HTMLElement) {
  let x = 0;
  let y = 0;
  let n: HTMLElement | null = node;
  while (n && n !== stop) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent as HTMLElement | null;
  }
  return { x: x + node.offsetWidth / 2, y: y + node.offsetHeight / 2 };
}

export default function RiseWithEveryStep() {
  const root = useRef<HTMLElement>(null);
  /* How many steps have been reached */
  const [reached, setReached] = useState(0);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add(
      {
        motionOK: "(prefers-reduced-motion: no-preference)",
        wide: "(min-width: 900px)",
      },
      (ctx) => {
        const { motionOK, wide } = ctx.conditions as {
          motionOK: boolean;
          wide: boolean;
        };
        if (!motionOK) {
          setReached(steps.length);
          return;
        }

        gsap
          .timeline({
            defaults: { ease: "expo.out" },
            scrollTrigger: { trigger: el, start: "top 78%", once: true },
          })
          .fromTo(
            q("[data-rs-eyebrow]"),
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.8 },
            0,
          )
          .fromTo(
            q("[data-rs-word]"),
            { autoAlpha: 0, yPercent: 115, rotate: 5 },
            {
              autoAlpha: 1,
              yPercent: 0,
              rotate: 0,
              duration: 1.2,
              stagger: 0.12,
            },
            0.08,
          )
          .fromTo(
            q("[data-rs-copy]"),
            { autoAlpha: 0, y: 22 },
            { autoAlpha: 1, y: 0, duration: 0.9 },
            0.4,
          );

        const stage = q("[data-rs-stage]")[0] as HTMLElement;

        /* The staircase builds itself */
        gsap
          .timeline({
            defaults: { ease: "expo.out" },
            scrollTrigger: { trigger: stage, start: "top 82%", once: true },
          })
          .fromTo(
            q("[data-rs-block]"),
            wide ? { scaleY: 0, autoAlpha: 0 } : { scaleX: 0, autoAlpha: 0 },
            {
              scaleY: 1,
              scaleX: 1,
              autoAlpha: 1,
              duration: 1.3,
              stagger: 0.1,
              ease: "power4.out",
              clearProps: "transform",
            },
            0,
          )
          .fromTo(
            q("[data-rs-node]"),
            { autoAlpha: 0, scale: 0.2 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.9,
              stagger: 0.1,
              ease: "back.out(2)",
            },
            0.45,
          )
          .fromTo(
            q("[data-rs-text] > *"),
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.04 },
            0.6,
          )
          .fromTo(
            q("[data-rs-flag]"),
            { autoAlpha: 0, scaleY: 0 },
            { autoAlpha: 1, scaleY: 1, duration: 0.8, ease: "back.out(2)" },
            1.1,
          );

        if (!wide) {
          /* Phones: each step lights up as it reaches the middle of the screen */
          q("[data-rs-step]").forEach((step, i) =>
            ScrollTrigger.create({
              trigger: step,
              start: "top 62%",
              onEnter: () => setReached((r) => Math.max(r, i + 1)),
              onLeaveBack: () => setReached(i),
            }),
          );
          return;
        }

        /* Desktop: a path climbs through every step and a dot follows it as you scroll */
        const svg = q("[data-rs-svg]")[0] as unknown as SVGSVGElement;
        const paths = q("[data-rs-path]") as unknown as SVGPathElement[];
        const nodes = q("[data-rs-node]") as HTMLElement[];
        let marks: number[] = [];

        const layout = () => {
          const w = stage.offsetWidth;
          const h = stage.offsetHeight;
          const pts = nodes.map((n) => offsetIn(n, stage));
          let d = `M ${pts[0].x} ${pts[0].y}`;
          const lengths: number[] = [0];
          const probe = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path",
          );
          for (let i = 1; i < pts.length; i++) {
            const a = pts[i - 1];
            const b = pts[i];
            const mid = (a.x + b.x) / 2;
            d += ` C ${mid} ${a.y}, ${mid} ${b.y}, ${b.x} ${b.y}`;
            probe.setAttribute("d", d);
            lengths.push(probe.getTotalLength());
          }
          svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
          paths.forEach((p) => p.setAttribute("d", d));
          const total = lengths[lengths.length - 1] || 1;
          marks = lengths.map((l) => l / total);
        };
        layout();
        ScrollTrigger.addEventListener("refreshInit", layout);

        const climb = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            start: "bottom 98%",
            end: "bottom 64%",
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) =>
              setReached(
                marks.filter((m) => self.progress >= m - 0.015).length,
              ),
          },
        });
        climb
          .fromTo(
            q("[data-rs-path]")[1],
            { drawSVG: "0%" },
            { drawSVG: "100%", duration: 1 },
            0,
          )
          .fromTo(
            q("[data-rs-climber]"),
            { autoAlpha: 1 },
            {
              autoAlpha: 1,
              duration: 1,
              motionPath: {
                path: paths[0],
                align: paths[0],
                alignOrigin: [0.5, 0.5],
              },
            },
            0,
          );

        return () => ScrollTrigger.removeEventListener("refreshInit", layout);
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="rs relative w-full">
      <style>{`
        .rs { color: #350C0E; overflow: clip;
          background:
            radial-gradient(40% 45% at 86% 50%, rgba(247,147,30,0.1), transparent 70%),
            radial-gradient(40% 45% at 10% 30%, rgba(47,107,255,0.06), transparent 70%),
            #FFFEFA; }
        .rs .rs-wrap { max-width: var(--page-max); margin: 0 auto; padding: 4.5rem 1.5rem 5rem; }

        .rs .rs-head { display: grid; gap: 1.25rem; }
        .rs .rs-eyebrow { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0.95rem 0.45rem 0.55rem; border-radius: 999px;
          background: #fff; box-shadow: 0 0 0 1px rgba(53,12,14,0.08), 0 10px 26px -16px rgba(53,12,14,0.4); font-size: 0.8rem; font-weight: 600; letter-spacing: 0.02em; }
        .rs .rs-eyebrow svg { color: #3BAA35; }
        .rs .rs-title { margin-top: 1.2rem; font-size: clamp(2.5rem, 11vw, 3.4rem); line-height: 1.02; letter-spacing: -0.045em; font-weight: 600; }
        .rs .rs-mask { display: inline-block; overflow: hidden; padding: 0.04em 0.08em 0.16em 0; margin: -0.04em 0 -0.16em; vertical-align: bottom; }
        .rs .rs-accent { color: #F7931E; font-weight: 400; font-style: italic; letter-spacing: -0.02em; font-size: 1.12em; line-height: 0.95; }
        .rs .rs-copy { max-width: 30rem; font-size: 1rem; line-height: 1.7; color: rgba(53,12,14,0.72); }

        /* Steps: stacked bars on phones */
        .rs .rs-stage { position: relative; margin-top: 2.75rem; }
        .rs .rs-steps { display: grid; gap: 0.85rem; }
        .rs .rs-svg { display: none; }
        .rs .rs-step { position: relative; width: var(--w); }
        .rs .rs-block { position: relative; overflow: hidden; display: flex; align-items: center; min-height: 5.5rem; padding: 1rem 1.25rem 1rem 5.25rem;
          border-radius: 22px; background: var(--bg); transform-origin: 0 50%; isolation: isolate;
          box-shadow: 0 0 0 1px rgba(53,12,14,0.05), 0 22px 44px -32px rgba(53,12,14,0.55); transition: box-shadow .5s ease; }
        .rs .rs-block::before { content: ""; position: absolute; inset: 0; z-index: -1; opacity: 0.35; pointer-events: none;
          background-image: radial-gradient(rgba(53,12,14,0.3) 1px, transparent 1.4px); background-size: 15px 15px;
          -webkit-mask-image: linear-gradient(160deg, transparent 30%, #000 100%); mask-image: linear-gradient(160deg, transparent 30%, #000 100%); }
        .rs .rs-num { position: absolute; right: 0.75rem; bottom: -1.2rem; z-index: -1; font-size: 5.5rem; font-weight: 700; line-height: 1; letter-spacing: -0.05em;
          color: transparent; -webkit-text-stroke: 1.5px rgba(53,12,14,0.1); pointer-events: none; transition: -webkit-text-stroke-color .5s ease; }
        .rs .rs-label { display: block; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(53,12,14,0.55); }
        .rs .rs-name { display: block; margin-top: 0.2rem; font-size: 1.12rem; line-height: 1.2; letter-spacing: -0.02em; font-weight: 600; }
        .rs .rs-node { position: absolute; z-index: 3; left: 1rem; top: 50%; margin-top: -1.75rem; display: grid; place-items: center; width: 3.5rem; height: 3.5rem;
          border-radius: 999px; background: #fff; color: var(--accent); box-shadow: 0 0 0 5px rgba(255,255,255,0.6), 0 14px 28px -12px rgba(53,12,14,0.5);
          transition: background .5s ease, color .5s ease, box-shadow .5s ease; }
        .rs .rs-node::after { content: ""; position: absolute; inset: -6px; border-radius: 999px; border: 2px solid var(--accent); opacity: 0; }
        .rs .rs-step.is-on .rs-node { background: #350C0E; color: #fff; box-shadow: 0 0 0 5px rgba(255,255,255,0.85), 0 16px 34px -10px rgba(53,12,14,0.7); }
        .rs .rs-step.is-on .rs-node::after { animation: rs-ping 2.4s cubic-bezier(.22,1,.36,1) infinite; }
        .rs .rs-step.is-on .rs-block { box-shadow: 0 0 0 2px var(--accent), 0 30px 50px -30px rgba(53,12,14,0.6); }
        .rs .rs-step.is-on .rs-num { -webkit-text-stroke-color: rgba(53,12,14,0.22); }
        .rs .rs-badge { position: absolute; z-index: 4; right: -0.2rem; top: -0.2rem; display: grid; place-items: center; width: 1.35rem; height: 1.35rem; border-radius: 999px;
          background: var(--accent); color: #fff; font-size: 0.66rem; font-weight: 700; box-shadow: 0 0 0 2.5px #fff; }
        @keyframes rs-ping { 0% { transform: scale(0.9); opacity: 0.9; } 100% { transform: scale(1.55); opacity: 0; } }
        .rs .rs-flag { display: none; }

        @media (prefers-reduced-motion: no-preference) {
          .rs [data-rs-eyebrow], .rs [data-rs-word], .rs [data-rs-copy], .rs [data-rs-block], .rs [data-rs-node], .rs [data-rs-text] > *, .rs [data-rs-flag], .rs [data-rs-climber] { visibility: hidden; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rs .rs-step.is-on .rs-node::after { animation: none; }
        }

        @media (min-width: 640px) {
          .rs .rs-wrap { padding: 5.5rem 2rem 6rem; }
        }

        /* Desktop: a rising staircase */
        @media (min-width: 900px) {
          .rs .rs-wrap { padding: 6rem var(--page-gutter) 6.5rem; }
          .rs .rs-head { grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); align-items: end; gap: 3rem; }
          .rs .rs-title { font-size: clamp(3rem, 4.8vw, 4.6rem); }
          .rs .rs-copy { justify-self: end; font-size: 1.05rem; }
          .rs .rs-stage { margin-top: 4.5rem; height: clamp(24rem, 58svh, 31rem); padding-top: 2.6rem; }
          .rs .rs-steps { height: 100%; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: clamp(0.75rem, 1.4vw, 1.25rem); align-items: end; }
          .rs .rs-stage::before { content: ""; position: absolute; inset: 2.6rem 0 0; pointer-events: none; opacity: 0.6;
            background-image: linear-gradient(rgba(53,12,14,0.07) 1px, transparent 1px); background-size: 100% 25%; }
          .rs .rs-svg { display: block; position: absolute; inset: 0; z-index: 2; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
          .rs .rs-step { width: auto; height: var(--h); }
          .rs .rs-block { height: 100%; min-height: 0; display: block; padding: 3.6rem 1.25rem 1.25rem; border-radius: 26px 26px 18px 18px; transform-origin: 50% 100%; }
          .rs .rs-num { left: 0.9rem; right: auto; bottom: -1.6rem; font-size: clamp(5rem, 8vw, 7.5rem); }
          .rs .rs-name { font-size: clamp(1rem, 1.35vw, 1.25rem); }
          .rs .rs-node { left: 50%; top: 0; margin: -2.1rem 0 0 -2.1rem; width: 4.2rem; height: 4.2rem; }
          .rs .rs-flag { display: block; position: absolute; z-index: 4; left: calc(50% + 0.6rem); top: -4.6rem; width: 1.8rem; height: 2.6rem; transform-origin: 0 100%; color: #E5486F; }
          .rs .rs-flag svg { animation: rs-wave 2.6s ease-in-out infinite; transform-origin: 2px 50%; }
          @keyframes rs-wave { 50% { transform: skewY(-6deg) scaleX(0.92); } }
        }
        @media (min-width: 900px) and (max-height: 760px) {
          .rs .rs-wrap { padding-top: 4.5rem; padding-bottom: 5rem; }
          .rs .rs-stage { margin-top: 3.5rem; height: 23rem; }
          .rs .rs-block { padding-top: 3.1rem; }
        }
      `}</style>

      <div className="rs-wrap">
        <div className="rs-head">
          <div>
            <span data-rs-eyebrow className="rs-eyebrow">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3 17 9 11l4 4 8-8M15 7h6v6" />
              </svg>
              How it works
            </span>
            <h2 className="rs-title">
              <span className="rs-mask">
                <span data-rs-word className="inline-block origin-bottom-left">
                  Rise with
                </span>
              </span>{" "}
              <span className="rs-mask">
                <span
                  data-rs-word
                  className={`${accentSerif.className} rs-accent inline-block origin-bottom-left`}
                >
                  Every Step
                </span>
              </span>
            </h2>
          </div>
          <p data-rs-copy className="rs-copy">
            Manage the entire study-abroad process from one simple place. Save
            time, and stay focused on what matters most.
          </p>
        </div>

        <div data-rs-stage className="rs-stage">
          <svg data-rs-svg className="rs-svg" aria-hidden>
            <path
              data-rs-path
              fill="none"
              stroke="rgba(53,12,14,0.18)"
              strokeWidth="2"
              strokeDasharray="2 7"
              strokeLinecap="round"
            />
            <path
              data-rs-path
              fill="none"
              stroke="#F7931E"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <g data-rs-climber>
              <circle r="11" fill="rgba(247,147,30,0.25)" />
              <circle r="6.5" fill="#F7931E" stroke="#fff" strokeWidth="2.5" />
            </g>
          </svg>

          <ol className="rs-steps">
            {steps.map((step, i) => (
              <li
                key={step.number}
                data-rs-step
                className={`rs-step${i < reached ? " is-on" : ""}`}
                style={
                  {
                    "--h": HEIGHTS[i],
                    "--w": WIDTHS[i],
                    "--bg": TONES[i].bg,
                    "--accent": TONES[i].accent,
                  } as CSSProperties
                }
              >
                <span data-rs-node className="rs-node" aria-hidden>
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    {step.icon}
                  </svg>
                  <span className="rs-badge">{step.number}</span>
                </span>
                {i === steps.length - 1 && (
                  <span data-rs-flag className="rs-flag" aria-hidden>
                    <svg viewBox="0 0 18 26" width="100%" height="100%">
                      <path
                        d="M2 1v24"
                        stroke="#350C0E"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path d="M3 2h13l-3.5 4.5L16 11H3Z" fill="currentColor" />
                    </svg>
                  </span>
                )}
                <div data-rs-block className="rs-block">
                  <span className="rs-num" aria-hidden>
                    {String(step.number).padStart(2, "0")}
                  </span>
                  <div data-rs-text>
                    <span className="rs-label">
                      Step {String(step.number).padStart(2, "0")}
                    </span>
                    <span className="rs-name">{step.title}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
