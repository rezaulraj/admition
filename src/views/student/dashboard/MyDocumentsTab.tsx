"use client";

import React, { useEffect, useState } from "react";
import { FaEye, FaFileUpload } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { fetchAuthenticatedFileUrl } from "@/lib/api";
import { useToast } from "@/lib/toast-context";
import { STUDENT_DOC_TYPES, STUDENT_DOC_LABELS, type StudentDocType } from "@/lib/student-documents";
import { Card, ErrorState, FilePreviewModal, LoadingState, SectionHeading } from "./ui";

interface StudentDocumentRow {
  studentDocumentId: number;
  studentId: number;
  docType: StudentDocType;
  filePath: string;
  uploadedAt: string;
}

function findDoc(documents: StudentDocumentRow[], docType: StudentDocType): StudentDocumentRow | undefined {
  return documents.find((d) => d.docType === docType);
}

export default function MyDocumentsTab() {
  const { authFetch, accessToken } = useAuth();
  const { showToast } = useToast();

  const [documents, setDocuments] = useState<StudentDocumentRow[] | null>(null);
  const [loadError, setLoadError] = useState("");
  const [uploadingDoc, setUploadingDoc] = useState<StudentDocType | null>(null);
  const [preview, setPreview] = useState<{ url: string; mimeType: string; title: string } | null>(null);

  const load = () => {
    setLoadError("");
    authFetch<StudentDocumentRow[]>("/students/me/documents")
      .then(setDocuments)
      .catch((err) => setLoadError(err instanceof ApiError ? err.message : "Failed to load your documents."));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpload = async (docType: StudentDocType, file: File) => {
    setUploadingDoc(docType);
    try {
      const formData = new FormData();
      formData.append("file", file);
      await authFetch(`/students/me/documents/${docType}`, { method: "POST", body: formData });
      showToast(`${STUDENT_DOC_LABELS[docType]} uploaded.`, "success");
      load();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not upload the document.", "error");
    } finally {
      setUploadingDoc(null);
    }
  };

  const handleView = async (doc: StudentDocumentRow) => {
    try {
      const { url, mimeType } = await fetchAuthenticatedFileUrl(
        `/students/${doc.studentId}/documents/${doc.studentDocumentId}/file`,
        accessToken,
      );
      setPreview({ url, mimeType, title: STUDENT_DOC_LABELS[doc.docType] });
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Could not open the document.", "error");
    }
  };

  const closePreview = () => {
    if (preview) URL.revokeObjectURL(preview.url);
    setPreview(null);
  };

  if (loadError) return <ErrorState message={loadError} onRetry={load} />;
  if (!documents) return <LoadingState label="Loading your documents…" />;

  return (
    <div className="fade-in space-y-6">
      <SectionHeading
        title="My Documents"
        subtitle="Upload your Passport and Academic Certificate — required before you can submit an application."
      />

      <Card>
        <div className="space-y-3">
          {STUDENT_DOC_TYPES.map((docType) => {
            const doc = findDoc(documents, docType);
            const uploaded = Boolean(doc);
            const isUploading = uploadingDoc === docType;
            return (
              <div
                key={docType}
                className="flex flex-col gap-3 rounded-xl bg-gray-50/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <FaFileUpload className={uploaded ? "text-emerald-600" : "text-[#0B1E3D]/30"} size={16} />
                  <div>
                    <p className="text-sm font-bold text-[#0B1E3D]">{STUDENT_DOC_LABELS[docType]}</p>
                    <p className={`text-xs font-semibold ${uploaded ? "text-emerald-600" : "text-[#0B1E3D]/40"}`}>
                      {uploaded ? `Uploaded ${new Date(doc!.uploadedAt).toLocaleDateString()}` : "Not uploaded yet"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {uploaded && (
                    <button
                      type="button"
                      onClick={() => handleView(doc!)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#1a5fd8]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#1a5fd8] transition hover:bg-[#1a5fd8]/5"
                    >
                      <FaEye size={11} /> View
                    </button>
                  )}
                  <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#0B1E3D] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#0B1E3D]/90">
                    <FaFileUpload size={11} />
                    {isUploading ? "Uploading…" : uploaded ? "Replace" : "Upload"}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,application/pdf"
                      className="hidden"
                      disabled={isUploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        e.target.value = "";
                        if (file) handleUpload(docType, file);
                      }}
                    />
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {preview && (
        <FilePreviewModal url={preview.url} mimeType={preview.mimeType} title={preview.title} onClose={closePreview} />
      )}
    </div>
  );
}
