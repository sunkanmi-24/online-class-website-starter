import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const message = String(body?.message ?? "").trim();
  const phone = String(body?.phone ?? "").trim();
  const interest = String(body?.interest ?? "").trim();

  if (!name || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid name, email and message." }, { status: 400 });
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Backend not configured yet — accept on the frontend but signal it.
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("contact_messages").insert({ name, email, phone, interest, message });
    if (error) throw error;
    return NextResponse.json({ ok: true, stored: true });
  } catch {
    return NextResponse.json({ error: "Could not save your message. Please try again later." }, { status: 500 });
  }
}
