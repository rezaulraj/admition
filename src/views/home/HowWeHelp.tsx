"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradCap from "@/components/common/GradCap";

gsap.registerPlugin(ScrollTrigger);

type Tone = "blue" | "green" | "orange";

const TONES: Record<Tone, { bg: string; solid: string; text: string; blob: string; glow: string }> = {
  blue: {
    bg: "linear-gradient(135deg,#F3F7FF 0%,#E4EDFF 100%)",
    solid: "#2F6BFF",
    text: "#2F6BFF",
    blob: "linear-gradient(160deg,#5B8CFF,#2F6BFF)",
    glow: "rgba(47,107,255,0.28)",
  },
  green: {
    bg: "linear-gradient(135deg,#F1FBF3 0%,#DDF3E2 100%)",
    solid: "#2FA84F",
    text: "#2FA84F",
    blob: "linear-gradient(160deg,#6FD07A,#2FA84F)",
    glow: "rgba(47,168,79,0.25)",
  },
  orange: {
    bg: "linear-gradient(135deg,#FFF7EF 0%,#FFE6CF 100%)",
    solid: "#F7931E",
    text: "#EE7A0C",
    blob: "linear-gradient(160deg,#FFB25E,#F7931E)",
    glow: "rgba(247,147,30,0.3)",
  },
};

type Service = {
  title: string;
  description: string;
  tone: Tone;
  icon: ReactNode;
  art: ReactNode;
};

/** Photo that melts into the card from the left */
function Photo({ src, alt, position = "center" }: { src: string; alt: string; position?: string }) {
  return (
    <div className="absolute inset-0 [mask-image:linear-gradient(90deg,transparent_0%,black_32%)]">
      <div data-parallax className="absolute inset-0 scale-110">
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" style={{ objectPosition: position }} />
      </div>
    </div>
  );
}

function CapAndBooks() {
  const books = [
    { y: 150, w: 210, c: "#1E2F5C", band: "#F7931E" },
    { y: 122, w: 196, c: "#2FA84F", band: "#FFFFFF" },
    { y: 94, w: 204, c: "#2F6BFF", band: "#FFD08A" },
  ];
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative w-[70%] max-w-[22rem]">
        <svg viewBox="0 0 240 190" className="w-full drop-shadow-[0_24px_24px_rgba(20,33,61,0.25)]" aria-hidden>
          {books.map((b, i) => (
            <g key={i}>
              <rect x={(240 - b.w) / 2} y={b.y} width={b.w} height="26" rx="5" fill={b.c} />
              <rect x={(240 - b.w) / 2 + 10} y={b.y + 4} width="8" height="18" rx="2" fill={b.band} opacity="0.9" />
              <rect x={(240 - b.w) / 2 + b.w - 30} y={b.y + 6} width="22" height="14" rx="2" fill="#fff" opacity="0.85" />
            </g>
          ))}
        </svg>
        <div data-float className="absolute -top-[18%] left-[8%] w-[84%] -rotate-[8deg]">
          <GradCap className="drop-shadow-[0_18px_18px_rgba(20,33,61,0.35)]" />
        </div>
      </div>
    </div>
  );
}

