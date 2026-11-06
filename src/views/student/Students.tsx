"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

import HeroStudent from "./HeroStudent";
import StickyStudentHeader from "./StickyStudentHeader";
import TrustedPartners from "./TrustedPartners";
import SuccessStories from "./SuccessStories";
import Solution from "../home/Solution";
import StudyDestinationsSection from "./StudyDestinationsSection";
import StudentCommunitySection from "./StudentCommunitySection";

const Students = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 🚀 ULTRA-SMOOTH LENIS CONFIG
      const lenis = new Lenis({
        duration: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        orientation: "vertical",
        touchMultiplier: 1.5,
        infinite: false,
      });

      // 🔗 Sync Lenis with GSAP
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      // 📊 Scroll Progress Bar
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
          transformOrigin: "left center",
        });
      }

      // 🌀 Scroll Velocity Parallax
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0") || 0.2;
        gsap.to(el, {
          y: () => -ScrollTrigger.maxScroll(window) * speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      });

      // ✨ Section Reveal - opacity and movement only, no blur
      gsap.utils.toArray<HTMLElement>(".gsap-section").forEach((section) => {
        // Parent section animation
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 80,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.6,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              end: "bottom 18%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Staggered child elements inside section
        const children = gsap.utils.toArray(".gsap-child", section);
        if (children.length > 0) {
          gsap.fromTo(
            children,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              stagger: 0.12,
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            },
          );
        }
      });

      // 🧹 Cleanup
      return () => {
        lenis.destroy();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative">
      {/* 📈 Scroll Progress Bar */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50 scale-x-0"
        style={{ transformOrigin: "left center" }}
      />

      {/* 🌀 Decorative Parallax Background */}
      <div
        data-parallax="0.05"
        className="fixed inset-0 -z-10 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      {/* 🎬 Sections */}
      <div className="gsap-section">
        <HeroStudent />
      </div>
      <div className="gsap-section">
        <StickyStudentHeader />
      </div>
      <div className="gsap-section">
        <TrustedPartners />
      </div>
      <div className="gsap-section">
        <SuccessStories />
      </div>
      <div className="gsap-section">
        <Solution />
      </div>
      <div className="gsap-section">
        <StudyDestinationsSection />
      </div>
      <div className="gsap-section">
        <StudentCommunitySection />
      </div>
    </div>
  );
};

export default Students;
