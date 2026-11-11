"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

const LEAD = "Admission OnBoard started with one simple idea: studying abroad should feel".split(" ");

const RADIUS = "2rem";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        q("[data-about-eyebrow]"),
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 82%", once: true } },
      );

      /* The statement fills in word by word as you scroll, then "overwhelming" gets crossed out */
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: q("[data-statement]")[0], start: "top 80%", end: "bottom 55%", scrub: 0.6 },
        })
        .fromTo(q("[data-fill]"), { opacity: 0.13 }, { opacity: 1, duration: 0.2, stagger: 0.06 })
        .fromTo(q("[data-strike]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.25, ease: "power1.inOut" });

      /* Photo opens up from a smaller window while it drifts inside its frame */
      const frame = q("[data-about-frame]")[0];
      gsap.fromTo(
        frame,
        { clipPath: `inset(10% 9% 10% 9% round ${RADIUS})` },
        { clipPath: `inset(0% 0% 0% 0% round ${RADIUS})`, ease: "power1.out", scrollTrigger: { trigger: frame, start: "top 92%", end: "top 40%", scrub: 0.7 } },
      );
      gsap.fromTo(
        q("[data-about-img]"),
        { yPercent: -5 },
        { yPercent: 5, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.7 } },
      );

      /* Copy rises in */
      gsap.fromTo(
        q("[data-about-rise]"),
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: q("[data-about-rise]")[0], start: "top 85%", once: true },
        },
      );

      /* Bridge card: the arc draws from ambition to opportunity, then a plane keeps crossing it */
      const arc = el.querySelector("[data-arc]") as SVGPathElement;
      const plane = q("[data-arc-plane]");
      gsap.set(plane, { autoAlpha: 0 });
      gsap
        .timeline({ scrollTrigger: { trigger: q("[data-bridge]")[0], start: "top 92%", once: true } })
        .fromTo(q("[data-bridge]"), { autoAlpha: 0, y: 40, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: "expo.out" })
        .fromTo(q("[data-arc-end]"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.5, stagger: 0.75, ease: "back.out(3)" }, 0.3)
        .fromTo(arc, { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.85, ease: "power2.inOut" }, 0.4)
        .add(() => {
          gsap.set(plane, { autoAlpha: 1 });
          gsap.to(plane, {
            motionPath: { path: arc, align: arc, alignOrigin: [0.5, 0.5], autoRotate: true },
            duration: 3.4,
            ease: "power1.inOut",
            repeat: -1,
            repeatDelay: 0.7,
          });
        });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="about" className="osa relative w-full">
      <style>{`
        .osa { overflow: clip; color: #350C0E; background: #FFFEFA; }
        .osa .osa-wrap { max-width: var(--page-max); margin: 0 auto; padding: 3rem 1.5rem 7rem; }
        .osa .osa-statement { margin-top: 1.75rem; max-width: 74rem; font-size: clamp(2.05rem, 8.4vw, 3rem); line-height: 1.12; letter-spacing: -0.035em; font-weight: 600; }
        .osa .osa-accent { font-size: 1.14em; line-height: 0.9; letter-spacing: -0.02em; font-weight: 400; font-stretch: normal; }
        .osa .osa-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 3rem; margin-top: 4rem; }
        .osa .osa-frame { position: relative; aspect-ratio: 3 / 2; overflow: hidden; border-radius: ${RADIUS}; }
        .osa .osa-bridge { position: relative; z-index: 1; margin: -3.5rem 1rem 0; padding: 1.25rem 1.5rem 1.35rem; border-radius: 1.5rem; background: #fff; box-shadow: 0 30px 60px -30px rgba(53,12,14,0.4); }
        .osa .osa-label { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #F7931E; }
        .osa .osa-body { margin-top: 0.6rem; font-size: 1.0625rem; line-height: 1.65; color: rgba(53,12,14,0.72); }
        .osa .osa-rule { height: 1px; margin: 1.6rem 0; background: rgba(53,12,14,0.12); }
        .osa .osa-btn { margin-top: 2.25rem; background: #350C0E; color: #fff; transition: background-color .3s ease, translate .3s ease; }
        .osa .osa-btn:hover, .osa .osa-btn:focus-visible { background: #F7931E; translate: 0 -2px; }
        @media (min-width: 1024px) {
          .osa .osa-wrap { padding: 4rem var(--page-gutter) 9rem; }
          .osa .osa-statement { font-size: clamp(3rem, 4.9vw, 5.1rem); line-height: 1.08; }
          .osa .osa-grid { grid-template-columns: minmax(0, 0.72fr) minmax(0, 1.28fr); align-items: center; gap: clamp(3rem, 6vw, 6.5rem); margin-top: 6rem; }
          .osa .osa-bridge { position: absolute; left: -2.5rem; bottom: -3rem; width: 23rem; margin: 0; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .osa [data-about-eyebrow], .osa [data-about-rise], .osa [data-bridge] { visibility: hidden; }
        }
      `}</style>

      <div className="osa-wrap">
        <h2 data-about-eyebrow className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
          <span className="h-3.5 w-5 bg-[#F7931E] [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
          About us
        </h2>

        <p data-statement className="osa-statement font-display">
          {LEAD.map((word, i) => (
            <span key={i}>
              <span data-fill>{word}</span>{" "}
            </span>
          ))}
          <span data-fill className={`${accentSerif.className} osa-accent text-[#F7931E]`}>
            exciting,
          </span>{" "}
          <span data-fill>not</span>{" "}
          <span data-fill className="relative inline-block">
            overwhelming.
            <svg aria-hidden viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute left-[-1%] top-[46%] w-[102%] overflow-visible" style={{ height: "0.2em" }}>
              <path data-strike d="M3 14 C 80 6, 200 12, 297 5" fill="none" stroke="#F7931E" strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
          </span>
        </p>

        <div className="osa-grid">
          {/* Copy */}
          <div>
            <div data-about-rise>
              <p className="osa-label">What we do</p>
              <p className="osa-body">We connect students with leading universities, cut through the confusion around admissions and visas, and bring every part of the journey under one roof.</p>
            </div>
            <div data-about-rise className="osa-rule" />
            <div data-about-rise>
              <p className="osa-label">Who we are today</p>
              <p className="osa-body">Today, we&apos;re more than a consultancy. We&apos;re the bridge between ambition and opportunity, one student at a time.</p>
            </div>
            <div data-about-rise>
              <Link href="/careers" className="osa-btn group inline-flex h-14 items-center gap-3 rounded-full pl-7 pr-2.5 text-base font-semibold focus:outline-none">
                Join our team
                <span className="grid size-9 place-items-center rounded-full bg-white text-[#350C0E] transition-transform duration-300 group-hover:rotate-90">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Photo + bridge card */}
          <div className="relative">
            <div data-about-frame className="osa-frame">
              <div data-about-img className="absolute inset-x-0" style={{ top: "-8%", bottom: "-8%" }}>
                <Image src="/about.png" alt="Admission OnBoard team planning study routes around a world map" fill quality={90} sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
              </div>
            </div>

            <div data-bridge aria-hidden className="osa-bridge">
              <svg viewBox="0 0 320 62" className="block w-full overflow-visible">
                <path data-arc d="M12 50 C 90 -8, 230 -8, 308 50" fill="none" stroke="#F7931E" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 7" />
                <circle data-arc-end cx="12" cy="50" r="7" fill="#350C0E" />
                <circle data-arc-end cx="308" cy="50" r="7" fill="#F7931E" />
                <path data-arc-plane d="M-11 -8 L13 0 L-11 8 L-6 0 Z" fill="#350C0E" />
              </svg>
              <div className={`${accentSerif.className} mt-1 flex items-baseline justify-between`} style={{ fontSize: "1.65rem", lineHeight: 1.1 }}>
                <span>Ambition</span>
                <span>Opportunity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
