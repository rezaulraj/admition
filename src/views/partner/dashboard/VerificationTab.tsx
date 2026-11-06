"use client";

import React, { useEffect, useState } from "react";
import { FaCheck, FaCheckCircle, FaClock, FaEye, FaFileUpload, FaTimesCircle } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { fetchAuthenticatedFileUrl } from "@/lib/api";
import { useToast } from "@/lib/toast-context";
import { AGENT_DOC_TYPES, AGENT_DOC_LABELS, type AgentDocType } from "@/lib/agent-documents";
import {
  Card,
  ErrorState,
  FieldLabel,
  FilePreviewModal,
  LoadingState,
  PrimaryButton,
  SecondaryButton,
  SectionHeading,
  inputClass,
} from "@/components/dashboard/common/ui";
import type { AgentProfile } from "./types";

const STEP_TITLES = ["Company & Owner", "Contact Person", "Documents"];

function docPath(profile: AgentProfile, docType: AgentDocType): string | null {
  switch (docType) {
    case "identity":
      return profile.identityDocFilePath;
    case "trade-license":
      return profile.tradeLicenseFilePath;
    case "owner-photo":
      return profile.ownerPhotoFilePath;
  }
}

function computeInitialStep(profile: AgentProfile): number {
  if (!profile.companyName || !profile.fullName || !profile.phone || !profile.businessRegistrationAddress || profile.staffCount == null) {
    return 1;
  }
  if (!profile.contactPersonName || !profile.contactPersonDesignation || !profile.contactPersonPhone || !profile.contactPersonEmail) {
    return 2;
  }
  return 3;
}

export default function VerificationTab() {
  const { authFetch } = useAuth();

  const [profile, setProfile] = useState<AgentProfile | null>(null);
  const [loadError, setLoadError] = useState("");
  const [step, setStep] = useState(1);
  const [stepInitialized, setStepInitialized] = useState(false);

  const load = () => {
    setLoadError("");
    authFetch<AgentProfile>("/agents/me")
      .then((p) => {
        setProfile(p);
        if (!stepInitialized) {
          setStep(computeInitialStep(p));
          setStepInitialized(true);
        }
      })
      .catch((err) => setLoadError(err instanceof ApiError ? err.message : "Failed to load your verification status."));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loadError) return <ErrorState message={loadError} onRetry={load} />;
  if (!profile) return <LoadingState label="Loading your verification status…" />;

  const needsWizard = !profile.verificationSubmittedAt || Boolean(profile.kycReviewNote) || profile.approvalStatus === "Rejected";

  return (
    <div className="fade-in space-y-6">
      <SectionHeading
        title="Partner Verification"
        subtitle="Complete these steps so admin can review and approve your account."
      />

      {profile.kycReviewNote && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
          <span className="font-extrabold">Admin flagged an issue:</span> {profile.kycReviewNote}
        </div>
      )}

      {profile.approvalStatus === "Rejected" && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          Your account was rejected. Please review your details below and submit again.
        </div>
      )}

      {needsWizard ? (
        <WizardSteps
          profile={profile}
          step={step}
          setStep={setStep}
          onProfileChange={setProfile}
        />
      ) : (
        <StatusScreen profile={profile} />
      )}
    </div>
  );
}

