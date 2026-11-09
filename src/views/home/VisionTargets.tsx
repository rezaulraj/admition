"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import GradCap from "@/components/common/GradCap";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

/* ---------- Card illustrations (white line-art so they sit nicely on any gradient) ---------- */

function StudentArt() {
  return (
    <div data-art className="absolute bottom-0 left-3 w-[64%]">
      <Image
        src="/herotransparent.png"
        alt=""
        width={1207}
        height={1303}
        sizes="(min-width: 1024px) 14vw, 45vw"
        className="h-auto w-full drop-shadow-[0_18px_24px_rgba(0,0,0,0.25)]"
      />
    </div>
  );
}

function GlobeArt() {
  return (
    <svg data-art viewBox="0 0 200 200" className="absolute -bottom-12 -right-10 w-[82%]" aria-hidden>
      <circle cx="100" cy="100" r="82" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" />
      {/* Latitudes */}
      {[40, 70, 100, 130, 160].map((y) => {
        const dx = Math.sqrt(82 * 82 - (y - 100) ** 2);
        return (
          <line key={y} x1={100 - dx} y1={y} x2={100 + dx} y2={y} stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        );
      })}
      {/* Spinning meridians */}
      <g data-spin>
        {[82, 55, 26].map((rx) => (
          <ellipse key={rx} data-meridian cx="100" cy="100" rx={rx} ry="82" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />
        ))}
      </g>
      {/* Route arcs between markets */}
      <path data-route d="M58 70 Q100 30 142 78" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="4 5" strokeLinecap="round" />
      <path data-route d="M70 130 Q110 100 150 124" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="4 5" strokeLinecap="round" />
      {[
        [58, 70],
        [142, 78],
        [70, 130],
        [150, 124],
        [104, 104],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle data-pulse cx={cx} cy={cy} r="9" fill="rgba(255,255,255,0.35)" />
          <circle cx={cx} cy={cy} r="4" fill="#fff" />
        </g>
      ))}
    </svg>
  );
}

function NetworkArt() {
  const nodes = [
    [40, 46],
    [160, 40],
    [28, 128],
    [172, 122],
    [100, 162],
  ];
  return (
    <svg data-art viewBox="0 0 200 180" className="absolute inset-x-5 bottom-3 h-[56%] w-[calc(100%-2.5rem)]" aria-hidden>
      {nodes.map(([x, y]) => (
        <line key={`l-${x}`} data-link x1="100" y1="92" x2={x} y2={y} stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeDasharray="3 4" />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={`n-${x}`} data-node>
          <circle cx={x} cy={y} r="15" fill="rgba(255,255,255,0.22)" />
          <circle cx={x} cy={y} r="10" fill="#fff" />
          <circle cx={x} cy={y - 2.5} r="3.2" fill={i % 2 ? "#F7931E" : "#14213D"} />
          <path d={`M${x - 5.5} ${y + 6} a5.5 4.5 0 0 1 11 0`} fill={i % 2 ? "#F7931E" : "#14213D"} />
        </g>
      ))}
      {/* Hub */}
      <circle data-pulse cx="100" cy="92" r="30" fill="rgba(255,255,255,0.25)" />
      <circle cx="100" cy="92" r="21" fill="#fff" />
      <path d="M100 79 88 85v2h24v-2l-12-6Zm-9 10v7h-2v3h22v-3h-2v-7h-3v7h-3v-7h-2v7h-3v-7h-2v7h-3v-7h-2Z" fill="#F2711C" />
    </svg>
  );
}

function CapArt() {
  return (
    <>
      <span data-pulse aria-hidden className="absolute bottom-8 right-10 size-28 rounded-full bg-white/25 blur-xl" />
      <div data-art className="absolute bottom-10 right-3 w-[74%] -rotate-[10deg]">
        <div data-float>
          <GradCap className="drop-shadow-[0_20px_22px_rgba(0,0,0,0.3)]" />
        </div>
      </div>
    </>
  );
}

