"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BookOpen, Clapperboard, CalendarDays, Inbox, Plus, Search,
  Pencil, Trash2, LogOut, X, Check, Eye, EyeOff, MailOpen,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Tab = "courses" | "videos" | "schedules" | "messages";

const META: Record<Tab, { label: string; singular: string; icon: typeof BookOpen; blurb: string }> = {
  courses: { label: "Courses", singular: "course", icon: BookOpen, blurb: "Classes shown on the site catalogue." },
  videos: { label: "Videos", singular: "video", icon: Clapperboard, blurb: "Lessons in the video library." },
  schedules: { label: "Schedule", singular: "session", icon: CalendarDays, blurb: "Upcoming sessions students can join." },
  messages: { label: "Inbox", singular: "message", icon: Inbox, blurb: "Enquiries from the contact form." },
};

const TABS: Tab[] = ["courses", "videos", "schedules", "messages"];
const TABLE_FOR: Record<Tab, string> = { courses: "courses", videos: "videos", schedules: "schedules", messages: "contact_messages" };

const FIELDS: Record<Tab, { name: string; label: string; wide?: boolean; required?: boolean; hint?: string }[]> = {
  courses: [
    { name: "title", label: "Title", wide: true, required: true },
    { name: "slug", label: "Slug", required: true, hint: "Lowercase, no spaces" },
    { name: "short_description", label: "Short description", wide: true },
    { name: "full_description", label: "Full description", wide: true },
    { name: "level", label: "Level" },
    { name: "duration", label: "Duration" },
    { name: "format", label: "Format" },
    { name: "schedule", label: "Schedule" },
    { name: "price", label: "Price" },
    { name: "thumbnail_label", label: "Thumbnail label" },
  ],
  videos: [
    { name: "title", label: "Title", wide: true, required: true },
    { name: "slug", label: "Slug", required: true },
    { name: "description", label: "Description", wide: true },
    { name: "category", label: "Category" },
    { name: "date", label: "Date" },
    { name: "duration", label: "Duration" },
    { name: "embed_url", label: "Embed URL", wide: true, hint: "YouTube / Vimeo embed link" },
  ],
  schedules: [
    { name: "class_title", label: "Class", wide: true, required: true },
    { name: "day", label: "Day", required: true },
    { name: "date", label: "Date" },
    { name: "time", label: "Time" },
    { name: "platform", label: "Platform" },
    { name: "note", label: "Note", wide: true },
  ],
  messages: [],
};

type Row = Record<string, string | boolean>;

function rowTitle(tab: Tab, row: Row): string {
  if (tab === "messages") return String(row.name ?? "Message");
  return String(row.title ?? row.class_title ?? "Untitled");
}

function rowSubtitle(tab: Tab, row: Row): string {
  if (tab === "courses") return [row.level, row.format, row.price].filter(Boolean).join(" · ");
  if (tab === "videos") return [row.category, row.date, row.duration].filter(Boolean).join(" · ");
  if (tab === "schedules") return [row.day, row.time, row.platform].filter(Boolean).join(" · ");
  return [row.email, row.phone, row.interest].filter(Boolean).join(" · ");
}

