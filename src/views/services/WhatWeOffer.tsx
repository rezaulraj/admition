"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

type Offer = {
  title: string;
  description: string;
  image: string;
};

const offers: Offer[] = [
  {
    title: "One-on-One Counselling",
    description:
      "From shortlisting the right country and university to finishing your admission paperwork, our counsellors stay by your side until you land the program that actually fits you.",
    image: "/consulting.png",
  },
  {
    title: "Test Prep That Delivers",
    description:
      "IELTS, PTE, or SAT, we've got you covered. If your spoken or written English needs work, our nearly three-decade track record in test prep gets you exam-ready.",
    image: "/testpre.png",
  },
  {
    title: "Scholarship Matching",
    description:
      "Our specialists pinpoint exactly which university, country, and program lines up with your profile and ambitions, then chase the highest scholarship so money worries stay off your plate.",
    image: "/scholarship.png",
  },
  {
    title: "Visa Filing, Handled",
    description:
      "Support doesn't stop at your offer letter. We manage your entire visa process, and we only charge for what the visa office itself requires, nothing extra on our end.",
    image: "/visa.png",
  },
  {
    title: "Travel & Stay Planning",
    description:
      "We help sort your flight bookings and line up accommodation, so you know exactly how you're getting there and where you're staying well before departure day.",
    image: "/travelAll.png",
  },
  {
    title: "We Stay In Touch After You Land",
    description:
      "Our relationship doesn't end at the airport. We check in long after you've settled abroad, because we're building lasting connections, not just processing applications.",
    image: "/airport.png",
  },
];

