"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import gsap from "gsap";
import { accentSerif } from "@/lib/fonts";

// Image lives at /public/desination.png (rename both here and in /public if you fix the spelling)
const HERO_IMAGE = "/desination.png";

const stats = [
  { value: "10+", label: "Years of experience" },
  { value: "5,000+", label: "Students placed" },
  { value: "100+", label: "University partners" },
];

type Destination = { name: string; slug: string; code: string };

const destinations: Destination[] = [
  { name: "United Kingdom", slug: "united-kingdom", code: "GB" },
  { name: "Australia", slug: "australia", code: "AU" },
  { name: "New Zealand", slug: "new-zealand", code: "NZ" },
  { name: "Finland", slug: "finland", code: "FI" },
  { name: "Greece", slug: "greece", code: "GR" },
  { name: "Lithuania", slug: "lithuania", code: "LT" },
  { name: "Hungary", slug: "hungary", code: "HU" },
  { name: "Romania", slug: "romania", code: "RO" },
  { name: "Malta", slug: "malta", code: "MT" },
  { name: "Cyprus", slug: "cyprus", code: "CY" },
  { name: "Italy", slug: "italy", code: "IT" },
  { name: "Norway", slug: "norway", code: "NO" },
];

/* The picture is a 5 × 2 collage; these are its tiles, in reading order */
const TILES = destinations.slice(0, 10);

