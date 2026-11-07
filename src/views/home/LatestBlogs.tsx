"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { blogs as allBlogs, type Blog, type BlogCategory } from "@/lib/blogs";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const categoryStyles: Record<BlogCategory, string> = {
  "Academic Writing": "bg-[#6366F1]/10 text-[#4F46E5]",
  Destinations: "bg-[#2F6BFF]/10 text-[#2F6BFF]",
  "Visas & Applications": "bg-[#F7931E]/12 text-[#E07B0A]",
};

const [featured, ...rest] = allBlogs.slice(0, 4);

/** Rough reading time from the article body (~200 words per minute) */
const readTime = (blog: Blog) => {
  const words = blog.content.join(" ").split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
};

function Meta({ blog, light = false }: { blog: Blog; light?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium ${light ? "text-white/70" : "text-[#8A8F9C]"}`}>
      <span className="inline-flex items-center gap-1.5">
        <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
          <path d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7ZM5 9h14v11H5V9Z" />
        </svg>
        {blog.date}
      </span>
      <span className="size-1 rounded-full bg-current opacity-50" />
      <span className="inline-flex items-center gap-1.5">
        <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5v5.4l3.6 2.1-1 1.7L11 13.5V7h2Z" />
        </svg>
        {readTime(blog)}
      </span>
    </div>
  );
}

const ArrowIcon = ({ className = "size-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/** Title whose underline grows in on hover */
const hoverTitle =
  "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]";

export default function LatestBlogs() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Heading
      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: el, start: "top 78%", once: true } })
        .fromTo(q("[data-eyebrow]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
        .fromTo(q("[data-word]"), { autoAlpha: 0, yPercent: 110, rotate: 4 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.06 }, 0.1)
        .fromTo(q("[data-underline]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1, ease: "power2.inOut" }, 0.6)
        .fromTo(q("[data-cta]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.4);

      // Featured story: image wipes open while zooming out, then the text follows
      const feature = q("[data-feature]")[0];
      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: feature, start: "top 80%", once: true } })
        .fromTo(
          q("[data-feature-media]"),
          { clipPath: "inset(0% 100% 0% 0% round 28px)" },
          { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.4, ease: "power4.inOut" },
          0,
        )
        .fromTo(q("[data-feature-img]"), { scale: 1.25 }, { scale: 1, duration: 1.8 }, 0)
        .fromTo(q("[data-feature-text] > *"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.7);

      // Story list: rows slide in one after another
      gsap.fromTo(
        q("[data-story]"),
        { autoAlpha: 0, x: 60 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 1,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: q("[data-stories]")[0], start: "top 80%", once: true },
        },
      );
      gsap.fromTo(
        q("[data-story-media]"),
        { clipPath: "inset(0% 0% 100% 0% round 18px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 18px)",
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.inOut",
          delay: 0.15,
          scrollTrigger: { trigger: q("[data-stories]")[0], start: "top 80%", once: true },
        },
      );

    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="blogs relative w-full overflow-hidden bg-[#FFFEFA] px-6 py-20 sm:py-24">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .blogs [data-eyebrow], .blogs [data-word], .blogs [data-cta], .blogs [data-feature-text] > *, .blogs [data-story] { visibility: hidden; }
        }
      `}</style>

      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 size-[30rem] rounded-full bg-[#2F6BFF]/[0.06] blur-3xl" />

      <div className="container relative mx-auto">
        {/* Heading */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span data-eyebrow className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-[#2F6BFF]">
              <span className="h-3.5 w-4 bg-[#2F6BFF] [clip-path:polygon(0_0,65%_0,100%_50%,65%_100%,0_100%)]" />
              From the blog
            </span>
            <h2 className="font-display mt-3 text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.035em] text-[#350C0E] sm:text-5xl lg:text-[3.4rem]">
              {["Study", "abroad"].map((w) => (
                <span key={w} className="mr-[0.24em] inline-block overflow-hidden pb-[0.08em] align-top">
                  <span data-word className="inline-block">
                    {w}
                  </span>
                </span>
              ))}
              <span className="relative inline-block">
                <span className="inline-block overflow-hidden pb-[0.12em] align-top">
                  <span data-word className="inline-block text-[#F7931E]">
                    guides &amp; advice
                  </span>
                </span>
                <svg aria-hidden viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-[0.14em] left-0 h-[0.26em] w-full overflow-visible">
                  <path data-underline d="M3 12 C 60 4, 120 16, 180 9 S 260 5, 297 10" fill="none" stroke="#F7931E" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
          </div>

          <Link
            data-cta
            href="/our-blogs"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#14213D] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#14213D]/20 transition-[translate,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#2F6BFF]">
            Visit the blog
            <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Featured story */}
          <Link data-feature href={`/our-blogs/${featured.slug}`} className="group block lg:col-span-7">
            <div data-feature-media className="relative aspect-[16/9] overflow-hidden rounded-[28px] bg-[#EEF3FF] shadow-[0_30px_60px_-35px_rgba(20,33,61,0.5)]">
              <div data-feature-img className="absolute inset-0">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  priority={false}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <span className="absolute right-4 top-4 rounded-full bg-[#F7931E] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                Latest
              </span>
            </div>

            <div data-feature-text className="mt-6">
              <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${categoryStyles[featured.category]}`}>
                {featured.category}
              </span>
              <h3 className="font-display mt-3 text-2xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#350C0E] sm:text-3xl">
                <span className={hoverTitle}>{featured.title}</span>
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#4A5268]">{featured.excerpt}</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <Meta blog={featured} />
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#350C0E]">
                  Read article
                  <span className="grid size-9 place-items-center rounded-full bg-[#14213D] text-white transition-all duration-300 group-hover:-rotate-45 group-hover:bg-[#F7931E]">
                    <ArrowIcon />
                  </span>
                </span>
              </div>
            </div>
          </Link>

          {/* More stories */}
          <div data-stories className="flex flex-col divide-y divide-[#14213D]/10 lg:col-span-5">
            {rest.map((blog, i) => (
              <Link
                key={blog.slug}
                data-story
                href={`/our-blogs/${blog.slug}`}
                className="group grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)] items-center gap-4 py-5 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:gap-5">
                <div data-story-media className="relative aspect-[16/9] overflow-hidden rounded-[18px] bg-[#EEF3FF] shadow-[0_16px_30px_-22px_rgba(20,33,61,0.5)]">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    sizes="(min-width: 640px) 200px, 150px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-sm font-semibold text-[#350C0E]/30">{String(i + 2).padStart(2, "0")}</span>
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${categoryStyles[blog.category]}`}>
                      {blog.category}
                    </span>
                  </div>
                  <h3 className="font-display mt-2 line-clamp-2 text-base font-semibold leading-snug text-[#350C0E] sm:text-lg">
                    <span className={hoverTitle}>{blog.title}</span>
                  </h3>
                  <div className="mt-2">
                    <Meta blog={blog} />
                  </div>
                </div>
              </Link>
            ))}

            {/* Newsletter-style nudge to the full blog */}
            <Link
              data-story
              href="/our-blogs"
              className="group mt-5 flex items-center justify-between gap-4 rounded-[22px] border-0 bg-[linear-gradient(120deg,#EEF3FF,#FFF3E6)] px-5 py-4">
              <span>
                <span className="block font-display text-base font-semibold text-[#350C0E]">More guides on the blog</span>
                <span className="block text-sm text-[#4A5268]">Visas, scholarships, destinations and more.</span>
              </span>
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-[#350C0E] shadow-sm transition-all duration-300 group-hover:-rotate-45 group-hover:bg-[#2F6BFF] group-hover:text-white">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
