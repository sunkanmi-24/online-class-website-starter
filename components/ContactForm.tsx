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
      <div role="status" className="border border-bone bg-pure-white p-8">
        <h2 className="text-xl font-medium text-ink-black">Message received</h2>
        <p className="mt-2 font-normal leading-relaxed text-slate">
          Thank you — the instructor will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-bone bg-pure-white p-6 md:p-8" aria-label="Contact form">
      <h2 className="text-xl font-medium tracking-[-0.12px] text-ink-black">Send a message</h2>
      <div className="mt-5 grid gap-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-black">Name</label>
          <input id="name" name="name" required autoComplete="name" placeholder="Your full name" className="w-full rounded-lg border border-bone bg-pure-white p-3 text-sm font-normal placeholder:text-silver focus:border-ink-black focus:outline-none" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-black">Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="w-full rounded-lg border border-bone bg-pure-white p-3 text-sm font-normal placeholder:text-silver focus:border-ink-black focus:outline-none" />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink-black">Phone / WhatsApp</label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Add phone number" className="w-full rounded-lg border border-bone bg-pure-white p-3 text-sm font-normal placeholder:text-silver focus:border-ink-black focus:outline-none" />
          </div>
        </div>
        <div>
          <label htmlFor="interest" className="mb-1.5 block text-sm font-medium text-ink-black">Class interested in</label>
          <select id="interest" name="interest" className="w-full rounded-lg border border-bone bg-pure-white p-3 text-sm font-normal focus:border-ink-black focus:outline-none">
            <option value="">General enquiry</option>
            {classes.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-black">Message</label>
          <textarea id="message" name="message" required rows={5} placeholder="Tell us what you want to learn and your availability." className="w-full rounded-lg border border-bone bg-pure-white p-3 text-sm font-normal placeholder:text-silver focus:border-ink-black focus:outline-none" />
        </div>
        <button type="submit" disabled={status === "sending"} className="rounded-lg bg-ink-black px-6 py-2.5 text-sm font-medium text-pure-white hover:bg-graphite disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt-signal">
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "error" && (
          <p role="alert" className="text-sm font-medium text-ink-black">Could not send your message. Please try again later.</p>
        )}
      </div>
    </form>
  );
}
