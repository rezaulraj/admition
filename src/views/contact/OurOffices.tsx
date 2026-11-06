"use client";

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

type Country = "uk" | "bangladesh" | "india" | "nepal";

type Office = {
  id: string;
  country: Country;
  countryLabel: string;
  flag: string;
  name: string;
  city: string;
  timeZone: string;
  addressLines: string[];
  phone: string;
  email: string;
  accent: string;
};

const offices: Office[] = [
  //   {
  //     id: "uk-london",
  //     country: "uk",
  //     countryLabel: "United Kingdom",
  //     flag: "🇬🇧",
  //     name: "UK Office",
  //     city: "London",
  //     timeZone: "Europe/London",
  //     addressLines: [
  //       "Kirkdale House, 7 Kirkdale Road",
  //       "London, England, E11 1HP",
  //       "United Kingdom",
  //     ],
  //     phone: "+44 7465 268767",
  //     email: "info@admissiononboard.com",
  //     accent: "#2F5DA8",
  //   },
  //   {
  //     id: "bd-dhaka",
  //     country: "bangladesh",
  //     countryLabel: "Bangladesh",
  //     flag: "🇧🇩",
  //     name: "Dhaka Office, Sector 3",
  //     city: "Dhaka",
  //     timeZone: "Asia/Dhaka",
  //     addressLines: [
  //       "Plot-34, H M Plaza, 4th Floor",
  //       "Sector-03, Uttara, Dhaka-1229",
  //       "Bangladesh",
  //     ],
  //     phone: "+8801906499741",
  //     email: "dhaka@admissiononboard.com",
  //     accent: "#1366E0",
  //   },
  {
    id: "bd-dhaka-sector10",
    country: "bangladesh",
    countryLabel: "Bangladesh",
    flag: "🇧🇩",
    name: "Dhaka Office",
    city: "Dhaka",
    timeZone: "Asia/Dhaka",
    addressLines: [
      "Plot-34, H M Plaza, 4th Floor",
      "Sector-03, Uttara, Dhaka-1230",
      "Bangladesh",
    ],
    phone: "+8801602065622",
    email: "dhaka@admissiononboard.com",
    accent: "#7A4FBF",
  },
  //   {
  //     id: "bd-sylhet",
  //     country: "bangladesh",
  //     countryLabel: "Bangladesh",
  //     flag: "🇧🇩",
  //     name: "Sylhet Office",
  //     city: "Sylhet",
  //     timeZone: "Asia/Dh
  // aka",
  //     addressLines: [
  //       "3rd Floor, Ananda Tower",
  //       "Jail Road, Sylhet",
  //       "Bangladesh",
  //     ],
  //     phone: "+8801906499742",
  //     email: "sylhet@admissiononboard.com",
  //     accent: "#59B226",
  //   },
  {
    id: "india-office",
    country: "india",
    countryLabel: "India",
    flag: "🇮🇳",
    name: "India Office",
    city: "Delhi",
    timeZone: "Asia/Kolkata",
    addressLines: [
      "Holding No # 1301, Gali No # 13, Govindpuri, Kaikaji,",
      "New Delhi, Delhi, Pin - 110019,",
      "India",
    ],
    phone: "+918384021020",
    email: "india@admissiononboard.com",
    accent: "#59B226",
  },
  //   {
  //     id: "np-kathmandu",
  //     country: "nepal",
  //     countryLabel: "Nepal",
  //     flag: "🇳🇵",
  //     name: "Nepal Office",
  //     city: "Kathmandu",
  //     timeZone: "Asia/Kathmandu",
  //     addressLines: [
  //       "100 Katyani Marg",
  //       "Bagmati Province 44600",
  //       "Kathmandu, Nepal",
  //     ],
  //     phone: "+977 982-8416761",
  //     email: "kathmandu@admissiononboard.com",
  //     accent: "#B8862B",
  //   },
];

const filters: { key: "all" | Country; label: string; icon: string }[] = [
  { key: "all", label: "All", icon: "🌐" },
  { key: "uk", label: "UK", icon: "🇬🇧" },
  { key: "bangladesh", label: "Bangladesh", icon: "🇧🇩" },
  { key: "india", label: "India", icon: "🇮🇳" },
  { key: "nepal", label: "Nepal", icon: "🇳🇵" },
];

