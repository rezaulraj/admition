"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

type Uni = { name: string; logo: string };

/* Partner universities circling the handshake */
const OUTER: Uni[] = [
  { name: "BPP University", logo: "/univercity-logo/bpp.jpg" },
  { name: "University of Hertfordshire", logo: "/univercity-logo/uh.jpg" },
  { name: "University of Law", logo: "/univercity-logo/low.png" },
  { name: "University of Chester", logo: "/univercity-logo/uoc.png" },
  { name: "London South Bank University", logo: "/univercity-logo/lsbu.jpg" },
  { name: "Aston University, London", logo: "/univercity-logo/aul.png" },
];
const INNER: Uni[] = [
  { name: "University of Hull - London", logo: "/univercity-logo/uoh.png" },
  { name: "Regent College London", logo: "/univercity-logo/rcl.png" },
  { name: "University of Bedfordshire", logo: "/univercity-logo/uob.png" },
  { name: "Anglia Ruskin University", logo: "/univercity-logo/aru.jpg" },
];

function Orbit({ unis, ring, offset }: { unis: Uni[]; ring: "outer" | "inner"; offset: number }) {
  return (
    <div data-pz-ring={ring} className={`pz-ring pz-ring-${ring}`}>
      {unis.map((u, i) => (
        <div key={u.name} className="pz-slot" style={{ "--a": `${offset + (360 / unis.length) * i}deg` } as CSSProperties}>
          <div data-pz-upright={ring} className="pz-upright">
            <div data-pz-logo className="pz-logo" title={u.name}>
              <Image src={u.logo} alt={u.name} fill sizes="96px" className="pz-logo-img" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PartnerExpand() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const stage = q("[data-pz-stage]")[0] as HTMLElement;

      /* Text side */
      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: el, start: "top 85%", once: true } })
        .fromTo(q("[data-pz-eyebrow]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0)
        .fromTo(q("[data-pz-word]"), { autoAlpha: 0, yPercent: 115, rotate: 5 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.12 }, 0.1)
        .fromTo(q("[data-pz-underline]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.1, ease: "power2.inOut" }, 0.75)
        .fromTo(q("[data-pz-copy] > *"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 }, 0.5)
        .fromTo(q("[data-pz-cta] > *"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 }, 0.75);

      /* The network assembles around the handshake */
      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: stage, start: "top 85%", once: true } })
        .fromTo(q("[data-pz-track]"), { drawSVG: "50% 50%" }, { drawSVG: "0% 100%", duration: 1.6, stagger: 0.15, ease: "power3.inOut" }, 0)
        .fromTo(q("[data-pz-dots]"), { autoAlpha: 0, rotate: -40 }, { autoAlpha: 1, rotate: 0, duration: 2 }, 0.1)
        .fromTo(q("[data-pz-photo]"), { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(50% at 50% 50%)", duration: 1.5, ease: "power3.inOut" }, 0.2)
        .fromTo(q("[data-pz-photo] img"), { scale: 1.45 }, { scale: 1, duration: 2 }, 0.2)
        .fromTo(q("[data-pz-halo]"), { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 1.4 }, 0.6)
        .fromTo(q("[data-pz-logo]"), { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.9, ease: "back.out(1.9)", stagger: { each: 0.08, from: "random" } }, 0.8)
        .fromTo(q("[data-pz-link]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.2, ease: "power2.inOut" }, 1.2)
        .fromTo(q("[data-pz-chip-l]"), { autoAlpha: 0, x: -40, scale: 0.9 }, { autoAlpha: 1, x: 0, scale: 1, duration: 1 }, 1.1)
        .fromTo(q("[data-pz-chip-r]"), { autoAlpha: 0, x: 40, scale: 0.9 }, { autoAlpha: 1, x: 0, scale: 1, duration: 1 }, 1.3)
        .fromTo(q("[data-pz-badge]"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.1 }, 1.5)
        .fromTo(q("[data-pz-sealed]"), { autoAlpha: 0, y: 30, scale: 0.8 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.8)" }, 1.7)
        .add(() => pulse.play(), 2.2);

      /* A spark travels along the line from the agency to us, over and over */
      const link = el.querySelector<SVGPathElement>("[data-pz-link]")!;
      const pulse = gsap
        .timeline({ paused: true, repeat: -1, repeatDelay: 0.6 })
        .set(q("[data-pz-spark]"), { autoAlpha: 1 })
        .to(q("[data-pz-spark]"), {
          duration: 2.6,
          ease: "power1.inOut",
          motionPath: { path: link, align: link, alignOrigin: [0.5, 0.5] },
        })
        .to(q("[data-pz-spark]"), { autoAlpha: 0, duration: 0.25 }, "-=0.25");

      /* The two rings turn in opposite directions; the logos stay upright */
      const spin = (ring: "outer" | "inner", dir: number, duration: number) =>
        gsap
          .timeline({ repeat: -1 })
          .to(q(`[data-pz-ring="${ring}"]`), { rotate: 360 * dir, duration, ease: "none" }, 0)
          .to(q(`[data-pz-upright="${ring}"]`), { rotate: -360 * dir, duration, ease: "none" }, 0);
      const spins = [spin("outer", 1, 70), spin("inner", -1, 48)];

      /* Scrolling makes the network spin faster; it only runs while on screen */
      ScrollTrigger.create({
        trigger: stage,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => spins.forEach((t) => (self.isActive ? t.play() : t.pause())),
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 220, 9);
          spins.forEach((t) => {
            t.timeScale(boost);
            gsap.to(t, { timeScale: 1, duration: 1.4, ease: "power2.out", overwrite: true });
          });
        },
      });

      /* Layers drift with the pointer for depth */
      const layers = q("[data-pz-depth]").map((node) => {
        const depth = Number((node as HTMLElement).dataset.pzDepth);
        return {
          depth,
          x: gsap.quickTo(node, "x", { duration: 0.9, ease: "power3.out" }),
          y: gsap.quickTo(node, "y", { duration: 0.9, ease: "power3.out" }),
        };
      });
      const move = (e: PointerEvent) => {
        const r = stage.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        layers.forEach((l) => {
          l.x(nx * l.depth);
          l.y(ny * l.depth);
        });
      };
      const leave = () => layers.forEach((l) => (l.x(0), l.y(0)));
      stage.addEventListener("pointermove", move);
      stage.addEventListener("pointerleave", leave);

      return () => {
        pulse.kill();
        stage.removeEventListener("pointermove", move);
        stage.removeEventListener("pointerleave", leave);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="pz relative w-full">
      <style>{`
        .pz { overflow: clip; color: #350C0E; margin-top: -7rem;
          background:
            radial-gradient(40% 55% at 78% 45%, rgba(247,147,30,0.15), transparent 70%),
            radial-gradient(34% 40% at 96% 62%, rgba(47,107,255,0.09), transparent 70%),
            radial-gradient(34% 40% at 0% 8%, rgba(59,170,53,0.08), transparent 70%),
            linear-gradient(180deg, #FFEFDD 0%, #FFF6EC 45%, #FFFEFA 100%); }
        /* Fades the bottom into the next section so there is no hard edge */
        .pz::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 9rem; pointer-events: none; background: linear-gradient(180deg, rgba(255,254,250,0), #FFFEFA); }
        .pz::before { content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0.5;
          background-image: linear-gradient(rgba(53,12,14,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(53,12,14,0.05) 1px, transparent 1px);
          background-size: 56px 56px; -webkit-mask-image: radial-gradient(60% 70% at 70% 45%, #000 0%, transparent 75%); mask-image: radial-gradient(60% 70% at 70% 45%, #000 0%, transparent 75%); }
        .pz .pz-wrap { position: relative; z-index: 1; max-width: var(--page-max); margin: 0 auto; padding: 9.5rem 1.5rem 5rem;
          display: grid; grid-template-columns: minmax(0, 1fr); gap: 3rem; align-items: center; }

        /* Text */
        .pz .pz-eyebrow { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0.95rem 0.45rem 0.55rem; border-radius: 999px;
          background: rgba(255,255,255,0.85); box-shadow: 0 0 0 1px rgba(53,12,14,0.08), 0 10px 26px -16px rgba(53,12,14,0.4);
          font-size: 0.8rem; font-weight: 600; letter-spacing: 0.02em; }
        .pz .pz-dots3 { display: inline-flex; }
        .pz .pz-dots3 i { width: 0.7rem; height: 0.7rem; border-radius: 999px; border: 2px solid #fff; }
        .pz .pz-dots3 i + i { margin-left: -0.25rem; }
        .pz .pz-title { margin-top: 1.3rem; font-size: clamp(2.5rem, 11vw, 3.6rem); line-height: 1.02; letter-spacing: -0.045em; font-weight: 600; }
        .pz .pz-mask { display: block; overflow: hidden; padding: 0.04em 0.1em 0.16em 0; margin: -0.04em 0 -0.16em; }
        .pz .pz-accent-wrap { position: relative; display: inline-block; }
        .pz .pz-accent { color: #F7931E; font-weight: 400; font-style: italic; letter-spacing: -0.02em; font-size: 1.1em; line-height: 0.95; }
        .pz .pz-underline { position: absolute; left: 0; right: 0; bottom: -0.06em; width: 100%; height: 0.32em; overflow: visible; pointer-events: none; }
        .pz .pz-copy { margin-top: 1.5rem; display: grid; gap: 1rem; max-width: 36rem; font-size: 1rem; line-height: 1.7; color: rgba(53,12,14,0.72); }
        .pz .pz-actions { margin-top: 2rem; display: flex; flex-wrap: wrap; align-items: center; gap: 1rem 1.25rem; }
        .pz .pz-btn { display: inline-flex; align-items: center; gap: 0.85rem; padding: 0.45rem 0.45rem 0.45rem 1.5rem; border-radius: 999px;
          background: #350C0E; color: #fff; font-size: 0.95rem; font-weight: 600; box-shadow: 0 16px 32px -16px rgba(53,12,14,0.7);
          transition: background .35s ease, transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease; }
        .pz .pz-btn:hover { background: #F7931E; transform: translateY(-2px); box-shadow: 0 18px 36px -16px rgba(247,147,30,0.85); }
        .pz .pz-btn:focus-visible { outline: 2px solid #F7931E; outline-offset: 3px; }
        .pz .pz-btn-arrow { display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border-radius: 999px; background: rgba(255,255,255,0.16);
          transition: transform .35s cubic-bezier(.22,1,.36,1); }
        .pz .pz-btn:hover .pz-btn-arrow { transform: rotate(-45deg); }
        .pz .pz-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .pz .pz-tags li { display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.45rem 0.85rem; border-radius: 999px; font-size: 0.8rem; font-weight: 500;
          background: rgba(255,255,255,0.75); box-shadow: inset 0 0 0 1px rgba(53,12,14,0.1); }
        .pz .pz-tags li i { width: 0.45rem; height: 0.45rem; border-radius: 999px; }

        /* Network stage */
        .pz .pz-stage { position: relative; width: min(100%, 36rem); aspect-ratio: 1; margin: 0 auto; container-type: inline-size; touch-action: pan-y; }
        .pz .pz-layer { position: absolute; inset: 0; }
        .pz .pz-svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
        .pz .pz-dotring { position: absolute; inset: 1%; border-radius: 999px; border: 1.5px dashed rgba(53,12,14,0.14); }
        .pz .pz-ping { position: absolute; left: 50%; top: 50%; width: 50cqw; height: 50cqw; margin: -25cqw 0 0 -25cqw; border-radius: 999px;
          border: 1.5px solid rgba(247,147,30,0.45); animation: pz-ping 4.2s cubic-bezier(.22,1,.36,1) infinite; pointer-events: none; }
        .pz .pz-ping:nth-child(2) { animation-delay: 1.4s; }
        .pz .pz-ping:nth-child(3) { animation-delay: 2.8s; }
        @keyframes pz-ping { 0% { transform: scale(1); opacity: 0.9; } 100% { transform: scale(1.95); opacity: 0; } }

        .pz .pz-halo { position: absolute; left: 50%; top: 50%; width: 55cqw; height: 55cqw; margin: -27.5cqw 0 0 -27.5cqw; border-radius: 999px;
          background: conic-gradient(from 0deg, #F7931E, #FFCFA3, #2F6BFF, #C4D2FF, #3BAA35, #BCE6B4, #F7931E);
          animation: pz-turn 9s linear infinite; filter: saturate(1.1); }
        .pz .pz-halo::after { content: ""; position: absolute; inset: -14%; border-radius: inherit; z-index: -1; filter: blur(30px); opacity: 0.45;
          background: inherit; }
        @keyframes pz-turn { to { transform: rotate(360deg); } }
        .pz .pz-photo { position: absolute; left: 50%; top: 50%; width: 51cqw; height: 51cqw; margin: -25.5cqw 0 0 -25.5cqw; border-radius: 999px; overflow: hidden;
          background: #FFE7CC; box-shadow: 0 0 0 5px #FFFDF8, 0 30px 60px -24px rgba(53,12,14,0.6); }
        .pz .pz-photo img { object-fit: cover; object-position: 50% 58%; }
        .pz .pz-photo::after { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
          background: radial-gradient(70% 70% at 30% 20%, rgba(255,255,255,0.18), transparent 60%), linear-gradient(180deg, transparent 60%, rgba(53,12,14,0.28)); }

        .pz .pz-ring { position: absolute; inset: 0; pointer-events: none; }
        .pz .pz-slot { position: absolute; left: 50%; top: 50%; width: 0; height: 0;
          transform: rotate(var(--a)) translateX(var(--r)) rotate(calc(-1 * var(--a))); }
        .pz .pz-ring-outer .pz-slot { --r: 43cqw; }
        .pz .pz-ring-inner .pz-slot { --r: 34.5cqw; }
        .pz .pz-upright { position: absolute; left: 0; top: 0; }
        .pz .pz-logo { position: absolute; left: 0; top: 0; width: 15.5cqw; height: 9cqw; translate: -50% -50%; border-radius: 3cqw; overflow: hidden;
          background: #fff; pointer-events: auto; box-shadow: 0 0 0 1px rgba(53,12,14,0.07), 0 14px 28px -14px rgba(53,12,14,0.45);
          transition: scale .4s cubic-bezier(.22,1,.36,1), box-shadow .4s ease; }
        .pz .pz-ring-inner .pz-logo { width: 13cqw; height: 7.8cqw; }
        .pz .pz-logo:hover { scale: 1.18; box-shadow: 0 0 0 2px #F7931E, 0 18px 34px -14px rgba(247,147,30,0.6); }
        .pz .pz-logo-img { object-fit: contain; padding: 0.5cqw 0.8cqw; }

        .pz .pz-chip { position: absolute; z-index: 4; display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0.85rem 0.4rem 0.4rem; border-radius: 999px;
          white-space: nowrap; font-size: 0.74rem; font-weight: 600; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 0 0 1px rgba(53,12,14,0.06), 0 14px 30px -14px rgba(53,12,14,0.5); }
        .pz .pz-chip b { display: grid; place-items: center; width: 1.5rem; height: 1.5rem; border-radius: 999px; color: #fff; font-size: 0.62rem; }
        .pz .pz-chip-l { left: 0; top: 3%; }
        .pz .pz-chip-r { right: 0; top: 3%; }

        .pz .pz-sealed { position: absolute; z-index: 4; left: 50%; top: calc(50% + 21cqw); translate: -50% 0; display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.4rem 0.85rem; border-radius: 999px; white-space: nowrap; background: #350C0E; color: #fff; font-size: 0.74rem; font-weight: 600;
          box-shadow: 0 0 0 4px rgba(255,253,248,0.9), 0 14px 30px -12px rgba(53,12,14,0.8); }

        .pz .pz-badge { position: absolute; z-index: 4; left: 0; bottom: 1%; display: flex; align-items: center; gap: 0.7rem; padding: 0.6rem 0.95rem 0.6rem 0.6rem;
          border-radius: 18px; background: #fff; box-shadow: 0 0 0 1px rgba(53,12,14,0.06), 0 24px 50px -24px rgba(53,12,14,0.55); }
        .pz .pz-badge-icon { display: grid; place-items: center; width: 2.4rem; height: 2.4rem; border-radius: 12px; background: linear-gradient(135deg, #EEF2FF, #C4D2FF); color: #2F6BFF; }
        .pz .pz-badge-icon svg { animation: pz-turn 14s linear infinite; }
        .pz .pz-badge strong { display: block; font-size: 0.82rem; font-weight: 600; line-height: 1.25; }
        .pz .pz-badge-sub { display: block; font-size: 0.72rem; color: rgba(53,12,14,0.62); }

        @media (prefers-reduced-motion: no-preference) {
          .pz [data-pz-eyebrow], .pz [data-pz-word], .pz [data-pz-copy] > *, .pz [data-pz-cta] > *, .pz [data-pz-dots], .pz [data-pz-halo],
          .pz [data-pz-logo], .pz [data-pz-chip-l], .pz [data-pz-chip-r], .pz [data-pz-badge], .pz [data-pz-sealed], .pz [data-pz-spark] { visibility: hidden; }
          .pz [data-pz-photo] { clip-path: circle(0% at 50% 50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pz .pz-halo, .pz .pz-badge-icon svg { animation: none; }
          .pz .pz-ping { display: none; }
          .pz [data-pz-spark] { display: none; }
        }

        @media (max-width: 639px) {
          .pz .pz-stage { margin-bottom: 2.5rem; }
          .pz .pz-logo { width: 19cqw; height: 11cqw; }
          .pz .pz-ring-inner .pz-logo { width: 16cqw; height: 9.5cqw; }
          .pz .pz-ring-outer .pz-slot { --r: 41.5cqw; }
          .pz .pz-badge { left: 50%; translate: -50% 0; bottom: -2.75rem; white-space: nowrap; }
        }
        @media (min-width: 640px) {
          .pz .pz-wrap { padding: 10rem 2rem 6rem; }
          .pz .pz-chip { font-size: 0.84rem; padding: 0.45rem 1rem 0.45rem 0.45rem; }
          .pz .pz-chip b { width: 1.7rem; height: 1.7rem; font-size: 0.7rem; }
          .pz .pz-sealed { font-size: 0.82rem; }
          .pz .pz-copy { font-size: 1.05rem; }
        }
        @media (min-width: 1024px) {
          .pz .pz-wrap { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(3rem, 5vw, 5.5rem); padding: 10rem var(--page-gutter) 6.5rem; }
          .pz .pz-title { font-size: clamp(3rem, 4.4vw, 4.2rem); }
          .pz .pz-stage { width: min(100%, 37rem, calc(100svh - 7rem)); min-width: 25rem; margin-right: 0; }
        }
        @media (min-width: 1024px) and (max-height: 760px) {
          .pz .pz-wrap { padding-top: 8.75rem; padding-bottom: 4.5rem; }
          .pz .pz-title { font-size: clamp(2.8rem, 4vw, 3.6rem); }
          .pz .pz-copy { margin-top: 1.1rem; gap: 0.75rem; font-size: 0.97rem; line-height: 1.62; }
          .pz .pz-actions { margin-top: 1.4rem; }
        }
      `}</style>

      <div className="pz-wrap">
        {/* Text */}
        <div>
          <span data-pz-eyebrow className="pz-eyebrow">
            <span className="pz-dots3" aria-hidden>
              <i style={{ background: "#F7931E" }} />
              <i style={{ background: "#2F6BFF" }} />
              <i style={{ background: "#3BAA35" }} />
            </span>
            Recruitment partners
          </span>

          <h2 className="pz-title">
            <span className="pz-mask">
              <span data-pz-word className="inline-block origin-bottom-left">
                Grow alongside
              </span>
            </span>
            <span className="pz-mask">
              <span data-pz-word className="pz-accent-wrap origin-bottom-left">
                <span className={`${accentSerif.className} pz-accent`}>top-tier universities</span>
                <svg className="pz-underline" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden>
                  <path data-pz-underline d="M3 14 C 70 5, 150 4, 297 10" fill="none" stroke="#F7931E" strokeWidth="3.5" strokeLinecap="round" opacity="0.55" />
                </svg>
              </span>
            </span>
          </h2>

          <div data-pz-copy className="pz-copy">
            <p>
              Admission OnBoard connects your business with internationally recognised universities, so you can reach
              more students and help them succeed. With reliable partnerships and a smooth application process, your
              students get a genuine chance at leading institutions around the world.
            </p>
            <p>
              Whether you run a recruitment agency or an education consultancy, we give you the support and resources
              you need to grow. Join a global network built on trust, growth and real opportunity.
            </p>
          </div>

          <div data-pz-cta className="pz-actions">
            <Link href="/auth/register?tab=partner" className="pz-btn">
              Partner with us
              <span className="pz-btn-arrow" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
            <ul className="pz-tags">
              <li>
                <i style={{ background: "#F7931E" }} aria-hidden />
                Recruitment agencies
              </li>
              <li>
                <i style={{ background: "#3BAA35" }} aria-hidden />
                Education consultancies
              </li>
            </ul>
          </div>
        </div>

        {/* Network: the handshake at the centre, partner universities in orbit */}
        <div data-pz-stage className="pz-stage">
          <div data-pz-depth="10" className="pz-layer" aria-hidden>
            <span data-pz-dots className="pz-dotring" />
            <svg className="pz-svg" viewBox="0 0 100 100">
              <circle data-pz-track cx="50" cy="50" r="43" fill="none" stroke="rgba(53,12,14,0.16)" strokeWidth="0.3" transform="rotate(-90 50 50)" />
              <circle data-pz-track cx="50" cy="50" r="34.5" fill="none" stroke="rgba(53,12,14,0.16)" strokeWidth="0.3" transform="rotate(90 50 50)" />
            </svg>
            <span className="pz-ping" />
            <span className="pz-ping" />
            <span className="pz-ping" />
          </div>

          {/* The line from the agency to us runs behind the photo */}
          <div data-pz-depth="16" className="pz-layer" aria-hidden>
            <svg className="pz-svg" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="pz-link-grad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#F7931E" />
                  <stop offset="100%" stopColor="#2F6BFF" />
                </linearGradient>
              </defs>
              <path data-pz-link d="M16 8 C 22 40, 40 52, 50 52 S 78 40, 84 8" fill="none" stroke="url(#pz-link-grad)" strokeWidth="0.6" strokeLinecap="round" strokeDasharray="0" />
              <circle data-pz-spark r="1.4" fill="#fff" stroke="#F7931E" strokeWidth="0.8" />
            </svg>
          </div>

          <div data-pz-depth="6" className="pz-layer">
            <span data-pz-halo className="pz-halo" aria-hidden />
            <div data-pz-photo className="pz-photo">
              <Image src="/partner-handshake.png" alt="Two partners shaking hands" fill priority sizes="(max-width: 1023px) 60vw, 330px" />
            </div>
          </div>

          <div data-pz-depth="22" className="pz-layer pointer-events-none">
            <Orbit unis={INNER} ring="inner" offset={45} />
          </div>
          <div data-pz-depth="30" className="pz-layer pointer-events-none">
            <Orbit unis={OUTER} ring="outer" offset={0} />
          </div>

          <div data-pz-depth="38" className="pz-layer pointer-events-none">
            <span data-pz-chip-l className="pz-chip pz-chip-l">
              <b style={{ background: "#F7931E" }} aria-hidden>
                01
              </b>
              Your agency
            </span>
            <span data-pz-chip-r className="pz-chip pz-chip-r">
              <b style={{ background: "#2F6BFF" }} aria-hidden>
                02
              </b>
              Admission OnBoard
            </span>
            <span data-pz-sealed className="pz-sealed">
              <span aria-hidden>🤝</span>
              Partners
            </span>
            <div data-pz-badge className="pz-badge">
              <span className="pz-badge-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <circle cx="12" cy="12" r="8.5" />
                  <path strokeLinecap="round" d="M3.5 12h17M12 3.5c2.5 2.6 3.5 5.4 3.5 8.5s-1 5.9-3.5 8.5c-2.5-2.6-3.5-5.4-3.5-8.5s1-5.9 3.5-8.5Z" />
                </svg>
              </span>
              <span>
                <strong>Global university network</strong>
                <span className="pz-badge-sub">Across 10 study destinations</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
