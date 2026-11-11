"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Blog } from "@/lib/blogs";
import { accentSerif } from "@/lib/fonts";
import BlogCard, { BLOG_CARD_CSS, BLOG_TONES } from "./BlogCard";

gsap.registerPlugin(ScrollTrigger);

const RADIUS = 28;

export default function BlogArticle({ blog, related, minutes }: { blog: Blog; related: Blog[]; minutes: number }) {
  const root = useRef<HTMLDivElement>(null);
  const tone = BLOG_TONES[blog.category];

  const words = blog.title.split(" ");
  const lead = words.slice(0, -2);
  const accent = words.slice(-2);
  const [intro, ...body] = blog.content;

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

        /* On load: headline word by word, the cover wipes open and straightens */
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo(q("[data-ba-meta]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.1)
          .fromTo(q("[data-ba-word]"), { autoAlpha: 0, yPercent: 112 }, { autoAlpha: 1, yPercent: 0, duration: 1.05, stagger: 0.05 }, 0.18)
          .fromTo(
            q("[data-ba-cover]"),
            { autoAlpha: 0, rotate: isDesktop ? 2.5 : 0, clipPath: `inset(100% 0% 0% 0% round ${RADIUS}px)` },
            { autoAlpha: 1, rotate: 0, clipPath: `inset(0% 0% 0% 0% round ${RADIUS}px)`, duration: 1.5, clearProps: "clipPath" },
            0.3,
          )
          .fromTo(q("[data-ba-cover-img]"), { scale: 1.14 }, { scale: 1, duration: 1.8 }, 0.3);

        if (isDesktop) {
          gsap.to(q("[data-ba-cover]"), { y: -36, ease: "none", scrollTrigger: { trigger: q("[data-ba-hero]")[0], start: "top top", end: "bottom top", scrub: 0.8 } });
        }

        /* Reading progress: bar across the top of the screen, percentage beside the article */
        const article = q("[data-ba-body]")[0];
        const percent = q("[data-ba-percent]")[0];
        gsap.fromTo(
          q("[data-ba-bar]"),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: article,
              start: "clamp(top 75%)", // clamp: on tall screens the article is already in view at load, and should still read 0%
              end: "bottom 75%",
              scrub: 0.3,
              onUpdate(self) {
                percent.textContent = `${Math.round(self.progress * 100)}%`;
              },
            },
          },
        );

        /* The opening paragraph fills in word by word; the rest rise in as you reach them */
        const introEl = q("[data-ba-intro]")[0];
        gsap.fromTo(
          q("[data-ba-fill]"),
          { opacity: 0.18 },
          { opacity: 1, ease: "none", stagger: 0.05, scrollTrigger: { trigger: introEl, start: "top 80%", end: "bottom 62%", scrub: 0.5 } },
        );
        (q("[data-ba-para]") as HTMLElement[]).forEach((para) => {
          gsap.fromTo(para, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: para, start: "top 90%", once: true } });
        });
        gsap.fromTo(q("[data-ba-side]"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: article, start: "top 85%", once: true } });

        /* Keep reading */
        const moreHead = q("[data-ba-more-head]")[0];
        if (moreHead) {
          gsap.fromTo(moreHead, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: moreHead, start: "top 86%", once: true } });
          (q("[data-ba-cell]") as HTMLElement[]).forEach((cell, i) => {
            gsap.fromTo(
              cell,
              { autoAlpha: 0, y: 90, scale: 0.95, rotate: isDesktop ? (i - 1) * 2 : 0 },
              { autoAlpha: 1, y: 0, scale: 1, rotate: 0, duration: 1.25, delay: isDesktop ? i * 0.11 : 0, ease: "expo.out", clearProps: "transform", scrollTrigger: { trigger: isDesktop ? moreHead : cell, start: isDesktop ? "top 72%" : "top 90%", once: true } },
            );
          });
        }
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="ba">
      <style>{`
        .ba { overflow: clip; color: #350C0E; background: #FFFEFA; }
        .ba .ba-bar { position: fixed; z-index: 70; left: 0; right: 0; top: 0; height: 3px; background: #F7931E; transform: scaleX(0); transform-origin: 0 50%; }
        .ba .ba-hero { background: radial-gradient(60% 80% at 90% 10%, rgba(247,147,30,0.2), transparent 70%), linear-gradient(180deg, #FFF0E1 0%, #FFF8F0 62%, #FFFEFA 100%); }
        .ba .ba-hero-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2.25rem; max-width: var(--page-max); margin: 0 auto; padding: 7.25rem 1.5rem 2.5rem; }
        .ba .ba-back { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; font-weight: 600; color: rgba(53,12,14,0.72); transition: color .25s ease; }
        .ba .ba-back:hover { color: #D9651A; }
        .ba .ba-chip { display: inline-block; margin-top: 1.75rem; padding: 0.35rem 0.85rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
        .ba .ba-title { margin-top: 1rem; font-size: clamp(2.05rem, 8.8vw, 3rem); line-height: 1.07; letter-spacing: -0.035em; font-weight: 600; }
        .ba .ba-w { display: inline-block; overflow: hidden; padding: 0 0.04em 0.14em 0; margin-bottom: -0.14em; vertical-align: top; }
        .ba .ba-accent { font-size: 1.14em; line-height: 0.95; letter-spacing: -0.015em; font-weight: 400; font-stretch: normal; color: #D9651A; }
        .ba .ba-byline { display: flex; flex-wrap: wrap; gap: 0.25rem 0.5rem; margin-top: 1.5rem; font-size: 0.875rem; font-weight: 500; color: rgba(53,12,14,0.72); }
        .ba .ba-cover { position: relative; aspect-ratio: 16 / 9; overflow: hidden; border-radius: ${RADIUS}px; background: #fff; box-shadow: 0 40px 70px -40px rgba(53,12,14,0.55); }
        .ba .ba-cover-img { position: absolute; inset: 0; }
        .ba .ba-cover img { object-fit: cover; object-position: 50% 0; }

        .ba .ba-layout { display: grid; grid-template-columns: minmax(0, 1fr); max-width: var(--page-max); margin: 0 auto; padding: 1.5rem 1.5rem 4rem; }
        .ba .ba-side { display: none; }
        .ba .ba-intro { font-size: 1.5rem; line-height: 1.32; letter-spacing: -0.02em; font-weight: 500; }
        .ba .ba-para { margin-top: 1.5rem; font-size: 1.0625rem; line-height: 1.75; color: rgba(53,12,14,0.8); }
        .ba .ba-intro + .ba-para { margin-top: 2.25rem; }

        .ba .ba-more { max-width: var(--page-max); margin: 0 auto; padding: 1rem 1.5rem 3rem; }
        .ba .ba-more-title { font-size: clamp(2.5rem, 11vw, 3.5rem); line-height: 1.02; letter-spacing: -0.04em; font-weight: 600; }
        .ba .ba-more-accent { font-size: 1.16em; line-height: 0.9; letter-spacing: -0.02em; font-weight: 400; font-stretch: normal; color: #F7931E; }
        .ba .ba-more-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; margin-top: 2rem; }
        ${BLOG_CARD_CSS}

        @media (min-width: 1024px) {
          .ba .ba-hero-grid { grid-template-columns: minmax(0, 1.04fr) minmax(0, 0.96fr); align-items: center; gap: clamp(3rem, 5vw, 5.5rem); padding: 8.5rem var(--page-gutter) 4rem; }
          .ba .ba-title { font-size: clamp(2.5rem, 3.75vw, 4rem); }
          .ba .ba-layout { grid-template-columns: minmax(0, 0.5fr) minmax(0, 1.5fr); align-items: start; gap: clamp(3rem, 6vw, 6.5rem); padding: 3rem var(--page-gutter) 6rem; }
          .ba .ba-side { display: block; position: sticky; top: 7.5rem; }
          .ba .ba-percent { font-size: 3.5rem; line-height: 1; letter-spacing: -0.04em; font-weight: 600; }
          .ba .ba-side-label { margin-top: 0.35rem; font-size: 0.875rem; font-weight: 500; color: rgba(53,12,14,0.66); }
          .ba .ba-btn { display: inline-flex; align-items: center; margin-top: 1.5rem; height: 3rem; padding: 0 1.4rem; border-radius: 9999px; font-size: 0.9375rem; font-weight: 600; white-space: nowrap; color: #fff; background: #350C0E; transition: background-color .3s ease; }
          .ba .ba-btn:hover, .ba .ba-btn:focus-visible { background: #F7931E; }
          .ba .ba-intro { font-size: clamp(1.75rem, 2.5vw, 2.5rem); line-height: 1.24; letter-spacing: -0.03em; }
          .ba .ba-para { max-width: 46rem; font-size: 1.1875rem; line-height: 1.75; }
          .ba .ba-intro + .ba-para { margin-top: 3rem; }
          .ba .ba-more { padding: 1rem var(--page-gutter) 4rem; }
          .ba .ba-more-title { font-size: clamp(3.2rem, 5vw, 5.3rem); }
          .ba .ba-more-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 3rem; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .ba [data-ba-meta], .ba [data-ba-word], .ba [data-ba-cover], .ba [data-ba-para], .ba [data-ba-side], .ba [data-ba-more-head], .ba [data-ba-cell] { visibility: hidden; }
        }
        @media (prefers-reduced-motion: reduce) { .ba .ba-bar { display: none; } }
      `}</style>

      <span aria-hidden data-ba-bar className="ba-bar" />

      <article>
        {/* Pulled up under the sticky header so the navbar floats over the warm background */}
        <header data-ba-hero className="ba-hero -mt-20 lg:-mt-24">
          <div className="ba-hero-grid">
            <div>
              <div data-ba-meta>
                <Link href="/our-blogs" className="ba-back">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden style={{ width: "1rem", height: "1rem" }}>
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Back to Blog
                </Link>
              </div>
              <div data-ba-meta>
                <span className="ba-chip" style={{ background: tone.bg }}>
                  {blog.category}
                </span>
              </div>
              <h1 className="ba-title font-display">
                {lead.map((word, i) => (
                  <span key={i}>
                    <span className="ba-w">
                      <span data-ba-word className="inline-block">
                        {word}
                      </span>
                    </span>{" "}
                  </span>
                ))}
                {accent.map((word, i) => (
                  <span key={i}>
                    <span className="ba-w">
                      <span data-ba-word className={`${accentSerif.className} ba-accent inline-block`}>
                        {word}
                      </span>
                    </span>{" "}
                  </span>
                ))}
              </h1>
              <p data-ba-meta className="ba-byline">
                <span>Admission OnBoard</span>
                <span aria-hidden>·</span>
                <span>{blog.date}</span>
                <span aria-hidden>·</span>
                <span>{minutes} min read</span>
              </p>
            </div>

            <div data-ba-cover className="ba-cover">
              <div data-ba-cover-img className="ba-cover-img">
                <Image src={blog.image} alt={blog.title} fill priority quality={90} sizes="(min-width: 1024px) 45vw, 100vw" />
              </div>
            </div>
          </div>
        </header>

        <div className="ba-layout">
          <aside data-ba-side className="ba-side">
            <div data-ba-percent className="ba-percent font-display">
              0%
            </div>
            <p className="ba-side-label">of this guide read</p>
            <Link href="/contact" className="ba-btn focus:outline-none">
              Talk to an advisor
            </Link>
          </aside>

          <div data-ba-body>
            <p data-ba-intro className="ba-intro font-display">
              {intro.split(" ").map((word, i) => (
                <span key={i}>
                  <span data-ba-fill>{word}</span>{" "}
                </span>
              ))}
            </p>
            {body.map((paragraph, i) => (
              <p key={i} data-ba-para className="ba-para">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="ba-more">
          <h2 data-ba-more-head className="ba-more-title font-display">
            Keep <span className={`${accentSerif.className} ba-more-accent`}>reading</span>
          </h2>
          <div className="ba-more-grid">
            {related.map((item) => (
              <div key={item.slug} data-ba-cell>
                <BlogCard blog={item} sizes="(min-width: 1024px) 30vw, 100vw" />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
