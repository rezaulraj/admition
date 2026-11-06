"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FaExternalLinkAlt, FaFileInvoiceDollar, FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { resolveAssetUrl } from "@/lib/api";
import { confirmDelete } from "@/lib/confirm";
import { useToast } from "@/lib/toast-context";
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
import type {
  VisaAgent,
  VisaAgentSource,
  VisaBankAccount,
  VisaCandidate,
  VisaCandidateGender,
  VisaTaskStatus,
  VisaTopUp,
} from "./types";

const TOPUP_CURRENCIES = ["BDT", "EUR", "GBP", "USD", "INR", "NPR", "LKR", "PKR"];

const AGENT_COLORS = ["#1a5fd8", "#0f9d58", "#a142f4", "#e8710a", "#12a4af", "#c5221f", "#9334e6", "#188038"];

function agentColor(agent: VisaAgent | undefined): string {
  if (!agent) return "#0B1E3D";
  if (agent.colorHex) return agent.colorHex;
  return AGENT_COLORS[agent.visaAgentId % AGENT_COLORS.length];
}

const TASK_STATUS_COLORS: Record<VisaTaskStatus, string> = {
  Pending: "#e8710a",
  Done: "#0f9d58",
};

export default function VisaProcessingTab() {
  const { authFetch } = useAuth();
  const { showToast } = useToast();

  const [agents, setAgents] = useState<VisaAgent[] | null>(null);
  const [candidates, setCandidates] = useState<VisaCandidate[] | null>(null);
  const [bankAccounts, setBankAccounts] = useState<VisaBankAccount[] | null>(null);
  const [topUps, setTopUps] = useState<VisaTopUp[] | null>(null);
  const [error, setError] = useState("");

  const [agentFilter, setAgentFilter] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<VisaCandidate | null>(null);
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);

  const loadAgents = () => {
    authFetch<VisaAgent[]>("/visa/agents").then(setAgents).catch(() => setAgents([]));
  };

  const loadBankAccounts = () => {
    authFetch<VisaBankAccount[]>("/visa/bank-accounts").then(setBankAccounts).catch(() => setBankAccounts([]));
  };

  const loadTopUps = () => {
    authFetch<VisaTopUp[]>("/visa/topups").then(setTopUps).catch(() => setTopUps([]));
  };

  const loadCandidates = () => {
    setError("");
    const params = new URLSearchParams();
    if (agentFilter) params.set("visaAgentId", agentFilter);
    if (destinationFilter) params.set("destination", destinationFilter);
    authFetch<VisaCandidate[]>(`/visa/candidates?${params.toString()}`)
      .then(setCandidates)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load candidates."));
  };

  useEffect(() => {
    loadAgents();
    loadBankAccounts();
    loadTopUps();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadCandidates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentFilter, destinationFilter]);

  const destinations = useMemo(
    () => Array.from(new Set((candidates ?? []).map((c) => c.destination))).sort(),
    [candidates],
  );

  const handleDeleteCandidate = async (visaCandidateId: number) => {
    const confirmed = await confirmDelete("Delete this candidate record?");
    if (!confirmed) return;
    try {
      await authFetch(`/visa/candidates/${visaCandidateId}`, { method: "DELETE" });
      showToast("Candidate deleted.", "success");
      loadCandidates();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not delete this candidate.", "error");
    }
  };

  const handleStatusChange = async (
    candidate: VisaCandidate,
    field: "interviewStatus" | "missingDocStatus",
    value: VisaTaskStatus,
  ) => {
    try {
      await authFetch(`/visa/candidates/${candidate.visaCandidateId}`, {
        method: "PATCH",
        body: { [field]: value },
      });
      loadCandidates();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not update status.", "error");
    }
  };

  const handleDeleteTopUp = async (visaTopUpId: number) => {
    const confirmed = await confirmDelete("Delete this top-up record?");
    if (!confirmed) return;
    try {
      await authFetch(`/visa/topups/${visaTopUpId}`, { method: "DELETE" });
      showToast("Top-up deleted.", "success");
      loadTopUps();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not delete this top-up.", "error");
    }
  };

  const { page, setPage, pageSize, setPageSize, totalPages, totalItems, pageItems } = usePagination(
    candidates ?? [],
  );

  return (
    <div className="fade-in space-y-6">
      <SectionHeading
        title="Visa Processing"
        subtitle="Track candidates sent through recruiting agencies for visa processing."
      />

      <AgencyManager agents={agents} onRefresh={loadAgents} />
      <BankAccountManager accounts={bankAccounts} onRefresh={loadBankAccounts} />

      <Card className="p-0">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#0B1E3D]/8 px-5 py-4">
          <h3 className="text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]">Candidates</h3>
          <PrimaryButton
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
            className="!px-3 !py-2 text-xs"
          >
            <FaPlus size={11} />
            Add candidate
          </PrimaryButton>
        </div>

        <div className="border-b border-[#0B1E3D]/8 px-5 py-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <FieldLabel>Agency</FieldLabel>
              <select className={selectClass} value={agentFilter} onChange={(e) => setAgentFilter(e.target.value)}>
                <option value="">All Agencies</option>
                {(agents ?? []).map((a) => (
                  <option key={a.visaAgentId} value={a.visaAgentId}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel>Destination</FieldLabel>
              <input
                className={inputClass}
                list="visa-destinations"
                value={destinationFilter}
                onChange={(e) => setDestinationFilter(e.target.value)}
                placeholder="All destinations"
              />
              <datalist id="visa-destinations">
                {destinations.map((d) => (
                  <option key={d} value={d} />
                ))}
              </datalist>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-5">
            <ErrorState message={error} onRetry={loadCandidates} />
          </div>
        )}

        {!error && candidates === null && (
          <div className="p-5">
            <LoadingState label="Loading candidates…" />
          </div>
        )}

        {!error && candidates && candidates.length === 0 && (
          <div className="p-5">
            <EmptyState title="No candidates yet" description="Add a candidate to start tracking their visa processing." />
          </div>
        )}

        {!error && candidates && candidates.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-0 text-sm">
                <thead>
                  <tr className="bg-gray-50/90 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-[#0B1E3D]/40">
                    <th className="border-b border-[#0B1E3D]/8 px-4 py-3.5">Date</th>
                    <th className="border-b border-[#0B1E3D]/8 px-3 py-3.5">Agency</th>
                    <th className="border-b border-[#0B1E3D]/8 px-3 py-3.5">Gender</th>
                    <th className="border-b border-[#0B1E3D]/8 px-3 py-3.5">Name</th>
                    <th className="border-b border-[#0B1E3D]/8 px-3 py-3.5">Passport No</th>
                    <th className="border-b border-[#0B1E3D]/8 px-3 py-3.5">Destination</th>
                    <th className="border-b border-[#0B1E3D]/8 px-3 py-3.5">Interview</th>
                    <th className="border-b border-[#0B1E3D]/8 px-3 py-3.5">Missing Doc</th>
                    <th className="border-b border-[#0B1E3D]/8 px-3 py-3.5">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((c) => (
                    <tr key={c.visaCandidateId} className="transition-colors hover:bg-[#1a5fd8]/4">
                      <td className="border-b border-[#0B1E3D]/6 px-4 py-3 text-xs font-medium text-[#0B1E3D]/60">
                        {new Date(c.date).toLocaleDateString()}
                      </td>
                      <td className="border-b border-[#0B1E3D]/6 px-3 py-3">
                        <Badge label={c.visaAgent?.name ?? "—"} color={agentColor(c.visaAgent)} />
                      </td>
                      <td className="border-b border-[#0B1E3D]/6 px-3 py-3 text-xs font-medium text-[#0B1E3D]/60">
                        {c.gender}
                      </td>
                      <td className="border-b border-[#0B1E3D]/6 px-3 py-3 text-sm font-bold text-[#0B1E3D]">
                        {c.fullName}
                      </td>
                      <td className="border-b border-[#0B1E3D]/6 px-3 py-3 text-xs font-medium text-[#0B1E3D]/60">
                        {c.passportNo}
                      </td>
                      <td className="border-b border-[#0B1E3D]/6 px-3 py-3 text-xs font-semibold text-[#0B1E3D]/70">
                        {c.destination}
                      </td>
                      <td className="border-b border-[#0B1E3D]/6 px-3 py-3">
                        <select
                          className="rounded-full border-none bg-transparent text-[11px] font-bold uppercase tracking-[0.04em] outline-none"
                          style={{ color: TASK_STATUS_COLORS[c.interviewStatus] }}
                          value={c.interviewStatus}
                          onChange={(e) => handleStatusChange(c, "interviewStatus", e.target.value as VisaTaskStatus)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Done">Done</option>
                        </select>
                      </td>
                      <td className="border-b border-[#0B1E3D]/6 px-3 py-3">
                        <select
                          className="rounded-full border-none bg-transparent text-[11px] font-bold uppercase tracking-[0.04em] outline-none"
                          style={{ color: TASK_STATUS_COLORS[c.missingDocStatus] }}
                          value={c.missingDocStatus}
                          onChange={(e) => handleStatusChange(c, "missingDocStatus", e.target.value as VisaTaskStatus)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Done">Done</option>
                        </select>
                      </td>
                      <td className="border-b border-[#0B1E3D]/6 px-3 py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setEditing(c);
                              setModalOpen(true);
                            }}
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-[#0B1E3D]/45 transition hover:bg-[#1a5fd8]/10 hover:text-[#1a5fd8]"
                            aria-label="Edit candidate"
                          >
                            <FaPencilAlt size={12} />
                          </button>
                          <button
                            onClick={() => handleDeleteCandidate(c.visaCandidateId)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-red-400 transition hover:bg-red-50 hover:text-red-600"
                            aria-label="Delete candidate"
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
            <div className="px-5 py-4">
              <PaginationControls
                page={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
              />
            </div>
          </>
        )}
      </Card>

      <Card className="p-0">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#0B1E3D]/8 px-5 py-4">
          <h3 className="text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]">Agency Top-Ups</h3>
          <PrimaryButton onClick={() => setTopUpModalOpen(true)} className="!px-3 !py-2 text-xs">
            <FaPlus size={11} />
            Add top-up
          </PrimaryButton>
        </div>

        {topUps === null ? (
          <div className="p-5">
            <LoadingState label="Loading top-ups…" />
          </div>
        ) : topUps.length === 0 ? (
          <div className="p-5">
            <EmptyState title="No top-ups yet" description="Record a bank transfer from an agency to start tracking it here." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="bg-gray-50/90 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-[#0B1E3D]/40">
                  <th className="border-b border-[#0B1E3D]/8 px-4 py-3.5">Serial</th>
                  <th className="border-b border-[#0B1E3D]/8 px-3 py-3.5">Date</th>
                  <th className="border-b border-[#0B1E3D]/8 px-3 py-3.5">Bank</th>
                  <th className="border-b border-[#0B1E3D]/8 px-3 py-3.5">Amount</th>
                  <th className="border-b border-[#0B1E3D]/8 px-3 py-3.5">Candidates</th>
                  <th className="border-b border-[#0B1E3D]/8 px-3 py-3.5">Receipt</th>
                  <th className="border-b border-[#0B1E3D]/8 px-3 py-3.5">Action</th>
                </tr>
              </thead>
              <tbody>
                {topUps.map((t) => (
                  <tr key={t.visaTopUpId} className="transition-colors hover:bg-[#1a5fd8]/4">
                    <td className="border-b border-[#0B1E3D]/6 px-4 py-3 text-xs font-bold text-[#0B1E3D]">{t.serial}</td>
                    <td className="border-b border-[#0B1E3D]/6 px-3 py-3 text-xs font-medium text-[#0B1E3D]/60">
                      {new Date(t.paymentDate).toLocaleDateString()}
                    </td>
                    <td className="border-b border-[#0B1E3D]/6 px-3 py-3 text-xs font-semibold text-[#0B1E3D]/70">
                      {t.visaBankAccount?.bankName ?? "—"}
                    </td>
                    <td className="border-b border-[#0B1E3D]/6 px-3 py-3">
                      <span className="inline-flex items-center rounded-full bg-[#1a5fd8]/10 px-3 py-1 text-xs font-extrabold text-[#1a5fd8]">
                        {t.currency} {Number(t.amount).toLocaleString()}
                      </span>
                    </td>
                    <td className="border-b border-[#0B1E3D]/6 px-3 py-3 text-xs font-medium text-[#0B1E3D]/60">
                      {t.items.length > 0
                        ? t.items.map((it) => it.visaCandidate?.fullName ?? `#${it.visaCandidateId}`).join(", ")
                        : t.purpose ?? "—"}
                    </td>
                    <td className="border-b border-[#0B1E3D]/6 px-3 py-3">
                      <a
                        href={resolveAssetUrl(t.receiptUrl)!}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a5fd8] hover:underline"
                      >
                        View <FaExternalLinkAlt size={9} />
                      </a>
                    </td>
                    <td className="border-b border-[#0B1E3D]/6 px-3 py-3">
                      <button
                        onClick={() => handleDeleteTopUp(t.visaTopUpId)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-red-400 transition hover:bg-red-50 hover:text-red-600"
                        aria-label="Delete top-up"
                      >
                        <FaTrash size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {modalOpen && (
        <CandidateFormModal
          agents={agents ?? []}
          editing={editing}
          onClose={() => setModalOpen(false)}
          onSubmit={async (values) => {
            if (editing) {
              await authFetch(`/visa/candidates/${editing.visaCandidateId}`, { method: "PATCH", body: values });
            } else {
              await authFetch("/visa/candidates", { method: "POST", body: values });
            }
            setModalOpen(false);
            loadCandidates();
          }}
        />
      )}

      {topUpModalOpen && (
        <TopUpFormModal
          bankAccounts={bankAccounts ?? []}
          candidates={candidates ?? []}
          onClose={() => setTopUpModalOpen(false)}
          onSubmit={async (values) => {
            await authFetch("/visa/topups", { method: "POST", body: values });
            setTopUpModalOpen(false);
            loadTopUps();
          }}
        />
      )}
    </div>
  );
}

function AgencyManager({ agents, onRefresh }: { agents: VisaAgent[] | null; onRefresh: () => void }) {
  const { authFetch } = useAuth();
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [source, setSource] = useState<VisaAgentSource>("Bangladesh");
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      await authFetch("/visa/agents", { method: "POST", body: { name, source } });
      setName("");
      onRefresh();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not add agency.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (visaAgentId: number) => {
    const confirmed = await confirmDelete("Remove this agency? Candidates linked to it must be removed first.");
    if (!confirmed) return;
    try {
      await authFetch(`/visa/agents/${visaAgentId}`, { method: "DELETE" });
      onRefresh();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not remove this agency.", "error");
    }
  };

  return (
    <Card className="p-0">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <h3 className="text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]">
          Recruiting Agencies {agents ? `(${agents.length})` : ""}
        </h3>
        <span className="text-xs font-bold text-[#1a5fd8]">{expanded ? "Hide" : "Manage"}</span>
      </button>

      {expanded && (
        <div className="border-t border-[#0B1E3D]/8 px-5 py-4 space-y-4">
          {agents && agents.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {agents.map((a) => (
                <span
                  key={a.visaAgentId}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold"
                  style={{ backgroundColor: `${agentColor(a)}15`, color: agentColor(a) }}
                >
                  {a.name}
                  <span className="text-[10px] font-medium opacity-70">{a.source === "International" ? "INT" : "BD"}</span>
                  <button onClick={() => handleDelete(a.visaAgentId)} className="ml-0.5 opacity-60 hover:opacity-100" aria-label={`Remove ${a.name}`}>
                    <FaTrash size={9} />
                  </button>
                </span>
              ))}
            </div>
          )}
          <form onSubmit={handleAdd} className="flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[180px]">
              <FieldLabel>Agency name</FieldLabel>
              <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Visa Zone" />
            </div>
            <div>
              <FieldLabel>Source</FieldLabel>
              <select className={selectClass} value={source} onChange={(e) => setSource(e.target.value as VisaAgentSource)}>
                <option value="Bangladesh">Bangladesh (BD)</option>
                <option value="International">International (INT)</option>
              </select>
            </div>
            <PrimaryButton type="submit" disabled={saving} className="!px-4 !py-2.5 text-xs">
              {saving ? "Adding…" : "Add agency"}
            </PrimaryButton>
          </form>
        </div>
      )}
    </Card>
  );
}

interface CandidateFormValues {
  date: string;
  visaAgentId: number;
  gender: VisaCandidateGender;
  fullName: string;
  passportNo: string;
  destination: string;
  remark?: string;
}

function CandidateFormModal({
  agents,
  editing,
  onClose,
  onSubmit,
}: {
  agents: VisaAgent[];
  editing: VisaCandidate | null;
  onClose: () => void;
  onSubmit: (values: CandidateFormValues) => Promise<void>;
}) {
  const [date, setDate] = useState(editing?.date.slice(0, 10) ?? new Date().toISOString().slice(0, 10));
  const [visaAgentId, setVisaAgentId] = useState(editing ? String(editing.visaAgentId) : "");
  const [gender, setGender] = useState<VisaCandidateGender>(editing?.gender ?? "Male");
  const [fullName, setFullName] = useState(editing?.fullName ?? "");
  const [passportNo, setPassportNo] = useState(editing?.passportNo ?? "");
  const [destination, setDestination] = useState(editing?.destination ?? "");
  const [remark, setRemark] = useState(editing?.remark ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await onSubmit({
        date,
        visaAgentId: Number(visaAgentId),
        gender,
        fullName,
        passportNo,
        destination,
        remark: remark || undefined,
      });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not save this candidate.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1E3D]/60 p-4 backdrop-blur-sm">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]">
          {editing ? "Edit candidate" : "Add candidate"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
              {error}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FieldLabel>Date</FieldLabel>
              <input type="date" className={inputClass} value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div>
              <FieldLabel>Agency</FieldLabel>
              <select className={selectClass} value={visaAgentId} onChange={(e) => setVisaAgentId(e.target.value)} required>
                <option value="">Select agency</option>
                {agents.map((a) => (
                  <option key={a.visaAgentId} value={a.visaAgentId}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <FieldLabel>Candidate name</FieldLabel>
              <input className={inputClass} value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div>
              <FieldLabel>Gender</FieldLabel>
              <select className={selectClass} value={gender} onChange={(e) => setGender(e.target.value as VisaCandidateGender)}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <FieldLabel>Passport No</FieldLabel>
              <input className={inputClass} value={passportNo} onChange={(e) => setPassportNo(e.target.value)} required />
            </div>
            <div className="col-span-2">
              <FieldLabel>Destination</FieldLabel>
              <input className={inputClass} value={destination} onChange={(e) => setDestination(e.target.value)} required placeholder="e.g. Serbia" />
            </div>
            <div className="col-span-2">
              <FieldLabel>Remark (optional)</FieldLabel>
              <input className={inputClass} value={remark} onChange={(e) => setRemark(e.target.value)} />
            </div>
          </div>
          <div className="flex gap-3">
            <PrimaryButton type="submit" disabled={saving}>
              {saving ? "Saving…" : editing ? "Save changes" : "Add candidate"}
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

function BankAccountManager({ accounts, onRefresh }: { accounts: VisaBankAccount[] | null; onRefresh: () => void }) {
  const { authFetch } = useAuth();
  const { showToast } = useToast();
  const [bankName, setBankName] = useState("");
  const [branch, setBranch] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      await authFetch("/visa/bank-accounts", {
        method: "POST",
        body: { bankName, branch: branch || undefined, accountNumber, accountHolderName: accountHolderName || undefined },
      });
      setBankName("");
      setBranch("");
      setAccountNumber("");
      setAccountHolderName("");
      onRefresh();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not add bank account.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (visaBankAccountId: number) => {
    const confirmed = await confirmDelete("Remove this bank account? Top-ups linked to it must be removed first.");
    if (!confirmed) return;
    try {
      await authFetch(`/visa/bank-accounts/${visaBankAccountId}`, { method: "DELETE" });
      onRefresh();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not remove this bank account.", "error");
    }
  };

  return (
    <Card className="p-0">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <h3 className="text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]">
          Our Bank Accounts {accounts ? `(${accounts.length})` : ""}
        </h3>
        <span className="text-xs font-bold text-[#1a5fd8]">{expanded ? "Hide" : "Manage"}</span>
      </button>

      {expanded && (
        <div className="border-t border-[#0B1E3D]/8 px-5 py-4 space-y-4">
          {accounts && accounts.length > 0 && (
            <ul className="space-y-2">
              {accounts.map((a) => (
                <li
                  key={a.visaBankAccountId}
                  className="flex items-center justify-between gap-3 rounded-xl bg-gray-50/70 px-4 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#0B1E3D]">
                      {a.bankName}
                      {a.branch ? ` — ${a.branch}` : ""}
                    </p>
                    <p className="truncate text-xs font-medium text-[#0B1E3D]/50">
                      A/C: {a.accountNumber}
                      {a.accountHolderName ? ` · ${a.accountHolderName}` : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(a.visaBankAccountId)}
                    className="shrink-0 text-red-500 hover:text-red-700"
                    aria-label={`Remove ${a.bankName}`}
                  >
                    <FaTrash size={12} />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={handleAdd} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div>
              <FieldLabel>Bank name</FieldLabel>
              <input className={inputClass} value={bankName} onChange={(e) => setBankName(e.target.value)} required placeholder="e.g. City Bank PLC" />
            </div>
            <div>
              <FieldLabel>Branch (optional)</FieldLabel>
              <input className={inputClass} value={branch} onChange={(e) => setBranch(e.target.value)} />
            </div>
            <div>
              <FieldLabel>Account number</FieldLabel>
              <input className={inputClass} value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required />
            </div>
            <div>
              <FieldLabel>Account holder (optional)</FieldLabel>
              <input className={inputClass} value={accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} />
            </div>
            <div className="col-span-2 flex items-end sm:col-span-4">
              <PrimaryButton type="submit" disabled={saving} className="!px-4 !py-2.5 text-xs">
                {saving ? "Adding…" : "Add bank account"}
              </PrimaryButton>
            </div>
          </form>
        </div>
      )}
    </Card>
  );
}

interface TopUpFormValues {
  paymentDate: string;
  bankTnxId: string;
  amount: number;
  currency: string;
  visaBankAccountId: number;
  receiptUrl: string;
  purpose?: string;
  invoiceNumber?: string;
  euroAmount?: number;
  euroRate?: number;
  items?: { visaCandidateId: number; amount: number }[];
}

function TopUpFormModal({
  bankAccounts,
  candidates,
  onClose,
  onSubmit,
}: {
  bankAccounts: VisaBankAccount[];
  candidates: VisaCandidate[];
  onClose: () => void;
  onSubmit: (values: TopUpFormValues) => Promise<void>;
}) {
  const { authFetch } = useAuth();
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));
  const [bankTnxId, setBankTnxId] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("BDT");
  const [visaBankAccountId, setVisaBankAccountId] = useState("");
  const [purpose, setPurpose] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [euroAmount, setEuroAmount] = useState("");
  const [euroRate, setEuroRate] = useState("");
  const [receiptUrl, setReceiptUrl] = useState("");
  const [uploadingReceipt, setUploadingReceipt] = useState(false);
  const [items, setItems] = useState<{ visaCandidateId: string; amount: string }[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleReceiptFile = async (file: File | undefined) => {
    if (!file) return;
    setError("");
    setUploadingReceipt(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await authFetch<{ url: string }>("/visa/topups/receipt", { method: "POST", body: form });
      setReceiptUrl(res.url);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Receipt upload failed.");
    } finally {
      setUploadingReceipt(false);
    }
  };

  const addItemRow = () => setItems((prev) => [...prev, { visaCandidateId: "", amount: "" }]);
  const removeItemRow = (index: number) => setItems((prev) => prev.filter((_, i) => i !== index));
  const updateItemRow = (index: number, field: "visaCandidateId" | "amount", value: string) =>
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, [field]: value } : it)));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!receiptUrl) {
      setError("Please upload the receipt before saving.");
      return;
    }
    setSaving(true);
    try {
      const validItems = items
        .filter((it) => it.visaCandidateId && it.amount)
        .map((it) => ({ visaCandidateId: Number(it.visaCandidateId), amount: Number(it.amount) }));
      await onSubmit({
        paymentDate,
        bankTnxId,
        amount: Number(amount),
        currency,
        visaBankAccountId: Number(visaBankAccountId),
        receiptUrl,
        purpose: purpose || undefined,
        invoiceNumber: invoiceNumber || undefined,
        euroAmount: euroAmount ? Number(euroAmount) : undefined,
        euroRate: euroRate ? Number(euroRate) : undefined,
        items: validItems.length > 0 ? validItems : undefined,
      });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not save this top-up.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1E3D]/60 p-4 backdrop-blur-sm">
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
      >
        <h3 className="mb-4 flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]">
          <FaFileInvoiceDollar />
          Add agency top-up
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
              {error}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FieldLabel>Payment date</FieldLabel>
              <input type="date" className={inputClass} value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} required />
            </div>
            <div>
              <FieldLabel>Bank TNX ID</FieldLabel>
              <input className={inputClass} value={bankTnxId} onChange={(e) => setBankTnxId(e.target.value)} required />
            </div>
            <div>
              <FieldLabel>Amount</FieldLabel>
              <input type="number" min="0" step="0.01" className={inputClass} value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <div>
              <FieldLabel>Currency</FieldLabel>
              <input className={inputClass} list="topup-currencies" value={currency} onChange={(e) => setCurrency(e.target.value)} required />
              <datalist id="topup-currencies">
                {TOPUP_CURRENCIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
            <div className="col-span-2">
              <FieldLabel>Receiver bank account</FieldLabel>
              <select className={selectClass} value={visaBankAccountId} onChange={(e) => setVisaBankAccountId(e.target.value)} required>
                <option value="">Select bank account</option>
                {bankAccounts.map((a) => (
                  <option key={a.visaBankAccountId} value={a.visaBankAccountId}>
                    {a.bankName} — {a.accountNumber}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <FieldLabel>Purpose / note (optional)</FieldLabel>
              <input className={inputClass} value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="e.g. Serbia Worker Embassy Submission Fee" />
            </div>
            <div className="col-span-2">
              <FieldLabel>Receipt</FieldLabel>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#0B1E3D]/15 bg-white px-4 py-2.5 text-sm font-bold text-[#0B1E3D]/70 transition hover:border-[#1a5fd8]/40 hover:text-[#1a5fd8]">
                {uploadingReceipt ? "Uploading…" : receiptUrl ? "Receipt uploaded ✓" : "Upload receipt (image or PDF)"}
                <input
                  type="file"
                  accept="image/png,image/jpeg,application/pdf"
                  className="hidden"
                  disabled={uploadingReceipt}
                  onChange={(e) => handleReceiptFile(e.target.files?.[0])}
                />
              </label>
            </div>
            <div>
              <FieldLabel>Invoice number (optional)</FieldLabel>
              <input className={inputClass} value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
            </div>
            <div>
              <FieldLabel>Euro amount (optional)</FieldLabel>
              <input type="number" min="0" step="0.01" className={inputClass} value={euroAmount} onChange={(e) => setEuroAmount(e.target.value)} />
            </div>
            <div>
              <FieldLabel>Euro rate (optional)</FieldLabel>
              <input type="number" min="0" step="0.01" className={inputClass} value={euroRate} onChange={(e) => setEuroRate(e.target.value)} />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <FieldLabel>Candidates covered by this top-up (optional)</FieldLabel>
              <button type="button" onClick={addItemRow} className="text-xs font-bold text-[#1a5fd8] hover:underline">
                + Add candidate
              </button>
            </div>
            {items.length === 0 ? (
              <p className="text-xs font-medium text-[#0B1E3D]/40">No candidates linked yet.</p>
            ) : (
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <select
                      className={`${selectClass} flex-1`}
                      value={item.visaCandidateId}
                      onChange={(e) => updateItemRow(index, "visaCandidateId", e.target.value)}
                    >
                      <option value="">Select candidate</option>
                      {candidates.map((c) => (
                        <option key={c.visaCandidateId} value={c.visaCandidateId}>
                          {c.fullName} · {c.passportNo}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className={`${inputClass} w-32`}
                      placeholder="Amount"
                      value={item.amount}
                      onChange={(e) => updateItemRow(index, "amount", e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeItemRow(index)}
                      className="shrink-0 text-red-500 hover:text-red-700"
                      aria-label="Remove candidate line"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <PrimaryButton type="submit" disabled={saving || uploadingReceipt}>
              {saving ? "Saving…" : "Save top-up"}
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
