"use client";

import { useId } from "react";

/** Graduation cap illustration in the brand navy + orange. Gradient ids are unique per instance. */
export default function GradCap({ className = "" }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const top = `cap-top-${uid}`;
  const band = `cap-band-${uid}`;

  return (
    <svg viewBox="0 0 200 124" className={`h-auto w-full ${className}`} aria-hidden>
      <defs>
        <linearGradient id={top} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3A4A80" />
          <stop offset="1" stopColor="#14213D" />
        </linearGradient>
        <linearGradient id={band} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F9A93F" />
          <stop offset="1" stopColor="#E07B0A" />
        </linearGradient>
      </defs>
      <path d="M50 52 L50 90 Q100 114 150 90 L150 52 L100 70 Z" fill="#0E1830" />
      <path d="M50 78 Q100 102 150 78 L150 90 Q100 114 50 90 Z" fill={`url(#${band})`} />
      <polygon points="100,6 197,40 100,74 3,40" fill={`url(#${top})`} />
      <polygon points="100,6 197,40 100,14 3,40" fill="#fff" opacity="0.12" />
      <circle cx="100" cy="40" r="5" fill="#F7931E" />
      <path d="M100 40 Q140 42 172 50 L174 92" fill="none" stroke="#F7931E" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M167 90 h14 l3 26 h-20 z" fill={`url(#${band})`} />
    </svg>
  );
}
