import { services } from "@/lib/content";
import { iconMap } from "./Icons";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="hizmetler" className="relative py-24 lg:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Hizmetler"
            title={
              <>
                Bir siteye ihtiyacınız yok.
                <br />
                <span className="text-muted">Sonuç getiren bir siteye var.</span>
              </>
            }
            desc="Projenin büyüklüğü ne olursa olsun aynı standartla çalışıyoruz: temiz tasarım, hızlı altyapı, ölçülebilir sonuç."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <Reveal key={s.title} delay={i * 60}>
                <div className="card card-hover group h-full p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-ink-2 text-accent-soft transition-colors group-hover:border-accent/50 group-hover:text-gold-lite">
                    <Icon className="h-[21px] w-[21px]" />
                  </div>
                  <h3 className="font-display mt-5 text-[17.5px] font-semibold">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
