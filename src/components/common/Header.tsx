"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

const countries = [
  { name: "United Kingdom", code: "GB" },
  { name: "Australia", code: "AU" },
  { name: "Canada", code: "CA" },
  { name: "New Zealand", code: "NZ" },
  { name: "Finland", code: "FI" },
  { name: "Greece", code: "GR" },
  { name: "Lithuania", code: "LT" },
  { name: "Hungary", code: "HU" },
  { name: "Romania", code: "RO" },
  { name: "Malta", code: "MT" },
  { name: "Cyprus", code: "CY" },
  { name: "Italy", code: "IT" },
  { name: "Norway", code: "NO" },
];

// Quick lookup: country name -> ISO code (used by the mobile menu)
const countryCodes: Record<string, string> = Object.fromEntries(
  countries.map((c) => [c.name, c.code]),
);

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

function Flag({ code, name }: { code: string; name: string }) {
  return (
    <span className="flex shrink-0 overflow-hidden rounded-[3px] shadow-sm ring-1 ring-black/10">
      <ReactCountryFlag
        countryCode={code}
        svg
        aria-label={`Flag of ${name}`}
        style={{
          width: "1.5em",
          height: "1.1em",
          display: "block",
          objectFit: "cover",
        }}
      />
    </span>
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
  children,
}: {
  label: string;
  href?: string;
  width: string;
  /** 1 = single list, 2 = two-column grid */
  columns?: 1 | 2;
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
        className={`absolute left-1/2 top-full z-50 ${width} -translate-x-1/2 pt-3 transition-all duration-200 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-xl backdrop-blur-xl">
          <div
            className={`grid gap-1 ${
              columns === 2 ? "grid-cols-2 gap-x-2" : "grid-cols-1"
            }`}
          >
            {children(close)}
          </div>
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

            <DesktopDropdown
              label="Countries"
              href="/countries"
              width="w-[460px]"
              columns={2}
            >
              {(close) => (
                <>
                  {countries.map((country) => (
                    <Link
                      key={country.code}
                      href={`/countries/${toSlug(country.name)}`}
                      onClick={close}
                      className={`flex items-center gap-3 ${dropdownLinkClass}`}
                    >
                      <Flag code={country.code} name={country.name} />
                      {country.name}
                    </Link>
                  ))}
                  <Link
                    href="/countries"
                    onClick={close}
                    className="col-span-2 mt-2 flex items-center justify-center border-t border-black/5 pt-3 text-sm font-semibold text-[#1366E0] transition-colors hover:text-black"
                  >
                    View all destinations
                  </Link>
                </>
              )}
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
              className="flex h-11 items-center justify-center whitespace-nowrap rounded-full border-[1.5px] border-[#0B1533] bg-white px-5 text-sm font-semibold text-[#0B1533] transition-colors duration-200 hover:border-[#0A4FE0] hover:text-[#0A4FE0] xl:px-6 xl:text-base 2xl:text-[17px]"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-[#0A4FE0] px-5 text-sm font-semibold text-white shadow-md shadow-[#0A4FE0]/25 transition-colors duration-200 hover:bg-[#083FB5] xl:px-7 xl:text-base 2xl:px-8 2xl:text-[17px]"
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
              <MobileGroup
                label="Countries"
                items={countries.map((c) => c.name)}
                basePath="/countries"
                flags={countryCodes}
                onNavigate={closeMobile}
              />

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
                className="flex h-11 items-center justify-center rounded-full border border-black text-[15px] font-semibold tracking-wide text-black transition-colors duration-200 hover:border-[#1366E0] hover:text-[#1366E0]"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                onClick={closeMobile}
                className="flex h-11 items-center justify-center rounded-full bg-black text-[15px] font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-gray-950"
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
