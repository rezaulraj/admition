"use client";

import { useState, type FormEvent } from "react";
import ReactCountryFlag from "react-country-flag";

// FormSubmit AJAX endpoint: submissions are emailed to this address
const FORMSUBMIT_URL = "https://formsubmit.co/ajax/aob@admissiononboard.com";

const inputClass =
  "w-full rounded-xl border border-[#E5E5E5] bg-[#FCFCFA] px-4 py-3 text-sm text-[#1B1B1B] placeholder:text-[#A8A8A8] outline-none transition-all focus:border-[#1366E0] focus:bg-white focus:ring-4 focus:ring-[#1366E0]/10";

const labelClass = "text-sm font-semibold text-[#1B1B1B]";

type CountryCode = { iso: string; code: string; label: string };

const countryCodes: CountryCode[] = [
  { iso: "GB", code: "+44", label: "United Kingdom" },
  { iso: "AU", code: "+61", label: "Australia" },
  { iso: "NZ", code: "+64", label: "New Zealand" },
  { iso: "FI", code: "+358", label: "Finland" },
  { iso: "GR", code: "+30", label: "Greece" },
  { iso: "LT", code: "+370", label: "Lithuania" },
  { iso: "HU", code: "+36", label: "Hungary" },
  { iso: "RO", code: "+40", label: "Romania" },
  { iso: "MT", code: "+356", label: "Malta" },
  { iso: "CY", code: "+357", label: "Cyprus" },
];

const DEFAULT_ISO = countryCodes[0].iso;

type Status = "idle" | "submitting" | "success" | "error";

