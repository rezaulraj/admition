"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DESTINATIONS = [
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

const ICONS: Record<string, ReactNode> = {
  scholarship: <path d="M12 2 4 5v6c0 5.5 3.4 10.7 8 12 4.6-1.3 8-6.5 8-12V5l-8-3Zm-1.2 13.4-3.2-3.2 1.4-1.4 1.8 1.8 4.6-4.6 1.4 1.4-6 6Z" />,
  passport: <path d="M6 2h11a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm6 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm-4 9v2h8v-2H8Z" />,
  plane: <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z" />,
  home: <path d="M12 3 2 12h3v8h5v-6h4v6h5v-8h3L12 3Z" />,
};

function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <article
      data-deal
      className={`group relative isolate min-h-[250px] overflow-hidden rounded-[28px] p-7 shadow-[0_24px_50px_-30px_rgba(20,33,61,0.45)] will-change-transform sm:p-8 ${className}`}>
      {children}
    </article>
  );
}

/** Big step-number watermark, pinned inside the card's top-right corner */
function StepPill({ n, light = false, size = "6.5rem" }: { n: string; light?: boolean; size?: string }) {
  return (
    <span
      data-stepmark
      aria-label={`Step ${n}`}
      className="pointer-events-none absolute flex select-none flex-col items-end"
      style={{ top: "1.25rem", right: "1.5rem", zIndex: 0 }}>
      <span className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: light ? "rgba(255,255,255,0.6)" : "rgba(20,33,61,0.45)" }}>
        Step
      </span>
      <span
        className="font-display font-bold leading-[0.85] tracking-[-0.05em]"
        style={{
          fontSize: size,
          color: light ? "rgba(255,255,255,0.1)" : "rgba(20,33,61,0.07)",
          WebkitTextStroke: light ? "1.5px rgba(255,255,255,0.45)" : "1.5px rgba(20,33,61,0.2)",
        }}>
        {n}
      </span>
    </span>
  );
}

