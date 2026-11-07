"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

type Destination = {
  name: string;
  code: string;
  /** Existing country page, or null → falls back to the all-destinations page */
  page: string | null;
  tagline?: string;
};

const page = (d: Destination) => d.page ?? "/countries";

const destinations: Destination[] = [
  { name: "Australia", code: "AU", page: "/countries/australia", tagline: "World-class universities & post-study work rights" },
  { name: "New Zealand", code: "NZ", page: "/countries/new-zealand", tagline: "Safe, welcoming and globally respected degrees" },
  { name: "UK", code: "GB", page: "/countries/united-kingdom", tagline: "Top-ranked universities & one-year master's" },
  { name: "Canada", code: "CA", page: "/countries/canada", tagline: "Quality education with clear career pathways" },
  { name: "USA", code: "US", page: null, tagline: "From Ivy League to flexible community colleges" },
  { name: "Malaysia", code: "MY", page: null, tagline: "Affordable, English-taught degrees in Asia" },
  { name: "Ireland", code: "IE", page: null, tagline: "Europe's English-speaking tech hub" },
  { name: "South Korea", code: "KR", page: null, tagline: "Innovation, culture and generous scholarships" },
];

const europe: Destination[] = [
  { name: "Sweden", code: "SE", page: null },
  { name: "Finland", code: "FI", page: "/countries/finland" },
  { name: "Cyprus", code: "CY", page: "/countries/cyprus" },
  { name: "Belgium", code: "BE", page: null },
  { name: "Spain", code: "ES", page: null },
  { name: "Hungary", code: "HU", page: "/countries/hungary" },
  { name: "Greece", code: "GR", page: "/countries/greece" },
  { name: "Lithuania", code: "LT", page: "/countries/lithuania" },
  { name: "Romania", code: "RO", page: "/countries/romania" },
  { name: "Malta", code: "MT", page: "/countries/malta" },
  { name: "Italy", code: "IT", page: "/countries/italy" },
  { name: "Norway", code: "NO", page: "/countries/norway" },
];

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/universities", label: "Universities" },
  { href: "/courses", label: "Courses" },
];

const about = [
  "Our Story",
  "Success Stories",
  // "Our Team",
  "Careers",
  "Contact",
  "Our Blogs",
];

const partner = ["Recruitment Partner", "Institution Partner"];

// "Our Story" -> "our-story"
function toSlug(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function Flag({ code, name, size = 1 }: { code: string; name: string; size?: number }) {
  return (
    <span className="flex shrink-0 overflow-hidden rounded-[4px] shadow-sm ring-1 ring-black/10">
      <ReactCountryFlag
        countryCode={code}
        svg
        aria-label={`Flag of ${name}`}
        style={{
          width: `${1.5 * size}em`,
          height: `${1.1 * size}em`,
          display: "block",
          objectFit: "cover",
        }}
      />
    </span>
  );
}

function GlobeIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z" strokeLinejoin="round" />
    </svg>
  );
}

