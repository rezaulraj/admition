"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/admission-onboard/",
    path: "M6.9 8.4H3.6V20h3.3V8.4ZM5.3 3.5A1.9 1.9 0 1 0 5.3 7.3 1.9 1.9 0 0 0 5.3 3.5ZM20.4 20h-3.3v-6.2c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V20H9.3V8.4h3.2v1.6h.1c.4-.8 1.6-1.7 3.3-1.7 3.5 0 4.2 2.3 4.2 5.3V20Z",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/AdmissionOnBoardOfficial/",
    path: "M13 22v-8h2.7l.4-3H13V9c0-.9.2-1.5 1.5-1.5H16V5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.5v3H9.8v8H13Z",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/8801784192780",
    path: "M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8.9-.2.2-.3.2-.5.1-1.4-.7-2.3-1.3-3.2-2.9-.2-.4.2-.4.6-1.2.1-.2 0-.4 0-.5s-.6-1.5-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s1 2.6 1.1 2.8c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@AdmissionOnBoard",
    path: "M21.8 8.1s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.9 5 12 5 12 5s-3.9 0-6.9.2c-.4 0-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2 9.9 2 11.6v1.4c0 1.7.2 3.5.2 3.5s.2 1.5.8 2.1c.8.8 1.9.8 2.4.9 1.7.2 6.6.2 6.6.2s3.9 0 6.9-.2c.4 0 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.7.2-3.5v-1.4c0-1.7-.2-3.5-.2-3.5ZM9.9 15V8.9l5.6 3-5.6 3.1Z",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/admissiononboardlimited/",
    path: "M12 2c2.7 0 3.1 0 4.1.1 1.1 0 1.8.2 2.5.5.7.3 1.2.6 1.8 1.2.6.6.9 1.1 1.2 1.8.3.7.5 1.4.5 2.5.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1.1-.2 1.8-.5 2.5-.3.7-.6 1.2-1.2 1.8-.6.6-1.1.9-1.8 1.2-.7.3-1.4.5-2.5.5-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1.1 0-1.8-.2-2.5-.5-.7-.3-1.2-.6-1.8-1.2-.6-.6-.9-1.1-1.2-1.8-.3-.7-.5-1.4-.5-2.5C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1.1.2-1.8.5-2.5.3-.7.6-1.2 1.2-1.8.6-.6 1.1-.9 1.8-1.2.7-.3 1.4-.5 2.5-.5C8.9 2 9.3 2 12 2Zm0 1.8c-2.6 0-3 0-4 .1-.9 0-1.4.2-1.7.3-.4.2-.7.3-1 .6-.3.3-.5.6-.6 1-.1.3-.3.8-.3 1.7-.1 1-.1 1.4-.1 4s0 3 .1 4c0 .9.2 1.4.3 1.7.2.4.3.7.6 1 .3.3.6.5 1 .6.3.1.8.3 1.7.3 1 .1 1.4.1 4 .1s3 0 4-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.3 1-.6.3-.3.5-.6.6-1 .1-.3.3-.8.3-1.7.1-1 .1-1.4.1-4s0-3-.1-4c0-.9-.2-1.4-.3-1.7-.2-.4-.3-.7-.6-1-.3-.3-.6-.5-1-.6-.3-.1-.8-.3-1.7-.3-1-.1-1.4-.1-4-.1Zm0 3.5a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Zm4.9-2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z",
  },
];
const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Courses", href: "/courses" },
      { label: "Universities", href: "/universities" },
      { label: "Study Destinations", href: "/countries" },
      { label: "Services", href: "/services" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About Us", href: "/our-story" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Our Blogs", href: "/our-blogs" },
      { label: "FAQs", href: "/frequently-asked-questions" },
      { label: "Recruitment Partner", href: "/recruitment-partner" },
      { label: "Institution Partner", href: "/institution-partner" },
    ],
  },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

const WHATSAPP = "https://wa.me/8801784192780";
const EMAIL = "aob@admissiononboard.com";
const WORDMARK = "Admission OnBoard";

