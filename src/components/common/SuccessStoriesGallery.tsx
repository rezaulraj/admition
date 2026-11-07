"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

// Visa approval photos ride the 3D corridor (both rails share this order)
const APPROVALS = Array.from({ length: 18 }, (_, i) => ({
  src: `/visa${i + 1}.png`,
  alt: "Student holding an approved study visa",
}));

export default function SuccessStoriesGallery() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Corridor opens from a small rounded window to full size as the section scrolls in
      gsap.fromTo(
        q("[data-corridor]"),
        { clipPath: "inset(16% 20% 16% 20% round 48px)", scale: 0.94 },
        {
          clipPath: "inset(0% 0% 0% 0% round 32px)",
          scale: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", end: "top 20%", scrub: 1.2 },
        },
      );

      // Heading card reveals once, then drifts gently with scroll
      const reveal = gsap.timeline({
        defaults: { ease: "expo.out", duration: 1.1 },
        scrollTrigger: { trigger: el, start: "top 55%", once: true },
      });
      reveal
        .fromTo(
          q("[data-panel]"),
          { autoAlpha: 0, y: -36, scale: 0.92, filter: "blur(10px)" },
          { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.3 },
          0,
        )
        .fromTo(q("[data-chip]"), { autoAlpha: 0, y: -12, scale: 0.9 }, { autoAlpha: 1, y: 0, scale: 1, ease: "back.out(2)" }, 0.2)
        .fromTo(
          q("[data-word]"),
          { autoAlpha: 0, yPercent: 110, rotate: 5, filter: "blur(6px)" },
          { autoAlpha: 1, yPercent: 0, rotate: 0, filter: "blur(0px)", stagger: 0.12, duration: 1.2 },
          0.3,
        )
        .fromTo(q("[data-underline]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1, ease: "power2.inOut" }, 0.8)
        .fromTo(q("[data-copy]"), { autoAlpha: 0, y: 16, filter: "blur(6px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)" }, 0.65);

      gsap.fromTo(
        q("[data-panel-wrap]"),
        { y: 16 },
        { y: -16, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.5 } },
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="approvals relative w-full overflow-hidden bg-[#FFFEFA] py-14 sm:py-20">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .approvals [data-reveal] { visibility: hidden; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <div data-corridor className="relative overflow-hidden rounded-[2rem] will-change-[clip-path,transform]">
          <ImageStreamHero
            images={APPROVALS}
            cards={12}
            speed={28}
            axis={64}
            path={{ cardRadius: 1.2 }}
            className="h-[480px] w-full bg-[radial-gradient(ellipse_at_center,#FFFFFF_0%,#EEF2FF_55%,#E3EAFF_100%)] sm:h-[620px] lg:h-[700px]">
            {/* Soft vignette so the cards melt into the frame edges */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(255,254,250,0.85)_100%)]"
            />

            {/* Heading card, top centre (corridor streams out beneath it) */}
            <div className="absolute inset-x-0 top-6 z-10 flex justify-center px-4 sm:top-10 lg:top-12">
              <div data-panel-wrap>
                <div
                  data-panel
                  data-reveal
                  className="max-w-md rounded-3xl border border-white/80 bg-white/75 px-6 py-6 text-center shadow-[0_30px_80px_-30px_rgba(20,33,61,0.45)] backdrop-blur-xl sm:max-w-xl sm:px-10 sm:py-8">
                  <span
                    data-chip
                    data-reveal
                    className="inline-flex items-center gap-2 rounded-full bg-[#3BAA35]/10 px-3.5 py-1.5 text-xs font-semibold text-[#2E8A29] sm:text-sm">
                    <svg viewBox="0 0 20 20" className="size-4" fill="currentColor" aria-hidden>
                      <path d="M10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm4 6.3-4.8 5a.8.8 0 0 1-1.1 0L6 10.6l1.1-1.1 1.5 1.5 4.3-4.4L14 7.8Z" />
                    </svg>
                    Real students, real visas
                  </span>

                  <h2 className="font-display mt-4 text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[#350C0E] sm:text-5xl">
                    <span className="mr-[0.25em] inline-block overflow-hidden pb-[0.1em] align-top">
                      <span data-word data-reveal className="inline-block origin-bottom-left">
                        Recent
                      </span>
                    </span>
                    <span className="inline-block overflow-hidden pb-[0.2em] align-top">
                      <span data-word data-reveal className="relative inline-block origin-bottom-left text-[#F7931E]">
                        Approvals
                        <svg
                          aria-hidden
                          viewBox="0 0 220 24"
                          preserveAspectRatio="none"
                          className="absolute -bottom-[0.18em] left-0 h-[0.22em] w-full overflow-visible">
                          <path
                            data-underline
                            d="M4 16 C 70 6, 150 6, 216 12"
                            fill="none"
                            stroke="#14213D"
                            strokeWidth="5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </span>
                  </h2>

                  <p
                    data-copy
                    data-reveal
                    className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#4A5268] sm:mt-5 sm:max-w-md sm:text-base">
                    A showcase of real visa approvals secured for our students embarking on their global education
                    journey.
                  </p>
                </div>
              </div>
            </div>
          </ImageStreamHero>
        </div>
      </div>
    </section>
  );
}
