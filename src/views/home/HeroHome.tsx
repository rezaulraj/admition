"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import GradCap from "@/components/common/GradCap";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

/* Brand palette pulled from the Admission OnBoard logo */
const INK = "#14213D";
const ORANGE = "#F7931E";

/* Steps: `scatter` is where each label floats (fraction of the stage) before scroll gathers them into the list */
const STEPS = [
  { label: "Find the right universities", scatter: [0.68, 0.22] },
  { label: "Prepare for exams", scatter: [0.07, 0.8] },
  { label: "Unlock scholarships", scatter: [0.15, 0.91] },
  { label: "Plan your finances", scatter: [0.73, 0.5] },
  { label: "Get visa ready", scatter: [0.66, 0.86] },
] as const;

const HEADLINE = [["Your", "Dream", "University"], ["Is", "Closer"]];

export default function HeroHome() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);

    // Browsers restore the old scroll position on reload, which would open the scene mid-way (already in list view)
    ScrollTrigger.clearScrollMemory("manual");
    window.scrollTo(0, 0);
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        motionOK: "(prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const { isDesktop, motionOK } = ctx.conditions as {
          isDesktop: boolean;
          motionOK: boolean;
        };
        if (!motionOK) return; // reduced motion: markup already shows the final, static layout

        /* ---------- Intro (on load) ---------- */
        const intro = gsap.timeline({
          defaults: { ease: "expo.out", duration: 1.2 },
        });
        intro
          .fromTo(
            q("[data-line]"),
            { drawSVG: "0%" },
            {
              drawSVG: "100%",
              duration: 2.4,
              ease: "power2.inOut",
              stagger: 0.15,
            },
            0.1,
          )
          .fromTo(
            q("[data-word]"),
            { autoAlpha: 0, yPercent: 115, rotate: 6 },
            { autoAlpha: 1, yPercent: 0, rotate: 0, stagger: 0.07 },
            0.25,
          )
          .fromTo(
            q("[data-plan]"),
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0 },
            0.6,
          )
          .fromTo(
            q("[data-card]"),
            { autoAlpha: 0, scale: 0.86, y: 60 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 1.6, stagger: 0.08 },
            0.2,
          )
          .fromTo(
            q("[data-student]"),
            { autoAlpha: 0, y: 80 },
            { autoAlpha: 1, y: 0, duration: 1.6 },
            0.35,
          )
          .fromTo(
            q("[data-pill]"),
            { autoAlpha: 0, scale: 0.6, y: 20 },
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              stagger: 0.09,
              ease: "back.out(1.8)",
              duration: 0.9,
            },
            0.9,
          )
          .fromTo(q("[data-hint]"), { autoAlpha: 0 }, { autoAlpha: 1 }, 1.6);

        if (!isDesktop) {
          // Mobile: no long scroll scene, just play the story once
          intro
            .fromTo(
              q("[data-cap]"),
              { autoAlpha: 0, y: -260, rotate: -30 },
              {
                autoAlpha: 1,
                y: 0,
                rotate: 0,
                duration: 1.4,
                ease: "bounce.out",
              },
              1.2,
            )
            .fromTo(
              q("[data-plan-fill]"),
              { clipPath: "inset(0 100% 0 0)" },
              {
                clipPath: "inset(0 0% 0 0)",
                duration: 1.2,
                ease: "power3.inOut",
              },
              1.7,
            )
            .fromTo(
              q("[data-underline]"),
              { drawSVG: "0%" },
              { drawSVG: "100%", duration: 0.8, ease: "power2.out" },
              2.5,
            )
            .fromTo(
              q("[data-rail-fill]"),
              { scaleY: 0 },
              { scaleY: 1, duration: 1.6, ease: "power1.inOut" },
              1.6,
            )
            .to(
              q("[data-dot]"),
              { backgroundColor: ORANGE, duration: 0.3, stagger: 0.32 },
              1.6,
            )
            .fromTo(
              q("[data-copy]"),
              { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, duration: 0.9 },
              2.2,
            )
            .fromTo(
              q("[data-cta]"),
              { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.9 },
              2.4,
            );
          return;
        }

        /* ---------- Desktop scroll story ---------- */
        const stage = q("[data-stage]")[0] as HTMLElement;
        const list = q("[data-list]")[0] as HTMLElement;
        const steps = q("[data-step]") as HTMLElement[];
        const floats = q("[data-float]").map((f, i) =>
          gsap.to(f, {
            y: i % 2 ? 9 : -9,
            x: i % 2 ? -5 : 5,
            duration: 2.4 + i * 0.35,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          }),
        );
        let floating = true;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate(self) {
              // Labels stop bobbing once they line up as a list
              const shouldFloat = self.progress < 0.22;
              if (shouldFloat === floating) return;
              floating = shouldFloat;
              floats.forEach((t) => (shouldFloat ? t.resume() : t.pause()));
              if (!shouldFloat)
                gsap.to(q("[data-float]"), {
                  x: 0,
                  y: 0,
                  duration: 0.5,
                  ease: "power2.out",
                });
            },
          },
        });

        tl
          // Student + glass grow slowly through the whole scroll
          .to(
            q("[data-visual]"),
            { scale: 1.14, duration: 1, ease: "power1.inOut" },
            0,
          )
          .to(
            q("[data-student-inner]"),
            { scale: 1.05, duration: 1, ease: "power1.inOut" },
            0,
          )
          // Outer glow rings melt away smoothly as you scroll
          .to(
            q("[data-halo]"),
            { scale: 1.25, autoAlpha: 0, duration: 0.4, ease: "power2.out" },
            0.02,
          )
          .to(
            q("[data-ring]"),
            { scale: 1.45, autoAlpha: 0, duration: 0.34, ease: "power2.out" },
            0,
          )
          .to(
            q("[data-arch-bg]"),
            { autoAlpha: 0, scale: 1.08, duration: 0.42, ease: "power2.inOut" },
            0.08,
          )
          .to(q("[data-hint]"), { autoAlpha: 0, duration: 0.06 }, 0)
          // Graduation cap drops from the top onto the student's head
          .fromTo(
            q("[data-cap]"),
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.04 },
            0.03,
          )
          .fromTo(
            q("[data-cap]"),
            {
              y: () => -window.innerHeight * 0.9,
              x: -160,
              rotate: -42,
              scale: 1.25,
            },
            {
              y: 0,
              x: 0,
              rotate: 0,
              scale: 1,
              duration: 0.32,
              ease: "power3.out",
            },
            0.03,
          )
          // Soft landing: tiny squash + wobble
          .to(
            q("[data-cap]"),
            {
              keyframes: {
                scaleY: [1, 0.9, 1.04, 1],
                scaleX: [1, 1.08, 0.98, 1],
                rotate: [0, 5, -3, 0],
              },
              duration: 0.1,
              ease: "sine.inOut",
            },
            0.35,
          )
          .fromTo(
            q("[data-spark]"),
            { autoAlpha: 0, scale: 0.2 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.06,
              stagger: 0.01,
              ease: "back.out(3)",
            },
            0.3,
          )
          .to(q("[data-spark]"), { autoAlpha: 0, duration: 0.08 }, 0.48)
          // "Than You Think." fills in
          .fromTo(
            q("[data-plan-fill]"),
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 0.28,
              ease: "power2.inOut",
            },
            0.26,
          )
          .fromTo(
            q("[data-underline]"),
            { drawSVG: "0%" },
            { drawSVG: "100%", duration: 0.12 },
            0.52,
          )
          // Floating labels gather into a timeline list.
          // One tween per label (not a single staggered tween), so every label starts in its scattered spot.
          .add(
            steps.map((step, i) =>
              gsap.fromTo(
                step,
                {
                  x: () =>
                    STEPS[i].scatter[0] * stage.clientWidth -
                    (list.offsetLeft + step.offsetLeft),
                  y: () =>
                    STEPS[i].scatter[1] * stage.clientHeight -
                    (list.offsetTop + step.offsetTop),
                },
                {
                  x: 0,
                  y: 0,
                  duration: 0.34,
                  delay: i * 0.035,
                  ease: "power3.inOut",
                },
              ),
            ),
            0.2,
          )
          .fromTo(
            q("[data-panel]"),
            { autoAlpha: 0, scale: 0.92 },
            { autoAlpha: 1, scale: 1, duration: 0.16, ease: "power2.out" },
            0.44,
          )
          .to(
            q("[data-pill]"),
            {
              backgroundColor: "rgba(255,255,255,0)",
              borderColor: "rgba(255,255,255,0)",
              boxShadow: "0 0 0 rgba(0,0,0,0)",
              duration: 0.14,
            },
            0.46,
          )
          .fromTo(
            q("[data-rail]"),
            { scaleY: 0, autoAlpha: 0 },
            { scaleY: 1, autoAlpha: 1, duration: 0.14, ease: "power1.inOut" },
            0.5,
          )
          .fromTo(
            q("[data-dot]"),
            { autoAlpha: 0, scale: 0 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.06,
              stagger: 0.03,
              ease: "back.out(3)",
            },
            0.52,
          )
          // Orange progress runs down the rail; each step lights up as it is reached
          .fromTo(
            q("[data-rail-fill]"),
            { scaleY: 0, autoAlpha: 1 },
            { scaleY: 1, autoAlpha: 1, duration: 0.32, ease: "none" },
            0.62,
          )
          .to(
            q("[data-dot]"),
            {
              backgroundColor: ORANGE,
              boxShadow: "0 0 0 6px rgba(247,147,30,0.22)",
              duration: 0.04,
              stagger: 0.07,
            },
            0.62,
          )
          // Story finished: the paragraph rises in, then the button
          .fromTo(
            q("[data-copy]"),
            { autoAlpha: 0, y: 26, filter: "blur(6px)" },
            { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.14, ease: "power3.out" },
            0.7,
          )
          .fromTo(
            q("[data-cta]"),
            { autoAlpha: 0, y: 34 },
            { autoAlpha: 1, y: 0, duration: 0.12, ease: "power3.out" },
            0.8,
          )
          // Route + paper plane travel
          .fromTo(
            q("[data-route]"),
            { drawSVG: "0%" },
            { drawSVG: "100%", duration: 1 },
            0,
          )
          .to(
            q("[data-plane]"),
            {
              motionPath: {
                path: "#hero-route",
                align: "#hero-route",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
              },
              duration: 1,
            },
            0,
          );

        if (document.fonts?.ready)
          document.fonts.ready.then(() => ScrollTrigger.refresh());
      },
    );

    return () => {
      mm.revert();
      history.scrollRestoration = "auto"; // other pages keep normal reload behaviour
    };
  }, []);

  return (
    // Pulled up under the sticky header (80px mobile / 96px desktop) so the navbar floats over the scene
    <section
      ref={root}
      className="hero relative -mt-20 w-full bg-[#F3F6FF] lg:-mt-24"
    >
      <style>{`
        /* Short pinned distance: the whole hero story plays in about one scroll */
        @media (min-width: 1024px) { .hero { height: 165vh; } }
        @media (prefers-reduced-motion: no-preference) {
          .hero [data-intro] { visibility: hidden; }
        }
        @media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
          .hero [data-panel], .hero [data-rail], .hero [data-rail-fill], .hero [data-dot] { visibility: hidden; }
        }
        .hero .plan-ghost { -webkit-text-stroke: 1.5px rgba(53,12,14,0.22); color: transparent; }
        /* Desktop: heading block sits a little in from the edge, clear of the navbar */
        @media (min-width: 1024px) { .hero [data-copy-block] { left: 9.5vw; top: 21vh; max-width: 30vw; } }

      `}</style>

      <div
        data-stage
        className="relative flex flex-col overflow-clip lg:sticky lg:top-0 lg:block lg:h-svh"
      >
        {/* ---------- Background: clean soft gradient ---------- */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#E3EAFF_0%,#F1F4FF_40%,#FFFEFA_100%)]"
        />

        {/* ---------- Flowing route lines + paper plane ---------- */}
        <svg
          aria-hidden
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <path
            data-line
            d="M-60 770 C 240 900, 470 760, 640 560 S 930 300, 1120 330 S 1390 250, 1520 290"
            fill="none"
            stroke={ORANGE}
            strokeOpacity="0.22"
            strokeWidth="34"
            strokeLinecap="round"
          />
          <path
            id="hero-route"
            data-route
            d="M-60 770 C 240 900, 470 760, 640 560 S 930 300, 1120 330 S 1390 250, 1520 290"
            fill="none"
            stroke={ORANGE}
            strokeWidth="4"
            strokeLinecap="round"
            className="hidden lg:block"
          />
          <g data-plane className="hidden lg:block">
            <path d="M-16 -12 L18 0 L-16 12 L-9 0 Z" fill={INK} />
            <path d="M-9 0 L18 0" stroke="#fff" strokeWidth="1.5" />
          </g>
        </svg>

        {/* ---------- Copy ---------- */}
        <div
          data-copy-block
          className="relative z-30 px-4 pt-28 sm:px-8 lg:absolute lg:px-0 lg:pt-0"
        >
          <h1 className="font-display font-semibold tracking-[-0.035em]" style={{ color: "#350C0E" }}>
            <span className="block leading-[1.04]" style={{ fontSize: "clamp(2.1rem, 3.5vw, 4rem)" }}>
              {HEADLINE.map((line, li) => (
                <span key={li} className="block">
                  {line.map((word) => (
                    <span
                      key={word}
                      className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-top last:mr-0"
                    >
                      <span
                        data-word
                        data-intro
                        className="relative inline-block origin-bottom-left"
                      >
                        {word === "Closer" ? (
                          <span className="text-[#F7931E]">Closer</span>
                        ) : (
                          word
                        )}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </span>

            {/* Outlined ghost text that fills in on scroll */}
            <span
              data-plan
              data-intro
              className="relative mt-[0.06em] block leading-[1.04]"
              style={{ fontSize: "clamp(2.1rem, 3.5vw, 4rem)" }}
            >
              <span aria-hidden className="plan-ghost">
                Than You Think.
              </span>
              <span
                data-plan-fill
                className="absolute inset-0 bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(100deg, #350C0E 15%, #8A3414 65%, #F7931E 100%)" }}
              >
                Than You{" "}
                <span className="relative inline-block">
                  Think.
                  <svg
                    aria-hidden
                    viewBox="0 0 220 24"
                    preserveAspectRatio="none"
                    className="absolute -bottom-[0.12em] left-0 h-[0.2em] w-full overflow-visible"
                  >
                    <path
                      data-underline
                      d="M4 16 C 70 6, 150 6, 216 12"
                      fill="none"
                      stroke={ORANGE}
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
            </span>
          </h1>

          <p
            data-copy
            data-intro
            style={{ maxWidth: "26rem" }}
            className="mt-6 text-[1.05rem] leading-relaxed text-[#4A5268] lg:text-[clamp(1rem,1.15vw,1.2rem)]"
          >
            Find the right university, get expert guidance, and turn your global
            education goals into reality.
          </p>

          {/* Appears once the list has formed */}
          <div className="mt-8">
            <Link
              data-cta
              data-intro
              href="/auth/register"
              className="group relative inline-flex h-14 items-center gap-3 bg-[#350C0E] pl-7 pr-12 text-base font-semibold text-white transition-colors duration-300 [clip-path:polygon(0_0,calc(100%-22px)_0,100%_50%,calc(100%-22px)_100%,0_100%)] hover:bg-[#F7931E] focus:outline-none focus-visible:bg-[#F7931E]"
            >
              Register as a student
              <svg
                viewBox="0 0 24 24"
                className="size-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* ---------- Centre: student framed inside a frosted glass arch ---------- */}
        <div className="pointer-events-none relative z-10 mt-8 h-[25rem] sm:h-[30rem] lg:absolute lg:inset-0 lg:mt-0 lg:h-auto">
          <div className="absolute inset-x-0 bottom-0 flex justify-center">
            <div
              data-visual
              className="relative aspect-[4/5] h-[23rem] origin-bottom sm:h-[28rem] lg:h-[min(64vh,38vw)]"
            >
              {/* Halo rings */}
              <div
                data-halo
                className="absolute -inset-x-[5%] bottom-0 -top-[4%] origin-bottom"
              >
                <div
                  data-card
                  data-intro
                  className="size-full rounded-t-full border-2 border-white/90"
                />
              </div>
              <div
                data-ring
                className="absolute -inset-x-[10%] bottom-0 -top-[8%] origin-bottom"
              >
                <div
                  data-card
                  data-intro
                  className="size-full rounded-t-full border border-dashed border-[#F7931E]/35"
                />
              </div>

              {/* Glass arch background: wrapped so scroll can melt it away while the student stays */}
              <div data-arch-bg className="absolute inset-0 origin-bottom">
                <div
                  data-card
                  data-intro
                  className="absolute inset-0 overflow-hidden rounded-t-full rounded-b-[2.5rem] border border-white/80 bg-[linear-gradient(165deg,rgba(255,255,255,0.65),rgba(206,220,255,0.35)_45%,rgba(247,147,30,0.18))] shadow-[0_30px_60px_-35px_rgba(20,33,61,0.35),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_0_60px_rgba(255,255,255,0.45)] backdrop-blur-2xl"
                >
                  {/* Inner glow + soft rings */}
                  <div
                    data-glow
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_62%,rgba(247,147,30,0.38),transparent_55%)]"
                  />
                  <div className="absolute left-1/2 top-[30%] aspect-square w-[78%] -translate-x-1/2 rounded-full border border-white/60" />
                  <div className="absolute left-1/2 top-[18%] aspect-square w-[104%] -translate-x-1/2 rounded-full border border-white/35" />

                  {/* Bottom fade + moving light sheen */}
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white/55 to-transparent" />
                  <div className="absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-[heroSheen_7s_ease-in-out_infinite] motion-reduce:animate-none" />
                  <style>{`@keyframes heroSheen { 0%,55% { transform: translateX(0) skewX(-12deg); } 100% { transform: translateX(420%) skewX(-12deg); } }`}</style>
                </div>
              </div>

              {/* Student (not clipped, so it stays crisp when the glass fades) */}
              <div
                data-student
                data-intro
                className="absolute bottom-0 left-[8%] aspect-[1207/1303] w-[84%]"
              >
                <div
                  data-student-inner
                  className="relative size-full origin-bottom"
                >
                  <Image
                    src="/herotransparent.png"
                    alt="Smiling student with a backpack and laptop, ready to study abroad"
                    fill
                    priority
                    sizes="(min-width: 1024px) 32vw, 80vw"
                    className="object-contain object-bottom"
                  />
                </div>
              </div>

              {/* Cap layer mirrors the student box (unclipped) so the cap can fall in from above */}
              <div className="absolute bottom-0 left-[8%] aspect-[1207/1303] w-[84%]">
                <div
                  data-student-inner
                  className="relative size-full origin-bottom"
                >
                  <div className="absolute left-[34%] top-[-19%] w-[52%] rotate-[4deg]">
                    <div data-cap data-intro className="origin-bottom">
                      <GradCap className="drop-shadow-[0_14px_18px_rgba(20,33,61,0.35)]" />
                    </div>
                    {[
                      "left-[-14%] top-[30%] -rotate-[30deg]",
                      "left-[-18%] top-[62%] rotate-[0deg]",
                      "right-[-14%] top-[24%] rotate-[30deg]",
                    ].map((pos) => (
                      <span
                        key={pos}
                        data-spark
                        className={`invisible absolute h-1.5 w-6 rounded-full bg-[#F7931E] ${pos}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Steps: floating labels → glass timeline panel ---------- */}
        <div
          data-list
          className="relative z-20 mx-4 mb-12 mt-10 sm:mx-8 lg:absolute lg:right-[5.4vw] lg:top-[32vh] lg:m-0 lg:w-[18rem]"
        >
          <div className="relative">
            <div
              data-panel
              aria-hidden
              className="absolute -inset-x-5 -inset-y-4 rounded-[1.75rem] border border-white/80 bg-white/55 shadow-[0_30px_70px_-35px_rgba(20,33,61,0.55)] backdrop-blur-xl"
            />
            <ol className="relative">
              <span
                aria-hidden
                data-rail
                className="absolute bottom-6 left-[6px] top-6 w-0.5 origin-top rounded-full bg-[#14213D]/15"
              />
              <span
                aria-hidden
                data-rail-fill
                className="absolute bottom-6 left-[6px] top-6 w-0.5 origin-top rounded-full bg-gradient-to-b from-[#F7931E] to-[#F9B25C]"
              />
              {STEPS.map((s, i) => (
                <li key={s.label} data-step className="relative py-1 pl-8">
                  <span
                    data-dot
                    className="absolute left-0 top-[calc(50%-7px)] size-3.5 rounded-full bg-[#14213D] ring-[3px] ring-white"
                  />
                  <span data-float className="inline-block">
                    <span
                      data-pill
                      data-intro
                      className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/90 bg-white/75 py-2 pl-2 pr-4 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-[#350C0E] shadow-[0_12px_30px_-16px_rgba(20,33,61,0.5)] backdrop-blur-md"
                    >
                      <span className="grid size-6 place-items-center rounded-full bg-[#F7931E]/15 text-[0.68rem] font-bold text-[#F7931E]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.label}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

        </div>

        {/* Scroll hint */}
        <div
          data-hint
          data-intro
          aria-hidden
          className="absolute bottom-6 left-1/2 z-30 hidden -translate-x-1/2 lg:block"
        >
          <span className="flex h-9 w-6 justify-center rounded-full border-2 border-[#14213D]/40 pt-1.5">
            <span className="h-2 w-1 animate-bounce rounded-full bg-[#F7931E]" />
          </span>
        </div>
      </div>
    </section>
  );
}
