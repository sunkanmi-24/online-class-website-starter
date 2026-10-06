type Props = { eyebrow: string; title: string; text?: string; dark?: boolean };

export function SectionHeading({ eyebrow, title, text, dark = false }: Props) {
  return (
    <div className="max-w-3xl">
      <p className={`caps-label ${dark ? "text-ash-mid" : "text-ash-mid"}`}>{eyebrow}</p>
      <h2 className={`poster-headline mt-4 text-4xl md:text-[38px] ${dark ? "text-pure-white" : "text-deep-ink"}`}>{title}</h2>
      {text ? <p className={`mt-4 max-w-2xl text-base font-normal leading-relaxed ${dark ? "text-pure-white" : "text-deep-ink"}`}>{text}</p> : null}
    </div>
  );
}
