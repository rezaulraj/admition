"use client";

import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaCertificate } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";
import { apiFetch } from "@/lib/api";
import {
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
import type { Country } from "@/views/student/dashboard/types";
import type { AgentProfile, Certificate } from "./types";

export default function ProfileTab() {
  const { authFetch } = useAuth();
  const { showToast } = useToast();

  const [profile, setProfile] = useState<AgentProfile | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loadError, setLoadError] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [nationalityId, setNationalityId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [destinationCountryIds, setDestinationCountryIds] = useState<string[]>([]);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);

  const load = () => {
    setLoadError("");
    setProfile(null);
    authFetch<AgentProfile>("/agents/me")
      .then((p) => {
        setProfile(p);
        setFullName(p.fullName);
        setPhone(p.phone ?? "");
        setNationalityId(String(p.nationalityId));
        setCompanyName(p.companyName ?? "");
        setDestinationCountryIds(p.destinations.map((d) => String(d.countryId)));
      })
      .catch((err) => setLoadError(err instanceof ApiError ? err.message : "Failed to load your profile."));
    apiFetch<Country[]>("/countries").then(setCountries).catch(() => setCountries([]));
    authFetch<Certificate[]>("/agents/me/certificates").then(setCertificates).catch(() => setCertificates([]));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileError("");
    setProfileSaved(false);
    setSavingProfile(true);
    try {
      await authFetch("/agents/me", {
        method: "PATCH",
        body: {
          fullName,
          phone: phone || undefined,
          nationalityId: Number(nationalityId),
          companyName: companyName || undefined,
          destinationCountryIds: destinationCountryIds.length ? destinationCountryIds.map(Number) : undefined,
        },
      });
      setProfileSaved(true);
      showToast("Profile updated.", "success");
      setTimeout(() => setProfileSaved(false), 2500);
    } catch (err) {
      setProfileError(err instanceof ApiError ? err.message : "Could not save your profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  if (loadError) return <ErrorState message={loadError} onRetry={load} />;
  if (!profile) return <LoadingState label="Loading your profile…" />;

  return (
    <div className="fade-in space-y-6">
      <SectionHeading title="My Profile" subtitle="Your recruitment partner details and payout information." />

      <Card>
        <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
          Basic information
        </h3>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          {profileError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
              {profileError}
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Full name</FieldLabel>
              <input className={inputClass} value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div>
              <FieldLabel>Email</FieldLabel>
              <input className={inputClass} value={profile.email} disabled />
            </div>
            <div>
              <FieldLabel>Phone</FieldLabel>
              <input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555 123 4567" />
            </div>
            <div>
              <FieldLabel>Company name</FieldLabel>
              <input className={inputClass} value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Your agency's name" />
            </div>
            <div>
              <FieldLabel>Nationality</FieldLabel>
              <select className={selectClass} value={nationalityId} onChange={(e) => setNationalityId(e.target.value)}>
                {countries.map((c) => (
                  <option key={c.countryId} value={c.countryId}>
                    {c.countryName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <FieldLabel>Destination countries you recruit for</FieldLabel>
            <select
              multiple
              className={`${selectClass} h-32`}
              value={destinationCountryIds}
              onChange={(e) => setDestinationCountryIds(Array.from(e.target.selectedOptions, (o) => o.value))}
            >
              {countries.map((c) => (
                <option key={c.countryId} value={c.countryId}>
                  {c.countryName}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-[11px] font-medium text-[#0B1E3D]/40">
              Hold Ctrl (Windows) or Cmd (Mac) to select more than one.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <PrimaryButton type="submit" disabled={savingProfile}>
              {savingProfile ? "Saving…" : "Save changes"}
            </PrimaryButton>
            {profileSaved && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <FaCheckCircle size={12} /> Saved
              </span>
            )}
          </div>
        </form>
      </Card>

      <Card>
        <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
          Certificates
        </h3>
        {certificates.length === 0 ? (
          <EmptyState title="No certificates on file" description="Certificates issued to you by admin will appear here." />
        ) : (
          <ul className="space-y-2">
            {certificates.map((c) => (
              <li key={c.certificateId} className="flex items-center gap-3 rounded-lg bg-gray-50/70 px-3 py-2.5 text-sm">
                <FaCertificate className="text-[#1E3A8A]" size={14} />
                <span className="font-semibold text-[#0B1E3D]">{c.title}</span>
                <span className="ml-auto text-xs text-[#0B1E3D]/45">
                  {new Date(c.issuedAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
