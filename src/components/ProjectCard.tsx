/* eslint-disable @next/next/no-img-element */
import { Project, tagList } from "@/lib/projects";
import { IconExternal } from "./Icons";

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function ProjectCard({ p }: { p: Project }) {
  const host = hostOf(p.url);
  const tags = tagList(p.tags);
  const accent = p.accent || "#6E56F8";

  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-hover group flex h-full flex-col overflow-hidden"
    >
      {/* önizleme */}
      <div className="relative">
        <div className="flex items-center gap-1.5 border-b border-line bg-ink-2/80 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <div className="ml-2.5 flex-1 truncate rounded bg-ink/70 px-2.5 py-1 text-[11px] text-muted-2">
            {host}
          </div>
          <IconExternal className="h-3.5 w-3.5 text-muted-2 transition-colors group-hover:text-fg" />
        </div>

        <div className="relative aspect-[2/1] overflow-hidden bg-ink-2">
          {p.image_url ? (
            <img
              src={p.image_url}
              alt={`${p.title} web sitesi ekran görüntüsü`}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="relative h-full w-full">
              <div
                className="absolute inset-0 opacity-90"
                style={{
                  background: `radial-gradient(120% 90% at 20% 0%, ${accent}38 0%, transparent 60%), radial-gradient(90% 80% at 90% 100%, ${accent}22 0%, transparent 55%)`,
                }}
              />
              <div className="absolute inset-0 bg-grid opacity-50" />
              <div className="relative grid h-full place-items-center px-6 text-center">
                <div>
                  <div
                    className="font-display text-[clamp(1.3rem,3.4vw,1.9rem)] font-bold tracking-tight"
                    style={{ color: accent }}
                  >
                    {p.title}
                  </div>
                  <div className="mt-1.5 text-[12px] uppercase tracking-[0.2em] text-muted-2">
                    {p.category}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div
            className={`absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent ${
              p.image_url ? "h-10 from-ink/45" : "h-16 from-ink/85"
            }`}
          />
        </div>
      </div>

      {/* içerik */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[18px] font-semibold">{p.title}</h3>
          <span
            className="shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium"
            style={{ borderColor: `${accent}55`, color: accent }}
          >
            {p.category}
          </span>
        </div>
        <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-muted">
          {p.description}
        </p>
        {tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-md border border-line bg-white/[0.03] px-2 py-1 text-[11.5px] text-muted-2"
              >
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="mt-5 flex items-center gap-1.5 text-[13.5px] font-medium text-accent-soft transition-colors group-hover:text-gold-lite">
          Siteyi ziyaret et
          <IconExternal className="h-3.5 w-3.5" />
        </div>
      </div>
    </a>
  );
}
