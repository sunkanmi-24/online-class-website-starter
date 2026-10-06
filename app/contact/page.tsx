import type { Metadata } from "next";
import { MessageCircle, Mail, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { instructor } from "@/data/instructor";

export const metadata: Metadata = { title: "Contact", description: "Contact the instructor or request to join a class." };

export default function Contact() {
  return (
    <main className="container py-14 md:py-20">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Contact</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight">Join a class</h1>
      <p className="mt-4 max-w-2xl leading-7 text-slate-600">Send a message or use the contact placeholders below. Wire the form to a backend before production.</p>
      <div className="mt-10 grid items-start gap-6 lg:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 lg:col-span-2">
          <h2 className="text-xl font-bold">Direct contact (placeholders)</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            <li className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"><MessageCircle size={17} className="text-green-600" aria-hidden /> WhatsApp: {instructor.contact.whatsapp}</li>
            <li className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"><Phone size={17} className="text-blue-600" aria-hidden /> Phone: {instructor.contact.phone}</li>
            <li className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"><Mail size={17} className="text-slate-600" aria-hidden /> Email: {instructor.contact.email}</li>
          </ul>
          <p className="mt-5 text-xs leading-6 text-slate-400">Add real numbers, email, and social links here. WhatsApp button can link to https://wa.me/&lt;number&gt; once provided.</p>
        </div>
        <div className="lg:col-span-3"><ContactForm /></div>
      </div>
    </main>
  );
}
