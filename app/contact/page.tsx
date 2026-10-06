import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { instructor } from "@/data/instructor";

export const metadata: Metadata = { title: "Contact", description: "Contact the instructor or request to join a class." };

export default function Contact() {
  return (
    <main className="container py-20 md:py-28">
      <p className="text-[11px] font-medium uppercase tracking-[0.28px] text-steel">Contact</p>
      <h1 className="display-headline mt-4 max-w-3xl text-5xl text-ink-black">Join a class</h1>
      <p className="mt-4 max-w-2xl font-normal leading-relaxed text-slate">Send a message or use the contact placeholders below. Messages are stored and answered by the instructor.</p>
      <div className="mt-12 grid items-start gap-px border border-bone bg-bone lg:grid-cols-5">
        <div className="bg-pure-white p-6 md:p-8 lg:col-span-2">
          <h2 className="text-xl font-medium tracking-[-0.12px] text-ink-black">Direct contact</h2>
          <p className="mt-1 text-[11px] uppercase tracking-[0.28px] text-silver">Placeholders</p>
          <ul className="mt-5 divide-y divide-bone border-y border-bone text-sm font-normal text-slate">
            <li className="py-3.5"><span className="text-steel">WhatsApp — </span>{instructor.contact.whatsapp}</li>
            <li className="py-3.5"><span className="text-steel">Phone — </span>{instructor.contact.phone}</li>
            <li className="py-3.5"><span className="text-steel">Email — </span>{instructor.contact.email}</li>
          </ul>
          <p className="mt-5 text-[13px] font-normal leading-relaxed text-silver">Add real numbers, email, and social links here before production.</p>
        </div>
        <div className="bg-pure-white lg:col-span-3"><ContactForm /></div>
      </div>
    </main>
  );
}
