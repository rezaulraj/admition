"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Value like "10000+" — the leading number animates, the rest is kept as a suffix. */
  value: string;
  duration?: number;
};

export default function CountUp({ value, duration = 1800 }: Props) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const isNumeric = match !== null;

  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isNumeric) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (reduceMotion) {
          setCurrent(target);
          return;
        }

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          // Ease-out so the count slows down as it reaches the target
          const eased = 1 - Math.pow(1 - progress, 3);
          setCurrent(Math.round(eased * target));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration, isNumeric]);

  if (!isNumeric) return <span>{value}</span>;

  return (
    <span ref={ref} aria-label={value} className="tabular-nums">
      {current}
      {suffix}
    </span>
  );
}
