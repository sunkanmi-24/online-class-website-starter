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
      <p className="caps-label text-ash-mid">Admin</p>
      <h1 className="poster-headline mt-4 text-4xl text-deep-ink">Sign in</h1>
      <p className="mt-3 text-sm font-normal text-deep-ink/70">Create the admin user in Supabase → Authentication → Users, then sign in here.</p>
      <form onSubmit={handleSubmit} className="mt-8 rounded bg-pure-white p-6 shadow-[rgba(0,0,0,0.1)_0px_2px_4px_0px]">
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-deep-ink">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="w-full rounded border border-fog-border p-3 text-sm font-normal placeholder:text-ash-mid focus:border-deep-ink focus:outline-none" />
        <label htmlFor="password" className="mb-1.5 mt-4 block text-sm font-medium text-deep-ink">Password</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="w-full rounded border border-fog-border p-3 text-sm font-normal placeholder:text-ash-mid focus:border-deep-ink focus:outline-none" />
        {error && <p role="alert" className="mt-3 text-sm font-medium text-deep-ink">{error}</p>}
        <button type="submit" disabled={loading} className="mt-5 w-full rounded bg-skill-green px-4 py-2 text-sm font-semibold text-deep-ink transition hover:brightness-95 disabled:opacity-60">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