function StatusScreen({ profile }: { profile: AgentProfile }) {
  if (profile.approvalStatus === "Approved") {
    return (
      <Card>
        <div className="flex flex-col items-center py-10 text-center">
          <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <FaCheckCircle size={26} />
          </span>
          <p className="text-lg font-extrabold text-[#0B1E3D]">You&apos;re verified</p>
          <p className="mt-1.5 max-w-md text-sm font-medium text-[#0B1E3D]/50">
            Your partner account is approved. You can now submit student applications.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex flex-col items-center py-10 text-center">
        <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <FaClock size={24} />
        </span>
        <p className="text-lg font-extrabold text-[#0B1E3D]">Thank you for completing verification</p>
        <p className="mt-1.5 max-w-md text-sm font-medium text-[#0B1E3D]/50">
          Your account is under review. We&apos;ll notify you by email once admin approves your account —
          you&apos;ll then be able to submit student applications.
        </p>
      </div>
    </Card>
  );
}

function StepProgress({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2">
      {STEP_TITLES.map((title, i) => {
        const n = i + 1;
        const done = n < step;
        const active = n === step;
        return (
          <React.Fragment key={title}>
            <div className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                  done
                    ? "bg-emerald-500 text-white"
                    : active
                      ? "bg-[#1E3A8A] text-white"
                      : "bg-[#0B1E3D]/8 text-[#0B1E3D]/40"
                }`}
              >
                {done ? <FaCheck size={10} /> : n}
              </span>
              <span className={`hidden text-xs font-bold sm:block ${active ? "text-[#0B1E3D]" : "text-[#0B1E3D]/40"}`}>
                {title}
              </span>
            </div>
            {n < STEP_TITLES.length && <div className="h-px w-6 flex-1 bg-[#0B1E3D]/10 sm:w-10" />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function WizardSteps({
  profile,
  step,
  setStep,
  onProfileChange,
}: {
  profile: AgentProfile;
  step: number;
  setStep: (s: number) => void;
  onProfileChange: (p: AgentProfile) => void;
}) {
  const { authFetch } = useAuth();
  const { showToast } = useToast();

  const [companyName, setCompanyName] = useState(profile.companyName ?? "");
  const [ownerName, setOwnerName] = useState(profile.fullName ?? "");
  const [ownerPhone, setOwnerPhone] = useState(profile.phone ?? "");
  const [businessRegistrationAddress, setBusinessRegistrationAddress] = useState(profile.businessRegistrationAddress ?? "");
  const [staffCount, setStaffCount] = useState(profile.staffCount != null ? String(profile.staffCount) : "");

  const [contactPersonName, setContactPersonName] = useState(profile.contactPersonName ?? "");
  const [contactPersonDesignation, setContactPersonDesignation] = useState(profile.contactPersonDesignation ?? "");
  const [contactPersonPhone, setContactPersonPhone] = useState(profile.contactPersonPhone ?? "");
  const [contactPersonEmail, setContactPersonEmail] = useState(profile.contactPersonEmail ?? "");

  const [saving, setSaving] = useState(false);
  const [stepError, setStepError] = useState("");
  const [uploadingDoc, setUploadingDoc] = useState<AgentDocType | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState<{ url: string; mimeType: string; title: string } | null>(null);
  const { accessToken } = useAuth();

  const handleNextStep1 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStepError("");
    setSaving(true);
    try {
      const updated = await authFetch<AgentProfile>("/agents/me", {
        method: "PATCH",
        body: {
          companyName,
          fullName: ownerName,
          phone: ownerPhone,
          businessRegistrationAddress,
          staffCount: Number(staffCount),
        },
      });
      onProfileChange(updated);
      setStep(2);
    } catch (err) {
      setStepError(err instanceof ApiError ? err.message : "Could not save these details.");
    } finally {
      setSaving(false);
    }
  };

  const handleNextStep2 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStepError("");
    setSaving(true);
    try {
      const updated = await authFetch<AgentProfile>("/agents/me", {
        method: "PATCH",
        body: { contactPersonName, contactPersonDesignation, contactPersonPhone, contactPersonEmail },
      });
      onProfileChange(updated);
      setStep(3);
    } catch (err) {
      setStepError(err instanceof ApiError ? err.message : "Could not save these details.");
    } finally {
      setSaving(false);
    }
  };

  const handleDocUpload = async (docType: AgentDocType, file: File) => {
    setUploadingDoc(docType);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const updated = await authFetch<AgentProfile>(`/agents/me/documents/${docType}`, {
        method: "POST",
        body: formData,
      });
      onProfileChange(updated);
      showToast(`${AGENT_DOC_LABELS[docType]} uploaded.`, "success");
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not upload the document.", "error");
    } finally {
      setUploadingDoc(null);
    }
  };

  const handleDocView = async (docType: AgentDocType) => {
    try {
      const { url, mimeType } = await fetchAuthenticatedFileUrl(
        `/agents/${profile.agentId}/documents/${docType}`,
        accessToken,
      );
      setPreview({ url, mimeType, title: AGENT_DOC_LABELS[docType] });
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Could not open the document.", "error");
    }
  };

  const closePreview = () => {
    if (preview) URL.revokeObjectURL(preview.url);
    setPreview(null);
  };

  const allDocsUploaded = AGENT_DOC_TYPES.every((t) => Boolean(docPath(profile, t)));

  const handleSubmitForReview = async () => {
    setStepError("");
    setSubmitting(true);
    try {
      const updated = await authFetch<AgentProfile>("/agents/me/verification/submit", { method: "PATCH" });
      onProfileChange(updated);
      showToast("Verification submitted for admin review.", "success");
    } catch (err) {
      setStepError(err instanceof ApiError ? err.message : "Could not submit for review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <div className="mb-6 overflow-x-auto">
        <StepProgress step={step} />
      </div>

      {stepError && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
          {stepError}
        </div>
      )}

      {step === 1 && (
        <form onSubmit={handleNextStep1} className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.06em] text-[#0B1E3D]/40">Step 1 — Company &amp; Owner</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Company full name</FieldLabel>
              <input className={inputClass} value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
            </div>
            <div>
              <FieldLabel>Owner name</FieldLabel>
              <input className={inputClass} value={ownerName} onChange={(e) => setOwnerName(e.target.value)} required />
            </div>
            <div>
              <FieldLabel>Owner phone number</FieldLabel>
              <input className={inputClass} value={ownerPhone} onChange={(e) => setOwnerPhone(e.target.value)} placeholder="+1 555 123 4567" required />
            </div>
            <div>
              <FieldLabel>Owner email ID</FieldLabel>
              <input className={inputClass} value={profile.email} disabled />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel>Business registration address</FieldLabel>
              <input
                className={inputClass}
                value={businessRegistrationAddress}
                onChange={(e) => setBusinessRegistrationAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <FieldLabel>How many staff do you have?</FieldLabel>
              <input
                type="number"
                min={0}
                className={inputClass}
                value={staffCount}
                onChange={(e) => setStaffCount(e.target.value)}
                required
              />
            </div>
          </div>
          <PrimaryButton type="submit" disabled={saving}>
            {saving ? "Saving…" : "Next: Contact Person"}
          </PrimaryButton>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleNextStep2} className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.06em] text-[#0B1E3D]/40">Step 2 — Contact Person Details</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Name</FieldLabel>
              <input className={inputClass} value={contactPersonName} onChange={(e) => setContactPersonName(e.target.value)} required />
            </div>
            <div>
              <FieldLabel>Designation</FieldLabel>
              <input className={inputClass} value={contactPersonDesignation} onChange={(e) => setContactPersonDesignation(e.target.value)} required />
            </div>
            <div>
              <FieldLabel>Phone number</FieldLabel>
              <input className={inputClass} value={contactPersonPhone} onChange={(e) => setContactPersonPhone(e.target.value)} placeholder="+1 555 123 4567" required />
            </div>
            <div>
              <FieldLabel>Email</FieldLabel>
              <input type="email" className={inputClass} value={contactPersonEmail} onChange={(e) => setContactPersonEmail(e.target.value)} required />
            </div>
          </div>
          <div className="flex gap-3">
            <PrimaryButton type="submit" disabled={saving}>
              {saving ? "Saving…" : "Next: Documents"}
            </PrimaryButton>
            <SecondaryButton type="button" onClick={() => setStep(1)} disabled={saving}>
              Back
            </SecondaryButton>
          </div>
        </form>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.06em] text-[#0B1E3D]/40">Step 3 — Upload Documents</p>
          <div className="space-y-3">
            {AGENT_DOC_TYPES.map((docType) => {
              const uploaded = Boolean(docPath(profile, docType));
              const isUploading = uploadingDoc === docType;
              return (
                <div
                  key={docType}
                  className="flex flex-col gap-3 rounded-xl bg-gray-50/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <FaFileUpload className={uploaded ? "text-emerald-600" : "text-[#0B1E3D]/30"} size={16} />
                    <div>
                      <p className="text-sm font-bold text-[#0B1E3D]">{AGENT_DOC_LABELS[docType]}</p>
                      <p className={`text-xs font-semibold ${uploaded ? "text-emerald-600" : "text-[#0B1E3D]/40"}`}>
                        {uploaded ? "Uploaded" : "Not uploaded yet"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {uploaded && (
                      <button
                        type="button"
                        onClick={() => handleDocView(docType)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E3A8A]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#1E3A8A] transition hover:bg-[#1E3A8A]/5"
                      >
                        <FaEye size={11} /> View
                      </button>
                    )}
                    <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#0B1E3D] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#0B1E3D]/90">
                      <FaFileUpload size={11} />
                      {isUploading ? "Uploading…" : uploaded ? "Replace" : "Upload"}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,application/pdf"
                        className="hidden"
                        disabled={isUploading}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          e.target.value = "";
                          if (file) handleDocUpload(docType, file);
                        }}
                      />
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-3">
            <PrimaryButton onClick={handleSubmitForReview} disabled={!allDocsUploaded || submitting}>
              {submitting ? "Submitting…" : "Submit for Review"}
            </PrimaryButton>
            <SecondaryButton type="button" onClick={() => setStep(2)} disabled={submitting}>
              Back
            </SecondaryButton>
          </div>
          {!allDocsUploaded && (
            <p className="flex items-center gap-1.5 text-xs font-semibold text-[#0B1E3D]/40">
              <FaTimesCircle size={11} /> Upload all 3 documents to submit for review.
            </p>
          )}
        </div>
      )}

      {preview && (
        <FilePreviewModal url={preview.url} mimeType={preview.mimeType} title={preview.title} onClose={closePreview} />
      )}
    </Card>
  );
}
