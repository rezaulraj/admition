"use client";

import React, { useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

type Visual = "dashboard" | "currency" | "growth" | "alerts" | "destinations";

type Benefit = {
  title: string;
  description: string;
  icon: React.ReactNode;
  visual: Visual;
};

const benefits: Benefit[] = [
  {
    title: "Smart Platform Access",
    description:
      "Easily manage student applications, upload documents, and track status, all from one secure dashboard.",
    icon: (
      <path d="M4 4h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-6l1 3H9l1-3H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm1 2v10h14V6H5Zm2 2h6v2H7V8Zm0 3h10v2H7v-2Z" />
    ),
    visual: "dashboard",
  },
  {
    title: "Hassle-Free Local Payments",
    description:
      "Pay locally in your own currency, no conversion, no fees, no delays. Fast, easy, and hassle-free for bookings, fees, and insurance.",
    icon: <path d="M12 2 3 6v2h18V6l-9-4Zm-8 8v8H3v2h18v-2h-1v-8h-2v8h-3v-8h-2v8h-3v-8H8v8H5v-8H4Z" />,
    visual: "currency",
  },
  {
    title: "Competitive Commission Structure",
    description: "Earn high-value commissions and unlock tier-based bonuses as your referrals and placements grow.",
    icon: <path d="M4 20V10h4v10H4Zm6 0V4h4v16h-4Zm6 0v-7h4v7h-4Z" />,
    visual: "growth",
  },
  {
    title: "Real-Time Updates",
    description:
      "Stay informed with live application status, instant notifications, and document verification as it happens.",
    icon: (
      <path d="M12 2a7 7 0 0 0-7 7v4l-2 3v1h18v-1l-2-3V9a7 7 0 0 0-7-7Zm0 20a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Z" />
    ),
    visual: "alerts",
  },
  {
    title: "Partner With Leading Universities",
    description: "Connect students to institutions across the UK, Canada, Germany, Hungary, and many more destinations.",
    icon: <path d="m12 2 10 5-10 5L2 7l10-5Zm-7 8.5 7 3.5 7-3.5V16l-7 3.5L5 16v-5.5Z" />,
    visual: "destinations",
  },
];

const TONES = [
  { bg: "linear-gradient(140deg, #FFEBD9 0%, #FFCFA3 100%)", accent: "#F7931E" },
  { bg: "linear-gradient(140deg, #EEF2FF 0%, #C4D2FF 100%)", accent: "#2F6BFF" },
  { bg: "linear-gradient(140deg, #EBF8E7 0%, #BCE6B4 100%)", accent: "#3BAA35" },
  { bg: "linear-gradient(140deg, #FFF6DD 0%, #FFE0A0 100%)", accent: "#E08A00" },
  { bg: "linear-gradient(140deg, #FFEDF2 0%, #FFC9D6 100%)", accent: "#E5486F" },
];

/* Small decorative scenes, one per benefit */
function Scene({ type }: { type: Visual }) {
  if (type === "dashboard")
    return (
      <div className="yg-dash">
        <div className="yg-dash-bar">
          <i />
          <i />
          <i />
          <span />
        </div>
        {["#3BAA35", "#F7931E", "#2F6BFF"].map((c, i) => (
          <div key={c} data-yg-bit className="yg-dash-row">
            <span className="yg-dash-avatar" style={{ background: c }} />
            <span className="yg-dash-lines">
              <span style={{ width: `${70 - i * 12}%` }} />
              <span style={{ width: `${45 + i * 8}%` }} />
            </span>
            <span data-yg-pop className="yg-dash-pill" style={{ background: c }} />
          </div>
        ))}
      </div>
    );

  if (type === "currency")
    return (
      <div className="yg-coins">
        <span data-yg-pop className="yg-coin yg-coin-main">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 7V5a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3v2a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V6" />
          </svg>
        </span>
        {["₹", "£", "€", "$"].map((s, i) => (
          <span key={s} data-yg-pop className={`yg-coin yg-coin-${i}`}>
            {s}
          </span>
        ))}
        <svg className="yg-coin-ring" viewBox="0 0 100 100" aria-hidden>
          <circle data-yg-draw cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
        </svg>
      </div>
    );

  if (type === "growth")
    return (
      <div className="yg-growth">
        {[28, 42, 54, 70, 92].map((h, i) => (
          <span key={h} data-yg-bar className="yg-bar" style={{ height: `${h}%`, opacity: 0.45 + i * 0.13 }} />
        ))}
        <svg className="yg-trend" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <path data-yg-draw d="M6 78 L 26 62 L 46 52 L 66 36 L 92 10" fill="none" stroke="#350C0E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <span data-yg-pop className="yg-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </span>
      </div>
    );

  if (type === "alerts")
    return (
      <div className="yg-alerts">
        <span className="yg-bell">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a7 7 0 0 0-7 7v4l-2 3v1h18v-1l-2-3V9a7 7 0 0 0-7-7Zm0 20a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Z" />
          </svg>
          <i className="yg-bell-ping" />
        </span>
        {["#3BAA35", "#2F6BFF", "#F7931E"].map((c, i) => (
          <div key={c} data-yg-bit className="yg-toast" style={{ "--c": c, marginLeft: `${i * 6}%` } as CSSProperties}>
            <span className="yg-toast-dot" />
            <span className="yg-dash-lines">
              <span style={{ width: `${78 - i * 14}%` }} />
              <span style={{ width: `${50 + i * 10}%` }} />
            </span>
          </div>
        ))}
      </div>
    );

  return (
    <div className="yg-dest">
      <svg className="yg-globe" viewBox="0 0 100 100" aria-hidden>
        <circle data-yg-draw cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.7" />
        <ellipse cx="50" cy="50" rx="18" ry="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M10 50h80M16 30h68M16 70h68" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      {["UK", "Canada", "Germany", "Hungary", "+ more"].map((d, i) => (
        <span key={d} data-yg-pop className={`yg-flag yg-flag-${i}`}>
          {d}
        </span>
      ))}
    </div>
  );
}

export default function WhatYouWillGain() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const stackST = useRef<ScrollTrigger | null>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add(
      { motionOK: "(prefers-reduced-motion: no-preference)", stack: "(min-height: 520px)" },
      (ctx) => {
        const { motionOK, stack } = ctx.conditions as { motionOK: boolean; stack: boolean };
        const list = q("[data-yg-list]")[0] as HTMLElement;
        const cards = q("[data-yg-card]") as HTMLElement[];
        const n = cards.length;

        /* Where the cards stick and how much of each earlier card stays visible */
        const top = () => parseFloat(getComputedStyle(cards[0]).top) || 0;
        const peek = () => (cards.length > 1 ? parseFloat(getComputedStyle(cards[1]).top) - top() : 0);

        /* Reading progress through the stack decides the active benefit, and older cards sink back */
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: list,
            start: () => `top ${top()}px`,
            end: () => `bottom ${top() + peek() * (n - 1) + cards[n - 1].offsetHeight}px`,
            scrub: stack && motionOK ? 0.6 : false,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(Math.min(n - 1, Math.round(self.progress * (n - 1)))),
          },
        });
        stackST.current = tl.scrollTrigger ?? null;
        if (stack && motionOK) {
          cards.slice(0, -1).forEach((card, i) => {
            tl.to(card.querySelector("[data-yg-inner]"), { scale: 0.93, duration: 1 }, i);
            tl.fromTo(card.querySelector("[data-yg-dim]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, i);
          });
        }

        if (!motionOK) return;

        gsap
          .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: el, start: "top 78%", once: true } })
          .fromTo(q("[data-yg-eyebrow]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
          .fromTo(q("[data-yg-word]"), { autoAlpha: 0, yPercent: 115, rotate: 5 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.12 }, 0.08)
          .fromTo(q("[data-yg-nav] > *"), { autoAlpha: 0, x: -24 }, { autoAlpha: 1, x: 0, duration: 0.9, stagger: 0.07 }, 0.4);

        /* Each card rises in, then its little scene plays */
        cards.forEach((card) => {
          gsap.fromTo(
            card.querySelector("[data-yg-inner]"),
            { autoAlpha: 0, y: 90, rotate: 2.5 },
            { autoAlpha: 1, y: 0, rotate: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 92%", once: true } },
          );
          const s = gsap.utils.selector(card);
          gsap
            .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: card, start: "top 70%", once: true } })
            .fromTo(s("[data-yg-text] > *"), { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 0)
            .fromTo(s("[data-yg-scene]"), { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 1.1 }, 0.1)
            .fromTo(s("[data-yg-bit]"), { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: 0.9, stagger: 0.12 }, 0.35)
            .fromTo(s("[data-yg-bar]"), { scaleY: 0 }, { scaleY: 1, duration: 1.1, stagger: 0.08, ease: "power3.out" }, 0.35)
            .fromTo(s("[data-yg-draw]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.4, ease: "power2.inOut" }, 0.5)
            .fromTo(s("[data-yg-pop]"), { autoAlpha: 0, scale: 0.3 }, { autoAlpha: 1, scale: 1, duration: 0.8, stagger: 0.08, ease: "back.out(2.2)" }, 0.55);
        });
      },
    );

    return () => {
      stackST.current = null;
      mm.revert();
    };
  }, []);

  /* The side list jumps to a benefit: each one owns an equal slice of the stack's scroll range */
  const goTo = (i: number) => {
    const st = stackST.current;
    if (!st) return;
    const y = st.start + ((st.end - st.start) * i) / (benefits.length - 1) + 2;
    const lenis = (window as unknown as { lenis?: { scrollTo: (y: number, o?: object) => void } }).lenis;
    if (lenis) lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const trackPointer = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <section ref={root} className="yg relative w-full">
      <style>{`
        .yg { color: #350C0E; background: #FFFEFA; }
        .yg .yg-wrap { max-width: var(--page-max); margin: 0 auto; padding: 4.5rem 1.5rem 5rem; display: grid; grid-template-columns: minmax(0, 1fr); gap: 2.5rem; }

        .yg .yg-eyebrow { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0.95rem 0.45rem 0.55rem; border-radius: 999px;
          background: #fff; box-shadow: 0 0 0 1px rgba(53,12,14,0.08), 0 10px 26px -16px rgba(53,12,14,0.4); font-size: 0.8rem; font-weight: 600; letter-spacing: 0.02em; }
        .yg .yg-eyebrow i { width: 0.55rem; height: 0.55rem; border-radius: 999px; background: #F7931E; box-shadow: 0 0 0 4px rgba(247,147,30,0.18); }
        .yg .yg-title { margin-top: 1.2rem; font-size: clamp(2.5rem, 11vw, 3.4rem); line-height: 1.02; letter-spacing: -0.045em; font-weight: 600; }
        .yg .yg-mask { display: inline-block; overflow: hidden; padding: 0.04em 0.08em 0.16em 0; margin: -0.04em 0 -0.16em; vertical-align: bottom; }
        .yg .yg-accent { color: #F7931E; font-weight: 400; font-style: italic; letter-spacing: -0.02em; font-size: 1.12em; line-height: 0.95; }

        .yg .yg-nav { display: none; }
        .yg .yg-count { display: none; }

        /* Card stack */
        .yg .yg-list { display: grid; gap: 1.25rem; }
        .yg .yg-card { position: relative; }
        .yg .yg-inner { position: relative; overflow: hidden; border-radius: 28px; padding: 1.5rem; transform-origin: 50% 0%; isolation: isolate;
          background: var(--bg); box-shadow: 0 0 0 1px rgba(53,12,14,0.05), 0 30px 60px -36px rgba(53,12,14,0.5); }
        .yg .yg-inner::before { content: ""; position: absolute; inset: 0; z-index: -1; opacity: 0.35; pointer-events: none;
          background-image: radial-gradient(rgba(53,12,14,0.3) 1px, transparent 1.4px); background-size: 16px 16px;
          -webkit-mask-image: linear-gradient(120deg, transparent 35%, #000 100%); mask-image: linear-gradient(120deg, transparent 35%, #000 100%); }
        .yg .yg-inner::after { content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none; opacity: 0; transition: opacity .4s ease;
          background: radial-gradient(22rem circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.55), transparent 60%); }
        .yg .yg-inner:hover::after { opacity: 1; }
        .yg .yg-orb { position: absolute; z-index: -1; right: -4rem; top: -4rem; width: 14rem; height: 14rem; border-radius: 999px; background: var(--accent); opacity: 0.18; filter: blur(40px); }
        .yg .yg-dim { position: absolute; inset: 0; z-index: 5; border-radius: inherit; background: rgba(53,12,14,0.18); pointer-events: none; visibility: hidden; opacity: 0; }

        .yg .yg-body { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.5rem; }
        .yg .yg-top { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
        .yg .yg-icon { display: grid; place-items: center; width: 3.25rem; height: 3.25rem; border-radius: 16px; background: #fff; color: var(--accent);
          box-shadow: 0 12px 26px -14px rgba(53,12,14,0.45); }
        .yg .yg-step { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(53,12,14,0.6); }
        .yg .yg-num { position: absolute; right: 1.25rem; bottom: -1.6rem; z-index: -1; font-size: 7.5rem; font-weight: 700; line-height: 1; letter-spacing: -0.05em;
          color: transparent; -webkit-text-stroke: 1.5px rgba(53,12,14,0.08); pointer-events: none; }
        .yg .yg-card-title { margin-top: 1.4rem; font-size: 1.45rem; line-height: 1.15; letter-spacing: -0.03em; font-weight: 600; }
        .yg .yg-card-text { margin-top: 0.7rem; font-size: 0.97rem; line-height: 1.65; color: rgba(53,12,14,0.74); max-width: 30rem; }

        .yg .yg-scene { position: relative; height: 12.5rem; border-radius: 22px; background: rgba(255,255,255,0.55); overflow: hidden;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.8), 0 18px 40px -28px rgba(53,12,14,0.5); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }

        /* Scene: dashboard */
        .yg .yg-dash { position: absolute; inset: 1rem; display: flex; flex-direction: column; gap: 0.55rem; padding: 0.75rem; border-radius: 16px; background: #fff;
          box-shadow: 0 16px 34px -22px rgba(53,12,14,0.55); }
        .yg .yg-dash-bar { display: flex; align-items: center; gap: 0.3rem; padding-bottom: 0.45rem; border-bottom: 1px solid rgba(53,12,14,0.07); }
        .yg .yg-dash-bar i { width: 0.45rem; height: 0.45rem; border-radius: 999px; background: rgba(53,12,14,0.15); }
        .yg .yg-dash-bar span { margin-left: auto; width: 32%; height: 0.45rem; border-radius: 999px; background: rgba(53,12,14,0.08); }
        .yg .yg-dash-row { display: flex; align-items: center; gap: 0.6rem; padding: 0.35rem 0.4rem; border-radius: 10px; background: #FFFAF4; }
        .yg .yg-dash-avatar { width: 1.6rem; height: 1.6rem; border-radius: 999px; flex: none; opacity: 0.85; }
        .yg .yg-dash-lines { flex: 1; display: grid; gap: 0.3rem; }
        .yg .yg-dash-lines span { display: block; height: 0.38rem; border-radius: 999px; background: rgba(53,12,14,0.12); }
        .yg .yg-dash-lines span + span { background: rgba(53,12,14,0.07); }
        .yg .yg-dash-pill { width: 2.6rem; height: 0.95rem; border-radius: 999px; flex: none; opacity: 0.9; }

        /* Scene: currencies */
        .yg .yg-coins { position: absolute; inset: 0; color: var(--accent); }
        .yg .yg-coin-ring { position: absolute; left: 50%; top: 50%; width: 11rem; height: 11rem; margin: -5.5rem 0 0 -5.5rem; }
        .yg .yg-coin { position: absolute; display: grid; place-items: center; width: 2.6rem; height: 2.6rem; border-radius: 999px; background: #fff; color: #350C0E;
          font-weight: 700; font-size: 1.05rem; box-shadow: 0 12px 24px -12px rgba(53,12,14,0.5); animation: yg-float 4s ease-in-out infinite; }
        .yg .yg-coin-main { left: 50%; top: 50%; width: 4.4rem; height: 4.4rem; margin: -2.2rem 0 0 -2.2rem; font-size: 1.9rem; color: #fff; background: var(--accent);
          box-shadow: 0 0 0 6px rgba(255,255,255,0.7), 0 18px 34px -12px rgba(47,107,255,0.7); animation: none; }
        .yg .yg-coin-0 { left: calc(50% - 6.2rem); top: calc(50% - 1.3rem); animation-delay: -1s; }
        .yg .yg-coin-1 { left: calc(50% - 1.3rem); top: calc(50% - 6.4rem); animation-delay: -2s; }
        .yg .yg-coin-2 { left: calc(50% + 3.6rem); top: calc(50% - 1.3rem); animation-delay: -3s; }
        .yg .yg-coin-3 { left: calc(50% - 1.3rem); top: calc(50% + 3.8rem); animation-delay: -0.5s; }
        @keyframes yg-float { 50% { translate: 0 -6px; } }

        /* Scene: growth */
        .yg .yg-growth { position: absolute; inset: 1.25rem 1.5rem 1.25rem; display: flex; align-items: flex-end; gap: 7%; }
        .yg .yg-bar { flex: 1; border-radius: 10px 10px 4px 4px; background: linear-gradient(180deg, var(--accent), rgba(59,170,53,0.55)); transform-origin: 50% 100%; }
        .yg .yg-trend { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
        .yg .yg-arrow { position: absolute; right: -0.4rem; top: -0.4rem; display: grid; place-items: center; width: 2.2rem; height: 2.2rem; border-radius: 999px;
          background: #350C0E; color: #fff; box-shadow: 0 10px 22px -10px rgba(53,12,14,0.8); }

        /* Scene: alerts */
        .yg .yg-alerts { position: absolute; inset: 1rem; display: flex; flex-direction: column; justify-content: center; gap: 0.55rem; padding-left: 3.6rem; }
        .yg .yg-bell { position: absolute; left: 0.25rem; top: 50%; translate: 0 -50%; display: grid; place-items: center; width: 2.8rem; height: 2.8rem; border-radius: 14px;
          background: var(--accent); color: #fff; box-shadow: 0 14px 26px -12px rgba(224,138,0,0.8); animation: yg-ring 3.2s ease-in-out infinite; transform-origin: 50% 10%; }
        .yg .yg-bell-ping { position: absolute; right: -0.2rem; top: -0.2rem; width: 0.8rem; height: 0.8rem; border-radius: 999px; background: #E5486F; box-shadow: 0 0 0 3px #fff; }
        .yg .yg-bell-ping::after { content: ""; position: absolute; inset: 0; border-radius: inherit; background: #E5486F; animation: yg-ping 1.8s ease-out infinite; }
        @keyframes yg-ring { 0%, 70%, 100% { rotate: 0deg; } 74% { rotate: 14deg; } 80% { rotate: -12deg; } 86% { rotate: 8deg; } 92% { rotate: -4deg; } }
        @keyframes yg-ping { to { transform: scale(2.6); opacity: 0; } }
        .yg .yg-toast { display: flex; align-items: center; gap: 0.6rem; padding: 0.55rem 0.7rem; border-radius: 12px; background: #fff; max-width: 88%;
          box-shadow: 0 12px 26px -18px rgba(53,12,14,0.6); border-left: 3px solid var(--c); }
        .yg .yg-toast-dot { width: 1.4rem; height: 1.4rem; flex: none; border-radius: 999px; background: var(--c); opacity: 0.85; }

        /* Scene: destinations */
        .yg .yg-dest { position: absolute; inset: 0; color: rgba(229,72,111,0.45); }
        .yg .yg-globe { position: absolute; left: 50%; top: 50%; width: 10.5rem; height: 10.5rem; margin: -5.25rem 0 0 -5.25rem; animation: yg-spin 30s linear infinite; }
        @keyframes yg-spin { to { rotate: 360deg; } }
        .yg .yg-flag { position: absolute; padding: 0.4rem 0.8rem; border-radius: 999px; background: #fff; color: #350C0E; font-size: 0.8rem; font-weight: 600; white-space: nowrap;
          box-shadow: 0 12px 24px -14px rgba(53,12,14,0.55); animation: yg-float 4.5s ease-in-out infinite; }
        .yg .yg-flag-0 { left: 12%; top: 16%; }
        .yg .yg-flag-1 { right: 10%; top: 12%; animation-delay: -1.2s; }
        .yg .yg-flag-2 { left: 7%; bottom: 20%; animation-delay: -2.4s; }
        .yg .yg-flag-3 { right: 8%; bottom: 24%; animation-delay: -3.1s; }
        .yg .yg-flag-4 { left: 50%; bottom: 7%; translate: -50% 0; background: #350C0E; color: #fff; animation: none; }

        @media (prefers-reduced-motion: no-preference) {
          .yg [data-yg-eyebrow], .yg [data-yg-word], .yg [data-yg-nav] > *, .yg [data-yg-inner], .yg [data-yg-text] > *,
          .yg [data-yg-scene], .yg [data-yg-bit], .yg [data-yg-pop] { visibility: hidden; }
        }
        @media (prefers-reduced-motion: reduce) {
          .yg .yg-coin, .yg .yg-bell, .yg .yg-bell-ping::after, .yg .yg-globe, .yg .yg-flag { animation: none; }
        }

        /* Cards stack up as you scroll (when there is room) */
        @media (min-height: 520px) {
          .yg .yg-card { position: sticky; top: calc(5.75rem + var(--i) * 0.9rem); }
        }

        @media (min-width: 640px) {
          .yg .yg-wrap { padding: 5.5rem 2rem 6rem; }
          .yg .yg-inner { padding: 2rem; }
          .yg .yg-card-title { font-size: 1.7rem; }
          .yg .yg-num { font-size: 9rem; }
        }
        @media (min-width: 900px) {
          .yg .yg-body { grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr); align-items: center; gap: 2rem; }
          .yg .yg-inner { min-height: 19rem; }
          .yg .yg-scene { height: 14.5rem; }
          .yg .yg-num { right: auto; left: auto; right: calc(47% + 1rem); bottom: -2.6rem; }
        }
        @media (min-width: 1024px) {
          .yg .yg-wrap { grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.22fr); gap: clamp(2.5rem, 5vw, 5rem); padding: 7rem var(--page-gutter) 7rem; align-items: start; }
          .yg .yg-side { position: sticky; top: 7rem; }
          .yg .yg-title { font-size: clamp(3rem, 4.6vw, 4.4rem); }
          .yg .yg-count { display: flex; align-items: baseline; gap: 0.35rem; margin-top: 1.75rem; font-weight: 600; }
          .yg .yg-count b { font-size: 3rem; line-height: 1; letter-spacing: -0.04em; color: #F7931E; }
          .yg .yg-count span { font-size: 1rem; color: rgba(53,12,14,0.5); }
          .yg .yg-nav { display: grid; gap: 0.25rem; margin-top: 1.5rem; }
          .yg .yg-nav button { position: relative; display: flex; align-items: center; gap: 0.85rem; width: 100%; padding: 0.7rem 0.9rem; border-radius: 14px; text-align: left;
            font-size: 0.98rem; font-weight: 500; color: rgba(53,12,14,0.55); transition: color .35s ease, background .35s ease; cursor: pointer; }
          .yg .yg-nav button:hover { color: #350C0E; background: rgba(53,12,14,0.04); }
          .yg .yg-nav button:focus-visible { outline: 2px solid #F7931E; outline-offset: 2px; }
          .yg .yg-nav button.is-on { color: #350C0E; background: #fff; box-shadow: 0 0 0 1px rgba(53,12,14,0.06), 0 14px 30px -20px rgba(53,12,14,0.5); }
          .yg .yg-nav-dot { position: relative; display: grid; place-items: center; width: 2rem; height: 2rem; flex: none; border-radius: 999px; font-size: 0.72rem; font-weight: 700;
            background: rgba(53,12,14,0.06); color: rgba(53,12,14,0.6); transition: background .35s ease, color .35s ease, transform .35s cubic-bezier(.22,1,.36,1); }
          .yg .yg-nav button.is-on .yg-nav-dot { background: var(--accent); color: #fff; transform: scale(1.08); }
          .yg .yg-nav-bar { position: absolute; left: 0.9rem; right: 0.9rem; bottom: 0.3rem; height: 2px; border-radius: 2px; background: var(--accent);
            transform: scaleX(0); transform-origin: 0 50%; transition: transform .6s cubic-bezier(.22,1,.36,1); }
          .yg .yg-nav button.is-on .yg-nav-bar { transform: scaleX(1); }
          .yg .yg-card { top: calc(7rem + var(--i) * 1rem); }
        }
        @media (min-width: 1024px) and (max-height: 760px) {
          .yg .yg-wrap { padding-top: 5rem; }
          .yg .yg-side { top: 6.5rem; }
          .yg .yg-card { top: calc(6.5rem + var(--i) * 0.75rem); }
          .yg .yg-title { font-size: clamp(2.6rem, 3.8vw, 3.4rem); }
          .yg .yg-count { margin-top: 1rem; }
          .yg .yg-count b { font-size: 2.3rem; }
          .yg .yg-nav { margin-top: 0.75rem; gap: 0.1rem; }
          .yg .yg-nav button { padding: 0.45rem 0.8rem; font-size: 0.9rem; }
          .yg .yg-nav-dot { width: 1.7rem; height: 1.7rem; }
          .yg .yg-inner { min-height: 0; padding: 1.6rem 1.75rem; }
          .yg .yg-scene { height: 12rem; }
          .yg .yg-card-title { margin-top: 1rem; font-size: 1.5rem; }
          .yg .yg-card-text { font-size: 0.93rem; line-height: 1.55; }
        }
      `}</style>

      <div className="yg-wrap">
        <div className="yg-side">
          <span data-yg-eyebrow className="yg-eyebrow">
            <i aria-hidden />
            Partner benefits
          </span>
          <h2 className="yg-title">
            <span className="yg-mask">
              <span data-yg-word className="inline-block origin-bottom-left">
                What You Will
              </span>
            </span>{" "}
            <span className="yg-mask">
              <span data-yg-word className={`${accentSerif.className} yg-accent inline-block origin-bottom-left`}>
                Gain
              </span>
            </span>
          </h2>

          <p className="yg-count" aria-hidden>
            <b>{String(active + 1).padStart(2, "0")}</b>
            <span>/ {String(benefits.length).padStart(2, "0")}</span>
          </p>

          <nav data-yg-nav className="yg-nav" aria-label="Partner benefits">
            {benefits.map((b, i) => (
              <button
                key={b.title}
                type="button"
                onClick={() => goTo(i)}
                className={i === active ? "is-on" : undefined}
                aria-current={i === active ? "true" : undefined}
                style={{ "--accent": TONES[i].accent } as CSSProperties}
              >
                <span className="yg-nav-dot">{String(i + 1).padStart(2, "0")}</span>
                {b.title}
                <span className="yg-nav-bar" aria-hidden />
              </button>
            ))}
          </nav>
        </div>

        <div data-yg-list className="yg-list">
          {benefits.map((b, i) => (
            <article
              key={b.title}
              data-yg-card
              className="yg-card"
              style={{ "--i": i, "--bg": TONES[i].bg, "--accent": TONES[i].accent } as CSSProperties}
            >
              <div data-yg-inner className="yg-inner" onPointerMove={trackPointer}>
                <span className="yg-orb" aria-hidden />
                <span className="yg-num" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="yg-body">
                  <div data-yg-text>
                    <div className="yg-top">
                      <span className="yg-icon" aria-hidden>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                          {b.icon}
                        </svg>
                      </span>
                      <span className="yg-step">
                        Benefit {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="yg-card-title">{b.title}</h3>
                    <p className="yg-card-text">{b.description}</p>
                  </div>
                  <div data-yg-scene className="yg-scene" aria-hidden>
                    <Scene type={b.visual} />
                  </div>
                </div>
                <span data-yg-dim className="yg-dim" aria-hidden />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
