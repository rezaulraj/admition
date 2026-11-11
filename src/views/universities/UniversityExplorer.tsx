"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger, Flip);

type University = {
  slug: string;
  name: string;
  country: string;
  initials: string;
  color: string;
  note?: string;
  logo: string;
};

const destinations = [
  "All destinations",
  "United Kingdom",
  "Hungary",
  "Cyprus",
  "Malta",
];

const universities: University[] = [
  {
    slug: "bpp-university",
    name: "BPP University",
    country: "United Kingdom",
    initials: "BP",
    color: "#2F5DA8",
    logo: "/univercity-logo/bpp.jpg",
  },
  {
    slug: "university-of-hertfordshire",
    name: "University of Hertfordshire",
    country: "United Kingdom",
    initials: "UH",
    color: "#1366E0",
    logo: "/univercity-logo/uh.jpg",
  },
  {
    slug: "university-of-law",
    name: "University of Law",
    country: "United Kingdom",
    initials: "UL",
    color: "#1B1B1B",
    note: "Except Business Course",
    logo: "/univercity-logo/low.png",
  },
  {
    slug: "university-of-chester",
    name: "University of Chester",
    country: "United Kingdom",
    initials: "UC",
    color: "#2F9E5C",
    note: "Except Sylhet",
    logo: "/univercity-logo/uoc.png",
  },
  {
    slug: "london-south-bank-university",
    name: "London South Bank University",
    country: "United Kingdom",
    initials: "LS",
    color: "#F58B0F",
    note: "Except Sylhet, Except Business Course",
    logo: "/univercity-logo/lsbu.jpg",
  },
  {
    slug: "aston-university-london",
    name: "Aston University, London",
    country: "United Kingdom",
    initials: "AL",
    color: "#1366E0",
    note: "Except Sylhet",
    logo: "/univercity-logo/aul.png",
  },
  {
    slug: "university-of-hull-london",
    name: "University of Hull - London",
    country: "United Kingdom",
    initials: "HL",
    color: "#2F5DA8",
    note: "Except Sylhet",
    logo: "/univercity-logo/uoh.png",
  },
  {
    slug: "regent-college-london",
    name: "Regent College London",
    country: "United Kingdom",
    initials: "RC",
    color: "#1B1B1B",
    note: "Except UG",
    logo: "/univercity-logo/rcl.png",
  },
  {
    slug: "university-of-bedfordshire",
    name: "University of Bedfordshire",
    country: "United Kingdom",
    initials: "UB",
    color: "#1366E0",
    note: "Except Sylhet",
    logo: "/univercity-logo/uob.png",
  },
  {
    slug: "anglia-ruskin-university",
    name: "Anglia Ruskin University",
    country: "United Kingdom",
    initials: "AR",
    color: "#2F9E5C",
    note: "UG Sylhet Restricted",
    logo: "/univercity-logo/aru.jpg",
  },
  {
    slug: "university-of-brighton",
    name: "University of Brighton",
    country: "United Kingdom",
    initials: "BR",
    color: "#F58B0F",
    logo: "/univercity-logo/uobb.jpg",
  },
  {
    slug: "university-of-south-wales",
    name: "University of South Wales",
    country: "United Kingdom",
    initials: "SW",
    color: "#1366E0",
    logo: "/univercity-logo/uosw.png",
  },
  {
    slug: "aston-university-birmingham",
    name: "Aston University, Birmingham",
    country: "United Kingdom",
    initials: "AB",
    color: "#2F5DA8",
    logo: "/univercity-logo/aub.jpg",
  },
  {
    slug: "cardiff-metropolitan-university",
    name: "Cardiff Metropolitan University",
    country: "United Kingdom",
    initials: "CM",
    color: "#1B1B1B",
    note: "Full Deposit for Sylhet",
    logo: "/univercity-logo/cfu.jpg",
  },
  {
    slug: "canterbury-christ-church-university",
    name: "Canterbury Christ Church University",
    country: "United Kingdom",
    initials: "CC",
    color: "#2F9E5C",
    note: "Except UG",
    logo: "/univercity-logo/cccu.png",
  },
  {
    slug: "uws-london-campus",
    name: "UWS - London Campus",
    country: "United Kingdom",
    initials: "UW",
    color: "#F58B0F",
    logo: "/univercity-logo/uws.jpg",
  },
  {
    slug: "aberystwyth-university",
    name: "Aberystwyth University",
    country: "United Kingdom",
    initials: "AY",
    color: "#1366E0",
    logo: "/univercity-logo/au.jpg",
  },
  {
    slug: "university-of-hartpury",
    name: "University of Hartpury",
    country: "United Kingdom",
    initials: "HP",
    color: "#2F5DA8",
    logo: "/univercity-logo/uoh.png",
  },
  // {
  //   slug: "atlantis-college",
  //   name: "Atlantis College",
  //   country: "Cyprus",
  //   initials: "AT",
  //   color: "#1B1B1B",
  //   logo: "/univercity-logo/aui.png",
  // },
  // {
  //   slug: "american-university-of-cyprus",
  //   name: "American University of Cyprus",
  //   country: "Cyprus",
  //   initials: "AC",
  //   color: "#2F9E5C",
  //   logo: "/univercity-logo/auc.png",
  // },
  // {
  //   slug: "john-von-neumann-university",
  //   name: "John von Neumann University",
  //   country: "Hungary",
  //   initials: "JV",
  //   color: "#F58B0F",
  //   logo: "/univercity-logo/jvnu.png",
  // },
  {
    slug: "training-three-sixty",
    name: "Training Three Sixty",
    country: "Malta",
    initials: "T3",
    color: "#1366E0",
    logo: "/univercity-logo/tts.png",
  },
  {
    slug: "thinktalent",
    name: "ThinkTalent",
    country: "Malta",
    initials: "TT",
    color: "#2F5DA8",
    logo: "/univercity-logo/thinktalent.webp",
  },
  {
    slug: "learnkey-institute",
    name: "LearnKey Institute",
    country: "Malta",
    initials: "LK",
    color: "#F58B0F",
    logo: "/univercity-logo/learnkeyinstutie.png",
  },
  {
    slug: "malta-leadership-institute",
    name: "Malta Leadership Institute",
    country: "Malta",
    initials: "ML",
    color: "#E4572E",
    logo: "/univercity-logo/mli.svg",
  },
  {
    slug: "ascencia-malta",
    name: "Ascencia Malta",
    country: "Malta",
    initials: "AM",
    color: "#CD0731",
    logo: "/univercity-logo/Ascencia-Malta-Logo.svg",
  },
];

