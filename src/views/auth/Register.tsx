"use client";

import React, { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserGraduate,
  FaHandshake,
  FaGraduationCap,
  FaUser,
  FaPhoneAlt,
  FaCalendarAlt,
  FaBuilding,
  FaUserTie,
  FaGlobeAmericas,
  FaChevronDown,
  FaCheck,
  FaShieldAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { accentSerif } from "@/lib/fonts";

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin);

// Place your background image at: /public/register.avif
const BG_IMAGE = "/register.avif";

const COUNTRIES = ["Bangladesh", "India", "Pakistan", "Nepal", "Sri Lanka", "Ghana", "Kenya", "Nigeria", "United Kingdom"];

const HEAR_ABOUT_OPTIONS = [
  "Social media",
  "Google search",
  "Friend or family",
  "Education fair / event",
  "Recruitment partner",
  "School counselor",
  "Other",
];

type RegisterTab = "student" | "partner";
type RegisterStep = "form" | "otp";

const ACCENTS: Record<RegisterTab, { color: string; soft: string }> = {
  student: { color: "#2F6BFF", soft: "#EEF2FF" },
  partner: { color: "#F7931E", soft: "#FFF3E6" },
};

export default function Register() {
  const root = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<RegisterTab>("student");
  const isStudent = tab === "student";

  const [step, setStep] = useState<RegisterStep>("form");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [email, setEmail] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [otp, setOtp] = useState("");

  const accent = ACCENTS[tab];
  const destinationEmail = isStudent ? email : businessEmail;

  const handleTabChange = (next: RegisterTab) => {
    setTab(next);
    setAgreed(false);
    setStep("form");
    setOtp("");
  };

  /* Links such as "Partner with us" open /auth/register?tab=partner */
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("tab") === "partner") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reads the URL once on arrival
      setTab("partner");
    }
  }, []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep("otp");
  };

  const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // UI only — wire this up to your real verification flow.
  };

  /* Page entrance */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const path = el.querySelector<SVGPathElement>("[data-rg-path]");
      gsap
        .timeline({ defaults: { ease: "expo.out" }, delay: 0.1 })
        .fromTo(q("[data-rg-photo]"), { clipPath: "inset(8% 8% 8% 8% round 40px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.6, ease: "power3.inOut" }, 0)
        .fromTo(q("[data-rg-photo] img"), { scale: 1.3 }, { scale: 1, duration: 2.2 }, 0)
        .fromTo(q("[data-rg-card]"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.2 }, 0.2)
        .fromTo(q("[data-rg-pin]"), { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(2.4)", stagger: 0.9 }, 0.9)
        .fromTo(q("[data-rg-path]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.6, ease: "power2.inOut" }, 1.05)
        .fromTo(q("[data-rg-stamp]"), { autoAlpha: 0, scale: 1.8, rotate: -40 }, { autoAlpha: 1, scale: 1, rotate: -14, duration: 0.5, ease: "power4.in" }, 2.2)
        .add(() => travel.play(), 2.6);

      const travel = gsap
        .timeline({ paused: true, repeat: -1, repeatDelay: 1.4 })
        .set(q("[data-rg-flyer]"), { autoAlpha: 1 })
        .to(q("[data-rg-flyer]"), { duration: 3.2, ease: "power1.inOut", motionPath: { path: path!, align: path!, alignOrigin: [0.5, 0.5], autoRotate: true } })
        .to(q("[data-rg-flyer]"), { autoAlpha: 0, duration: 0.3 }, "-=0.3");

      return () => travel.kill();
    });
    return () => mm.revert();
  }, []);

  /* Tab highlight slides; the text and fields refresh whenever the tab or step changes */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ind = el.querySelector<HTMLElement>("[data-rg-ind]");
    const on = el.querySelector<HTMLElement>(".rg-tab.is-on");
    if (ind && on) gsap.to(ind, { x: on.offsetLeft, width: on.offsetWidth, duration: reduce ? 0 : 0.55, ease: "expo.out" });
    if (reduce) return;
    gsap.fromTo(el.querySelectorAll("[data-rg-swap]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.035, ease: "power3.out", overwrite: true });
    gsap.fromTo(el.querySelectorAll("[data-rg-text] > *"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "expo.out", overwrite: true });
  }, [tab, step]);

  const isOtp = step === "otp";

  return (
    <div ref={root} className="rg" style={{ "--acc": accent.color, "--soft": accent.soft } as CSSProperties}>
      <style>{`
        .rg { position: relative; color: #350C0E; margin-top: -7rem;
          background:
            radial-gradient(45% 30% at 90% 6%, rgba(47,107,255,0.09), transparent 70%),
            radial-gradient(40% 30% at 4% 8%, rgba(247,147,30,0.15), transparent 70%),
            linear-gradient(180deg, #FFEFDD 0%, #FFF6EC 40%, #FFFEFA 100%); }
        .rg .rg-wrap { max-width: var(--page-max); margin: 0 auto; padding: 8.25rem 1.5rem 3.5rem; display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.5rem; align-items: start; }

        /* Photo panel */
        .rg .rg-photo { position: relative; display: none; overflow: hidden; border-radius: 28px; isolation: isolate; background: #2a1a12; }
        .rg .rg-photo img { object-fit: cover; object-position: 50% 60%; }
        .rg .rg-photo::after { content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: linear-gradient(180deg, rgba(53,12,14,0.25) 0%, rgba(53,12,14,0.1) 35%, rgba(53,12,14,0.85) 100%); }
        .rg .rg-photo-in { position: absolute; inset: 0; z-index: 2; display: flex; flex-direction: column; justify-content: space-between; padding: 2rem; color: #fff; }
        .rg .rg-brand { display: inline-flex; align-self: flex-start; align-items: center; gap: 0.55rem; padding: 0.45rem 0.9rem 0.45rem 0.5rem; border-radius: 999px;
          background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.22); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); font-size: 0.8rem; font-weight: 600; }
        .rg .rg-brand i { display: grid; place-items: center; width: 1.6rem; height: 1.6rem; border-radius: 999px; background: #F7931E; color: #fff; font-style: normal; }
        .rg .rg-route { position: relative; flex: 1; margin: 1rem 0; }
        .rg .rg-route svg { position: absolute; inset: 8% 4% 8% 0; width: 96%; height: 84%; overflow: visible; }
        .rg .rg-tag { position: absolute; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.8); }
        .rg .rg-tag-a { left: 0; bottom: 3%; }
        .rg .rg-tag-b { right: 0; top: 0; }
        .rg .rg-title { font-size: clamp(2rem, 2.8vw, 2.7rem); line-height: 1.05; letter-spacing: -0.04em; font-weight: 600; }
        .rg .rg-title em { display: block; color: #FFB561; font-weight: 400; letter-spacing: -0.02em; font-size: 1.1em; }
        .rg .rg-copy { margin-top: 0.9rem; max-width: 26rem; font-size: 0.92rem; line-height: 1.65; color: rgba(255,255,255,0.78); }
        .rg .rg-stamp { position: absolute; z-index: 3; right: 1.75rem; bottom: 1.75rem; display: flex; flex-direction: column; align-items: center; justify-content: center;
          width: 6.5rem; height: 6.5rem; border-radius: 999px; border: 2px dashed rgba(255,255,255,0.55); color: #fff; font-size: 0.55rem; font-weight: 800; letter-spacing: 0.16em;
          text-transform: uppercase; transform: rotate(-14deg); transition: transform .4s cubic-bezier(.22,1,.36,1); }
        .rg .rg-stamp:hover { transform: rotate(-6deg) scale(1.05); }

        /* Card */
        .rg .rg-card { position: relative; width: 100%; max-width: 32rem; margin: 0 auto; border-radius: 28px; background: #fff; border: 1px solid rgba(53,12,14,0.08); }
        .rg .rg-tabs { position: relative; display: flex; margin: 0.6rem; padding: 0.3rem; border-radius: 999px; background: #F8F3EE; }
        .rg .rg-ind { position: absolute; left: 0; top: 0.3rem; bottom: 0.3rem; width: 0; border-radius: 999px; background: #fff; border: 1px solid rgba(53,12,14,0.08); }
        .rg .rg-tab { position: relative; z-index: 1; display: inline-flex; flex: 1; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.7rem 0.6rem; border-radius: 999px;
          font-size: 0.85rem; font-weight: 600; color: rgba(53,12,14,0.5); cursor: pointer; transition: color .3s ease; white-space: nowrap; }
        .rg .rg-tab:hover { color: #350C0E; }
        .rg .rg-tab.is-on { color: var(--acc); }
        .rg .rg-tab:focus-visible { outline: 2px solid #F7931E; outline-offset: 2px; }
        .rg .rg-body { padding: 1.5rem 1.4rem 1.6rem; }
        .rg .rg-badge { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.3rem 0.75rem; border-radius: 999px; background: var(--soft); color: var(--acc);
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; transition: background .4s ease, color .4s ease; }
        .rg .rg-badge i { width: 0.4rem; height: 0.4rem; border-radius: 999px; background: currentColor; }
        .rg .rg-h2 { margin-top: 0.9rem; font-size: 1.75rem; line-height: 1.1; letter-spacing: -0.035em; font-weight: 600; }
        .rg .rg-h2 em { color: #F7931E; font-weight: 400; font-size: 1.1em; }
        .rg .rg-form { margin-top: 1.4rem; display: grid; gap: 0.95rem; }
        .rg .rg-two { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0.95rem; }
        .rg .rg-label { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.75rem; font-weight: 600; color: rgba(53,12,14,0.65); }
        .rg .rg-label small { font-size: 0.7rem; font-weight: 500; color: rgba(53,12,14,0.4); }
        .rg .rg-input { position: relative; display: flex; align-items: center; border-radius: 14px; border: 1px solid rgba(53,12,14,0.12); background: #FFFBF6;
          transition: border-color .25s ease, background .25s ease, box-shadow .25s ease; }
        .rg .rg-input:hover { border-color: rgba(53,12,14,0.22); }
        .rg .rg-input:focus-within { border-color: var(--acc); background: #fff; box-shadow: 0 0 0 4px color-mix(in srgb, var(--acc) 14%, transparent); }
        .rg .rg-input > .rg-ico { display: flex; padding-left: 1rem; color: rgba(53,12,14,0.35); }
        .rg .rg-input input, .rg .rg-input select { width: 100%; min-width: 0; height: 2.9rem; background: transparent; padding: 0 0.85rem; font-size: 0.9rem; color: #350C0E; outline: none;
          -webkit-appearance: none; appearance: none; }
        .rg .rg-input select { cursor: pointer; padding-right: 2.2rem; }
        .rg .rg-input select[data-empty="true"] { color: rgba(53,12,14,0.4); }
        .rg .rg-input input::placeholder { color: rgba(53,12,14,0.35); }
        .rg .rg-input input:-webkit-autofill { -webkit-box-shadow: 0 0 0 1000px #ffffff inset; }
        .rg .rg-chev { position: absolute; right: 1rem; color: rgba(53,12,14,0.35); pointer-events: none; }
        .rg .rg-eye { display: flex; padding: 0 0.9rem; color: rgba(53,12,14,0.4); cursor: pointer; transition: color .25s ease; }
        .rg .rg-eye:hover { color: #350C0E; }
        .rg .rg-hint { margin-top: 0.35rem; font-size: 0.72rem; color: rgba(53,12,14,0.45); }
        .rg .rg-terms { display: flex; align-items: flex-start; gap: 0.65rem; padding: 0.85rem 0.95rem; border-radius: 14px; background: #FFF8F0; font-size: 0.82rem; line-height: 1.5;
          color: rgba(53,12,14,0.7); cursor: pointer; }
        .rg .rg-check { position: relative; display: grid; place-items: center; width: 1.15rem; height: 1.15rem; flex: none; margin-top: 0.1rem; border-radius: 5px;
          border: 1.5px solid rgba(53,12,14,0.25); background: #fff; color: #fff; transition: background .25s ease, border-color .25s ease; }
        .rg .rg-check input { position: absolute; inset: -4px; opacity: 0; cursor: pointer; margin: 0; }
        .rg .rg-check:has(input:checked) { background: var(--acc); border-color: var(--acc); }
        .rg .rg-check:has(input:focus-visible) { outline: 2px solid #F7931E; outline-offset: 2px; }
        .rg .rg-terms a { font-weight: 700; color: var(--acc); text-decoration: underline; text-decoration-style: dotted; text-underline-offset: 3px; }
        .rg .rg-submit { margin-top: 0.2rem; display: flex; width: 100%; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.45rem 0.45rem 0.45rem 1.5rem;
          border-radius: 999px; background: #350C0E; color: #fff; font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: background .35s ease, transform .35s cubic-bezier(.22,1,.36,1), opacity .3s ease; }
        .rg .rg-submit:hover:not(:disabled) { background: var(--acc); transform: translateY(-1px); }
        .rg .rg-submit:disabled { opacity: 0.4; cursor: not-allowed; }
        .rg .rg-submit:focus-visible { outline: 2px solid #F7931E; outline-offset: 3px; }
        .rg .rg-submit-arrow { display: grid; place-items: center; width: 2.6rem; height: 2.6rem; border-radius: 999px; background: rgba(255,255,255,0.16); transition: transform .35s cubic-bezier(.22,1,.36,1); }
        .rg .rg-submit:hover:not(:disabled) .rg-submit-arrow { transform: rotate(-45deg); }
        .rg .rg-alt { margin-top: 1.3rem; text-align: center; font-size: 0.9rem; color: rgba(53,12,14,0.6); }
        .rg .rg-alt a, .rg .rg-link { font-weight: 700; color: var(--acc); cursor: pointer; text-decoration: underline; text-decoration-color: transparent; text-underline-offset: 4px; transition: text-decoration-color .25s ease; }
        .rg .rg-alt a:hover, .rg .rg-link:hover { text-decoration-color: currentColor; }
        .rg .rg-foot { margin-top: 1rem; text-align: center; font-size: 0.72rem; color: rgba(53,12,14,0.45); }

        /* Verification step */
        .rg .rg-back { display: inline-flex; align-items: center; gap: 0.4rem; margin-bottom: 1.1rem; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(53,12,14,0.5); cursor: pointer; transition: color .25s ease; }
        .rg .rg-back:hover { color: #350C0E; }
        .rg .rg-shield { position: relative; display: grid; place-items: center; width: 3.75rem; height: 3.75rem; margin: 0 auto; border-radius: 18px; background: var(--soft); color: var(--acc); }
        .rg .rg-shield::after { content: ""; position: absolute; inset: -6px; border-radius: 22px; border: 2px solid var(--acc); opacity: 0; animation: rg-ping 2.4s cubic-bezier(.22,1,.36,1) infinite; }
        @keyframes rg-ping { 0% { transform: scale(0.9); opacity: 0.7; } 100% { transform: scale(1.35); opacity: 0; } }
        .rg .rg-otp-title { margin-top: 1.1rem; text-align: center; font-size: 1.6rem; line-height: 1.15; letter-spacing: -0.03em; font-weight: 600; }
        .rg .rg-otp-sub { margin-top: 0.5rem; text-align: center; font-size: 0.9rem; line-height: 1.6; color: rgba(53,12,14,0.6); }
        .rg .rg-otp-sub b { display: block; color: #350C0E; word-break: break-all; }
        .rg .rg-code { width: 100%; height: 4rem; border-radius: 16px; border: 1px solid rgba(53,12,14,0.12); background: #FFFBF6; text-align: center; font-size: 1.6rem; font-weight: 700;
          letter-spacing: 0.5em; padding-left: 0.5em; color: #350C0E; outline: none; transition: border-color .25s ease, background .25s ease, box-shadow .25s ease; }
        .rg .rg-code::placeholder { letter-spacing: 0.3em; font-size: 1.1rem; font-weight: 500; color: rgba(53,12,14,0.25); }
        .rg .rg-code:focus { border-color: var(--acc); background: #fff; box-shadow: 0 0 0 4px color-mix(in srgb, var(--acc) 14%, transparent); }
        .rg .rg-resend { display: flex; justify-content: center; gap: 0.35rem; font-size: 0.82rem; color: rgba(53,12,14,0.6); }

        @media (prefers-reduced-motion: no-preference) {
          .rg [data-rg-card], .rg [data-rg-pin], .rg [data-rg-stamp], .rg [data-rg-flyer] { visibility: hidden; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rg .rg-shield::after { animation: none; }
        }

        @media (min-width: 480px) {
          .rg .rg-two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (min-width: 640px) {
          .rg .rg-wrap { padding: 9rem 2rem 4rem; }
          .rg .rg-body { padding: 1.8rem 2.25rem 2rem; }
        }
        @media (min-width: 1024px) {
          .rg .rg-wrap { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 2rem; padding: 9rem var(--page-gutter) 4.5rem; }
          /* The photo stays in view while the longer form scrolls */
          .rg .rg-photo { display: block; position: sticky; top: 7rem; height: calc(100svh - 9rem); min-height: 30rem; max-height: 46rem; }
          .rg .rg-card { max-width: 33rem; }
        }
        @media (min-width: 1024px) and (max-height: 760px) {
          .rg .rg-wrap { padding-top: 8rem; }
          .rg .rg-photo { top: 6.5rem; height: calc(100svh - 8rem); min-height: 24rem; }
        }
      `}</style>

      <div className="rg-wrap">
        {/* Left: photo with the journey */}
        <div data-rg-photo className="rg-photo" aria-hidden>
          <Image src={BG_IMAGE} alt="" fill priority sizes="50vw" />
          <div className="rg-photo-in">
            <span className="rg-brand">
              <i>
                <FaGraduationCap size={12} />
              </i>
              Admission OnBoard
            </span>

            <div className="rg-route">
              <svg viewBox="0 0 400 200" fill="none" preserveAspectRatio="none">
                <path d="M20 170 C 120 40, 260 210, 380 30" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeDasharray="5 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <path data-rg-path d="M20 170 C 120 40, 260 210, 380 30" stroke="#FFB561" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <g data-rg-pin>
                  <circle cx="20" cy="170" r="10" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
                  <circle cx="20" cy="170" r="5.5" fill="#fff" />
                </g>
                <g data-rg-pin>
                  <circle cx="380" cy="30" r="10" stroke="#F7931E" strokeWidth="1.5" opacity="0.7" />
                  <circle cx="380" cy="30" r="5.5" fill="#F7931E" />
                </g>
                <g data-rg-flyer>
                  <circle r="9" fill="#fff" />
                  <path d="M-5 -1.5 L0 -4 L5 -1.5 L0 1 Z M-3 0 v2.4 c0 1 6 1 6 0 V0" fill="#350C0E" />
                </g>
              </svg>
              <span className="rg-tag rg-tag-a">{isOtp ? "Almost there" : "Create account"}</span>
              <span className="rg-tag rg-tag-b">{isOtp ? "Verified access" : "Next destination"}</span>
            </div>

            <div data-rg-text>
              <h1 className="rg-title">
                {isOtp ? (
                  <>
                    One code away <em className={accentSerif.className}>from boarding.</em>
                  </>
                ) : (
                  <>
                    Every transfer starts <em className={accentSerif.className}>with a single step.</em>
                  </>
                )}
              </h1>
              <p className="rg-copy">
                {isOtp
                  ? "Check your inbox for the code we just sent — it confirms this account really belongs to you."
                  : isStudent
                    ? "Set up your student profile in minutes and start tracking your admission journey."
                    : "Join our partner network and start guiding students to their next admission."}
              </p>
            </div>
          </div>
          <span data-rg-stamp className="rg-stamp">
            {isOtp ? "Verify" : "New"}
            <FaGraduationCap size={18} style={{ margin: "0.3rem 0" }} />
            {isOtp ? "Code" : "Member"}
          </span>
        </div>

        {/* Right: the form */}
        <div>
          <div data-rg-card className="rg-card">
            {!isOtp && (
              <div className="rg-tabs" role="tablist" aria-label="Account type">
                <span data-rg-ind className="rg-ind" aria-hidden />
                <button type="button" role="tab" aria-selected={isStudent} className={`rg-tab${isStudent ? " is-on" : ""}`} onClick={() => handleTabChange("student")}>
                  <FaUserGraduate />
                  Student
                </button>
                <button type="button" role="tab" aria-selected={!isStudent} className={`rg-tab${!isStudent ? " is-on" : ""}`} onClick={() => handleTabChange("partner")}>
                  <FaHandshake />
                  Recruitment Partner
                </button>
              </div>
            )}

            <div className="rg-body">
              {!isOtp ? (
                <>
                  <p data-rg-swap className="rg-badge">
                    <i aria-hidden />
                    {isStudent ? "Student registration" : "Recruitment partner registration"}
                  </p>
                  <h2 data-rg-swap className="rg-h2">
                    {isStudent ? (
                      <>
                        Start your <em className={accentSerif.className}>educational journey</em>
                      </>
                    ) : (
                      <>
                        Join our <em className={accentSerif.className}>partner network</em>
                      </>
                    )}
                  </h2>

                  {isStudent ? (
                    <StudentForm
                      onSubmit={handleFormSubmit}
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                      showConfirm={showConfirm}
                      setShowConfirm={setShowConfirm}
                      agreed={agreed}
                      setAgreed={setAgreed}
                      email={email}
                      setEmail={setEmail}
                    />
                  ) : (
                    <PartnerForm
                      onSubmit={handleFormSubmit}
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                      showConfirm={showConfirm}
                      setShowConfirm={setShowConfirm}
                      agreed={agreed}
                      setAgreed={setAgreed}
                      businessEmail={businessEmail}
                      setBusinessEmail={setBusinessEmail}
                    />
                  )}

                  <p data-rg-swap className="rg-alt">
                    Already have an account? <a href="/auth/login">Login here</a>
                  </p>
                </>
              ) : (
                <OtpStep isStudent={isStudent} email={destinationEmail} otp={otp} setOtp={setOtp} onSubmit={handleOtpSubmit} onBack={() => setStep("form")} />
              )}
            </div>
          </div>

          <p className="rg-foot">Admission OnBoard · Secure student &amp; partner access</p>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Fields ───────────────────────── */

function FieldLabel({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="rg-label">
      <span>{children}</span>
      {optional && <small>Optional</small>}
    </label>
  );
}

interface IconFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactNode;
  hint?: string;
  optional?: boolean;
}

function IconField({ label, icon, hint, optional, ...props }: IconFieldProps) {
  const id = useId();
  return (
    <div data-rg-swap>
      <FieldLabel htmlFor={id} optional={optional}>
        {label}
      </FieldLabel>
      <div className="rg-input">
        <span className="rg-ico" aria-hidden>
          {icon}
        </span>
        <input id={id} {...props} />
      </div>
      {hint && <p className="rg-hint">{hint}</p>}
    </div>
  );
}

function SelectField({ label, icon, options, placeholder, optional }: { label: string; icon: React.ReactNode; options: string[]; placeholder: string; optional?: boolean }) {
  const id = useId();
  return (
    <div data-rg-swap>
      <FieldLabel htmlFor={id} optional={optional}>
        {label}
      </FieldLabel>
      <div className="rg-input">
        <span className="rg-ico" aria-hidden>
          {icon}
        </span>
        <select id={id} defaultValue="" data-empty="true" onChange={(e) => (e.currentTarget.dataset.empty = String(e.currentTarget.value === ""))}>
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <FaChevronDown className="rg-chev" size={11} aria-hidden />
      </div>
    </div>
  );
}

function PasswordField({
  label,
  show,
  setShow,
  autoComplete = "new-password",
  placeholder = "••••••••",
}: {
  label: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  autoComplete?: string;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <div data-rg-swap>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="rg-input">
        <span className="rg-ico" aria-hidden>
          <FaLock size={14} />
        </span>
        <input id={id} type={show ? "text" : "password"} placeholder={placeholder} autoComplete={autoComplete} required />
        <button type="button" onClick={() => setShow((s) => !s)} className="rg-eye" aria-label={show ? "Hide password" : "Show password"} tabIndex={-1}>
          {show ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
        </button>
      </div>
    </div>
  );
}

function TermsCheckbox({ agreed, setAgreed }: { agreed: boolean; setAgreed: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <label data-rg-swap className="rg-terms">
      <span className="rg-check">
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
        {agreed && <FaCheck size={9} aria-hidden />}
      </span>
      <span>
        I agree to the <a href="/terms">Terms &amp; Conditions</a> and <a href="/privacy">Privacy Policy</a>
      </span>
    </label>
  );
}

function SubmitButton({ disabled, children }: { disabled?: boolean; children: React.ReactNode }) {
  return (
    <div data-rg-swap>
      <button type="submit" disabled={disabled} className="rg-submit">
        {children}
        <span className="rg-submit-arrow" aria-hidden>
          <HiArrowRight />
        </span>
      </button>
    </div>
  );
}

/* ───────────────────────── Forms ───────────────────────── */

interface StudentFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirm: boolean;
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  agreed: boolean;
  setAgreed: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

function StudentForm({ onSubmit, showPassword, setShowPassword, showConfirm, setShowConfirm, agreed, setAgreed, email, setEmail }: StudentFormProps) {
  return (
    <form onSubmit={onSubmit} className="rg-form">
      <div className="rg-two">
        <IconField label="Given Name" icon={<FaUser size={13} />} required type="text" autoComplete="given-name" placeholder="Jamila" />
        <IconField label="Surname" icon={<FaUser size={13} />} required type="text" autoComplete="family-name" placeholder="Rahman" />
      </div>

      <IconField
        label="Email"
        icon={<FaEnvelope size={13} />}
        required
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />

      <IconField
        label="Phone Number"
        icon={<FaPhoneAlt size={13} />}
        required
        type="tel"
        autoComplete="tel"
        placeholder="+1 555 123 4567"
        hint="If you used an invite link, this may already be filled in."
      />

      <SelectField label="Nationality" icon={<FaGlobeAmericas size={13} />} options={COUNTRIES} placeholder="Select your nationality" />

      <div className="rg-two">
        <PasswordField label="Password" show={showPassword} setShow={setShowPassword} />
        <PasswordField label="Confirm Password" show={showConfirm} setShow={setShowConfirm} />
      </div>

      <IconField label="Enrolment Time" icon={<FaCalendarAlt size={13} />} type="text" placeholder="e.g. Fall 2026 Intake" hint="For example: Intake, Enrolment year" />

      <SelectField label="How did you hear about us?" optional icon={<FaGlobeAmericas size={13} />} options={HEAR_ABOUT_OPTIONS} placeholder="Select one" />

      <TermsCheckbox agreed={agreed} setAgreed={setAgreed} />

      <SubmitButton disabled={!agreed}>Send verification code</SubmitButton>
    </form>
  );
}

interface PartnerFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirm: boolean;
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  agreed: boolean;
  setAgreed: React.Dispatch<React.SetStateAction<boolean>>;
  businessEmail: string;
  setBusinessEmail: React.Dispatch<React.SetStateAction<string>>;
}

function PartnerForm({ onSubmit, showPassword, setShowPassword, showConfirm, setShowConfirm, agreed, setAgreed, businessEmail, setBusinessEmail }: PartnerFormProps) {
  return (
    <form onSubmit={onSubmit} className="rg-form">
      <IconField label="Business Name" icon={<FaBuilding size={13} />} required type="text" autoComplete="organization" placeholder="Horizon Study Consultants" />

      <IconField label="Contact Person Name" icon={<FaUserTie size={13} />} required type="text" autoComplete="name" placeholder="Rezaul Karim" />

      <IconField
        label="Business Email"
        icon={<FaEnvelope size={13} />}
        required
        type="email"
        autoComplete="email"
        value={businessEmail}
        onChange={(e) => setBusinessEmail(e.target.value)}
        placeholder="partner@business.com"
      />

      <SelectField label="Country" icon={<FaGlobeAmericas size={13} />} options={COUNTRIES} placeholder="Select country" />

      <div className="rg-two">
        <PasswordField label="Password" show={showPassword} setShow={setShowPassword} />
        <PasswordField label="Confirm Password" show={showConfirm} setShow={setShowConfirm} />
      </div>

      <TermsCheckbox agreed={agreed} setAgreed={setAgreed} />

      <SubmitButton disabled={!agreed}>Register as Partner</SubmitButton>
    </form>
  );
}

/* ───────────────────────── Verification code ───────────────────────── */

interface OtpStepProps {
  isStudent: boolean;
  email: string;
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}

function OtpStep({ isStudent, email, otp, setOtp, onSubmit, onBack }: OtpStepProps) {
  const id = useId();
  return (
    <div>
      <button data-rg-swap type="button" onClick={onBack} className="rg-back">
        <FaArrowLeft size={11} />
        Edit details
      </button>

      <div data-rg-swap className="rg-shield" aria-hidden>
        <FaShieldAlt size={22} />
      </div>

      <h2 data-rg-swap className="rg-otp-title">
        Verify your {isStudent ? "student" : "business"} email
      </h2>
      <p data-rg-swap className="rg-otp-sub">
        Enter the verification code we sent to
        <b>{email || "your email address"}</b>
      </p>

      <form onSubmit={onSubmit} className="rg-form">
        <div data-rg-swap>
          <FieldLabel htmlFor={id}>Verification Code</FieldLabel>
          <input
            id={id}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="• • • • • •"
            className="rg-code"
          />
          <p className="rg-hint">Required — check your inbox (and spam folder) for the code.</p>
        </div>

        <p data-rg-swap className="rg-resend">
          Didn&apos;t get a code?
          <button type="button" className="rg-link">
            Resend code
          </button>
        </p>

        <SubmitButton>{isStudent ? "Verify & Create Account" : "Verify & Register"}</SubmitButton>
      </form>
    </div>
  );
}
