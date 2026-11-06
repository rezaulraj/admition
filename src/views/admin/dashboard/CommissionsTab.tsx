"use client";

import React, { useEffect, useState } from "react";
import { useAuth, ApiError } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";
import { apiFetch } from "@/lib/api";
import {
  Badge,
  Card,
  EmptyState,
  ErrorState,
  FieldLabel,
  LoadingState,
  PrimaryButton,
  SecondaryButton,
  SectionHeading,
  inputClass,
  selectClass,
} from "@/components/dashboard/common/ui";
import { PaginationControls, usePagination } from "@/components/dashboard/common/Pagination";
import UniversityCommissionTable, { type CommissionFormValues } from "@/components/dashboard/common/UniversityCommissionTable";
import type { Country, University } from "@/views/student/dashboard/types";
import { PAYOUT_COLORS } from "@/views/partner/dashboard/types";
import type { AdminPayout, Commission } from "./types";
import type { PayoutMethod, PayoutStatus } from "@/views/partner/dashboard/types";

export default function CommissionsTab() {
  const { authFetch } = useAuth();
  const { showToast } = useToast();
  const [commissions, setCommissions] = useState<Commission[] | null>(null);
  const [payouts, setPayouts] = useState<AdminPayout[] | null>(null);
  const [universities, setUniversities] = useState<University[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState("");

  const load = () => {
    setError("");
    setCommissions(null);
    setPayouts(null);
    authFetch<Commission[]>("/commissions").then(setCommissions).catch((err) =>
      setError(err instanceof ApiError ? err.message : "Failed to load commission configs."),
    );
    authFetch<AdminPayout[]>("/commissions/payouts").then(setPayouts).catch(() => setPayouts([]));
  };

  useEffect(() => {
    load();
    apiFetch<University[]>("/universities").then(setUniversities).catch(() => setUniversities([]));
    apiFetch<Country[]>("/countries").then(setCountries).catch(() => setCountries([]));
  }, []);

  const buildRatePayload = (values: Pick<CommissionFormValues, "rateType" | "ratePercent" | "flatAmount" | "currency" | "remark">) =>
    values.rateType === "percent"
      ? { ratePercent: Number(values.ratePercent), flatAmount: undefined, currency: undefined }
      : { ratePercent: undefined, flatAmount: Number(values.flatAmount), currency: values.currency };

  const handleCreate = async (values: CommissionFormValues) => {
    await authFetch("/commissions", {
      method: "POST",
      body: {
        universityId: values.universityId,
        level: values.level || undefined,
        remark: values.remark || undefined,
        ...buildRatePayload(values),
      },
    });
    load();
  };

  const handleUpdate = async (
    commissionId: number,
    values: Pick<CommissionFormValues, "rateType" | "ratePercent" | "flatAmount" | "currency" | "remark">,
  ) => {
    await authFetch(`/commissions/${commissionId}`, {
      method: "PATCH",
      body: {
        remark: values.remark || undefined,
        ...buildRatePayload(values),
      },
    });
    load();
  };

  const handleDelete = async (commissionId: number) => {
    await authFetch(`/commissions/${commissionId}`, { method: "DELETE" });
    load();
  };

  const payoutsPagination = usePagination(payouts ?? []);
  const [payingOut, setPayingOut] = useState<AdminPayout | null>(null);

  const handleApprove = async (payoutId: number) => {
    try {
      await authFetch(`/commissions/payouts/${payoutId}`, { method: "PATCH", body: { status: "Approved" as PayoutStatus } });
      showToast("Payout approved.", "success");
      load();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not update this payout.", "error");
    }
  };

  const handleMarkPaid = async (payoutId: number, payoutMethodId: number, reference: string) => {
    await authFetch(`/commissions/payouts/${payoutId}`, {
      method: "PATCH",
      body: {
        status: "Paid",
        payoutDate: new Date().toISOString().slice(0, 10),
        payoutMethodId,
        reference: reference || undefined,
      },
    });
    showToast("Payout marked as paid.", "success");
    setPayingOut(null);
    load();
  };

  return (
    <div className="fade-in space-y-6">
      <SectionHeading title="Commissions & Payouts" subtitle="Configure partner commission rates and settle payouts." />

      {error && <ErrorState message={error} onRetry={load} />}

      {commissions === null ? (
        <LoadingState label="Loading commission rules…" />
      ) : (
        <UniversityCommissionTable
          commissions={commissions}
          universities={universities}
          countries={countries}
          readOnly={false}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}

      <Card>
        <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
          Commission payouts
        </h3>
        {payouts === null ? (
          <LoadingState label="Loading payouts…" />
        ) : payouts.length === 0 ? (
          <EmptyState title="No payouts yet" />
        ) : (
          <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#0B1E3D]/8 text-left text-[11px] font-bold uppercase tracking-[0.06em] text-[#0B1E3D]/40">
                  <th className="pb-2 pr-4">Agent</th>
                  <th className="pb-2 pr-4">Application</th>
                  <th className="pb-2 pr-4">Amount</th>
                  <th className="pb-2 pr-4">Paid to</th>
                  <th className="pb-2 pr-4">Reference</th>
                  <th className="pb-2 pr-4">Status</th>
                  <th className="pb-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0B1E3D]/6">
                {payoutsPagination.pageItems.map((p) => (
                  <tr key={p.payoutId}>
                    <td className="py-2.5 pr-4 font-medium text-[#0B1E3D]">{p.agent.fullName}</td>
                    <td className="py-2.5 pr-4 text-[#0B1E3D]/70">{p.application.intake.program.programName}</td>
                    <td className="py-2.5 pr-4 font-semibold text-[#0B1E3D]">
                      {p.currency} {Number(p.amount).toLocaleString()}
                    </td>
                    <td className="py-2.5 pr-4 text-[#0B1E3D]/60">
                      {p.payoutMethod
                        ? `${p.payoutMethod.bankName ?? "Bank"} ••••${p.payoutMethod.accountNumber.slice(-4)}`
                        : "No bank on file"}
                    </td>
                    <td className="py-2.5 pr-4 text-[#0B1E3D]/60">{p.reference ?? "—"}</td>
                    <td className="py-2.5 pr-4">
                      <Badge label={p.status} color={PAYOUT_COLORS[p.status]} />
                    </td>
                    <td className="py-2.5">
                      {p.status === "Pending" && (
                        <button
                          onClick={() => handleApprove(p.payoutId)}
                          className="text-xs font-bold text-[#0B1E3D] hover:underline"
                        >
                          Approve
                        </button>
                      )}
                      {p.status === "Approved" && (
                        <button
                          onClick={() => setPayingOut(p)}
                          className="text-xs font-bold text-[#0B1E3D] hover:underline"
                        >
                          Mark paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PaginationControls
            page={payoutsPagination.page}
            totalPages={payoutsPagination.totalPages}
            totalItems={payoutsPagination.totalItems}
            pageSize={payoutsPagination.pageSize}
            onPageChange={payoutsPagination.setPage}
            onPageSizeChange={payoutsPagination.setPageSize}
          />
          </>
        )}
      </Card>

      {payingOut && (
        <MarkPaidModal
          payout={payingOut}
          onClose={() => setPayingOut(null)}
          onSubmit={(payoutMethodId, reference) => handleMarkPaid(payingOut.payoutId, payoutMethodId, reference)}
        />
      )}
    </div>
  );
}

function MarkPaidModal({
  payout,
  onClose,
  onSubmit,
}: {
  payout: AdminPayout;
  onClose: () => void;
  onSubmit: (payoutMethodId: number, reference: string) => Promise<void>;
}) {
  const { authFetch } = useAuth();
  const [methods, setMethods] = useState<PayoutMethod[] | null>(null);
  const [payoutMethodId, setPayoutMethodId] = useState(String(payout.payoutMethodId ?? ""));
  const [reference, setReference] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    authFetch<PayoutMethod[]>(`/agents/${payout.agentId}/payout-methods`)
      .then((list) => {
        setMethods(list);
        if (!payoutMethodId) {
          const preferred = list.find((m) => m.isDefault) ?? list[0];
          if (preferred) setPayoutMethodId(String(preferred.payoutMethodId));
        }
      })
      .catch(() => setMethods([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payout.agentId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await onSubmit(Number(payoutMethodId), reference);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not mark this payout as paid.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1E3D]/60 p-4 backdrop-blur-sm">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h3 className="mb-1 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]">Mark payout as paid</h3>
        <p className="mb-4 text-xs font-medium text-[#0B1E3D]/50">
          {payout.agent.fullName} — {payout.currency} {Number(payout.amount).toLocaleString()}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
              {error}
            </div>
          )}
          <div>
            <FieldLabel>Paid to (bank account)</FieldLabel>
            {methods === null ? (
              <p className="text-xs font-medium text-[#0B1E3D]/40">Loading accounts…</p>
            ) : methods.length === 0 ? (
              <p className="text-xs font-semibold text-amber-600">
                This partner hasn't added a payout bank account yet.
              </p>
            ) : (
              <select className={selectClass} value={payoutMethodId} onChange={(e) => setPayoutMethodId(e.target.value)} required>
                <option value="">Select account</option>
                {methods.map((m) => (
                  <option key={m.payoutMethodId} value={m.payoutMethodId}>
                    {m.bankName ?? m.methodType} ••••{m.accountNumber.slice(-4)}
                    {m.isDefault ? " (default)" : ""}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            <FieldLabel>Transfer reference (optional)</FieldLabel>
            <input
              className={inputClass}
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Bank transaction ID, cheque no., etc."
            />
          </div>
          <div className="flex gap-3">
            <PrimaryButton type="submit" disabled={saving || !payoutMethodId}>
              {saving ? "Saving…" : "Confirm paid"}
            </PrimaryButton>
            <SecondaryButton type="button" onClick={onClose} disabled={saving}>
              Cancel
            </SecondaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}
