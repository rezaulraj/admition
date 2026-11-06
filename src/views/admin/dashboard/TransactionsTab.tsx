"use client";

import React, { useEffect, useState } from "react";
import { useAuth, ApiError } from "@/lib/auth-context";
import { Card, EmptyState, ErrorState, LoadingState, SectionHeading } from "@/components/dashboard/common/ui";
import { PaginationControls, usePagination } from "@/components/dashboard/common/Pagination";
import type { TransactionHistoryRow } from "./types";

export default function TransactionsTab() {
  const { authFetch } = useAuth();
  const [transactions, setTransactions] = useState<TransactionHistoryRow[] | null>(null);
  const [error, setError] = useState("");

  const load = () => {
    setError("");
    setTransactions(null);
    authFetch<TransactionHistoryRow[]>("/commissions/transactions")
      .then(setTransactions)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load transactions."));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { page, setPage, pageSize, setPageSize, totalPages, totalItems, pageItems } = usePagination(
    transactions ?? [],
  );

  return (
    <div className="fade-in">
      <SectionHeading title="Transaction History" subtitle="Every settled commission payout across the platform." />

      {transactions === null && !error && <LoadingState label="Loading transactions…" />}
      {error && <ErrorState message={error} onRetry={load} />}
      {transactions && transactions.length === 0 && (
        <EmptyState title="No transactions yet" description="Settled commission payouts will show up here." />
      )}

      {transactions && transactions.length > 0 && (
        <Card className="p-0">
          <ul className="divide-y divide-[#0B1E3D]/6">
            {pageItems.map((t) => (
              <li key={t.transactionId} className="flex items-center justify-between px-5 py-3.5 text-sm">
                <div>
                  <p className="font-medium text-[#0B1E3D]">{t.notes ?? t.relatedType}</p>
                  <p className="text-xs text-[#0B1E3D]/45">{new Date(t.transactionDate).toLocaleString()}</p>
                </div>
                <p className="font-bold text-[#0B1E3D]">
                  {t.currency} {Number(t.amount).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
          <div className="px-5 pb-4">
            <PaginationControls
              page={page}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        </Card>
      )}
    </div>
  );
}
