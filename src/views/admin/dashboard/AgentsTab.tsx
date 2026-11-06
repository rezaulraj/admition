"use client";

import React, { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaDownload,
  FaExclamationTriangle,
  FaEye,
  FaFilePdf,
  FaPlus,
  FaTrash,
  FaUserTie,
} from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { fetchAuthenticatedFileUrl, downloadAuthenticatedFile } from "@/lib/api";
import { AGENT_DOC_TYPES, AGENT_DOC_LABELS, type AgentDocType } from "@/lib/agent-documents";
import { confirmDelete } from "@/lib/confirm";
import { useToast } from "@/lib/toast-context";
import {
  Badge,
  Card,
  EmptyState,
  ErrorState,
  FieldLabel,
  FilePreviewModal,
  LoadingState,
  PrimaryButton,
  SecondaryButton,
  SectionHeading,
  inputClass,
  selectClass,
} from "@/components/dashboard/common/ui";
import { PaginationControls, usePagination } from "@/components/dashboard/common/Pagination";
import type { AgentAgreement, AgentProfile } from "@/views/partner/dashboard/types";
import { AGREEMENT_COLORS, APPROVAL_COLORS } from "@/views/partner/dashboard/types";

interface Certificate {
  certificateId: number;
  title: string;
  filePath: string;
  issuedAt: string;
}

function docPath(agent: AgentProfile, docType: AgentDocType): string | null {
  switch (docType) {
    case "identity":
      return agent.identityDocFilePath;
    case "trade-license":
      return agent.tradeLicenseFilePath;
    case "owner-photo":
      return agent.ownerPhotoFilePath;
  }
}

function isKycComplete(agent: AgentProfile) {
  return Boolean(agent.identityDocFilePath && agent.tradeLicenseFilePath && agent.ownerPhotoFilePath);
}

