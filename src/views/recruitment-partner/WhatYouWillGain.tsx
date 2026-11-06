"use client";

import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

type Benefit = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const benefits: Benefit[] = [
  {
    title: "Smart Platform Access",
    description:
      "Easily manage student applications, upload documents, and track status, all from one secure dashboard.",
    icon: (
      <path d="M4 4h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-6l1 3H9l1-3H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm1 2v10h14V6H5Zm2 2h6v2H7V8Zm0 3h10v2H7v-2Z" />
    ),
  },
  {
    title: "Hassle-Free Local Payments",
    description:
      "Pay locally in your own currency, no conversion, no fees, no delays. Fast, easy, and hassle-free for bookings, fees, and insurance.",
    icon: (
      <path d="M12 2 3 6v2h18V6l-9-4Zm-8 8v8H3v2h18v-2h-1v-8h-2v8h-3v-8h-2v8h-3v-8H8v8H5v-8H4Z" />
    ),
  },
  {
    title: "Competitive Commission Structure",
    description:
      "Earn high-value commissions and unlock tier-based bonuses as your referrals and placements grow.",
    icon: <path d="M4 20V10h4v10H4Zm6 0V4h4v16h-4Zm6 0v-7h4v7h-4Z" />,
  },
  {
    title: "Real-Time Updates",
    description:
      "Stay informed with live application status, instant notifications, and document verification as it happens.",
    icon: (
      <path d="M12 2a7 7 0 0 0-7 7v4l-2 3v1h18v-1l-2-3V9a7 7 0 0 0-7-7Zm0 20a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Z" />
    ),
  },
  {
    title: "Partner With Leading Universities",
    description:
      "Connect students to institutions across the UK, Canada, Germany, Hungary, and many more destinations.",
    icon: (
      <path d="m12 2 10 5-10 5L2 7l10-5Zm-7 8.5 7 3.5 7-3.5V16l-7 3.5L5 16v-5.5Z" />
    ),
  },
];

const STEP_HEIGHT = 220;
const COL_LEFT_X = 60;
const COL_RIGHT_X = 100;
const VIEW_WIDTH = 160;

export default function WhatYouWillGain() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pathBgRef = useRef<SVGPathElement>(null);
  const pathProgressRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  const totalHeight = benefits.length * STEP_HEIGHT;

  const pathD = useMemo(() => {
    const pts = benefits.map((_, i) => ({
      x: i % 2 === 0 ? COL_LEFT_X : COL_RIGHT_X,
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
            start: "top 70%",
            end: "bottom 85%",
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
        const icon = item.querySelector("[data-icon]");
        const text = item.querySelector("[data-text]");

        gsap.fromTo(
          icon,
          { scale: 0.5, opacity: 0, rotate: -8 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 0.6,
            ease: "back.out(1.9)",
            scrollTrigger: { trigger: item, start: "top 80%" },
          },
        );

        gsap.fromTo(
          text,
          { x: 24, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 78%" },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [pathD]);

  return (
    <section ref={sectionRef} className="w-full bg-[#FFFEFA] px-6 py-20">
      <div className="mx-auto container max-w-3xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl">
          What You Will <span className="text-[#1366E0]">Gain</span>
        </h2>

        <div ref={wrapRef} className="relative mt-14">
          {/* snake path behind the icons */}
          <svg
            className="pointer-events-none absolute left-0 top-0 hidden h-full w-[160px] sm:block"
            viewBox={`0 0 ${VIEW_WIDTH} ${totalHeight}`}
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              ref={pathBgRef}
              d={pathD}
              stroke="rgba(27,27,27,0.1)"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              ref={pathProgressRef}
              d={pathD}
              stroke="url(#gainGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              style={{ filter: "drop-shadow(0 0 6px rgba(19,102,224,0.4))" }}
            />
            <defs>
              <linearGradient id="gainGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1366E0" />
                <stop offset="50%" stopColor="#F58B0F" />
                <stop offset="100%" stopColor="#1366E0" />
              </linearGradient>
            </defs>
            <circle
              ref={dotRef}
              r="6"
              fill="#1366E0"
              opacity="0"
              style={{ filter: "drop-shadow(0 0 8px rgba(19,102,224,0.8))" }}
            />
          </svg>

          <div className="flex flex-col gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                style={{ minHeight: STEP_HEIGHT * 0.55 }}
                className="relative flex items-center gap-6 rounded-2xl border border-[#ECECEC] bg-white p-6 shadow-sm sm:pl-24"
              >
                <div
                  data-icon
                  className="absolute left-4 top-1/2 hidden h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-[#1366E0]/10 sm:flex"
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="#1366E0"
                  >
                    {benefit.icon}
                  </svg>
                </div>

                <div
                  data-icon
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1366E0]/10 sm:hidden"
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="#1366E0"
                  >
                    {benefit.icon}
                  </svg>
                </div>

                <div data-text>
                  <h3 className="text-base font-semibold text-[#1B1B1B] sm:text-lg">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#6B6B6B]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
