"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth, inertia-based scrolling for the whole site.
 * Lenis smooths the native window scroll (so CSS sticky + ScrollTrigger pins keep working)
 * and is driven by GSAP's ticker so every scroll animation stays perfectly in sync.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Respect users who prefer less motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease-out expo
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      anchors: { offset: -100 }, // in-page #links glide smoothly, clear of the sticky header
    });

    // Keep ScrollTrigger updated on every smoothed frame
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Let other components (e.g. "Back to top") reuse the same smooth scroller
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return null;
}
