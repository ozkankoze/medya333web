import { getProjects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

export default async function Portfolio() {
  const projects = await getProjects();

  return (
    <section id="isler" className="rule-b">
      <div className="wrap">
        <div className="grid gap-6 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <span className="mono">001 — İşler</span>
            <h2 className="display-tight mt-7 text-[clamp(2.3rem,6.4vw,4.6rem)]">
              Kırpmadık.
              <br />
              Hepsi burada.
            </h2>
          </div>
          <div className="flex items-end lg:col-span-7">
            <p className="max-w-[50ch] text-[16px] leading-[1.65] text-muted">
              Ajansların portfolyoda tek bir güzel bölümü gösterip gerisini
              saklaması bir gelenektir. Biz tam tersini yapıyoruz: aşağıdaki her
              görsel, o sitenin ilk pikselinden son pikseline kadar tamamı.
              Üzerine gelin, aşağı insin.
            </p>
          </div>
        </div>

        <div className="grid gap-x-10 gap-y-16 pb-20 sm:grid-cols-2 lg:gap-x-14 lg:gap-y-20 lg:pb-28">
          {projects.map((p, i) => (
            <Reveal key={p.id ?? p.url} delay={(i % 2) * 80} className="h-full">
              <ProjectCard p={p} index={i} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
