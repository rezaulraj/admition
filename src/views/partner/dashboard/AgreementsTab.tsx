"use client";

import React, { useEffect, useState } from "react";
import { FaDownload, FaEye, FaFileSignature, FaFileUpload } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { downloadAuthenticatedFile, fetchAuthenticatedFileUrl } from "@/lib/api";
import { useToast } from "@/lib/toast-context";
import { Badge, Card, EmptyState, ErrorState, FilePreviewModal, LoadingState, SectionHeading } from "@/components/dashboard/common/ui";
import { PaginationControls, usePagination } from "@/components/dashboard/common/Pagination";
import type { AgentAgreement } from "./types";
import { AGREEMENT_COLORS } from "./types";

export default function AgreementsTab() {
  const { authFetch, accessToken } = useAuth();
  const { showToast } = useToast();
  const [agreements, setAgreements] = useState<AgentAgreement[] | null>(null);
  const [error, setError] = useState("");
  const [submittingId, setSubmittingId] = useState<number | null>(null);
  const [preview, setPreview] = useState<{ url: string; mimeType: string; title: string } | null>(null);

  const load = () => {
    setError("");
    setAgreements(null);
    authFetch<AgentAgreement[]>("/agents/me/agreements")
      .then(setAgreements)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load agreements."));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { page, setPage, pageSize, setPageSize, totalPages, totalItems, pageItems } = usePagination(
    agreements ?? [],
  );

  const handleView = async (agreement: AgentAgreement, variant: "original" | "signed") => {
    try {
      const { url, mimeType } = await fetchAuthenticatedFileUrl(
        `/agents/${agreement.agentId}/agreements/${agreement.agreementId}/file/${variant}`,
        accessToken,
      );
      setPreview({ url, mimeType, title: `Agreement #${agreement.agreementId} (${variant})` });
    } catch (err) {
      console.error("View agreement failed:", err);
      showToast(err instanceof Error ? err.message : "Could not open the file.", "error");
    }
  };

  const closePreview = () => {
    if (preview) URL.revokeObjectURL(preview.url);
    setPreview(null);
  };

  const handleDownload = (agreement: AgentAgreement, variant: "original" | "signed") => {
    downloadAuthenticatedFile(
      `/agents/${agreement.agentId}/agreements/${agreement.agreementId}/file/${variant}`,
      accessToken,
      `agreement-${agreement.agreementId}-${variant}`,
    ).catch(() => showToast("Could not download the file.", "error"));
  };

  const handleSubmitSigned = async (agreementId: number, file: File) => {
    setSubmittingId(agreementId);
    try {
      const formData = new FormData();
      formData.append("file", file);
      await authFetch(`/agents/me/agreements/${agreementId}/submit`, { method: "PATCH", body: formData });
      showToast("Signed agreement submitted for review.", "success");
      load();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not submit the signed agreement.", "error");
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <div className="fade-in">
      <SectionHeading title="All Agreements" subtitle="Partnership agreements issued to you by AdmissionOnBoard." />

      {agreements === null && !error && <LoadingState label="Loading agreements…" />}
      {error && <ErrorState message={error} onRetry={load} />}

      {agreements && agreements.length === 0 && (
        <EmptyState
          title="No agreements yet"
          description="Agreements issued by an admin for your account will show up here for you to review and sign."
        />
      )}

      {agreements && agreements.length > 0 && (
        <>
          <div className="space-y-3">
            {pageItems.map((a) => {
              const canSubmit = a.status === "Pending" || a.status === "Submitted";
              const isSubmitting = submittingId === a.agreementId;
              return (
                <Card key={a.agreementId} className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A]">
                      <FaFileSignature size={15} />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#0B1E3D]">Agreement #{a.agreementId}</p>
                      <p className="truncate text-xs font-medium text-[#0B1E3D]/45">
                        Issued {new Date(a.createdAt).toLocaleDateString()}
                        {a.signedAt ? ` · Submitted ${new Date(a.signedAt).toLocaleDateString()}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <Badge label={a.status} color={AGREEMENT_COLORS[a.status]} />
                    <button
                      type="button"
                      onClick={() => handleView(a, "original")}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#1a5fd8]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#1a5fd8] transition hover:bg-[#1a5fd8]/5"
                    >
                      <FaEye size={11} /> View agreement
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload(a, "original")}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#1a5fd8]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#1a5fd8] transition hover:bg-[#1a5fd8]/5"
                    >
                      <FaDownload size={11} /> Download
                    </button>
                    {a.signedFilePath && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleView(a, "signed")}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-50"
                        >
                          <FaEye size={11} /> View your submission
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDownload(a, "signed")}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-50"
                        >
                          <FaDownload size={11} /> Download your submission
                        </button>
                      </>
                    )}
                    {canSubmit && (
                      <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#0B1E3D] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#0B1E3D]/90">
                        <FaFileUpload size={11} />
                        {isSubmitting ? "Uploading…" : a.signedFilePath ? "Replace signed copy" : "Submit signed copy"}
                        <input
                          type="file"
                          accept="image/jpeg,image/png,application/pdf"
                          className="hidden"
                          disabled={isSubmitting}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            e.target.value = "";
                            if (file) handleSubmitSigned(a.agreementId, file);
                          }}
                        />
                      </label>
                    )}
                  </div>
                </Card>
              );
            })}
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

      {preview && (
        <FilePreviewModal url={preview.url} mimeType={preview.mimeType} title={preview.title} onClose={closePreview} />
      )}
    </div>
  );
}
