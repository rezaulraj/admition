"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

type Row = {
  title: string;
  description: string;
  image: string;
  icon: ReactNode;
};

const rows: Row[] = [
  {
    title: "End-to-End Admission Guidance",
    description:
      "We support students at every stage, from their very first question to the day they enrol. Our dedicated team manages follow-ups and paperwork, keeping the whole process smooth and stress-free.",
    image: "/admission-support.png",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Zm3 1.5v4.5c0 1.4 2.7 3 6 3s6-1.6 6-3V11" />,
  },
  {
    title: "Prime Branding Exposure",
    description:
      "Get your institution in front of the right audience through international fairs, seminars, and targeted campaigns. Gain visibility across our social channels and connect with prospective students on a global scale.",
    image: "/branding.png",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10v4a1 1 0 0 0 1 1h2l5 4V5L7 9H5a1 1 0 0 0-1 1Zm12-1.5a4 4 0 0 1 0 7M18.5 6a7.5 7.5 0 0 1 0 12" />
    ),
  },
  {
    title: "Complete Visa & Compliance Support",
    description:
      "We handle end-to-end support for student visa applications and documentation. Students get expert guidance on regulatory requirements, while your team's workload stays light and fully compliant.",
    image: "/visa-support.png",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4" />,
  },
];

const TONES = [
  { accent: "#2F6BFF", soft: "linear-gradient(135deg, #EEF2FF, #C4D2FF)" },
  { accent: "#F7931E", soft: "linear-gradient(135deg, #FFEBD9, #FFCFA3)" },
  { accent: "#3BAA35", soft: "linear-gradient(135deg, #EBF8E7, #BCE6B4)" },
];

/* Large screens with enough height get the sideways gallery */
const GALLERY = "(min-width: 1024px) and (min-height: 540px) and (prefers-reduced-motion: no-preference)";
const STACKED_MOTION =
  "(prefers-reduced-motion: no-preference) and (max-width: 1023px), (prefers-reduced-motion: no-preference) and (max-height: 539px)";