const ALL = "All destinations";

const FLAGS: Record<string, string> = {
  "United Kingdom": "GB",
  Hungary: "HU",
  Cyprus: "CY",
  Malta: "MT",
};

/* A soft tint per destination for the logo stage of each card */
const TINTS: Record<string, { bg: string; accent: string }> = {
  "United Kingdom": { bg: "linear-gradient(135deg, #EEF2FF 0%, #DCE5FF 100%)", accent: "#2F6BFF" },
  Malta: { bg: "linear-gradient(135deg, #FFEDF2 0%, #FFDCE5 100%)", accent: "#E5486F" },
  Hungary: { bg: "linear-gradient(135deg, #EBF8E7 0%, #D7F0D0 100%)", accent: "#3BAA35" },
  Cyprus: { bg: "linear-gradient(135deg, #FFF6DD 0%, #FFEBC0 100%)", accent: "#E08A00" },
};
const DEFAULT_TINT = { bg: "linear-gradient(135deg, #FFEBD9 0%, #FFDCBF 100%)", accent: "#F7931E" };

/* Every logo once, for the moving band in the header */
const BAND = universities.filter((u, i, all) => all.findIndex((x) => x.logo === u.logo) === i);

function UniversityLogo({ uni }: { uni: University }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    // Graceful fallback if a logo file is missing/broken
    return (
      <div
        className="flex h-full w-full items-center justify-center rounded-xl text-sm font-bold text-white"
        style={{ backgroundColor: uni.color }}
      >
        {uni.initials}
      </div>
    );
  }

  return (
    <Image
      src={uni.logo}
      alt={`${uni.name} logo`}
      height={80}
      width={160}
      className="h-full w-full object-contain"
      onError={() => setFailed(true)}
    />
  );
}

