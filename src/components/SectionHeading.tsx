export default function SectionHeading({
  eyebrow,
  title,
  desc,
  center = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  desc?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3 py-1 text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted">
        {eyebrow}
      </span>
      <h2 className="font-display mt-4 text-[clamp(1.75rem,4.2vw,2.7rem)] font-bold leading-[1.14]">
        {title}
      </h2>
      {desc && (
        <p className="mt-4 text-[16px] leading-relaxed text-muted">{desc}</p>
      )}
    </div>
  );
}
