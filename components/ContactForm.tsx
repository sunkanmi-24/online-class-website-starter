"use client";

import { useState } from "react";
import { classes } from "@/data/classes";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      interest: String(form.get("interest") ?? ""),
      message: String(form.get("message") ?? ""),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded bg-pure-white p-8 shadow-[rgba(0,0,0,0.1)_0px_2px_4px_0px]">
        <h2 className="text-xl font-bold text-deep-ink">Message received</h2>
        <p className="mt-2 font-normal leading-relaxed text-deep-ink/70">
          Thank you — the instructor will get back to you soon.
        </p>
      </div>
    );
  }

  const inputCls = "w-full rounded border border-fog-border bg-pure-white p-3 text-sm font-normal placeholder:text-ash-mid focus:border-deep-ink focus:outline-none";
  const labelCls = "mb-1.5 block text-sm font-medium text-deep-ink";

  return (
    <form onSubmit={handleSubmit} className="rounded bg-pure-white p-6 shadow-[rgba(0,0,0,0.1)_0px_2px_4px_0px] md:p-8" aria-label="Contact form">
      <h2 className="text-xl font-bold text-deep-ink">Send a message</h2>
      <div className="mt-5 grid gap-4">
        <div>
          <label htmlFor="name" className={labelCls}>Name</label>
          <input id="name" name="name" required autoComplete="name" placeholder="Your full name" className={inputCls} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelCls}>Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputCls} />
          </div>
          <div>
            <label htmlFor="phone" className={labelCls}>Phone / WhatsApp</label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Add phone number" className={inputCls} />
          </div>
        </div>
        <div>
          <label htmlFor="interest" className={labelCls}>Class interested in</label>
          <select id="interest" name="interest" className={inputCls}>
            <option value="">General enquiry</option>
            {classes.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="message" className={labelCls}>Message</label>
          <textarea id="message" name="message" required rows={5} placeholder="Tell us what you want to learn and your availability." className={inputCls} />
        </div>
        <button type="submit" disabled={status === "sending"} className="rounded bg-skill-green px-4 py-2 text-sm font-semibold text-deep-ink transition hover:brightness-95 disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "error" && (
          <p role="alert" className="text-sm font-medium text-deep-ink">Could not send your message. Please try again later.</p>
        )}
      </div>
    </form>
  );
}