const services: Service[] = [
  {
    title: "College & University Admission",
    description:
      "We simplify the admission process, helping you pick the right course and put together strong SOPs, documents, and applications.",
    tone: "blue",
    icon: <path d="M12 2 2 8l10 5 8-4v6h2V8L12 2Zm0 8L4 8l8-4 8 4-8 4Zm-6 2v4c0 1.66 2.69 3 6 3s6-1.34 6-3v-4l-6 3-6-3Z" />,
    art: (
      <div className="absolute inset-0 [mask-image:linear-gradient(90deg,transparent_0%,black_25%)]">
        <div data-parallax className="absolute bottom-0 right-[6%] h-[96%] w-[80%]">
          <Image
            src="/herotransparent.png"
            alt="Student ready for university admission"
            fill
            sizes="(min-width: 1024px) 35vw, 80vw"
            className="object-contain object-bottom drop-shadow-[0_24px_30px_rgba(20,33,61,0.25)]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Scholarship Assistance",
    description:
      "We match you with scholarships that fit your profile and help with essays, documentation, and every deadline in between.",
    tone: "green",
    icon: <path d="M12 2 4 5v6c0 5.5 3.4 10.7 8 12 4.6-1.3 8-6.5 8-12V5l-8-3Zm-1.2 13.4-3.2-3.2 1.4-1.4 1.8 1.8 4.6-4.6 1.4 1.4-6 6Z" />,
    art: <CapAndBooks />,
  },
  {
    title: "Financial Documentation",
    description:
      "Clear guidance on bank statements, income proof, and sponsorship letters, prepared accurately and delivered on time.",
    tone: "orange",
    icon: <path d="M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm1 2v10h14V6H5Zm2 2h6v2H7V8Zm0 3h10v2H7v-2Z" />,
    art: <Photo src="/scholarship.png" alt="Counsellor reviewing financial documents with a student" position="40% center" />,
  },
  {
    title: "Career Counselling",
    description:
      "Personalized advice built around your background and goals, helping you land on the career path that actually fits.",
    tone: "blue",
    icon: <path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 2c-2.7 0-8 1.3-8 4v3h10v-3c0-1.1.4-2.1 1.2-2.9A11 11 0 0 0 8 13Zm8 0c-.3 0-.7 0-1.1.1 1.2.9 2.1 2.1 2.1 3.9v3h7v-3c0-2.7-5.3-4-8-4Z" />,
    art: <Photo src="/carrer.png" alt="Career counsellors at Admission OnBoard" position="65% center" />,
  },
  {
    title: "Pre-Departure Guidance",
    description:
      "Travel prep, orientation, and a clear picture of what to expect, so you arrive confident and ready for day one.",
    tone: "orange",
    icon: <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z" />,
    art: <Photo src="/airport.png" alt="Student getting pre-departure guidance on a video call" position="70% center" />,
  },
  {
    title: "Test Preparation",
    description:
      "In-house coaching for IELTS, TOEFL, GRE, GMAT, and SAT, designed to help you hit the score your target program needs.",
    tone: "blue",
    icon: <path d="M21 5c-1.1-.35-2.3-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1Zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5Z" />,
    art: <Photo src="/testpre.png" alt="IELTS, PTE and SAT coaching session" position="60% center" />,
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

/* Floating tag labels around the headline (position, colour, depth for parallax) */
/** `at` is an inline position (kept out of Tailwind so it always applies); tags sit in the empty space right of the headline */
type FloatTag = { label?: string; icon?: ReactNode; at: CSSProperties; bg: string; fg: string; rot: number; depth: number; mobile?: boolean; desktopHidden?: boolean };
const TAGS: FloatTag[] = [
  { label: "Universities", at: { left: "3%", top: "2%" }, bg: "#FF8A3D", fg: "#350C0E", rot: -5, depth: 1.2, mobile: true },
  {
    icon: <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4Z" />,
    at: { right: "7%", top: "6%" }, bg: "#9DB8FF", fg: "#fff", rot: 6, depth: 0.8, mobile: true,
  },
  { label: "Scholarship", at: { left: "18%", top: "84%" }, bg: "#FDB52A", fg: "#350C0E", rot: -3, depth: 1.5 },
  {
    icon: <path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3Zm-6.8 9.2V16c0 1.9 3 3.8 6.8 3.8s6.8-1.9 6.8-3.8v-3.8L12 16l-6.8-3.8Z" />,
    at: { left: "3%", top: "52%" }, bg: "#6366F1", fg: "#fff", rot: 4, depth: 1.1, mobile: true,
  },
  { label: "Visa", at: { right: "4%", top: "60%" }, bg: "#4CC46B", fg: "#0E3B1C", rot: 5, depth: 1.3 },
  { label: "IELTS Prep", at: { left: "60%", bottom: "0%" }, bg: "#2F6BFF", fg: "#fff", rot: -4, depth: 0.9 },
];

function Tag({ tag }: { tag: FloatTag }) {
  return (
    <span
      data-tag
      data-depth={tag.depth}
      aria-hidden
      style={tag.at}
      className={`pointer-events-none absolute z-10 ${tag.mobile ? "hwh-tag-m" : "hwh-tag"}`}>
      <span data-tag-float className="block">
        <span
          data-tag-pop
          className="flex items-center gap-2 py-2 pl-4 pr-6 text-[0.7rem] font-semibold uppercase tracking-[0.08em] shadow-[0_14px_28px_-14px_rgba(20,33,61,0.55)] sm:py-2.5 sm:text-sm [clip-path:polygon(0_0,calc(100%-14px)_0,100%_50%,calc(100%-14px)_100%,0_100%)] rounded-l-lg"
          style={{ background: tag.bg, color: tag.fg }}>
          {tag.icon ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 sm:size-6">
              {tag.icon}
            </svg>
          ) : (
            tag.label
          )}
        </span>
      </span>
    </span>
  );
}

const HEADLINE: { word: string; accent?: boolean }[][] = [
  [{ word: "Everything" }, { word: "you" }],
  [{ word: "need." }, { word: "All" }, { word: "in" }, { word: "one" }],
  [{ word: "place.", accent: true }],
];

/** How many words sit on each line once the title has shrunk: "Everything you need." / "All in one place." */
const COMPACT_ROWS = [3, 4];

export default function HowWeHelp() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add(
      { isDesktop: "(min-width: 1024px)", motionOK: "(prefers-reduced-motion: no-preference)" },
      (ctx) => {
        const { isDesktop, motionOK } = ctx.conditions as { isDesktop: boolean; motionOK: boolean };
        if (!motionOK) return;
        const cards = q("[data-card]") as HTMLElement[];
        // Heading
        gsap.fromTo(
          q("[data-intro]"),
          { autoAlpha: 0, y: 30, filter: "blur(6px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 75%", once: true },
          },
        );

        cards.forEach((card) => {
          const c = gsap.utils.selector(card);

          // Card rises in, then its content plays in
          gsap
            .timeline({ scrollTrigger: { trigger: card, start: "top 85%", once: true }, defaults: { ease: "expo.out" } })
            .fromTo(card, { autoAlpha: 0, y: 80, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.1 })
            .fromTo(c("[data-icon]"), { scale: 0, rotate: -30 }, { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(2.2)" }, 0.25)
            .fromTo(c("[data-word]"), { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.06 }, 0.3)
            .fromTo(c("[data-fade]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0.5)
            .fromTo(c("[data-art]"), { autoAlpha: 0, x: 60 }, { autoAlpha: 1, x: 0, duration: 1.2 }, 0.2);

          // Image drifts with scroll
          gsap.fromTo(
            c("[data-parallax]"),
            { yPercent: 6 },
            { yPercent: -6, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1 } },
          );

        });

        gsap.to(q("[data-float]"), { y: -12, rotate: -4, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1 });

        if (isDesktop) {
          const headEl = q("[data-head]")[0] as HTMLElement;
          const shrinkEl = q("[data-shrink]")[0] as HTMLElement;
          const titleBox = q("[data-titlebox]")[0] as HTMLElement;
          const lines = q("[data-hline]") as HTMLElement[];
          // The compact title is one line shorter, so the cards can stop that much higher
          const stackTop = () => 96 + (titleBox.offsetTop + titleBox.offsetHeight - lines[0].offsetHeight) * 0.32 + 10;

          // Offset that moves each word from the three-line layout into the two-line one
          const compactOffsets = () => {
            const title = lines[0].parentElement as HTMLElement;
            const gap = parseFloat(getComputedStyle(title).fontSize) * 0.22; // the words' mr-[0.22em]
            const lineHeight = lines[0].offsetHeight;
            const lefts = (widths: number[]) => {
              const total = widths.reduce((sum, w) => sum + w, 0) + gap * (widths.length - 1);
              let x = (title.offsetWidth - total) / 2;
              return widths.map((w) => {
                const left = x;
                x += w + gap;
                return left;
              });
            };
            const from = lines.flatMap((line, row) => {
              const slots = gsap.utils.toArray<HTMLElement>("[data-hslot]", line);
              return lefts(slots.map((w) => w.offsetWidth)).map((left) => ({ left, row }));
            });
            const widths = (q("[data-hslot]") as HTMLElement[]).map((w) => w.offsetWidth);
            let start = 0;
            const to = COMPACT_ROWS.flatMap((count, row) => {
              const placed = lefts(widths.slice(start, start + count)).map((left) => ({ left, row }));
              start += count;
              return placed;
            });
            return from.map((f, i) => ({ x: to[i].left - f.left, y: (to[i].row - f.row) * lineHeight }));
          };

          // Where the shrunk title ends → where the cards stop
          const setStackTop = () => el.style.setProperty("--stack-top", `${Math.round(stackTop())}px`);
          setStackTop();
          const ro = new ResizeObserver(() => {
            setStackTop();
            ScrollTrigger.refresh();
          });
          ro.observe(titleBox);
          ctx.add(() => () => ro.disconnect());

          // Title shrinks smoothly into a compact sticky header
          const shrink = { trigger: headEl, start: "top 96px", end: "+=440", scrub: 0.8 };
          gsap.fromTo(shrinkEl, { scale: 1 }, { scale: 0.32, ease: "power2.inOut", scrollTrigger: shrink });
          // While it shrinks, the words glide from three lines into two
          gsap.fromTo(
            q("[data-hslot]"),
            { x: 0, y: 0 },
            {
              x: (i: number) => compactOffsets()[i].x,
              y: (i: number) => compactOffsets()[i].y,
              ease: "power2.inOut",
              scrollTrigger: { ...shrink, invalidateOnRefresh: true },
            },
          );
          // The words changing line would cross the others, so they fade out on the way and back in on arrival
          const offsets = compactOffsets();
          const travellers = (q("[data-hslot]") as HTMLElement[]).filter((_, i) => offsets[i].y !== 0);
          gsap
            .timeline({ defaults: { ease: "none" }, scrollTrigger: shrink })
            .fromTo(travellers, { opacity: 1 }, { opacity: 0, duration: 0.3 }, 0)
            .to(travellers, { opacity: 1, duration: 0.28 }, 0.72);
          gsap.fromTo(q("[data-shrink-fade]"), { opacity: 1, y: 0 }, { opacity: 0, y: -20, ease: "power1.out", scrollTrigger: { ...shrink, end: "+=200" } });
          gsap.fromTo(q("[data-tag]"), { opacity: 1 }, { opacity: 0, ease: "power1.out", scrollTrigger: { ...shrink, end: "+=260" } });

          // As the next card slides over, the one underneath eases back
          cards.forEach((card, i) => {
            if (i === cards.length - 1) return;
            const sink = {
              trigger: cards[i + 1],
              start: "top bottom",
              end: () => `top ${stackTop() + (i + 1) * 14}px`,
              scrub: 1,
              invalidateOnRefresh: true,
            };
            gsap.fromTo(card, { scale: 1 }, { scale: 0.93 + i * 0.01, ease: "power1.inOut", immediateRender: false, scrollTrigger: sink });
            gsap.fromTo(gsap.utils.selector(card)("[data-veil]"), { opacity: 0 }, { opacity: 1, ease: "power1.inOut", immediateRender: false, scrollTrigger: sink });
          });
        }

        /* Big headline + floating tags */
        const head = q("[data-head]")[0] as HTMLElement;
        const tags = q("[data-tag]") as HTMLElement[];
        gsap
          .timeline({ scrollTrigger: { trigger: head, start: "top 80%", once: true }, defaults: { ease: "expo.out" } })
          .fromTo(q("[data-hword]"), { yPercent: 115, rotate: 4, autoAlpha: 0 }, { yPercent: 0, rotate: 0, autoAlpha: 1, duration: 1.2, stagger: 0.07 }, 0)
          .fromTo(
            q("[data-tag-pop]"),
            { scale: 0, autoAlpha: 0, rotate: (i: number) => (i % 2 ? 30 : -30) },
            { scale: 1, autoAlpha: 1, rotate: (i: number) => TAGS[i].rot, duration: 0.9, stagger: 0.1, ease: "back.out(2.2)" },
            0.45,
          );

        // Idle float, each tag on its own rhythm
        q("[data-tag-float]").forEach((f, i) =>
          gsap.to(f, {
            y: i % 2 ? 10 : -10,
            x: i % 3 ? 4 : -4,
            rotate: i % 2 ? 2 : -2,
            duration: 2.2 + i * 0.35,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          }),
        );

        // Scroll parallax: deeper tags drift further (desktop fades them out instead)
        if (!isDesktop) tags.forEach((tag) =>
          gsap.fromTo(
            tag,
            { y: () => 60 * Number(tag.dataset.depth) },
            {
              y: () => -60 * Number(tag.dataset.depth),
              ease: "none",
              scrollTrigger: { trigger: head, start: "top bottom", end: "bottom top", scrub: 1.2, invalidateOnRefresh: true },
            },
          ),
        );

        // Desktop: tags lean toward the cursor
        if (isDesktop) {
          const movers = tags.map((tag) => ({
            x: gsap.quickTo(tag.querySelector("[data-tag-pop]")!, "x", { duration: 0.8, ease: "power3.out" }),
            d: Number(tag.dataset.depth),
          }));
          const onMove = (e: PointerEvent) => {
            const r = head.getBoundingClientRect();
            const nx = (e.clientX - r.left) / r.width - 0.5;
            movers.forEach((m) => m.x(nx * 40 * m.d));
          };
          const onLeave = () => movers.forEach((m) => m.x(0));
          head.addEventListener("pointermove", onMove);
          head.addEventListener("pointerleave", onLeave);
          return () => {
            head.removeEventListener("pointermove", onMove);
            head.removeEventListener("pointerleave", onLeave);
          };
        }
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="hwh relative w-full bg-[#FFFEFA] px-6 py-20 sm:py-24">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .hwh [data-intro], .hwh [data-card], .hwh [data-hword], .hwh [data-tag-pop] { visibility: hidden; }
        }
        /* Layout lives here so it never depends on Tailwind generating new class names */
        .hwh { overflow-x: clip; }
        .hwh .hwh-head { position: relative; max-width: 72rem; margin: 0 auto; text-align: center; }
        .hwh .hwh-title { font-size: clamp(2.9rem, 9vw, 8.5rem); }
        .hwh .hwh-tag { display: none; }
        .hwh .hwh-tag-m { display: flex; }
        .hwh .hwh-stack { display: flex; flex-direction: column; gap: 2rem; max-width: 72rem; margin: 3.5rem auto 0; }
        @media (min-width: 640px) { .hwh .hwh-tag { display: flex; } }
        @media (min-width: 1024px) {
          /* Title pins under the site header and shrinks; cards stack just below it */
          .hwh .hwh-head { position: sticky; top: 96px; z-index: 1; }
          .hwh .hwh-stack { position: relative; z-index: 2; gap: 2.5rem; padding-bottom: 8vh; }
          .hwh .hwh-slot { position: sticky; }
          .hwh .hwh-card { height: clamp(28rem, calc(100svh - var(--stack-top, 300px) - 2rem), 34rem); grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); }
        }
      `}</style>

      <div>
        <div data-head className="hwh-head">
          <div data-shrink className="origin-top will-change-transform">
          <div data-shrink-fade>
            <span data-intro className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-[#2F6BFF]">
              <span className="h-3.5 w-4 bg-[#2F6BFF] [clip-path:polygon(0_0,65%_0,100%_50%,65%_100%,0_100%)]" />
              How We Help
            </span>
          </div>

          <div data-titlebox className="relative mt-4 py-6 sm:py-10">
            {TAGS.map((tag, ti) => (
              <Tag key={ti} tag={tag} />
            ))}
            <h2
              aria-label={HEADLINE.map((line) => line.map((w) => w.word).join(" ")).join(" ")}
              className="hwh-title font-display relative font-semibold leading-[0.95] tracking-[-0.045em] text-[#350C0E]">
              {HEADLINE.map((line, li) => (
                <span key={li} data-hline aria-hidden className="block origin-center will-change-transform">
                  {line.map(({ word, accent }) => (
                    <span key={word} data-hslot className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] align-top last:mr-0">
                      <span data-hword className={`inline-block ${accent ? "text-[#F7931E]" : ""}`}>
                        {word.split("").map((ch, ci) => (
                          <span key={ci} data-hchar className="inline-block">
                            {ch}
                          </span>
                        ))}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </h2>
          </div>

          <div data-shrink-fade>
            <p data-intro className="mx-auto mt-2 max-w-xl text-sm text-[#4A5268] sm:text-lg">
              From admissions to visas, end-to-end support from our certified education specialists, every step of the way.
            </p>
          </div>
          </div>
        </div>

        <div data-stack className="hwh-stack">
        {services.map((s, i) => {
          const t = TONES[s.tone];
          return (
            <div
              key={s.title}
              data-slot
              className="hwh-slot"
              style={{ top: `calc(var(--stack-top, 300px) + ${i * 14}px)` } as CSSProperties}>
              <div data-resolve className="origin-top will-change-transform">
              <article
                data-card
                className="hwh-card group relative grid origin-top overflow-hidden rounded-[2rem] border border-white shadow-[0_30px_60px_-30px_rgba(20,33,61,0.35)] will-change-transform"
                style={{ background: t.bg }}>
                {/* Decorative corner blob + glow */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full opacity-90"
                  style={{ background: t.blob }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-32 left-1/3 size-80 rounded-full blur-3xl"
                  style={{ background: t.glow }}
                />

                {/* Veil that softly fades in as the next card covers this one */}
                <span aria-hidden data-veil className="pointer-events-none absolute inset-0 z-20 bg-[#14213D]/[0.06] opacity-0" />

                {/* Content */}
                <div className="relative z-10 flex flex-col p-7 sm:p-10 lg:p-12">
                  <div className="flex items-center gap-4">
                    <span
                      data-icon
                      className="grid size-14 place-items-center rounded-2xl text-white shadow-lg"
                      style={{ background: t.solid, boxShadow: `0 14px 28px -10px ${t.glow}` }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="size-7" aria-hidden>
                        {s.icon}
                      </svg>
                    </span>
                    <span data-fade className="font-display text-3xl font-semibold tracking-[-0.03em]" style={{ color: t.text }}>
                      {pad(i + 1)}
                    </span>
                  </div>

                  <h3 className="font-display mt-6 text-[clamp(1.6rem,2.3vw,2.3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#350C0E]">
                    {s.title.split(" ").map((w, wi) => (
                      <span key={wi} className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-top last:mr-0">
                        <span data-word className="inline-block">
                          {w}
                        </span>
                      </span>
                    ))}
                  </h3>

                  <p data-fade className="mt-4 max-w-md text-base leading-relaxed text-[#4A5268] sm:text-lg">
                    {s.description}
                  </p>

                  <div data-fade className="mt-8 lg:mt-auto">
                    <Link
                      href="/services"
                      aria-label={`Learn more about ${s.title}`}
                      className="inline-flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-5 text-sm font-semibold text-[#350C0E] transition-colors duration-300 hover:bg-white/70">
                      <span
                        className="grid size-11 place-items-center rounded-full text-white transition-transform duration-300 group-hover:translate-x-1"
                        style={{ background: t.solid }}>
                        <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
                          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      Learn more
                    </Link>
                  </div>
                </div>

                {/* Art */}
                <div data-art className="relative h-64 sm:h-80 lg:h-auto">
                  {s.art}
                </div>
              </article>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
