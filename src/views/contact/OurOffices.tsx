"use client";

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import ReactCountryFlag from "react-country-flag";
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
  /** Main office / headquarters */
  hq?: boolean;
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
  //     phone: "+8801784192780",
  //     email: "dhaka@admissiononboard.com",
  //     accent: "#1366E0",
  //   },
  {
    id: "bd-dhaka-sector10",
    country: "bangladesh",
    countryLabel: "Bangladesh",
    flag: "🇧🇩",
    name: "Head Office · Uttara",
    city: "Dhaka",
    hq: true,
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

/* ---------- Recruitment network (hub-and-spoke from the Dhaka head office) ----------
 * Positions live in a 100 × 75 space (the map keeps a 4:3 shape), loosely following real
 * directions from Dhaka: South Asia close by, Southeast Asia east, Africa far west.
 */
type Node = { name: string; code: string; x: number; y: number; region: "asia" | "africa"; future?: boolean };
const HUB = { x: 60, y: 38 };
const NETWORK: Node[] = [
  { name: "India", code: "IN", x: 40, y: 30, region: "asia" },
  { name: "Nepal", code: "NP", x: 56, y: 11, region: "asia" },
  { name: "Pakistan", code: "PK", x: 33, y: 10, region: "asia" },
  { name: "Sri Lanka", code: "LK", x: 46, y: 61, region: "asia" },
  { name: "Philippines", code: "PH", x: 87, y: 50, region: "asia" },
  { name: "Morocco", code: "MA", x: 11, y: 14, region: "africa" },
  { name: "Algeria", code: "DZ", x: 13, y: 34, region: "africa" },
  { name: "Ghana", code: "GH", x: 12, y: 54, region: "africa" },
  { name: "South Africa", code: "ZA", x: 27, y: 68, region: "africa" },
];
const EXPANDING = [
  { label: "Southeast Asia", x: 86, y: 20 },
  { label: "More of Africa", x: 64, y: 68 },
];
/** Gentle curve from the hub to a node */
const spoke = (n: { x: number; y: number }) => {
  const mx = (HUB.x + n.x) / 2;
  const my = (HUB.y + n.y) / 2 - Math.abs(n.x - HUB.x) * 0.18;
  return `M${HUB.x} ${HUB.y} Q${mx} ${my} ${n.x} ${n.y}`;
};

function NetFlag({ code, name, size = 1 }: { code: string; name: string; size?: number }) {
  return (
    <span className="flex shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/10">
      <ReactCountryFlag
        countryCode={code}
        svg
        aria-label={`Flag of ${name}`}
        style={{ width: `${1.35 * size}em`, height: `${1 * size}em`, display: "block", objectFit: "cover" }}
      />
    </span>
  );
}

function NetworkMap() {
  return (
    <div data-net className="net-panel relative mx-auto mt-16 max-w-6xl sm:mt-20 overflow-hidden rounded-[2.25rem] bg-[radial-gradient(ellipse_at_70%_40%,#24386E_0%,#14213D_55%,#0B1430_100%)] text-white shadow-[0_40px_90px_-45px_rgba(20,33,61,0.75)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_65%_45%,black,transparent_75%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-[#F7931E]/20 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 right-10 size-80 rounded-full bg-[#2F6BFF]/25 blur-[110px]" />

      <div className="net-grid relative">
        {/* Copy */}
        <div className="net-copy">
          <p data-net-text className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FFB25E]">
            <span className="h-3 w-3.5 bg-[#F7931E] [clip-path:polygon(0_0,65%_0,100%_50%,65%_100%,0_100%)]" />
            Our recruitment network
          </p>
          <h3 data-net-text className="font-display mt-4 text-[clamp(1.9rem,3vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Headquartered in <span className="text-[#F7931E]">Bangladesh</span>, connected worldwide.
          </h3>
          <p data-net-text className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
            From our head office in Dhaka, our recruitment network covers India, Nepal, Pakistan, Sri Lanka, Ghana, Morocco, the
            Philippines, Algeria and South Africa, with expanding connections across Africa and Southeast Asia.
          </p>

          <div data-net-text className="mt-7 grid grid-cols-3 gap-3">
            {[
              { value: "1", label: "Head office" },
              { value: String(NETWORK.length), label: "Network countries" },
              { value: "2", label: "Regions growing" },
            ].map((st) => (
              <div key={st.label} className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3 backdrop-blur">
                <p className="font-display text-2xl font-semibold tabular-nums">{st.value}</p>
                <p className="mt-0.5 text-[11px] font-medium leading-tight text-white/60">{st.label}</p>
              </div>
            ))}
          </div>

          {/* Compact chip list (phones, where the map is hidden) */}
          <div className="net-chips mt-6 flex-wrap gap-2">
            {NETWORK.map((n) => (
              <span key={n.code} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold ring-1 ring-white/15">
                <NetFlag code={n.code} name={n.name} />
                {n.name}
              </span>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="net-map relative" aria-label="Network map: Dhaka head office linked to nine countries" role="img">
          <svg viewBox="0 0 100 75" className="absolute inset-0 size-full overflow-visible" aria-hidden>
            {/* orbit rings around the hub */}
            {[14, 24, 36].map((r, i) => (
              <circle
                key={r}
                data-orbit
                cx={HUB.x}
                cy={HUB.y}
                r={r}
                fill="none"
                stroke="#fff"
                strokeOpacity={0.12 - i * 0.025}
                strokeWidth="0.25"
                strokeDasharray={i === 1 ? "0.8 1.4" : undefined}
              />
            ))}
            {NETWORK.map((n, i) => (
              <g key={n.code}>
                <path d={spoke(n)} fill="none" stroke="#fff" strokeOpacity="0.08" strokeWidth="1.2" strokeLinecap="round" />
                <path
                  id={`net-spoke-${i}`}
                  data-spoke
                  d={spoke(n)}
                  fill="none"
                  stroke={n.region === "asia" ? "#F7931E" : "#7FA2FF"}
                  strokeWidth="0.45"
                  strokeLinecap="round"
                />
                <circle data-pulse-dot r="0.8" fill="#fff" />
              </g>
            ))}
            {EXPANDING.map((e) => (
              <path key={e.label} d={spoke(e)} fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="0.35" strokeDasharray="0.9 1.2" />
            ))}
          </svg>

          {/* Hub */}
          <div className="absolute z-20 -translate-x-1/2 -translate-y-1/2" style={{ left: `${HUB.x}%`, top: `${(HUB.y / 75) * 100}%` }}>
            <span data-hub-ring aria-hidden className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F7931E]/30" />
            <span data-hub-ring aria-hidden className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F7931E]/25" />
            <div data-hub className="relative flex items-center gap-2.5 rounded-2xl bg-white py-2 pl-2 pr-4 text-[#350C0E] shadow-[0_18px_40px_-12px_rgba(247,147,30,0.7)]">
              <span className="grid size-9 place-items-center rounded-xl bg-[#F7931E]">
                <NetFlag code="BD" name="Bangladesh" />
              </span>
              <span className="leading-tight">
                <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#E07B0A]">Head office</span>
                <span className="font-display block text-base font-semibold">Dhaka, Bangladesh</span>
              </span>
            </div>
          </div>

          {/* Network countries */}
          {NETWORK.map((n) => (
            <div key={n.code} className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: `${n.x}%`, top: `${(n.y / 75) * 100}%` }}>
              <span
                data-node
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/[0.12] py-1 pl-1 pr-2.5 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-[#350C0E]">
                <NetFlag code={n.code} name={n.name} />
                {n.name}
              </span>
            </div>
          ))}
          {EXPANDING.map((e) => (
            <div key={e.label} className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: `${e.x}%`, top: `${(e.y / 75) * 100}%` }}>
              <span data-node className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-dashed border-white/40 px-2.5 py-1 text-[11px] font-semibold text-white/75">
                <span className="text-[#F7931E]">+</span> {e.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Weekday in the office's time zone, e.g. "Thu" */
function localDay(now: Date | null, timeZone: string) {
  if (!now) return null;
  return new Intl.DateTimeFormat("en-GB", { timeZone, weekday: "short" }).format(now);
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

      // Network panel: rises in, spokes draw out from Dhaka, countries pop in, signals flow along the links
      const net = q("[data-net]")[0];
      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: net, start: "top 80%", once: true } })
        .fromTo(net, { autoAlpha: 0, y: 60, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.2 }, 0)
        .fromTo(q("[data-net-text]"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.25)
        .fromTo(q("[data-hub]"), { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: 0.9, ease: "back.out(2)" }, 0.4)
        .fromTo(q("[data-orbit]"), { scale: 0.3, opacity: 0, svgOrigin: `${HUB.x} ${HUB.y}` }, { scale: 1, opacity: 1, duration: 1.4, stagger: 0.12 }, 0.45)
        .fromTo(q("[data-spoke]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1, stagger: 0.08, ease: "power2.inOut" }, 0.7)
        .fromTo(q("[data-node]"), { autoAlpha: 0, scale: 0.5 }, { autoAlpha: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: "back.out(2.2)" }, 1.1);

      // Signals travel from the head office to every country, on a loop
      q("[data-pulse-dot]").forEach((dot, i) =>
        gsap.fromTo(
          dot,
          { opacity: 0 },
          {
            opacity: 1,
            motionPath: { path: `#net-spoke-${i}`, align: `#net-spoke-${i}`, alignOrigin: [0.5, 0.5] },
            duration: 2.4,
            delay: 1.8 + i * 0.25,
            repeat: -1,
            repeatDelay: 1.2,
            ease: "power1.inOut",
          },
        ),
      );
      // Head office pulses; middle orbit slowly turns
      gsap.fromTo(q("[data-hub-ring]"), { scale: 0.6, opacity: 0.8 }, { scale: 1.9, opacity: 0, duration: 2.4, repeat: -1, stagger: 1.2, ease: "power1.out" });
      gsap.to(q("[data-orbit]")[1], { rotation: 360, svgOrigin: `${HUB.x} ${HUB.y}`, duration: 60, ease: "none", repeat: -1 });
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
          .offices [data-eyebrow], .offices [data-word], .offices [data-sub], .offices [data-filters], .offices [data-net], .offices [data-node], .offices [data-hub] { visibility: hidden; }
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
        .offices .net-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; padding: 2rem 1.5rem; }
        .offices .net-map { display: none; aspect-ratio: 4 / 3; }
        .offices .net-chips { display: flex; }
        @media (min-width: 1024px) {
          .offices .net-grid { grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.25fr); align-items: center; gap: 2.5rem; padding: 3rem 3rem 3rem 3.25rem; }
          .offices .net-map { display: block; }
          .offices .net-chips { display: none; }
        }
        .offices .office-card.is-hq { box-shadow: 0 0 0 2px #F7931E, 0 30px 60px -36px rgba(247,147,30,0.6); }
      `}</style>

      <div className="mx-auto max-w-3xl text-center">
        <span data-eyebrow className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-[#2F6BFF]">
          <span className="h-3.5 w-4 bg-[#2F6BFF] [clip-path:polygon(0_0,65%_0,100%_50%,65%_100%,0_100%)]" />
          Visit us
        </span>
        <h2 className="font-display mt-3 text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.035em] text-[#350C0E] sm:text-5xl lg:text-[3.6rem]">
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
          Our head office is in Dhaka, Bangladesh, with a regional office in Delhi. Visit, call or email the Admission OnBoard team nearest to
          you.
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
                  isActive ? "bg-[#14213D] text-white shadow-md" : "text-[#6B6B6B] hover:bg-[#EEF4FE] hover:text-[#350C0E]"
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
              className={`office-card group relative flex flex-col${office.hq ? " is-hq" : ""} overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white p-6 shadow-[0_24px_60px_-40px_rgba(20,33,61,0.5)] transition-shadow duration-500 hover:shadow-[0_36px_70px_-38px_rgba(20,33,61,0.55)] sm:p-8`}
              style={{ "--accent": office.accent } as CSSProperties}>
              {office.hq && (
                <span className="absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-b-xl bg-[#F7931E] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-md">
                  ★ Head office
                </span>
              )}
              {/* Soft accent glow + faint flag */}
              <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full opacity-25 blur-3xl" style={{ background: office.accent }} />
              <span aria-hidden className="pointer-events-none absolute -right-6 w-32 rotate-6 opacity-[0.07]" style={{ top: "4.75rem" }}>
                <Flag country={office.country} className="h-auto w-full" />
              </span>

              {/* Top row */}
              <div className="relative flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#F5F7FB] py-1.5 pl-1.5 pr-3.5 ring-1 ring-black/[0.04]">
                  <Flag country={office.country} className="h-4 w-6" />
                  <span className="text-xs font-semibold text-[#350C0E]">{office.countryLabel}</span>
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
                <h3 data-city className="office-city font-display font-semibold leading-none tracking-[-0.035em] text-[#350C0E]">
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
                <a data-row href={tel} className="group/row flex items-center gap-3 rounded-2xl p-2.5 font-medium text-[#350C0E] transition-colors duration-300 hover:bg-[#F5F7FB]">
                  <IconTile accent={office.accent}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.5 5.5c0-1 .8-1.8 1.8-1.8H8l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v2.7c0 1-.8 1.8-1.8 1.8C10.5 18.7 5.3 13.5 3.5 7.3V5.5Z"
                    />
                  </IconTile>
                  <span className="flex-1">{office.phone}</span>
                  <svg viewBox="0 0 24 24" className="size-4 -translate-x-1 text-[#350C0E]/40 opacity-0 transition-all duration-300 group-hover/row:translate-x-0 group-hover/row:opacity-100" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a data-row href={`mailto:${office.email}`} className="group/row flex items-center gap-3 rounded-2xl p-2.5 font-medium text-[#350C0E] transition-colors duration-300 hover:bg-[#F5F7FB]">
                  <IconTile accent={office.accent}>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
                  </IconTile>
                  <span className="flex-1 break-all">{office.email}</span>
                  <svg viewBox="0 0 24 24" className="size-4 -translate-x-1 text-[#350C0E]/40 opacity-0 transition-all duration-300 group-hover/row:translate-x-0 group-hover/row:opacity-100" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
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
                  className="flex items-center justify-center gap-2 rounded-2xl border border-black/10 py-3.5 text-sm font-semibold text-[#350C0E] transition-[border-color,background-color] duration-300 hover:border-black/20 hover:bg-[#F5F7FB]">
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

      {/* Then the whole recruitment network around the head office */}
      <NetworkMap />
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
