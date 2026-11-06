"use client";

import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaUserCircle } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";
import {
  Badge,
  Card,
  EmptyState,
  ErrorState,
  FieldLabel,
  LoadingState,
  PrimaryButton,
  SectionHeading,
  inputClass,
  selectClass,
} from "@/components/dashboard/common/ui";
import { PaginationControls, usePagination } from "@/components/dashboard/common/Pagination";
import type { TeamMember, TeamMemberRole, TeamMemberStatus } from "./types";

const ROLE_COLORS: Record<TeamMemberRole, string> = { Manager: "#1E3A8A", Staff: "#64748b" };
const STATUS_COLORS: Record<TeamMemberStatus, string> = { Active: "#15803d", Inactive: "#78716c" };

export default function TeamTab() {
  const { authFetch } = useAuth();
  const { showToast } = useToast();
  const [members, setMembers] = useState<TeamMember[] | null>(null);
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<TeamMemberRole>("Staff");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState("");

  const load = () => {
    setError("");
    setMembers(null);
    authFetch<TeamMember[]>("/agents/me/team")
      .then(setMembers)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load your team."));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { page, setPage, pageSize, setPageSize, totalPages, totalItems, pageItems } = usePagination(members ?? []);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddError("");
    setAdding(true);
    try {
      await authFetch("/agents/me/team", { method: "POST", body: { fullName, email, role } });
      setFullName("");
      setEmail("");
      setRole("Staff");
      showToast("Team member added.", "success");
      load();
    } catch (err) {
      setAddError(err instanceof ApiError ? err.message : "Could not add this team member.");
    } finally {
      setAdding(false);
    }
  };

  const toggleStatus = async (member: TeamMember) => {
    try {
      await authFetch(`/agents/me/team/${member.memberId}`, {
        method: "PATCH",
        body: { status: member.status === "Active" ? "Inactive" : "Active" },
      });
      showToast(member.status === "Active" ? "Team member deactivated." : "Team member activated.", "success");
      load();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not update this team member.", "error");
    }
  };

  const handleRemove = async (memberId: number) => {
    try {
      await authFetch(`/agents/me/team/${memberId}`, { method: "DELETE" });
      showToast("Team member removed.", "success");
      load();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not remove this team member.", "error");
    }
  };

  return (
    <div className="fade-in space-y-6">
      <SectionHeading title="Agent Profiles" subtitle="Manage your team's access — users and roles." />

      <Card>
        <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
          Add a team member
        </h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          {addError && (
            <div className="sm:col-span-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
              {addError}
            </div>
          )}
          <div>
            <FieldLabel>Full name</FieldLabel>
            <input className={inputClass} value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div>
            <FieldLabel>Email</FieldLabel>
            <input type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <FieldLabel>Role</FieldLabel>
            <select className={selectClass} value={role} onChange={(e) => setRole(e.target.value as TeamMemberRole)}>
              <option value="Staff">Staff</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <div className="flex items-end">
            <PrimaryButton type="submit" disabled={adding} className="w-full">
              <FaPlus size={12} />
              {adding ? "Adding…" : "Add member"}
            </PrimaryButton>
          </div>
        </form>
      </Card>

      {members === null && !error && <LoadingState label="Loading your team…" />}
      {error && <ErrorState message={error} onRetry={load} />}
      {members && members.length === 0 && <EmptyState title="No team members yet" />}

      {members && members.length > 0 && (
        <>
        <div className="space-y-3">
          {pageItems.map((m) => (
            <Card key={m.memberId} className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A]">
                  <FaUserCircle size={18} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#0B1E3D]">{m.fullName}</p>
                  <p className="truncate text-xs font-medium text-[#0B1E3D]/45">{m.email}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge label={m.role} color={ROLE_COLORS[m.role]} />
                <button onClick={() => toggleStatus(m)}>
                  <Badge label={m.status} color={STATUS_COLORS[m.status]} />
                </button>
                <button
                  onClick={() => handleRemove(m.memberId)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50"
                  aria-label="Remove team member"
                >
                  <FaTrash size={13} />
                </button>
              </div>
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
