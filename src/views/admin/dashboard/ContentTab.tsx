"use client";

import React, { useEffect, useState } from "react";
import { FaChevronDown, FaFileAlt, FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
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
  SecondaryButton,
  SectionHeading,
  inputClass,
  selectClass,
} from "@/components/dashboard/common/ui";
import CoverImageUploader from "@/components/dashboard/common/CoverImageUploader";
import RichTextEditor from "@/components/dashboard/common/RichTextEditor";
import { PaginationControls, usePagination } from "@/components/dashboard/common/Pagination";
import { sanitizeHtml, RICH_TEXT_DISPLAY_CLASS } from "@/lib/richText";
import type { Article, ArticleType, University } from "@/views/student/dashboard/types";

const ARTICLE_TYPES: ArticleType[] = ["Article", "Guide"];

export default function ContentTab() {
  const { authFetch } = useAuth();
  const { showToast } = useToast();
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [universities, setUniversities] = useState<University[]>([]);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [type, setType] = useState<ArticleType>("Article");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const loadManaged = () => {
    setError("");
    setArticles(null);
    authFetch<Article[]>("/articles/manage")
      .then(setArticles)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load content."));
  };

  useEffect(() => {
    loadManaged();
    apiFetch<University[]>("/universities").then(setUniversities).catch(() => setUniversities([]));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreateError("");
    setCreating(true);
    try {
      await authFetch("/articles", {
        method: "POST",
        body: {
          title,
          type,
          category: category || undefined,
          excerpt: excerpt || undefined,
          content,
          coverImageUrl: coverImageUrl || undefined,
          universityId: universityId ? Number(universityId) : undefined,
        },
      });
      setTitle("");
      setCategory("");
      setExcerpt("");
      setContent("");
      setCoverImageUrl("");
      setUniversityId("");
      showToast("Published.", "success");
      loadManaged();
    } catch (err) {
      setCreateError(err instanceof ApiError ? err.message : "Could not create this entry.");
    } finally {
      setCreating(false);
    }
  };

  const { page, setPage, pageSize, setPageSize, totalPages, totalItems, pageItems } = usePagination(
    articles ?? [],
  );

  const handleDelete = async (articleId: number) => {
    try {
      await authFetch(`/articles/${articleId}`, { method: "DELETE" });
      showToast("Entry deleted.", "success");
      loadManaged();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not delete this entry.", "error");
    }
  };

  const handleTogglePublished = async (article: Article) => {
    try {
      await authFetch(`/articles/${article.articleId}`, {
        method: "PATCH",
        body: { isPublished: !article.isPublished },
      });
      showToast(article.isPublished ? "Unpublished." : "Published.", "success");
      loadManaged();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not update this entry.", "error");
    }
  };

  const handleSaveEdit = async (articleId: number, dto: Record<string, unknown>) => {
    await authFetch(`/articles/${articleId}`, { method: "PATCH", body: dto });
    showToast("Changes saved.", "success");
    setEditingId(null);
    loadManaged();
  };

  return (
    <div className="fade-in space-y-6">
      <SectionHeading
        title="Articles & Guides"
        subtitle="Publish study-abroad articles and guides shown on the public site."
      />

      <Card>
        <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
          Add an article or guide
        </h3>
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
            <FieldLabel>Type</FieldLabel>
            <select className={selectClass} value={type} onChange={(e) => setType(e.target.value as ArticleType)}>
              {ARTICLE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel>Category</FieldLabel>
            <input
              className={inputClass}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Visa"
            />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel>Related university (optional)</FieldLabel>
            <select
              className={selectClass}
              value={universityId}
              onChange={(e) => setUniversityId(e.target.value)}>
              <option value="">None</option>
              {universities.map((u) => (
                <option key={u.universityId} value={u.universityId}>
                  {u.universityName}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-4">
            <CoverImageUploader value={coverImageUrl} onChange={setCoverImageUrl} />
          </div>
          <div className="sm:col-span-4">
            <FieldLabel>Excerpt</FieldLabel>
            <input
              className={inputClass}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short summary shown on listing cards"
            />
          </div>
          <div className="sm:col-span-4">
            <FieldLabel>Content</FieldLabel>
            <RichTextEditor value={content} onChange={setContent} placeholder="Write the article…" />
          </div>
          <div className="sm:col-span-4">
            <PrimaryButton type="submit" disabled={creating || content.trim().length < 10}>
              <FaPlus size={12} />
              {creating ? "Publishing…" : "Publish"}
            </PrimaryButton>
          </div>
        </form>
      </Card>

      {articles === null && !error && <LoadingState label="Loading articles…" />}
      {error && <ErrorState message={error} onRetry={loadManaged} />}
      {articles && articles.length === 0 && <EmptyState title="No articles or guides yet" />}

      {articles && articles.length > 0 && (
        <>
          <div className="space-y-3">
            {pageItems.map((a) => (
              <ArticleRow
                key={a.articleId}
                article={a}
                universities={universities}
                isOpen={expandedId === a.articleId}
                isEditing={editingId === a.articleId}
                onToggle={() => setExpandedId(expandedId === a.articleId ? null : a.articleId)}
                onStartEdit={() => {
                  setEditingId(a.articleId);
                  setExpandedId(a.articleId);
                }}
                onCancelEdit={() => setEditingId(null)}
                onDelete={() => handleDelete(a.articleId)}
                onTogglePublished={() => handleTogglePublished(a)}
                onSaveEdit={(dto) => handleSaveEdit(a.articleId, dto)}
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

function ArticleRow({
  article,
  universities,
  isOpen,
  isEditing,
  onToggle,
  onStartEdit,
  onCancelEdit,
  onDelete,
  onTogglePublished,
  onSaveEdit,
}: {
  article: Article;
  universities: University[];
  isOpen: boolean;
  isEditing: boolean;
  onToggle: () => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onDelete: () => void;
  onTogglePublished: () => void;
  onSaveEdit: (dto: Record<string, unknown>) => Promise<void>;
}) {
  return (
    <Card className="p-0">
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <button onClick={onToggle} className="flex flex-1 items-center gap-3 text-left min-w-0">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B1E3D]/10 text-[#0B1E3D]">
            <FaFileAlt size={15} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#0B1E3D]">{article.title}</p>
            <p className="truncate text-xs font-medium text-[#0B1E3D]/45">
              {article.type}
              {article.category ? ` · ${article.category}` : ""}
              {article.university ? ` · ${article.university.universityName}` : ""} ·{" "}
              {article.submittedBy === "agent" ? `Partner: ${article.agent?.fullName ?? "—"}` : "Admin"} ·{" "}
              <span
                className={
                  article.isPublished
                    ? "font-bold text-emerald-600"
                    : article.submittedBy === "agent"
                      ? "font-bold text-amber-600"
                      : "font-bold text-[#0B1E3D]/45"
                }>
                {article.isPublished ? "Published" : article.submittedBy === "agent" ? "Pending review" : "Draft"}
              </span>
            </p>
          </div>
        </button>
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={onStartEdit}
            className="text-[#0B1E3D]/50 hover:text-[#1a5fd8]"
            aria-label="Edit entry">
            <FaPencilAlt size={13} />
          </button>
          <button onClick={onDelete} className="text-red-500 hover:text-red-700" aria-label="Delete entry">
            <FaTrash size={13} />
          </button>
          <button onClick={onToggle}>
            <FaChevronDown size={12} className={`text-[#0B1E3D]/30 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {isOpen && isEditing && (
        <EditForm article={article} universities={universities} onCancel={onCancelEdit} onSave={onSaveEdit} />
      )}

      {isOpen && !isEditing && (
        <div className="border-t border-[#0B1E3D]/8 px-5 py-4 space-y-3">
          {article.excerpt && <p className="text-xs font-medium text-[#0B1E3D]/60">{article.excerpt}</p>}
          <div
            className={`text-xs text-[#0B1E3D]/70 ${RICH_TEXT_DISPLAY_CLASS}`}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }}
          />
          <SecondaryButton onClick={onTogglePublished}>
            {article.isPublished
              ? "Unpublish"
              : article.submittedBy === "agent"
                ? "Approve & Publish"
                : "Publish"}
          </SecondaryButton>
        </div>
      )}
    </Card>
  );
}

function EditForm({
  article,
  universities,
  onCancel,
  onSave,
}: {
  article: Article;
  universities: University[];
  onCancel: () => void;
  onSave: (dto: Record<string, unknown>) => Promise<void>;
}) {
  const [title, setTitle] = useState(article.title);
  const [type, setType] = useState<ArticleType>(article.type);
  const [category, setCategory] = useState(article.category ?? "");
  const [excerpt, setExcerpt] = useState(article.excerpt ?? "");
  const [content, setContent] = useState(article.content);
  const [coverImageUrl, setCoverImageUrl] = useState(article.coverImageUrl ?? "");
  const [universityId, setUniversityId] = useState(article.universityId ? String(article.universityId) : "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      await onSave({
        title,
        type,
        category: category || undefined,
        excerpt: excerpt || undefined,
        content,
        coverImageUrl: coverImageUrl || undefined,
        universityId: universityId ? Number(universityId) : undefined,
      });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not save changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="border-t border-[#0B1E3D]/8 px-5 py-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {error && (
          <div className="sm:col-span-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700">
            {error}
          </div>
        )}
        <div className="sm:col-span-2">
          <FieldLabel>Title</FieldLabel>
          <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <FieldLabel>Type</FieldLabel>
          <select className={selectClass} value={type} onChange={(e) => setType(e.target.value as ArticleType)}>
            {ARTICLE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel>Category</FieldLabel>
          <input className={inputClass} value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel>Related university (optional)</FieldLabel>
          <select className={selectClass} value={universityId} onChange={(e) => setUniversityId(e.target.value)}>
            <option value="">None</option>
            {universities.map((u) => (
              <option key={u.universityId} value={u.universityId}>
                {u.universityName}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-4">
          <CoverImageUploader value={coverImageUrl} onChange={setCoverImageUrl} />
        </div>
        <div className="sm:col-span-4">
          <FieldLabel>Excerpt</FieldLabel>
          <input className={inputClass} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        </div>
        <div className="sm:col-span-4">
          <FieldLabel>Content</FieldLabel>
          <RichTextEditor value={content} onChange={setContent} />
        </div>
        <div className="flex gap-3 sm:col-span-4">
          <PrimaryButton onClick={handleSave} disabled={saving || content.trim().length < 10}>
            {saving ? "Saving…" : "Save changes"}
          </PrimaryButton>
          <SecondaryButton onClick={onCancel} disabled={saving}>
            Cancel
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
