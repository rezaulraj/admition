"use client";

import React, { useEffect, useState } from "react";
import { FaChevronDown, FaExternalLinkAlt, FaFileAlt } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { resolveAssetUrl } from "@/lib/api";
import { useToast } from "@/lib/toast-context";
import {
  Badge,
  Card,
  EmptyState,
  ErrorState,
  FieldLabel,
  LoadingState,
  PrimaryButton,
  SectionHeading,
  inputClass,
  selectClass,
} from "@/components/dashboard/common/ui";
import { PaginationControls, usePagination } from "@/components/dashboard/common/Pagination";
import type { Application, ApplicationStatus, DocumentRecord } from "@/views/student/dashboard/types";
import { FEE_STATUS_COLORS, FEE_STATUS_LABELS, STATUS_COLORS, STATUS_LABELS } from "@/views/student/dashboard/types";

const STATUSES: ApplicationStatus[] = [
  "Submitted",
  "UnderReview",
  "OfferIssued",
  "OfferAccepted",
  "VisaApplied",
  "VisaApproved",
  "Enrolled",
  "Rejected",
  "Withdrawn",
];

const VERIFICATION_COLORS: Record<DocumentRecord["verificationStatus"], string> = {
  Pending: "#a16207",
  Verified: "#15803d",
  Rejected: "#dc2626",
};

