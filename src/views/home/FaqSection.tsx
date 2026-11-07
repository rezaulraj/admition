"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

// Left-side photo in /public (928 × 1143)
const FAQ_IMAGE = "/faqsw.png";

type Faq = {
  question: string;
  answer: ReactNode;
  color: string;
  icon: ReactNode;
};

const faqs: Faq[] = [
  {
    question: "Where should I begin my study abroad journey?",
    answer:
      "Start with a free consultation. We'll review your academic background, budget, and goals, then map out the countries and programs that genuinely fit before you spend a single dollar on applications.",
    color: "#22A55B",
    icon: (
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm3.5 6.5-2 5-5 2 2-5 5-2Z" />
    ),
  },
  {
    question: "Which countries can you help me apply to?",
    answer:
      "We work across the UK, Canada, Australia, New Zealand, the USA, and a growing list of European destinations including Malta, Hungary, and Cyprus, matching you to universities with strong placement records.",
    color: "#2F6FE4",
    icon: (
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 6h-2.9a15.7 15.7 0 0 0-1.4-3.6A8 8 0 0 1 18.9 8ZM12 4a13.6 13.6 0 0 1 1.9 4h-3.8A13.6 13.6 0 0 1 12 4ZM4.3 14a8.2 8.2 0 0 1 0-4h3.4a16.5 16.5 0 0 0 0 4H4.3Zm.8 2H8a15.7 15.7 0 0 0 1.4 3.6A8 8 0 0 1 5.1 16ZM8 8H5.1a8 8 0 0 1 4.3-3.6A15.7 15.7 0 0 0 8 8Zm4 12a13.6 13.6 0 0 1-1.9-4h3.8A13.6 13.6 0 0 1 12 20Zm2.3-6H9.7a14.7 14.7 0 0 1 0-4h4.6a14.7 14.7 0 0 1 0 4Zm.3 5.6A15.7 15.7 0 0 0 16 16h2.9a8 8 0 0 1-4.3 3.6Zm1.7-5.6a16.5 16.5 0 0 0 0-4h3.4a8.2 8.2 0 0 1 0 4h-3.4Z" />
    ),
  },
  {
    question: "Is an English proficiency test like IELTS mandatory?",
    answer:
      "It depends on the university and your prior education. Many institutions accept alternatives like PTE or Duolingo, and some waive it entirely for applicants with an English-medium academic background.",
    color: "#F0642E",
    icon: (
      <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5ZM8 12v2h8v-2H8Zm0 4v2h6v-2H8Z" />
    ),
  },
  {
    question: "How much time does the whole application process take?",
    answer:
      "On average, six to twelve weeks from document submission to offer letter, though timelines shift depending on the country, intake season, and how quickly required documents are ready.",
    color: "#8B5CF6",
    icon: (
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5v4.6l3.7 2.2-1 1.7L11 12.7V7h2Z" />
    ),
  },
  {
    question: "What paperwork is required for my application?",
    answer:
      "Typically academic transcripts, a valid passport, financial statements, a statement of purpose, and letters of recommendation. We give you a checklist tailored to your specific university before you start.",
    color: "#22A55B",
    icon: (
      <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5ZM10.6 17.4l5.6-5.6-1.4-1.4-4.2 4.2-1.8-1.8-1.4 1.4 3.2 3.2Z" />
    ),
  },
  {
    question: "Will you assist me with the visa process?",
    answer:
      "Yes, end to end. From compiling financial documents to preparing you for the visa interview, our team stays with you until your visa is approved and your travel is confirmed.",
    color: "#2F6FE4",
    icon: (
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z" />
    ),
  },
  {
    question: "How much should I budget for studying overseas?",
    answer:
      "Costs vary widely by country and course, but we provide a transparent breakdown covering tuition, living expenses, and our service fees upfront, so there are no surprises later.",
    color: "#F08A24",
    icon: (
      <path d="M12 2C7 2 3 3.8 3 6s4 4 9 4 9-1.8 9-4-4-4-9-4ZM3 9v3c0 2.2 4 4 9 4s9-1.8 9-4V9c0 2.2-4 4-9 4s-9-1.8-9-4Zm0 6v3c0 2.2 4 4 9 4s9-1.8 9-4v-3c0 2.2-4 4-9 4s-9-1.8-9-4Z" />
    ),
  },
  {
    question: "Do you help with housing and settling in after arrival?",
    answer:
      "Absolutely. We connect you with verified accommodation options before departure and offer post-arrival support so your first weeks abroad feel manageable, not overwhelming.",
    color: "#8B5CF6",
    icon: <path d="M12 3 2 11h3v9h5v-6h4v6h5v-9h3L12 3Z" />,
  },
];

const ArrowIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6" />
  </svg>
);

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const root = useRef<HTMLElement>(null);
  const toggled = useRef(false);

  /* ---------- Scroll reveal (once) ---------- */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: el, start: "top 78%", once: true } })
        .fromTo(q("[data-eyebrow]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
        .fromTo(q("[data-word]"), { autoAlpha: 0, yPercent: 110, rotate: 4 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.06 }, 0.1)
        .fromTo(q("[data-underline]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1, ease: "power2.inOut" }, 0.6)
        .fromTo(q("[data-sub]"), { autoAlpha: 0, y: 16, filter: "blur(6px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9 }, 0.4);

      // Photo unrolls, then its card and chips pop in
      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: q("[data-photo]")[0], start: "top 80%", once: true } })
        .fromTo(q("[data-photo]"), { clipPath: "inset(0% 0% 100% 0% round 32px)" }, { clipPath: "inset(0% 0% 0% 0% round 32px)", duration: 1.4, ease: "power4.inOut" }, 0)
        .fromTo(q("[data-photo-img]"), { scale: 1.2 }, { scale: 1, duration: 1.8 }, 0)
        .fromTo(q("[data-photo-card]"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.8)
        .fromTo(q("[data-chip]"), { autoAlpha: 0, scale: 0.5 }, { autoAlpha: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: "back.out(2)" }, 1);

      gsap.to(q("[data-chip]"), { y: -8, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.5 });

      // Questions slide in one after another
      gsap.fromTo(
        q("[data-faq]"),
        { autoAlpha: 0, x: 50 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.9,
          stagger: 0.07,
          ease: "expo.out",
          scrollTrigger: { trigger: q("[data-faq-list]")[0], start: "top 82%", once: true },
        },
      );
    });

    return () => mm.revert();
  }, []);

  /* ---------- Smooth accordion ---------- */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const panels = el.querySelectorAll<HTMLElement>("[data-panel]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    panels.forEach((panel, i) => {
      const open = i === openIndex;
      if (!toggled.current || reduce) {
        gsap.set(panel, { height: open ? "auto" : 0 });
        return;
      }
      gsap.to(panel, { height: open ? "auto" : 0, duration: 0.55, ease: "power3.inOut", overwrite: true });
      if (open) {
        gsap.fromTo(
          panel.querySelector("[data-answer]"),
          { autoAlpha: 0, y: 12, filter: "blur(4px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6, delay: 0.15, ease: "power2.out" },
        );
      }
    });
    if (toggled.current) ScrollTrigger.refresh();
  }, [openIndex]);

  const toggle = (index: number) => {
    toggled.current = true;
    setOpenIndex((cur) => (cur === index ? null : index));
  };

  return (
    <section ref={root} className="faq relative w-full overflow-hidden bg-[#FFFEFA]">
      <style>{`
        /* Core layout lives here so it never depends on Tailwind picking up new class names */
        .faq .faq-grid { display: grid; grid-template-columns: minmax(0, 1fr); align-items: start; gap: 2.5rem; margin-top: 3rem; }
        .faq .faq-photo-col { position: relative; width: 100%; max-width: 28rem; margin: 0 auto; }
        .faq .faq-photo { position: relative; aspect-ratio: 928 / 1143; overflow: hidden; border-radius: 32px; }
        .faq .faq-answer { padding: 0 1.5rem 1.25rem 4.75rem; }
        .faq .faq-toggle[data-open] { transform: rotate(135deg); }
        @media (min-width: 640px) { .faq .faq-answer { padding-left: 5rem; } }
        @media (min-width: 1024px) {
          .faq .faq-grid { grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr); gap: 3.5rem; margin-top: 3.5rem; }
          .faq .faq-photo-col { max-width: none; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .faq [data-eyebrow], .faq [data-word], .faq [data-sub], .faq [data-photo-card], .faq [data-chip], .faq [data-faq] { visibility: hidden; }
        }
      `}</style>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/4 size-[30rem] rounded-full bg-[#2F6BFF]/[0.07] blur-3xl" />
        <div className="absolute -right-40 bottom-10 size-[28rem] rounded-full bg-[#F7931E]/[0.07] blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-20 sm:px-6 lg:py-24">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span data-eyebrow className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-[#2F6BFF]">
            <span className="h-3.5 w-4 bg-[#2F6BFF] [clip-path:polygon(0_0,65%_0,100%_50%,65%_100%,0_100%)]" />
            FAQ
          </span>
          <h2 className="font-display mt-3 text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.035em] text-[#350C0E] sm:text-5xl lg:text-[3.4rem]">
            {["Answers", "to", "your", "common"].map((w) => (
              <span key={w} className="mr-[0.24em] inline-block overflow-hidden pb-[0.08em] align-top">
                <span data-word className="inline-block">
                  {w}
                </span>
              </span>
            ))}
            <span className="relative inline-block">
              <span className="inline-block overflow-hidden pb-[0.12em] align-top">
                <span data-word className="inline-block text-[#F7931E]">
                  questions
                </span>
              </span>
              <svg aria-hidden viewBox="0 0 220 20" preserveAspectRatio="none" className="absolute -bottom-[0.12em] left-0 h-[0.26em] w-full overflow-visible">
                <path data-underline d="M3 12 C 50 4, 100 16, 150 8 S 200 6, 217 10" fill="none" stroke="#F7931E" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p data-sub className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#4A5268] sm:text-base">
            Have doubts? We&apos;ve got answers. Browse what students ask us most before studying overseas.
          </p>
        </div>

        <div className="faq-grid">
          {/* Left: photo at its natural shape, so nothing is cropped */}
          <div className="faq-photo-col">
            <div
              data-photo
              className="faq-photo bg-[#EAF2FF] shadow-[0_40px_80px_-45px_rgba(20,33,61,0.55)] ring-1 ring-black/5">
              <div data-photo-img className="absolute inset-0">
                <Image src={FAQ_IMAGE} alt="Smiling student holding books, ready to study abroad" fill sizes="(max-width: 1024px) 90vw, 40vw" className="object-cover" />
              </div>

              {/* "Still have questions?" card */}
              <div
                data-photo-card
                className="absolute inset-x-4 bottom-4 flex flex-col gap-3 rounded-3xl border border-white/80 bg-white/80 p-4 shadow-[0_20px_40px_-20px_rgba(20,33,61,0.45)] backdrop-blur-xl sm:inset-x-5 sm:bottom-5 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div>
                  <p className="font-display text-lg font-semibold text-[#350C0E]">Still have questions?</p>
                  <p className="text-sm text-[#4A5268]">Talk to a counsellor for free.</p>
                </div>
                <Link
                  href="/contact"
                  className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#2F6BFF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2F6BFF]/30 transition-[translate,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#1E4FD6]">
                  Speak to an advisor
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Floating chips */}
            <span
              data-chip
              aria-hidden
              className="absolute -left-3 top-[18%] hidden items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-sm font-semibold text-[#350C0E] shadow-[0_16px_32px_-16px_rgba(20,33,61,0.5)] sm:flex lg:-left-6">
              <span className="grid size-7 place-items-center rounded-full bg-[#3BAA35]/15 text-[#2E8A29]">✓</span>
              Free consultation
            </span>
            <span
              data-chip
              aria-hidden
              className="absolute -right-3 top-[42%] hidden items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-sm font-semibold text-[#350C0E] shadow-[0_16px_32px_-16px_rgba(20,33,61,0.5)] sm:flex lg:-right-6">
              <span className="grid size-7 place-items-center rounded-full bg-[#F7931E]/15 text-[#E07B0A]">?</span>
              {faqs.length} top questions
            </span>
          </div>

          {/* Right: questions */}
          <ul data-faq-list className="flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const open = openIndex === index;
              const id = `faq-${index}`;
              return (
                <li
                  key={faq.question}
                  data-faq
                  className={`relative overflow-hidden rounded-[22px] border bg-white transition-[box-shadow,border-color] duration-500 ${
                    open ? "border-transparent shadow-[0_24px_50px_-28px_rgba(20,33,61,0.45)]" : "border-[#ECECEC] hover:shadow-[0_14px_30px_-22px_rgba(20,33,61,0.4)]"
                  }`}
                  style={open ? { boxShadow: `0 0 0 1.5px ${faq.color}55, 0 24px 50px -28px rgba(20,33,61,0.45)` } : undefined}>
                  {/* Colour glow on the open card */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -left-16 -top-16 size-48 rounded-full blur-3xl transition-opacity duration-700 ${open ? "opacity-100" : "opacity-0"}`}
                    style={{ background: `${faq.color}22` }}
                  />

                  <button
                    type="button"
                    id={`${id}-button`}
                    aria-expanded={open}
                    aria-controls={`${id}-panel`}
                    onClick={() => toggle(index)}
                    className="relative flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5 sm:py-5">
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition-all duration-500"
                      style={open ? { backgroundColor: faq.color, color: "#fff" } : { backgroundColor: `${faq.color}1A`, color: faq.color }}>
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" aria-hidden>
                        {faq.icon}
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-bold tracking-[0.14em] text-[#350C0E]/35">{String(index + 1).padStart(2, "0")}</span>
                      <span className="font-display block text-[0.98rem] font-semibold leading-snug text-[#350C0E] sm:text-lg">{faq.question}</span>
                    </span>
                    <span
                      data-open={open || undefined}
                      className={`faq-toggle grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                        open ? "border-transparent text-white" : "border-[#E2E8F0] text-[#350C0E]"
                      }`}
                      style={open ? { backgroundColor: faq.color } : undefined}>
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                        <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>

                  {/* Answer (height animated with GSAP) */}
                  <div
                    id={`${id}-panel`}
                    data-panel
                    role="region"
                    aria-labelledby={`${id}-button`}
                    className="relative overflow-hidden"
                    // Initial height only (first item starts open); GSAP owns it after that
                    style={{ height: index === 0 ? "auto" : 0 }}>
                    <p data-answer className="faq-answer text-sm leading-relaxed text-[#4A5268] sm:text-[0.95rem]">
                      {faq.answer}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
