import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminDashboard } from "@/components/AdminDashboard";

export const metadata = { title: "Admin" };

export default async function AdminPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return (
      <main className="container max-w-2xl py-16">
        <h1 className="text-3xl font-black">Admin is not connected</h1>
        <p className="mt-3 leading-7 text-slate-600">
          Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to
          <code> .env.local</code> (see <code>.env.example</code>), run the SQL in
          <code> supabase/schema.sql</code>, and create an admin user in Supabase Authentication.
        </p>
      </main>
    );
  }
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");
  return (
    <main className="container py-14">
      <h1 className="text-3xl font-black">Admin panel</h1>
      <p className="mt-2 text-sm text-slate-600">Signed in as {data.user.email}. Manage courses, videos, schedules and messages.</p>
      <AdminDashboard />
    </main>
  );
}