export default function ApplicationsTab() {
  const { authFetch } = useAuth();
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState("");

  const load = () => {
    setError("");
    setApplications(null);
    const params = filterStatus ? `?status=${filterStatus}` : "";
    authFetch<Application[]>(`/applications${params}`)
      .then(setApplications)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load applications."));
  };

  useEffect(load, [filterStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  const { page, setPage, pageSize, setPageSize, totalPages, totalItems, pageItems } = usePagination(
    applications ?? [],
  );

  return (
    <div className="fade-in">
      <SectionHeading title="Applications" subtitle="Every application submitted across the platform." />

      <div className="mb-4 flex items-center gap-3">
        <div className="w-56">
          <FieldLabel>Filter by status</FieldLabel>
          <select className={selectClass} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {applications === null && !error && <LoadingState label="Loading applications…" />}
      {error && <ErrorState message={error} onRetry={load} />}
      {applications && applications.length === 0 && <EmptyState title="No applications match this filter" />}

      {applications && applications.length > 0 && (
        <>
          <div className="space-y-3">
            {pageItems.map((app) => (
              <ApplicationRow
                key={app.applicationId}
                app={app}
                isOpen={expandedId === app.applicationId}
                onToggle={() => setExpandedId(expandedId === app.applicationId ? null : app.applicationId)}
                onChanged={load}
              />
            ))}
          </div>
          <PaginationControls
            page={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </>
      )}
    </div>
  );
}

function ApplicationRow({
  app,
  isOpen,
  onToggle,
  onChanged,
}: {
  app: Application;
  isOpen: boolean;
  onToggle: () => void;
  onChanged: () => void;
}) {
  const { authFetch } = useAuth();
  const { showToast } = useToast();
  const [status, setStatus] = useState<ApplicationStatus>(app.currentStatus);
  const [remarks, setRemarks] = useState("");
  const [saving, setSaving] = useState(false);
  const [verifyingId, setVerifyingId] = useState<number | null>(null);

  const [feeReference, setFeeReference] = useState(app.feePaymentRef ?? "");
  const [feeNotes, setFeeNotes] = useState(app.feeNotes ?? "");
  const [confirmingFee, setConfirmingFee] = useState(false);

  const handleConfirmFee = async (feeStatus: "Paid" | "Unpaid") => {
    setConfirmingFee(true);
    try {
      await authFetch(`/applications/${app.applicationId}/fee-payment/confirm`, {
        method: "PATCH",
        body: { status: feeStatus, reference: feeReference || undefined, notes: feeNotes || undefined },
      });
      showToast(feeStatus === "Paid" ? "Fee marked as paid." : "Fee reverted to unpaid.", "success");
      onChanged();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not update the fee payment status.", "error");
    } finally {
      setConfirmingFee(false);
    }
  };

  const handleStatusUpdate = async () => {
    setSaving(true);
    try {
      await authFetch(`/applications/${app.applicationId}/status`, {
        method: "PATCH",
        body: { status, remarks: remarks || undefined },
      });
      setRemarks("");
      showToast(`Status updated to ${STATUS_LABELS[status]}.`, "success");
      onChanged();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not update status.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleVerify = async (documentId: number, verificationStatus: DocumentRecord["verificationStatus"]) => {
    setVerifyingId(documentId);
    try {
      await authFetch(`/documents/${documentId}/verify`, { method: "PATCH", body: { verificationStatus } });
      showToast(`Document marked as ${verificationStatus.toLowerCase()}.`, "success");
      onChanged();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not update document verification.", "error");
    } finally {
      setVerifyingId(null);
    }
  };

  return (
    <Card className="p-0">
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left">
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B1E3D]/10 text-[#0B1E3D]">
            <FaFileAlt size={15} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#0B1E3D]">{app.intake.program.programName}</p>
            <p className="truncate text-xs font-medium text-[#0B1E3D]/45">
              {app.student?.fullName ?? "Student"} · {app.intake.program.university.universityName} ·{" "}
              {app.agent?.fullName ?? "Direct"}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Badge label={FEE_STATUS_LABELS[app.feeStatus]} color={FEE_STATUS_COLORS[app.feeStatus]} />
          <Badge label={STATUS_LABELS[app.currentStatus]} color={STATUS_COLORS[app.currentStatus]} />
          <FaChevronDown size={12} className={`text-[#0B1E3D]/30 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-[#0B1E3D]/8 px-5 py-4 space-y-5">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#0B1E3D]/40">
                Application fee
              </p>
              <p className="text-sm font-bold text-[#0B1E3D]">
                {app.intake.program.currency} {Number(app.intake.program.applicationFee).toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl bg-gray-50/70 p-4">
              <div className="mb-3 flex items-center justify-between">
                <Badge label={FEE_STATUS_LABELS[app.feeStatus]} color={FEE_STATUS_COLORS[app.feeStatus]} />
                {app.feePaidAt && (
                  <p className="text-xs font-medium text-[#0B1E3D]/45">
                    Confirmed {new Date(app.feePaidAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <FieldLabel>Receipt</FieldLabel>
                {app.feeReceiptUrl ? (
                  <a
                    href={resolveAssetUrl(app.feeReceiptUrl)!}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#1a5fd8]/10 px-3 py-1.5 text-xs font-bold text-[#1a5fd8] transition hover:bg-[#1a5fd8]/15"
                  >
                    View uploaded receipt <FaExternalLinkAlt size={9} />
                  </a>
                ) : (
                  <p className="text-xs font-semibold text-amber-600">
                    No receipt uploaded yet — ask the student/agent to attach proof before confirming.
                  </p>
                )}
              </div>
              <div className="flex flex-wrap items-end gap-3">
                <div className="flex-1 min-w-50">
                  <FieldLabel>Payment reference</FieldLabel>
                  <input
                    className={inputClass}
                    value={feeReference}
                    onChange={(e) => setFeeReference(e.target.value)}
                    placeholder="Student-submitted or admin-entered transaction ID"
                  />
                </div>
                <div className="flex-1 min-w-50">
                  <FieldLabel>Note (optional)</FieldLabel>
                  <input className={inputClass} value={feeNotes} onChange={(e) => setFeeNotes(e.target.value)} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <PrimaryButton onClick={() => handleConfirmFee("Paid")} disabled={confirmingFee || app.feeStatus === "Paid"}>
                  {confirmingFee ? "Saving…" : "Confirm fee received"}
                </PrimaryButton>
                {app.feeStatus === "Paid" && (
                  <button
                    onClick={() => handleConfirmFee("Unpaid")}
                    disabled={confirmingFee}
                    className="text-xs font-bold text-red-600 hover:underline disabled:opacity-50"
                  >
                    Revert to unpaid
                  </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0B1E3D]/40">
              Update status
            </p>
            <div className="flex flex-wrap items-end gap-3">
              <div className="w-48">
                <FieldLabel>Status</FieldLabel>
                <select
                  className={selectClass}
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <FieldLabel>Remarks (optional)</FieldLabel>
                <input className={inputClass} value={remarks} onChange={(e) => setRemarks(e.target.value)} />
              </div>
              <PrimaryButton onClick={handleStatusUpdate} disabled={saving || status === app.currentStatus}>
                {saving ? "Updating…" : "Update status"}
              </PrimaryButton>
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0B1E3D]/40">
              Status history
            </p>
            <ul className="space-y-2">
              {app.statusHistory.map((h) => (
                <li key={h.historyId} className="flex items-start gap-3 text-xs">
                  <Badge label={STATUS_LABELS[h.status]} color={STATUS_COLORS[h.status]} />
                  <p className="font-medium text-[#0B1E3D]/70">
                    {new Date(h.changedAt).toLocaleDateString()}
                    {h.remarks ? ` — ${h.remarks}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
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
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-gray-50/70 px-3 py-2"
                  >
                    <span className="text-xs font-semibold text-[#0B1E3D]">{doc.docType}</span>
                    <div className="flex items-center gap-2">
                      <Badge label={doc.verificationStatus} color={VERIFICATION_COLORS[doc.verificationStatus]} />
                      {doc.verificationStatus !== "Verified" && (
                        <button
                          onClick={() => handleVerify(doc.documentId, "Verified")}
                          disabled={verifyingId === doc.documentId}
                          className="text-[11px] font-bold text-emerald-600 hover:underline disabled:opacity-50"
                        >
                          Verify
                        </button>
                      )}
                      {doc.verificationStatus !== "Rejected" && (
                        <button
                          onClick={() => handleVerify(doc.documentId, "Rejected")}
                          disabled={verifyingId === doc.documentId}
                          className="text-[11px] font-bold text-red-600 hover:underline disabled:opacity-50"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
