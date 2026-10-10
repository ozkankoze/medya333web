import { Project, metricList, tagList } from "@/lib/projects";
import { creepSeconds, prettyHost, webpFor } from "@/lib/shots";

export default function ProjectCard({
  p,
  index,
  priority = false,
}: {
  p: Project;
  index: number;
  priority?: boolean;
}) {
  const tags = tagList(p.tags);
  const metrics = metricList(p.metrics);
  const webp = webpFor(p.image_url);
  const host = prettyHost(p.url);

  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col"
    >
      {/* üst satır: numara + sektör */}
      <div className="flex items-baseline justify-between gap-4 border-t border-ink pb-3 pt-3">
        <span className="mono mono-ink">
          {String(index + 1).padStart(2, "0")} — {p.category}
        </span>
        <span className="mono transition-colors group-hover:text-ink">
          Tam sayfa ↓
        </span>
      </div>

      {/* tarayıcı çerçevesi + kırpılmamış ekran görüntüsü */}
      <div className="frame">
        <div className="frame-bar">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="mono ml-2 truncate text-[10px]">{host}</span>
        </div>

        <div
          className="peek relative w-full overflow-hidden bg-wash"
          style={{ ["--dur" as string]: `${creepSeconds(p.image_url)}s` }}
        >
          <div className="win w-full">
            {p.image_url ? (
              <picture>
                {webp && <source srcSet={webp} type="image/webp" />}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image_url}
                  alt={`${p.title} — web sitesinin tamamı`}
                  loading={priority ? "eager" : "lazy"}
                  fetchPriority={priority ? "high" : "auto"}
                  className="block w-full"
                />
              </picture>
            ) : (
              <div className="grid h-full w-full place-items-center">
                <span className="display-sm text-2xl text-muted-2">
                  {p.title}
                </span>
              </div>
            )}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/12 to-transparent" />
        </div>
      </div>

      {/* metin */}
      <div className="flex flex-1 flex-col pt-5">
        <h3 className="display-sm text-[clamp(1.4rem,2.6vw,1.95rem)]">
          <span className="link-slide">{p.title}</span>
        </h3>

        <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.62] text-muted">
          {p.description}
        </p>

        {/* ölçülmüş sonuçlar — süslemeden, rakam olarak */}
        {metrics.length > 0 && (
          <dl className="mt-5 flex-1 border-t border-ink">
            {metrics.map((m) => {
              const i = m.lastIndexOf(" ");
              const head = m.slice(0, i);
              const val = m.slice(i + 1);
              return (
                <div
                  key={m}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-2"
                >
                  <dt className="mono">{head}</dt>
                  <dd className="display-sm text-[15px] tabular-nums">{val}</dd>
                </div>
              );
            })}
          </dl>
        )}

        {tags.length > 0 && (
          <div className="mono mt-5 flex flex-wrap gap-x-4 gap-y-1">
            {tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
