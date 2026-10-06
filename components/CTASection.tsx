import { Button } from "./Button";

export function CTASection() {
  return (
    <section aria-labelledby="cta-heading" className="border-t border-bone bg-pure-white py-20 md:py-24">
      <div className="container max-w-3xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.28px] text-steel">Get started</p>
        <h2 id="cta-heading" className="display-headline mt-3 text-4xl text-ink-black">Ready to start learning?</h2>
        <p className="mt-4 max-w-xl text-base font-normal leading-relaxed text-slate">Browse the classes or send a message to ask how to join the next session.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/classes">Explore Classes</Button>
          <Button href="/contact" variant="outline">Join a Class</Button>
        </div>
      </div>
    </section>
  );
}
