"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FaChevronDown, FaFileAlt, FaMoneyCheckAlt } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";
import {
  Badge,
  Card,
  EmptyState,
  ErrorState,
  FieldLabel,
  inputClass,
  LoadingState,
  PrimaryButton,
  SecondaryButton,
  SectionHeading,
} from "@/components/dashboard/common/ui";
import { PaginationControls, usePagination } from "@/components/dashboard/common/Pagination";
import BankAccountPicker from "@/components/dashboard/common/BankAccountPicker";
import ReceiptUploader from "@/components/dashboard/common/ReceiptUploader";
import type { Application } from "@/views/student/dashboard/types";
import { FEE_STATUS_COLORS, FEE_STATUS_LABELS, STATUS_COLORS, STATUS_LABELS } from "@/views/student/dashboard/types";

export default function ApplicationsTab() {
  const { authFetch } = useAuth();
  const { showToast } = useToast();
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [bulkReference, setBulkReference] = useState("");
  const [bulkReceiptUrl, setBulkReceiptUrl] = useState("");
  const [bulkSubmitting, setBulkSubmitting] = useState(false);

  const load = () => {
    setError("");
    setApplications(null);
    authFetch<Application[]>("/applications")
      .then(setApplications)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load applications."));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { page, setPage, pageSize, setPageSize, totalPages, totalItems, pageItems } = usePagination(
    applications ?? [],
  );

  const payableApplications = useMemo(
    () => (applications ?? []).filter((a) => a.feeStatus !== "Paid"),
    [applications],
  );

  const toggleSelect = (applicationId: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(applicationId)) next.delete(applicationId);
      else next.add(applicationId);
      return next;
    });
  };

  const allPayableSelected = payableApplications.length > 0 && payableApplications.every((a) => selectedIds.has(a.applicationId));

  const toggleSelectAllPayable = () => {
    if (allPayableSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(payableApplications.map((a) => a.applicationId)));
    }
  };

  const handleBulkSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bulkReceiptUrl) {
      showToast("Please upload the payment receipt before submitting.", "error");
      return;
    }
    setBulkSubmitting(true);
    try {
      const result = await authFetch<{ updated: number[]; skipped: { applicationId: number; reason: string }[] }>(
        "/applications/fee-payment/bulk",
        {
          method: "PATCH",
          body: { applicationIds: Array.from(selectedIds), reference: bulkReference, receiptUrl: bulkReceiptUrl },
        },
      );
      const skippedCount = result.skipped.length;
      showToast(
        skippedCount > 0
          ? `Reference submitted for ${result.updated.length} application(s). ${skippedCount} skipped (already paid or inaccessible).`
          : `Reference submitted for ${result.updated.length} application(s).`,
        "success",
      );
      setSelectedIds(new Set());
      setBulkReference("");
      setBulkReceiptUrl("");
      load();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not submit bulk payment.", "error");
    } finally {
      setBulkSubmitting(false);
    }
  };

  return (
    <div className="fade-in">
      <SectionHeading title="Applications" subtitle="Every student application you've submitted, and its current status." />

      {applications === null && !error && <LoadingState label="Loading applications…" />}
      {error && <ErrorState message={error} onRetry={load} />}

      {applications && applications.length === 0 && (
        <EmptyState
          title="No applications yet"
          description="Applications you submit for your students will show up here."
        />
      )}

      {applications && applications.length > 0 && (
        <>
          {payableApplications.length > 0 && (
            <Card className="mb-4 border-[#1a5fd8]/20 bg-[#1a5fd8]/3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="flex cursor-pointer items-center gap-2.5 text-sm font-bold text-[#0B1E3D]">
                  <input
                    type="checkbox"
                    checked={allPayableSelected}
                    onChange={toggleSelectAllPayable}
                    className="h-4 w-4 rounded border-[#0B1E3D]/25 accent-[#1a5fd8]"
                  />
                  Select all unpaid ({payableApplications.length})
                </label>
                {selectedIds.size > 0 && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a5fd8]">
                    <FaMoneyCheckAlt size={12} />
                    {selectedIds.size} selected for bulk payment
                  </span>
                )}
              </div>

              {selectedIds.size > 0 && (
                <form onSubmit={handleBulkSubmit} className="mt-3 space-y-3 border-t border-[#1a5fd8]/15 pt-3">
                  <BankAccountPicker />
                  <div className="flex flex-wrap items-end gap-3">
                  <div className="min-w-50 flex-1">
                    <FieldLabel>Payment reference (one transfer covering all selected students)</FieldLabel>
                    <input
                      className={inputClass}
                      value={bulkReference}
                      onChange={(e) => setBulkReference(e.target.value)}
                      placeholder="e.g. BKASH-TXN-4471"
                      required
                    />
                  </div>
                  <ReceiptUploader
                    value={bulkReceiptUrl}
                    onChange={setBulkReceiptUrl}
                    endpoint="/applications/fee-payment/receipt"
                  />
                  <PrimaryButton type="submit" disabled={bulkSubmitting}>
                    {bulkSubmitting ? "Submitting…" : `Pay for ${selectedIds.size} application(s)`}
                  </PrimaryButton>
                  <SecondaryButton
                    type="button"
                    onClick={() => {
                      setSelectedIds(new Set());
                      setBulkReceiptUrl("");
                    }}
                    disabled={bulkSubmitting}
                  >
                    Clear
                  </SecondaryButton>
                  </div>
                </form>
              )}
            </Card>
          )}

          <div className="space-y-3">
            {pageItems.map((app) => (
              <ApplicationRow
                key={app.applicationId}
                app={app}
                isOpen={expandedId === app.applicationId}
                onToggle={() => setExpandedId(expandedId === app.applicationId ? null : app.applicationId)}
                onRefresh={load}
                selectable={app.feeStatus !== "Paid"}
                selected={selectedIds.has(app.applicationId)}
                onToggleSelect={() => toggleSelect(app.applicationId)}
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
  onRefresh,
  selectable,
  selected,
  onToggleSelect,
}: {
  app: Application;
  isOpen: boolean;
  onToggle: () => void;
  onRefresh: () => void;
  selectable: boolean;
  selected: boolean;
  onToggleSelect: () => void;
}) {
  const { authFetch } = useAuth();
  const { showToast } = useToast();
  const [reference, setReference] = useState(app.feePaymentRef ?? "");
  const [receiptUrl, setReceiptUrl] = useState(app.feeReceiptUrl ?? "");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReference = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!receiptUrl) {
      showToast("Please upload the payment receipt before submitting.", "error");
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
      showToast(err instanceof ApiError ? err.message : "Could not submit the payment reference.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="p-0">
      <div className="flex items-center gap-3 px-5 py-4">
        {selectable && (
          <input
            type="checkbox"
            checked={selected}
            onClick={(e) => e.stopPropagation()}
            onChange={onToggleSelect}
            className="h-4 w-4 shrink-0 rounded border-[#0B1E3D]/25 accent-[#1a5fd8]"
            aria-label={`Select ${app.student?.fullName ?? "student"}'s application for bulk payment`}
          />
        )}
        <button onClick={onToggle} className="flex flex-1 min-w-0 items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A]">
              <FaFileAlt size={15} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#0B1E3D]">
                {app.intake.program.programName}
              </p>
              <p className="truncate text-xs font-medium text-[#0B1E3D]/45">
                {app.intake.program.university.universityName} · {app.intake.intakeName} {app.intake.intakeYear}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 text-right sm:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#0B1E3D]/35">Student</p>
            <p className="text-sm font-bold text-[#0B1E3D]">{app.student?.fullName ?? "—"}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Badge label={FEE_STATUS_LABELS[app.feeStatus]} color={FEE_STATUS_COLORS[app.feeStatus]} />
            <Badge label={STATUS_LABELS[app.currentStatus]} color={STATUS_COLORS[app.currentStatus]} />
            <FaChevronDown
              size={12}
              className={`text-[#0B1E3D]/30 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
        </button>
      </div>
      <p className="px-5 pb-3 -mt-2 text-xs font-medium text-[#0B1E3D]/45 sm:hidden">
        Student: <span className="font-bold text-[#0B1E3D]">{app.student?.fullName ?? "—"}</span>
      </p>

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
            {app.feeStatus === "Pending" && (
              <p className="mt-2 text-xs font-medium text-amber-600">
                Awaiting admin confirmation. This will update once it's verified.
              </p>
            )}
          </div>

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
      )}
    </Card>
  );
}
