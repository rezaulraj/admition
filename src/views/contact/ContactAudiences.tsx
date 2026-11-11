"use client";

import { useLayoutEffect, useRef, type PointerEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

type ContactBlock = {
  audience: string;
  imageSrc: string;
  imageAlt: string;
  bg: string;
  glow: string;
  ring: string;
  details: { label: string; value: ReactNode }[];
  cta?: { label: string; href: string };
};

const blocks: ContactBlock[] = [
  {
    audience: "For Students",
    imageSrc: "/student.png",
    imageAlt: "Student ready to help with your application questions",
    bg: "linear-gradient(160deg, #FFE7D1 0%, #FFBE85 100%)",
    glow: "rgba(247,147,30,0.55)",
    ring: "#D9651A",
    details: [
      {
        label: "Email",
        value: (
          <a
            href="mailto:apply@admissiononboard.com"
          >
            apply@admissiononboard.com
          </a>
        ),
      },
      {
        label: "Applications",
        value: (
          <>
            Already have an application with us?{" "}
            <Link
              href="/auth/register"
            >
              Sign in to your account
            </Link>{" "}
            to view its status, then use &quot;Ask a question&quot; on the
            relevant application to reach the right person directly.
          </>
        ),
      },
      { label: "Monday to Friday", value: "9:00am – 6:00pm" },
    ],
  },
  {
    audience: "For University Partners",
    imageSrc: "/bothpartner.png",
    imageAlt: "Partnerships advisor available for university collaborations",
    bg: "linear-gradient(160deg, #EEF2FF 0%, #B4C7FF 100%)",
    glow: "rgba(47,107,255,0.42)",
    ring: "#2F6BFF",
    details: [
      {
        label: "Email",
        value: (
          <a
            href="mailto:aob@admissiononboard.com"
          >
            aob@admissiononboard.com
          </a>
        ),
      },
      { label: "Monday to Friday", value: "7:00am – 5:00pm Eastern Time (ET)" },
      { label: "Phone", value: "+44 7465 268767" },
    ],
    cta: { label: "Why Partner with Us", href: "/institution-partner" },
  },
  {
    audience: "For Education Agents",
    imageSrc: "/for-eduction.png",
    imageAlt: "Education agent relations team member",
    bg: "linear-gradient(160deg, #EBF8E7 0%, #AEE0A5 100%)",
    glow: "rgba(59,170,53,0.42)",
    ring: "#2E8F29",
    details: [
      {
        label: "Email",
        value: (
          <a
            href="mailto:agent@admissiononboard.com"
          >
            agent@admissiononboard.com
          </a>
        ),
      },
      { label: "Monday to Friday", value: "7:00am – 5:00pm Eastern Time (ET)" },
      {
        label: "Live chat",
        value: (
          <>
            Available once you{" "}
            <Link
              href="/auth/register"
            >
              sign in to your account
            </Link>
            .
          </>
        ),
      },
    ],
    cta: { label: "Why Partner with Us", href: "/recruitment-partner" },
  },
];

/** Soft light that follows the pointer across a card */
function trackPointer(e: PointerEvent<HTMLElement>) {
  const box = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`);
}

export default function ContactAudiences() {
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

        gsap
          .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: el, start: "top 78%", once: true } })
          .fromTo(q("[data-cau-eyebrow]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
          .fromTo(q("[data-cau-word]"), { autoAlpha: 0, yPercent: 115, rotate: 4 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.12 }, 0.08);

        const grid = q("[data-cau-grid]")[0];
        (q("[data-cau-card]") as HTMLElement[]).forEach((card, i) => {
          const c = gsap.utils.selector(card);
          const trigger = isDesktop ? grid : card;

          // Card rises and straightens; its contact rows follow one by one
          gsap
            .timeline({ defaults: { ease: "expo.out" }, delay: isDesktop ? i * 0.13 : 0, scrollTrigger: { trigger, start: "top 86%", once: true } })
            .fromTo(card, { autoAlpha: 0, y: 100, scale: 0.94, rotate: isDesktop ? (i - 1) * 2.5 : 0 }, { autoAlpha: 1, y: 0, scale: 1, rotate: 0, duration: 1.3, clearProps: "transform" }, 0)
            .fromTo(c("[data-cau-row]"), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.09 }, 0.4);

          // Scrolling lifts the person up from behind the panel while the circle opens around them
          const lift = { trigger, start: "top 92%", end: "top 38%", scrub: 0.8 };
          gsap.fromTo(c("[data-cau-person]"), { yPercent: 34 }, { yPercent: 0, ease: "power2.out", scrollTrigger: lift });
          gsap.fromTo(c("[data-cau-circle]"), { scale: 0.45 }, { scale: 1, ease: "power2.out", scrollTrigger: lift });

          gsap.to(c("[data-cau-spin]"), { rotation: i % 2 ? -360 : 360, transformOrigin: "50% 50%", duration: 26, ease: "none", repeat: -1 });
          gsap.to(c("[data-cau-orb]"), { xPercent: i % 2 ? -14 : 14, yPercent: -12, scale: 1.14, duration: 6 + i, ease: "sine.inOut", yoyo: true, repeat: -1 });
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="cau relative w-full">
      <style>{`
        .cau { overflow: clip; color: #350C0E; background: #FFFEFA; }
        .cau .cau-wrap { max-width: var(--page-max); margin: 0 auto; padding: 4.5rem 1.5rem 3rem; }
        .cau .cau-title { margin-top: 1.5rem; font-size: clamp(2.8rem, 12vw, 4rem); line-height: 1.02; letter-spacing: -0.04em; font-weight: 600; }
        .cau .cau-mask { display: inline-block; overflow: hidden; padding: 0 0.08em 0.14em 0; margin-bottom: -0.14em; vertical-align: top; }
        .cau .cau-accent { font-size: 1.16em; line-height: 0.9; letter-spacing: -0.02em; font-weight: 400; font-stretch: normal; color: #F7931E; }

        .cau .cau-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 4rem; max-width: 34rem; margin: 5.5rem auto 0; }
        .cau .cau-card { --mx: 50%; --my: 0%; position: relative; isolation: isolate; display: flex; flex-direction: column; padding: 0.75rem; transition: translate .5s cubic-bezier(.2,.8,.2,1); }
        .cau .cau-card:hover { translate: 0 -8px; }
        .cau .cau-bg { position: absolute; inset: 0; z-index: -1; overflow: hidden; border-radius: 2rem; transition: box-shadow .5s ease; }
        .cau .cau-card:hover .cau-bg { box-shadow: 0 36px 64px -34px rgba(53,12,14,0.6); }
        .cau .cau-bg::before { content: ""; position: absolute; inset: 0; z-index: 1; opacity: 0; background: radial-gradient(300px circle at var(--mx) var(--my), rgba(255,255,255,0.55), transparent 70%); transition: opacity .4s ease; }
        .cau .cau-card:hover .cau-bg::before { opacity: 1; }
        .cau .cau-bg::after { content: ""; position: absolute; inset: 0; opacity: 0.36; background-image: radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px); background-size: 15px 15px; -webkit-mask-image: linear-gradient(200deg, black, transparent 55%); mask-image: linear-gradient(200deg, black, transparent 55%); }
        .cau .cau-orb { position: absolute; left: -18%; top: -18%; width: 70%; aspect-ratio: 1; border-radius: 50%; filter: blur(52px); }

        .cau .cau-visual { position: relative; height: 16rem; }
        .cau .cau-circle { position: absolute; left: 50%; bottom: -5.5rem; width: min(21rem, 92%); aspect-ratio: 1; margin-left: calc(min(21rem, 92%) / -2); border-radius: 50%; background: rgba(255,255,255,0.46); }
        .cau .cau-spin { position: absolute; inset: -5%; width: 110%; height: 110%; overflow: visible; }
        .cau .cau-person { position: absolute; left: 0; right: 0; top: -3rem; bottom: 0; transform-origin: 50% 100%; }
        .cau .cau-zoom { position: absolute; inset: 0; transform-origin: 50% 100%; transition: scale .7s cubic-bezier(.2,.8,.2,1); }
        .cau .cau-card:hover .cau-zoom { scale: 1.05; }

        .cau .cau-panel { position: relative; z-index: 1; flex: 1; display: flex; flex-direction: column; padding: 1.6rem 1.5rem 1.5rem; border-radius: 1.5rem; background: #fff; box-shadow: 0 -18px 34px -26px rgba(53,12,14,0.5); }
        .cau .cau-name { font-size: 1.75rem; line-height: 1.08; letter-spacing: -0.03em; font-weight: 600; }
        .cau .cau-rows { display: flex; flex-direction: column; margin-top: 1rem; }
        .cau .cau-row { padding: 0.8rem 0; border-top: 1px solid rgba(53,12,14,0.1); }
        .cau .cau-row dt { font-size: 0.75rem; font-weight: 600; color: rgba(53,12,14,0.58); }
        .cau .cau-row dd { margin-top: 0.15rem; font-size: 0.9375rem; line-height: 1.5; color: rgba(53,12,14,0.8); overflow-wrap: anywhere; }
        .cau .cau-row.is-email dd { font-size: 1.0625rem; font-weight: 600; color: #350C0E; }
        .cau .cau-row a { color: #350C0E; font-weight: 600; text-decoration: underline; text-decoration-color: rgba(247,147,30,0.75); text-decoration-thickness: 2px; text-underline-offset: 3px; transition: color .25s ease; }
        .cau .cau-row a:hover { color: #D9651A; }

        .cau .cau-btn { align-self: flex-start; margin-top: auto; display: inline-flex; align-items: center; gap: 0.75rem; height: 3rem; padding: 0 0.4rem 0 1.4rem; border-radius: 9999px; font-size: 0.9375rem; font-weight: 600; color: #fff; background: #350C0E; transition: background-color .3s ease; }
        .cau .cau-btn:hover, .cau .cau-btn:focus-visible { background: #F7931E; }
        .cau .cau-btn-i { display: grid; place-items: center; width: 2.25rem; height: 2.25rem; border-radius: 50%; color: #350C0E; background: #fff; transition: rotate .3s ease; }
        .cau .cau-btn:hover .cau-btn-i { rotate: 90deg; }
        .cau .cau-gap { margin-top: 1rem; }

        @media (min-width: 1024px) {
          .cau .cau-wrap { padding: 6rem var(--page-gutter) 4rem; }
          .cau .cau-title { font-size: clamp(3.4rem, 5.5vw, 5.9rem); }
          .cau .cau-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; max-width: none; margin-top: 7rem; }
          .cau .cau-panel { padding: 1.75rem; }
          .cau .cau-name { font-size: clamp(1.6rem, 2.15vw, 2.1rem); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .cau [data-cau-eyebrow], .cau [data-cau-word], .cau [data-cau-card], .cau [data-cau-row] { visibility: hidden; }
        }
        @media (prefers-reduced-motion: reduce) { .cau .cau-card, .cau .cau-zoom, .cau .cau-bg { transition: none; } }
      `}</style>

      <div className="cau-wrap">
        <p data-cau-eyebrow className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
          <span className="h-3.5 w-5 bg-[#F7931E] [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
          Get in touch
        </p>
        <h2 className="cau-title font-display">
          <span className="cau-mask">
            <span data-cau-word className="inline-block origin-bottom-left">
              Reach The
            </span>
          </span>{" "}
          <span className="cau-mask">
            <span data-cau-word className={`${accentSerif.className} cau-accent inline-block origin-bottom-left`}>
              Right Team
            </span>
          </span>
        </h2>

        <div data-cau-grid className="cau-grid">
          {blocks.map((block) => (
            <article key={block.audience} data-cau-card onPointerMove={trackPointer} className="cau-card">
              <div aria-hidden className="cau-bg" style={{ background: block.bg }}>
                <span data-cau-orb className="cau-orb" style={{ background: block.glow }} />
              </div>

              <div className="cau-visual">
                <div aria-hidden data-cau-circle className="cau-circle">
                  <svg data-cau-spin className="cau-spin" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="49" stroke={block.ring} strokeOpacity="0.55" strokeWidth="0.5" strokeDasharray="1 3" strokeLinecap="round" />
                  </svg>
                </div>
                <div data-cau-person className="cau-person">
                  <div className="cau-zoom">
                    <Image src={block.imageSrc} alt={block.imageAlt} fill quality={90} sizes="(min-width: 1024px) 30vw, 34rem" className="object-contain object-bottom" />
                  </div>
                </div>
              </div>

              <div className="cau-panel">
                <h3 className="cau-name font-display">{block.audience}</h3>
                <dl className="cau-rows">
                  {block.details.map((detail) => (
                    <div key={detail.label} data-cau-row className={`cau-row${detail.label === "Email" ? " is-email" : ""}`}>
                      <dt>{detail.label}</dt>
                      <dd>{detail.value}</dd>
                    </div>
                  ))}
                </dl>

                {block.cta && (
                  <>
                    <span aria-hidden className="cau-gap" />
                    <Link href={block.cta.href} className="cau-btn focus:outline-none">
                      {block.cta.label}
                      <span className="cau-btn-i">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden style={{ width: "1rem", height: "1rem" }}>
                          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </Link>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
