"use client";

import { useLayoutEffect, useRef, useState, type FormEvent, type PointerEvent, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

// FormSubmit AJAX endpoint: consultation requests are emailed here
const FORMSUBMIT_URL = "https://formsubmit.co/ajax/apply@admissiononboard.com";

export type Reason = {
  title: string;
  description: string;
  points?: string[];
  icon: ReactNode;
  /** A highlighted, un-numbered card (used for a lead-in reason) */
  featured?: boolean;
};

type Props = {
  /** Country name as used in the form and emails, e.g. "Australia" */
  destination: string;
  /** How the country reads in a sentence, e.g. "the United Kingdom"; defaults to the destination */
  inName?: string;
  /** Heading, e.g. "Why Choose" + "Australia?" */
  headingLead?: string;
  headingAccent?: string;
  /** Optional line under the heading */
  intro?: string;
  reasons: Reason[];
  backupCountries: string[];
};


/** One colour per reason, repeating down the list */
const TONES = [
  { bg: "linear-gradient(150deg, #FFEBD9 0%, #FFCFA3 100%)", glow: "rgba(247,147,30,0.45)", icon: "#D9651A" },
  { bg: "linear-gradient(150deg, #EEF2FF 0%, #C4D2FF 100%)", glow: "rgba(47,107,255,0.34)", icon: "#2F6BFF" },
  { bg: "linear-gradient(150deg, #EBF8E7 0%, #BCE6B4 100%)", glow: "rgba(59,170,53,0.34)", icon: "#2E8F29" },
  { bg: "linear-gradient(150deg, #FFF6DD 0%, #FFE0A0 100%)", glow: "rgba(240,180,30,0.4)", icon: "#B97F08" },
  { bg: "linear-gradient(150deg, #FFEDF2 0%, #FFC9D6 100%)", glow: "rgba(236,72,120,0.3)", icon: "#D43D6C" },
];

/** Soft light that follows the pointer across a card */
function trackPointer(e: PointerEvent<HTMLElement>) {
  const box = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`);
}


const studyLevels = ["Diploma", "Bachelor's Degree", "Master's Degree", "PhD"];
const applyWindows = [
  "Within 1 month",
  "1 to 3 months",
  "3 to 6 months",
  "6 months or later",
];
const consultationModes = ["In-person", "Online Video Call", "Phone Call"];

const inputClass = "wa-input";

type Status = "idle" | "submitting" | "success" | "error";

export default function DestinationWhy({
  destination: DESTINATION,
  inName,
  headingLead = "Why Choose",
  headingAccent,
  intro,
  reasons,
  backupCountries,
}: Props) {
  const place = inName ?? DESTINATION;
  // Number every card except a featured one (1, 2, 3 ...)
  const numbers = reasons.map((_, i) => reasons.slice(0, i + 1).filter((r) => !r.featured).length);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: el, start: "top 78%", once: true } })
        .fromTo(q("[data-wa-eyebrow]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
        .fromTo(q("[data-wa-word]"), { autoAlpha: 0, yPercent: 115, rotate: 4 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.12 }, 0.08);

      /* The route runs down the list as you scroll, and each reason lights up as the plane reaches it */
      const list = q("[data-wa-list]")[0];
      const rail = q("[data-wa-rail]")[0];
      const plane = q("[data-wa-plane]");
      gsap.set(plane, { autoAlpha: 1, rotate: 90 });
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: list, start: "top 62%", end: "bottom 72%", scrub: 0.7, invalidateOnRefresh: true },
        })
        .fromTo(q("[data-wa-fill]"), { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0)
        .fromTo(plane, { y: 0 }, { y: () => rail.offsetHeight, duration: 1 }, 0);

      (q("[data-wa-item]") as HTMLElement[]).forEach((item, i) => {
        const c = gsap.utils.selector(item);
        const reach = { trigger: item, start: "top 62%", toggleActions: "play none none reverse" };
        gsap.fromTo(
          c("[data-wa-card]"),
          { autoAlpha: 0, y: 80, scale: 0.95, rotate: i % 2 ? 1.2 : -1.2 },
          { autoAlpha: 1, y: 0, scale: 1, rotate: 0, duration: 1.2, ease: "expo.out", clearProps: "transform", scrollTrigger: { trigger: item, start: "top 90%", once: true } },
        );
        gsap.fromTo(c("[data-wa-chip]"), { scale: 0.4, rotate: -24 }, { scale: 1, rotate: 0, duration: 0.9, ease: "back.out(2.2)", scrollTrigger: { trigger: item, start: "top 80%", once: true } });
        gsap.fromTo(c("[data-wa-dot]"), { backgroundColor: "#E9DDD6", scale: 0.7 }, { backgroundColor: "#F7931E", scale: 1, duration: 0.35, ease: "back.out(3)", scrollTrigger: reach });
      });

      /* The form rises in, then its fields follow */
      const form = q("[data-wa-form]")[0];
      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: form, start: "top 88%", once: true } })
        .fromTo(form, { autoAlpha: 0, y: 70, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.2, clearProps: "transform" }, 0)
        .fromTo(q("[data-wa-form] form > :not(.hidden)"), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.05, clearProps: "transform" }, 0.25);

      gsap.to(q("[data-wa-blob]"), { xPercent: -14, yPercent: 12, scale: 1.14, duration: 7, ease: "sine.inOut", yoyo: true, repeat: -1 });
    });

    return () => mm.revert();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get("_honey")) return; // spam bot

    setStatus("submitting");
    setErrorMessage("");

    const payload = {
      "Full Name": data.get("fullName"),
      Email: data.get("email"),
      Mobile: data.get("mobile"),
      "Preferred Country": DESTINATION,
      "Backup Country": data.get("backupCountry") || "(none)",
      "Study Level": data.get("studyLevel"),
      "English Test": data.get("englishTest") || "(not provided)",
      "Planning to Apply": data.get("applyWindow"),
      "Consultation Mode": data.get("consultationMode"),
      _subject: `New Consultation Request (${DESTINATION}): ${data.get("fullName")}`,
      _replyto: data.get("email"),
      _template: "table",
      _captcha: "false",
    };

    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || String(json.success) !== "true") {
        throw new Error(
          json.message || `Request failed (status ${res.status})`,
        );
      }

      setFirstName(
        String(data.get("fullName") || "")
          .trim()
          .split(" ")[0],
      );
      form.reset();
      setStatus("success");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("FormSubmit error:", message);
      setErrorMessage(message);
      setStatus("error");
    }
  }

  return (
    <section ref={root} className="wa relative w-full">
      <style>{`
        @keyframes cf-pop { 0% { transform: scale(.6); opacity: 0 } 60% { transform: scale(1.08); opacity: 1 } 100% { transform: scale(1) } }
        @keyframes cf-draw { to { stroke-dashoffset: 0 } }
        @keyframes cf-fade { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
        @keyframes cf-ring { 0% { transform: scale(.8); opacity: .6 } 100% { transform: scale(1.8); opacity: 0 } }

        .wa { overflow: clip; color: #350C0E; background: #FFFEFA; }
        .wa .wa-wrap { max-width: var(--page-max); margin: 0 auto; padding: 3.5rem 1.5rem 5rem; }
        .wa .wa-title { margin-top: 1.5rem; font-size: clamp(2.8rem, 12vw, 4rem); line-height: 1.02; letter-spacing: -0.04em; font-weight: 600; }
        .wa .wa-mask { display: inline-block; overflow: hidden; padding: 0 0.08em 0.14em 0; margin-bottom: -0.14em; vertical-align: top; }
        .wa .wa-accent { font-size: 1.16em; line-height: 0.9; letter-spacing: -0.02em; font-weight: 400; font-stretch: normal; color: #F7931E; }
        .wa .wa-lede { margin-top: 1rem; max-width: 36rem; font-size: 1.0625rem; line-height: 1.6; color: rgba(53,12,14,0.72); }
        .wa .wa-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 3rem; margin-top: 2.5rem; }

        .wa .wa-list { position: relative; display: flex; flex-direction: column; gap: 1rem; padding-left: 2rem; }
        .wa .wa-rail { position: absolute; left: 6px; top: 2.2rem; bottom: 0; width: 2px; background: rgba(53,12,14,0.1); }
        .wa .wa-fill { position: absolute; inset: 0; background: #F7931E; transform-origin: 50% 0; }
        .wa .wa-plane { position: absolute; left: -11px; top: -12px; width: 24px; height: 24px; color: #350C0E; visibility: hidden; }
        .wa .wa-item { position: relative; }
        .wa .wa-dot { position: absolute; left: -2rem; top: 2.2rem; width: 14px; height: 14px; margin-top: -6px; border-radius: 50%; background: #F7931E; box-shadow: 0 0 0 5px #FFFEFA; }

        .wa .wa-card { --mx: 50%; --my: 0%; position: relative; isolation: isolate; overflow: hidden; padding: 1.5rem; border-radius: 1.75rem; transition: translate .5s cubic-bezier(.2,.8,.2,1), box-shadow .5s ease; }
        .wa .wa-card:hover { translate: 0 -6px; box-shadow: 0 34px 60px -34px rgba(53,12,14,0.55); }
        .wa .wa-card::before { content: ""; position: absolute; inset: 0; z-index: -1; opacity: 0; background: radial-gradient(280px circle at var(--mx) var(--my), rgba(255,255,255,0.6), transparent 70%); transition: opacity .4s ease; }
        .wa .wa-card:hover::before { opacity: 1; }
        .wa .wa-card::after { content: ""; position: absolute; inset: 0; z-index: -2; opacity: 0.34; background-image: radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px); background-size: 15px 15px; -webkit-mask-image: linear-gradient(200deg, black, transparent 55%); mask-image: linear-gradient(200deg, black, transparent 55%); }
        .wa .wa-orb { position: absolute; z-index: -2; left: -12%; bottom: -50%; width: 50%; aspect-ratio: 1; border-radius: 50%; filter: blur(50px); transition: transform .8s cubic-bezier(.2,.8,.2,1); }
        .wa .wa-card:hover .wa-orb { transform: translate(18%, -16%) scale(1.15); }
        .wa .wa-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
        .wa .wa-chip { display: grid; place-items: center; width: 3rem; height: 3rem; border-radius: 1rem; background: rgba(255,255,255,0.74); box-shadow: 0 12px 24px -14px rgba(53,12,14,0.5); }
        .wa .wa-num { flex: none; font-size: 3.25rem; line-height: 0.85; letter-spacing: -0.05em; font-weight: 700; color: rgba(53,12,14,0.05); -webkit-text-stroke: 1.5px rgba(53,12,14,0.22); }
        .wa .wa-feat { flex: none; padding: 0.35rem 0.8rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #fff; background: #350C0E; }
        .wa .wa-h3 { margin-top: 1.1rem; font-size: 1.5rem; line-height: 1.1; letter-spacing: -0.03em; font-weight: 600; }
        .wa .wa-text { margin-top: 0.65rem; font-size: 0.9688rem; line-height: 1.62; color: rgba(53,12,14,0.78); }
        .wa .wa-points { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.9rem; }
        .wa .wa-points li { display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.9375rem; line-height: 1.5; color: rgba(53,12,14,0.8); }

        .wa .wa-form { position: relative; isolation: isolate; overflow: hidden; height: fit-content; border-radius: 1.75rem; background: #fff; box-shadow: 0 0 0 1px rgba(53,12,14,0.08), 0 40px 70px -46px rgba(53,12,14,0.55); }
        .wa .wa-blob { position: absolute; z-index: -1; right: -18%; top: -34%; width: 62%; aspect-ratio: 1; border-radius: 50%; background: rgba(247,147,30,0.32); filter: blur(54px); }
        .wa .wa-ico { background: rgba(247,147,30,0.16); }
        .wa .wa-form-title { font-size: 1.5rem; line-height: 1.1; letter-spacing: -0.03em; font-weight: 600; }
        .wa .wa-muted { color: rgba(53,12,14,0.7); }
        .wa .wa-fields { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0.75rem; margin-top: 1.5rem; }
        .wa .wa-input { width: 100%; height: 3.25rem; padding: 0 1rem; border-radius: 0.875rem; font-size: 0.875rem; color: #350C0E; text-overflow: ellipsis; background: #FFFBF7; box-shadow: inset 0 0 0 1px rgba(53,12,14,0.14); outline: none; transition: box-shadow .25s ease, background-color .25s ease; }
        .wa .wa-input::placeholder { color: rgba(53,12,14,0.55); }
        .wa .wa-input:focus { background: #fff; box-shadow: inset 0 0 0 1.5px #F7931E, 0 0 0 4px rgba(247,147,30,0.16); }
        .wa .wa-input[readonly] { cursor: not-allowed; color: rgba(53,12,14,0.66); background: #F7F1EC; }
        .wa .wa-submit { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; height: 3.5rem; border-radius: 9999px; font-size: 1rem; font-weight: 600; color: #fff; background: #350C0E; transition: background-color .3s ease; }
        .wa .wa-submit:hover:not(:disabled), .wa .wa-submit:focus-visible { background: #F7931E; }
        .wa .wa-submit:disabled { cursor: not-allowed; opacity: 0.7; }
        .wa .wa-again { display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 1.5rem; padding: 0.625rem 1.25rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 600; box-shadow: inset 0 0 0 1px #350C0E; transition: background-color .3s ease, color .3s ease; }
        .wa .wa-again:hover { color: #fff; background: #350C0E; }
        .wa .wa-note { background: #FFF4E8; }

        @media (min-width: 640px) {
          .wa .wa-card { padding: 2rem; }
          .wa .wa-fields { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .wa .wa-full { grid-column: 1 / -1; }
        }
        @media (min-width: 1024px) {
          .wa .wa-wrap { padding: 4rem var(--page-gutter) 6.5rem; }
          .wa .wa-title { font-size: clamp(3.4rem, 5.5vw, 5.9rem); }
          .wa .wa-grid { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); align-items: start; gap: clamp(2rem, 3.5vw, 3.5rem); margin-top: 3.25rem; }
          .wa .wa-list { padding-left: 2.75rem; }
          .wa .wa-dot { left: -2.75rem; top: 2.75rem; }
          .wa .wa-rail { top: 2.75rem; }
          .wa .wa-h3 { font-size: clamp(1.6rem, 2.1vw, 2rem); }
          .wa .wa-form { position: sticky; top: 6.5rem; }
          .wa .wa-pad { padding: 2.5rem !important; }
          .wa .wa-form-title { font-size: 1.875rem; }
          .wa .wa-fields { gap: 0.875rem; margin-top: 1.75rem; }
          .wa .wa-input { height: 3.5rem; padding: 0 1.1rem; font-size: 0.9375rem; }
          .wa .wa-submit { height: 3.75rem; }
        }
        /* Short screens: compact form so all of it stays in view under the navbar */
        @media (min-width: 1024px) and (max-height: 800px) {
          .wa .wa-intro { display: none; }
          .wa .wa-pad { padding: 1.25rem 1.75rem !important; }
          .wa .wa-fields { gap: 0.5rem; margin-top: 0.75rem; }
          .wa .wa-input { height: 2.85rem; font-size: 0.875rem; }
          .wa .wa-submit { height: 2.9rem; }
          .wa .wa-ico { display: none; }
          .wa .wa-form-title { font-size: 1.4rem; }
          .wa .wa-form { top: 6.25rem; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .wa [data-wa-eyebrow], .wa [data-wa-word], .wa [data-wa-card], .wa [data-wa-form] { visibility: hidden; }
        }
        @media (prefers-reduced-motion: reduce) { .wa .wa-card, .wa .wa-orb { transition: none; } }
      `}</style>

      <div className="wa-wrap">
        <p data-wa-eyebrow className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
          <span className="h-3.5 w-5 bg-[#F7931E] [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
          Study in {DESTINATION}
        </p>
        <h2 className="wa-title font-display">
          <span className="wa-mask">
            <span data-wa-word className="inline-block origin-bottom-left">
              {headingLead}
            </span>
          </span>{" "}
          <span className="wa-mask">
            <span data-wa-word className={`${accentSerif.className} wa-accent inline-block origin-bottom-left`}>
              {headingAccent ?? `${DESTINATION}?`}
            </span>
          </span>
        </h2>
        {intro && <p className="wa-lede">{intro}</p>}

        <div className="wa-grid">
          {/* Reasons, joined by a route */}
          <ol data-wa-list className="wa-list">
            <li aria-hidden data-wa-rail className="wa-rail">
              <span data-wa-fill className="wa-fill" />
              <svg data-wa-plane viewBox="0 0 24 24" className="wa-plane" fill="currentColor">
                <path d="M22 12 2 4l5 8-5 8 20-8Z" />
              </svg>
            </li>
            {reasons.map((reason, i) => {
              const tone = TONES[i % TONES.length];
              return (
                <li key={reason.title} data-wa-item className="wa-item">
                  <span aria-hidden data-wa-dot className="wa-dot" />
                  <article data-wa-card onPointerMove={trackPointer} className="wa-card" style={{ background: tone.bg }}>
                    <span aria-hidden className="wa-orb" style={{ background: tone.glow }} />
                    <div className="wa-top">
                      <span data-wa-chip className="wa-chip">
                        <svg viewBox="0 0 24 24" fill={tone.icon} fillRule="evenodd" aria-hidden style={{ width: "1.35rem", height: "1.35rem" }}>
                          {reason.icon}
                        </svg>
                      </span>
                      {reason.featured ? (
                        <span className="wa-feat">Highlight</span>
                      ) : (
                        <span aria-hidden className="wa-num font-display">
                          {String(numbers[i]).padStart(2, "0")}
                        </span>
                      )}
                    </div>
                    <h3 className="wa-h3 font-display">{reason.title}</h3>
                    <p className="wa-text">{reason.description}</p>
                    {reason.points && (
                      <ul className="wa-points">
                        {reason.points.map((point) => (
                          <li key={point}>
                            <svg viewBox="0 0 24 24" fill="none" stroke={tone.icon} strokeWidth={3} aria-hidden style={{ flex: "none", width: "0.9rem", height: "0.9rem", marginTop: "0.25rem" }}>
                              <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </li>
              );
            })}
          </ol>

          {/* Consultation form */}
          <div data-wa-form className="wa-form">
            <span aria-hidden data-wa-blob className="wa-blob" />

            {status === "success" ? (
              /* ───────── Success state ───────── */
              <div
                role="status"
                aria-live="polite"
                className="flex flex-col items-center px-6 py-12 text-center sm:px-8"
              >
                <div className="relative grid h-20 w-20 place-items-center">
                  <span
                    className="absolute inset-0 rounded-full bg-[#59B226]/30 motion-reduce:hidden"
                    style={{ animation: "cf-ring 1.4s ease-out 0.3s both" }}
                  />
                  <span
                    className="relative grid h-20 w-20 place-items-center rounded-full bg-[#59B226] shadow-lg shadow-[#59B226]/30"
                    style={{
                      animation: "cf-pop 0.6s cubic-bezier(.22,1,.36,1) both",
                    }}
                  >
                    <svg
                      className="h-10 w-10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth={3}
                      aria-hidden
                    >
                      <path
                        d="M5 12.5l4.5 4.5L19 7.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="24"
                        strokeDashoffset="24"
                        style={{
                          animation: "cf-draw 0.5s ease-out 0.45s forwards",
                        }}
                      />
                    </svg>
                  </span>
                </div>

                <div style={{ animation: "cf-fade 0.6s ease-out 0.6s both" }}>
                  <h3 className="mt-7 text-xl font-semibold sm:text-2xl">
                    Thank you{firstName ? `, ${firstName}` : ""}!
                  </h3>
                  <p className="mx-auto mt-2 wa-muted max-w-xs text-sm leading-relaxed">
                    Your free consultation request for studying in {place} has
                    been received. One of our counsellors will contact you
                    shortly.
                  </p>

                  <div className="mt-6 flex items-center gap-3 wa-note rounded-2xl p-4 text-left">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white shadow-sm">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden
                      >
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4 7 8 6 8-6"
                        />
                      </svg>
                    </span>
                    <p className="wa-muted text-xs sm:text-sm">
                      Questions in the meantime? Email{" "}
                      <a
                        href="mailto:apply@admissiononboard.com"
                        className="font-semibold underline"
                      >
                        apply@admissiononboard.com
                      </a>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="wa-again"
                  >
                    Submit another request
                  </button>
                </div>
              </div>
            ) : (
              <div className="wa-pad p-6 sm:p-8">
                <div className="flex items-start gap-3">
                  <div className="wa-ico flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#D9651A"
                      aria-hidden
                    >
                      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm2.07-7.75-.9.92C13.45 10.9 13 11.5 13 13h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41a2 2 0 0 0-2-2 2 2 0 0 0-2 2H8a4 4 0 0 1 4-4 4 4 0 0 1 4 4c0 .8-.32 1.53-.93 2.09Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="wa-form-title font-display">
                      Have more questions?
                    </h3>
                    <p className="wa-intro wa-muted mt-1 text-sm">
                      Book a free session with our expert counsellors and get
                      clarity on studying in {place}.
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="wa-fields"
                >
                  {/* Honeypot: hidden from people, catches spam bots */}
                  <input
                    type="text"
                    name="_honey"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden
                  />

                  <input
                    name="fullName"
                    type="text"
                    placeholder="Full name *"
                    required
                    autoComplete="name"
                    aria-label="Full name"
                    className={inputClass}
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email *"
                    required
                    autoComplete="email"
                    aria-label="Email"
                    className={inputClass}
                  />
                  <input
                    name="mobile"
                    type="tel"
                    placeholder="Mobile No. *"
                    required
                    autoComplete="tel"
                    aria-label="Mobile number"
                    className={inputClass}
                  />

                  <input
                    type="text"
                    value={DESTINATION}
                    readOnly
                    aria-label="Preferred country"
                    className={inputClass}
                  />

                  <select
                    name="backupCountry"
                    defaultValue=""
                    aria-label="Backup country"
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select a backup country
                    </option>
                    {backupCountries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  <select
                    name="studyLevel"
                    required
                    defaultValue=""
                    aria-label="Desired study level"
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select desired study level *
                    </option>
                    {studyLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>

                  <input
                    name="englishTest"
                    type="text"
                    placeholder="Have you taken IELTS, PTE, or another English test?"
                    aria-label="English test"
                    className={`${inputClass} wa-full`}
                  />

                  <select
                    name="applyWindow"
                    required
                    defaultValue=""
                    aria-label="When are you looking to apply"
                    className={`${inputClass} wa-full`}
                  >
                    <option value="" disabled>
                      When are you looking to apply? *
                    </option>
                    {applyWindows.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>

                  <select
                    name="consultationMode"
                    required
                    defaultValue=""
                    aria-label="Consultation mode"
                    className={`${inputClass} wa-full`}
                  >
                    <option value="" disabled>
                      Choose a consultation mode *
                    </option>
                    {consultationModes.map((mode) => (
                      <option key={mode} value={mode}>
                        {mode}
                      </option>
                    ))}
                  </select>

                  {status === "error" && (
                    <div
                      role="alert"
                      className="wa-full flex items-start gap-3 rounded-xl border border-[#E0483E]/30 bg-[#FFF3F2] p-3.5 text-sm text-[#B3261E]"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.2}
                        aria-hidden
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path strokeLinecap="round" d="M12 8v5M12 16h.01" />
                      </svg>
                      {/activat/i.test(errorMessage) ? (
                        <span>
                          <strong className="font-semibold">
                            This form needs to be activated.
                          </strong>{" "}
                          An activation email has been sent to
                          apply@admissiononboard.com (check spam too). Click
                          &ldquo;Activate Form&rdquo; in it, then submit again.
                        </span>
                      ) : (
                        <span>
                          Your request couldn&apos;t be sent
                          {errorMessage ? ` (${errorMessage})` : ""}. Try again,
                          or email{" "}
                          <a
                            href="mailto:apply@admissiononboard.com"
                            className="font-semibold underline"
                          >
                            apply@admissiononboard.com
                          </a>
                          .
                        </span>
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="wa-submit wa-full"
                  >
                    {status === "submitting" ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="currentColor"
                            strokeOpacity=".3"
                            strokeWidth="3"
                          />
                          <path
                            d="M21 12a9 9 0 0 0-9-9"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      "Book free consultation"
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