export default function WhyPartnerWithUs() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: el, start: "top 80%", once: true } })
        .fromTo(q("[data-wp-eyebrow]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
        .fromTo(q("[data-wp-word]"), { autoAlpha: 0, yPercent: 115, rotate: 5 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.12 }, 0.08)
        .fromTo(q("[data-wp-sub] > *"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.35);
    });

    /* Desktop: the section holds still while the panels glide sideways */
    mm.add(GALLERY, () => {
      const stage = q("[data-wp-stage]")[0] as HTMLElement;
      const viewport = q("[data-wp-viewport]")[0] as HTMLElement;
      const track = q("[data-wp-track]")[0] as HTMLElement;
      const n = rows.length;
      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            pin: true,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight * 0.35}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              setActive(Math.min(n - 1, Math.round(self.progress * (n - 1))));
              gsap.set(q("[data-wp-bar]"), { scaleX: self.progress });
            },
          },
        })
        .to({}, { duration: 0.12 })
        .to(track, { x: () => -distance(), duration: 1 })
        .fromTo(q("[data-wp-pan]"), { xPercent: -7 }, { xPercent: 7, duration: 1 }, "<")
        .to({}, { duration: 0.12 });

      /* The panels arrive from the right */
      gsap.fromTo(
        q("[data-wp-panel]"),
        { autoAlpha: 0, x: 160, rotate: 2 },
        { autoAlpha: 1, x: 0, rotate: 0, duration: 1.3, stagger: 0.12, ease: "expo.out", scrollTrigger: { trigger: stage, start: "top 70%", once: true } },
      );
    });

    /* Phones, tablets and short screens: panels stack and reveal one by one */
    mm.add(STACKED_MOTION, () => {
      q("[data-wp-panel]").forEach((panel, i) => {
        const s = gsap.utils.selector(panel);
        gsap
          .timeline({
            defaults: { ease: "expo.out" },
            scrollTrigger: { trigger: panel, start: "top 85%", once: true, onEnter: () => setActive(i) },
          })
          .fromTo(s("[data-wp-frame]"), { clipPath: "inset(12% 12% 12% 12% round 40px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.4, ease: "power3.inOut" }, 0)
          .fromTo(s("[data-wp-pan]"), { scale: 1.3 }, { scale: 1, duration: 1.8 }, 0)
          .fromTo(s("[data-wp-card]"), { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1.1 }, 0.45);
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="wp relative w-full">
      <style>{`
        .wp { overflow: clip; color: #350C0E;
          background: radial-gradient(40% 50% at 12% 20%, rgba(47,107,255,0.07), transparent 70%), radial-gradient(40% 50% at 92% 80%, rgba(247,147,30,0.09), transparent 70%), #FFFEFA; }
        .wp .wp-stage { position: relative; }
        .wp .wp-wrap { max-width: var(--page-max); margin: 0 auto; padding: 4.5rem 1.5rem 5rem; }

        .wp .wp-head { display: grid; gap: 1.25rem; }
        .wp .wp-eyebrow { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0.95rem 0.45rem 0.55rem; border-radius: 999px;
          background: #fff; box-shadow: 0 0 0 1px rgba(53,12,14,0.08), 0 10px 26px -16px rgba(53,12,14,0.4); font-size: 0.8rem; font-weight: 600; letter-spacing: 0.02em; }
        .wp .wp-eyebrow i { width: 0.55rem; height: 0.55rem; border-radius: 999px; background: #F7931E; box-shadow: 0 0 0 4px rgba(247,147,30,0.18); }
        .wp .wp-title { margin-top: 1.2rem; font-size: clamp(2.3rem, 10vw, 3.4rem); line-height: 1.02; letter-spacing: -0.045em; font-weight: 600; }
        .wp .wp-mask { display: block; overflow: hidden; padding: 0.04em 0.1em 0.16em 0; margin: -0.04em 0 -0.16em; }
        .wp .wp-accent { color: #F7931E; font-weight: 400; font-style: italic; letter-spacing: -0.02em; font-size: 1.1em; line-height: 0.95; }
        .wp .wp-sub p { max-width: 26rem; font-size: 1rem; line-height: 1.65; color: rgba(53,12,14,0.72); }
        .wp .wp-progress { display: none; }

        /* Panels (stacked by default) */
        .wp .wp-viewport { margin-top: 2.75rem; }
        .wp .wp-track { display: grid; gap: 2.75rem; }
        .wp .wp-panel { position: relative; }
        .wp .wp-frame { position: relative; aspect-ratio: 4 / 3.1; border-radius: 28px; overflow: hidden; isolation: isolate; background: #F3E3D3;
          box-shadow: 0 34px 70px -40px rgba(53,12,14,0.6), 0 0 0 1px rgba(53,12,14,0.05); }
        .wp .wp-pan { position: absolute; inset: 0 -8%; }
        .wp .wp-pan img { object-fit: cover; }
        .wp .wp-shade { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, transparent 55%, rgba(53,12,14,0.35) 100%); }
        .wp .wp-num { position: absolute; z-index: 2; right: 1rem; top: 0.75rem; font-size: 4.5rem; font-weight: 700; line-height: 1; letter-spacing: -0.05em;
          color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,0.85); pointer-events: none; text-shadow: 0 8px 30px rgba(53,12,14,0.25); }

        .wp .wp-card { position: relative; z-index: 3; margin: -3rem 0.75rem 0; padding: 1.4rem 1.35rem 1.5rem; border-radius: 24px; overflow: hidden;
          background: rgba(255,255,255,0.95); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 0 0 1px rgba(53,12,14,0.06), 0 30px 60px -32px rgba(53,12,14,0.55); }
        .wp .wp-card::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--accent); }
        .wp .wp-card-top { display: flex; align-items: center; gap: 0.75rem; }
        .wp .wp-icon { display: grid; place-items: center; width: 2.9rem; height: 2.9rem; border-radius: 14px; background: var(--soft); color: var(--accent); flex: none; }
        .wp .wp-step { font-size: 0.74rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(53,12,14,0.55); }
        .wp .wp-card h3 { margin-top: 1rem; font-size: 1.4rem; line-height: 1.15; letter-spacing: -0.03em; font-weight: 600; }
        .wp .wp-card p { margin-top: 0.6rem; font-size: 0.95rem; line-height: 1.65; color: rgba(53,12,14,0.74); }

        @media (prefers-reduced-motion: no-preference) {
          .wp [data-wp-eyebrow], .wp [data-wp-word], .wp [data-wp-sub] > * { visibility: hidden; }
        }
        @media ${STACKED_MOTION} {
          .wp [data-wp-card] { visibility: hidden; }
        }

        @media (min-width: 640px) {
          .wp .wp-wrap { padding: 5.5rem 2rem 6rem; }
          .wp .wp-card { margin: -5rem 2rem 0 auto; max-width: 30rem; padding: 1.75rem 1.75rem 1.85rem; }
          .wp .wp-num { font-size: 6rem; right: 1.5rem; top: 1rem; }
        }
        @media (min-width: 1024px) {
          .wp .wp-wrap { padding: 6rem var(--page-gutter) 6.5rem; }
          .wp .wp-head { grid-template-columns: minmax(0, 1fr) auto; align-items: end; gap: 3rem; }
          .wp .wp-title { font-size: clamp(3rem, 4.4vw, 4.3rem); }
          .wp .wp-sub { display: grid; justify-items: end; gap: 1.25rem; text-align: right; }
          .wp .wp-panel:nth-child(even) .wp-card { margin: -5rem auto 0 2rem; }
        }

        /* Sideways gallery */
        @media ${GALLERY} {
          .wp .wp-stage { height: 100svh; }
          .wp .wp-wrap { height: 100%; display: flex; flex-direction: column; padding: 6.75rem var(--page-gutter) 2rem; }
          .wp .wp-progress { display: flex; align-items: center; gap: 1rem; font-weight: 600; }
          .wp .wp-progress b { font-size: 2.2rem; line-height: 1; letter-spacing: -0.04em; color: #F7931E; }
          .wp .wp-progress span { font-size: 0.95rem; color: rgba(53,12,14,0.5); }
          .wp .wp-progress-track { position: relative; width: 8rem; height: 3px; border-radius: 3px; background: rgba(53,12,14,0.1); overflow: hidden; }
          .wp .wp-progress-track i { position: absolute; inset: 0; background: linear-gradient(90deg, #F7931E, #2F6BFF, #3BAA35); transform-origin: 0 50%; transform: scaleX(0); }

          .wp .wp-viewport { flex: 1; min-height: 0; margin-top: 2rem; }
          .wp .wp-track { display: flex; gap: 2rem; height: 100%; width: max-content; }
          .wp .wp-panel { width: min(84rem, calc(100vw - 2 * var(--page-gutter) - 12rem)); height: 100%; visibility: hidden;
            transition: opacity .6s ease, filter .6s ease; }
          .wp .wp-panel:not(.is-on) { opacity: 0.55; filter: saturate(0.7); }
          .wp .wp-frame { height: 100%; aspect-ratio: auto; transition: transform .7s cubic-bezier(.22,1,.36,1); }
          .wp .wp-panel:not(.is-on) .wp-frame { transform: scale(0.95); }
          .wp .wp-shade { background: linear-gradient(90deg, rgba(53,12,14,0.5) 0%, rgba(53,12,14,0.15) 38%, transparent 60%), linear-gradient(180deg, transparent 60%, rgba(53,12,14,0.3) 100%); }
          .wp .wp-num { right: 2rem; top: auto; bottom: 1rem; font-size: clamp(5rem, 10vw, 8rem); }
          .wp .wp-card, .wp .wp-panel:nth-child(even) .wp-card { position: absolute; left: 2rem; bottom: 2rem; margin: 0; width: min(28rem, 46%); max-width: none; }
        }
        @media ${GALLERY} and (max-height: 760px) {
          .wp .wp-wrap { padding-top: 6.25rem; padding-bottom: 1rem; }
          .wp .wp-eyebrow { display: none; }
          .wp .wp-title { margin-top: 0; font-size: clamp(2.4rem, 3.4vw, 3.2rem); }
          .wp .wp-sub p { font-size: 0.92rem; }
          .wp .wp-viewport { margin-top: 1.1rem; }
          .wp .wp-card, .wp .wp-panel:nth-child(even) .wp-card { left: 1.25rem; bottom: 1.25rem; padding: 1.15rem 1.35rem 1.25rem; width: min(30rem, 52%); }
          .wp .wp-card h3 { margin-top: 0.6rem; font-size: 1.2rem; }
          .wp .wp-card p { font-size: 0.86rem; line-height: 1.5; }
          .wp .wp-icon { width: 2.4rem; height: 2.4rem; }
        }
      `}</style>

      <div data-wp-stage className="wp-stage">
        <div className="wp-wrap">
          <div className="wp-head">
            <div>
              <span data-wp-eyebrow className="wp-eyebrow">
                <i aria-hidden />
                Why us
              </span>
              <h2 className="wp-title">
                <span className="wp-mask">
                  <span data-wp-word className="inline-block origin-bottom-left">
                    Why Partner with
                  </span>
                </span>
                <span className="wp-mask">
                  <span data-wp-word className={`${accentSerif.className} wp-accent inline-block origin-bottom-left`}>
                    Admission OnBoard?
                  </span>
                </span>
              </h2>
            </div>
            <div data-wp-sub className="wp-sub">
              <p>Streamline recruitment. Boost visibility. Attract qualified students, effortlessly.</p>
              <div className="wp-progress" aria-hidden>
                <b>{String(active + 1).padStart(2, "0")}</b>
                <span>/ {String(rows.length).padStart(2, "0")}</span>
                <span className="wp-progress-track">
                  <i data-wp-bar />
                </span>
              </div>
            </div>
          </div>

          <div data-wp-viewport className="wp-viewport">
            <div data-wp-track className="wp-track">
              {rows.map((row, i) => (
                <article
                  key={row.title}
                  data-wp-panel
                  className={`wp-panel${i === active ? " is-on" : ""}`}
                  style={{ "--accent": TONES[i].accent, "--soft": TONES[i].soft } as CSSProperties}
                >
                  <div data-wp-frame className="wp-frame">
                    <div data-wp-pan className="wp-pan">
                      <Image src={row.image} alt={row.title} fill sizes="(max-width: 1023px) 100vw, 70vw" />
                    </div>
                    <span className="wp-shade" aria-hidden />
                    <span className="wp-num" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div data-wp-card className="wp-card">
                    <div className="wp-card-top">
                      <span className="wp-icon" aria-hidden>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}>
                          {row.icon}
                        </svg>
                      </span>
                      <span className="wp-step">Reason {String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3>{row.title}</h3>
                    <p>{row.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
