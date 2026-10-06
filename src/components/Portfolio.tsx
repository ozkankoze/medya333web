import { getProjects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default async function Portfolio() {
  const projects = await getProjects();

  return (
    <section id="referanslar" className="relative overflow-hidden py-24 lg:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Referanslar"
            title={
              <>
                Yaptığımız işler, <span className="serif text-gold">canlı</span>{" "}
                ve yayında.
              </>
            }
            desc="Her biri sıfırdan tasarlandı. Karta tıklayın, siteyi kendiniz gezin — gizleyecek bir şeyimiz yok."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.id ?? p.url} delay={(i % 2) * 90} className="h-full">
              <ProjectCard p={p} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
