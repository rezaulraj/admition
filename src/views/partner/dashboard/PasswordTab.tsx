"use client";

import React, { useState } from "react";
import { FaCheckCircle, FaKey } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";
import { Card, FieldLabel, PrimaryButton, SectionHeading, inputClass } from "@/components/dashboard/common/ui";

export default function PasswordTab() {
  const { authFetch } = useAuth();
  const { showToast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }
    setSubmitting(true);
    try {
      await authFetch("/agents/change-password", { method: "PATCH", body: { currentPassword, newPassword } });
      setSuccess(true);
      showToast("Password updated.", "success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Could not change your password.";
      setError(message);
      showToast(message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fade-in">
      <SectionHeading title="Change Password" subtitle="Update your partner account password." />
      <Card className="max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-xs font-semibold text-emerald-700">
              <FaCheckCircle size={13} />
              Password updated successfully.
            </div>
          )}
          <div>
            <FieldLabel>Current password</FieldLabel>
            <input
              type="password"
              className={inputClass}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <FieldLabel>New password</FieldLabel>
            <input
              type="password"
              className={inputClass}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>
          <div>
            <FieldLabel>Confirm new password</FieldLabel>
            <input
              type="password"
              className={inputClass}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>
          <PrimaryButton type="submit" disabled={submitting}>
            <FaKey size={12} />
            {submitting ? "Updating…" : "Update password"}
          </PrimaryButton>
        </form>
      </Card>
    </div>
  );
}