export default function CountryHero() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" }, delay: 0.1 })
        .fromTo(q("[data-ch-eyebrow]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0)
        .fromTo(q("[data-ch-word]"), { autoAlpha: 0, yPercent: 115, rotate: 5 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.12 }, 0.1)
        .fromTo(q("[data-ch-side] > *"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 }, 0.45)
        /* The collage assembles tile by tile, from the centre outwards */
        .fromTo(
          q("[data-ch-tile]"),
          { autoAlpha: 0, yPercent: 40, rotateX: -55, scale: 0.85 },
          { autoAlpha: 1, yPercent: 0, rotateX: 0, scale: 1, duration: 1.3, stagger: { each: 0.07, from: "center", grid: "auto" } },
          0.35,
        )
        .fromTo(q("[data-ch-tile] img"), { scale: 1.35 }, { scale: 1, duration: 1.8, stagger: { each: 0.07, from: "center", grid: "auto" } }, 0.35)
        .fromTo(q("[data-ch-chip]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.04 }, 1.1);

      /* The pictures shift inside their tiles as the pointer moves */
      const pans = q("[data-ch-pan]").map((node) => ({
        x: gsap.quickTo(node, "x", { duration: 0.9, ease: "power3.out" }),
        y: gsap.quickTo(node, "y", { duration: 0.9, ease: "power3.out" }),
      }));
      const mosaic = q("[data-ch-mosaic]")[0] as HTMLElement;
      const move = (e: globalThis.PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const r = mosaic.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        pans.forEach((p) => (p.x(nx * -14), p.y(ny * -10)));
      };
      const leave = () => pans.forEach((p) => (p.x(0), p.y(0)));
      mosaic.addEventListener("pointermove", move);
      mosaic.addEventListener("pointerleave", leave);
      return () => {
        mosaic.removeEventListener("pointermove", move);
        mosaic.removeEventListener("pointerleave", leave);
      };
    });

    return () => mm.revert();
  }, []);

  const onTile = (e: PointerEvent<HTMLAnchorElement>, name: string) => {
    if (e.pointerType === "mouse") setActive(name);
  };

  return (
    <section ref={root} className={`ch relative w-full${active ? " has-active" : ""}`}>
      <style>{`
        .ch { color: #350C0E; margin-top: -7rem; overflow: clip;
          background:
            radial-gradient(45% 40% at 88% 8%, rgba(47,107,255,0.1), transparent 70%),
            radial-gradient(40% 36% at 4% 8%, rgba(247,147,30,0.16), transparent 70%),
            linear-gradient(180deg, #FFEFDD 0%, #FFF6EC 45%, #FFFEFA 100%); }
        .ch .ch-wrap { max-width: var(--page-max); margin: 0 auto; padding: 9.5rem 1.5rem 4.5rem; }

        /* Heading */
        .ch .ch-head { display: grid; gap: 1.75rem; }
        .ch .ch-eyebrow { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0.95rem 0.45rem 0.55rem; border-radius: 999px;
          background: rgba(255,255,255,0.85); border: 1px solid rgba(53,12,14,0.08); font-size: 0.8rem; font-weight: 600; letter-spacing: 0.02em; }
        .ch .ch-eyebrow span { display: grid; place-items: center; width: 1.4rem; height: 1.4rem; border-radius: 999px; background: #2F6BFF; color: #fff; }
        .ch .ch-title { margin-top: 1.3rem; font-size: clamp(2.4rem, 10vw, 3.6rem); line-height: 1.03; letter-spacing: -0.045em; font-weight: 600; }
        .ch .ch-mask { display: block; overflow: hidden; padding: 0.04em 0.1em 0.16em 0; margin: -0.04em 0 -0.16em; }
        .ch .ch-accent { color: #F7931E; font-weight: 400; font-style: italic; letter-spacing: -0.02em; font-size: 1.1em; line-height: 0.95; }
        .ch .ch-copy { font-size: 1rem; line-height: 1.7; color: rgba(53,12,14,0.72); max-width: 32rem; }
        .ch .ch-actions { margin-top: 1.5rem; display: flex; flex-wrap: wrap; align-items: center; gap: 1rem 1.5rem; }
        .ch .ch-btn { display: inline-flex; align-items: center; gap: 0.85rem; padding: 0.45rem 0.45rem 0.45rem 1.5rem; border-radius: 999px;
          background: #350C0E; color: #fff; font-size: 0.95rem; font-weight: 600; transition: background .35s ease, transform .35s cubic-bezier(.22,1,.36,1); }
        .ch .ch-btn:hover { background: #F7931E; transform: translateY(-2px); }
        .ch .ch-btn:focus-visible { outline: 2px solid #F7931E; outline-offset: 3px; }
        .ch .ch-btn i { display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border-radius: 999px; background: rgba(255,255,255,0.16); font-style: normal;
          transition: transform .35s cubic-bezier(.22,1,.36,1); }
        .ch .ch-btn:hover i { transform: rotate(-45deg); }
        .ch .ch-story { display: inline-flex; align-items: center; gap: 0.75rem; font-size: 0.92rem; font-weight: 600; }
        .ch .ch-story i { display: grid; place-items: center; width: 2.6rem; height: 2.6rem; border-radius: 999px; border: 1.5px solid rgba(53,12,14,0.25); font-style: normal;
          transition: transform .35s cubic-bezier(.22,1,.36,1), background .35s ease, color .35s ease, border-color .35s ease; }
        .ch .ch-story:hover i { transform: rotate(45deg); background: #350C0E; border-color: #350C0E; color: #fff; }
        .ch .ch-story small { display: block; font-size: 0.75rem; font-weight: 400; color: rgba(53,12,14,0.55); }
        .ch .ch-stats { margin-top: 1.75rem; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); max-width: 30rem; border-top: 1px solid rgba(53,12,14,0.1); }
        .ch .ch-stats div { padding-top: 1rem; }
        .ch .ch-stats div + div { padding-left: 1rem; border-left: 1px solid rgba(53,12,14,0.1); }
        .ch .ch-stats dd { font-size: 1.6rem; font-weight: 700; letter-spacing: -0.04em; line-height: 1; }
        .ch .ch-stats dt { margin-top: 0.35rem; font-size: 0.75rem; font-weight: 500; color: rgba(53,12,14,0.6); }

        /* Mosaic: each tile shows its own slice of the collage */
        .ch .ch-mosaic { margin-top: 2.75rem; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.6rem; perspective: 1200px;
          --h: 92; --cy: 22; }
        .ch .ch-tile { position: relative; display: block; overflow: hidden; border-radius: 18px; container-type: inline-size; aspect-ratio: 100 / var(--h);
          background: #DCE6F5; transform-origin: 50% 100%; isolation: isolate;
          transition: filter .45s ease, translate .6s cubic-bezier(.22,1,.36,1); }
        .ch .ch-tile:focus-visible { outline: 3px solid #F7931E; outline-offset: 3px; }
        .ch .ch-pan { position: absolute; inset: -6%; }
        /* Zoomed 8% so each tile keeps to its own photo (the collage's photos blend into each other at the edges) */
        .ch .ch-slice { position: absolute; width: 540cqw; height: calc(540cqw * 940 / 1672);
          left: calc(2cqw - var(--c) * 108cqw); top: calc(1cqw - var(--r) * (540cqw * 940 / 1672 / 2) - var(--cy) * 1cqw); }
        .ch .ch-slice img { object-fit: cover; }
        .ch .ch-tile::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, transparent 50%, rgba(53,12,14,0.65) 100%);
          opacity: 0.6; transition: opacity .45s ease; }
        .ch .ch-cap { position: absolute; z-index: 2; left: 0.7rem; right: 0.7rem; bottom: 0.65rem; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;
          color: #fff; font-size: 0.85rem; font-weight: 600; letter-spacing: -0.01em; text-shadow: 0 1px 8px rgba(0,0,0,0.35); }
        .ch .ch-cap i { display: grid; place-items: center; width: 1.9rem; height: 1.9rem; flex: none; border-radius: 999px; background: rgba(255,255,255,0.9); color: #350C0E; font-style: normal;
          font-size: 0.85rem; text-shadow: none; transform: scale(0.6) rotate(-45deg); opacity: 0; transition: transform .45s cubic-bezier(.22,1,.36,1), opacity .3s ease, background .3s ease; }
        .ch .ch-tile:hover::after, .ch .ch-tile.is-on::after { opacity: 1; }
        .ch .ch-tile:hover .ch-cap i, .ch .ch-tile.is-on .ch-cap i { opacity: 1; transform: none; background: #F7931E; color: #fff; }
        .ch .ch-tile::before { content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none; background: rgba(255,246,236,0.55); opacity: 0; transition: opacity .45s ease; }
        .ch.has-active .ch-tile:not(.is-on)::before { opacity: 1; }
        .ch.has-active .ch-tile:not(.is-on) { filter: saturate(0.55); }
        .ch .ch-tile.is-on { translate: 0 -6px; }

        /* Destination chips */
        .ch .ch-chips { margin-top: 1.75rem; display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; }
        .ch .ch-chips > span { margin-right: 0.35rem; font-size: 0.85rem; font-weight: 600; }
        .ch .ch-chip { display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.4rem 0.8rem 0.4rem 0.45rem; border-radius: 999px; background: #fff;
          border: 1px solid rgba(53,12,14,0.1); font-size: 0.8rem; font-weight: 600; color: rgba(53,12,14,0.8); transition: border-color .3s ease, background .3s ease, color .3s ease; }
        .ch .ch-chip:hover, .ch .ch-chip.is-on { border-color: #F7931E; background: #FFF3E6; color: #350C0E; }
        .ch .ch-chip:focus-visible { outline: 2px solid #F7931E; outline-offset: 2px; }
        .ch .ch-flag { display: flex; width: 1.15rem; height: 1.15rem; overflow: hidden; border-radius: 999px; box-shadow: 0 0 0 1px rgba(0,0,0,0.08); }

        @media (prefers-reduced-motion: no-preference) {
          .ch [data-ch-eyebrow], .ch [data-ch-word], .ch [data-ch-side] > *, .ch [data-ch-tile], .ch [data-ch-chip] { visibility: hidden; }
        }

        @media (min-width: 640px) {
          .ch .ch-wrap { padding: 10rem 2rem 5rem; }
          .ch .ch-mosaic { grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 0.75rem; --h: 118; --cy: 4; }
          .ch .ch-copy { font-size: 1.05rem; }
          .ch .ch-cap { font-size: 0.8rem; }
        }
        @media (min-width: 1024px) {
          .ch .ch-wrap { padding: 10rem var(--page-gutter) 5.5rem; }
          .ch .ch-head { grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); align-items: end; gap: 3rem; }
          .ch .ch-title { font-size: clamp(3rem, 4.6vw, 4.5rem); }
          .ch .ch-mosaic { gap: 0.9rem; --h: 104; --cy: 10; }
          .ch .ch-tile { border-radius: 22px; }
          .ch .ch-cap { left: 0.9rem; right: 0.9rem; bottom: 0.85rem; font-size: 0.95rem; }
        }
        @media (min-width: 1024px) and (max-height: 760px) {
          .ch .ch-wrap { padding-top: 8.25rem; }
          .ch .ch-title { font-size: clamp(2.7rem, 3.8vw, 3.6rem); }
          .ch .ch-mosaic { margin-top: 2rem; --h: 88; --cy: 18; }
        }
      `}</style>

      <div className="ch-wrap">
        <div className="ch-head">
          <div>
            <span data-ch-eyebrow className="ch-eyebrow">
              <span aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6}>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.5 2.6 3.5 5.6 3.5 9s-1 6.4-3.5 9c-2.5-2.6-3.5-5.6-3.5-9s1-6.4 3.5-9Z" />
                </svg>
              </span>
              Study destinations
            </span>
            <h1 className="ch-title">
              <span className="ch-mask">
                <span data-ch-word className="inline-block origin-bottom-left">
                  Discover your ideal
                </span>
              </span>
              <span className="ch-mask">
                <span data-ch-word className={`${accentSerif.className} ch-accent inline-block origin-bottom-left`}>
                  study destination,
                </span>
              </span>
              <span className="ch-mask">
                <span data-ch-word className="inline-block origin-bottom-left">
                  built around you.
                </span>
              </span>
            </h1>
          </div>

          <div data-ch-side>
            <p className="ch-copy">
              We connect ambitious students with leading universities abroad, guiding you from your first enquiry to the day
              you land on campus, wherever in the world that may be.
            </p>
            <div className="ch-actions">
              <Link href="/courses" className="ch-btn">
                Visit Our Program
                <i aria-hidden>→</i>
              </Link>
              <Link href="/our-story" className="ch-story">
                <i aria-hidden>↗</i>
                <span>
                  Read our story
                  <small>Built on trust, students and progress</small>
                </span>
              </Link>
            </div>
            <dl className="ch-stats">
              {stats.map((item) => (
                <div key={item.label}>
                  <dd>{item.value}</dd>
                  <dt>{item.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* The collage, one tile per destination */}
        <div data-ch-mosaic className="ch-mosaic" onPointerLeave={() => setActive(null)}>
          {TILES.map((d, i) => (
            <Link
              key={d.slug}
              href={`/countries/${d.slug}`}
              data-ch-tile
              className={`ch-tile${active === d.name ? " is-on" : ""}`}
              aria-label={`Study in ${d.name}`}
              onPointerEnter={(e) => onTile(e, d.name)}
              onFocus={() => setActive(d.name)}
              onBlur={() => setActive(null)}
            >
              <span data-ch-pan className="ch-pan" aria-hidden>
                <span className="ch-slice" style={{ "--c": i % 5, "--r": Math.floor(i / 5) } as CSSProperties}>
                  <Image src={HERO_IMAGE} alt="" fill sizes="(min-width: 640px) 100vw, 250vw" priority={i === 0} />
                </span>
              </span>
              <span className="ch-cap">
                {d.name}
                <i aria-hidden>→</i>
              </span>
            </Link>
          ))}
        </div>

        {/* Every destination, including the ones not in the picture */}
        <div className="ch-chips">
          <span data-ch-chip>Popular destinations</span>
          {destinations.map((d) => (
            <Link
              key={d.slug}
              href={`/countries/${d.slug}`}
              data-ch-chip
              className={`ch-chip${active === d.name ? " is-on" : ""}`}
              onPointerEnter={() => setActive(d.name)}
              onPointerLeave={() => setActive(null)}
            >
              <span className="ch-flag" aria-hidden>
                <ReactCountryFlag countryCode={d.code} svg style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }} />
              </span>
              {d.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
