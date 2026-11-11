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

/* The photo is shown in a 6:5 frame cropped to its right side (the handshake under the world map);
   reach lines start at the handshake and land on points across the map. Coordinates are in a 120×100 box. */
const ORIGIN = { x: 59, y: 79 };
const TARGETS = [
  { x: 16, y: 26 },
  { x: 38, y: 13 },
  { x: 70, y: 11 },
  { x: 98, y: 22 },
  { x: 110, y: 50 },
];
/* Flight-style arcs: rise straight up out of the handshake, then bend over onto each point */
const arc = (t: { x: number; y: number }) =>
  `M ${ORIGIN.x} ${ORIGIN.y} C ${ORIGIN.x + (t.x - ORIGIN.x) * 0.15} ${ORIGIN.y - 52}, ${t.x - (t.x - ORIGIN.x) * 0.25} ${t.y - 22}, ${t.x} ${t.y}`;

export default function HeroInstitutionPartner() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const arcs = q("[data-ih-arc]") as unknown as SVGPathElement[];

      /* Signals keep travelling out from the handshake along each reach line */
      const signals = gsap.timeline({
        paused: true,
        repeat: -1,
        repeatDelay: 0.4,
      });
      q("[data-ih-signal]").forEach((dot, i) => {
        signals
          .set(dot, { autoAlpha: 1 }, i * 0.45)
          .to(
            dot,
            {
              duration: 1.7,
              ease: "power1.inOut",
              motionPath: {
                path: arcs[i],
                align: arcs[i],
                alignOrigin: [0.5, 0.5],
              },
            },
            i * 0.45,
          )
          .to(dot, { autoAlpha: 0, duration: 0.25 }, i * 0.45 + 1.5);
      });

      gsap
        .timeline({ defaults: { ease: "expo.out" }, delay: 0.1 })
        .fromTo(
          q("[data-ih-eyebrow]"),
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.9 },
          0,
        )
        .fromTo(
          q("[data-ih-word]"),
          { autoAlpha: 0, yPercent: 115, rotate: 5 },
          {
            autoAlpha: 1,
            yPercent: 0,
            rotate: 0,
            duration: 1.3,
            stagger: 0.12,
          },
          0.1,
        )
        /* "Widen" literally widens */
        .fromTo(
          q("[data-ih-widen]"),
          { letterSpacing: "-0.14em" },
          { letterSpacing: "0.01em", duration: 1.8, ease: "expo.inOut" },
          0.45,
        )
        .fromTo(
          q("[data-ih-copy]"),
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 1 },
          0.55,
        )
        .fromTo(
          q("[data-ih-cta] > *"),
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 },
          0.7,
        )
        /* The photo opens from a narrow slit to the full frame */
        .fromTo(
          q("[data-ih-frame]"),
          { clipPath: "inset(6% 45% 6% 45% round 999px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 28px)",
            duration: 1.7,
            ease: "expo.inOut",
          },
          0.2,
        )
        .fromTo(
          q("[data-ih-zoom]"),
          { scale: 1.4 },
          { scale: 1, duration: 2.2 },
          0.2,
        )
        .fromTo(
          q("[data-ih-back]"),
          { autoAlpha: 0, scale: 0.9, rotate: -6 },
          { autoAlpha: 1, scale: 1, rotate: -3, duration: 1.6 },
          0.6,
        )
        /* Reach lines draw out across the map */
        .fromTo(
          q("[data-ih-ring]"),
          { autoAlpha: 0, scale: 0.3 },
          { autoAlpha: 1, scale: 1, duration: 1, stagger: 0.12 },
          1.35,
        )
        .fromTo(
          arcs,
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            duration: 1.2,
            stagger: 0.1,
            ease: "power2.inOut",
          },
          1.5,
        )
        .fromTo(
          q("[data-ih-pin]"),
          { autoAlpha: 0, scale: 0 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(2.5)",
            transformOrigin: "50% 50%",
          },
          2.3,
        )
        .fromTo(
          q("[data-ih-chip]"),
          { autoAlpha: 0, y: 26, scale: 0.92 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1, stagger: 0.15 },
          2.0,
        )
        .add(() => signals.play(), 2.9);

      /* Gentle depth as the hero scrolls away */
      // Its own layer: sharing the load zoom's layer made the photo jump to the zoom's starting size
      gsap.fromTo(
        q("[data-ih-drift]"),
        { yPercent: 0, scale: 1 },
        {
          yPercent: 3,
          scale: 1.08,
          immediateRender: false,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );
      gsap.to(q("[data-ih-chip]"), {
        y: (i) => (i ? -40 : -24),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      return () => signals.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="ih relative w-full">
      <style>{`
        .ih { overflow: clip; color: #350C0E; margin-top: -7rem;
          background:
            radial-gradient(45% 60% at 80% 40%, rgba(247,147,30,0.17), transparent 70%),
            radial-gradient(34% 40% at 2% 12%, rgba(47,107,255,0.08), transparent 70%),
            radial-gradient(30% 36% at 40% 100%, rgba(59,170,53,0.06), transparent 70%),
            linear-gradient(180deg, #FFEFDD 0%, #FFF6EC 50%, #FFFEFA 100%); }
        .ih::before { content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0.5;
          background-image: linear-gradient(rgba(53,12,14,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(53,12,14,0.05) 1px, transparent 1px);
          background-size: 56px 56px; -webkit-mask-image: radial-gradient(55% 65% at 72% 45%, #000, transparent 75%); mask-image: radial-gradient(55% 65% at 72% 45%, #000, transparent 75%); }
        .ih::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 7rem; pointer-events: none; background: linear-gradient(180deg, rgba(255,254,250,0), #FFFEFA); }
        .ih .ih-wrap { position: relative; z-index: 1; max-width: var(--page-max); margin: 0 auto; padding: 9.5rem 1.5rem 4.5rem;
          display: grid; grid-template-columns: minmax(0, 1fr); gap: 2.75rem; align-items: center; }

        .ih .ih-eyebrow { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0.95rem 0.45rem 0.55rem; border-radius: 999px;
          background: rgba(255,255,255,0.85); box-shadow: 0 0 0 1px rgba(53,12,14,0.08), 0 10px 26px -16px rgba(53,12,14,0.4); font-size: 0.8rem; font-weight: 600; letter-spacing: 0.02em; }
        .ih .ih-eyebrow span { display: grid; place-items: center; width: 1.4rem; height: 1.4rem; border-radius: 999px; background: #2F6BFF; color: #fff; }
        .ih .ih-title { margin-top: 1.3rem; font-size: clamp(2.2rem, 9.4vw, 3.6rem); line-height: 1.02; letter-spacing: -0.045em; font-weight: 600; }
        .ih .ih-mask { display: block; white-space: nowrap; overflow: hidden; padding: 0.04em 0.1em 0.16em 0; margin: -0.04em 0 -0.16em; }
        .ih .ih-accent { color: #F7931E; font-weight: 400; font-style: italic; letter-spacing: -0.02em; font-size: 1.1em; line-height: 0.95; }
        .ih .ih-copy { margin-top: 1.5rem; max-width: 34rem; font-size: 1rem; line-height: 1.7; color: rgba(53,12,14,0.72); }
        .ih .ih-actions { margin-top: 2rem; display: flex; flex-wrap: wrap; align-items: center; gap: 1rem 1.5rem; }
        .ih .ih-btn { display: inline-flex; align-items: center; gap: 0.85rem; padding: 0.45rem 0.45rem 0.45rem 1.5rem; border-radius: 999px;
          background: #350C0E; color: #fff; font-size: 0.95rem; font-weight: 600; box-shadow: 0 16px 32px -16px rgba(53,12,14,0.7);
          transition: background .35s ease, transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease; }
        .ih .ih-btn:hover { background: #F7931E; transform: translateY(-2px); box-shadow: 0 18px 36px -16px rgba(247,147,30,0.85); }
        .ih .ih-btn:focus-visible { outline: 2px solid #F7931E; outline-offset: 3px; }
        .ih .ih-btn-arrow { display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border-radius: 999px; background: rgba(255,255,255,0.16);
          transition: transform .35s cubic-bezier(.22,1,.36,1); }
        .ih .ih-btn:hover .ih-btn-arrow { transform: translateY(3px); }
        .ih .ih-dots { display: inline-flex; align-items: center; gap: 0.6rem; font-size: 0.85rem; font-weight: 500; color: rgba(53,12,14,0.7); }
        .ih .ih-dots i { width: 0.55rem; height: 0.55rem; border-radius: 999px; }

        /* Photo */
        .ih .ih-stage { position: relative; width: min(100%, 40rem); margin: 0 auto; padding: 0 0 1.5rem; }
        .ih .ih-back { position: absolute; inset: 1.75rem -0.5rem 0 1.75rem; border-radius: 32px; transform: rotate(-3deg);
          background: linear-gradient(135deg, #FFCFA3 0%, #FFE0A0 45%, #C4D2FF 100%); }
        .ih .ih-back::after { content: ""; position: absolute; inset: 0; border-radius: inherit; opacity: 0.4;
          background-image: radial-gradient(rgba(53,12,14,0.35) 1px, transparent 1.4px); background-size: 14px 14px; }
        .ih .ih-frame { position: relative; aspect-ratio: 6 / 5; border-radius: 28px; overflow: hidden; isolation: isolate; background: #F3E3D3;
          box-shadow: 0 40px 80px -40px rgba(53,12,14,0.6), 0 0 0 1px rgba(53,12,14,0.06); }
        .ih .ih-drift,
        .ih .ih-zoom { position: absolute; inset: 0; transform-origin: 49% 80%; }
        /* Keep only the right side of the wide photo */
        .ih .ih-crop { position: absolute; right: 0; top: 0; height: 100%; aspect-ratio: 1918 / 820; }
        .ih .ih-crop img { object-fit: cover; }
        .ih .ih-shade { position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(180deg, rgba(53,12,14,0) 55%, rgba(53,12,14,0.55) 100%), linear-gradient(90deg, rgba(255,240,225,0.35), transparent 30%); }
        .ih .ih-svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
        .ih .ih-ring { position: absolute; left: 49.2%; top: 79%; width: 5rem; height: 5rem; margin: -2.5rem 0 0 -2.5rem; border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.85); box-shadow: 0 0 24px rgba(247,147,30,0.6); pointer-events: none; animation: ih-ping 3s cubic-bezier(.22,1,.36,1) infinite; }
        .ih .ih-ring:nth-of-type(2) { animation-delay: 1s; }
        .ih .ih-ring:nth-of-type(3) { animation-delay: 2s; }
        @keyframes ih-ping { 0% { transform: scale(0.6); opacity: 1; } 100% { transform: scale(2.6); opacity: 0; } }

        .ih .ih-chip { position: absolute; z-index: 3; display: flex; align-items: center; gap: 0.65rem; padding: 0.6rem 0.95rem 0.6rem 0.6rem; border-radius: 18px;
          background: rgba(255,255,255,0.92); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 0 0 1px rgba(53,12,14,0.06), 0 22px 44px -22px rgba(53,12,14,0.55); }
        .ih .ih-chip-icon { display: grid; place-items: center; width: 2.3rem; height: 2.3rem; flex: none; border-radius: 12px; color: #fff; }
        .ih .ih-chip strong { display: block; font-size: 0.82rem; font-weight: 600; line-height: 1.25; }
        .ih .ih-chip small { display: block; font-size: 0.72rem; color: rgba(53,12,14,0.6); }
        .ih .ih-chip-a { left: -0.5rem; top: 1.25rem; }
        .ih .ih-chip-b { right: -0.5rem; bottom: 0; }

        @media (prefers-reduced-motion: no-preference) {
          .ih [data-ih-eyebrow], .ih [data-ih-word], .ih [data-ih-copy], .ih [data-ih-cta] > *, .ih [data-ih-back],
          .ih [data-ih-ring], .ih [data-ih-pin], .ih [data-ih-chip], .ih [data-ih-signal] { visibility: hidden; }
          .ih [data-ih-frame] { clip-path: inset(6% 45% 6% 45% round 999px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ih .ih-ring { animation: none; opacity: 0.6; }
          .ih [data-ih-signal] { display: none; }
        }

        @media (min-width: 640px) {
          .ih .ih-wrap { padding: 10rem 2rem 5.5rem; }
          .ih .ih-copy { font-size: 1.06rem; }
          .ih .ih-chip-a { left: -1.5rem; }
          .ih .ih-chip-b { right: -1.5rem; }
        }
        @media (min-width: 1024px) {
          .ih .ih-wrap { grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr); gap: clamp(3rem, 5vw, 5.5rem); padding: 10rem var(--page-gutter) 6rem; }
          .ih .ih-title { font-size: clamp(2.9rem, 4.3vw, 4.4rem); }
          .ih .ih-stage { width: min(100%, 40rem, calc((100svh - 9.5rem) * 1.2)); margin-right: 0; }
          .ih .ih-chip-a { left: -2.5rem; }
        }
        @media (min-width: 1024px) and (max-height: 760px) {
          .ih .ih-wrap { padding-top: 8.25rem; padding-bottom: 4.5rem; }
          .ih .ih-title { font-size: clamp(2.8rem, 3.9vw, 3.8rem); }
          .ih .ih-copy { margin-top: 1.1rem; }
          .ih .ih-actions { margin-top: 1.5rem; }
        }
      `}</style>

      <div className="ih-wrap">
        {/* Text */}
        <div>
          <span data-ih-eyebrow className="ih-eyebrow">
            <span aria-hidden>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="m12 2 10 5-10 5L2 7l10-5Zm-7 8.5 7 3.5 7-3.5V16l-7 3.5L5 16v-5.5Z" />
              </svg>
            </span>
            Institution partners
          </span>

          <h1 className="ih-title">
            <span className="ih-mask">
              <span data-ih-word className="inline-block origin-bottom-left">
                Team Up With Us,
              </span>
            </span>
            <span className="ih-mask">
              <span
                data-ih-word
                className={`${accentSerif.className} ih-accent inline-block origin-bottom-left`}
              >
                <span data-ih-widen className="inline-block">
                  Widen
                </span>{" "}
                Your Reach
              </span>
            </span>
          </h1>

          <p data-ih-copy className="ih-copy">
            Become part of a trusted network of institutions and help even more
            students reach their international education goals through
            meaningful, strategic collaboration.
          </p>

          <div data-ih-cta className="ih-actions">
            <Link href="#institution-form" className="ih-btn">
              Become An Institution Partner
              <span className="ih-btn-arrow" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14M6 13l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
            <span className="ih-dots" aria-hidden>
              <span style={{ display: "inline-flex", gap: "0.25rem" }}>
                <i style={{ background: "#F7931E" }} />
                <i style={{ background: "#2F6BFF" }} />
                <i style={{ background: "#3BAA35" }} />
              </span>
              Universities &amp; colleges
            </span>
          </div>
        </div>

        {/* Photo: reach lines spread from the handshake across the map */}
        <div className="ih-stage">
          <span data-ih-back className="ih-back" aria-hidden />
          <div data-ih-frame className="ih-frame">
            <div data-ih-drift className="ih-drift">
              <div data-ih-zoom className="ih-zoom">
                <div className="ih-crop">
                  <Image
                    src="/partner-hand.png"
                    alt="Two partners shaking hands in front of a world map"
                    fill
                    priority
                    sizes="(max-width: 1023px) 220vw, 1400px"
                  />
                </div>
                <span className="ih-shade" aria-hidden />
                <span data-ih-ring className="ih-ring" aria-hidden />
                <span data-ih-ring className="ih-ring" aria-hidden />
                <span data-ih-ring className="ih-ring" aria-hidden />
                <svg
                  className="ih-svg"
                  viewBox="0 0 120 100"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden
                >
                  <defs>
                    <linearGradient
                      id="ih-arc-grad"
                      gradientUnits="userSpaceOnUse"
                      x1="0"
                      y1="80"
                      x2="0"
                      y2="5"
                    >
                      <stop
                        offset="0%"
                        stopColor="#F7931E"
                        stopOpacity="0.95"
                      />
                      <stop
                        offset="100%"
                        stopColor="#FFFFFF"
                        stopOpacity="0.9"
                      />
                    </linearGradient>
                  </defs>
                  {TARGETS.map((t, i) => (
                    <path
                      key={i}
                      data-ih-arc
                      d={arc(t)}
                      fill="none"
                      stroke="url(#ih-arc-grad)"
                      strokeWidth="0.45"
                      strokeDasharray="1.6 1.1"
                      strokeLinecap="round"
                    />
                  ))}
                  {TARGETS.map((t, i) => (
                    <g key={i} data-ih-pin>
                      <circle
                        cx={t.x}
                        cy={t.y}
                        r="2.6"
                        fill="rgba(247,147,30,0.3)"
                      />
                      <circle
                        cx={t.x}
                        cy={t.y}
                        r="1.3"
                        fill="#fff"
                        stroke="#F7931E"
                        strokeWidth="0.6"
                      />
                    </g>
                  ))}
                  {TARGETS.map((_, i) => (
                    <circle
                      key={i}
                      data-ih-signal
                      r="1"
                      fill="#fff"
                      style={{ filter: "drop-shadow(0 0 1.5px #F7931E)" }}
                    />
                  ))}
                </svg>
              </div>
            </div>
          </div>

          <div data-ih-chip className="ih-chip ih-chip-a">
            <span
              className="ih-chip-icon"
              style={{ background: "#3BAA35" }}
              aria-hidden
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <span>
              <strong>Trusted network</strong>
              <small>of institutions</small>
            </span>
          </div>
          <div data-ih-chip className="ih-chip ih-chip-b">
            <span
              className="ih-chip-icon"
              style={{ background: "#F7931E" }}
              aria-hidden
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.6 3.5 5.6 3.5 9s-1 6.4-3.5 9c-2.5-2.6-3.5-5.6-3.5-9s1-6.4 3.5-9Z" />
              </svg>
            </span>
            <span>
              <strong>International reach</strong>
              <small>for your students</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
