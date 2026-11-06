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

// Place your background image at: /public/register.avif
const BG_IMAGE = "/register.avif";

const COUNTRIES = [
  "Bangladesh",
  "India",
  "Pakistan",
  "Nepal",
  "Sri Lanka",
  "Ghana",
  "Kenya",
  "Nigeria",
  "United Kingdom",
];

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

export default function Register() {
  const [tab, setTab] = useState<RegisterTab>("student");
  const isStudent = tab === "student";

  const [step, setStep] = useState<RegisterStep>("form");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [email, setEmail] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [otp, setOtp] = useState("");

  const accent = isStudent ? "#1366E0" : "#F58B0F";
  const destinationEmail = isStudent ? email : businessEmail;

  const handleTabChange = (next: RegisterTab) => {
    setTab(next);
    setAgreed(false);
    setStep("form");
    setOtp("");
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep("otp");
  };

  const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // UI only — wire this up to your real verification flow.
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
        .no-scrollbar::-webkit-scrollbar { width: 6px; }
        .no-scrollbar::-webkit-scrollbar-thumb { background: #1B1B1B22; border-radius: 8px; }
        select { -webkit-appearance: none; appearance: none; }
        @keyframes otpPop { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .otp-pop { animation: otpPop 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes cardFade { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
        .card-fade { animation: cardFade 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>

      {/* Left: visual panel */}
      <div className="hidden lg:flex relative w-[42%] overflow-hidden">
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
              {step === "otp" ? "Almost there" : "Create account"}
            </span>
            <span className="absolute right-0 top-[8%] text-[11px] tracking-[0.2em] uppercase text-white/70 font-semibold">
              {step === "otp" ? "Verified access" : "Next destination"}
            </span>
          </div>

          <div className="max-w-sm">
            <h1 className="text-white text-3xl font-extrabold leading-tight tracking-tight">
              {step === "otp" ? (
                <>
                  One code away
                  <br />
                  from boarding.
                </>
              ) : (
                <>
                  Every transfer starts
                  <br />
                  with a single step.
                </>
              )}
            </h1>
            <p className="mt-4 text-white/70 text-sm font-medium leading-relaxed">
              {step === "otp"
                ? "Check your inbox for the code we just sent — it confirms this account really belongs to you."
                : isStudent
                  ? "Set up your student profile in minutes and start tracking your admission journey."
                  : "Join our partner network and start guiding students to their next admission."}
            </p>
          </div>
        </div>

        <div
          className="stamp-rotate absolute bottom-10 right-10 z-10 flex flex-col items-center justify-center h-28 w-28 rounded-full border-2 border-dashed"
          style={{ borderColor: `${accent}B3` }}
        >
          <span className="text-gray-50 text-[9px] font-bold tracking-[0.15em] uppercase">
            {step === "otp" ? "Verify" : "New"}
          </span>
          <FaGraduationCap className="text-gray-50 my-1 text-lg" />
          <span className="text-gray-50 text-[9px] font-bold tracking-[0.15em] uppercase">
            {step === "otp" ? "Code" : "Member"}
          </span>
        </div>
      </div>

      {/* Right: form panel */}
      <div className="flex flex-1 justify-center px-6 py-10 sm:px-10 bg-[#FFFEFA] relative overflow-y-auto no-scrollbar">
        <div
          className="pointer-events-none fixed inset-0 lg:left-[42%] opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #1B1B1B 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        <div className="relative w-full max-w-md h-fit my-auto">
          <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
            <FaGraduationCap className="text-[#1B1B1B] text-xl" />
            <span className="text-[#1B1B1B] text-lg font-extrabold tracking-tight">
              Admission OnBoard
            </span>
          </div>

          <div className="card-fade rounded-3xl bg-white shadow-[0_20px_60px_-15px_rgba(19,102,224,0.18)] border border-[#1B1B1B]/5 overflow-hidden">
            {step === "form" && (
              <>
                <div className="relative flex">
                  <TabButton
                    active={isStudent}
                    onClick={() => handleTabChange("student")}
                    icon={<FaUserGraduate />}
                    label="Student"
                    accent="red"
                  />
                  <TabButton
                    active={!isStudent}
                    onClick={() => handleTabChange("partner")}
                    icon={<FaHandshake />}
                    label="Recruitment Partner"
                    accent="orange"
                  />
                </div>

                <div className="relative h-0 border-t-2 border-dashed border-[#1B1B1B]/10">
                  <div className="absolute -top-2 -left-2 h-4 w-4 rounded-full bg-[#FFFEFA]" />
                  <div className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-[#FFFEFA]" />
                </div>
              </>
            )}

            <div className="px-8 py-9 sm:px-10">
              {step === "form" ? (
                <>
                  <p
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] ${
                      isStudent
                        ? "bg-[#1366E0]/15 text-[#1366E0]"
                        : "bg-[#F58B0F]/15 text-[#F58B0F]"
                    }`}
                  >
                    {isStudent
                      ? "Student registration"
                      : "Recruitment partner registration"}
                  </p>

                  <h2 className="mt-4 text-2xl font-extrabold text-[#1B1B1B] tracking-tight">
                    {isStudent
                      ? "Start your educational journey"
                      : "Join our partner network"}
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

                  <p className="mt-7 text-center text-sm font-medium text-[#1B1B1B]/50">
                    Already have an account?{" "}
                    <a
                      href="/auth/login"
                      className={`font-bold ${isStudent ? "text-[#1366E0]" : "text-[#F58B0F]"} hover:underline`}
                    >
                      Login here
                    </a>
                  </p>
                </>
              ) : (
                <OtpStep
                  isStudent={isStudent}
                  accent={accent}
                  email={destinationEmail}
                  otp={otp}
                  setOtp={setOtp}
                  onSubmit={handleOtpSubmit}
                  onBack={() => setStep("form")}
                />
              )}
            </div>
          </div>

          <p className="mt-6 mb-2 text-center text-[11px] font-medium tracking-wide text-[#1B1B1B]/35">
            Admission OnBoard · Secure student &amp; partner access
          </p>
        </div>
      </div>
    </div>
  );
}

interface FieldLabelProps {
  children: React.ReactNode;
  optional?: boolean;
}

function FieldLabel({ children, optional }: FieldLabelProps) {
  return (
    <label className="mb-1.5 flex items-center justify-between text-xs font-bold uppercase tracking-[0.1em] text-[#1B1B1B]/60">
      <span>{children}</span>
      {optional && (
        <span className="text-[9px] font-semibold normal-case tracking-normal text-[#1B1B1B]/35">
          Optional
        </span>
      )}
    </label>
  );
}

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  accentColor?: string;
}

function IconInput({
  icon,
  accentColor = "#1366E0",
  ...props
}: IconInputProps) {
  return (
    <div
      className="group relative flex items-center rounded-xl border border-[#1B1B1B]/12 bg-[#FFFEFA]/60 transition-colors duration-200 focus-within:bg-white"
      onFocus={(e) => (e.currentTarget.style.borderColor = accentColor)}
      onBlur={(e) => (e.currentTarget.style.borderColor = "")}
    >
      <span className="pl-4 text-[#1B1B1B]/35">{icon}</span>
      <input
        {...props}
        className="w-full bg-transparent px-3 py-3 text-sm font-medium text-[#1B1B1B] placeholder:text-[#1B1B1B]/30 focus:outline-none"
      />
    </div>
  );
}

interface SelectFieldProps {
  icon: React.ReactNode;
  options: string[];
  placeholder: string;
}

function SelectField({ icon, options, placeholder }: SelectFieldProps) {
  return (
    <div className="group relative flex items-center rounded-xl border border-[#1B1B1B]/12 bg-[#FFFEFA]/60 transition-colors duration-200 focus-within:bg-white">
      <span className="pl-4 text-[#1B1B1B]/35">{icon}</span>
      <select
        defaultValue=""
        className="w-full appearance-none bg-transparent px-3 py-3 text-sm font-medium text-[#1B1B1B] focus:outline-none"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <FaChevronDown className="pr-4 text-[#1B1B1B]/30 text-xs" />
    </div>
  );
}

interface PasswordFieldProps {
  label: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  accentColor: string;
  placeholder?: string;
}

function PasswordField({
  label,
  show,
  setShow,
  accentColor,
  placeholder = "••••••••",
}: PasswordFieldProps) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="group relative flex items-center rounded-xl border border-[#1B1B1B]/12 bg-[#FFFEFA]/60 transition-colors duration-200 focus-within:bg-white">
        <span className="pl-4 text-[#1B1B1B]/35">
          <FaLock size={14} />
        </span>
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          required
          className="w-full bg-transparent px-3 py-3 text-sm font-medium text-[#1B1B1B] placeholder:text-[#1B1B1B]/30 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="pr-4 text-[#1B1B1B]/35 hover:text-[#1B1B1B]/70 transition-colors"
          tabIndex={-1}
        >
          {show ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
        </button>
      </div>
    </div>
  );
}

interface TermsCheckboxProps {
  agreed: boolean;
  setAgreed: React.Dispatch<React.SetStateAction<boolean>>;
  accentColor: string;
}

function TermsCheckbox({ agreed, setAgreed, accentColor }: TermsCheckboxProps) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5">
      <button
        type="button"
        onClick={() => setAgreed((a) => !a)}
        className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors duration-200"
        style={{
          borderColor: agreed ? accentColor : "#1B1B1B33",
          backgroundColor: agreed ? accentColor : "transparent",
        }}
      >
        {agreed && <FaCheck className="text-white" size={9} />}
      </button>
      <span className="text-xs font-medium leading-relaxed text-[#1B1B1B]/60">
        I agree to the{" "}
        <a
          href="/terms"
          className="font-bold underline decoration-dotted"
          style={{ color: accentColor }}
        >
          Terms &amp; Conditions
        </a>{" "}
        and{" "}
        <a
          href="/privacy"
          className="font-bold underline decoration-dotted"
          style={{ color: accentColor }}
        >
          Privacy Policy
        </a>
      </span>
    </label>
  );
}

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

function StudentForm({
  onSubmit,
  showPassword,
  setShowPassword,
  showConfirm,
  setShowConfirm,
  agreed,
  setAgreed,
  email,
  setEmail,
}: StudentFormProps) {
  const accent = "#1366E0";
  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <FieldLabel>Given Name</FieldLabel>
          <IconInput
            icon={<FaUser size={13} />}
            accentColor={accent}
            required
            type="text"
            placeholder="Jamila"
          />
        </div>
        <div>
          <FieldLabel>Surname</FieldLabel>
          <IconInput
            icon={<FaUser size={13} />}
            accentColor={accent}
            required
            type="text"
            placeholder="Rahman"
          />
        </div>
      </div>

      <div>
        <FieldLabel>Email</FieldLabel>
        <IconInput
          icon={<FaEnvelope size={13} />}
          accentColor={accent}
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <FieldLabel>Phone Number</FieldLabel>
        <IconInput
          icon={<FaPhoneAlt size={13} />}
          accentColor={accent}
          required
          type="tel"
          placeholder="+1 555 123 4567"
        />
        <p className="mt-1.5 text-[11px] font-medium italic text-[#1B1B1B]/35">
          If you used an invite link, this may already be filled in.
        </p>
      </div>

      <div>
        <FieldLabel>Nationality</FieldLabel>
        <SelectField
          icon={<FaGlobeAmericas size={13} />}
          options={COUNTRIES}
          placeholder="Select your nationality"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <PasswordField
          label="Password"
          show={showPassword}
          setShow={setShowPassword}
          accentColor={accent}
        />
        <PasswordField
          label="Confirm Password"
          show={showConfirm}
          setShow={setShowConfirm}
          accentColor={accent}
        />
      </div>

      <div>
        <FieldLabel>Enrolment Time</FieldLabel>
        <IconInput
          icon={<FaCalendarAlt size={13} />}
          accentColor={accent}
          type="text"
          placeholder="e.g. Fall 2026 Intake"
        />
        <p className="mt-1.5 text-[11px] font-medium text-[#1B1B1B]/35">
          For example: Intake, Enrolment year
        </p>
      </div>

      <div>
        <FieldLabel optional>How did you hear about us?</FieldLabel>
        <SelectField
          icon={<FaGlobeAmericas size={13} />}
          options={HEAR_ABOUT_OPTIONS}
          placeholder="Select one"
        />
      </div>

      <div className="pt-1">
        <TermsCheckbox
          agreed={agreed}
          setAgreed={setAgreed}
          accentColor={accent}
        />
      </div>

      <button
        type="submit"
        disabled={!agreed}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#1366E0] py-3.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-[#1366E0]/25 transition-all duration-200 hover:bg-[#0F55BE] hover:shadow-xl hover:shadow-[#1366E0]/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#1366E0]"
      >
        Send verification code
        <HiArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>
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

function PartnerForm({
  onSubmit,
  showPassword,
  setShowPassword,
  showConfirm,
  setShowConfirm,
  agreed,
  setAgreed,
  businessEmail,
  setBusinessEmail,
}: PartnerFormProps) {
  const accent = "#F58B0F";
  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div>
        <FieldLabel>Business Name</FieldLabel>
        <IconInput
          icon={<FaBuilding size={13} />}
          accentColor={accent}
          required
          type="text"
          placeholder="Horizon Study Consultants"
        />
      </div>

      <div>
        <FieldLabel>Contact Person Name</FieldLabel>
        <IconInput
          icon={<FaUserTie size={13} />}
          accentColor={accent}
          required
          type="text"
          placeholder="Rezaul Karim"
        />
      </div>

      <div>
        <FieldLabel>Business Email</FieldLabel>
        <IconInput
          icon={<FaEnvelope size={13} />}
          accentColor={accent}
          required
          type="email"
          value={businessEmail}
          onChange={(e) => setBusinessEmail(e.target.value)}
          placeholder="partner@business.com"
        />
      </div>

      <div>
        <FieldLabel>Country</FieldLabel>
        <SelectField
          icon={<FaGlobeAmericas size={13} />}
          options={COUNTRIES}
          placeholder="Select country"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <PasswordField
          label="Password"
          show={showPassword}
          setShow={setShowPassword}
          accentColor={accent}
        />
        <PasswordField
          label="Confirm Password"
          show={showConfirm}
          setShow={setShowConfirm}
          accentColor={accent}
        />
      </div>

      <div className="pt-1">
        <TermsCheckbox
          agreed={agreed}
          setAgreed={setAgreed}
          accentColor={accent}
        />
      </div>

      <button
        type="submit"
        disabled={!agreed}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#F58B0F] py-3.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-[#F58B0F]/25 transition-all duration-200 hover:bg-[#D97706] hover:shadow-xl hover:shadow-[#F58B0F]/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#F58B0F]"
      >
        Register as Partner
        <HiArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}

interface OtpStepProps {
  isStudent: boolean;
  accent: string;
  email: string;
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}

function OtpStep({
  isStudent,
  accent,
  email,
  otp,
  setOtp,
  onSubmit,
  onBack,
}: OtpStepProps) {
  const accentBg = isStudent ? "bg-[#1366E0]/10" : "bg-[#F58B0F]/10";

  return (
    <div className="otp-pop">
      <button
        type="button"
        onClick={onBack}
        className="mb-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-[#1B1B1B]/40 hover:text-[#1B1B1B]/70 transition-colors"
      >
        <FaArrowLeft size={11} />
        Edit details
      </button>

      <div
        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${accentBg}`}
      >
        <FaShieldAlt style={{ color: accent }} size={22} />
      </div>

      <h2 className="mt-5 text-center text-2xl font-extrabold text-[#1B1B1B] tracking-tight">
        Verify your {isStudent ? "student" : "business"} email
      </h2>
      <p className="mt-2 text-center text-sm font-medium leading-relaxed text-[#1B1B1B]/50">
        Enter the verification code we sent to
        <br />
        <span className="font-bold text-[#1B1B1B]">
          {email || "your email address"}
        </span>
      </p>

      <form onSubmit={onSubmit} className="mt-7 space-y-5">
        <div>
          <FieldLabel>Verification Code</FieldLabel>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="• • • • • •"
            className="w-full rounded-xl border border-[#1B1B1B]/12 bg-[#FFFEFA]/60 px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] text-[#1B1B1B] placeholder:tracking-normal placeholder:text-base placeholder:font-medium placeholder:text-[#1B1B1B]/25 transition-colors duration-200 focus:bg-white focus:outline-none"
          />
          <p className="mt-1.5 text-[11px] font-medium text-[#1B1B1B]/35">
            Required — check your inbox (and spam folder) for the code.
          </p>
        </div>

        <div className="flex items-center justify-center gap-1 text-xs font-medium text-[#1B1B1B]/50">
          Didn&apos;t get a code?
          <button type="button" className="font-bold" style={{ color: accent }}>
            Resend code
          </button>
        </div>

        <button
          type="submit"
          className="group flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold tracking-wide text-white shadow-lg transition-all duration-200 active:scale-[0.99]"
          style={{ backgroundColor: accent }}
        >
          {isStudent ? "Verify & Create Account" : "Verify & Register"}
          <HiArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </form>
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
