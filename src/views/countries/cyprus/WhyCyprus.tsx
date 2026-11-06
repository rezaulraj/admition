"use client";

import { useState, type FormEvent } from "react";

// FormSubmit AJAX endpoint: consultation requests are emailed here
const FORMSUBMIT_URL = "https://formsubmit.co/ajax/apply@admissiononboard.com";
const DESTINATION = "Cyprus";

const reasons = [
  {
    title: "EU Degree, Global Value",
    description:
      "Study in an EU country. Your degree follows European standards and is respected worldwide.",
    icon: (
      <path d="M12 3 2 8l10 5 8-4v6h2V8L12 3Zm0 8L4 8l8-4 8 4-8 4Zm-6 2v4c0 1.66 2.69 3 6 3s6-1.34 6-3v-4l-6 3-6-3Z" />
    ),
  },
  {
    title: "Low Cost, Big Value",
    description:
      "Pay far less than in the UK, US or Australia. Tuition and living costs are easy on your budget.",
    icon: (
      <path
        fillRule="evenodd"
        d="M3 6.5A2.5 2.5 0 0 1 5.5 4H17v3h1.5A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11ZM5 7h10V6H5.5a.5.5 0 0 0-.5.5V7Zm11.5 4.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5Z"
      />
    ),
  },
  {
    title: "Learn in English",
    description: "Choose from many English-taught programmes. No Greek needed.",
    icon: (
      <path d="m12.87 15.07-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04ZM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12Zm-2.62 7 1.62-4.33L19.12 17h-3.24Z" />
    ),
  },
  {
    title: "Work While You Study",
    description:
      "Work part-time (up to 20 hours a week during term, within local rules) to help with daily costs.",
    icon: (
      <path d="M9 2h6a2 2 0 0 1 2 2v2h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h4V4a2 2 0 0 1 2-2Zm0 4h6V4H9v2Z" />
    ),
  },
  {
    title: "Safe, Sunny, Central",
    description:
      "Live in a safe country with a warm climate. Cyprus links Europe, the Middle East and Africa, so your career can go places.",
    icon: (
      <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM11 1h2v3h-2V1Zm0 19h2v3h-2v-3ZM1 11h3v2H1v-2Zm19 0h3v2h-3v-2ZM4.22 5.64l1.42-1.42 2.12 2.12-1.42 1.42-2.12-2.12Zm12.02 12.02 1.42-1.42 2.12 2.12-1.42 1.42-2.12-2.12ZM18.36 4.22l1.42 1.42-2.12 2.12-1.42-1.42 2.12-2.12ZM6.34 16.24l1.42 1.42-2.12 2.12-1.42-1.42 2.12-2.12Z" />
    ),
  },
];

const backupCountries = [
  "United Kingdom",
  "Australia",
  "New Zealand",
  "Finland",
  "Greece",
  "Lithuania",
  "Hungary",
  "Romania",
  "Malta",
  "Cyprus",
].filter((c) => c !== DESTINATION); // don't offer the same country as a backup

const studyLevels = ["Diploma", "Bachelor's Degree", "Master's Degree", "PhD"];
const applyWindows = [
  "Within 1 month",
  "1 to 3 months",
  "3 to 6 months",
  "6 months or later",
];
const consultationModes = ["In-person", "Online Video Call", "Phone Call"];

const inputClass =
  "w-full rounded-xl border border-[#E5E5E5] bg-white px-4 py-3 text-sm text-[#1B1B1B] placeholder:text-[#9A9A9A] outline-none transition-all focus:border-[#1366E0] focus:ring-4 focus:ring-[#1366E0]/10";

type Status = "idle" | "submitting" | "success" | "error";