type Target = {
  count: number;
  suffix: string;
  label: string;
  gradient: string;
  glow: string;
  art: ReactNode;
  /** Experience is an achievement, not a target – so no "Vision Target" badge. */
  hideBadge?: boolean;
};

const targets: Target[] = [
  {
    count: 1000,
    suffix: "+",
    label: "Universities & Colleges",
    gradient: "linear-gradient(150deg,#6E86FF 0%,#4361EE 55%,#2F46D6 100%)",
    glow: "rgba(67,97,238,0.55)",
    art: <StudentArt />,
  },
  {
    count: 50,
    suffix: "+",
    label: "Source Markets",
    gradient: "linear-gradient(150deg,#6FD07A 0%,#3BAA35 55%,#23853F 100%)",
    glow: "rgba(59,170,53,0.5)",
    art: <GlobeArt />,
  },
  {
    count: 10000,
    suffix: "+",
    label: "Global Partners",
    gradient: "linear-gradient(150deg,#FFB25E 0%,#F7931E 50%,#EE6A1A 100%)",
    glow: "rgba(247,147,30,0.55)",
    art: <NetworkArt />,
  },
  {
    count: 10,
    suffix: "+",
    label: "Years Experience",
    gradient: "linear-gradient(150deg,#B88AF5 0%,#8B5CF0 55%,#6A3BD1 100%)",
    glow: "rgba(139,92,240,0.5)",
    hideBadge: true,
    art: <CapArt />,
  },
];

