"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

export type Group = "Pathway" | "Undergraduate" | "Postgraduate" | "Doctoral" | "Professional";

export type Program = {
  title: string;
  group: Group;
  /** e.g. "Level 7" */
  level?: string;
  duration?: string;
  summary?: string;
  requirements?: string[];
  image: string;
};

type Props = {
  /** Country name, e.g. "Australia" */
  destination: string;
  /** Optional line under the heading */
  intro?: string;
  programs: Program[];
};


const AUTO_ADVANCE_MS = 7000;

const ALL_GROUPS: Group[] = ["Pathway", "Undergraduate", "Postgraduate", "Doctoral", "Professional"];

const TONES: Record<Group, { bg: string; glow: string; accent: string }> = {
  Pathway: { bg: "linear-gradient(150deg, #FFEBD9 0%, #FFCFA3 100%)", glow: "rgba(247,147,30,0.45)", accent: "#D9651A" },
  Undergraduate: { bg: "linear-gradient(150deg, #EEF2FF 0%, #C4D2FF 100%)", glow: "rgba(47,107,255,0.34)", accent: "#2F6BFF" },
  Postgraduate: { bg: "linear-gradient(150deg, #EBF8E7 0%, #BCE6B4 100%)", glow: "rgba(59,170,53,0.34)", accent: "#2E8F29" },
  Doctoral: { bg: "linear-gradient(150deg, #FFF6DD 0%, #FFE0A0 100%)", glow: "rgba(240,180,30,0.4)", accent: "#B97F08" },
  Professional: { bg: "linear-gradient(150deg, #FFEDF2 0%, #FFC9D6 100%)", glow: "rgba(236,72,120,0.3)", accent: "#D43D6C" },
};

/** Splits "Academic: Class 12..." into a bold label and its value */
function splitItem(item: string) {
  const i = item.indexOf(":");
  return i === -1 || i > 30
    ? { label: "", value: item }
    : { label: item.slice(0, i), value: item.slice(i + 1).trim() };
}

/** The IELTS band a programme asks for, used by the score meter */
function ieltsOf(program: Program) {
  for (const item of program.requirements ?? []) {
    const match = item.match(/IELTS(?: Academic)?(?: about| of| overall)?:? ([4-9](?:\.\d)?)(?:\s*(?:–|-|to)\s*([4-9](?:\.\d)?))?/);
    if (match) return { low: match[1], high: match[2] ?? match[1] };
  }
  return null;
}

