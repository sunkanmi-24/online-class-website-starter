import { Button } from "./Button";

export function CTASection() {
  return (
    <section aria-labelledby="cta-heading" className="bg-slate-950 py-16 text-white md:py-20">
      <div className="container flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
        <div>
          <h2 id="cta-heading" className="text-3xl font-extrabold tracking-tight">Ready to start learning?</h2>
          <p className="mt-2 max-w-xl text-slate-300">Browse the classes or send a message to ask how to join the next session.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="/classes" variant="primary">Explore Classes</Button>
          <Button href="/contact" variant="secondary" className="!bg-transparent !text-white border-slate-600">Join a Class</Button>
        </div>
      </div>
    </section>
  );
}