export default function VisionTargets() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      /* Heading */
      gsap
        .timeline({ defaults: { ease: "expo.out", duration: 1.1 }, scrollTrigger: { trigger: el, start: "top 75%", once: true } })
        .fromTo(
          q("[data-word]"),
          { autoAlpha: 0, yPercent: 110, filter: "blur(6px)" },
          { autoAlpha: 1, yPercent: 0, filter: "blur(0px)", stagger: 0.05 },
        )
        .fromTo(q("[data-squiggle]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1, ease: "power2.inOut" }, 0.5);

      /* Cards: rise through a rounded curtain, one after another */
      const cards = q("[data-card]");
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: { trigger: q("[data-grid]")[0], start: "top 80%", once: true },
      });
      tl.fromTo(
        cards,
        { autoAlpha: 0, y: 90, rotateX: -18, scale: 0.92, clipPath: "inset(40% 0% 0% 0% round 28px)" },
        { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.4, stagger: 0.14 },
      );

      cards.forEach((card, i) => {
        const at = 0.35 + i * 0.14;
        const c = gsap.utils.selector(card);

        // Count up
        const num = c("[data-count]")[0] as HTMLElement;
        const end = Number(num.dataset.count);
        const counter = { v: 0 };
        num.textContent = "0";
        tl.to(counter, {
          v: end,
          duration: 1.8,
          ease: "power3.out",
          onUpdate: () => (num.textContent = Math.round(counter.v).toLocaleString("en-US")),
        }, at);

        tl.fromTo(c("[data-text]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, at)
          .fromTo(c("[data-art]"), { autoAlpha: 0, y: 60, scale: 0.85 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.3 }, at + 0.15);
      });

      // Card-specific details
      tl.fromTo(q("[data-route]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.2, ease: "power2.inOut" }, 0.9)
        .fromTo(q("[data-link]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.8, stagger: 0.08, ease: "power2.out" }, 1)
        .fromTo(q("[data-node]"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.7, stagger: 0.08, ease: "back.out(2.4)" }, 1.1);

      /* Ambient life */
      gsap.to(q("[data-pulse]"), {
        scale: 1.35,
        opacity: 0.35,
        duration: 1.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.3, from: "random" },
        transformOrigin: "50% 50%",
      });
      gsap.to(q("[data-meridian]"), { scaleX: -1, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1, svgOrigin: "100 100" });
      gsap.to(q("[data-float]"), { y: -12, rotate: 4, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1 });

      /* Gentle scroll parallax, alternating cards */
      cards.forEach((card, i) =>
        gsap.fromTo(
          gsap.utils.selector(card)("[data-art]"),
          { yPercent: i % 2 ? 8 : 4 },
          {
            yPercent: i % 2 ? -6 : -3,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1.5 },
          },
        ),
      );
    });

    /* 3D hover tilt + moving glare (mouse/trackpad only) */
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const cleanups = (q("[data-tilt]") as HTMLElement[]).map((card) => {
        const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
        const glare = card.querySelector<HTMLElement>("[data-glare]");
        gsap.set(card, { transformPerspective: 900 });

        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          ry((px - 0.5) * 12);
          rx((0.5 - py) * 10);
          if (glare) gsap.to(glare, { autoAlpha: 1, x: (px - 0.5) * r.width, y: (py - 0.5) * r.height, duration: 0.4 });
        };
        const leave = () => {
          rx(0);
          ry(0);
          if (glare) gsap.to(glare, { autoAlpha: 0, duration: 0.5 });
        };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        return () => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        };
      });
      return () => cleanups.forEach((fn) => fn());
    });

    return () => mm.revert();
  }, []);

  const heading = ["Your", "Global", "Education", "Journey,"];

  return (
    <section ref={root} className="vision w-full bg-[#FFFEFA] px-6 py-16 sm:py-24">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .vision [data-word], .vision [data-card] { visibility: hidden; }
        }
      `}</style>

      <div className="container mx-auto">
        <h2 className="font-display mx-auto max-w-3xl text-center text-[2rem] font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[2.75rem]"
          style={{ color: "#350C0E" }}>
          {heading.map((w) => (
            <span key={w} className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-top">
              <span data-word className="inline-block">
                {w}
              </span>
            </span>
          ))}
          <br />
          <span className="relative inline-block overflow-visible">
            <span className="inline-block overflow-hidden pb-[0.08em] align-top">
              <span data-word className="inline-block text-[#F7931E]">
                Made Simple.
              </span>
            </span>
            <svg
              aria-hidden
              viewBox="0 0 220 20"
              preserveAspectRatio="none"
              className="absolute -bottom-[0.28em] left-[-2%] h-[0.32em] w-[104%] overflow-visible">
              <path
                data-squiggle
                d="M3 12 C 30 4, 45 18, 72 9 S 115 4, 135 12 S 180 16, 217 6"
                fill="none"
                stroke="#F7931E"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>

        <div
          data-grid
          className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 [perspective:1200px] sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {targets.map((t) => (
            <div key={t.label} data-card className="will-change-transform">
              <div
                data-tilt
                className="group relative h-[20rem] overflow-hidden rounded-[1.75rem] text-white transition-shadow duration-500 [transform-style:preserve-3d]"
                style={{ background: t.gradient, boxShadow: `0 24px 50px -24px ${t.glow}` }}>
                {/* Soft light + fine texture */}
                <span aria-hidden className="absolute -right-16 -top-16 size-48 rounded-full bg-white/25 blur-2xl" />
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(180deg,transparent,black_60%)]"
                />
                <span
                  aria-hidden
                  data-glare
                  className="pointer-events-none invisible absolute left-1/2 top-1/2 -ml-32 -mt-32 size-64 rounded-full bg-white/30 blur-3xl"
                />

                <div className="relative z-10 p-6">
                  <p data-text className="font-display text-5xl font-semibold leading-none tracking-[-0.03em]">
                    <span data-count={t.count} className="tabular-nums">
                      {t.count.toLocaleString("en-US")}
                    </span>
                    {t.suffix}
                  </p>
                  <p data-text className="mt-2 text-base font-medium text-white/90">
                    {t.label}
                  </p>
                  {!t.hideBadge && (
                    <span
                      data-text
                      className="mt-3 inline-block rounded-full border border-white/40 bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md">
                      Vision Target
                    </span>
                  )}
                </div>

                {t.art}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
