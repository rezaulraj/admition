"use client";

import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

const videos = [
  { id: "aqz-KE-bpKQ", name: "Rafid Hasan", thumbnail: "/success1.png", focus: "52% 30%" },
  { id: "eYq7WapuDLU", name: "Rajon Kumar", thumbnail: "/success2.png", focus: "58% 30%" },
  { id: "M7lc1UVf-VE", name: "Imran Kabir", thumbnail: "/success5.png", focus: "44% 30%" },
  { id: "5qap5aO4i9A", name: "Rakib Uddin", thumbnail: "/success8.png", focus: "50% 25%" },
];

/** Turn on once the real student videos are in the list above: pressing the open story then plays it */
const VIDEOS_READY: boolean = false;

const SECONDS_PER_STORY = 6;
const NARROW = "(max-width: 767px)";
const openGrow = () => (window.matchMedia(NARROW).matches ? 2.6 : 4.2);

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function StudentVideoStories() {
  const root = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const inView = useRef(false);
  const hovered = useRef(false);
  const timer = useRef<gsap.core.Tween | null>(null);
  const firstRun = useRef(true);
  const [active, setActive] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const syncTimer = () => {
    if (!timer.current) return;
    if (inView.current && !hovered.current) timer.current.play();
    else timer.current.pause();
  };

  /* Section reveal */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const panels = q("[data-svs-panel]");
    const mm = gsap.matchMedia();

    // The open panel is wider on desktop and shorter on phones: re-apply when crossing that breakpoint
    mm.add({ narrow: NARROW, wide: "(min-width: 768px)" }, () => {
      gsap.set(panels, { flexGrow: (i: number) => (i === activeRef.current ? openGrow() : 1) });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: el, start: "top 78%", once: true } })
        .fromTo(q("[data-svs-eyebrow]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
        .fromTo(q("[data-svs-word]"), { autoAlpha: 0, yPercent: 115, rotate: 4 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.1 }, 0.08)
        .fromTo(q("[data-svs-copy]"), { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.4)
        .fromTo(
          panels,
          { autoAlpha: 0, y: 90, clipPath: "inset(100% 0% 0% 0% round 28px)" },
          { autoAlpha: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.4, stagger: 0.12, clearProps: "clipPath,transform" },
          0.3,
        );

      // Stories only advance while the section is actually on screen
      ScrollTrigger.create({
        trigger: el,
        start: "top 70%",
        end: "bottom 30%",
        onToggle(self) {
          inView.current = self.isActive;
          syncTimer();
        },
      });
    });

    return () => mm.revert();
  }, []);

  /* Opening a story: panels glide to their new widths, then its timer runs */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    activeRef.current = active;
    const q = gsap.utils.selector(el);
    const panels = q("[data-svs-panel]");
    const reduce = reducedMotion();

    if (!firstRun.current) {
      gsap.to(panels, {
        flexGrow: (i: number) => (i === active ? openGrow() : 1),
        duration: reduce ? 0 : 1,
        ease: "expo.out",
        overwrite: "auto",
      });
      if (!reduce) gsap.fromTo(q("[data-svs-img]")[active], { scale: 1.1 }, { scale: 1, duration: 1.8, ease: "expo.out", overwrite: "auto" });
    }
    firstRun.current = false;
    if (reduce) return;

    const bar = q("[data-svs-bar]")[active];
    const tween = gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: SECONDS_PER_STORY,
        ease: "none",
        paused: true,
        onComplete: () => setActive((a) => (a + 1) % videos.length),
      },
    );
    timer.current = tween;
    syncTimer();
    return () => {
      tween.kill();
      timer.current = null;
      gsap.set(bar, { scaleX: 0 });
    };
  }, [active]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideoId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const setHovered = (value: boolean) => {
    hovered.current = value;
    syncTimer();
  };

  const openOnHover = (e: PointerEvent<HTMLButtonElement>, i: number) => {
    if (e.pointerType === "mouse") setActive(i);
  };

  return (
    <section ref={root} className="svs relative w-full">
      <style>{`
        .svs { overflow: clip; color: #350C0E; background: #FFFEFA; }
        .svs .svs-wrap { max-width: 84rem; margin: 0 auto; padding: 5rem 1.5rem; }
        .svs .svs-head { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.5rem; }
        .svs .svs-title { margin-top: 1.5rem; font-size: clamp(2.8rem, 12vw, 4rem); line-height: 1.02; letter-spacing: -0.04em; font-weight: 600; }
        .svs .svs-mask { display: inline-block; overflow: hidden; padding: 0 0.08em 0.14em 0; margin-bottom: -0.14em; vertical-align: top; }
        .svs .svs-accent { font-size: 1.16em; line-height: 0.9; letter-spacing: -0.02em; font-weight: 400; font-stretch: normal; color: #F7931E; }
        .svs .svs-text { max-width: 26rem; font-size: 1.0625rem; line-height: 1.65; color: rgba(53,12,14,0.72); }

        .svs .svs-stage { display: flex; flex-direction: column; gap: 0.625rem; height: 38rem; margin-top: 2.5rem; }
        .svs .svs-panel { position: relative; flex: 1 1 0; min-width: 0; min-height: 0; overflow: hidden; border-radius: 1.75rem; cursor: pointer; text-align: left; background: #F3E4D6; will-change: flex-grow; }
        .svs .svs-panel:first-child { flex-grow: 2.6; }
        .svs .svs-panel:focus-visible { outline: 3px solid #F7931E; outline-offset: 3px; }
        .svs .svs-img { position: absolute; inset: 0; transition: filter .6s ease; filter: saturate(0.82); }
        .svs .svs-panel.is-open .svs-img { filter: none; }

        .svs .svs-card { position: absolute; left: 0.75rem; bottom: 0.75rem; display: flex; align-items: center; gap: 0.85rem; overflow: hidden; padding: 0.7rem 1.5rem 0.8rem 0.7rem; border-radius: 1.25rem; white-space: nowrap; background: rgba(255,255,255,0.9); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); box-shadow: 0 22px 40px -22px rgba(53,12,14,0.6); opacity: 0; translate: 0 14px; pointer-events: none; transition: opacity .25s ease, translate .25s ease; }
        .svs .svs-panel.is-open .svs-card { opacity: 1; translate: 0 0; transition: opacity .55s ease .25s, translate .7s cubic-bezier(.2,.8,.2,1) .25s; }
        .svs .svs-play { display: grid; place-items: center; flex: none; width: 3.25rem; height: 3.25rem; border-radius: 50%; color: #fff; background: #350C0E; transition: background-color .3s ease, scale .3s ease; }
        .svs .svs-panel:hover .svs-play { background: #F7931E; scale: 1.06; }
        .svs .svs-name { display: block; font-size: 1.85rem; line-height: 1.05; letter-spacing: -0.01em; }
        .svs .svs-kicker { display: block; margin-top: 0.15rem; font-size: 0.75rem; font-weight: 600; color: rgba(53,12,14,0.62); }
        .svs .svs-bar { position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: #F7931E; transform: scaleX(0); transform-origin: 0 50%; }

        .svs .svs-tag { position: absolute; left: 0.75rem; bottom: 0.75rem; padding: 0.4rem 0.8rem; border-radius: 0.8rem; font-size: 0.8125rem; font-weight: 600; white-space: nowrap; background: rgba(255,255,255,0.88); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); transition: opacity .45s ease .2s; }
        .svs .svs-panel.is-open .svs-tag { opacity: 0; transition: opacity .15s ease; }

        @media (min-width: 768px) {
          .svs .svs-stage { flex-direction: row; height: clamp(26rem, 68svh, 38rem); gap: 0.75rem; }
          .svs .svs-panel:first-child { flex-grow: 4.2; }
          .svs .svs-card { left: 1.25rem; bottom: 1.25rem; padding: 0.85rem 2rem 0.95rem 0.85rem; }
          .svs .svs-name { font-size: 2.35rem; }
          .svs .svs-kicker { font-size: 0.8125rem; }
          .svs .svs-play { width: 3.75rem; height: 3.75rem; }
          .svs .svs-tag { left: 50%; bottom: 1rem; padding: 0.8rem 0.45rem; writing-mode: vertical-rl; rotate: 180deg; translate: 50% 0; }
        }
        @media (min-width: 1024px) {
          .svs .svs-wrap { padding: 6.5rem 5.4vw; }
          .svs .svs-head { grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); align-items: end; gap: 4rem; }
          .svs .svs-title { font-size: clamp(3.4rem, 5.5vw, 5.9rem); }
          .svs .svs-stage { margin-top: 3.25rem; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .svs [data-svs-eyebrow], .svs [data-svs-word], .svs [data-svs-copy], .svs [data-svs-panel] { visibility: hidden; }
        }
        @media (prefers-reduced-motion: reduce) {
          .svs .svs-card, .svs .svs-tag, .svs .svs-img, .svs .svs-play { transition: none !important; }
        }
      `}</style>

      <div className="svs-wrap">
        <div className="svs-head">
          <div>
            <p data-svs-eyebrow className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
              <span className="h-3.5 w-5 bg-[#F7931E] [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
              Student stories
            </p>
            <h2 className="svs-title font-display">
              <span className="svs-mask">
                <span data-svs-word className="inline-block origin-bottom-left">
                  Hear From
                </span>
              </span>{" "}
              <span className="svs-mask">
                <span data-svs-word className={`${accentSerif.className} svs-accent inline-block origin-bottom-left`}>
                  Our Students
                </span>
              </span>
            </h2>
          </div>
          <p data-svs-copy className="svs-text">
            Real stories, straight from the students we&apos;ve guided abroad
          </p>
        </div>

        <div
          className="svs-stage"
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}>
          {videos.map((video, i) => (
            <button
              key={video.id}
              type="button"
              data-svs-panel
              aria-pressed={active === i}
              aria-label={`${video.name}'s story`}
              onPointerEnter={(e) => openOnHover(e, i)}
              onClick={() => {
                if (VIDEOS_READY && active === i) setActiveVideoId(video.id);
                else setActive(i);
              }}
              className={`svs-panel${active === i ? " is-open" : ""}`}>
              <span data-svs-img className="svs-img">
                <Image
                  src={video.thumbnail}
                  alt={`${video.name} shares their study abroad story`}
                  fill
                  quality={90}
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: video.focus }}
                />
              </span>

              <span aria-hidden className="svs-tag">
                {video.name}
              </span>

              <span aria-hidden className="svs-card">
                <span className="svs-play">
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "1.4rem", height: "1.4rem" }}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span>
                  <span className={`${accentSerif.className} svs-name`}>{video.name}</span>
                  <span className="svs-kicker">Student story</span>
                </span>
                <span data-svs-bar className="svs-bar" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Video modal */}
      {activeVideoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4" onClick={() => setActiveVideoId(null)}>
          <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setActiveVideoId(null)}
              aria-label="Close video"
              className="absolute -top-11 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1B1B1B] hover:bg-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                title="Student story video"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
