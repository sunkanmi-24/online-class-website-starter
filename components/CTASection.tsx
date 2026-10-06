import { Check } from "lucide-react";
import { Button } from "./Button";

const points = [
  "Structured classes for your level",
  "Teaching videos you can rewatch",
  "A clear schedule with live sessions",
];

export function CTASection() {
  return (
    <section aria-labelledby="cta-heading" className="bg-studio-black py-20 md:py-28">
      <div className="container grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="caps-label text-ash-mid">Get started</p>
          <h2 id="cta-heading" className="poster-headline mt-4 text-4xl text-pure-white md:text-[46px]">Ready to start learning?</h2>
          <p className="mt-4 max-w-md text-base font-normal leading-relaxed text-pure-white/80">Browse the classes or send a message to ask how to join the next session.</p>
        </div>
        <ul className="space-y-3">
          {points.map((p) => (
            <li key={p} className="flex items-center gap-3 text-base font-normal text-pure-white">
              <Check size={20} aria-hidden className="shrink-0 text-neon-pulse" /> {p}
            </li>
          ))}
          <li className="pt-4">
            <Button href="/contact">Join a Class</Button>
          </li>
        </ul>
      </div>
    </section>
  );
}
