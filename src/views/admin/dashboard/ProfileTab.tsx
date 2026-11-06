"use client";

import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";
import { Card, ErrorState, FieldLabel, LoadingState, PrimaryButton, SectionHeading, inputClass } from "@/components/dashboard/common/ui";

interface AdminProfile {
  adminId: number;
  fullName: string;
  email: string;
  role: string;
}

export default function ProfileTab() {
  const { authFetch, refreshAccount } = useAuth();
  const { showToast } = useToast();

  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loadError, setLoadError] = useState("");

  const [fullName, setFullName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const load = () => {
    setLoadError("");
    setProfile(null);
    authFetch<AdminProfile>("/admin/me")
      .then((p) => {
        setProfile(p);
        setFullName(p.fullName);
      })
      .catch((err) => setLoadError(err instanceof ApiError ? err.message : "Failed to load your profile."));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSaved(false);
    setSaving(true);
    try {
      await authFetch("/admin/me", { method: "PATCH", body: { fullName } });
      await refreshAccount();
      setSaved(true);
      showToast("Profile updated.", "success");
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Could not save your profile.";
      setError(message);
      showToast(message, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loadError) return <ErrorState message={loadError} onRetry={load} />;
  if (!profile) return <LoadingState label="Loading your profile…" />;

  return (
    <div className="fade-in">
      <SectionHeading title="My Profile" subtitle="Update your admin account details." />
      <Card className="max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
              {error}
            </div>
          )}
          <div>
            <FieldLabel>Full name</FieldLabel>
            <input className={inputClass} value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div>
            <FieldLabel>Email</FieldLabel>
            <input className={inputClass} value={profile.email} disabled />
          </div>
          <div className="flex items-center gap-3">
            <PrimaryButton type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </PrimaryButton>
            {saved && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <FaCheckCircle size={12} /> Saved
              </span>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
