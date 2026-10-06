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
    <main className="container max-w-md py-16">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Admin</p>
      <h1 className="mt-3 text-3xl font-black">Sign in</h1>
      <p className="mt-2 text-sm text-slate-600">Create the admin user in Supabase → Authentication → Users, then sign in here.</p>
      <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="w-full rounded-xl border p-3 text-sm" />
        <label htmlFor="password" className="mb-1.5 mt-4 block text-sm font-semibold">Password</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="w-full rounded-xl border p-3 text-sm" />
        {error && <p role="alert" className="mt-3 text-sm font-medium text-red-600">{error}</p>}
        <button type="submit" disabled={loading} className="mt-5 w-full rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
