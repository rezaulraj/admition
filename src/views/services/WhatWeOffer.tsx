"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

type Offer = {
  title: string;
  description: string;
  image: string;
};

const offers: Offer[] = [
  {
    title: "One-on-One Counselling",
    description:
      "From shortlisting the right country and university to finishing your admission paperwork, our counsellors stay by your side until you land the program that actually fits you.",
    image: "/consulting.png",
  },
  {
    title: "Test Prep That Delivers",
    description:
      "IELTS, PTE, or SAT, we've got you covered. If your spoken or written English needs work, our nearly three-decade track record in test prep gets you exam-ready.",
    image: "/testpre.png",
  },
  {
    title: "Scholarship Matching",
    description:
      "Our specialists pinpoint exactly which university, country, and program lines up with your profile and ambitions, then chase the highest scholarship so money worries stay off your plate.",
    image: "/scholarship.png",
  },
  {
    title: "Visa Filing, Handled",
    description:
      "Support doesn't stop at your offer letter. We manage your entire visa process, and we only charge for what the visa office itself requires, nothing extra on our end.",
    image: "/visa.png",
  },
  {
    title: "Travel & Stay Planning",
    description:
      "We help sort your flight bookings and line up accommodation, so you know exactly how you're getting there and where you're staying well before departure day.",
    image: "/travelAll.png",
  },
  {
    title: "We Stay In Touch After You Land",
    description:
      "Our relationship doesn't end at the airport. We check in long after you've settled abroad, because we're building lasting connections, not just processing applications.",
    image: "/airport.png",
  },
];

const heading = "What We Offer".split(" ");

// layout constants for the snake path (viewBox units)
const STEP_HEIGHT = 400;
const NODE_LEFT_X = 250;
const NODE_RIGHT_X = 750;
const VIEW_WIDTH = 1000;

