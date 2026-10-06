import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { instructor } from "@/data/instructor";

export const metadata: Metadata = { title: "Contact", description: "Contact the instructor or request to join a class." };

export default function Contact() {
  return (
    <main>
      <section className="bg-studio-black py-16 md:py-24">
        <div className="container">
          <p className="caps-label text-ash-mid">Contact</p>
          <h1 className="poster-headline mt-4 max-w-3xl text-5xl text-pure-white">Join a class</h1>
          <p className="mt-4 max-w-2xl font-normal leading-relaxed text-pure-white/70">Send a message or use the contact placeholders below. Messages are stored and answered by the instructor.</p>
        </div>
      </section>
      <section className="container grid items-start gap-6 py-16 md:py-24 lg:grid-cols-5">
        <div className="rounded bg-pure-white p-6 shadow-[rgba(0,0,0,0.1)_0px_2px_4px_0px] md:p-8 lg:col-span-2">
          <h2 className="text-xl font-bold text-deep-ink">Direct contact</h2>
          <p className="caps-label mt-1 text-ash-mid">Placeholders</p>
          <ul className="mt-5 space-y-3 text-sm font-normal text-deep-ink/70">
            <li><span className="font-medium text-deep-ink">WhatsApp — </span>{instructor.contact.whatsapp}</li>
            <li><span className="font-medium text-deep-ink">Phone — </span>{instructor.contact.phone}</li>
            <li><span className="font-medium text-deep-ink">Email — </span>{instructor.contact.email}</li>
          </ul>
          <p className="mt-5 text-sm font-normal leading-relaxed text-ash-mid">Add real numbers, email, and social links here before production.</p>
        </div>
        <div className="lg:col-span-3"><ContactForm /></div>
      </section>
    </main>
  );
}
