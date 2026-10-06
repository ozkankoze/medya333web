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
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="display-sm mt-5 text-[clamp(2rem,5vw,3.4rem)]">{title}</h2>
      {desc && (
        <p className="mt-5 max-w-[56ch] text-[16.5px] leading-relaxed text-muted">
          {desc}
        </p>
      )}
    </div>
  );
}
