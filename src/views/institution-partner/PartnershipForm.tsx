"use client";

import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

// FormSubmit AJAX endpoint: submissions are emailed to this address
const FORMSUBMIT_URL = "https://formsubmit.co/ajax/aob@admissiononboard.com";

/* The required fields, in form order; the side panel ticks each one off as it is filled */
const REQUIRED = [
  { name: "fullName", label: "Full name" },
  { name: "jobTitle", label: "Job title" },
  { name: "institute", label: "Institute" },
  { name: "email", label: "Email" },
  { name: "phone", label: "Phone" },
] as const;

const RING = 2 * Math.PI * 52;

type Status = "idle" | "submitting" | "success" | "error";

export default function PartnershipForm() {
  const root = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [submittedName, setSubmittedName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [filled, setFilled] = useState<Record<string, boolean>>({});

  const done = REQUIRED.filter((f) => filled[f.name]).length;
  const complete = status === "success" ? REQUIRED.length : done;

  /* Which required fields are filled in (and valid) */
  function trackProgress(form: HTMLFormElement) {
    const next: Record<string, boolean> = {};
    REQUIRED.forEach(({ name }) => {
      const field = form.elements.namedItem(name) as HTMLInputElement | null;
      next[name] = !!field && field.value.trim() !== "" && field.checkValidity();
    });
    setFilled(next);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real people never fill this hidden field
    if (data.get("_honey")) return;

    setStatus("submitting");
    setErrorMessage("");

    const payload = {
      "Full Name": data.get("fullName"),
      "Job Title": data.get("jobTitle"),
      Institute: data.get("institute"),
      Email: data.get("email"),
      Phone: data.get("phone"),
      Message: data.get("message") || "(no message)",
      "Agrees to communications": data.get("consent") ? "Yes" : "No",
      _subject: `New Partnership Request: ${data.get("institute")}`,
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
        throw new Error(json.message || `Request failed (status ${res.status})`);
      }

      setSubmittedName(String(data.get("fullName") || "").split(" ")[0]);
      form.reset();
      setFilled({});
      setStatus("success");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("FormSubmit error:", message);
      setErrorMessage(message);
      setStatus("error");
    }
  }

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: el, start: "top 75%", once: true } })
        .fromTo(q("[data-pf-panel]"), { autoAlpha: 0, x: -60, rotate: -1.5 }, { autoAlpha: 1, x: 0, rotate: 0, duration: 1.3 }, 0)
        .fromTo(q("[data-pf-eyebrow]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.2)
        .fromTo(q("[data-pf-word]"), { autoAlpha: 0, yPercent: 115, rotate: 5 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.12 }, 0.25)
        .fromTo(q("[data-pf-lead] > *"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.5)
        .fromTo(q("[data-pf-card]"), { autoAlpha: 0, y: 70 }, { autoAlpha: 1, y: 0, duration: 1.3 }, 0.15)
        .fromTo(q("[data-pf-field]"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.06 }, 0.5)
        .add(() => el.classList.add("is-in"));

      return () => el.classList.remove("is-in");
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="institution-form" className="pf relative w-full">
      <style>{`
        .pf { overflow: clip; color: #350C0E; scroll-margin-top: 5rem;
          background: radial-gradient(40% 50% at 95% 20%, rgba(47,107,255,0.07), transparent 70%), radial-gradient(40% 50% at 0% 90%, rgba(247,147,30,0.09), transparent 70%), #FFFEFA; }
        .pf .pf-wrap { max-width: var(--page-max); margin: 0 auto; padding: 4.5rem 1.5rem 5rem; display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.5rem; align-items: start; }

        /* Side panel */
        .pf .pf-panel { position: relative; overflow: hidden; isolation: isolate; border-radius: 28px; padding: 1.75rem 1.5rem;
          background: linear-gradient(150deg, #FFEBD9 0%, #FFCFA3 100%); box-shadow: 0 0 0 1px rgba(53,12,14,0.05), 0 30px 60px -36px rgba(53,12,14,0.5); }
        .pf .pf-panel::before { content: ""; position: absolute; inset: 0; z-index: -1; opacity: 0.4; pointer-events: none;
          background-image: radial-gradient(rgba(53,12,14,0.3) 1px, transparent 1.4px); background-size: 15px 15px;
          -webkit-mask-image: linear-gradient(160deg, transparent 35%, #000 100%); mask-image: linear-gradient(160deg, transparent 35%, #000 100%); }
        .pf .pf-orb { position: absolute; z-index: -1; right: -5rem; top: -5rem; width: 16rem; height: 16rem; border-radius: 999px; background: #F7931E; opacity: 0.22; filter: blur(50px); }
        .pf .pf-eyebrow { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0.85rem 0.4rem 0.45rem; border-radius: 999px; background: rgba(255,255,255,0.8);
          font-size: 0.78rem; font-weight: 600; }
        .pf .pf-eyebrow span { display: grid; place-items: center; width: 1.35rem; height: 1.35rem; border-radius: 999px; background: #350C0E; color: #fff; }
        .pf .pf-title { margin-top: 1.1rem; font-size: clamp(2.3rem, 10vw, 3.2rem); line-height: 1.02; letter-spacing: -0.045em; font-weight: 600; }
        .pf .pf-mask { display: inline-block; overflow: hidden; padding: 0.04em 0.08em 0.16em 0; margin: -0.04em 0 -0.16em; vertical-align: bottom; }
        .pf .pf-accent { color: #F7931E; font-weight: 400; font-style: italic; letter-spacing: -0.02em; font-size: 1.12em; line-height: 0.95; }
        .pf .pf-lead p { margin-top: 0.9rem; font-size: 1rem; line-height: 1.65; color: rgba(53,12,14,0.74); max-width: 26rem; }

        .pf .pf-meter { margin-top: 1.5rem; display: flex; align-items: center; gap: 1rem; padding: 1rem; border-radius: 20px; background: rgba(255,255,255,0.72);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.9); }
        .pf .pf-ring { position: relative; width: 4.6rem; height: 4.6rem; flex: none; }
        .pf .pf-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
        .pf .pf-ring-bar { transition: stroke-dashoffset .8s cubic-bezier(.22,1,.36,1), stroke .5s ease; }
        .pf .pf-ring b { position: absolute; inset: 0; display: grid; place-items: center; font-size: 1.15rem; font-weight: 700; letter-spacing: -0.03em; }
        .pf .pf-meter strong { display: block; font-size: 0.95rem; font-weight: 600; }
        .pf .pf-meter small { display: block; margin-top: 0.15rem; font-size: 0.8rem; color: rgba(53,12,14,0.6); }

        .pf .pf-checks { display: none; }
        .pf .pf-mail { margin-top: 1.25rem; display: flex; align-items: center; gap: 0.75rem; font-size: 0.85rem; color: rgba(53,12,14,0.7); }
        .pf .pf-mail-icon { display: grid; place-items: center; width: 2.4rem; height: 2.4rem; flex: none; border-radius: 12px; background: #fff; color: #F7931E;
          box-shadow: 0 10px 22px -14px rgba(53,12,14,0.5); }
        .pf .pf-mail a { display: block; font-weight: 600; color: #350C0E; }
        .pf .pf-mail a:hover { color: #F7931E; }

        /* Form card */
        .pf .pf-card { position: relative; border-radius: 28px; background: #fff; overflow: hidden;
          box-shadow: 0 0 0 1px rgba(53,12,14,0.06), 0 40px 80px -44px rgba(53,12,14,0.55); }
        .pf .pf-card::before { content: ""; position: absolute; inset: 0 0 auto; height: 5px; background: linear-gradient(90deg, #F7931E, #2F6BFF 55%, #3BAA35); }
        .pf .pf-form { padding: 1.75rem 1.4rem 1.6rem; }
        .pf .pf-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.1rem; }
        .pf .pf-label { display: flex; align-items: baseline; justify-content: space-between; font-size: 0.86rem; font-weight: 600; }
        .pf .pf-label em { font-style: normal; color: #F7931E; }
        .pf .pf-label small { font-size: 0.75rem; font-weight: 500; color: rgba(53,12,14,0.45); }
        .pf .pf-input { margin-top: 0.5rem; width: 100%; border-radius: 14px; border: 1px solid rgba(53,12,14,0.12); background: #FFFBF6; padding: 0.85rem 1rem;
          font-size: 0.92rem; color: #350C0E; outline: none; transition: border-color .25s ease, background .25s ease, box-shadow .25s ease; }
        .pf .pf-input::placeholder { color: rgba(53,12,14,0.38); }
        .pf .pf-input:hover { border-color: rgba(53,12,14,0.22); }
        .pf .pf-input:focus { border-color: #F7931E; background: #fff; box-shadow: 0 0 0 4px rgba(247,147,30,0.15); }
        .pf textarea.pf-input { resize: vertical; min-height: 7.5rem; }

        .pf .pf-consent { margin-top: 1.25rem; display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.95rem 1rem; border-radius: 14px; background: #FFF6EC;
          font-size: 0.88rem; color: rgba(53,12,14,0.72); cursor: pointer; }
        .pf .pf-consent input { margin-top: 0.15rem; width: 1.05rem; height: 1.05rem; flex: none; accent-color: #F7931E; cursor: pointer; }

        .pf .pf-error { margin-top: 1.1rem; display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.95rem 1rem; border-radius: 14px;
          border: 1px solid rgba(224,72,62,0.3); background: #FFF3F2; font-size: 0.88rem; color: #B3261E; }

        .pf .pf-submit { margin-top: 1.4rem; display: flex; width: 100%; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.5rem 0.5rem 0.5rem 1.5rem;
          border-radius: 999px; background: #350C0E; color: #fff; font-size: 0.98rem; font-weight: 600; cursor: pointer;
          box-shadow: 0 18px 36px -18px rgba(53,12,14,0.75); transition: background .35s ease, box-shadow .35s ease, transform .35s cubic-bezier(.22,1,.36,1); }
        .pf .pf-submit:hover:not(:disabled) { background: #F7931E; box-shadow: 0 20px 40px -18px rgba(247,147,30,0.85); transform: translateY(-2px); }
        .pf .pf-submit:focus-visible { outline: 2px solid #F7931E; outline-offset: 3px; }
        .pf .pf-submit:disabled { cursor: not-allowed; opacity: 0.75; }
        .pf .pf-submit-icon { display: grid; place-items: center; width: 2.75rem; height: 2.75rem; border-radius: 999px; background: rgba(255,255,255,0.16);
          transition: transform .35s cubic-bezier(.22,1,.36,1); }
        .pf .pf-submit:hover:not(:disabled) .pf-submit-icon { transform: rotate(-45deg); }
        .pf .pf-note { margin-top: 0.9rem; display: flex; align-items: center; justify-content: center; gap: 0.4rem; font-size: 0.78rem; color: rgba(53,12,14,0.5); }

        /* Success */
        .pf .pf-done { display: flex; flex-direction: column; align-items: center; padding: 3.5rem 1.5rem; text-align: center; }
        .pf .pf-done-badge { position: relative; display: grid; place-items: center; width: 6rem; height: 6rem; }
        .pf .pf-done-badge i { position: absolute; inset: 0; border-radius: 999px; background: rgba(59,170,53,0.3); animation: pf-ring 1.4s ease-out 0.3s both; }
        .pf .pf-done-badge span { position: relative; display: grid; place-items: center; width: 6rem; height: 6rem; border-radius: 999px; background: #3BAA35;
          box-shadow: 0 18px 36px -14px rgba(59,170,53,0.7); animation: pf-pop 0.6s cubic-bezier(.22,1,.36,1) both; }
        .pf .pf-done-badge path { stroke-dasharray: 24; stroke-dashoffset: 24; animation: pf-draw 0.5s ease-out 0.45s forwards; }
        .pf .pf-done-text { animation: pf-fade 0.6s ease-out 0.6s both; }
        .pf .pf-done h3 { margin-top: 2rem; font-size: clamp(1.6rem, 6vw, 2.1rem); font-weight: 600; letter-spacing: -0.03em; }
        .pf .pf-done p { margin: 0.75rem auto 0; max-width: 28rem; font-size: 0.98rem; line-height: 1.65; color: rgba(53,12,14,0.72); }
        .pf .pf-done-mail { margin: 1.75rem auto 0; display: flex; max-width: 24rem; align-items: center; gap: 0.75rem; padding: 0.95rem; border-radius: 18px; background: #FFF6EC; text-align: left; }
        .pf .pf-done-mail p { margin: 0; font-size: 0.85rem; }
        .pf .pf-done-mail a { font-weight: 600; color: #350C0E; text-decoration: underline; text-decoration-color: rgba(247,147,30,0.6); }
        .pf .pf-again { margin-top: 1.75rem; display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.8rem 1.5rem; border-radius: 999px;
          border: 1.5px solid #350C0E; font-size: 0.9rem; font-weight: 600; transition: background .3s ease, color .3s ease; cursor: pointer; }
        .pf .pf-again:hover { background: #350C0E; color: #fff; }
        @keyframes pf-pop { 0% { transform: scale(.6); opacity: 0 } 60% { transform: scale(1.08); opacity: 1 } 100% { transform: scale(1) } }
        @keyframes pf-draw { to { stroke-dashoffset: 0 } }
        @keyframes pf-fade { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }
        @keyframes pf-ring { 0% { transform: scale(.8); opacity: .6 } 100% { transform: scale(1.8); opacity: 0 } }

        @media (prefers-reduced-motion: no-preference) {
          /* Hidden only until the first reveal has played, so a re-shown form is never stuck invisible */
          .pf:not(.is-in) [data-pf-panel], .pf:not(.is-in) [data-pf-eyebrow], .pf:not(.is-in) [data-pf-word], .pf:not(.is-in) [data-pf-lead] > *,
          .pf:not(.is-in) [data-pf-card], .pf:not(.is-in) [data-pf-field] { visibility: hidden; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pf .pf-done-badge i, .pf .pf-done-badge span, .pf .pf-done-text { animation: none; }
          .pf .pf-done-badge path { animation: none; stroke-dashoffset: 0; }
        }

        @media (min-width: 640px) {
          .pf .pf-wrap { padding: 5.5rem 2rem 6rem; }
          .pf .pf-panel { padding: 2.25rem 2rem; }
          .pf .pf-form { padding: 2.25rem 2.25rem 2rem; }
          .pf .pf-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.25rem; }
          .pf .pf-span { grid-column: 1 / -1; }
        }
        @media (min-width: 1024px) {
          .pf .pf-wrap { grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr); gap: 2rem; padding: 6.5rem var(--page-gutter) 7rem; }
          .pf .pf-panel { position: sticky; top: 6.5rem; padding: 2.5rem 2.25rem; }
          .pf .pf-title { font-size: clamp(2.8rem, 3.9vw, 3.8rem); }
          .pf .pf-checks { display: grid; gap: 0.35rem; margin-top: 1.1rem; }
          .pf .pf-check { display: flex; align-items: center; gap: 0.7rem; font-size: 0.9rem; font-weight: 500; color: rgba(53,12,14,0.55); transition: color .4s ease; }
          .pf .pf-check i { display: grid; place-items: center; width: 1.45rem; height: 1.45rem; flex: none; border-radius: 999px; background: rgba(255,255,255,0.7);
            box-shadow: inset 0 0 0 1.5px rgba(53,12,14,0.15); color: transparent; transition: background .4s ease, color .4s ease, box-shadow .4s ease, transform .4s cubic-bezier(.22,1,.36,1); }
          .pf .pf-check.is-on { color: #350C0E; }
          .pf .pf-check.is-on i { background: #3BAA35; color: #fff; box-shadow: none; transform: scale(1.08); }
          .pf .pf-form { padding: 2.5rem 2.75rem 2.25rem; }
        }
        @media (min-width: 1024px) and (max-height: 760px) {
          .pf .pf-panel { top: 6.25rem; padding: 1.75rem 2rem; }
          .pf .pf-title { font-size: clamp(2.4rem, 3.3vw, 3rem); }
          .pf .pf-lead p { font-size: 0.92rem; }
          .pf .pf-meter { margin-top: 1rem; padding: 0.75rem; }
          .pf .pf-ring { width: 3.8rem; height: 3.8rem; }
          .pf .pf-checks { display: none; }
          .pf .pf-mail { margin-top: 0.9rem; }
        }
      `}</style>

      <div className="pf-wrap">
        {/* Side panel: heading and live progress */}
        <aside data-pf-panel className="pf-panel">
          <span className="pf-orb" aria-hidden />
          <span data-pf-eyebrow className="pf-eyebrow">
            <span aria-hidden>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
            Become a partner
          </span>
          <h2 className="pf-title">
            <span className="pf-mask">
              <span data-pf-word className="inline-block origin-bottom-left">
                Partnership
              </span>
            </span>{" "}
            <span className="pf-mask">
              <span data-pf-word className={`${accentSerif.className} pf-accent inline-block origin-bottom-left`}>
                Request
              </span>
            </span>
          </h2>
          <div data-pf-lead className="pf-lead">
            <p>Partner with Admission OnBoard to expand your student reach and boost enrolment success.</p>

            <div className="pf-meter" aria-live="polite">
              <span className="pf-ring">
                <svg viewBox="0 0 120 120" aria-hidden>
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(53,12,14,0.1)" strokeWidth="10" />
                  <circle
                    className="pf-ring-bar"
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke={complete === REQUIRED.length ? "#3BAA35" : "#F7931E"}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={RING}
                    strokeDashoffset={RING * (1 - complete / REQUIRED.length)}
                  />
                </svg>
                <b>{Math.round((complete / REQUIRED.length) * 100)}%</b>
              </span>
              <span>
                <strong>
                  {status === "success"
                    ? "Request sent"
                    : complete === REQUIRED.length
                      ? "Ready to send"
                      : `${complete} of ${REQUIRED.length} required fields`}
                </strong>
                <small>{status === "success" ? "We'll be in touch shortly" : "Message is optional"}</small>
              </span>
            </div>

            <ul className="pf-checks" aria-hidden>
              {REQUIRED.map((f) => (
                <li key={f.name} className={`pf-check${filled[f.name] || status === "success" ? " is-on" : ""}`}>
                  <i>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5 9.5 17 19 7.5" />
                    </svg>
                  </i>
                  {f.label}
                </li>
              ))}
            </ul>

            <div className="pf-mail">
              <span className="pf-mail-icon" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
                </svg>
              </span>
              <span>
                Prefer email?
                <a href="mailto:aob@admissiononboard.com">aob@admissiononboard.com</a>
              </span>
            </div>
          </div>
        </aside>

        {/* Form */}
        <div data-pf-card className="pf-card">
          {status === "success" ? (
            <div role="status" aria-live="polite" className="pf-done">
              <div className="pf-done-badge">
                <i aria-hidden />
                <span>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} aria-hidden>
                    <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>

              <div className="pf-done-text">
                <h3>Thank you{submittedName ? `, ${submittedName}` : ""}!</h3>
                <p>
                  Your partnership request has been received. Our partnerships team will review it and get back to you
                  shortly.
                </p>

                <div className="pf-done-mail">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#F7931E] shadow-sm" aria-hidden>
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
                    </svg>
                  </span>
                  <p>
                    Need to add something? Email us at <a href="mailto:aob@admissiononboard.com">aob@admissiononboard.com</a>
                  </p>
                </div>

                <button type="button" onClick={() => setStatus("idle")} className="pf-again">
                  Submit another request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} onInput={(e) => trackProgress(e.currentTarget)} className="pf-form">
              {/* Honeypot (hidden from people, catches spam bots) */}
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

              <div className="pf-grid">
                <div data-pf-field>
                  <label htmlFor="fullName" className="pf-label">
                    <span>
                      Full Name <em>*</em>
                    </span>
                  </label>
                  <input id="fullName" name="fullName" type="text" required autoComplete="name" placeholder="e.g. Sarah Ahmed" className="pf-input" />
                </div>

                <div data-pf-field>
                  <label htmlFor="jobTitle" className="pf-label">
                    <span>
                      Job Title <em>*</em>
                    </span>
                  </label>
                  <input
                    id="jobTitle"
                    name="jobTitle"
                    type="text"
                    required
                    autoComplete="organization-title"
                    placeholder="e.g. International Admissions Manager"
                    className="pf-input"
                  />
                </div>

                <div data-pf-field className="pf-span">
                  <label htmlFor="institute" className="pf-label">
                    <span>
                      Institute <em>*</em>
                    </span>
                  </label>
                  <input
                    id="institute"
                    name="institute"
                    type="text"
                    required
                    autoComplete="organization"
                    placeholder="University or college name"
                    className="pf-input"
                  />
                </div>

                <div data-pf-field>
                  <label htmlFor="email" className="pf-label">
                    <span>
                      Email <em>*</em>
                    </span>
                  </label>
                  <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@institute.com" className="pf-input" />
                </div>

                <div data-pf-field>
                  <label htmlFor="phone" className="pf-label">
                    <span>
                      Phone <em>*</em>
                    </span>
                  </label>
                  <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="e.g. +44 20 7946 0000" className="pf-input" />
                </div>

                <div data-pf-field className="pf-span">
                  <label htmlFor="message" className="pf-label">
                    Message
                    <small>Optional</small>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    maxLength={1500}
                    placeholder="Tell us about your institution and the kind of partnership you're interested in."
                    className="pf-input"
                  />
                </div>
              </div>

              <label data-pf-field className="pf-consent">
                <input type="checkbox" name="consent" />
                I agree to receive other communications from Admission OnBoard.
              </label>

              {status === "error" && (
                <div role="alert" className="pf-error">
                  <svg className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
                    <circle cx="12" cy="12" r="9" />
                    <path strokeLinecap="round" d="M12 8v5M12 16h.01" />
                  </svg>
                  {/activat/i.test(errorMessage) ? (
                    <span>
                      <strong className="font-semibold">This form needs to be activated.</strong> An activation email has been
                      sent to aob@admissiononboard.com (check the spam folder too). Click the &ldquo;Activate Form&rdquo; link in
                      it, then submit again.
                    </span>
                  ) : (
                    <span>
                      Your request couldn&apos;t be sent
                      {errorMessage ? ` (${errorMessage})` : ""}. Try again, or email{" "}
                      <a href="mailto:aob@admissiononboard.com" className="font-semibold underline">
                        aob@admissiononboard.com
                      </a>
                      .
                    </span>
                  )}
                </div>
              )}

              <div data-pf-field>
                <button type="submit" disabled={status === "submitting"} className="pf-submit">
                  {status === "submitting" ? "Sending request…" : "Submit partnership request"}
                  <span className="pf-submit-icon" aria-hidden>
                    {status === "submitting" ? (
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".3" strokeWidth="3" />
                        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                </button>
                <p className="pf-note">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                  Your details are sent securely to our partnerships team.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
