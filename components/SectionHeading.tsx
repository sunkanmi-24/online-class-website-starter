type Props = { eyebrow: string; title: string; text?: string; align?: "left" | "center" };

export function SectionHeading({ eyebrow, title, text, align = "left" }: Props) {
  const alignCls = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  return (
    <div className={`flex max-w-2xl flex-col ${alignCls}`}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">{title}</h2>
      {text ? <p className="mt-3 leading-7 text-slate-600">{text}</p> : null}
    </div>
  );
}
