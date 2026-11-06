"use client";

import { useEffect, useState } from "react";
import { FaDownload, FaEnvelope, FaGraduationCap, FaPhoneAlt, FaTrash, FaUniversity } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { apiFetch, downloadAuthenticatedFile } from "@/lib/api";
import { confirmDelete } from "@/lib/confirm";
import { useToast } from "@/lib/toast-context";
import {
  Card,
  EmptyState,
  ErrorState,
  LoadingState,
  SectionHeading,
  selectClass,
} from "@/components/dashboard/common/ui";
import { PaginationControls, usePagination } from "@/components/dashboard/common/Pagination";
import type { Lead, University } from "@/views/student/dashboard/types";

export default function LeadsTab() {
  const { authFetch, accessToken } = useAuth();
  const { showToast } = useToast();
  const [universities, setUniversities] = useState<University[]>([]);
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [exporting, setExporting] = useState(false);

  const load = () => {
    setError("");
    setLeads(null);
    const params = new URLSearchParams();
    if (universityId) params.set("universityId", universityId);
    authFetch<Lead[]>(`/leads?${params.toString()}`)
      .then(setLeads)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load leads."));
  };

  useEffect(() => {
    apiFetch<University[]>("/universities").then(setUniversities).catch(() => setUniversities([]));
  }, []);

  useEffect(() => {
    load();
  }, [universityId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async (leadId: number) => {
    const confirmed = await confirmDelete("Delete this lead?");
    if (!confirmed) return;
    try {
      await authFetch(`/leads/${leadId}`, { method: "DELETE" });
      showToast("Lead deleted.", "success");
      load();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not delete this lead.", "error");
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const params = new URLSearchParams();
      if (universityId) params.set("universityId", universityId);
      await downloadAuthenticatedFile(`/leads/export?${params.toString()}`, accessToken, "leads-export");
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not export leads.", "error");
    } finally {
      setExporting(false);
    }
  };

  const { page, setPage, pageSize, setPageSize, totalPages, totalItems, pageItems } = usePagination(leads ?? []);

  return (
    <div className="fade-in space-y-6">
      <SectionHeading
        title="Leads"
        subtitle="Inquiries submitted from each university's inquiry landing page — share those links with your email marketing team."
      />

      <Card>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#0B1E3D]/60">Filter by university</label>
            <select className={`${selectClass} w-64`} value={universityId} onChange={(e) => setUniversityId(e.target.value)}>
              <option value="">All universities</option>
              {universities.map((u) => (
                <option key={u.universityId} value={u.universityId}>
                  {u.universityName}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleExport}
            disabled={!leads || leads.length === 0 || exporting}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#0B1E3D] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#0B1E3D]/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaDownload size={11} />
            {exporting ? "Exporting…" : "Export CSV"}
          </button>
        </div>
      </Card>

      {leads === null && !error && <LoadingState label="Loading leads…" />}
      {error && <ErrorState message={error} onRetry={load} />}
      {leads && leads.length === 0 && <EmptyState title="No leads yet" description="Submissions from inquiry landing pages will show up here." />}

      {leads && leads.length > 0 && (
        <>
          <div className="space-y-3">
            {pageItems.map((lead) => (
              <Card key={lead.leadId} className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1.5">
                  <p className="text-sm font-bold text-[#0B1E3D]">
                    {lead.firstName} {lead.lastName}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-[#0B1E3D]/60">
                    <span className="inline-flex items-center gap-1.5">
                      <FaEnvelope size={11} />
                      {lead.email}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <FaPhoneAlt size={10} />
                      {lead.phone}
                    </span>
                    {lead.university && (
                      <span className="inline-flex items-center gap-1.5">
                        <FaUniversity size={11} />
                        {lead.university.universityName}
                      </span>
                    )}
                    {lead.preferredStudyLevel && (
                      <span className="inline-flex items-center gap-1.5">
                        <FaGraduationCap size={11} />
                        {lead.preferredStudyLevel}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-medium text-[#0B1E3D]/40">
                    Submitted {new Date(lead.createdAt).toLocaleString()}
                    {lead.intake && ` · Interested in ${lead.intake.intakeName} ${lead.intake.intakeYear}`}
                    {lead.wantsContact && " · OK to contact"}
                    {lead.wantsUpdates && " · Wants updates"}
                  </p>
                </div>
                <button onClick={() => handleDelete(lead.leadId)} className="shrink-0 text-red-500 hover:text-red-700" aria-label="Delete lead">
                  <FaTrash size={13} />
                </button>
              </Card>
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
