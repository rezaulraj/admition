"use client";

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
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

/** Airport-style codes + positions on the route map (viewBox 0 20 600 160) for every office we may list */
const PLACES: Record<string, { code: string; x: number; y: number }> = {
  "uk-london": { code: "LON", x: 70, y: 70 },
  "bd-dhaka": { code: "DAC", x: 430, y: 130 },
  "bd-dhaka-sector10": { code: "DAC", x: 430, y: 130 },
  "bd-sylhet": { code: "ZYL", x: 470, y: 112 },
  "india-office": { code: "DEL", x: 220, y: 100 },
  "np-kathmandu": { code: "KTM", x: 330, y: 84 },
};
const placeOf = (o: Office) => PLACES[o.id] ?? { code: o.city.slice(0, 3).toUpperCase(), x: 300, y: 120 };

/** Hour/minute in the office's time zone, for the analog clock */
function clockParts(now: Date | null, timeZone: string) {
  if (!now) return null;
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone, hour: "numeric", minute: "numeric", hour12: false }).formatToParts(now);
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return { hourDeg: ((h % 12) + m / 60) * 30, minuteDeg: m * 6 };
}

function Clock({ now, office }: { now: Date | null; office: Office }) {
  const c = clockParts(now, office.timeZone);
  return (
    <svg viewBox="0 0 40 40" className="size-10 shrink-0" aria-hidden>
      <circle cx="20" cy="20" r="18" fill="#fff" stroke={office.accent} strokeWidth="2" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1="20" y1="4.5" x2="20" y2={i % 3 ? "6.5" : "8"} stroke="#14213D" strokeOpacity="0.35" strokeWidth="1.2" transform={`rotate(${i * 30} 20 20)`} />
      ))}
      {/* React sets the real angles; GSAP only spins this wrapper, so the two never fight */}
      <g data-hands>
        <g transform={`rotate(${c?.hourDeg ?? 0} 20 20)`}>
          <line x1="20" y1="20" x2="20" y2="11" stroke="#14213D" strokeWidth="2.4" strokeLinecap="round" />
        </g>
        <g transform={`rotate(${c?.minuteDeg ?? 0} 20 20)`}>
          <line x1="20" y1="20" x2="20" y2="7" stroke={office.accent} strokeWidth="1.8" strokeLinecap="round" />
        </g>
      </g>
      <circle cx="20" cy="20" r="2" fill={office.accent} />
    </svg>
  );
}

/** Decorative barcode, stable per office */
function Barcode({ seed }: { seed: string }) {
  const bars = Array.from({ length: 34 }, (_, i) => {
    const n = (seed.charCodeAt(i % seed.length) * (i + 7)) % 5;
    return 1 + n * 0.6;
  });
  return (
    <span aria-hidden className="flex h-9 items-end gap-[2px]">
      {bars.map((w, i) => (
        <span key={i} data-bar className="h-full origin-bottom rounded-[1px] bg-[#14213D]" style={{ width: `${w}px`, opacity: i % 7 === 0 ? 0.45 : 0.85 }} />
      ))}
    </span>
  );
}

