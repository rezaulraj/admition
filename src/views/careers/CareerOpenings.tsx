"use client";

import { useLayoutEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

type JobType = "Full-time" | "Part-time" | "Contract";

type Job = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: JobType;
  postedOn: string;
  description: string;
};

const jobs: Job[] = [
  {
    slug: "student-consultation-officer",
    title: "Student Consultation Officer",
    department: "Admissions",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    postedOn: "10 Sept 2026",
    description:
      "Guide prospective students through course and university selection, and support them from first enquiry through to application submission.",
  },
  {
    slug: "marketing-officer",
    title: "Marketing Officer",
    department: "Marketing",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    postedOn: "8 Sept 2026",
    description:
      "Plan and run campaigns across social media, events, and partnerships to grow awareness and bring qualified student leads into our pipeline.",
  },
  {
    slug: "graphic-designer",
    title: "Graphic Designer",
    department: "Creative",
    location: "Dhaka, Bangladesh (Hybrid)",
    type: "Full-time",
    postedOn: "5 Sept 2026",
    description:
      "Design social posts, brochures, and campaign creatives that bring our brand to life across digital and print, working closely with marketing.",
  },
  {
    slug: "visa-processing-officer",
    title: "Visa Processing Officer",
    department: "Visa & Compliance",
    location: "Sylhet, Bangladesh",
    type: "Full-time",
    postedOn: "2 Sept 2026",
    description:
      "Prepare and review visa documentation for students, coordinate with embassies, and keep applicants informed at every stage of the process.",
  },
  {
    slug: "front-desk-executive",
    title: "Front Desk Executive",
    department: "Operations",
    location: "Banani, Dhaka",
    type: "Part-time",
    postedOn: "30 Aug 2026",
    description:
      "Be the first friendly face students and parents meet in-branch, manage appointment scheduling, and support walk-in enquiries.",
  },
  {
    slug: "social-media-executive",
    title: "Social Media Executive",
    department: "Marketing",
    location: "Remote",
    type: "Contract",
    postedOn: "27 Aug 2026",
    description:
      "Own our day-to-day social presence, plan content calendars, and engage with our community across Facebook, Instagram, and TikTok.",
  },
];

/** Each department keeps its own colour */
const TONES: Record<string, { bg: string; glow: string }> = {
  Admissions: { bg: "linear-gradient(150deg, #FFEBD9 0%, #FFCFA3 100%)", glow: "rgba(247,147,30,0.45)" },
  Marketing: { bg: "linear-gradient(150deg, #EEF2FF 0%, #C4D2FF 100%)", glow: "rgba(47,107,255,0.34)" },
  Creative: { bg: "linear-gradient(150deg, #FFEDF2 0%, #FFC9D6 100%)", glow: "rgba(236,72,120,0.3)" },
  "Visa & Compliance": { bg: "linear-gradient(150deg, #EBF8E7 0%, #BCE6B4 100%)", glow: "rgba(59,170,53,0.34)" },
  Operations: { bg: "linear-gradient(150deg, #FFF6DD 0%, #FFE0A0 100%)", glow: "rgba(240,180,30,0.4)" },
};

const FILTERS: ("All" | JobType)[] = ["All", "Full-time", "Part-time", "Contract"];

