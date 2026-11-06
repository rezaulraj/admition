"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserGraduate,
  FaHandshake,
  FaGraduationCap,
  FaShieldAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

type LoginTab = "student" | "partner" | "admin";

// Place your background image at: /public/register.avif
const BG_IMAGE = "/register.avif";

export default function Login() {
  const [tab, setTab] = useState<LoginTab>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isStudent = tab === "student";
  const isAdmin = tab === "admin";

  const accent = isStudent ? "#1366E0" : isAdmin ? "#1B1B1B" : "#F58B0F";

  const handleTabChange = (next: LoginTab) => {
    setTab(next);
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="min-h-screen w-full flex bg-[#1B1B1B]"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500&display=swap');
        .dash-path { stroke-dasharray: 6 8; }
        @keyframes dashMove { to { stroke-dashoffset: -140; } }
        .dash-anim { animation: dashMove 6s linear infinite; }
        .stamp-rotate { transform: rotate(-14deg); transition: transform 0.4s ease; }
        .stamp-rotate:hover { transform: rotate(-6deg) scale(1.04); }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 1000px #ffffff inset; }
        @keyframes cardFade { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
        .card-fade { animation: cardFade 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>

      {/* Left: visual panel */}
      <div className="hidden lg:flex relative w-[46%] overflow-hidden">
        <Image
          src={BG_IMAGE}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B] via-[#1B1B1B]/70 to-[#1B1B1B]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B1B1B]/40 to-transparent" />

        <div className="relative z-10 flex flex-col justify-between w-full p-12">
          

          <div className="relative flex-1 flex items-center">
            <svg viewBox="0 0 400 200" className="w-full max-w-md" fill="none">
              <path
                d="M20 170 C 120 40, 260 210, 380 30"
                stroke="#F9FAFB"
                strokeWidth="2"
                strokeLinecap="round"
                className="dash-path dash-anim opacity-70"
              />
              <circle cx="20" cy="170" r="6" fill="#F9FAFB" />
              <circle
                cx="20"
                cy="170"
                r="10"
                stroke="#F9FAFB"
                strokeWidth="1.5"
                opacity="0.5"
              />
              <circle cx="380" cy="30" r="6" fill={accent} />
              <circle
                cx="380"
                cy="30"
                r="10"
                stroke={accent}
                strokeWidth="1.5"
                opacity="0.5"
              />
            </svg>
            <span className="absolute left-0 bottom-[62%] text-[11px] tracking-[0.2em] uppercase text-white/70 font-semibold">
              Current Step
            </span>
            <span className="absolute right-0 top-[8%] text-[11px] tracking-[0.2em] uppercase text-white/70 font-semibold">
              Next Destination
            </span>
          </div>

          <div className="max-w-sm">
            <h1 className="text-white text-3xl font-extrabold leading-tight tracking-tight">
              Every admission starts
              <br />
              with a single step.
            </h1>
            <p className="mt-4 text-white/70 text-sm font-medium leading-relaxed">
              Students plot their next admission. Recruitment partners guide the
              way. One login, one journey, tracked start to finish.
            </p>
          </div>
        </div>

        <div
          className="stamp-rotate absolute bottom-10 right-10 z-10 flex flex-col items-center justify-center h-28 w-28 rounded-full border-2 border-dashed"
          style={{ borderColor: `${accent}B3` }}
        >
          <span className="text-gray-50 text-[9px] font-bold tracking-[0.15em] uppercase">
            Verified
          </span>
          <FaGraduationCap className="text-gray-50 my-1 text-lg" />
          <span className="text-gray-50 text-[9px] font-bold tracking-[0.15em] uppercase">
            Access
          </span>
        </div>
      </div>

      {/* Right: form panel */}
      <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10 bg-[#FFFEFA] relative">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #1B1B1B 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        <div className="relative w-full max-w-md">
          <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
            <FaGraduationCap className="text-[#1B1B1B] text-xl" />
            <span className="text-[#1B1B1B] text-lg font-extrabold tracking-tight">
              Admission OnBoard
            </span>
          </div>

          <div className="card-fade rounded-3xl bg-white shadow-[0_20px_60px_-15px_rgba(19,102,224,0.18)] border border-[#1B1B1B]/5 overflow-hidden">
            {!isAdmin && (
              <div className="relative flex">
                <TabButton
                  active={isStudent}
                  onClick={() => handleTabChange("student")}
                  icon={<FaUserGraduate />}
                  label="Student"
                  accent="red"
                />
                <TabButton
                  active={tab === "partner"}
                  onClick={() => handleTabChange("partner")}
                  icon={<FaHandshake />}
                  label="Recruitment Partner"
                  accent="orange"
                />
              </div>
            )}

            {!isAdmin && (
              <div className="relative h-0 border-t-2 border-dashed border-[#1B1B1B]/10">
                <div className="absolute -top-2 -left-2 h-4 w-4 rounded-full bg-[#FFFEFA]" />
                <div className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-[#FFFEFA]" />
              </div>
            )}

            <div className="px-8 py-9 sm:px-10">
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => handleTabChange("student")}
                  className="mb-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-[#1B1B1B]/40 hover:text-[#1B1B1B]/70 transition-colors"
                >
                  <FaArrowLeft size={11} />
                  Back
                </button>
              )}

              <p
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] ${
                  isStudent
                    ? "bg-[#1366E0]/15 text-[#1366E0]"
                    : isAdmin
                      ? "bg-[#1B1B1B]/10 text-[#1B1B1B]"
                      : "bg-[#F58B0F]/15 text-[#F58B0F]"
                }`}
              >
                {isStudent
                  ? "Student login"
                  : isAdmin
                    ? "Admin login"
                    : "Recruitment partner login"}
              </p>

              <h2 className="mt-4 text-2xl font-extrabold text-[#1B1B1B] tracking-tight">
                Welcome back
              </h2>
              <p className="mt-1 text-sm font-medium text-[#1B1B1B]/50">
                {isStudent
                  ? "Sign in to continue tracking your admission."
                  : isAdmin
                    ? "Sign in to manage the Admission OnBoard platform."
                    : "Sign in to manage your student pipeline."}
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-[#1B1B1B]/60">
                    Email
                  </label>
                  <div
                    className="group relative flex items-center rounded-xl border border-[#1B1B1B]/12 bg-[#FFFEFA]/60 transition-colors duration-200 focus-within:bg-white"
                    style={{ borderColor: undefined }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = accent)
                    }
                    onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                  >
                    <span className="pl-4 text-[#1B1B1B]/35">
                      <FaEnvelope size={14} />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-transparent px-3 py-3 text-sm font-medium text-[#1B1B1B] placeholder:text-[#1B1B1B]/30 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-[#1B1B1B]/60">
                    Password
                  </label>
                  <div
                    className="group relative flex items-center rounded-xl border border-[#1B1B1B]/12 bg-[#FFFEFA]/60 transition-colors duration-200 focus-within:bg-white"
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = accent)
                    }
                    onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                  >
                    <span className="pl-4 text-[#1B1B1B]/35">
                      <FaLock size={14} />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-transparent px-3 py-3 text-sm font-medium text-[#1B1B1B] placeholder:text-[#1B1B1B]/30 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="pr-4 text-[#1B1B1B]/35 hover:text-[#1B1B1B]/70 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <FaEyeSlash size={14} />
                      ) : (
                        <FaEye size={14} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <a
                    href={`/auth/forgot-password?tab=${tab}`}
                    className="text-xs font-semibold text-[#1B1B1B]/50 transition-colors hover:text-[#1366E0]"
                  >
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold tracking-wide text-white shadow-lg transition-all duration-200 active:scale-[0.99]"
                  style={{
                    backgroundColor: accent,
                    boxShadow: `0 10px 25px -5px ${accent}40`,
                  }}
                >
                  {isStudent
                    ? "Login as Student"
                    : isAdmin
                      ? "Login as Admin"
                      : "Login as Partner"}
                  <HiArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </form>

              {isAdmin ? null : (
                <p className="mt-7 text-center text-sm font-medium text-[#1B1B1B]/50">
                  Don&apos;t have an account?{" "}
                  <a
                    href={`/auth/register/?tab=${tab}`}
                    className={`font-bold ${isStudent ? "text-[#1366E0]" : "text-[#F58B0F]"} hover:underline`}
                  >
                    Register here
                  </a>
                </p>
              )}

              {!isAdmin && (
                <button
                  type="button"
                  onClick={() => handleTabChange("admin")}
                  className="mt-4 flex w-full items-center justify-center gap-1.5 text-xs font-semibold text-[#1B1B1B]/35 transition-colors hover:text-[#1B1B1B]/60"
                >
                  <FaShieldAlt size={11} />
                  Admin sign in
                </button>
              )}
            </div>
          </div>

          <p className="mt-6 text-center text-[11px] font-medium tracking-wide text-[#1B1B1B]/35">
            Admission OnBoard · Secure student &amp; partner access
          </p>
        </div>
      </div>
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  accent: "red" | "orange";
}

function TabButton({ active, onClick, icon, label, accent }: TabButtonProps) {
  const accentColor = accent === "red" ? "#1366E0" : "#F58B0F";
  const accentBg = accent === "red" ? "bg-[#1366E0]/10" : "bg-[#F58B0F]/10";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-1 items-center justify-center gap-2 py-4 text-xs sm:text-sm font-bold tracking-wide transition-colors duration-200 ${
        active ? `${accentBg}` : "bg-white hover:bg-[#FFFEFA]"
      }`}
      style={{ color: active ? accentColor : "#1B1B1B66" }}
    >
      <span className="text-base">{icon}</span>
      <span>{label}</span>
      {active && (
        <span
          className="absolute bottom-0 left-4 right-4 h-[3px] rounded-full transition-all duration-300"
          style={{ backgroundColor: accentColor }}
        />
      )}
    </button>
  );
}
