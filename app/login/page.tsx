"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const form = new FormData(e.currentTarget);
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: String(form.get("email")),
        password: String(form.get("password")),
      });
      if (error) throw error;
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container max-w-md py-20">
      <p className="text-[11px] font-medium uppercase tracking-[0.28px] text-steel">Admin</p>
      <h1 className="display-headline mt-4 text-4xl text-ink-black">Sign in</h1>
      <p className="mt-3 text-sm font-normal text-slate">Create the admin user in Supabase → Authentication → Users, then sign in here.</p>
      <form onSubmit={handleSubmit} className="mt-8 border border-bone bg-pure-white p-6">
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-black">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="w-full rounded-lg border border-bone p-3 text-sm font-normal placeholder:text-silver focus:border-ink-black focus:outline-none" />
        <label htmlFor="password" className="mb-1.5 mt-4 block text-sm font-medium text-ink-black">Password</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="w-full rounded-lg border border-bone p-3 text-sm font-normal placeholder:text-silver focus:border-ink-black focus:outline-none" />
        {error && <p role="alert" className="mt-3 text-sm font-medium text-ink-black">{error}</p>}
        <button type="submit" disabled={loading} className="mt-5 w-full rounded-lg bg-ink-black px-6 py-2.5 text-sm font-medium text-pure-white hover:bg-graphite disabled:opacity-60">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
