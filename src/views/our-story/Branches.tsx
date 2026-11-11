"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { WORLD_DOTS, WORLD_VIEWBOX } from "./worldDots";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

const stats = [
  { label: "Years of experience", value: "10+" },
  { label: "Service guarantee", value: "100%" },
  { label: "Successful visas", value: "5,000+" },
  { label: "Students placed", value: "5,000+" },
];

/* Unlabelled points on the dotted map (viewBox units): the home base and the places students go */
const HOME = { x: 683, y: 252 };
const POINTS = [
  { x: 428, y: 154 },
  { x: 517, y: 105 },
  { x: 498, y: 180 },
  { x: 480, y: 228 },
  { x: 868, y: 449 },
  { x: 160, y: 166 },
];
/* Arcs that bow upwards between the home base and each point */
const ROUTES = POINTS.map((t) => {
  const mx = (HOME.x + t.x) / 2;
  const my = Math.min(HOME.y, t.y) - Math.abs(HOME.x - t.x) * 0.28 - 20;
  return `M${HOME.x} ${HOME.y} Q${mx} ${my} ${t.x} ${t.y}`;
});

export default function Branches() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add(
      { isDesktop: "(min-width: 1024px)", motionOK: "(prefers-reduced-motion: no-preference)" },
      (ctx) => {
        const { motionOK } = ctx.conditions as { isDesktop: boolean; motionOK: boolean };
        if (!motionOK) return; // reduced motion: the markup already shows the finished state

        /* Heading */
        gsap
          .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: el, start: "top 80%", once: true } })
          .fromTo(q("[data-osb-eyebrow]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
          .fromTo(q("[data-osb-word]"), { autoAlpha: 0, yPercent: 115, rotate: 4 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.12 }, 0.08)
          .fromTo(q("[data-osb-copy]"), { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.12 }, 0.35);

        /* The map card rises in, the dots appear, then the routes draw out from home */
        const panel = q("[data-osb-route]")[0];
        gsap
          .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: panel, start: "top 85%", once: true } })
          .fromTo(panel, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 1.2 }, 0)
          .fromTo(q("[data-osb-dots]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.6 }, 0.15)
          .fromTo(q("[data-osb-home]"), { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.7, ease: "back.out(2.5)", svgOrigin: `${HOME.x} ${HOME.y}`, clearProps: "transform" }, 0.6)
          .fromTo(q("[data-osb-arc]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.3, stagger: 0.14, ease: "power2.inOut" }, 0.8)
          .fromTo(q("[data-osb-pin]"), { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.6, stagger: 0.14, ease: "back.out(2.5)", svgOrigin: (i: number) => `${POINTS[i].x} ${POINTS[i].y}`, clearProps: "transform" }, 1.5)
          .add(() => flights.play(), 2.4);

        /* The plane keeps flying out along each route in turn */
        const arcs = q("[data-osb-path]") as unknown as SVGPathElement[];
        const flights = gsap.timeline({ paused: true, repeat: -1 });
        arcs.forEach((arc) => {
          flights
            .set(q("[data-osb-plane]"), { autoAlpha: 1 })
            .to(q("[data-osb-plane]"), { duration: 2.4, ease: "power1.inOut", motionPath: { path: arc, align: arc, alignOrigin: [0.5, 0.5], autoRotate: true } })
            .to(q("[data-osb-plane]"), { autoAlpha: 0, duration: 0.25 }, "-=0.25");
        });
        ScrollTrigger.create({ trigger: panel, start: "top bottom", end: "bottom top", onToggle: (self) => (self.isActive ? flights.resume() : flights.pause()) });

        /* Stats rise in, then count up once */
        const statsEl = q("[data-osb-stats]")[0];
        gsap.fromTo(statsEl, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: statsEl, start: "top 92%", once: true } });
        q("[data-osb-count]").forEach((node, i) => {
          const final = node.dataset.value ?? ""; // not textContent: a re-run after resizing would read the mid-count text
          const match = final.match(/^([\d,]+)(.*)$/);
          if (!match) return;
          const target = Number(match[1].replace(/,/g, ""));
          const counter = { v: 0 };
          node.textContent = `0${match[2]}`;
          gsap.to(counter, {
            v: target,
            duration: 1.8,
            delay: 0.15 + i * 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: statsEl, start: "top 92%", once: true },
            onUpdate: () => {
              node.textContent = `${Math.round(counter.v).toLocaleString("en-US")}${match[2]}`;
            },
            onComplete: () => {
              node.textContent = final;
            },
          });
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="osb relative w-full">
      <style>{`
        .osb { overflow: clip; color: #350C0E; background: #FFFEFA; }
        .osb .osb-wrap { max-width: var(--page-max); margin: 0 auto; padding: 1rem 1.5rem 5rem; }
        .osb .osb-head { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2rem; }
        .osb .osb-title { margin-top: 1.5rem; font-size: clamp(2.8rem, 12vw, 4rem); line-height: 1.02; letter-spacing: -0.04em; font-weight: 600; }
        .osb .osb-mask { display: block; overflow: hidden; padding: 0 0.1em 0.12em 0; margin-bottom: -0.12em; }
        .osb .osb-accent { font-size: 1.16em; line-height: 0.9; letter-spacing: -0.02em; font-weight: 400; font-stretch: normal; color: #F7931E; }
        .osb .osb-text { max-width: 31rem; font-size: 1.0625rem; line-height: 1.65; color: rgba(53,12,14,0.72); }
        .osb .osb-btn { margin-top: 1.75rem; background: #350C0E; color: #fff; transition: background-color .3s ease, translate .3s ease; }
        .osb .osb-btn:hover, .osb .osb-btn:focus-visible { background: #F7931E; translate: 0 -2px; }

        .osb .osb-route { position: relative; margin-top: 3.5rem; padding: 1.25rem; overflow: hidden; border-radius: 2rem; background: linear-gradient(115deg, #FFF4E8 0%, #FFFAF4 52%, #FDEBD9 100%); }
        .osb .osb-map { display: block; width: 100%; height: auto; overflow: visible; }
        .osb .osb-ping { transform-box: fill-box; transform-origin: center; animation: osb-ping 2.6s cubic-bezier(.22,1,.36,1) infinite; }
        @keyframes osb-ping { 0% { transform: scale(1); opacity: 0.55; } 100% { transform: scale(3.2); opacity: 0; } }

        .osb .osb-stats { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1px; margin-top: 1rem; overflow: hidden; border-radius: 2rem; background: #5A2B2E; }
        .osb .osb-stat { display: flex; flex-direction: column-reverse; justify-content: flex-end; gap: 0.6rem; padding: 2rem 1.5rem; background: #350C0E; transition: background-color .4s ease; }
        .osb .osb-stat:hover { background: #47161A; }
        .osb .osb-value { font-size: clamp(2.3rem, 10vw, 3rem); line-height: 1; letter-spacing: -0.04em; font-weight: 600; color: #fff; transition: color .4s ease; }
        .osb .osb-stat:hover .osb-value { color: #FFB25E; }
        .osb .osb-label { font-size: 0.875rem; font-weight: 500; color: rgba(255,255,255,0.66); }

        @media (min-width: 1024px) {
          .osb .osb-wrap { padding: 1rem var(--page-gutter) 7rem; }
          .osb .osb-head { grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); align-items: end; gap: 4rem; }
          .osb .osb-title { font-size: clamp(3.4rem, 5.5vw, 5.9rem); }
          .osb .osb-route { margin-top: 4.5rem; padding: 2.5rem 3rem; }
          .osb .osb-stats { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          .osb .osb-stat { padding: 2.75rem 2.5rem; }
          .osb .osb-value { font-size: clamp(3rem, 4.8vw, 5rem); }
          .osb .osb-label { font-size: 0.9375rem; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .osb [data-osb-eyebrow], .osb [data-osb-word], .osb [data-osb-copy], .osb [data-osb-route], .osb [data-osb-stats], .osb [data-osb-plane] { visibility: hidden; }
        }
        @media (prefers-reduced-motion: reduce) {
          .osb .osb-ping { animation: none; opacity: 0; }
        }
      `}</style>

      <div className="osb-wrap">
        <div className="osb-head">
          <div>
            <p data-osb-eyebrow className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
              <span className="h-3.5 w-5 bg-[#F7931E] [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
              Our branches
            </p>
            <h2 className="osb-title font-display">
              <span className="osb-mask">
                <span data-osb-word className="inline-block origin-bottom-left">
                  Global presence
                </span>{" "}
              </span>
              <span className="osb-mask">
                <span data-osb-word className={`${accentSerif.className} osb-accent inline-block origin-bottom-left`}>
                  since 2022
                </span>
              </span>
            </h2>
          </div>

          <div>
            <p data-osb-copy className="osb-text">
              Since 2022, Admission OnBoard has helped students secure places at universities around the world. Built on real-life experience, our platform simplifies every step of the admission and transfer process.
            </p>
            <div data-osb-copy>
              <Link href="/careers" className="osb-btn group inline-flex h-14 items-center gap-3 rounded-full pl-7 pr-2.5 text-base font-semibold focus:outline-none">
                Join our team
                <span className="grid size-9 place-items-center rounded-full bg-white text-[#350C0E] transition-transform duration-300 group-hover:rotate-90">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Where we work: a dotted world with routes going out from home */}
        <div data-osb-route className="osb-route">
          <svg className="osb-map" viewBox={`0 0 ${WORLD_VIEWBOX.width} ${WORLD_VIEWBOX.height}`} role="img" aria-label="World map showing routes from our offices to study destinations">
            <path data-osb-dots d={WORLD_DOTS} stroke="rgba(53,12,14,0.16)" strokeWidth="4.4" strokeLinecap="round" fill="none" />
            <defs>
              {ROUTES.map((d, i) => (
                <mask key={i} id={`osb-route-${i}`} maskUnits="userSpaceOnUse" x="0" y="0" width={WORLD_VIEWBOX.width} height={WORLD_VIEWBOX.height}>
                  <path data-osb-arc d={d} fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
                </mask>
              ))}
            </defs>
            {ROUTES.map((d, i) => (
              <path key={i} data-osb-path d={d} mask={`url(#osb-route-${i})`} fill="none" stroke="#3BAA35" strokeWidth="1.6" strokeDasharray="5 5" strokeLinecap="round" />
            ))}
            {POINTS.map((p, i) => (
              <g key={i} data-osb-pin>
                <circle className="osb-ping" cx={p.x} cy={p.y} r="4" fill="#3BAA35" style={{ animationDelay: `${i * 0.35}s` }} />
                <circle cx={p.x} cy={p.y} r="4" fill="#3BAA35" stroke="#fff" strokeWidth="1.6" />
              </g>
            ))}
            <g data-osb-home>
              <circle className="osb-ping" cx={HOME.x} cy={HOME.y} r="6" fill="#F7931E" />
              <circle cx={HOME.x} cy={HOME.y} r="6.5" fill="#F7931E" stroke="#fff" strokeWidth="2" />
            </g>
            <g data-osb-plane>
              <path d="M10 0 L-6 -7 L-3 0 L-6 7 Z" fill="#350C0E" />
            </g>
          </svg>
        </div>

        {/* Stats */}
        <dl data-osb-stats className="osb-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="osb-stat">
              <dt className="osb-label">{stat.label}</dt>
              <dd data-osb-count data-value={stat.value} className="osb-value font-display">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