function RouteMap({ list }: { list: Office[] }) {
  const pts = list.map((o) => ({ o, ...placeOf(o) }));
  const arcs = pts.slice(1).map((p, i) => {
    const a = pts[i];
    const mx = (a.x + p.x) / 2;
    const my = Math.min(a.y, p.y) - 70;
    return { id: `route-${i}`, d: `M${a.x} ${a.y} Q${mx} ${my} ${p.x} ${p.y}` };
  });

  return (
    <div data-map className="relative mx-auto mt-10 max-w-5xl overflow-hidden rounded-[2rem] bg-[linear-gradient(150deg,#1E2F5C,#14213D_60%)] shadow-[0_40px_80px_-45px_rgba(20,33,61,0.7)]">
      <div aria-hidden className="absolute -right-24 -top-24 size-72 rounded-full bg-[#2F6BFF]/30 blur-[90px]" />
      <div aria-hidden className="absolute -bottom-24 -left-16 size-64 rounded-full bg-[#F7931E]/25 blur-[90px]" />
      <div className="relative flex flex-wrap items-center justify-between gap-3 px-6 pt-6 sm:px-8">
        <p className="font-display text-lg font-semibold text-white">Our network</p>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
          {list.length} {list.length === 1 ? "office" : "offices"} · live local time
        </p>
      </div>
      <svg viewBox="0 20 600 160" className="relative h-auto w-full" role="img" aria-label="Map of Admission OnBoard offices">
        <defs>
          <pattern id="oo-dots" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#fff" fillOpacity="0.12" />
          </pattern>
        </defs>
        <rect y="20" width="600" height="160" fill="url(#oo-dots)" />
        {arcs.map((a) => (
          <g key={a.id}>
            <path d={a.d} fill="none" stroke="#fff" strokeOpacity="0.12" strokeWidth="6" strokeLinecap="round" />
            <path id={a.id} data-route d={a.d} fill="none" stroke="#F7931E" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" />
          </g>
        ))}
        {arcs[0] && (
          <g data-plane>
            <path d="M-9 -6 L10 0 L-9 6 L-5 0 Z" fill="#fff" />
          </g>
        )}
        {pts.map((p) => (
          <g key={p.o.id} transform={`translate(${p.x} ${p.y})`}>
            <circle data-ping r="14" fill={p.o.accent} fillOpacity="0.35" />
            <circle r="6" fill={p.o.accent} stroke="#fff" strokeWidth="2.5" />
            <g data-pin-label>
              <rect x="-30" y="-44" width="60" height="24" rx="12" fill="#fff" />
              <text x="0" y="-27.5" textAnchor="middle" className="fill-[#14213D] text-[11px] font-bold tracking-[0.12em]">
                {p.code}
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
        .fromTo(q("[data-route]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.6, ease: "power2.inOut" }, 0.4)
        .fromTo(q("[data-pin-label]"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "back.out(2)" }, 0.9);

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

  /* ---------- Tickets: print in on scroll / when the filter changes, tilt on hover ---------- */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();
    const first = !filteredOnce.current;

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tickets = q("[data-ticket]");
      const st = first ? { scrollTrigger: { trigger: q("[data-tickets]")[0], start: "top 82%", once: true } } : {};
      gsap
        .timeline({ defaults: { ease: "expo.out" }, ...st })
        .fromTo(
          tickets,
          { clipPath: "inset(0% 0% 100% 0% round 28px)", y: -30 },
          { clipPath: "inset(0% 0% 0% 0% round 28px)", y: 0, duration: 1.3, stagger: 0.15, ease: "power4.out", clearProps: "clipPath" },
          0,
        )
        .fromTo(q("[data-code]"), { autoAlpha: 0, yPercent: 60 }, { autoAlpha: 1, yPercent: 0, duration: 0.9, stagger: 0.15 }, 0.35)
        .fromTo(q("[data-bar]"), { scaleY: 0 }, { scaleY: 1, duration: 0.5, stagger: 0.008, ease: "power2.out" }, 0.6)
        .fromTo(q("[data-detail]"), { autoAlpha: 0, x: -16 }, { autoAlpha: 1, x: 0, duration: 0.7, stagger: 0.06 }, 0.5);

      // Clock hands spin a full turn and land on the real local time
      gsap.fromTo(
        q("[data-hands]"),
        { rotation: -360 },
        {
          rotation: 0,
          duration: 1.6,
          ease: "power3.out",
          svgOrigin: "20 20",
          ...(first ? { scrollTrigger: { trigger: q("[data-tickets]")[0], start: "top 82%", once: true } } : {}),
        },
      );
    });

    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const offs = (q("[data-ticket]") as HTMLElement[]).map((card) => {
        const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
        gsap.set(card, { transformPerspective: 1100 });
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 8);
          rx((0.5 - (e.clientY - r.top) / r.height) * 6);
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
    // `now` only changes the clock angles; re-running would replay the print animation
  }, [active]);

  return (
    <section ref={root} className="offices relative w-full overflow-hidden bg-[#FFFEFA] px-6 py-20 sm:py-24">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .offices [data-eyebrow], .offices [data-word], .offices [data-sub], .offices [data-filters], .offices [data-map], .offices [data-pin-label] { visibility: hidden; }
        }
        /* Ticket notches on the tear line */
        .offices .ticket-notch::before, .offices .ticket-notch::after {
          content: ""; position: absolute; top: 50%; width: 26px; height: 26px; margin-top: -13px; border-radius: 9999px; background: #FFFEFA;
          box-shadow: inset 0 0 0 1px #ECECEC;
        }
        .offices .ticket-notch::before { left: -13px; }
        .offices .ticket-notch::after { right: -13px; }
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

      {/* Boarding-pass cards (a lone card is centred) */}
      <div data-tickets key={active} className={`mx-auto mt-10 grid grid-cols-1 gap-8 [perspective:1400px] ${filtered.length === 1 ? "max-w-lg" : "max-w-5xl md:grid-cols-2"}`}>
        {filtered.map((office) => {
          const time = localTime(now, office.timeZone);
          const place = placeOf(office);
          const tel = `tel:${office.phone.replace(/[\s-]+/g, "")}`;
          return (
            <article
              key={office.id}
              data-ticket
              className="relative flex flex-col rounded-[28px] border border-[#ECECEC] bg-white shadow-[0_30px_60px_-38px_rgba(20,33,61,0.55)] transition-shadow duration-500 hover:shadow-[0_40px_70px_-36px_rgba(20,33,61,0.6)]">
              {/* Stub */}
              <header
                className="relative overflow-hidden rounded-t-[28px] px-6 pb-6 pt-5 sm:px-7"
                style={{ background: `linear-gradient(135deg, ${office.accent}1F 0%, ${office.accent}08 100%)` }}>
                <span aria-hidden className="absolute -right-10 -top-10 size-40 rounded-full opacity-20 blur-2xl" style={{ background: office.accent }} />
                <div className="relative flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#14213D]/50">Admission OnBoard · Office pass</span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1.5 pr-3 shadow-sm ring-1 ring-[#ECECEC]">
                    <Flag country={office.country} className="h-4 w-6" />
                    <span className="text-xs font-semibold text-[#14213D]">{office.countryLabel}</span>
                  </span>
                </div>

                <div className="relative mt-5 flex items-end justify-between gap-4">
                  <div className="overflow-hidden">
                    <p data-code className="font-display text-[3.6rem] font-semibold leading-none tracking-[-0.03em] sm:text-7xl" style={{ color: office.accent }}>
                      {place.code}
                    </p>
                    <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight text-[#14213D]">{office.city}</h3>
                    <p className="text-sm text-[#4A5268]">{office.name}</p>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-2xl bg-white/85 py-2 pl-2 pr-3.5 shadow-sm ring-1 ring-[#ECECEC] backdrop-blur">
                    <Clock now={now} office={office} />
                    <span className="leading-tight">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#14213D]/45">Local time</span>
                      <span className="block text-sm font-semibold tabular-nums text-[#14213D]">{time ?? "--:--"}</span>
                    </span>
                  </div>
                </div>
              </header>

              {/* Tear line */}
              <div aria-hidden className="ticket-notch relative h-0">
                <span className="absolute inset-x-6 top-0 border-t-2 border-dashed border-[#E4E7EE]" />
              </div>

              {/* Details */}
              <div className="flex flex-1 flex-col gap-4 px-6 py-6 text-sm sm:px-7">
                <div data-detail className="flex items-start gap-3">
                  <IconTile accent={office.accent}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.5-4.5-7-8.25-7-11.5A7 7 0 0 1 12 2.5a7 7 0 0 1 7 7c0 3.25-2.5 7-7 11.5Z" />
                    <circle cx="12" cy="9.5" r="2.3" />
                  </IconTile>
                  <address className="not-italic leading-relaxed text-[#4A4A4A]">
                    {office.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>

                <a data-detail href={tel} className="group flex items-center gap-3 rounded-xl font-medium text-[#14213D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6BFF]">
                  <IconTile accent={office.accent}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.5 5.5c0-1 .8-1.8 1.8-1.8H8l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v2.7c0 1-.8 1.8-1.8 1.8C10.5 18.7 5.3 13.5 3.5 7.3V5.5Z"
                    />
                  </IconTile>
                  <span className="transition-colors group-hover:text-[#2F6BFF]">{office.phone}</span>
                </a>

                <a data-detail href={`mailto:${office.email}`} className="group flex items-center gap-3 rounded-xl font-medium text-[#2F5DA8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6BFF]">
                  <IconTile accent={office.accent}>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
                  </IconTile>
                  <span className="break-all transition-colors group-hover:text-[#2F6BFF]">{office.email}</span>
                </a>

                <div data-detail className="mt-auto flex items-end justify-between gap-4 pt-3">
                  <Barcode seed={office.id} />
                  <span className="text-right text-[10px] font-bold uppercase leading-tight tracking-[0.16em] text-[#14213D]/40">
                    Gate
                    <span className="block font-display text-lg tracking-normal text-[#14213D]">{place.code}-01</span>
                  </span>
                </div>
              </div>

              {/* Actions */}
              <footer className="grid grid-cols-2 overflow-hidden rounded-b-[28px] border-t border-[#F0F0F0]">
                <a
                  href={mapsUrl(office)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 py-4 text-sm font-semibold text-[#14213D] transition-colors hover:bg-[#F7F8FB] focus:outline-none focus-visible:bg-[#F7F8FB]">
                  <svg className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 4-6 2.5v13L9 17l6 2.5 6-2.5V4l-6 2.5L9 4Zm0 0v13m6-10.5v13" />
                  </svg>
                  Get directions
                </a>
                <a
                  href={tel}
                  className="group flex items-center justify-center gap-2 py-4 text-sm font-semibold text-white transition-[filter] hover:brightness-110 focus:outline-none"
                  style={{ backgroundColor: office.accent }}>
                  <svg className="h-4 w-4 transition-transform group-hover:rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.5 5.5c0-1 .8-1.8 1.8-1.8H8l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v2.7c0 1-.8 1.8-1.8 1.8C10.5 18.7 5.3 13.5 3.5 7.3V5.5Z"
                    />
                  </svg>
                  Call {office.city}
                </a>
              </footer>
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
