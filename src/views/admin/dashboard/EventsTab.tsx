"use client";

import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaChevronDown, FaPlus, FaTrash } from "react-icons/fa";
import { useAuth, ApiError } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";
import {
  Card,
  EmptyState,
  ErrorState,
  FieldLabel,
  LoadingState,
  PrimaryButton,
  SecondaryButton,
  SectionHeading,
  inputClass,
} from "@/components/dashboard/common/ui";
import { PaginationControls, usePagination } from "@/components/dashboard/common/Pagination";
import type { Event } from "@/views/student/dashboard/types";

export default function EventsTab() {
  const { authFetch } = useAuth();
  const { showToast } = useToast();
  const [events, setEvents] = useState<Event[] | null>(null);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [registrationUrl, setRegistrationUrl] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const load = () => {
    setError("");
    setEvents(null);
    authFetch<Event[]>("/events/manage")
      .then(setEvents)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load events."));
  };

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreateError("");
    setCreating(true);
    try {
      await authFetch("/events", {
        method: "POST",
        body: {
          title,
          location: location || undefined,
          startDate,
          endDate: endDate || undefined,
          description: description || undefined,
          registrationUrl: registrationUrl || undefined,
        },
      });
      setTitle("");
      setLocation("");
      setStartDate("");
      setEndDate("");
      setDescription("");
      setRegistrationUrl("");
      showToast("Event added.", "success");
      load();
    } catch (err) {
      setCreateError(err instanceof ApiError ? err.message : "Could not create this event.");
    } finally {
      setCreating(false);
    }
  };

  const { page, setPage, pageSize, setPageSize, totalPages, totalItems, pageItems } = usePagination(
    events ?? [],
  );

  const handleDelete = async (eventId: number) => {
    try {
      await authFetch(`/events/${eventId}`, { method: "DELETE" });
      showToast("Event deleted.", "success");
      load();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not delete this event.", "error");
    }
  };

  const handleTogglePublished = async (event: Event) => {
    try {
      await authFetch(`/events/${event.eventId}`, {
        method: "PATCH",
        body: { isPublished: !event.isPublished },
      });
      showToast(event.isPublished ? "Unpublished." : "Published.", "success");
      load();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not update this event.", "error");
    }
  };

  return (
    <div className="fade-in space-y-6">
      <SectionHeading title="Events" subtitle="Manage education fairs, expos, and webinars shown on the public site." />

      <Card>
        <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">Add an event</h3>
        <form onSubmit={handleCreate} className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          {createError && (
            <div className="sm:col-span-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
              {createError}
            </div>
          )}
          <div className="sm:col-span-2">
            <FieldLabel>Title</FieldLabel>
            <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <FieldLabel>Location</FieldLabel>
            <input
              className={inputClass}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Dhaka"
            />
          </div>
          <div>
            <FieldLabel>Registration URL</FieldLabel>
            <input
              className={inputClass}
              value={registrationUrl}
              onChange={(e) => setRegistrationUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div>
            <FieldLabel>Start date</FieldLabel>
            <input
              type="date"
              className={inputClass}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <FieldLabel>End date</FieldLabel>
            <input type="date" className={inputClass} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <div className="sm:col-span-4">
            <FieldLabel>Description</FieldLabel>
            <textarea
              className={`${inputClass} min-h-35`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="sm:col-span-4">
            <PrimaryButton type="submit" disabled={creating}>
              <FaPlus size={12} />
              {creating ? "Creating…" : "Add event"}
            </PrimaryButton>
          </div>
        </form>
      </Card>

      {events === null && !error && <LoadingState label="Loading events…" />}
      {error && <ErrorState message={error} onRetry={load} />}
      {events && events.length === 0 && <EmptyState title="No events yet" />}

      {events && events.length > 0 && (
        <>
          <div className="space-y-3">
            {pageItems.map((ev) => (
              <EventRow
                key={ev.eventId}
                event={ev}
                isOpen={expandedId === ev.eventId}
                onToggle={() => setExpandedId(expandedId === ev.eventId ? null : ev.eventId)}
                onDelete={() => handleDelete(ev.eventId)}
                onTogglePublished={() => handleTogglePublished(ev)}
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

function EventRow({
  event,
  isOpen,
  onToggle,
  onDelete,
  onTogglePublished,
}: {
  event: Event;
  isOpen: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onTogglePublished: () => void;
}) {
  return (
    <Card className="p-0">
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <button onClick={onToggle} className="flex flex-1 items-center gap-3 text-left min-w-0">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B1E3D]/10 text-[#0B1E3D]">
            <FaCalendarAlt size={15} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#0B1E3D]">{event.title}</p>
            <p className="truncate text-xs font-medium text-[#0B1E3D]/45">
              {new Date(event.startDate).toLocaleDateString()}
              {event.location ? ` · ${event.location}` : ""} · {event.isPublished ? "Published" : "Draft"}
            </p>
          </div>
        </button>
        <div className="flex shrink-0 items-center gap-3">
          <button onClick={onDelete} className="text-red-500 hover:text-red-700" aria-label="Delete event">
            <FaTrash size={13} />
          </button>
          <button onClick={onToggle}>
            <FaChevronDown size={12} className={`text-[#0B1E3D]/30 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-[#0B1E3D]/8 px-5 py-4 space-y-3">
          {event.description && <p className="whitespace-pre-line text-xs text-[#0B1E3D]/70">{event.description}</p>}
          <SecondaryButton onClick={onTogglePublished}>
            {event.isPublished ? "Unpublish" : "Publish"}
          </SecondaryButton>
        </div>
      )}
    </Card>
  );
}