function SmallCard({
  step,
  icon,
  title,
  copy,
  className,
  chip,
  light,
}: {
  step?: string;
  icon: string;
  title: string;
  copy: string;
  className: string;
  chip: string;
  light?: boolean;
}) {
  return (
    <Card className={`flex flex-col justify-between gap-8 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <span className={`grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${chip}`}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden>
            {ICONS[icon]}
          </svg>
        </span>
        {step && <StepPill n={step} light={light} size="4.75rem" />}
      </div>
      <div>
        <h3 className="font-display text-2xl font-semibold leading-[1.1] tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed opacity-70">{copy}</p>
      </div>
    </Card>
  );
}

export default function TheJourney() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;
    const q = gsap.utils.selector(section);
    const grid = q("[data-deal-grid]")[0] as HTMLElement;
    const cards = q("[data-deal]") as HTMLElement[];
    const mm = gsap.matchMedia();

    mm.add(
      { isDesktop: "(min-width: 768px)", motionOK: "(prefers-reduced-motion: no-preference)" },
      (ctx) => {
        const { isDesktop, motionOK } = ctx.conditions as { isDesktop: boolean; motionOK: boolean };
        if (!motionOK) return;

        // Heading
        gsap.fromTo(
          q("[data-head] > *"),
          { y: 36, autoAlpha: 0, filter: "blur(6px)" },
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 80%", once: true },
          },
        );

        if (isDesktop) {
          // When the grid comes into view, the cards are dealt once out of a fanned deck into their places,
          // so they are never left overlapping while you read them
          const deal = gsap.timeline({
            defaults: { ease: "expo.out" },
            scrollTrigger: { trigger: grid, start: "top 78%", once: true, invalidateOnRefresh: true },
          });
          const mid = (cards.length - 1) / 2;
          cards.forEach((card, i) => {
            deal.fromTo(
              card,
              {
                x: () => grid.offsetWidth / 2 - (card.offsetLeft + card.offsetWidth / 2),
                y: () => Math.min(grid.offsetHeight, window.innerHeight) * 0.35 - (card.offsetTop + card.offsetHeight / 2),
                rotation: (i - mid) * 7,
                scale: 0.62,
              },
              { x: 0, y: 0, rotation: 0, scale: 1, duration: 1.3, clearProps: "transform" },
              (cards.length - 1 - i) * 0.08,
            );
          });
        } else {
          // Phones: each card simply rises in
          cards.forEach((card) =>
            gsap.fromTo(
              card,
              { autoAlpha: 0, y: 60, scale: 0.95 },
              { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 88%", once: true } },
            ),
          );
        }

        // Step numbers glide up into their corner
        gsap.fromTo(
          q("[data-stepmark]"),
          { autoAlpha: 0, yPercent: 30 },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1.1,
            stagger: 0.1,
            delay: 0.6,
            ease: "expo.out",
            scrollTrigger: { trigger: grid, start: "top 78%", once: true },
          },
        );

        // Step 01 chips pop in one by one, then float
        gsap.fromTo(
          q("[data-chip]"),
          { autoAlpha: 0, scale: 0.5, y: 16 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.18,
            ease: "back.out(2)",
            scrollTrigger: { trigger: q("[data-chip]")[0], start: "top 85%", once: true },
          },
        );
        q("[data-chip-float]").forEach((c, i) =>
          gsap.to(c, { y: i % 2 ? 7 : -7, duration: 2.2 + i * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1 }),
        );

        // Each student steps up inside their card
        (q("[data-student]") as HTMLElement[]).forEach((el) => {
          gsap.fromTo(
            el,
            { y: 90 },
            { y: 0, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top 85%", end: "center 55%", scrub: 0.7 } },
          );
        });

        // Flags pop in one by one
        gsap.fromTo(
          q("[data-flag]"),
          { scale: 0, rotate: -20 },
          {
            scale: 1,
            rotate: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "back.out(2.5)",
            scrollTrigger: { trigger: q("[data-flags]")[0], start: "top 70%", once: true },
          },
        );

        // Ring on the CTA card breathes
        gsap.to(q("[data-ring]"), { scale: 1.12, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} aria-labelledby="journey-title" className="overflow-hidden bg-[#FFFEFA] px-3 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-3">
        <div data-head className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#F7931E]">
              <span className="h-3.5 w-5 bg-[#F7931E] [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
              The Journey
            </p>
            <h2
              id="journey-title"
              className="font-display mt-4 text-[clamp(2.4rem,5.4vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-[#14213D]">
              From dream to degree, <span className="text-[#F7931E]">in five simple steps.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-[#14213D]/60">
            One team beside you the whole way, turning a big, confusing decision into a route you can actually follow.
          </p>
        </div>

        <div data-deal-grid className="relative mt-14 grid auto-rows-[minmax(250px,auto)] gap-4 md:grid-cols-12">
          {/* Step 01 */}
          <Card className="min-h-[480px] bg-[linear-gradient(160deg,#FFE3CC_0%,#F7924F_100%)] text-[#14213D] md:col-span-5 md:row-span-2">
            <StepPill n="01" size="8.5rem" />
            <h3 className="font-display relative z-10 text-3xl font-semibold leading-[1.05] tracking-[-0.02em]" style={{ maxWidth: "15rem" }}>
              Free profile assessment
            </h3>
            <p className="relative z-10 mt-3 text-sm leading-relaxed text-[#14213D]/70" style={{ maxWidth: "15rem" }}>
              Share your goals with us. We evaluate your academic and financial profile right from day one.
            </p>
            {/* Visual: glowing stage + student + what the assessment covers */}
            <div className="absolute inset-x-0 bottom-0" style={{ height: "66%" }}>
              <span
                aria-hidden
                className="absolute left-1/2 -translate-x-1/2 rounded-full bg-white/35 blur-[2px]"
                style={{ bottom: "-18%", width: "86%", aspectRatio: "1" }}
              />
              <span
                aria-hidden
                className="absolute left-1/2 -translate-x-1/2 rounded-full border border-white/60"
                style={{ bottom: "-30%", width: "104%", aspectRatio: "1" }}
              />
              <span
                aria-hidden
                className="absolute left-1/2 -translate-x-1/2 rounded-full border border-dashed border-white/50"
                style={{ bottom: "-42%", width: "122%", aspectRatio: "1" }}
              />
              <div data-student className="relative h-full">
                <Image
                  src="/herotransparent.png"
                  alt="Smiling student holding a laptop"
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-contain object-bottom drop-shadow-[0_24px_30px_rgba(20,33,61,0.25)] transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {[
                { label: "Academic profile", style: { left: "6%", top: "22%" } },
                { label: "Budget plan", style: { right: "6%", top: "40%" } },
                { label: "Goals mapped", style: { left: "8%", top: "62%" } },
              ].map((chip) => (
                <span key={chip.label} data-chip className="absolute z-10" style={chip.style}>
                  <span
                    data-chip-float
                    className="inline-flex items-center gap-2 rounded-full bg-white/90 py-1.5 pl-1.5 pr-3.5 text-xs font-semibold text-[#14213D] shadow-[0_12px_26px_-12px_rgba(20,33,61,0.55)] backdrop-blur">
                    <span className="grid size-5 place-items-center rounded-full bg-[#3BAA35] text-white">
                      <svg viewBox="0 0 24 24" className="size-3" fill="none" aria-hidden>
                        <path d="M5 12.5 10 17 19 7" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {chip.label}
                  </span>
                </span>
              ))}
            </div>
          </Card>

          {/* Step 02 */}
          <Card className="flex flex-col justify-between gap-8 bg-[#14213D] text-white md:col-span-7">
            <div aria-hidden className="absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-[#F7931E]/40 blur-[90px]" />
            <div className="flex items-start justify-between gap-4">
              <div data-flags className="flex flex-wrap gap-2.5" style={{ paddingRight: "8.5rem" }}>
                {DESTINATIONS.map((c) => (
                  <span
                    key={c.code}
                    data-flag
                    title={c.name}
                    className="block h-9 w-12 overflow-hidden rounded-lg shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] sm:h-10 sm:w-14">
                    <ReactCountryFlag
                      countryCode={c.code}
                      svg
                      aria-label={c.name}
                      style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
                    />
                  </span>
                ))}
              </div>
              <StepPill n="02" light />
            </div>
            <div>
              <h3 className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.02em]">Shortlist &amp; apply</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/65">
                We match you to the right courses and universities across {DESTINATIONS.length} destinations, then prepare your complete
                application.
              </p>
            </div>
          </Card>

          {/* Step 03 + 04 */}
          <SmallCard
            step="03"
            icon="scholarship"
            title="Scholarships & documents"
            copy="We help you secure funding and get every required document ready."
            chip="bg-[#F7931E] text-white"
            className="bg-[#FFF3E6] text-[#14213D] md:col-span-3"
          />
          <SmallCard
            step="04"
            icon="passport"
            title="Visa support"
            copy="We walk you through visa submission and the full compliance process, start to finish."
            chip="bg-[#14213D] text-white"
            className="bg-[linear-gradient(150deg,#FFF0E3,#FFC79E)] text-[#14213D] md:col-span-4"
          />

          {/* Step 05 + accommodation */}
          <SmallCard
            step="05"
            icon="plane"
            title="Enrol & arrive"
            copy="Fly out confident, with ongoing support as you settle into your new course."
            chip="bg-white/20 text-white"
            light
            className="bg-[linear-gradient(150deg,#F7931E,#D9561A)] text-white md:col-span-4"
          />
          <SmallCard
            icon="home"
            title="A place to live"
            copy="Help finding accommodation before you land."
            chip="bg-[#2F6BFF] text-white"
            className="bg-[#EEF3FF] text-[#14213D] md:col-span-3"
          />

          {/* Big closing card */}
          <Card className="min-h-[480px] bg-[linear-gradient(160deg,#1E2F5C_0%,#14213D_100%)] text-white md:col-span-5 md:row-span-2">
            <div aria-hidden className="absolute -left-16 top-1/3 -z-10 h-64 w-64 rounded-full bg-[#2F6BFF]/40 blur-[90px]" />
            <h3 className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.02em]">A plan you can follow</h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">You leave every conversation knowing your next step, and the ones after it.</p>
            <div className="absolute inset-x-0 bottom-0 h-[70%]">
              <div data-student className="relative h-full">
                <Image
                  src="/student.png"
                  alt="Smiling student with a backpack and notebooks"
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-contain object-bottom transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </Card>

          {/* CTA */}
          <Card className="flex flex-col justify-between gap-8 bg-[#2F6BFF] text-white md:col-span-7">
            <div
              data-ring
              aria-hidden
              className="absolute -bottom-20 -right-16 -z-10 h-64 w-64 rounded-full border-[36px] border-white/15 transition-transform duration-700 group-hover:scale-125"
            />
            <p className="font-display max-w-md text-[clamp(1.8rem,3.2vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              Ready when you are. Let&apos;s talk.
            </p>
            <Link
              href="/contact"
              className="group/cta inline-flex h-12 w-fit items-center gap-3 rounded-2xl bg-[#14213D] pl-5 pr-2 text-sm font-semibold text-white">
              Book a free consultation
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-[#14213D] transition-transform duration-300 group-hover/cta:rotate-[-45deg]">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}
