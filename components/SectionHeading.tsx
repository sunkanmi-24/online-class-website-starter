type Props = { eyebrow: string; title: string; text?: string };

export function SectionHeading({ eyebrow, title, text }: Props) {
  return (
    <div className="max-w-3xl">
      <p className="text-[11px] font-medium uppercase tracking-[0.28px] text-steel">{eyebrow}</p>
      <h2 className="display-headline mt-3 text-4xl text-ink-black">{title}</h2>
      {text ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate">{text}</p> : null}
    </div>
  );
}
