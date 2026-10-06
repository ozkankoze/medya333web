import { Project, tagList } from "@/lib/projects";
import { IconArrowUpRight } from "./Icons";

export default function ProjectCard({
  p,
  priority = false,
}: {
  p: Project;
  priority?: boolean;
}) {
  const tags = tagList(p.tags);

  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-hover group flex h-full flex-col overflow-hidden"
    >
      {/* görsel */}
      <div className="relative overflow-hidden bg-paper-2">
        <div className="aspect-[16/10] w-full">
          {p.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.image_url}
              alt={`${p.title} web sitesi`}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div
              className="grid h-full w-full place-items-center"
              style={{
                background: `linear-gradient(135deg, ${p.accent}22, ${p.accent}08)`,
              }}
            >
              <span
                className="display-sm text-[2rem]"
                style={{ color: p.accent }}
              >
                {p.title}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* metin */}
      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="eyebrow">{p.category}</span>
            <h3 className="display-sm mt-2 text-[clamp(1.25rem,2.2vw,1.6rem)]">
              {p.title}
            </h3>
          </div>
          <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
            <IconArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">
          {p.description}
        </p>

        {tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-2.5 py-1 text-[12px] text-muted-2"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
