"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Years of experience", value: "10+" },
  { label: "Service guarantee", value: "100%" },
  { label: "Successful visas", value: "5,000+" },
  { label: "Students placed", value: "5,000+" },
];

// Route order: outward from the head office
const offices = [
  { city: "Dhaka", country: "Bangladesh", code: "BD", hq: true },
  { city: "Delhi", country: "India", code: "IN", hq: false },
  { city: "London", country: "United Kingdom", code: "GB", hq: false },
];

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
        const { isDesktop, motionOK } = ctx.conditions as { isDesktop: boolean; motionOK: boolean };
        if (!motionOK) return; // reduced motion: the markup already shows the finished state

        /* Heading */
        gsap
          .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: el, start: "top 80%", once: true } })
          .fromTo(q("[data-osb-eyebrow]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
          .fromTo(q("[data-osb-word]"), { autoAlpha: 0, yPercent: 115, rotate: 4 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.12 }, 0.08)
          .fromTo(q("[data-osb-copy]"), { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.12 }, 0.35);

        /* Route panel rises in */
        const panel = q("[data-osb-route]")[0];
        gsap.fromTo(panel, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: panel, start: "top 92%", once: true } });

        /* On scroll: the route leaves Dhaka and lights up each city as the plane reaches it */
        const rail = q("[data-osb-rail]")[0];
        const fill = q("[data-osb-fill]");
        const plane = q("[data-osb-plane]");
        const stops = q("[data-osb-stop]");
        gsap.set(plane, { autoAlpha: 1, rotate: isDesktop ? 0 : 90 });

        const route = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: panel,
            start: isDesktop ? "top 78%" : "top 70%",
            end: isDesktop ? "top 28%" : "bottom 55%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        route
          .fromTo(fill, isDesktop ? { scaleX: 0 } : { scaleY: 0 }, { ...(isDesktop ? { scaleX: 1 } : { scaleY: 1 }), duration: 1 }, 0)
          .fromTo(plane, { x: 0, y: 0 }, { x: () => (isDesktop ? rail.offsetWidth : 0), y: () => (isDesktop ? 0 : rail.offsetHeight), duration: 1 }, 0);
        stops.forEach((stop, i) => {
          const at = (i / stops.length) * 0.96;
          const s = gsap.utils.selector(stop);
          route
            .fromTo(s("[data-osb-city]"), { opacity: 0.2, y: 14 }, { opacity: 1, y: 0, duration: 0.14, ease: "power1.out" }, at)
            .fromTo(s("[data-osb-dot]"), { backgroundColor: "rgba(53,12,14,0.18)", scale: 0.7 }, { backgroundColor: "#F7931E", scale: 1, duration: 0.06 }, at);
        });

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
        .osb .osb-wrap { max-width: 84rem; margin: 0 auto; padding: 1rem 1.5rem 5rem; }
        .osb .osb-head { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2rem; }
        .osb .osb-title { margin-top: 1.5rem; font-size: clamp(2.8rem, 12vw, 4rem); line-height: 1.02; letter-spacing: -0.04em; font-weight: 600; }
        .osb .osb-mask { display: block; overflow: hidden; padding: 0 0.1em 0.12em 0; margin-bottom: -0.12em; }
        .osb .osb-accent { font-size: 1.16em; line-height: 0.9; letter-spacing: -0.02em; font-weight: 400; font-stretch: normal; color: #F7931E; }
        .osb .osb-text { max-width: 31rem; font-size: 1.0625rem; line-height: 1.65; color: rgba(53,12,14,0.72); }
        .osb .osb-btn { margin-top: 1.75rem; background: #350C0E; color: #fff; transition: background-color .3s ease, translate .3s ease; }
        .osb .osb-btn:hover, .osb .osb-btn:focus-visible { background: #F7931E; translate: 0 -2px; }

        .osb .osb-route { margin-top: 3.5rem; padding: 2.5rem 1.75rem 3rem; border-radius: 2rem; background: linear-gradient(115deg, #FFF0E1 0%, #FFF8F0 52%, #FDE6CF 100%); }
        .osb .osb-cities { position: relative; display: grid; grid-template-columns: minmax(0, 1fr); gap: 2.75rem; padding-left: 2.5rem; }
        .osb .osb-rail { position: absolute; left: 6px; top: 1rem; bottom: 0; width: 2px; background: rgba(53,12,14,0.12); }
        .osb .osb-fill { position: absolute; inset: 0; background: #F7931E; transform-origin: 0 0; }
        .osb .osb-plane { position: absolute; left: -11px; top: -11px; width: 24px; height: 24px; color: #350C0E; visibility: hidden; }
        .osb .osb-stop { position: relative; }
        .osb .osb-dot { position: absolute; left: -2.5rem; top: 0.5rem; width: 14px; height: 14px; border-radius: 50%; background: #F7931E; box-shadow: 0 0 0 5px rgba(247,147,30,0.16); }
        .osb .osb-name { font-size: clamp(3.6rem, 18vw, 5rem); line-height: 1; letter-spacing: -0.02em; }

        .osb .osb-stats { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1px; margin-top: 1rem; overflow: hidden; border-radius: 2rem; background: #5A2B2E; }
        .osb .osb-stat { display: flex; flex-direction: column-reverse; justify-content: flex-end; gap: 0.6rem; padding: 2rem 1.5rem; background: #350C0E; transition: background-color .4s ease; }
        .osb .osb-stat:hover { background: #47161A; }
        .osb .osb-value { font-size: clamp(2.3rem, 10vw, 3rem); line-height: 1; letter-spacing: -0.04em; font-weight: 600; color: #fff; transition: color .4s ease; }
        .osb .osb-stat:hover .osb-value { color: #FFB25E; }
        .osb .osb-label { font-size: 0.875rem; font-weight: 500; color: rgba(255,255,255,0.66); }

        @media (min-width: 1024px) {
          .osb .osb-wrap { padding: 1rem 5.4vw 7rem; }
          .osb .osb-head { grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); align-items: end; gap: 4rem; }
          .osb .osb-title { font-size: clamp(3.4rem, 5.5vw, 5.9rem); }
          .osb .osb-route { margin-top: 4.5rem; padding: 3.25rem 3.25rem 3.5rem; }
          .osb .osb-cities { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0; padding: 3rem 0 0; }
          .osb .osb-rail { left: 0; right: 0; top: 6px; bottom: auto; width: auto; height: 2px; }
          .osb .osb-plane { left: -12px; top: -11px; }
          .osb .osb-dot { left: 0; top: -3rem; }
          .osb .osb-name { font-size: clamp(4rem, 7vw, 7.25rem); }
          .osb .osb-stats { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          .osb .osb-stat { padding: 2.75rem 2.5rem; }
          .osb .osb-value { font-size: clamp(3rem, 4.8vw, 5rem); }
          .osb .osb-label { font-size: 0.9375rem; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .osb [data-osb-eyebrow], .osb [data-osb-word], .osb [data-osb-copy], .osb [data-osb-route], .osb [data-osb-stats] { visibility: hidden; }
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

        {/* Route: head office outward */}
        <div data-osb-route className="osb-route">
          <ul className="osb-cities">
            <li aria-hidden data-osb-rail className="osb-rail">
              <span data-osb-fill className="osb-fill" />
              <svg data-osb-plane viewBox="0 0 24 24" className="osb-plane" fill="currentColor">
                <path d="M22 12 2 4l5 8-5 8 20-8Z" />
              </svg>
            </li>
            {offices.map((o) => (
              <li key={o.city} data-osb-stop className="osb-stop">
                <span aria-hidden data-osb-dot className="osb-dot" />
                <div data-osb-city>
                  <p className={`${accentSerif.className} osb-name`}>{o.city}</p>
                  <p className="mt-3 flex flex-wrap items-center gap-2.5 text-sm font-semibold">
                    <ReactCountryFlag svg countryCode={o.code} aria-hidden style={{ width: "1.5rem", height: "1.1rem", borderRadius: "3px", objectFit: "cover" }} />
                    {o.country}
                    {o.hq && <span className="rounded-full bg-[#350C0E] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">Head office</span>}
                  </p>
                </div>
              </li>
            ))}
          </ul>
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