const SCALE_MIN = 4;
const SCALE_MAX = 9;
const BANDS = [4, 5, 6, 7, 8, 9];

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function DestinationEntry({ destination, intro, programs }: Props) {
  /* Only the levels this country actually offers */
  const GROUPS = ALL_GROUPS.filter((g) => programs.some((p) => p.group === g));
  const root = useRef<HTMLElement>(null);
  const inView = useRef(false);
  const hovered = useRef(false);
  const timer = useRef<gsap.core.Tween | null>(null);
  const previous = useRef(0);
  const firstRun = useRef(true);
  const [active, setActive] = useState(0);

  const activeGroup = programs[active].group;
  const go = (step: number) => setActive((prev) => (prev + step + programs.length) % programs.length);

  const syncTimer = () => {
    if (!timer.current) return;
    if (inView.current && !hovered.current) timer.current.play();
    else timer.current.pause();
  };
  const setHovered = (value: boolean) => {
    hovered.current = value;
    syncTimer();
  };

  /* Section reveal + the sliding highlight behind the level tabs */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const tabs = q("[data-er-tabs]")[0];
    const placeHighlight = () => {
      const tab = tabs.querySelector<HTMLElement>(".er-tab.is-on");
      if (tab) gsap.set(q("[data-er-ind]"), { x: tab.offsetLeft, y: tab.offsetTop, width: tab.offsetWidth, height: tab.offsetHeight });
    };
    placeHighlight();
    const observer = new ResizeObserver(placeHighlight);
    observer.observe(tabs);
    if (document.fonts?.ready) document.fonts.ready.then(placeHighlight);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: el, start: "top 78%", once: true } })
        .fromTo(q("[data-er-eyebrow]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
        .fromTo(q("[data-er-word]"), { autoAlpha: 0, yPercent: 115, rotate: 4 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.12 }, 0.08)
        .fromTo(q("[data-er-rise]"), { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.35);

      const stage = q("[data-er-stage]")[0];
      const first = gsap.utils.selector(q("[data-er-panel]")[0]);
      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: stage, start: "top 92%", once: true } })
        .fromTo(stage, { autoAlpha: 0, y: 80, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.3, clearProps: "transform" }, 0)
        .fromTo(first("[data-er-piece]"), { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.07 }, 0.3)
        .fromTo(first("[data-er-img]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power3.inOut", clearProps: "clipPath" }, 0.25)
        .fromTo(first("[data-er-meter]"), { scaleX: 0 }, { scaleX: 1, duration: 1.2 }, 0.8);

      // The programmes only advance while the section is actually on screen
      ScrollTrigger.create({
        trigger: el,
        start: "top 70%",
        end: "bottom 30%",
        onToggle(self) {
          inView.current = self.isActive;
          syncTimer();
        },
      });
    });

    return () => {
      observer.disconnect();
      mm.revert();
    };
     
  }, []);

  /* Changing programme: the new panel washes in over the old one, then its timer runs */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const panels = q("[data-er-panel]");
    const reduce = reducedMotion();
    const from = previous.current;
    previous.current = active;

    if (!firstRun.current) {
      const next = panels[active];
      const old = panels[from];
      gsap.killTweensOf(panels);
      gsap.set(panels, { autoAlpha: (i: number) => (i === active || i === from ? 1 : 0), zIndex: (i: number) => (i === active ? 2 : 1) });

      // Highlight slides to the programme's level
      const tab = el.querySelector<HTMLElement>(".er-tab.is-on");
      if (tab) gsap.to(q("[data-er-ind]"), { x: tab.offsetLeft, y: tab.offsetTop, width: tab.offsetWidth, height: tab.offsetHeight, duration: reduce ? 0 : 0.7, ease: "expo.out", overwrite: "auto" });

      // On phones the pills scroll sideways, so keep the active one in view
      const pill = q("[data-er-pill]")[active];
      const row = pill.parentElement as HTMLElement;
      if (row.scrollWidth > row.clientWidth) row.scrollTo({ left: pill.offsetLeft - 24, behavior: reduce ? "auto" : "smooth" });

      if (reduce) {
        gsap.set(old, { autoAlpha: from === active ? 1 : 0 });
      } else {
        const p = gsap.utils.selector(next);
        gsap.fromTo(next, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power1.out", onComplete: () => void (from !== active && gsap.set(old, { autoAlpha: 0 })) });
        gsap.fromTo(p("[data-er-piece]"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.06, ease: "expo.out", overwrite: true });
        gsap.fromTo(p("[data-er-img]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.95, ease: "power3.inOut", clearProps: "clipPath", overwrite: true });
        gsap.fromTo(p("[data-er-meter]"), { scaleX: 0 }, { scaleX: 1, duration: 1, delay: 0.35, ease: "expo.out", overwrite: true });

        const groupChanged = programs[from].group !== programs[active].group;
        if (groupChanged) {
          const pills = gsap.utils.selector(row)("[data-er-pill]");
          gsap.fromTo(pills, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "expo.out", overwrite: true });
        }
      }
    }
    firstRun.current = false;
    if (reduce) return;

    const bar = q("[data-er-bar]")[active];
    const tween = gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: AUTO_ADVANCE_MS / 1000,
        ease: "none",
        paused: true,
        onComplete: () => setActive((a) => (a + 1) % programs.length),
      },
    );
    timer.current = tween;
    syncTimer();
    return () => {
      tween.kill();
      timer.current = null;
      gsap.set(bar, { scaleX: 0 });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs when the programme changes
  }, [active]);

  return (
    <section ref={root} className="er relative w-full">
      <style>{`
        .er { overflow: clip; color: #350C0E; background: #FFFEFA; }
        .er .er-wrap { max-width: var(--page-max); margin: 0 auto; padding: 1.5rem 1.5rem 5rem; }
        .er .er-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 1.25rem; }
        .er .er-title { margin-top: 1.25rem; font-size: clamp(2.6rem, 11.5vw, 4rem); line-height: 1.02; letter-spacing: -0.04em; font-weight: 600; }
        .er .er-mask { display: inline-block; overflow: hidden; padding: 0 0.08em 0.14em 0; margin-bottom: -0.14em; vertical-align: top; }
        .er .er-accent { font-size: 1.16em; line-height: 0.9; letter-spacing: -0.02em; font-weight: 400; font-stretch: normal; color: #F7931E; }

        .er .er-lede { margin-top: 0.9rem; max-width: 36rem; font-size: 1.0625rem; line-height: 1.6; color: rgba(53,12,14,0.72); }
        .er .er-nav { display: flex; align-items: center; gap: 0.75rem; }
        .er .er-count { font-size: 0.9375rem; font-weight: 600; margin-right: 0.25rem; }
        .er .er-count span { color: rgba(53,12,14,0.5); }
        .er .er-arrow { display: grid; place-items: center; width: 3rem; height: 3rem; border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(53,12,14,0.2); transition: background-color .3s ease, color .3s ease, box-shadow .3s ease; }
        .er .er-arrow:hover, .er .er-arrow:focus-visible { color: #fff; background: #350C0E; box-shadow: none; }

        .er .er-tabs { position: relative; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.25rem; margin-top: 2rem; padding: 0.3rem; border-radius: 1.5rem; background: #F8F0E8; }
        .er .er-tabs.is-single { display: none !important; }
        .er .er-ind { position: absolute; left: 0; top: 0; border-radius: 1.25rem; background: #350C0E; }
        .er .er-tab { position: relative; display: flex; align-items: center; justify-content: center; gap: 0.45rem; height: 3rem; border-radius: 1.25rem; font-size: 0.875rem; font-weight: 600; transition: color .35s ease; }
        .er .er-tab.is-on { color: #fff; }
        .er .er-tab:focus-visible, .er .er-pill:focus-visible { outline: 3px solid #F7931E; outline-offset: 2px; }
        .er .er-tab-n { font-size: 0.75rem; opacity: 0.6; }

        .er .er-rows { display: grid; margin: 0.75rem -1.5rem 0; }
        .er .er-row { position: relative; grid-area: 1 / 1; display: flex; align-items: flex-start; gap: 0.5rem; padding: 0.15rem 1.5rem; overflow-x: auto; scrollbar-width: none; visibility: hidden; }
        .er .er-row::-webkit-scrollbar { display: none; }
        .er .er-row.is-on { visibility: inherit; }
        .er .er-pill { position: relative; flex: none; overflow: hidden; height: 2.625rem; padding: 0 1.1rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 600; white-space: nowrap; background: #fff; box-shadow: inset 0 0 0 1px rgba(53,12,14,0.14); transition: background-color .3s ease, color .3s ease, box-shadow .3s ease; }
        .er .er-pill:hover { box-shadow: inset 0 0 0 1px #350C0E; }
        .er .er-pill.is-on { color: #350C0E; background: #FFE9D3; box-shadow: none; }
        .er .er-bar { position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: #F7931E; transform: scaleX(0); transform-origin: 0 50%; }

        .er .er-stage { display: grid; margin-top: 1rem; }
        .er .er-panel { position: relative; isolation: isolate; grid-area: 1 / 1; display: grid; grid-template-columns: minmax(0, 1fr); align-content: start; gap: 1.75rem; overflow: hidden; padding: 1.5rem; border-radius: 1.75rem; visibility: hidden; }
        .er .er-panel.is-first { visibility: inherit; }
        .er .er-panel::after { content: ""; position: absolute; inset: 0; z-index: -2; opacity: 0.34; background-image: radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px); background-size: 15px 15px; -webkit-mask-image: linear-gradient(200deg, black, transparent 55%); mask-image: linear-gradient(200deg, black, transparent 55%); }
        .er .er-orb { position: absolute; z-index: -1; left: -8%; bottom: -30%; width: 44%; aspect-ratio: 1; border-radius: 50%; filter: blur(60px); }
        .er .er-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .er .er-chip { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.3rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; background: rgba(255,255,255,0.74); }
        .er .er-name { margin-top: 1rem; font-size: 1.875rem; line-height: 1.06; letter-spacing: -0.035em; font-weight: 600; }
        .er .er-summary { margin-top: 0.7rem; max-width: 36rem; font-size: 1rem; line-height: 1.6; color: rgba(53,12,14,0.78); }
        .er .er-label { margin-top: 1.5rem; font-size: 0.8125rem; font-weight: 600; color: rgba(53,12,14,0.66); }
        .er .er-reqs { display: flex; flex-direction: column; gap: 0.4rem; margin-top: 0.6rem; }
        .er .er-req { display: flex; flex-direction: column; gap: 0.1rem; padding: 0.7rem 0.95rem; border-radius: 1rem; font-size: 0.9375rem; line-height: 1.45; background: rgba(255,255,255,0.68); }
        .er .er-req b { flex: none; font-size: 0.8125rem; font-weight: 600; }

        .er .er-side { display: flex; flex-direction: column; gap: 0.75rem; }
        .er .er-frame { position: relative; aspect-ratio: 3 / 2; overflow: hidden; border-radius: 1.25rem; background: #fff; }
        .er .er-meter { padding: 0.95rem 1.1rem 0.8rem; border-radius: 1.25rem; background: rgba(255,255,255,0.74); }
        .er .er-meter-top { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; font-size: 0.8125rem; font-weight: 600; }
        .er .er-score { font-size: 1.875rem; line-height: 1; letter-spacing: -0.04em; font-weight: 600; }
        .er .er-track { position: relative; height: 0.5rem; margin-top: 0.7rem; overflow: hidden; border-radius: 9999px; background: rgba(53,12,14,0.1); }
        .er .er-fill { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 9999px; transform-origin: 0 50%; }
        .er .er-ticks { display: flex; justify-content: space-between; margin-top: 0.4rem; font-size: 0.75rem; font-weight: 500; color: rgba(53,12,14,0.62); }

        @media (min-width: 640px) {
          .er .er-tabs { display: flex; border-radius: 9999px; width: fit-content; }
          .er .er-ind, .er .er-tab { border-radius: 9999px; }
          .er .er-tab { padding: 0 1.4rem; }
          .er .er-req { flex-direction: row; gap: 0.75rem; }
          .er .er-req b { width: 6.5rem; font-size: 0.9375rem; }
          .er .er-panel { padding: 2rem; }
        }
        @media (min-width: 1024px) {
          .er .er-wrap { padding: 2rem var(--page-gutter) 7rem; }
          .er .er-title { font-size: clamp(3.4rem, 5.5vw, 5.9rem); }
          .er .er-rows { margin: 0.75rem 0 0; }
          .er .er-row { flex-wrap: wrap; padding: 0.15rem 0; overflow: visible; }
          .er .er-panel { grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr); align-items: start; gap: clamp(2rem, 4vw, 4rem); padding: 2.5rem; }
          .er .er-name { font-size: clamp(2.2rem, 3.2vw, 3.3rem); }
          .er .er-summary { font-size: 1.0625rem; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .er [data-er-eyebrow], .er [data-er-word], .er [data-er-rise], .er [data-er-stage] { visibility: hidden; }
        }
      `}</style>

      <div className="er-wrap">
        <div className="er-head">
          <div>
            <p data-er-eyebrow className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
              <span className="h-3.5 w-5 shrink-0 bg-[#F7931E] [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
              Study in {destination} – Entry Requirements
            </p>
            <h2 className="er-title font-display">
              <span className="er-mask">
                <span data-er-word className="inline-block origin-bottom-left">
                  Entry
                </span>
              </span>{" "}
              <span className="er-mask">
                <span data-er-word className={`${accentSerif.className} er-accent inline-block origin-bottom-left`}>
                  Requirements
                </span>
              </span>
            </h2>
            {intro && <p className="er-lede">{intro}</p>}
          </div>

          <div data-er-rise className="er-nav">
            <p className="er-count" aria-live="polite">
              {String(active + 1).padStart(2, "0")} <span>/ {String(programs.length).padStart(2, "0")}</span>
            </p>
            {[
              { step: -1, label: "Previous programme", d: "M15 18l-6-6 6-6" },
              { step: 1, label: "Next programme", d: "M9 6l6 6-6 6" },
            ].map((btn) => (
              <button key={btn.step} type="button" onClick={() => go(btn.step)} aria-label={btn.label} className="er-arrow focus:outline-none">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden style={{ width: "1.1rem", height: "1.1rem" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={btn.d} />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
          <div data-er-rise>
            <div data-er-tabs className={`er-tabs${GROUPS.length < 2 ? " is-single" : ""}`} role="group" aria-label="Study levels">
              <span aria-hidden data-er-ind className="er-ind" />
              {GROUPS.map((group) => (
                <button
                  key={group}
                  type="button"
                  aria-pressed={activeGroup === group}
                  onClick={() => setActive(programs.findIndex((p) => p.group === group))}
                  className={`er-tab focus:outline-none${activeGroup === group ? " is-on" : ""}`}>
                  {group}
                  <span className="er-tab-n">{programs.filter((p) => p.group === group).length}</span>
                </button>
              ))}
            </div>

            <div className="er-rows">
              {GROUPS.map((group) => (
                <div key={group} className={`er-row${activeGroup === group ? " is-on" : ""}`}>
                  {programs.map((program, index) =>
                    program.group === group ? (
                      <button key={program.title} type="button" data-er-pill aria-pressed={active === index} onClick={() => setActive(index)} className={`er-pill focus:outline-none${active === index ? " is-on" : ""}`}>
                        {program.title}
                        <span aria-hidden data-er-bar className="er-bar" />
                      </button>
                    ) : null,
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Every programme is stacked in one cell, so the page never jumps when the content changes */}
          <div data-er-stage className="er-stage">
            {programs.map((program, index) => {
              const tone = TONES[program.group];
              const ielts = ieltsOf(program);
              return (
                <article key={program.title} data-er-panel className={`er-panel${index === 0 ? " is-first" : ""}`} style={{ background: tone.bg }}>
                  <span aria-hidden className="er-orb" style={{ background: tone.glow }} />

                  <div>
                    <div data-er-piece className="er-chips">
                      <span className="er-chip">{program.group}</span>
                      {program.level && <span className="er-chip">{program.level}</span>}
                      {program.duration && <span className="er-chip">{program.duration}</span>}
                    </div>
                    <h3 data-er-piece className="er-name font-display">
                      {program.title}
                    </h3>
                    {program.summary && (
                      <p data-er-piece className="er-summary">
                        {program.summary}
                      </p>
                    )}
                    {program.requirements && program.requirements.length > 0 && (
                      <>
                        <p data-er-piece className="er-label">
                          Entry requirements
                        </p>
                        <ul className="er-reqs">
                          {program.requirements.map((item) => {
                            const { label, value } = splitItem(item);
                            return (
                              <li key={item} data-er-piece className="er-req">
                                {label && <b>{label}</b>}
                                <span>{value}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    )}
                  </div>

                  <div className="er-side">
                    <div data-er-img className="er-frame">
                      <Image src={program.image} alt={program.title} fill quality={90} sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                    </div>
                    {ielts && (
                      <div data-er-piece aria-hidden className="er-meter">
                        <div className="er-meter-top">
                          <span>IELTS band, about</span>
                          <span className="er-score font-display">{ielts.low === ielts.high ? ielts.low : `${ielts.low}–${ielts.high}`}</span>
                        </div>
                        <div className="er-track">
                          <span data-er-meter className="er-fill" style={{ width: `${((Number(ielts.high) - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100}%`, background: tone.accent }} />
                        </div>
                        <div className="er-ticks">
                          {BANDS.map((band) => (
                            <span key={band}>{band}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
