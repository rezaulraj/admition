"use client";

import { useState, type FormEvent, type ReactNode } from "react";

// FormSubmit AJAX endpoint: consultation requests are emailed here
const FORMSUBMIT_URL = "https://formsubmit.co/ajax/apply@admissiononboard.com";
const DESTINATION = "Australia";

type Reason = {
  title: string;
  description: string;
  points?: string[];
  icon: ReactNode;
};

const reasons: Reason[] = [
  {
    title: "World-class universities",
    description:
      "Australia has many universities ranked among the best in the world, including several in the global top 100. The Group of Eight (Go8) are its leading research universities. Rankings are a useful starting point, but you should also compare the course, location and cost.",
    icon: (
      <path d="M12 3 2 8l10 5 8-4v6h2V8L12 3Zm-6 10v4c0 1.66 2.69 3 6 3s6-1.34 6-3v-4l-6 3-6-3Z" />
    ),
  },
  {
    title: "A wide range of study levels",
    description:
      "Students can choose from foundation programmes, diplomas, bachelor's degrees (typically 3 years), master's degrees (usually 1–2 years for coursework) and PhDs. Foundation and diploma options help students who need a bridge into a degree. Only courses registered for international students are eligible for a student visa.",
    icon: (
      <path d="M12 2 3 6.5 12 11l9-4.5L12 2Zm-9 9 9 4.5 9-4.5v2.5L12 18l-9-4.5V11Zm0 5 9 4.5 9-4.5v2.5L12 23l-9-4.5V16Z" />
    ),
  },
  {
    title: "Post-study work rights",
    description:
      "Eligible graduates can apply for a temporary graduate visa. It allows them to live and work in Australia after study without employer sponsorship. Key points:",
    points: [
      "The length of stay depends on your qualification level.",
      "Applicants must meet an age limit and a minimum Australian study requirement.",
      "Graduates who studied and lived in a designated regional area may be eligible for extra time.",
      "The visa is temporary and does not lead directly to permanent residency.",
    ],
    icon: (
      <path d="M9 2h6a2 2 0 0 1 2 2v2h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h4V4a2 2 0 0 1 2-2Zm0 4h6V4H9v2Z" />
    ),
  },
  {
    title: "Work while studying",
    description:
      "Student visa holders can work part-time during their course and have fewer limits during official breaks. Master's by research and PhD students have more flexibility. Work limits are strictly enforced, so treat work as a supplement to your funds rather than your main way of paying for study.",
    icon: (
      <path d="M4 6a2 2 0 0 1 2-2h12v3h1a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm2 0v1h10V6H6Zm11 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
    ),
  },
  {
    title: "Convenient for Asian students",
    description:
      "Australia's time zones are close to many Asian countries, which makes travel and family contact easier. Major cities have large Asian communities and widely available Asian food and cultural services. Universities provide international student support, including orientation, English support and career services.",
    icon: (
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1 5h2v5.6l3.7 2.2-1 1.7L11 13.7V7Z" />
    ),
  },
  {
    title: "Safe, multicultural environment",
    description:
      "Australian campuses host students from all over the world. The environment is generally safe and English-speaking, which helps you build language skills, global networks and cross-cultural experience.",
    icon: (
      <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm-1.4 13.4L7.2 12l1.4-1.4 2 2 4.8-4.8 1.4 1.4-6.2 6.2Z" />
    ),
  },
  {
    title: "Scholarships",
    description:
      "Both the Australian government and universities offer scholarships for international students, including awards aimed at students from eligible developing countries. Eligibility and funding vary by scheme and university.",
    icon: (
      <path d="M12 2l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 16.8 6.1 20l1.3-6.5L2.5 8.9l6.6-.8L12 2Z" />
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
  "Italy",
  "Norway",
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

export default function WhyAustralia() {
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
              Why Choose <span className="text-[#1366E0]">Australia</span>?
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
                        fillRule="evenodd"
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
                      {reason.points && (
                        <ul className="mt-3 space-y-1.5">
                          {reason.points.map((point) => (
                            <li
                              key={point}
                              className="flex items-start gap-2 text-sm leading-relaxed text-[#6B6B6B]"
                            >
                              <svg
                                className="mt-1 h-3.5 w-3.5 shrink-0 text-[#1366E0]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={3}
                                aria-hidden
                              >
                                <path
                                  d="M5 12.5l4.5 4.5L19 7.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
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
                    Your free consultation request for studying in Australia has
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
                      clarity on studying in Australia.
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
