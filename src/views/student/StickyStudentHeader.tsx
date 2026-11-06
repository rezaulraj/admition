"use client";

import { useState, useEffect, useRef, type ComponentType } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Search from "./Search";
import Apply from "./Apply";
import Funding from "./Funding";
import Payments from "./Payments";
import Visa from "./Visa";

gsap.registerPlugin(ScrollTrigger);

interface SectionDef {
  id: string;
  label: string;
  color: string;
  hasCustom: boolean;
  component: ComponentType;
}

const StickyStudentHeader = () => {
  const [activeSection, setActiveSection] = useState("search");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  const sections: SectionDef[] = [
    {
      id: "search",
      label: "SEARCH",
      color: "bg-primary-500",
      hasCustom: true,
      component: Search,
    },
    {
      id: "apply",
      label: "APPLY",
      color: "bg-purple-500",
      hasCustom: true,
      component: Apply,
    },
    {
      id: "Funding",
      label: "FUNDING",
      color: "bg-orange-500",
      hasCustom: true,
      component: Funding,
    },
    {
      id: "payments",
      label: "PAYMENTS",
      color: "bg-pink-500",
      hasCustom: true,
      component: Payments,
    },
    {
      id: "visa",
      label: "VISA",
      color: "bg-green-500",
      hasCustom: true,
      component: Visa,
    },
  ];

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // ✨ GSAP Animations
  useGSAP(
    () => {
      // Animate each section content when it enters viewport
      sections.forEach((section) => {
        const el = sectionRefs.current[section.id];
        if (!el) return;

        // Section fade-in from below
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              end: "bottom 18%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Staggered children inside each section
        const children = gsap.utils.toArray(".gsap-child", el);
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
                trigger: el,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            },
          );
        }
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [] },
  );

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-120px 0px -80% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const lastSection = sectionRefs.current["visa"];
      const lastSectionEnd =
        lastSection && lastSection.offsetTop + lastSection.offsetHeight;

      if (lastSectionEnd && scrollPosition >= lastSectionEnd - 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      const offset = 160;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div
        id="sticky-header"
        className={`sticky top-20 z-40 transition-all duration-500 ease-in-out ${
          isHeaderVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-bold text-center text-neutral-800 mb-5">
              5 Steps to Study Success
            </h2>

            <nav className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    relative px-4 sm:px-5 lg:px-6 py-2.5 rounded-full font-semibold font-sans text-xs sm:text-sm uppercase tracking-wide
                    transition-all duration-300 ease-out
                    ${
                      activeSection === section.id
                        ? `${section.color} text-white shadow-lg scale-105 ring-2 ring-offset-2 ring-current`
                        : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700 hover:scale-105"
                    }
                  `}
                >
                  {activeSection === section.id && (
                    <span
                      className={`absolute inset-0 rounded-full animate-ping opacity-20 ${section.color}`}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${activeSection === section.id ? "bg-white" : "bg-neutral-400"}`}
                    />
                    {section.label}
                  </span>
                </button>
              ))}
            </nav>

            <div className="mt-5 flex justify-center">
              <div className="flex items-center gap-1">
                {sections.map((section, index) => (
                  <div key={section.id} className="flex items-center">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                        activeSection === section.id
                          ? `${section.color} w-12 sm:w-16`
                          : sections.findIndex((s) => s.id === activeSection) >
                              index
                            ? `${section.color} w-1.5 opacity-60`
                            : "bg-neutral-200 w-1.5"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTIONS CONTENT */}
      <div className="pt-0">
        {sections.map((section, index) => {
          const CustomComponent = section.component;

          return (
            <section
              key={section.id}
              id={section.id}
              ref={(el) => {
                sectionRefs.current[section.id] = el;
              }}
              className={`min-h-[60vh] py-16 ${
                index % 2 === 0 ? "bg-white" : "bg-neutral-50"
              }`}
            >
              <CustomComponent />
            </section>
          );
        })}
      </div>

      <div className="h-48 bg-gradient-to-t from-white via-white/80 to-transparent" />
    </div>
  );
};

export default StickyStudentHeader;