const TONES = [
  { bg: "linear-gradient(135deg, #FFEBD9 0%, #FFCFA3 100%)", accent: "#F7931E" },
  { bg: "linear-gradient(135deg, #EEF2FF 0%, #C4D2FF 100%)", accent: "#2F6BFF" },
  { bg: "linear-gradient(135deg, #EBF8E7 0%, #BCE6B4 100%)", accent: "#3BAA35" },
  { bg: "linear-gradient(135deg, #FFEDF2 0%, #FFC9D6 100%)", accent: "#E5486F" },
  { bg: "linear-gradient(135deg, #FFF6DD 0%, #FFE0A0 100%)", accent: "#E08A00" },
  { bg: "linear-gradient(135deg, #EEF2FF 0%, #C4D2FF 100%)", accent: "#2F6BFF" },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function WhatWeOffer() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const first = useRef(true);

  /* Reveal on scroll; on touch screens the row nearest the middle of the screen opens */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    /* Only the open row's panel has height to begin with */
    q("[data-wo-panel]").forEach((p, i) => gsap.set(p, { height: i === 0 ? "auto" : 0 }));

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: el, start: "top 75%", once: true } })
        .fromTo(q("[data-wo-eyebrow]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
        .fromTo(q("[data-wo-word]"), { autoAlpha: 0, yPercent: 115, rotate: 5 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.1 }, 0.08)
        .fromTo(q("[data-wo-sub] > *"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.35);

      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: q("[data-wo-list]")[0], start: "top 80%", once: true } })
        .fromTo(q("[data-wo-row]"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.07 }, 0)
        .fromTo(q("[data-wo-frame]"), { clipPath: "inset(10% 10% 10% 10% round 40px)", autoAlpha: 0 }, { clipPath: "inset(0% 0% 0% 0% round 28px)", autoAlpha: 1, duration: 1.4, ease: "power3.inOut" }, 0.1);
    });

    mm.add("(hover: none) and (max-width: 1023px)", () => {
      q("[data-wo-row]").forEach((row, i) =>
        ScrollTrigger.create({ trigger: row, start: "top 55%", end: "bottom 55%", onToggle: (self) => self.isActive && setActive(i) }),
      );
    });

    return () => mm.revert();
  }, []);

  /* Open the active row, close the rest, and wipe the photo across */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const d = reduce ? 0 : 1;

    q("[data-wo-panel]").forEach((p, i) =>
      gsap.to(p, { height: i === active ? "auto" : 0, duration: 0.65 * d, ease: "power3.inOut", overwrite: true }),
    );

    const slides = q("[data-wo-slide]");
    if (first.current) {
      first.current = false;
      gsap.set(slides, { zIndex: (i) => (i === active ? 2 : 0), autoAlpha: (i) => (i === active ? 1 : 0) });
      return;
    }
    slides.forEach((s, i) => {
      if (i === active) {
        gsap.set(s, { zIndex: 2, autoAlpha: 1 });
        gsap.fromTo(s, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 * d, ease: "expo.inOut", overwrite: true });
        gsap.fromTo(s.querySelector("img"), { scale: 1.18 }, { scale: 1, duration: 1.4 * d, ease: "expo.out", overwrite: true });
      } else {
        gsap.set(s, { zIndex: 1 });
        gsap.to(s, { autoAlpha: 0, duration: 0.01, delay: 0.9 * d, overwrite: true });
      }
    });
    gsap.fromTo(q("[data-wo-caption] > *"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7 * d, stagger: 0.06, ease: "expo.out", delay: 0.25 * d });
  }, [active]);

  return (
    <section ref={root} id="what-we-offer" className="wo relative w-full" style={{ "--accent": TONES[active].accent } as CSSProperties}>
      <style>{`
        .wo { color: #350C0E; overflow: clip;
          background: radial-gradient(40% 50% at 95% 15%, rgba(47,107,255,0.06), transparent 70%), radial-gradient(40% 50% at 0% 85%, rgba(247,147,30,0.08), transparent 70%), #FFFEFA; }
        .wo .wo-wrap { max-width: var(--page-max); margin: 0 auto; padding: 4.5rem 1.5rem 5rem; }

        .wo .wo-head { display: grid; gap: 1.25rem; }
        .wo .wo-eyebrow { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0.95rem 0.45rem 0.55rem; border-radius: 999px;
          background: #fff; box-shadow: 0 0 0 1px rgba(53,12,14,0.08), 0 10px 26px -16px rgba(53,12,14,0.4); font-size: 0.8rem; font-weight: 600; letter-spacing: 0.02em; }
        .wo .wo-eyebrow b { display: grid; place-items: center; min-width: 1.5rem; height: 1.5rem; padding: 0 0.35rem; border-radius: 999px; background: #350C0E; color: #fff; font-size: 0.7rem; }
        .wo .wo-title { margin-top: 1.2rem; font-size: clamp(2.5rem, 11vw, 3.6rem); line-height: 1.02; letter-spacing: -0.045em; font-weight: 600; }
        .wo .wo-mask { display: inline-block; overflow: hidden; padding: 0.04em 0.08em 0.16em 0; margin: -0.04em 0 -0.16em; vertical-align: bottom; }
        .wo .wo-accent { color: #F7931E; font-weight: 400; font-style: italic; letter-spacing: -0.02em; font-size: 1.12em; line-height: 0.95; }
        .wo .wo-sub p { max-width: 26rem; font-size: 1rem; line-height: 1.65; color: rgba(53,12,14,0.72); }

        .wo .wo-body { margin-top: 2.5rem; display: grid; grid-template-columns: minmax(0, 1fr); gap: 2rem; align-items: start; }

        /* Service rows */
        .wo .wo-list { display: grid; gap: 0.35rem; }
        .wo .wo-row { position: relative; border-radius: 24px; isolation: isolate; }
        .wo .wo-row::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--bg); opacity: 0;
          transition: opacity .5s ease; box-shadow: 0 24px 50px -34px rgba(53,12,14,0.5); }
        .wo .wo-row::after { content: ""; position: absolute; left: 1.25rem; right: 1.25rem; bottom: -0.2rem; height: 1px; background: rgba(53,12,14,0.1); transition: opacity .3s ease; }
        .wo .wo-row:last-child::after, .wo .wo-row.is-on::after, .wo .wo-row:has(+ .is-on)::after { opacity: 0; }
        .wo .wo-row.is-on::before { opacity: 1; }
        .wo .wo-btn { display: flex; width: 100%; align-items: center; gap: 1rem; padding: 1.05rem 1.1rem; text-align: left; cursor: pointer; border-radius: 24px; }
        .wo .wo-btn:focus-visible { outline: 2px solid #F7931E; outline-offset: 2px; }
        .wo .wo-num { display: grid; place-items: center; width: 2.6rem; height: 2.6rem; flex: none; border-radius: 999px; font-size: 0.8rem; font-weight: 700;
          background: rgba(53,12,14,0.06); color: rgba(53,12,14,0.55); transition: background .4s ease, color .4s ease, transform .5s cubic-bezier(.22,1,.36,1); }
        .wo .wo-row.is-on .wo-num { background: var(--c); color: #fff; transform: scale(1.06); }
        .wo .wo-name { flex: 1; font-size: clamp(1.15rem, 4.6vw, 1.5rem); line-height: 1.15; letter-spacing: -0.03em; font-weight: 600; color: rgba(53,12,14,0.6);
          transition: color .4s ease, transform .5s cubic-bezier(.22,1,.36,1); }
        .wo .wo-btn:hover .wo-name { color: #350C0E; transform: translateX(4px); }
        .wo .wo-row.is-on .wo-name { color: #350C0E; transform: none; }
        .wo .wo-go { display: grid; place-items: center; width: 2.4rem; height: 2.4rem; flex: none; border-radius: 999px; box-shadow: inset 0 0 0 1.5px rgba(53,12,14,0.18);
          color: #350C0E; transition: transform .5s cubic-bezier(.22,1,.36,1), background .4s ease, color .4s ease, box-shadow .4s ease; }
        .wo .wo-row.is-on .wo-go { background: #350C0E; color: #fff; box-shadow: none; transform: rotate(90deg); }
        .wo .wo-panel { height: 0; overflow: hidden; }
        .wo .wo-panel-inner { padding: 0 1.1rem 1.35rem 4.7rem; }
        .wo .wo-desc { font-size: 0.97rem; line-height: 1.7; color: rgba(53,12,14,0.76); max-width: 34rem; }
        .wo .wo-thumb { position: relative; margin-top: 1rem; aspect-ratio: 16 / 10; border-radius: 18px; overflow: hidden; box-shadow: 0 18px 40px -26px rgba(53,12,14,0.6); }
        .wo .wo-thumb img { object-fit: cover; }

        /* Photo frame (desktop) */
        .wo .wo-frame { display: none; }

        @media (prefers-reduced-motion: no-preference) {
          .wo [data-wo-eyebrow], .wo [data-wo-word], .wo [data-wo-sub] > *, .wo [data-wo-row], .wo [data-wo-frame] { visibility: hidden; }
        }

        @media (min-width: 640px) {
          .wo .wo-wrap { padding: 5.5rem 2rem 6rem; }
          .wo .wo-btn { padding: 1.2rem 1.4rem; gap: 1.25rem; }
          .wo .wo-panel-inner { padding: 0 1.4rem 1.5rem 5.25rem; }
        }
        @media (min-width: 1024px) {
          .wo .wo-wrap { padding: 6.5rem var(--page-gutter) 7rem; }
          .wo .wo-head { grid-template-columns: minmax(0, 1fr) auto; align-items: end; gap: 3rem; }
          .wo .wo-title { font-size: clamp(3rem, 4.6vw, 4.5rem); }
          .wo .wo-sub { text-align: right; }
          .wo .wo-body { margin-top: 3.5rem; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(2rem, 4vw, 4rem); }
          .wo .wo-name { font-size: clamp(1.3rem, 1.8vw, 1.75rem); }
          .wo .wo-thumb { display: none; }

          .wo .wo-frame { display: block; position: sticky; top: 7rem; height: min(36rem, calc(100svh - 9rem)); min-height: 26rem; border-radius: 28px; overflow: hidden; isolation: isolate;
            background: #F3E3D3; box-shadow: 0 40px 80px -44px rgba(53,12,14,0.6), 0 0 0 1px rgba(53,12,14,0.05); }
          .wo .wo-slide { position: absolute; inset: 0; }
          .wo .wo-slide img { object-fit: cover; }
          .wo .wo-frame::after { content: ""; position: absolute; inset: 0; z-index: 3; pointer-events: none; background: linear-gradient(180deg, transparent 50%, rgba(53,12,14,0.55) 100%); }
          .wo .wo-caption { position: absolute; z-index: 4; left: 1.5rem; right: 1.5rem; bottom: 1.5rem; display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; color: #fff; }
          .wo .wo-caption-num { font-size: 4.5rem; font-weight: 700; line-height: 0.8; letter-spacing: -0.05em; color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,0.85); }
          .wo .wo-caption-title { display: block; margin-top: 0.6rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.02em; max-width: 20rem; }
          .wo .wo-dots { display: flex; gap: 0.35rem; padding-bottom: 0.3rem; }
          .wo .wo-dots i { width: 0.5rem; height: 0.5rem; border-radius: 999px; background: rgba(255,255,255,0.45); transition: width .5s cubic-bezier(.22,1,.36,1), background .4s ease; }
          .wo .wo-dots i.is-on { width: 1.6rem; background: var(--accent); }
          .wo .wo-tag { position: absolute; z-index: 4; left: 1.5rem; top: 1.5rem; padding: 0.45rem 0.9rem; border-radius: 999px; background: rgba(255,255,255,0.9);
            backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #350C0E; }
        }
        @media (min-width: 1024px) and (max-height: 760px) {
          .wo .wo-wrap { padding-top: 5rem; }
          .wo .wo-body { margin-top: 2.25rem; }
          .wo .wo-btn { padding: 0.8rem 1.2rem; }
          .wo .wo-num { width: 2.3rem; height: 2.3rem; }
          .wo .wo-go { width: 2.1rem; height: 2.1rem; }
          .wo .wo-name { font-size: clamp(1.15rem, 1.5vw, 1.4rem); }
          .wo .wo-desc { font-size: 0.92rem; line-height: 1.6; }
          .wo .wo-frame { top: 6.5rem; height: calc(100svh - 8rem); min-height: 22rem; }
        }
      `}</style>

      <div className="wo-wrap">
        <div className="wo-head">
          <div>
            <span data-wo-eyebrow className="wo-eyebrow">
              <b>{pad(offers.length)}</b>
              Services, start to finish
            </span>
            <h2 className="wo-title">
              <span className="wo-mask">
                <span data-wo-word className="inline-block origin-bottom-left">
                  What We
                </span>
              </span>{" "}
              <span className="wo-mask">
                <span data-wo-word className={`${accentSerif.className} wo-accent inline-block origin-bottom-left`}>
                  Offer
                </span>
              </span>
            </h2>
          </div>
          <div data-wo-sub className="wo-sub">
            <p>End-to-end study abroad support, built around every stage of your journey.</p>
          </div>
        </div>

        <div className="wo-body">
          <ol data-wo-list className="wo-list">
            {offers.map((o, i) => (
              <li
                key={o.title}
                data-wo-row
                className={`wo-row${i === active ? " is-on" : ""}`}
                style={{ "--bg": TONES[i].bg, "--c": TONES[i].accent } as CSSProperties}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              >
                <h3>
                  <button
                    type="button"
                    id={`wo-btn-${i}`}
                    className="wo-btn"
                    aria-expanded={i === active}
                    aria-controls={`wo-panel-${i}`}
                    onClick={() => setActive(i)}
                    onFocus={() => setActive(i)}
                  >
                    <span className="wo-num" aria-hidden>
                      {pad(i + 1)}
                    </span>
                    <span className="wo-name">{o.title}</span>
                    <span className="wo-go" aria-hidden>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div data-wo-panel id={`wo-panel-${i}`} role="region" aria-labelledby={`wo-btn-${i}`} className="wo-panel">
                  <div className="wo-panel-inner">
                    <p className="wo-desc">{o.description}</p>
                    <div className="wo-thumb">
                      <Image src={o.image} alt={o.title} fill sizes="(max-width: 1023px) 90vw, 1px" />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div data-wo-frame className="wo-frame" aria-hidden>
            {offers.map((o, i) => (
              <div key={o.title} data-wo-slide className="wo-slide" style={{ visibility: i === 0 ? "visible" : "hidden" }}>
                <Image src={o.image} alt="" fill sizes="(max-width: 1023px) 1px, 45vw" />
              </div>
            ))}
            <span className="wo-tag">What we offer</span>
            <div data-wo-caption className="wo-caption">
              <div>
                <span className="wo-caption-num">{pad(active + 1)}</span>
                <span className="wo-caption-title">{offers[active].title}</span>
              </div>
              <div className="wo-dots">
                {offers.map((o, i) => (
                  <i key={o.title} className={i === active ? "is-on" : undefined} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
