import { getProjects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { IconArrow } from "./Icons";

export default async function Portfolio() {
  const projects = await getProjects();

  return (
    <section id="referanslar" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Referanslar"
              title={
                <>
                  Yaptığımız işler.
                  <br />
                  <span className="text-muted">Hepsi yayında, hepsi canlı.</span>
                </>
              }
              desc="Aşağıdaki sitelerin tamamı şu an aktif olarak çalışıyor. Karta tıklayıp doğrudan siteyi inceleyebilirsiniz."
            />
          </Reveal>
          <Reveal delay={120}>
            <a
              href="#iletisim"
              className="group inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-[14px] font-medium transition-colors hover:border-accent/60"
            >
              Sıradaki proje sizin olsun
              <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 90}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
