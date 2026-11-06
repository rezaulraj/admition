"use client";

import React, { useEffect, useState } from "react";
import { useAuth, ApiError } from "@/lib/auth-context";
import { apiFetch } from "@/lib/api";
import { Badge, Card, EmptyState, ErrorState, LoadingState, SectionHeading } from "@/components/dashboard/common/ui";
import { PaginationControls, usePagination } from "@/components/dashboard/common/Pagination";
import UniversityCommissionTable from "@/components/dashboard/common/UniversityCommissionTable";
import { FEE_STATUS_COLORS, FEE_STATUS_LABELS, STATUS_COLORS, STATUS_LABELS } from "@/views/student/dashboard/types";
import type { Country, University } from "@/views/student/dashboard/types";
import type { Commission } from "@/views/admin/dashboard/types";
import type { ApplicationFeeRow, CommissionPayout, TransactionHistoryRow } from "./types";
import { PAYOUT_COLORS } from "./types";

interface Data {
  fees: ApplicationFeeRow[];
  payouts: CommissionPayout[];
  transactions: TransactionHistoryRow[];
  commissions: Commission[];
}

export default function CommissionTab() {
  const { authFetch } = useAuth();
  const [data, setData] = useState<Data | null>(null);
  const [universities, setUniversities] = useState<University[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState("");

  const load = () => {
    setError("");
    setData(null);
    Promise.all([
      authFetch<ApplicationFeeRow[]>("/agents/me/application-fees"),
      authFetch<CommissionPayout[]>("/commissions/payouts/me"),
      authFetch<TransactionHistoryRow[]>("/commissions/transactions/me"),
      authFetch<Commission[]>("/commissions"),
    ])
      .then(([fees, payouts, transactions, commissions]) => setData({ fees, payouts, transactions, commissions }))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load commission data."));
  };

  useEffect(() => {
    load();
    apiFetch<University[]>("/universities").then(setUniversities).catch(() => setUniversities([]));
    apiFetch<Country[]>("/countries").then(setCountries).catch(() => setCountries([]));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const payoutsPagination = usePagination(data?.payouts ?? []);
  const feesPagination = usePagination(data?.fees ?? []);
  const transactionsPagination = usePagination(data?.transactions ?? []);

  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!data) return <LoadingState label="Loading commission & payout data…" />;

  return (
    <div className="fade-in space-y-6">
      <SectionHeading
        title="Commission and Partner"
        subtitle="Application fees, commission payouts, and settled transactions."
      />

      <UniversityCommissionTable
        commissions={data.commissions}
        universities={universities}
        countries={countries}
        readOnly
      />

      <Card>
        <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
          Commission payouts
        </h3>
        {data.payouts.length === 0 ? (
          <EmptyState title="No payouts yet" description="Commission payouts are created once a student's offer is accepted." />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#0B1E3D]/8 text-left text-[11px] font-bold uppercase tracking-[0.06em] text-[#0B1E3D]/40">
                    <th className="pb-2 pr-4">Application</th>
                    <th className="pb-2 pr-4">Amount</th>
                    <th className="pb-2 pr-4">Paid to</th>
                    <th className="pb-2 pr-4">Reference</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0B1E3D]/6">
                  {payoutsPagination.pageItems.map((p) => (
                    <tr key={p.payoutId}>
                      <td className="py-2.5 pr-4 font-medium text-[#0B1E3D]">
                        {p.application?.intake?.program?.programName ?? `#${p.applicationId}`}
                      </td>
                      <td className="py-2.5 pr-4 font-semibold text-[#0B1E3D]">
                        {p.currency} {Number(p.amount).toLocaleString()}
                      </td>
                      <td className="py-2.5 pr-4 text-[#0B1E3D]/60">
                        {p.payoutMethod
                          ? `${p.payoutMethod.bankName ?? "Bank"} ••••${p.payoutMethod.accountNumber.slice(-4)}`
                          : "No default bank set"}
                      </td>
                      <td className="py-2.5 pr-4 text-[#0B1E3D]/60">{p.reference ?? "—"}</td>
                      <td className="py-2.5">
                        <Badge label={p.status} color={PAYOUT_COLORS[p.status]} />
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

      <Card>
        <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
          Application fees
        </h3>
        {data.fees.length === 0 ? (
          <EmptyState title="No applications yet" />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#0B1E3D]/8 text-left text-[11px] font-bold uppercase tracking-[0.06em] text-[#0B1E3D]/40">
                    <th className="pb-2 pr-4">Student</th>
                    <th className="pb-2 pr-4">Program</th>
                    <th className="pb-2 pr-4">Fee</th>
                    <th className="pb-2 pr-4">Payment</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0B1E3D]/6">
                  {feesPagination.pageItems.map((f) => (
                    <tr key={f.applicationId}>
                      <td className="py-2.5 pr-4 font-medium text-[#0B1E3D]">{f.student.fullName}</td>
                      <td className="py-2.5 pr-4 text-[#0B1E3D]/70">
                        {f.program} · {f.university}
                      </td>
                      <td className="py-2.5 pr-4 font-semibold text-[#0B1E3D]">
                        {f.currency} {Number(f.applicationFee).toLocaleString()}
                      </td>
                      <td className="py-2.5 pr-4">
                        <Badge label={FEE_STATUS_LABELS[f.feeStatus]} color={FEE_STATUS_COLORS[f.feeStatus]} />
                      </td>
                      <td className="py-2.5">
                        <Badge label={STATUS_LABELS[f.currentStatus]} color={STATUS_COLORS[f.currentStatus]} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <PaginationControls
              page={feesPagination.page}
              totalPages={feesPagination.totalPages}
              totalItems={feesPagination.totalItems}
              pageSize={feesPagination.pageSize}
              onPageChange={feesPagination.setPage}
              onPageSizeChange={feesPagination.setPageSize}
            />
          </>
        )}
      </Card>

      <Card>
        <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
          Transaction history
        </h3>
        {data.transactions.length === 0 ? (
          <EmptyState title="No settled transactions yet" description="Paid-out commissions will appear here." />
        ) : (
          <>
            <ul className="divide-y divide-[#0B1E3D]/6">
              {transactionsPagination.pageItems.map((t) => (
                <li key={t.transactionId} className="flex items-center justify-between py-2.5 text-sm">
                  <div>
                    <p className="font-medium text-[#0B1E3D]">{t.notes ?? t.relatedType}</p>
                    <p className="text-xs text-[#0B1E3D]/45">
                      {new Date(t.transactionDate).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-bold text-[#0B1E3D]">
                    {t.currency} {Number(t.amount).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
            <PaginationControls
              page={transactionsPagination.page}
              totalPages={transactionsPagination.totalPages}
              totalItems={transactionsPagination.totalItems}
              pageSize={transactionsPagination.pageSize}
              onPageChange={transactionsPagination.setPage}
              onPageSizeChange={transactionsPagination.setPageSize}
            />
          </>
        )}
      </Card>
    </div>
  );
}
