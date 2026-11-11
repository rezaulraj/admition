"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { blogs, type BlogCategory } from "@/lib/blogs";
import { accentSerif } from "@/lib/fonts";
import BlogCard, { BLOG_CARD_CSS } from "./BlogCard";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

type Filter = "All" | BlogCategory;

const categories: Filter[] = ["All", "Academic Writing", "Destinations", "Visas & Applications"];

/** Column span for each card after the featured one, so the last row is always full */
function spanFor(index: number, count: number) {
  if (count === 1) return 12;
  const remainder = count % 3;
  if (remainder === 0) return 4;
  const halves = remainder === 1 ? 4 : 2;
  return index >= count - halves ? 6 : 4;
}

export default function OurBlogs() {
  const root = useRef<HTMLElement>(null);
  const changedOnce = useRef(false);
  const [active, setActive] = useState<Filter>("All");

  const filtered = useMemo(() => (active === "All" ? blogs : blogs.filter((b) => b.category === active)), [active]);
  const [featured, ...rest] = filtered;

  /* Heading */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(q("[data-ob-eyebrow]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.1)
        .fromTo(q("[data-ob-word]"), { autoAlpha: 0, yPercent: 115, rotate: 4 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.12 }, 0.15)
        .fromTo(q("[data-ob-underline]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.9, ease: "power2.inOut" }, 0.9)
        .fromTo(q("[data-ob-copy]"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.55);
    });

    return () => mm.revert();
  }, []);

  /* Cards: rise in as you reach them, straight away when the filter changes */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const cells = q("[data-ob-cell]") as HTMLElement[];
    const changed = changedOnce.current;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      cells.forEach((cell, i) => {
        const trigger = changed ? {} : { scrollTrigger: { trigger: cell, start: "top 90%", once: true } };
        const delay = changed ? i * 0.07 : i === 0 ? 0.45 : (i - 1) % 3 * 0.11;
        gsap.fromTo(
          cell,
          { autoAlpha: 0, y: changed ? 44 : 90, scale: 0.95, rotate: i % 2 ? 1.2 : -1.2 },
          { autoAlpha: 1, y: 0, scale: 1, rotate: 0, duration: changed ? 0.8 : 1.25, delay, ease: "expo.out", clearProps: "transform", ...trigger },
        );
        gsap.fromTo(
          gsap.utils.selector(cell)("[data-bc-zoom]"),
          { scale: 1.14 },
          { scale: 1, duration: changed ? 1 : 1.7, delay, ease: "expo.out", clearProps: "transform", ...trigger },
        );
      });
    });

    if (changed) {
      ScrollTrigger.refresh();
      // A shorter list can leave you scrolled past it: glide back to its first card
      const listTop = q("[data-ob-list]")[0].getBoundingClientRect().top;
      if (listTop < 100) {
        const lenis = (window as unknown as { lenis?: { resize: () => void; scrollTo: (t: number, o?: object) => void } }).lenis;
        const target = window.scrollY + listTop - 120;
        if (lenis) {
          lenis.resize();
          lenis.scrollTo(target, { duration: 0.9, force: true });
        } else window.scrollTo(0, target);
      }
    }
    return () => mm.revert();
  }, [active]);

  return (
    // Pulled up under the sticky header so the navbar floats over the warm background
    <section ref={root} className="ob relative -mt-20 w-full lg:-mt-24">
      <style>{`
        .ob { overflow: clip; color: #350C0E; background: radial-gradient(60% 420px at 90% 60px, rgba(247,147,30,0.2), transparent 70%), linear-gradient(180deg, #FFF0E1 0, #FFF8F0 360px, #FFFEFA 720px); }
        .ob .ob-wrap { max-width: var(--page-max); margin: 0 auto; padding: 7.5rem 1.5rem 5.5rem; }
        .ob .ob-head { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.75rem; }
        .ob .ob-title { margin-top: 1.5rem; font-size: clamp(2.35rem, 10.6vw, 3.8rem); line-height: 1.04; letter-spacing: -0.04em; font-weight: 600; }
        .ob .ob-mask { display: block; overflow: hidden; padding: 0 0.1em 0.12em 0; margin-bottom: -0.12em; }
        .ob .ob-accent { font-size: 1.14em; line-height: 0.95; letter-spacing: -0.02em; font-weight: 400; font-stretch: normal; color: #D9651A; }
        .ob .ob-text { max-width: 30rem; font-size: 1.0625rem; line-height: 1.65; color: rgba(53,12,14,0.74); }

        .ob .ob-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 2.25rem; }
        .ob .ob-pill { display: inline-flex; align-items: center; gap: 0.45rem; height: 2.625rem; padding: 0 1.1rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 600; background: #fff; box-shadow: inset 0 0 0 1px rgba(53,12,14,0.14); transition: background-color .3s ease, color .3s ease, box-shadow .3s ease; }
        .ob .ob-pill:hover { box-shadow: inset 0 0 0 1px #350C0E; }
        .ob .ob-pill:focus-visible { outline: 3px solid #F7931E; outline-offset: 2px; }
        .ob .ob-pill.is-on { background: #350C0E; color: #fff; box-shadow: none; }
        .ob .ob-pill-n { font-size: 0.75rem; opacity: 0.6; }

        .ob .ob-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; margin-top: 2.25rem; }
        ${BLOG_CARD_CSS}

        @media (min-width: 1024px) {
          .ob .ob-wrap { padding: 9rem var(--page-gutter) 7rem; }
          .ob .ob-head { grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr); align-items: end; gap: 4rem; }
          .ob .ob-title { font-size: clamp(3.2rem, 5vw, 5.3rem); }
          .ob .ob-pills { margin-top: 3rem; }
          .ob .ob-grid { grid-template-columns: repeat(12, minmax(0, 1fr)); }
          .ob .ob-s4 { grid-column: span 4; }
          .ob .ob-s6 { grid-column: span 6; }
          .ob .ob-s12 { grid-column: span 12; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .ob [data-ob-eyebrow], .ob [data-ob-word], .ob [data-ob-copy], .ob [data-ob-cell] { visibility: hidden; }
        }
      `}</style>

      <div className="ob-wrap">
        <div className="ob-head">
          <div>
            <p data-ob-eyebrow className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
              <span className="h-3.5 w-5 bg-[#F7931E] [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
              Blog
            </p>
            <h1 className="ob-title font-display">
              <span className="ob-mask">
                <span data-ob-word className="inline-block origin-bottom-left">
                  Insights &amp; Guides For Your
                </span>{" "}
              </span>
              <span className="ob-mask">
                <span data-ob-word className={`${accentSerif.className} ob-accent inline-block origin-bottom-left`}>
                  Study Abroad Journey
                </span>
              </span>
              <svg aria-hidden viewBox="0 0 320 16" preserveAspectRatio="none" className="mt-1 block overflow-visible" style={{ width: "min(100%, 8.2em)", height: "0.16em" }}>
                <path data-ob-underline d="M3 11 C 70 3, 170 2, 317 8" fill="none" stroke="#F7931E" strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </svg>
            </h1>
          </div>
          <p data-ob-copy className="ob-text">
            Practical advice on choosing a university, writing standout applications, and navigating visas, straight from our team.
          </p>
        </div>

        <div data-ob-copy className="ob-pills" role="group" aria-label="Filter articles by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={active === category}
              onClick={() => {
                changedOnce.current = true;
                setActive(category);
              }}
              className={`ob-pill${active === category ? " is-on" : ""}`}>
              {category}
              <span className="ob-pill-n">{category === "All" ? blogs.length : blogs.filter((b) => b.category === category).length}</span>
            </button>
          ))}
        </div>

        <div data-ob-list>
          <div key={active} className="ob-grid">
            {featured ? (
              <>
                <div data-ob-cell className="ob-s12">
                  <BlogCard blog={featured} wide priority sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
                {rest.map((blog, i) => {
                  const span = spanFor(i, rest.length);
                  return (
                    <div key={blog.slug} data-ob-cell className={`ob-s${span}`}>
                      <BlogCard blog={blog} wide={span === 12} sizes={span === 4 ? "(min-width: 1024px) 30vw, 100vw" : "(min-width: 768px) 46vw, 100vw"} />
                    </div>
                  );
                })}
              </>
            ) : (
              <p className="ob-text">No articles in this category yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