const ArrowRight = ({ className = "size-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/**
 * Countries mega menu: destinations on the left, a live preview on the right.
 * Hovering "Europe" slides in the European countries.
 */
function CountriesMenu({ close }: { close: () => void }) {
  const [active, setActive] = useState<string | null>(null);
  const current = destinations.find((d) => d.name === active);

  const rowClass = (on: boolean) =>
    `group/row flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-all duration-200 ${
      on ? "bg-[#0A4FE0]/[0.07] text-[#0B1533]" : "text-zinc-600 hover:bg-black/[0.03] hover:text-[#0B1533]"
    }`;

  return (
    <div className="flex" style={{ width: 640, whiteSpace: "normal" }} onMouseLeave={() => setActive(null)}>
      {/* Left: destinations */}
      <div className="shrink-0 border-r border-black/5 p-3" style={{ width: 250 }}>
        <p className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-400">Destinations</p>
        <div className="flex flex-col gap-0.5">
          {destinations.map((d) => (
            <Link key={d.code} href={page(d)} onClick={close} onMouseEnter={() => setActive(d.name)} onFocus={() => setActive(d.name)} className={rowClass(active === d.name)}>
              <Flag code={d.code} name={d.name} />
              <span className="flex-1">{d.name}</span>
              <ArrowRight className={`size-3.5 transition-all duration-200 ${active === d.name ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"}`} />
            </Link>
          ))}
          <button
            type="button"
            onMouseEnter={() => setActive("Europe")}
            onFocus={() => setActive("Europe")}
            onClick={() => setActive("Europe")}
            aria-expanded={active === "Europe"}
            className={`${rowClass(active === "Europe")} w-full text-left`}>
            <Flag code="EU" name="Europe" />
            <span className="flex-1">Europe</span>
            <svg viewBox="0 0 12 12" className={`size-3 transition-transform duration-200 ${active === "Europe" ? "translate-x-0.5" : ""}`} fill="none" aria-hidden>
              <path d="M4.5 2.5 8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right: live preview */}
      <div className="relative flex-1 overflow-hidden p-5" style={{ minHeight: 360 }}>
        {active === "Europe" ? (
          <div key="europe" className="hdr-pane">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0A4FE0]">Study in Europe</p>
            <p className="font-display mt-1 text-xl font-semibold tracking-[-0.01em] text-[#0B1533]">Popular European destinations</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {europe.map((d, i) => (
                <Link
                  key={d.code}
                  href={page(d)}
                  onClick={close}
                  style={{ animationDelay: `${i * 40}ms` }}
                  className="hdr-chip group/eu flex items-center gap-2.5 rounded-xl border border-black/5 bg-white px-3 py-2.5 text-sm font-medium text-zinc-700 shadow-[0_6px_16px_-12px_rgba(11,21,51,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0A4FE0]/30 hover:text-[#0B1533] hover:shadow-[0_12px_24px_-14px_rgba(10,79,224,0.5)]">
                  <Flag code={d.code} name={d.name} />
                  <span className="flex-1">{d.name}</span>
                  <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover/eu:translate-x-0 group-hover/eu:opacity-100" />
                </Link>
              ))}
              <Link
                href="/countries"
                onClick={close}
                style={{ animationDelay: `${europe.length * 40}ms` }}
                className="hdr-chip group/eu flex items-center gap-2.5 rounded-xl border border-dashed border-[#0A4FE0]/30 bg-[#0A4FE0]/[0.04] px-3 py-2.5 text-sm font-semibold text-[#0A4FE0] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0A4FE0]/[0.08]">
                <GlobeIcon />
                <span className="flex-1">Others</span>
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/eu:translate-x-0.5" />
              </Link>
            </div>
          </div>
        ) : current ? (
          <div key={current.code} className="hdr-pane flex h-full flex-col">
            <div className="relative flex flex-col overflow-hidden rounded-2xl bg-[linear-gradient(140deg,#EEF3FF,#FFF3E6)] p-5" style={{ flex: 1 }}>
              <span aria-hidden className="absolute -right-10 -top-10 size-36 rounded-full bg-[#0A4FE0]/10 blur-2xl" />
              <div className="relative flex items-center gap-4">
                <Flag code={current.code} name={current.name} size={2.2} />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0A4FE0]">Study in</p>
                  <p className="font-display text-2xl font-semibold tracking-[-0.02em] text-[#0B1533]">{current.name}</p>
                </div>
              </div>
              <p className="relative mt-4 text-sm leading-relaxed text-zinc-600">{current.tagline}</p>
              <div className="relative mt-auto flex flex-wrap gap-2 pt-5">
                {["Admissions", "Scholarships", "Visa support"].map((t) => (
                  <span key={t} className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#0B1533] ring-1 ring-black/5">
                    {t}
                  </span>
                ))}
              </div>
              <span aria-hidden className="absolute -bottom-6 -right-4 opacity-[0.12]" style={{ transform: "rotate(-12deg)" }}>
                <Flag code={current.code} name={current.name} size={5} />
              </span>
            </div>
            <Link
              href={page(current)}
              onClick={close}
              className="group/cta mt-4 inline-flex items-center justify-between gap-3 rounded-xl bg-[#0B1533] py-2 pl-4 pr-2 text-sm font-semibold text-white transition-colors hover:bg-[#0A4FE0]">
              {current.page ? `Explore ${current.name}` : "Talk to us about this destination"}
              <span className="grid size-8 place-items-center rounded-lg bg-white/15 transition-transform duration-300 group-hover/cta:-rotate-45">
                <ArrowRight />
              </span>
            </Link>
          </div>
        ) : (
          <div key="intro" className="hdr-pane flex h-full flex-col">
            <div className="relative flex-1 overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#0B1533,#1E3A8A)] p-5 text-white">
              <span aria-hidden className="absolute -bottom-14 -right-14 size-48 rounded-full border-[28px] border-white/10" />
              <span aria-hidden className="absolute -left-8 -top-8 size-32 rounded-full bg-[#F7931E]/30 blur-2xl" />
              <GlobeIcon className="relative size-9 text-[#F7931E]" />
              <p className="font-display relative mt-4 text-2xl font-semibold leading-tight tracking-[-0.02em]">
                Where will you
                <br />
                study next?
              </p>
              <p className="relative mt-2 text-sm leading-relaxed text-white/70" style={{ maxWidth: "15rem" }}>
                Hover a destination to preview it, or explore every country we support.
              </p>
              <div className="relative mt-5 flex -space-x-1.5">
                {[...destinations, ...europe].slice(0, 9).map((d) => (
                  <span key={d.code} className="rounded-[5px] ring-2 ring-[#0B1533]">
                    <Flag code={d.code} name={d.name} />
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="/countries"
              onClick={close}
              className="group/cta mt-4 inline-flex items-center justify-between gap-3 rounded-xl border border-black/10 py-2 pl-4 pr-2 text-sm font-semibold text-[#0B1533] transition-colors hover:border-[#0A4FE0]/40 hover:text-[#0A4FE0]">
              View all destinations
              <span className="grid size-8 place-items-center rounded-lg bg-[#0A4FE0]/10 text-[#0A4FE0] transition-transform duration-300 group-hover/cta:translate-x-0.5">
                <ArrowRight />
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      className={`mt-0.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M2.5 4.5L6 8L9.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MobileGroup({
  label,
  items,
  basePath,
  flags,
  onNavigate,
}: {
  label: string;
  items: string[];
  basePath?: string;
  flags?: Record<string, string>;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/5 py-2">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-2 text-base font-medium text-zinc-900"
      >
        {label}
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="flex flex-col gap-1 pb-2 pl-2">
          {items.map((item) => (
            <Link
              key={item}
              href={`${basePath ?? ""}/${toSlug(item)}`}
              onClick={onNavigate}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-[#1366E0]/8 hover:text-black"
            >
              {flags?.[item] && <Flag code={flags[item]} name={item} />}
              {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileCountries({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const [euOpen, setEuOpen] = useState(false);
  const row = "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-[#1366E0]/8 hover:text-black";
  return (
    <div className="border-b border-black/5 py-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-2 text-base font-medium text-zinc-900">
        Countries
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="flex flex-col gap-1 pb-2 pl-2">
          {destinations.map((d) => (
            <Link key={d.code} href={page(d)} onClick={onNavigate} className={row}>
              <Flag code={d.code} name={d.name} />
              {d.name}
            </Link>
          ))}
          <button type="button" onClick={() => setEuOpen((v) => !v)} aria-expanded={euOpen} className={`${row} justify-between`}>
            <span className="flex items-center gap-2.5">
              <Flag code="EU" name="Europe" />
              Europe
            </span>
            <ChevronIcon open={euOpen} />
          </button>
          {euOpen && (
            <div className="ml-4 flex flex-col gap-1 border-l border-black/5 pl-2">
              {europe.map((d) => (
                <Link key={d.code} href={page(d)} onClick={onNavigate} className={row}>
                  <Flag code={d.code} name={d.name} />
                  {d.name}
                </Link>
              ))}
              <Link href="/countries" onClick={onNavigate} className={`${row} text-[#1366E0]`}>
                <GlobeIcon />
                Others
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const dropdownLinkClass =
  "rounded-lg px-3 py-2 text-base font-medium text-zinc-600 transition-colors duration-150 hover:bg-[#0D7CE1]/8 hover:text-black";

/**
 * Desktop dropdown controlled by state (not pure CSS hover), so it can
 * close itself as soon as a link inside it is clicked.
 */
function DesktopDropdown({
  label,
  href,
  width,
  columns = 1,
  bare = false,
  children,
}: {
  label: string;
  href?: string;
  width: string;
  /** 1 = single list, 2 = two-column grid */
  columns?: 1 | 2;
  /** Render children as-is (no padding/grid), for custom panels */
  bare?: boolean;
  children: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const triggerContent = (
    <>
      {label}
      <ChevronIcon open={open} />
      <span
        className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left rounded-full bg-black transition-transform duration-300 ${
          open ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </>
  );
  const triggerClass =
    "relative flex cursor-pointer items-center gap-1.5 py-2 transition-colors duration-200 hover:text-black";

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={close}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) close();
      }}
      onKeyDown={(e) => e.key === "Escape" && close()}
    >
      {href ? (
        <Link
          href={href}
          onClick={close}
          aria-expanded={open}
          className={triggerClass}
        >
          {triggerContent}
        </Link>
      ) : (
        <button type="button" aria-expanded={open} className={triggerClass}>
          {triggerContent}
        </button>
      )}

      <div
        className={`hdr-panel absolute left-1/2 top-full z-50 ${width} pt-4 ${open ? "is-open" : ""}`}
      >
        {/* Little caret pointing at the trigger */}
        <span aria-hidden className="absolute left-1/2 top-[11px] size-3 -translate-x-1/2 rotate-45 rounded-[3px] border-l border-t border-black/5 bg-white" />
        <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/95 shadow-[0_30px_60px_-25px_rgba(11,21,51,0.35)] backdrop-blur-xl">
          {bare ? (
            children(close)
          ) : (
            <div className={`grid gap-1 p-3 ${columns === 2 ? "grid-cols-2 gap-x-2" : "grid-cols-1"}`}>{children(close)}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The header floats transparently at the top of every page and turns into a pill once the user scrolls
  const transparent = !scrolled && !mobileOpen;

  return (
    <div className="sticky top-0 z-50 w-full px-4 pt-4 xl:px-[calc(5.4vw-1.75rem)]">
      <style>{`
        .hdr-panel { visibility: hidden; opacity: 0; transform: translate(-50%, 10px) scale(0.97); transform-origin: top center;
          transition: opacity .22s ease, transform .32s cubic-bezier(.22,1,.36,1), visibility 0s linear .32s; }
        .hdr-panel.is-open { visibility: visible; opacity: 1; transform: translate(-50%, 0) scale(1); transition-delay: 0s; }
        @keyframes hdrPaneIn { from { opacity: 0; transform: translateX(14px); } to { opacity: 1; transform: none; } }
        @keyframes hdrChipIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .hdr-pane { animation: hdrPaneIn .35s cubic-bezier(.22,1,.36,1) both; }
        .hdr-chip { animation: hdrChipIn .4s cubic-bezier(.22,1,.36,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .hdr-panel, .hdr-panel.is-open { transition: none; }
          .hdr-pane, .hdr-chip { animation: none; }
        }
      `}</style>
      {/* Desktop: logo sits at a 5.4vw inset to line up with the home hero text; from xl the pill itself is inset too so it doesn't stretch edge to edge */}
      <header
        className={`mx-auto w-full rounded-[28px] border transition-all duration-300 sm:max-w-[40rem] md:max-w-3xl lg:max-w-none lg:rounded-full ${
          transparent
            ? "border-transparent bg-transparent"
            : "border-black/5 bg-linear-to-b from-white/80 via-white/70 to-[#FFFEFA] shadow-lg shadow-black/5 backdrop-blur-xl"
        }`}
      >
        <div className="flex h-16 w-full items-center justify-between gap-4 px-6 lg:h-20 lg:pr-[calc(3.6vw-17px)] lg:pl-[calc(5.4vw-17px)] xl:px-7">
          <Link
            href="/"
            className="shrink-0 text-lg font-bold tracking-tight text-black"
          >
            <Image
              src={"/logo.png"}
              alt="Admission OnBoard"
              width={180}
              height={22}
              className="h-auto w-[150px] xl:w-[190px]"
            />
          </Link>

          {/* Desktop nav (tighter on lg so it fits on one line, full size from xl) */}
          <nav className="hidden items-center gap-5 whitespace-nowrap text-sm font-normal text-[#1F2937] lg:flex xl:text-base 2xl:gap-10 2xl:text-[17px]">
            <DesktopDropdown label="About" width="w-50">
              {(close) =>
                about.map((item) => (
                  <Link
                    key={item}
                    href={`/${toSlug(item)}`}
                    onClick={close}
                    className={dropdownLinkClass}
                  >
                    {item}
                  </Link>
                ))
              }
            </DesktopDropdown>

            <DesktopDropdown label="Countries" href="/countries" width="" bare>
              {(close) => <CountriesMenu close={close} />}
            </DesktopDropdown>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group/link relative py-2 transition-colors duration-200 hover:text-black"
              >
                {link.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded-full bg-black transition-transform duration-300 group-hover/link:scale-x-100" />
              </Link>
            ))}

            <DesktopDropdown label="Partners" width="w-70">
              {(close) =>
                partner.map((item) => (
                  <Link
                    key={item}
                    href={`/${toSlug(item)}`}
                    onClick={close}
                    className={dropdownLinkClass}
                  >
                    {item}
                  </Link>
                ))
              }
            </DesktopDropdown>
          </nav>

          {/* Desktop auth buttons */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
            <Link
              href="/auth/login"
              className="flex h-11 items-center justify-center whitespace-nowrap rounded-full border-[1.5px] border-[#350C0E] bg-white px-5 text-sm font-semibold text-[#350C0E] transition-colors duration-200 hover:border-[#F7931E] hover:text-[#F7931E] xl:px-6 xl:text-base 2xl:text-[17px]"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-[#350C0E] px-5 text-sm font-semibold text-white shadow-md shadow-[#350C0E]/25 transition-colors duration-200 hover:bg-[#F7931E] xl:px-7 xl:text-base 2xl:px-8 2xl:text-[17px]"
            >
              Register as a Student
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-black lg:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              {mobileOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <>
                  <path
                    d="M4 7h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 12h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 17h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div className="max-h-[calc(100vh-7rem)] overflow-y-auto border-t border-black/5 px-6 pb-6 pt-2 lg:hidden">
            <nav className="flex flex-col">
              <MobileGroup
                label="About"
                items={about}
                onNavigate={closeMobile}
              />
              <MobileCountries onNavigate={closeMobile} />

              <div className="flex flex-col border-b border-black/5 py-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobile}
                    className="py-2 text-base font-medium text-zinc-900"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <MobileGroup
                label="Partners"
                items={partner}
                onNavigate={closeMobile}
              />
            </nav>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/auth/login"
                onClick={closeMobile}
                className="flex h-11 items-center justify-center rounded-full border border-[#350C0E] text-[15px] font-semibold tracking-wide text-[#350C0E] transition-colors duration-200 hover:border-[#F7931E] hover:text-[#F7931E]"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                onClick={closeMobile}
                className="flex h-11 items-center justify-center rounded-full bg-[#350C0E] text-[15px] font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-[#F7931E]"
              >
                Register as a Student
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
