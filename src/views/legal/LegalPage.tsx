"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

export type LegalSection = { id: string; title: string };

const LEGAL_PAGES = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/cookies", label: "Cookie Policy" },
];

type Props = {
  /** The page's path, to mark it in the switcher */
  current: string;
  /** "Privacy" + "Policy": the second part is set in the accent face */
  title: string;
  accent: string;
  updated: string;
  summary: string;
  sections: LegalSection[];
  /** The policy text: numbered blocks with an id per section */
  children: ReactNode;
};

/** Shared layout for the Privacy, Terms and Cookies pages */
export default function LegalPage({
  current,
  title,
  accent,
  updated,
  summary,
  sections,
  children,
}: Props) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(sections[0]?.id);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    /* The section you are reading is the one crossing the upper third of the screen */
    const spies = sections.map((s) => {
      const target = el.querySelector<HTMLElement>(`#${CSS.escape(s.id)}`);
      return target
        ? ScrollTrigger.create({
            trigger: target,
            start: "top 35%",
            end: "bottom 35%",
            onToggle: (self) => self.isActive && setActive(s.id),
          })
        : null;
    });

    /* Reading progress */
    const progress = ScrollTrigger.create({
      trigger: q("[data-lp-body]")[0],
      start: "top 35%",
      end: "bottom 65%",
      onUpdate: (self) =>
        gsap.set(q("[data-lp-bar]"), { scaleX: self.progress }),
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" }, delay: 0.1 })
        .fromTo(
          q("[data-lp-eyebrow]"),
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.9 },
          0,
        )
        .fromTo(
          q("[data-lp-word]"),
          { autoAlpha: 0, yPercent: 115, rotate: 5 },
          {
            autoAlpha: 1,
            yPercent: 0,
            rotate: 0,
            duration: 1.2,
            stagger: 0.12,
          },
          0.1,
        )
        .fromTo(
          q("[data-lp-meta] > *"),
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.07 },
          0.45,
        )
        .fromTo(
          q("[data-lp-side]"),
          { autoAlpha: 0, x: -24 },
          { autoAlpha: 1, x: 0, duration: 1 },
          0.6,
        );

      ScrollTrigger.batch(q("[data-lp-body] > *"), {
        start: "top 92%",
        once: true,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.07,
              ease: "expo.out",
            },
          ),
      });
    });

    return () => {
      spies.forEach((s) => s?.kill());
      progress.kill();
      mm.revert();
    };
  }, [sections]);

  /* The section being read gets an accent border in the text as well */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    sections.forEach((s) => el.querySelector(`#${CSS.escape(s.id)}`)?.classList.toggle("is-on", s.id === active));
  }, [active, sections]);

  const activeIndex = Math.max(
    0,
    sections.findIndex((s) => s.id === active),
  );

  return (
    <section ref={root} className="lp relative w-full">
      <style>{`
        .lp { color: #350C0E; margin-top: -7rem;
          background:
            radial-gradient(40% 30% at 92% 4%, rgba(47,107,255,0.08), transparent 70%),
            radial-gradient(40% 28% at 4% 6%, rgba(247,147,30,0.14), transparent 70%),
            linear-gradient(180deg, #FFEFDD 0, #FFF6EC 22rem, #FFFEFA 40rem); }
        .lp .lp-wrap { max-width: var(--page-max); margin: 0 auto; padding: 9.5rem 1.5rem 5rem; }

        /* Header */
        .lp .lp-head { display: grid; gap: 1.5rem; }
        .lp .lp-eyebrow { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0.95rem 0.45rem 0.55rem; border-radius: 999px;
          background: rgba(255,255,255,0.85); border: 1px solid rgba(53,12,14,0.08); font-size: 0.8rem; font-weight: 600; letter-spacing: 0.02em; }
        .lp .lp-eyebrow span { display: grid; place-items: center; width: 1.4rem; height: 1.4rem; border-radius: 999px; background: #350C0E; color: #fff; }
        .lp .lp-title { margin-top: 1.2rem; font-size: clamp(2.6rem, 11vw, 4rem); line-height: 1.02; letter-spacing: -0.045em; font-weight: 600; }
        .lp .lp-mask { display: inline-block; overflow: hidden; padding: 0.04em 0.08em 0.16em 0; margin: -0.04em 0 -0.16em; vertical-align: bottom; }
        .lp .lp-accent { color: #F7931E; font-weight: 400; font-style: italic; letter-spacing: -0.02em; font-size: 1.12em; line-height: 0.95; }
        .lp .lp-meta { display: grid; gap: 1rem; align-content: end; }
        .lp .lp-summary { max-width: 34rem; font-size: 1rem; line-height: 1.7; color: rgba(53,12,14,0.72); }
        .lp .lp-facts { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .lp .lp-fact { display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.4rem 0.8rem; border-radius: 999px; background: #fff;
          border: 1px solid rgba(53,12,14,0.08); font-size: 0.8rem; font-weight: 600; color: rgba(53,12,14,0.75); }
        .lp .lp-fact i { width: 0.45rem; height: 0.45rem; border-radius: 999px; background: #3BAA35; }
        .lp .lp-switch { display: flex; flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; gap: 0.4rem; padding: 0.3rem; border-radius: 999px; background: #F8F0E8; width: fit-content; max-width: 100%; }
        .lp .lp-switch a { flex: none; white-space: nowrap; padding: 0.55rem 1rem; border-radius: 999px; font-size: 0.82rem; font-weight: 600; color: rgba(53,12,14,0.6); transition: background .3s ease, color .3s ease; }
        .lp .lp-switch a:hover { color: #350C0E; }
        .lp .lp-switch a[aria-current="page"] { background: #350C0E; color: #fff; }

        /* Layout */
        .lp .lp-grid { margin-top: 3rem; display: grid; grid-template-columns: minmax(0, 1fr); gap: 2rem; align-items: start; }
        .lp .lp-side { display: none; }

        /* Table of contents */
        .lp .lp-toc { position: sticky; top: 7rem; padding: 1.25rem; border-radius: 22px; background: #fff; border: 1px solid rgba(53,12,14,0.08); }
        .lp .lp-toc-head { display: flex; align-items: baseline; justify-content: space-between; gap: 0.5rem; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(53,12,14,0.5); }
        .lp .lp-toc-head b { font-size: 0.85rem; letter-spacing: 0; color: #F7931E; }
        .lp .lp-track { margin-top: 0.8rem; height: 3px; border-radius: 3px; background: rgba(53,12,14,0.08); overflow: hidden; }
        .lp .lp-track i { display: block; height: 100%; background: linear-gradient(90deg, #F7931E, #2F6BFF); transform: scaleX(0); transform-origin: 0 50%; }
        .lp .lp-toc ol { margin-top: 0.9rem; display: grid; gap: 0.15rem; }
        .lp .lp-toc a { display: flex; align-items: flex-start; gap: 0.65rem; padding: 0.5rem 0.6rem; border-radius: 12px; font-size: 0.86rem; line-height: 1.35;
          color: rgba(53,12,14,0.6); transition: background .25s ease, color .25s ease; }
        .lp .lp-toc a:hover { color: #350C0E; background: #FFF8F0; }
        .lp .lp-toc a span { flex: none; min-width: 1.4rem; font-size: 0.72rem; font-weight: 700; color: rgba(53,12,14,0.35); padding-top: 0.1rem; }
        .lp .lp-toc a.is-on { color: #350C0E; font-weight: 600; background: #FFF3E6; }
        .lp .lp-toc a.is-on span { color: #F7931E; }

        /* Policy text: the original markup, restyled */
        .lp .lp-body { display: grid; gap: 1.25rem; font-size: 0.98rem; line-height: 1.75; color: rgba(53,12,14,0.78); }
        .lp .lp-body > p:first-child { padding: 1.4rem 1.5rem; border-radius: 22px; background: linear-gradient(135deg, #FFF3E6, #FFE9D3); font-size: 1.05rem; color: #350C0E; }
        .lp .lp-body > div[id] { scroll-margin-top: 7rem; padding: 1.5rem; border-radius: 22px; background: #fff; border: 1px solid rgba(53,12,14,0.07);
          transition: border-color .4s ease, box-shadow .4s ease; }
        .lp .lp-body > div[id].is-on { border-color: rgba(247,147,30,0.45); box-shadow: 0 18px 36px -30px rgba(53,12,14,0.5); }
        .lp .lp-body h2 { font-size: 1.35rem; line-height: 1.25; letter-spacing: -0.02em; font-weight: 600; color: #350C0E; }
        .lp .lp-body h3 { color: #350C0E; }
        .lp .lp-body p, .lp .lp-body li { color: rgba(53,12,14,0.78); }
        .lp .lp-body ul { padding-left: 0; }
        .lp .lp-body ul > li { position: relative; list-style: none; padding-left: 1.6rem; }
        .lp .lp-body ul > li::before { content: ""; position: absolute; left: 0.2rem; top: 0.55em; width: 0.7rem; height: 0.7rem; border-radius: 999px;
          background: #FFE2C2; box-shadow: inset 0 0 0 3px #F7931E; }
        .lp .lp-body a { color: #350C0E; font-weight: 600; text-decoration: underline; text-decoration-color: rgba(247,147,30,0.6); text-underline-offset: 3px; }
        .lp .lp-body a:hover { color: #F7931E; }
        /* Inner cards (e.g. cookie types) and the contact block */
        .lp .lp-body > div[id] .rounded-2xl { border-color: rgba(53,12,14,0.08); background: #FFFBF6; }
        .lp .lp-body > div#contact-us { background: #350C0E; border-color: #350C0E; color: rgba(255,255,255,0.8); }
        .lp .lp-body > div#contact-us h2, .lp .lp-body > div#contact-us p, .lp .lp-body > div#contact-us .font-semibold { color: #fff; }
        .lp .lp-body > div#contact-us p:not(.font-semibold) { color: rgba(255,255,255,0.78); }
        .lp .lp-body > div#contact-us a { color: #FFB561; text-decoration-color: rgba(255,181,97,0.5); }

        @media (prefers-reduced-motion: no-preference) {
          .lp [data-lp-eyebrow], .lp [data-lp-word], .lp [data-lp-meta] > *, .lp [data-lp-side] { visibility: hidden; }
        }

        @media (min-width: 640px) {
          .lp .lp-wrap { padding: 10rem 2rem 6rem; }
          .lp .lp-body > div[id] { padding: 2rem 2.25rem; }
          .lp .lp-body h2 { font-size: 1.6rem; }
        }
        @media (min-width: 1024px) {
          .lp .lp-wrap { padding: 10rem var(--page-gutter) 7rem; }
          .lp .lp-head { grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); align-items: end; gap: 3rem; }
          .lp .lp-title { font-size: clamp(3.2rem, 5vw, 4.8rem); }
          .lp .lp-grid { margin-top: 4rem; grid-template-columns: 18rem minmax(0, 1fr); gap: clamp(2rem, 4vw, 4rem); }
          .lp .lp-side { display: block; align-self: stretch; }
          .lp .lp-body { max-width: 52rem; }
        }
        @media (min-width: 1024px) and (max-height: 760px) {
          .lp .lp-wrap { padding-top: 8.25rem; }
          .lp .lp-toc { top: 6.5rem; padding: 1rem; }
          .lp .lp-toc a { padding: 0.35rem 0.5rem; font-size: 0.8rem; }
        }
      `}</style>

      <div className="lp-wrap">
        <div className="lp-head">
          <div>
            <span data-lp-eyebrow className="lp-eyebrow">
              <span aria-hidden>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" />
                </svg>
              </span>
              Legal
            </span>
            <h1 className="lp-title">
              <span className="lp-mask">
                <span data-lp-word className="inline-block origin-bottom-left">
                  {title}
                </span>
              </span>{" "}
              <span className="lp-mask">
                <span
                  data-lp-word
                  className={`${accentSerif.className} lp-accent inline-block origin-bottom-left`}
                >
                  {accent}
                </span>
              </span>
            </h1>
          </div>

          <div data-lp-meta className="lp-meta">
            <p className="lp-summary">{summary}</p>
            <div className="lp-facts">
              <span className="lp-fact">
                <i aria-hidden />
                Last updated: {updated}
              </span>
              <span className="lp-fact">{sections.length} sections</span>
            </div>
            <nav className="lp-switch" aria-label="Legal pages">
              {LEGAL_PAGES.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  aria-current={p.href === current ? "page" : undefined}
                >
                  {p.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="lp-grid">
          <aside data-lp-side className="lp-side">
            <nav className="lp-toc" aria-label="On this page">
              <p className="lp-toc-head">
                On this page
                <b>
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(sections.length).padStart(2, "0")}
                </b>
              </p>
              <div className="lp-track" aria-hidden>
                <i data-lp-bar />
              </div>
              <ol>
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={s.id === active ? "is-on" : undefined}
                      aria-current={s.id === active ? "true" : undefined}
                    >
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div data-lp-body className="lp-body">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
