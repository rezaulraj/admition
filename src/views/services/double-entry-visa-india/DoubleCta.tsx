"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";


const FORMSUBMIT_URL = "https://formsubmit.co/ajax/apply@admissiononboard.com";
const WHATSAPP_URL = `https://wa.me/8801602065622?text=${encodeURIComponent(
  "Hi Admission OnBoard, I need help with a double-entry Indian visa.",
)}`;

const purposeOptions = [
  "Embassy / VFS appointment in Delhi",
  "Medical treatment",
  "Business travel",
  "Transit / onward travel (Nepal, Bhutan)",
  "Tourism / family visit",
  "Other",
];

const inputClass =
  "w-full rounded-xl border border-[#E5E5E5] bg-white px-4 py-3 text-sm text-[#1B1B1B] placeholder:text-[#9A9A9A] outline-none transition-all focus:border-[#1366E0] focus:ring-4 focus:ring-[#1366E0]/10";

type Status = "idle" | "submitting" | "success" | "error";

export default function DoubleCta() {
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
      Service: "Double-Entry Visa (India)",
      "Full Name": data.get("fullName"),
      "Phone / WhatsApp": data.get("phone"),
      "Purpose of Travel": data.get("purpose"),
      "First Travel Date": data.get("travelDate") || "(not provided)",
      Message: data.get("message") || "(no message)",
      _subject: `New Double-Entry Visa Request: ${data.get("fullName")}`,
      _template: "table",
      _captcha: "false",
    };

    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) !== "true") {
        throw new Error(json.message || `Request failed (status ${res.status})`);
      }
      setFirstName(String(data.get("fullName") || "").trim().split(" ")[0]);
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
    <section className="container mx-auto px-4 py-16 sm:py-20">
      <div className="relative overflow-hidden rounded-[2rem] lg:rounded-[2.5rem]">
        {/* Background photo */}
        <Image
          src="/india-cta.png"
          alt="Smiling traveller holding a passport at the airport"
          fill
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1116]/85 via-[#0E1116]/70 to-[#0E1116]/90 lg:bg-gradient-to-r lg:from-[#0E1116]/90 lg:via-[#0E1116]/60 lg:to-[#0E1116]/30" />

        <div className="relative z-10 grid grid-cols-1 items-center gap-10 px-6 py-12 sm:px-10 sm:py-14 lg:grid-cols-[1fr_420px] lg:gap-14 lg:px-14 lg:py-16">
          {/* Left: message */}
          <div className="text-white">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Planning two trips to India?{" "}
              <span className="text-[#1366E0]">We&apos;ll handle the visa.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
              Message us on WhatsApp for a quick answer, or send your travel
              plan and our team will call you back with the right visa option.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-[#1366E0] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1366E0]/35 transition-all hover:-translate-y-0.5 hover:bg-[#0F55BE] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1116]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.82 14.1c-.25.69-1.44 1.32-1.98 1.37-.51.05-.99.24-3.34-.7-2.82-1.11-4.6-3.99-4.74-4.18-.14-.19-1.13-1.5-1.13-2.87 0-1.36.71-2.03.97-2.31.25-.28.55-.35.74-.35l.53.01c.17.01.4-.06.62.48.25.6.84 2.06.92 2.21.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.65-.14.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.12.07.69-.18 1.37Z" />
              </svg>
              Chat on WhatsApp
            </a>

            <p className="mt-4 text-sm text-white/70">
              or call{" "}
              <a href="tel:+8801602065622" className="font-semibold text-white underline-offset-4 hover:underline">
                +880 1602-065622
              </a>
            </p>
          </div>

          {/* Right: enquiry form */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="h-1.5 w-full bg-[#1366E0]" />

            {status === "success" ? (
              <div role="status" aria-live="polite" className="flex flex-col items-center px-6 py-12 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-[#59B226] text-white shadow-lg shadow-[#59B226]/30">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden>
                    <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="mt-5 text-xl font-semibold text-[#1B1B1B]">
                  Thank you{firstName ? `, ${firstName}` : ""}!
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#6B6B6B]">
                  We&apos;ve received your double-entry visa request. Our team will
                  contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 rounded-full border border-[#1B1B1B] px-5 py-2.5 text-sm font-semibold text-[#1B1B1B] transition-colors hover:bg-[#1B1B1B] hover:text-white"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-6 sm:p-7">
                <div>
                  <h3 className="text-lg font-semibold text-[#1B1B1B]">Request a callback</h3>
                  <p className="mt-0.5 text-xs text-[#6B6B6B]">
                    Free consultation. No obligation.
                  </p>
                </div>

                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                <input name="fullName" required placeholder="Full name *" autoComplete="name" aria-label="Full name" className={inputClass} />
                <input name="phone" type="tel" required placeholder="Phone / WhatsApp number *" autoComplete="tel" aria-label="Phone or WhatsApp number" className={inputClass} />
                <select name="purpose" required defaultValue="" aria-label="Purpose of travel" className={inputClass}>
                  <option value="" disabled>
                    Purpose of travel *
                  </option>
                  {purposeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-[#6B6B6B]">
                    First travel date (if known)
                  </span>
                  <input name="travelDate" type="date" aria-label="First travel date" className={inputClass} />
                </label>

                <textarea name="message" rows={3} placeholder="Anything else we should know? (optional)" aria-label="Message" className={`${inputClass} resize-none`} />

                {status === "error" && (
                  <p role="alert" className="rounded-xl border border-[#E0483E]/30 bg-[#FFF3F2] px-3.5 py-3 text-xs text-[#B3261E]">
                    {/activat/i.test(errorMessage)
                      ? "This form needs to be activated. Check apply@admissiononboard.com for the FormSubmit activation email, then try again."
                      : "Your request couldn't be sent. Please try again, or message us on WhatsApp."}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B1B1B] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1366E0] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".3" strokeWidth="3" />
                        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    "Request a callback"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}