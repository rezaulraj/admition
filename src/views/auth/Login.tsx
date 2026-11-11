"use client";

import React, { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserGraduate, FaHandshake, FaGraduationCap, FaShieldAlt, FaArrowLeft } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin);

type LoginTab = "student" | "partner" | "admin";

// Place your background image at: /public/register.avif
const BG_IMAGE = "/register.avif";

const ACCENTS: Record<LoginTab, { color: string; soft: string }> = {
  student: { color: "#2F6BFF", soft: "#EEF2FF" },
  partner: { color: "#F7931E", soft: "#FFF3E6" },
  admin: { color: "#350C0E", soft: "#F6EEEC" },
};

export default function Login() {
  const root = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<LoginTab>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isStudent = tab === "student";
  const isAdmin = tab === "admin";
  const accent = ACCENTS[tab];

  const handleTabChange = (next: LoginTab) => {
    setTab(next);
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  /* Page entrance */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const path = el.querySelector<SVGPathElement>("[data-lg-path]");
      gsap
        .timeline({ defaults: { ease: "expo.out" }, delay: 0.1 })
        .fromTo(q("[data-lg-photo]"), { clipPath: "inset(8% 8% 8% 8% round 40px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.6, ease: "power3.inOut" }, 0)
        .fromTo(q("[data-lg-photo] img"), { scale: 1.3 }, { scale: 1, duration: 2.2 }, 0)
        .fromTo(q("[data-lg-card]"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.2 }, 0.2)
        .fromTo(q("[data-lg-field]"), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.06 }, 0.45)
        .fromTo(q("[data-lg-word]"), { autoAlpha: 0, yPercent: 115, rotate: 4 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.12 }, 0.7)
        .fromTo(q("[data-lg-copy]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1 }, 1)
        /* The journey line draws from "current step" to "next destination" */
        .fromTo(q("[data-lg-pin]"), { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(2.4)", stagger: 0.9 }, 0.9)
        .fromTo(q("[data-lg-path]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.6, ease: "power2.inOut" }, 1.05)
        .fromTo(q("[data-lg-tag]"), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.9 }, 1.1)
        .fromTo(q("[data-lg-stamp]"), { autoAlpha: 0, scale: 1.8, rotate: -40 }, { autoAlpha: 1, scale: 1, rotate: -14, duration: 0.5, ease: "power4.in" }, 2.2)
        .add(() => travel.play(), 2.6);

      /* A small cap keeps flying the route */
      const travel = gsap
        .timeline({ paused: true, repeat: -1, repeatDelay: 1.4 })
        .set(q("[data-lg-flyer]"), { autoAlpha: 1 })
        .to(q("[data-lg-flyer]"), { duration: 3.2, ease: "power1.inOut", motionPath: { path: path!, align: path!, alignOrigin: [0.5, 0.5], autoRotate: true } })
        .to(q("[data-lg-flyer]"), { autoAlpha: 0, duration: 0.3 }, "-=0.3");

      return () => travel.kill();
    });
    return () => mm.revert();
  }, []);

  /* The sliding highlight follows the chosen tab; the form content refreshes */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ind = el.querySelector<HTMLElement>("[data-lg-ind]");
    const on = el.querySelector<HTMLElement>(".lg-tab.is-on");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (ind && on) gsap.to(ind, { x: on.offsetLeft, width: on.offsetWidth, duration: reduce ? 0 : 0.55, ease: "expo.out" });
    if (!reduce)
      gsap.fromTo(el.querySelectorAll("[data-lg-swap]"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power3.out", overwrite: true });
  }, [tab]);

  return (
    <div ref={root} className="lg" style={{ "--acc": accent.color, "--soft": accent.soft } as CSSProperties}>
      <style>{`
        .lg { position: relative; color: #350C0E; margin-top: -7rem; overflow: clip;
          background:
            radial-gradient(45% 50% at 90% 10%, rgba(47,107,255,0.09), transparent 70%),
            radial-gradient(40% 45% at 4% 15%, rgba(247,147,30,0.15), transparent 70%),
            linear-gradient(180deg, #FFEFDD 0%, #FFF6EC 50%, #FFFEFA 100%); }
        .lg .lg-wrap { max-width: var(--page-max); margin: 0 auto; padding: 8.25rem 1.5rem 3.5rem; display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.5rem; align-items: stretch; }

        /* Photo panel */
        .lg .lg-photo { position: relative; display: none; overflow: hidden; border-radius: 28px; isolation: isolate; background: #2a1a12; min-height: 34rem; }
        .lg .lg-photo img { object-fit: cover; object-position: 50% 60%; }
        .lg .lg-photo::after { content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: linear-gradient(180deg, rgba(53,12,14,0.25) 0%, rgba(53,12,14,0.1) 35%, rgba(53,12,14,0.85) 100%); }
        .lg .lg-photo-in { position: absolute; inset: 0; z-index: 2; display: flex; flex-direction: column; justify-content: space-between; padding: 2rem; color: #fff; }
        .lg .lg-brand { display: inline-flex; align-self: flex-start; align-items: center; gap: 0.55rem; padding: 0.45rem 0.9rem 0.45rem 0.5rem; border-radius: 999px;
          background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.22); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); font-size: 0.8rem; font-weight: 600; }
        .lg .lg-brand i { display: grid; place-items: center; width: 1.6rem; height: 1.6rem; border-radius: 999px; background: #F7931E; color: #fff; font-style: normal; }
        .lg .lg-route { position: relative; flex: 1; margin: 1rem 0; }
        .lg .lg-route svg { position: absolute; inset: 8% 4% 8% 0; width: 96%; height: 84%; overflow: visible; }
        .lg .lg-tag { position: absolute; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.8); }
        .lg .lg-tag-a { left: 0; bottom: 3%; }
        .lg .lg-tag-b { right: 0; top: 0; }
        .lg .lg-title { font-size: clamp(2rem, 2.8vw, 2.7rem); line-height: 1.05; letter-spacing: -0.04em; font-weight: 600; }
        .lg .lg-mask { display: block; overflow: hidden; padding: 0.04em 0.1em 0.14em 0; margin: -0.04em 0 -0.14em; }
        .lg .lg-accent { color: #FFB561; font-weight: 400; font-style: italic; letter-spacing: -0.02em; font-size: 1.1em; }
        .lg .lg-copy { margin-top: 0.9rem; max-width: 26rem; font-size: 0.92rem; line-height: 1.65; color: rgba(255,255,255,0.78); }
        .lg .lg-stamp { position: absolute; z-index: 3; right: 1.75rem; bottom: 1.75rem; display: flex; flex-direction: column; align-items: center; justify-content: center;
          width: 6.5rem; height: 6.5rem; border-radius: 999px; border: 2px dashed rgba(255,255,255,0.55); color: #fff; font-size: 0.55rem; font-weight: 800; letter-spacing: 0.16em;
          text-transform: uppercase; transform: rotate(-14deg); transition: transform .4s cubic-bezier(.22,1,.36,1); }
        .lg .lg-stamp:hover { transform: rotate(-6deg) scale(1.05); }

        /* Form card */
        .lg .lg-card { position: relative; align-self: center; width: 100%; max-width: 30rem; margin: 0 auto; border-radius: 28px; background: #fff; border: 1px solid rgba(53,12,14,0.08); }
        .lg .lg-tabs { position: relative; display: flex; margin: 0.6rem; padding: 0.3rem; border-radius: 999px; background: #F8F3EE; }
        .lg .lg-ind { position: absolute; left: 0; top: 0.3rem; bottom: 0.3rem; width: 0; border-radius: 999px; background: #fff; border: 1px solid rgba(53,12,14,0.08); }
        .lg .lg-tab { position: relative; z-index: 1; display: inline-flex; flex: 1; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.7rem 0.6rem; border-radius: 999px;
          font-size: 0.85rem; font-weight: 600; color: rgba(53,12,14,0.5); cursor: pointer; transition: color .3s ease; white-space: nowrap; }
        .lg .lg-tab:hover { color: #350C0E; }
        .lg .lg-tab.is-on { color: var(--acc); }
        .lg .lg-tab:focus-visible { outline: 2px solid #F7931E; outline-offset: 2px; }
        .lg .lg-body { padding: 1.6rem 1.6rem 1.75rem; }
        .lg .lg-back { display: inline-flex; align-items: center; gap: 0.4rem; margin-bottom: 1rem; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(53,12,14,0.5); cursor: pointer; transition: color .25s ease; }
        .lg .lg-back:hover { color: #350C0E; }
        .lg .lg-badge { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.3rem 0.75rem; border-radius: 999px; background: var(--soft); color: var(--acc);
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; transition: background .4s ease, color .4s ease; }
        .lg .lg-badge i { width: 0.4rem; height: 0.4rem; border-radius: 999px; background: currentColor; }
        .lg .lg-h2 { margin-top: 0.9rem; font-size: 2rem; line-height: 1.05; letter-spacing: -0.04em; font-weight: 600; }
        .lg .lg-h2 em { color: #F7931E; font-weight: 400; font-size: 1.1em; }
        .lg .lg-sub { margin-top: 0.4rem; font-size: 0.92rem; color: rgba(53,12,14,0.6); }
        .lg .lg-form { margin-top: 1.5rem; display: grid; gap: 1rem; }
        .lg .lg-label { display: block; margin-bottom: 0.4rem; font-size: 0.75rem; font-weight: 600; color: rgba(53,12,14,0.65); }
        .lg .lg-input { display: flex; align-items: center; border-radius: 14px; border: 1px solid rgba(53,12,14,0.12); background: #FFFBF6;
          transition: border-color .25s ease, background .25s ease, box-shadow .25s ease; }
        .lg .lg-input:hover { border-color: rgba(53,12,14,0.22); }
        .lg .lg-input:focus-within { border-color: var(--acc); background: #fff; box-shadow: 0 0 0 4px color-mix(in srgb, var(--acc) 14%, transparent); }
        .lg .lg-input > span { padding-left: 1rem; color: rgba(53,12,14,0.35); display: flex; }
        .lg .lg-input input { width: 100%; height: 3rem; background: transparent; padding: 0 0.85rem; font-size: 0.92rem; color: #350C0E; outline: none; }
        .lg .lg-input input::placeholder { color: rgba(53,12,14,0.35); }
        .lg .lg-input input:-webkit-autofill { -webkit-box-shadow: 0 0 0 1000px #ffffff inset; }
        .lg .lg-eye { display: flex; padding: 0 1rem; color: rgba(53,12,14,0.4); cursor: pointer; transition: color .25s ease; }
        .lg .lg-eye:hover { color: #350C0E; }
        .lg .lg-forgot { justify-self: end; margin-top: -0.25rem; font-size: 0.8rem; font-weight: 600; color: rgba(53,12,14,0.55); transition: color .25s ease; }
        .lg .lg-forgot:hover { color: var(--acc); }
        .lg .lg-submit { margin-top: 0.25rem; display: flex; width: 100%; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.45rem 0.45rem 0.45rem 1.5rem;
          border-radius: 999px; background: #350C0E; color: #fff; font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: background .35s ease, transform .35s cubic-bezier(.22,1,.36,1); }
        .lg .lg-submit:hover { background: var(--acc); transform: translateY(-1px); }
        .lg .lg-submit:active { transform: scale(0.99); }
        .lg .lg-submit:focus-visible { outline: 2px solid #F7931E; outline-offset: 3px; }
        .lg .lg-submit-arrow { display: grid; place-items: center; width: 2.6rem; height: 2.6rem; border-radius: 999px; background: rgba(255,255,255,0.16); transition: transform .35s cubic-bezier(.22,1,.36,1); }
        .lg .lg-submit:hover .lg-submit-arrow { transform: rotate(-45deg); }
        .lg .lg-reg { margin-top: 1.4rem; text-align: center; font-size: 0.9rem; color: rgba(53,12,14,0.6); }
        .lg .lg-reg a { font-weight: 700; color: var(--acc); text-decoration: underline; text-decoration-color: transparent; text-underline-offset: 4px; transition: text-decoration-color .25s ease; }
        .lg .lg-reg a:hover { text-decoration-color: currentColor; }
        .lg .lg-admin { margin: 0.85rem auto 0; display: flex; align-items: center; gap: 0.4rem; font-size: 0.78rem; font-weight: 600; color: rgba(53,12,14,0.4); cursor: pointer; transition: color .25s ease; }
        .lg .lg-admin:hover { color: #350C0E; }
        .lg .lg-foot { margin-top: 1rem; text-align: center; font-size: 0.72rem; color: rgba(53,12,14,0.45); }

        @media (prefers-reduced-motion: no-preference) {
          .lg [data-lg-card], .lg [data-lg-field], .lg [data-lg-word], .lg [data-lg-copy], .lg [data-lg-pin], .lg [data-lg-tag], .lg [data-lg-stamp], .lg [data-lg-flyer] { visibility: hidden; }
        }

        @media (min-width: 640px) {
          .lg .lg-wrap { padding: 9rem 2rem 4rem; }
          .lg .lg-body { padding: 1.9rem 2.25rem 2rem; }
        }
        @media (min-width: 1024px) {
          .lg .lg-wrap { grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr); gap: 2rem; padding: 9rem var(--page-gutter) 4.5rem; min-height: 100svh; }
          .lg .lg-photo { display: block; }
          .lg .lg-card { max-width: 31rem; }
        }
        @media (min-width: 1024px) and (max-height: 760px) {
          .lg .lg-wrap { padding-top: 8rem; padding-bottom: 2.5rem; }
          .lg .lg-photo { min-height: 30rem; }
          .lg .lg-body { padding: 1.4rem 2rem 1.5rem; }
          .lg .lg-form { margin-top: 1.1rem; gap: 0.8rem; }
          .lg .lg-h2 { font-size: 1.75rem; }
        }
      `}</style>

      <div className="lg-wrap">
        {/* Left: photo with the journey */}
        <div data-lg-photo className="lg-photo" aria-hidden>
          <Image src={BG_IMAGE} alt="" fill priority sizes="50vw" />
          <div className="lg-photo-in">
            <span className="lg-brand">
              <i>
                <FaGraduationCap size={12} />
              </i>
              Admission OnBoard
            </span>

            <div className="lg-route">
              <svg viewBox="0 0 400 200" fill="none" preserveAspectRatio="none">
                <path d="M20 170 C 120 40, 260 210, 380 30" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeDasharray="5 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <path data-lg-path d="M20 170 C 120 40, 260 210, 380 30" stroke="#FFB561" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <g data-lg-pin>
                  <circle cx="20" cy="170" r="10" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
                  <circle cx="20" cy="170" r="5.5" fill="#fff" />
                </g>
                <g data-lg-pin>
                  <circle cx="380" cy="30" r="10" stroke="#F7931E" strokeWidth="1.5" opacity="0.7" />
                  <circle cx="380" cy="30" r="5.5" fill="#F7931E" />
                </g>
                <g data-lg-flyer>
                  <circle r="9" fill="#fff" />
                  <path d="M-5 -1.5 L0 -4 L5 -1.5 L0 1 Z M-3 0 v2.4 c0 1 6 1 6 0 V0" fill="#350C0E" />
                </g>
              </svg>
              <span data-lg-tag className="lg-tag lg-tag-a">
                Current step
              </span>
              <span data-lg-tag className="lg-tag lg-tag-b">
                Next destination
              </span>
            </div>

            <div>
              <h1 className="lg-title">
                <span className="lg-mask">
                  <span data-lg-word className="inline-block origin-bottom-left">
                    Every admission starts
                  </span>
                </span>
                <span className="lg-mask">
                  <span data-lg-word className={`${accentSerif.className} lg-accent inline-block origin-bottom-left`}>
                    with a single step.
                  </span>
                </span>
              </h1>
              <p data-lg-copy className="lg-copy">
                Students plot their next admission. Recruitment partners guide the way. One login, one journey, tracked start to
                finish.
              </p>
            </div>
          </div>
          <span data-lg-stamp className="lg-stamp">
            Verified
            <FaGraduationCap size={18} style={{ margin: "0.3rem 0" }} />
            Access
          </span>
        </div>

        {/* Right: the form */}
        <div className="flex flex-col justify-center">
          <div data-lg-card className="lg-card">
            {!isAdmin && (
              <div className="lg-tabs" role="tablist" aria-label="Account type">
                <span data-lg-ind className="lg-ind" aria-hidden />
                <button type="button" role="tab" aria-selected={isStudent} className={`lg-tab${isStudent ? " is-on" : ""}`} onClick={() => handleTabChange("student")}>
                  <FaUserGraduate />
                  Student
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === "partner"}
                  className={`lg-tab${tab === "partner" ? " is-on" : ""}`}
                  onClick={() => handleTabChange("partner")}
                >
                  <FaHandshake />
                  Recruitment Partner
                </button>
              </div>
            )}

            <div className="lg-body">
              {isAdmin && (
                <button type="button" onClick={() => handleTabChange("student")} className="lg-back">
                  <FaArrowLeft size={11} />
                  Back
                </button>
              )}

              <div data-lg-field>
                <p data-lg-swap className="lg-badge">
                  <i aria-hidden />
                  {isStudent ? "Student login" : isAdmin ? "Admin login" : "Recruitment partner login"}
                </p>
                <h2 data-lg-swap className="lg-h2">
                  Welcome <em className={accentSerif.className}>back</em>
                </h2>
                <p data-lg-swap className="lg-sub">
                  {isStudent
                    ? "Sign in to continue tracking your admission."
                    : isAdmin
                      ? "Sign in to manage the Admission OnBoard platform."
                      : "Sign in to manage your student pipeline."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="lg-form">
                <div data-lg-field>
                  <label htmlFor="lg-email" className="lg-label">
                    Email
                  </label>
                  <div className="lg-input">
                    <span aria-hidden>
                      <FaEnvelope size={14} />
                    </span>
                    <input id="lg-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                  </div>
                </div>

                <div data-lg-field>
                  <label htmlFor="lg-password" className="lg-label">
                    Password
                  </label>
                  <div className="lg-input">
                    <span aria-hidden>
                      <FaLock size={14} />
                    </span>
                    <input
                      id="lg-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="lg-eye"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      tabIndex={-1}
                    >
                      {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                    </button>
                  </div>
                </div>

                <a data-lg-field href={`/auth/forgot-password?tab=${tab}`} className="lg-forgot">
                  Forgot Password?
                </a>

                <div data-lg-field>
                  <button type="submit" className="lg-submit">
                    <span data-lg-swap>
                      {isStudent ? "Login as Student" : isAdmin ? "Login as Admin" : "Login as Partner"}
                    </span>
                    <span className="lg-submit-arrow" aria-hidden>
                      <HiArrowRight />
                    </span>
                  </button>
                </div>
              </form>

              {!isAdmin && (
                <p data-lg-field className="lg-reg">
                  Don&apos;t have an account? <a href={`/auth/register/?tab=${tab}`}>Register here</a>
                </p>
              )}

              {!isAdmin && (
                <button data-lg-field type="button" onClick={() => handleTabChange("admin")} className="lg-admin">
                  <FaShieldAlt size={11} />
                  Admin sign in
                </button>
              )}
            </div>
          </div>

          <p className="lg-foot">Admission OnBoard · Secure student &amp; partner access</p>
        </div>
      </div>
    </div>
  );
}