export default function AgentsTab() {
  const { authFetch } = useAuth();
  const { showToast } = useToast();
  const [agents, setAgents] = useState<AgentProfile[] | null>(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const load = () => {
    setError("");
    setAgents(null);
    const params = filter ? `?approvalStatus=${filter}` : "";
    authFetch<AgentProfile[]>(`/agents${params}`)
      .then(setAgents)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load agents."));
  };

  useEffect(load, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  const { page, setPage, pageSize, setPageSize, totalPages, totalItems, pageItems } = usePagination(agents ?? []);

  const handleDecision = async (agentId: number, action: "approve" | "reject") => {
    try {
      await authFetch(`/agents/${agentId}/${action}`, { method: "PATCH" });
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not update this agent.");
    }
  };

  const handleDelete = async (agentId: number, fullName: string) => {
    const confirmed = await confirmDelete(`Delete ${fullName}'s partner account? This can't be undone.`);
    if (!confirmed) return;
    try {
      await authFetch(`/agents/${agentId}`, { method: "DELETE" });
      showToast(`${fullName}'s partner account was deleted.`, "success");
      load();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not delete this agent.", "error");
    }
  };

  return (
    <div className="fade-in">
      <SectionHeading title="Manage Agents" subtitle="Approve recruitment partners and manage their agreements." />

      <div className="mb-4 w-56">
        <FieldLabel>Filter by status</FieldLabel>
        <select className={selectClass} value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All agents</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {agents === null && !error && <LoadingState label="Loading agents…" />}
      {error && <ErrorState message={error} onRetry={load} />}
      {agents && agents.length === 0 && <EmptyState title="No agents match this filter" />}

      {agents && agents.length > 0 && (
        <>
          <div className="space-y-3">
            {pageItems.map((agent) => (
              <AgentRow
                key={agent.agentId}
                agent={agent}
                isOpen={expandedId === agent.agentId}
                onToggle={() => setExpandedId(expandedId === agent.agentId ? null : agent.agentId)}
                onDecision={handleDecision}
                onDelete={() => handleDelete(agent.agentId, agent.fullName)}
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

function AgentRow({
  agent,
  isOpen,
  onToggle,
  onDecision,
  onDelete,
}: {
  agent: AgentProfile;
  isOpen: boolean;
  onToggle: () => void;
  onDecision: (agentId: number, action: "approve" | "reject") => void;
  onDelete: () => void;
}) {
  const { authFetch, accessToken } = useAuth();
  const { showToast } = useToast();
  const [agreements, setAgreements] = useState<AgentAgreement[] | null>(null);
  const [certificates, setCertificates] = useState<Certificate[] | null>(null);
  const [detailError, setDetailError] = useState("");

  const [issuingAgreement, setIssuingAgreement] = useState(false);
  const [updatingAgreementId, setUpdatingAgreementId] = useState<number | null>(null);
  const [currentNote, setCurrentNote] = useState(agent.kycReviewNote);
  const [noteDraft, setNoteDraft] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [newCertTitle, setNewCertTitle] = useState("");
  const [newCertPath, setNewCertPath] = useState("");
  const [addingCert, setAddingCert] = useState(false);
  const [preview, setPreview] = useState<{ url: string; mimeType: string; title: string } | null>(null);

  const loadDetail = () => {
    setDetailError("");
    authFetch<AgentAgreement[]>(`/agents/${agent.agentId}/agreements`)
      .then(setAgreements)
      .catch((err) => setDetailError(err instanceof ApiError ? err.message : "Failed to load agreements."));
    authFetch<Certificate[]>(`/agents/${agent.agentId}/certificates`)
      .then(setCertificates)
      .catch(() => setCertificates([]));
  };

  useEffect(() => {
    if (isOpen && agreements === null) loadDetail();
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setCurrentNote(agent.kycReviewNote);
  }, [agent.kycReviewNote]);

  const handleIssueAgreement = async (file: File) => {
    setIssuingAgreement(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      await authFetch(`/agents/${agent.agentId}/agreements`, { method: "POST", body: formData });
      showToast("Agreement uploaded.", "success");
      loadDetail();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not issue agreement.", "error");
    } finally {
      setIssuingAgreement(false);
    }
  };

  const handleMarkSigned = async (agreementId: number) => {
    setUpdatingAgreementId(agreementId);
    try {
      await authFetch(`/agents/agreements/${agreementId}`, { method: "PATCH", body: { status: "Signed" } });
      showToast("Agreement marked as signed.", "success");
      loadDetail();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not update agreement status.", "error");
    } finally {
      setUpdatingAgreementId(null);
    }
  };

  const handleViewAgreementFile = async (agreementId: number, variant: "original" | "signed") => {
    try {
      const { url, mimeType } = await fetchAuthenticatedFileUrl(
        `/agents/${agent.agentId}/agreements/${agreementId}/file/${variant}`,
        accessToken,
      );
      setPreview({ url, mimeType, title: `Agreement #${agreementId} (${variant})` });
    } catch (err) {
      console.error("View agreement failed:", err);
      setDetailError(err instanceof Error ? err.message : "Could not open the file.");
    }
  };

  const closePreview = () => {
    if (preview) URL.revokeObjectURL(preview.url);
    setPreview(null);
  };

  const handleRemoveAgreement = async (agreementId: number) => {
    const confirmed = await confirmDelete(`Delete Agreement #${agreementId}? This can't be undone.`);
    if (!confirmed) return;
    try {
      await authFetch(`/agents/agreements/${agreementId}`, { method: "DELETE" });
      showToast("Agreement deleted.", "success");
      loadDetail();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not remove agreement.", "error");
    }
  };

  const handleDownloadAgreementFile = (agreementId: number, variant: "original" | "signed") => {
    downloadAuthenticatedFile(
      `/agents/${agent.agentId}/agreements/${agreementId}/file/${variant}`,
      accessToken,
      `agreement-${agreementId}-${variant}`,
    ).catch(() => setDetailError("Could not download the file."));
  };

  const handleViewDocFile = async (docType: AgentDocType) => {
    try {
      const { url, mimeType } = await fetchAuthenticatedFileUrl(
        `/agents/${agent.agentId}/documents/${docType}`,
        accessToken,
      );
      setPreview({ url, mimeType, title: AGENT_DOC_LABELS[docType] });
    } catch (err) {
      console.error("View document failed:", err);
      setDetailError(err instanceof Error ? err.message : "Could not open the document.");
    }
  };

  const handleDownloadDocFile = (docType: AgentDocType) => {
    downloadAuthenticatedFile(
      `/agents/${agent.agentId}/documents/${docType}`,
      accessToken,
      `${agent.fullName.replace(/\s+/g, "-")}-${docType}`,
    ).catch(() => setDetailError("Could not download the document."));
  };

  const handleSendNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavingNote(true);
    try {
      const updated = await authFetch<AgentProfile>(`/agents/${agent.agentId}/kyc-note`, {
        method: "PATCH",
        body: { note: noteDraft },
      });
      setCurrentNote(updated.kycReviewNote);
      setNoteDraft("");
      showToast("Note sent to partner.", "success");
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not send the note.", "error");
    } finally {
      setSavingNote(false);
    }
  };

  const handleClearNote = async () => {
    setSavingNote(true);
    try {
      const updated = await authFetch<AgentProfile>(`/agents/${agent.agentId}/kyc-note`, {
        method: "PATCH",
        body: { note: "" },
      });
      setCurrentNote(updated.kycReviewNote);
      showToast("Note cleared.", "success");
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not clear the note.", "error");
    } finally {
      setSavingNote(false);
    }
  };

  const handleAddCertificate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddingCert(true);
    try {
      await authFetch(`/agents/${agent.agentId}/certificates`, {
        method: "POST",
        body: { title: newCertTitle, filePath: newCertPath },
      });
      setNewCertTitle("");
      setNewCertPath("");
      showToast("Certificate added.", "success");
      loadDetail();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not add certificate.", "error");
    } finally {
      setAddingCert(false);
    }
  };

  const handleRemoveCertificate = async (certificateId: number, title: string) => {
    const confirmed = await confirmDelete(`Delete certificate "${title}"? This can't be undone.`);
    if (!confirmed) return;
    try {
      await authFetch(`/agents/certificates/${certificateId}`, { method: "DELETE" });
      showToast("Certificate deleted.", "success");
      loadDetail();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not remove certificate.", "error");
    }
  };

  return (
    <Card className="p-0">
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <button onClick={onToggle} className="flex flex-1 items-center gap-3 text-left min-w-0">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A]">
            <FaUserTie size={15} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#0B1E3D]">{agent.fullName}</p>
            <p className="truncate text-xs font-medium text-[#0B1E3D]/45">
              {agent.email} {agent.companyName ? `· ${agent.companyName}` : ""}
            </p>
          </div>
        </button>
        <div className="flex shrink-0 items-center gap-3">
          <Badge label={agent.approvalStatus} color={APPROVAL_COLORS[agent.approvalStatus]} />
          {agent.approvalStatus === "Pending" && !agent.verificationSubmittedAt && (
            <span
              title="Partner hasn't submitted their verification wizard yet"
              className="hidden items-center gap-1 text-amber-600 sm:flex"
            >
              <FaExclamationTriangle size={12} />
            </span>
          )}
          {agent.approvalStatus === "Pending" && !isKycComplete(agent) && (
            <span
              title="KYC documents incomplete — check Verification Details before approving"
              className="hidden items-center gap-1 text-amber-600 sm:flex"
            >
              <FaExclamationTriangle size={12} />
            </span>
          )}
          {agent.approvalStatus === "Pending" && (
            <div className="hidden gap-2 sm:flex">
              <SecondaryButton onClick={() => onDecision(agent.agentId, "reject")} className="!px-3 !py-1.5 !text-xs">
                Reject
              </SecondaryButton>
              <span title={!agent.verificationSubmittedAt ? "Partner hasn't submitted their verification wizard yet" : undefined}>
                <PrimaryButton
                  onClick={() => onDecision(agent.agentId, "approve")}
                  disabled={!agent.verificationSubmittedAt}
                  className="!px-3 !py-1.5 !text-xs"
                >
                  Approve
                </PrimaryButton>
              </span>
            </div>
          )}
          <button onClick={onDelete} className="text-red-500 hover:text-red-700" aria-label="Delete agent">
            <FaTrash size={13} />
          </button>
          <button onClick={onToggle} aria-label="Toggle agent details">
            <FaChevronDown size={12} className={`text-[#0B1E3D]/30 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-[#0B1E3D]/8 px-5 py-4 space-y-5">
          {agent.approvalStatus === "Pending" && (
            <div className="flex gap-2 sm:hidden">
              <SecondaryButton onClick={() => onDecision(agent.agentId, "reject")}>Reject</SecondaryButton>
              <PrimaryButton onClick={() => onDecision(agent.agentId, "approve")} disabled={!agent.verificationSubmittedAt}>
                Approve
              </PrimaryButton>
            </div>
          )}

          {detailError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
              {detailError}
            </div>
          )}

          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0B1E3D]/40">
              Verification wizard
            </p>
            {agent.verificationSubmittedAt ? (
              <p className="mb-2 text-xs font-semibold text-emerald-600">
                Submitted on {new Date(agent.verificationSubmittedAt).toLocaleDateString()}
              </p>
            ) : (
              <p className="mb-2 text-xs font-semibold text-amber-600">Not submitted yet — cannot be approved.</p>
            )}
            <div className="grid grid-cols-1 gap-3 rounded-lg bg-gray-50/70 px-3.5 py-3 text-xs sm:grid-cols-2">
              <div>
                <p className="font-bold uppercase tracking-[0.06em] text-[#0B1E3D]/40">Business registration address</p>
                <p className="mt-0.5 font-semibold text-[#0B1E3D]">{agent.businessRegistrationAddress ?? "—"}</p>
              </div>
              <div>
                <p className="font-bold uppercase tracking-[0.06em] text-[#0B1E3D]/40">Staff count</p>
                <p className="mt-0.5 font-semibold text-[#0B1E3D]">{agent.staffCount ?? "—"}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="font-bold uppercase tracking-[0.06em] text-[#0B1E3D]/40">Contact person</p>
                <p className="mt-0.5 font-semibold text-[#0B1E3D]">
                  {agent.contactPersonName ?? "—"}
                  {agent.contactPersonDesignation ? ` · ${agent.contactPersonDesignation}` : ""}
                </p>
                <p className="mt-0.5 text-[#0B1E3D]/60">
                  {agent.contactPersonPhone ?? "—"} · {agent.contactPersonEmail ?? "—"}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="font-bold uppercase tracking-[0.06em] text-[#0B1E3D]/40">Countries interested in</p>
                <p className="mt-0.5 font-semibold text-[#0B1E3D]">
                  {agent.destinations.length > 0
                    ? agent.destinations.map((d) => d.country.countryName).join(", ")
                    : "—"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0B1E3D]/40">
              Verification documents
            </p>
            {!isKycComplete(agent) && (
              <div className="mb-2 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
                <FaExclamationTriangle size={11} />
                Incomplete — Owner National ID Card, Business Registration Certificate, and Owner Photo are expected before approving.
              </div>
            )}
            <ul className="space-y-1.5">
              {AGENT_DOC_TYPES.map((docType) => {
                const uploaded = Boolean(docPath(agent, docType));
                return (
                  <li
                    key={docType}
                    className="flex items-center justify-between rounded-lg bg-gray-50/70 px-3 py-2 text-xs"
                  >
                    <span className="flex items-center gap-2 font-semibold text-[#0B1E3D]">
                      <FaFilePdf className={uploaded ? "text-emerald-600" : "text-[#0B1E3D]/30"} size={12} />
                      {AGENT_DOC_LABELS[docType]}
                      <span className={uploaded ? "text-emerald-600" : "text-[#0B1E3D]/40"}>
                        · {uploaded ? "Uploaded" : "Not uploaded"}
                      </span>
                    </span>
                    {uploaded && (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleViewDocFile(docType)}
                          className="inline-flex items-center gap-1.5 text-[#1a5fd8] hover:text-[#1a5fd8]/70"
                        >
                          <FaEye size={11} /> View
                        </button>
                        <button
                          onClick={() => handleDownloadDocFile(docType)}
                          className="inline-flex items-center gap-1.5 text-[#1a5fd8] hover:text-[#1a5fd8]/70"
                        >
                          <FaDownload size={11} /> Download
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-3">
              {currentNote && (
                <div className="mb-2 flex items-start justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs">
                  <div>
                    <p className="font-bold text-amber-800">Issue sent to partner:</p>
                    <p className="font-medium text-amber-700">{currentNote}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearNote}
                    disabled={savingNote}
                    className="shrink-0 font-bold text-amber-700 hover:text-amber-900"
                  >
                    Clear
                  </button>
                </div>
              )}
              <form onSubmit={handleSendNote} className="flex items-end gap-2">
                <div className="flex-1">
                  <FieldLabel>{currentNote ? "Update issue note" : "Flag a document issue"}</FieldLabel>
                  <input
                    className={inputClass}
                    value={noteDraft}
                    onChange={(e) => setNoteDraft(e.target.value)}
                    placeholder="e.g. Your NID photo is blurry, please re-upload a clearer copy."
                  />
                </div>
                <PrimaryButton type="submit" disabled={savingNote || !noteDraft.trim()}>
                  {savingNote ? "Sending…" : "Send to partner"}
                </PrimaryButton>
              </form>
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0B1E3D]/40">Agreements File Upload</p>
            {agreements === null ? (
              <LoadingState label="Loading agreements…" />
            ) : agreements.length === 0 ? (
              <p className="mb-3 text-xs font-medium text-[#0B1E3D]/40">No agreements issued yet.</p>
            ) : (
              <ul className="mb-3 space-y-1.5">
                {agreements.map((a) => (
                  <li
                    key={a.agreementId}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-gray-50/70 px-3 py-2 text-xs"
                  >
                    <span className="font-semibold text-[#0B1E3D]">Agreement #{a.agreementId}</span>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge label={a.status} color={AGREEMENT_COLORS[a.status]} />
                      <button
                        onClick={() => handleViewAgreementFile(a.agreementId, "original")}
                        className="inline-flex items-center gap-1.5 text-[#1a5fd8] hover:text-[#1a5fd8]/70"
                      >
                        <FaEye size={11} /> View
                      </button>
                      <button
                        onClick={() => handleDownloadAgreementFile(a.agreementId, "original")}
                        className="inline-flex items-center gap-1.5 text-[#1a5fd8] hover:text-[#1a5fd8]/70"
                      >
                        <FaDownload size={11} /> Download
                      </button>
                      {a.signedFilePath && (
                        <>
                          <button
                            onClick={() => handleViewAgreementFile(a.agreementId, "signed")}
                            className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800"
                          >
                            <FaEye size={11} /> View signed copy
                          </button>
                          <button
                            onClick={() => handleDownloadAgreementFile(a.agreementId, "signed")}
                            className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800"
                          >
                            <FaDownload size={11} /> Download signed copy
                          </button>
                        </>
                      )}
                      {a.status === "Submitted" && (
                        <PrimaryButton
                          onClick={() => handleMarkSigned(a.agreementId)}
                          disabled={updatingAgreementId === a.agreementId}
                          className="!px-2.5 !py-1 !text-[11px]"
                        >
                          {updatingAgreementId === a.agreementId ? "Updating…" : "Mark as Signed"}
                        </PrimaryButton>
                      )}
                      <button
                        onClick={() => handleRemoveAgreement(a.agreementId)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Delete agreement"
                      >
                        <FaTrash size={11} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#0B1E3D] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#0B1E3D]/90">
              <FaPlus size={11} />
              {issuingAgreement ? "Uploading…" : "Upload agreement PDF"}
              <input
                type="file"
                accept="image/jpeg,image/png,application/pdf"
                className="hidden"
                disabled={issuingAgreement}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  if (file) handleIssueAgreement(file);
                }}
              />
            </label>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0B1E3D]/40">Certificates</p>
            {certificates && certificates.length > 0 && (
              <ul className="mb-3 space-y-1.5">
                {certificates.map((c) => (
                  <li key={c.certificateId} className="flex items-center justify-between rounded-lg bg-gray-50/70 px-3 py-2 text-xs">
                    <span className="font-semibold text-[#0B1E3D]">{c.title}</span>
                    <button
                      onClick={() => handleRemoveCertificate(c.certificateId, c.title)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Delete certificate"
                    >
                      <FaTrash size={11} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <form onSubmit={handleAddCertificate} className="flex items-end gap-2">
              <div className="flex-1">
                <FieldLabel>Title</FieldLabel>
                <input className={inputClass} value={newCertTitle} onChange={(e) => setNewCertTitle(e.target.value)} required />
              </div>
              <div className="flex-1">
                <FieldLabel>File path / URL</FieldLabel>
                <input className={inputClass} value={newCertPath} onChange={(e) => setNewCertPath(e.target.value)} required />
              </div>
              <PrimaryButton type="submit" disabled={addingCert}>
                <FaPlus size={11} />
                Add
              </PrimaryButton>
            </form>
          </div>
        </div>
      )}

      {preview && (
        <FilePreviewModal url={preview.url} mimeType={preview.mimeType} title={preview.title} onClose={closePreview} />
      )}
    </Card>
  );
}
