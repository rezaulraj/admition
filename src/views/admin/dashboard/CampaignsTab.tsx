"use client";

import React, { useState } from "react";
import { FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";
import { Card, FieldLabel, PrimaryButton, SectionHeading, inputClass, selectClass } from "@/components/dashboard/common/ui";
import RichTextEditor from "@/components/dashboard/common/RichTextEditor";

type Audience = "students" | "agents" | "both";

interface CampaignResult {
  totalRecipients: number;
  sent: number;
  failed: number;
}

export default function CampaignsTab() {
  const { authFetch } = useAuth();
  const { showToast } = useToast();

  const [audience, setAudience] = useState<Audience>("students");
  const [subject, setSubject] = useState("");
  const [bodyHtml, setBodyHtml] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<CampaignResult | null>(null);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setSending(true);
    try {
      const res = await authFetch<CampaignResult>("/admin/campaigns/send", {
        method: "POST",
        body: { audience, subject, bodyHtml },
      });
      setResult(res);
      showToast(`Sent to ${res.sent} of ${res.totalRecipients} recipients.`, "success");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Could not send this campaign.";
      setError(message);
      showToast(message, "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fade-in">
      <SectionHeading
        title="Email Campaigns"
        subtitle="Send an offer, announcement, or update to students and/or partners."
      />
      <Card className="max-w-2xl">
        <form onSubmit={handleSend} className="space-y-4">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
              {error}
            </div>
          )}
          {result && !error && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-xs font-semibold text-emerald-700">
              <FaCheckCircle size={13} />
              Sent to {result.sent} of {result.totalRecipients} recipients
              {result.failed > 0 ? ` (${result.failed} failed)` : ""}.
            </div>
          )}
          <div>
            <FieldLabel>Send to</FieldLabel>
            <select className={selectClass} value={audience} onChange={(e) => setAudience(e.target.value as Audience)}>
              <option value="students">All students</option>
              <option value="agents">All partners</option>
              <option value="both">Students and partners</option>
            </select>
          </div>
          <div>
            <FieldLabel>Subject</FieldLabel>
            <input
              className={inputClass}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. New scholarship offer for Fall intake"
              required
            />
          </div>
          <div>
            <FieldLabel>Message</FieldLabel>
            <RichTextEditor value={bodyHtml} onChange={setBodyHtml} placeholder="Write your announcement or offer…" />
          </div>
          <PrimaryButton type="submit" disabled={sending || !bodyHtml.trim()}>
            <FaPaperPlane size={12} />
            {sending ? "Sending…" : "Send campaign"}
          </PrimaryButton>
        </form>
      </Card>
    </div>
  );
}