export default function UniversityExplorer() {
  const root = useRef<HTMLElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const [query, setQuery] = useState("");
  const [destination, setDestination] = useState(ALL);


  const matches = (u: University) =>
    (query.trim() === "" || u.name.toLowerCase().includes(query.trim().toLowerCase())) &&
    (destination === ALL || u.country === destination);
  const shown = universities.filter(matches).length;

  /* Remember where every card is before the filter changes, so they can glide to their new places */
  const capture = () => {
    const cards = root.current?.querySelectorAll("[data-ux-card]");
    if (cards?.length) flipState.current = Flip.getState(cards);
  };
  const changeQuery = (v: string) => {
    capture();
    setQuery(v);
  };
  const changeDestination = (d: string) => {
    if (d === destination) return;
    capture();
    setDestination(d);
  };

  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state || !root.current) return;
    flipState.current = null;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    /* Cards that now show must be visible even if they had not scrolled into view yet */
    gsap.set(root.current.querySelectorAll("[data-ux-card]:not([hidden])"), { autoAlpha: 1 });
    Flip.from(state, {
      targets: root.current.querySelectorAll("[data-ux-card]"),
      duration: 0.7,
      ease: "power3.inOut",
      absolute: true,
      nested: true,
      prune: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.85, y: 20 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.03, ease: "expo.out", delay: 0.15 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.85, duration: 0.35, ease: "power2.in" }),
      /* The page got taller or shorter: let scroll-based effects re-measure */
      onComplete: () => ScrollTrigger.refresh(),
    });
  }, [query, destination]);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" }, delay: 0.1 })
        .fromTo(q("[data-ux-eyebrow]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0)
        .fromTo(q("[data-ux-word]"), { autoAlpha: 0, yPercent: 115, rotate: 5 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.12 }, 0.1)
        .fromTo(q("[data-ux-copy]"), { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.5)
        .fromTo(q("[data-ux-band]"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.2 }, 0.8)
        .fromTo(q("[data-ux-bar]"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.1 }, 0.9);

      /* Cards rise in as they scroll into view */
      ScrollTrigger.batch(q("[data-ux-card]"), {
        start: "top 92%",
        once: true,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 50, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1, stagger: 0.06, ease: "expo.out" }),
      });

      /* The logo band loops and rushes when you scroll */
      const loop = gsap.fromTo(q("[data-ux-row]"), { xPercent: 0 }, { xPercent: -50, duration: 45, ease: "none", repeat: -1 });
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          loop.timeScale(1 + Math.min(Math.abs(self.getVelocity()) / 180, 8));
          gsap.to(loop, { timeScale: 1, duration: 1.2, ease: "power2.out", overwrite: true });
        },
      });
    });

    return () => mm.revert();
  }, []);

  /* A soft light follows the pointer across each card */
  const trackPointer = (e: PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };


  return (
    <section ref={root} className="ux relative w-full">
      <style>{`
        .ux { color: #350C0E; margin-top: -7rem; overflow: clip;
          background:
            radial-gradient(45% 40% at 85% 6%, rgba(47,107,255,0.1), transparent 70%),
            radial-gradient(40% 36% at 4% 10%, rgba(247,147,30,0.15), transparent 70%),
            linear-gradient(180deg, #FFEFDD 0%, #FFF6EC 22%, #FFFEFA 42%); }
        .ux .ux-wrap { position: relative; max-width: var(--page-max); margin: 0 auto; padding: 9.5rem 1.5rem 5rem; }

        /* Header */
        .ux .ux-head { display: flex; flex-direction: column; align-items: center; text-align: center; }
        .ux .ux-eyebrow { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0.95rem 0.45rem 0.55rem; border-radius: 999px;
          background: rgba(255,255,255,0.85); box-shadow: 0 0 0 1px rgba(53,12,14,0.08), 0 10px 26px -16px rgba(53,12,14,0.4); font-size: 0.8rem; font-weight: 600; letter-spacing: 0.02em; }
        .ux .ux-eyebrow span { display: grid; place-items: center; width: 1.4rem; height: 1.4rem; border-radius: 999px; background: #2F6BFF; color: #fff; }
        .ux .ux-title { margin-top: 1.3rem; font-size: clamp(2.5rem, 11vw, 3.6rem); line-height: 1.02; letter-spacing: -0.045em; font-weight: 600; }
        .ux .ux-mask { display: block; overflow: hidden; padding: 0.04em 0.1em 0.16em; margin: -0.04em 0 -0.16em; }
        .ux .ux-accent { color: #F7931E; font-weight: 400; font-style: italic; letter-spacing: -0.02em; font-size: 1.1em; line-height: 0.95; }
        .ux .ux-copy { margin: 1.4rem auto 0; max-width: 36rem; font-size: 1rem; line-height: 1.7; color: rgba(53,12,14,0.72); }

        /* Logo band */
        .ux .ux-band { position: relative; margin-top: 2.75rem;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
        .ux .ux-row { display: flex; width: max-content; will-change: transform; }
        .ux .ux-half { display: flex; gap: 0.85rem; padding-right: 0.85rem; }
        .ux .ux-logo-pill { display: grid; place-items: center; width: 8.5rem; height: 4.25rem; padding: 0.6rem 0.9rem; border-radius: 18px; background: #fff;
          box-shadow: 0 0 0 1px rgba(53,12,14,0.06), 0 14px 30px -22px rgba(53,12,14,0.5); }
        .ux .ux-logo-pill img { width: 100%; height: 100%; object-fit: contain; }

        /* Search bar */
        .ux .ux-bar { margin-top: 2.5rem; display: flex; flex-direction: column; gap: 1rem; padding: 1rem; border-radius: 16px; border: 1px solid #ECECEC; background: #fff; }
        .ux .ux-field { width: 100%; }
        .ux .ux-field label { font-size: 0.75rem; font-weight: 600; color: #6B6B6B; }
        .ux .ux-field input, .ux .ux-field select { margin-top: 0.25rem; width: 100%; border-radius: 12px; border: 1px solid #E5E5E5; background: #fff; padding: 0.75rem 1rem;
          font-size: 0.875rem; color: #350C0E; outline: none; }
        .ux .ux-field input::placeholder { color: #9A9A9A; }
        .ux .ux-field input:focus, .ux .ux-field select:focus { border-color: #F7931E; }
        .ux .ux-flag { display: flex; overflow: hidden; border-radius: 3px; box-shadow: 0 0 0 1px rgba(0,0,0,0.08); }
        .ux .ux-result { margin-top: 1.5rem; font-size: 0.875rem; color: #6B6B6B; }

        /* Cards */
        .ux .ux-grid { margin-top: 1rem; display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; }
        .ux .ux-card { position: relative; display: flex; flex-direction: column; padding: 0.6rem 0.6rem 1.1rem; border-radius: 26px; background: #fff; overflow: hidden;
          box-shadow: 0 0 0 1px rgba(53,12,14,0.06), 0 22px 44px -34px rgba(53,12,14,0.5);
          transition: transform .5s cubic-bezier(.22,1,.36,1), box-shadow .5s ease; }
        .ux .ux-card[hidden] { display: none; }
        .ux .ux-card::after { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; opacity: 0; transition: opacity .4s ease;
          background: radial-gradient(18rem circle at var(--mx, 50%) var(--my, 30%), rgba(247,147,30,0.1), transparent 60%); }
        .ux .ux-card:hover { transform: translateY(-6px); box-shadow: 0 0 0 1px rgba(53,12,14,0.06), 0 34px 60px -34px rgba(53,12,14,0.6); }
        .ux .ux-card:hover::after { opacity: 1; }
        .ux .ux-card:focus-visible { outline: 2px solid #F7931E; outline-offset: 3px; }
        .ux .ux-stage { position: relative; display: grid; place-items: center; height: 9.5rem; padding-top: 1.9rem; border-radius: 20px; background: var(--bg); overflow: hidden; }
        .ux .ux-stage::before { content: ""; position: absolute; inset: 0; opacity: 0.4;
          background-image: radial-gradient(rgba(53,12,14,0.25) 1px, transparent 1.4px); background-size: 13px 13px;
          -webkit-mask-image: linear-gradient(160deg, transparent 40%, #000 100%); mask-image: linear-gradient(160deg, transparent 40%, #000 100%); }
        .ux .ux-logo { position: relative; width: 9.5rem; height: 5rem; padding: 0.55rem 0.8rem; border-radius: 16px; background: #fff;
          box-shadow: 0 16px 30px -18px rgba(53,12,14,0.5); transition: transform .6s cubic-bezier(.22,1,.36,1); }
        .ux .ux-card:hover .ux-logo { transform: scale(1.07) rotate(-1.5deg); }
        .ux .ux-where { position: absolute; left: 0.7rem; top: 0.7rem; display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.3rem 0.6rem 0.3rem 0.4rem;
          border-radius: 999px; background: rgba(255,255,255,0.88); font-size: 0.72rem; font-weight: 600; }
        .ux .ux-body { display: flex; flex: 1; flex-direction: column; padding: 1rem 0.65rem 0; }
        .ux .ux-name { font-size: 1.05rem; line-height: 1.25; letter-spacing: -0.02em; font-weight: 600; }
        .ux .ux-note { align-self: flex-start; margin-top: 0.6rem; display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.3rem 0.65rem; border-radius: 999px;
          background: #FFF3E6; color: #B85F00; font-size: 0.72rem; font-weight: 600; }
        .ux .ux-go { margin-top: auto; padding-top: 1.1rem; display: flex; align-items: center; justify-content: space-between; font-size: 0.86rem; font-weight: 600; }
        .ux .ux-go i { display: grid; place-items: center; width: 2.2rem; height: 2.2rem; border-radius: 999px; box-shadow: inset 0 0 0 1.5px rgba(53,12,14,0.18);
          transition: background .35s ease, color .35s ease, transform .5s cubic-bezier(.22,1,.36,1), box-shadow .35s ease; }
        .ux .ux-card:hover .ux-go i { background: #F7931E; color: #fff; box-shadow: none; transform: rotate(-45deg); }

        .ux .ux-empty { grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 3.5rem 1rem; border-radius: 26px;
          background: #FFF6EC; text-align: center; color: rgba(53,12,14,0.7); }
        .ux .ux-empty button { padding: 0.65rem 1.2rem; border-radius: 999px; background: #350C0E; color: #fff; font-size: 0.86rem; font-weight: 600; cursor: pointer; }

        @media (prefers-reduced-motion: no-preference) {
          .ux [data-ux-eyebrow], .ux [data-ux-word], .ux [data-ux-copy], .ux [data-ux-band], .ux [data-ux-bar], .ux [data-ux-card] { visibility: hidden; }
        }

        @media (min-width: 640px) {
          .ux .ux-wrap { padding: 10rem 2rem 6rem; }
          .ux .ux-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.1rem; }
          .ux .ux-bar { flex-direction: row; align-items: flex-end; justify-content: space-between; }
          .ux .ux-field-dest { width: 14rem; flex: none; }
        }
        @media (min-width: 1024px) {
          .ux .ux-wrap { padding: 10rem var(--page-gutter) 7rem; }
          .ux .ux-title { font-size: clamp(3.2rem, 4.8vw, 4.7rem); }
          .ux .ux-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.25rem; }
        }
        @media (min-width: 1024px) and (max-height: 760px) {
          .ux .ux-wrap { padding-top: 8.25rem; }
          .ux .ux-title { font-size: clamp(2.8rem, 4vw, 3.8rem); }
          .ux .ux-band { margin-top: 2rem; }
        }
      `}</style>

      <div className="ux-wrap">
        <div className="ux-head">
          <div>
            <span data-ux-eyebrow className="ux-eyebrow">
              <span aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="m12 2 10 5-10 5L2 7l10-5Zm-7 8.5 7 3.5 7-3.5V16l-7 3.5L5 16v-5.5Z" />
                </svg>
              </span>
              Universities
            </span>
            <h2 className="ux-title">
              <span className="ux-mask">
                <span data-ux-word className="inline-block origin-bottom-left">
                  Explore Universities
                </span>
              </span>
              <span className="ux-mask">
                <span data-ux-word className={`${accentSerif.className} ux-accent inline-block origin-bottom-left`}>
                  Worldwide.
                </span>
              </span>
            </h2>
            <p data-ux-copy className="ux-copy">
              Browse universities and pathway colleges across our study destinations. Click a university to see its courses.
            </p>
          </div>
        </div>

        {/* Every partner logo, sliding past */}
        <div data-ux-band className="ux-band" aria-hidden>
          <div data-ux-row className="ux-row">
            {[0, 1].map((copy) => (
              <div key={copy} className="ux-half">
                {BAND.map((u) => (
                  <span key={u.slug} className="ux-logo-pill">
                    <Image src={u.logo} alt="" width={136} height={68} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Search and destination filter */}
        <div data-ux-bar className="ux-bar">
          <div className="ux-field">
            <label htmlFor="ux-search">Search universities</label>
            <input id="ux-search" type="text" value={query} onChange={(e) => changeQuery(e.target.value)} placeholder="e.g. Chester, Aston" />
          </div>

          <div className="ux-field ux-field-dest">
            <label htmlFor="ux-destination">Destination</label>
            <select id="ux-destination" value={destination} onChange={(e) => changeDestination(e.target.value)}>
              {destinations.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="ux-result" aria-live="polite">
          Showing {shown} of {universities.length} universities
        </p>

        {/* Results */}
        <div className="ux-grid">
          {universities.map((uni) => {
            const tint = TINTS[uni.country] ?? DEFAULT_TINT;
            return (
              <Link
                key={uni.slug}
                data-ux-card
                hidden={!matches(uni)}
                href={`/courses?university=${uni.slug}`}
                aria-label={`View courses at ${uni.name}`}
                className="ux-card"
                style={{ "--bg": tint.bg } as CSSProperties}
                onPointerMove={trackPointer}
              >
                <div className="ux-stage">
                  <span className="ux-where">
                    <span className="ux-flag" aria-hidden>
                      <ReactCountryFlag countryCode={FLAGS[uni.country] ?? "UN"} svg style={{ width: "1.2em", height: "0.88em", display: "block", objectFit: "cover" }} />
                    </span>
                    {uni.country}
                  </span>
                  <div className="ux-logo">
                    <UniversityLogo uni={uni} />
                  </div>
                </div>
                <div className="ux-body">
                  <h3 className="ux-name">{uni.name}</h3>
                  {uni.note && (
                    <span className="ux-note">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" aria-hidden>
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 8v5M12 16h.01" />
                      </svg>
                      {uni.note}
                    </span>
                  )}
                  <span className="ux-go">
                    View courses
                    <i aria-hidden>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14m0 0-6-6m6 6-6 6" />
                      </svg>
                    </i>
                  </span>
                </div>
              </Link>
            );
          })}

          {shown === 0 && (
            <div className="ux-empty">
              <p>No universities match your search. Try a different destination.</p>
              <button
                type="button"
                onClick={() => {
                  capture();
                  setQuery("");
                  setDestination(ALL);
                }}
              >
                Show all universities
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