/** Soft light that follows the pointer across a card */
function trackPointer(e: PointerEvent<HTMLElement>) {
  const box = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`);
}

export default function CareerOpenings() {
  const root = useRef<HTMLElement>(null);
  const filteredOnce = useRef(false);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const visible = useMemo(() => (filter === "All" ? jobs : jobs.filter((j) => j.type === filter)), [filter]);
  const roles = `${visible.length} open ${visible.length === 1 ? "role" : "roles"}`;

  /* Heading + the progress rail beside the list */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: el, start: "top 78%", once: true } })
        .fromTo(q("[data-cko-eyebrow]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
        .fromTo(q("[data-cko-word]"), { autoAlpha: 0, yPercent: 115, rotate: 4 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.12 }, 0.08)
        .fromTo(q("[data-cko-copy]"), { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.4);

      gsap.fromTo(
        q("[data-cko-fill]"),
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: q("[data-cko-list]")[0], start: "top 65%", end: "bottom 80%", scrub: 0.6 } },
      );
    });

    return () => mm.revert();
  }, []);

  /* Cards: rise in on scroll the first time, straight away when the filter changes */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const cards = q("[data-cko-card]") as HTMLElement[];
    const changed = filteredOnce.current;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: changed ? 44 : 90, scale: 0.95, rotate: i % 2 ? 1.2 : -1.2 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: changed ? 0.8 : 1.2,
            delay: changed ? i * 0.07 : 0,
            ease: "expo.out",
            clearProps: "transform",
            ...(changed ? {} : { scrollTrigger: { trigger: card, start: "top 90%", once: true } }),
          },
        );
      });
    });

    // The list changed height, so everything measured below it must be re-read
    if (changed) {
      ScrollTrigger.refresh();
      // A shorter list can leave you scrolled past it: glide back to its first card
      const listTop = q("[data-cko-list]")[0].getBoundingClientRect().top;
      if (listTop < 100) {
        const lenis = (window as unknown as { lenis?: { resize: () => void; scrollTo: (t: number, o?: object) => void } }).lenis;
        const target = window.scrollY + listTop - 120;
        if (lenis) {
          lenis.resize();
          lenis.scrollTo(target, { duration: 0.9, force: true });
        } else window.scrollTo(0, target);
      }
    }
    return () => mm.revert();
  }, [filter]);

  return (
    <section ref={root} id="careers-openings" className="cko relative w-full">
      <style>{`
        .cko { color: #350C0E; background: #FFFEFA; overflow: clip; }
        .cko .cko-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2.75rem; max-width: var(--page-max); margin: 0 auto; padding: 3.5rem 1.5rem 5.5rem; }
        .cko .cko-title { margin-top: 1.5rem; font-size: clamp(2.9rem, 13vw, 4.4rem); line-height: 1.02; letter-spacing: -0.04em; font-weight: 600; }
        .cko .cko-mask { display: block; overflow: hidden; padding: 0 0.1em 0.12em 0; margin-bottom: -0.12em; }
        .cko .cko-accent { font-size: 1.16em; line-height: 0.9; letter-spacing: -0.02em; font-weight: 400; font-stretch: normal; color: #F7931E; }
        .cko .cko-text { max-width: 26rem; margin-top: 1.5rem; font-size: 1.0625rem; line-height: 1.65; color: rgba(53,12,14,0.72); }

        .cko .cko-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.75rem; }
        .cko .cko-pill { display: inline-flex; align-items: center; gap: 0.45rem; height: 2.625rem; padding: 0 1.1rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 600; background: #fff; box-shadow: inset 0 0 0 1px rgba(53,12,14,0.14); transition: background-color .3s ease, color .3s ease, box-shadow .3s ease; }
        .cko .cko-pill:hover { box-shadow: inset 0 0 0 1px #350C0E; }
        .cko .cko-pill:focus-visible { outline: 3px solid #F7931E; outline-offset: 2px; }
        .cko .cko-pill.is-on { background: #350C0E; color: #fff; box-shadow: none; }
        .cko .cko-pill-n { font-size: 0.75rem; opacity: 0.6; font-variant-numeric: tabular-nums; }

        .cko .cko-progress { display: none; align-items: center; gap: 1rem; margin-top: 2.25rem; max-width: 26rem; font-size: 0.875rem; font-weight: 600; white-space: nowrap; }
        .cko .cko-rail { position: relative; flex: 1; height: 2px; overflow: hidden; border-radius: 2px; background: rgba(53,12,14,0.12); }
        .cko .cko-fill { position: absolute; inset: 0; background: #F7931E; transform-origin: 0 50%; }

        .cko .cko-list { display: flex; flex-direction: column; gap: 1rem; }
        .cko .cko-card { --mx: 50%; --my: 0%; position: relative; isolation: isolate; overflow: hidden; padding: 1.5rem; border-radius: 1.75rem; transition: translate .5s cubic-bezier(.2,.8,.2,1), box-shadow .5s ease; }
        .cko .cko-card:hover { translate: 0 -6px; box-shadow: 0 34px 60px -34px rgba(53,12,14,0.55); }
        .cko .cko-card::before { content: ""; position: absolute; inset: 0; z-index: -1; opacity: 0; background: radial-gradient(280px circle at var(--mx) var(--my), rgba(255,255,255,0.6), transparent 70%); transition: opacity .4s ease; }
        .cko .cko-card:hover::before { opacity: 1; }
        .cko .cko-card::after { content: ""; position: absolute; inset: 0; z-index: -2; opacity: 0.34; background-image: radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px); background-size: 15px 15px; -webkit-mask-image: linear-gradient(200deg, black, transparent 55%); mask-image: linear-gradient(200deg, black, transparent 55%); }
        .cko .cko-orb { position: absolute; z-index: -2; left: -12%; bottom: -55%; width: 46%; aspect-ratio: 1; border-radius: 50%; filter: blur(50px); transition: transform .8s cubic-bezier(.2,.8,.2,1); }
        .cko .cko-card:hover .cko-orb { transform: translate(18%, -16%) scale(1.15); }

        .cko .cko-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
        .cko .cko-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .cko .cko-chip { padding: 0.3rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; background: rgba(255,255,255,0.72); }
        .cko .cko-num { flex: none; font-size: 3.25rem; line-height: 0.85; letter-spacing: -0.05em; font-weight: 700; color: rgba(53,12,14,0.05); -webkit-text-stroke: 1.5px rgba(53,12,14,0.22); }
        .cko .cko-job { margin-top: 1.5rem; font-size: 1.75rem; line-height: 1.08; letter-spacing: -0.03em; font-weight: 600; }
        .cko .cko-desc { max-width: 42rem; margin-top: 0.7rem; font-size: 0.9688rem; line-height: 1.6; color: rgba(53,12,14,0.76); }
        .cko .cko-foot { display: flex; flex-direction: column; gap: 1.25rem; margin-top: 1.5rem; }
        .cko .cko-meta { display: flex; flex-wrap: wrap; gap: 0.35rem 1.25rem; font-size: 0.8125rem; font-weight: 500; color: rgba(53,12,14,0.72); }
        .cko .cko-meta span { display: inline-flex; align-items: center; gap: 0.4rem; }
        .cko .cko-btn { align-self: flex-start; flex: none; display: inline-flex; align-items: center; gap: 0.75rem; height: 3rem; padding: 0 0.4rem 0 1.4rem; border-radius: 9999px; font-size: 0.9375rem; font-weight: 600; color: #fff; background: #350C0E; transition: background-color .3s ease; }
        .cko .cko-btn:hover, .cko .cko-btn:focus-visible { background: #F7931E; }
        .cko .cko-btn-i { display: grid; place-items: center; width: 2.25rem; height: 2.25rem; border-radius: 50%; color: #350C0E; background: #fff; transition: rotate .3s ease; }
        .cko .cko-btn:hover .cko-btn-i { rotate: 90deg; }

        @media (min-width: 640px) {
          .cko .cko-card { padding: 2rem; }
          .cko .cko-foot { flex-direction: row; align-items: center; justify-content: space-between; }
          .cko .cko-btn { align-self: auto; }
        }
        @media (min-width: 1024px) {
          .cko .cko-grid { grid-template-columns: minmax(0, 0.74fr) minmax(0, 1.26fr); align-items: start; gap: clamp(3rem, 5vw, 5.5rem); padding: 4rem var(--page-gutter) 7.5rem; }
          .cko .cko-side { position: sticky; top: 7.5rem; }
          .cko .cko-title { font-size: clamp(3.2rem, 5vw, 5.3rem); }
          .cko .cko-progress { display: flex; }
          .cko .cko-pill { padding: 0 0.9rem; }
          .cko .cko-card { padding: 2.25rem 2.5rem; }
          .cko .cko-job { font-size: clamp(1.9rem, 2.6vw, 2.5rem); }
          .cko .cko-num { font-size: 4.5rem; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .cko [data-cko-eyebrow], .cko [data-cko-word], .cko [data-cko-copy], .cko [data-cko-card] { visibility: hidden; }
        }
        @media (prefers-reduced-motion: reduce) { .cko .cko-card, .cko .cko-orb { transition: none; } }
      `}</style>

      <div className="cko-grid">
        <div className="cko-side">
          <p data-cko-eyebrow className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
            <span className="h-3.5 w-5 bg-[#F7931E] [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
            Careers
          </p>
          <h2 className="cko-title font-display">
            <span className="cko-mask">
              <span data-cko-word className="inline-block origin-bottom-left">
                Current
              </span>{" "}
            </span>
            <span className="cko-mask">
              <span data-cko-word className={`${accentSerif.className} cko-accent inline-block origin-bottom-left`}>
                Openings
              </span>
            </span>
          </h2>
          <p data-cko-copy className="cko-text">
            Join a team helping students take on the world. Here&apos;s what we&apos;re hiring for right now.
          </p>

          <div data-cko-copy className="cko-pills" role="group" aria-label="Filter openings by job type">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => {
                  filteredOnce.current = true;
                  setFilter(f);
                }}
                className={`cko-pill${filter === f ? " is-on" : ""}`}>
                {f}
                <span className="cko-pill-n">{f === "All" ? jobs.length : jobs.filter((j) => j.type === f).length}</span>
              </button>
            ))}
          </div>

          <div data-cko-copy className="cko-progress" aria-live="polite">
            <span>{roles}</span>
            <span aria-hidden className="cko-rail">
              <span data-cko-fill className="cko-fill" />
            </span>
          </div>
        </div>

        <div data-cko-list>
          <div key={filter} className="cko-list">
            {visible.map((job, i) => {
              const tone = TONES[job.department];
              return (
                <article key={job.slug} data-cko-card onPointerMove={trackPointer} className="cko-card" style={{ background: tone.bg }}>
                  <span aria-hidden className="cko-orb" style={{ background: tone.glow }} />

                  <div className="cko-top">
                    <div className="cko-chips">
                      <span className="cko-chip">{job.type}</span>
                      <span className="cko-chip">{job.department}</span>
                    </div>
                    <span aria-hidden className="cko-num font-display">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="cko-job font-display">{job.title}</h3>
                  <p className="cko-desc">{job.description}</p>

                  <div className="cko-foot">
                    <div className="cko-meta">
                      <span>
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden style={{ width: "0.9rem", height: "0.9rem" }}>
                          <path d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.25 6.19 11.44 6.46 11.7a1.5 1.5 0 0 0 2.08 0c.27-.26 6.46-6.45 6.46-11.7C19.5 5.36 16.14 2 12 2Zm0 10.5A3 3 0 1 1 12 6.5a3 3 0 0 1 0 6Z" />
                        </svg>
                        {job.location}
                      </span>
                      <span>
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden style={{ width: "0.9rem", height: "0.9rem" }}>
                          <path d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7ZM5 9h14v11H5V9Z" />
                        </svg>
                        Posted on {job.postedOn}
                      </span>
                    </div>

                    <button type="button" aria-label={`Apply now: ${job.title}`} className="cko-btn focus:outline-none">
                      Apply Now
                      <span className="cko-btn-i">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden style={{ width: "1rem", height: "1rem" }}>
                          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
