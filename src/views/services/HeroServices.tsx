"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

/* The services offered further down the page, shown as a moving band under the hero */
const SERVICES: { title: string; color: string; icon: ReactNode }[] = [
  { title: "One-on-One Counselling", color: "#F7931E", icon: <path d="M4 5h16v10H9l-5 4V5Zm4 4h8M8 12h5" /> },
  { title: "Test Prep That Delivers", color: "#2F6BFF", icon: <path d="M5 4h11l3 3v13H5V4Zm4 6h6M9 14h6M9 18h3" /> },
  { title: "Scholarship Matching", color: "#3BAA35", icon: <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3Z" /> },
  { title: "Visa Filing, Handled", color: "#E5486F", icon: <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4" /> },
  { title: "Travel & Stay Planning", color: "#E08A00", icon: <path d="M3 14l18-7-4 13-5-4-3 3v-5l9-7" /> },
  { title: "We Stay In Touch After You Land", color: "#2F6BFF", icon: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /> },
];

/* Splits a phrase into words, each in its own mask so it can rise into place */
function Words({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="hs-mask">
          <span data-hs-word className={`inline-block origin-bottom-left ${className}`}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </>
  );
}

function Band({ reverse = false }: { reverse?: boolean }) {
  const items = reverse ? [...SERVICES].reverse() : SERVICES;
  return (
    <div data-hs-row className="hs-row" data-dir={reverse ? -1 : 1}>
      {/* Two identical halves so the loop is seamless */}
      {[0, 1].map((copy) => (
        <div key={copy} className="hs-half">
          {items.map((s) => (
            <span key={s.title} className="hs-pill" style={{ "--c": s.color } as CSSProperties}>
              <i>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  {s.icon}
                </svg>
              </i>
              {s.title}
              <b>✦</b>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function HeroServices() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" }, delay: 0.1 })
        .fromTo(q("[data-hs-eyebrow]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0)
        .fromTo(q("[data-hs-word]"), { autoAlpha: 0, yPercent: 115, rotate: 5 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.045 }, 0.1)
        /* Each key phrase gets marked up as if by hand */
        .fromTo(q("[data-hs-circle]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1, ease: "power2.inOut" }, 0.95)
        .fromTo(q("[data-hs-line]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.7, ease: "power2.inOut" }, 1.35)
        .fromTo(q("[data-hs-marker]"), { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.inOut" }, 1.6)
        .fromTo(q("[data-hs-copy]"), { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.75)
        .fromTo(q("[data-hs-cta] > *"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 }, 0.9)
        /* The picture opens out from the graduation cap at the centre of the illustration */
        .fromTo(q("[data-hs-art]"), { clipPath: "circle(0% at 22% 42%)" }, { clipPath: "circle(150% at 22% 42%)", duration: 2, ease: "power3.inOut" }, 0.3)
        .fromTo(q("[data-hs-art] img"), { scale: 1.18 }, { scale: 1, duration: 2.4 }, 0.3)
        .fromTo(q("[data-hs-band]"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.2 }, 1.2);

      /* The service band loops forever; rows run in opposite directions */
      const loops = q("[data-hs-row]").map((row) => {
        const dir = Number((row as HTMLElement).dataset.dir);
        return gsap.fromTo(row, { xPercent: dir > 0 ? 0 : -50 }, { xPercent: dir > 0 ? -50 : 0, duration: 38, ease: "none", repeat: -1 });
      });

      /* Scrolling makes the band rush, then it settles back */
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => loops.forEach((t) => (self.isActive ? t.play() : t.pause())),
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 160, 10);
          loops.forEach((t) => {
            t.timeScale(boost);
            gsap.to(t, { timeScale: 1, duration: 1.2, ease: "power2.out", overwrite: true });
          });
        },
      });

      /* Gentle depth as the hero scrolls away */
      gsap.to(q("[data-hs-art]"), { yPercent: -8, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.8 } });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="hs relative w-full">
      <style>{`
        .hs { overflow: clip; color: #350C0E; margin-top: -7rem; isolation: isolate;
          background:
            radial-gradient(45% 60% at 78% 40%, rgba(47,107,255,0.1), transparent 70%),
            radial-gradient(36% 46% at 4% 20%, rgba(247,147,30,0.14), transparent 70%),
            linear-gradient(180deg, #FFEFDD 0%, #FFF6EC 55%, #FFFEFA 100%); }
        .hs::after { content: ""; position: absolute; z-index: -1; left: 0; right: 0; bottom: 0; height: 6rem; pointer-events: none; background: linear-gradient(180deg, rgba(255,254,250,0), #FFFEFA); }
        .hs .hs-wrap { position: relative; max-width: var(--page-max); margin: 0 auto; padding: 9.5rem 1.5rem 2.5rem;
          display: grid; grid-template-columns: minmax(0, 1fr); gap: 2.5rem; align-items: center; }

        .hs .hs-eyebrow { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0.95rem 0.45rem 0.55rem; border-radius: 999px;
          background: rgba(255,255,255,0.85); box-shadow: 0 0 0 1px rgba(53,12,14,0.08), 0 10px 26px -16px rgba(53,12,14,0.4); font-size: 0.8rem; font-weight: 600; letter-spacing: 0.02em; }
        .hs .hs-eyebrow span { display: inline-flex; }
        .hs .hs-eyebrow span i { width: 0.7rem; height: 0.7rem; border-radius: 999px; border: 2px solid #fff; }
        .hs .hs-eyebrow span i + i { margin-left: -0.25rem; }
        .hs .hs-title { margin-top: 1.3rem; font-size: clamp(2.2rem, 9vw, 3.3rem); line-height: 1.08; letter-spacing: -0.04em; font-weight: 600; }
        .hs .hs-mask { display: inline-block; overflow: hidden; padding: 0.06em 0 0.16em; margin: -0.06em 0 -0.16em; vertical-align: bottom; }
        .hs .hs-mark { position: relative; display: inline; white-space: nowrap; }
        .hs .hs-accent { color: #F7931E; font-weight: 400; font-style: italic; letter-spacing: -0.02em; font-size: 1.1em; }
        .hs .hs-circle { position: absolute; left: -0.22em; right: -0.18em; top: -0.12em; bottom: -0.2em; width: calc(100% + 0.4em); height: calc(100% + 0.32em);
          overflow: visible; pointer-events: none; }
        .hs .hs-line { position: absolute; left: 0; right: 0; bottom: -0.1em; width: 100%; height: 0.28em; overflow: visible; pointer-events: none; }
        .hs .hs-marker { position: absolute; z-index: -1; left: -0.08em; right: -0.08em; bottom: 0.08em; height: 0.42em; border-radius: 0.2em;
          background: linear-gradient(90deg, rgba(59,170,53,0.32), rgba(59,170,53,0.18)); transform-origin: 0 50%; }
        .hs .hs-copy { margin-top: 1.5rem; max-width: 32rem; font-size: 1rem; line-height: 1.7; color: rgba(53,12,14,0.72); }
        .hs .hs-actions { margin-top: 2rem; display: flex; flex-wrap: wrap; align-items: center; gap: 1rem 1.5rem; }
        .hs .hs-btn { display: inline-flex; align-items: center; gap: 0.85rem; padding: 0.45rem 0.45rem 0.45rem 1.5rem; border-radius: 999px;
          background: #350C0E; color: #fff; font-size: 0.95rem; font-weight: 600; box-shadow: 0 16px 32px -16px rgba(53,12,14,0.7);
          transition: background .35s ease, transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease; }
        .hs .hs-btn:hover { background: #F7931E; transform: translateY(-2px); box-shadow: 0 18px 36px -16px rgba(247,147,30,0.85); }
        .hs .hs-btn:focus-visible { outline: 2px solid #F7931E; outline-offset: 3px; }
        .hs .hs-btn-arrow { display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border-radius: 999px; background: rgba(255,255,255,0.16);
          transition: transform .35s cubic-bezier(.22,1,.36,1); }
        .hs .hs-btn:hover .hs-btn-arrow { transform: rotate(-45deg); }
        /* Picture. It has a white background: multiply lets the page colour show through it.
           Nothing between it and the section may form its own layer (no transform/z-index), or the blend stops working. */
        .hs .hs-art-wrap { position: relative; width: min(100%, 42rem); margin: 0 auto; }
        .hs .hs-art { position: relative; aspect-ratio: 1286 / 834; overflow: hidden; mix-blend-mode: multiply; }
        /* Slightly wider than the frame to trim a faint grey line along the image's right edge */
        .hs .hs-art-inner { position: absolute; inset: 0 -0.6% 0 0; }
        .hs .hs-art img { object-fit: contain; }

        /* Moving band of services */
        .hs .hs-band { position: relative; z-index: 1; display: grid; gap: 0.75rem; padding: 0.5rem 0 4rem; transform: rotate(-1.5deg);
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
        .hs .hs-row { display: flex; width: max-content; will-change: transform; }
        .hs .hs-half { display: flex; gap: 0.75rem; padding-right: 0.75rem; }
        .hs .hs-pill { display: inline-flex; align-items: center; gap: 0.65rem; padding: 0.6rem 1.1rem 0.6rem 0.6rem; border-radius: 999px; white-space: nowrap;
          background: #fff; box-shadow: 0 0 0 1px rgba(53,12,14,0.07), 0 14px 30px -20px rgba(53,12,14,0.5); font-size: 0.95rem; font-weight: 600; }
        .hs .hs-pill i { display: grid; place-items: center; width: 2.1rem; height: 2.1rem; border-radius: 999px; color: #fff; background: var(--c); }
        .hs .hs-pill b { margin-left: 0.4rem; color: #F7931E; font-size: 0.85rem; }
        .hs .hs-row + .hs-row .hs-pill { background: #350C0E; color: #fff; box-shadow: 0 14px 30px -20px rgba(53,12,14,0.8); }

        @media (prefers-reduced-motion: no-preference) {
          .hs [data-hs-eyebrow], .hs [data-hs-word], .hs [data-hs-copy], .hs [data-hs-cta] > *, .hs [data-hs-band] { visibility: hidden; }
          .hs [data-hs-art] { clip-path: circle(0% at 22% 42%); }
          .hs [data-hs-marker] { transform: scaleX(0); }
        }

        @media (min-width: 640px) {
          .hs .hs-wrap { padding: 10rem 2rem 3rem; }
          .hs .hs-copy { font-size: 1.06rem; }
        }
        @media (min-width: 1024px) {
          .hs .hs-wrap { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(2.5rem, 4vw, 4.5rem); padding: 10rem var(--page-gutter) 3.5rem; }
          .hs .hs-title { font-size: clamp(2.7rem, 3.6vw, 3.9rem); }
          .hs .hs-art-wrap { width: min(100%, 44rem, calc((100svh - 13rem) * 1.54)); margin-right: 0; }
          .hs .hs-band { padding-bottom: 5rem; }
        }
        @media (min-width: 1024px) and (max-height: 760px) {
          .hs .hs-wrap { padding-top: 8.25rem; padding-bottom: 2rem; }
          .hs .hs-title { font-size: clamp(2.5rem, 3.4vw, 3.3rem); }
          .hs .hs-copy { margin-top: 1rem; }
          .hs .hs-actions { margin-top: 1.5rem; }
        }
      `}</style>

      <div className="hs-wrap">
        {/* Text */}
        <div>
          <span data-hs-eyebrow className="hs-eyebrow">
            <span aria-hidden>
              <i style={{ background: "#F7931E" }} />
              <i style={{ background: "#2F6BFF" }} />
              <i style={{ background: "#3BAA35" }} />
            </span>
            Our services
          </span>

          <h1 className="hs-title">
            <Words text="Discover" />{" "}
            <span className="hs-mark">
              <Words text="what we offer" className={`${accentSerif.className} hs-accent`} />
              <svg className="hs-circle" viewBox="0 0 300 80" preserveAspectRatio="none" aria-hidden>
                <path
                  data-hs-circle
                  d="M262 14C214 3 92 2 38 12 8 18 2 38 12 54c14 22 92 26 158 24 64-2 118-10 124-34 5-20-28-30-74-34"
                  fill="none"
                  stroke="#F7931E"
                  strokeWidth="3"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
            <Words text="," />{" "}
            <span className="hs-mark">
              <Words text="how it works," />
              <svg className="hs-line" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden>
                <path data-hs-line d="M3 12 C 50 4, 120 4, 197 10" fill="none" stroke="#2F6BFF" strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </svg>
            </span>{" "}
            <Words text="and how it changes" />{" "}
            <span className="hs-mark">
              <span data-hs-marker className="hs-marker" aria-hidden />
              <Words text="your journey" />
            </span>
          </h1>

          <p data-hs-copy className="hs-copy">
            From personalized counselling to visa support, we cover every part of your study abroad experience, start to
            finish.
          </p>

          <div data-hs-cta className="hs-actions">
            <Link href="/contact" className="hs-btn">
              Schedule A Free Consultation
              <span className="hs-btn-arrow" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Picture */}
        <div className="hs-art-wrap">
          <div data-hs-art className="hs-art">
            <div className="hs-art-inner">
              <Image src="/heroservice.png" alt="Study abroad consultant explaining services" fill sizes="(max-width: 1023px) 100vw, 50vw" priority />
            </div>
          </div>
        </div>
      </div>

      {/* The services, sliding past */}
      <div data-hs-band className="hs-band" aria-hidden>
        <Band />
        <Band reverse />
      </div>
    </section>
  );
}
