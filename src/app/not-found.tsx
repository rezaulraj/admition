"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const STAR_COUNT = 60;

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const stars = Array.from({ length: STAR_COUNT }).map((_, i) => ({
  left: `${seededRandom(i * 1.1) * 100}%`,
  top: `${seededRandom(i * 2.3) * 100}%`,
  size: 1 + seededRandom(i * 3.7) * 2,
  delay: seededRandom(i * 4.9) * 4,
}));

export default function NotFound() {
  const rocketRef = useRef<HTMLDivElement>(null);
  const planetRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(rocketRef.current, {
        y: -22,
        rotate: -4,
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(planetRef.current, {
        rotate: 360,
        duration: 40,
        ease: "none",
        repeat: -1,
      });

      const starEls = starsRef.current?.querySelectorAll("[data-star]");
      starEls?.forEach((el, i) => {
        gsap.to(el, {
          opacity: 0.15,
          duration: 1.2 + (i % 5) * 0.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: stars[i]?.delay ?? 0,
        });
      });

      gsap.fromTo(
        contentRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.2 },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0B0B14] px-6 py-20 text-center">
      <div ref={starsRef} className="pointer-events-none absolute inset-0">
        {stars.map((star, i) => (
          <span
            key={i}
            data-star
            className="absolute rounded-full bg-white"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              opacity: 0.9,
            }}
          />
        ))}
      </div>

      <div
        ref={planetRef}
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full sm:h-72 sm:w-72"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, #4A90F0 0%, #1366E0 55%, #0B2A66 100%)",
          boxShadow: "0 0 80px rgba(19,102,224,0.35)",
        }}
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-10 h-40 w-40 rounded-full opacity-40 blur-2xl sm:h-56 sm:w-56"
        style={{ background: "#2F5DA8" }}
      />

      <div ref={rocketRef} className="relative z-10 mb-8">
        <svg width="90" height="90" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2c2.8 2.2 4 5.4 4 9 0 2-.5 3.7-1.2 5.1L12 19l-2.8-2.9C8.5 14.7 8 13 8 11c0-3.6 1.2-6.8 4-9Z"
            fill="#1366E0"
          />
          <circle cx="12" cy="9.5" r="1.8" fill="#FFFEFA" />
          <path d="M8 15.5 5 20l4-1.5.6-2.4Z" fill="#F58B0F" />
          <path d="M16 15.5 19 20l-4-1.5-.6-2.4Z" fill="#F58B0F" />
          <path d="M10.5 18.5 12 22l1.5-3.5-1.5-.7Z" fill="#FFD166" />
        </svg>
      </div>

      <div ref={contentRef} className="relative z-10 max-w-lg">
        {/* <p className="text-8xl font-black tracking-tight text-white sm:text-9xl">
          404
        </p> */}
        <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
          Looks like you&apos;ve drifted out of orbit
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
          The page you&apos;re looking for doesn&apos;t exist, or it&apos;s
          floating somewhere we haven&apos;t mapped yet. Let&apos;s get you back
          on course.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#1B1B1B] shadow-lg transition-transform hover:scale-105"
        >
          Take Me Home
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