export default function WhyCyprus() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");

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
    <section className="w-full bg-[#FFFEFA] px-6 py-20">
      <style>{`
        @keyframes cf-pop { 0% { transform: scale(.6); opacity: 0 } 60% { transform: scale(1.08); opacity: 1 } 100% { transform: scale(1) } }
        @keyframes cf-draw { to { stroke-dashoffset: 0 } }
        @keyframes cf-fade { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
        @keyframes cf-ring { 0% { transform: scale(.8); opacity: .6 } 100% { transform: scale(1.8); opacity: 0 } }
      `}</style>

      <div className="mx-auto container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr] md:gap-10">
          {/* Left: reasons timeline */}
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl">
              Why Study in <span className="text-[#1366E0]">Cyprus</span>?
            </h2>

            <div className="relative mt-10">
              <div className="absolute bottom-2 left-6 top-2 w-px bg-[#ECECEC]" />

              <ol className="flex flex-col gap-6">
                {reasons.map((reason, i) => (
                  <li key={reason.title} className="relative flex gap-5">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1B1B1B] shadow-md">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="white"
                        aria-hidden
                      >
                        {reason.icon}
                      </svg>
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#1366E0] text-[10px] font-bold text-white ring-2 ring-[#FFFEFA]">
                        {i + 1}
                      </span>
                    </div>

                    <div className="flex-1 rounded-2xl border border-[#ECECEC] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                      <h3 className="text-base font-semibold text-[#1B1B1B] sm:text-lg">
                        {reason.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#6B6B6B]">
                        {reason.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right: consultation form */}
          <div className="h-fit overflow-hidden rounded-3xl border border-[#ECECEC] bg-white shadow-sm md:sticky md:top-28">
            <div className="h-1.5 w-full bg-gradient-to-r from-[#1366E0] via-[#4A90F0] to-[#2F5DA8]" />

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
                  <h3 className="mt-7 text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                    Thank you{firstName ? `, ${firstName}` : ""}!
                  </h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-[#6B6B6B]">
                    Your free consultation request for studying in Cyprus has
                    been received. One of our counsellors will contact you
                    shortly.
                  </p>

                  <div className="mt-6 flex items-center gap-3 rounded-2xl bg-[#F3F7FE] p-4 text-left">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-[#1366E0] shadow-sm">
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
                    <p className="text-xs text-[#6B6B6B] sm:text-sm">
                      Questions in the meantime? Email{" "}
                      <a
                        href="mailto:apply@admissiononboard.com"
                        className="font-semibold text-[#1366E0] hover:underline"
                      >
                        apply@admissiononboard.com
                      </a>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#1B1B1B] px-5 py-2.5 text-sm font-semibold text-[#1B1B1B] transition-colors hover:bg-[#1B1B1B] hover:text-white"
                  >
                    Submit another request
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1366E0]/10">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#1366E0"
                      aria-hidden
                    >
                      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm2.07-7.75-.9.92C13.45 10.9 13 11.5 13 13h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41a2 2 0 0 0-2-2 2 2 0 0 0-2 2H8a4 4 0 0 1 4-4 4 4 0 0 1 4 4c0 .8-.32 1.53-.93 2.09Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#1B1B1B] sm:text-lg">
                      Have more questions?
                    </h3>
                    <p className="mt-1 text-xs text-[#6B6B6B] sm:text-sm">
                      Book a free session with our expert counsellors and get
                      clarity on studying in Cyprus.
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="mt-6 flex flex-col gap-3"
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
                    className={`${inputClass} cursor-not-allowed bg-[#F5F5F3] text-[#6B6B6B]`}
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
                    className={inputClass}
                  />

                  <select
                    name="applyWindow"
                    required
                    defaultValue=""
                    aria-label="When are you looking to apply"
                    className={inputClass}
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
                    className={inputClass}
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
                      className="flex items-start gap-3 rounded-xl border border-[#E0483E]/30 bg-[#FFF3F2] p-3.5 text-sm text-[#B3261E]"
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
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B1B1B] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1366E0] disabled:cursor-not-allowed disabled:opacity-70"
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
