"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const IMAGE_W = 1536;
const IMAGE_H = 1024;
const RADIUS = 28;

/** Things drawn inside the photo that get a live pulse once it is fully open (source-image pixels) */
const SPOTS = [
  { x: 152, y: 345, size: 92, color: "#F7931E" },
  { x: 362, y: 295, size: 92, color: "#2F6BFF" },
  { x: 577, y: 345, size: 92, color: "#3BAA35" },
  { x: 152, y: 516, size: 92, color: "#2F6BFF" },
  { x: 362, y: 555, size: 92, color: "#3BAA35" },
  { x: 577, y: 516, size: 92, color: "#F7931E" },
  { x: 1101, y: 212, size: 62, color: "#3BAA35" },
  { x: 1321, y: 150, size: 62, color: "#F7931E" },
];

export default function HeroContact() {
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
        if (!motionOK) return; // reduced motion: the markup shows the whole photo below the text

        const text = q("[data-text]")[0];
        const holder = q("[data-holder]")[0];
        const frame = q("[data-frame]")[0];
        const spots = q("[data-spot]") as HTMLElement[];

        const windowTop = () => Math.max(0, text.offsetTop + text.offsetHeight + 14 - holder.offsetTop - frame.offsetTop);

        // The window the photo starts in: whatever part of the frame the text leaves free
        const windowClip = () => {
          const r = isDesktop ? 170 : 90;
          if (isDesktop) {
            const left = Math.max(0, text.offsetLeft + text.offsetWidth + 28 - holder.offsetLeft - frame.offsetLeft);
            return `inset(8px 0px 8px ${left}px round ${r}px)`;
          }
          return `inset(${windowTop()}px 8px 8px 8px round ${r}px)`;
        };

        // Pin each pulse onto its spot in the cropped photo (same maths as object-fit: cover)
        const placeSpots = () => {
          const fw = frame.offsetWidth;
          const fh = frame.offsetHeight;
          const scale = Math.max(fw / IMAGE_W, fh / IMAGE_H);
          const ox = (fw - IMAGE_W * scale) * (isDesktop ? 0.5 : 1);
          const oy = (fh - IMAGE_H * scale) * 0.28;
          spots.forEach((spot, i) => {
            const s = SPOTS[i];
            const left = ox + s.x * scale;
            const top = oy + s.y * scale;
            const size = s.size * scale;
            const inside = left > size / 2 && left < fw - size / 2 && top > size / 2 && top < fh - size / 2;
            gsap.set(spot, { left, top, width: size, height: size, display: inside ? "block" : "none" });
          });
        };
        placeSpots();
        ScrollTrigger.addEventListener("refresh", placeSpots);

        /* On load: copy rises, the photo slides up inside its window */
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo(q("[data-eyebrow]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.1)
          .fromTo(q("[data-word]"), { autoAlpha: 0, yPercent: 115, rotate: 4 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.12 }, 0.15)
          .fromTo(q("[data-underline]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.9, ease: "power2.inOut" }, 0.9)
          .fromTo(q("[data-copy]"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.55)
          .fromTo(q("[data-reveal]"), { autoAlpha: 0, yPercent: 60 }, { autoAlpha: 1, yPercent: 0, duration: 1.6 }, 0.25)
          .fromTo(q("[data-blob]"), { autoAlpha: 0, scale: 0.3 }, { autoAlpha: 1, scale: 1, duration: 1.5, stagger: 0.12, ease: "back.out(1.5)" }, 0.5);

        /* Idle: the colour shapes behind the window slowly change shape, the pulses keep rippling */
        const morphs = ["42% 58% 63% 37% / 45% 39% 61% 55%", "63% 37% 41% 59% / 56% 62% 38% 44%", "37% 63% 56% 44% / 62% 44% 56% 38%"];
        q("[data-blob]").forEach((blob, i) => {
          gsap.to(blob, { borderRadius: morphs[i], xPercent: i % 2 ? 7 : -7, yPercent: i % 2 ? -6 : 6, rotate: i % 2 ? 12 : -12, duration: 5 + i * 1.3, ease: "sine.inOut", yoyo: true, repeat: -1 });
        });
        q("[data-ring]").forEach((ring, i) => {
          gsap.fromTo(ring, { scale: 0.75, opacity: 0.75 }, { scale: 1.65, opacity: 0, duration: 2.2, ease: "power1.out", repeat: -1, delay: i * 0.27 });
        });

        /* On scroll: the window opens up to the whole photo at container width */
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.7, invalidateOnRefresh: true },
          })
          .to(text, { autoAlpha: 0, y: -40, duration: 0.24, ease: "power2.in" }, 0.03)
          .fromTo(frame, { clipPath: windowClip }, { clipPath: `inset(0px 0px 0px 0px round ${RADIUS}px)`, duration: 0.68, ease: "power2.inOut" }, 0.08)
          .fromTo(q("[data-ken]"), { scale: isDesktop ? 1.2 : 1, y: () => (isDesktop ? 0 : windowTop() * 0.8) }, { scale: 1, y: 0, duration: 0.68, ease: "power2.inOut" }, 0.08)
          .to(q("[data-blobs]"), { opacity: 0, duration: 0.3 }, 0.08)
          .fromTo(q("[data-spots]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12 }, 0.8);

        return () => ScrollTrigger.removeEventListener("refresh", placeSpots);
      },
    );

    return () => mm.revert();
  }, []);

  return (
    // Pulled up under the sticky header so the navbar floats over the scene
    <section ref={root} className="cth relative -mt-20 w-full lg:-mt-24">
      <style>{`
        .cth { color: #350C0E; background: #FFF8F0; }
        .cth .cth-stage { position: relative; display: flex; flex-direction: column; gap: 2rem; padding: 7rem 1.5rem 3rem; background: radial-gradient(55% 60% at 88% 12%, rgba(247,147,30,0.2), transparent 70%), radial-gradient(50% 55% at 6% 90%, rgba(47,107,255,0.1), transparent 70%), linear-gradient(180deg, #FFF0E1 0%, #FFF8F0 58%, #FFFEFA 100%); }
        .cth .cth-text { position: relative; z-index: 3; }
        .cth .cth-title { margin-top: 1.25rem; font-size: clamp(1.95rem, 8.9vw, 3.6rem); line-height: 1.04; letter-spacing: -0.04em; font-weight: 600; }
        .cth .cth-mask { display: block; overflow: hidden; padding: 0 0.1em 0.12em 0; margin-bottom: -0.12em; }
        .cth .cth-accent { font-size: 1.14em; line-height: 0.95; letter-spacing: -0.02em; font-weight: 400; font-stretch: normal; color: #D9651A; }
        .cth .cth-copy { max-width: 30rem; margin-top: 1.25rem; font-size: 1rem; line-height: 1.6; color: rgba(53,12,14,0.74); }

        .cth .cth-holder { position: relative; display: flex; align-items: center; justify-content: center; width: 100%; }
        .cth .cth-frame { position: relative; z-index: 2; width: 100%; max-width: var(--page-inner); aspect-ratio: 4 / 5; overflow: hidden; border-radius: ${RADIUS}px; }
        .cth .cth-photo { object-fit: cover; object-position: 100% 28%; }
        .cth .cth-ken, .cth .cth-reveal { position: absolute; inset: 0; }
        .cth .cth-spots { position: absolute; inset: 0; }
        .cth .cth-spot { position: absolute; display: none; translate: -50% -50%; pointer-events: none; }
        .cth .cth-ring { position: absolute; inset: 0; border: 2px solid currentColor; border-radius: 50%; }
        .cth .cth-blobs { display: none; position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .cth .cth-blob { position: absolute; border-radius: 58% 42% 38% 62% / 42% 55% 45% 58%; }

        @media (min-width: 1024px) {
          .cth .cth-title { font-size: clamp(2.6rem, 3.95vw, 4.4rem); }
          .cth .cth-copy { font-size: 1.0625rem; line-height: 1.65; }
          .cth .cth-frame { aspect-ratio: 1.6; }
          .cth .cth-photo { object-position: 50% 28%; }
        }

        /* With motion on, the scene is a sticky stage: the text beside a window into the photo */
        @media (prefers-reduced-motion: no-preference) {
          .cth { height: 185svh; }
          .cth .cth-stage { position: sticky; top: 0; display: block; height: 100svh; overflow: clip; padding: 0; }
          .cth .cth-text { position: absolute; left: 1.5rem; right: 1.5rem; top: 5.75rem; }
          .cth .cth-holder { position: absolute; left: 1.5rem; right: 1.5rem; top: 5.5rem; bottom: 1rem; width: auto; }
          .cth .cth-frame { width: min(100%, calc((100svh - 6.5rem) * 0.8)); }
          .cth [data-eyebrow], .cth [data-word], .cth [data-copy], .cth [data-reveal], .cth [data-blob], .cth [data-spots] { visibility: hidden; }
        }
        @media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
          .cth .cth-blobs { display: block; }
          .cth .cth-text { left: var(--page-edge); right: auto; top: calc(50% + 2.5rem); width: 38vw; translate: 0 -50%; }
          .cth .cth-holder { left: var(--page-edge); right: var(--page-edge); top: 6.5rem; bottom: 1.25rem; }
          .cth .cth-frame { width: min(100%, var(--page-inner)); height: min(100%, calc(min(100vw - 2 * var(--page-gutter), var(--page-inner)) / 1.5)); aspect-ratio: auto; }
        }
      `}</style>

      <div className="cth-stage">
        <div aria-hidden data-blobs className="cth-blobs">
          <span data-blob className="cth-blob" style={{ right: "-5%", top: "10%", width: "26vw", height: "26vw", background: "#2F6BFF" }} />
          <span data-blob className="cth-blob" style={{ left: "40%", bottom: "-7%", width: "22vw", height: "22vw", background: "#F7931E" }} />
          <span data-blob className="cth-blob" style={{ right: "13%", bottom: "-9%", width: "20vw", height: "20vw", background: "#3BAA35" }} />
        </div>

        <div data-text className="cth-text">
          <p data-eyebrow className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
            <span className="h-3.5 w-5 bg-[#F7931E] [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
            Contact us
          </p>
          <h1 className="cth-title font-display">
            <span className="cth-mask">
              <span data-word className="inline-block origin-bottom-left whitespace-nowrap">
                Contact With Us —
              </span>{" "}
            </span>
            <span className="cth-mask">
              <span data-word className={`${accentSerif.className} cth-accent inline-block origin-bottom-left`}>
                We&apos;re Here to Help
              </span>
            </span>
            <svg aria-hidden viewBox="0 0 320 16" preserveAspectRatio="none" className="mt-1 block overflow-visible" style={{ width: "min(100%, 7.1em)", height: "0.16em" }}>
              <path data-underline d="M3 11 C 70 3, 170 2, 317 8" fill="none" stroke="#F7931E" strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
          </h1>
          <p data-copy className="cth-copy">
            Not sure where to start with studying overseas? Our advisors are on hand to walk you through every step, offering tailored advice for your international education plans.
          </p>
        </div>

        <div data-holder className="cth-holder">
          <div data-frame className="cth-frame">
            <div data-reveal className="cth-reveal">
              <div data-ken className="cth-ken" style={{ transformOrigin: "62% 30%" }}>
                <Image src="/admission-contact.png" alt="An Admission OnBoard advisor talking with students around a table" fill priority quality={90} sizes="(min-width: 1024px) 90vw, 170vw" className="cth-photo" />
              </div>
            </div>
            <div aria-hidden data-spots className="cth-spots">
              {SPOTS.map((s) => (
                <span key={`${s.x}-${s.y}`} data-spot className="cth-spot" style={{ color: s.color }}>
                  <span data-ring className="cth-ring" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
