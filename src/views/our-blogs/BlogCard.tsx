import type { PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Blog, BlogCategory } from "@/lib/blogs";

/** Each category keeps its own colour across the blog list and article pages */
export const BLOG_TONES: Record<BlogCategory, { bg: string; glow: string; accent: string }> = {
  "Academic Writing": { bg: "linear-gradient(150deg, #FFEBD9 0%, #FFCFA3 100%)", glow: "rgba(247,147,30,0.45)", accent: "#D9651A" },
  Destinations: { bg: "linear-gradient(150deg, #EEF2FF 0%, #C4D2FF 100%)", glow: "rgba(47,107,255,0.34)", accent: "#2F6BFF" },
  "Visas & Applications": { bg: "linear-gradient(150deg, #EBF8E7 0%, #BCE6B4 100%)", glow: "rgba(59,170,53,0.34)", accent: "#2E8F29" },
};

/** Lives in the parent's <style> so it is only written once per page */
export const BLOG_CARD_CSS = `
  .bc { --mx: 50%; --my: 0%; position: relative; isolation: isolate; display: flex; flex-direction: column; height: 100%; overflow: hidden; padding: 0.75rem; border-radius: 1.75rem; color: #350C0E; transition: translate .5s cubic-bezier(.2,.8,.2,1), box-shadow .5s ease; }
  .bc:hover { translate: 0 -6px; box-shadow: 0 34px 60px -34px rgba(53,12,14,0.55); }
  .bc:focus-visible { outline: 3px solid #F7931E; outline-offset: 3px; }
  .bc::before { content: ""; position: absolute; inset: 0; z-index: -1; opacity: 0; background: radial-gradient(300px circle at var(--mx) var(--my), rgba(255,255,255,0.6), transparent 70%); transition: opacity .4s ease; }
  .bc:hover::before { opacity: 1; }
  .bc-orb { position: absolute; z-index: -2; right: -14%; bottom: -30%; width: 58%; aspect-ratio: 1; border-radius: 50%; filter: blur(52px); transition: transform .8s cubic-bezier(.2,.8,.2,1); }
  .bc:hover .bc-orb { transform: translate(-16%, -14%) scale(1.15); }
  .bc-frame { position: relative; flex: none; aspect-ratio: 16 / 9; overflow: hidden; border-radius: 1.25rem; background: #fff; }
  .bc-zoom { position: absolute; inset: 0; transition: scale .9s cubic-bezier(.2,.8,.2,1); }
  .bc:hover .bc-zoom { scale: 1.04; }
  .bc-img { object-fit: cover; object-position: 50% 0; }
  .bc-body { flex: 1; display: flex; flex-direction: column; padding: 1.25rem 0.75rem 0.6rem; }
  .bc-chip { align-self: flex-start; padding: 0.3rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; background: rgba(255,255,255,0.74); }
  .bc-title { margin-top: 0.85rem; font-size: 1.4rem; line-height: 1.14; letter-spacing: -0.025em; font-weight: 600; }
  .bc-text { margin-top: 0.6rem; font-size: 0.9375rem; line-height: 1.6; color: rgba(53,12,14,0.76); }
  .bc-foot { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: auto; padding-top: 1.1rem; font-size: 0.8125rem; font-weight: 500; color: rgba(53,12,14,0.72); }
  .bc-arrow { flex: none; display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; color: #fff; background: #350C0E; rotate: -45deg; transition: rotate .45s cubic-bezier(.2,.8,.2,1), background-color .3s ease; }
  .bc:hover .bc-arrow { rotate: 0deg; background: #F7931E; }
  @media (min-width: 768px) {
    .bc.is-wide { display: grid; grid-template-columns: minmax(0, 1.12fr) minmax(0, 1fr); align-items: stretch; }
    .bc.is-wide .bc-frame { align-self: center; }
    .bc.is-wide .bc-body { padding: 1.5rem 1.75rem 1rem 2.25rem; }
  }
  @media (min-width: 1024px) {
    .bc.is-wide .bc-body { padding: 2rem 2.5rem 1.25rem 3rem; }
    .bc.is-wide .bc-title { margin-top: 1.25rem; font-size: clamp(2rem, 3.1vw, 3.1rem); line-height: 1.06; letter-spacing: -0.035em; }
    .bc.is-wide .bc-text { margin-top: 1rem; font-size: 1.0625rem; }
  }
  @media (prefers-reduced-motion: reduce) { .bc, .bc-orb, .bc-zoom, .bc-arrow { transition: none; } }
`;

/** Soft light that follows the pointer across a card */
function trackPointer(e: PointerEvent<HTMLElement>) {
  const box = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`);
}

export default function BlogCard({ blog, wide = false, priority = false, sizes }: { blog: Blog; wide?: boolean; priority?: boolean; sizes: string }) {
  const tone = BLOG_TONES[blog.category];
  return (
    <Link href={`/our-blogs/${blog.slug}`} data-bc onPointerMove={trackPointer} className={`bc${wide ? " is-wide" : ""}`} style={{ background: tone.bg }}>
      <span aria-hidden className="bc-orb" style={{ background: tone.glow }} />
      <span className="bc-frame">
        <span data-bc-zoom className="bc-zoom" style={{ display: "block" }}>
          <Image src={blog.image} alt={blog.title} fill priority={priority} quality={90} sizes={sizes} className="bc-img" />
        </span>
      </span>
      <span className="bc-body">
        <span className="bc-chip">{blog.category}</span>
        <span className="bc-title font-display">{blog.title}</span>
        <span className="bc-text">{blog.excerpt}</span>
        <span className="bc-foot">
          <span>{blog.date}</span>
          <span aria-hidden className="bc-arrow">
            <svg viewBox="0 0 24 24" fill="none" style={{ width: "1.05rem", height: "1.05rem" }}>
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
      </span>
    </Link>
  );
}
