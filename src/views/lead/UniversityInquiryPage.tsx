"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaCheckCircle,
  FaChevronRight,
  FaEnvelope,
  FaGlobeAmericas,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShieldAlt,
  FaUniversity,
  FaUserFriends,
} from "react-icons/fa";
import { apiFetch, ApiError, resolveAssetUrl } from "@/lib/api";
import type { StudyLevel, University } from "@/views/student/dashboard/types";

const STUDY_LEVELS: StudyLevel[] = ["Foundation", "Diploma", "Bachelor", "Master"];

const inputClass =
  "w-full rounded-xl border border-[#0B1E3D]/12 bg-gray-50/60 px-3.5 py-2.5 text-sm font-medium text-[#0B1E3D] placeholder:text-[#0B1E3D]/30 transition focus:border-[#1a5fd8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a5fd8]/20";
const selectClass = `${inputClass} appearance-none`;

const HIGHLIGHTS = [
  { icon: FaGraduationCap, text: "Guided course & university shortlisting" },
  { icon: FaShieldAlt, text: "End-to-end application & visa support" },
  { icon: FaUserFriends, text: "Free 1-on-1 counselling with our advisors" },
];

export default function UniversityInquiryPage({ universityId }: { universityId: string }) {
  const [university, setUniversity] = useState<University | null>(null);
  const [loadError, setLoadError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredStudyLevel, setPreferredStudyLevel] = useState<StudyLevel | "">("");
  const [intakeId, setIntakeId] = useState("");
  const [wantsContact, setWantsContact] = useState(false);
  const [wantsUpdates, setWantsUpdates] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setUniversity(null);
    setLoadError("");
    apiFetch<University>(`/universities/${universityId}`)
      .then(setUniversity)
      .catch((err) => setLoadError(err instanceof ApiError ? err.message : "Failed to load this university."));
  }, [universityId]);

  const intakeOptions = useMemo(() => {
    const options: { intakeId: number; label: string }[] = [];
    for (const p of university?.programs ?? []) {
      for (const i of p.intakes ?? []) {
        options.push({ intakeId: i.intakeId, label: `${p.programName} — ${i.intakeName} ${i.intakeYear}` });
      }
    }
    return options;
  }, [university]);

  const missingRequiredField = !firstName || !lastName || !email || !phone;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    if (missingRequiredField) {
      setSubmitError("Please fill in your name, email, and mobile number.");
      return;
    }
    setSubmitting(true);
    try {
      await apiFetch("/leads", {
        method: "POST",
        body: {
          universityId: Number(universityId),
          firstName,
          lastName,
          email,
          phone,
          preferredStudyLevel: preferredStudyLevel || undefined,
          intakeId: intakeId ? Number(intakeId) : undefined,
          wantsContact,
          wantsUpdates,
        },
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadError) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <p className="text-sm font-semibold text-red-700">{loadError}</p>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen animate-pulse bg-gray-50">
        <div className="h-72 w-full bg-gray-200" />
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="h-64 rounded-2xl bg-gray-200" />
        </div>
      </div>
    );
  }

  const heroImage = university.universityImageUrl ?? university.admissionBannerUrl;

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <div className="border-b border-[#0B1E3D]/8 bg-white px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex w-fit items-center gap-2 no-underline">
          <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
            <path
              d="M20 4C11.2 4 4 11.2 4 20s7.2 16 16 16 16-7.2 16-16S28.8 4 20 4zm0 5c6.1 0 11 4.9 11 11s-4.9 11-11 11S9 26.1 9 20 13.9 9 20 9z"
              fill="#1a5fd8"
            />
            <path d="M20 4v8M20 28v8M4 20h8M28 20h8" stroke="#1a5fd8" strokeWidth="3" strokeLinecap="round" />
            <circle cx="20" cy="20" r="4" fill="#1a5fd8" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-[#1a5fd8]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            AdmissionOnBoard
          </span>
        </Link>
      </div>

      <div className="relative h-64 w-full overflow-hidden sm:h-80">
        {heroImage ? (
          <Image src={resolveAssetUrl(heroImage)!} alt="" fill sizes="100vw" className="object-cover" />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-[#0B1E3D] to-[#1a5fd8]" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-[#0B1E3D]/90 via-[#0B1E3D]/40 to-[#0B1E3D]/10" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            {university.country && (
              <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                <FaGlobeAmericas size={11} />
                Study in {university.country.countryName}
              </p>
            )}
            <div className="mt-3 flex items-center gap-3">
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/90 text-[#1a5fd8]">
                {university.logoUrl ? (
                  <Image
                    src={resolveAssetUrl(university.logoUrl)!}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                ) : (
                  <FaUniversity size={22} />
                )}
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {university.universityName}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-[#1a5fd8]">
              <FaMapMarkerAlt size={11} />
              {university.city ? `${university.city}, ` : ""}
              {university.country?.countryName}
            </p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#0B1E3D] sm:text-3xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Get personalised guidance for {university.universityName}
            </h2>
            <p className="mt-3 max-w-lg text-sm font-medium leading-relaxed text-[#0B1E3D]/60">
              Tell us a little about yourself and one of our education advisors will reach out to help
              you shortlist the right program, prepare your application, and plan your journey.
            </p>

            <ul className="mt-7 space-y-4">
              {HIGHLIGHTS.map((h) => (
                <li key={h.text} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1a5fd8]/10 text-[#1a5fd8]">
                    <h.icon size={14} />
                  </span>
                  <span className="mt-1.5 text-sm font-semibold text-[#0B1E3D]/80">{h.text}</span>
                </li>
              ))}
              {university._count && (
                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1a5fd8]/10 text-[#1a5fd8]">
                    <FaGraduationCap size={14} />
                  </span>
                  <span className="mt-1.5 text-sm font-semibold text-[#0B1E3D]/80">
                    {university._count.programs} programs available to apply for
                  </span>
                </li>
              )}
            </ul>

            {university.eligibilityNotes && (
              <div className="mt-8 rounded-2xl border border-[#0B1E3D]/8 bg-white p-5">
                <h3 className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#0B1E3D]/50">Eligibility</h3>
                <p className="mt-2 whitespace-pre-line text-sm font-medium leading-relaxed text-[#0B1E3D]/70">
                  {university.eligibilityNotes}
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-6 rounded-2xl border border-[#0B1E3D]/8 bg-white p-6 shadow-lg shadow-[#0B1E3D]/5">
              {submitted ? (
                <div className="flex flex-col items-center gap-2 py-8 text-center">
                  <FaCheckCircle className="text-emerald-500" size={30} />
                  <p className="text-base font-extrabold text-[#0B1E3D]">Thanks, {firstName}!</p>
                  <p className="max-w-xs text-sm font-medium text-[#0B1E3D]/50">
                    We've received your inquiry about {university.universityName}. An advisor will reach
                    out to you shortly at {email}.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-extrabold text-[#0B1E3D]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Request Free Guidance
                  </h3>
                  <p className="mt-1 text-xs font-medium text-[#0B1E3D]/45">No cost. No obligation.</p>

                  <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                    {submitError && (
                      <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
                        {submitError}
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        className={inputClass}
                        placeholder="First name *"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                      <input
                        className={inputClass}
                        placeholder="Last name *"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="relative">
                      <FaEnvelope className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0B1E3D]/30" size={13} />
                      <input
                        type="email"
                        className={`${inputClass} pl-9`}
                        placeholder="Email address *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="relative">
                      <FaPhoneAlt className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0B1E3D]/30" size={12} />
                      <input
                        className={`${inputClass} pl-9`}
                        placeholder="Mobile number, e.g. +880 1XXXXXXXXX *"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <select
                      className={selectClass}
                      value={preferredStudyLevel}
                      onChange={(e) => setPreferredStudyLevel(e.target.value as StudyLevel | "")}>
                      <option value="">Preferred study level</option>
                      {STUDY_LEVELS.map((lvl) => (
                        <option key={lvl} value={lvl}>
                          {lvl}
                        </option>
                      ))}
                    </select>
                    {intakeOptions.length > 0 && (
                      <select className={selectClass} value={intakeId} onChange={(e) => setIntakeId(e.target.value)}>
                        <option value="">When would you like to start?</option>
                        {intakeOptions.map((o) => (
                          <option key={o.intakeId} value={o.intakeId}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    )}

                    <label className="flex items-start gap-2 text-xs font-medium text-[#0B1E3D]/60">
                      <input
                        type="checkbox"
                        checked={wantsContact}
                        onChange={(e) => setWantsContact(e.target.checked)}
                        className="mt-0.5 accent-[#1a5fd8]"
                      />
                      Please contact me by phone, email, or SMS to assist with my inquiry.
                    </label>
                    <label className="flex items-start gap-2 text-xs font-medium text-[#0B1E3D]/60">
                      <input
                        type="checkbox"
                        checked={wantsUpdates}
                        onChange={(e) => setWantsUpdates(e.target.checked)}
                        className="mt-0.5 accent-[#1a5fd8]"
                      />
                      Send me updates and offers about studying abroad.
                    </label>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a5fd8] py-3 text-sm font-bold text-white transition hover:bg-[#1551b9] disabled:cursor-not-allowed disabled:opacity-60">
                      {submitting ? "Submitting…" : "Request Free Guidance"}
                      {!submitting && <FaChevronRight size={11} />}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
