"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

type WithLenis = { lenis?: Lenis };

/** Re-measures Lenis and every scroll animation (the shared footer's included) for the page as it is now */
function remeasure() {
  (window as unknown as WithLenis).lenis?.resize();
  ScrollTrigger.refresh();
}

/**
 * Smooth, inertia-based scrolling for the whole site.
 * Lenis smooths the native window scroll (so CSS sticky + ScrollTrigger pins keep working)
 * and is driven by GSAP's ticker so every scroll animation stays perfectly in sync.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

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
    (window as unknown as WithLenis).lenis = lenis;

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as WithLenis).lenis;
    };
  }, []);

  /*
   * The header and footer stay mounted across pages, so their scroll animations were measured against
   * whichever page was open first. Whenever the page grows or shrinks (a new page, images loading,
   * a filter changing the list), measure everything again so the footer reveals where it really is.
   */
  useEffect(() => {
    let lastHeight = 0;
    let timer: number | undefined;
    const observer = new ResizeObserver(() => {
      const height = document.documentElement.scrollHeight;
      if (Math.abs(height - lastHeight) < 2) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        remeasure();
        lastHeight = document.documentElement.scrollHeight;
      }, 150);
    });
    observer.observe(document.body);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  /* After moving to another page: measure once the new page has painted (Next.js handles the scroll position) */
  useEffect(() => {
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(remeasure);
    });
    const late = window.setTimeout(remeasure, 600);
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
      window.clearTimeout(late);
    };
  }, [pathname]);

  return null;
}
