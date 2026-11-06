"use client";

import React, { useEffect, useState } from "react";
import { FaChevronDown, FaFileAlt } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";
import { Badge, Card, EmptyState, ErrorState, FieldLabel, inputClass, LoadingState, PrimaryButton, SectionHeading, StatusBadge } from "./ui";
import BankAccountPicker from "@/components/dashboard/common/BankAccountPicker";
import ReceiptUploader from "@/components/dashboard/common/ReceiptUploader";
import { FEE_STATUS_COLORS, FEE_STATUS_LABELS } from "./types";
import type { Application } from "./types";

export default function MyApplicationsTab() {
  const { authFetch } = useAuth();
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const load = () => {
    setError("");
    setApplications(null);
    authFetch<Application[]>("/applications")
      .then(setApplications)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load your applications."));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fade-in">
      <SectionHeading
        title="My Application"
        subtitle="Track every application you've submitted and its current status."
      />

      {applications === null && !error && <LoadingState label="Loading your applications…" />}
      {error && <ErrorState message={error} onRetry={load} />}

      {applications && applications.length === 0 && (
        <EmptyState
          title="No applications yet"
          description="Once you submit an application from the New Application tab, it will show up here."
        />
      )}

      {applications && applications.length > 0 && (
        <div className="space-y-3">
          {applications.map((app) => (
            <ApplicationCard
              key={app.applicationId}
              app={app}
              isOpen={expandedId === app.applicationId}
              onToggle={() => setExpandedId(expandedId === app.applicationId ? null : app.applicationId)}
              onRefresh={load}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ApplicationCard({
  app,
  isOpen,
  onToggle,
  onRefresh,
}: {
  app: Application;
  isOpen: boolean;
  onToggle: () => void;
  onRefresh: () => void;
}) {
  const { authFetch } = useAuth();
  const { showToast } = useToast();
  const [reference, setReference] = useState(app.feePaymentRef ?? "");
  const [receiptUrl, setReceiptUrl] = useState(app.feeReceiptUrl ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [feeError, setFeeError] = useState("");

  const handleSubmitReference = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeeError("");
    if (!receiptUrl) {
      setFeeError("Please upload your payment receipt before submitting.");
      return;
    }
    setSubmitting(true);
    try {
      await authFetch(`/applications/${app.applicationId}/fee-payment`, {
        method: "PATCH",
        body: { reference, receiptUrl },
      });
      showToast("Payment reference submitted.", "success");
      onRefresh();
    } catch (err) {
      setFeeError(err instanceof ApiError ? err.message : "Could not submit your payment reference.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="p-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1a5fd8]/10 text-[#1a5fd8]">
            <FaFileAlt size={15} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#0B1E3D]">
              {app.intake.program.programName}
            </p>
            <p className="truncate text-xs font-medium text-[#0B1E3D]/45">
              {app.intake.program.university.universityName} ·{" "}
              {app.intake.program.university.country?.countryName ?? ""} ·{" "}
              {app.intake.intakeName} {app.intake.intakeYear}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <StatusBadge status={app.currentStatus} />
          <FaChevronDown
            size={12}
            className={`text-[#0B1E3D]/30 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-[#0B1E3D]/8 px-5 py-4">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0B1E3D]/40">
            Applied on
          </p>
          <p className="mb-4 text-sm font-medium text-[#0B1E3D]">
            {new Date(app.appliedDate).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0B1E3D]/40">
            Application fee
          </p>
          <div className="mb-4 rounded-xl bg-gray-50/70 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-[#0B1E3D]">
                {app.intake.program.currency} {Number(app.intake.program.applicationFee).toLocaleString()}
              </p>
              <Badge label={FEE_STATUS_LABELS[app.feeStatus]} color={FEE_STATUS_COLORS[app.feeStatus]} />
            </div>
            {app.feeStatus === "Paid" ? (
              <p className="mt-1.5 text-xs font-medium text-[#0B1E3D]/45">
                Confirmed {app.feePaidAt ? new Date(app.feePaidAt).toLocaleDateString() : ""}
                {app.feePaymentRef ? ` — ref ${app.feePaymentRef}` : ""}
              </p>
            ) : (
              <div className="mt-3 space-y-3">
                <BankAccountPicker />
                <form onSubmit={handleSubmitReference} className="flex flex-wrap items-end gap-2">
                  <div className="min-w-50 flex-1">
                    <FieldLabel>Payment reference (bank/mobile banking transaction ID)</FieldLabel>
                    <input
                      className={inputClass}
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      placeholder="e.g. BKASH-TXN-4471"
                      required
                    />
                  </div>
                  <ReceiptUploader
                    value={receiptUrl}
                    onChange={setReceiptUrl}
                    endpoint="/applications/fee-payment/receipt"
                  />
                  <PrimaryButton type="submit" disabled={submitting}>
                    {submitting ? "Submitting…" : app.feeStatus === "Pending" ? "Update reference" : "Submit reference"}
                  </PrimaryButton>
                </form>
              </div>
            )}
            {feeError && <p className="mt-2 text-xs font-semibold text-red-600">{feeError}</p>}
            {app.feeStatus === "Pending" && !feeError && (
              <p className="mt-2 text-xs font-medium text-amber-600">
                Awaiting admin confirmation. We'll update this once it's verified.
              </p>
            )}
          </div>

          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0B1E3D]/40">
            Status history
          </p>
          <ul className="mb-4 space-y-2">
            {app.statusHistory.map((h) => (
              <li key={h.historyId} className="flex items-start gap-3 text-xs">
                <StatusBadge status={h.status} />
                <div className="min-w-0">
                  <p className="font-medium text-[#0B1E3D]/70">
                    {new Date(h.changedAt).toLocaleDateString()}
                    {h.remarks ? ` — ${h.remarks}` : ""}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0B1E3D]/40">
            Documents
          </p>
          {app.documents.length === 0 ? (
            <p className="text-xs font-medium text-[#0B1E3D]/40">No documents uploaded yet.</p>
          ) : (
            <ul className="space-y-1.5">
              {app.documents.map((doc) => (
                <li
                  key={doc.documentId}
                  className="flex items-center justify-between rounded-lg bg-gray-50/70 px-3 py-2 text-xs font-medium text-[#0B1E3D]/70"
                >
                  <span>{doc.docType}</span>
                  <span
                    className={
                      doc.verificationStatus === "Verified"
                        ? "font-bold text-emerald-600"
                        : doc.verificationStatus === "Rejected"
                          ? "font-bold text-red-600"
                          : "font-bold text-amber-600"
                    }
                  >
                    {doc.verificationStatus}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Card>
  );
}