export default function PartnershipForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [iso, setIso] = useState(DEFAULT_ISO);
  const [submittedName, setSubmittedName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const selected = countryCodes.find((c) => c.iso === iso) ?? countryCodes[0];

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
      Phone: `${selected.code} ${data.get("phone")}`,
      "Institution Country": selected.label,
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
        throw new Error(
          json.message || `Request failed (status ${res.status})`,
        );
      }

      setSubmittedName(String(data.get("fullName") || "").split(" ")[0]);
      form.reset();
      setIso(DEFAULT_ISO);
      setStatus("success");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("FormSubmit error:", message);
      setErrorMessage(message);
      setStatus("error");
    }
  }

  return (
    <section
      id="institution-form"
      className="relative w-full overflow-hidden bg-[#FFFEFA] px-6 py-20"
    >
      {/* Soft background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#1366E0]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#2F5DA8]/10 blur-3xl"
      />

      <style>{`
        @keyframes pf-pop { 0% { transform: scale(.6); opacity: 0 } 60% { transform: scale(1.08); opacity: 1 } 100% { transform: scale(1) } }
        @keyframes pf-draw { to { stroke-dashoffset: 0 } }
        @keyframes pf-fade { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }
        @keyframes pf-ring { 0% { transform: scale(.8); opacity: .6 } 100% { transform: scale(1.8); opacity: 0 } }
      `}</style>

      <div className="relative mx-auto container max-w-3xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#1366E0]/10 px-4 py-1.5 text-xs font-semibold text-[#1366E0]">
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h8M12 8v8"
              />
              <circle cx="12" cy="12" r="9" />
            </svg>
            Become a partner
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl">
            Partnership <span className="text-[#1366E0]">Request</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm font-medium text-[#6B6B6B] sm:text-base">
            Partner with Admission OnBoard to expand your student reach and
            boost enrolment success.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-[#ECECEC] bg-white shadow-xl shadow-black/5">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#1366E0] via-[#4A90F0] to-[#2F5DA8]" />

          {status === "success" ? (
            /* ───────── Success state ───────── */
            <div
              role="status"
              aria-live="polite"
              className="flex flex-col items-center px-6 py-14 text-center sm:px-12 sm:py-16"
            >
              <div className="relative grid h-24 w-24 place-items-center">
                <span
                  className="absolute inset-0 rounded-full bg-[#59B226]/30 motion-reduce:hidden"
                  style={{ animation: "pf-ring 1.4s ease-out 0.3s both" }}
                />
                <span
                  className="relative grid h-24 w-24 place-items-center rounded-full bg-[#59B226] shadow-lg shadow-[#59B226]/30"
                  style={{
                    animation: "pf-pop 0.6s cubic-bezier(.22,1,.36,1) both",
                  }}
                >
                  <svg
                    className="h-12 w-12"
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
                        animation: "pf-draw 0.5s ease-out 0.45s forwards",
                      }}
                    />
                  </svg>
                </span>
              </div>

              <div style={{ animation: "pf-fade 0.6s ease-out 0.6s both" }}>
                <h3 className="mt-8 text-2xl font-semibold text-[#1B1B1B] sm:text-3xl">
                  Thank you{submittedName ? `, ${submittedName}` : ""}!
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#6B6B6B] sm:text-base">
                  Your partnership request has been received. Our partnerships
                  team will review it and get back to you shortly.
                </p>

                <div className="mx-auto mt-8 flex max-w-sm items-center gap-3 rounded-2xl bg-[#F3F7FE] p-4 text-left">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#1366E0] shadow-sm">
                    <svg
                      className="h-5 w-5"
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
                    Need to add something? Email us at{" "}
                    <a
                      href="mailto:aob@admissiononboard.com"
                      className="font-semibold text-[#1366E0] hover:underline"
                    >
                      aob@admissiononboard.com
                    </a>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#1B1B1B] px-6 py-3 text-sm font-semibold text-[#1B1B1B] transition-colors hover:bg-[#1B1B1B] hover:text-white"
                >
                  Submit another request
                </button>
              </div>
            </div>
          ) : (
            /* ───────── Form ───────── */
            <form onSubmit={handleSubmit} className="p-6 sm:p-10">
              {/* Honeypot (hidden from people, catches spam bots) */}
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden
              />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className={labelClass}>
                    Full Name <span className="text-[#1366E0]">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="e.g. Sarah Ahmed"
                    className={`mt-2 ${inputClass}`}
                  />
                </div>

                <div>
                  <label htmlFor="jobTitle" className={labelClass}>
                    Job Title <span className="text-[#1366E0]">*</span>
                  </label>
                  <input
                    id="jobTitle"
                    name="jobTitle"
                    type="text"
                    required
                    autoComplete="organization-title"
                    placeholder="e.g. International Admissions Manager"
                    className={`mt-2 ${inputClass}`}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="institute" className={labelClass}>
                    Institute <span className="text-[#1366E0]">*</span>
                  </label>
                  <input
                    id="institute"
                    name="institute"
                    type="text"
                    required
                    autoComplete="organization"
                    placeholder="University or college name"
                    className={`mt-2 ${inputClass}`}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email <span className="text-[#1366E0]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@institute.com"
                    className={`mt-2 ${inputClass}`}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone <span className="text-[#1366E0]">*</span>
                  </label>
                  <div className="mt-2 flex overflow-hidden rounded-xl border border-[#E5E5E5] bg-[#FCFCFA] transition-all focus-within:border-[#1366E0] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#1366E0]/10">
                    <div className="relative flex shrink-0 items-center gap-2 border-r border-[#E5E5E5] pl-3 pr-2">
                      <span className="flex overflow-hidden rounded-[3px] ring-1 ring-black/10">
                        <ReactCountryFlag
                          countryCode={selected.iso}
                          svg
                          aria-label={selected.label}
                          style={{
                            width: "1.4em",
                            height: "1em",
                            display: "block",
                            objectFit: "cover",
                          }}
                        />
                      </span>
                      <span className="text-sm font-medium text-[#1B1B1B]">
                        {selected.code}
                      </span>
                      <svg
                        className="h-3 w-3 text-[#9A9A9A]"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M2.5 4.5 6 8l3.5-3.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {/* Native select sits invisibly on top: accessible and mobile-friendly */}
                      <select
                        aria-label="Country code"
                        value={iso}
                        onChange={(e) => setIso(e.target.value)}
                        className="absolute inset-0 cursor-pointer opacity-0"
                      >
                        {countryCodes.map((c) => (
                          <option key={c.iso} value={c.iso}>
                            {c.label} ({c.code})
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel-national"
                      placeholder="Phone number"
                      className="w-full bg-transparent px-4 py-3 text-sm text-[#1B1B1B] placeholder:text-[#A8A8A8] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-baseline justify-between">
                  <label htmlFor="message" className={labelClass}>
                    Message
                  </label>
                  <span className="text-xs text-[#9A9A9A]">Optional</span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  maxLength={1500}
                  placeholder="Tell us about your institution and the kind of partnership you're interested in."
                  className={`mt-2 resize-y ${inputClass}`}
                />
              </div>

              <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl bg-[#FAFAF7] p-4 text-sm text-[#6B6B6B]">
                <input
                  type="checkbox"
                  name="consent"
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#1366E0]"
                />
                I agree to receive other communications from Admission OnBoard.
              </label>

              {status === "error" && (
                <div
                  role="alert"
                  className="mt-5 flex items-start gap-3 rounded-xl border border-[#E0483E]/30 bg-[#FFF3F2] p-4 text-sm text-[#B3261E]"
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
                      aob@admissiononboard.com (check the spam folder too).
                      Click the &ldquo;Activate Form&rdquo; link in it, then
                      submit again.
                    </span>
                  ) : (
                    <span>
                      Your request couldn&apos;t be sent
                      {errorMessage ? ` (${errorMessage})` : ""}. Try again, or
                      email{" "}
                      <a
                        href="mailto:aob@admissiononboard.com"
                        className="font-semibold underline"
                      >
                        aob@admissiononboard.com
                      </a>
                      .
                    </span>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1366E0] py-4 text-sm font-semibold text-white shadow-lg shadow-[#1366E0]/25 transition-all hover:bg-[#1B1B1B] hover:shadow-black/20 disabled:cursor-not-allowed disabled:opacity-70"
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
                    Sending request…
                  </>
                ) : (
                  <>
                    Submit partnership request
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs text-[#9A9A9A]">
                Your details are sent securely to our partnerships team.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
