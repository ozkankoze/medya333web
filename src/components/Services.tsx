import { services } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import {
  IconBuilding,
  IconCart,
  IconTarget,
  IconSearch,
  IconRefresh,
  IconShield,
} from "./Icons";

const icons = {
  building: IconBuilding,
  cart: IconCart,
  target: IconTarget,
  search: IconSearch,
  refresh: IconRefresh,
  shield: IconShield,
} as const;

export default function Services() {
  return (
    <section id="hizmetler" className="relative overflow-hidden bg-paper-2 py-24 lg:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Hizmetler"
            title={
              <>
                İhtiyacınız ne olursa olsun,{" "}
                <span className="serif text-gold">tek elden</span>.
              </>
            }
            desc="Tasarımdan yayına, SEO'dan bakıma kadar her adımı biz yürütüyoruz. Farklı firmalarla uğraşmanıza gerek kalmıyor."
          />
        </Reveal>

        <div className="mt-14 border-t border-line-2">
          {services.map((s, i) => {
            const Icon = icons[s.icon as keyof typeof icons];
            return (
              <Reveal key={s.title} delay={i * 50}>
                <div className="group grid grid-cols-1 items-start gap-4 border-b border-line-2 py-8 transition-colors hover:bg-paper md:grid-cols-12 md:gap-8 md:py-9">
                  <div className="flex items-center gap-4 md:col-span-1">
                    <span className="text-[13px] tabular-nums text-muted-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 md:col-span-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-paper text-gold transition-colors group-hover:border-gold/40">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="display-sm text-[clamp(1.15rem,2vw,1.45rem)]">
                      {s.title}
                    </h3>
                  </div>

                  <p className="text-[15.5px] leading-relaxed text-muted md:col-span-7">
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