// Only offer filters for countries that still have an office listed
const visibleFilters = filters.filter(
  (f) => f.key === "all" || offices.some((o) => o.country === f.key),
);
const countryCount = visibleFilters.length - 1;

/** Re-renders every 30s so each card can show the office's local time. */
function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    const frame = requestAnimationFrame(tick); // first update, in a callback
    const t = setInterval(tick, 30_000);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(t);
    };
  }, []);
  return now;
}

function localTime(now: Date | null, timeZone: string) {
  if (!now) return null;
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);
}

function mapsUrl(office: Office) {
  const q = encodeURIComponent(office.addressLines.join(", "));
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/* ---------- South Asia dot map ----------
 * Equirectangular projection of lon 60°E–100°E, lat 8°N–34.5°N onto a 600×300 viewBox.
 * Land is a hand-simplified coastline; dots are laid on a grid wherever they fall on land.
 */
const MAP = { w: 600, h: 300, lon0: 60, lon1: 100, lat0: 8, lat1: 34.5 };
const project = (lon: number, lat: number) => ({
  x: ((lon - MAP.lon0) / (MAP.lon1 - MAP.lon0)) * MAP.w,
  y: ((MAP.lat1 - lat) / (MAP.lat1 - MAP.lat0)) * MAP.h,
});

// [lon, lat] coastline of the mainland inside the window (top edge → east → around the peninsula → west edge)
const MAINLAND: [number, number][] = [
  [60, 34.5], [100, 34.5], [100, 14], [98.6, 14], [98, 16], [97.5, 16.6], [96.2, 16.8], [95.2, 15.8], [94.3, 16.1], [94.5, 18.4],
  [93.6, 19.9], [92.4, 21], [91.8, 22.3], [91.1, 22.7], [90.5, 22.1], [89.5, 21.8], [88.2, 21.6], [87, 21.3], [86.5, 20.3],
  [85.2, 19.4], [84, 18.2], [82.6, 17], [81.6, 16.1], [80.3, 15.6], [80.2, 13.2], [79.8, 11.1], [79.3, 10.3], [78.2, 8.9],
  [77.5, 8], [76.6, 8.8], [76.1, 10], [75.6, 11.7], [74.8, 13], [74.1, 15], [73.3, 17], [72.8, 19], [72.7, 21], [72.3, 21.8],
  [70.6, 20.8], [69.1, 22.3], [68.6, 23.4], [67.1, 24.7], [65, 25.3], [62.2, 25.1], [60, 25.4],
];
const SRI_LANKA: [number, number][] = [[79.8, 9.8], [80.3, 9.7], [81, 8.8], [81.3, 8], [79.9, 8], [79.8, 9]];

function inside([x, y]: [number, number], poly: [number, number][]) {
  let hit = false;
  for (let a = 0, b = poly.length - 1; a < poly.length; b = a++) {
    const [xa, ya] = poly[a];
    const [xb, yb] = poly[b];
    if (ya > y !== yb > y && x < ((xb - xa) * (y - ya)) / (yb - ya) + xa) hit = !hit;
  }
  return hit;
}

const DOT_STEP = 9;
const LAND_DOTS: { x: number; y: number }[] = [];
for (let y = DOT_STEP / 2; y < MAP.h; y += DOT_STEP) {
  for (let x = DOT_STEP / 2; x < MAP.w; x += DOT_STEP) {
    const lon = MAP.lon0 + (x / MAP.w) * (MAP.lon1 - MAP.lon0);
    const lat = MAP.lat1 - (y / MAP.h) * (MAP.lat1 - MAP.lat0);
    if (inside([lon, lat], MAINLAND) || inside([lon, lat], SRI_LANKA)) LAND_DOTS.push({ x, y });
  }
}

const MAP_LABELS = [
  { text: "INDIA", lon: 78.5, lat: 21.5, size: 15, spacing: "0.5em" },
  { text: "NEPAL", lon: 84.2, lat: 27.2, size: 9, spacing: "0.3em" },
  { text: "Arabian Sea", lon: 65.5, lat: 15.5, size: 11, spacing: "0.12em", sea: true },
  { text: "Bay of Bengal", lon: 88.6, lat: 15.2, size: 11, spacing: "0.12em", sea: true },
];

/** Airport-style codes + real coordinates for every office we may list */
const PLACES: Record<string, { code: string; lon: number; lat: number }> = {
  "uk-london": { code: "LON", lon: 61, lat: 31 }, // off the map: parked in the north-west corner
  "bd-dhaka": { code: "DAC", lon: 90.4, lat: 23.8 },
  "bd-dhaka-sector10": { code: "DAC", lon: 90.4, lat: 23.8 },
  "bd-sylhet": { code: "ZYL", lon: 91.9, lat: 24.9 },
  "india-office": { code: "DEL", lon: 77.2, lat: 28.6 },
  "np-kathmandu": { code: "KTM", lon: 85.3, lat: 27.7 },
};
const placeOf = (o: Office) => {
  const p = PLACES[o.id] ?? { code: o.city.slice(0, 3).toUpperCase(), lon: 80, lat: 22 };
  return { code: p.code, ...project(p.lon, p.lat) };
};

/** Weekday in the office's time zone, e.g. "Thu" */
function localDay(now: Date | null, timeZone: string) {
  if (!now) return null;
  return new Intl.DateTimeFormat("en-GB", { timeZone, weekday: "short" }).format(now);
}

function RouteMap({ list }: { list: Office[] }) {
  const pts = list.map((o) => ({ o, ...placeOf(o) }));
  const arcs = pts.slice(1).map((p, i) => {
    const a = pts[i];
    const mx = (a.x + p.x) / 2;
    const my = Math.min(a.y, p.y) - 60;
    return { id: `route-${i}`, d: `M${a.x} ${a.y} Q${mx} ${my} ${p.x} ${p.y}` };
  });

  return (
    <div data-map className="relative mx-auto mt-10 max-w-5xl overflow-hidden rounded-[2rem] bg-[radial-gradient(ellipse_at_30%_20%,#24386E,#14213D_55%,#0E1830)] shadow-[0_40px_80px_-45px_rgba(20,33,61,0.7)]">
      <div aria-hidden className="absolute -right-24 -top-24 size-72 rounded-full bg-[#2F6BFF]/25 blur-[90px]" />
      <div aria-hidden className="absolute -bottom-24 -left-16 size-64 rounded-full bg-[#F7931E]/20 blur-[90px]" />
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-6 pt-6 sm:px-8">
        <p className="font-display text-lg font-semibold text-white">Our network</p>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
          {list.length} {list.length === 1 ? "office" : "offices"} · live local time
        </p>
      </div>
      <svg viewBox={`0 0 ${MAP.w} ${MAP.h}`} className="relative mt-2 h-auto w-full" role="img" aria-label="Map of South Asia showing Admission OnBoard offices">
        <defs>
          <radialGradient id="oo-glow">
            <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Land as dots */}
        <g>
          {LAND_DOTS.map((d, i) => (
            <circle key={i} data-land cx={d.x} cy={d.y} r="1.6" fill="#BFD0FF" fillOpacity="0.32" />
          ))}
        </g>

        {/* Map labels */}
        {MAP_LABELS.map((l) => {
          const { x, y } = project(l.lon, l.lat);
          return (
            <text
              key={l.text}
              data-map-label
              x={x}
              y={y}
              textAnchor="middle"
              fill="#fff"
              fillOpacity={l.sea ? 0.28 : 0.22}
              fontSize={l.size}
              fontWeight={l.sea ? 500 : 700}
              fontStyle={l.sea ? "italic" : "normal"}
              letterSpacing={l.spacing}>
              {l.text}
            </text>
          );
        })}

        {/* Soft light around each office */}
        {pts.map((p) => (
          <circle key={`glow-${p.o.id}`} cx={p.x} cy={p.y} r="46" fill="url(#oo-glow)" opacity="0.35" />
        ))}

        {arcs.map((a) => (
          <g key={a.id}>
            <path d={a.d} fill="none" stroke="#fff" strokeOpacity="0.12" strokeWidth="6" strokeLinecap="round" />
            <path id={a.id} data-route d={a.d} fill="none" stroke="#F7931E" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        ))}
        {arcs[0] && (
          <g data-plane>
            <path d="M-9 -6 L10 0 L-9 6 L-5 0 Z" fill="#fff" />
          </g>
        )}
        {pts.map((p) => (
          <g key={p.o.id} transform={`translate(${p.x} ${p.y})`}>
            <circle data-ping r="14" fill={p.o.accent} fillOpacity="0.4" />
            <circle r="6" fill={p.o.accent} stroke="#fff" strokeWidth="2.5" />
            <g data-pin-label>
              <rect x="-50" y="-46" width="100" height="30" rx="15" fill="#fff" />
              <text x="0" y="-26.5" textAnchor="middle" className="fill-[#14213D]" fontSize="11.5" fontWeight="700" letterSpacing="0.06em">
                {p.code} · {p.o.city}
              </text>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function OurOffices() {
  const [active, setActive] = useState<"all" | Country>("all");
  const now = useNow();
  const root = useRef<HTMLElement>(null);
  const filteredOnce = useRef(false);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: offices.length };
    offices.forEach((o) => (c[o.country] = (c[o.country] ?? 0) + 1));
    return c;
  }, []);

  const filtered = useMemo(() => {
    const base = active === "all" ? offices : offices.filter((o) => o.country === active);
    // Defensive dedupe: no two rendered cards can share an id.
    const seen = new Set<string>();
    return base.filter((o) => {
      if (seen.has(o.id)) return false;
      seen.add(o.id);
      return true;
    });
  }, [active]);

  /* ---------- Section + map motion (once) ---------- */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: el, start: "top 78%", once: true } })
        .fromTo(q("[data-eyebrow]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
        .fromTo(q("[data-word]"), { autoAlpha: 0, yPercent: 110, rotate: 4 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.07 }, 0.1)
        .fromTo(q("[data-sub], [data-filters]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.4);

      const map = q("[data-map]")[0];
      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: map, start: "top 82%", once: true } })
        .fromTo(map, { autoAlpha: 0, y: 50, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.2 }, 0)
        .fromTo(
          q("[data-land]"),
          { opacity: 0, scale: 0, transformOrigin: "50% 50%" },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            // Ripple outward from the nearest office
            stagger: (_i: number, dot: Element) => {
              const cx = Number(dot.getAttribute("cx"));
              const cy = Number(dot.getAttribute("cy"));
              const d = Math.min(...offices.map((o) => Math.hypot(placeOf(o).x - cx, placeOf(o).y - cy)));
              return d * 0.0035;
            },
          },
          0.15,
        )
        .fromTo(q("[data-map-label]"), { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.1 }, 0.8)
        .fromTo(q("[data-route]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.6, ease: "power2.inOut" }, 0.9)
        .fromTo(q("[data-pin-label]"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "back.out(2)" }, 1.5);

      // Pins pulse, the plane keeps flying the route
      gsap.fromTo(q("[data-ping]"), { scale: 0.6, opacity: 0.7 }, { scale: 2, opacity: 0, duration: 2, repeat: -1, stagger: 0.5, ease: "power1.out", transformOrigin: "50% 50%" });
      if (q("#route-0").length) {
        gsap.to(q("[data-plane]"), {
          motionPath: { path: "#route-0", align: "#route-0", alignOrigin: [0.5, 0.5], autoRotate: true },
          duration: 4,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    });

    return () => mm.revert();
  }, []);

  /* ---------- Office cards: rise in on scroll / when the filter changes, spotlight + tilt on hover ---------- */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();
    const first = !filteredOnce.current;

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const st = first ? { scrollTrigger: { trigger: q("[data-cards]")[0], start: "top 82%", once: true } } : {};
      gsap
        .timeline({ defaults: { ease: "expo.out" }, ...st })
        .fromTo(q("[data-office]"), { autoAlpha: 0, y: 60, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, stagger: 0.14 }, 0)
        .fromTo(q("[data-city]"), { autoAlpha: 0, yPercent: 70 }, { autoAlpha: 1, yPercent: 0, duration: 0.9, stagger: 0.14 }, 0.2)
        .fromTo(q("[data-row]"), { autoAlpha: 0, x: -18 }, { autoAlpha: 1, x: 0, duration: 0.7, stagger: 0.06 }, 0.4)
        .fromTo(q("[data-actions]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.14 }, 0.7);
    });

    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const offs = (q("[data-office]") as HTMLElement[]).map((card) => {
        const rx = gsap.quickTo(card, "rotationX", { duration: 0.7, ease: "power3.out" });
        const ry = gsap.quickTo(card, "rotationY", { duration: 0.7, ease: "power3.out" });
        gsap.set(card, { transformPerspective: 1200 });
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          ry((px - 0.5) * 6);
          rx((0.5 - py) * 4);
          // Spotlight follows the pointer (read by the card's CSS)
          card.style.setProperty("--mx", `${px * 100}%`);
          card.style.setProperty("--my", `${py * 100}%`);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        return () => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        };
      });
      return () => offs.forEach((off) => off());
    });

    return () => mm.revert();
  }, [active]);

  return (
    <section ref={root} className="offices relative w-full overflow-hidden bg-[#FFFEFA] px-6 py-20 sm:py-24">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .offices [data-eyebrow], .offices [data-word], .offices [data-sub], .offices [data-filters], .offices [data-map], .offices [data-pin-label] { visibility: hidden; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .offices [data-office], .offices [data-row], .offices [data-actions] { visibility: hidden; }
        }
        /* Layout kept here so it never depends on Tailwind generating new class names */
        .offices .office-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.75rem; margin: 2.5rem auto 0; perspective: 1400px; }
        .offices .office-grid.is-two { max-width: 64rem; }
        .offices .office-grid.is-one { max-width: 32rem; }
        @media (min-width: 768px) { .offices .office-grid.is-two { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        .offices .office-card { --mx: 50%; --my: 0%; }
        .offices .office-card::before {
          content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; opacity: 0; transition: opacity .4s ease;
          background: radial-gradient(420px circle at var(--mx) var(--my), color-mix(in srgb, var(--accent) 14%, transparent), transparent 60%);
        }
        .offices .office-card:hover::before { opacity: 1; }
        .offices .office-city { font-size: clamp(2.4rem, 4.2vw, 3.4rem); }
      `}</style>

      <div className="mx-auto max-w-3xl text-center">
        <span data-eyebrow className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-[#2F6BFF]">
          <span className="h-3.5 w-4 bg-[#2F6BFF] [clip-path:polygon(0_0,65%_0,100%_50%,65%_100%,0_100%)]" />
          Visit us
        </span>
        <h2 className="font-display mt-3 text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.035em] text-[#14213D] sm:text-5xl lg:text-[3.6rem]">
          <span className="mr-[0.24em] inline-block overflow-hidden pb-[0.08em] align-top">
            <span data-word className="inline-block">
              Our
            </span>
          </span>
          <span className="inline-block overflow-hidden pb-[0.08em] align-top">
            <span data-word className="inline-block text-[#F7931E]">
              offices
            </span>
          </span>
        </h2>
        <p data-sub className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#4A5268] sm:text-base">
          {offices.length} {offices.length === 1 ? "office" : "offices"} across {countryCount} {countryCount === 1 ? "country" : "countries"}. Visit,
          call or email the Admission OnBoard team nearest to you.
        </p>

        {/* Filter pills (hidden when only one country is left) */}
        <div
          data-filters
          role="group"
          aria-label="Filter offices by country"
          className={`mt-8 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-[#ECECEC] bg-white p-1.5 shadow-sm ${
            countryCount > 1 ? "" : "hidden"
          }`}>
          {visibleFilters.map((f) => {
            const isActive = active === f.key;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  filteredOnce.current = true;
                  setActive(f.key);
                }}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6BFF] focus-visible:ring-offset-2 ${
                  isActive ? "bg-[#14213D] text-white shadow-md" : "text-[#6B6B6B] hover:bg-[#EEF4FE] hover:text-[#14213D]"
                }`}>
                {f.key === "all" ? (
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <Flag country={f.key} className="h-3.5 w-5" />
                )}
                {f.label}
                <span className={`rounded-full px-1.5 text-xs tabular-nums ${isActive ? "bg-white/25 text-white" : "bg-[#F3F3F3] text-[#8A8A8A]"}`}>
                  {counts[f.key] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <RouteMap list={offices} />

      {/* Office cards (a lone card is centred) */}
      <div data-cards key={active} className={`office-grid ${filtered.length === 1 ? "is-one" : "is-two"}`}>
        {filtered.map((office) => {
          const time = localTime(now, office.timeZone);
          const day = localDay(now, office.timeZone);
          const tel = `tel:${office.phone.replace(/[\s-]+/g, "")}`;
          return (
            <article
              key={office.id}
              data-office
              className="office-card group relative flex flex-col overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white p-6 shadow-[0_24px_60px_-40px_rgba(20,33,61,0.5)] transition-shadow duration-500 hover:shadow-[0_36px_70px_-38px_rgba(20,33,61,0.55)] sm:p-8"
              style={{ "--accent": office.accent } as CSSProperties}>
              {/* Soft accent glow + faint flag */}
              <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full opacity-25 blur-3xl" style={{ background: office.accent }} />
              <span aria-hidden className="pointer-events-none absolute -right-6 w-32 rotate-6 opacity-[0.07]" style={{ top: "4.75rem" }}>
                <Flag country={office.country} className="h-auto w-full" />
              </span>

              {/* Top row */}
              <div className="relative flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#F5F7FB] py-1.5 pl-1.5 pr-3.5 ring-1 ring-black/[0.04]">
                  <Flag country={office.country} className="h-4 w-6" />
                  <span className="text-xs font-semibold text-[#14213D]">{office.countryLabel}</span>
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#14213D] px-3.5 py-1.5 text-xs font-semibold text-white">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full opacity-70" style={{ background: office.accent }} />
                    <span className="relative inline-flex size-2 rounded-full" style={{ background: office.accent }} />
                  </span>
                  <span className="tabular-nums">{time ?? "--:--"}</span>
                  {day && <span className="text-white/50">· {day}</span>}
                </span>
              </div>

              {/* City */}
              <div className="relative mt-7 overflow-hidden">
                <h3 data-city className="office-city font-display font-semibold leading-none tracking-[-0.035em] text-[#14213D]">
                  {office.city}
                  <span style={{ color: office.accent }}>.</span>
                </h3>
              </div>
              <p className="relative mt-2 text-sm font-medium text-[#4A5268]">{office.name}</p>

              {/* Contact rows */}
              <div className="relative mt-7 flex flex-col gap-1.5 border-t border-black/[0.06] pt-5 text-sm">
                <a
                  data-row
                  href={mapsUrl(office)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/row flex items-start gap-3 rounded-2xl p-2.5 transition-colors duration-300 hover:bg-[#F5F7FB]">
                  <IconTile accent={office.accent}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.5-4.5-7-8.25-7-11.5A7 7 0 0 1 12 2.5a7 7 0 0 1 7 7c0 3.25-2.5 7-7 11.5Z" />
                    <circle cx="12" cy="9.5" r="2.3" />
                  </IconTile>
                  <address className="flex-1 not-italic leading-relaxed text-[#4A4A4A]">
                    {office.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </a>
                <a data-row href={tel} className="group/row flex items-center gap-3 rounded-2xl p-2.5 font-medium text-[#14213D] transition-colors duration-300 hover:bg-[#F5F7FB]">
                  <IconTile accent={office.accent}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.5 5.5c0-1 .8-1.8 1.8-1.8H8l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v2.7c0 1-.8 1.8-1.8 1.8C10.5 18.7 5.3 13.5 3.5 7.3V5.5Z"
                    />
                  </IconTile>
                  <span className="flex-1">{office.phone}</span>
                  <svg viewBox="0 0 24 24" className="size-4 -translate-x-1 text-[#14213D]/40 opacity-0 transition-all duration-300 group-hover/row:translate-x-0 group-hover/row:opacity-100" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a data-row href={`mailto:${office.email}`} className="group/row flex items-center gap-3 rounded-2xl p-2.5 font-medium text-[#14213D] transition-colors duration-300 hover:bg-[#F5F7FB]">
                  <IconTile accent={office.accent}>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
                  </IconTile>
                  <span className="flex-1 break-all">{office.email}</span>
                  <svg viewBox="0 0 24 24" className="size-4 -translate-x-1 text-[#14213D]/40 opacity-0 transition-all duration-300 group-hover/row:translate-x-0 group-hover/row:opacity-100" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              {/* Actions */}
              <div data-actions className="relative mt-6 grid grid-cols-2 gap-3">
                <a
                  href={mapsUrl(office)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-black/10 py-3.5 text-sm font-semibold text-[#14213D] transition-[border-color,background-color] duration-300 hover:border-black/20 hover:bg-[#F5F7FB]">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 4-6 2.5v13L9 17l6 2.5 6-2.5V4l-6 2.5L9 4Zm0 0v13m6-10.5v13" />
                  </svg>
                  Directions
                </a>
                <a
                  href={tel}
                  className="group/call flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold text-white shadow-lg transition-[filter,translate] duration-300 hover:-translate-y-0.5 hover:brightness-110"
                  style={{ backgroundColor: office.accent, boxShadow: `0 14px 28px -14px ${office.accent}` }}>
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover/call:rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.5 5.5c0-1 .8-1.8 1.8-1.8H8l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v2.7c0 1-.8 1.8-1.8 1.8C10.5 18.7 5.3 13.5 3.5 7.3V5.5Z"
                    />
                  </svg>
                  Call {office.city}
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function IconTile({ accent, children }: { accent: string; children: ReactNode }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${accent}14` }} aria-hidden>
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth={2}>
        {children}
      </svg>
    </span>
  );
}

/**
 * Inline SVG flags. Emoji flags don't render on Windows (they show as "GB",
 * "BD", "NP"), so we draw them ourselves for consistent display everywhere.
 */
function Flag({
  country,
  className = "",
  title,
}: {
  country: Country;
  className?: string;
  title?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const a11y = title
    ? { role: "img" as const, "aria-label": title }
    : { "aria-hidden": true };

  if (country === "uk") {
    return (
      <svg
        viewBox="0 0 60 30"
        preserveAspectRatio="xMidYMid meet"
        className={className}
        {...a11y}
      >
        <clipPath id={`uk-s-${uid}`}>
          <rect width="60" height="30" rx="2" />
        </clipPath>
        <clipPath id={`uk-t-${uid}`}>
          <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
        </clipPath>
        <g clipPath={`url(#uk-s-${uid})`}>
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path
            d="M0,0 L60,30 M60,0 L0,30"
            clipPath={`url(#uk-t-${uid})`}
            stroke="#C8102E"
            strokeWidth="4"
          />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </svg>
    );
  }

  if (country === "bangladesh") {
    return (
      <svg
        viewBox="0 0 50 30"
        preserveAspectRatio="xMidYMid meet"
        className={className}
        {...a11y}
      >
        <rect width="50" height="30" rx="2" fill="#006A4E" />
        <circle cx="22.5" cy="15" r="10" fill="#F42A41" />
      </svg>
    );
  }

  if (country === "india") {
    return (
      <svg
        viewBox="0 0 90 60"
        preserveAspectRatio="xMidYMid meet"
        className={className}
        {...a11y}
      >
        <clipPath id={`in-${uid}`}>
          <rect width="90" height="60" rx="3" />
        </clipPath>
        <g clipPath={`url(#in-${uid})`}>
          <rect width="90" height="20" fill="#FF9933" />
          <rect y="20" width="90" height="20" fill="#FFFFFF" />
          <rect y="40" width="90" height="20" fill="#138808" />
          {/* Ashoka Chakra: ring + 24 spokes */}
          <g transform="translate(45 30)" stroke="#000080" fill="none">
            <circle r="8.5" strokeWidth="1.2" />
            <circle r="1.4" fill="#000080" stroke="none" />
            {Array.from({ length: 24 }, (_, i) => (
              <line
                key={i}
                x1="0"
                y1="0"
                x2="0"
                y2="-8.5"
                strokeWidth="0.7"
                transform={`rotate(${i * 15})`}
              />
            ))}
          </g>
        </g>
      </svg>
    );
  }

  // Nepal: the world's only non-rectangular national flag
  return (
    <svg
      viewBox="0 0 100 122"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      {...a11y}
    >
      <path
        d="M3,3 L94,62 L36,62 L94,119 L3,119 Z"
        fill="#DC143C"
        stroke="#003893"
        strokeWidth="5"
        strokeLinejoin="miter"
      />
      {/* Moon */}
      <circle cx="27" cy="44" r="12" fill="#fff" />
      <circle cx="27" cy="38" r="12" fill="#DC143C" />
      <circle cx="27" cy="47" r="5" fill="#fff" />
      {/* Sun */}
      <g fill="#fff" transform="translate(27 94)">
        <rect x="-9" y="-9" width="18" height="18" />
        <rect x="-9" y="-9" width="18" height="18" transform="rotate(30)" />
        <rect x="-9" y="-9" width="18" height="18" transform="rotate(60)" />
      </g>
    </svg>
  );
}