export function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("courses");
  const [rows, setRows] = useState<Row[]>([]);
  const [counts, setCounts] = useState<Record<Tab, number>>({ courses: 0, videos: 0, schedules: 0, messages: 0 });
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState<Record<string, string> | null>(null);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  function flash(kind: "ok" | "err", text: string) {
    setToast({ kind, text });
    window.setTimeout(() => setToast((t) => (t?.text === text ? null : t)), 3500);
  }

  // Load rows for the active tab.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from(TABLE_FOR[tab]).select("*").order("created_at", { ascending: false });
        if (error) throw error;
        if (!cancelled) setRows((data ?? []) as Row[]);
      } catch (err) {
        if (!cancelled) flash("err", err instanceof Error ? err.message : "Could not load data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [tab]);

  // Overview counts, loaded once.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const supabase = createClient();
        const next = {} as Record<Tab, number>;
        for (const t of TABS) {
          const { count } = await supabase.from(TABLE_FOR[t]).select("id", { count: "exact", head: true });
          next[t] = count ?? 0;
        }
        const { count: unreadCount } = await supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("read", false);
        if (!cancelled) {
          setCounts(next);
          setUnread(unreadCount ?? 0);
        }
      } catch {
        /* counts are a nicety — rows carry the real errors */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => `${rowTitle(tab, r)} ${rowSubtitle(tab, r)} ${r.message ?? ""}`.toLowerCase().includes(q));
  }, [rows, query, tab]);

  function switchTab(next: Tab) {
    setDraft(null);
    setDraftId(null);
    setQuery("");
    setTab(next);
  }

  function openNew() {
    const blank: Record<string, string> = {};
    for (const f of FIELDS[tab]) blank[f.name] = "";
    setDraft(blank);
    setDraftId(null);
  }

  function openEdit(row: Row) {
    const filled: Record<string, string> = {};
    for (const f of FIELDS[tab]) filled[f.name] = String(row[f.name] ?? "");
    setDraft(filled);
    setDraftId(String(row.id));
  }

  async function refresh() {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from(TABLE_FOR[tab]).select("*").order("created_at", { ascending: false });
      if (error) throw error;
      setRows((data ?? []) as Row[]);
      const { count } = await supabase.from(TABLE_FOR[tab]).select("id", { count: "exact", head: true });
      setCounts((c) => ({ ...c, [tab]: count ?? 0 }));
    } catch (err) {
      flash("err", err instanceof Error ? err.message : "Refresh failed.");
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!draft) return;
    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = draftId
        ? await supabase.from(TABLE_FOR[tab]).update({ ...draft, published: true }).eq("id", draftId)
        : await supabase.from(TABLE_FOR[tab]).insert({ ...draft, published: true });
      if (error) throw error;
      setDraft(null);
      setDraftId(null);
      flash("ok", draftId ? "Changes saved." : "Entry published.");
      await refresh();
    } catch (err) {
      flash("err", err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function togglePublished(row: Row) {
    try {
      const supabase = createClient();
      const { error } = await supabase.from(TABLE_FOR[tab]).update({ published: !row.published }).eq("id", String(row.id));
      if (error) throw error;
      setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, published: !row.published } : r)));
    } catch (err) {
      flash("err", err instanceof Error ? err.message : "Update failed.");
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this entry? This cannot be undone.")) return;
    try {
      const supabase = createClient();
      const { error } = await supabase.from(TABLE_FOR[tab]).delete().eq("id", id);
      if (error) throw error;
      flash("ok", "Entry deleted.");
      await refresh();
    } catch (err) {
      flash("err", err instanceof Error ? err.message : "Delete failed.");
    }
  }

  async function markRead(row: Row, read: boolean) {
    try {
      const supabase = createClient();
      const { error } = await supabase.from("contact_messages").update({ read }).eq("id", String(row.id));
      if (error) throw error;
      setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, read } : r)));
      setUnread((u) => Math.max(0, u + (read ? -1 : 1)));
    } catch (err) {
      flash("err", err instanceof Error ? err.message : "Update failed.");
    }
  }

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  const meta = META[tab];

  return (
    <div className="mt-8 lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
      {/* Sidebar / top nav */}
      <aside className="mb-6 lg:mb-0">
        <nav aria-label="Admin sections" className="flex gap-2 overflow-x-auto lg:sticky lg:top-24 lg:flex-col">
          {TABS.map((t) => {
            const Icon = META[t].icon;
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => switchTab(t)}
                aria-current={active ? "page" : undefined}
                className={`flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  active ? "bg-slate-950 text-white shadow-md" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-slate-300"
                }`}
              >
                <Icon size={17} aria-hidden />
                {META[t].label}
                <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-bold ${active ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500"}`}>
                  {counts[t]}
                </span>
                {t === "messages" && unread > 0 && (
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white" title={`${unread} unread`}>
                    {unread}
                  </span>
                )}
              </button>
            );
          })}
          <button
            onClick={signOut}
            className="flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-400 transition hover:bg-white hover:text-slate-700 hover:ring-1 hover:ring-slate-200"
          >
            <LogOut size={17} aria-hidden /> Sign out
          </button>
        </nav>

        {/* Overview card */}
        <div className="mt-4 hidden rounded-2xl bg-slate-950 p-5 text-white lg:block">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Studio at a glance</p>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-slate-300">Published courses</dt><dd className="font-bold">{counts.courses}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-300">Videos</dt><dd className="font-bold">{counts.videos}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-300">Sessions</dt><dd className="font-bold">{counts.schedules}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-300">Unread inbox</dt><dd className={`font-bold ${unread > 0 ? "text-amber-300" : ""}`}>{unread}</dd></div>
          </dl>
          <Link href="/" className="mt-4 inline-block text-xs font-semibold text-slate-300 underline-offset-4 hover:text-white hover:underline">
            View public site →
          </Link>
        </div>
      </aside>

      {/* Main panel */}
      <section aria-live="polite">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">{meta.label}</h2>
            <p className="mt-1 text-sm text-slate-500">{meta.blurb}</p>
          </div>
          {tab !== "messages" && (
            <button onClick={openNew} className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
              <Plus size={16} aria-hidden /> New {meta.singular}
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative mt-5">
          <Search size={16} aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <label htmlFor="admin-search" className="sr-only">Search {meta.label}</label>
          <input
            id="admin-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${meta.label.toLowerCase()}…`}
            className="w-full rounded-2xl border-0 bg-white py-3 pl-11 pr-4 text-sm shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* List */}
        <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          {loading ? (
            <ul aria-label="Loading" className="divide-y divide-slate-100">
              {[0, 1, 2].map((i) => (
                <li key={i} className="animate-pulse p-5">
                  <div className="h-4 w-1/3 rounded bg-slate-200" />
                  <div className="mt-2 h-3 w-1/2 rounded bg-slate-100" />
                </li>
              ))}
            </ul>
          ) : filtered.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <meta.icon size={28} aria-hidden className="mx-auto text-slate-300" />
              <p className="mt-3 font-bold text-slate-700">{query ? `No ${meta.label.toLowerCase()} match “${query}”.` : `No ${meta.label.toLowerCase()} yet.`}</p>
              <p className="mt-1 text-sm text-slate-500">
                {tab === "messages" ? "New enquiries from the contact form will appear here." : `Create the first ${meta.singular} to publish it to the site.`}
              </p>
              {tab !== "messages" && !query && (
                <button onClick={openNew} className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white">
                  <Plus size={15} aria-hidden /> New {meta.singular}
                </button>
              )}
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {filtered.map((row) => {
                const id = String(row.id);
                const published = tab === "messages" ? true : Boolean(row.published);
                return (
                  <li key={id} className={`flex flex-col gap-3 p-5 transition sm:flex-row sm:items-center ${!published ? "bg-amber-50/50" : ""} ${tab === "messages" && !row.read ? "bg-indigo-50/50" : ""}`}>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate font-bold text-slate-900">{rowTitle(tab, row)}</p>
                        {tab !== "messages" && (
                          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${published ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                            {published ? "Live" : "Hidden"}
                          </span>
                        )}
                        {tab === "messages" && !row.read && (
                          <span className="rounded-full bg-indigo-600 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">New</span>
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-sm text-slate-500">{rowSubtitle(tab, row)}</p>
                      {tab === "messages" && row.message ? <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-slate-600">{String(row.message)}</p> : null}
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      {tab !== "messages" && (
                        <button
                          onClick={() => togglePublished(row)}
                          title={published ? "Hide from site" : "Publish to site"}
                          aria-label={`${published ? "Hide" : "Publish"} ${rowTitle(tab, row)}`}
                          className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          {published ? <Eye size={17} /> : <EyeOff size={17} />}
                        </button>
                      )}
                      {tab === "messages" && (
                        <button
                          onClick={() => markRead(row, !row.read)}
                          title={row.read ? "Mark unread" : "Mark read"}
                          aria-label={`${row.read ? "Mark unread" : "Mark read"}: ${rowTitle(tab, row)}`}
                          className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          <MailOpen size={17} />
                        </button>
                      )}
                      {tab !== "messages" && (
                        <button onClick={() => openEdit(row)} aria-label={`Edit ${rowTitle(tab, row)}`} className="rounded-xl p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-700">
                          <Pencil size={17} />
                        </button>
                      )}
                      <button onClick={() => handleDelete(id)} aria-label={`Delete ${rowTitle(tab, row)}`} className="rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600">
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <p className="mt-3 text-xs text-slate-400">
          {filtered.length} of {rows.length} {meta.label.toLowerCase()} shown
          {tab !== "messages" ? " · the eye icon toggles site visibility." : " · new messages arrive from /contact."}
        </p>
      </section>

      {/* Editor modal */}
      {draft && (
        <div role="dialog" aria-modal="true" aria-label={draftId ? `Edit ${meta.singular}` : `New ${meta.singular}`} className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 sm:items-center sm:p-6" onClick={() => { setDraft(null); setDraftId(null); }}>
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight">{draftId ? `Edit ${meta.singular}` : `New ${meta.singular}`}</h2>
                <p className="mt-1 text-sm text-slate-500">Saving publishes it to the site immediately.</p>
              </div>
              <button onClick={() => { setDraft(null); setDraftId(null); }} aria-label="Close editor" className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="mt-6 grid gap-4 sm:grid-cols-2">
              {FIELDS[tab].map((f) => (
                <label key={f.name} className={`block text-sm ${f.wide ? "sm:col-span-2" : ""}`}>
                  <span className="mb-1.5 block font-semibold text-slate-700">
                    {f.label} {f.required && <span aria-hidden className="text-red-500">*</span>}
                  </span>
                  {f.name.includes("description") || f.name === "note" ? (
                    <textarea
                      value={draft[f.name] ?? ""}
                      onChange={(e) => setDraft({ ...draft, [f.name]: e.target.value })}
                      required={f.required}
                      rows={3}
                      className="w-full rounded-xl border-slate-200 bg-slate-50 p-3 shadow-inner focus:border-indigo-600 focus:bg-white focus:outline-none"
                    />
                  ) : (
                    <input
                      value={draft[f.name] ?? ""}
                      onChange={(e) => setDraft({ ...draft, [f.name]: e.target.value })}
                      required={f.required}
                      placeholder={f.hint ?? ""}
                      className="w-full rounded-xl border-slate-200 bg-slate-50 p-3 shadow-inner focus:border-indigo-600 focus:bg-white focus:outline-none"
                    />
                  )}
                </label>
              ))}
              <div className="flex flex-col-reverse gap-2 sm:col-span-2 sm:flex-row sm:justify-end">
                <button type="button" onClick={() => { setDraft(null); setDraftId(null); }} className="rounded-full border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
                  <Check size={15} aria-hidden /> {saving ? "Saving…" : draftId ? "Save changes" : `Publish ${meta.singular}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div role={toast.kind === "err" ? "alert" : "status"} className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full px-5 py-3 text-sm font-semibold shadow-lg ${toast.kind === "err" ? "bg-red-600 text-white" : "bg-slate-950 text-white"}`}>
          {toast.text}
        </div>
      )}
    </div>
  );
}
