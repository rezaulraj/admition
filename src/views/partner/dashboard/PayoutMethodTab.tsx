"use client";

import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaPlus, FaStar, FaRegStar, FaTrash, FaTimes, FaUniversity } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";
import {
  Card,
  EmptyState,
  ErrorState,
  FieldLabel,
  LoadingState,
  PrimaryButton,
  SecondaryButton,
  SectionHeading,
  inputClass,
} from "@/components/dashboard/common/ui";
import type { PayoutMethod } from "./types";

interface FormState {
  accountHolderName: string;
  bankName: string;
  bankAddress: string;
  accountNumber: string;
  swiftCode: string;
  ifscCode: string;
  branch: string;
  beneficiaryNumber: string;
  beneficiaryAddress: string;
  isDefault: boolean;
}

const EMPTY_FORM: FormState = {
  accountHolderName: "",
  bankName: "",
  bankAddress: "",
  accountNumber: "",
  swiftCode: "",
  ifscCode: "",
  branch: "",
  beneficiaryNumber: "",
  beneficiaryAddress: "",
  isDefault: false,
};

function maskAccountNumber(accountNumber: string) {
  if (accountNumber.length <= 4) return accountNumber;
  return `••••${accountNumber.slice(-4)}`;
}

export default function PayoutMethodTab() {
  const { authFetch } = useAuth();
  const { showToast } = useToast();
  const [methods, setMethods] = useState<PayoutMethod[] | null>(null);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const load = () => {
    setError("");
    setMethods(null);
    authFetch<PayoutMethod[]>("/agents/me/payout-methods")
      .then(setMethods)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load your bank accounts."));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openAddModal = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setModalOpen(true);
  };

  const openEditModal = (m: PayoutMethod) => {
    setEditingId(m.payoutMethodId);
    setForm({
      accountHolderName: m.accountHolderName,
      bankName: m.bankName ?? "",
      bankAddress: m.bankAddress ?? "",
      accountNumber: m.accountNumber,
      swiftCode: m.swiftCode ?? "",
      ifscCode: m.ifscCode ?? "",
      branch: m.branch ?? "",
      beneficiaryNumber: m.beneficiaryNumber ?? "",
      beneficiaryAddress: m.beneficiaryAddress ?? "",
      isDefault: m.isDefault,
    });
    setFormError("");
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    setSaving(true);
    const body = {
      methodType: "BankTransfer" as const,
      accountHolderName: form.accountHolderName,
      bankName: form.bankName || undefined,
      bankAddress: form.bankAddress || undefined,
      accountNumber: form.accountNumber,
      swiftCode: form.swiftCode || undefined,
      ifscCode: form.ifscCode || undefined,
      branch: form.branch || undefined,
      beneficiaryNumber: form.beneficiaryNumber || undefined,
      beneficiaryAddress: form.beneficiaryAddress || undefined,
      isDefault: form.isDefault,
    };
    try {
      if (editingId) {
        await authFetch(`/agents/me/payout-methods/${editingId}`, { method: "PATCH", body });
      } else {
        await authFetch("/agents/me/payout-methods", { method: "POST", body });
      }
      showToast(editingId ? "Bank account updated." : "Bank account added.", "success");
      setModalOpen(false);
      load();
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Could not save this bank account.");
    } finally {
      setSaving(false);
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      await authFetch(`/agents/me/payout-methods/${id}/default`, { method: "PATCH" });
      showToast("Default bank account updated.", "success");
      load();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not set this bank as default.", "error");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await authFetch(`/agents/me/payout-methods/${id}`, { method: "DELETE" });
      showToast("Bank account removed.", "success");
      load();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not remove this bank account.", "error");
    }
  };

  return (
    <div className="fade-in space-y-6">
      <SectionHeading
        title="Payout Method"
        subtitle="Bank accounts you can be paid to. The default bank is automatically used for commission payouts on application fees."
      />

      {error && <ErrorState message={error} onRetry={load} />}

      {!error && (
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
              List of bank informations
            </h3>
            <PrimaryButton onClick={openAddModal}>
              <FaPlus size={12} />
              Add new bank
            </PrimaryButton>
          </div>

          {methods === null ? (
            <LoadingState label="Loading your bank accounts…" />
          ) : methods.length === 0 ? (
            <EmptyState
              title="No bank accounts yet"
              description="Add a bank account so we know where to send your commission payouts."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#0B1E3D]/8 text-left text-[11px] font-bold uppercase tracking-[0.06em] text-[#0B1E3D]/40">
                    <th className="pb-2 pr-4">#</th>
                    <th className="pb-2 pr-4">Account Name</th>
                    <th className="pb-2 pr-4">Bank Name</th>
                    <th className="pb-2 pr-4">Account Number</th>
                    <th className="pb-2 pr-4">Default</th>
                    <th className="pb-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0B1E3D]/6">
                  {methods.map((m, i) => (
                    <tr key={m.payoutMethodId}>
                      <td className="py-2.5 pr-4 text-[#0B1E3D]/50">{i + 1}</td>
                      <td className="py-2.5 pr-4 font-semibold text-[#0B1E3D]">{m.accountHolderName}</td>
                      <td className="py-2.5 pr-4 text-[#0B1E3D]/70">{m.bankName || "—"}</td>
                      <td className="py-2.5 pr-4 font-mono text-[#0B1E3D]/70">{maskAccountNumber(m.accountNumber)}</td>
                      <td className="py-2.5 pr-4">
                        {m.isDefault ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-emerald-700">
                            <FaCheckCircle size={10} /> Default
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSetDefault(m.payoutMethodId)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1E3D]/50 hover:text-[#1a5fd8]"
                          >
                            <FaRegStar size={12} /> Set default
                          </button>
                        )}
                      </td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => openEditModal(m)}
                            className="text-xs font-bold text-[#0B1E3D] hover:text-[#1a5fd8] hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(m.payoutMethodId)}
                            className="text-red-500 hover:text-red-700"
                            aria-label="Delete bank account"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1E3D]/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-extrabold text-[#0B1E3D]">
                <FaUniversity className="text-[#1a5fd8]" size={16} />
                {editingId ? "Edit bank" : "Add new bank"}
              </h3>
              <button onClick={closeModal} className="text-[#0B1E3D]/40 hover:text-[#0B1E3D]" aria-label="Close">
                <FaTimes size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
                  {formError}
                </div>
              )}

              <div>
                <FieldLabel>Account name *</FieldLabel>
                <input
                  className={inputClass}
                  value={form.accountHolderName}
                  onChange={(e) => setForm((f) => ({ ...f, accountHolderName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <FieldLabel>Bank Name *</FieldLabel>
                <input
                  className={inputClass}
                  value={form.bankName}
                  onChange={(e) => setForm((f) => ({ ...f, bankName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <FieldLabel>Bank Address</FieldLabel>
                <input
                  className={inputClass}
                  value={form.bankAddress}
                  onChange={(e) => setForm((f) => ({ ...f, bankAddress: e.target.value }))}
                />
              </div>
              <div>
                <FieldLabel>Account Number *</FieldLabel>
                <input
                  className={inputClass}
                  value={form.accountNumber}
                  onChange={(e) => setForm((f) => ({ ...f, accountNumber: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel>Swift Code</FieldLabel>
                  <input
                    className={inputClass}
                    value={form.swiftCode}
                    onChange={(e) => setForm((f) => ({ ...f, swiftCode: e.target.value }))}
                  />
                </div>
                <div>
                  <FieldLabel>IFSC Code</FieldLabel>
                  <input
                    className={inputClass}
                    value={form.ifscCode}
                    onChange={(e) => setForm((f) => ({ ...f, ifscCode: e.target.value }))}
                  />
                </div>
                <div>
                  <FieldLabel>Branch</FieldLabel>
                  <input
                    className={inputClass}
                    value={form.branch}
                    onChange={(e) => setForm((f) => ({ ...f, branch: e.target.value }))}
                  />
                </div>
                <div>
                  <FieldLabel>Beneficiary Number</FieldLabel>
                  <input
                    className={inputClass}
                    value={form.beneficiaryNumber}
                    onChange={(e) => setForm((f) => ({ ...f, beneficiaryNumber: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <FieldLabel>Beneficiary Address</FieldLabel>
                <input
                  className={inputClass}
                  value={form.beneficiaryAddress}
                  onChange={(e) => setForm((f) => ({ ...f, beneficiaryAddress: e.target.value }))}
                />
              </div>

              <label className="flex items-center gap-2 text-xs font-bold text-[#0B1E3D]/70">
                <input
                  type="checkbox"
                  checked={form.isDefault}
                  onChange={(e) => setForm((f) => ({ ...f, isDefault: e.target.checked }))}
                  className="h-4 w-4 rounded border-[#0B1E3D]/20"
                />
                Use as default bank for commission payouts
              </label>

              <div className="flex items-center justify-end gap-3 pt-2">
                <SecondaryButton type="button" onClick={closeModal}>
                  Close
                </SecondaryButton>
                <PrimaryButton type="submit" disabled={saving}>
                  {saving ? "Saving…" : "Confirm"}
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