export default function WhatWeOffer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pathBgRef = useRef<SVGPathElement>(null);
  const pathProgressRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  const totalHeight = offers.length * STEP_HEIGHT;

  const pathD = useMemo(() => {
    const pts = offers.map((_, i) => ({
      x: i % 2 === 0 ? NODE_LEFT_X : NODE_RIGHT_X,
      y: i * STEP_HEIGHT + STEP_HEIGHT / 2,
    }));

    let d = `M ${pts[0].x} 0 L ${pts[0].x} ${pts[0].y}`;

    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      const midY = (a.y + b.y) / 2;
      d += ` C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`;
    }

    const last = pts[pts.length - 1];
    d += ` L ${last.x} ${totalHeight}`;

    return d;
  }, [totalHeight]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".offer-word",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        },
      );

      gsap.fromTo(
        ".offer-subtitle",
        { y: 20, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        },
      );

      gsap.fromTo(
        underlineRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          delay: 0.35,
          ease: "power2.out",
          transformOrigin: "left center",
          immediateRender: false,
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        },
      );

      gsap.set(pathBgRef.current, { opacity: 1 });

      const progressPath = pathProgressRef.current;
      if (progressPath) {
        const pathLen = progressPath.getTotalLength();
        gsap.set(progressPath, {
          strokeDasharray: pathLen,
          strokeDashoffset: pathLen,
        });

        gsap.to(progressPath, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 65%",
            end: "bottom 75%",
            scrub: 0.6,
            onUpdate: (self) => {
              const point = progressPath.getPointAtLength(
                self.progress * pathLen,
              );
              gsap.set(dotRef.current, {
                attr: { cx: point.x, cy: point.y },
                opacity: self.progress > 0.01 ? 1 : 0,
              });
            },
          },
        });
      }

      itemRefs.current.forEach((item) => {
        if (!item) return;
        const node = item.querySelector("[data-node]");
        const textCard = item.querySelector("[data-text]");
        const imageBlock = item.querySelector("[data-image]");

        gsap.fromTo(
          node,
          { scale: 0.6, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.9)",
            scrollTrigger: { trigger: item, start: "top 75%" },
          },
        );

        gsap.fromTo(
          [textCard, imageBlock],
          { y: 70, opacity: 0, scale: 0.92, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: { trigger: item, start: "top 78%" },
          },
        );

        gsap.fromTo(
          item.querySelectorAll(".wo-reveal"),
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 70%" },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [pathD]);

  return (
    <section
      id="what-we-offer"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#FFFEFA] px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <div className="relative mx-auto w-fit overflow-visible pb-2">
            <h2 className="text-[34px] font-semibold leading-tight tracking-tight text-[#1B1B1B] sm:text-[46px] lg:text-[56px]">
              {heading.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="mr-3 inline-block overflow-hidden align-bottom"
                >
                  <span
                    className={`offer-word inline-block ${
                      word === "Offer" ? "text-[#1366E0]" : "text-[#1B1B1B]"
                    }`}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>
          </div>

          <p className="offer-subtitle mx-auto mt-6 max-w-2xl text-[15px] font-semibold leading-7 text-[#6B6B6B]">
            End-to-end study abroad support, built around every stage of your
            journey.
          </p>
        </div>

        <div ref={wrapRef} className="relative mx-auto max-w-6xl">
          {/* snake path — desktop only */}
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            viewBox={`0 0 ${VIEW_WIDTH} ${totalHeight}`}
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              ref={pathBgRef}
              d={pathD}
              stroke="rgba(27,27,27,0.1)"
              strokeWidth="3"
              fill="none"
            />
            <path
              ref={pathProgressRef}
              d={pathD}
              stroke="url(#offerGradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              style={{ filter: "drop-shadow(0 0 8px rgba(19,102,224,0.4))" }}
            />
            <defs>
              <linearGradient id="offerGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1366E0" />
                <stop offset="50%" stopColor="#F58B0F" />
                <stop offset="100%" stopColor="#1366E0" />
              </linearGradient>
            </defs>
            <circle
              ref={dotRef}
              r="9"
              fill="#1366E0"
              opacity="0"
              style={{ filter: "drop-shadow(0 0 12px rgba(19,102,224,0.8))" }}
            />
          </svg>

          <div>
            {offers.map((offer, index) => {
              const isTextLeft = index % 2 === 0;
              const number = String(index + 1).padStart(2, "0");
              const accent = index % 2 === 0 ? "#1366E0" : "#F58B0F";

              const TextCard = (
                <div
                  data-text
                  className="relative flex h-[280px] flex-col justify-center overflow-hidden rounded-[2rem] bg-[#1B1B1B] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.35)]"
                >
                  <span className="wo-reveal absolute right-6 top-6 select-none text-6xl font-black leading-none text-white/10">
                    {number}
                  </span>

                  <p
                    className="wo-reveal text-[10px] font-black uppercase tracking-[0.24em]"
                    style={{ color: accent }}
                  >
                    Offer {number}
                  </p>
                  <h3 className="wo-reveal mt-2 text-2xl font-semibold leading-tight tracking-[-0.02em] text-white">
                    {offer.title}
                  </h3>
                  <p className="wo-reveal mt-3 max-w-md text-sm font-medium leading-6 text-white/70">
                    {offer.description}
                  </p>

                  <div
                    className="wo-reveal mt-5 h-1 w-10 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                </div>
              );

              const ImageBlock = (
                <div
                  data-image
                  className="group relative h-[280px] w-full overflow-hidden rounded-[2rem] border shadow-[0_30px_100px_rgba(0,0,0,0.25)]"
                  style={{ borderColor: `${accent}33` }}
                >
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              );

              return (
                <div
                  key={offer.title}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  style={{ minHeight: STEP_HEIGHT }}
                  className="relative grid items-center gap-8 md:grid-cols-[1fr_90px_1fr]"
                >
                  {/* left column */}
                  <div className="hidden md:block md:pr-10">
                    {isTextLeft ? TextCard : ImageBlock}
                  </div>

                  {/* node */}
                  <div className="relative z-10 flex justify-start md:justify-center">
                    <div
                      data-node
                      className="group relative grid h-20 w-20 place-items-center rounded-full border bg-white backdrop-blur-xl transition-all duration-500 hover:scale-110"
                      style={{
                        borderColor: `${accent}55`,
                        boxShadow: `0 8px 30px -8px ${accent}40`,
                      }}
                    >
                      <div className="absolute inset-2 rounded-full border border-black/5" />
                      <div
                        className="grid h-12 w-12 place-items-center rounded-full text-sm font-black text-white"
                        style={{
                          backgroundColor: accent,
                          boxShadow: `0 0 20px ${accent}55`,
                        }}
                      >
                        {number}
                      </div>
                    </div>
                  </div>

                  {/* right column */}
                  <div className="hidden md:block md:pl-10">
                    {isTextLeft ? ImageBlock : TextCard}
                  </div>

                  {/* mobile stacked view — image then text card, every row */}
                  <div className="flex flex-col gap-5 md:hidden">
                    {ImageBlock}
                    {TextCard}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