const ArrowIcon = ({ className = "size-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // CTA card + columns rise in
      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: el, start: "top 88%", once: true } })
        .fromTo(q("[data-f-cta]"), { autoAlpha: 0, y: 50, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.1 }, 0)
        .fromTo(q("[data-f-cta-text] > *"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.2)
        .fromTo(q("[data-f-col]"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.35);

      // Giant wordmark: letters rise up as you reach the bottom of the page
      gsap.fromTo(
        q("[data-f-char]"),
        { yPercent: 105 },
        {
          yPercent: 0,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: { trigger: q("[data-f-wordmark]")[0], start: "top bottom", end: "bottom bottom", scrub: 1 },
        },
      );

      // CTA glow drifts slowly
      gsap.to(q("[data-f-glow]"), { xPercent: 20, yPercent: -10, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1 });
    });

    return () => mm.revert();
  }, []);

  return (
    <footer ref={root} className="site-footer px-4 pb-6 sm:px-6">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .site-footer [data-f-cta], .site-footer [data-f-col] { visibility: hidden; }
        }
        /* Layout kept here so it never depends on Tailwind generating new class names */
        .site-footer .f-shell { max-width: 84rem; margin: 0 auto; border-radius: 2.5rem; background: #F4F6FA; padding: 1rem; overflow: hidden; }
        .site-footer .f-cta { border-radius: 2rem; padding: 2.25rem 1.75rem; }
        .site-footer .f-cta-title { font-size: clamp(2rem, 5vw, 3.6rem); }
        .site-footer .f-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2.5rem; padding: 3rem 1rem 1rem; }
        .site-footer .f-links { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2rem; }
        .site-footer .f-wordmark { font-size: min(9.4vw, 8.6rem); }
        @media (min-width: 768px) {
          .site-footer .f-cta { padding: 3.5rem; }
          .site-footer .f-links { grid-template-columns: repeat(3, minmax(0, 1fr)) minmax(0, 1.35fr); }
        }
        @media (min-width: 1024px) {
          .site-footer .f-grid { grid-template-columns: minmax(0, 0.8fr) minmax(0, 2.3fr); gap: 4rem; padding: 4rem 2.5rem 1.5rem; }
        }
      `}</style>

      <div className="f-shell">
        {/* ---------- CTA card ---------- */}
        <div data-f-cta className="f-cta relative overflow-hidden bg-[linear-gradient(135deg,#0B1533_0%,#14213D_45%,#1E3A8A_100%)] text-white">
          <span data-f-glow aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-[#F7931E]/30 blur-[90px]" />
          <span aria-hidden className="pointer-events-none absolute -bottom-32 left-1/4 size-80 rounded-full bg-[#2F6BFF]/30 blur-[100px]" />
          <span aria-hidden className="pointer-events-none absolute -bottom-20 -right-10 size-72 rounded-full border-[40px] border-white/[0.05]" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div data-f-cta-text className="max-w-2xl">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FFB25E]">
                <span className="h-3 w-3.5 bg-[#F7931E] [clip-path:polygon(0_0,65%_0,100%_50%,65%_100%,0_100%)]" />
                Free consultation
              </p>
              <h2 className="f-cta-title font-display mt-4 font-semibold leading-[1.02] tracking-[-0.035em]">
                Ready to start your <span className="text-[#F7931E]">journey?</span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
                Tell us your goals. Our counsellors will match you with the right course, country and scholarship, at no cost.
              </p>
            </div>

            <div data-f-cta-text className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/auth/register"
                className="group inline-flex items-center justify-between gap-4 rounded-2xl bg-white py-2.5 pl-5 pr-2.5 text-sm font-semibold text-[#350C0E] transition-[translate] duration-300 hover:-translate-y-0.5">
                Register as a student
                <span className="grid size-9 place-items-center rounded-xl bg-[#F7931E] text-white transition-transform duration-300 group-hover:-rotate-45">
                  <ArrowIcon />
                </span>
              </Link>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-4 rounded-2xl border border-white/20 bg-white/[0.06] py-2.5 pl-5 pr-2.5 text-sm font-semibold text-white backdrop-blur transition-[translate,background-color] duration-300 hover:-translate-y-0.5 hover:bg-white/[0.12]">
                Chat on WhatsApp
                <span className="grid size-9 place-items-center rounded-xl bg-[#25D366] text-white">
                  <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
                    <path d={socials.find((s) => s.name === "WhatsApp")!.path} />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ---------- Links ---------- */}
        <div className="f-grid">
          <div data-f-col>
            <Link href="/" className="inline-block">
              <Image src="/logo.png" alt="Admission OnBoard" width={190} height={42} className="h-auto w-[170px]" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#4A5268]">
              Admission OnBoard connects students to top universities worldwide, from first consultation to the day you arrive.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="grid size-10 place-items-center rounded-full bg-white text-[#350C0E] shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#14213D] hover:text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="f-links">
            {columns.map((col) => (
              <div key={col.title} data-f-col>
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#350C0E]/50">{col.title}</h3>
                <ul className="mt-5 flex flex-col gap-3 text-sm">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="group inline-flex items-center gap-1.5 font-medium text-[#350C0E] transition-colors hover:text-[#2F6BFF]">
                        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1.5px]">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div data-f-col>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#350C0E]/50">Get in touch</h3>
              <div className="mt-5 flex flex-col gap-3 text-sm">
                <a href={`mailto:${EMAIL}`} className="break-words font-medium text-[#350C0E] transition-colors hover:text-[#2F6BFF]">
                  {EMAIL}
                </a>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="font-medium text-[#350C0E] transition-colors hover:text-[#2F6BFF]">
                  WhatsApp us
                </a>
                <Link href="/contact" className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#350C0E] shadow-sm ring-1 ring-black/5 transition-colors hover:text-[#2F6BFF]">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#3BAA35] opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-[#3BAA35]" />
                  </span>
                  Dhaka &amp; Delhi offices
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Giant wordmark ---------- */}
        <div data-f-wordmark aria-hidden className="overflow-hidden px-2 pt-6 sm:px-6">
          <p className="f-wordmark font-display select-none whitespace-nowrap text-center font-bold leading-[0.85] tracking-[-0.05em]">
            {WORDMARK.split("").map((ch, i) => (
              <span
                key={i}
                data-f-char
                className="inline-block bg-[linear-gradient(180deg,#14213D_0%,rgba(20,33,61,0.08)_100%)] bg-clip-text text-transparent">
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </p>
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="mt-4 flex flex-col items-center justify-between gap-4 rounded-[1.5rem] bg-white px-5 py-4 text-sm text-[#4A5268] shadow-sm ring-1 ring-black/5 sm:flex-row">
          <p>&copy; {year} Admission OnBoard. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-[#2F6BFF]">
                {link.label}
              </Link>
            ))}
          </div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const lenis = (window as unknown as { lenis?: { scrollTo: (t: number, o?: object) => void } }).lenis;
              if (lenis) lenis.scrollTo(0, { duration: 1.6 });
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group inline-flex items-center gap-2 font-semibold text-[#350C0E] transition-colors hover:text-[#2F6BFF]">
            Back to top
            <span className="grid size-8 place-items-center rounded-full bg-[#14213D] text-white transition-transform duration-300 group-hover:-translate-y-0.5">
              <ArrowIcon className="size-3.5 -rotate-90" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
