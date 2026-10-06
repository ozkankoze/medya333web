import { process } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Process() {
  return (
    <section
      id="surec"
      className="relative overflow-hidden bg-paper-2 py-24 lg:py-32"
    >
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Süreç"
            title={
              <>
                Dört adım, <span className="serif text-gold">sürpriz yok</span>.
              </>
            }
            desc="Her aşamada ne olduğunu bilirsiniz. Onayınız olmadan bir sonraki adıma geçilmez."
          />
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 90}>
              <div className="relative">
                <div className="flex items-center gap-4">
                  <span className="display-sm text-[2.6rem] text-line-2">
                    {p.step}
                  </span>
                  <span className="hairline hidden flex-1 lg:block" />
                </div>
                <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.015em]">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
